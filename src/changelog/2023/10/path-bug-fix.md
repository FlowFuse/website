---
title: Device Agent path bug fix
date: 2023-10-26 90:00:00.0
authors: ["marian-demme"]
tags:
    - changelog
---

Resolved a Device Agent bug that prevented the PATH environment variable from being passed to Node-RED instances, hindering the installation of nodes like node-red-serial-port when assigned to an application. For more details, see [GitHub Issue](https://github.com/FlowFuse/device-agent/issues/185).