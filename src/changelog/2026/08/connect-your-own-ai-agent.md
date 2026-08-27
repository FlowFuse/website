---
title: Connect your own AI agent to FlowFuse
description: The AI agent your team already uses can now work your platform and build Node-RED applications, with you deciding what it may reach.
date: 2026-08-27 12:00:00
release: "3.0"
authors: ["serban-costin", "andrea-palmieri", "stephen-mclaughlin"]
tags:
- changelog
issues:
- https://github.com/FlowFuse/flowfuse/issues/8192
---

You can now connect your own AI agent to FlowFuse. Your company-approved AI can manage your platform and build Node-RED applications for you.

Add the FlowFuse address to connect, then decide which teams the agent reaches and whether it can make changes.

The address is `https://app.flowfuse.com/mcp`. [Pick your agent on the AI page](/ai/) for the exact steps in [Microsoft Copilot](https://copilotstudio.microsoft.com/), [ChatGPT](https://chatgpt.com/), [Claude](https://claude.ai/settings/connectors) or [Gemini](https://gemini.google.com/). Any MCP client that supports the HTTP transport works too, including command-line and editor agents and local models. Sign-in uses OAuth where the client supports it, with a token fallback where it does not.

Your own agent gets the full, growing set of FlowFuse platform automation and flow-building tools to run. That matters most where company policy only permits an approved AI agent, so FlowFuse Expert wasn't an option.

Your grant is enforced on every call: a read-only agent stays read-only, and no agent can delete an instance, application, snapshot or team. Every action is recorded in the audit log, marked `via MCP`.

When the agent builds a flow, you watch it happen on the canvas: open the instance and turn on the MCP toggle in the page header. Nothing goes live until you deploy.

This is available to all FlowFuse Cloud users and to Enterprise self-hosted installations from v3.0, across FlowFuse Hub, Edge and Fleet. See [connecting your own agent](/docs/user/expert/third-party-agents/) for setup, including what to check on an instance before asking for a flow.
