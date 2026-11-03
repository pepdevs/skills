# Review

## Keeping the operator's word

- **A number or rule the operator states is kept exactly**, on every screen it applies to. Agents
  have repeatedly ignored stated counts, sizes and periods. Source: operator (no research).
- **Approved fonts, colours and components stay.** A refinement changes only the named target, adds
  no new primitives, and keeps the existing identity and copy. Source: impeccable: SKILL.md,
  new-work.md.
- **Use the catalog's components first.** Promote a pattern to the catalog after three uses with the
  same intent, merge near-duplicate components, and make a value a token only when it is reused
  with the same meaning. Source: impeccable: extract.md, polish.md, distill.md.
- **Follow the pattern of neighbouring screens before inventing one.** Source: impeccable:
  polish.md.
- **Never remove information a decision needs while simplifying.** Source: impeccable: distill.md.

## Before shaping

- **Settle the screen's task, information, important states, content ranges and how often it is
  used.** Source: impeccable: shape.md.
- **Bold for showcases and first explorations, sober for working screens.** Source: impeccable:
  bolder.md, new-work.md, operate.md.

## Looking

- **Capture before an edit, then review the new capture visually.** A clean automated check never
  replaces looking. Source: impeccable: polish.md; `docs/research/guardrails.md` (:135).
- **Inspect at phone 390 × 844 and desktop 1280 × 800, in every mode the app supports.** Source:
  `docs/research/layouts.md` (:429); impeccable: polish.md.
- **Check every capture before judging it**: right viewport, no blank regions, fully loaded, motion
  settled. Source: impeccable: new-work.md.
- **Inspect every reachable state for overlap and clipping in one batched round, and stop after two
  rounds.** Source: impeccable: new-work.md.
- **Use the feature yourself on desktop and phone before judging it.** Source: impeccable:
  polish.md.
- **Squint at the screen.** The primary item, the secondary items and the groups still stand out,
  and the hierarchy still reads with all copy removed. Source: impeccable: layout.md, bolder.md.
- **Review in two passes that do not see each other**: a visual read and a mechanical check. A
  reviewer with fresh context is better than one who saw the build. Source: impeccable:
  critique.md, new-work.md.
- **Count a claimed fix only when a new capture shows it.** Report a verdict only at the scope it
  covers. Source: impeccable: new-work.md.
- **Hold every capture against these rules**, even where a reference image shows a refused element.
  Source: impeccable: degraded/finish-reviewer.md.

## Fixing

- **Fix in this order: broken tasks, missing states, flow, visual detail, code.** Rate findings P0
  to P3 by effect on the task. Source: impeccable: polish.md, audit.md.
- **Name each drift before fixing it**: missing token, one-off value, wrong concept or local defect.
  Fix it at the narrowest level that removes it. Source: impeccable: polish.md.
- **Measure performance before and after a change that touches it.** Source: impeccable:
  optimize.md.

## Presenting

- **Give the operator a link to check on the phone**: a preview deploy or an artifact. Source:
  operator (no research).
- **Show before and after side by side**, and keep the captures where the next review can find
  them. Source: operator (no research).
- **Write no layout tests while a screen still changes.** Close the work with golden files plus a
  visual review. Source: operator (no research).
- **Write design rules from shipped screens.** Never record a defect as a rule to make a finding go
  away. Source: impeccable: document.md.

## Checklist before presenting

Walk every line on the captures. Fix each failure and capture again. When presenting,
say which lines were checked and name any line that could not be checked.

- [ ] Every text on screen is a title, a label, a value, an error, an empty state, a field format
  or a warning before a destructive action.
- [ ] No info icon, `?` icon, explaining tooltip, Disclosure or accordion explains the screen,
  apart from the chart key and an info icon the screen needs.
- [ ] Phone and desktop each have their own layout. The phone shows six months, and its charts
  scroll sideways in sync.
- [ ] The phone screen has one scroll. No list scrolls inside a card on phone.
- [ ] The phone tab row fits without scrolling sideways.
- [ ] The page never scrolls sideways at any width. No table scrolls sideways.
- [ ] Ranked lists show 8 rows, then Show all. Long tables load more rows on scroll.
- [ ] Desktop toolbars show the words Search, Filters and Sort. Phone toolbars use icon buttons,
  and search fills the row.
- [ ] Row actions show text labels.
- [ ] Hovering, pressing and switching tabs move nothing. A chart animates only its marks, within
  500 ms.
- [ ] Table heat cells draw a dot sized by value beside the value. The Calendar shades its days.
- [ ] Bars start at zero, and scatter axes fit the data.
- [ ] The page and regions follow the catalog, or are white and flat where it sets none, and colour
  appears only where it means something.
- [ ] Regions form one rectangle, side-by-side regions end level, and edges and numbers align.
- [ ] Every target is at least 44 px on touch and 40 px with a mouse.
- [ ] Every number the operator stated, such as a count, size or period, matches the screen.
- [ ] Every mode the app supports passes text contrast.
- [ ] Missing evidence reads differently from zero, and period comparisons use matching windows.
- [ ] In a redesign, before and after differ at a glance in every component presented, on the URL
  the operator will open.
