# Exploration

A page that shows a research result or tries an idea. It is read a few times, so it takes one or two
rounds and leaves no code to maintain. It still has to look good.

1. Ask at most two questions, and only what the request leaves open: who reads it, and what they
   should decide. Read [taste](../references/taste.md).
2. Name each question the page answers and lead with the answer, as in
   [questions](../references/questions.md#make-the-answer-visible). A single-question page needs no
   navigation, settings or question list.
3. Find the [component catalog](../SKILL.md#component-catalog). The catalog sets the look; choose the
   content and its order.
4. Build one HTML file with the catalog's components, through the project's own build or a bundler
   that inlines scripts and styles. For a page promised to work offline, follow
   [standalone-html](../references/standalone-html.md).
5. Draw a chart the catalog lacks as inline SVG from [charts](../references/charts.md), with series
   colours from [colour](../references/colour.md), and write tables from
   [tables and lists](../references/tables-and-lists.md).
6. Keep real research figures, with their source and observation date behind an info icon beside the
   answer. Replace household or other private data with invented values on a page others will see,
   and mark them as invented.
7. Inspect it in a browser at phone 390 × 844 and desktop 1280 × 800, in each mode it supports, and
   walk the checks in [review](../references/review.md#looking) that apply. Report what you could not
   check.
8. Publish it where the operator can open it on a phone.

## What carries over

- A correction about what the operator likes goes into [taste](../references/taste.md), so it reaches
  the apps too.
- A component the page needed and the catalog lacks is proposed for the catalog. An exploration
  never starts a catalog change.
- An exploration the operator starts using regularly becomes an app screen, through
  [app-screen](app-screen.md).
