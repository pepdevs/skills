# Orchestrate with wf

The invoking session owns the loop. Each `wf run` launches one fresh worker and prints its session
id, exit, cost and reply. Run `to-outcomes` in the invoking session. Delegate implementation,
repairs and evaluation through the installed modular skills.

## Prepare

Read the installed `delegate` skill and its `references/skill-adapter.md`. Resolve
`<delegate-skill>`, `<evaluate-skill>` and `<to-outcomes-skill>` on this host. Check the CLI:

```bash
wf help
wf usage
```

Run commands from the outcome's repository checkout; its origin must match the issue's
repository. Keep capsules, run output and review files in a private directory outside source.

## Implement

1. Collect the queue with [queue reconstruction](queue.md) and select an executable outcome.
2. Fetch the base with accepted dependencies, or the existing PR's head, and create a worktree there.
3. Generate `implement-context.md` with `skill-adapter.mjs context <issue-url>`, then add the remaining
   work, verification-skill paths, checks and unresolved decisions. For repairs, name the actionable
   finding IDs from the skeleton's open findings.
4. Build the capsule and choose the route:

   ```bash
   node <delegate-skill>/scripts/skill-adapter.mjs capsule implement <issue-url> implement-context.md implement-capsule.md
   wf route implement -x <orchestrator model>
   ```

5. Launch, in the background when the host allows:

   ```bash
   wf run <harness> <model> -i implement-capsule.md -k implement -p <worktree> --plan <owner/repo>#<number> --write > implement-run.txt
   ```

6. Watch with `wf status`. Stop a stuck or spiralling run with `wf stop <session-id-prefix>` and
   relaunch with a narrower capsule or the next route.

## Reconcile implementation

Require exit code 0, then validate the marker:

```bash
node <delegate-skill>/scripts/skill-adapter.mjs result implement-run.txt
```

Read the actual PR and issue back and compare their identity and head with the marker. Record the
run with `skill-adapter.mjs record`, as the adapter describes.

- `complete`: evaluate the published head.
- `checkpoint`: launch a fresh continuation on the same PR with the remaining work.
- `blocked`: record the boundary on the issue and try another independent outcome.

## Evaluate

Fetch the PR and dependency commits again and create a worktree at the PR head. Write
`evaluate-context.md` with those exact revisions, the acceptance criteria, verification recipes,
evidence and prior finding IDs. Tell the evaluator to write its review file outside the worktree.

```bash
node <delegate-skill>/scripts/skill-adapter.mjs capsule evaluate <pr-url> evaluate-context.md evaluate-capsule.md
wf route evaluate -x <orchestrator model>,<builder models>
wf run <harness> <model> -i evaluate-capsule.md -k evaluate -p <pr-worktree> --plan <owner/repo>#<number> --write > evaluate-run.txt
```

Take the first route `wf route evaluate` prints. For escalation, follow the installed `delegate`
skill's `references/routing.md` and record the reason beside the verdict.

Reconcile as above. Read the detailed PR evaluation and the matching issue-history record, and verify
the judged head and dependencies against GitHub. Note the route's independence beside the verdict.

- PASS: collect the queue again and continue the next executable outcome.
- CHANGES: launch a fresh implementation repair on the same PR with the actionable findings, then
  evaluate again.
- BLOCKED: preserve work, record the boundary, and continue independent outcomes.

## Recover interrupted execution

`wf status` marks a run `ended` when its process is gone mid-turn. Read `wf summary <id>`, the
worktree, the branch and the PR before launching a replacement, and reconcile any half-done
publication first. Preserve the PR target and the issue's history.

Apply the skill's progress and capacity boundaries. When `wf usage` shows no plan with headroom and
nothing can run, checkpoint and return the accepted, blocked and unfinished issue links with the next
needed action.
