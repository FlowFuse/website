---
title: Introducing Remote Agent Plugin
description: An easy way to get existing Node-RED instances connected to FlowFuse
date: 2026-10-23 12:00:00
authors: ["nick-oleary"]
release: "3.2"
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/nr-remote-agent/issues/2
---

The Remote Agent plugin is an alternative option to the full Device Agent way of managing remote Node-RED instances.

It is a plugin that can be installed into any Node-RED (4.1+), making it quick and easy to get an existing Node-RED connected to the platform without having to migrate to the Device Agent.

### Why another plugin?

The [Device Agent](https://flowfuse.com/docs/device-agent/overview/) is our main way of managing a remote Node-RED instance from the FlowFuse platform. As a standalone process, it has full control over Node-RED - installing, configuring and managing it all from one place.

Where you already have Node-RED installed, it isn't always a simple task to migrate over to the Device Agent. For example, when Node-RED is baked into the software stack provided by a device manufacturer.

To solve that problem, we've started work on the Remote Agent Plugin, as an alternative choice to the full Device Agent - and the first release is now available as [`@flowfuse/nr-remote-agent`](https://flows.nodered.org/node/@flowfuse/nr-remote-agent).

### Getting Started

It can be installed into Node-RED via the Palette Manager just like any other node, and then walks you through the process of registering it as a 'lite' Remote Instance on a FlowFuse platform. From there, you have access to the Node-RED logs, a record of audit events, and automatically captured snapshots of your flows whenever you deploy changes.

We'll be working to add more of the full Device Agent features to the plugin with each new release.

For more information on how to get started, check the [Remote Agent documentation](https://flowfuse.com/docs/device-agent/plugin/overview/).

If you want to follow the development work  you can find the [Remote Agent GitHub repository here](https://github.com/FlowFuse/nr-remote-agent).
