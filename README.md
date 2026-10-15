# Skills

Reusable agent skills for planning, implementation, review, Git workflows, writing, and data
visualization. Each directory under `skills/` is an installable skill with its own resources.

## Install

The [Skills CLI](https://github.com/vercel-labs/skills) discovers and installs selected skills.
Version `1.7.2` is the verified installer and requires Node.js 22.20 or newer.
For example, install writing rules for Codex:

```bash
npx --yes skills@1.7.2 add pepdevs/skills --skill writing-style --agent codex --global --copy --yes
```

Omit `--global` for an installation scoped to the current project. `--copy` keeps installed
resources together. Other agent targets need their native discovery paths checked: the installer
uses `.agents/skills` for several clients, while Pi 0.87.1 discovers global skills under
`~/.pi/agent/skills`. Configure that client to discover the installed directory, or copy selected
skill directories into its native location. An installer success alone does not prove discovery.
From a local checkout, inspect discovery before installing:

```bash
npx --yes skills@1.7.2 add ./ --list
```

For reproducible installation, replace the source with a full commit URL:
`https://github.com/pepdevs/skills/tree/<full-commit-sha>/skills/writing-style`.
The installer fetches that revision; updating the revision is a separate decision.

## Choose skills and companions

| Skill | Purpose |
| --- | --- |
| `clarify` | Interview for a plan and publish its draft and explicit confirmation |
| `create-verification-skill` | Create feature maps and reusable verification instructions |
| `critique` | Review a plan and publish evidence-supported corrections |
| `data-visualization` | Design and inspect charts, tables, and operational dashboards |
| `delegate` | Route and launch fresh agent sessions through Workflow |
| `evaluate` | Review an implementation or inspect its consumed form |
| `git` | Apply repository-local conventions and a default pull-request workflow |
| `implement` | Deliver one outcome issue and its implementation pull request |
| `pr` | Write a visual pull-request description with evidence and merge risk |
| `project` | Keep repository documents, structure, policies, and proof coherent |
| `record-improvement` | Turn a confirmed concern into a proposed improvement pull request |
| `retain` | Save evidence-backed learning to a user-selected Obsidian vault |
| `ticket-authoring` | Write tracker-independent tickets, criteria, and comments |
| `to-outcomes` | Publish bounded GitHub outcome issues from a confirmed plan |
| `workflow-build` | Run implementation and evaluation across an outcome queue |
| `workflow-plan` | Compose planning and fresh-session critique before confirmation |
| `writing-style` | Apply prose rules by documentation, instruction, and correspondence register |

Each skill's `skill-dependencies.json` names its companions. Install them recursively alongside
the selected skill. Conditional companions, such as `gh-stack` for stacked work, support every
documented branch. The Skills CLI installs only the skills you select; it does not resolve this
metadata automatically. Deployment tools can read the same metadata from installed skills.

`gh-stack` is maintained separately. Install it from its upstream source when the companion map
requires it:

```bash
npx --yes skills@1.7.2 add github/gh-stack --skill gh-stack --agent codex --global --copy --yes
```

For example, `clarify` uses `writing-style` and `git`; `git` uses `gh-stack` when branches depend
on other pull requests. Repository-local Git instructions take precedence over its default
conventions. Specialized convention skills compose under distinct names.

## Commands and integrations

[external-dependencies.json](external-dependencies.json) names command sources and the skills
that use them. Publication needs Git and authenticated [GitHub CLI](https://cli.github.com/).
Stacked work needs the [gh-stack extension](https://github.com/github/gh-stack) and its skill.
`delegate`, `workflow-plan`, and `workflow-build` need the external
[Workflow CLI](https://github.com/pepdevs/workflow), available as `wf`, and a configured agent
harness. Standalone planning, implementation, and review skills can run in the invoking session.

Skill helpers and the repository check use Node.js 22 or newer.
`retain` asks for the user's vault and follows its templates. Ticket publication uses the active
tracker integration; browser verification uses an available browser harness.
These integrations and their authentication belong to the consumer's environment.

## Check

```sh
node scripts/check.mjs
```

One offline check validates skill names, descriptions, companion declarations, and portable local
resource links. CI runs the same command. This repository contains installable skills and their
resources; machine deployment and migration tooling stay outside its published tree.

[AGENTS.md](AGENTS.md) defines editing rules; [SYSTEM.md](SYSTEM.md) maps the files.

## License

Authored material uses the [MIT license](LICENSE). Adapted skills retain upstream copyright
notices inside their own directories. [NOTICE.md](NOTICE.md) records their sources and licenses.
