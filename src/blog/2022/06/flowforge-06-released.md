---
title: FlowFuse 0.6 released
subtitle: Adding Devices to the platform
description: Adding Devices to the platform
date: 2022-06-19 12:00:00.0
authors: ["nick-oleary"]
tags:
    - posts
    - flowfuse
    - releases
---

Node-RED is well known for its role in IoT solutions - which often means running
flows on devices.

This was something we always wanted to support in FlowFuse and with this release
we're taking the next steps in that direction.

<!--more-->

### Devices

This release includes the first alpha release of the [FlowFuse Device Agent](https://github.com/FlowFuse/device-agent). This is a small piece of node.js software that can be
installed on a device, such as a Raspberry Pi. It connects back to the FlowFuse
platform to get the Node-RED flows it should be running.

This builds on the work we added in 0.5 that lets you register the device,
generate credentials for it and pick which Project in your team it should be assigned
to.

It makes it super simple to start developing your flows in FlowFuse and push them
out to a group of devices with a couple clicks.

There's plenty of work still to come on the Devices feature. Under the covers
it uses an HTTP polling approach to check for updates. That was a pragmatic choice
to get something working - but it isn't our long term strategy. We'll be working
towards a more IoT-native MQTT/WebSocket appoach in the coming releases.

 - [Devices documentation](/docs/device-agent/introduction/)
 - [Epic #446 - Devices](https://github.com/FlowFuse/flowfuse/issues/446)

### Snapshots

This release adds the ability to create Snapshots of your projects. These are
point-in-time backups of your project's flows, credentials and settings.

With this release we support *creating* snapshots and pushing them to devices.

We don't have the ability to revert a project back to a previous snapshot, but
that will come soon.

 - [Snapshot documentation](/docs/user/snapshots/)
 - [Story #587 - Snapshot/Rollback](https://github.com/FlowFuse/flowfuse/issues/587)

### Other updates

Beyond these headline features, there are a number of smaller, but just as useful
items in this release.

We've continued with the rebranding work started in 0.5 with some more improvements
to the overall UX of the platform. Little touches like placeholder loading graphics
give the UI a more responsive feel.

When you log out of the platform we now also automatically log you out of any
Node-RED editor sessions you have open.

### Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 0.6 - ready for
you to start creating snapshots and adding devices right now.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading FlowFuse on a local server](/docs/upgrade/#upgrading-flowfuse).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).

That also includes if you have any feedback or feature requests.

We also have a `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
