# Preferred visual defaults

These are starting choices for products without their own visual system.
They are local preferences, not accessibility standards or a universal dashboard style.
Choose mark sizes, spacing and typography for the actual display and task.

## Palette candidates

Define tokens by role. Keep entity assignments stable across filtering and related views.
The following categorical candidates need validation for the colours actually used together.
The complete eight-colour set fails the diagnostic's all-pairs thresholds in both themes.

| Candidate | Light | Dark |
|---|---|---|
| Blue | `#2a78d6` | `#3987e5` |
| Green | `#008300` | `#008300` |
| Magenta | `#e87ba4` | `#d55181` |
| Yellow | `#eda100` | `#c98500` |
| Aqua | `#1baf7a` | `#199e70` |
| Orange | `#eb6834` | `#d95926` |
| Violet | `#4a3aa7` | `#9085e9` |
| Red | `#e34948` | `#e66767` |

Use a suitable subset, another palette or additional encodings according to the comparison.
There is no mandatory eighth-colour cutoff or automatic "Other" group.

Sequential blue examples:

- Light surface: `#cde2fb #9ec5f4 #5598e7 #256abf #0d366b`.
- Dark surface: `#184f95 #2a78d6 #5598e7 #86b6ef #cde2fb`.

Label which direction means higher values. These two examples reverse lightness direction with the surface.
Multi-hue sequential scales are also valid when their progression remains perceptually ordered.
Keep measured zero, missing evidence and low positive values distinguishable where the task needs that distinction.
Use the measure's units for heatmap thresholds, including percentages when the measure is a percentage.

| Text/surface role | Light | Dark |
|---|---|---|
| Page | `#f9f9f7` | `#0d0d0d` |
| Surface | `#fcfcfb` | `#1a1a19` |
| Primary text | `#0b0b0b` | `#ffffff` |
| Secondary text | `#52514e` | `#c3c2b7` |
| Muted text | `#6f6d67` | `#898781` |
| De-emphasised fill | `#898781` | `#898781` |

All listed text roles meet 4.5:1 on their corresponding page and surface at full opacity.
Recheck when backgrounds, opacity, font role or interaction state change.
Keep de-emphasised fills separate from text tokens.

Status should follow the host's semantic tokens, with a label or other non-colour cue.
Check their text and mark uses separately in each theme.
Keep neutral series from implying success or failure through the same semantic treatment.
For change indicators, start with an arrow accent and ordinary text without a filled badge.
Check that a thin arrow remains visible. Define whether the change is favourable before assigning status colour.

## Palette diagnostics

Resolve commands from this skill directory. Use the actual opaque chart surface:

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

## Styling starting points

- Use restrained marks and spacing within the host's density scale. Around 2px lines and modest corner rounding can work.
- Choose gaps, outlines or patterns that separate marks without erasing small values or distorting proportions.
- Keep gridlines subordinate to the data. Use a clearly distinguished reference line when the comparison needs one.
- Align table figures and axis labels with tabular numerals. Choose standalone figure typography within the host system.
- Label values where readable and useful. Provide accessible detail when the chart cannot fit every label.
- Choose time ticks from the available width and reporting cadence. Highlight weekends only when they matter to interpretation.
- Measure the full chart, including labels and axes. Resize after hidden panels become visible.

The general colour principles are supported by [Datawrapper](https://www.datawrapper.de/blog/which-color-scale-to-use-in-data-vis).
The particular tokens and dimensions above remain local choices.
