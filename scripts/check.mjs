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
    const external = read('external-dependencies.json').skills ?? {};
    const skillRoot = path.join(root, 'skills');
    const directories = fs.readdirSync(skillRoot, { withFileTypes: true });
    const names = new Set(directories.filter(entry => entry.isDirectory()).map(entry => entry.name));
    for (const name of names) {
        if (!fs.existsSync(path.join(skillRoot, name, 'SKILL.md'))) failures.push(`${name}: missing SKILL.md`);
        const dependencies = read(`skills/${name}/skill-dependencies.json`);
        if (!Array.isArray(dependencies) || dependencies.some(dependency => typeof dependency !== 'string' || !/^[a-z0-9-]+$/.test(dependency))) {
            failures.push(`${name}: dependencies must be skill identities`); continue;
        }
        for (const required of dependencies) {
            if (!names.has(required) && (!external[required]?.repository || !external[required]?.path)) {
                failures.push(`${name}: missing companion ${required}; declare its external source`);
            }
        }
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
                if (match) frontMatterFailures(match[1]).forEach((failure) => failures.push(`${file}: front matter ${failure}`));
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
    for (const entry of directories) {
        if (!entry.isDirectory()) { failures.push(`${entry.name}: expected a skill directory`); continue; }
        inspect(path.join(skillRoot, entry.name), path.join(skillRoot, entry.name));
        if (isLead(entry.name)) failures.push(...leadWordFailures(root, path.join('skills', entry.name)));
    }
    return failures;
}

// A lead skill states intent; the commands, hosts and services it measures live in the runbook of
// the repository it runs on. These categories name generic tools and providers, nothing of one system.
export const leadWords = [
    // remote access and privilege
    'ssh', 'scp', 'rsync', 'sudo',
    // service managers and schedulers
    'systemd', 'systemctl', 'journalctl', 'cron', 'crontab',
    // containers and provisioning
    'docker', 'podman', 'kubernetes', 'kubectl', 'helm', 'ansible', 'ansible-playbook', 'terraform',
    // backup tools and storage providers
    'restic', 'borg', 'rclone', 'b2', 'backblaze', 's3', 'aws', 'azure', 'gcp', 'cloudflare', 'hetzner',
    // code hosting and its automation
    'github actions', 'dependabot', 'gh', 'gitlab',
    // package managers and test runners
    'npm', 'npx', 'pnpm', 'yarn', 'pip', 'vitest', 'jest', 'mocha', 'pytest', 'eslint', 'jscpd',
    // browser drivers
    'playwright', 'puppeteer', 'selenium', 'chrome', 'chromium',
    // notification, network and monitoring services
    'ntfy', 'tailscale', 'wireguard', 'grafana', 'prometheus', 'uptime kuma',
    // databases and HTTP clients
    'postgres', 'postgresql', 'sqlite', 'curl', 'wget',
];

const isLead = (name) => name.endsWith('-review');

export function leadWordFailures(root, directory) {
    const pattern = new RegExp(`(?<!\\w)(?:${leadWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+')).join('|')})(?!\\w)`, 'gi');
    const failures = [];
    const walk = (relative) => {
        for (const entry of fs.readdirSync(path.join(root, relative), { withFileTypes: true })) {
            const file = path.join(relative, entry.name);
            if (entry.isDirectory()) { walk(file); continue; }
            if (!/\.(?:md|ya?ml|json|txt)$/.test(entry.name)) continue;
            fs.readFileSync(path.join(root, file), 'utf8').split(/\r?\n/).forEach((line, index) => {
                for (const match of line.matchAll(pattern)) {
                    failures.push(`${file}:${index + 1}: names "${match[0]}"; a lead skill names no host, provider, service or tool, and its runbook holds the command`);
                }
            });
        }
    };
    walk(directory);
    return failures;
}

// Accept the YAML subset skill front matter uses: top-level keys holding a quoted, plain or block
// scalar, or a mapping of such keys one level deeper. A plain scalar that YAML would read as
// something else, such as a nested mapping after ': ' or a comment after ' #', fails here, before an
// installer skips the skill.
export function frontMatterFailures(text) {
    const failures = [];
    const keys = new Set();
    let block = null;
    let parent = false;
    text.split(/\r?\n/).forEach((line, index) => {
        const at = `line ${index + 2}`;
        const indent = line.match(/^ */)[0].length;
        if (block !== null && (indent > block || !line.trim())) return;
        block = null;
        if (!line.trim() || /^\s*#/.test(line)) return;
        if (line.includes('\t')) { failures.push(`${at}: tab in indentation or value`); return; }
        if (indent > 0 && !parent) { failures.push(`${at}: indented line outside a mapping`); return; }
        if (indent === 0) parent = false;
        const pair = line.slice(indent).match(/^([A-Za-z0-9_-]+):(?: (.*))?$/);
        if (!pair) { failures.push(`${at}: expected "key: value"`); return; }
        if (indent === 0) {
            if (keys.has(pair[1])) failures.push(`${at}: duplicate key ${pair[1]}`);
            keys.add(pair[1]);
        }
        const value = (pair[2] ?? '').trim();
        if (!value) { if (indent === 0) parent = true; return; }
        if (/^[|>][+-]?[1-9]?$/.test(value)) { block = indent; return; }
        const problem = scalarProblem(value);
        if (problem) failures.push(`${at}: ${pair[1]} ${problem}`);
    });
    return failures;
}

function scalarProblem(value) {
    if (value.startsWith("'")) return /^'(?:[^']|'')*'(?:\s+#.*)?$/.test(value) ? null : 'has an unclosed single-quoted string';
    if (value.startsWith('"')) return /^"(?:[^"\\]|\\.)*"(?:\s+#.*)?$/.test(value) ? null : 'has an unclosed double-quoted string';
    if (/^[[\]{},#&*!|>%@`]/.test(value) || /^[-?:](?:\s|$)/.test(value)) return 'starts with a YAML indicator; quote the value';
    if (/:(?:\s|$)/.test(value)) return "holds ': ', which YAML reads as a nested mapping; quote the value";
    if (/\s#/.test(value)) return "holds ' #', which YAML reads as a comment; quote the value";
    return null;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const root = path.resolve(process.argv[2] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), '..'));
    const failures = validateRepository(root);
    if (failures.length) {
        failures.forEach((failure) => console.error(failure));
        process.exitCode = 1;
    } else console.log('Skill compositions and deployable resources resolve.');
}
