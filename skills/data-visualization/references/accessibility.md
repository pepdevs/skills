# Accessible charts and dashboard interactions

Use WCAG 2.2 AA as the baseline unless the product specifies a stronger target.
Check the actual rendered text, marks and controls; a palette result is only one input.
The linked W3C Understanding pages explain the criteria, their scope and exceptions.

## Contrast and meaning

| Element | Check |
|---|---|
| Normal text, including tick labels and status values | At least 4.5:1 against its background |
| Large text | At least 3:1; WCAG defines large as 18pt regular or 14pt bold |
| Essential graphical objects and visual control/state cues | At least 3:1 against adjacent colours, subject to the criterion's exceptions |

Calculate from the final colours, including opacity composited onto the actual surface.
Test supported themes and interaction states. Check text inside a segment against that segment.
Do not round a ratio upwards to meet a threshold.
Very thin marks can remain difficult to see despite a nominal contrast pass.
See [text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

Reinforce colour through labels, position, shape or pattern.
A low-contrast graphic may be redundant when an equivalent accessible representation supplies its full information.
A category name alone does not replace the values and relationships carried by a chart.
An alternative table does not remove the contrast requirements of visible text or interactive controls.
See [use of colour](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

## Equivalent information

Give a complex chart an accessible name and a concise description of its purpose or main finding.
Provide further text or a structured table for essential values, scales, relationships and trends.
Associate the description with the chart and make its location discoverable.
A table is particularly useful for lookup; a short explanation can convey a trend more efficiently.
A simple stat already expressed as accessible text needs no duplicate table.
See [W3C complex image guidance](https://www.w3.org/WAI/tutorials/images/complex/).

## Interaction

Make filters, tabs, sorting, chart selection and drilldowns keyboard operable.
Provide visible focus, meaningful names and an intelligible focus order.
Inspect table headers and announced sort state, plus chart descriptions with a screen reader when available.
Use an accessible record list or table to avoid thousands of individual chart tab stops.
See [keyboard access](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)
and [focus visibility](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

Tooltips are optional. When used, expose their information to keyboard and touch users.
Custom hover/focus content must be hoverable and persistent, and dismissible where the criterion requires it.
Support Escape when the tooltip obscures other content; preserve focus when it closes.
Use persistent detail for information that users need to compare or act on.
See [content on hover or focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html).

For pointer actions, target 24 by 24 CSS pixels or the spacing/equivalent-control exceptions in WCAG 2.5.8.
Expand hit regions independently of visual marks where practical.
Dense plots may use selection aids and equivalent controls rather than overlapping hit boxes.
See [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

## Reflow and updates

Check reflow at 320 CSS pixels, equivalent to a 1280px viewport at 400% zoom.
Surrounding navigation, filters and explanations must remain reachable without two-dimensional scrolling.
Some charts and tables require two-dimensional layout; scope the exception to those regions.
Also check 200% text resizing. Component scrolling is a workspace preference, not a reason to clip content.
See [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

Keep focus and selection stable during refresh, and identify loading, stale and failed states.
For automatic updates presented alongside other content, provide the required pause, stop, hide or frequency control unless essential.
See [pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).
