---
title: Immersive Editor Experience
description: "Closer integration between the FlowFuse and Node-RED experiences"

date: 2024-07-02 13:00:00.0

authors: ["joe-pavitt"]
tags:
    - changelog
---

We found out that many users have to frequently switch between the Node-RED Editor and FlowFuse UI. This back-and-forth movement was often necessary to view logs, save snapshots, restart the Editor after updates, and perform other tasks.

We're always seeking to reduce friction in the FlowFuse user experience, and as such, we've introduced a large overhaul of the developer experience for Node-RED when running in FlowFuse, in what we're calling the "Immersive Editor".

![Node-RED Editor toolbar button for the assistant](/blog/2024/07/images/immersive-editor.png){data-zoomable}

Now, the instances tabs are all available in the same view as the Editor, and you can manage your instance, watch logs, capture snapshots and event restart it, all without leaving the Node-RED Editor.

The new Immersive Editor is available for instances running Node-RED 4.0.2 or later - older versions of Node-RED will still use the separate views.