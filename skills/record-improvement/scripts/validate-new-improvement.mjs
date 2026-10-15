#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED_HEADINGS = [
  "## Purpose",
  "## Current approach",
  "### Current advantages",
  "### Current costs",
  "## Proposed approach",
  "## Proposed advantages",
  "## Proposed costs and risks",
  "## Delivery sequence",
  "## Acceptance criteria",
];

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

function sectionHasContent(lines, headingIndex) {
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^#{1,3} /.test(line)) return false;
    if (line.trim() !== "") return true;
  }
  return false;
}

export function validateNewImprovement(path, content) {
  const errors = [];
  const name = basename(path);
  const filename = /^(\d{4})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/.exec(name);
  if (filename === null || filename[1] === "0000")
    errors.push("filename must be NNNN-lisp-case.md with a number above 0000");

  const normalized = content.replaceAll("\r\n", "\n");
  const lines = normalized.split("\n");
  if (lines[0] !== "---")
    errors.push("frontmatter must start on the first line");
  const close = lines.indexOf("---", 1);
  if (close < 0) errors.push("frontmatter closing delimiter is missing");
  else {
    const fields = lines.slice(1, close);
    if (fields.length !== 5)
      errors.push("frontmatter must contain exactly five fields");
    if (fields[0] !== "improvement_schema: 1")
      errors.push("improvement_schema must be 1");
    const id = /^improvement_id: "([^"]+)"$/.exec(fields[1] ?? "")?.[1];
    if (id === undefined || !UUID_V4.test(id))
      errors.push("improvement_id must be a quoted UUID v4");
    if (fields[2] !== "status: proposed")
      errors.push("a new improvement status must be proposed");
    const createdAt = /^created_at: (\S+)$/.exec(fields[3] ?? "")?.[1];
    if (createdAt === undefined || !validDate(createdAt))
      errors.push("created_at must be a valid YYYY-MM-DD date");
    if (fields[4] !== "superseded_by: null")
      errors.push("a new improvement superseded_by value must be null");
  }

  const titles = lines.filter((line) => /^# /.test(line));
  if (titles.length !== 1 || titles[0].trim() === "#")
    errors.push("improvement must contain one nonempty H1 title");

  let priorIndex = close;
  for (const heading of REQUIRED_HEADINGS) {
    const matches = lines
      .map((line, index) => (line === heading ? index : -1))
      .filter((index) => index >= 0);
    if (matches.length !== 1) {
      errors.push(`${heading} must appear exactly once`);
      continue;
    }
    const index = matches[0];
    if (index <= priorIndex) errors.push(`${heading} is out of order`);
    priorIndex = index;
    if (!sectionHasContent(lines, index))
      errors.push(`${heading} must contain text before the next heading`);
  }

  if (/\{\{[A-Z0-9_]+\}\}/.test(normalized))
    errors.push("template placeholders must be replaced");

  return errors;
}

async function main() {
  if (process.argv.length !== 3) {
    console.error("Usage: validate-new-improvement.mjs <improvement-file>");
    return 2;
  }
  const path = resolve(process.argv[2]);
  let content;
  try {
    content = await readFile(path, "utf8");
  } catch (error) {
    console.error(`Cannot read improvement file: ${error.message}`);
    return 1;
  }
  const errors = validateNewImprovement(path, content);
  if (errors.length > 0) {
    for (const error of errors) console.error(`- ${error}`);
    return 1;
  }
  console.log(`Valid improvement: ${path}`);
  return 0;
}

if (
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
)
  process.exitCode = await main();
