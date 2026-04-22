---
title: A More Integrated Immersive Editor
description: The immersive editor drawer is now pinnable, switchable, and resizable — with your preferences saved between sessions.
date: 2026-04-22 12:00:00
authors: ['noley-holland']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/6267
---

The drawer in the immersive editor no longer floats over your flow canvas. It now sits inside the editor layout, and you control how it behaves:

![Pinning, moving, and full-screening the immersive editor drawer](./images/immersive-ui-drawer.gif){data-zoomable}
*Pin, switch sides, or go full-screen from the drawer header — your settings persist between sessions.*

- **Pin the drawer** to keep it alongside the canvas instead of floating over it — the Node-RED editor resizes to make room.
- **Move it to the left or right** side of the screen to suit your workflow.
- **Go full-screen** to hide the FlowFuse topbar and give the canvas maximum space.
- **Resize the drawer** to whatever width works best for you.

The drawer opens by default the first time you visit the editor. After that, your browser remembers every choice you make — open or closed, side, width, pinned, full-screen — between sessions.

This feature is available to all FlowFuse Cloud users and Self Hosted users from v2.30.
