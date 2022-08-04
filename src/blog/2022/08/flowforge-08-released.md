---
title: FlowForge 0.8 released
subtitle: Inter-Project Communication, Default Teams, and realtime device management.
description: Inter-Project Communication, Default Teams, and realtime device management.
date: 2022-08-04 12:00:00.0
authors: ["sam-machin"]
video: nCe_qs0G6ZQ
---

Easily pass messages between your projects on the cloud or devices, UX improvements, and more.

<!--more-->

Keep reading for  the details of whats in this release our you can watch our 1 min roundup video of the new release above. 

We're pleased to announce version 0.8 is now available. The next release of the FlowForge application containing new features, a number of improvements, and bug fixes.

## Features
[Project Link Nodes](https://github.com/flowforge/flowforge/issues/662)
We've introduced our first custom FlowForge nodes to the palette of new projects. The Project Link nodes allow you to easily pass data between different projects within the same team. 
These projects can be running in the cloud or on devices, with the communication powered by our own internal MQTT broker.
Try these out today on FlowForge Cloud by creating a new project or updating your existing project's stack. There's more information in the [README](https://github.com/flowforge/flowforge-nr-project-nodes/blob/main/README.md) for the nodes.
For local installs of FlowForge, the nodes are only available with an Enterprise Edition license.
![](../images/ProjectLink.gif)


[Start & Stop Flows](https://github.com/flowforge/flowforge/issues/839)
Node-RED 3.0 [introduced a new feature](https://nodered.org/blog/2022/07/14/version-3-0-released#editing-stopped-flows) that allows you to stop your flows from processing requests while still being able to work in the editor and deploy changes. We've now enabled this feature within FlowForge for projects running a Node-RED 3.x stack.

[Default Team](https://github.com/flowforge/flowforge/issues/298)
If you are a member of multiple teams you can now set your preferred default saving you from having to change teams each time you log in.

## Improvements
We've made a number of improvements to the overall experience of running FlowForge.

- Devices now communicate to the Forge application over MQTT instead of polling [#754](https://github.com/flowforge/flowforge/issues/754). You'll need to update your Device Agent to the latest version to take advantage of this.
- The table views have had a major overhaul allowing you to sort and search items [#28](https://github.com/flowforge/forge-ui-components/issues/28)
- If the application receives an error you now see a notification in the UI. [#771](https://github.com/flowforge/flowforge/issues/771)
- The Verification email page has been cleaned up [#718](https://github.com/flowforge/flowforge/issues/718)
- The initial Thank-you page has been cleaned up [#648](https://github.com/flowforge/flowforge/issues/648)

## Bug Fixes
We've fixed the following bugs in this release.
- [Logo Distorted in Safari](https://github.com/flowforge/flowforge/issues/793)<br>
- [LocalFS Install doesn't check for Build Tools](https://github.com/flowforge/flowforge/issues/729)<br>
- [Users with Expired passwords can create teams](https://github.com/flowforge/flowforge/pull/842)<br>
- [Click-jacking Vulnerability](https://github.com/flowforge/flowforge/pull/790)
- [Users with can create teams without verifying email](https://github.com/flowforge/flowforge/pull/824)<br>
- [Occasional Timeout when deploying flows](https://github.com/flowforge/flowforge-nr-storage/issues/17)<br>
- [Notification of member deletion contains internal ID](https://github.com/flowforge/flowforge/issues/833)<br>
- [Pressing Enter in the Team Delete modal triggers cancel](https://github.com/flowforge/flowforge/issues/334)<br>
- [Node-Red Isn't ready when Forge app says it is running (Docker)](https://github.com/flowforge/flowforge/issues/751)<br>

## Contributors
We'd like the thank the following for their contributions to this release.
[HaroldPetersInskipp](https://github.com/HaroldPetersInskipp) made their first contribution in https://github.com/flowforge/flowforge/pull/812<br>
[Steveorevo](https://github.com/Steveorevo) made their first contribution in https://github.com/flowforge/flowforge/pull/818

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 0.8 and the stacks updated. Upgrade your project stacks to the latest version and start using the Project Link nodes now.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading FlowForge on a local server](http://flowforge.com/docs/install#upgrade).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowForge Cloud can raise a ticket by emailing support@flowforge.com

We also have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
