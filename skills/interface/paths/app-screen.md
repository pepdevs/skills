# App screen

A screen the operator returns to. It is designed once, kept in code, and improved by corrections.

## Interview

Ask one question at a time, and stop as soon as the big blocks are clear. Read the app's rules and
[taste](../references/taste.md) first, and never ask what they already settle. Ask about what the
operator wants to know and decide; never ask which chart to use.

1. What do you want to know first when you open this screen?
2. What will you do with the answer?
3. What do you want to see next, and what do you inspect after that?
4. What do you switch between: period, person, category?
5. Which data does each answer need, and does the API provide it?

## Brief

Write `docs/screens/<screen>.md` in the app's repository and confirm it with the operator:

| Field | Holds |
|---|---|
| Purpose | Who uses the screen, how often, and the decision it supports |
| Blocks | The questions in the order the operator asked them |
| Each question | Next action, scope, units, comparison and evidence, as in [questions](../references/questions.md#establish-the-questions-before-arranging-pages) |
| Data | The API read that answers each question, or a data request |
| Choices | The component picked for each question and why |
| States | Empty, loading, one item, many, extreme values and failure |
| Theme | The library theme, or none for a white page with flat regions |

Pick each component from the `answers` of the library's `catalog.json`, once it has them, and from
[charts](../references/charts.md). When nothing fits, follow the gap rule in
[library first](../SKILL.md#library-first).

## Data and visualization

- The API answers in domain terms, such as a month's spending by category. It knows nothing about charts.
- A screen chooses forms and layout. It calculates no figure.
- Shape a read around a question, so two screens can share it. No endpoint per screen.
- A missing or wrong figure becomes a data request, built and proven in its own session. A screen
  never fills the gap with a plausible number.

## Build

1. Before an edit, capture the screen at phone 390 × 844 and desktop 1280 × 800. The repository's
   own frontend workflow owns the commands.
2. Shape it from the brief, for phone and for desktop separately. Rules apply after the purpose is
   clear; a screen that passes every rule and serves no purpose is still wrong. Source: impeccable:
   shape.md.
3. Read the references for every area the change touches.
4. Decide the phone layout and the desktop layout from the purpose, then check each decision against
   the references. Change what the purpose needs, even when no rule names it.
5. Build with library components. Keep each rule as written; record a design call as stated in the
   order of sources.
6. Capture again, in every mode the theme has, use it at both sizes, and walk the
   [checklist](../references/review.md#checklist-before-presenting) on the captures.
7. Review it in two passes that do not see each other: a critique by an agent with fresh context
   that sees only the captures and the purpose, and a mechanical audit of the checklist, contrast,
   targets and states. Fix what both find. Source: impeccable: critique.md, audit.md.
8. Present the result with a link the operator can open on a phone.

## Corrections

Save each correction at the level it applies to, in the same change that makes it:

| The correction applies to | Save it in |
|---|---|
| This screen only | Its brief |
| Every screen of this app | The app's `AGENTS.md` |
| Every app, about what the operator likes | [taste](../references/taste.md) |
| Every app, about how a screen works | The reference for its area |
| A component | The library |
| A figure | The app's API |

Count the corrections per screen in the brief. A count that does not fall means rules are not being
saved or read.

## Redesign and iteration

Follow these steps when the operator asks for a redesign, a new look or a comparison between two
versions. Source: operator, decided 2026-10-30.

1. List the visible differences before editing: shape, size, spacing, density, type and colour, for
   each component. Treat the current look as the thing to replace.
2. Change whatever those differences need: markup, constants, CSS, golden files and use cases. When
   a repository rule blocks a difference, relax the rule in the same pull request and state the
   reason. A recorded gap leaves that component unfinished.
3. Build a pilot of one component, the hardest in scope. Stop and send the operator a link. A plan
   with a pilot lists its acceptance as a gate, and no batch starts before it.
4. Write what the operator accepted into the plan as criteria. Add every decision the operator
   states from then on. Check each decision on every component it applies to.
5. Open the exact URL the operator will open, and confirm the checkout and revision it serves.
   Capture before and after side by side in the same state. A component is finished when each
   difference from step 1 shows in the captures.
6. Present each batch with its compare links and the names of components whose after still matches
   their before. Start the next batch after the operator has seen the links.
7. When the operator reports a wrong result, open the same URL and look first. Answer with what you
   see and the change you are making, then make it, unless the operator asked only for an
   explanation.
