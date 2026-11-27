# Plan contract

Apply `writing-style` to the plan. Use the structure below to capture the shared understanding for
readers who did not attend the interview.

## Location and metadata

Store one plan at `docs/plans/NNNN-slug.md`, using the next unused number. Respect an established
repository plan directory when one exists. Its stable UUID survives renaming or moving the file.
The images of its questions sit in the asset folder `NNNN-slug/`. A plan inbox allocates the number,
holds the draft and draws it as a page; the build commits the confirmed plan at this path. A plan
written before structured questions can also hold an HTML view as `NNNN-slug.html`.

```yaml
---
plan_schema: 1
plan_id: "<uuid-v4>"
status: drafted
confirmed_at: null
superseded_by: null
---
```

A drafted plan has null confirmation and supersession fields. A confirmed plan has an ISO
confirmation date and null supersession. A superseded plan retains its confirmation date and names
the replacement plan UUID. An implemented plan adds `implemented_at`, the ISO date its last
increment merged, and keeps its confirmation date, or null when work landed without confirmation.
Other plans omit `implemented_at`. The confirmation commit identifies the authorized revision.

## Suggested content structure

Cover the relevant information below, in this order. Rename or omit a section when the plan has
nothing for it, except Why, which every plan keeps. Metadata validation does not enforce prose
structure.

- **Why:** The first section, `## Why`, of at most three sentences for the user who reads the plan
  cold, days after the interview: what they see wrong or missing today, what they get once it is
  built, and where the request came from (the user's words, an idea or a lead's finding). Use the
  user's terms and name no file, prop or code path. A plan inbox shows this section on the plan's
  card and above its view.
- **Purpose and success:** State the problem, who needs the result, and the evidence behind the
  need. Define the result as observable acceptance: the questions it answers, the commands or
  behaviour that answer them, and how a reader checks each one.
- **Principles:** State the design rules the work keeps, each as a bold term followed by the rule
  and its reason. Implementers apply them to decisions the plan leaves open. Record consequential
  decisions and the alternatives that explain them here.
- **Increments:** List numbered steps in delivery order. Give each its observable result and how it
  is checked. Mark a finished increment with the pull request or file that holds it. Increments
  set order and scope; `ticket-authoring` slices them into tickets.
- **Scope and boundaries:** State included work, exclusions, constraints, and explicit deferrals.
  Explain the effects of deferrals and any human decision boundaries.
- **Open questions:** Keep unresolved decisions and assumptions visible while the plan remains
  drafted, as structured questions (below). Explain what each blocks. Move resolved answers into
  principles or increments; retain critique links where useful. A plan with none says `None.`

### Question format

Each question is a `###` heading under `## Open questions`, followed by these lines in order:

1. `Blocks:` and what the question holds up, such as `Blocks: increment 3`.
2. Optionally `Changes the design.` on its own line, for a question whose options differ on
   something the user judges by sight.
3. A list of options, one per line. Mark exactly one `(recommended)`. An option may end with the
   name of an image in the plan's asset folder, in backticks, which draws that option.

```markdown
## Open questions

### Where does the list sit on a phone?
Blocks: increment 3
Changes the design.
- Above the detail (recommended) `list-above.png`
- In a drawer `list-drawer.png`

### Which window counts a stale run?
Blocks: increment 2
- 24 hours (recommended)
- 7 days
```

`validate-plan.mjs` rejects a question with fewer than two options, with no `(recommended)` option
or with more than one. The page gives each question an Other answer, so no option stands for it.
A bullet under `## Open questions` outside a `###` question is prose and stays valid, but the page
shows it as text with no options.

Keep detail proportional to uncertainty and consequence. The plan holds decisions, acceptance, and
boundaries. Implementation checks, verification commands, and review evidence belong in outcome
issues and plan reviews.

## Readiness

A plan is ready for implementation when the user has confirmed it and no unresolved product or
architecture decision is needed to fulfill its acceptance criteria. Explicit deferrals must leave
the agreed acceptance achievable.
