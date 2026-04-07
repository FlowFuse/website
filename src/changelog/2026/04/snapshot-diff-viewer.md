---
title: Snapshot diff viewer improvements
description: Comparing snapshots now shows a readable, line-level diff for every changed property — including code in function and template nodes.
date: 2026-04-07 12:00:00
authors: andypalmi
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/7025
  - https://github.com/FlowFuse/flowfuse/issues/7029
---

You can now compare two snapshots and see exactly what changed — property by property, line by line.

Previously, the snapshot comparison dialog showed differences as raw text strings. When a function node's code changed, you'd see the entire old body and the entire new body dumped side-by-side with no way to tell what actually moved. The same was true for template nodes, configuration values, and any other multiline property.

Now, each changed property gets its own panel:

- **Code diffs** (function body, template HTML, init/finalize scripts) display as a proper line-level diff with red lines for removed code and green for added — the same format developers expect from git.
- **Structural properties** (wires, position, node type, enabled/disabled state) appear inline in a compact old → new format so you can scan them at a glance.
- **Unchanged context lines** are collapsed by default and can be expanded with a click.

Navigation has also been improved. The Prev and Next buttons now sit side-by-side so you can step through changes quickly without moving your mouse across the screen. You can also use the ← and → arrow keys to navigate.

This feature is available to all FlowFuse Cloud users and Self Hosted users from the next release.
