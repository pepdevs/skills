---
name: engineering-review
description: Engineering review of one repository. Measures four concerns from the repository's own rules and checks (gates and revisit rules, code structure, dependencies, and triage of its open ideas), then proposes the two with the largest measured problem, each with evidence, a change sketch and a figure. Use when a task asks to run the engineering lead or for an engineering review of a repository.
---

# Engineering review

You review one repository in a checkout of it, usually headless with nobody to answer. The task
supplies the protocol: the notes directory, the past decisions with their reasons, the open ideas,
how to file a proposal with its figure, and how to record the run. This skill says what to measure
and how to judge it.

The repository is the boundary. Evidence comes from its files, its Git history, its checks, its
pull requests and the idea list. Runtime evidence from production hosts, logs or collectors is out
of scope. Change no code, commit nothing, open no pull request and write to no database. Write
notes, command output and figures to the notes directory.

Write every title, description and figure label with `writing-style`, Documentation register.

## Read the repository

1. Read `AGENTS.md`, `SYSTEM.md`, `CONTEXT.md` and `README.md` at the root, and each `AGENTS.md`
   in a folder a concern touches.
2. Read the scripts in `package.json`: the check, its tiers, and what each tier runs. Read the
   hooks in `.githooks/` or `.husky/`, and the workflows in `.github/workflows/`.
3. Find the gate and budget scripts: `grep -rln -i -E "budget|tier" scripts/`. Note each stated
   budget with the file and line that states it.
4. Install dependencies the way the repository says, usually `npm ci` in each folder with a
   `package-lock.json`.
5. Use the terms `CONTEXT.md` defines in every proposal.

## Measure

Measure all four concerns every run. Save each command's output to the notes directory. For each
finding, note the measurement, its source and the threshold it breaks.

### Gates and revisit rules

1. Time each gate tier the repository names, such as `/usr/bin/time -f %e npm run check:quick`.
   When a tier needs a service the checkout lacks, note it and time the tiers that run.
2. Run the budget script when there is one. Note each tier warning and the budget it names.
3. List the 10 slowest test files from the test runner's duration report, such as
   `npx vitest run --reporter=json`. Rerun each failing or suspect file three times.
4. Find flaky runs in CI: `gh run list --limit 100 --json headSha,conclusion,workflowName`. A
   workflow that failed and passed on one commit is flaky.
5. List every revisit condition: `grep -rn "Revisit when" --include=AGENTS.md .`. Judge each one
   against current evidence: a measured time, a file that exists, a version, a merged change. Mark
   it holds, does not hold or undecided, with the evidence.

A problem: a tier over its budget or within 10% of it, a tier warning, a test file over 10 seconds,
a flaky test or workflow, or a revisit condition that holds.

### Code structure

1. Duplicated code: `npx --yes jscpd@4 --min-lines 10 --reporters json --output <notes>/jscpd <source dirs>`.
2. Module size: `git ls-files '*.ts' '*.tsx' '*.js' '*.mjs' | xargs wc -l | sort -rn | head -20`,
   and lines per domain or module folder that `SYSTEM.md` names.
3. Churn hot spots over 90 days:
   `git log --since=90.days --name-only --format= | sort | uniq -c | sort -rn | head -20`.
4. Files changed together over 90 days:

   ```sh
   git log --since=90.days --format=@ --name-only | awk '/^@/{for(a in f)for(b in f)if(a<b)c[a" "b]++;split("",f);next}
   NF{f[$0]=1} END{for(a in f)for(b in f)if(a<b)c[a" "b]++; for(p in c)print c[p],p}' | sort -rn | head -20
   ```

5. Architecture exceptions: the allow lists in the architecture check, and inline suppressions
   such as `git grep -n -E "eslint-disable|@ts-ignore|@ts-expect-error"`. Compare their count with
   90 days ago through `git show <commit>:<file>`.

A problem: a block repeated in three or more places, a file over 500 lines that is also a churn hot
spot, a pair changed together in most of their commits across a module boundary, or an exception
list that grew.

### Dependencies

1. Outdated packages: `npm outdated --json` in each folder with a `package-lock.json`.
2. Advisories: `npm audit --json` in the same folders.
3. Dependabot alerts: `gh api "repos/{owner}/{repo}/dependabot/alerts?state=open" --paginate`.
   A 403 or 404 means no permission: note it and go on.
4. Runtime versions: `.nvmrc`, `engines` in `package.json`, `FROM` lines in Dockerfiles and the
   runtime version in CI workflows. Compare them with each other and with the runtime's release
   schedule when it is reachable.

A problem: a high or critical advisory with a fix, a direct dependency one or more major versions
behind, a runtime past or within six months of end of life, or runtime versions that disagree.

### Triage

The task supplies the target's open ideas that no lead filed, each with its ID, title and
description.

1. List the files, paths, skills, commands and terms each idea names. Check each one exists with
   `git ls-files | grep <name>` or `ls`.
2. Search for the outcome: `gh pr list --state merged --search "<words>" --limit 10 --json number,title,mergedAt`
   and `git grep -n <term>`.
3. Compare the ideas with each other by problem and outcome.
4. Choose a move per idea where the evidence settles it:
   - **drop as stale**: the idea names a file, skill or path that no longer exists, or a problem
     the code no longer has.
   - **drop as built**: a merged pull request or existing code delivers the outcome.
   - **merge into <id>**: two ideas share a problem and outcome. Keep the one with the fuller
     description and name the duplicate's distinct points in the reason.
5. Keep at most 15 moves, strongest evidence first. An idea without settling evidence stays.

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

## Write the proposal

Give each proposal a title of at most 80 characters that names the problem and the change. Write
the description in Markdown with these sections:

- `## Concern`: the concern, and the problem in two or three sentences.
- `## Evidence`: one line per measurement with its source: the command and the shape of its output,
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
2. Write it as one self-contained HTML page in the notes directory: inline CSS and SVG, no script,
   no request to another address. Light background. Labels, values and axis names only, with no
   title, caption or explaining sentence. Mark the change in #3a5bff and the problem in #c2412d.
3. Render it at 1200 CSS pixels wide and device scale 2, 675 high, up to 1100 when the subject
   needs it. Use Playwright when the checkout has it:

   ```sh
   node --input-type=module -e "import { chromium } from 'playwright'; const b = await chromium.launch();
   const p = await b.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 2 });
   await p.goto('file://<notes>/<figure>.html'); await p.screenshot({ path: '<notes>/<figure>.png' }); await b.close();"
   ```

   Otherwise use headless Chrome:
   `google-chrome --headless --window-size=1200,675 --force-device-scale-factor=2 --screenshot=<notes>/<figure>.png file://<notes>/<figure>.html`.
4. Look at the PNG. Fix clipped or overlapping text, text under 15 pixels and empty areas. Keep it
   under 2 MiB.

## Privacy

Every proposal and figure carries evidence from the repository, its checks and the idea list only.

- Read no data file that Git ignores, such as `.env` files, data directories or local databases.
- Copy no amount, name or record from the target's data. Quote test fixtures only when they are
  invented, and prefer their file path.
- Before filing, read the description and the figure's HTML once more for any such value, and
  remove it.
