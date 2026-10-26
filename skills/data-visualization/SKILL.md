---
name: data-visualization
description: 'Design and review charts, analytical tables, and operational dashboards around the questions they answer. Use for dashboard layout, visual comparisons, evidence drilldowns, filter navigation, and chart colour choices in an existing app or a standalone report.'
---

# Data visualization

Build a clear answer to the reader's question, with a path to its supporting evidence.
Preserve the host application's components, router, typography, tokens and supported themes.
Keep domain calculations and source semantics in the application.

## How to apply this guidance

| Level | Meaning |
|---|---|
| Requirements | Preserve evidence, interaction correctness and applicable accessibility criteria. Verify these before delivery. |
| Design heuristics | Choose according to the reader's task, data and display. Explain meaningful tradeoffs. |
| Preferred defaults | Use when the project has no established equivalent. Adjust to the product and user. |

Dashboards: read [references/dashboards.md](references/dashboards.md) before arranging pages or changing navigation.
Chart selection: read [references/choosing-a-form.md](references/choosing-a-form.md) when choosing a visual answer.
Accessibility: read [references/accessibility.md](references/accessibility.md) when implementing charts or reviewing their interactions and contrast.
Visual defaults: read [references/visual-defaults.md](references/visual-defaults.md) when selecting colours or mark styling.
Standalone files: read [references/standalone-html.md](references/standalone-html.md) only for portable HTML delivery.
Report style: read [references/report-style.md](references/report-style.md) when choosing visual defaults for a standalone report or dashboard without its own visual system.

## Method

1. Name the reader's question, next action, scope, units and evidence needed.
   For a redesign, inventory useful behaviours before changing presentation.
2. Choose the comparison and visual form. Distinguish monitoring from exploration and explanation.
3. Establish truthful scales, comparison periods and unknown states.
4. Apply the project's visual system. Use colour to identify, order, emphasise or communicate status.
5. Check contrast and interaction accessibility in the rendered context.
   Use palette simulation as a diagnostic alongside labels, shapes and browser inspection.
6. Follow a representative question through the actual browser, including detail and return navigation.
7. Evaluate whether the intended reader reaches the correct answer using [references/review-scenarios.md](references/review-scenarios.md).
   Report separately what was checked mechanically, inspected by the agent and tested with a user.

## Requirements

- Preserve units, populations, reporting windows and selected navigation state across related views.
- Distinguish missing evidence from measured zero. Keep partial coverage and material limitations visible.
- Keep entity colours stable across filters and related views. Recheck distinguishability when combinations change.
- Give meaning a non-colour encoding. Provide an accessible description and equivalent evidence for complex charts.
- Check text, essential graphical objects and controls against their actual adjacent colours and supported themes.
- Make chart actions keyboard operable, with visible focus and reachable content at zoom.
- Insert source labels through text nodes or escaped framework bindings. Treat source text as untrusted data.

The accessibility reference defines the WCAG criteria and relevant exceptions; this checklist alone is not a conformance audit.

## Design heuristics

- Prefer aligned position and length when readers need accurate magnitude comparisons.
- Use zero baselines for ordinary magnitude bars and filled areas. Choose line/scatter ranges for the analytical question.
- Prefer separate aligned charts to unrelated dual axes. Label units and comparisons explicitly.
- Keep frequent tasks and decision-critical evidence visible. Disclose secondary detail through clearly labelled controls.
- Use direct labels where they fit. Add a legend where identity remains unclear or it supplies useful interaction.
- Use tooltips when they add useful detail. Keep essential information available through an accessible persistent alternative.
- Use sequential palettes with ordered lightness; they may contain one or several hues.
  Centre diverging palettes on a meaningful reference value and distinguish their two directions.
- Add a concise title or annotation when it helps explain the result. Recompute claims when filters change.
- Use the fewest visual distinctions the task needs. Preserve important exceptions when grouping categories.

These heuristics follow the task-oriented guidance in [Tableau](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm),
[NN/g](https://www.nngroup.com/articles/dashboards-preattentive/) and [ONS](https://service-manual.ons.gov.uk/data-visualisation/guidance/dashboards).
Specific chart and accessibility decisions have sources in their references.

## References

| File | What it answers |
|---|---|
| [choosing-a-form.md](references/choosing-a-form.md) | Comparisons, scales, composition and dense series |
| [dashboards.md](references/dashboards.md) | Questions, layout, routing, tables and evidence semantics |
| [accessibility.md](references/accessibility.md) | Contrast, chart alternatives, keyboard, tooltips and reflow |
| [visual-defaults.md](references/visual-defaults.md) | Optional palette and styling; colour diagnostic limits |
| [anti-patterns.md](references/anti-patterns.md) | Failure symptoms and corrective decisions |
| [standalone-html.md](references/standalone-html.md) | Portable HTML delivery, offline data and file navigation |
| [report-style.md](references/report-style.md) | Optional report shell, type, surfaces, status marks and delivery checks |
| [review-scenarios.md](references/review-scenarios.md) | Task acceptance and scenarios that challenge these rules |
| [validate-palette.mjs](scripts/validate-palette.mjs) | Palette diagnostics and exported contrast calculation |
