# Tables and lists

## Length

- **A ranked list shows 8 rows, then Show all.** Source: operator, decided 2026-10-27;
  `docs/research/charts.md` (:83).
- **A long table loads more rows as it scrolls, with no pages.** Virtualise it so every row stays
  reachable in one scroll. Source: operator, decided 2026-10-27 over `docs/research/table.md`
  (:362); impeccable: harden.md, optimize.md.
- **A Tag List limits its rows and shows "+N"**, which opens the detail. Tags are a cell summary.
  Source: `docs/research/collections.md` (:236).
- **Test every list and table with extremes**: none, one, thousands of rows, long names, very large
  amounts. Source: impeccable: harden.md.

## Width

- **Tables never scroll sideways. A column picker chooses the columns.** On phone the table keeps
  one-line rows; it does not turn into cards. Source: operator, decided 2026-10-27 over
  `docs/research/table.md` (:79, :183, :392) and impeccable: adapt.md; `docs/research/table.md`
  (:297) for the picker.

## Rows

- **Rows are one line and the same height, with ellipsis.** Pressing a row shows the full text; a
  touch screen has no hover, so a tooltip alone hides it. Source: `docs/research/table.md` (:181);
  `docs/research/guardrails.md` (:198); impeccable: harden.md.
- **A list row shows the record name as main text and its detail as subtext.** Source: operator (no
  research).
- **Row actions show text labels**, such as Details and Categorize, and stay visible. Never show
  them only on hover. At most two show inline; three or more go into one More menu. Source:
  operator, decided 2026-10-27; `docs/research/collections.md` (:43, :58);
  `docs/research/table.md` (:254).
- **Difference and amount are two states of one table, switched inline** by a segmented control.
  Source: `docs/research/collections.md` (:193).

## Toolbar

- **On desktop, Search, Filters and Sort show their word beside the icon.** Source: operator,
  decided 2026-10-27; `docs/research/table.md` (:323).
- **On phone, filter and sort are icon-only buttons with accessible names, and search fills the
  row.** Source: operator, decided 2026-10-27.
- **Show a chip for every active filter, with Clear all.** Source: `docs/research/table.md` (:304,
  :320).

## Cells

- **Give each column one unit and one rounding, right-aligned, with tabular figures.** Source:
  `docs/research/table.md` (:203 to :206).
- **Sort and search on raw numbers and dates**, never on formatted strings. Source: operator (no
  research).
- **Show a dash in an empty cell.** Source: `docs/research/table.md` (:234).
- **Add zebra stripes only to wide or long tables.** Source: `docs/research/table.md` (:80).
- **Order long option lists by share, by count or alphabetically.** Source:
  `docs/research/collections.md` (:111).

## Empty and failing

- **The empty state replaces the headers and body, and the toolbar stays.** Source:
  `docs/research/guardrails.md` (:227).
- **First use, no match, filtered out, no permission and load failure each get their own short
  empty label.** A no-results state offers the action that clears the filter or search. Source:
  impeccable: clarify.md, onboard.md.

## Other

- **Back any new table mode with a use case.** Source: `docs/research/table.md` (:393).
- **CLI tables align columns**, use K units and thousand separators, and show one decimal. Source:
  `docs/research/table.md` (:250); `docs/research/themes-form.md` (:104); the K units are operator
  (no research).
