# Outcome contract

One issue owns one useful result and one implementation PR through repairs, continuations, and evaluations.
Apply `writing-style` to its body and history.

## Body additions

Write the body with `ticket-authoring`'s `references/ticket.md`. An outcome issue adds:

- **Plan line:** Start the visible description with the plan number from its filename when it has
  one. Link the plan on its default branch, the confirmed commit for the contract, and the overview
  issue when one exists. Link the plan for settled decisions instead of copying them.
- **Blockers:** Link prerequisite issues and say what each supplies, or state that none exist.
  Say whether an accepted upstream head is enough or a merge is required. Several independent code
  parents require their PRs to merge before this issue starts on one base.
- **Pull request:** Link the implementation PR once published.
- **Session checks:** Acceptance may name the repository's check commands and live checks an agent
  must run, because the evaluator runs them too. Keep each criterion to one outcome.
- **Bounded criteria:** State each security, isolation, or "any X fails" criterion as the mechanism
  that enforces it and the boundary it excludes. Example: "only `platform/scope.ts` issues a scope;
  reads reject an unissued scope at runtime; deliberate reflection inside the process is out of
  scope." An unbounded property lets each evaluation find a new counterexample. Ask the owner to
  settle the boundary before publication when the plan leaves it open.

Resolve missing product or architecture decisions before treating the issue as executable.

## Overview issue

A plan with more than three implementation issues gets one plan-numbered issue that maps them. It links the plan on the default branch
and at its confirmed commit, names every implementation issue and shows direct dependencies in a
graph with a linked text table. State merge gates beside the graph. It has no outcome marker or
implementation PR; each implementation issue keeps its own acceptance and history.

## History

Append compact evaluation summaries to the issue timeline. Record the verdict, judged head, dependency commits, and detailed PR evaluation link.
Name remaining blockers or resolved findings when they affect the next action. Keep detailed evidence in the immutable PR evaluation.

PASS means ready for human merge. CHANGES identifies repairs. BLOCKED identifies a boundary requiring resolution.
Changed PR or dependency commits require renewed acceptance; older records remain history.

An unevaluated issue needs no placeholder history. Close the issue after its PR merges.
A closed, unmerged PR leaves a stopped outcome.

## Metadata

Automation reads one marker in the body; prose headings remain flexible:

```html
<!-- workflow-outcome: {"schema":1,"key":"descriptive-stable-key","planId":"00000000-0000-4000-8000-000000000001","planUrl":"https://github.com/owner/repo/blob/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/docs/plans/0001-example.md","dependencies":[],"pullRequest":null,"size":"S"} -->
```

`planUrl` pins the confirmed revision. Validate the plan's confirmation at that revision before publication or implementation.
A different revision cannot silently reuse a started issue's contract.

`key` is unique within the plan and prevents duplicate creation. The published issue URL becomes execution identity.
`dependencies` contains outcome issue URLs. Set `pullRequest` when implementation publishes its PR.

`size` is the expected peak context of one build session, written before the build. S is under 60,000 tokens. M is from 60,000 to under 120,000. L is from 120,000 through 200,000. `ensure` requires S, M, or L before it creates an issue, after it looks for an existing issue to recover. A marker may omit `size`. `validate` accepts that marker. `link-pr` keeps a valid `size` when the marker has one. `wf` ranks from each build's own peak context. A comparison checks `size` against that peak.

Keep links readable outside the marker. Metadata updates preserve existing acceptance history.
