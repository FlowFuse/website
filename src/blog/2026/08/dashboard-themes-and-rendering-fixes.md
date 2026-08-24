---
title: "Dashboard 1.30.3: five themes, and widgets that render properly"
description: "Dashboard 1.30.3 ships five built-in themes, a dark mode that renders properly across every widget, and fixes for the defects that made a default dashboard look unfinished."
date: 2026-08-27
authors: ["noley-holland"]
image: /blog/2026/08/images/dashboard-1-30-3-tile.png
tags:
  - posts
  - news
  - flowfuse
  - dashboard
---

Dashboard 1.30.3 ships five built-in themes, including dark modes where every widget renders legibly. Alongside them are fixes for widgets that weren't using the space they were given: charts that drew nothing at their default size, button labels that clipped mid-word, gauges sliced off by their own card.

<!--more-->

Here's what changed.

## Five built-in themes

Choose Light, Dark, Dracula, Nord or Sepia from the theme dropdown. Every page, group and widget follows.

Until now you got one white-and-blue default. Changing it meant hand-editing ten theme values, or writing CSS against Vuetify class names to reach anything the theme didn't expose.

Dark wasn't just unavailable. It was broken. Build a dark dashboard before this release and native date and time pickers rendered black on black. Chart text sat at a contrast ratio you couldn't read across a desk. Icons stayed dark while the text around them flipped.

All five themes now meet WCAG AA contrast for text and icons. On the dark themes, date and time pickers, charts, gauges and markdown all render legibly.

![Switching between the five built-in themes — Light, Dark, Dracula, Nord and Sepia](./images/dashboard-themes.gif){data-zoomable}

Existing dashboards keep the theme they have. Nothing changes unless you pick a preset, and if you already built something dark by hand, it renders better than it did.

## Charts draw at their default size

Add a chart, leave the size at auto, deploy. You get a chart.

Previously you got a title and an empty box. A chart set to auto height collapsed to a single 48-pixel row, and since a chart has no natural height of its own, it drew nothing at all. The workaround was to guess pixel heights until something appeared. That assumed you'd worked out sizing was the problem, and the empty box gave you no clue.

## Button labels stay readable

A button labelled "Acknowledge compressor fault" now reads as "Acknowledge compressor fault". Long labels wrap or shrink to fit rather than clipping at both ends.

If your dashboard carries equipment names or fault descriptions, this is the fix you'll notice first.

## Gauges use the space they're given

Gauges no longer leave a band of dead space above them as the screen narrows, and the card edge no longer slices them off.

Three-quarter gauges size correctly on auto, and the needle dial draws at the right proportions. If you run gauges on a wall-mounted screen, they'll look deliberate rather than approximate.

## Tables show dates instead of numbers

Set a `ui-table` column to `date`, `time` or `datetime` and it renders as a readable date, formatted in the viewer's own locale.

A timestamp column used to show `1735689600000`. Getting a date out of it meant adding a function node to reformat every row before it reached the table, which also baked in one timezone. Formatting now happens in the browser, so someone in Stuttgart and someone in Detroit each see their own local time from the same flow.

![A ui-table column set to datetime rendering a readable, locale-aware date instead of a raw timestamp](./images/dashboards-table-timestamps.gif){data-zoomable}

See the [ui-table documentation](https://dashboard.flowfuse.com/nodes/widgets/ui-table.html) for the column types.

## Smaller fixes

- **Editing one theme changes only that theme.** Changing a colour used to change it on every theme not assigned to a page.
- **Tables render data at any size.** Previously a table only displayed rows when you set its layout to auto.
- **Text input renders correctly as a multi-line text area.** It used to render partially.

## Thank you to our contributors

This release includes a fix from **[waldbaer](https://github.com/waldbaer)**, who solved widget ordering inside subflows ([#710](https://github.com/FlowFuse/node-red-dashboard/issues/710)). Put a widget in a subflow where the group already held two others and you couldn't position it between them. It stuck to the top or the bottom whatever you did. waldbaer tracked it down and fixed it.

Thanks as well to everyone filing issues with reproduction steps and screenshots. Several fixes above came from reports that included exactly what we needed to reproduce the problem, [#151](https://github.com/FlowFuse/node-red-dashboard/issues/151), [#1607](https://github.com/FlowFuse/node-red-dashboard/issues/1607) and [#1772](https://github.com/FlowFuse/node-red-dashboard/issues/1772) among them. That saves us hours and it goes straight into what ships.

## Where Dashboard is going

Our goal is that you can build a real operator screen with Dashboard. The kind mounted next to a production line: glanceable, green when things are running, red when they aren't, readable from across the room. Today Dashboard builds a good data dashboard. It doesn't yet build an HMI.

Two things stand in the way, and they're what the next two releases are about.

**The first is that Dashboard is message-driven.** A widget shows whatever the last message told it, and shows nothing until one arrives. Fine on a laptop while you're building. A problem on a screen next to a machine, where an operator walks up mid-shift and needs the state of the line right now.

**Tags** fix that. Define a named, typed data point once, feed it from wherever your data comes from, and bind widgets to it. Dashboard holds the value server-side, so a page renders real state the moment it opens. Tags also carry what industrial data needs and messages don't: a type, a range, warning and alarm limits.

**The second is that you can only arrange widgets in a grid.** Every widget is a rectangle that flows into rows and columns. That works for a set of charts and readouts. It can't give you a picture of your process: three tanks with the pipes between them, a motor symbol that spins while it's running, a temperature sitting on top of the vessel it came from.

**Canvas** is a new page type you draw on. Drop shapes and industrial symbols wherever you want them, bind each one to a tag, and set rules like green in range and red out of range.

We're still working out the shape of both, including where tags should live. If you're running dashboards across machines, sites or lines, tell us what you'd bind, what you'd want stored, and what would have to be true for this to replace how you wire data today.

Tell us at PLACEHOLDER.

## Getting this release

Dashboard 1.30.3 is available now. Update `@flowfuse/node-red-dashboard` through the Node-RED palette manager, or run:

```bash
npm install @flowfuse/node-red-dashboard@latest
```

Dashboard is open source under Apache 2.0 and runs in any Node-RED instance.
