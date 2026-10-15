---
name: git
description: Apply repository-specific Git conventions when asked to inspect or stage changes, create branches, commit, or push. Read repository-local conventions first and use the default workflow for unspecified rules.
---

# Git workflow

This skill owns branch and commit conventions, staging, pushes, and pull requests.
`writing-style` owns prose. Repository-local conventions define project-specific behavior.

## Resolve conventions

1. Resolve the repository root with `git rev-parse --show-toplevel`.
   If this fails, report that the current directory is outside a Git repository and stop.
2. Read the applicable `AGENTS.md` and any Git instructions or convention files they name.
   Follow repository-local branch, commit, approval, and pull-request rules first.
3. Read `resolvers/default.md` completely. Use it for rules the repository leaves unspecified.
4. Follow a separately installed repository-specific Git skill when active instructions select it.
   Keep the publication and merge authority established by the user.
