---
title: Device Instance Audit Logging
description: "Device Instance Audit Logging: The Device Instance now logs Node-RED events on your device, providing enhanced visibility into flow updates and configuration changes."
date: 2024-02-08 13:00:00.0
authors: ["stephen-mclaughlin"]
tags:
    - changelog
---

With the recent introduction of the Device audit log, we've now updated the Device Agent to start logging events from the Node-RED instance running on your device.

This brings closer parity with the logging you get from a hosted instance.

The audit log events include details of the flows being updated, nodes being added or removed from the palette and other changes to the configuration.

Update to Device Agent v2.2 to start receiving the events.

![Device Audit log](./images/device-auditlog.png)