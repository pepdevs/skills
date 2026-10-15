---
name: record-improvement
description: Record one repository improvement from confirmed conversation context and open its pull request.
disable-model-invocation: true
---

# Record improvement

Turn one concrete improvement from the current conversation into a numbered repository proposal.
The proposal records the current approach, the recommended change, both trade-off sets, a delivery
sequence, and observable acceptance criteria. It authorizes future work without presenting that
work as implemented.

The explicit skill invocation authorizes creating the file, branch, commit, push, and pull request.
Merging remains a human decision.

## Compose the required skills

| Skill           | Use                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `writing-style` | Apply the Documentation register to the improvement file and pull-request body.                |
| `git`           | Select the repository convention and own branch, commit, push, and pull-request operations.    |
| `gh-stack`      | Use when the proposal depends on an open pull request or the target branch belongs to a stack. |

## Select one improvement

1. Read arguments supplied with the invocation and the relevant conversation context.
2. Identify the concrete current behavior, observed cost or limitation, and proposed direction.
3. Resolve the repository that owns the behavior.
4. Ask one focused question when the improvement or destination remains ambiguous.
5. Search existing `docs/improvements/` files and open pull requests for the same proposal.

One invocation records one improvement. Keep independently deliverable proposals in separate files
and pull requests. Update an existing proposal only when the user asks to revise it.

The proposal needs enough evidence to describe the current approach accurately. Mark an unresolved
claim as an assumption or open boundary. Keep implementation details optional where several designs
can satisfy the acceptance criteria.

## Inspect the target repository

1. Read repository instructions and `CONTEXT.md`.
2. Read `SYSTEM.md`, applicable policy, plans, and source files that establish the current approach.
3. Inspect the current branch, worktree changes, open pull requests, and default branch.
4. Preserve task-scoped changes by using the owning branch or a separate worktree.
5. Fetch the target remote before selecting the next improvement number.

A proposed improvement stays in its improvement file. It does not update current-state project
knowledge until implementation or an accepted decision satisfies that repository's knowledge rules.

## Create the improvement file

Read [the improvement file contract](references/improvement-file.md). Start from
[the template](assets/improvement.md).

Create `docs/improvements/` when needed. Select the next unused four-digit number from the target
repository's current default branch and open improvement pull requests. Generate a UUID v4 for
`improvement_id`. Set `created_at` to the current ISO date.

Apply these content rules:

- State the proposed outcome in the title.
- Describe current behavior from repository or observed evidence.
- State current advantages and current costs separately.
- Preserve measured identifiers, times, counts, tokens, costs, and file paths that support the
  proposal.
- Describe the proposed behavior and its authority boundaries.
- State proposed advantages and proposed costs or risks separately.
- Give the smallest safe delivery sequence.
- Make every acceptance criterion observable.
- Keep transcript content, credentials, and unrelated local paths out of the file.

Topic-specific sections can sit between the required sections. Keep the required heading names so a
later reader and validator can locate the contract.

Validate the populated file from this skill directory:

```bash
node scripts/validate-new-improvement.mjs <target-repository>/docs/improvements/NNNN-slug.md
```

Run the target repository's documentation and consistency checks. Always run `git diff --check`.

## Publish the proposal

Use the `git` skill for repository conventions.

1. Create a branch dedicated to the improvement file.
2. Commit the file as one logical documentation change.
3. Fetch the remote again and check for a newly claimed number.
4. Renumber and amend before push when another proposal claimed that number.
5. Push the branch.
6. Open a pull request with the proposal summary, evidence source, dependency, and validation.

When the proposal describes behavior introduced by an unmerged pull request, use `gh-stack` and
base the proposal on that dependency branch. State the dependency in the pull-request body.

Use a conventional commit such as:

```text
docs(improvements): record persisted session supervision
```

Finish with the improvement path, stable ID, branch, commit subject, pull-request URL, dependency,
and validation state.
