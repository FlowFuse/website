---
title: Device Agent Docker Containers
description: Expanding the available NodeJS versions available
date: 2026-01-27 12:00:00.0
authors: ['ben-hardill']
tags:
  - changelog
issues:
  - "https://github.com/FlowFuse/device-agent/issues/555"
---

Starting with v3.7.2 of the Device Agent we are now producing 2 versions of the Docker container allowing a wider selection of NodeJS versions.

The change adds a NodeJS v20 container along side the existing NodeJS v18. This is to support Node-RED nodes that are starting to drop NodeJS v18 support.

You can tell them apart as the tag will have either a `-18` or `-20` suffix.

For now the `latest` tag will continue to point to the NodeJS v18 version but we will be looking to switch this to the NodeJS v20 build at some point in the future as well as adding more of the LTS NodeJS releases.

List of current tags:

## NodeJS 18

- flowfuse/device-agent:latest
- flowfuse/device-agent:latest-18
- flowfuse/device-agent:v3.7.2
- flowfuse/device-agent:v3.7.2-18

## NodeJS 20

- flowfuse/device-agent:latest-20
- flowfuse/device-agent:v3.7.2-20