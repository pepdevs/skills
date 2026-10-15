# Document architecture

Where a piece of a document lives, what sits beside it, and when a document splits. This bears on
any register. It bears hardest on a document an agent executes, where everything in context costs
tokens and attention on every turn.

## Context pointers

`SKILL.md` defines the **pointer** and the **branch** under `### When a model executes it`, and
holds the rules for wording them. Placement is the question here. A pointer does two jobs: it
states what the material is, and it lists the branches that should trigger reaching it. A
must-have target behind a weakly worded pointer is a variance bug, so sharpen the wording first,
and inline the material only if sharpening fails. Every word of an always-loaded pointer costs on
every turn, so it earns harder pruning than the body.

## The two loads

Every document and pointer you add spends one of two budgets:

- **Context load** is the cost of always-loaded material on the agent's window: an `AGENTS.md`
  line, a skill description, anything sitting in context every turn, spending tokens and
  attention whether or not it fires.
- **Cognitive load** is the cost on the human: which documents exist and when to reach for each.
  The human is the index. Cognitive load is the price of human agency, so spend it where human
  judgement matters and remove it where it does not.

Material reached only through a pointer escapes context load at the price of the pointer's own
line. Material with no pointer at all rides entirely on cognitive load.

## Information hierarchy

A document mixes **steps** (ordered actions the agent performs) and **reference** (definitions
and rules consulted on demand): all steps, all reference, or both. The **information hierarchy**
ranks where each piece sits by how immediately the agent needs it:

1. **In-file step**, what the agent does, in order.
2. **In-file reference**, consulted on demand. A flat peer-set, such as every rule of a review on
   one rung, is a fine arrangement.
3. **Disclosed reference**, a separate file reached by a context pointer, loaded only when the
   pointer fires.

Push too little down and the top bloats. Push too much and you hide material the agent needs.
That tension is the whole decision.

**Progressive disclosure** is the move down the ladder. Branching is the cleanest test: inline
what every branch needs, and push behind a pointer what only some branches reach. In a document
with steps, undisclosed reference buries them and turns attending to them into a coin flip.

**Co-location** decides what sits beside a piece once the ladder has placed it. Keep a concept's
definition, rules, and caveats under one heading, so reading one part brings its neighbours with
it.

## Splitting

**Sprawl** is the failure mode: a document too long even when every line is live and unique. The
cure is the ladder, plus splitting, which spends one of the two loads and has to earn the cut.

- **By sequence.** Split a run of steps where the later ones tempt the agent to rush the one in
  front of it. A criterion that stays irreducibly fuzzy after you sharpen it, plus an observed
  rush, is the case that justifies hiding the later steps. Hiding works only across a real
  context boundary, such as a hand-off or a subagent dispatch, because an inline call clears
  nothing. Merging does the reverse.
- **By invocation.** Split off a model-invoked skill when you have a distinct leading word that
  should trigger it on its own, meaning a trigger word you actually use in your prompts, or when
  another skill must reach it. You pay context load for the new always-loaded description, so
  that independent reach has to be worth it.

## Skill invocation

Two choices, trading the two loads:

- A **model-invoked** skill keeps a `description`, so the agent can fire it autonomously and
  other skills can reach it. You can still type its name, because model-invocation includes user
  reach. The description is the skill's top-level context pointer, forced to stay loaded at all
  times: permanent context load in exchange for discoverability. A model-invoked skill whose
  content is all reference is also one home for shared reference, since another skill can invoke
  it. Mechanics: omit `disable-model-invocation`, and write a model-facing description carrying
  the trigger branches.
- A **user-invoked** skill strips the description from the agent's reach, so only the human
  typing its name can invoke it, and no other skill can. Zero context load, and it spends
  cognitive load, because you are the index that must remember it exists. Mechanics: set
  `disable-model-invocation: true`, and the `description` becomes human-facing, a one-line
  summary with trigger lists stripped.

Pick model-invocation when the agent must reach the skill on its own, or another skill must. A
skill that only ever fires by hand is user-invoked and pays no context load.

Shared reference that two user-invoked skills both need can live in neither, since with no
descriptions neither can fire the other. Push it to a plain file outside the skill system, as
external reference any skill can point at.

## Router skills

When user-invoked skills multiply past what you can remember, that piled-up cognitive load is
cured by a router skill: one user-invoked skill that names the others and when to reach for each,
so the human has one skill to remember instead of many. It can only hint, never fire them,
because user-invoked skills have no description and nothing but the human can reach them.
