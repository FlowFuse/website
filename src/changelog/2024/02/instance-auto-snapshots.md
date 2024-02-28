---
title: Instance Auto Snapshots
date: 2024-02-28 13:00:00.0
authors: ["marian-demme"]
tags:
    - changelog
---

Two weeks ago, we introduced [auto snapshots for devices](./device-auto-snapshot.md) to help ensure you can always rollback to a previous version of your Node-RED flows. We're extended that ability to the hosted Node-RED instances as well.

Whenever you deploy a change to the flows, a snapshot will be taken automatically. We'll keep the last 10 auto-generated snapshots on a first-in, first-out basis. Older auto-generated snapshots will be automatically cleaned up for you - unless
they are marked as a target snapshot for your devices.

Click the following links to learn more about [instances](https://flowfuse.com/docs/user/concepts/#instance) and [snapshots](https://flowfuse.com/docs/user/snapshots/#snapshots).
