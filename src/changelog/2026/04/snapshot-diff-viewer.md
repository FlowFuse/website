---
title: Richer snapshot comparison view
description: The snapshot comparison dialog now gives a full breakdown of every change between two snapshots, navigate node by node and see exactly what was added, removed, or modified.
date: 2026-04-07 12:00:00
authors: ["andrea-palmieri"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/7025
  - https://github.com/FlowFuse/flowfuse/issues/7029
---

Previously, comparing snapshots only showed the two flow canvases overlaid at different opacities. You could see that something had changed, but not what or where.

Now when you compare two snapshots, a sidebar lists every changed, added, and deleted node. You can step through them one at a time, the canvas highlights and scrolls to the relevant node automatically. For each change you can see:

- **Property diffs**: each changed property is shown inline with the old and new value side by side.
- **Code diffs**: for function and template nodes, code changes appear as a line-level diff with red for removed lines and green for added, the same format you'd expect from a git diff.

Use the Prev / Next buttons or the ← → arrow keys to navigate through changes.

<lite-youtube
  videoid="cNdGB-gksfQ"
  params="rel=0"
  style="width: 100%; aspect-ratio: 16/9;"
  title="Snapshot Comparison, FlowFuse v2.29">
</lite-youtube>

For the first time, teams can review a snapshot diff before deployment and actually trust what they're seeing, not just look at it.

This feature is available to all FlowFuse Cloud and Self Hosted users from v2.29.
