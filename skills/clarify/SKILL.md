---
name: clarify
description: Stress-test a request through an iterative interview until user and agent share an understanding, then capture it in a plan, published to the repository's plan inbox or a plan PR.
---

# Clarify

Build mutual understanding of the intended outcome, its boundaries, and why the chosen approach fits.
Capture that understanding in a plan an implementer can use without this conversation. Run in the invoking session.
Apply `writing-style` to every written artifact, including the plan, view, PR, and comments.

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

Read back the resulting understanding: the outcome, scope, chosen behavior, important trade-offs, and any remaining boundaries. Show it in the plan file; a plan inbox draws the plan from that file.
Invite corrections and obtain explicit confirmation that this captures the user's intent. A coherent document alone does not establish mutual understanding.
Drafts can support the interview, but unresolved choices remain visible. Implementation authorization follows the revision confirmation below.
One explicit approval can confirm both understanding and the plan revision when it covers the current proposal.

## Publish the proposal

Use [the plan contract](references/plan-file.md) for location, metadata, content guidance, and readiness.
Check the plan metadata before each publish:

```bash
node <clarify-skill>/scripts/validate-plan.mjs <plan-file>
```

**With a plan inbox.** The repository's plan inbox, when one exists, is a tool that holds draft
plans, draws each plan as a page and records the user's confirmation. Its README gives the exact syntax
of its commands. Publish the draft with its new command, which takes the plan file, the asset folder and a
message, allocates the plan number and prints the plan's page. Draft without a
branch, commit or PR. Report the plan's page and unresolved choices.

**Without one.** Use the `git` skill to commit and publish a draft plan PR. Preserve one plan
identity and PR through revisions. In the PR body, explain the intended outcome and why it matters.
While the plan is drafted, link the plan on the PR branch, without a commit SHA, so a
revision push needs no PR edit. The full commit SHA enters the PR at confirmation. Read the remote PR
back and verify its plan link. Report its URL and unresolved choices.

Either way, highlight decisions needing review and unresolved choices, and link critique findings
when available. Apply `writing-style` and keep detailed design in the plan.
`critique` can review this proposal independently. Clarify itself launches no critic.

## Put the questions in the plan

Write each open question in the plan file, so builders, the validator and the plan inbox read one
source. [The plan contract](references/plan-file.md) defines the format. Write no HTML plan view.

- Give each question at least two options and mark exactly one `(recommended)`, so the user picks
  from concrete candidates and an agent can apply the pick.
- Mark a question `Changes the design.` when its options differ on a screen, a layout or a
  structure the user judges by sight. Draw one image per option of that question and save it in the
  plan's asset folder, the folder beside the plan with its name and no extension
  (`docs/plans/NNNN-slug/`), as png, jpg, webp or svg. Name each image after its option on the
  option's line. Take captures on invented data only.
- Leave out the drawing for a question the user settles by reading, such as an order or a boundary.
- Keep the plan's Why in the user's words and the increments' acceptance lines in the plan. The
  inbox page draws them.
- Builders read the plan file. A capsule, the brief a launcher gives a fresh session, may point at
  an option's image for a layout the plan describes in words; the look comes from the repository's
  rules.

## Revise a draft

Take a revision in one round: apply every answer the user gave to the plan, move each answered
question into the principles or increments, and publish once. An answer the user saved in the plan
inbox arrives as a list of picks with the revision they were made on; apply each pick, drop its
question, and name the picks in the revision's message.

- With a plan inbox, run its open command, which prints the paths of the plan and its asset folder
  to edit. Edit them, then run its push command with a message; it validates and stores the
  revision and prints the plan's page.
- Without one, edit the PR branch, run the validator, commit and push.

Keep each revision small, with a message that names what changed, such as
`split increment 2 by screen`. The inbox and the PR history show that message.

## Confirm a revision

Only explicit user confirmation authorizes implementation. Merge alone is not confirmation.
Resolve any remaining consequential choice before recording confirmation.

- With a plan inbox, the inbox records confirmation of the revision it showed: the user confirms
  there, or the agent records it through the inbox on the user's explicit word. The build commits
  the confirmed plan, its view and asset folder into the repository's plan directory in its own PR.
- Without one, update the plan's status and confirmation date, commit and push, and record the
  resulting full commit SHA in the PR: link the plan and its view at that SHA. Mark the plan PR
  ready for review.

Use the confirmed revision for decomposition and implementation.

A material change after confirmation needs renewed confirmation. Preserve the old authorized
revision for existing work; do not silently change its scope. Human decisions control merges.
