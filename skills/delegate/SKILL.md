---
name: delegate
description: Run a critic, builder, or evaluator in a fresh session with a chosen harness and model through wf, including installed modular skills with their own publication responsibilities.
---

# Delegate

`wf` (the Workflow CLI) chooses a model, launches one fresh headless session, and watches it. The
caller supplies the bounded task and reconciles the result. Apply `writing-style` to every capsule,
report, and publication.

To run `critique`, `implement`, or `evaluate`, read [the installed-skill adapter](references/skill-adapter.md).
The adapter keeps each skill's own publication authority.

## Choose the route

```bash
wf route <skill> -x <author models, comma-separated>
```

Take the first row unless the user named a model or [routing](references/routing.md) calls for
escalation. Pass every model that authored the judged work to `-x`: the orchestrator and any builder
or plan-revising critic. Record why you took a later route.

## Prepare the workspace

Commit the source the worker must read. Create a git worktree for a worker that edits, runs checks
or publishes, so it works at an exact revision beside the caller's checkout:

```bash
git worktree add ../<repo>-<role>-<short-id> <base-or-pr-branch>
```

Write a capsule with the task, artifact identity, exact revision, evidence worth reading, permitted
checks, expected result, and human boundaries. Use [the starting point](assets/task-capsule.md) when
useful. Keep conversation history out; link durable artifacts instead. Validate it:

```bash
node <delegate-skill>/scripts/validate-task-capsule.mjs <capsule.md>
```

## Launch

```bash
wf run <harness> <model> -i <capsule.md> -k <skill> -p <worktree> [--plan <owner/repo>#<number>] [--write] [-e <effort>] > <run.txt>
```

- Without `--write` the session may only read: use it for research and review that publishes nothing.
- With `--write` every permission check is off. Use it only inside the worktree, for work that edits,
  runs checks, or publishes.
- `wf run` waits for the session. Run it in the background when the host allows and keep working.
- `wf` records the skill, the launching session and the plan in the new session's first prompt line.
- Pass `--plan` when the work serves a numbered plan, so `wf plan <number>` counts its cost.

## Watch

```bash
wf status
```

The run appears indented under the caller's session. `stuck` means no event for 10 minutes or one
tool running 30; a spiralling flag names the pattern. End a run that makes no progress with
`wf stop <session-id-prefix>`, then relaunch with a narrower capsule or another route.

## Reconcile

`<run.txt>` holds the session id, exit, cost, peak context and the reply. Require exit code 0 and a
reply. Check the actual artifacts: files in the worktree, the pushed branch, the PR and its comments.
A successful exit does not establish acceptance. For an installed skill, validate its result marker
as the adapter describes.

For a failed or stopped run, read `wf summary <session-id-prefix>` and the worktree before another
launch. Preserve useful work; a continuation is a new `wf run` with a revised capsule, never a
resumed provider session.
