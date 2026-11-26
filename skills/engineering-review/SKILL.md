---
name: engineering-review
description: Engineering review of one repository. Runs the checks of the repository's engineering runbook for four concerns (gates and revisit rules, code structure, dependencies, and triage of its open ideas), judges them by the repository's own rules, then proposes the two with the largest measured problem, each with evidence, a change sketch and a figure, and keeps the runbook current through proposals. Use when a task asks to run the engineering lead or for an engineering review of a repository.
---

# Engineering review

You review one repository in a checkout of it, usually headless with nobody to answer. The task
supplies the protocol: the notes directory, the past decisions with their reasons, the open ideas,
how to file a proposal with its figure, and how to record the run. This skill says what each
concern covers and how to judge it. The runbook says how this repository is measured.

The repository is the boundary. Evidence comes from its files, its history, its checks, its pull
requests and the idea list. Runtime evidence from production hosts, logs or collectors is out of
scope. Change no code, commit nothing, open no pull request and write to no database. Write notes,
check output and figures to the notes directory.

Write every title, description and figure label with `writing-style`, Documentation register.

## Read the repository

1. Read `AGENTS.md`, `SYSTEM.md`, `CONTEXT.md` and `README.md` at the root, and each `AGENTS.md`
   in a folder a concern touches.
2. Note the check and its tiers, the hooks and the hosted workflows, and each budget the
   repository states, with the file and line that state it.
3. Install dependencies the way the repository says.
4. Use the terms `CONTEXT.md` defines in every proposal.

## Runbook

The engineering runbook, `docs/runbooks/engineering.md`, lists the checks for each concern on this
repository: what each measures, its read-only command, its threshold and the source of any cost.

1. Read the runbook. Run every check it lists.
2. Save each check's output to the notes directory.
3. Judge each result by the concern's rules below and the threshold the runbook states.
4. A check that needs a service the checkout lacks, or no longer runs, stays unrun: note it and go
   on.

When the repository has no engineering runbook, measure what its `AGENTS.md`, `SYSTEM.md` and
`README.md` state, say so in the record, and file the runbook proposal in
[Keep the runbook](#keep-the-runbook).

## Concerns

Measure all four concerns every run. For each finding, note the measurement, its check and the
threshold it breaks.

### Gates and revisit rules

The time of each gate tier against its budget, tier warnings, the slowest test files, flaky tests
and workflows, and every revisit condition in an `AGENTS.md`.

- Rerun each failing or suspect test file three times before calling it flaky. A workflow that
  failed and passed on one commit is flaky.
- Judge each revisit condition against current evidence: a measured time, a file that exists, a
  version, a merged change. Mark it holds, does not hold or undecided, with the evidence.

A problem: a tier over its budget or within a tenth of it, a tier warning, a test file over the
runbook's threshold, a flaky test or workflow, or a revisit condition that holds.

### Code structure

Duplicated code, module size per file and per folder `SYSTEM.md` names, churn hot spots and files
changed together over 90 days, and architecture exceptions: allow lists and inline suppressions,
compared with 90 days ago.

A problem: a block repeated in three or more places, a file over the runbook's size threshold
that is also a churn hot spot, a pair changed together in most of their commits across a module
boundary, or an exception list that grew.

### Dependencies

Outdated packages, security advisories and alerts, and the runtime version each place pins: the
local toolchain, the manifests, the images and the hosted workflows. Compare them with each other
and with the runtime's release schedule when it is reachable. A source the run has no permission
for is a note, and the run goes on.

A problem: a high or critical advisory with a fix, a direct dependency one or more major versions
behind, a runtime past or within six months of end of life, or runtime versions that disagree.

### Triage

The task supplies the target's open ideas that no lead filed, each with its ID, title and
description.

1. List the files, paths, skills, commands and terms each idea names. Check each one exists in
   the tree.
2. Search the merged pull requests and the tree for the outcome.
3. Compare the ideas with each other by problem and outcome.
4. Choose a move per idea where the evidence settles it:
   - **drop as stale**: the idea names a file, skill or path that no longer exists, or a problem
     the code no longer has.
   - **drop as built**: a merged pull request or existing code delivers the outcome.
   - **merge into <id>**: two ideas share a problem and outcome. Keep the one with the fuller
     description and name the duplicate's distinct points in the reason.
5. Order the moves by strength of evidence. An idea without settling evidence stays.

## Choose

1. Score each of gates, structure and dependencies from 0 to 3 by its measured problem:
   - 0: nothing breaks a threshold.
   - 1: one finding at its threshold.
   - 2: a finding past its threshold, or several at it.
   - 3: a gate over budget on every push, a critical advisory, or a revisit condition that holds
     and blocks other work.
2. Read the reason of each past decision. Raise a concern whose kept proposals' reasons ask for
   more of it, and lower one that dropped reasons reject. Skip a change that a dropped reason
   rejects or that an open idea already makes.
3. Propose the two concerns with the highest weighted score. A concern scored 0 files nothing.
4. File the triage proposal when the move list holds at least one move and the task says one is
   due.

## Keep the runbook

The runbook is yours to keep current. File a proposal against `docs/runbooks/engineering.md`,
within the task's room for the repository, when:

- a check fails to run, or its command no longer matches the repository;
- a check has no threshold, or its threshold disagrees with a budget the repository states;
- a gate, tier, workflow or package folder has no check.

The proposal names the entry, the evidence and the entry's new text: what it measures, the
read-only command, its threshold and the source of any cost.

When the repository has no engineering runbook, file one proposal that drafts it from the
repository's own documents and scripts: one entry per concern part above, each with what it
measures, a read-only command the repository supports, its threshold and cost source, and each
entry's source file. Point at the document that already owns a command instead of copying it.

## Write the proposal

Give each proposal a title that names the problem and the change. Write the description in
Markdown with these sections:

- `## Concern`: the concern, and the problem it measured.
- `## Evidence`: one line per measurement with its source: the check and the shape of its output,
  file paths with lines, commit ranges, pull request numbers.
- `## Change sketch`: the files to change, any rule text to add or replace, and the expected
  result, such as a gate time or a package version.
- `## Outcome`: what holds once the change lands, as a check the operator can run.

The triage proposal has `## Concern`, `## Moves` and `## Outcome`. `## Moves` is a table:

```markdown
| Idea | Move | Reason |
| --- | --- | --- |
| <id> | drop as built | `<path>` delivers it since #<pr> |
| <id> | merge into <id> | same problem; keeps its point on <topic> |
```

## Figure

Draw one figure per proposal from its measurements, so the operator sees the problem first.

1. Choose the form that fits the evidence, and a different form for each proposal of the run:
   - a bar or line chart: gate times against the budget, test durations, churn over weeks;
   - a file view: the duplicated blocks side by side, or a file tree sized by lines;
   - a table: packages with current and latest versions, or revisit conditions with their state;
   - a diff: the rule text or configuration the change sketch proposes.
   Boxes and arrows are the last resort.
2. Draw it self-contained, with no request to another address. Labels, values and axis names
   only, with no title, caption or explaining sentence. Mark the change and the problem in two
   colours that keep their meaning across the run's figures.
3. Render it and look at the image. Fix clipped or overlapping text, text too small to read and
   empty areas.

## Privacy

Every proposal and figure carries evidence from the repository, its checks and the idea list only.

- Read no data file the repository ignores, such as environment files, data directories or local
  databases.
- Copy no amount, name or record from the target's data. Quote test fixtures only when they are
  invented, and prefer their file path.
- Before filing, read the description and the figure once more for any such value, and remove it.
