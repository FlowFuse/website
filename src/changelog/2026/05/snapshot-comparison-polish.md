---
title: More usable snapshot comparisons
description: A follow-up to the 2.29 diff viewer, with quieter diffs, node-type badges, JSON prettify and wrap toggles, and config-node highlighting fixes.
date: 2026-05-07 12:00:00
authors: ['andrea-palmieri']
tags:
  - changelog
issues:
---

Building on the property-level diff viewer that shipped in 2.29, snapshot comparison is quieter and clearer in 2.30, so the right information is more easily made available to you:

- Computed properties (group node `w` and `h` values) no longer flag as changes.
- Position-only changes are hidden by default.
- The change panel labels each entry with a node-type badge: config, tab, or normal.
- JSON sections support prettify and wrap toggles.
- Config-node highlighting clears between selections.

Powered by a `flow-renderer` 0.5.1 update with `persistentHighlight`, so the canvas stays in sync with the change panel as you step through.

This feature is available to all FlowFuse Cloud and Self-Hosted users from v2.30.
