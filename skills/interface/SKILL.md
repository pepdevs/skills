---
name: interface
description: 'The operator''s rules for every screen, chart, table, list, dashboard and visual report. Use when building, changing, redesigning, iterating on, reviewing or capturing any user interface in an app, a design web page, an artifact, an exploration or a standalone report. Load it before writing UI code, and pass its checklist before presenting a screen.'
---

# Interface

These rules hold the operator's decisions. Each rule has one owning file. Follow them over any other design guidance.

## Choose a path

| The work | Read |
|---|---|
| A screen of an app used regularly, or a redesign of one | [app-screen](paths/app-screen.md) |
| A page that shows a research result or tries an idea | [exploration](paths/exploration.md) |
| Reviewing or capturing an existing screen | [review](references/review.md) |
| A report or dashboard for a product whose design the operator does not own | The section below |

Read [taste](references/taste.md) on the first two paths.

## A product the operator does not own

A company product, for example, keeps its own shell, components, typography, tokens and themes. Its
readers are not the operator. Read only [questions](references/questions.md), the choosing and scale
sections of [charts](references/charts.md), [accessibility](references/accessibility.md) and
[scenarios](references/scenarios.md). The other rules here hold the operator's taste and do not bind
it. Where these files name an info icon or a drawn state for a limit or definition, the product may
use its own note or annotation. A file report adds [standalone-html](references/standalone-html.md),
and one with no system of its own also adds [report-style](references/report-style.md). Every pepdevs app follows all the rules, including
one still on an older package.

## Order of sources

When guidance disagrees, the higher source wins:

1. An operator decision of 2026-10-27 or later, marked `operator, decided <date>`.
2. A research report, marked `docs/research/<file>.md`.
3. impeccable, marked `impeccable: <file>`.
4. An earlier operator rule that nothing above contradicts, marked `operator (no research)`.
5. A linked public source, such as W3C, ONS or NN/g.

A sentence with a link ranks as its linked source, and any other sentence with no mark as
`operator (no research)`. Accessibility criteria are the exception: a visual preference from any
source yields to them, and the conflict is listed when presenting.

`docs/research/` and `docs/plans/0007-remap.md` are in the archived `pepdevs/ui-deprecated-2`, with
the record of what was taken from impeccable in `skills/interface/references/impeccable.md`.

A source settles only the subject it studied. A finding about the Calendar says nothing about a
table, so never carry a finding to another component without its own evidence.

A case the operator has not decided and no source settles is a design call. Make it from the
purpose of the component, record it with its reason in the plan of the work, and list it when
presenting, so the operator can overrule it. Ask first only when the call removes something the
operator asked for.

## Library first

Build with `@pepsoler/material` and read its `catalog.json` to choose a component. A rule the library
enforces by type, default, token, guard or runtime check lives there, and these references say only
"use the component". A pattern used three times with the same intent moves into the library. Never
copy a library control into an app. The kit is the library's `@pepsoler/material/kit` export: charts,
tables and page structure.

The library does not yet hold everything these rules name, such as `ChartKey`, `Meter`, `Sheet`,
`Segmented` and `Table`, and `catalog.json` lists only styles until its component rows arrive. Such a
rule still states the required behaviour: choose from the library's design web pages and
[charts](references/charts.md), build the smallest local version on library tokens, name the gap when
presenting, and add it to the library as an idea.

## Rules agents break most

Each is stated in full in its reference.

- A screen carries titles, labels and values. No subtitles, notes, hints, captions or explanatory
  legend lines. Removing one such text removes every text of that kind in the app.
  [screen-text](references/screen-text.md)
- The chart key sits behind a swatch button (`ChartKey`). An info icon may open detail when a
  screen needs it. Nothing else explains. [screen-text](references/screen-text.md#disclosure)
- Phone and desktop are different screens. Design each layout on its own; never shrink the desktop.
  [phone](references/phone.md)
- On phone, a long list grows the page and the screen has one scroll. On desktop, a long list
  scrolls inside its card. [phone](references/phone.md), [layout](references/layout.md)
- A ranked list shows 8 rows, then Show all. [tables and lists](references/tables-and-lists.md)
- Detail opens in a right panel beside the list on desktop, and takes the page with Back on phone.
  [navigation](references/navigation.md#detail)
- Nothing moves on hover, press or tab switch. [interaction](references/interaction.md)
- A stated number or rule is kept exactly. Approved fonts and colours stay.
  [review](references/review.md)
- Regions align, end level and keep room between them. [layout](references/layout.md)
- Missing evidence never reads as zero, and a comparison never mixes partial and full periods.
  [questions](references/questions.md#evidence-semantics-before-decoration)
- No app screen is presented before it passes the checklist. [review](references/review.md#checklist-before-presenting)

## References

Read a reference only when the work touches its area.

| Read when the work touches | File |
|---|---|
| The reader's questions, drilldowns, comparisons, evidence, or an analytical page | [questions.md](references/questions.md) |
| Choosing or drawing a chart | [charts.md](references/charts.md) |
| Tables and lists | [tables-and-lists.md](references/tables-and-lists.md) |
| Screen text, type and disclosure | [screen-text.md](references/screen-text.md) |
| Layout | [layout.md](references/layout.md) |
| Phone | [phone.md](references/phone.md) |
| Navigation and detail | [navigation.md](references/navigation.md) |
| Colour and icons | [colour.md](references/colour.md) |
| Interaction and states | [interaction.md](references/interaction.md) |
| Contrast, keyboard, tooltips, chart alternatives, reflow | [accessibility.md](references/accessibility.md) |
| Reviewing a result, and the checklist | [review.md](references/review.md) |
| Failure symptoms and scenarios that challenge these rules | [scenarios.md](references/scenarios.md) |
| A report or dashboard with no library and no visual system | [report-style.md](references/report-style.md) |
| A file that opens locally or works offline | [standalone-html.md](references/standalone-html.md) |
| Chart palette diagnostics | [charts.md](references/charts.md#palette-diagnostics), with [validate-palette.mjs](scripts/validate-palette.mjs) |
