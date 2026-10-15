# Writing a ticket

A ticket states one problem and the observable outcomes that define done. It leaves room for the
team to choose the implementation.

## Structure

Value, context, and acceptance criteria form the contract. Include optional sections only when
they help the next decision. Put acceptance criteria last because reviewers look for them there.
Name a starting point and the pre-change evidence when a fresh implementer could not find them
from the linked source. Explain what each blocker supplies; a bare ticket number is not enough.

```markdown
**Value:** <who> can <benefit>.

## Context

<what happens now, why it is a problem, and the evidence>

## Suggested approach

<optional and explicitly non-binding implementation guidance>

## References

- [<descriptive label>](<url>)

## Acceptance criteria

- <observable outcome>
- <boundary or negative case that proves the guard remains>
```

Map this structure into the active tracker's template or fields. Keep one canonical copy of each
fact instead of repeating a template heading in the body.

## State the value in one line

Name the beneficiary and benefit. The value line does not restate the title or describe the
solution.

| Instead of | Write |
|---|---|
| Add retry logic to the HTTP client | Customers can complete a booking when one downstream call fails briefly |
| Fix the compliance workflow | Automated dependency updates pass compliance without a weekly manual override |

If the value cannot be stated, surface that uncertainty. Do not invent a beneficiary to complete
the template.

## Write acceptance criteria as outcomes

Each criterion states something a reviewer can observe without reading the source diff. Prefer
behaviour, state, and effect over files, functions, commands, and build artifacts.

Apply both tests to every criterion:

1. **Substitution test.** A different implementation that produces the same outcome leaves the
   criterion correct.
2. **Verification test.** A reviewer can confirm the result through system behaviour, state, a
   log, a metric, or a UI without inspecting the source diff.

A criterion that fails either test needs a rewrite.

| Instead of | Write |
|---|---|
| `index.js` checks the pull-request author | Automated dependency pull requests pass the compliance check |
| `dist/index.js` is rebuilt | Every repository consuming the shared workflow receives the change |
| A unit test is added to `utils.test.js` | A human pull request that mimics the bot message still fails compliance |
| Add a `retry` parameter to `HttpClient` | A transient network failure does not surface as a user-visible error |
| Create the `orders_archive` table | Orders older than 90 days stay out of default search results |

The rewrite preserves the behavioural guarantee. If removing the implementation detail leaves no
guarantee, the original line was a task step rather than an acceptance criterion.

### Keep each criterion sharp

- State one observable outcome per criterion.
- Use present tense to describe the world after the change.
- Include the negative or boundary case that proves an existing guard remains.
- Keep effort, sequencing, review, and process steps outside the acceptance criteria.
- Name a required interface or integration through the externally observable result it must keep.

## Express constraints through verification

A binding constraint belongs in acceptance criteria when a reviewer can verify it. Keep
unverifiable background in Context instead of presenting it as a contract.

| Assertion | Observable criterion |
|---|---|
| The public API must not change | Existing version 1 clients continue to work unchanged |
| Personal data stays in the EU | Customer records are readable only from EU regions |
| No new dependencies | The service builds with no additions to the lockfile |
| Use the vendor package | The catalog serves the vendor package from the vendor endpoint |

Do not duplicate the same requirement in separate Constraints and Acceptance criteria sections.
Two copies drift.

## Keep implementation as guidance

A suggested approach can preserve useful implementation thinking without binding the contract.
Label it as a suggestion. An unlabeled solution section reads as the specification even when the
acceptance criteria say otherwise.

Move incidental implementation detail into Context, Suggested approach, or a comment. Preserve a
named implementation detail when it is the real deliverable, such as a public API or required
integration point.

## Split before the ticket becomes a project

A ticket should have one independently valuable outcome and a reviewable contract. Rough signals
that it needs a split are more than about 150 words of description or more than seven acceptance
criteria. Dependencies between the resulting tickets are better than one ticket with several
release paths.

Cut preamble, title restatements, and references to conversations the future reader cannot see.

## Edit an existing ticket safely

Changing acceptance criteria changes what done means.

1. Read the current description and comments before proposing a replacement.
2. Preserve the reporter's intent. Ask whether a suspicious implementation detail is incidental
   or the actual requirement when the evidence does not decide it.
3. Show a material contract change before applying it unless the user explicitly supplied and
   authorized the exact change.
4. Record the reason in a comment when the contract changes, then keep the new contract in the
   description.

## Checklist

- [ ] The value line names a beneficiary and benefit.
- [ ] The ticket contains one independently valuable outcome.
- [ ] Every criterion passes the substitution and verification tests.
- [ ] Each criterion asserts one outcome.
- [ ] Boundary and negative cases cover the important guards.
- [ ] Implementation guidance is labeled and remains non-binding.
- [ ] The description holds the current contract.
- [ ] Every cited artifact has a descriptive, verified link.
