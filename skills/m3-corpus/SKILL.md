---
name: m3-corpus
description: Judge the committed Material 3 corpus in docs/m3/ against the live site m3.material.io, block by block in a browser. Use when a capsule names a corpus revision and the pages to judge.
---

# M3 corpus review

Judge the corpus in `docs/m3/` against m3.material.io. Apply `writing-style` to the reply.
The capsule names the round, the section or pull request, the corpus revision, the pages and
the acceptance items. Start from [assets/capsule.md](assets/capsule.md); the launch line is
under "Run".

## Scope

- Read `docs/m3/` and the live site. Read no other code. `src/`, `web/` and `tokens/` stay closed.
- Use the tools only through `npm run m3:check -- <filter>`. It takes one filter per run and
  keeps the last, so run it once per page or section.
- Receive no builder or coordinator conclusions. Judge from the pages and the site.

## Steps

1. Check out the named corpus revision in the detached worktree. Note the revision for every row.
2. Run `npm ci`.
3. Run `npx playwright install chromium`. Without it the `m3` tools fail with
   `ERR_MODULE_NOT_FOUND: playwright`.
4. Run `npm run m3:check -- <filter>` once per page in scope. Record each page's row. A failing
   page is a finding.
5. Open each page in a browser through Playwright and read its controls. A Baseline-type token
   viewer has a `Token set selector`, a context selector and `Expand all`: read every
   combination of selector, context and expansion. Expand every tab and every expandable section.
6. Scroll `.page-content` to its end, because the window does not scroll and lazy images load
   only there. Compare the loaded image count with the file's image count before reading on.
7. Compare the page with its file block by block, in page order: headings, paragraphs, lists,
   tables, captions, figures, videos and demo URLs. Name each block that is missing, added,
   reordered or altered.
8. Compare each figure with its `Description:` line. A description that omits or contradicts
   what the figure shows is a finding.
9. Fetch each video. Corpus videos are Git LFS pointers: run `git lfs install --local`, then
   `git lfs pull -I <path> -X ""`.
10. Extract frames from each fetched video with `ffmpeg` and compare them with its
    `Description:` line.
11. Reproduce each suspected finding on the live page before you list it.

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

- Run at most three rounds on one pull request or one section. The capsule names which in its
  `Section or pull request` field and counts the round against it.
- Re-judge the whole scope in each round.
- In round 3, give every open finding the disposition `for the operator`.

## Calibration

The launcher calibrates before real work and judges the table; the session receives the normal
capsule. In a separate detached worktree, the launcher commits a deletion of one paragraph from
a Color page file and names that revision in the capsule. The calibration passes when the table
names the deleted paragraph. A failed calibration stops the review.

## Run

The worktree is detached and belongs to the reviewer. A Claude read-only session has no shell,
so this review runs with `--write`, and the capsule holds the limits:

```sh
wf run <harness> <model> -i <capsule> -k m3-corpus -p <detached worktree> --write --plan <owner/repo>#<number>
```

Routing stays with `delegate`. Change no tracked file, commit nothing, push nothing and write
nothing to GitHub. Keep scratch output in a temporary directory and report in the reply.
