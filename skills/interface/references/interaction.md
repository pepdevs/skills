# Interaction and states

## Stability

- **Nothing moves on hover, press or tab switch.** Hover changes colour only, on one line. A tab
  switch keeps the panel height up to 24rem by default. Layout shift is a
  defect. Source: `docs/research/table.md` (:187); `docs/research/navigation.md` (:64, :286);
  `docs/research/layouts.md` (:129).
- **Every choice starts with a default.** A page opens with its period, tab and selection made, so
  the first press never changes the layout. Source: `docs/research/collections.md` (:189).
- **Text that opens in place uses space reserved for it.** Source: `docs/research/layouts.md` (:129,
  :326); impeccable: optimize.md.
- **The first screen is instant.** Never lazy-load anything in it. Later loads show a skeleton shaped
  like the content, never a lone centred spinner. Source: impeccable: optimize.md, operate.md;
  `docs/research/layouts.md` (:129).

## Motion

- **Motion only shows a change of state**, at 150 to 250 ms, fastest for direct feedback. No preset
  passes 500 ms. No entrance choreography on load. Source: `docs/research/themes-form.md` (:351 to
  :355, :379); impeccable: animate.md.
- **Exits are faster than entrances, and entries ease out.** Never bounce or elastic easing.
  Source: `docs/research/themes-form.md` (:379, :380); impeccable: animate.md, quieter.md.
- **Animate only transform and opacity.** Content is visible by default; motion never hides it until
  a script runs. Source: impeccable: animate.md.
- **Limit a stagger to a few items, and stop looping animations off screen.** Source: impeccable:
  animate.md.
- **Movement stops under `prefers-reduced-motion`; fades stay.** Source:
  `docs/research/themes-form.md` (:356 to :364, :378).

## Actions

- **Each layer has one primary action.** A danger action is never primary. Source:
  `docs/research/inputs.md` (:15, :45).
- **Offer undo when an action can be reversed. Confirm only irreversible actions.** Source:
  impeccable: clarify.md; `docs/research/inputs.md` (:15).
- **Every action shows that it ran**: a change on screen, a status or a message. A routine save
  shows as done at once. Source: impeccable: critique.md, delight.md.
- **Never fake progress.** Show a real indicator or none. Source: impeccable: delight.md.
- **The same action looks and behaves the same everywhere.** Source: impeccable: operate.md.
- **Use standard controls in their usual form.** Never dress a control or a typeface as a costume.
  Source: impeccable: mode-operate.md.
- **Use a slider only for approximate values, paired with an input for exact ones.** Source:
  `docs/research/inputs.md` (:205 to :209).
- **Render popovers and menus outside clipping containers.** Source: impeccable: operate.md.

## States

- **Design every state of each component**: default, hover, focus, active, disabled, loading,
  error, empty and overlong content. Source: impeccable: operate.md, polish.md.
- **Every control shows a focus ring on keyboard focus**, and the ring survives forced colours.
  Source: `docs/research/themes-form.md` (:458, :461).
- **A form with errors shows them together and links to each field.** The summary sits above the
  fields and takes focus; each field still shows its own message. Source:
  `docs/research/guardrails.md` (:245).
- **Keep what the person typed when a submit fails, and block a second submit while the first
  runs.** Source: impeccable: harden.md.
- **Clean up after an interrupted gesture or request.** A cancelled drag returns the item; a
  cancelled request leaves no half state. Source: impeccable: harden.md.
- **When one region fails, show the error and a retry in that region**, and keep the rest of the
  screen working. Source: impeccable: harden.md.
