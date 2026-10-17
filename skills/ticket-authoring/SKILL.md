---
name: ticket-authoring
description: 'Tickets: write, decompose, review, or update tracked work, acceptance criteria, and comments. This skill owns ticket content and definition of done; the active integration owns provider fields and mutations.'
---

# Ticket authoring

A ticket states one problem, why it matters, and the observable outcomes that define done. The
tracker stores the ticket. It does not define the writing model.

This skill owns ticket structure, acceptance criteria, and comment semantics. `writing-style`
owns the prose. `git` owns branch, commit, and pull-request conventions.

## Route the task

This skill owns slicing and ticket content for every tracker.

Read `references/links.md` when the ticket or comment cites another artifact. Also read the file
for the task at hand.

| Task | Read |
|---|---|
| Create or review a ticket | `references/ticket.md` |
| Edit a description or acceptance criteria | `references/ticket.md` |
| Draft acceptance criteria in a plan or specification | `references/ticket.md` |
| Decompose a confirmed plan into tickets | `references/slicing.md`, then `references/ticket.md` |
| Add or edit a ticket comment | `references/comment.md` |

## Work with the active tracker

- **Use the available integration.** Follow the connected work tracker when the user authorizes a
  mutation. Produce Markdown when the user asks for a draft.
- **Read the current artifact first.** Preserve fields, labels, issue type, and conventions that
  already exist. Fetch field metadata before setting an unfamiliar provider field.
- **Keep provider mechanics at the edge.** Translate the same ticket model into the active
  tracker's supported fields and markup. Keep one provider's fields and states inside its
  integration.
- **Match the requested action.** Drafting does not authorize publishing. Creating, editing,
  commenting, transitioning, assigning, and linking are separate tracker mutations.
- **Keep the description canonical.** Comments carry findings, decisions, and status. Update the
  description when the definition of done changes.

## Shared rules

- **Lead with value.** Name the beneficiary and benefit in one line. Question work whose value
  cannot be stated.
- **Keep one outcome per ticket.** Split work that has independent value, acceptance, or release
  paths.
- **Make criteria observable.** A reviewer can verify the outcome without reading the source diff.
- **Keep implementation optional.** Put a proposed solution in a clearly labeled suggested
  approach. Acceptance criteria remain valid when the implementation changes.
- **Link evidence.** Give each URL a descriptive label. Prefer stable links for code, runs,
  documents, and related tickets.

## Principle

Acceptance criteria are a contract about outcomes. The contract survives a change of plan. A
criterion that changes when the implementation changes describes the solution instead of done.

Licensing: [Matt Pocock MIT notice](licenses/matt-pocock-MIT.txt).
