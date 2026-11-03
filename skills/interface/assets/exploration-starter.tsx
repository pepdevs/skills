// Copy this file, keep one theme and replace App with the page.
// The themes move to `@pepsoler/material/themes` when plan 0001 ships them. They have light values only.
import { Button, Card, Material, ProgressIndicator } from '@pepsoler/material';
import { createRoot } from 'react-dom/client';

interface Theme {
  id: string;
  name: string;
  tokens: Record<string, string>;
  css: string;
}

const scales = ['display', 'headline', 'title', 'body', 'label'].flatMap((role) => ['large', 'medium', 'small'].map((size) => `${role}-${size}`));
const typeface = (font: string) => Object.fromEntries(scales.flatMap((s) => [[`--md-sys-typescale-${s}-font`, font], [`--md-sys-typescale-emphasized-${s}-font`, font]]));

const roles = (r: Record<string, string>) => Object.fromEntries(Object.entries(r).map(([k, v]) => [`--md-sys-color-${k}`, v]));

const soft = {
  '--md-sys-shape-corner-medium': '24px',
  '--md-sys-shape-corner-small': '999px',
  '--md-sys-shape-corner-extra-small': '20px',
  '--md-sys-shape-corner-extra-small-top': '20px 20px 0 0',
  '--md-comp-filled-card-container-shape': '28px',
  '--md-comp-button-small-pressed-container-shape': '999px',
  '--md-comp-button-medium-container-height': '52px',
  '--md-comp-list-list-item-container-color': 'transparent',
  '--md-comp-filter-chip-container-shape': '999px',
};

const themes: Theme[] = [
  {
    id: 'graphite',
    name: 'Graphite',
    tokens: {
      ...roles({ primary: '#111214', 'on-primary': '#ffffff', 'secondary-container': '#111214', 'on-secondary-container': '#ffffff', 'surface': '#ffffff', 'surface-container-highest': '#f1f2f5', 'surface-container-low': '#ffffff', 'surface-container': '#ffffff', 'on-surface': '#17181b', 'on-surface-variant': '#62656d', outline: '#d8dae0', 'outline-variant': '#e4e5ea', secondary: '#c94f12' }),
      ...soft,
      ...typeface('"DM Sans", sans-serif'),
      '--md-comp-filled-card-container-color': '#ffffff',
      '--md-comp-filter-chip-flat-unselected-outline-color': 'transparent',
      '--md-comp-outlined-text-field-outline-color': 'transparent',
      '--md-comp-linear-progress-indicator-active-indicator-color': '#e05a10',
      '--md-comp-linear-progress-indicator-track-color': '#eceef2',
      '--md-comp-progress-indicator-active-indicator-color': '#e05a10',
      '--md-comp-progress-indicator-track-color': '#eceef2',
    },
    css: `.screen { background: #d9dae0; }
.md-card-container { box-shadow: 0 10px 30px rgb(22 24 32 / 0.05); }
.md-text-field-container { background: #ffffff; border-radius: 20px; }
.md-chip[data-variant='filter']:not([data-selected]) { background: #ffffff; }
.md-button[data-color='filled'][data-variant]:not([data-disabled]) > .md-elevation { opacity: 1; box-shadow: 0 8px 18px rgb(17 18 20 / 0.24); }`,
  },
  {
    id: 'ember',
    name: 'Ember',
    tokens: {
      ...roles({ primary: '#2f2d2c', 'on-primary': '#ffffff', 'secondary-container': '#f08a4b', 'on-secondary-container': '#2a1408', surface: '#fbf8f4', 'surface-container-highest': '#f1ebe3', 'surface-container-low': '#fbf8f4', 'surface-container': '#fbf8f4', 'on-surface': '#2b2826', 'on-surface-variant': '#6b645d', outline: '#ddd5ca', 'outline-variant': '#e9e2d8', secondary: '#c94f12' }),
      ...soft,
      ...typeface('"Plus Jakarta Sans", sans-serif'),
      '--md-comp-filled-card-container-color': '#fffdfa',
      '--md-comp-filter-chip-flat-unselected-outline-color': 'transparent',
      '--md-comp-outlined-text-field-outline-color': 'transparent',
      '--md-comp-linear-progress-indicator-active-indicator-color': '#d9560f',
      '--md-comp-linear-progress-indicator-track-color': '#efe6da',
      '--md-comp-progress-indicator-active-indicator-color': '#d9560f',
      '--md-comp-progress-indicator-track-color': '#efe6da',
    },
    css: `.screen { background: radial-gradient(120% 60% at 90% 0%, #f08a4b 0%, rgb(240 138 75 / 0) 62%), radial-gradient(90% 40% at 0% 0%, #d9c9ba 0%, rgb(217 201 186 / 0) 70%), #f4efe8; }
.md-card-container { box-shadow: 0 16px 36px rgb(82 52 30 / 0.09), inset 0 0 0 1px rgb(255 255 255 / 0.8); }
.md-text-field-container { background: #fffdfa; border-radius: 20px; }
.md-chip[data-variant='filter']:not([data-selected]) { background: #fffdfa; }
.md-button[data-color='filled'][data-variant]:not([data-disabled]) > .md-container, .md-button[data-color='filled'][data-variant]:not([data-disabled]) > .md-button-container { background-image: linear-gradient(180deg, #4a4745, #272524); }
.md-button[data-color='filled'][data-variant]:not([data-disabled]) > .md-elevation { opacity: 1; box-shadow: 0 10px 20px rgb(39 37 36 / 0.3); }`,
  },
  {
    id: 'aura',
    name: 'Aura',
    tokens: {
      ...roles({ primary: '#5a3fd6', 'on-primary': '#ffffff', 'secondary-container': '#ddd5ff', 'on-secondary-container': '#2c1f78', surface: '#ffffff', 'surface-container-highest': '#ffffff', 'surface-container-low': '#ffffff', 'surface-container': '#ffffff', 'on-surface': '#211c3a', 'on-surface-variant': '#5a5478', outline: '#cfc8ec', 'outline-variant': '#e0dbf3', secondary: '#3a2a8c' }),
      ...soft,
      ...typeface('Manrope, sans-serif'),
      '--md-comp-filled-card-container-color': 'rgb(255 255 255 / 0.78)',
      '--md-comp-filter-chip-flat-unselected-outline-color': 'transparent',
      '--md-comp-outlined-text-field-outline-color': 'transparent',
      '--md-comp-linear-progress-indicator-active-indicator-color': '#5a3fd6',
      '--md-comp-linear-progress-indicator-track-color': 'rgb(90 63 214 / 0.16)',
      '--md-comp-progress-indicator-active-indicator-color': '#5a3fd6',
      '--md-comp-progress-indicator-track-color': 'rgb(90 63 214 / 0.16)',
    },
    css: `.screen { background: radial-gradient(90% 55% at 0% 0%, #7f6bf0 0%, rgb(127 107 240 / 0) 70%), radial-gradient(90% 60% at 100% 100%, #f7a9b4 0%, rgb(247 169 180 / 0) 70%), #e7defa; }
.md-text-field-container { background: rgb(255 255 255 / 0.78); border-radius: 20px; }
.md-chip[data-variant='filter']:not([data-selected]) { background: rgb(255 255 255 / 0.78); }
.md-card-container { backdrop-filter: blur(18px); box-shadow: 0 14px 34px rgb(62 44 150 / 0.12), inset 0 0 0 1px rgb(255 255 255 / 0.7); }
.md-button[data-color='filled'][data-variant]:not([data-disabled]) > .md-elevation { opacity: 1; box-shadow: 0 10px 22px rgb(90 63 214 / 0.36); }`,
  },
];

const ruleFor = (id: string, tokens: Record<string, string> = {}) => `[data-theme-name="${id}"] [data-theme] {${Object.entries(tokens).map(([k, v]) => `${k}:${v};`).join('')}}`;
const scoped = (id: string, css = '') => css.replace(/^(.+) \{/gm, (_, sel: string) => `${sel.split(/,(?![^(]*\))/).map((s) => `[data-theme-name="${id}"] ${s.trim()}`).join(', ')} {`);

const theme = themes.find((t) => t.id === 'graphite')!;

function App() {
  return (
    <div data-theme-name={theme.id}>
      <style>{`${ruleFor(theme.id, theme.tokens)}\n${scoped(theme.id, theme.css)}`}</style>
      <Material>
        <main className="screen" style={{ display: 'grid', gap: 16, minHeight: '100vh', boxSizing: 'border-box', padding: 16, alignContent: 'start', color: 'var(--md-sys-color-on-surface)', fontFamily: 'var(--md-sys-typescale-body-large-font)' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 500 }}>Budget used</h1>
          <Card variant="filled">
            <div style={{ display: 'grid', gap: 12, padding: 18 }}>
              <strong style={{ fontSize: '2.125rem', fontWeight: 500 }}>64%</strong>
              <ProgressIndicator aria-label="Budget used" value={64} />
              <Button size="medium">Open details</Button>
            </div>
          </Card>
        </main>
      </Material>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
