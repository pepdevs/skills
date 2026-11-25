---
name: operations-review
description: Operations review of a running system. Reads a self-hosted server read-only over SSH, with the facts, units and thresholds its infrastructure checkout states, and records a status of findings: failed or late units and timers, stopped collectors and restarts, backup age and size, capacity per app, and app speed and errors. Use when a task asks to run the operations lead or for an operations review of a host.
---

# Operations review

You review a running system in a checkout of its infrastructure repository, usually headless with
nobody to answer. The task supplies the protocol: the notes directory, the last status and its
findings, the status file's shape, how to record it, and the runs to record. This skill says what
to measure and how to judge it.

The checkout states the system: read every host fact from it, and assume none. Evidence comes from
read-only commands on the hosts it names and from reading the checkout. Change nothing anywhere:
no `sudo`, no restart, no deploy, no Ansible apply, no file write on a host, no commit. Write
notes, command output and the status file to the notes directory.

Write every title and label with `writing-style`, Documentation register.

## Read the checkout

1. Read `AGENTS.md`, `SYSTEM.md`, `CONTEXT.md` and `README.md` at the root.
2. Read the inventory: the hosts with their SSH name and user, the group variables and the app
   stacks with their containers, ports, health paths and databases.
3. From `SYSTEM.md`, list the systemd units and timers the repository installs with their purpose
   and schedule, the backup jobs with their times and repositories, the alerting path, and every
   threshold it states, with the file and line that state it.
4. Use the app names the inventory gives. A finding about the host itself or about no single app
   names the app `host`.

## Allowed commands

Run these over SSH as the inventory's user, such as `ssh <host> '<command>'`, and nothing else on a
host:

- `systemctl status <unit>`, `systemctl show <unit> -p <properties>`, `systemctl list-timers --all`
  and `systemctl --failed`.
- `journalctl -u <unit> --since <time>` piped to a count, such as `grep -c` or `wc -l`. Read a
  unit's journal lines only for their timestamps and result words, and copy none into a finding.
- `df -h` and `df -B1` over the mounts the checkout names.
- `docker ps -a --format` and `docker stats --no-stream --format`.
- `curl -s -o /dev/null -w '%{http_code} %{time_total}'` against each app's health path and front
  door the inventory names.
- Reading a result file the checkout says the user may read without `sudo`.

On the control node, run `ansible-playbook playbooks/verify.yml` from the checkout when it has one:
the repository marks it read-only. Run no other playbook, and never `--check` with `site.yml`.

A command that asks for a password or fails with a permission error stays unrun: record the gap
as a finding with severity `warning` and go on.

## Measure

Measure every area on every run. Save each command's output to the notes directory. For each
finding, note the measurement, its command and the threshold it breaks.

### Schedules and failures

1. `systemctl --failed` and `systemctl list-timers --all`: a failed unit, and a timer whose last
   run is older than its schedule allows (one interval plus an hour) or that never ran.
2. For each unit the checkout installs, failures in the last 24 hours:
   `journalctl -u <unit> --since -24h | grep -c -E 'Failed|failed with result'`.
3. Containers: `docker ps -a` for each container an app stack names: one stopped or missing, or
   restarted in the last 24 hours (`docker inspect -f '{{.RestartCount}} {{.State.StartedAt}}'`).
4. Collectors: a collector unit or timer that the checkout marks enabled and that has not run
   within its schedule.

### Backups

1. Each backup job's last success and its age against the freshness threshold the checkout states,
   from `systemctl show <unit> -p ExecMainExitTimestamp,ExecMainStatus,Result` and the verify
   playbook.
2. Repository sizes and snapshot counts, when a monitoring API on the host reports them, and their
   trend over the last week.
3. The dead-man's-switch check the checkout names: whether its last run passed.

### Coverage and drills

Read the result files of the restore drill the checkout installs, at the paths its `SYSTEM.md` names.

1. Coverage: a result other than `covered`, each uncovered path and each database without a dump
   breaks. Name the app and count the paths and databases; copy no path inside an app's data.
2. Each drill kind, such as weekly and quarterly: a result `fail` breaks, with the app and the
   duration. A drill whose timer fired with no result since, or whose last result is older than
   its interval plus a day, is missing and breaks. A kind whose first scheduled time has not come
   yet is no finding.
3. Record one `ok` finding per drill kind that passed, with its age in days and the app it
   restored.

### Capacity

1. `df -B1` per mount: use and growth since the last status. A mount over 85 percent, or one whose
   last week's growth fills it within 30 days, breaks.
2. `docker stats --no-stream`: CPU and memory per app against its limit. An app over 90 percent of
   its memory limit breaks.

### Speed and errors

1. Each health path and front door: status code and time. A code other than 200, or a time over
   2 seconds, breaks.
2. HTTP error counts per app over 24 hours, where an app's logs or monitoring API report them, as a
   count only.

## Judge

Give each finding one severity:

- `broken`: a threshold the checkout states is crossed, a unit or timer failed, a backup is late,
  a container is down, or a health path fails.
- `warning`: within 10 percent of a threshold, a growth that crosses one within 30 days, or a
  command the run could not run.
- `ok`: an area measured and within every threshold. Record one `ok` finding per area and app you
  measured, so a fine status shows what it covered.

Compare with the last status in the task's context. Keep a problem's title the same from run to
run, so the operator and the next run see it as the same problem.

## Write the status

- `title`: what broke, in up to 120 characters: the unit, container, mount or path and what
  happened, such as "backup.service failed" or "Offsite snapshot is late".
- `values`: up to six numbers with their unit and an optional label: counts, hours, bytes,
  percentages, seconds.
- `source`: the command behind the measurement, shortened to 80 characters.

## Privacy

Every finding carries counts, durations, sizes, unit names and app names only.

- Copy no log line, row, file name inside an app's data, amount, merchant or person's name.
- Read no secret file and no environment file, and print no credential, token or push topic.
- Before recording, read the status file once more for any such value, and remove it.
