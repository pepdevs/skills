# Dashboard and chart review failures

Use these symptoms to investigate the result. Apply the requirements and heuristics in the skill before choosing a correction.

| Symptom | Investigate and correct |
|---|---|
| A page exposes a dataset but leaves the next action unclear | Identify the reader's question, primary answer and evidence drilldown |
| A wide audit table is the only overview | Show focused comparisons and keep full figures accessible |
| Every row has bold deltas and filled badges | Reserve emphasis for what deserves attention; inspect the whole table |
| A compact view hides frequently needed information | Put decision-critical comparisons together; disclose secondary detail |
| Filters reset the tab or open detail for another period | Carry entity, period and subview through navigation and return |
| A filter changes entity colours | Keep identity assignments stable and validate the resulting combinations |
| Refresh shows old data under a new period label | Preserve state and label the retained data's actual scope while updating |
| Unknowns appear as zero or snapshots appear as historical activity | Separate collection dates, event dates, periods and evidence gaps |
| A comparison mixes partial and full periods | Match elapsed windows or expose the mismatch and normalization |
| Tiny groups show dramatic percentage changes | Show the baseline and denominator; distinguish relative change from percentage points |
| A rare critical event disappears into "Other" | Preserve operational exceptions and access to grouped records |
| A stack is used to compare interior component trends precisely | Consider grouped charts, selection or aligned small multiples |
| Bar lengths exaggerate differences through a truncated baseline | Restore zero or choose a position-based form with a labelled range |
| Unrelated dual axes imply a relationship | Prefer aligned panels; explain any remaining scale choice |
| A sequential palette reverses apparent order | Inspect ordered lightness; multi-hue scales can be valid |
| A diagnostic pass is treated as accessibility certification | Test text, meaningful marks, controls and alternatives in the actual UI |
| Colour is the only way to distinguish meaning | Add labels, position, shape or another accessible encoding |
| Muted labels or status text are hard to read | Measure text contrast against the actual background, separately from mark contrast |
| A legend repeats complete direct labels without adding a function | Remove the redundant encoding aid |
| Tooltips are the only access to essential information | Provide persistent accessible detail; check focus, touch and dismissal |
| A palette or series-count rule forces unnecessary aggregation | Evaluate the task and actual distinguishability; change layout or encoding |
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
