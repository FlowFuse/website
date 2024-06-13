---
title: Snapshot Upload
description: FlowFuse now supports uploading application and device snapshots across instances, enhancing flexibility in managing Node-RED versions and configurations.
date: 2024-05-21 13:03:00.0
authors: ["stephen-mclaughlin"]
tags:
    - changelog
---

[Snapshots](/docs/user/snapshots/#snapshots) are a point-in-time backup of Node-RED
that can be used to easily revert back to previous version, or to push out to other
instances and devices as part of our Pipelines feature.

Following on from the recent work around snapshots to permit [Instance Snapshot Downloads](/changelog/2024/05/snapshot-improvements) and [Snapshot Uploads](/changelog/2024/05/snapshot-upload),
we have now added the ability to download application device snapshots. 

This means you can download a snapshot from any device or instance and upload it to any
device or instance on any FlowFuse instance.

Also, to improve access to these actions, we have also updated the application
and device snapshot table items menu to present all relevant snapshot actions.

#### Application Snapshots
![Application Snapshots Table Menu](./images/application-snapshots-menu.png)

#### Instance Snapshots
![Instance Snapshots Table Menu](./images/instance-snapshots-menu.png)

#### Device Snapshots
![Device Snapshots Table Menu](./images/device-snapshots-menu.png)