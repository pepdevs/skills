# Decompose a plan into tickets

Turn a confirmed plan into the smallest coherent ticket set that can deliver it. One ticket is a
valid result when the plan is already atomic. Use this reference for a tracker-backed work queue.
For GitHub outcome issues run through `wf`, `to-outcomes` replaces the ticket-size signal with
session sizing and adds publication.

## Read the source

Use the confirmed plan in the conversation unless the user supplies another plan or specification.
Read relevant project knowledge and current code so ticket boundaries match the implemented system
and its language.

Stop at an unresolved product or architecture decision. Tell the user to invoke `clarify` through
the active provider's explicit form. Resolve ticket granularity, ordering, and blocking
relationships here.

## Find ticket boundaries

Each ticket must:

- deliver one observable increment with independent value;
- include every layer required for that increment to work;
- name how an agent can prove the outcome;
- remain useful when later tickets are deferred;
- depend only on work that blocks its start or proof.

Start with a narrow working path. Separate preparatory refactoring only when it has its own purpose
and proof that behaviour stays intact.

Use a separate ticket when an outcome has its own acceptance, release, or rollback path. Keep work
together when splitting would create an unprovable intermediate state.
For a code migration, inspect callers and transaction boundaries before grouping work by directory
or feature label. Each ported path owns the tests, types and proof needed to finish it. Name a
shared helper's migration owner and avoid leaving unnamed callers for a final cleanup ticket.

For a wide mechanical change that cannot remain valid in vertical increments, prepare prerequisites
that preserve current behavior. Migrate bounded groups only after the named proof passes. Remove
the obsolete form after every group passes its proof. Each ticket must end in a state its named
proof can check.

## Draft the graph

For every ticket, show:

- title;
- beneficiary and value;
- outcome and boundaries;
- observable acceptance criteria;
- proof method;
- blocking tickets or `None`.

Order blockers before the tickets they unblock. Link the source plan or parent artifact when one
exists. Keep file paths and code snippets for public interfaces or durable constraints.

Present the complete graph. Follow the publication authorization established in the conversation.
Read back every created ticket. Return each identifier and link.

## Source

Adapted from
[Matt Pocock's to-tickets skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/to-tickets/SKILL.md).
