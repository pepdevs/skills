import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parsePlan } from '../../skills/clarify/scripts/validate-plan.mjs';
const plan = (status = 'drafted', date = 'null', replacement = 'null', body = '# Chosen behavior\n\nA bounded result and observable acceptance.') =>
    `---\nplan_schema: 1\nplan_id: "00000000-0000-4000-8000-000000000001"\nstatus: ${status}\nconfirmed_at: ${date}\nsuperseded_by: ${replacement}\n---\n${body}\n`;
test('drafted and explicitly confirmed metadata validate with flexible prose', () => {
    assert.equal(parsePlan(plan()).status, 'drafted');
    assert.equal(parsePlan(plan('confirmed', '2026-09-23', 'null', 'A plan with no prescribed headings.')).status, 'confirmed');
});
test('confirmation and supersession require consistent identity and dates', () => {
    assert.throws(() => parsePlan(plan('drafted', '2026-09-23')), /cannot be confirmed/);
    assert.throws(() => parsePlan(plan('confirmed')), /date/);
    assert.throws(() => parsePlan(plan('confirmed', '2026-02-30')), /date/);
    assert.throws(() => parsePlan(plan('superseded', '2026-09-23')), /replacement/);
    assert.equal(parsePlan(plan('superseded', '2026-09-23', '00000000-0000-4000-8000-000000000002')).status, 'superseded');
    assert.throws(() => parsePlan(plan().replace('status: drafted', 'status: drafted\nstatus: confirmed')), /duplicate/);
});
test('an implemented plan records its date and keeps any confirmation', () => {
    const done = (confirmed, implemented) => plan('implemented', confirmed).replace('superseded_by', `implemented_at: ${implemented}\nsuperseded_by`);
    assert.equal(parsePlan(done('2026-09-23', '2026-09-27')).status, 'implemented');
    assert.equal(parsePlan(done('null', '2026-09-27')).status, 'implemented');
    assert.throws(() => parsePlan(done('2026-09-23', 'null')), /implemented plan/);
    assert.throws(() => parsePlan(plan('confirmed', '2026-09-23').replace('superseded_by', 'implemented_at: 2026-09-27\nsuperseded_by')), /only an implemented/);
});
