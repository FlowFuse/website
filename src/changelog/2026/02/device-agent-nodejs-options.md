---
title: Set NodeJS Options for Remote Instances
description: Allowing NodeJS command line arguments to be set for Remote Instances
date: 2026-02-13 12:00:00.0
authors: ['ben-hardill']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/device-agent/issues/571
---

FlowFuse Device Agent v3.8.1 adds support for setting Node.js command line arguments for Remote Instances.

This for example allows for the NodeJS Heap Size to be set for flows that use large amounts of memory.

It also allows the `--use-openssl-ca` on Linux and `--use-system-ca` on Windows and OSx to pick up private CA certificates.

Node.js options can be configured in two ways:

### 1. Via the device agent command line

Use the --node-options argument. This argument may be specified multiple times:

    ```bash
    flowfuse-device-agent -c /opt/flowfuse-device-agent/device.yml \
    --node-options='--max_old_space_size=256' \
    --node-options='--use-openssl-ca'
    ```

### 2. Via the `device.yml` file

Add a `nodeOptions` section:

    ```yaml
    deviceId: xxxxxxx
    forgeURL: https://app.flowfuse.com
    token: xxxxxxxx
    credentialSecret: xxxxx
    nodeOptions:
      - '--max_old_space_size=256'
      - '--use-openssl-ca'
    ```