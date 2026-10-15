# Default Git conventions

Use these conventions where repository-local instructions leave a rule unspecified.
Work reaches `main` through a pull request that the user reviews and merges.
No ticket reference is required by this default workflow.

## Workflow

1. **Branch.** On `main`, create `<type>/<lisp-case description, 5 words max>`,
   where `<type>` is the commit type: `feat/add-refresh-token-support`. Already
   off `main`, stay on the current branch.
2. **Commit.** One commit per logical change.
3. **Push.** `git push -u origin <branch>`.
4. **Pull request.** Open it with `gh pr create`. The user reviews and merges it.
   Several related pull requests: load the `gh-stack` skill and submit them as a
   stack instead of independent branches — the user then merges the top PR and
   GitHub lands every layer bottom-up.

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org):
`<type>(optional-scope): imperative description`

```txt
feat(auth): add refresh token support
fix(api): handle null product prices
feat(api)!: rename tenant header format
```

Allowed types are the standard `@commitlint/config-conventional` set: `feat`,
`fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`, `build`, `style`,
`revert`.

- Scope is the affected area (`products`, `cache`, `github-actions`) — omit it
  rather than writing a vague one like `code` or `files`.
- `!` marks a breaking change; explain it in a `BREAKING CHANGE:` body section.
- Use a body only when the subject is not enough, and to explain *why*.

## Rules

- One commit per logical change; split unrelated work.
- Push the branch, never `main`. Leave the merge to the user.
- State the branch name, each commit subject, and the pull request URL in your
  response.
