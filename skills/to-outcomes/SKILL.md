---
name: to-outcomes
description: Split a confirmed plan into session-sized GitHub outcome issues and a plan-numbered dependency overview with explicit blockers and verifiable acceptance.
---

# To outcomes

Own GitHub outcome issues for agent sessions run through `wf`: session sizing, dependencies, metadata,
the overview issue, and publication. `ticket-authoring` owns slicing and issue content. Apply
`writing-style` to every written artifact.

## Inspect

Read the plan at its explicitly confirmed revision. Inspect relevant code, project language, and architectural decisions before choosing boundaries.
Read the plan PR's critique reviews and carry their "For outcomes" checks into the matching outcome issues.

Find existing outcome issues, including closed ones. Reuse their identities and preserve execution history.

## Slice

Slice with the installed `ticket-authoring` skill's `references/slicing.md`. One rule replaces its
ticket-size signal: each outcome fits one fresh implementation session, including verification.
Target below 200K tokens without compaction; use this for sizing, not a hard cutoff.

## Connect

Record only dependencies that gate implementation or proof. Explain what each blocker supplies; independent outcomes need no ordering dependency.

Use `gh-stack` when building on accepted unmerged PRs. Prefer one code parent; genuine multi-parent work waits for required merges.

Place each issue in the repository that owns its implementation PR. The confirmed plan can live elsewhere.

## Write

Write each issue body with the installed `ticket-authoring` skill's `references/ticket.md`. Add what
[the outcome contract](references/outcome-contract.md) requires: the plan line, merge-aware
blockers, the metadata marker, and acceptance history.
A fresh implementer must understand the task; an evaluator must judge completion without the prior conversation.
Link the plan for settled decisions instead of restating them.

Show the breakdown with each title, delivered result, size, and blockers. State each issue's size there as S, M, or L. Write that same size in its outcome marker. Use the token bounds in the outcome contract. Check plan coverage, overlapping scope, session size, and dependency cycles.

Plan confirmation authorizes decomposition and publication. Changes to promised behavior or acceptance require renewed confirmation.

## Publish

Assign stable descriptive keys. Publish prerequisites first so dependent issues can link their actual URLs.
Validate each body, then use the helper to create or recover its issue:

```bash
node <to-outcomes-skill>/scripts/outcomes.mjs validate <body-file>
node <to-outcomes-skill>/scripts/outcomes.mjs ensure <owner/repo> <title> <body-file>
```

Read each issue back and verify its content and links. Reconcile existing issues without overwriting their discussion or acceptance history.
When a plan has more than three implementation issues, publish one plan-numbered overview issue
after them; fewer fit in each issue's blockers. Show their direct
dependencies in a graph and linked table, including gates that require merged PRs. Link the
overview from each implementation issue and, when in scope, the plan document. Keep the overview
as an issue; repository tooling is warranted only when an ongoing repository workflow uses it.
Return the overview URL, when one exists, and ordered implementation issue URLs, and explain how they cover the plan.
