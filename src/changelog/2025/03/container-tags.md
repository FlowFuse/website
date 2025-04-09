---
title: Changes to tags for flowfuse/node-red
description: Updating what Node-RED version the latest tag points to
date: 2025-04-09 12:00:00.0
authors: ['ben-hardill']
tags:
 - changelog
---

As part of the upcoming FlowFuse 2.16.0 release, due on April 10th, we will be updating which
version the `latest` tag points to for the `flowfuse/node-red` containers.

This change will impact self-hosted Docker and Kubernetes installs that have not changed the default stack.

The `latest` tag currently points to the latest version of the FlowFuse Stack container but contains Node-RED version 3.0.2 and NodeJS 16. After the update it will contain Node-RED version 4.0.9 and NodeJS 20.

It will then continue to track the latest stable Node-RED version as they are released.

You can update the tag by creating a new version of the Stack under the Admin Settings -> Stacks page as a FlowFuse Admin user.

We make the following tags available which track the latest version of FlowFuse:

- `flowfuse/node-red:latest` as described above
- `flowfuse/node-red:latest-2.2.x` which contains Node-RED 2.2.2 NodeJS 16
- `flowfuse/node-red:latest-3.0.x` which contains Node-RED 3.0.2 NodeJS 16
- `flowfuse/node-red:latest-3.1.x` which contains Node-RED 3.1.15 NodeJS 18
- `flowfuse/node-red:latest-4.0.x` which contains Node-RED 4.0.9 NodeJS 20 (same as `flowfuse/node-red:latest`)

We also publish tags explicitly pinned to a FlowFuse version with the following format `<version>-<node-red-version>` e.g. `flowfuse/node-red:2.15.0-4.0.x` which would be FlowFuse 2.15.0 and Node-RED 4.0.x.