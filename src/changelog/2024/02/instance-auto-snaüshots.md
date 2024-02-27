---
title: Instance Auto Snapshots
date: 2024-02-28 13:00:00.0
authors: ["marian-demme"]
tags:
    - changelog
---

Two weeks ago, we introduced [auto snapshots for devices](./device-auto-snapshot.md). Starting today, auto snapshots are also generated for hosted instances.

When you deploy a change to the device flows, a snapshot will be taken automatically. The last 10 auto snapshots will be kept on a first-in, first-out basis. Older auto snapshots will be automatically cleaned up for you.

Click the following links to learn more about [instances](https://flowfuse.com/docs/user/concepts/#instance) and [snapshots](https://flowfuse.com/docs/user/snapshots/#snapshots).
