---
title: No more @flowforge/flowforge-device-agent releases
description: "The FlowFuse Device agent will no longer update the old package name"
date: 2025-09-16 12:00:00.0
authors: ['ben-hardill']
tags:
 - changelog
---

When we changed company name from FlowForge to FlowFuse we continued to publish the Device Agent under the old package name `@flowforge/flowforge-device-agent` as well as the new package name `@flowfuse/device-agent`.

The current version 3.6.1 will be last release under the old package name.

The latest version can be found on npmjs.org [here](https://www.npmjs.com/package/@flowfuse/device-agent).

To upgrade please uninstall `@flowforge/flowforge-device-agent` using

```
npm uninstall -g @flowforge/flowforge-device-agent
```

(You may need to prefix this command with `sudo` on Unix platforms)

and install `@flowfuse/device-agent`.

```
npm install -g @flowfuse/device-agent
```

(again you may need to prefix this with `sudo` on Unix platforms)


The replacement package includes a migration binary called `flowforge-device-agent` which can still be used to start the new package.