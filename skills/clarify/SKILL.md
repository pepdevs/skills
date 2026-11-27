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

Read back the resulting understanding: the outcome, scope, chosen behavior, important trade-offs, and any remaining boundaries. Show it in the plan view, drawn as described in "Draw the plan".
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
plans, shows each plan with its view and records the user's confirmation. Its README gives the exact
syntax of its commands. Publish the draft with its new command, which takes the plan file, the view,
the asset folder and a message, allocates the plan number and prints the plan's page. Draft without a
branch, commit or PR. Report the plan's page and unresolved choices.

**Without one.** Use the `git` skill to commit and publish a draft plan PR. Preserve one plan
identity and PR through revisions. In the PR body, explain the intended outcome and why it matters.
While the plan is drafted, link the plan and its view on the PR branch, without a commit SHA, so a
revision push needs no PR edit. The full commit SHA enters the PR at confirmation. Read the remote PR
back and verify its plan link. Report its URL and unresolved choices.

Either way, highlight decisions needing review and unresolved choices, and link critique findings
when available. Apply `writing-style` and keep detailed design in the plan.
`critique` can review this proposal independently. Clarify itself launches no critic.

## Draw the plan

Draw each published revision as one interactive HTML page, the plan view, so the user checks the
design by sight during the read-back. The plan file stays the source: builders, the validator and
the confirmed revision read it, and the page draws it.

- Open the page with the plan's Why, in its words, before any figure.
- Draw what the user will get: each screen, behaviour or structure the plan names, at the sizes or
  cases it names. Make it interactive where a width, setting or press changes the result, and give
  each open question a switch that redraws the page with each of its options.
- Give each part or increment its acceptance line or question from the plan. Show the increment
  order with its review gates, the settled decisions and the exclusions.
- Use the plan's terms and the demo values it states. Draw nothing the plan leaves out, except a
  `Review` section that `critique` adds at the end: keep it on a redraw and update each finding's
  disposition as answers settle it.
- Take captures on invented data only. Save images in the plan's asset folder, the folder beside
  the plan with its name and no extension (`docs/plans/NNNN-slug/`), as png, jpg, webp or svg, and
  reference them from the page by relative path.
- Declare `<meta charset="utf-8">` and write the page's script as `<script type="module">`.
- With a plan inbox, its new and push commands check the page as they publish and print each
  problem to fix. Fix them and run the command again.
- Without one, check the page in a headless browser before each publish, at a phone width and a
  full width: no uncaught error, no console error, a body that draws, every image loaded with a
  size, the charset declared and every inline script a module. Use headless Chromium through
  Playwright, and keep the desktop app's browser pane closed.
- Keep the page beside the plan with the same name and an `.html` extension, with its asset folder,
  so a revision holds all three. Every revision carries the view: a push without it drops the view.
- With a plan inbox, the inbox shows the view: publish no other copy. Without one, commit the page
  in the plan's commit, publish it as a private page when the harness has a page tool, such as
  Claude's Artifact, and link it in the PR body beside the plan link.
- Redraw it after each revision. When the page and the plan disagree, fix the plan first,
  then the page.
- Builders read the plan file. A capsule, the brief a launcher gives a fresh session, may point at
  the page for behaviour the plan describes in words, such as a layout that changes with width; the
  look comes from the repository's rules.

## Put the questions in the plan

Write each open question in the plan file as well, so builders, the validator and the plan inbox
read one source. [The plan contract](references/plan-file.md) defines the format.

- Give each question at least two options and mark exactly one `(recommended)`, so the user picks
  from concrete candidates and an agent can apply the pick.
- Keep each option's label to 40 characters, such as `- Per day chart only`. The user scans the
  options in a list; the reason and detail go in the plan's principles, increments or the view.
- Mark a question `Changes the design.` when its options differ on a screen, a layout or a
  structure the user judges by sight. Name one image per option on the option's line: a capture of
  the plan view with that option switched on, cropped to the part that changes and taken at twice
  the pixel density, so the difference reads at a glance. The validator refuses a design question
  with an option that names no image.
- Leave out the image for a question the user settles by reading, such as an order or a boundary.

## Revise a draft

Take a revision in one round: apply every answer the user gave to the plan, move each answered
question into the principles or increments, redraw the view, and publish once. An answer the user saved in the plan
inbox arrives as a list of picks with the revision they were made on; apply each pick, drop its
question, and name the picks in the revision's message.

- With a plan inbox, run its open command, which prints the paths of the plan, view and asset folder
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
