---
name: security-review
description: Security review of one repository, one area per run in rotation. Reads the repository's security runbook and reviews application code, secrets and privacy, dependencies and supply chain, or exposure of the running system, judges each candidate by the trust boundary it crosses, files a proposal for each confirmed finding with its affected resource and smallest fix, and keeps the repository's runbook current through proposals. Use when a task asks to run the security lead or for a security review of a repository.
---

# Security review

You review one repository in a checkout of it, usually headless with nobody to answer. The task
supplies the protocol: the area of this run, the notes directory, the past decisions with their
reasons, the open proposals, how to file a proposal with its figure, and how to record the run.
This skill says what each area covers and how to judge a finding. The runbook says how this
repository is measured.

Use the `security-audit` skill in guidance mode for its method: trust boundaries, attack classes,
validation and reporting. Do not run its full audit workflow, and write none of its output files.

The repository is the boundary. Evidence comes from its files, its history and the read-only
checks its runbook lists. Change no code, setting or host, commit nothing and open no pull
request. Write notes and figures to the notes directory.

Run target code only under the `security-audit` skill's execution safety rules: an OS-enforced
sandbox with no external network, an empty environment, a read-only target, and low limits. When
the sandbox cannot be enforced, run nothing and note the check as unrun. Probe no deployed
endpoint, external service or other person's data. Use invented principals and secrets.

Write every title and label with `writing-style`, Documentation register.

## Read the repository

1. Read `AGENTS.md`, `SYSTEM.md`, `CONTEXT.md` and `README.md` at the root.
2. Read the security runbook, `docs/runbooks/security.md`. It names the repository's routes, its
   trust boundaries, where secrets live, who may call what, and the read-only checks for each area.
3. List the principals (people, other apps, anyone who can reach the network), the resources they
   can reach, and each point where input enters. Use the terms `CONTEXT.md` defines.

When the repository has no security runbook, review the area from what the documents state, say
so in the record, and file the runbook proposal in [Keep the runbook](#keep-the-runbook).

## Area of this run

The task names one area. Review only that area in this run: the rotation reaches the others in
later runs. Read the last decisions first. A kept proposal's reason asks for more of its kind; a
dropped one rejects a kind of finding.

### Application code

Authentication and authorization on every route, write protection against requests from another
site, input validation at each entry point, path and file handling, injection into queries,
commands and templates, output that reaches a browser, error text that leaks, and the limits that
stop a request from exhausting the service.

A candidate: a route that changes state without the repository's write protection, a route that
answers without the authentication its siblings require, input that reaches a path, query,
command or markup unchecked, or a response that carries a record the caller may not read.

### Secrets and privacy

Credentials, tokens and keys in the tree, in the history and in the files the repository ignores
or generates; logs and error output; test fixtures and golden files that hold real private data
instead of invented data; and prompts or records the repository stores that its documents say must
stay out of Git.

- Search the whole history, not only the current tree. A secret removed from the tree is still a
  secret.
- A real value is a finding at once. Name the file and line or the commit, never the value.

A candidate: a credential that grants access to a resource, or a real person's record in a file
the repository publishes or keeps in Git.

### Dependencies and supply chain

Known advisories in every lockfile, a direct dependency with a fix available, a dependency from a
source other than the registry, a missing or stale lockfile, install steps that run code from a
package, and hosted workflow steps that use an action, image or script by a moving name instead of
an exact revision, with the permissions each workflow requests.

- An advisory is a finding only when the vulnerable code is reachable from a principal's input in
  this repository. Say which entry point reaches it. An advisory with no reachable path is a note.
- Outdated packages without an advisory belong to the Engineering lead.

A candidate: a reachable advisory with a fix, a workflow that runs with write permission on input
from outside the repository, or a build step that fetches and runs an unpinned script.

### Exposure

What the running system offers to a network: listening ports, which interfaces they bind, which
apps answer without authentication, what is reachable from the public internet and what only from
the private network, container privileges and mounted host paths, and which services run as a
privileged user. Read each from the runbook's read-only listings. Never connect to a service to
test it beyond a plain listing.

A candidate: a port or route reachable by a principal who should not reach it, an app that answers
a write without authentication, or a container with privileges its job does not need.

## Judge a finding

A finding is confirmed only when it states all of:

1. **Trust boundary**: the line the finding crosses, from which principal to which resource.
2. **Affected resource**: the concrete record, file, credential, route or host a named principal
   gains or loses.
3. **Location**: the file and line, or the listing and its row.
4. **Evidence**: what the code or the listing shows, from the repository or a read-only check.
5. **Smallest fix**: the least change that closes it, and where it goes.

A candidate without a concrete affected principal or resource stays out. A weakness that needs
another defect, a theoretical class with no path in this repository, and a style or hardening
preference are notes in the record, never proposals.

Rate each confirmed finding:

- **critical**: exploitable now by a principal who holds no credential the repository gives them,
  and it exposes private records, credentials or control of a host.
- **high**: exploitable now by a principal with an ordinary credential, or critical but needing
  one more step the repository's own use makes likely.
- **medium**: exploitable only with access the operator already grants, or exposing no private
  record.
- **low**: a defect with no exploit path today.

File medium and low findings only while the inbox has room after the higher ones. A finding
already filed, open or decided, gets no second proposal unless its measurement changed.

## Disclosure stays private

Anyone with access to the private network reads the proposal. Write what and where, and give no
step an outsider could replay.

- The title and the description name the boundary, the resource and the location, and the fix. They
  hold no request, payload, command, credential, token or sequence that reproduces the problem.
- The figure shows the location and the boundary, such as a route table with the route marked, a
  file view with the line marked, or a listing row. It carries no payload and no value.
- Write the reproduction, the evidence you ran, and any value you saw, to the private notes file the
  task names, and only there. The build that fixes the finding reads that file. Name the file's
  path in the proposal's last line.

## Critical findings

A critical finding exploitable now reaches the operator at once. File its proposal first. The task
says how to raise the alert; raise it once per proposal.

## Keep the runbook

The runbook is yours to keep current. File a proposal against `docs/runbooks/security.md`, within
the task's room for the repository, when:

- a check fails to run, or its command no longer matches the repository;
- a check has no threshold;
- a route, boundary, secret location, workflow or listening port has no entry.

The proposal names the entry, the evidence and the entry's new text: what it measures, the
read-only command, its threshold and the source of any cost.

When the repository has no security runbook, file one proposal that drafts it from the
repository's own documents: the principals and boundaries, the routes with their protection, the
secret locations, and one entry per area with what it measures, a read-only command the
repository supports, its threshold and cost source. Point at the document that already owns a
command instead of copying it.

## Write the proposal

Give each proposal a title that names the boundary and the resource. Write the description in
Markdown with these sections:

- `## Finding`: the area, the severity, the boundary crossed and the resource affected.
- `## Evidence`: one line per fact with its source: file and line, commit, listing row.
- `## Smallest fix`: the files to change and the change, in words.
- `## Outcome`: what holds once the fix lands, as a check the operator can run.
- `## Private notes`: the path of the notes file, as the last line.

## Figure

Draw one figure per proposal, so the operator sees where the problem is.

1. Choose the form that fits: a route or boundary table with the finding's row marked, a file
   view with the line marked, or a listing row. Boxes and arrows are the last resort.
2. Draw it self-contained, with no request to another address. Labels, values and axis names
   only, with no title, caption or explaining sentence.
3. Render it and look at the image. Fix clipped or overlapping text and empty areas.

## Publish the page

When the task names an idea page, publish each proposal as its idea's page, with its figure first. The
Why states the boundary and the resource, the increments state the smallest fix in build order with
each review gate, and the questions hold the choices the operator still owns. Follow the page
contract the task gives, and keep what the proposal keeps out of its text out of the page. The
operator answers on the page and confirms it, and a build then reads it. The privacy rules below
hold for the page.

## Privacy

Every proposal and figure carries evidence from the repository and its checks only.

- Read no data file the repository ignores, except to search it for a secret, and then report its
  path, never a value.
- Copy no amount, name, record or secret into a proposal, a figure or the run's record.
- Before filing, read the description and the figure once more for any such value, and remove it.
