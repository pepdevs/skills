---
name: project
description: 'Project: how a repository is kept. Which document owns each fact, settled behaviour as use cases proved by golden tests when a plan is done, adapter tests for external systems, a layout that names what code does, operator facts in data/, and rules in AGENTS.md with their reason and revisit condition. Use when starting or auditing a repository, adding behaviour or a folder, restructuring, or when a change alters a rule, term or structure.'
---

# Project

Keep every repository in one shape, so each session finds the same order and adds to it instead of
eroding it. `writing-style` owns the prose; `clarify` owns plans.

Read the repository's `AGENTS.md` and `SYSTEM.md` first. A rule a test enforces wins over this
skill's text. Add a rule the repository lacks as its own change, outside an unrelated feature.

## Documents

| Document | Owns | Update when |
|---|---|---|
| `README.md` | How to install and use it | A command or setup step changes |
| `SYSTEM.md` | Layout, how a command flows, where new code goes | A folder or top-level file is added, moved or removed |
| `AGENTS.md` | Rules for changing the code, each with its reason and revisit condition | A rule is added, changed or retired |
| `docs/use-cases.md` | Behaviour: the operator's questions and the commands that answer them | Behaviour is added or removed |
| `data/` | Operator-kept facts: prices, plans, limits, tiers | A fact changes |
| `CONTEXT.md` | Project terms, read `references/context.md` | A term is settled |
| `POLICIES.md` | Consequential business rules, read `references/policy.md` | A business rule is implemented |
| `docs/plans/` | Future state until it is built, owned by `clarify` | Before the work |

Each fact has one owner. Create a document the first time it has content. A repository keeps no
decision-record directory: a rule's reason sits beside the rule in `AGENTS.md`, the full debate
stays in the plan that made the decision, and git keeps the history.

## Rules

1. **Behaviour ends as a use case.** Name the operator's question when the work starts. Once the
   behaviour is settled, add the question and the command that answers it to `docs/use-cases.md`
   with its golden file. Golden tests run every use case and fail on a command no use case names.
   Deleting a use case deletes the code that served only it. Read `references/use-cases.md`.
2. **Test what moves only once it stops moving.** The project's schema, API and screens change
   while a plan is in progress: write and fix no tests for them, run the work, inspect it in the
   browser at desktop and phone widths, and try it on real data. A plan ends with a stability
   check: refresh the use cases it settled, run the golden files and review the diffs. External
   systems change on their own, so adapter tests over faked responses run in every check.
   Browser, scenario and unit tests are out. Static checks (lint, types, architecture boundaries)
   stay. Read `references/tests.md`.
3. **The layout names what the code does.** A thin entry point, one file per group of use cases,
   one folder per external system, operator facts in `data/` as JSON with their sources, and
   `SYSTEM.md` as the map. Read `references/layout.md`.
4. **Each rule carries its reason and when to revisit it.** An `AGENTS.md` rule takes at most two
   lines: the rule, one clause of reason, and the condition that reopens it. A static check enforces the
   rule when one can check it. Read `references/agents.md`.
5. **Plans follow `clarify`**: Purpose and success, Principles, Increments, Scope and boundaries,
   Open questions.

## Record what changed

- Write a fact into its owning document only when code, configuration or direct observation proves
  it. A proposed state stays in its plan.
- Surface a claim that no evidence supports to the user instead of writing it.
- When a document and the code disagree, show the conflict before editing either.
- Update the smallest section that owns the fact, and remove the statement it replaces.

## Audit a repository

Use this path when the user asks to audit, orient or adopt this shape in a repository.

1. Read the documents above and the evidence behind them: manifests, entry points, configuration,
   tests and deployment definitions.
2. Classify each finding as aligned, missing, stale, contradictory or unsupported. Skip package
   versions and directory listings that the tree already shows.
3. Propose the smallest changes, each naming the document, the evidence and the statement it adds
   or removes. For an existing decision-record directory, propose folding each decision still in
   force into an `AGENTS.md` rule and deleting the rest.
4. Wait for confirmation before writing. The audit authorizes reading only.

## Before finishing a change

- Work in progress was inspected by running it, with no test written or fixed for it.
- Once settled, every new command has a use case and a golden file; a removed use case left no
  code behind.
- The change adds no test other than a golden file or an adapter test for an external system.
- A finished plan ended with its stability check, and the golden files pass.
- Every new folder or top-level file has its line in `SYSTEM.md`, and new code sits where
  `SYSTEM.md` says it goes.
- No price, plan, limit or tier is a constant in code.
- Every rule added to `AGENTS.md` states its reason and revisit condition.
- The check passes under 10 seconds.
