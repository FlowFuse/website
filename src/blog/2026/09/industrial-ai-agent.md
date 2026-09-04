---
metaTitle: "Connect Your Industrial AI Agent to FlowFuse"
title: "Connect Your Industrial AI Agent to FlowFuse"
subtitle: "Turn Microsoft Copilot, ChatGPT, or Claude into industrial AI agents."
description: "Connect ChatGPT, Microsoft Copilot, or Claude to FlowFuse and turn your approved AI agent into an industrial AI agent that builds Node-RED flows directly."
date: 2026-09-03
keywords: flowfuse, mcp, model context protocol, industrial ai agent, ai agent, microsoft copilot, copilot studio, chatgpt, claude, node-red, industrial ai
authors: ["dimitrie-hoekstra"]
image: /blog/2026/09/images/industrial-ai-agent.png
tags:
- flowfuse
- ai
cta:
    type: demo
    title: Want to see this against your own setup?
    description: Walk through connecting your agent with our team, on your instances, and see what it can and cannot reach.
tldr: "FlowFuse 3.0 acts as an MCP server, so the AI agent your company already approved can operate FlowFuse and build flows in your Node-RED instances. You add one address, sign in, and choose which teams the agent reaches and whether it gets editing rights. It manages the FlowFuse platform and builds flows on a Node-RED canvas you are watching. It cannot delete anything, so you remain in control of deploying your flows. For teams under approved-AI-only policy, this is the difference between no AI on the platform and all of it."
meta:
  howto:
    name: "How Do I Connect an Industrial AI Agent to My Systems?"
    description: "Learn how to connect an industrial AI agent to your industrial systems through FlowFuse MCP, control its access, query operational data, manage your industrial applications, and build Node-RED flows."
    totalTime: "PT10M"
    tool:
      - "Node-RED"
      - "Microsoft Copilot"
      - "ChatGPT"
      - "Claude"
    steps:
      - name: "Connect your AI agent to FlowFuse"
        text: "Open your AI agent's connector or tool settings and add the FlowFuse MCP server address. On FlowFuse Cloud, use https://app.flowfuse.com/mcp. Your AI agent must support MCP over HTTP."
        url: "how-an-ai-agent-connects-to-flowfuse"
      - name: "Sign in to FlowFuse"
        text: "Authenticate the connection with your FlowFuse account. The AI agent uses your existing FlowFuse permissions and cannot access resources beyond what your account can access."
        url: "how-an-ai-agent-connects-to-flowfuse"
      - name: "Choose the teams and permissions the agent can access"
        text: "Select which FlowFuse teams the AI agent can access and whether it has read-only or editing permissions. For example, you can give the agent access to a development team without giving it access to a production team."
        url: "what-youre-actually-granting"
      - name: "Ask your industrial AI agent about your operations"
        text: "Start with read access and ask the AI agent about your applications, running instances, runtime logs, or FlowFuse Tables data. After confirming the connection, grant editing permissions if you want it to build or modify Node-RED flows."
        url: "where-to-start"
  faq:
    - question: "How do I connect an industrial AI agent to my systems?"
      answer: "Follow the three steps for your specific MCP-compatible AI agent at flowfuse.com/ai. It will instruct you to add https://app.flowfuse.com/mcp as a connector or plugin. Sign in with your FlowFuse account, select the teams the agent can access, and choose read-only or editing permissions. Once connected, it becomes an industrial AI agent that can interact with your operations through FlowFuse."
    - question: "What can an industrial AI agent do with my systems?"
      answer: "With read access, an industrial AI agent can query applications, instances, runtime logs, and FlowFuse Tables data. With editing permissions, it can also create supported FlowFuse resources like instances and applications, and build or modify Node-RED flows that connect to equipment, MQTT brokers, databases, APIs, and other industrial systems."
    - question: "Can an industrial AI agent build Node-RED flows?"
      answer: "Yes. With editing permissions, an industrial AI agent can build and modify Node-RED flows in FlowFuse. You can describe a workflow, for example reading temperature data from MQTT, checking it against a threshold, and writing the result to FlowFuse Tables, and the agent creates and connects the required nodes while you review the changes."
    - question: "Can an industrial AI agent query my industrial data?"
      answer: "Yes. With read access, an industrial AI agent can query FlowFuse Tables data alongside application, instance, and runtime information, answering questions about stored process values, downtime, throughput, and other operational data without any ability to make changes. If your data lives elsewhere, you can have the agent build a custom MCP server node tailored to your production environment to request it."
    - question: "Which AI agents can become industrial AI agents in FlowFuse?"
      answer: "FlowFuse can connect to any AI agents that act as clients that support Model Context Protocol (MCP) over HTTP, including ChatGPT, Microsoft Copilot, Claude, and Gemini. See the Industrial AI page for agent-specific setup steps. A local AI model can also connect through an MCP-compatible client."
    - question: "Is it safe to connect an industrial AI agent to production systems?"
      answer: "You control an industrial AI agent's exposure through FlowFuse team scope and role-based access control. You can restrict it to specific teams and start with read-only access before granting editing rights. Ideally start a new team used for experimentation. Unsupported operations such as deleting instances or teams aren't available to any agent, and deployment stays under your control regardless of what the agent proposes."
---
What used to happen is that an engineer would open their AI agent of choice in another tab or application, describe what they would need to happen in Node-RED, they get the JSON back, then copy, paste, and import that into the editor. Doing so, on repeat, until it is right. The AI is already doing the work, just not in an efficient way that requires you to be a part of it.

That's not how an industrial AI agent should work. It should be able to work directly with your industrial systems, rather than generating something for you to copy and paste.

That's what our first class integrated industrial AI agent, FlowFuse Expert, was built to do. It works within the FlowFuse platform, where it can understand your applications, instances, flows, and operational data, and then build and edit the operational flows directly in Node-RED instances.

|  | **Without FlowFuse Expert** | **With FlowFuse Expert** |
| :- | :- | :- |
| **Creating and editing Node-RED flows** | Wiring flows by hand or asking an external AI for JSON to be copy and pasted over, including errors. | The industrial AI agent creates or edits the flows right in front of you. |
| **Setting up an industrial application** | Manually setting up FlowFuse applications, instances, and connecting them together through submodules or pipelines so it's ready for a production setup, plus configuring the flows. | The industrial AI agent helps you set it up from start to finish. You can even plan with the AI agent so you are sure it aligns with your expectations. The AI will help you ensure it will be ready for a production setup. |
| **Asking about your industrial fleet** | Manually walking through the platform UI to figure out what runs how. | The industrial AI agent scans your FlowFuse instance and understands what there is and its status, then reports it to you in natural language. |
| **Asking about your operational data** | Manually configuring the data aggregation, modeling, and visualisation into dashboards, then monitoring those. | The industrial AI agent configures the data aggregation, modeling, and visualisation for you into a usable dashboard. And it can also create custom MCP servers which allow you to ask about your operational data in natural language. |

## So why did this happen?

Ask why they don't use the FlowFuse Expert built into the platform, and the answer usually isn't about quality; it's about policy. Plenty of the companies we work with run an approved-AI-only rule. So for those teams the only option was to use "their AI, through the clipboard" with the alternative being no AI-support at all.

## What changed in FlowFuse 3.0

FlowFuse now acts as an MCP server. Your own AI agent connects to it as a client and because the AI agent is yours, so is the choice of model it uses.

That means the AI agent your company already approved can work the platform directly: look at your teams and applications, check what your instances are doing, read runtime logs, query your [FlowFuse Tables](/node-red/flowfuse/flowfuse-tables/) data, create applications and instances, and build and edit the flows inside your instances.

## How an AI agent connects to FlowFuse

Connecting an AI agent to FlowFuse takes three steps depending on the agent you would like to use.

You add one address in your AI agent's connector settings. On FlowFuse Cloud that address is `https://app.flowfuse.com/mcp`. You are then triggered to sign in to FlowFuse, after which you pick which teams the AI agent may act on, and whether it gets editing rights or read access only.

If you want to jump ahead and get connected now, [skip to the steps at the end](#connect-your-own-agent).

## What you're actually granting

"We gave an AI agent access to production" is usually a sentence that ends conversations, so let's clarify.

You choose the teams. If you have a production team and a development team, granting only development means an instruction can only hit what you manage in that team.

You choose read access or editing rights. Read access is useful on its own: what's running, what's failing, what the logs say, what's in your tables, and so on. An industrial AI agent with read access has no ability to change anything. When permitting editing rights, the agent can set up applications, instances, and edit the flows inside of them.

And there are things nobody can grant. An industrial AI agent working through FlowFuse can't delete an instance, an application, a snapshot, or a team. That is because those tools don't exist. Lastly, deploying a Node-RED flow is, for now, still done by you manually as well.

Two things run underneath all of it. The role-based access control that already governs your teams affects the industrial agent too, so it can't reach past what your own account reaches. And every action it takes lands in the audit log attributed to you and marked `via MCP`, so "what the AI did last Tuesday" is a question with an answer.

Most agents will prompt you and ask before they act. This logic belongs to the agent itself rather than to FlowFuse, so it looks different in each one, but in practice you see the tool call before it runs, so you retain visibility and control.

We're working towards AI that can act as required in production setups and in setups where experimentation is fine, and those are different settings for different scenarios. But what is described above is the boundary as it ships right now.

## It builds where you can see it

Node-RED has always been visual. You look at a flow and you can tell what it does.

We didn't want to trade away control for AI, so when your agent builds a flow, it builds it in a live editor session, on the canvas in front of you. You watch the nodes appear and get wired up. If it's going somewhere you don't like, you can see that while it's happening rather than afterwards. Up for review before you enable the deployment.

Asking questions about your platform needs no active browser session open at all. It's flow work specifically that runs in an editor you're looking at.

## The conversation with IT

Most people reading this can't add a connector on their company sanctioned AI agent. On ChatGPT, a workspace administrator switches on custom connectors. On Claude Team and Enterprise, an owner adds the connector for the organisation and then people connect individually. On Microsoft Copilot, a tenant administrator approves it.

It's one address. Everyone still signs in with their own FlowFuse account, and still chooses their own scopes, so nobody inherits anyone else's access. Nothing about it makes FlowFuse a new data processor for your organisation.

We're also working on removing the question at all.

::note
**Coming soon:** FlowFuse in the Microsoft Copilot, Claude and ChatGPT connector directories. No custom connector, no admin request. FlowFuse Cloud only.
::

## Where to start

If your team is on FlowFuse Cloud, you can get connected already. Our [Industrial AI page](/ai/) has the three steps for whichever agent you use similar as noted above.

If your team is on FlowFuse self-hosted, make sure to be on at least version FlowFuse 3.0 or higher. On self-hosted, platform messaging runs over the MQTT broker, so the Team Broker needs to be available. Whether anything is needed from you depends on how your self-hosted platform was installed. [Our documentation](/docs/user/expert/third-party-agents/) has further details on what to do for custom situations.

For now, begin with any of the following prompts when authenticated with the platform:

::prompt-carousel{surface="blog"}
::

## Connect your own agent

Three steps, and they depend on which agent you would like to use.

::agent-setup-tabs{:exclude-expert="true" surface="blog"}
::
