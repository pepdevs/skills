---
name: critique
description: Stress-test a plan PR, explore better design and architecture options, and publish evidence-supported corrections and findings before confirmation.
---

# Critique

Take a plan PR and the revision to review. Own the review, evidence-supported plan corrections, and publication.
Apply `writing-style` to the plan changes, review, PR updates, and comments.

Read the plan, applicable repository instructions, and the code and evidence behind its claims.
Test whether its intended outcome is clear, its choices are justified, its implementation is
feasible, and its acceptance can be observed. For each acceptance item, ask whether a strict
evaluator could keep finding counterexamples after every repair. Rewrite such an item as the
mechanism that enforces it and the boundary it excludes. Look for missing dependencies,
incompatible contracts, large unbounded work, and assumptions that force implementers to invent
product behavior.

## Challenge the approach

Treat the proposed tools, abstractions, and system boundaries as choices to examine. Explore credible alternatives where another approach could better serve the intended outcome.
Check whether existing conventions fit this work and what would justify changing them.
Apply this to decisions the user already made. When a simpler design would meet the outcome with
fewer parts, hosts or privileges, present it as a decision for the user with its costs, even if the
capsule calls the current choice settled.

Compare the proposed approach with simpler or better-fitting alternatives at consequential design decisions.
Consider implementation complexity, performance requirements, maintainability, testability, operational cost, and migration effort where they affect the choice.
For example, compare an ORM with direct SQL when query control or abstraction cost matters.
Examine whether responsibilities belong together or in separate modules, services, or repositories.
Account for ownership, coupling, deployment, and coordination costs when challenging those boundaries.

Ground comparisons in repository evidence and the actual workload. Separate demonstrated advantages from hypotheses; identify a focused experiment when evidence cannot settle a consequential trade-off.
Recommend the strongest option and explain its costs, why it improves the outcome, and what would change the recommendation.
Keep comparisons proportional to uncertainty and impact. Preserve a justified approach when alternatives offer no material improvement.

## Revise and publish

Commit corrections supported by repository evidence to the same plan branch, using `git`.
Change only the plan's decisions, acceptance, and boundaries, following the plan contract in the
installed `clarify` skill's `references/plan-file.md`. State each correction in the plan in one or two
sentences. Keep each acceptance item's one-line check, such as "Checked by a table test" or the
command that shows it, and the exact interfaces or configuration lines the operator approved.
Keep evidence, reproductions, rejected alternatives, and dispositions in the review, not
the plan. Put implementation checks, such as test cases, verification commands, and configuration
details, in the review under "For outcomes", where `to-outcomes` carries them into outcome issues.
When a revision grows the plan by more than a third, cut it back or explain in the review why the
plan needs the added text.
Present consequential product or architecture forks for user decision. Do not silently choose one.
An architectural recommendation remains a proposal until the user resolves that choice.
Keep the proposal drafted until the user confirms the revised plan. A confirmed plan needing a
material revision becomes a new proposal requiring renewed confirmation.

Publish a review that identifies the judged and resulting commits, findings, evidence, dispositions,
and unresolved choices. Give each material finding a stable identity. Explain accepted or rejected
findings without prescribing a fixed table. Identify foundational decisions changed by the revision
and the downstream assumptions that need reconsideration. A review with no findings needs no edit
merely to manufacture a new commit.

Fetch the PR again before pushing. If another author changed its head, reconcile those changes and
review the resulting plan. Read the published changes and review back. Return actual publication links
and any unresolved decisions. Human decisions control confirmation and merges.
