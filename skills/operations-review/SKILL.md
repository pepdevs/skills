---
name: operations-review
description: Operations review of a running system. Runs the read-only checks of the operations runbook in the system's infrastructure repository and judges them, records a status of findings on failed or late schedules, stopped collectors and restarts, backup age and size, coverage and restore drills, capacity per app, app speed and errors, and costs, and proposes each fix in the repository that owns it, the runbook included. Use when a task asks to run the operations lead or for an operations review of a host.
---

# Operations review

You review a running system from a checkout of its infrastructure repository, usually headless
with nobody to answer. The task supplies the protocol: the notes directory, the last status and
its findings, how to record a status, and the runs to record. This skill says what each area
covers and how to judge it. The runbook says how this system is measured.

The checkout states the system: read every host fact from it, and assume none. Evidence comes
from the runbook's read-only checks and from reading the checkout. Change nothing anywhere: no
privileged command, no restart, no deploy, no configuration apply, no file write on a host, no
commit. Write notes, check output and the status to the notes directory.

Write every title and label with `writing-style`, Documentation register.

## Read the checkout

1. Read `AGENTS.md`, `SYSTEM.md`, `CONTEXT.md` and `README.md` at the root.
2. Read the inventory: the hosts, the apps with their services, health paths and databases.
3. From `SYSTEM.md`, list the scheduled jobs the repository installs with their purpose and
   schedule, the backup jobs with their times and destinations, the alerting path, and every
   threshold it states, with the file and line that state it.
4. Use the app names the inventory gives. A finding about the host itself or about no single app
   names the app `host`.

## Runbook

The operations runbook, `docs/runbooks/operations.md` in this checkout, lists the checks for each
area: what each measures, its read-only command, its threshold and the source of any cost.

1. Read the runbook. Run every check it lists, and only those, from where it says to run them.
2. Save each check's output to the notes directory.
3. Judge each result by the area's rules below and the threshold the runbook or `SYSTEM.md`
   states.
4. A check that asks for a password, fails with a permission error or no longer runs stays
   unrun: record the gap as a `warning` finding and go on.

When the checkout has no operations runbook, measure nothing on the hosts: record one `warning`
finding that names the gap, and file the runbook proposal in [Keep the runbook](#keep-the-runbook).

## Areas

Measure every area on every run. For each finding, note the measurement, its check and the
threshold it breaks.

### Schedules and failures

- A failed job, and a scheduled job whose last run is older than its schedule allows or that
  never ran.
- Failures of each job the checkout installs in the last 24 hours.
- Each service an app names: one stopped or missing, or restarted in the last 24 hours.
- Collectors: a collector the checkout marks enabled that has not run within its schedule.

### Backups

- Each backup job's last success and its age against the freshness threshold the checkout states.
- Backup sizes and snapshot counts, when the host reports them, and their trend over the last
  week.
- The check that alerts when backups stop: whether its last run passed.

### Coverage and drills

- Coverage: a result other than covered, each uncovered path and each database without a dump
  breaks. Name the app and count the paths and databases; copy no path inside an app's data.
- Each drill kind: a failed result breaks, with the app and the duration. A drill whose schedule
  fired with no result since, or whose last result is older than its interval plus a day, is
  missing and breaks. A kind whose first scheduled time has not come yet is no finding.
- One `ok` finding per drill kind that passed, with its age in days and the app it restored.

### Capacity

- Use and growth per storage mount since the last status. A mount over its threshold, or one whose
  last week's growth fills it within 30 days, breaks.
- CPU and memory per app against its limit. An app over its memory threshold breaks.

### Costs

- Each paid service the runbook names, with its use this period from the cost source the runbook
  names: per repository and job for build minutes, in bytes for storage.
- A projection over a threshold the checkout states is a `costs` finding: `warning` over the
  first, `broken` over the last. Name the job or store that costs the most in its title.

### Speed and errors

- Each health path and front door: a status other than success, or a time over its threshold,
  breaks.
- Error counts per app in the last 24 hours, where its logs or monitoring report them, as a count
  only.

## Judge

Give each finding one severity:

- `broken`: a threshold the checkout states is crossed, a job failed, a backup is late, a service
  is down, or a health path fails.
- `warning`: within a tenth of a threshold, a growth that crosses one within 30 days, or a check
  the run could not run.
- `ok`: an area measured and within every threshold. Record one `ok` finding per area and app you
  measured, so a fine status shows what it covered.

Compare with the last status in the task's context. Keep a problem's title the same from run to
run, so the operator and the next run see it as the same problem.

## Propose fixes

A broken or warning finding whose fix is a change to a repository gets a proposal in the
repository that owns the change, when the task lists that repository. Pick the owner from the
checkouts' `SYSTEM.md` files:

- Host configuration, scheduled jobs, backups, drills and capacity limits: the infrastructure
  repository.
- An app's errors, speed, collectors and services: the app's repository.
- A build job's cost: the repository that holds the job.

Each proposal states the finding, its measurement and check, the change, and the expected saving
in minutes, bytes or failures. A cost proposal names the job and what it saves a month. Keep to
the task's room per repository, and file no problem that an open proposal or a decision in the
context already covers, unless its measurement has changed since. A problem without an owner the
task lists stays a finding.

## Keep the runbook

The runbook is yours to keep current. File a proposal against `docs/runbooks/operations.md`, in
the infrastructure repository and within its room, when:

- a check fails to run, or its command no longer matches the system;
- a check has no threshold, or its threshold disagrees with `SYSTEM.md`;
- an app, scheduled job, backup or paid service in the checkout has no check.

The proposal names the entry, the evidence and the entry's new text: what it measures, the
read-only command, its threshold and the source of any cost.

When the checkout has no operations runbook, file one proposal that drafts it from the checkout's
own documents: one entry per area above, each with what it measures, a read-only command the
documents support, its threshold and cost source, and each entry's source file.

## Write the status

- Title: what broke, by the job, service, mount or path and what happened, such as "Backup job
  failed" or "Offsite snapshot is late".
- Values: the numbers behind the finding, each with its unit and an optional label: counts, hours,
  bytes, percentages, seconds.
- Source: the check behind the measurement.

## Publish the page

When the task names an idea page, publish each fix proposal as its idea's page. The Why states the
finding with its measurement, the increments state the change in build order with each review gate,
and the questions hold the choices the operator still owns. Follow the page contract the task gives.
The operator answers on the page and confirms it, and a build then reads it. The privacy rules below
hold for the page.

## Privacy

Every finding carries counts, durations, sizes, job names and app names only.

- Copy no log line, row, file name inside an app's data, amount, merchant or person's name.
- Read no secret file and no environment file, and print no credential, token or alert topic.
- Before recording, read the status once more for any such value, and remove it.
