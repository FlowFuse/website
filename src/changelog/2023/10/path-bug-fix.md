---
title: Device Agent path bug fix
description: "Fix: Device Agent now correctly passes the PATH environment variable to Node-RED instances, resolving issues with some of node installation when assigned to applications"
date: 2023-10-26
authors: ["marian-demme"]
tags:
    - changelog
issues:
    - "https://github.com/FlowFuse/device-agent/issues/185"
---

The Device Agent now passes the PATH environment variable to the Node-RED instances. Erroneously, the agent didn't capture it to expose to Node-RED again for usage. This prevented some nodes from being installed, like `node-red-serial-port` when assigned to an application.

