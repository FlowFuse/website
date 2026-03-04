---
title: "How to Use MCP Servers on FlowFuse to Fetch Data from Remote Instances"
subtitle: "Expose your remote Node-RED data to AI assistants with a simple 4-node flow"
description: "Learn how to host an MCP server on a FlowFuse instance to fetch and serve data from remote Node-RED instances, making your operational data accessible to AI tools."
date: 2026-03-03
authors: ["dimitrie-hoekstra"]
image: /blog/2026/03/images/mcp-servers-hosted-instances-remote-data.png
keywords: mcp, model context protocol, remote instances, flowfuse, ai, node-red
tags:
  - flowfuse
  - node-red
---

<!-- TODO: Add tile image to src/blog/2026/03/images/mcp-servers-hosted-instances-remote-data.png (artwork label on issue) -->

Introduction paragraph here — set the scene for why connecting AI assistants to operational data matters, and that FlowFuse already supports this today.

<!--more-->

## Prerequisites

- A FlowFuse Cloud (or self-hosted) account
- At least one remote Node-RED instance managed by FlowFuse
- An MCP-compatible client (e.g. Claude Desktop, Claude Code)

## Why Host an MCP Server on FlowFuse?

<!-- Explain the value proposition: MCP (Model Context Protocol) lets AI assistants call tools and read resources. By hosting the MCP server on a FlowFuse instance, you can bridge AI tools to your operational data on remote instances without exposing those instances directly. -->

## The 4-Node Flow

<!-- Walk through each node in the flow:
1. Node 1 — ...
2. Node 2 — ...
3. Node 3 — ...
4. Node 4 — ...

Include screenshots of the flow editor and node configurations. -->

## Setting It Up Step by Step

### Step 1: Create a New FlowFuse Instance

<!-- Instructions for creating the hosted instance that will run the MCP server -->

### Step 2: Import the Flow

<!-- Provide the flow JSON and import instructions -->

### Step 3: Configure the Remote Instance Connection

<!-- How to point the flow at the remote instance(s) -->

### Step 4: Test the MCP Server

<!-- How to connect an MCP client and verify data is returned -->

## Connecting to Claude Desktop

<!-- Show the MCP client configuration (e.g. claude_desktop_config.json) and a demo of asking Claude a question that triggers the MCP tool -->

## Conclusion

<!-- Summarise what was achieved and point to next steps / further reading -->
