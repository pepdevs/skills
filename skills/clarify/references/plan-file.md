# Plan contract

Apply `writing-style` to the plan. Use the structure below to capture the shared understanding for
readers who did not attend the interview.

## Location and metadata

Store one plan at `docs/plans/NNNN-slug.md`, using the next unused number. Respect an established
repository plan directory when one exists. Its stable UUID survives renaming or moving the file.

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
nothing for it. Metadata validation does not enforce prose structure.

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
  drafted. Explain what each blocks. Move resolved answers into principles or increments; retain
  critique links where useful.

Keep detail proportional to uncertainty and consequence. The plan holds decisions, acceptance, and
boundaries. Implementation checks, verification commands, and review evidence belong in outcome
issues and plan PR reviews.

## Readiness

A plan is ready for implementation when the user has confirmed it and no unresolved product or
architecture decision is needed to fulfill its acceptance criteria. Explicit deferrals must leave
the agreed acceptance achievable.
