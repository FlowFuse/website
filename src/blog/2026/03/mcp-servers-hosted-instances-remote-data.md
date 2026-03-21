---
title: "How to Use MCP Servers on FlowFuse to Fetch Data from Remote Instances"
subtitle: "Expose your remote Node-RED data to AI assistants with a simple 4-node flow"
description: "Learn how to host an MCP server on a FlowFuse cloud instance that fetches data from remote Node-RED instances, bridging the gap between your operational data and AI assistants like FlowFuse Expert."
date: 2026-03-03
authors: ["dimitrie-hoekstra"]
image: /blog/2026/03/images/mcp-servers-hosted-instances-remote-data.png
keywords: mcp, model context protocol, remote instances, flowfuse, ai, node-red, flowfuse expert
tags:
  - flowfuse
  - node-red
---

<!-- TODO: Add tile image to src/blog/2026/03/images/mcp-servers-hosted-instances-remote-data.png (artwork label on issue) -->

Your most valuable operational data often lives on remote Node-RED instances — edge devices on the factory floor, gateways in the field, or servers deep within your network. With FlowFuse's [MCP server nodes](/node-red/flowfuse/mcp/), you can already expose that data to AI assistants. But what if [FlowFuse Expert](/blog/2025/10/introducing-flowfuse-expert/) can't directly reach those remote instances?

In this post, I'll walk you through a practical workaround: hosting an MCP server on a cloud instance that acts as a bridge, fetching data from your remote instances on demand. The best part? It only takes four nodes.

<!--more-->

## The Challenge: Reaching Remote Instances

FlowFuse supports two types of Node-RED instances: **cloud-hosted instances** that run on FlowFuse's infrastructure, and **remote instances** that run on your own hardware via the [Device Agent](/platform/device-agent/).

[FlowFuse Expert](/blog/2025/10/introducing-flowfuse-expert/) — our built-in AI assistant — can connect to MCP servers running on cloud-hosted instances. However, remote instances sit behind firewalls, NATs, or private networks where Expert cannot yet reach them in a consistent, standardised way. Support for direct remote instance connectivity is planned, but it's not available today.

This creates a gap: your data is on the remote instance, but your AI assistant can only talk to cloud-hosted MCP servers.

## The Solution: A Cloud-Hosted Bridge

The workaround is straightforward. Instead of running MCP server nodes directly on the remote instance, you:

1. **Deploy an MCP server on a cloud-hosted instance** — this is reachable by FlowFuse Expert
2. **Expose an HTTP endpoint on the remote instance** — a simple API that returns the data you need
3. **Connect the two** — when Expert calls an MCP tool, the cloud instance fetches data from the remote instance and returns it

<!-- TODO: Add architecture diagram showing: FlowFuse Expert → Cloud Instance (MCP Server) → Remote Instance (HTTP API) -->

This pattern keeps your remote instance behind its firewall while making its data accessible to AI through a controlled, secure channel.

## The 4-Node Flow

The entire bridge lives on your **cloud-hosted instance** and consists of just four nodes:

<!-- TODO: Add screenshot of the 4-node flow in the editor -->

1. **MCP Tool** — Defines the tool that FlowFuse Expert (or any MCP client) can call. It specifies the tool name, description, and input schema so the AI knows what data it can request and what parameters to provide.

2. **Function** — Prepares the HTTP request. It takes the arguments from the MCP tool invocation (available in `msg.payload`) and constructs the URL, headers, and query parameters needed to call the remote instance's API.

3. **HTTP Request** — Makes the actual call to the remote instance's HTTP endpoint. This fetches the live data — sensor readings, production metrics, equipment status, or whatever your remote instance exposes.

4. **MCP Response** — Returns the fetched data back to the MCP client. This node closes the loop, sending the remote instance's response back to FlowFuse Expert as the tool's result.

```
┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌──────────────┐
│ MCP Tool │───▶│ Function │───▶│ HTTP Request │───▶│ MCP Response │
└──────────┘    └──────────┘    └──────────────┘    └──────────────┘
     AI calls        Formats          Fetches             Returns
     the tool        the request      from remote         to AI
```

## Prerequisites

Before you begin, ensure you have:

- A **FlowFuse Enterprise** account (MCP nodes require the Enterprise tier)
- A **cloud-hosted instance** where you'll deploy the MCP server
- A **remote instance** with data you want to expose, already managed by FlowFuse
- The `@flowfuse-nodes/nr-mcp-server-nodes` package installed on the cloud instance via the Palette Manager

## Setting It Up

### Step 1: Expose an HTTP Endpoint on the Remote Instance

First, your remote instance needs to serve data over HTTP. If it doesn't already have one, create a simple API flow using `http-in` and `http-response` nodes.

For example, if your remote instance collects temperature sensor data, you might have:

<!-- TODO: Add screenshot of the remote instance's HTTP API flow -->

```
[http-in GET /api/sensors] → [function: query data] → [http-response]
```

This gives you an endpoint like `http://<remote-instance-ip>:1880/api/sensors` that returns your sensor data as JSON.

> **Tip:** If your remote instance already has HTTP endpoints or a REST API built into your flows, you can skip this step and point the cloud instance directly at those existing endpoints.

### Step 2: Build the MCP Bridge on the Cloud Instance

On your **cloud-hosted instance**, create the 4-node flow:

#### 2a. Configure the MCP Server

Drag an **MCP Tool** node onto the canvas. Click the **+** next to Server to create a new MCP Server configuration:

- **Name**: e.g., `Remote Data Bridge`
- **Protocol**: `http/sse` (default)
- **Path**: `/mcp`

<!-- TODO: Add screenshot of MCP Server config -->

#### 2b. Define the MCP Tool

Configure the MCP Tool node itself:

- **Tool Name**: e.g., `get_sensor_data`
- **Title**: e.g., `Get Sensor Data`
- **Description**: `Fetches the latest sensor readings from the remote production line instance. Returns temperature, humidity, and pressure values.`
- **Input Schema**: Define any parameters the AI can pass, for example:

```json
{
  "type": "object",
  "properties": {
    "sensor_id": {
      "type": "string",
      "description": "The ID of the sensor to query. If omitted, returns all sensors."
    },
    "limit": {
      "type": "number",
      "description": "Maximum number of readings to return. Defaults to 10."
    }
  }
}
```

> The description is critical — it's how FlowFuse Expert understands what the tool does and when to use it. Be specific about what data the tool returns and what parameters are available.

#### 2c. Add the Function Node

Wire a **Function** node after the MCP Tool. This node prepares the HTTP request to your remote instance:

```javascript
// Build the request URL from tool arguments
const baseUrl = 'http://<remote-instance-ip>:1880/api/sensors';
const params = new URLSearchParams();

if (msg.payload.sensor_id) {
    params.append('id', msg.payload.sensor_id);
}
if (msg.payload.limit) {
    params.append('limit', msg.payload.limit);
}

const query = params.toString();
msg.url = query ? `${baseUrl}?${query}` : baseUrl;

return msg;
```

Replace `<remote-instance-ip>` with your remote instance's actual address.

#### 2d. Add the HTTP Request and MCP Response Nodes

Wire an **HTTP Request** node after the Function. Set its method to `GET` and leave the URL field empty (it will use `msg.url` from the Function node). Set "Return" to "a parsed JSON object".

Finally, wire an **MCP Response** node at the end. No configuration is needed — it sends `msg.payload` back to the MCP client.

### Step 3: Deploy and Test

1. **Deploy** the flow on your cloud instance
2. Your MCP server is now available at: `https://your-instance.flowfuse.cloud/mcp`

## Using It with FlowFuse Expert

Once deployed, FlowFuse Expert can discover and use your MCP tools automatically:

1. Open **FlowFuse Expert** from the FlowFuse platform
2. Switch to **Insights** mode
3. Select the cloud instance that has your MCP server
4. Ask a natural language question like: *"What are the latest sensor readings from the production line?"*

Expert will recognise that the `get_sensor_data` tool can answer this question, call it, and present the results in a human-readable format.

<!-- TODO: Add screenshot of FlowFuse Expert using the tool -->

## Connecting External MCP Clients

You can also connect external MCP clients directly to the cloud instance's MCP endpoint. For **Claude Desktop**, add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "remote-data-bridge": {
      "url": "https://your-instance.flowfuse.cloud/mcp"
    }
  }
}
```

If your instance uses [FlowFuse User Authentication](/node-red/flowfuse/mcp/#security-with-flowfuse-user-authentication), you'll need to include a bearer token as well. See the [MCP security documentation](/node-red/flowfuse/mcp/#security-with-flowfuse-user-authentication) for details.

## Scaling the Pattern

This 4-node pattern is a starting point. You can extend it by:

- **Adding multiple MCP tools** — one per remote instance or data type, all sharing the same MCP Server config
- **Adding MCP resources** — for read-only data that doesn't need parameters (e.g., a live dashboard summary)
- **Combining data from multiple remote instances** — a single Function node can fan out to several HTTP requests and merge the results
- **Adding MCP tool annotations** — mark tools as read-only, destructive, or idempotent to control [role-based access](/changelog/2026/01/mcp-rbacs/) through FlowFuse

## What's Next

Direct connectivity between FlowFuse Expert and remote instance MCP servers is on the roadmap. When it lands, you'll be able to deploy MCP nodes directly on your remote instances without needing the cloud bridge. Until then, this pattern gives you full access to your remote data through AI — today.

To learn more about MCP in FlowFuse:

- [MCP Nodes Documentation](/node-red/flowfuse/mcp/)
- [Building MCP Servers for AI Agent Integration](/blog/2025/10/building-mcp-server-using-flowfuse/)
- [FlowFuse + LLM + MCP = Text Driven Operations](/blog/2025/11/flowfuse+llm+mcp-equals-text-driven-operations/)
