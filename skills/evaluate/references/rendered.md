# Rendered and visual outputs

Inspect the final rendered form at the size and environment its consumer will use. Source validity
and successful export do not establish layout quality.

## HTML and user interfaces

- Open the page in a real browser or the target application.
- Inspect the rendered layout instead of relying on the DOM or source alone.
- Exercise the interactions that carry the requested behavior.
- Check relevant viewport sizes, themes, focus states, and empty or error states.
- Re-open the output after a fix and repeat the affected interaction.

## Slide decks

- Render every slide to images or a PDF.
- Inspect every slide for clipping, overlap, unreadable text, missing assets, and inconsistent
  alignment.
- Read the deck in sequence and confirm that titles, claims, visuals, and transitions form the
  intended argument.
- Open the native deck when the target application is available.
- Check animation, notes, and font substitution that the static render hides.

## Documents and PDFs

- Render or open every page.
- Inspect pagination, headings, tables, figures, margins, font substitution, and broken links.
- Compare the rendered content with the requested structure and source data.

## Images

- Open the final bitmap at its intended resolution.
- Inspect crop, transparency, legibility, artifacts, and required dimensions.

## Audio and video

- Play the final media with a compatible consumer.
- Check duration, continuity, clipping, silence, synchronization, and requested dimensions or
  channels.
- Inspect the complete sequence when its progression carries meaning. Use representative
  timestamps only for deterministic repeated segments whose boundaries receive separate checks.
- Confirm captions, transcripts, and metadata when they are part of the deliverable.

## Spreadsheets

- Recalculate with a compatible spreadsheet engine.
- Inspect every material sheet for errors, truncated values, formula results, and number formats.
- Check filters and frozen or hidden regions that affect use.
