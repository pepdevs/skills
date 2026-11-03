# Scenarios

Use relevant scenarios when evaluating a substantial change to these rules or reviewing a dashboard.
Judge the resulting decisions and rendered behaviour. Merely repeating the guidance does not demonstrate success.

## Task acceptance

Choose a small set of important user questions. State the task without naming the controls the reader should use.
Prepare the correct answer and supporting records from known data, including its period and evidence limitations.
Observe an intended reader attempting it without coaching. Record assistance separately.
Judge correctness and interpretation first, then hesitation and unnecessary navigation.
Measure completion time when speed matters; choose a task-specific target rather than a universal time limit.

| Task | Evidence of success |
|---|---|
| Find the team whose spend increased most, explain the comparison period, then inspect supporting records. | Correct team for the defined absolute or relative comparison; correct dates; matching detail and return state |
| Find an active production failure and explain why it still needs attention. | Correct environment and active-state evidence; cause and source record found; rare failures remain visible |
| Explain what happened for one person on a given day. | Spend, model composition, authored activity and worklogs share that date; missing evidence is recognized |
| Explain whether a low total means no activity or incomplete collection. | Reader distinguishes measured zero, unknown and partial coverage without help |

Record: task, expected evidence, observed answer, correctness, scope interpretation, assistance,
hesitation or extra navigation, accessibility condition, and follow-up change.
Separate automated checks, agent browser review and observed user testing in the result.
If a user has not tried the task, mark that evaluation pending; do not infer success from a screenshot.
This applies [ONS user-testing guidance](https://service-manual.ons.gov.uk/data-visualisation/guidance/dashboards)
and [NN/g task-based disclosure guidance](https://www.nngroup.com/articles/progressive-disclosure/).

## Design challenge scenarios

| Request and evidence | Useful outcome | Failure to catch |
|---|---|---|
| Port an existing usage portal. It has calendar months, dollar amounts, heatmap thresholds and person/day detail. | Preserve those behaviours, inspect existing components, then improve the presentation. | Replace months with rolling days, show credits, or lose detail links. |
| An overview and an activity page repeat the same totals. Each has a large header. | Group questions into coherent subviews; keep shared filters compact and page-specific content relevant. | Add a third summary page or duplicate the large overview on every tab. |
| The user is on People, changes the month, opens a person and presses Back. | Preserve People and its period; return to the prior investigation with a reproducible URL. | Reset to the first tab or lose the clicked window. |
| A table has many columns, long repository names and exact values that users still need. | Show focused comparisons and a few useful columns, with search, sorting and access to full evidence. | Replace it with decorative charts or hide active filters when collapsing columns. |
| Changes are hard to see. A trial of bold coloured pills makes the whole table too loud. | Try a slim direction arrow and secondary text; inspect several rows in the browser. | Increase arrow size, saturation and font weight together, or universalize one pixel size. |
| Spend increased while deployment failures decreased. | Explain each comparison's meaning; distinguish direction from desirability and keep missing/equal values neutral. | Treat every increase as good or present more PRs as proof of AI effectiveness. |
| A failed-run view misses today's failures and an activity table reports only zero changed lines. | Investigate the collected evidence, query window and source fields; keep missing evidence explicit. | Replace unknowns with zero or fix only colours and labels. |
| A workspace should have no desktop page scroll. Test 200% text size and reflow at 320 CSS pixels. | Bound the desktop evidence region, then adapt flow so controls remain reachable; scope two-dimensional exceptions to charts that require them. | Clip content or exempt the entire page from reflow. |
| An established application uses a shared component library and its own router. | Reuse them and propose generally useful additions when warranted. | Impose a new palette, duplicate controls or deliver a standalone HTML rewrite. |
| A single offline chart answers one clear question. | Deliver the chart with readable values and appropriate offline behaviour. | Add application navigation, settings, an agent CLI or a question catalogue without need. |
| Agents must investigate the same person/day question as the UI. | Expose the same calculations, source dates, full records, filters and completeness through the existing query surface. | Declare parity because a command exists while it omits models, worklogs or result limits. |
| A fixed palette passes adjacent checks, then filtering puts green beside orange. | Check all relevant pairs and actual encodings while keeping entity identity stable. | Treat a palette-order pass as colour-vision safety certification. |
| A chart's muted labels look quiet but measure 3.5:1. | Use a text token meeting 4.5:1 for normal text on that surface. | Apply the 3:1 graphical-object threshold to text. |
| An ordered multi-hue scale is readable. | Evaluate the scale's lightness progression. | Ban multi-hue scales. |
| A critical failure category is ninth by volume. | Preserve the exception and access to every grouped record. | Automatically hide it inside "Other". |
| A reader wants to compare individual model trends in a daily spend stack. | Offer a selected model line or aligned panels while retaining composition where useful. | Claim all stack segments support precise trend comparisons. |
| This month's six elapsed days are compared with a full prior month; one group's baseline is zero. | Match or explain the windows, show denominators, and avoid undefined relative growth. | Display a misleading improvement or infinite percentage without context. |
| The chart contains forecasts with materially overlapping uncertainty intervals. | Separate projections from observations and expose uncertainty needed to interpret the comparison. | Present a precise ranking as established fact. |
| A tooltip covers labels and disappears when the pointer moves towards it. | Make it hoverable, persistent and dismissible as required, with accessible equivalent detail. | Check only mouse hover activation. |

The dashboard references capture reusable decisions from an iterative operational-portal session.
Specific currencies, retention windows, team names, heatmap boundaries and pixel sizes remain application choices.

## Failure symptoms

Use these symptoms to investigate the result. Apply the requirements and heuristics in [questions](questions.md) before choosing a correction.

| Symptom | Investigate and correct |
|---|---|
| A page exposes a dataset but leaves the next action unclear | Identify the reader's question, primary answer and evidence drilldown |
| A wide audit table is the only overview | Show focused comparisons and keep full figures accessible |
| Every row has bold deltas and filled badges | Reserve emphasis for what deserves attention; inspect the whole table |
| A compact view hides frequently needed information | Put decision-critical comparisons together; move secondary detail to the detail view |
| Filters reset the tab or open detail for another period | Carry entity, period and subview through navigation and return |
| A filter changes entity colours | Keep identity assignments stable and validate the resulting combinations |
| Refresh shows old data under a new period label | Preserve state and label the retained data's actual scope while updating |
| Unknowns appear as zero or snapshots appear as historical activity | Separate collection dates, event dates, periods and evidence gaps |
| A comparison mixes partial and full periods | Match elapsed windows or expose the mismatch and normalization |
| Tiny groups show dramatic percentage changes | Show the baseline and denominator; distinguish relative change from percentage points |
| A rare critical event disappears into "Other" | Preserve operational exceptions and access to grouped records |
| A stack is used to compare interior component trends precisely | Consider grouped charts, selection or aligned small multiples |
| Bar lengths exaggerate differences through a truncated baseline | Restore zero or choose a position-based form with a labelled range |
| Dual axes imply a relationship | Use aligned panels on a shared x axis |
| A sequential palette reverses apparent order | Inspect ordered lightness; multi-hue scales can be valid |
| A diagnostic pass is treated as accessibility certification | Test text, meaningful marks, controls and alternatives in the actual UI |
| Colour is the only way to distinguish meaning | Add labels, position, shape or another accessible encoding |
| Muted labels or status text are hard to read | Measure text contrast against the actual background, separately from mark contrast |
| Tooltips are the only access to essential information | Provide persistent accessible detail; check focus, touch and dismissal |
| Gap widths or outlines erase tiny marks | Adjust separation and preserve the quantities represented |
| Labels collide or get clipped | Reflow, reposition or expose accessible detail; allow the region enough room |
| Fixed viewport sizing makes controls unreachable | Inspect at narrow widths, 200% text size and 320 CSS pixels of reflow |
| A hidden-panel chart opens with zero width | Measure after visibility changes and resize without losing state |
| Passing DOM or route tests is the sole evidence of quality | Inspect browser rendering and test a real question with the intended reader |

Portable-file delivery has additional failure modes:

- Network dependencies break an offline promise. Inline required assets.
- Local-file history operations can fail. Handle the supported navigation path and inspect the delivered file.
- Exported credentials leak access. Collect enrichment before export and keep credentials outside the artifact.
- Source text inserted as HTML can execute markup. Use text nodes or escaped framework bindings.

Read [standalone-html.md](standalone-html.md) for that delivery mode.
