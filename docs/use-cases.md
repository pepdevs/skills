# Use cases

These commands exercise the public artifact without private repositories or credentials.
`scripts/public-check.py` compares the stable inventory with its golden file on every check.
Existing fixtures exercise publication adapters through fake GitHub responses and validate the
plan, outcome, evaluation, capsule, and palette contracts.

## uc-1 Discover installable skills

Which skills can the installer discover in this checkout?

```bash
npx --yes skills@1.7.2 add ./ --list
```

Discovery reads the skill frontmatter through the existing installer. This command uses npm and
has no golden file because package fetching depends on the network.

## uc-2 Inspect companions

Which skills and companion identities form the public collection?

```bash
python3 scripts/public-check.py --inventory
```

The result matches `docs/golden/inventory.txt`. Each skill's installed JSON array matches its
entry in the canonical root map. An externally maintained companion has an explicit source.

## uc-3 Check the public boundary and behavior

Does every approved file remain public, portable, and compatible with the protocol fixtures?

```bash
bash scripts/check.sh
```

On Windows:

```powershell
pwsh -File scripts/check.ps1
```

The command scans every approved UTF-8 file for generic sensitive signatures, rejects unexpected files and resource symlinks,
checks frontmatter and portable links in every skill, and runs the offline fixtures. The
publication adapters use fake responses; these checks publish no issue, comment, or pull request.
Test timings vary, so the fixtures assert behavior directly instead of comparing console output.

## uc-4 Reproduce the reviewed export

Can a reviewer rebuild the publication artifact from approved source files and the public scaffold?

```bash
python3 scripts/export-public.py <source-checkout> <empty-output-directory> --revision <full-source-commit>
```

`export-allowlist.json` names every exported file. A `source` record pins its approved bytes by
SHA-256. A `public` record takes the audited file from this public scaffold, including deliberate
Git convention and check adaptations. The exporter reads the explicit source commit, verifies
all source checksums before writing, and writes only approved paths into an empty directory.
It never copies Git history. Keep the source checkout and its revision outside public documents.
For an export privacy review, run `scripts/public-check.py --denylist <external-private-terms.json>`
with a reviewer-supplied literal-term array. Keep private audit terms outside the public tree.

Run `bash <empty-output-directory>/scripts/check.sh` after export. Compare all relative paths,
bytes, and executable modes with the scaffold. The exporter writes outside the repository and
requires the reviewer's source checkout, so this use case has no committed golden output.

When maintaining this repository, add reviewed public files to the allowlist and classify changed
export inputs as public overrides. Regenerate installed dependency arrays and the inventory golden
file after companion changes. Review their diffs and rerun the checks.

## uc-5 Measure instruction size

How much context does a selected skill's entry file consume?

```bash
uv run scripts/skill-size.py skills/writing-style
```

This optional command fetches `tiktoken` through the script's dependency metadata. It excludes
on-demand references from its count. Package fetching makes it unsuitable for the offline check.
