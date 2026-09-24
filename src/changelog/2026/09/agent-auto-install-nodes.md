---
title: Agents install FlowFuse and certified nodes for you
description: Agents can now install FlowFuse-scoped plugins and certified nodes on their own, instead of stopping to send you to the palette manager.
date: 2026-09-24
release: "3.1"
authors: ["andrea-palmieri"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/8480
---

Agents can now install FlowFuse-scoped plugins and certified nodes on their own while they build. Ask FlowFuse Expert, or your Agent connected to FlowFuse MCP, to build a flow, and it installs the nodes it needs the moment the flow calls for them and carries straight on, so you get a working flow in one pass instead of stopping to install a package by hand.

We vet FlowFuse-scoped plugins and certified nodes ourselves, which is what makes this safe to automate. Every other package still goes through the palette manager for you to approve, so an agent never puts code you haven't chosen into a running instance. You stay in control of exactly what runs.

This feature is available to all FlowFuse teams on FlowFuse Cloud now and Self Hosted from FlowFuse v3.1.
FlowFuse is fully integrated with AI Agents. See [what agents can do](/docs/user/mcp/) and how to [connect your own agent](/docs/user/expert/third-party-agents/).
