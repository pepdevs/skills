# System

`skills/` contains independently installable skills. Each directory owns its instructions,
resources, companion metadata, and applicable license notices. The installer copies that directory.

`external-dependencies.json` identifies separately maintained skills and required commands.
`scripts/check.mjs` checks skill identity, companion availability, and portable resource links.
`.github/workflows/check.yml` runs that check for pull requests and pushes to main.

`README.md` explains installation. `AGENTS.md` owns editing rules. `LICENSE` and `NOTICE.md`
record licensing and attribution. `.gitignore` excludes generated local files.

Keep a new skill's resources inside its directory. Add its companions to its own
`skill-dependencies.json`. Deployment configuration belongs to the consumer's setup.
