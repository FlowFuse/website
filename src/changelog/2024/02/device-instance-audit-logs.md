---
title: Device Instance Audit Logging
date: 2024-02-08 13:00:00.0
authors: ["stephen-mclaughlin"]
tags:
    - changelog
---

With the introduction of the Device Auditlog last month, now we collect and display the logging events from the Node-RED instance running on your device.

This brings closer parity with the logging you get from a hosted instance.

Additional Events Recorded in the Device Auditlog include:

- Context Key Deleted
- Node-RED Settings Updated
- Flows Reloaded
- Flow Deployed
- Nodes Installed
- Nodes Removed
- Library Item Saved

![Device Audit log](./images/device-auditlog.png)