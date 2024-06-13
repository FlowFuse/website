---
title: Custom hostnames for your instances
date: 2024-06-05 13:00:00.0
authors: ["nick-oleary"]
tags:
    - changelog
---

Enterprise teams on FlowFuse Cloud can now configure their own subdomain to point
at their Node-RED application.

Within FlowFuse Cloud, Node-RED instances are reached by their provided url: `<name>.flowfuse.cloud`.

With this new option, it is possible to add a custom hostname for the instance that works alongside
the provided url.

For example, if you have built a [dashboard](https://dashboard.flowfuse.com) you can now configure your instance to make that available via `dashboard.example.com` or any other subdomain you own.

We only support subdomains at this time, but adding support for top-level domains is [on the roadmap](https://github.com/FlowFuse/flowfuse/issues/3982).

Read more on [how to setup custom hostnames](https://flowfuse.com/docs/user/custom-hostnames).