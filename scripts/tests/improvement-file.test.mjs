import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { validateNewImprovement } from "../../skills/record-improvement/scripts/validate-new-improvement.mjs";

const root = fileURLToPath(new URL("../..", import.meta.url));
const template = await readFile(
  join(root, "skills/record-improvement/assets/improvement.md"),
  "utf8",
);

function populated() {
  return template
    .replace("{{IMPROVEMENT_ID}}", "4592b380-6638-470d-94f3-cda7aff2c1ab")
    .replace("{{CREATED_AT}}", "2026-09-21")
    .replace("{{PROPOSED_OUTCOME}}", "Use persisted sessions")
    .replace("{{PURPOSE}}", "Reduce duplicate local supervision storage.")
    .replace("{{CURRENT_APPROACH}}", "The journal retains normalized events.")
    .replace("{{CURRENT_ADVANTAGE}}", "Recovery reads one complete snapshot.")
    .replace("{{CURRENT_COST}}", "Every snapshot repeats prior events.")
    .replace(
      "{{OBSERVED_EVIDENCE}}",
      "A measured attempt retained 2,333 events.",
    )
    .replace("{{PROPOSED_APPROACH}}", "Retain one durable provider cursor.")
    .replace(
      "{{PROPOSED_ADVANTAGE}}",
      "Snapshot size follows supervisor state.",
    )
    .replace(
      "{{PROPOSED_COST_OR_RISK}}",
      "Provider readers need incremental cursors.",
    )
    .replace("{{FIRST_DELIVERY_STEP}}", "Add one cursor contract.")
    .replace(
      "{{OBSERVABLE_ACCEPTANCE_CRITERION}}",
      "A resumed reader emits no duplicate record.",
    );
}

test("accepts a populated improvement proposal", () => {
  assert.deepEqual(
    validateNewImprovement("0001-persisted-sessions.md", populated()),
    [],
  );
});

test("rejects malformed identity, missing sections, and template fields", () => {
  const invalid = template
    .replace("{{IMPROVEMENT_ID}}", "not-a-uuid")
    .replace("## Acceptance criteria", "## Done");
  const errors = validateNewImprovement("persisted_sessions.md", invalid);
  assert.ok(errors.some((error) => error.startsWith("filename must")));
  assert.ok(errors.some((error) => error.startsWith("improvement_id must")));
  assert.ok(errors.some((error) => error.startsWith("## Acceptance criteria")));
  assert.ok(errors.includes("template placeholders must be replaced"));
});
