---
name: workflow-build
description: Decompose a confirmed plan in this session, then run fresh implement and evaluate sessions through wf for its outcome issues until accepted or blocked.
---

# Workflow build

Run this skill in the orchestrator session. Apply the installed `writing-style` skill to every written artifact.
Run the installed `to-outcomes` skill here. Launch every implementation and evaluation with `wf run` in a fresh session.
The modular skills publish their GitHub artifacts; the orchestrator schedules work and reconciles execution and acceptance.

CLI orchestration: read [execution](references/execution.md) before launching or resuming work.
Read the installed `delegate` skill and its `references/skill-adapter.md` for capsules, routes, publication and result markers.
Use the installed `gh-stack` skill when outcomes have dependent branches.

## Reconstruct the queue

Read the plan at its explicitly confirmed revision. Run or reconcile to-outcomes without another
approval gate. Read existing issues, linked PRs, all acceptance-history comments, checkpoints, and
current dependency commits. Keep conversation context small: carry identities and next actions,
then read the selected outcome's artifacts when launching it. No run issue is required.

Validate the dependency graph and process executable outcomes sequentially. Preserve existing
execution history on each issue.
Reconcile incomplete verdict publication before advancing; a surviving older PASS cannot override
a newer detailed evaluation. Missing detailed evidence blocks acceptance.
The [queue helper](scripts/queue.mjs) derives readiness and stale acceptance from a normalized
snapshot; [queue input](references/queue.md) documents its data. GitHub remains authoritative.

## Execute one outcome

1. Reconcile its actual PR head and dependencies. Use the installed `gh-stack` skill for stack creation, submission, merge,
   synchronization, and rebase. Inspect resulting JSON state; a successful process exit alone does
   not prove stack synchronization succeeded.
2. Invoke the installed `implement` skill with `wf run`. Start a fresh session for initial work,
   repairs, and continuations. An existing PR is always the publication target.
3. Reconcile the attempt before another launch. Require a valid result and read its GitHub artifacts
   back. A checkpoint with useful progress continues through a fresh session on the same issue and
   PR, never a resumed provider session.
4. When implementation is ready, invoke the installed `evaluate` skill in a fresh session at the
   actual PR head. Take the first `wf route evaluate` route unless `delegate`'s routing reference
   calls for escalation. It publishes the PR verdict and issue history itself.
5. Verify the verdict's exact head and dependency commits against GitHub, and record the run's
   session id and model on the issue. An interrupted publication reconciles the existing evaluation
   ID; do not reevaluate merely to repair a record. PASS advances the queue. CHANGES launches another
   fresh implementation repair.

## Progress and boundaries

The installed `to-outcomes` skill owns session sizing. Useful continuations do not consume failure
retry allowances. Keep published checkpoints brief and sufficient for fresh-context recovery.

Continue repairs while they make demonstrable progress against acceptance or blockers. Compare
actual evidence and stable findings, not changed wording, extra commits, or a builder's claim.
When a finding ID returns open after a repair, write the next capsule around the class of bypass the
findings share, and require an adversarial self-review: list every path to the property, prove each
with a test, and record the table in the PR body. A finding ID that stays open after two repairs
blocks this outcome, even when each repair closed the instance it named. Bring the owner the
remaining class and whether the criterion needs a boundary. Apply the same
stall rule to repeated continuations. Record the concrete boundary on its issue and continue other
independent work. A user-authorized continuation retains all history.

Unresolved consequential decisions, unavailable required proof, and exhausted execution capacity
are visible boundaries. Preserve recoverable work. When no outcome can advance, checkpoint and
return the accepted, blocked, and unfinished issue URLs with the next needed action. Reinvocation
reconstructs durable state rather than restarting the plan.

## Dependencies and merges

Build on accepted unmerged commits using linear stacks. Prefer one code parent; genuine multi-parent
work waits for required merges while other work proceeds. Humans may merge at any point during a
run. Fetch current state before launch and before accepting results. Reconcile actual merge strategy,
retarget or rebase descendants, then repeat affected checks and acceptance at changed commits.

PASS means ready for human review. Close an outcome issue only after its PR merges. When the last
increment's PR merges and every increment names its pull request, set the plan's status to
`implemented` with `implemented_at` in a pull request. A closed,
unmerged PR is stopped work. Human decisions control merges. Keep historical verdicts, but never
reuse them after their recorded head or dependency commits change.
