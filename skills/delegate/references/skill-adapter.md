# Installed-skill execution

Use this adapter from `workflow-plan` or an orchestrating session. The destination harness must have the
modular skills and their dependencies installed. The capsule names the installed skill; the
harness loads it natively. Do not copy its instructions into the capsule.

## Capsule

Write the context file with the exact artifact revision, bounded task, evidence paths, dependencies
at accepted commits, allowed checks, and remaining human decisions. For an outcome issue, start from
the generated skeleton, which reads the issue, its PR head, dependencies and open findings from
GitHub, then add the remaining work, checks and boundaries:

```bash
node <delegate-skill>/scripts/skill-adapter.mjs context <issue-url> > context.md
node <delegate-skill>/scripts/skill-adapter.mjs capsule <critique|implement|evaluate> <issue-or-pr-url> <context.md> <capsule.md>
```

## Launch per role

All three roles publish, so each runs with `--write` in its own worktree, created from the target's
actual head after fetching it:

```bash
wf run <harness> <model> -i critique-capsule.md -k critique -p <plan-pr-worktree> --plan <owner/repo>#<number> --write > critique-run.txt
wf run <harness> <model> -i implement-capsule.md -k implement -p <outcome-worktree> --plan <owner/repo>#<number> --write > implement-run.txt
wf run <harness> <model> -i evaluate-capsule.md -k evaluate -p <pr-head-worktree> --plan <owner/repo>#<number> --write > evaluate-run.txt
```

Choose the first route from `wf route <skill> -x <authors>`. Count critics who revise the plan
among its authors. Use [routing](routing.md) for escalation and record the reason beside the verdict.

Each role owns different publication:

- **critique** edits the plan on its branch and publishes its review on the plan PR.
- **implement** edits scoped source, publishes the PR, and records it with
  `node <to-outcomes-skill>/scripts/outcomes.mjs link-pr <issue-url> <pr-url>`.
- **evaluate** runs checks and publishes its review with
  `node <evaluate-skill>/scripts/acceptance.mjs publish <review-file>`. It writes the review file
  outside the reviewed worktree and leaves reviewed source unchanged.

State the role's boundary in the capsule. `--write` removes the harness's permission checks, so the
worktree and the capsule are the only limits: inspect the actual branch, PR and comments afterwards.

## Result

The worker's reply ends with readable links and one marker:

```html
<!-- workflow-result: {"schema":1,"status":"complete","pullRequest":"https://github.com/owner/repo/pull/13","headSha":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"} -->
```

Validate it from the saved run output:

```bash
node <delegate-skill>/scripts/skill-adapter.mjs result <run.txt>
```

- `complete`: the skill finished its job. For implementation, that hands the PR to evaluation.
- `checkpoint`: useful work is published and needs a fresh continuation on the same PR.
- `blocked`: a named boundary; PR and head may both be null when nothing was published.

Read the PR and issue back and compare the actual head and links with the marker. Record the run on
the issue with the generated line, adding the next action as the note:

```bash
gh issue comment <issue-url> -b "$(node <delegate-skill>/scripts/skill-adapter.mjs record <run.txt> <role> <model> '<note>')"
```

GitHub holds the record;
`wf models` reads cost, time and completion back from the logs.

## Continuation

Continue a checkpoint with a new `wf run` on the same PR, a revised capsule naming the remaining
work, and a fresh worktree at the PR's current head. Useful continuations do not consume failure
retries. Before another writer starts, reconcile any publication the previous run left half done.
