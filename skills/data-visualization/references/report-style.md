# Calm report style

Use these preferred defaults for a standalone report or a dashboard without its own visual system.
A host product keeps its own shell, components and tokens.
Choose the frame, content and chart forms for the reader's questions.
The dimensions and colours below are local preferences. Apply [accessibility.md](accessibility.md) to the rendered result.

## Preferred frame

### Layout

- **App shell.** Use a bounded desktop shell when persistent context helps the task.
  A header, optional insight tiles and tabs can sit above one scrolling content region.
  Choose breakpoints from the content. Smaller screens, zoom and printing use normal page flow.
- **Header line.** Put the title on the left and the open decision or question on the right.
  Start the page at the header line, without a banner or introduction.
- **Insight tiles.** Use a figure and a short label for each headline finding.
  Let tiles grow when labels wrap or text is enlarged.
  An actionable tile opens its evidence section and moves focus to its heading.
  Mark the tile for the current section with `aria-current`.
- **Tabs.** Group sections by the reader's questions when tabs help navigation.
  Lead with the answer and its evidence. Choose the number of tabs from the task.
  A single-question report can use one page. Follow the host's keyboard and selection behaviour for tabs.
- **Routes.** In a report with hash navigation, give each tab and section a stable hash.
  A section hash opens its tab and scrolls to the section. Preserve Back navigation.
  Offer an all-sections view for cross-section comparison. Printing shows every panel.

### Type

- Start with a 14px body size and adjust for the reader, display and text enlargement.
  Build hierarchy from weight (400 for body, 600 for titles and figures) and colour (primary, secondary, muted).
- Use the system sans stack: `"Segoe UI Variable Text","Segoe UI Variable",Inter,"Helvetica Neue",system-ui,sans-serif`.
- Give part titles a 4×16px rounded accent bar in the link colour, and a muted lead sentence below.
- Write entity names, such as endpoints, repositories and packages, in the body font.
  Use monospace only for code the reader copies.
- Use tabular figures in numeric columns.

### Lines and surfaces

| Token | Value | Use |
|---|---|---|
| Page | `#fbfbf9` | Background and tab bar |
| Card | `#ffffff` | Tiles, cards, popovers |
| Surface | `#f4f4f1` | Hover, explanation boxes |
| Line | `#e6e6e1` | Borders, table rules, separators |
| Primary text | `#1f2328` | Body, titles, selected tab fill |
| Secondary text | `#57595c` | Unselected tabs, table headers |
| Muted text | `#6b6d70` | Leads, labels, notes |
| Link | `#2f5f8f` | Links, accent bars, info buttons |
| Risk | `#a8392f` | Risk tag and tile edge |

All text tokens meet 4.5:1 on the page and card colours at full opacity.
Recheck other surfaces, themes and interaction states.

- Start with 1px decorative rules and 2px selection or status edges.
  Essential control boundaries and graphical marks follow the contrast checks in [accessibility.md](accessibility.md).
- Round surfaces: 14px to 16px for cards and tiles, 12px for cells and explanation boxes.
  Make badges, buttons, bars, notes and selected tabs pills (`border-radius:999px`).
- Leave about 40px between parts and 18px below a lead sentence.
- Give table headers no fill and a 1px rule below.

### Selection and state

- **Selected tab:** a filled pill in primary text colour, with white text at weight 600.
  Unselected tabs use secondary text without an underline.
- **Selected tile:** a 1px outline in primary text colour around the 1px border.
- **Risk tile:** a 2px top edge in the risk colour and a "Risk" text tag.

### Marks

- **Status dots.** Draw a 10px dot centred in a 16px box, with its text label beside it.
  Every icon in a row uses the same 16px box, including info buttons.
- **Status scale.** Use it only when the categories have an agreed order of desirability.

  | Meaning | Colour |
  |---|---|
  | Works as is | `#1a9a8a` |
  | Needs rework | `#e0a01b` |
  | Blocked or no equivalent | `#d64534` |
  | Unknown | `#d5d6d2` |

  Run `node scripts/validate-palette.mjs "#1a9a8a,#e0a01b,#d64534" --surface "#ffffff"` from the skill directory.
  Inspect the simulated separation and contrast warnings in context; a diagnostic pass does not establish accessibility.
  Amber and grey fall below 3:1 on white. Keep these dots supplementary to readable text labels.
  Use stronger contrast or another encoding when a mark carries information the label does not supply.
  Show mixed outcomes through their breakdown; keep missing evidence distinct from measured status.
- **Flat fills.** Fill marks with flat colour. Show an unknown share as neutral grey with a label.
- **Bars.** Draw magnitude bars from a zero baseline, in neutral `#3d4a57` unless the bar shows a category.
  Round ends only when small values and stack boundaries remain accurate.
- **Neutral categories.** Categories without a desirability order use the neutral greys or a validated categorical palette.

### Interaction

- **Explanations.** Add a labelled info button when a row entity needs secondary explanation.
  A 16px icon can sit inside a larger hit area; apply the target-size criteria in [accessibility.md](accessibility.md).
  Set `aria-expanded` and associate the button with its explanation.
  It opens a row below with what the entity does in plain words and how it maps to the decision.
  A "Show all explanations" pill toggles every row. Printing shows every explanation.
- **Lists behind a name.** Open the list, such as a team's repositories, in a native `popover` from a button on the name.
  Place it below or above the button, whichever has more room, and cap its height to that room.
  Make Escape and outside-click dismissal work. Verify focus returns to the trigger when dismissed with Escape.
  Close open popovers when the content region scrolls.
- **Focus.** Make every control keyboard operable, with a 2px focus outline in the link colour.

### Content

- Start each section with its finding. Include a figure when the evidence supports one.
- Add a "Not yet measured" section when missing evidence could change the decision.
  List each dimension without evidence, with why it matters, the question to answer, a suggested owner and the affected scope.
- Put sources and the observation date near the answer.

## Open to the task

- The chart form and the comparison it shows. See [choosing-a-form.md](choosing-a-form.md).
- The number and order of tiles, tabs and parts.
- Categorical colours outside the status scale, validated with `scripts/validate-palette.mjs`.
- Additional visuals such as small multiples, sequences and matrices.
- Wording, within the writing rules that apply to the project.

## Check before delivery

Run these checks in a real browser, for example headless Edge or Chrome through Playwright.

1. For a bounded shell, verify the intended desktop viewport scrolls only the content region.
2. Each actionable tile opens its evidence and moves focus to the section heading.
3. Text enlargement and zoom keep controls and evidence reachable.
4. Check reflow at 390px and 320px. Scope necessary two-dimensional scrolling to the affected chart or table.
5. Test keyboard navigation, visible focus, disclosures and popover dismissal.
6. The browser console has no errors.
7. Inspect each view for clipped or overlapping content. Verify printing includes hidden panels and explanations.
