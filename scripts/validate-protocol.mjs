#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Validate portable resources and explicitly declared cross-source composition.
export function validateRepository(root) {
    const failures = [];
    const read = (name) => {
        try { return JSON.parse(fs.readFileSync(path.join(root, name), 'utf8')); }
        catch (error) { failures.push(`${name}: ${error.message}`); return {}; }
    };
    const compositions = read('skill-dependencies.json');
    const external = read('external-dependencies.json').skills ?? {};
    const skillRoot = path.join(root, 'skills');
    for (const [name, dependencies] of Object.entries(compositions)) {
        if (!fs.existsSync(path.join(skillRoot, name, 'SKILL.md'))) failures.push(`${name}: missing skill ${name}`);
        if (!Array.isArray(dependencies) || dependencies.some((dependency) => !/^[a-z0-9-]+$/.test(dependency))) {
            failures.push(`${name}: dependencies must be skill identities`); continue;
        }
        for (const required of dependencies) {
            if (Object.hasOwn(compositions, required)) {
                if (!fs.existsSync(path.join(skillRoot, required, 'SKILL.md'))) failures.push(`${name}: missing skill ${required}`);
            } else if (!external[required]?.repository || !external[required]?.path) {
                failures.push(`${name}: missing skill ${required}; declare an external source`);
            }
        }
        const file = path.join(skillRoot, name, 'skill-dependencies.json');
        if (fs.existsSync(file)) {
            try {
                if (JSON.stringify(JSON.parse(fs.readFileSync(file, 'utf8'))) !== JSON.stringify(dependencies)) {
                    failures.push(`${name}: installed dependency declaration differs from repository map`);
                }
            } catch { failures.push(`${name}: invalid installed dependency declaration`); }
        } else failures.push(`${name}: missing installed dependency declaration`);
    }
    function inspect(directory, home) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const file = path.join(directory, entry.name);
            if (entry.isSymbolicLink()) { failures.push(`${file}: resource symlink is not portable`); continue; }
            if (entry.isDirectory()) { inspect(file, home); continue; }
            if (!entry.name.endsWith('.md')) continue;
            const body = fs.readFileSync(file, 'utf8');
            if (entry.name === 'SKILL.md') {
                const match = body.match(/^---\r?\n([\s\S]*?)\r?\n---/);
                const name = match?.[1].match(/^name:\s*([a-z0-9-]+)\s*$/m)?.[1];
                if (name !== path.basename(home)) failures.push(`${file}: skill identity differs from directory`);
                if (!match?.[1].match(/^description:\s*\S/m)) failures.push(`${file}: missing description`);
            }
            const prose = body.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '').replace(/`[^`\n]*`/g, '');
            for (const link of prose.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
                const target = link[1];
                if (/^(?:[a-z][a-z0-9+.-]*:|#|<)/i.test(target) || target.includes('$')) continue;
                const filename = target.split('#')[0];
                if (!filename) continue;
                const resolved = path.resolve(directory, filename);
                if (resolved !== home && !resolved.startsWith(`${home}${path.sep}`)) failures.push(`${file}: link escapes deployed skill: ${target}`);
                else if (!fs.existsSync(resolved)) failures.push(`${file}: missing linked resource: ${target}`);
            }
        }
    }
    for (const entry of fs.readdirSync(skillRoot, { withFileTypes: true })) {
        if (!entry.isDirectory()) { failures.push(`${entry.name}: expected a skill directory`); continue; }
        if (!Object.hasOwn(compositions, entry.name)) failures.push(`${entry.name}: missing dependency declaration`);
        inspect(path.join(skillRoot, entry.name), path.join(skillRoot, entry.name));
    }
    return failures;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
    const failures = validateRepository(root);
    if (failures.length) {
        failures.forEach((failure) => console.error(failure));
        process.exitCode = 1;
    } else console.log('Skill compositions and deployable resources resolve.');
}
