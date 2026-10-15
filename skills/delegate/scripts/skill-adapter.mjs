#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { capsuleProblems } from './validate-task-capsule.mjs';

// The first line names the plan, issue and PR the session works on, so `wf ls` titles
// read "plan 0007 · issue #57 · PR #59". The artifact and the context skeleton supply them.
function targetLine(artifact, context) {
    const number = (url, kind) => url?.match(new RegExp(`^https://github\\.com/[\\w.-]+/[\\w.-]+/${kind}/(\\d+)`))?.[1];
    const line = (label) => context.match(new RegExp(`^- ${label}: (https://\\S+)`, 'm'))?.[1];
    const plan = line('Plan')?.match(/\/plans\/(\d+)-/)?.[1];
    const issue = number(artifact, 'issues') ?? number(line('Issue'), 'issues');
    const pr = number(artifact, 'pull') ?? number(line('PR'), 'pull');
    const parts = [plan && `plan ${plan}`, issue && `issue #${issue}`, pr && `PR #${pr}`].filter(Boolean);
    return `${parts.join(' · ')}: ${artifact}`;
}

export function makeCapsule(skill, artifact, context) {
    if (!['critique', 'implement', 'evaluate'].includes(skill)) throw new Error('unknown delegated skill');
    if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/(issues|pull)\/[1-9][0-9]*$/.test(artifact)) throw new Error('expected a GitHub issue or PR URL');
    if (!context.trim()) throw new Error('capsule requires bounded context and evidence');
    const body = `${targetLine(artifact, context)}\nUse the installed ${skill} skill. Read its SKILL.md and applicable references.\n` +
        'Apply writing-style to every written artifact. Own the publication authorized by that skill.\n\n' + context.trim() +
        '\n\nReturn publication links and exactly one HTML comment in this form: ' +
        '<!-- workflow-result: {"schema":1,"status":"complete","pullRequest":"https://github.com/owner/repository/pull/1","headSha":"0123456789abcdef0123456789abcdef01234567"} -->. ' +
        'Replace the example status, URL, and SHA with actual values. Use checkpoint or blocked when applicable. ' +
        'A checkpoint retains the existing PR and explains concrete progress and remaining work. ' +
        'Use null PR and head only for a blocked result that has no publication. Human decisions control merges.\n';
    const problems = capsuleProblems(body);
    if (problems.length) throw new Error(problems.join('; '));
    return body;
}

export function parseResult(body) {
    const markers = [...body.matchAll(/<!--\s*workflow-result\s*:?\s*([\s\S]*?)-->/g)];
    if (markers.length !== 1) throw new Error('expected one workflow-result marker');
    const result = JSON.parse(markers[0][1]);
    if (!result || result.schema !== 1 || !['complete', 'checkpoint', 'blocked'].includes(result.status)) throw new Error('invalid skill result');
    if (Object.keys(result).sort().join(',') !== 'headSha,pullRequest,schema,status') throw new Error('unexpected skill result fields');
    if (result.status === 'blocked' && result.pullRequest === null && result.headSha === null) return result;
    if (!/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/[1-9][0-9]*$/.test(result.pullRequest ?? '') ||
        !/^[0-9a-f]{40}$/.test(result.headSha ?? '')) throw new Error('published result needs its PR and full commit SHA');
    return result;
}

// One issue comment recording a finished wf run, from the run output.
export function runRecord(runText, { role, model, note = '' }) {
    const field = (name) => runText.match(new RegExp(`^${name}\\s+(.+)$`, 'm'))?.[1].trim() ?? null;
    const session = field('Session')?.split(/\s+/);
    if (!session || session.length < 2) throw new Error('run output has no Session line');
    const [harness, id] = session;
    const time = field('Exit')?.match(/after (\S+)/)?.[1] ?? '?';
    const cost = field('Cost')?.match(/^(\$[\d.]+|<\$[\d.]+)/)?.[1] ?? '?';
    const peak = field('Cost')?.match(/peak context (\S+)/)?.[1];
    const result = parseResult(runText);
    const label = role.charAt(0).toUpperCase() + role.slice(1);
    const outcome = result.pullRequest ? `${result.pullRequest} at \`${result.headSha.slice(0, 7)}\`` : 'nothing published';
    return `${label} run: \`wf run ${harness} ${model}\`, session \`${id}\`, ${time}, ${cost}${peak ? `, peak context ${peak}` : ''}. ` +
        `Result ${result.status}: ${outcome}.${note.trim() ? ` ${note.trim()}` : ''}`;
}

const outcomeMarker = (body) => {
    const m = body?.match(/<!--\s*workflow-outcome:\s*([\s\S]*?)-->/);
    return m ? JSON.parse(m[1]) : null;
};
const evaluationMarkers = (comments) => comments.flatMap((c) => {
    const m = c.body?.match(/<!--\s*workflow-evaluation:\s*([\s\S]*?)-->/);
    return m ? [{ ...JSON.parse(m[1]), url: c.url }] : [];
});

// The mechanical part of a capsule context: identities, revisions, dependencies and open findings.
// The orchestrator adds remaining work, checks and boundaries.
export function contextSkeleton({ issue, pr, dependencies = [] }) {
    const marker = outcomeMarker(issue.body);
    const lines = [`# Context for ${issue.url}`, '', `- Issue: ${issue.url} (${issue.title}). Read it in full; its acceptance is the contract.`];
    if (marker?.planUrl) lines.push(`- Plan: ${marker.planUrl}`);
    if (pr) {
        lines.push(`- PR: ${pr.url} at head ${pr.headRefOid}, branch \`${pr.headRefName}\`, base \`${pr.baseRefName}\`. Publish to this PR.`);
        const evaluations = evaluationMarkers(pr.comments ?? []);
        const last = evaluations.at(-1);
        if (last) {
            const open = (last.findings ?? []).filter((f) => f.state === 'open').map((f) => `${f.id}${f.blocking ? ' (blocking)' : ''}`);
            lines.push(`- Latest evaluation: ${last.verdict} at ${last.headSha}, ${last.url}.${open.length ? ` Open findings: ${open.join(', ')}.` : ''}`);
        }
    } else lines.push('- PR: none yet. Open one against the base branch.');
    lines.push(dependencies.length
        ? `- Dependencies: ${dependencies.map((d) => `${d.url} (${d.state}${d.pr ? `, PR ${d.pr.url} ${d.pr.state.toLowerCase()} at ${d.pr.headRefOid}` : ''})`).join('; ')}.`
        : '- Dependencies: none.');
    return lines.join('\n') + '\n';
}

const gh = (args) => JSON.parse(execFileSync('gh', args, { encoding: 'utf8' }));
const issueOf = (url) => gh(['issue', 'view', url, '--json', 'url,title,body,state']);
const prOf = (url) => gh(['pr', 'view', url, '--json', 'url,headRefOid,headRefName,baseRefName,state,comments']);
function collectContext(issueUrl) {
    const issue = issueOf(issueUrl);
    const marker = outcomeMarker(issue.body);
    const pr = marker?.pullRequest ? prOf(marker.pullRequest) : null;
    const dependencies = (marker?.dependencies ?? []).map((url) => {
        const dep = issueOf(url);
        const depPr = outcomeMarker(dep.body)?.pullRequest;
        return { url, state: dep.state.toLowerCase(), pr: depPr ? prOf(depPr) : null };
    });
    return contextSkeleton({ issue, pr, dependencies });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    try {
        const [operation, ...args] = process.argv.slice(2);
        if (operation === 'capsule' && args.length === 4) {
            const body = makeCapsule(args[0], args[1], readFileSync(args[2], 'utf8'));
            writeFileSync(args[3], body);
            console.log(JSON.stringify({ path: args[3], bytes: Buffer.byteLength(body) }));
        } else if (operation === 'result' && args.length === 1) console.log(JSON.stringify(parseResult(readFileSync(args[0], 'utf8'))));
        else if (operation === 'record' && (args.length === 3 || args.length === 4)) console.log(runRecord(readFileSync(args[0], 'utf8'), { role: args[1], model: args[2], note: args[3] ?? '' }));
        else if (operation === 'context' && args.length === 1) process.stdout.write(collectContext(args[0]));
        else throw new Error('usage: skill-adapter.mjs capsule <skill> <artifact-url> <context-file> <output-file> | result <result-file> | record <run-file> <role> <model> [note] | context <issue-url>');
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
