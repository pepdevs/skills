---
name: evaluate
description: Review a pull request against its outcome and repository practices, or inspect a material deliverable through its consumer path.
---

# Evaluate

Read the installed `writing-style` skill and apply it to every written artifact.
Choose the path from the supplied artifact: PR review or direct deliverable inspection.

## Review a pull request

### Read

Read the PR's exact head and base, repository instructions, diff, checks, and linked outcome issue.
Read the pinned confirmed plan for context.
Without an outcome issue, review the PR's stated intent and report that outcome acceptance is unavailable.

Find repository-local verification skills through repository instructions and skill directories.
Read the applicable skill and feature-map entries. Map acceptance criteria and affected user paths to the available checks.

On a re-review, when an earlier verdict for this PR exists, start from its record. Read the diff from
its reviewed head to the current head, or `git range-diff` after a rebase. Reread only the
instructions, documents, and code that diff touches. Re-verify each open finding and each
acceptance criterion the diff affects.

### Review

Assess correctness, regressions, maintainability, security where relevant, and repository practices.
Review changed verification recipes and helpers too. Check that they preserve required behavior and expose failures.

Keep reviewed source unchanged. Give each finding its impact, evidence or reproduction, and bounded required correction.
Separate acceptance blockers from optional improvements. Preferences alone do not block acceptance.
Retain finding identities across repairs.
Classify each blocker: the change breaks the criterion as written, or the finding needs the
criterion widened to cover a case its stated boundary excludes. Block on the first. Report the
second as a nonblocking finding that names the case, its risk, and the owner decision it needs.

### Verify

Run applicable linting, tests, and type checks at the reviewed revision.
Wait for a long-running check with one blocking call. Each short poll resends the whole context.
Independently run relevant verification recipes for affected user paths and material failure cases.
Inspect their actual results against the outcome. Builder evidence guides review; verify the required behavior yourself.

Follow the verification skill's setup, isolation, and cleanup instructions.
Keep runtime state and evidence outside reviewed source. Retain evidence after cleanup.
Use the references below when other consumed-form inspection is needed.

When a verification skill is absent or incomplete, use another real consumer path and report the coverage gap.
Report needed verifier repairs for implementation. Missing required proof prevents acceptance.

### Decide

- PASS: acceptance and relevant checks are satisfied.
- CHANGES: actionable blockers require implementation changes.
- BLOCKED: missing decisions, access, or required proof prevent judgment.

Bind the verdict to the exact reviewed head and dependency commits. Fetch them again before publication.
If they changed, evaluate the new revision before publishing a verdict.

### Publish

For an outcome PR, follow [acceptance publication](references/acceptance.md).
Publish detailed PR findings and an append-only issue summary with the same record identity. Read both back.
Mark a passing PR ready for human review. Keep the issue open until merge; humans control merges.
Return the verdict, reviewed commits, evidence, and durable review links.

## Inspect a deliverable directly

Use this path when a material defect can remain hidden until someone consumes the output and direct
inspection adds evidence beyond normal checks. Routine prose, configuration, or source edits normally
need their ordinary checks; explicit requests may call for deeper inspection.

Identify the consumer, consumed form, inspection method, and observable acceptance. Inspect the
actual artifact, not its creation command or a producer's summary. A write-authorized producer may
fix in-scope defects and repeat affected inspection. A reviewer reports defects for the owner to fix.
Report the inspected artifact, observations, evidence, and any unavailable verifier.

Read only the reference relevant to the output:

- Visual or formatted outputs: [rendered inspection](references/rendered.md).
- Applications, CLIs, services, and configuration: [runtime inspection](references/runtime.md).
- Published objects or generated batches: [external and batch inspection](references/external-and-batch.md).
