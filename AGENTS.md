# Agent rules

1. Keep each skill's resources and local links inside its directory, because installers copy skills independently. `node scripts/check.mjs` checks this. Revisit when installers resolve shared resources.
2. Declare companions in each skill's `skill-dependencies.json`, because deployment reads installed metadata. Declare external sources in `external-dependencies.json`. Revisit when installers resolve companions themselves.
3. Keep prose rules in `writing-style` and artifact structure in its owning skill, so each rule has one owner. Revisit when two artifacts need the same structure.
4. Keep applicable upstream notices inside adapted skill directories, because selected installation must preserve attribution. Revisit when an adaptation becomes an external dependency.
5. Keep publication thin: skills, required resources, consumer documentation, and one structural check. Migration and deployment tooling have separate owners. Revisit when a public consumer needs another repository tool.
6. Keep plan confirmation and merges with the user unless explicitly authorized, because publication does not establish consent. Revisit when the user delegates that authority.
7. Let artifact skills own publication, workflow skills compose them, and wf own fresh-session routing, so direct and delegated runs behave alike. Revisit when wf gains finer permission modes.
