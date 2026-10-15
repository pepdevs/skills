# Use cases

`docs/use-cases.md` is the list of questions the software answers for its operator. A use case is
written when its behaviour is settled, with its golden file. The golden test reads it, so the list
and the code cannot drift apart.

## File shape

One heading per use case with a stable id, the question in the operator's words, what the answer
contains, and the exact command lines in a fenced block. A placeholder such as `<session>` marks a
command the test runs once per fixture.

````markdown
# Use cases

Each use case is a question the operator asks, and the command that answers it. Code exists to
answer these questions. `test/golden.test.ts` reads this file.

## uc-1 Session at a glance

What did this session do, what did it cost, and what went wrong?

```
tool summary <session>
```

## uc-2 Value from each subscription

What did each plan's use come to at API prices, as a multiple of what the plan cost?

```
tool subscriptions -d 2026-09-01..
```
````

Use absolute dates in command lines. A relative window such as "the last 7 days" makes the golden
file depend on the day the test runs.

## The golden test

The test parses `docs/use-cases.md`, runs each command in-process on the fixtures, and compares the
output with `test/golden/<use case id>[-<fixture>].txt`:

- a command with a per-item placeholder runs once per fixture;
- a command without one runs once over all fixtures;
- a command that writes outside the repository or calls a model or network has no golden file,
  and the test skips it by name, with the reason in a comment;
- the test fails when the program exposes a command no use case names, and when a golden file
  belongs to no use case;
- an update mode (`npm run golden:update` in workflow) rewrites the files and deletes stale ones,
  and the diff is reviewed like code.

Workflow's `test/golden.test.ts` is the worked example, about 60 lines.

## Adding and removing behaviour

1. Write the use case entry.
2. Implement the command.
3. Run the golden update and review the new file.

To remove behaviour, delete the use case, run the tests, and delete what they report as serving no
use case.
