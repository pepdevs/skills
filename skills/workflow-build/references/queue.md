# Reconstructing the queue

Use the actual GitHub issue bodies, full comment histories, and current PR state:

```bash
node <workflow-build-skill>/scripts/queue.mjs collect <owner/repo> <plan-id>
```

The helper fetches closed and open issues, follows dependencies across repositories, and returns the
snapshot and queue. Run it for each repository containing outcome issues. It reports missing or
cyclic dependencies and malformed machine records rather than guessing readiness.

Queue states are `implement`, `evaluate`, `reconcile`, `accepted`, `waiting`, `blocked`, or `merged`. These are
derived views, not mandatory GitHub labels. A current PASS permits dependent work before merge. Two
unmerged parents require waiting for merge. Parent head changes or squash merges invalidate old
descendant acceptance. A closed, unmerged PR cannot satisfy a dependency.

The collector reconciles detailed PR evaluations with issue summaries. A newer detailed verdict
whose summary is missing returns `reconcile`, even when an older PASS exists. Recover that verdict's
original body and ID and run the acceptance publisher before continuing. Missing or mismatched
detailed evidence blocks the outcome. If its commits are stale, evaluate the current revision.

The wrapper interprets progress from evidence. After a persistent stall or consequential unresolved
choice, append an issue comment explaining the boundary and next needed action. Include:

```html
<!-- workflow-blocked: {"schema":1,"active":true,"reason":"Concrete missing decision or stalled acceptance criterion"} -->
```

After the boundary is resolved or the user authorizes continuation, append the resolution with
`active: false`. Preserve earlier records. External temporary capacity limits can remain invocation
status rather than permanently blocking an otherwise executable outcome.

Record each run's session id, model, checkpoint links, and remaining work on the issue after it ends.
On resume, read those records, `wf status` and the PR before launching a continuation or a retry.
The queue helper deliberately does not infer completion from commit count or process success. A PR
with a useful checkpoint may require continuation even though its next review state is `evaluate`;
inspect the checkpoint before launching evaluation.

For offline checks, `derive <snapshot.json>` accepts an array with one object per outcome:
`url`, `dependencies` (issue URLs), `closed` (boolean), `blocked` (reason or null), `pr` (null or
`url`, `headSha`, `state`, `merged`, `mergeSha`), and `evaluations` (ordered evaluation markers with
`published` and `missingEvidence` flags from reconciliation).
The collector creates this shape directly from GitHub. Tests can exercise readiness without network
access or mutable GitHub fixtures.
