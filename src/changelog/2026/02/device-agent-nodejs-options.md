---
title: Set Node.js Options for Remote Instances
description: FlowFuse Device Agent v3.8.1 lets you pass Node.js command line arguments to Remote Instances, enabling custom heap sizes and private CA certificate support.
date: 2026-02-13 12:00:00.0
authors: ['ben-hardill']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/device-agent/issues/571
---

You can now pass Node.js command line arguments to Remote Instances running the FlowFuse Device Agent.

This is useful in two common situations: when your flows are memory-intensive and need a larger heap, or when your environment uses private CA certificates that Node.js does not trust by default.

### Configuring Node.js options

There are two ways to set these options.

**Via the device agent command line**, using `--node-options`. The argument can be specified more than once:
```bash
flowfuse-device-agent -c /opt/flowfuse-device-agent/device.yml \
    --node-options='--max-old-space-size=256' \
    --node-options='--use-openssl-ca'
```

**Via `device.yml`**, by adding a `nodeOptions` list:
```yaml
deviceId: xxxxxxx
forgeURL: https://app.flowfuse.com
token: xxxxxxxx
credentialSecret: xxxxx
nodeOptions:
  - '--max-old-space-size=256'
  - '--use-openssl-ca'
```

Note that the correct flag for private CA certificates depends on your OS: use `--use-openssl-ca` on Linux, or `--use-system-ca` on Windows and macOS.

This feature is available from Device Agent v3.8.1.