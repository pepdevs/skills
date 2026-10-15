# System

This repository contains authored, independently installable agent skills and their public checks.
The Skills CLI installs selected skill directories; each directory carries its resources and notices.

## Layout

| Path | Responsibility |
| --- | --- |
| `skills/` | One self-contained directory per skill, with frontmatter, resources, companion metadata, and applicable licenses |
| `skill-dependencies.json` | Canonical companion map, including externally maintained skills |
| `external-dependencies.json` | External skill sources and commands used by the skills |
| `scripts/check.sh`, `scripts/check.ps1` | Offline checks for Bash and PowerShell |
| `scripts/public-check.py` | Public file allowlist, generic sensitive signatures, optional external denylist, and stable inventory check |
| `scripts/validate-protocol.mjs` | Skill identity, portable links, and companion composition checks |
| `scripts/tests/` | Existing protocol, adapter, and palette fixtures |
| `scripts/skill-size.py` | Optional byte and token-size report |
| `scripts/export-public.py` | Reproduce the reviewed export from an explicit source commit and public scaffold |
| `export-allowlist.json` | Approved files, origin, source checksums, and executable modes for that export |
| `docs/use-cases.md` | Consumer commands and their proof |
| `docs/golden/inventory.txt` | Stable skill and companion inventory |
| `README.md` | Installation, selection, dependencies, and checks |
| `AGENTS.md` | Editing rules, reasons, and revisit conditions |
| `LICENSE`, `NOTICE.md` | Authored license and retained upstream attribution |
| `.github/workflows/check.yml` | Public Linux and Windows check jobs |
| `.gitignore` | Generated files excluded from version control |

## How a command runs

1. The installer discovers `SKILL.md` files and copies selected complete skill directories.
2. The agent reads the selected skill and its resources. Installed companion skills supply shared behavior.
3. Commands such as `gh` or `wf` run in the consumer's configured environment.
4. The repository check scans approved files, verifies resource boundaries and companion metadata,
   and runs the offline fixtures. `gh-stack` resolves through an explicit external declaration.

## Where new code goes

A resource used by one skill stays inside that skill directory. Shared repository checks live in
`scripts/`; their fixtures live in `scripts/tests/`. Companion changes update the canonical map
and the matching installed metadata. Public additions enter the reviewed allowlist.
Installation orchestration and global machine instructions belong to the consumer's configuration.
