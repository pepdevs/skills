/**
 * Diagnose chart colours with local palette heuristics and contrast measurements.
 * Results are not a WCAG conformance or colour-vision safety certification.
 *
 * Categorical mode (default) checks:
 *   1. Lightness band      — OKLCH L inside the mode's band
 *   2. Chroma floor        — OKLCH C >= 0.10 (below it a hue reads as gray)
 *   3. CVD separation      — OKLab dE (x100) under simulated protanopia/deuteranopia
 *                            (tritan reported), all pairs by default
 *   4. Normal-vision floor — worst pair dE under unsimulated vision
 *   5. Contrast vs surface — WCAG ratio of each mark against the chart surface
 *
 * Ordinal mode (--ordinal) checks a local single-hue style: monotone lightness,
 * adjacent dL >= 0.06, lightest step >= 2:1 on the surface, one hue family.
 *
 * Usage:
 *   node validate-palette.mjs "#2a78d6,#008300,..." --mode light
 *   node validate-palette.mjs "#3987e5,#008300,..." --mode dark --surface "#1a1a19"
 *   node validate-palette.mjs "#2a78d6,#008300,#e87ba4" --pairs adjacent # fixed neighbours only
 *   node validate-palette.mjs "#cde2fb,#9ec5f4,#5598e7,#256abf" --ordinal
 *
 * Exit 0 when no local heuristic fails; warnings still require contextual review.
 * Check text, essential graphics, controls and equivalent information separately.
 * The ordinal 2:1 floor, distance and style thresholds are not WCAG requirements.
 */

// -- thresholds ---------------------------------------------------------------
const BAND = { light: [0.43, 0.77], dark: [0.48, 0.67] }; // OKLCH L
const CHROMA_FLOOR = 0.1;
const CVD_TARGET = 8.0, CVD_FLOOR = 6.0; // OKLab dE x100, min(protan, deutan)
const NORMAL_FLOOR = 15.0;               // OKLab dE x100, unsimulated vision
const CONTRAST_MIN = 3.0;                // WCAG vs surface
const ORDINAL_MIN_DL = 0.06, ORDINAL_LIGHT_FLOOR = 2.0;
const SURFACE = { light: "#fcfcfb", dark: "#1a1a19" };

// Machado, Oliveira & Fernandes (2009) CVD transforms at severity 1.0 (linear RGB).
// These simulations approximate colour vision. Changing the model changes the
// diagnostic's distance results; its thresholds are local heuristics.
const MACHADO = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
  tritan: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
};

// -- colour conversions -------------------------------------------------------
const isHex = (v) => /^#?[0-9a-fA-F]{6}$/.test(v);
const s2lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lin = (h) => [0, 2, 4].map((i) => s2lin(parseInt(h.replace(/^#/, "").slice(i, i + 2), 16) / 255));
const relLum = ([r, g, b]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

export const contrast = (a, b) => {
  const [hi, lo] = [relLum(lin(a)), relLum(lin(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

function oklabFromLin([r, g, b]) {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}
const oklab = (h) => oklabFromLin(lin(h));
const oklch = (h) => { const [L, a, b] = oklab(h); return [L, Math.hypot(a, b), (Math.atan2(b, a) * 180 / Math.PI + 360) % 360]; };

const simulate = (h, kind) => {
  const rgb = lin(h), M = MACHADO[kind];
  return M.map((row) => Math.max(0, Math.min(1, row[0] * rgb[0] + row[1] * rgb[1] + row[2] * rgb[2])));
};
const deltaE = (h1, h2, kind) => {
  const a = oklabFromLin(kind ? simulate(h1, kind) : lin(h1));
  const b = oklabFromLin(kind ? simulate(h2, kind) : lin(h2));
  return 100 * Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
};

// -- checks -------------------------------------------------------------------
export function validate(palette, { mode = "light", surface = SURFACE[mode], pairs = "all", ordinal = false } = {}) {
  const report = [];
  const n = palette.length;

  if (ordinal) {
    const Ls = palette.map((c) => oklch(c)[0]);
    const dirs = new Set(Ls.slice(1).map((L, i) => Math.sign(L - Ls[i])));
    report.push(["Monotone lightness", dirs.size === 1 ? "pass" : "fail",
      dirs.size === 1 ? `steps run ${Ls[0] > Ls[n - 1] ? "light to dark" : "dark to light"}` : "lightness reverses mid-ramp"]);

    const tight = Ls.slice(1).map((L, i) => [palette[i], palette[i + 1], Math.abs(L - Ls[i])]).filter(([, , d]) => d < ORDINAL_MIN_DL);
    report.push(["Adjacent dL", tight.length ? "fail" : "pass",
      tight.length ? `steps too close: ${tight.map(([a, b, d]) => `${a}<->${b} ${d.toFixed(3)}`).join(", ")}` : `all >= ${ORDINAL_MIN_DL}`]);

    const lightest = palette[Ls.indexOf(Math.max(...Ls))];
    const cLightest = contrast(lightest, surface);
    report.push(["Light-end contrast", cLightest >= ORDINAL_LIGHT_FLOOR ? "pass" : "fail",
      `${lightest} ${cLightest.toFixed(2)}:1 (floor ${ORDINAL_LIGHT_FLOOR})`]);

    const hues = palette.map((c) => oklch(c)[2]);
    const spread = Math.max(...hues) - Math.min(...hues);
    report.push(["Single hue", spread <= 40 ? "pass" : "fail", `hue spread ${spread.toFixed(0)} deg (max 40)`]);
    return { ok: report.every(([, s]) => s !== "fail"), report, mode, surface, kind: "ordinal" };
  }

  const [lo, hi] = BAND[mode];
  const off = palette.map((c) => [c, oklch(c)[0]]).filter(([, L]) => L < lo || L > hi);
  report.push(["Lightness band", off.length ? "fail" : "pass",
    off.length ? `outside band: ${off.map(([c, L]) => `${c} L${L.toFixed(2)}`).join(", ")}` : `all ${n} inside L ${lo}-${hi}`]);

  const gray = palette.map((c) => [c, oklch(c)[1]]).filter(([, C]) => C < CHROMA_FLOOR);
  report.push(["Chroma floor", gray.length ? "fail" : "pass",
    gray.length ? `reads gray: ${gray.map(([c, C]) => `${c} C${C.toFixed(2)}`).join(", ")}` : `all ${n} >= ${CHROMA_FLOOR}`]);

  const pairlist = pairs === "all"
    ? palette.flatMap((_, i) => palette.slice(i + 1).map((_, k) => [i, i + 1 + k]))
    : palette.slice(1).map((_, i) => [i, i + 1]);
  const label = pairs === "all" ? "all-pairs" : "adjacent";

  let worst = null;
  for (const kind of ["protan", "deutan"]) {
    for (const [i, j] of pairlist) {
      const d = deltaE(palette[i], palette[j], kind);
      if (!worst || d < worst[0]) worst = [d, kind, palette[i], palette[j]];
    }
  }
  const tritan = pairlist.length ? Math.min(...pairlist.map(([i, j]) => deltaE(palette[i], palette[j], "tritan"))) : 99;
  const wd = worst ? worst[0] : 99;
  report.push(["CVD separation", wd >= CVD_TARGET ? "pass" : wd >= CVD_FLOOR ? "warn" : "fail",
    worst ? `worst ${label} ${worst[2]}<->${worst[3]} dE ${wd.toFixed(1)} (${worst[1]}) - tritan ${tritan.toFixed(1)}` : "n/a"]);

  let nWorst = null;
  for (const [i, j] of pairlist) {
    const d = deltaE(palette[i], palette[j]);
    if (!nWorst || d < nWorst[0]) nWorst = [d, palette[i], palette[j]];
  }
  const nd = nWorst ? nWorst[0] : 99;
  report.push(["Normal-vision floor", nd >= NORMAL_FLOOR ? "pass" : "fail",
    nWorst ? `worst ${label} ${nWorst[1]}<->${nWorst[2]} dE ${nd.toFixed(1)}` +
      (nd >= NORMAL_FLOOR ? "" : ` - below local threshold ${NORMAL_FLOOR}; inspect distinguishability`) : "n/a"]);

  const low = palette.map((c) => [c, contrast(c, surface)]).filter(([, r]) => r < CONTRAST_MIN);
  report.push(["Contrast vs surface", low.length ? "warn" : "pass",
    low.length ? `below ${CONTRAST_MIN}:1; check essential graphics and equivalent information: ${low.map(([c, r]) => `${c} ${r.toFixed(2)}`).join(", ")}`
      : `all ${n} >= ${CONTRAST_MIN}:1`]);

  return { ok: report.every(([, s]) => s !== "fail"), report, mode, surface, kind: "categorical" };
}

// -- CLI ----------------------------------------------------------------------
const argv = process.argv.slice(2);
if (argv.length) {
  const flag = (name, fallback) => { const i = argv.indexOf(`--${name}`); return i === -1 ? fallback : argv[i + 1]; };
  const palette = (argv[0] || "").split(",").map((s) => s.trim()).filter(Boolean);
  const bad = palette.filter((c) => !isHex(c));
  if (!palette.length || bad.length) {
    console.error(bad.length ? `Not 6-digit hex: ${bad.join(", ")}` : "Usage: node validate-palette.mjs \"#hex,#hex,...\" [--mode light|dark] [--surface #hex] [--pairs all|adjacent] [--ordinal]");
    process.exit(2);
  }
  const mode = flag("mode", "light");
  const opts = { mode, surface: flag("surface", SURFACE[mode]), pairs: flag("pairs", "all"), ordinal: argv.includes("--ordinal") };
  if (!BAND[mode] || !isHex(opts.surface)) { console.error("--mode must be light|dark and --surface a 6-digit hex"); process.exit(2); }
  if (!["all", "adjacent"].includes(opts.pairs)) { console.error("--pairs must be all|adjacent"); process.exit(2); }

  const { ok, report, kind } = validate(palette, opts);
  console.log(`Palette diagnostic (${mode}, surface ${opts.surface}, ${kind}${opts.ordinal ? "" : `, ${opts.pairs}-pairs`}): ${palette.length} slots`);
  for (const [name, state, detail] of report) console.log(`  [${state.toUpperCase().padEnd(4)}] ${name.padEnd(22)} ${detail}`);
  console.log(ok ? "\n  -> no local heuristic failures; review warnings in context" : "\n  -> local heuristic FAILED; review palette, encoding and layout");
  console.log("  Not an accessibility certification. Check text, controls, essential graphics and equivalent information separately.");
  process.exit(ok ? 0 : 1);
}
