# Screen text, type and disclosure

## Text on a screen

- **A screen carries titles, labels and values.** A reader learns a screen from its layout, so no
  subtitles, notes, hints, captions, explanatory legend lines or lead sentences under part titles.
  Keep errors, empty states, field formats and warnings before a destructive action. Source:
  operator, decided 2026-10-27 over `docs/research/layouts.md` (:87) and
  `docs/research/inputs.md` (:128), which keep short explanatory text;
  `docs/research/guardrails.md` (:240, :241) for the kept kinds.
- **Removing one explanatory text removes every text of that kind in the app.** The operator asks
  once and expects the whole app to follow. Source: operator (no research).
- **Each screen answers one question, named as its heading.** The heading carries the question, so
  no subtitle states a conclusion. Source: `docs/research/layouts.md` (:126); impeccable:
  distill.md.
- **Name a screen or component by its content**, such as "Spending by month". Source:
  `docs/research/guardrails.md` (:294).
- **Say each fact once.** Cut a heading that repeats the line under it, and a title repeated by its
  region. Source: impeccable: clarify.md, distill.md.
- **Put no eyebrow or small label above a title, and never number sections.** Both add text the
  layout already shows. Source: impeccable: craft-floor.md.
- **Use one noun and one verb for each thing across the app**, taken from the repository's
  `CONTEXT.md`. Source: impeccable: clarify.md.
- **Write plain words in sentence case, with no em dashes.** Source: `docs/research/guardrails.md`
  (:225, :226, :242); the em dash ban is operator (no research).
- **Use real content and plausible values in seeds, captures and explorations.** Mark invented
  values as invented, and never invent a claim. Source: impeccable: mode-operate.md, craft-floor.md.

## Labels

- **Button labels start with a verb**: "Save changes", "Back to Money". A stepper's icons are named
  the same way, such as "Previous month". No check can parse a label's language, so review keeps
  it. Source: `docs/research/inputs.md` (:70); impeccable: clarify.md.
- **Keep tab labels to one or two words and a Tag label to three words or fewer.** Source:
  `docs/research/navigation.md` (:13 to :19); `docs/research/collections.md` (:235).
- **A field's label stays visible above it.** A placeholder holds only an example value and is never
  the label. Source: `docs/research/inputs.md` (:93 to :94); impeccable: clarify.md.
- **Show a field's required format before the person submits**, as a placeholder example or a
  format line. A format is kept text; a prose hint is not. Source: operator, decided 2026-10-27
  over `docs/research/inputs.md` (:128, :176); impeccable: clarify.md.
- **Mark required or optional with text on the smaller group. Never use an asterisk.** Source:
  `docs/research/inputs.md` (:106).
- **A disabled control's reason is its accessible description**, read by screen readers. It never
  shows as a tooltip. Source: operator, decided 2026-10-27 (no explaining tooltips) over
  `docs/research/inputs.md` (:65).

## Messages

- **An error says what failed and how to recover, in product words.** No internal codes, no
  apologies, no jokes, and never a joke about money. Source: impeccable: clarify.md, delight.md;
  `docs/research/guardrails.md` (:226).
- **Each API failure has its own message**: offline, not found, conflict, server error. Source:
  impeccable: harden.md.
- **A destructive confirmation names the object and what will be lost**, and its button names the
  action. Source: impeccable: clarify.md.
- **A routine success shows the saved state, or a short message.** Source: impeccable: clarify.md,
  delight.md.

## Type

- **One type scale across the app.** Every section title uses the same font and size. Source:
  `docs/research/themes-form.md` (:99); impeccable: typeset.md, operate.md.
- **Secondary numbers keep the size and step down in weight or colour.** A change below a total
  reads second without a smaller font. Source: operator (no research).
- **Use a fixed rem scale with a small step, about 1.125 to 1.2, and no fluid type.** Browser zoom
  and user text settings keep working. Source: impeccable: operate.md, typeset.md, over
  impeccable: harden.md; `docs/research/themes-form.md` (:39).
- **Keep as few type roles as the hierarchy needs**, each recognisable without reading it. Source:
  impeccable: typeset.md.
- **Use tabular numerals wherever numbers sit in columns or change in place.** Source: impeccable:
  typeset.md; `docs/research/themes-form.md` (:104).
- **Set `text-wrap: balance` on headings and `text-wrap: pretty` on body text.** Source:
  impeccable: typeset.md.
- **Load fonts with metric-matched fallbacks** so text never disappears or reflows while loading.
  Source: impeccable: typeset.md.
- **Give light text on dark surfaces slightly more line height, tracking and weight.** Source:
  impeccable: typeset.md.

## Disclosure

- **The chart key sits behind a swatch button.** The legend is never placed first and
  series are not labelled at their ends. Eye tracking shows a legend draws attention away from the
  data. Source: operator, decided 2026-10-27 over `docs/research/charts.md` (:98, :107);
  `docs/research/charts.md` (:99).
- **An info icon may open explanatory detail when a screen needs it.** Use it only for detail that
  the chart key cannot hold. It opens a popover on desktop and a sheet on phone. Source: operator,
  decided 2026-10-27.
- **Nothing else explains a screen**: no `?` icons, explaining tooltips, guided tours, "How this is
  calculated" rows, Disclosure sections or accordions. Detail on an item opens in its detail view.
  Source: operator, decided 2026-10-27 over `docs/research/navigation.md` (:246, :263).
- **A missing value is a drawn state**, hatched or blank, distinct from a measured zero. No note
  under the chart explains it. Source: `docs/research/charts.md` (:120, :304);
  `docs/research/figures.md` (:221).
