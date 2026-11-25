---
name: critique
description: Stress-test a draft plan in the repository's plan inbox or a plan PR, explore better design and architecture options, and publish evidence-supported corrections and findings before confirmation.
---

# Critique

Take a draft plan and the revision to review: a plan in the repository's plan inbox, or a plan PR.
Own the review, evidence-supported plan corrections, and publication.
Apply `writing-style` to the plan changes, review, PR updates, and comments.

**With a plan inbox.** The plan inbox, when the repository has one, holds draft plans as numbered
revisions. Its README gives the exact syntax of its commands. Run its open command with the plan
number or page; it prints the paths of the latest revision's plan, view and asset folder. Review
that revision and edit those files.

**Without one.** Check out the plan PR's branch at the revision to review.

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
capsule, the brief a launcher gives this session, calls the current choice settled.

Compare the proposed approach with simpler or better-fitting alternatives at consequential design decisions.
Consider implementation complexity, performance requirements, maintainability, testability, operational cost, and migration effort where they affect the choice.
For example, compare an ORM with direct SQL when query control or abstraction cost matters.
Examine whether responsibilities belong together or in separate modules, services, or repositories.
Account for ownership, coupling, deployment, and coordination costs when challenging those boundaries.

Ground comparisons in repository evidence and the actual workload. Separate demonstrated advantages from hypotheses; identify a focused experiment when evidence cannot settle a consequential trade-off.
Recommend the strongest option and explain its costs, why it improves the outcome, and what would change the recommendation.
Keep comparisons proportional to uncertainty and impact. Preserve a justified approach when alternatives offer no material improvement.

## Revise and publish

Put corrections supported by repository evidence in the plan files: with a plan inbox, the files
its open command printed; without one, the plan branch, committed with `git`.
Change only the plan's decisions, acceptance, and boundaries, following the plan contract in the
installed `clarify` skill's `references/plan-file.md`. State each correction in the plan in one or two
sentences. Keep each acceptance item's one-line check, such as "Checked by a table test" or the
command that shows it, and the exact interfaces or configuration lines the operator approved.
Keep evidence, reproductions, rejected alternatives, and dispositions in the review, not
the plan. Put implementation checks, such as test cases, verification commands, and configuration
details, in the review under "For implementation", where the implementer finds them.
When a revision grows the plan by more than a third, cut it back or explain in the review why the
plan needs the added text.
Present consequential product or architecture forks for user decision. Do not silently choose one.
An architectural recommendation remains a proposal until the user resolves that choice.
Keep the proposal drafted until the user confirms the revised plan. A confirmed plan needing a
material revision becomes a new proposal requiring renewed confirmation.

Publish a review that identifies the judged and resulting revisions, findings, evidence, dispositions,
and unresolved choices. Give each material finding a stable identity. Explain accepted or rejected
findings without prescribing a fixed table. Identify foundational decisions changed by the revision
and the downstream assumptions that need reconsideration.

- **With a plan inbox.** The plan view is the page the user reads before confirming, so the review
  goes there. Add a section headed `Review` at the end of the view: each finding with its identity,
  evidence and disposition, then the unresolved choices. Redraw the rest of the view to match the
  corrected plan. Run the push command with a message that starts with `critique:` and counts the
  findings and open choices, such as `critique: 4 findings, 1 open choice`. The judged revision is
  the one open printed; the resulting revision is the one push stores. When open or push refuses
  because the inbox holds a newer revision, run open again and review that revision.
- **Without one.** Push the plan corrections to the PR branch and post the review as a PR comment,
  with the judged and resulting commits. Fetch the PR again before pushing. If another author
  changed its head, reconcile those changes and review the resulting plan.

A review with no findings changes no plan file: with a plan inbox, push the view with its `Review`
section alone; without one, post the comment without a commit.

Read the published revision or PR and its review back. Return the plan's page or the PR link, and any
unresolved decisions. Human decisions control confirmation and merges.
