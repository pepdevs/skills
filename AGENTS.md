# Agent rules

`SYSTEM.md` maps this source repository. `project` defines document ownership; `writing-style`
owns prose inside each artifact.

1. Keep skill resources and local links inside their own directory, because installers copy skills independently. `scripts/check.sh` checks this. Revisit when the installer resolves shared resources.
2. Keep prose rules in `writing-style` and artifact structure in its owning skill, so each rule has one owner. Revisit when two artifact skills need the same structure.
3. Declare companions in `skill-dependencies.json` and keep installed metadata equal, because dependencies can come from another source. `scripts/check.sh` checks this. Revisit when the installer resolves companion metadata itself.
4. Add public files to `export-allowlist.json` after reviewing their full contents, because the publication boundary is explicit. `scripts/check.sh` checks it. Revisit when another reviewed publication mechanism replaces the export.
5. Keep upstream notices inside adapted skill directories, because selected installation must preserve attribution. Revisit when a dependency becomes an external skill.
6. Keep plan confirmation and merges with the user: a drafted or merged plan does not authorize implementation. Revisit when the user explicitly delegates that authority.
7. Let `clarify`, `critique`, `to-outcomes`, `implement`, and `evaluate` own publication; workflow skills compose them and `wf` owns fresh-session routing. Revisit when `wf` gains finer permission modes.
8. Record rules here with their reason and revisit condition; keep a longer argument in its plan, so git preserves the history without a separate decision-record directory.
