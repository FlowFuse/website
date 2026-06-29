---
title: Device Agent v4 released
subtitle: Updated Node.js, JSON logging, bearer token auth, and a more secure container runtime.
description: Device Agent v4 ships with Node.js 22 as the default runtime, structured JSON logging, bearer token authentication, and a hardened container security model. This is a major release with breaking changes - read on to know what to update before upgrading.
date: 2026-06-29
authors: ["nick-oleary"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/device-agent/issues/650
---

Device Agent v4 is a major release. It brings a modern Node.js runtime, structured logging for production observability, a new authentication method, and a more secure container deployment model. There are breaking changes - check the [upgrade notes](#upgrading-to-v4) before updating your remote instances.

<!--more-->

## Node.js 22 is now the default runtime

The Device Agent installer and official Docker image now default to Node.js 22. Node.js 20 reached end-of-life in April 2026, and continuing to ship it as the default would leave devices running on an unsupported runtime without security patches. It is also the minimum version required by Node-RED v5.


{% caution %}
**Breaking change:** The Device Agent Docker image tagged `latest` now uses a Node.js 22 base image. If you do not pin your container image to a specific version tag, review your deployment configuration before upgrading.
{% endcaution %}

We also continue to build, and tag, containers for a range of Node.js versions - 18, 20, 22 and 24.

If you use the Device Agent installer, it will now default to Node.js 22. Existing installations using the installer will need to download the latest version and re-run the installer.

## Containers now run as an unprivileged user

The Device Agent Docker container no longer runs as the root user. Following best practices, processes inside the container now execute as an unprivileged user.

{% caution %}
**Breaking change:** If your container deployment mounts volumes or relies on file permissions set for the root user, you'll need to update those permissions to match the new unprivileged user.

More details are available in the [Device Agent readme](https://github.com/FlowFuse/device-agent/tree/edf987872b7c93170b5ced56061b211619e7e106#docker).
{% endcaution %}

This is a security hardening change with no functional impact on normal Device Agent operation.

## Structured JSON logging

The Device Agent now supports a JSON logging format, selectable via the `--log-format json` CLI flag.

Previously, all agent output was plain-text - readable in a terminal but difficult to ingest reliably into log aggregation tools like Grafana Loki, Elastic, or AWS CloudWatch. Parsing unstructured log lines with regex is fragile and breaks whenever the message format changes.

With JSON logging enabled, every log entry is a machine-readable object with consistent fields. Pipe agent output directly into your existing observability stack without any custom parsing rules.

```
device-agent --log-format json
```

## Bearer token authentication

The Device Agent now supports bearer tokens as an authentication method for HTTP endpoints, alongside the existing credential model.

This allows you to create HTTP endpoints in your Node-RED flows that can be accessed securely by other applications without needing to manually authenticate first. This is a capability we've had in Hosted Instances for a while - this release makes it available to Remote Instances as well.

You can configure the tokens via the FlowFuse dashboard for your remote instance under the `Settings->Security` section. Enable the `FlowFuse User Authentication` option, then you can create and manage the tokens.

This requires the FlowFuse v2.32 release, coming later this week, when running in a self-hosted environment, but already available on FlowFuse Cloud.


## Editor theme fix

A bug caused the FlowFuse editor theme to fail to load in certain configurations - particularly when switching between Node-RED 5 and legacy versions. This is now resolved. The correct theme loads regardless of which Node-RED version the device is running.

---

## Upgrading to v4

Before upgrading, check the following:

**Docker users:** The `latest` container image now uses a Node.js 22 base and runs as an unprivileged user. Review volume mount permissions and update any configurations that assume a root user or an earlier Node.js version. Details available in the [Device Agent readme](https://github.com/FlowFuse/device-agent/tree/edf987872b7c93170b5ced56061b211619e7e106#docker).

**Installer users:** Download the latest version of the installer and re-run it if you want to stay aligned with the new default.

---

Device Agent v4 is available now. Update via the [Device Agent installer](https://github.com/FlowFuse/device-agent) or pull the latest Docker image.