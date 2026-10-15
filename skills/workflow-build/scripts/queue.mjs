#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const issueUrl = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/issues\/([1-9][0-9]*)$/;
const prUrl = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/pull\/([1-9][0-9]*)$/;
const sha = /^[0-9a-f]{40}$/;

function marker(body, name) {
    const matches = [...body.matchAll(new RegExp(`<!--\\s*workflow-${name}:\\s*([\\s\\S]*?)-->`, 'g'))];
    if (!matches.length) return null;
    if (matches.length !== 1) throw new Error(`duplicate workflow-${name} marker`);
    const result = JSON.parse(matches[0][1]);
    if (!result || result.schema !== 1) throw new Error(`unsupported workflow-${name} schema`);
    return result;
}

function validateSnapshot(snapshot) {
    if (!Array.isArray(snapshot)) throw new Error('queue snapshot must be an array');
    const identities = new Set();
    for (const outcome of snapshot) {
        if (!outcome || !issueUrl.test(outcome.url ?? '') || identities.has(outcome.url)) throw new Error('invalid or duplicate outcome identity');
        identities.add(outcome.url);
        if (typeof outcome.closed !== 'boolean') throw new Error('invalid issue closed state');
        if (!Array.isArray(outcome.dependencies) || outcome.dependencies.some((url) => !issueUrl.test(url)) ||
            new Set(outcome.dependencies).size !== outcome.dependencies.length) throw new Error('invalid outcome dependencies');
        if (outcome.pr !== null && (!outcome.pr || !prUrl.test(outcome.pr.url ?? '') || !sha.test(outcome.pr.headSha ?? '') ||
            !['open', 'closed'].includes(outcome.pr.state) || typeof outcome.pr.merged !== 'boolean' ||
            (outcome.pr.merged && !sha.test(outcome.pr.mergeSha ?? '')))) throw new Error('invalid current PR state');
        if (!Array.isArray(outcome.evaluations)) throw new Error('missing evaluation history');
        const records = new Set();
        for (const record of outcome.evaluations) {
            if (!record || typeof record.id !== 'string' || records.has(record.id) || record.issueUrl !== outcome.url ||
                !prUrl.test(record.pullRequest ?? '') || !sha.test(record.headSha ?? '') ||
                !['PASS', 'CHANGES', 'BLOCKED'].includes(record.verdict) || !Array.isArray(record.dependencies) ||
                record.dependencies.some((dep) => !issueUrl.test(dep.issueUrl ?? '') || !sha.test(dep.headSha ?? '')) ||
                new Set(record.dependencies.map((dep) => dep.issueUrl)).size !== record.dependencies.length ||
                !Array.isArray(record.findings)) throw new Error('invalid or duplicated evaluation history');
            if (record.findings.some((finding) => !finding || typeof finding.id !== 'string' ||
                typeof finding.blocking !== 'boolean' || !['open', 'closed'].includes(finding.state)) ||
                new Set(record.findings.map((finding) => finding.id)).size !== record.findings.length) throw new Error('invalid acceptance findings');
            for (const flag of ['published', 'missingEvidence']) {
                if (record[flag] !== undefined && typeof record[flag] !== 'boolean') throw new Error('invalid publication state');
            }
            if (record.verdict === 'PASS' && record.findings.some((finding) => finding.blocking && finding.state === 'open')) throw new Error('passing history contains open blockers');
            if (record.verdict === 'CHANGES' && !record.findings.some((finding) => finding.blocking && finding.state === 'open')) throw new Error('changes history needs an actionable blocker');
            records.add(record.id);
        }
        if (outcome.blocked !== null && (typeof outcome.blocked !== 'string' || !outcome.blocked.trim())) throw new Error('invalid blocking boundary');
    }
}

export function deriveQueue(snapshot) {
    validateSnapshot(snapshot);
    const byUrl = new Map(snapshot.map((outcome) => [outcome.url, outcome]));
    const visiting = new Set();
    const states = new Map();
    function visit(url) {
        if (states.has(url)) return states.get(url);
        if (visiting.has(url)) throw new Error('cyclic outcome dependencies');
        const outcome = byUrl.get(url);
        if (!outcome) throw new Error(`missing dependency snapshot: ${url}`);
        visiting.add(url);
        const parents = outcome.dependencies.map((parentUrl) => ({ outcome: byUrl.get(parentUrl), state: visit(parentUrl) }));
        visiting.delete(url);
        let state;
        if (outcome.pr?.merged) state = 'merged';
        else if (outcome.blocked || outcome.pr?.state === 'closed' || outcome.closed) state = 'blocked';
        else if (parents.some((parent) => !['accepted', 'merged'].includes(parent.state)) ||
            parents.filter((parent) => parent.state !== 'merged').length > 1) state = 'waiting';
        else if (!outcome.pr) state = 'implement';
        else {
            const current = outcome.evaluations.filter((record) => record.pullRequest === outcome.pr.url && record.headSha === outcome.pr.headSha &&
                record.dependencies.length === parents.length && parents.every((parent) => record.dependencies.some((dependency) =>
                    dependency.issueUrl === parent.outcome.url && dependency.headSha ===
                    (parent.outcome.pr.merged ? parent.outcome.pr.mergeSha : parent.outcome.pr.headSha))));
            const latest = current.at(-1);
            state = !latest ? 'evaluate' : latest.missingEvidence ? 'blocked' : latest.published === false ? 'reconcile' :
                latest.verdict === 'PASS' ? 'accepted' : latest.verdict === 'CHANGES' ? 'implement' : 'blocked';
        }
        states.set(url, state);
        return state;
    }
    snapshot.forEach((outcome) => visit(outcome.url));
    return [...states].map(([url, state]) => ({ url, state }));
}

function gh(args) {
    return JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }));
}

export function collectQueue(repository, planId, request = gh) {
    if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('invalid repository');
    const issues = request(['api', `repos/${repository}/issues?state=all&per_page=100`, '--paginate', '--slurp']).flat();
    const snapshot = new Map();
    const selected = [];
    function collect(raw) {
        if (snapshot.has(raw.html_url)) return;
        const contract = marker(raw.body ?? '', 'outcome');
        if (!contract || !Array.isArray(contract.dependencies)) throw new Error(`missing outcome contract: ${raw.html_url}`);
        const match = raw.html_url.match(issueUrl);
        if (!match) throw new Error('invalid stored issue URL');
        const history = request(['api', `repos/${match[1]}/issues/${match[2]}/comments?per_page=100`, '--paginate', '--slurp']).flat();
        const release = history.findLastIndex((comment) => marker(comment.body, 'blocked')?.active === false);
        const summaries = history.slice(release + 1).map((comment) => ({ comment, record: marker(comment.body, 'acceptance') })).filter((entry) => entry.record);
        const boundary = history.map((comment) => marker(comment.body, 'blocked')).filter(Boolean).at(-1);
        let pull = null;
        let details = [];
        if (contract.pullRequest !== null) {
            const target = typeof contract.pullRequest === 'string' && contract.pullRequest.match(prUrl);
            if (!target) throw new Error('invalid outcome PR URL');
            const stored = request(['api', `repos/${target[1]}/pulls/${target[2]}`]);
            pull = { url: contract.pullRequest, headSha: stored.head.sha, state: stored.state, merged: Boolean(stored.merged_at), mergeSha: stored.merge_commit_sha };
            const records = request(['api', `repos/${target[1]}/issues/${target[2]}/comments?per_page=100`, '--paginate', '--slurp']).flat();
            details = records.filter((comment) => release < 0 || comment.id > history[release].id)
                .map((comment) => ({ comment, record: marker(comment.body, 'evaluation') })).filter((entry) => entry.record);
        }
        const fields = ['schema', 'id', 'issueUrl', 'pullRequest', 'headSha', 'dependencies', 'verdict', 'findings'];
        const evaluations = details.map((entry) => {
            const summary = summaries.find((candidate) => candidate.record.id === entry.record.id);
            const matches = summary && fields.every((field) => JSON.stringify(summary.record[field]) === JSON.stringify(entry.record[field])) &&
                summary.record.detailUrl === entry.comment.html_url;
            return { order: entry.comment.id, record: { ...entry.record, published: Boolean(matches), missingEvidence: Boolean(summary && !matches) } };
        });
        for (const summary of summaries) {
            if (!details.some((entry) => entry.record.id === summary.record.id)) {
                evaluations.push({ order: summary.comment.id, record: { ...summary.record, published: false, missingEvidence: true } });
            }
        }
        evaluations.sort((left, right) => left.order - right.order);
        snapshot.set(raw.html_url, { url: raw.html_url, dependencies: contract.dependencies, pr: pull, evaluations: evaluations.map((entry) => entry.record),
            closed: raw.state === 'closed', blocked: boundary?.active ? boundary.reason : null });
        for (const dependency of contract.dependencies) {
            if (snapshot.has(dependency)) continue;
            const parent = dependency.match(issueUrl);
            if (!parent) throw new Error('invalid dependency URL');
            collect(request(['api', `repos/${parent[1]}/issues/${parent[2]}`]));
        }
    }
    for (const raw of issues) {
        if (raw.pull_request || !raw.body?.includes('workflow-outcome:')) continue;
        if (marker(raw.body, 'outcome').planId !== planId) continue;
        selected.push(raw.html_url);
        collect(raw);
    }
    const values = [...snapshot.values()];
    return { snapshot: values, queue: deriveQueue(values).filter((entry) => selected.includes(entry.url)) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        const [operation, ...args] = process.argv.slice(2);
        if (operation === 'derive' && args.length === 1) console.log(JSON.stringify(deriveQueue(JSON.parse(readFileSync(args[0], 'utf8')))));
        else if (operation === 'collect' && args.length === 2) console.log(JSON.stringify(collectQueue(...args)));
        else throw new Error('usage: queue.mjs collect <owner/repo> <plan-id> | derive <snapshot.json>');
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
