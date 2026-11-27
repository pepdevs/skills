---
plan_schema: 1
plan_id: "f304e038-a5cd-4eff-9d45-ef1e7e291f25"
status: confirmed
confirmed_at: 2026-11-27
superseded_by: null
---

# Move m3-corpus and m3-review to pepdevs/m3-specs

## Why

Two Material 3 skills in the public skills repository cannot run for anyone who installs them, because they need a corpus and commands that live in another repository. Once this is built, both skills sit in that repository beside the corpus, the public repository lists neither, and this machine no longer installs them, since the operator does not use them now. The operator asked on 27 November 2026 to move them to the repository without deploying them through agents.

## Purpose and success

`m3-corpus` and `m3-review` need `docs/m3/`, `npm run m3:check` and the Material 3 corpus at a
pinned revision. Only `pepdevs/m3-specs` holds that corpus and those commands. `pepdevs/skills` is
the public link in the operator's X bio, and a reader who installs either skill from it gets a skill
that cannot run. The operator does not use either skill today, so they move as files and no
deployment installs them.

Facts that settle the destination:

- `pepdevs/m3-specs` holds `docs/m3/`, `m3:sync` and `m3:check`. Its rule 5 names both reviewers.
- `pepdevs/material`, the only repository with `tokens/m3-specs-revision.json`, was archived on
  2026-11-03.
- `config/deployment.json` in `pepdevs/agents` installs both skills from the `authored` source
  (`pepdevs/skills`) for the `personal` profile.

Acceptance:

1. `pepdevs/m3-specs` holds `skills/m3-corpus/` and `skills/m3-review/` with their `SKILL.md`,
   `agents/openai.yaml`, `assets/capsule.md` and `skill-dependencies.json`. `npm run check` passes.
2. `pepdevs/skills` holds neither skill. `grep -rn "m3" README.md AGENTS.md external-dependencies.json scripts/`
   prints nothing, and `node scripts/check.mjs` passes.
3. `config/deployment.json` in `pepdevs/agents` lists neither skill, and after the next deploy
   `~/.claude/skills` and `~/.agents/skills` hold neither. `npm run check` and `npm run golden` pass.

## Principles

- **The corpus owner owns its reviewers.** A skill that needs a repository's files and commands
  lives in that repository. A public skill in `pepdevs/skills` runs from any checkout.
- **No deployment.** The operator does not use the two skills now, so `pepdevs/agents` drops them
  instead of installing them from `m3-specs`. A session that needs one reads it from the
  `m3-specs` checkout. Revisit when the operator runs Material 3 reviews again.
- **The skill text moves unchanged** except `m3-review`'s corpus location, which now reads only
  `docs/m3/` at the base revision: inside `m3-specs` the sibling checkout and its revision file no
  longer exist.

## Increments

1. **`pepdevs/m3-specs`: add the skills.** Copy both skill directories into `skills/`, with
   `m3-review` reading the corpus from `docs/m3/` at the base revision only. Add a `skills/` line to
   the layout in `SYSTEM.md`. Point rule 5 in `AGENTS.md` at `skills/m3-corpus` and
   `skills/m3-review`. Add one line to `README.md` naming the commands the skills run: `git-lfs`,
   `ffmpeg` and `wf` from `pepdevs/workflow`. Check: acceptance 1.
   Done on 2026-11-27. [pepdevs/m3-specs#54](https://github.com/pepdevs/m3-specs/pull/54) added the skills, and `npm run check` passes.
2. **`pepdevs/agents`: stop installing them.** Remove the `m3-corpus` and `m3-review` entries from
   `config/deployment.json`. Check: `npm run check` and `npm run golden` pass.
   Done on 2026-11-27. [pepdevs/agents#192](https://github.com/pepdevs/agents/pull/192) removed the entries, and `npm run check` and `npm run golden` pass.
3. **`pepdevs/skills`: remove the skills.** Delete `skills/m3-corpus/` and `skills/m3-review/`.
   Remove their two README rows and the paragraph on their needs. Remove them from each `usedBy`
   list in `external-dependencies.json`, and remove the `git-lfs` and `ffmpeg` entries, which no
   other skill uses. Remove the `m3-review` exception from rule 7 in `AGENTS.md` and from `isLead`
   in `scripts/check.mjs`. Advance the `authored` pin in `pepdevs/agents` to this merge and deploy
   the `personal` profile. Check: acceptance 2 and 3.
   Done on 2026-11-27. [pepdevs/skills#43](https://github.com/pepdevs/skills/pull/43) removed the skills, and `node scripts/check.mjs` passes. The `pepdevs/agents` pin advance and deploy follow.

Review gate: the operator reads the `pepdevs/skills` README on GitHub after increment 3.

## Scope and boundaries

- Included: the three increments above in `pepdevs/m3-specs`, `pepdevs/agents` and `pepdevs/skills`.
- Excluded: a deployment source for `m3-specs` in `pepdevs/agents`.
- Excluded: changes to `pepdevs/ui`, which holds no corpus. The archived `pepdevs/material` stays
  as it is.
- Excluded: `m3-specs/docs/plans/0001-foundations.md`, which records where the skills lived when it
  was built. A plan keeps its history.
- Excluded: Git history of the skill files. The copy starts their history in `m3-specs`; the old
  history stays in `pepdevs/skills`.
- `wf run -k m3-corpus` and `-k m3-review` stop finding the skills after the deploy in increment 3.

## Open questions

None.
