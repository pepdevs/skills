---
name: m3-review
description: Judge a pull request's diff against the Material 3 corpus at the base revision, the plan's acceptance items and the repository's AGENTS.md. Use when a capsule names a base revision, a head revision and a round.
---

# M3 review

Judge a diff against `docs/m3/` at the base revision. Apply `writing-style` to the reply.
The capsule names the round, the base revision, the head revision, the acceptance items and
any extra command. Start from [assets/capsule.md](assets/capsule.md); the launch line is under
"Run".

## Scope

- Read the diff `git diff <base>...<head>`, the repository at the head revision, the corpus in
  `docs/m3/` at the base revision, the plan's acceptance items and `AGENTS.md`.
- Keep `gh` closed. The PR body and comments hold the builder's summary, so they stay closed.
- Open no page of m3.material.io. The corpus is the spec. `npm run m3:check` and
  `npm run m3:sync` open the site, so run neither.
- A statement you cannot find in the corpus, or two corpus statements that conflict, is a
  finding for `m3-corpus`. Record it with the disposition `for the operator` and read nothing
  around it.
- Receive no builder or coordinator conclusions. Judge from the diff, the corpus and the criteria.

## Steps

1. Check out the head revision in the detached worktree.
2. Run `npm ci`.
3. Read each acceptance item and each `AGENTS.md` rule that applies to the diff.
4. Run `npm run check`, and any command the capsule names. Reproduce each failing item before
   you list it.
5. Read the diff with `git diff <base>...<head>`.
6. For each decision in the diff, find the `docs/m3/` file that states it at the base revision.
   Compare the value, role, name or behaviour with that file, and with the figure where two
   readings exist.
7. Name each divergence: a wrong value, a swapped role, an unstated behaviour, a conflict
   between corpus statements, a rule broken. Where two readings exist, the evidence names the
   figure that supports yours.
8. When the diff changes `docs/m3/`, add a row for `m3-corpus` with the disposition
   `for the operator`.

## Review table

One row per finding. No findings is a valid result: write the table header and "No findings".

| Corpus revision | File and line | Acceptance item | Evidence | Severity | Disposition |
| --- | --- | --- | --- | --- | --- |

- Corpus revision: the output of `git log -1 --format=%h <base> -- docs/m3`.
- File and line: the changed file and line, with the `docs/m3/` file and line it contradicts.
- Evidence: the command output or the text read on each side.
- Severity: `blocks acceptance` when an acceptance item is unmet by something you reproduced or
  read directly. Otherwise `minor`.
- Disposition: `fix` or `for the operator`.

After the table, list each acceptance item met with what was run, and each step not run.

## Videos

Corpus videos are Git LFS pointers. When a decision rests on a video, run
`git lfs install --local`, then `git lfs pull -I <path> -X ""`. Extract frames with `ffmpeg` and
compare them with the file's `Description:` line.

## Rounds

- Run at most three rounds on one pull request. The capsule names the round.
- Re-judge the whole scope in each round.
- In round 3, give every open finding the disposition `for the operator`.

## Calibration

The launcher calibrates before real work and judges the table; the session receives the normal
capsule. In a separate detached worktree, the launcher commits a colour role swap in a changed
file on a scratch branch off the pull request's head, and the capsule names the base revision
and that branch's head. The calibration passes when the table names the swapped role. A failed
calibration stops the review.

## Run

The worktree is detached and belongs to the reviewer. A Claude read-only session has no shell,
so this review runs with `--write`, and the capsule holds the limits:

```sh
wf run <harness> <model> -i <capsule> -k m3-review -p <detached worktree> --write --plan <owner/repo>#<number>
```

Routing stays with `delegate`. Change no tracked file, commit nothing, push nothing and write
nothing to GitHub. Keep scratch output in a temporary directory and report in the reply.
