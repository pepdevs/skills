---
name: clarify
description: Stress-test a request through an iterative interview until user and agent share an understanding, then capture it in a plan PR.
---

# Clarify

Build mutual understanding of the intended outcome, its boundaries, and why the chosen approach fits.
Capture that understanding in a plan an implementer can use without this conversation. Run in the invoking session.
Apply `writing-style` to every written artifact, including the plan, PR, and comments.

## Reach shared understanding

Read applicable repository instructions, code, configuration, and project knowledge. Resolve discoverable facts through inspection or bounded exploration.
Ask the user for intent, preferences, and decisions that evidence cannot settle.

Map the request as a **design tree**: each decision branches into the decisions that depend on it.
Start with the intended outcome, who needs it, and what success means. Explore scope, constraints, behavior, and trade-offs as answers expose them.
Keep settled decisions, open questions, and proposed assumptions distinct. Leave routine implementation choices to the implementer within the agreed boundaries.

Work the tree in rounds. The **frontier** contains questions whose prerequisites are already settled.

1. Ground each round in the facts found and the consequences of each choice.
2. Ask the ready questions through the harness's question tool when available, batching within its limits. Otherwise ask them conversationally.
   Offer concrete candidates where useful, recommend one, and explain what each commits the user to.
   Leave room for the user to correct the framing or supply another answer.
3. Wait for answers before asking questions that depend on them. Continue independent investigation while answers or evidence are pending.
4. Recompute the frontier after each round. Follow the implications of each answer and reopen decisions when new evidence contradicts their premises.

Probe vague answers with concrete examples, boundary cases, and observable behavior. Challenge contradictions and test whether the proposed solution serves the underlying goal.
Make consequential assumptions explicit and put unresolved trade-offs to the user. An unanswered question remains open; a recommendation is not agreement.
Depth follows uncertainty and consequence. Continue until the decisions needed to define the plan are settled or explicitly deferred with their effects understood.

Read back the resulting understanding: the outcome, scope, chosen behavior, important trade-offs, and any remaining boundaries.
Invite corrections and obtain explicit confirmation that this captures the user's intent. A coherent document alone does not establish mutual understanding.
Drafts can support the interview, but unresolved choices remain visible. Implementation authorization follows the revision confirmation below.
One explicit approval can confirm both understanding and the plan revision when it covers the current proposal.

## Publish the proposal

Use [the plan contract](references/plan-file.md) for location, metadata, content guidance, and readiness.

Use the `git` skill to commit and publish a draft plan PR. Preserve one plan identity and PR through revisions.
In the PR body, explain the intended outcome and why it matters. Link the plan at its current full commit SHA.
Highlight decisions needing review and unresolved choices. Link critique findings when available.
Apply `writing-style` and choose the structure that helps reviewers. Keep detailed design in the plan.
Record confirmation using the procedure below. Check the plan metadata with:

```bash
node <clarify-skill>/scripts/validate-plan.mjs <plan-file>
```

Read the remote PR back and verify its plan link and revision. Report its URL and unresolved choices.
`critique` can review this proposal independently. `workflow-plan` composes this skill with delegated
critique; clarify itself does not require Workflow or launch a critic.

## Confirm a revision

Only explicit user confirmation authorizes implementation. Merge alone is not confirmation.
Resolve any remaining consequential choice before recording confirmation. Update the plan's status
and confirmation date, commit and push, and record the resulting full commit SHA in the PR. Mark the
plan PR ready for review. Use that immutable revision for decomposition and implementation.

A material change after confirmation needs renewed confirmation. Preserve the old authorized
revision for existing work; do not silently change its scope. Human decisions control merges.
