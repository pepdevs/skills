# Dashboards that answer questions

Use this guidance for an analytical application or operational portal. Preserve the existing stack and the user's established interactions.

Choose the page's mode from the task: monitoring highlights exceptions and immediate action;
exploration supports comparison and drilldown; explanation supplies a finding and its evidence.
A portal can contain all three without forcing them into the same layout.
The distinctions inform design choices, not a fixed page taxonomy.
See [Dashboard Design Patterns](https://arxiv.org/abs/2205.00757).

## Establish the questions before arranging pages

Find the project's use-case document and inspect the current UI. Record missing questions there before adding views.
For each proposed page, identify:

| Field | Design consequence |
|---|---|
| Reader's question and next action | Determines the primary visual and useful drilldown |
| Population and reporting scope | Defines who, what and when the answer includes |
| Measure, units and comparison | Determines the scale, baseline and labels |
| Evidence and limitations | Determines unknown states, coverage cues and what the view cannot claim |
| Route and selected state | Makes the investigation reproducible |

Example: "Which teams need investigation for increased spend?" needs spend change, a comparable period, coverage and a team drilldown.
It does not establish which team became more productive.

Group overlapping pages by the questions they answer. A spend area can have timeline, people and models as subviews.
Keep collection diagnostics and configuration in utilities unless they are the operator's primary task.
Show a relevant coverage warning beside an affected measure, with a link to the diagnostics.

When a product needs an explicit question catalogue, a small accessible button beside the page title can reveal it.
Reuse the documented questions and explain where the page answers them. Avoid duplicating long introductions on every page.
A simple chart or page with an obvious purpose may need only a descriptive title.

For a port or redesign, inventory working behaviours before replacing the layout: period presets, units, thresholds,
comparisons, filters, navigation and drilldowns. User requests to "recover" a feature indicate a continuity requirement.
Preserve its meaning or explain the specific tradeoff; visual cleanup must not silently remove it.

## Make the answer visible

Lead with the few facts needed to answer the page's question. Choose the number of headline metrics from that need.
Follow with the comparison and supporting evidence. Avoid repeating the same large overview on every subtab.
Keep frequently needed values and decision-critical comparisons visible together.
Use disclosure for secondary detail, with labels that predict what opens.
Test that a reader can still complete the common task without repeatedly switching tabs.
See [NN/g progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/).

| Question | Useful visual answer | Supporting detail |
|---|---|---|
| How does spend compare with the period plan? | Horizontal measure with labelled actual, expected pace and maximum | Allowance assumptions and exact dollars |
| How did teams change? | Aligned current/prior bars or focused comparison columns | Full sortable figures |
| What happened for this person on this day? | Daily spend stacked by model, with selectable activity markers | Authored work, changed lines and worklogs for the selected day |
| Where do operational failures concentrate? | Counts grouped by workflow purpose, cause or environment | Active failures with jobs, steps and source links |
| Which repositories need security attention? | Severity distribution or repository exposure matrix | Alert records, owner and coverage |
| What is costly or stale to collect? | Collection age, volume and runtime comparisons | Schedule state, collection errors and record counts |

Replace explanatory subtexts with a visual only when the visual encodes information more efficiently.
Retain concise titles, annotations, units and scope that help interpretation.
A finding in a title must stay true when the user changes filters; otherwise use a descriptive title.
See [ONS chart text](https://service-manual.ons.gov.uk/data-visualisation/guidance/chart-text).
Keep exact figures available. Put lengthy definitions and assumptions in a disclosure near the measure.
Use comparable scales for magnitude comparisons; ordinary bars and filled areas include zero.
Line and scatter ranges follow the question, with clear labels. See [choosing-a-form.md](choosing-a-form.md).
Label percentage-of-budget scales separately from dollar scales.

Treat change as secondary to the current measure unless the question specifically concerns change.
A slim direction arrow with restrained colour and normal-weight text often supplies enough emphasis.
If "make changes easier to see" leads to loud rows, reduce filled backgrounds and weight before adding more controls.
Direction and desirability are separate: fewer failures can be favourable, while higher spend may reflect increased adoption.
Use neutral styling when the value judgement is unsupported. State any adopted colour convention.

## Compact shell and persistent navigation

Reuse the project's shell, router and components. For dense desktop workspaces, consider navigation on the first line
and breadcrumb, period and scope on the second. Keep each control once, close to what it governs.
On small screens, collapse or wrap controls without hiding the selected context.

Keep the selected page, subtab and entity stable when the period or team changes.
Represent meaningful navigation and filter state in the URL when investigations need bookmarks or sharing.
Use the host router; hash routes are appropriate for portable files when needed.
Test reload, direct links, browser Back/Forward and returning from detail.
If a selection becomes invalid, explain the empty state or clear only that selection.

A chart click should carry the selected entity and time window into detail.
A summary count can open a dedicated evidence tab instead of crowding the overview with records.
Provide an explicit keyboard-operable link or control for the same action.

Use component scrolling when the user requests a bounded desktop workspace or the task benefits from persistent context.
Without a host shell, consider the optional report shell in [report-style.md](report-style.md).
Give flexible children room to shrink and scroll: inspect their actual minimum sizes and overflow behaviour.
Reserve scrolling for the evidence region; avoid multiple tiny nested scroll areas.
Allow sensible page flow on narrow screens, at zoom and with large text. Reachability matters more than a fixed viewport.
Size charts after their panel becomes visible, and remeasure after resize. Preserve state across panel changes.
During refetch, label retained data as updating; do not present the previous scope as the newly selected one.

## Tables as evidence

Start with the columns that answer the current question. Offer full figures or additional columns on demand.
A rich comparison can use inline bars, a compact progress measure, stable alignment and exact values.
Use colour where it conveys meaning; avoid turning every cell into a badge.

Provide text search and sorting for investigative lists. Add column filters when users need field-specific questions.
Compare raw numeric and date values, not formatted strings. Keep unknowns distinct from zero and sort them predictably.
Display matching and total counts. Make pagination or result caps explicit.
If collapsing columns removes a filter or changes sorting, disclose the change so the remaining rows are explainable.
Protect long entity names from excessive wrapping and give numeric columns tabular figures.
A rank column is useful only when ranking is part of the question.

Keep filters local to their scope: table search beside the table, shared period and team in the shell.
When all charts share a filter, they must use the same selected population and window.

## Evidence semantics before decoration

Use the audience's requested units consistently across summaries, charts, tables and exports.
Money requires an authoritative amount and basis, such as gross or net. Credits are not dollars without a documented conversion.
Keep precision in calculations; use compact display only where readers can retrieve the exact value.

Define the reporting timezone, date boundaries and event being counted.
Creation, merge and worklog dates answer different questions. A current open queue is not a historical snapshot.
Use the requested calendar presets, including month navigation or all time where useful; do not substitute rolling windows silently.
Compute working-day pace from the actual calendar and configured allowance when that is the agreed policy.
Expose editable assumptions as settings, with their scope and persistence clear.
Preserve established heatmap ranges during a port unless the user changes their meaning.

For period comparisons, show the effective dates and whether either period is incomplete.
Compare matching elapsed windows or explain the normalization; keep whole-period totals available when useful.
Define rate denominators, population changes and absolute versus relative change.
For example, 10% to 15% is a five percentage-point increase and a 50% relative increase.
When the baseline is zero, relative growth is undefined; show the absolute change or an explicit new-activity state.
Show the denominator for small groups whose rates could otherwise imply a strong pattern.
These checks operationalize the requirement to keep comparisons interpretable.

Expose uncertainty when it could change the reader's conclusion. Separate estimates and projections from observed values.
Include uncertainty bands or intervals where appropriate and explain their meaning.
Avoid decorative precision unsupported by evidence; missing collection coverage is not a statistical confidence interval.
See [ONS uncertainty guidance](https://service-manual.ons.gov.uk/data-visualisation/guidance/showing-uncertainty-in-charts).

Distinguish missing, partial and measured-zero evidence. Show why an unknown exists when the source supports the explanation.
Separate collection time, latest event date and reporting period. A recent event does not establish a recent collection.
Keep current alert snapshots distinct from period activity. Define when a failure is active, resolved or superseded.
An unknown identity or ownership mapping should remain inspectable; access alone does not establish operational ownership.

When users question implausible zeros or missing failures, trace the source and query before changing the presentation.
Check collection windows, filters, identity links and missing fields. Do not fill gaps with plausible numbers.
Bound collection work to the relevant period and persist agreed limits in configuration or scripts.

If the product also serves agents, reuse the calculations and evidence definitions through its API or CLI.
Expose full records, effective filters, dates, unknowns and result completeness in structured output.
A matching command name does not prove that a summary answers the same question as the UI.
Agent access is a separate product requirement; a dashboard task alone does not call for a new CLI.

## Review the consumed result

Use a real browser to follow a representative question from summary to evidence and back.
Inspect realistic data: long names, many entities, missing values, zeros, outliers and empty selections.
Check desktop and narrow widths, supported themes, keyboard access and zoom using [accessibility.md](accessibility.md).
Verify alignment, chart labels, visible filter state, tab persistence, reachable scroll areas and focus return after overlays.
Tests of arithmetic and routes complement this inspection; passing them does not prove the rendered page is readable.

For each reviewed page record the question, the primary answer, the drilldown and the unresolved evidence gap.
Ask whether a simpler visual or fewer columns would answer it equally well.
Define an acceptance task and expected evidence before evaluating the design.
With an intended reader, observe answer correctness, scope interpretation, hesitation and unnecessary navigation.
Record what they actually did, including assistance; avoid treating an agent walkthrough as a user study.
If no user is available, report that limitation and leave the concrete task ready for their review.
Use [review-scenarios.md](review-scenarios.md) for task examples and a compact result format.
Revisit measures when repeated use shows that they no longer support a decision.
See [ONS dashboard guidance](https://service-manual.ons.gov.uk/data-visualisation/guidance/dashboards).
Promote reusable interaction patterns to the shared UI library when their API is clear and reuse justifies it.
Keep project-specific calculations out of shared presentation components.
