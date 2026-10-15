# Tests

Tests prove settled behaviour on real data without pinning implementation. Split the code by who
changes it. The project's own schema, API and screens move while a plan is in progress; use-case
golden files cover them once the plan is done. External systems change on their own; adapter tests
cover the code that reads them. Adding another kind needs an `AGENTS.md` rule that states why.

## When tests run

- **While developing, none.** Run the feature, inspect it in the browser at desktop and phone
  widths, and try it on real data. Do not write tests for it, and do not spend time on a test it
  breaks: delete a test that pins screens or steps the feature is changing.
- **When a plan is done**, meaning the operator accepted its increments, run the stability check:
  write or refresh the use cases for the behaviour the plan settled, regenerate the golden files,
  and review every diff. The plan's last increment is that check.
- **The gate** runs static checks and adapter tests before merging to the main branch. It does not
  run the golden files, and it does not block committing or pushing work in progress.

## Browser and scenario tests

Write none. A test that clicks through screens fails on every layout change, so it costs most while
the screens still move and proves no operator question. Inspect screens by hand in the browser.

## Golden files

See `use-cases.md`. They cover every command end to end.

## Adapter tests

Code that talks to an external system (a shop, a bank, a mail server) gets tests that replace the
network with recorded or invented responses and check what the adapter stores: no duplicates on a
rerun, a stop on a block or challenge, unknown facts left unknown. They run in every gate, because
the outside system can change at any time and the project adapts to it.

## Fixtures

Cut fixtures from real data with a script, never by hand, and keep the script in the repository
(`npm run fixtures` in workflow). The cutter keeps structure, ids, timestamps, counts and names,
and replaces free text, paths, secrets and personal data with placeholders. Review the fixture diff
for text that escaped redaction before committing. When the source format changes, regenerate the
fixtures, then the golden files, and review both diffs.

## Unit tests

Write none. A test per function locks the implementation, so a refactor rewrites tests that
prove no behaviour, and the suite buries which behaviour matters. A pure function's cases belong
in a use case whose golden file shows them. When a case cannot reach the function through a
command, the function serves no operator question.

## Static checks

Each architecture rule that a reviewer would otherwise police by reading becomes a static check:

- **Boundary guard.** Only the folder of an external system names its files, paths or endpoints.
  The test searches every other source file for those names and fails on a match.
- **Entry point guard.** Tests import only the public entry points the rules list, so internal
  code can move without rewriting tests.

## Real-data check

Code that reads an external system has a second check over all real local data: it loads
everything, counts violations of the model's invariants, and prints the time taken. A change to
that code pastes the summary into its pull request.

## Time budget

The full check prints its duration and warns above 10 seconds. When it warns, delete or merge tests
before adding more. The check gates the merge to the main branch; the golden files gate closing a
plan.
