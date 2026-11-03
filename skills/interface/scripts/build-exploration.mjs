#!/usr/bin/env node
// Bundle an exploration page and the real @pepsoler/material components into one HTML file.
// Usage: node build-exploration.mjs <entry.tsx> <out.html> --material <checkout> [--title <name>] [--fonts <family,family>]
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const args = process.argv.slice(2);
const option = (name, fallback) => {
    const at = args.indexOf(`--${name}`);
    if (at < 0) return fallback;
    return args.splice(at, 2)[1];
};
const material = option('material');
const title = option('title', 'Exploration');
const fonts = option('fonts', 'DM Sans,Plus Jakarta Sans,Manrope').split(',');
const [entry, out] = args;
if (!material || !entry || !out) {
    console.error('Usage: build-exploration.mjs <entry.tsx> <out.html> --material <checkout> [--title <name>] [--fonts <family,family>]');
    process.exit(2);
}
const root = path.resolve(material);
const esbuild = createRequire(path.join(root, 'package.json'))('esbuild');

const js = await esbuild.build({
    entryPoints: [path.resolve(entry)],
    bundle: true,
    format: 'iife',
    minify: true,
    write: false,
    jsx: 'automatic',
    target: 'es2022',
    alias: { '@pepsoler/material': path.join(root, 'src/index.ts') },
    nodePaths: [path.join(root, 'node_modules')],
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'warning',
});
const css = await esbuild.build({
    stdin: { contents: `@import "${root}/tokens/material.css"; @import "${root}/src/components.css";`, resolveDir: root, loader: 'css' },
    bundle: true,
    write: false,
    logLevel: 'warning',
});
// The font files are not inlined: Google Fonts serves the same families, which keeps the page small.
const symbols = fs.readFileSync(path.join(root, 'fonts/fonts.css'), 'utf8').replace(/@font-face\s*\{[^}]*\}/g, '');
const families = ['Roboto:wght@400;500;700', 'Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200',
    ...fonts.map((family) => `${family.trim().replace(/ /g, '+')}:wght@400;500;700`)];
const html = `<!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title.replace(/</g, '&lt;')}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${families.map((family) => `family=${family}`).join('&')}&display=block">
<style>body{margin:0}${css.outputFiles[0].text}${symbols}</style>
<div id="root"></div>
<script>${js.outputFiles[0].text.replace(/<\/script/gi, '<\\/script')}</script>
`;
fs.writeFileSync(out, html);
console.log(`${out}: ${Buffer.byteLength(html)} bytes`);
