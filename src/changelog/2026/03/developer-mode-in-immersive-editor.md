---
title: Developer Mode Now Accessible from the Immersive Editor
description: The Developer Mode tab is now available directly in the immersive editor drawer, so you can manage snapshots and auto snapshot settings without leaving the editor.
date: 2026-04-07 00:00:00
authors: ['noley-holland']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/7031
---

The Developer Mode tab is now available directly in the immersive editor drawer when working with remote instances. You can toggle auto snapshot and create snapshots without leaving the editor.

![Developer Mode tab in the immersive editor drawer](./images/developer-mode-in-editor.png)
*The Developer Mode tab now appears directly in the immersive editor drawer, with options to create a snapshot and manage device flows.*

Previously, accessing Developer Mode meant opening a second browser window and navigating to the standalone device view, breaking your flow inside the editor and adding unnecessary friction, especially when working through a staged dev, test, and promote rollout.

This feature is available to Enterprise tier users of FlowFuse Cloud and Enterprise Licensed Self Hosted users from v2.29.
