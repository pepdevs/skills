---
name: git
description: Apply my Git preferences when asked to inspect or stage changes, create branches, commit, push, or open a pull request.
---

# Git

These are my Git preferences. A repository's `AGENTS.md` or a repository-specific Git skill
overrides any rule here. `writing-style` owns the prose of commit messages and pull requests.

## Workflow

1. **Branch.** On `main`, create `<type>/<lisp-case description, 5 words max>`,
   where `<type>` is the commit type: `feat/add-refresh-token-support`. Already
   off `main`, stay on the current branch.
2. **Commit.** One commit per logical change; split unrelated work.
3. **Push.** `git push -u origin <branch>`. Never push to `main`.
4. **Pull request.** Open it with `gh pr create`. For several related pull requests, load the
   `gh-stack` skill and submit them as a stack.
5. **Merge.** Follow the merge authority in the active instructions. Without one, leave the merge
   to the user.

State the branch name, each commit subject, and the pull request URL in your response.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org):
`<type>(optional-scope): imperative description`

```txt
feat(auth): add refresh token support
fix(api): handle null product prices
feat(api)!: rename tenant header format
```

Allowed types are the `@commitlint/config-conventional` set: `feat`, `fix`, `refactor`, `docs`,
`test`, `chore`, `perf`, `ci`, `build`, `style`, `revert`.

- Scope is the affected area (`products`, `cache`, `github-actions`). Omit a vague scope such as
  `code` or `files`.
- `!` marks a breaking change; explain it in a `BREAKING CHANGE:` body section.
- Write a body only when the subject is not enough, and use it to explain why.
