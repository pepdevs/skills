#!/usr/bin/env node
// Checks an idea artifact against the template in assets/idea-artifact.html: the same style, pager and
// scripts, every block the outline and the inbox read, and well-formed questions. Prints each problem.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TEMPLATE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'idea-artifact.html');
const BLOCKS = ['why', 'increments', 'questions', 'decisions', 'out'];
const PARTS = ['nav', 'meter-fill', 'meter-text', 'name', 'pick-status', 'prev', 'next', 'comment'];

const uncommented = (html) => html.replace(/<!--[\s\S]*?-->/g, '');
const tags = (html, name) => [...uncommented(html).matchAll(new RegExp(`<${name}\\b[^>]*>[\\s\\S]*?</${name}>`, 'gi'))].map((m) => m[0]);
const hasId = (html, id) => new RegExp(`\\sid=["']${id}["']`).test(html);

/** The element that opens with the id, up to its matching close tag. */
function section(html, id) {
    const open = html.match(new RegExp(`<(\\w+)\\b[^>]*\\sid=["']${id}["'][^>]*>`));
    if (!open) return null;
    const tag = open[1].toLowerCase();
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = open.index + open[0].length;
    for (let depth = 1, m; (m = re.exec(html));) {
        depth += m[1] ? -1 : 1;
        if (depth === 0) return html.slice(open.index, m.index + m[0].length);
    }
    return null;
}

export function checkArtifact(html, template = fs.readFileSync(TEMPLATE, 'utf8')) {
    const problems = [];
    const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() ?? '';
    if (!title || title.length > 200) problems.push('<title> holds the idea\'s name, 1 to 200 characters');
    if (tags(html, 'style').join('\n') !== tags(template, 'style').join('\n')) problems.push('the <style> differs from the template\'s; keep it as is');
    if (tags(html, 'script').join('\n') !== tags(template, 'script').join('\n')) problems.push('the scripts differ from the template\'s; keep them as they are');
    for (const id of BLOCKS) {
        const block = section(html, id);
        if (!block) { problems.push(`the block id="${id}" is missing`); continue; }
        if (!/\sdata-outline=["'][^"']+["']/.test(block.slice(0, block.indexOf('>') + 1))) problems.push(`the block id="${id}" lacks its data-outline name`);
    }
    for (const id of PARTS) if (!hasId(html, id)) problems.push(`the element id="${id}" is missing; keep the outline and the pager`);

    const why = section(html, 'why');
    if (why) {
        const text = why.replace(/<figure\b[\s\S]*?<\/figure>/gi, '').replace(/<h\d\b[\s\S]*?<\/h\d>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (!text || text.length > 4000) problems.push('the Why holds text of 1 to 4000 characters');
    }
    const increments = section(html, 'increments');
    if (increments) {
        const items = [...increments.matchAll(/<li\b[\s\S]*?<\/li>/gi)].map((m) => m[0]);
        if (items.length < 1 || items.length > 20) problems.push('the increments list 1 to 20 <li>');
        items.forEach((li, i) => { if (!/<strong\b/i.test(li)) problems.push(`increment ${i + 1} has no title in a <strong>`); });
    }
    const questions = section(html, 'questions');
    if (questions) {
        const starts = [...questions.matchAll(/<(\w+)\b[^>]*\sdata-question=["']([^"']+)["'][^>]*>/g)];
        if (!starts.length && !/Nothing is open/i.test(questions)) problems.push('a questions block with no question says "Nothing is open."');
        for (const m of starts) {
            const q = section(questions.slice(m.index).replace(m[0], m[0].replace(/>$/, ` id="__q">`)), '__q') ?? '';
            const name = m[2];
            const options = [...q.matchAll(new RegExp(`<input\\b[^>]*type=["']radio["'][^>]*name=["']${name}["'][^>]*value=["']([^"']+)["']`, 'g'))].map((o) => o[1]);
            const listed = options.filter((v) => v !== 'other');
            if (listed.length < 2) problems.push(`question "${name}" lists fewer than two options`);
            if (listed.some((v, i) => v !== String(i + 1))) problems.push(`question "${name}" numbers its options from 1 in order`);
            if (!options.includes('other')) problems.push(`question "${name}" lacks the Other answer`);
            if ((q.match(/class=["']rec["']/g) ?? []).length !== 1) problems.push(`question "${name}" marks one option Recommended`);
            for (const label of q.matchAll(/class=["']label["']>([^<]*)</g)) if (label[1].length > 40) problems.push(`question "${name}" has a label over 40 characters: ${label[1]}`);
        }
    }
    return problems;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    const file = process.argv[2];
    if (!file) { console.error('usage: check-artifact.mjs <artifact.html>'); process.exit(2); }
    const problems = checkArtifact(fs.readFileSync(file, 'utf8'));
    for (const p of problems) console.log(`${file}: ${p}`);
    if (problems.length) process.exit(1);
    console.log(`${file}: matches the template`);
}
