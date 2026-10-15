---
name: retain
description: Retain durable, evidence-backed learning from the completed session as atomic Obsidian notes.
disable-model-invocation: true
---

# Retain

Turn session evidence into a small number of evergreen Obsidian notes that improve the user's
future judgment and recall. The unit is one durable concept, not one session.

This skill owns extraction, routing, deduplication, and Obsidian storage. `writing-style` owns the
prose. `project` records shared project knowledge instead of the user's learning.

## Resolve the vault

1. Use the Obsidian vault root supplied by the user or active instructions.
2. Read the vault's `README.md` and the relevant template before choosing a folder, frontmatter,
   or filename.
3. Search only that vault. Do not inspect another vault or unrelated notes.
4. If the vault is unavailable or no root is known, return the candidate notes and ask for the
   vault path. Do not save them to the working directory without approval.

The vault's conventions override the fallback format below.

## Reconstruct what the session established

Review the conversation and tool results with the final state taking priority over early guesses.
Separate the material into:

- **Verified.** Demonstrated by code, documentation, a command, a test, or direct observation.
- **Reasoned.** Supported by named evidence but not directly demonstrated.
- **Open.** Suggested, assumed, or left unresolved.

Verified and reasoned material can support a learning note. Open material stays out unless the
useful lesson is the uncertainty boundary and the note states what evidence would resolve it.

Remove secrets, credentials, personal data, confidential raw output, and lengthy logs. Keep only
the minimum evidence needed to trust and recover the lesson.

## Find candidate learnings

Look for a concept that changes a future decision, diagnosis, implementation, or agent workflow:

- a mental model that made a trade-off easier to reason about;
- a debugging or testing technique with a demonstrated mechanism;
- a tool, platform, or library behaviour that was surprising and reusable;
- a failed approach whose cause reveals a boundary or better method;
- an AI collaboration technique supported by what happened in the session;
- a convention likely to matter across future work.

Drop activity, chronology, changed-file lists, command lists, generic advice, praise, and one-off
facts with no future decision value.

## Route before writing

Classify every candidate:

- **Learn.** The user should understand and retrieve the concept later. Store it as a learning
  note.
- **Encode.** A recurring correction can be enforced by a type, test, lint rule, metadata field,
  script, helper, or skill. Propose that structural follow-up separately. Store only the durable
  reasoning when it also helps the user learn.
- **Drop.** The item is unsupported, temporary, generic, sensitive, or already captured.

A note is not a substitute for a stronger mechanism. Do not edit code, skills, or trackers merely
because this routing step found an Encode candidate.

## Apply the learning gate

Keep a Learn candidate only when every answer is yes:

1. **Durable.** Will it matter beyond this session?
2. **Supported.** Can the claim be traced to session evidence?
3. **Actionable.** Can it change a future decision or practice?
4. **Standalone.** Can it teach someone who did not see the session?
5. **Retrievable.** Does it have a concept-focused name and a useful recall cue?
6. **Non-duplicative.** Does it add a new mechanism, boundary, example, or application to the
   vault?

Capture zero to three notes. Zero is the correct result when nothing passes.

## Search the vault

For each candidate, search the vault for its proposed title and two to four distinctive terms.
Exclude templates, generated indexes, and trash.

- Update an existing note when it already owns the concept. Add only the new evidence, boundary,
  or application.
- Create a note when the concept has no owner.
- Link closely related notes instead of merging distinct concepts into one page.
- Skip a candidate that the vault already captures with no material refinement.

Preserve the author's wording and unrelated sections when updating a note.

## Write one concept per note

Use a concept-focused title. `HTTP errors as TLS evidence` names a reusable idea. `What we learned
while debugging TLS` names a session.

The note must establish:

1. **Claim.** State the lesson in one or two sentences.
2. **Mechanism.** Explain why it holds.
3. **Application.** Say when to use it and what action it changes.
4. **Boundary.** State when it does not apply or what remains uncertain.
5. **Evidence.** Cite the smallest useful file, command result, test, documentation source, PR, or
   concrete observation.
6. **Recall.** Ask one question that requires retrieving the mechanism, not repeating the title.
7. **Related.** Link up to five notes that help the reader compare or extend the concept.

Write concise sections that serve those jobs. Do not add empty sections.

## Fallback note format

Use this only when the vault has no applicable template or documented convention.

```markdown
---
type: learning
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
source: agent-session
repository: <repository-or-directory>
---

# <concept title>

<claim>

## Mechanism

<why the claim holds>

## Apply

<when to use it, the action it changes, and its boundary>

## Evidence

- <concise evidence reference>

## Recall

- <retrieval question>

## Related

- [[<related note>]]
```

Use `<concept title>.md` unless the vault defines another filename convention. When creating a
note, sanitize only characters the filesystem forbids. Human-readable filenames make Obsidian
links and search results useful. If the filename already owns another concept, sharpen the title
instead of appending a session identifier.

When updating an existing note, preserve its creation date and set its update date when the vault
uses one. Merge into equivalent sections instead of appending a second copy of the template.

## Check before saving

- Every note passes the learning gate.
- Every factual claim matches the session evidence and carries the right uncertainty.
- Each note contains one concept and one retrieval question.
- Existing notes receive a material refinement instead of duplicate prose.
- No secret, private transcript, placeholder, or lengthy log remains.
- The file path, frontmatter, and links follow the vault's conventions.

## Confirm the result

For saved notes, return each title and full path. Name any Encode candidate that deserves a
separate structural follow-up. For a skipped capture, state why no candidate passed or which
existing note already owns the learning.
