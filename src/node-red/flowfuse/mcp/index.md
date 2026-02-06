---
eleventyNavigation:
  key: MCP
  parent: FlowFuse Nodes
  order: 1
meta:
  title: MCP Nodes
  description: A set of nodes that enable the creation of MCP (Model Context Protocol) servers in your Node-RED flows for AI-integration.
---

# {{ meta.title }}

This document lists and explains the **MCP nodes** available in FlowFuse. MCP (Model Context Protocol) nodes extend Node-RED to integrate AI models, tools, and resources through the Model Context Protocol framework. Each node helps you connect, configure, and manage AI interactions directly from Node-RED.

## Video introduction

<lite-youtube videoid="troUvaF8V68" params="rel=0" style="width: 100%; height: 480px; margin-top: 20px; margin-bottom: 20px;" title="YouTube video player with FlowFuse introduction video to MCP server nodes"></lite-youtube>

## Getting Started

### Prerequisites

* **A running FlowFuse Enterprise instance.** If you do not have one, [contact us](/contact-us/) to discuss Enterprise options.
* **Ensure the `@flowfuse-nodes/nr-mcp-server-nodes` package is installed** in your Node-RED palette.

> **Note:** The MCP nodes (@flowfuse-nodes/nr-mcp-server-nodes) are only available on the Enterprise tier.

### Configuring Your MCP Server

Before using MCP nodes, you need to configure an MCP Server:

1. Add any **MCP Resource, Tool, or Prompt** node to your workspace
2. Click the **+** button next to Server to create a new configuration
3. Configure the server properties:
   * **Name**: A descriptive name (e.g., `Node-RED MCP Server`)
   * **Protocol**: Leave the default `http/sse`
   * **Path**: Endpoint path for the server (e.g., `/mcp`)
4. Click **Done** to save

### Connecting External Clients or AI Agents

Once configured, external AI agents and MCP clients can connect to your server using your instance URL plus the MCP path:

**FlowFuse Cloud:**
```
https://your-instance.flowfuse.cloud/mcp
```

**Local Instance:**
```
http://localhost:1880/mcp
```

**Network Instance:**
```
http://192.168.1.100:1880/mcp
```

### Securing Your MCP Server

To protect your MCP server from unauthorized access, enable FlowFuse User Authentication:

1. Navigate to **Settings → Security** in your instance
2. Select **FlowFuse User Authentication**
3. Click **Save Changes**, then **Restart** to apply
4. Click **Add Token** and provide a descriptive name
5. Set an expiry date (recommended for security)
6. Click **Create** and copy the generated token

When connecting from external AI agents, include the token in request headers:

```json
{
  "node-red-mcp-server": {
    "url": "http://<host>:<port>/mcp",
    "type": "http",
    "headers": {
      "Authorization": "Bearer ffhttp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```

Replace `ffhttp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your actual token to ensure only authorized clients can access your MCP server resources and tools.

### Using FlowFuse Expert

When you have an MCP server built inside your FlowFuse cloud-hosted Node-RED instance, you can use FlowFuse Expert for a simpler and more secure way to interact with it compared to external clients. FlowFuse Expert connects directly to your MCP server, allowing you to query resources and execute tools with built-in role-based access control.

> **Note:** FlowFuse Expert currently works with cloud-hosted instances. Support for remote Node-RED instances is planned for future releases.

**Getting Started:**

You can access FlowFuse Expert in two ways:

**1. At the Platform Level:**

Open FlowFuse Expert directly from your FlowFuse platform dashboard.

![FlowFuse Expert at Platform Level](../images/ff-expert-at-platform-level.png)


![FlowFuse Expert Opened at Platform](../images/ff-expert-opned-platform.png)

**2. Within the Node-RED Editor:**

To access FlowFuse Expert within your Node-RED instance where you have built your MCP server, open the editor using the **Open Editor** button, then access FlowFuse Expert from there.

![FlowFuse Expert in Editor](../images/ff-expert-in-editor.png)


![FlowFuse Expert Opened in Editor](../images/ff-expert-opened.png)

Once FlowFuse Expert is open, select your MCP server from the Insights tab, and Expert will automatically discover your resources and tools. You can then ask questions or request actions, and Expert will use your resources and tools based on your role.

FlowFuse Expert enforces access control based on the annotations configured in your MCP Tool nodes. Learn more about configuring tool annotations in the [MCP Tool documentation](./mcp-tool#annotations).

## Nodes

This section lists the **MCP nodes** available in FlowFuse:

{% include "navigation-items-list.njk" %}

Each listed node provides a unique capability within the MCP ecosystem — from registering tools and resources to managing prompts and responses. Use these nodes to create MCP Servers, provide tools, resources, and prompts to MCP clients, and standardize AI workflows in your Node-RED projects.