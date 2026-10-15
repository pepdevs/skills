# Improvement file contract

An improvement file preserves one proposed repository change independently of the conversation that
identified it. It records a recommendation and its trade-offs. It does not claim implementation
authority.

## Location and numbering

Store an improvement at `docs/improvements/NNNN-slug.md`. Use one repository-wide sequence,
zero-padded to four digits. Select the next unused number after fetching the default branch and
checking open improvement pull requests.

Name the file for the proposed outcome in lisp case. Keep one independently deliverable proposal in
each file. The `improvement_id` remains stable if the file moves or its number changes during a
collision repair.

## Required frontmatter

A new improvement uses these fields in this order:

```yaml
---
improvement_schema: 1
improvement_id: "<uuid-v4>"
status: proposed
created_at: YYYY-MM-DD
superseded_by: null
---
```

- `improvement_schema` identifies this contract version.
- `improvement_id` is a UUID v4 generated once.
- `status` is `proposed` when the skill creates the file.
- `created_at` is the creation date in ISO calendar form.
- `superseded_by` is null for a new proposal and later holds a replacement improvement UUID.

A repository can add lifecycle policy for accepted, implemented, declined, or superseded proposals.
The creation skill owns only the `proposed` state.

## Required sections

Use these headings in this order:

1. `# <Proposed outcome>`
2. `## Purpose`
3. `## Current approach`
4. `### Current advantages`
5. `### Current costs`
6. `## Proposed approach`
7. `## Proposed advantages`
8. `## Proposed costs and risks`
9. `## Delivery sequence`
10. `## Acceptance criteria`

Add `## Observed evidence` between the current costs and proposed approach when measurements,
session identifiers, incidents, or concrete examples justify the proposal. Add topic-specific
sections under the proposed approach when readers need interface, migration, privacy, recovery, or
data-boundary detail.

## Content boundaries

- Current approach states implemented or directly observed behavior.
- Current advantages explain why the existing design exists or remains useful.
- Current costs state measured or mechanically explained limitations.
- Proposed approach gives one recommended direction and names authority boundaries.
- Proposed advantages state effects tied to the described mechanism.
- Proposed costs and risks name new implementation, operational, compatibility, privacy, or
  migration burdens.
- Delivery sequence orders independently verifiable changes and compatibility steps.
- Acceptance criteria describe observable results without requiring one implementation.

Use exact identifiers and measurements when they can be shared safely. Keep prompts, assistant
answers, reasoning, credentials, private tool arguments, and unrelated local paths outside the
file.

## Pull-request boundary

The improvement pull request contains the proposal and its validation. It does not include the
implementation. A proposal that depends on behavior in an open pull request forms a stack above
that pull request. The user reviews and merges each proposal.
