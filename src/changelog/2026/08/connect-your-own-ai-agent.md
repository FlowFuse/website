---
title: Connect your own AI agent to FlowFuse
description: The AI agent your team already uses can now work your platform and build Node-RED applications, with you deciding what it may reach.
date: 2026-08-27 12:00:00
release: "3.0"
authors: ["serban-costin"]
tags:
- changelog
issues:
- https://github.com/FlowFuse/flowfuse/issues/8192
---

FlowFuse Expert is no longer the only AI that can work your platform. FlowFuse now acts as an MCP server, so the agent your team already uses can query your teams and instances, and build Node-RED applications for you.

![Your own AI agent signs in to one FlowFuse address, and FlowFuse reaches your instances and your open editor session](./images/connect-your-own-agent.svg)
*Your agent talks to one address. FlowFuse reaches the instances, so they are never opened up.*

Add the FlowFuse address in your agent's connector settings, sign in, and choose which teams the agent may reach and whether it may make changes.

Some agents take it in one click:

- Visual Studio Code: [add FlowFuse](https://insiders.vscode.dev/redirect/mcp/install?name=flowfuse&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fapp.flowfuse.com%2Fmcp%22%7D)
- Cursor: [add FlowFuse](cursor://anysphere.cursor-deeplink/mcp/install?name=flowfuse&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vYXBwLmZsb3dmdXNlLmNvbS9tY3AifQ==)
- Claude Code: `claude mcp add --transport http flowfuse https://app.flowfuse.com/mcp`
- Claude, ChatGPT and Copilot Studio: add `https://app.flowfuse.com/mcp` as a custom connector

This matters most where company policy only permits an approved AI agent. Until now that meant no AI on the platform at all, because the only way in was our own. Now the agent your company already sanctioned can do the work.

The access you grant is enforced on every call, so a read-only grant is refused whatever the agent tries. Nothing an agent reaches through FlowFuse can delete an instance, an application, a snapshot or a team, and deploying stays yours. Everything it does lands in the audit log, marked `via MCP`.

Flow building happens on the canvas in front of you. Open the instance, turn on the MCP toggle in the page header, and you watch the agent work.

This is available to all FlowFuse Cloud users and to Enterprise self-hosted installations from v3.0, across FlowFuse Hub, Edge and Fleet. See [connecting your own agent](/docs/user/expert/third-party-agents/) for setup, including what to check on an instance before asking for a flow.
