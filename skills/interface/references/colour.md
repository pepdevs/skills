# Colour and icons

## Colour

- **The catalog's look sets the page, surfaces, depth, corner shape and any gradient or glass.**
  Where it sets none, the rules below on those subjects hold. The rules on meaning, contrast and
  series colours always hold. Source: design call, 2026-11-02, listed for the operator.
- **Neutral base; colour only where it carries meaning**: a series, a state, or the one thing to look
  at. No colour across whole regions. Source: operator, decided 2026-10-27 over impeccable:
  colorize.md; `docs/research/charts.md` (:24); `docs/research/figures.md` (:27).
- **One colour scheme per page.** A working screen stays sober; showcases and first explorations
  may be bold. Neither uses a cartoon or 90s techno style. Source: impeccable: operate.md,
  bolder.md, new-work.md; the style ban is operator (no research).
- **Soft colours, no harsh blue, no hard contrast for decoration.** Text meets WCAG 4.5:1, and 3:1
  for large text and chart marks. Check every soft text colour. Source:
  `docs/research/themes-colour.md` (:174, :175, :283 to :287).
- **Series colours are soft through low chroma at mid lightness** (palette A): OKLab L 0.54 to
  0.65, OKLCH C 0.04 to 0.10, blue hues at C 0.08 or less, and Other a grey at C 0.02 or less. One
  palette serves light and dark, every slot reaches 3:1 on `bg` and `surface`, slots stay ΔE00 10
  apart (6 under protan, deutan and tritan simulation) and 12 from the status and accent colours,
  and rank neighbours differ by 0.04 in L. Source: `docs/research/themes-colour.md` (:286, :287,
  :338, :341, :342); `docs/research/charts.md` (:284).
- **Colour never carries a value alone.** Pair it with size, position, a label or a number. About
  8 % of men read red and green as the same. Source: `docs/research/charts.md` (:302).
- **Tint neutrals slightly toward the app's hue instead of flat grey.** Source: impeccable:
  quieter.md; `docs/research/themes-colour.md` (:108).
- **Never put grey text on a coloured fill.** Take secondary text on a fill from that fill's hue.
  Source: impeccable: colorize.md.
- **Use solid colour values**, not stacked translucent layers, so contrast stays predictable.
  Source: impeccable: colorize.md.
- **No gradient text, decorative glass or blur, coloured stripe on one side of a card, or hard
  offset shadow.** Source: impeccable: craft-floor.md.
- **Keep enough contrast between roles** that a quiet screen still has a hierarchy. Source:
  impeccable: quieter.md.
- **Show colour pairs on the Theming page.** Source: `docs/research/themes-colour.md` (:58).

## Controls

- **Controls keep a visible edge, fill or underline.** Flat buttons get missed. A boundary that
  alone identifies a control reaches 3:1. Source: `docs/research/themes-colour.md` (:175).
- **Where the catalog sets no corner shape, keep control radius at most a quarter of the target size.** Source:
  `docs/research/themes-form.md` (:280).

## Icons

- **Icons are one custom SVG set, rounded and sized to their target.** No emoji, and no mix of
  filled and outline. Action icons have no circle behind them; the current phone navigation icon
  uses an accent-soft pill. A drag handle is three or four thin lines. Source:
  `docs/research/guardrails.md` (:102); impeccable: craft-floor.md, polish.md; the circle and
  handle details are operator (no research).
- **An icon-only action uses an icon everyone knows**: search, filter, sort, edit, close, and
  previous and next for steppers. Any other action gets a label, and every icon-only control has an
  accessible name; a `title` attribute does not replace it. Source: `docs/research/guardrails.md`
  (:100, :178).
