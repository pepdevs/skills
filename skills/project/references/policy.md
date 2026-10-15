# Business policy

A business policy states a consequential outcome or constraint in domain language. Code,
configuration, or an operational process enforces it. Tests, monitoring, or direct validation
prove it. A policy record makes the current obligation understandable without reconstructing it
from implementation details.

## Apply the admission gate

Document a policy when it affects a material business result and at least one condition holds:

- The policy crosses components, services, or an operational process.
- A boundary or exception materially changes the outcome.
- Engineers, product, operations, support, or compliance need the same rule.
- Recovering the rule from implementation evidence is expensive or ambiguous.

Keep local validation, algorithms, code paths, and discoverable configuration values with their
executable owners. A plan or ticket owns a proposed policy until implementation and proof make it
current.

## Organise the policy set

Keep `POLICIES.md` at the repository root as a short index. Store the policy records under
`docs/policies/`, grouped by a stable domain boundary. The index links each policy area and states
its scope without copying the individual records.

Create both levels lazily. A repository with no qualifying policy needs no empty index or policy
directory. Preserve an established equivalent layout when it already gives policies one canonical
owner and a clear entry point.

Use this index shape when the repository has no established format:

```markdown
# Business policies

| Area | Scope | Policies |
|---|---|---|
| Cancellation | Customer and operator cancellation outcomes | [Cancellation policies](docs/policies/cancellation.md) |
```

## Write a policy record

Give each policy a readable, stable key in the form `domain.rule`, such as
`cancellation.free-window`. Use lowercase words separated by hyphens inside each segment. Search
existing policy files before choosing a key. Change it only when the policy's identity changes.
Use the key when a plan, ticket, test, monitoring signal, or related document refers to the policy.

Use this shape when the domain file has no established format:

```markdown
# Cancellation policies

## Free cancellation window

**Key:** `cancellation.free-window`

Bookings can be cancelled without charge until 48 hours before departure.

### Scope

<Actors, products, channels, or time boundaries covered by the policy.>

### Exceptions

<Material cases that produce another outcome. Omit when none exist.>

### Source

<Contract, regulation, or resolved product decision. Omit for ordinary undisputed policy.>

### Proof

- <Test, monitoring signal, or direct validation that exercises the policy.>
```

State the outcome, applicability, and material exceptions. Let code own calculation, orchestration,
data access, and error handling. Use examples only when they settle a boundary that the rule alone
leaves ambiguous.

## Record evidence

Link the narrowest evidence that exercises the policy through a real consumer path. Supporting
unit tests can preserve lower-level boundaries. When current implementation evidence supports an
existing policy but direct proof is unavailable, write:

```markdown
### Proof

- **Known proof gap:** <missing verifier and the evidence that currently supports this policy.>
```

A changed policy remains unproved until direct inspection passes. Keep the gap form for existing
behaviour discovered during an audit, and surface it as follow-up work.

When a policy and observed behaviour disagree, show the mismatch before editing either one.
Determine whether the implementation, policy, or rollout state is wrong.
