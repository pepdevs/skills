# Acceptance publication

Write the review for a human: verdict, acceptance evidence, relevant checks, actionable findings,
and unavailable proof. Apply the installed `writing-style` skill. Organize it for the change rather than filling a fixed
outline. Explain each finding's impact and correction; stable IDs connect repairs to earlier findings.

Append one small machine marker to the PR comment. Generate its UUID once and preserve the body and
ID across publication retries. Automation reads identities, verdict, and finding state, not prose.

```html
<!-- workflow-evaluation: {"schema":1,"id":"00000000-0000-4000-8000-000000000002","issueUrl":"https://github.com/owner/repo/issues/12","pullRequest":"https://github.com/owner/repo/pull/13","headSha":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","dependencies":[],"verdict":"PASS","findings":[]} -->
```

Each dependency is `{ "issueUrl": "...", "headSha": "<full commit>" }`. Use the current accepted
PR head for an unmerged dependency. After a parent merges and the stack is reconciled, use its actual
merge commit. A squash or rebase merge can change this commit and invalidate descendant acceptance.

Each finding has a stable `id`, boolean `blocking`, and `state` of `open` or `closed`. Keep its
explanation in the human review. Reuse the ID when the underlying defect persists. CHANGES needs an
open blocker; PASS cannot retain one. Optional improvements remain nonblocking.

```bash
node <evaluate-skill>/scripts/acceptance.mjs validate <review-body>
node <evaluate-skill>/scripts/acceptance.mjs publish <review-body>
```

The publisher verifies current PR and dependency commits, publishes the immutable detailed comment,
then appends a compact issue-history comment with a `workflow-acceptance` marker and detail link.
For PASS, each unmerged dependency also needs its own current published acceptance and detailed
evidence. Missing parent acceptance cannot be replaced with a matching commit alone.
If interrupted, rerun with the same file. It reconciles existing records rather than duplicating
them. Recheck a stale review against the new head and give that evaluation a new record ID.

Keep this body and its ID until publication and read-back complete. A remote write error can mean
the write succeeded; reconcile before creating another evaluation. Serialize evaluations for the
same outcome. The helper cannot turn GitHub's separate writes into an atomic transaction.

After a PASS, mark the PR ready using `gh pr ready` if it is drafted. Human decisions control merge.
