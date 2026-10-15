# Domain language

`CONTEXT.md` gives the project one vocabulary. It defines project-specific concepts and the
boundaries between them. It does not describe code, requirements, procedures, or architecture.

## Choose the scope

Use one root `CONTEXT.md` while the repository has one coherent domain language. For a repository
with distinct bounded contexts, keep a root `CONTEXT-MAP.md` that links to the local
`CONTEXT.md` files and states their relationships.

Create a local glossary only when its vocabulary has a distinct meaning or owner. Directory size
alone does not create a context.

## Write a term

Use this shape when the repository has no established format:

```markdown
**Order**:
The customer's confirmed request for the listed products.
_Avoid_: Purchase, transaction
```

- Pick one canonical term.
- Define what the concept is in one or two sentences.
- State the boundary that distinguishes it from a nearby concept when needed.
- List rejected synonyms only when people or code are likely to use them.
- Include project language. General engineering terms remain outside the glossary.

Group terms only when a stable domain grouping helps retrieval. Preserve the repository's current
format when it already carries these jobs.

## Reconcile with evidence

Search names, types, interfaces, tests, and existing documentation for the term and its common
synonyms. A mismatch can mean the code uses stale language or the proposed definition is wrong.
Surface that conflict before changing the canonical term.
