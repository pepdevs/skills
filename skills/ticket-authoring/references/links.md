# Links, tables, and formatting

Apply these rules to ticket descriptions and comments when they cite another artifact.

## Label every reader-facing URL

Write `[descriptive label](url)` in Markdown or the active tracker's equivalent. Use the path,
document title, run name, ticket identifier, or package name as the label. The label identifies the
target when the reader cannot open the link.

Render service endpoints and other machine-consumed URLs as code because they are values rather
than reader destinations.

## Prefer stable repository links

Use a permalink when citing specific lines. Use the default branch when citing a file as a living
whole.

| Citing | Reference | Reason |
|---|---|---|
| Specific lines | Commit SHA | The content and line numbers stay together |
| A file as a whole | Default branch | The reader reaches the current version |
| Pull request, commit, run, or ticket | Provider object URL | The label and provider retain identity |

Resolve the repository in this order:

1. Parse `git remote get-url origin` for a file in the current repository.
2. Read the origin from the relevant clone for another local repository.
3. Use the connected source-control integration to resolve a named repository.
4. Keep the bare path and mark it unresolved when the repository or revision remains uncertain.

Support HTTPS, SCP-like SSH, and `ssh://` remote forms. Remove a trailing `.git`. Do not assume an
organization, provider, default branch, or revision.

## Verify links before publishing

Reuse a URL copied from an authoritative object you just read. Verify a constructed URL through
the authenticated provider integration when possible. An anonymous HTTP 401, 403, or 404 does not
prove that a private object is missing.

Fix or remove a link that the authenticated provider confirms does not resolve. A fabricated link
costs more than an explicitly unresolved path.

## Use tables for repeated fields

Use a table when two or more items share attributes that the reader should compare down a column,
such as environment and result or option and trade-off.

Use prose for one value. Use a list for a plain enumeration. Use separate paragraphs when each row
needs a sentence of explanation. Keep tables narrow enough for the active tracker's reading pane.
