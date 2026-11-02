# Exploration

A page that shows a research result or tries an idea. It is read a few times, so it takes one or two
rounds and leaves no code to maintain. It still has to look good.

1. Ask at most two questions, and only what the request leaves open: who reads it, and what they
   should decide. Read [taste](../references/taste.md).
2. Name each question the page answers and lead with the answer, as in
   [questions](../references/questions.md#make-the-answer-visible). A single-question page needs no
   navigation, settings or question list.
3. Start from [assets/exploration-starter.tsx](../assets/exploration-starter.tsx), which holds real
   library components and the base themes. The components and theme set the look; choose the content
   and its order. Never write a page's look from scratch, except a page promised to work offline.
4. Build one HTML file:

   ```sh
   node <skill directory>/scripts/build-exploration.mjs entry.tsx out.html --material <pepdevs/material checkout> --title "Page name"
   ```

   `--material` points at a checkout with installed dependencies, so the page gets the newest
   components. The build loads fonts over the network, so it does not suit a page promised to work
   offline; follow [standalone-html](../references/standalone-html.md) for that.
5. Until the kit has charts and tables, draw charts by hand as inline SVG from
   [charts](../references/charts.md), with series colours from [colour](../references/colour.md), and
   write tables from [tables and lists](../references/tables-and-lists.md).
6. Keep real research figures, with their source and observation date behind an info icon beside the
   answer. Replace
   household or other private data with invented values on a page others will see, and mark them as
   invented.
7. Inspect it in a browser at phone 390 × 844 and desktop 1280 × 800, in each mode its theme has, and
   walk the checks in [review](../references/review.md#looking) that apply. Report what you could not
   check.
8. Publish it where the operator can open it on a phone.

## What carries over

- A correction about what the operator likes goes into [taste](../references/taste.md), so it reaches
  the apps too.
- A component the page needed and the library lacks goes to the library as an idea. An exploration
  never starts a library change.
- An exploration the operator starts using regularly becomes an app screen, through
  [app-screen](app-screen.md).
