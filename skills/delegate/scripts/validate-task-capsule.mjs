#!/usr/bin/env node
// Validate a task capsule before wf run launches it: readable text within 65,536 bytes.
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

export function capsuleProblems(body) {
    const problems = [];
    if (!body.replace(/<!--[\s\S]*?-->/g, '').trim()) problems.push('capsule needs a readable task');
    if (Buffer.byteLength(body) > 65536) problems.push('capsule exceeds 65,536 bytes');
    return problems;
}

async function main() {
    if (process.argv.length !== 3) throw new Error('usage: validate-task-capsule.mjs <task-capsule>');
    const bytes = await readFile(process.argv[2]);
    const body = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    const problems = capsuleProblems(body);
    if (problems.length > 0) throw new Error(problems.join('; '));
    process.stdout.write(`${JSON.stringify({ status: 'ok', bytes: bytes.length })}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main().catch((error) => {
        process.stderr.write(`task capsule invalid: ${error.message}\n`);
        process.exitCode = 1;
    });
}
