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

FlowFuse Expert is no longer the only AI that can work your platform. FlowFuse now acts as an MCP server, so the agent your team already uses can query your teams and instances, and build Node-RED applications for you.

Add the FlowFuse address in your agent's connector settings, sign in, and choose which teams the agent may reach and whether it may make changes.

The address is `https://app.flowfuse.com/mcp`. [Pick your agent on the AI page](/ai/) for where that goes in [Microsoft Copilot](https://copilotstudio.microsoft.com/), [ChatGPT](https://chatgpt.com/), [Claude](https://claude.ai/settings/connectors) or [Gemini](https://gemini.google.com/), and for the three steps in each. A local model works the same way through any MCP client that speaks HTTP, and so do command-line and editor agents.

This matters most where company policy only permits an approved AI agent. Until now that meant no AI on the platform at all, because the only way in was our own. Now the agent your company already sanctioned can do the work.

The access you grant is enforced on every call, so a read-only grant is refused whatever the agent tries. Nothing an agent reaches through FlowFuse can delete an instance, an application, a snapshot or a team, and deploying stays yours. Everything it does lands in the audit log, marked `via MCP`.

Flow building happens on the canvas in front of you. Open the instance, turn on the MCP toggle in the page header, and you watch the agent work.

This is available to all FlowFuse Cloud users and to Enterprise self-hosted installations from v3.0, across FlowFuse Hub, Edge and Fleet. See [connecting your own agent](/docs/user/expert/third-party-agents/) for setup, including what to check on an instance before asking for a flow.
