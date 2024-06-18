---
title: Running the Device Agent behind an HTTP proxy
description: Running the Device Agent behind an HTTP proxy
date: 2024-06-18 13:00:00.0
authors: ["nick-oleary"]
tags:
    - changelog
---

The FlowFuse Device Agent allows you to manage your Node-RED instances wherever you want them to run.
It connects back to the platform over a secure https connection.

For some enterprise customers, that has posed a challenge as they protect their network with an HTTP proxy that all traffic
has to be directed to.

With the `2.5.0` release of the Device Agent, we now support running the Device Agent behind a proxy - letting it run in even more locations.

Support comes using the industry standard set of `http_proxy` environment variables - familiar to anyone running services behind a proxy.

Full details are available in our [http proxy documentation](https://flowfuse.com/docs/device-agent/running/#running-behind-a-http-proxy).

