---
title: FlowFuse User Authentication on Remote Instances
description:
date: 2025-02-13 12:00:00.0
authors: ['nick-oleary']
tags:
  - changelog
---

With the 3.1.1 release of the FlowFuse Device Agent, we've added two important pieces of new functionality.

### FlowFuse User Authentication

It is now possible to enable end-point security on the instance. In the same way you can for Hosted Instances,
you can now configure Basic Username/Password authentication or the more powerful FlowFuse User Authentication.

This means you can serve up your dashboards on remote Instances confident that only users in your FlowFuse team can access them.

### Modifying settings in Developer Mode

Whilst a remote instance is in developer mode, you can access the Node-RED editor through the FlowFuse platform. This
is a great way to develop your flows on real hardware through the platform.

A common developer task is to want to modify environment variables, or change device settings (such as enabling the new
FlowFuse User authentication option).

Previously this would require taking the device out of developer mode in order to apply the changes. From a workflow, this required lots of additional steps for not a lot of benefit.

With the new release of the Device Agent, the agent will pick up any settings changes when it is restarted via the action menu in the FlowFuse UI. A small change, but a big improvement to the developer workflow.
