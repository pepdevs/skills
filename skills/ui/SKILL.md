---
name: ui
description: 'UI: how a web app gets its look. The operator picks by eye from a static HTML prototype with a switch per open choice, the build matches the picked prototype side by side, and rules are written last from what built screens share. Use when designing, redesigning or building a screen in a web app.'
---

# UI

The operator picks a web app's look by eye on a prototype. The build matches the picked prototype.
A written rule records what two built screens share.

- **Operator**: the person who owns the app and picks its look.
- **Frontend document**: the file in the app's repository that records each screen's pick and the
  rules its screens share. Use the one the repository names. Create `docs/frontend.md` when it has
  none.

## Loop

Run one loop per screen or area, with one pull request each.

1. Capture the screen as it is today on a phone (390x844) and on desktop (1280x800).
2. List the choices the screen leaves open: its arrangement, its grouping, where a control sits,
   how detail opens. A screen that reuses only picked patterns has none. Go to step 7 for it.
3. Write one static HTML file that draws the screen with its real fields on invented data. Start
   from [assets/prototype.html](assets/prototype.html).
4. Give each open choice a segmented control with two or three options. Add a phone and desktop
   switch, and a light and dark switch. Set each control to the option you recommend.
5. Publish the file where the operator can open it on a phone, and send the link. Use the
   harness's page tool, such as Claude's Artifact, or the static host the operator names.
   Screenshot the options you recommend.
6. Wait for the pick. The operator answers with option names, and the pick stands over your
   recommendation. Record the pick and the prototype's link in the app's frontend document.
7. Build the screen in the app from the app's own component copies.
8. Capture the built screen on phone and desktop, in light and dark, on seeded invented data.
9. Put each capture beside the prototype's screenshot of the picked options. Fix each difference,
   or list it with the reason it stays.
10. Present the captures and the list. The screen is done when the list names every difference a
    reader can see between a capture and the prototype.

A subagent's brief for step 7 names the prototype file, the picked options and the prototype's
screenshots. Run steps 8 to 10 yourself on what it returns.

## First screen of an app

The first loop also picks the look. Give the ground, the card, the primary colour, the typeface,
the density and the corner radius a switch each on the first prototype. Write the picked values as
tokens in one theme file. Later prototypes use those tokens and carry switches for layout only.

An owner who already has a theme names it in their own instructions. Copy that theme file into the
app, and give the first prototype switches for layout only.

## Components

- **Copies the app owns.** Start from shadcn-style component files in the app's own folder, styled
  by the theme file's tokens.
- **App first.** A new component lands in the app that needs it. Move it to a shared registry when
  a second app needs it.
- **Old screens keep working.** A screen on an older library stays inside the new shell until its
  own loop redraws it. One block maps the theme's tokens onto the old library's variables. Delete
  the block and the library with the last old screen.

## Phone and desktop

Start each prototype from these arrangements. The operator's pick stands over them.

- Draw two arrangements. A phone has one column, its sections behind a segmented control, and
  navigation at the bottom. A desktop has a board: the title, the period control and the section
  control in one row, cards side by side, and a navigation rail.
- Try widths to find the narrowest one the board holds. Use the phone arrangement below it.
- Detail opens in a pane beside its list on desktop. On a phone it takes the page, with Back.

## Rules

Write a rule after two built screens share it. Put it in the app's frontend document when it
belongs to that app, and in your copy of this skill when a second app follows it.
