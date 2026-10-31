---
name: m3-corpus
description: Judge the committed Material 3 corpus in docs/m3/ against the live site m3.material.io, block by block in a browser. Use when a capsule names a corpus revision and the pages to judge.
---

# M3 corpus review

Judge the corpus in `docs/m3/` against m3.material.io. Apply `writing-style` to the reply.
The capsule names the round, the corpus revision, the pages and the acceptance items. Start
from [assets/capsule.md](assets/capsule.md); the launch line is under "Run".

## Scope

- Read `docs/m3/` and the live site. Read no other code. `src/`, `web/` and `tokens/` stay closed.
- Use the tools only through the commands they expose: `npm run m3:check -- <filter>` and
  `npm run m3:sync -- <filter>`. Run `m3:sync` only into a temporary copy, never into the worktree.
- Receive no builder or coordinator conclusions. Judge from the pages and the site.

## Steps

1. Check out the named corpus revision in the detached worktree. Note the revision for every row.
2. Run `npm run m3:check -- <filter>` on the pages in scope. Record each page's row. A failing
   page is a finding.
3. Open each page in a browser through Playwright. Expand every tab and every expandable
   section, scroll to the end, and wait for every lazy figure to load.
4. Compare the page with its file block by block, in page order: headings, paragraphs, lists,
   tables, captions, figures, videos and demo URLs. Name each block that is missing, added,
   reordered or altered.
5. Compare each figure and video with its `Description:` line. A description that omits or
   contradicts what the media shows is a finding.
6. Reproduce each suspected finding on the live page before you list it.

## Review table

One row per finding. No findings is a valid result: write the table header and "No findings".

| Corpus revision | Page and line | Acceptance item | Evidence | Severity | Disposition |
| --- | --- | --- | --- | --- | --- |

- Page and line: the `docs/m3/` file and the line, with the live block it differs from.
- Evidence: what you ran or read directly, such as the check row or the block text on each side.
- Severity: `blocks acceptance` when an acceptance item is unmet by something you reproduced or
  read directly. Otherwise `minor`.
- Disposition: `fix` or `for the operator`.

After the table, list each acceptance item met with what was run, and each step not run.

## Rounds

- Run at most three rounds on one pull request. The capsule names the round.
- Re-judge the whole scope in each round.
- In round 3, give every open finding the disposition `for the operator`.

## Calibration

Calibrate on one seeded defect before real work. Take a Color page, delete one paragraph from
its file in a scratch copy of the worktree, and run the steps on that page. The calibration
passes when the table names the dropped paragraph. A failed calibration stops the review.

## Run

The worktree is detached and belongs to the reviewer. A `wf` read-only session has no shell, so
run the session with `--write`; the capsule holds the limits:

```sh
wf run <harness> <model> -i <capsule> -k m3-corpus -p <detached worktree> --write
```

Change no tracked file, commit nothing, push nothing and write nothing to GitHub. Keep scratch
output in a temporary directory and report in the reply.
