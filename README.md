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

[skill-dependencies.json](skill-dependencies.json) is the companion map. Install companions
recursively alongside the selected skill. The map includes conditional companions, such as
`gh-stack` for stacked work, so the complete composition can execute every documented branch.
The Skills CLI installs the skills you select; it does not resolve this companion map.
Each installed skill carries a matching `skill-dependencies.json` for deployment preflight.

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

Skill helpers use Node.js 22 or newer. Repository checks also need Python 3.10 or newer.
`retain` asks for the user's vault and follows its templates. Ticket publication uses the active
tracker integration; browser verification uses an available browser harness.
These integrations and their authentication belong to the consumer's environment.

## Check and maintain

The checks run offline and need no private repository or service credentials:

```bash
bash scripts/check.sh
```

On Windows, use `pwsh -File scripts/check.ps1` with `python` and `node` on `PATH`.
The check validates approved files, scans their complete text for personal paths, credential signatures, and private network hosts,
verifies portable skill links and companion declarations, and runs the existing
protocol, adapter, and palette fixtures. An optional external `--denylist` JSON array adds private literal terms during export review.
Keep that file outside the public tree. Heuristic scanning supplements review; it cannot prove
that arbitrary prose contains no confidential fact.

For optional token-size reporting, `uv run scripts/skill-size.py` installs `tiktoken` from the
script's dependency metadata. Run `uv run scripts/skill-size.py --help` for file selection.
See [docs/use-cases.md](docs/use-cases.md) for the checks' consumer paths and the reviewed export
procedure. [AGENTS.md](AGENTS.md) defines editing rules; [SYSTEM.md](SYSTEM.md) maps the files.

## License

Authored material uses the [MIT license](LICENSE). Adapted skills retain upstream copyright
notices inside their own directories. [NOTICE.md](NOTICE.md) records their sources and licenses.
