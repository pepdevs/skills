# App defaults

Every new app, screen and prototype starts from these defaults. Each one comes from a correction
the operator gave more than once. The operator's pick for a screen stands over a default; a
prototype that departs from one names the default it drops.

Component rules, such as how a chart draws its legend or a list its rows, live in the shared
registry's interface documents. Read the document for each component a screen uses.

## App or page

Decide first whether the screen belongs to an app or a page.

- **App**: a tool the operator returns to. The shell fills the window and never scrolls as a whole.
  On desktop each list, table, pane and long chart scrolls inside its own box. On a phone the
  content between the top bar and the bottom navigation scrolls once, with no scroll inside it
  but a chart's sideways scroll.
- **Page**: a landing page or document read from top to bottom. The page scrolls.
- A component takes a minimum size, never a fixed one, and fills its region. Below its minimum
  it hides fields, switches form or scrolls inside.

## Width and space

- Cap desktop content at 1200 px and centre it, with the ground as side margins beyond the cap.
- Fill the height. Regions in one row share a height.
- On a phone, use the full width inside the layout margin, with no card or fill around a section.
- Use one spacing scale with an even vertical rhythm, and more space between groups than inside them.
- Separate with space. Draw a rule only where space cannot show the grouping.
- Keep the layout still: hover, selection and tab changes move nothing, and a box keeps its height.
  Pick the default state up front, such as the current month or ranked order.

## Phone

- Draw the phone as its own screen, with its own arrangement and visuals. A shrunk desktop is a
  failed phone screen.
- One column, the areas in a bottom bar, an area's sections as tabs that swipe. No accordions.
- Detail takes the whole page, with Back or a close cross at the top right.
- A selector opens as a bottom sheet.
- A chart with many periods shows about four at once and scrolls sideways inside its box.
- Every pressed control has a 48 px hit area on touch and 40 px with a mouse.

## Desktop

- The areas in a sidebar, each area's sections nested under it.
- The top bar keeps one place for each thing: the title on the left, a screen-wide control such as
  the period at the centre, actions on the right.
- Detail opens in a pane beside its list, with its own scroll and a close at the top right.
- A selector opens as a popover.
- Find the narrowest width the desktop arrangement holds, and use the phone arrangement below it.

## Text and values

- A screen carries titles, labels and values. Cut subtitles, repeated periods and totals,
  component names and summaries the reader can derive from the values.
- Put an explanation behind an info icon that opens a popover on desktop and a sheet on a phone.
- Give each role one size and weight. The same kind of value looks the same in every component:
  colour, size and alignment.
- Set figures in tabular numerals and align them on a shared edge.
- A row keeps one height. A record name truncates with an ellipsis only where its detail shows it
  whole; a tag never wraps.

## Controls

- Draw actions as icon buttons from one icon set, without a circle around the icon. A desktop
  button keeps its label when the toolbar has room.
- A list toolbar is search filling the row, then Sort and Filters as buttons beside it, with
  several sorts and filters at once.
- An input is a plain field with its label above. No floating labels.
- Ctrl K opens search. Arrow keys move a selection, Esc clears it.

## Colour

- Keep the ground and regions neutral. Colour carries meaning: good, bad and needs attention.
- Colour a category only when the category is the data being compared.

## Speed

- Show the shell and the last loaded data within 200 ms. A slow path shows a loading state shaped
  like the content. Load a tab when it opens.

## Install

- Every web app installs as a PWA with its own icon and opens without browser controls.

## Checking

- Check each change in a real browser at phone (390x844), tablet (768x1024) and desktop
  (1280x800), in light and dark, on the URL and state the operator uses.
- Say which window size a change targets, and check the others did not move.
- After a release, check the change on production before reporting it live.
