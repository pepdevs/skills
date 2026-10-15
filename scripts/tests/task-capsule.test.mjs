import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { capsuleProblems } from '../../skills/delegate/scripts/validate-task-capsule.mjs';
import { makeCapsule, parseResult } from '../../skills/delegate/scripts/skill-adapter.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
test('capsules validate transport limits while preserving expressive structure', () => {
    assert.deepEqual(capsuleProblems('Review the referenced outcome at its pinned head. Report acceptance evidence.'), []);
    assert.deepEqual(capsuleProblems('## Goal\nReview the change.\n\n## Sources\nRead the issue.'), []);
    assert.match(capsuleProblems('<!-- unfilled -->')[0], /readable task/);
    assert.match(capsuleProblems('é'.repeat(32769))[0], /65,536/);
});
test('adapter explicitly invokes the installed skill and binds publication result', () => {
    const body = makeCapsule('implement', 'https://github.com/a/b/issues/1', 'Only change the CLI parser; run its focused tests.');
    assert.match(body, /installed implement skill/);
    assert.match(body, /writing-style/);
    assert.match(body, /exactly one HTML comment in this form: <!-- workflow-result:/);
    const result = { schema: 1, status: 'checkpoint', pullRequest: 'https://github.com/a/b/pull/2', headSha: 'a'.repeat(40) };
    assert.deepEqual(parseResult(`Progress and remaining work.\n<!-- workflow-result: ${JSON.stringify(result)} -->`), result);
    assert.deepEqual(parseResult(`Progress and remaining work.\n<!-- workflow-result ${JSON.stringify(result)} -->`), result);
    assert.throws(() => parseResult(`<!-- workflow-result: ${JSON.stringify({ ...result, headSha: null })} -->`), /full commit/);
    assert.throws(() => makeCapsule('run-plan', 'https://github.com/a/b/issues/1', 'context'), /unknown/);
});
test('capsule starts with its plan, issue and PR', () => {
    const first = (artifact, context) => makeCapsule('evaluate', artifact, context).split('\n')[0];
    const plan = '- Plan: https://github.com/a/b/blob/main/docs/plans/0007-orchestrator-context.md';
    const issue = '- Issue: https://github.com/a/b/issues/57 (Title). Read it in full.';
    const pr = '- PR: https://github.com/a/b/pull/59 at head abc.';
    assert.equal(first('https://github.com/a/b/issues/57', `${issue}\n${plan}\n- PR: none yet.`), 'plan 0007 · issue #57: https://github.com/a/b/issues/57');
    assert.equal(first('https://github.com/a/b/issues/57', `${issue}\n${plan}\n${pr}`), 'plan 0007 · issue #57 · PR #59: https://github.com/a/b/issues/57');
    assert.equal(first('https://github.com/a/b/pull/59', `${issue}\n${plan}\n${pr}`), 'plan 0007 · issue #57 · PR #59: https://github.com/a/b/pull/59');
    assert.equal(first('https://github.com/a/b/pull/54', 'Scope.'), 'PR #54: https://github.com/a/b/pull/54');
});
test('capsule CLI rejects invalid UTF-8', () => {
    const directory = mkdtempSync(path.join(tmpdir(), 'capsule-'));
    try {
        const file = path.join(directory, 'input');
        writeFileSync(file, Buffer.from([0xff]));
        assert.equal(spawnSync(process.execPath, [path.join(root, 'skills/delegate/scripts/validate-task-capsule.mjs'), file]).status, 1);
    } finally { rmSync(directory, { recursive: true, force: true }); }
});
test('run records and context skeletons carry identities without guessing', async () => {
    const { runRecord, contextSkeleton } = await import('../../skills/delegate/scripts/skill-adapter.mjs');
    const result = { schema: 1, status: 'complete', pullRequest: 'https://github.com/a/b/pull/2', headSha: 'b'.repeat(40) };
    const run = `Session    codex 0123-abcd\nExit       code 0 after 0:03:06\nCost       $0.4 · peak context 65k · 1 turns\n\nReply\nDone.\n<!-- workflow-result: ${JSON.stringify(result)} -->`;
    assert.equal(runRecord(run, { role: 'implement', model: 'gpt-x', note: 'Next: evaluation.' }),
        'Implement run: `wf run codex gpt-x`, session `0123-abcd`, 0:03:06, $0.4, peak context 65k. Result complete: https://github.com/a/b/pull/2 at `bbbbbbb`. Next: evaluation.');
    assert.throws(() => runRecord('Reply\nno header', { role: 'implement', model: 'm' }), /Session/);
    const marker = { schema: 1, key: 'k', planId: 'p', planUrl: 'https://github.com/a/b/blob/c/docs/plans/1.md', dependencies: [], pullRequest: 'https://github.com/a/b/pull/2' };
    const evaluation = { verdict: 'CHANGES', headSha: 'b'.repeat(40), findings: [{ id: 'F1', blocking: true, state: 'open' }, { id: 'F2', blocking: false, state: 'closed' }] };
    const text = contextSkeleton({
        issue: { url: 'https://github.com/a/b/issues/1', title: 'T', body: `x\n<!-- workflow-outcome: ${JSON.stringify(marker)} -->` },
        pr: { url: 'https://github.com/a/b/pull/2', headRefOid: 'b'.repeat(40), headRefName: 'feat/x', baseRefName: 'main', comments: [{ url: 'u', body: `<!-- workflow-evaluation: ${JSON.stringify(evaluation)} -->` }] },
    });
    assert.match(text, /PR: https:\/\/github.com\/a\/b\/pull\/2 at head b{40}, branch `feat\/x`, base `main`/);
    assert.match(text, /Latest evaluation: CHANGES .* Open findings: F1 \(blocking\)\./);
    assert.doesNotMatch(text, /F2/);
    assert.match(text, /Dependencies: none/);
});
