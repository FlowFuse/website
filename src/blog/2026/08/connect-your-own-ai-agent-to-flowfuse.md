---
metaTitle: "Industrial AI agents: the one you approved can now run ops"
title: "Your Company Already Picked an AI Agent. Now It Can Run Your Operations."
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
---

There is a workflow I keep hearing about, and nobody is proud of it.

A controls engineer has ChatGPT open in another tab. They describe the flow they want, get JSON back, copy it, paste it into the Node-RED editor, and then spend twenty minutes fixing the node configs that came back wrong. Next time, same thing.

<!--more-->

The AI is already doing the work. It's just doing it through the clipboard.

## Why it was the clipboard

Ask why they don't use the AI built into the platform, and the answer usually isn't about quality. It's policy.

Plenty of the companies we work with run an approved-AI-only rule. One agent is sanctioned, it went through security review, and that's the list. FlowFuse Expert isn't on it. So for those teams the choice wasn't "our AI or yours". It was "your AI, through the clipboard" or no AI on the platform at all.

That's a bad place for us to be. It also isn't really an argument about AI. It's an argument about which vendor's AI, and we were on the wrong side of a decision that had already been made somewhere else.

## What changed in 3.0

FlowFuse now acts as an MCP server. Your agent connects to it as a client.

That means the agent your company already approved can work the platform directly: look at your teams and applications, check what your instances are doing, read runtime logs, query your [FlowFuse Tables](/node-red/flowfuse/flowfuse-tables/) data, create applications and instances, and build and edit the flows inside your Node-RED instances.

Because the agent is yours, so is the model. Which model or provider sits behind it is your agent's business, not ours. If your organisation runs everything through Azure, or through a local model because nothing leaves the network, that keeps working exactly as it does today.

## How it actually connects

Three steps, and they're the same three whichever agent you use.

You add one address in your agent's connector settings. On FlowFuse Cloud that address is `https://app.flowfuse.com/mcp`. You sign in to FlowFuse, the same way you'd sign in to anything else. Then you pick which teams the agent may act on, and whether it gets editing rights or read access only.

The only requirement on your side is an agent that speaks MCP over HTTP. Most now do.

The shape of it matters more than the steps. Your agent talks to one FlowFuse address. FlowFuse talks to your instances. The agent never touches an instance directly, which is why instances sitting in a DMZ or on a restricted plant network come into reach without being opened up to anything.

## Worked example: Microsoft Copilot

Copilot is the one most of our customers have already standardised on, so it's worth walking through.

In Copilot Studio, open your agent's **Tools** page, choose **Add a tool**, then **New tool**, then **Model Context Protocol**. You give the server a name and a description, and paste the FlowFuse address as the server URL.

Write the description properly, because it isn't decoration. Copilot's orchestrator reads it to decide when to call FlowFuse at all. "FlowFuse industrial application platform: Node-RED instances, flows, and operational data" gets you further than "FlowFuse".

Then sign in, pick your scopes, and you're connected. Ask it what instances are running and it'll tell you.

If you want FlowFuse available to everyone on the tenant rather than in one maker's agent, a tenant administrator registers it in the Microsoft 365 admin center instead, and it shows up in Copilot Studio for the whole organisation.

One thing IT teams like hearing: Copilot Studio reaches MCP servers through Power Platform connectors, so whatever data policy you already have there governs this too. It isn't a new thing to police.

ChatGPT, Claude and Gemini work the same way, in their own connector settings. So does a local model, through any MCP client you point at it, which is the route to take when nothing may leave the network. The [AI page](/ai/) has the exact path for each one. Command-line and editor agents use the same address too.

## What you're actually granting

This is the part worth being precise about, because "we gave an AI access to production" is a sentence that ends conversations.

You choose the teams. If you have a production team and a development team, granting only development means an instruction that would have hit production has nowhere to go.

You choose read access or editing rights. Read access is genuinely useful on its own: what's running, what's failing, what the logs say, what's in your tables. An agent with read access has no ability to change anything.

And there are things nobody can grant. An agent working through FlowFuse can't delete an instance, an application, a snapshot or a team, because those tools don't exist. Deploying is still done by you.

Two things run underneath all of it. The role-based access control that already governs your teams governs the agent too, so it can't reach past what your own account reaches. And every action it takes lands in the audit log attributed to you and marked `via MCP`, so "what did the AI do last Tuesday" is a question with an answer.

Most agents also ask before they act. That prompt belongs to the agent rather than to FlowFuse, so it looks different in each one, but in practice you see the tool call before it runs.

Both of those are true today rather than forever. We're working towards AI that can act as required in production setups and in setups where experimentation is fine, and those are different settings for different customers. But that's the boundary as it ships.

## It builds where you can see it

Node-RED has always been visual. You look at a flow and you can tell what it does.

We didn't want to trade that away for AI. So when your agent builds a flow, it builds it in a live editor session, on the canvas in front of you. You watch the nodes appear and get wired up. If it's going somewhere you don't like, you can see that while it's happening rather than afterwards.

Asking questions about your platform needs nothing open at all. It's flow work specifically that runs in an editor you're looking at.

## The conversation with IT

Most people reading this can't add a connector on their own, and it's worth being straight about that rather than pretending otherwise.

On ChatGPT, a workspace administrator switches on custom connectors. On Claude Team and Enterprise, an owner adds the connector for the organisation and then people connect individually. On Microsoft 365, a tenant administrator approves it.

The ask is smaller than it sounds. It's one address. Everyone still signs in with their own FlowFuse account, and still chooses their own scopes, so nobody inherits anyone else's access. Nothing about it makes FlowFuse a new data processor for your organisation.

We're also working on removing the ask. Coming soon: FlowFuse in the Microsoft Copilot, Claude and ChatGPT connector directories. No custom connector, no admin request. FlowFuse Cloud first.

## Where to start

If you're on FlowFuse Cloud, you can do this today. Add the address, sign in, grant read access to one team, and ask your agent what's running. That's a two-minute version of the whole thing, and it tells you more than any description of it will.

Then decide whether you want it building flows, and give it editing rights on a team where a mistake costs you nothing.

The [AI page](/ai/) has the address to copy and the three steps for whichever agent you use. [Connecting your own agent](/docs/user/expert/third-party-agents/) has the detail, and what to do when something doesn't behave.
