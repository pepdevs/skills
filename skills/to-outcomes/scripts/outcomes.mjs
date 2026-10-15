#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const issuePattern = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/issues\/([1-9][0-9]*)$/;
const prPattern = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/pull\/([1-9][0-9]*)$/;
const planPattern = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/blob\/([0-9a-f]{40})\/(.+)$/;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const sizes = new Set(['S', 'M', 'L']);
const sizeError = 'size must be S, M or L';

export function parseIssueUrl(url) {
    const match = typeof url === 'string' && url.match(issuePattern);
    if (!match || !Number.isSafeInteger(Number(match[2]))) throw new Error('expected a GitHub outcome issue URL');
    return { repository: match[1], number: Number(match[2]) };
}

function markerParts(body) {
    const matches = [...body.matchAll(/<!--\s*workflow-outcome:\s*([\s\S]*?)-->/g)];
    if (matches.length !== 1) throw new Error('expected one workflow-outcome marker');
    return { raw: matches[0][0], value: JSON.parse(matches[0][1]) };
}

export function parseOutcome(body) {
    const { raw, value } = markerParts(body);
    if (!value || value.schema !== 1 || !uuid.test(value.planId ?? '')) throw new Error('invalid outcome schema or plan identity');
    if (typeof value.key !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.key) || value.key.length > 100) {
        throw new Error('outcome key must be a stable descriptive slug');
    }
    const plan = typeof value.planUrl === 'string' && value.planUrl.match(planPattern);
    if (!plan || !plan[3].endsWith('.md') || /[?#%\\\u0000-\u001f]/.test(plan[3]) ||
        plan[3].split('/').some((part) => !part || part === '.' || part === '..')) throw new Error('plan URL must pin a full commit and contained Markdown path');
    if (!Array.isArray(value.dependencies)) throw new Error('dependencies must be issue URLs');
    value.dependencies.forEach(parseIssueUrl);
    if (new Set(value.dependencies).size !== value.dependencies.length) throw new Error('duplicate dependency');
    if (value.pullRequest !== null && (typeof value.pullRequest !== 'string' || !prPattern.test(value.pullRequest))) {
        throw new Error('pullRequest must be a GitHub PR URL or null');
    }
    if (Object.hasOwn(value, 'size') && !sizes.has(value.size)) throw new Error(sizeError);
    if (!body.replace(raw, '').trim()) throw new Error('outcome needs a readable explanation and acceptance criteria');
    return value;
}

function identityBody(body) {
    const { raw, value } = markerParts(body);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return body;
    return body.replace(raw, `<!-- workflow-outcome: ${JSON.stringify({ ...value, size: 'S' })} -->`);
}

export function validateGraph(issues) {
    const byUrl = new Map();
    const keys = new Set();
    for (const issue of issues) {
        parseIssueUrl(issue.url);
        const outcome = parseOutcome(issue.body);
        if (byUrl.has(issue.url)) throw new Error('duplicate issue identity');
        const key = `${outcome.planId}:${outcome.key}`;
        if (keys.has(key)) throw new Error(`duplicate outcome key: ${outcome.key}`);
        keys.add(key);
        byUrl.set(issue.url, outcome);
    }
    const active = new Set();
    const visited = new Set();
    const ordered = [];
    function visit(url) {
        if (active.has(url)) throw new Error('outcome dependencies contain a cycle');
        if (visited.has(url)) return;
        const outcome = byUrl.get(url);
        if (!outcome) throw new Error(`dependency missing from snapshot: ${url}`);
        active.add(url);
        outcome.dependencies.forEach(visit);
        active.delete(url);
        visited.add(url);
        ordered.push(url);
    }
    byUrl.forEach((_, url) => visit(url));
    return ordered;
}

export function gh(args, input) {
    const result = execFileSync('gh', args, { encoding: 'utf8', input, maxBuffer: 16 * 1024 * 1024 });
    return JSON.parse(result);
}

function pages(request, endpoint) {
    return request(['api', endpoint, '--paginate', '--slurp']).flat();
}

export function ensureOutcome(repository, title, body, request = gh) {
    if (!/^[\w.-]+\/[\w.-]+$/.test(repository) || !title.trim()) throw new Error('repository and title are required');
    let desired;
    let rejectedSize = null;
    try {
        desired = parseOutcome(body);
        if (!sizes.has(desired.size)) rejectedSize = new Error(sizeError);
    } catch (error) {
        if (error.message !== sizeError) throw error;
        rejectedSize = error;
        desired = parseOutcome(identityBody(body));
    }
    const existing = pages(request, `repos/${repository}/issues?state=all&per_page=100`)
        .filter((issue) => !issue.pull_request && issue.body?.includes('workflow-outcome:'))
        .filter((issue) => {
            // Another plan's malformed or planless marker is not this plan's concern.
            let candidate;
            try { candidate = parseOutcome(issue.body); } catch (error) {
                if (issue.body.includes(desired.planId)) throw error;
                return false;
            }
            return candidate.planId === desired.planId && candidate.key === desired.key;
        });
    if (existing.length > 1) throw new Error('duplicate published outcome keys require reconciliation');
    if (existing.length === 1) {
        if (parseOutcome(existing[0].body).planUrl !== desired.planUrl) throw new Error('existing outcome pins another plan revision; reconcile scope explicitly');
        return { created: false, url: existing[0].html_url };
    }
    // Recovery runs before this gate, so an existing issue without size still returns.
    if (rejectedSize) throw rejectedSize;
    const created = request(['api', `repos/${repository}/issues`, '--method', 'POST', '--input', '-'], JSON.stringify({ title, body }));
    const stored = request(['api', `repos/${repository}/issues/${created.number}`]);
    if (stored.body !== body) throw new Error('published outcome failed read-back verification');
    return { created: true, url: stored.html_url };
}

export function linkPullRequest(issueUrl, pullRequest, request = gh) {
    const issue = parseIssueUrl(issueUrl);
    if (!prPattern.test(pullRequest)) throw new Error('expected a GitHub PR URL');
    const endpoint = `repos/${issue.repository}/issues/${issue.number}`;
    const stored = request(['api', endpoint]);
    const metadata = parseOutcome(stored.body);
    if (metadata.dependencies.includes(issueUrl)) throw new Error('outcome cannot depend on itself');
    if (metadata.pullRequest && metadata.pullRequest !== pullRequest) throw new Error('outcome already owns another PR');
    if (metadata.pullRequest === pullRequest) return { url: issueUrl, pullRequest };
    metadata.pullRequest = pullRequest;
    const body = stored.body.replace(/<!--\s*workflow-outcome:\s*[\s\S]*?-->/, `<!-- workflow-outcome: ${JSON.stringify(metadata)} -->`);
    request(['api', endpoint, '--method', 'PATCH', '--input', '-'], JSON.stringify({ body }));
    const checked = request(['api', endpoint]);
    if (checked.body !== body) throw new Error('outcome PR link failed read-back verification');
    return { url: issueUrl, pullRequest };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        const [operation, ...args] = process.argv.slice(2);
        let result;
        if (operation === 'validate' && args.length === 1) result = parseOutcome(readFileSync(args[0], 'utf8'));
        else if (operation === 'graph' && args.length === 1) result = validateGraph(JSON.parse(readFileSync(args[0], 'utf8')));
        else if (operation === 'ensure' && args.length === 3) result = ensureOutcome(args[0], args[1], readFileSync(args[2], 'utf8'));
        else if (operation === 'link-pr' && args.length === 2) result = linkPullRequest(...args);
        else throw new Error('usage: outcomes.mjs validate <body> | graph <snapshot.json> | ensure <owner/repo> <title> <body> | link-pr <issue-url> <pr-url>');
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
