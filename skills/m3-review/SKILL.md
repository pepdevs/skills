---
name: m3-review
description: Judge a pull request against the Material 3 corpus at the pull request's revision, the plan's acceptance items and the repository's AGENTS.md. Use when a capsule names a pull request and its round.
---

# M3 review

Judge a pull request against `docs/m3/` at the pull request's revision. Apply `writing-style`
to the reply. The capsule names the round, the revision, the pull request and the acceptance
items. Start from [assets/capsule.md](assets/capsule.md); the launch line is under "Run".

## Scope

- Read the diff, the repository at the pull request's revision, the corpus in `docs/m3/`, the
  plan's acceptance items and `AGENTS.md`.
- Open no page of m3.material.io. The corpus is the spec.
- A statement you cannot find in the corpus is a finding for `m3-corpus`. Record it with the
  disposition `for the operator` and read nothing around it.
- Receive no builder or coordinator conclusions. Judge from the diff, the corpus and the criteria.

## Steps

1. Check out the pull request's revision in the detached worktree. Note the corpus revision it
   holds for every row.
2. Read each acceptance item and each `AGENTS.md` rule that applies to the diff.
3. Run the checks the repository exposes for each item, such as `npm run check`. Reproduce each
   failing item before you list it.
4. For each decision in the diff, find the `docs/m3/` file that states it. Compare the value,
   role, name or behaviour with that file, and with the figure where two readings exist.
5. Name each divergence: a wrong value, a swapped role, an unstated behaviour, a rule broken.

## Review table

One row per finding. No findings is a valid result: write the table header and "No findings".

| Corpus revision | File and line | Acceptance item | Evidence | Severity | Disposition |
| --- | --- | --- | --- | --- | --- |

- File and line: the changed file and line, with the `docs/m3/` file and line it contradicts.
- Evidence: the command output or the text read on each side.
- Severity: `blocks acceptance` when an acceptance item is unmet by something you reproduced or
  read directly. Otherwise `minor`.
- Disposition: `fix` or `for the operator`.

After the table, list each acceptance item met with what was run, and each step not run.

## Rounds

- Run at most three rounds on one pull request. The capsule names the round.
- Re-judge the whole scope in each round.
- In round 3, give every open finding the disposition `for the operator`.

## Calibration

Calibrate on one seeded defect before real work. In a scratch copy of the worktree, swap one
colour role for another in a changed file, and run the steps on that diff. The calibration
passes when the table names the swapped role. A failed calibration stops the review.

## Run

The worktree is detached and belongs to the reviewer. A `wf` read-only session has no shell, so
run the session with `--write`; the capsule holds the limits:

```sh
wf run <harness> <model> -i <capsule> -k m3-review -p <detached worktree> --write
```

Change no tracked file, commit nothing, push nothing and write nothing to GitHub. Keep scratch
output in a temporary directory and report in the reply.
