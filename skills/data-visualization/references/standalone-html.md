# Portable HTML reports

Use this mode when the user requests a file that opens locally, works offline or can be shared as an attachment.
An existing application keeps its own build, router and authenticated data access.
For visual defaults, read [report-style.md](report-style.md). Choose the shell and navigation for the report's questions.

## Build and data

- Inline assets and libraries needed offline. Keep external requests out of an artifact promised to work without a network.
- Separate the template from the data-injection script when reports are regenerated.
- Replace an explicit template marker with a function: `template.replace("/*__DATA__*/null", () => encodedData)`.
  A function replacement preserves dollar signs in the data.
- When embedding JSON inside a script element, escape `<` as `\u003c` so source text cannot close the script element.
- Insert labels through text nodes or escaped framework bindings. Source names, titles and comments are untrusted data.
- Collect external enrichment at build time through the project's authenticated collector.
  Include observation dates and coverage limits with the exported records.
- Keep credentials out of the exported HTML. A live application should use its established authentication boundary.

## Interaction

Use hash routes if the local file needs bookmarkable views and entity detail.
Handle history API failures on local-file origins without breaking the rest of the page.
Use history entries for navigation the reader expects Back to revisit; reserve replacement for transient changes.
Keep period and scope when changing views or opening detail.

Size charts when their panel is visible. Remeasure after a tab change or viewport resize.
Retain filter and selection state even when only the active panel is mounted.
Provide visible labels or a data table as an alternative to hovering.

## Verify the actual file

Check the generated JavaScript for syntax errors. Exercise filter changes, tabs and detail links in the delivered file.
Inspect it in a real browser using the intended `file://` or hosted path.
Check offline loading, browser errors, long labels, chart sizing, keyboard interactions and supported themes.
DOM simulations can check events and values; use browser rendering to assess layout and clipping.
