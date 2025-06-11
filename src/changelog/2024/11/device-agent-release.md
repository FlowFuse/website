---
title: Device Agent 3.0 released
description: "New version of the Device Agent drops support for old Node.js versions"
date: 2024-11-08 13:00:00.0

authors: ["nick-oleary"]
tags:
    - changelog
---

The FlowFuse Device Agent is the piece of software we provide to manage Node-RED instances running anywhere outside of the FlowFuse platform.

Today we have released the latest version of the agent that now requires at least Node.js 18 to run. To reflect this change, we are releasing this as a new major version - 3.0.

We recognize that software update lifecycles can be a challenge in some environments. This is why we've held off dropping support for older Node.js versions for as long as we could. However, we have to balance that against ensuring we continue to keep the Device Agent up to date with the latest security fixes.

If your devices cannot be updated to the latest Node.js versions, then please ensure you stay on the 2.x release of the Device Agent until a time that you are able to update Node.js.

Details for upgrading to this release are available [in the documentation](https://flowfuse.com/docs/device-agent/install/#upgrading-the-agent).
