# Choosing a form

Choose according to the comparison the reader must make. These are heuristics, not exclusive mappings.

| Reader's task | Starting point | Tradeoff to inspect |
|---|---|---|
| Read a current value | Stat with units and relevant comparison | A large number alone supplies little context |
| Compare a value with a plan or limit | Horizontal measure with actual and reference markers | Show scale, units and reference assumptions |
| Compare magnitudes across entities | Aligned bars or dots | Keep comparable scales; protect long labels |
| Follow change over time | Line; columns for discrete periods | Label the range and show gaps in missing data |
| Compare before and after | Paired bars, dumbbell or slope | Identify both periods; define absolute versus relative change |
| Understand composition | Stacked bars or areas | Interior segments lack a common baseline |
| Compare individual components over time | Grouped charts or small multiples | Shared scales help magnitude comparisons; panels use more space |
| Compare a few shares of one whole | Stacked bar; pie/donut when rough shares suffice | Use aligned bars for close values or precise ranking |
| Find distributions or unusual spread | Histogram, box plot or dot distribution | Explain bins and summaries; an average can hide variation |
| Explore association | Scatter plot | Association alone does not establish cause |
| Find intensity across entities and days | Heatmap | Colour gives coarse comparison; expose exact values and missing states |
| Look up exact records or many attributes | Table with task-relevant columns | Search and sorting may answer the question more directly than another chart |

Stacks suit the question "What makes up total daily spend?".
To compare one model's trend precisely, offer its own line or aligned panel.
Use 100% stacks for shares, and show totals separately when their differences matter.
These distinctions follow [Datawrapper's chart selection guidance](https://www.datawrapper.de/blog/chart-types-guide).

## Scales and comparisons

Ordinary bars and filled areas encode magnitude from a baseline: include zero.
Lines, scatter plots and interval plots can use a restricted range when it reveals relevant variation.
Label that range clearly and avoid exaggerating trivial changes.
Use consistent scales across panels intended for magnitude comparison.
If independent scales help compare shapes, make that choice explicit.
Prefer aligned charts to unrelated dual axes; their apparent relationship depends on arbitrary scale choices.
See [ONS axes guidance](https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines).

## Colour and density

Use one hue for a single series when position or length already carries the comparison.
Use category colours when readers need to track identity; use emphasis when a particular entity is the focus.
Ordered categories can rely on their position and labels; they do not automatically require a gradient.
Sequential palettes use ordered lightness and may change hue.
Diverging palettes need a meaningful centre, such as zero change or a policy target.
See [Datawrapper's colour scale guidance](https://www.datawrapper.de/blog/which-color-scale-to-use-in-data-vis).

Series count is a signal to inspect readability, not a universal pass/fail threshold.
When distinguishing series becomes difficult, try direct labels, highlighting, small multiples, selection or a table.
Check arbitrary colour pairs for crossing lines, filters and other arrangements where any pair can be compared.
Labels and shapes remain necessary even when the palette diagnostic passes.

Group categories as "Other" only when that aggregation serves the question.
Keep its definition and constituent records accessible. Preserve rare but important exceptions in operational views.
For example, a low-volume production failure must remain discoverable even when its category is outside the largest eight.
