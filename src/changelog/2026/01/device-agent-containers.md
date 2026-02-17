---
title: Device Agent Docker Containers updated
description: Expanding the available NodeJS versions available
date: 2026-01-27 12:00:00.0
authors: ['ben-hardill']
tags:
  - changelog
issues:
  - "https://github.com/FlowFuse/device-agent/issues/555"
---
We have started to see some Node-RED nodes dropping support for NodeJS v18. This is causing problems for users of our Device Agent docker container as that is still based on NodeJS v18.

To help move things forward, with the v3.7.2 release of the Device Agent, we are now publishing separate container images for both v18 and v20 under different tags.

The `latest` tag will continue to point to the NodeJS v18 version for now for backwards compatibility. The next major release of the device agent will update the `latest` tag to a newer NodeJS version - and may require a migration step if you are using the module cache feature. We'll share more details when that release arrives.

With this update, the following tags are now available:

## NodeJS 18

- flowfuse/device-agent:latest
- flowfuse/device-agent:latest-18
- flowfuse/device-agent:v3.7.2
- flowfuse/device-agent:v3.7.2-18

## NodeJS 20

- flowfuse/device-agent:latest-20
- flowfuse/device-agent:v3.7.2-20