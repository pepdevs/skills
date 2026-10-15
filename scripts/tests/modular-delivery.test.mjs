import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseOutcome, validateGraph, ensureOutcome, linkPullRequest } from '../../skills/to-outcomes/scripts/outcomes.mjs';
import { parseEvaluation, publishEvaluation } from '../../skills/evaluate/scripts/acceptance.mjs';
import { deriveQueue, collectQueue } from '../../skills/workflow-build/scripts/queue.mjs';
const A = 'a'.repeat(40), B = 'b'.repeat(40), C = 'c'.repeat(40);
const ISSUE = 'https://github.com/test/repo/issues/1', PR = 'https://github.com/test/repo/pull/2';
const PARENT = 'https://github.com/test/repo/issues/3', PARENT_PR = 'https://github.com/test/repo/pull/4';
const ID = '00000000-0000-4000-8000-000000000001';
function contract(overrides = {}) {
    return { schema: 1, key: 'visible-result', planId: ID, planUrl: `https://github.com/test/repo/blob/${A}/docs/plans/0001-result.md`, dependencies: [], pullRequest: PR, ...overrides };
}
function issueBody(overrides = {}, prose = 'The operator sees the result. Acceptance: the visible value matches the source. History is in the timeline.') {
    return `${prose}\n\n<!-- workflow-outcome: ${JSON.stringify(contract(overrides))} -->`;
}
function record(overrides = {}) {
    return { schema: 1, id: ID, issueUrl: ISSUE, pullRequest: PR, headSha: A, dependencies: [], verdict: 'PASS', findings: [], ...overrides };
}
function review(overrides = {}) {
    return `The CLI returns the expected value. Its boundary checks pass.\n\n<!-- workflow-evaluation: ${JSON.stringify(record(overrides))} -->`;
}
function remote({ dependencies = false, failSummary = false } = {}) {
    const issues = new Map([[1, { number: 1, html_url: ISSUE, state: 'open', body: issueBody({ dependencies: dependencies ? [PARENT] : [] }) }],
        [3, { number: 3, html_url: PARENT, state: 'open', body: issueBody({ key: 'parent-result', pullRequest: PARENT_PR }) }]]);
    const pulls = new Map([[2, { number: 2, state: 'open', head: { sha: A }, merged_at: null, merge_commit_sha: null }],
        [4, { number: 4, state: 'open', head: { sha: B }, merged_at: null, merge_commit_sha: null }]]);
    const comments = new Map(); let next = 10; let failures = failSummary ? 1 : 0; let created = 0;
    function request(args, input) {
        const endpoint = args[1]; const method = args.includes('--method') ? args[args.indexOf('--method') + 1] : 'GET';
        const payload = input ? JSON.parse(input) : null;
        let result;
        if (endpoint === 'repos/test/repo/issues?state=all&per_page=100') result = [[...issues.values()]];
        else if (endpoint === 'repos/test/repo/issues' && method === 'POST') {
            const number = next++; created++;
            result = { number, html_url: `https://github.com/test/repo/issues/${number}`, state: 'open', ...payload }; issues.set(number, result);
        } else if (/^repos\/test\/repo\/issues\/comments\/\d+$/.test(endpoint)) result = comments.get(Number(endpoint.split('/').at(-1)));
        else if (/^repos\/test\/repo\/issues\/\d+\/comments(?:\?per_page=100)?$/.test(endpoint)) {
            const number = Number(endpoint.split('/')[4]);
            if (method === 'POST') {
                if (number === 1 && failures) { failures--; throw new Error('simulated interruption before issue summary'); }
                const id = next++; result = { id, issue: number, body: payload.body, html_url: `https://github.com/test/repo/issues/${number}#issuecomment-${id}` }; comments.set(id, result);
            } else result = [[...comments.values()].filter((comment) => comment.issue === number)];
        } else if (/^repos\/test\/repo\/issues\/\d+$/.test(endpoint)) {
            const number = Number(endpoint.split('/').at(-1));
            result = issues.get(number);
            if (method === 'PATCH') Object.assign(result, payload);
        } else if (/^repos\/test\/repo\/pulls\/\d+$/.test(endpoint)) result = pulls.get(Number(endpoint.split('/').at(-1)));
        else throw new Error(`unexpected request ${args}`);
        return structuredClone(result);
    }
    return { request, issues, pulls, comments, created: () => created, failNextSummary: () => { failures = 1; } };
}
test('outcome prose can vary without changing machine identity', () => {
    assert.deepEqual(parseOutcome(issueBody()), parseOutcome(issueBody({}, '## Why\nA useful change.\n## Proof\nObserve the result.')));
    assert.throws(() => parseOutcome(issueBody().replace(A, 'main')), /pin a full commit/);
    assert.throws(() => parseOutcome(issueBody() + issueBody()), /one workflow-outcome/);
    assert.throws(() => parseOutcome(issueBody({ dependencies: [PARENT, PARENT] })), /duplicate/);
});
test('decomposition detects cycles, missing prerequisites, and duplicate identities', () => {
    const nodes = [{ url: ISSUE, body: issueBody({ dependencies: [PARENT] }) }, { url: PARENT, body: issueBody({ key: 'parent' }) }];
    assert.deepEqual(validateGraph(nodes), [PARENT, ISSUE]);
    assert.throws(() => validateGraph(nodes.slice(0, 1)), /missing/);
    assert.throws(() => validateGraph([nodes[0], { ...nodes[1], body: issueBody({ key: 'parent', dependencies: [ISSUE] }) }]), /cycle/);
    assert.throws(() => validateGraph([nodes[0], nodes[0]]), /duplicate/);
});
test('ensure reconciles existing and closed outcomes without losing history', () => {
    const api = remote(); api.issues.get(1).state = 'closed';
    assert.equal(ensureOutcome('test/repo', 'Result', issueBody(), api.request).created, false);
    assert.equal(api.created(), 0);
    const fresh = issueBody({ key: 'another-result', pullRequest: null, size: 'S' });
    assert.equal(ensureOutcome('test/repo', 'Another result', fresh, api.request).created, true);
    assert.equal(ensureOutcome('test/repo', 'Another result', fresh, api.request).created, false);
    assert.equal(api.created(), 1);
    api.issues.set(9, { number: 9, state: 'closed', html_url: 'https://github.com/test/repo/issues/9', body: '<!-- workflow-outcome: {"schema":1,"dependencies":[]} -->' });
    assert.equal(ensureOutcome('test/repo', 'Another result', fresh, api.request).created, false);
    api.issues.set(9, { ...api.issues.get(9), body: `<!-- workflow-outcome: {"schema":1,"planId":"${ID}"} -->` });
    assert.throws(() => ensureOutcome('test/repo', 'Another result', fresh, api.request), /key/);
    api.issues.delete(9);
    assert.throws(() => ensureOutcome('test/repo', 'Changed plan', issueBody({ planUrl: contract().planUrl.replace(A, B) }), api.request), /another plan revision/);
});
test('linking a PR preserves prose and refuses a replacement PR', () => {
    const api = remote(); api.issues.get(1).body = issueBody({ pullRequest: null });
    linkPullRequest(ISSUE, PR, api.request);
    assert.match(api.issues.get(1).body, /History is in the timeline/);
    assert.equal(parseOutcome(api.issues.get(1).body).pullRequest, PR);
    assert.throws(() => linkPullRequest(ISSUE, PARENT_PR, api.request), /another PR/);
});
test('evaluation separates findings from editorial format and refuses contradictory verdicts', () => {
    assert.equal(parseEvaluation(review()).verdict, 'PASS');
    const open = [{ id: 'incorrect-value', blocking: true, state: 'open' }];
    assert.throws(() => parseEvaluation(review({ findings: open })), /open blockers/);
    assert.throws(() => parseEvaluation(review({ verdict: 'CHANGES' })), /actionable blocker/);
    assert.equal(parseEvaluation(review({ verdict: 'CHANGES', findings: open })).findings[0].id, 'incorrect-value');
});
test('interrupted publication resumes without duplicating detailed verdicts', () => {
    const api = remote({ failSummary: true });
    assert.throws(() => publishEvaluation(review(), api.request), /interruption/);
    assert.equal(api.comments.size, 1);
    const result = publishEvaluation(review(), api.request);
    assert.equal(result.verdict, 'PASS'); assert.equal(api.comments.size, 2);
    assert.deepEqual(publishEvaluation(review(), api.request), result); assert.equal(api.comments.size, 2);
    assert.throws(() => publishEvaluation(review().replace('boundary checks', 'different checks'), api.request), /immutable/);
});
test('publication rejects stale heads, changed dependency commits and missing dependencies', () => {
    const api = remote({ dependencies: true });
    assert.throws(() => publishEvaluation(review(), api.request), /dependency set/);
    const body = review({ dependencies: [{ issueUrl: PARENT, headSha: B }] });
    api.pulls.get(2).head.sha = C;
    assert.throws(() => publishEvaluation(body, api.request), /head is stale/);
    api.pulls.get(2).head.sha = A; api.pulls.get(4).merged_at = '2026-09-23'; api.pulls.get(4).merge_commit_sha = C;
    assert.throws(() => publishEvaluation(body, api.request), /dependency is stale/);
    assert.equal(api.comments.size, 0);
});
function node(url = ISSUE, overrides = {}) {
    return { url, dependencies: [], closed: false, blocked: null, pr: { url: PR, headSha: A, state: 'open', merged: false, mergeSha: null }, evaluations: [], ...overrides };
}
test('queue allows accepted unmerged parents and invalidates changed descendant acceptance', () => {
    const parent = node(PARENT, { pr: { url: PARENT_PR, headSha: B, state: 'open', merged: false, mergeSha: null }, evaluations: [record({ id: 'parent-pass', issueUrl: PARENT, pullRequest: PARENT_PR, headSha: B })] });
    const child = node(ISSUE, { dependencies: [PARENT], evaluations: [record({ dependencies: [{ issueUrl: PARENT, headSha: B }] })] });
    assert.deepEqual(deriveQueue([child, parent]).map((item) => item.state), ['accepted', 'accepted']);
    parent.pr.merged = true; parent.pr.state = 'closed'; parent.pr.mergeSha = C;
    assert.deepEqual(deriveQueue([child, parent]).map((item) => item.state), ['merged', 'evaluate']);
    parent.pr.merged = false;
    assert.deepEqual(deriveQueue([child, parent]).map((item) => item.state), ['blocked', 'waiting']);
});
test('blocked work does not prevent an independent outcome from running', () => {
    assert.deepEqual(deriveQueue([node(ISSUE, { blocked: 'Missing decision' }), node(PARENT, { pr: null })]).map((item) => item.state), ['blocked', 'implement']);
    const self = node(ISSUE, { dependencies: [ISSUE] });
    assert.throws(() => deriveQueue([self]), /cyclic/);
});
test('queue requires merge for genuine fan-in and repairs current actionable findings', () => {
    const OTHER = 'https://github.com/test/repo/issues/5';
    const parents = [PARENT, OTHER].map((url) => node(url, { evaluations: [record({ id: url, issueUrl: url })] }));
    assert.equal(deriveQueue([node(ISSUE, { dependencies: [PARENT, OTHER] }), ...parents]).at(-1).state, 'waiting');
    assert.equal(deriveQueue([node(ISSUE, { evaluations: [record({ verdict: 'CHANGES', findings: [{ id: 'bad-value', blocking: true, state: 'open' }] })] })])[0].state, 'implement');
});
test('collector reads published history and current GitHub state together', () => {
    const api = remote(); publishEvaluation(review(), api.request);
    const result = collectQueue('test/repo', ID, api.request);
    assert.equal(result.queue.find((item) => item.url === ISSUE).state, 'accepted');
    api.pulls.get(2).head.sha = C;
    assert.equal(collectQueue('test/repo', ID, api.request).queue.find((item) => item.url === ISSUE).state, 'evaluate');
});

test('a newer orphan CHANGES detail prevents reuse of an older PASS', () => {
    const api = remote(); publishEvaluation(review(), api.request);
    api.failNextSummary();
    const repair = review({ id: '00000000-0000-4000-8000-000000000002', verdict: 'CHANGES', findings: [{ id: 'incorrect-value', blocking: true, state: 'open' }] });
    assert.throws(() => publishEvaluation(repair, api.request), /interruption/);
    assert.equal(collectQueue('test/repo', ID, api.request).queue.find((item) => item.url === ISSUE).state, 'reconcile');
    publishEvaluation(repair, api.request);
    assert.equal(collectQueue('test/repo', ID, api.request).queue.find((item) => item.url === ISSUE).state, 'implement');
});

test('missing detailed evidence blocks a surviving acceptance summary', () => {
    const api = remote(); publishEvaluation(review(), api.request);
    for (const [id, comment] of api.comments) if (comment.issue === 2) api.comments.delete(id);
    assert.equal(collectQueue('test/repo', ID, api.request).queue.find((item) => item.url === ISSUE).state, 'blocked');
});

test('a PASS requires current published acceptance for an unmerged parent', () => {
    const api = remote({ dependencies: true });
    const child = review({ dependencies: [{ issueUrl: PARENT, headSha: B }] });
    assert.throws(() => publishEvaluation(child, api.request), /no current accepted/);
    assert.equal(api.comments.size, 0);
    publishEvaluation(review({ id: '00000000-0000-4000-8000-000000000002', issueUrl: PARENT, pullRequest: PARENT_PR, headSha: B }), api.request);
    assert.equal(publishEvaluation(child, api.request).verdict, 'PASS');
    api.issues.get(3).state = 'closed';
    assert.throws(() => publishEvaluation(child, api.request), /closed outcome/);
});

test('recovered summaries cannot revive acceptance from before a boundary release', () => {
    const api = remote({ failSummary: true });
    api.issues.get(3).body = issueBody({ key: 'child', pullRequest: PARENT_PR, dependencies: [ISSUE] });
    assert.throws(() => publishEvaluation(review(), api.request), /interruption/);
    api.request(['api', 'repos/test/repo/issues/1/comments', '--method', 'POST'], JSON.stringify({ body: 'Boundary resolved; evaluate again.\n<!-- workflow-blocked: {"schema":1,"active":false,"reason":"Decision resolved"} -->' }));
    publishEvaluation(review(), api.request);
    const child = review({ id: '00000000-0000-4000-8000-000000000002', issueUrl: PARENT, pullRequest: PARENT_PR, headSha: B, dependencies: [{ issueUrl: ISSUE, headSha: A }] });
    assert.throws(() => publishEvaluation(child, api.request), /incomplete or missing evidence/);
});
