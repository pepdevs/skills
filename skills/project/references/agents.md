# Rules in AGENTS.md

`AGENTS.md` holds the rules for changing the code. Agents read it on every task, so each rule
carries the reason an agent needs to apply it well and the condition under which it stops holding.
A repository keeps no separate decision records: a rule without its reason gets obeyed blindly, and
a decision record without a revisit condition gets obeyed forever.

## Rule shape

One numbered item, at most two lines:

```markdown
3. Add no server, network upload, database or cache without a plan in `docs/plans/`: local reads
   take 12s for 700 sessions. Revisit when `npm run check:real` warns above 60s.
```

- **The rule** in the imperative, naming the paths or commands it governs.
- **The reason** in one clause: the constraint, measurement or incident behind it.
- **Revisit when**: the observable condition that reopens it. Leave it out only for a rule with no
  plausible condition, such as keeping secrets out of the repository.
- **The enforcement**, when a test or script checks the rule: name it, so a reader knows breaking
  the rule fails the check.

A longer argument, with alternatives and trade-offs, belongs in the plan that made the decision.
Link it from the rule when a reader needs it.

## Keep the list current

- A change that makes a rule false changes or deletes the rule in the same pull request.
- When a revisit condition holds, raise the rule with the user before working around it.
- Merge two rules that say the same thing. Delete a rule whose test enforces it and whose reason is
  obvious from the test's name.
- Keep `AGENTS.md` to the rules. The layout lives in `SYSTEM.md`, usage in `README.md`.

## Folding decision records

When a repository still has a decision-record directory:

1. Read every record, following supersession notes to the one in force.
2. For each decision still in force, write or update the `AGENTS.md` rule with its reason and
   revisit condition.
3. Move anything still true about structure into `SYSTEM.md`, and terms into `CONTEXT.md`.
4. Delete the directory and every link to it. Git keeps the records.
