#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isoDate(date, message) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') || new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date) throw new Error(message);
}

/** The text of the `## Open questions` section, or null when the plan has none. */
function openQuestions(text) {
    const lines = text.split(/\r?\n/);
    const start = lines.findIndex((line) => /^##\s+open questions\s*$/i.test(line));
    if (start < 0) return null;
    const end = lines.findIndex((line, index) => index > start && /^##\s/.test(line));
    return lines.slice(start + 1, end < 0 ? undefined : end);
}

/** The longest option label, so a question's options read as a short list. */
const LABEL_MAX = 40;

/** Every `###` question under Open questions needs two options, one of them recommended, and an image per option when it changes the design. */
function checkQuestions(text) {
    const lines = openQuestions(text);
    if (!lines) return;
    const questions = [];
    for (const line of lines) {
        const heading = line.match(/^###\s+(.+?)\s*$/);
        if (heading) questions.push({ title: heading[1], options: [], design: false });
        else if (questions.length && /^changes the design\.\s*$/i.test(line.trim())) questions.at(-1).design = true;
        else if (questions.length && /^(?:[-*]|\d+\.)\s+\S/.test(line)) questions.at(-1).options.push(line);
    }
    for (const { title, options, design } of questions) {
        for (const option of options) {
            const label = option.replace(/^(?:[-*]|\d+\.)\s+/, '').replace(/`[^`]+`\s*$/, '').replace(/\(recommended\)/i, '').trim();
            if (label.length > LABEL_MAX) throw new Error(`option "${label}" of question "${title}" is ${label.length} characters; keep it to ${LABEL_MAX}`);
        }
        const recommended = options.filter((option) => /\(recommended\)/i.test(option)).length;
        if (options.length < 2) throw new Error(`question "${title}" needs at least two options`);
        if (recommended !== 1) throw new Error(`question "${title}" needs exactly one (recommended) option, found ${recommended}`);
        const bare = options.filter((option) => !/`[^`]+\.(?:png|jpe?g|webp|svg)`\s*$/i.test(option)).length;
        if (design && bare) throw new Error(`question "${title}" changes the design, so each option needs an image; ${bare} name none`);
    }
}

export function parsePlan(body) {
    const match = body.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    if (!match) throw new Error('plan requires YAML front matter');
    const fields = new Map();
    for (const line of match[1].split(/\r?\n/)) {
        if (!line.trim() || line.trim().startsWith('#')) continue;
        const entry = line.match(/^([a-z_]+):\s*(.*?)\s*$/);
        if (!entry) throw new Error('plan metadata must use scalar fields');
        if (fields.has(entry[1])) throw new Error(`duplicate plan field: ${entry[1]}`);
        const raw = entry[2];
        const value = /^(".*"|'.*')$/.test(raw) ? raw.slice(1, -1) : raw;
        fields.set(entry[1], value === 'null' ? null : value);
    }
    const plan = Object.fromEntries(fields);
    if (plan.plan_schema !== '1' || !uuid.test(plan.plan_id ?? '')) throw new Error('invalid plan identity');
    if (!['drafted', 'confirmed', 'superseded', 'implemented'].includes(plan.status)) throw new Error('invalid plan status');
    if (plan.status === 'implemented') {
        // Work can land before confirmation, so an implemented plan keeps whatever confirmation it had.
        if (plan.confirmed_at !== null) isoDate(plan.confirmed_at, 'confirmed plan needs a valid ISO date');
        isoDate(plan.implemented_at, 'implemented plan needs a valid ISO date');
        if (plan.superseded_by !== null) throw new Error('implemented plan cannot name a replacement');
    } else if ((plan.implemented_at ?? null) !== null) {
        throw new Error('only an implemented plan has an implementation date');
    } else if (plan.status === 'drafted') {
        if (plan.confirmed_at !== null || plan.superseded_by !== null) throw new Error('drafted plan cannot be confirmed or superseded');
    } else {
        isoDate(plan.confirmed_at, 'confirmed plan needs a valid ISO date');
        if (plan.status === 'confirmed' && plan.superseded_by !== null) throw new Error('confirmed plan cannot name a replacement');
        if (plan.status === 'superseded' && (!uuid.test(plan.superseded_by ?? '') || plan.superseded_by === plan.plan_id)) {
            throw new Error('superseded plan needs a distinct replacement UUID');
        }
    }
    const text = body.slice(match[0].length);
    if (!text.trim()) throw new Error('plan needs an explanation');
    checkQuestions(text);
    return plan;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        if (process.argv.length !== 3) throw new Error('usage: validate-plan.mjs <plan-file>');
        console.log(JSON.stringify(parsePlan(readFileSync(process.argv[2], 'utf8'))));
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
