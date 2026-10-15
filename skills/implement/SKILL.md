---
name: implement
description: Implement one outcome issue, verify its acceptance criteria, and create or update its implementation pull request.
---

# Implement

Complete the assigned outcome and publish its implementation PR.
Read the installed `writing-style` skill and apply it to every written artifact, including comments and commits.

## Read

Read the issue, confirmed plan revision, repository instructions, and any existing PR, evaluation findings, or checkpoint.
Read `references/outcome-contract.md` from the installed `to-outcomes` skill for issue metadata.
Use its contract and helpers here; decomposition is already complete.

Recover the existing PR for repairs or continuations. Fetch its current head and accepted dependencies before editing.
Keep unrelated changes outside the implementation worktree.

Find repository-local verification skills through repository instructions and skill directories.
Read the applicable skill and feature-map entries for the affected behavior.

## Build

Implement the issue's agreed scope using repository conventions and evidence. Choose the simplest design that fulfills its acceptance criteria.

Update verification recipes, feature maps, and helpers when the behavior changes. Include needed coverage in the same PR.
Keep their expected behavior aligned with the outcome's acceptance criteria.

For repairs, reproduce evaluation blockers and fix their causes. Preserve finding identities and record how each was addressed.

Surface product or architecture decisions outside the confirmed plan. Obtain the decision before proceeding with affected work; report blocked when it remains unresolved.

## Verify

Run relevant tests, linting, and type checks.
Use the repository's verification skill to exercise affected user paths and material failure cases.
Follow its setup, isolation, evidence, and cleanup instructions. Retain evidence after cleanup.
Without an applicable skill, verify through another real consumer path.

Record the checked revision, exercised paths, and evidence for the acceptance criteria.
Expose missing coverage, checks, credentials, services, or other limits.
Keep the agreed acceptance intact when proof is unavailable.

## Publish

Follow the installed `git` skill for commits and publication.
For stacked work, also follow the installed `gh-stack` skill.
Update the existing PR's head branch for repairs and continuations.

Link the issue with a closing reference.
Record the PR with `node <to-outcomes-skill>/scripts/outcomes.mjs link-pr <issue-url> <pr-url>`.
Describe resulting behavior, validation, and material limits; link the issue for the full contract.
Keep the PR draft until implementation and independent acceptance are complete.

Read the published PR and issue back. Verify their links and actual head.
Return the PR URL, commit, evidence, and unresolved limits. Completion hands the work to evaluation; humans control merges.

## Checkpoint

When work must stop before completion, preserve useful progress on the same PR.
Record completed work, remaining criteria, unresolved findings, checks, and the next concrete step.
A continuation resumes the same issue and PR.
