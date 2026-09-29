---
title: Control which Teams get Third-Party MCP Access
description: Team owners can now enable or disable third-party MCP access without turning off AI features entirely.
date: 2026-09-28
release: "3.1"
authors: ["stephen-mclaughlin"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/8651
---

Some teams want FlowFuse's own Expert assistant available but don't want any external AI agent connecting to their instances. Until now, the only switch was AI Features, and turning that off took Expert with it.

Team Settings > Danger now has a separate **MCP Access** toggle, on by default for every team. Turn it off and any third-party agent, Claude, ChatGPT, or anything else authenticating over MCP, is refused, and the "Connect your AI agent" option disappears from the UI. Existing third-party connections to that team drop immediately, no restart required. FlowFuse Expert itself isn't affected.

If a third-party agent tries to call a tool anyway, it gets an error with a hint pointing back to this toggle.

To change this setting:

1. Select a **Team** from the **Team Selector** at the top of the page.
2. Go to **Team Settings > Danger**.
3. Turn off **MCP Access**.

This is available now on FlowFuse Cloud and will land in FlowFuse v3.2 for Self Hosted.

FlowFuse is fully integrated with AI Agents. See [what agents can do](/docs/user/mcp/) and how to [connect your own agent](/docs/user/expert/third-party-agents/).
