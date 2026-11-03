# Layout

## Page

- **One app shell on every page: header, then insight tiles, then content.** People find things
  where they found them on the last page. The tiles stay, against impeccable's ban on a big-number
  row. Source: operator, decided 2026-10-27; `docs/research/layouts.md` (:87, :144);
  `docs/research/figures.md` (:17).
- **Show at most 8 insight tiles, 4 on phone, with key numbers at the top left.** Source:
  `docs/research/figures.md` (:40, :57); `docs/research/layouts.md` (:87).
- **With no theme, the page is all white and regions are flat.** A chosen theme sets the page and
  regions, as in [colour](colour.md#colour). One region style per page: no mix of cards and flat
  regions, and no second neutral layer behind panels. Source: operator, decided 2026-10-24 and
  2026-10-27, replacing the grey page with a white shell; `docs/research/themes-form.md` (:302).
- **Page content stops at a maximum width of 64 to 100rem, and regions fill that width.** Lines and
  rows never stretch across a wide screen. Source: operator, decided 2026-10-27;
  `docs/research/layouts.md` (:387).
- **On desktop, a rail holds the primary navigation, and a side menu opens next to it with the
  navigation inside that area.** Source: operator, decided 2026-11-02. The page header holds
  breadcrumbs and the page's global filters, and its edges align with the content edges. A filter that changes one chart sits
  on that chart. Source: `docs/research/layouts.md` (:45, :72); impeccable: mode-operate.md.
- **Pick the page type from the task**: overview, list and detail, detail, settings, form, search
  or empty. Source: `docs/research/layouts.md` (:248 to :254).
- **Give each page one first-use state.** Source: `docs/research/layouts.md` (:327).

## Regions

- **The layout is one rectangle and its regions fill it.** No ragged holes between regions.
  Source: `docs/research/layouts.md` (:176, :177, :416).
- **On a wide screen, regions side by side end at the same height.** When a region would need
  filler to reach that height, give the space to the content. Source: `docs/research/layouts.md`
  (:146, :179).
- **Use the vertical space.** Grow content to fill the screen; never shrink text or charts to make
  a page fit. Source: `docs/research/layouts.md` (:179, :183); `docs/research/themes-form.md`
  (:97).
- **On desktop, a long list or a card's content scrolls inside its card**, so regions keep their
  height and end level. The deck fills the window, so that scroll is the screen's one scroll. The
  phone differs: see [phone](phone.md). Source: `docs/research/layouts.md` (:179);
  `docs/research/table.md` (:183).
- **An overview has 1 to 6 regions. With two, the first is primary, split 7 to 5.** Source:
  `docs/research/layouts.md` (:162, :333).
- **Each component has a fixed place.** Switching chart type, tab or view keeps the main region
  where it was. Source: `docs/research/layouts.md` (:105, :129); `docs/research/navigation.md`
  (:64).
- **Show more at once on desktop than on phone.** Source: impeccable: adapt.md.
- **A carousel shows its strongest item first**, and "more" is a visible button. People rarely pass
  the first slide, and dots are small targets. Source: `docs/research/layouts.md` (:150, :181).

## Spacing and grouping

- **Leave room.** Padding around regions and between rows; a dense page still breathes. Gutters
  between regions stay between 8 and 32 px. Source: `docs/research/layouts.md` (:163, :389);
  impeccable: layout.md, distill.md.
- **Group by spacing first.** Space tightly inside a group and wider between groups. Add a
  container only when spacing cannot show the group. Source: impeccable: layout.md, distill.md.
- **Put more space above a heading than below it.** Source: impeccable: craft-floor.md.
- **Never put a card inside a card**, and never fill a region with identical icon, heading and text
  cards. Source: impeccable: craft-floor.md, layout.md.
- **Align edges, titles and numbers.** Numbers right-align on a shared edge. Align icons and text by
  eye where exact geometry looks off. Source: `docs/research/table.md` (:250);
  `docs/research/themes-form.md` (:104); `docs/research/layouts.md` (:390); impeccable: polish.md.
- **Match density to how often the screen is used.** A daily working screen may be dense. Source:
  impeccable: layout.md.
- **Pick one way to show depth for the whole app, border or shadow**, and use depth only for state,
  such as an open overlay. Source: impeccable: craft-floor.md; `docs/research/themes-form.md`
  (:302).

## Forms and detail

- **Use a Sheet for 1 to 5 fields and a page for a longer flow.** Source:
  `docs/research/layouts.md` (:218).
- **Keep a form column at most 40rem wide, and size each field to the value it expects.** Source:
  `docs/research/layouts.md` (:329); `docs/research/inputs.md` (:100, :126).
- **Show at most 5 facts in a detail header.** Source: `docs/research/layouts.md` (:236).
- **A search starts on All and always shows its result count.** Source:
  `docs/research/layouts.md` (:239).

## Code

- **Keep DOM order and focus order the same as the visual order.** Source: impeccable: layout.md.
- **Give flex and grid children `min-width: 0`** so long text truncates instead of widening the
  layout. Source: impeccable: harden.md.
- **The page never scrolls sideways at any width.** Source: impeccable: audit.md.
