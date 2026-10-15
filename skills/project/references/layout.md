# Layout

The tree is the first map a reader sees. Name every folder and file for what its code does, so the
listing reads as a description of the program.

## Rules

- **Thin entry point.** The entry file parses arguments, prints help and dispatches. It holds no
  behaviour.
- **One file per group of use cases** under `src/commands/` (or the language's equivalent). Name the
  file for the use cases it answers.
- **One folder per external system**, holding everything the code knows about it: its files,
  formats, processes, commands, credentials and endpoints. An `index` file is the only way in, and
  a guard test keeps the system's names inside the folder. Code shared by those folders goes in a
  `common/` folder beside them.
- **Model and derived facts** sit at the top of `src/`: the domain model in one file, facts derived
  from it in another, lookups over `data/` in a third.
- **Operator facts in `data/`.** Prices, plans, limits, thresholds, tiers and exchange rates are
  JSON files under `data/`, each carrying its source and date as fields, because JSON has no
  comments. Code reads them through one typed module.
- **Outside the program.** `test/`, `scripts/`, `research/` for one-off analyses, `docs/` for use
  cases and plans.

## SYSTEM.md

`SYSTEM.md` at the repository root holds three sections: the layout, how a request or command
flows through it, and where new code goes.

````markdown
# System

<What the program is, in one or two sentences.>

## Layout

```
data/                 facts the operator keeps, as JSON
  prices.json         token prices per model, with source pages and date
src/
  cli.ts              argument parsing, help and dispatch
  commands/           one file per group of use cases
  harnesses/          one folder per external system; index.ts is the only way in
  model.ts            the domain model
```

## How a command runs

1. ...

## Where new code goes

- A new command goes in `src/commands/`, in the file of its use case group.
- Anything that names an external system's files or formats goes in that system's folder.
- A fact the operator maintains goes in `data/`.
- A new folder or top-level file gets a line in the layout above.
````

## AGENTS.md rules

Add these rules to the repository's `AGENTS.md`, adapted to its paths and commands:

Each rule follows the shape in `agents.md`: the rule, its reason and when to revisit it.

```markdown
1. Read <external system> data only in `src/<systems>/`, so a format change touches one folder.
   `test/guards.test.ts` enforces this.
2. In tests, import only <public entry points>, so internal code moves without rewriting tests.
   `test/guards.test.ts` enforces this.
3. Start new behaviour as a use case in `docs/use-cases.md` and update the golden files, with no
   unit test: code exists to answer the operator's questions.
4. When a use case no longer serves the operator, delete it and the code the check reports as
   serving no use case, so unused code does not accumulate.
5. When the check warns above 10 seconds, delete or merge tests before adding more: a slow check
   stops being run. Revisit when the pre-push hook moves to CI.
6. Put code in the folder that names what it does and operator facts in `data/`, so the tree reads
   as a map. `SYSTEM.md` maps the folders; add a line there for a new folder or file.
```
