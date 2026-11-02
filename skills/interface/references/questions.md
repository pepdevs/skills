# Questions and evidence

Use this guidance for an analytical application or operational portal. Preserve the existing stack and the user's established interactions.

Choose the page's mode from the task: monitoring highlights exceptions and immediate action;
exploration supports comparison and drilldown; explanation supplies a finding and its evidence.
A portal can contain all three without forcing them into the same layout.
The distinctions inform design choices, not a fixed page taxonomy.
See [Dashboard Design Patterns](https://arxiv.org/abs/2205.00757).

## How to apply this guidance

| Level | Meaning |
|---|---|
| Requirements | Preserve evidence, interaction correctness and applicable accessibility criteria. Verify these before delivery. |
| Design heuristics | Choose according to the reader's task, data and display. Explain meaningful tradeoffs. |
| Preferred defaults | Use when the project has no established equivalent. Adjust to the product and user. |

## Method

1. Name the reader's question, next action, scope, units and evidence needed.
   For a redesign, inventory useful behaviours before changing presentation.
2. Choose the comparison and visual form. Distinguish monitoring from exploration and explanation.
3. Establish truthful scales, comparison periods and unknown states.
4. Apply the project's visual system. Use colour to identify, order, emphasise or communicate status.
5. Check contrast and interaction accessibility in the rendered context.
   Use palette simulation as a diagnostic alongside labels, shapes and browser inspection.
6. Follow a representative question through the actual browser, including detail and return navigation.
7. Evaluate whether the intended reader reaches the correct answer using [scenarios](scenarios.md).
   Report separately what was checked mechanically, inspected by the agent and tested with a user.

## Requirements

- Preserve units, populations, reporting windows and selected navigation state across related views.
- Distinguish missing evidence from measured zero. Keep partial coverage and material limitations visible, as a drawn state or from an info icon beside the measure.
- Keep entity colours stable across filters and related views. Recheck distinguishability when combinations change.
- Give meaning a non-colour encoding. Provide an accessible description and equivalent evidence for complex charts.
- Check text, essential graphical objects and controls against their actual adjacent colours and supported themes.
- Make chart actions keyboard operable, with visible focus and reachable content at zoom.
- Insert source labels through text nodes or escaped framework bindings. Treat source text as untrusted data.

[Accessibility](accessibility.md) defines the WCAG criteria and relevant exceptions; this checklist alone is not a conformance audit.


## Design heuristics

- Prefer aligned position and length when readers need accurate magnitude comparisons.
- Label units and comparisons explicitly. Scales and axes follow [charts](charts.md).
- Keep frequent tasks and decision-critical evidence visible. Move secondary detail to the item's detail view.
- Use tooltips when they add useful detail. Keep essential information available through an accessible persistent alternative.
- Use sequential palettes with ordered lightness; they may contain one or several hues.
  Centre diverging palettes on a meaningful reference value and distinguish their two directions.
- Recompute any claim in a title when filters change.
- Use the fewest visual distinctions the task needs. Preserve important exceptions when grouping categories.

These heuristics follow the task-oriented guidance in [Tableau](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm),
[NN/g](https://www.nngroup.com/articles/dashboards-preattentive/) and [ONS](https://service-manual.ons.gov.uk/data-visualisation/guidance/dashboards).
Specific chart and accessibility decisions have sources in their references.

## Establish the questions before arranging pages

Find the project's use-case document and inspect the current UI. Record missing questions in the
screen's brief before adding views, and add settled ones to the use cases.
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
Show a coverage limit as a drawn state or an info icon beside the affected measure, with a link to the diagnostics.

A simple chart or page with an obvious purpose needs only a descriptive title.

For a port or redesign, inventory working behaviours before replacing the layout: period presets, units, thresholds,
comparisons, filters, navigation and drilldowns. User requests to "recover" a feature indicate a continuity requirement.
Preserve its meaning or explain the specific tradeoff; visual cleanup must not silently remove it.

## Make the answer visible

Lead with the few facts needed to answer the page's question. Choose the number of headline metrics from that need.
Follow with the comparison and supporting evidence. Avoid repeating the same large overview on every subtab.
Keep frequently needed values and decision-critical comparisons visible together.
Move secondary detail to the item's detail view, with labels that predict what opens.
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

Keep titles, units and scope, which count as labels and values.
A finding in a title must stay true when the user changes filters; otherwise use a descriptive title.
See [ONS chart text](https://service-manual.ons.gov.uk/data-visualisation/guidance/chart-text).
Keep exact figures available. A definition or assumption that a screen needs opens from an info icon near the measure.
Scales follow [charts.md](charts.md).
Label percentage-of-budget scales separately from dollar scales.

Treat change as secondary to the current measure unless the question specifically concerns change.
A slim direction arrow with restrained colour and normal-weight text often supplies enough emphasis.
If "make changes easier to see" leads to loud rows, reduce filled backgrounds and weight before adding more controls.
Direction and desirability are separate: fewer failures can be favourable, while higher spend may reflect increased adoption.
Use neutral styling when the value judgement is unsupported. State any adopted colour convention.

## Compact shell and persistent navigation

Reuse the project's shell, router and components. Keep each control once, close to what it governs.
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
A report with no library can use the shell in [report-style.md](report-style.md).
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
Display matching and total counts. Make a result cap explicit.
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
Include uncertainty bands or intervals where appropriate, with their meaning behind an info icon.
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
Use [scenarios.md](scenarios.md) for task examples and a compact result format.
Revisit measures when repeated use shows that they no longer support a decision.
See [ONS dashboard guidance](https://service-manual.ons.gov.uk/data-visualisation/guidance/dashboards).
Promote reusable interaction patterns to the shared UI library when their API is clear and reuse justifies it.
Keep project-specific calculations out of shared presentation components.
