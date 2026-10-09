---
title: Tool Permissions for MCP Agents
description: AI agent access is now Read, Write or Destructive, set separately for platform and flow building tools, and different for each team.
date: 2026-10-08 12:00:00
release: "3.2"
authors: ["andrea-palmieri"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/8741
---

Until now, an AI agent that signed in to FlowFuse over OAuth got one choice: read-only or read and write. That choice applied to every team the agent could reach, and to everything it could do.

You now choose from three levels instead:

- **Read**: look at things, change nothing.
- **Write**: create and update things. Includes Read.
- **Destructive**: delete or overwrite data, or change what is running. Includes Write and Read.

Platform tools and Flow Building tools are set separately. Platform tools manage instances, snapshots, pipelines and the rest of FlowFuse, while Flow Building tools edit flows in the Node-RED editor. An agent can, for example, create and update snapshots while only being able to read your flows.

<video autoplay loop muted playsinline aria-label="The FlowFuse MCP authorization page, choosing Read, Write and Destructive permissions for Platform and Flow Building tools, then giving individual teams their own permissions" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/10/images/mcp-tool-permissions.webm" type="video/webm" /></video>

Permissions are now per team as well. Pick **All teams** or **Specific teams**, then select **Edit** next to a team to give it its own permissions. Your production team can stay read-only while the agent has full access in a sandbox team.

A request for something the agent was not granted in that team is refused, so you stay in control even when the agent decides to try.

To connect an agent with specific permissions:

1. Add the FlowFuse MCP endpoint to your agent and sign in.
2. On the authorization page, tick the permissions for **Platform** and **Flow Building**.
3. Choose which teams the agent can reach, and edit individual teams if they need different permissions.
4. Set an expiry date and select **Allow**.

You can see a summary of each connection's permissions in the token list under **User Settings > Security**.

This applies to agents that connect over OAuth. Personal access tokens keep their existing Read Only option.

This is available now on FlowFuse Cloud and will land in FlowFuse v3.2 for Self Hosted.

See [what agents can do](/docs/user/mcp/) and how to [connect your own agent](/docs/user/expert/third-party-agents/).
