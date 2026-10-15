import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { parseOutcome, ensureOutcome, linkPullRequest } from '../../skills/to-outcomes/scripts/outcomes.mjs';

const A = 'a'.repeat(40);
const ID = '00000000-0000-4000-8000-000000000001';
const ISSUE = 'https://github.com/test/repo/issues/1';
const PR = 'https://github.com/test/repo/pull/2';
const script = fileURLToPath(new URL('../../skills/to-outcomes/scripts/outcomes.mjs', import.meta.url));

function contract(overrides = {}) {
    return {
        schema: 1,
        key: 'visible-result',
        planId: ID,
        planUrl: `https://github.com/test/repo/blob/${A}/docs/plans/0001-result.md`,
        dependencies: [],
        pullRequest: null,
        ...overrides,
    };
}

function issueBody(overrides = {}) {
    return `The operator sees the result. Acceptance: the visible value matches the source.\n\n<!-- workflow-outcome: ${JSON.stringify(contract(overrides))} -->`;
}

function github(seed = []) {
    const issues = new Map(seed.map((issue) => [issue.number, issue]));
    const calls = [];
    let next = 10;
    function request(args, input) {
        const endpoint = args[1];
        const method = args.includes('--method') ? args[args.indexOf('--method') + 1] : 'GET';
        calls.push({ endpoint, method });
        const payload = input ? JSON.parse(input) : null;
        if (endpoint === 'repos/test/repo/issues?state=all&per_page=100') return [structuredClone([...issues.values()])];
        if (endpoint === 'repos/test/repo/issues' && method === 'POST') {
            const number = next++;
            const created = { number, html_url: `https://github.com/test/repo/issues/${number}`, state: 'open', ...payload };
            issues.set(number, created);
            return structuredClone(created);
        }
        const match = endpoint.match(/^repos\/test\/repo\/issues\/(\d+)$/);
        if (match) {
            const issue = issues.get(Number(match[1]));
            if (method === 'PATCH') Object.assign(issue, payload);
            return structuredClone(issue);
        }
        throw new Error(`unexpected request ${args}`);
    }
    return {
        request,
        issues,
        calls,
        listed: () => calls.some((call) => call.endpoint.includes('state=all')),
        posts: () => calls.filter((call) => call.method === 'POST' && call.endpoint === 'repos/test/repo/issues'),
    };
}

function unsizedIssue() {
    return { number: 1, html_url: ISSUE, state: 'open', body: issueBody() };
}

test('the outcome contract states size bounds and the breakdown states each issue size', () => {
    const contractText = readFileSync(new URL('../../skills/to-outcomes/references/outcome-contract.md', import.meta.url), 'utf8');
    const skill = readFileSync(new URL('../../skills/to-outcomes/SKILL.md', import.meta.url), 'utf8');
    assert.match(contractText, /`size` is the expected peak context/);
    assert.match(contractText, /S is under 60,000 tokens/);
    assert.match(contractText, /M is from 60,000 to under 120,000/);
    assert.match(contractText, /L is from 120,000 through 200,000/);
    assert.match(skill, /State each issue's size there as S, M, or L/);
    assert.match(skill, /Write that same size in its outcome marker/);
});

test('validate accepts an otherwise-valid marker without size and keeps a valid size', () => {
    const bare = issueBody();
    assert.equal(Object.hasOwn(parseOutcome(bare), 'size'), false);
    assert.equal(parseOutcome(issueBody({ size: 'L' })).size, 'L');
    assert.throws(() => parseOutcome(issueBody({ size: 'XL' })), /size must be S, M or L/);
    const dir = mkdtempSync(join(tmpdir(), 'outcome-size-'));
    const file = join(dir, 'body.md');
    writeFileSync(file, bare);
    const validated = JSON.parse(execFileSync(process.execPath, [script, 'validate', file], { encoding: 'utf8' }));
    assert.equal(Object.hasOwn(validated, 'size'), false);
});

test('ensure creates each valid size and refuses a missing or invalid size after recovery lookup', () => {
    const api = github();
    for (const size of ['S', 'M', 'L']) {
        const body = issueBody({ key: `sized-${size.toLowerCase()}`, size });
        const created = ensureOutcome('test/repo', `Sized ${size}`, body, api.request);
        assert.equal(created.created, true);
        const stored = [...api.issues.values()].find((issue) => issue.html_url === created.url);
        assert.equal(stored.body, body);
        assert.equal(parseOutcome(stored.body).size, size);
    }
    for (const [key, size] of [['rejected-missing', undefined], ['rejected-xl', 'XL'], ['rejected-lower', 's'], ['rejected-empty', '']]) {
        const gate = github();
        const overrides = { key };
        if (size !== undefined) overrides.size = size;
        assert.throws(() => ensureOutcome('test/repo', 'Rejected', issueBody(overrides), gate.request), /size must be S, M or L/);
        assert.equal(gate.posts().length, 0);
        assert.equal(gate.listed(), true);
    }
});

test('ensure recovers an existing issue whose marker has no size', () => {
    const api = github([unsizedIssue()]);
    assert.equal(Object.hasOwn(parseOutcome(api.issues.get(1).body), 'size'), false);
    const recovered = ensureOutcome('test/repo', 'Result', issueBody(), api.request);
    assert.deepEqual(recovered, { created: false, url: ISSUE });
    assert.equal(api.posts().length, 0);
    assert.equal(ensureOutcome('test/repo', 'Result', issueBody({ size: 'XL' }), api.request).created, false);
    assert.equal(api.posts().length, 0);
});

test('link-pr keeps a valid size and still links a marker without one', () => {
    for (const size of ['S', 'M', 'L']) {
        const api = github([unsizedIssue()]);
        api.issues.get(1).body = issueBody({ size });
        linkPullRequest(ISSUE, PR, api.request);
        const linked = parseOutcome(api.issues.get(1).body);
        assert.equal(linked.size, size);
        assert.equal(linked.pullRequest, PR);
        assert.match(api.issues.get(1).body, new RegExp(`"size":"${size}"`));
    }
    const api = github([unsizedIssue()]);
    linkPullRequest(ISSUE, PR, api.request);
    const linked = parseOutcome(api.issues.get(1).body);
    assert.equal(Object.hasOwn(linked, 'size'), false);
    assert.equal(linked.pullRequest, PR);
});
