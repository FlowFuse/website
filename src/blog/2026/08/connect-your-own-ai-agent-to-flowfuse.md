---
metaTitle: "Industrial AI agents: the one you approved can now run ops"
title: "Connect Your Approved AI Agent to Industrial Operations."
subtitle: "Microsoft Copilot, ChatGPT, or Claude can become industrial AI agents in FlowFuse, working your platform and building your flows."
description: "FlowFuse 3.0 turns FlowFuse into an MCP server, allowing industrial AI agents to query operations and build Node-RED flows while you keep control."
date: 2026-08-27
keywords: flowfuse, mcp, model context protocol, ai agent, microsoft copilot, copilot studio, chatgpt, claude, node-red, industrial ai
authors: ["serban-costin"]
tags:
- flowfuse
- ai
cta:
    type: demo
    title: Want to see this against your own setup?
    description: Walk through connecting your agent with our team, on your instances, and see what it can and cannot reach.
tldr: "FlowFuse 3.0 acts as an MCP server, so the AI agent your company already approved can operate FlowFuse and build flows in your Node-RED instances. You add one address, sign in, and choose which teams the agent reaches and whether it gets editing rights. It builds on a canvas you are watching, it cannot delete anything, and you still deploy. For teams under approved-AI-only policy, this is the difference between no AI on the platform and all of it."
meta:
  howto:
    name: "How Do I Connect an AI Agent to My Industrial Systems?"
    description: "Learn how to connect an AI agent to your industrial systems through FlowFuse MCP, control its access, query operational data, and build Node-RED flows."
    totalTime: "PT10M"
    tool:
      - "FlowFuse"
      - "Node-RED"
      - "Microsoft Copilot Studio"
      - "ChatGPT"
      - "Claude"
    steps:
      - name: "Connect your AI agent to FlowFuse"
        text: "Open your AI agent's connector or tool settings and add the FlowFuse MCP server address. On FlowFuse Cloud, use https://app.flowfuse.com/mcp. Your AI agent must support MCP over HTTP."
        url: "how-the-connection-works"
      - name: "Sign in to FlowFuse"
        text: "Authenticate the connection with your FlowFuse account. The AI agent uses your existing FlowFuse permissions and cannot access resources beyond what your account can access."
        url: "how-the-connection-works"
      - name: "Choose the teams and permissions the agent can access"
        text: "Select which FlowFuse teams the AI agent can access and whether it has read-only or editing permissions. For example, you can give the agent access to development without giving it access to production."
        url: "what-youre-granting"
      - name: "Configure your AI agent"
        text: "Add the FlowFuse MCP server as a tool or connector in your AI platform. In Microsoft Copilot Studio, open Tools, select Add a tool, then New tool and Model Context Protocol, and enter the FlowFuse MCP server URL."
        url: "worked-example-connecting-microsoft-copilot"
      - name: "Ask your AI agent about your operations"
        text: "Start with read access and ask the AI agent about your applications, running instances, runtime logs, or FlowFuse Tables data. After confirming the connection, grant editing permissions if you want it to build or modify Node-RED flows."
        url: "where-to-start"
  faq:
    - question: "How do I connect an AI agent to my industrial systems?"
      answer: "Connect an MCP-compatible AI agent to the FlowFuse MCP server at https://app.flowfuse.com/mcp. Sign in with your FlowFuse account, select the teams the agent can access, and choose read-only or editing permissions. The agent can then interact with your industrial operations through FlowFuse."
    - question: "What can an AI agent do with my industrial systems?"
      answer: "With read access, an AI agent can query applications, instances, runtime logs, and FlowFuse Tables data. With editing permissions, it can create supported resources and build or modify Node-RED flows that connect to equipment, MQTT brokers, databases, APIs, and other industrial systems."
    - question: "Can an AI agent build Node-RED flows?"
      answer: "Yes. With editing permissions, an AI agent can build and modify Node-RED flows in FlowFuse. You can describe a workflow, such as reading temperature data from MQTT, checking it against a threshold, and writing the result to FlowFuse Tables. The agent can create and connect the required nodes while you review the changes."
    - question: "Can an AI agent query my industrial data?"
      answer: "Yes. With read access, an AI agent can query FlowFuse Tables data alongside application, instance, and runtime information. This lets it answer questions about stored process values, downtime, throughput, and other operational data without giving it permission to make changes."
    - question: "Which AI agents work with FlowFuse?"
      answer: "FlowFuse can connect to AI agents and clients that support Model Context Protocol (MCP) over HTTP, including ChatGPT, Microsoft Copilot, Claude, and Gemini. You can also use a local AI model through an MCP-compatible client."
    - question: "Is it safe to connect an AI agent to production systems?"
      answer: "You control the agent's exposure through FlowFuse team scope and permissions. You can restrict it to specific teams and start with read-only access before granting editing rights. Existing role-based access control applies, unsupported operations such as deleting instances or teams are not available to the agent, and deployment remains under your control."
---
There is a workflow I keep hearing about, and nobody is proud of it.

An engineer has ChatGPT open in another tab. They describe the flow they want, get JSON back, copy it, paste it into the Node-RED editor, and fix whatever came back wrong. Next time, same thing. The AI is already doing the work, just not in an efficient way requiring you for part of it.

That's not how an industrial AI agent should work. It should be able to work directly with your industrial systems, rather than generating something for you to copy into Node-RED.

That's what our industrial AI agent, FlowFuse Expert, was built to do. It works within the FlowFuse platform, where it can understand your applications, instances, flows, and operational data, and then in Node-RED build and edit the flows directly.

## Why the clipboard and not our first class agent?

Ask why they don't use the industrial AI agent built into the platform, and the answer usually isn't about quality. It's policy.

Plenty of the companies we work with run an approved-AI-only rule. So for those teams the only option was to use "their AI, through the clipboard" or no AI-support on the platform at all.

## What changed in 3.0

FlowFuse now acts as an MCP server. Your agent connects to it as a client.

That means the agent your company already approved can work the platform directly: look at your teams and applications, check what your instances are doing, read runtime logs, query your [FlowFuse Tables](/node-red/flowfuse/flowfuse-tables/) data, create applications and instances, and build and edit the flows inside your Node-RED instances.

Because the agent is yours, so is the model. Which model or provider sits behind it is your agent's business, not ours.

## How an industrial AI agent connects to FlowFuse

Connecting an industrial AI agent to FlowFuse takes three steps, and they're the same whichever agent you use.

You add one address in your agent's connector settings. On FlowFuse Cloud that address is `https://app.flowfuse.com/mcp`. You sign in to FlowFuse, the same way you'd sign in to anything else. Then you pick which teams the agent may act on, and whether it gets editing rights or read access only.

## Connect your own agent

If you want to jump ahead and get connected:

::agent-setup-tabs{:exclude-expert="true" surface="blog"}

*Very soon connecting with FlowFuse will also be supported through the connector marketplace of your own AI provider, starting with Microsoft Copilot, Claude, and ChatGPT.*

## What you're actually granting

This is the part worth being precise about, because "we gave an industrial AI agent access to production" is a sentence that ends conversations.

You choose the teams. If you have a production team and a development team, granting only development means an instruction can only hit what you manage in that team.

You choose read access or editing rights. Read access is genuinely useful on its own: what's running, what's failing, what the logs say, what's in your tables. An agent with read access has no ability to change anything.

And there are things nobody can grant. An agent working through FlowFuse can't delete an instance, an application, a snapshot or a team, because those tools don't exist. Deploying a Node-RED flow is, for now, still done by you as well.

Two things run underneath all of it. The role-based access control that already governs your teams governs the agent too, so it can't reach past what your own account reaches. And every action it takes lands in the audit log attributed to you and marked `via MCP`, so "what did the AI do last Tuesday" is a question with an answer.

Most agents also ask before they act. That prompt belongs to the agent rather than to FlowFuse, so it looks different in each one, but in practice you see the tool call before it runs.

Both of those are true today rather than forever. We're working towards AI that can act as required in production setups and in setups where experimentation is fine, and those are different settings for different scenarios. But that's the boundary as it ships.

## It builds where you can see it

Node-RED has always been visual. You look at a flow and you can tell what it does.

We didn't want to trade away control for AI. So when your agent builds a flow, it builds it in a live editor session, on the canvas in front of you. You watch the nodes appear and get wired up. If it's going somewhere you don't like, you can see that while it's happening rather than afterwards.

Asking questions about your platform needs nothing open at all. It's flow work specifically that runs in an editor you're looking at.

## The conversation with IT

Most people reading this can't add a connector on  their company sanctioned AI agent. On ChatGPT, a workspace administrator switches on custom connectors. On Claude Team and Enterprise, an owner adds the connector for the organisation and then people connect individually. On Microsoft Copilot, a tenant administrator approves it.

It's one address. Everyone still signs in with their own FlowFuse account, and still chooses their own scopes, so nobody inherits anyone else's access. Nothing about it makes FlowFuse a new data processor for your organisation.

We're also working on removing the ask. Coming soon: FlowFuse in the Microsoft Copilot, Claude and ChatGPT connector directories. No custom connector, no admin request. FlowFuse Cloud only.

## Where to start

If you're on FlowFuse Cloud, you can get connected today. Add the address, sign in, grant read access to one team, and ask your agent what's running. That's a two-minute version of the whole thing, and it tells you more than any description of it will.

Then decide whether you want your industrial AI agent building flows, and give it editing rights on a team where a mistake costs you nothing.

The [AI page](/ai/) has the address to copy and the three steps for whichever agent you use similar as noted above. [Connecting your own agent](/docs/user/expert/third-party-agents/) has the detail, and what to do for custom situations.
