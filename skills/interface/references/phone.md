# Phone

- **Phone and desktop are different screens. Design each layout on its own.** Pick what a phone
  needs and draw it for 390 px, with its own visualizations. A shrunk desktop layout does not
  count. Source: operator, restated 2026-10-27; `docs/research/layouts.md` (:249); impeccable:
  adapt.md.
- **Keep every task reachable on phone**, even when the phone shows less data by default, and keep
  the same structure and names as desktop. Source: impeccable: adapt.md.
- **Show fewer periods on phone, six months by default.** Charts scroll sideways in sync, and the
  chart title names the period in view. Source: operator (no research).
- **A phone screen has one scroll.** A long list grows the page; no list or card scrolls inside a
  scrolling page, where it traps the thumb. Charts scrolling sideways in sync are the exception.
  Source: operator, decided 2026-10-27; `docs/research/layouts.md` (:131).
- **Detail takes the page, with Back.** Below 1000 px, pressing an item opens its detail as a page;
  Back returns to the list with its scroll and filters. Source: operator, decided 2026-10-27;
  `docs/research/layouts.md` (:217).
- **Navigation is a bottom bar of 3 to 5 icon destinations with big, legible labels.** Navigation
  inside a destination opens in an overlay side menu. More destinations go behind a menu, and the
  current destination stays visible there. Source: operator, decided 2026-11-02; `docs/research/layouts.md` (:64, :65).
- **The tab row never scrolls sideways.** Shorten labels, or use fewer tabs. Source: operator,
  decided 2026-10-27.
- **Sheets open on phone; popovers stay on desktop.** The Presentation `auto` setting already does
  this. Source: `docs/research/navigation.md` (:218).
- **Targets are 44 px on touch and 40 px with a mouse**, through the library's target token, and keep full
  size in dense mode. Source: `docs/research/themes-form.md` (:155, :237);
  `docs/research/guardrails.md` (:149).
- **Keep 16 px between content and the screen edge.** Text against the edge fails reading. Source:
  operator, decided 2026-10-27; `docs/research/layouts.md` (:388).
- **Spend phone space on content.** No repeated title and no tag that wraps to two lines. No logo in
  the header, no arrows, no scroll bar inside a demo and no split viewport. Source:
  `docs/research/layouts.md` (:73, :128) for the title and the tag; the rest is operator (no
  research).
- **Keep primary actions within thumb reach**, near the bottom of the screen, and pad the bottom
  bar, sheets and edge content with the safe-area insets. Source: impeccable: adapt.md.
- **Keep text at 11 px or larger, and body and input text at 16 px or more** so iOS does not zoom
  into a field. Source: `docs/research/themes-form.md` (:70, :97); impeccable: adapt.md.
- **Never put a function behind hover.** Gate hover-only polish behind `(hover: hover)` and
  `(pointer: fine)`. Source: impeccable: adapt.md.
- **A hidden gesture has a visible twin.** Sweeping a row may reveal edit icons; pressing the row
  still opens a page where the same edit is a button. A swipe between regions needs visible dots or
  tabs that do the same. Source: `docs/research/collections.md` (:61); `docs/research/layouts.md`
  (:181).
- **Test custom gestures on a touch device**: the drag completes, a scroll across the control does
  not trigger it, and the record says where the evidence came from. Source: impeccable: adapt.md.
- **Hide drop-zone wording on touch screens.** Source: `docs/research/inputs.md` (:155).
