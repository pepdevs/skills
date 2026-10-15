import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { contrast, validate } from '../../skills/data-visualization/scripts/validate-palette.mjs';

const script = fileURLToPath(new URL('../../skills/data-visualization/scripts/validate-palette.mjs', import.meta.url));
const defaults = readFileSync(new URL('../../skills/data-visualization/references/visual-defaults.md', import.meta.url), 'utf8');
const tokens = new Map([...defaults.matchAll(/^\| ([^|]+?) \| `(#\w{6})` \| `(#\w{6})` \|$/gm)]
  .map(([, role, light, dark]) => [role, [light, dark]]));

test('published text defaults meet normal-text contrast in both themes', () => {
  assert.equal(contrast('#000000', '#ffffff'), 21);
  assert.ok(contrast('#898781', '#fcfcfb') < 4.5, 'the old muted fill is unsuitable for normal light text');
  for (const role of ['Primary text', 'Secondary text', 'Muted text']) {
    for (const background of ['Page', 'Surface']) {
      for (const theme of [0, 1]) {
        assert.ok(contrast(tokens.get(role)[theme], tokens.get(background)[theme]) >= 4.5,
          `${role} on ${background}, theme ${theme}`);
      }
    }
  }
});

test('default pair coverage catches combinations hidden by fixed palette order', () => {
  const roles = ['Blue', 'Green', 'Magenta', 'Yellow', 'Aqua', 'Orange', 'Violet', 'Red'];
  for (const [index, mode] of [[0, 'light'], [1, 'dark']]) {
    const palette = roles.map(role => tokens.get(role)[index]);
    assert.equal(validate(palette, { mode, pairs: 'adjacent' }).ok, true);
    assert.equal(validate(palette, { mode }).ok, false);
    assert.deepEqual(validate(palette, { mode }), validate(palette, { mode, pairs: 'all' }));
  }
});

test('CLI defaults to all pairs and rejects misspelled pair modes', () => {
  const palette = ['Blue', 'Green', 'Magenta', 'Yellow', 'Aqua', 'Orange', 'Violet', 'Red']
    .map(role => tokens.get(role)[0]).join(',');
  const run = (...args) => spawnSync(process.execPath, [script, palette, ...args], { encoding: 'utf8' });
  assert.equal(run().status, 1);
  assert.equal(run('--pairs', 'adjacent').status, 0);
  assert.equal(run('--pairs', 'adjacnet').status, 2);
});
