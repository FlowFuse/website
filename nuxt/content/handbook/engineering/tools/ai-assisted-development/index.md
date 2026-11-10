---
title: "AI Assisted Development"
navigation:
  icon: i-lucide-sparkles
---

# AI Assisted Development

These pages are hands-on walkthroughs for getting AI coding tools working against your local FlowFuse development environment. They assume you already have [Claude Code](/handbook/engineering/tools/#claude-code) running and the [dev environment](https://github.com/FlowFuse/dev-env) up.

Before you set anything up, read the [LLM programming assists](/handbook/engineering/tools/#llm-programming-assists) section in Tools and the [AI Development and Customer Data Policy](../../../company/security/ai-development-and-customer-data.md). The short version: you own what the tool produces, review every line, and never feed it customer data, secrets or PII. Everything on these pages points the tools at `localhost` only.

## Walkthroughs

- [Browser automation with playwright-cli](./playwright-cli.md) - let Claude Code drive a real browser against your local platform, restricted to localhost, with your dev login kept out of the conversation.
- [Working with superpowers](./superpowers.md) - the process skills plugin: brainstorming before building, plans before code, root cause before fixes, with one FlowFuse scenario for each.
