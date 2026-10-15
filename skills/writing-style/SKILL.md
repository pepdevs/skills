---
name: writing-style
description: Writing rules per register. Use when writing documentation (README, SYSTEM.md, CONTEXT.md, plan, ticket, commit message, PR body, code comment), instructions (a skill, AGENTS.md, a prompt, a tool description, help text, a procedure), or correspondence (blog post, email, message to a person).
---

# Writing style

A register is a variety of written language chosen by how the reader consumes the text. Apply
`## Every register`, then the selected register, then `## Final editing pass`.

| Register | You are writing | Also apply |
|---|---|---|
| Documentation | README, `docs/`, `SYSTEM.md`, `CONTEXT.md`, plan, issue, ticket, vault note, commit message, PR body, code comment | `## Documentation` |
| Instructions | Help text, UI label, tip, procedure, skill, `AGENTS.md`, `CLAUDE.md`, prompt, tool description, hook script | `## Instructions` |
| Correspondence | Blog post, email, site text, message to a person | `## Correspondence` |

A document that explains something is Documentation, whoever reads it. Text that someone executes
is Instructions. Agent replies follow the always-loaded conversation instructions and have no
register here.

This skill owns prose. An artifact skill owns required sections, metadata, and operations for a
ticket, learning note, commit, pull request, or other specialized output. Apply both layers when
both descriptions match.

Read `document-architecture.md` when deciding what belongs in a file, behind a pointer, or in a
separate document.

## Every register

### State the content

- **Write the current state.** Leave out the process, conversation, and earlier versions. Name
  what a change replaces only when the reader needs that fact to act. A vault note is the
  exception because its sole reader needs the process and history.
- **Prompt the positive.** State the target behaviour. Keep a prohibition only when it guards a
  boundary that has no clear positive form, then put the target beside it.
- **State a thing by what it is.** Replace negative parallelism such as "not X, but Y" with a
  direct statement of Y.
- **Use stable terminology.** Read `CONTEXT.md` files and use their ubiquitous language. Repeat
  the established term instead of cycling through synonyms.
- **Prefer concrete, plain words.** Replace metaphors and formal synonyms with the mechanism,
  constraint, or familiar word.
- **Make claims project-specific.** When explaining behaviour or value, name the mechanism,
  constraint, number, or repository fact. Cut a generic claim that could fit another project
  unchanged.
- **Use real ranges.** Use "from X to Y" only when X and Y are endpoints on one scale. Otherwise,
  name the items directly.
- **Say the point straight.** Put the conclusion where the reader expects it. A paraprosdokian,
  or surprise twist, costs a re-read.
- **End on the last fact.** Cut recap sections, motivational language, generic optimism, and
  labels such as "insight" or "key takeaway."
- **Size a thing honestly.** Cut inflated significance, rule-of-three padding, and stock AI
  vocabulary.
- **Preserve supplied voice.** When the author supplies copy, fix grammar and repetition while
  keeping their words and tone.
- **Keep the structure parallel.** Align related clauses and list items. Vary sentence rhythm.

### Shape the sentences

- **Keep sentences navigable.** Split a sentence when its structure makes the reader backtrack.
  Long-form prose may carry more than one related idea when the relationship stays clear.
- **Keep short-form technical text controlled.** A commit message, code comment, UI label, help
  text, or procedure follows ASD-STE100: fewer than 20 words per sentence, active voice, present
  tense, one instruction per sentence, and one meaning per word.
- **Name the actor.** Replace a subjectless passive with the thing that acts. Keep a passive when
  the actor is unknown or irrelevant. Example: "It was decided that reply rules would be kept
  out" becomes "Reply rules live in `instructions/` because skill loading depends on the
  description."
- **Name the condition behind a hedge.** Replace stacked qualifiers with the event that creates
  the uncertainty. Example: "This may potentially cause drift in some cases" becomes "The copies
  drift when only one is edited." Keep a hedge over a genuine unknown.
- **Make modifiers earn their place.** Replace a weak verb and unsupported adverb with a stronger
  verb. Use a measured result when evidence supplies it. Otherwise, remove the unsupported
  modifier. Example: "The cache significantly improves performance" becomes "The cache cuts
  median latency by 18 ms" when the measurement establishes that result. Keep an adverb that
  changes the meaning.
- **Give analysis its missing fact.** Remove an `-ing` clause that decorates a claim, or replace it
  with the fact it implies. Example: "Deploy copies one file per system, ensuring consistency"
  becomes "Deploy copies one file per system. The copies are byte-identical, and `diff` catches
  drift."
- **Use fragments for emphasis once.** Join a row of dramatic fragments into a sentence with a
  real relationship. Example: "No warning. No pattern. Just noise." becomes "The numbers shifted
  without a warning or a pattern I could find."

### Cut on sight

Each guardrail names the replacement behaviour.

- **Filler openings.** Start at the fact instead of "It is important to note," "It is worth
  mentioning," "When it comes to," or "In order to."
- **Throat-clearing.** Lead with the next sentence instead of "First, let us look at," "Now for
  the interesting part," or "Here is how it works."
- **Vague authority.** Name the source or constraint behind "best practice is," "it is generally
  recommended," or "experts suggest." Drop the claim when no source exists.
- **Sales language.** State what the thing does instead of calling it "vibrant," "seamless,"
  "powerful," "robust," "nestled," or "breathtaking." A README follows this rule too.
- **Formulaic sayings.** Give the sentence a fact instead of "at the end of the day," "the reality
  is," "more than ever," or "in today's fast-moving world."
- **Fake candour.** Start with the candid sentence instead of "Let me be honest," "Here is the
  thing," or "I will be blunt."
- **Generic endings.** End on the last real sentence or the thing you want back.
- **Repeated labels.** The sentence after a heading or bold lead-in adds new information.

### Format the text

- **Use functional punctuation.** Use commas and full stops for ordinary sentence structure. Use
  colons for lists, examples, and definitions. Em dashes are out.
- **Use bold for definitions.** Bold marks a term the reader scans for and carries its definition.
  It does not add emphasis.
- **Use sentence case for headings.**
- **Use text labels instead of decorative emojis.**

## Documentation

Long-form documentation can use the sentence length its subject needs. An artifact workflow can
require a specific shape. These rules govern the prose inside that shape.

- **Let the environment hold known facts.** Treat `package.json` scripts, configuration,
  directory layout, and `--help` output as sources of truth. Document an existing lookup only
  when the lookup is expensive. Record the unwritten convention, reason, or gotcha instead.
  Example: replace "Run `npm run build` to build" with "`npm run build` writes to `dist/`, which
  deploy reads. Building twice without `npm run clean` leaves stale chunks."
- **Put rejected alternatives where the format records them.** Use a plan's principles or scope,
  or the reason clause of an `AGENTS.md` rule. Titles, openings, and summaries state what holds.
  Example: "Reply rules live in instructions" is the rule. Its rejected location belongs in the
  plan that chose it.
- **Describe current code in comments.** Put the old approach in the commit that removed it.
  Example: replace "Replaces the old O(n²) loop" with "Hash lookup keeps this O(1) per item."
- **Explain why in a commit body.** The diff already shows what changed. Record the constraint,
  conflict, or decision that made the change necessary.

## Instructions

An instruction is text that a person or model executes. Its measure is whether the reader takes
the intended path every run. Aim at the process and its observable result.

- **Give each step one action.** Split hidden actions into separate steps. Example: deploy, compare
  checksums, and restart are three steps.
- **End on a checkable criterion.** Let the criterion set the depth. Replace "review until you
  understand" with "account for every modified model, with its migration status beside it."
- **Name paths that resolve in the target.** A copied document loses checkout-only paths and
  relative links outside its directory. Keep rationale and citations in the target repository's
  docs. Keep the executable rule in the instruction.

### When a model executes the instruction

Model-facing instructions depend on four mechanisms: negation can read as permission, attention
favours the beginning and end, reliability drops with length, and surface form shifts behaviour.
Apply `Prompt the positive` most strongly because it has published evidence behind it.

- **Front-load the leading word in a pointer.** A pointer is a context-held reference that says
  when to load out-of-context material. Start it with the concept that should trigger retrieval.
  Example: "Charts: palette, axes, and legends. Read before writing chart code."
- **Give each branch one trigger.** A branch is a distinct case the instruction handles. Keep
  genuine surface forms that the model could miss. Remove synonyms that rename one branch.
  Example: "Use when reviewing a pull request" needs no review, inspect, audit, and check variants.
- **Use a pretrained leading word.** Choose a compact concept the model already knows. A coined
  word spends tokens on a definition before it can guide behaviour. "Tight loop" carries more
  pretrained meaning than "fast, deterministic, low-overhead loop."
- **Repeat the token, not its definition.** Reuse a leading term where it should guide behaviour.
  Define its meaning once. Example: "Build a tracer bullet first. Widen the tracer bullet one
  layer at a time."
- **Cut the no-op.** Keep an instruction only when it changes model behaviour from the default.
  Settle disagreement with a run. Delete a failed sentence instead of trimming it. Replace "Be
  thorough" with a criterion such as "Name every caller before renaming the function."

## Correspondence

Correspondence includes blog posts, emails, site text, and messages to a person. Length is fine.

- **Give a reference context.** A logo list or follower count proves nothing. State what someone
  said, where they said it, or the scale that makes the reference relevant.
- **Answer without reflexive agreement.** Drop flattery and agreement you do not mean.
- **Make warmth substantive.** Keep a real thank-you, apology, or opinion. Do not manufacture one.

## Final editing pass

Run this pass after drafting or revising text covered by this skill.

1. Confirm that the opening states what holds.
2. Replace unstable synonyms with the project's established terms.
3. Resolve each hedge to a named condition or genuine unknown.
4. Replace generic claims with a mechanism, constraint, number, or repository fact.
5. Check every range, modifier, heading, and closing sentence against the rules above.
6. Preserve the author's meaning and register after the cuts.

## Source

Some entries adapt [humanizer](https://github.com/aparente/claude-skills/blob/master/skills/humanizer/SKILL.md)
(MIT), a fork of `blader/humanizer`, which draws on
[Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing).
The range, modifier, terminology, project-specificity, and editing-pass rules also draw on
[Unslop](https://github.com/cursor/plugins/blob/main/pstack/skills/unslop/SKILL.md).

Licensing: [humanizer MIT notice](licenses/humanizer-MIT.txt) and [pstack MIT notice](licenses/pstack-MIT.txt).
