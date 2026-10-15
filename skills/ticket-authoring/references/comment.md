# Writing a ticket comment

A comment adds a finding, decision, state change, handover, or question to a ticket. The
description remains the current contract.

## Lead with the point

A reader who scans only the first line should understand what changed.

```markdown
<the point in one line>

<optional evidence, links, comparison, or short log excerpt>

<optional ask, next step, and owner>
```

Background follows the point only when the reader needs it.

## Match the comment type

| Type | Lead with | End with |
|---|---|---|
| Investigation finding | What is now established | What it means for the ticket |
| Decision | The decision | Who decided and what it rules out |
| Status update | What changed since the previous update | The next step or blocker |
| Request for input | The answerable question | The person or role needed |
| Handover | The current state | The next concrete step and known trap |

Post a status update only when something observable changed. Name the blocker when progress did
not change.

## Keep done in the description

When a finding changes an acceptance criterion, say so in the comment and propose the description
edit. Apply the approved edit to the description. A requirement buried in a thread will be missed
at review.

Link to an existing description section instead of restating it. A repeated copy ages separately
and leaves readers to decide which version is current.

## Use evidence at comparison points

Use a table when two or more items share the same attributes.

```markdown
| Environment | Earlier result | Current result |
|---|---|---|
| Acceptance | Retry fails | Retry passes |
| Production | Not deployed | Not deployed |
```

Use prose for a single result and a list for a plain enumeration. Read `links.md` before citing an
artifact.

## Preserve the timeline

Add a new comment when information changes. Edit one of your own comments only to correct an error
such as a broken link or wrong figure, and mark the correction when the tracker supports edits.
Do not rewrite another person's comment.

## Length budget

- Keep one topic per comment so replies stay attached to the right subject.
- Keep most comments to two to five lines.
- Remove preamble, delay apologies, and thread recaps.

## Checklist

- [ ] The first line carries the point.
- [ ] The comment covers one topic.
- [ ] Existing description content is linked instead of repeated.
- [ ] Contract changes are proposed here and applied to the description.
- [ ] Evidence is linked and comparisons use a table only when useful.
- [ ] The ask, next step, owner, or blocker is explicit when one exists.
