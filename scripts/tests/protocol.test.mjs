import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateRepository } from '../validate-protocol.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
function fixture(fn) {
    const directory = mkdtempSync(path.join(tmpdir(), 'skill-protocol-'));
    try {
        cpSync(path.join(root, 'skills'), path.join(directory, 'skills'), { recursive: true });
        for (const name of ['skill-dependencies.json', 'external-dependencies.json']) cpSync(path.join(root, name), path.join(directory, name));
        fn(directory);
    }
    finally { rmSync(directory, { recursive: true, force: true }); }
}
test('repository resources and skill dependencies resolve', () => assert.deepEqual(validateRepository(root), []));
test('alternative human headings and paragraph organization remain valid', () => fixture((directory) => {
    const file = path.join(directory, 'skills/implement/SKILL.md');
    writeFileSync(file, readFileSync(file, 'utf8').replace('## Build one outcome', '## Deliver the result').replace('## Publish and checkpoint', '## Handoff'));
    assert.deepEqual(validateRepository(directory), []);
}));
test('missing composed skill and broken portable reference fail', () => fixture((directory) => {
    rmSync(path.join(directory, 'skills/critique'), { recursive: true });
    const file = path.join(directory, 'skills/clarify/SKILL.md');
    writeFileSync(file, readFileSync(file, 'utf8') + '\n[broken](references/missing.md)\n[escape](../implement/SKILL.md)\n');
    const failures = validateRepository(directory).join('\n');
    assert.match(failures, /missing skill critique/);
    assert.match(failures, /missing linked resource/);
    assert.match(failures, /escapes deployed skill/);
}));

test('an undeclared external companion fails without private access', () => fixture((directory) => {
    const file = path.join(directory, 'external-dependencies.json');
    writeFileSync(file, JSON.stringify({ skills: {} }));
    assert.match(validateRepository(directory).join('\n'), /missing skill gh-stack; declare an external source/);
}));
