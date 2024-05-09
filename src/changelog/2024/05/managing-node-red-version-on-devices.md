---
title: Managing Node-RED versions on Devices
date: 2024-05-09 13:01:00.0
authors: ["nick-oleary"]
tags:
    - changelog
---

We have added the ability to manage the Node-RED version running on application-assigned
Devices within FlowFuse.

Ordinarily, a device will get its Node-RED version from the snapshot deployed to it. However,
for an Application-assigned device, you may not yet have a snapshot to deploy.

The new option, available under Device/Settings/Editor lets you pick what version
of Node-RED the device should use - overriding what is in the active snapshot.

For devices running v2.4.1 or later of the Device Agent, Node-RED will get updated
when the setting is saved. For older versions of the Device Agent, it will require
a new snapshot to be deployed to trigger the update.