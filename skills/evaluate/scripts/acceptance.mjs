#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const sha = /^[0-9a-f]{40}$/;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const issue = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/issues\/([1-9][0-9]*)$/;
const pr = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/pull\/([1-9][0-9]*)$/;

export function readMarker(body, kind) {
    const matches = [...body.matchAll(new RegExp(`<!--\\s*workflow-${kind}:\\s*([\\s\\S]*?)-->`, 'g'))];
    if (matches.length !== 1) throw new Error(`expected one workflow-${kind} marker`);
    return JSON.parse(matches[0][1]);
}

export function parseEvaluation(body, kind = 'evaluation') {
    const value = readMarker(body, kind);
    if (!value || value.schema !== 1 || !uuid.test(value.id ?? '')) throw new Error('invalid evaluation identity');
    if (!issue.test(value.issueUrl ?? '') || !pr.test(value.pullRequest ?? '') || !sha.test(value.headSha ?? '')) {
        throw new Error('evaluation needs issue, PR, and full reviewed head');
    }
    if (!['PASS', 'CHANGES', 'BLOCKED'].includes(value.verdict)) throw new Error('invalid evaluation verdict');
    if (!Array.isArray(value.dependencies) || value.dependencies.some((dependency) =>
        !dependency || !issue.test(dependency.issueUrl ?? '') || !sha.test(dependency.headSha ?? ''))) {
        throw new Error('evaluation needs exact dependency commits');
    }
    if (new Set(value.dependencies.map((dependency) => dependency.issueUrl)).size !== value.dependencies.length) {
        throw new Error('duplicate evaluation dependency');
    }
    if (!Array.isArray(value.findings) || value.findings.some((finding) => !finding ||
        !/^[a-zA-Z0-9][a-zA-Z0-9-]{0,99}$/.test(finding.id ?? '') ||
        typeof finding.blocking !== 'boolean' || !['open', 'closed'].includes(finding.state))) {
        throw new Error('invalid finding identity, disposition, or state');
    }
    if (new Set(value.findings.map((finding) => finding.id)).size !== value.findings.length) throw new Error('duplicate finding identity');
    const blockers = value.findings.filter((finding) => finding.blocking && finding.state === 'open');
    if (value.verdict === 'PASS' && blockers.length) throw new Error('PASS cannot retain open blockers');
    if (value.verdict === 'CHANGES' && !blockers.length) throw new Error('CHANGES needs an actionable blocker');
    if (!body.replace(/<!--[\s\S]*?-->/g, '').trim()) throw new Error('evaluation needs readable evidence and explanation');
    return value;
}

function endpoint(url, pattern, kind) {
    const match = url.match(pattern);
    if (!match) throw new Error(`invalid ${kind} URL`);
    return `repos/${match[1]}/${kind}/${match[2]}`;
}

function gh(args, input) {
    return JSON.parse(execFileSync('gh', args, { input, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 }));
}

function comments(request, issueEndpoint) {
    return request(['api', `${issueEndpoint}/comments?per_page=100`, '--paginate', '--slurp']).flat();
}

function ensureComment(request, issueEndpoint, body, kind, id) {
    const prior = comments(request, issueEndpoint).filter((comment) => {
        if (!comment.body.includes(`workflow-${kind}:`)) return false;
        return readMarker(comment.body, kind).id === id;
    });
    if (prior.length > 1) throw new Error('duplicate evaluation record identity requires reconciliation');
    if (prior.length === 1) {
        if (prior[0].body !== body) throw new Error('an immutable evaluation record cannot be overwritten');
        return prior[0];
    }
    const published = request(['api', `${issueEndpoint}/comments`, '--method', 'POST', '--input', '-'], JSON.stringify({ body }));
    const repository = issueEndpoint.split('/').slice(0, 3).join('/');
    const stored = request(['api', `${repository}/issues/comments/${published.id}`]);
    if (stored.body !== body) throw new Error('evaluation comment failed read-back verification');
    return stored;
}

function sameRecord(left, right) {
    const fields = ['schema', 'id', 'issueUrl', 'pullRequest', 'headSha', 'dependencies', 'verdict', 'findings'];
    return fields.every((field) => JSON.stringify(left[field]) === JSON.stringify(right[field]));
}

export function verifyCurrent(record, request = gh, visiting = new Set()) {
    if (visiting.has(record.issueUrl)) throw new Error('cyclic evaluation dependencies');
    visiting.add(record.issueUrl);
    const outcome = request(['api', endpoint(record.issueUrl, issue, 'issues')]);
    if (record.verdict === 'PASS' && outcome.state !== 'open') throw new Error('a closed outcome cannot receive passing acceptance');
    const contract = readMarker(outcome.body, 'outcome');
    if (contract.schema !== 1 || contract.pullRequest !== record.pullRequest) throw new Error('issue does not own the evaluated PR');
    if (!Array.isArray(contract.dependencies)) throw new Error('outcome has invalid dependencies');
    const expected = [...contract.dependencies].sort();
    const judged = record.dependencies.map((dependency) => dependency.issueUrl).sort();
    if (JSON.stringify(expected) !== JSON.stringify(judged)) throw new Error('evaluation dependency set differs from the outcome');
    const pull = request(['api', endpoint(record.pullRequest, pr, 'pulls')]);
    if (pull.state !== 'open') throw new Error('evaluate an open PR before publishing acceptance');
    if (pull.head.sha !== record.headSha) throw new Error('reviewed PR head is stale');
    for (const dependency of record.dependencies) {
        const parent = request(['api', endpoint(dependency.issueUrl, issue, 'issues')]);
        const parentContract = readMarker(parent.body, 'outcome');
        if (typeof parentContract.pullRequest !== 'string') throw new Error('dependency has no implementation PR');
        const parentPull = request(['api', endpoint(parentContract.pullRequest, pr, 'pulls')]);
        const effectiveSha = parentPull.merged_at ? parentPull.merge_commit_sha : parentPull.head.sha;
        if ((!parentPull.merged_at && parentPull.state !== 'open') || effectiveSha !== dependency.headSha) throw new Error('reviewed dependency is stale or closed without merge');
        if (!parentPull.merged_at && record.verdict === 'PASS') {
            const history = comments(request, endpoint(dependency.issueUrl, issue, 'issues'));
            const boundary = history.filter((comment) => comment.body.includes('workflow-blocked:')).at(-1);
            if (boundary && readMarker(boundary.body, 'blocked').active) throw new Error('unmerged dependency is blocked');
            const detailComments = comments(request, endpoint(parentContract.pullRequest, pr, 'issues'));
            const details = detailComments.filter((comment) => comment.body.includes('workflow-evaluation:'))
                .map((comment) => ({ comment, record: parseEvaluation(comment.body) }))
                .filter((entry) => entry.record.headSha === effectiveSha && entry.record.issueUrl === dependency.issueUrl);
            const latest = details.at(-1);
            if (!latest || latest.record.verdict !== 'PASS') throw new Error('unmerged dependency has no current accepted evaluation');
            const summaries = history.filter((comment) => comment.body.includes('workflow-acceptance:'))
                .map((comment) => ({ comment, record: parseEvaluation(comment.body, 'acceptance') }))
                .filter((entry) => entry.record.headSha === effectiveSha);
            const summary = summaries.at(-1);
            if (!summary || !sameRecord(summary.record, latest.record) || summary.record.detailUrl !== latest.comment.html_url ||
                (boundary && !readMarker(boundary.body, 'blocked').active &&
                    (boundary.id > summary.comment.id || boundary.id > latest.comment.id))) {
                throw new Error('dependency acceptance publication is incomplete or missing evidence');
            }
            verifyCurrent(latest.record, request, visiting);
        }
    }
    visiting.delete(record.issueUrl);
    return record;
}

export function publishEvaluation(body, request = gh) {
    const record = parseEvaluation(body);
    verifyCurrent(record, request);
    const detail = ensureComment(request, endpoint(record.pullRequest, pr, 'issues'), body, 'evaluation', record.id);
    // Publication can stop here. Reusing the same record recovers the missing issue summary.
    verifyCurrent(record, request);
    const summary = `${record.verdict} at ${record.headSha}. [Evaluation and evidence](${detail.html_url}).\n\n` +
        `<!-- workflow-acceptance: ${JSON.stringify({ ...record, detailUrl: detail.html_url })} -->`;
    const history = ensureComment(request, endpoint(record.issueUrl, issue, 'issues'), summary, 'acceptance', record.id);
    return { verdict: record.verdict, detailUrl: detail.html_url, historyUrl: history.html_url, headSha: record.headSha };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        const [operation, file, ...extra] = process.argv.slice(2);
        if (!file || extra.length || !['validate', 'publish'].includes(operation)) throw new Error('usage: acceptance.mjs validate|publish <evaluation-body>');
        const body = readFileSync(file, 'utf8');
        console.log(JSON.stringify(operation === 'validate' ? parseEvaluation(body) : publishEvaluation(body)));
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
