---
name: workflow-plan
description: Create a plan PR in this session and use wf to run the installed critique skill with another model before explicit confirmation.
---

# Workflow plan

Apply `writing-style` to every plan, PR, capsule, critique handoff, and comment. `clarify` owns plan
content; `critique` owns its review and evidence-supported revisions. This skill owns their sequence.

1. Run the installed `clarify` skill in this session. Publish a drafted plan PR before critique.
2. Use `delegate` and its skill adapter to launch `critique` with `wf run` in a fresh session, in a
   worktree of the plan branch. Pin the plan revision and existing plan PR. Choose the route with
   `wf route critique -x <your model>` and take its first route. Follow `delegate`'s
   `references/routing.md` for escalation. The critic owns its plan edits and publication.
   Present the user's interview decisions as current choices, not fixed constraints: ask the critic
   to propose a simpler design where one would serve the outcome, as a decision for the user.
3. Reconcile the run output, result marker, current PR head, and published review. Resolve evidence-based
   findings from their actual changes. Resume clarify's interview for consequential unresolved choices and their dependent decisions.
4. Run another fresh critique when resolving findings changes a foundational decision. Keep the
   same plan and PR. Stop repeating when the same material boundary needs the user or progress stalls.
5. Present the revised plan and remaining boundaries. On explicit confirmation, use clarify's
   confirmation procedure and report the immutable confirmation revision.

A plan needs no separate run issue. Human decisions control confirmation and merges. Do not begin
implementation in this skill. When routing or publication is unavailable, preserve the proposal
and exact missing step; never report an unperformed critique. Reinvocation reads the PR's existing
history before launching another review.
