# Charts

The chart key and missing values are in [screen text](screen-text.md#disclosure).

## Choosing

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
| Find intensity across entities and days | Calendar, or dots sized by value in a table, as in Grids and calendars below | Expose exact values and missing states |
| Look up exact records or many attributes | Table with task-relevant columns | Search and sorting may answer the question more directly than another chart |

Stacks suit the question "What makes up total daily spend?".
To compare one model's trend precisely, offer its own line or aligned panel.
Use 100% stacks for shares, and show totals separately when their differences matter.
These distinctions follow [Datawrapper's chart selection guidance](https://www.datawrapper.de/blog/chart-types-guide).

- **Choose the chart from the comparison.** A Bar list ranks many labels; a Pie shows a few shares
  of one whole. Source: `docs/research/figures.md` (:146, :164).
- **Compare magnitudes on a shared, aligned baseline**, by position and length. Source:
  `docs/research/charts.md` (:17).
- **Two series with different units go in two panels on a shared x axis. Never a dual axis.** Where
  two lines cross depends on two arbitrary scales, so readers see correlations that are not there.
  For a relation, use a scatter; for growth, index both to 100. Source: operator, decided
  2026-10-27; `docs/research/charts.md` (:203 to :211, :222).
- **Use small multiples for several trends.** With more than 4 lines, highlight the top 4 first.
  Source: `docs/research/charts.md` (:123).
- **Use a meter for a value against a limit**, with the overage drawn as part of the meter. Task
  progress uses a progress component. Source: `docs/research/figures.md` (:88, :107).
- **Draw a sparkline only when it answers a question on that screen.** When a headline number
  changes over time, show its recent history beside it. Source: impeccable: craft-floor.md,
  mode-operate.md.

## Values

- **Exact values sit beside every chart**, in the readout or a table, one press away at most.
  Source: `docs/research/charts.md` (:286); `docs/research/figures.md` (:165).
- **Compare in raw amounts, in the app's currency. A share or percent comes second.** Source: operator (no research).
- **Bars, filled areas and ranges of amounts start at zero.** A line includes zero unless its series
  sits far from zero, such as a balance or a price index; then it opts out and labels its range.
  Scatter axes fit the data with round ends and include zero only when the data comes close to it.
  This replaces "every euro axis starts at zero" and "scatter forces zero on both axes". Source:
  `docs/research/charts.md` (:14, :20, :105, :121, :140 to :144, :158, :192).
- **Reference lines mark the number that matters**, such as expected income. Source: operator
  (no research).
- **Compare matching windows.** For an incomplete period, compare the same elapsed days, and show
  the denominator for small groups. Source: operator (no research).
- **Give in-cell graphics one scale across all rows.** Source: `docs/research/figures.md` (:249).

## Colour series

- **Colour series keep the top 8 plus Other.** The palette has eight slots; from the 9th series on
  they fold into Other, and no slot is reused. Source: `docs/research/charts.md` (:46, :299);
  `docs/research/collections.md` (:309).
- **A Pie draws at most 8 segments, Other included, and 5 by default.** Source:
  `docs/research/figures.md` (:145, :161).
- **When colours run out, merge categories, highlight a few, or use small multiples.** Source:
  `docs/research/charts.md` (:24, :65).
- **A category keeps its colour across every chart, filter and view.** Source:
  `docs/research/charts.md` (:255).
- **Sort rows with no natural order** by top, bottom or width. Source: `docs/research/charts.md`
  (:195).

## Grids and calendars

- **A heat cell in a table, dense grids included, draws a dot sized by value beside the value**,
  blank under the first bound, with at most five bounds so the dot sizes stay apart. The key names
  each bound, and an unknown cell is hatched so it never passes for zero. Source: operator, decided
  2026-10-27; `docs/research/figures.md` (:225, :268).
- **The Calendar shades each day in zero plus four steps on fixed bounds**, because every day
  prints its total. Source: `docs/research/figures.md` (:198 to :201, :215).

## Drawing

- **Size a chart after its panel shows, and measure again after a resize.** Source: operator (no
  research).
- **A chart may animate a change in its data with the `grow` preset**, 240 ms, and up to 500 ms when
  many marks reorder. The chart's frame keeps its size; only the marks move. A trend is shown with
  small multiples, never with animation. This replaces "Charts do not animate between data states".
  Source: `docs/research/themes-form.md` (:351 to :355); `docs/research/charts.md` (:204);
  impeccable: overdrive.md.

## Scales

Zero follows [Values](#values). A range that excludes zero must not exaggerate trivial changes.
Use consistent scales across panels intended for magnitude comparison.
If independent scales help compare shapes, make that choice explicit.
See [ONS axes guidance](https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines).

## Colour and density in practice

Use one hue for a single series when position or length already carries the comparison.
Use category colours when readers need to track identity; use emphasis when a particular entity is the focus.
Ordered categories can rely on their position and labels; they do not automatically require a gradient.
Sequential palettes use ordered lightness and may change hue.
Diverging palettes need a meaningful centre, such as zero change or a policy target.
See [Datawrapper's colour scale guidance](https://www.datawrapper.de/blog/which-color-scale-to-use-in-data-vis).

When distinguishing series becomes difficult, try highlighting, small multiples, selection or a table.
Check arbitrary colour pairs for crossing lines, filters and other arrangements where any pair can be compared.
A non-colour cue, such as position, shape or a key entry, remains necessary even when the palette diagnostic passes.

Keep the definition and constituent records of "Other" accessible. Preserve rare but important exceptions in operational views.
For example, a low-volume production failure must remain discoverable even when its category is outside the largest eight.

## Mark styling

- Use restrained marks and spacing within the host's density scale. Around 2px lines and modest corner rounding can work.
- Choose gaps, outlines or patterns that separate marks without erasing small values or distorting proportions.
- Keep gridlines subordinate to the data. Use a clearly distinguished reference line when the comparison needs one.
- Align table figures and axis labels with tabular numerals. Choose standalone figure typography within the host system.
- Label values where readable and useful. Provide accessible detail when the chart cannot fit every label.
- Choose time ticks from the available width and reporting cadence. Highlight weekends only when they matter to interpretation.
- Measure the full chart, including labels and axes. Resize after hidden panels become visible.

## Status and change

Status should follow the host's semantic tokens, with a label or other non-colour cue.
Check their text and mark uses separately in each theme.
Keep neutral series from implying success or failure through the same semantic treatment.
For change indicators, start with an arrow accent and ordinary text without a filled badge.
Check that a thin arrow remains visible. Define whether the change is favourable before assigning status colour.

## Palette diagnostics

Resolve commands from the skill directory. Use the actual opaque chart surface. The series rules in
[colour](colour.md) govern a palette: their low chroma is below this script's chroma floor and can miss its separation floors, so those
failures do not reject such a palette. Use the script for surface contrast. A pair that fails
simulated separation needs the non-colour cue above.

```sh
node scripts/validate-palette.mjs "#2a78d6,#008300,#e87ba4" --mode light --surface "#fcfcfb"
node scripts/validate-palette.mjs "#3987e5,#008300,#d55181" --mode dark --surface "#1a1a19"
```

Categorical mode checks all pairs by default. That covers combinations introduced by filtering and crossing lines.
Use `--pairs adjacent` only when the actual comparison is restricted to fixed neighbours.
Check every relevant filtered combination if that restriction can change.

The script measures contrast and applies local OKLab distance, chroma and lightness heuristics.
Its colour-vision simulations are approximations; tritanopia is reported but does not determine the pass/fail result.
Exit 0 means no local heuristic failed. Warnings still require review.
Neither exit code establishes WCAG conformance, text contrast, readable shapes or usability.
Investigate failures in the chart context; adjust the palette, labels, shapes or layout as needed.

`--ordinal` tests a particular single-hue style with a 2:1 light-end floor.
That floor is not a WCAG threshold. This mode is unsuitable for judging all sequential palettes.
Use ordered-lightness inspection and the applicable contrast checks for other ramps.

For opaque text pairs, the exported calculation can be used independently:

```js
import { contrast } from './scripts/validate-palette.mjs';
const ratio = contrast('#6f6d67', '#fcfcfb');
if (ratio < 4.5) throw new Error('Normal text contrast below 4.5:1');
```

Follow [accessibility.md](accessibility.md) for the requirement appropriate to each element.
