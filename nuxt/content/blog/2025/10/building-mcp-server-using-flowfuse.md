---
title: Building MCP Servers for AI Agent Integration in Node-RED with FlowFuse
navTitle: Building MCP Servers for AI Agent Integration in Node-RED with FlowFuse
---

FlowFuse released MCP nodes for Node-RED, allowing AI to directly interact with the flows you have built. These nodes let AI read sensor data, query databases, and control equipment. You use FlowFuse to collect and manage data in your flows, while AI agents determines what actions to take and why, enabling intelligent monitoring and automated control of factory and IIoT/IoT systems.

<!--more-->

This article explains how to build an MCP server with FlowFuse and connect AI to your systems for real-time insights, operational decisions, and automated control.

### What Is MCP?

The Model Context Protocol (MCP) is an open standard that enables AI assistants to access data and execute actions across external systems.

MCP works through three key components. Resources give AI visibility into your operations through read-only access to sensor data, database records, SCADA tags, and equipment logs. This real-time information helps AI understand what's actually happening on your factory floor or in your IIoT environment.

Tools let AI perform specific actions in your systems. These might include adjusting equipment parameters, triggering maintenance alerts, or generating operational reports. Each tool clearly defines what it needs as input and what it will produce as output, which keeps operations predictable and safe.

Prompts are workflow templates that guide AI through more complex tasks. They show AI how to use multiple resources and tools together to complete multi-step operations. This is particularly valuable when you need AI to follow established procedures rather than improvising solutions.

When you connect an AI agent to your MCP server, it discovers all available resources and tools automatically. The protocol handles the technical details of data requests and action execution, so AI can start working with your industrial systems right away. You build your flows in Node-RED, and AI learns how to interact with them intelligently through the MCP interface.

## Getting Started

This section guides you through setting up an MCP server, defining resources, and creating tools so AI can interact with your system.

### Prerequisites

Before you begin, ensure you have the following:

* **A running FlowFuse Enterprise instance.** If you do not have one, [contact us](/contact-us/) to discuss Enterprise options and get started.

* **Ensure the `@flowfuse-nodes/nr-mcp-server-nodes` package is installed**. This will add the [MCP nodes](/node-red/flowfuse/mcp/) to your Node palette in your instance editor.

> **Note:** The MCP nodes (@flowfuse-nodes/nr-mcp-server-nodes) are only available on the Enterprise tier.

### Configuring the MCP Server

Before defining resources or tools, the MCP Server must be configured. This server acts as the central endpoint for AI agents, ensuring all resources and tools are accessible under a single, consistent configuration.

1. Drag an **MCP Resource or Tool** node onto your workspace and click the **+** next to Server to create a new configuration.

2. Define the server properties:

   * **Name**: Enter a descriptive name, e.g., `Node-RED MCP Server`.
   * **Protocol**: Leave the default `http/sse` (currently the only option).
   * **Path**: Specify the endpoint path for the server, e.g., `/mcp`.

![MCP Server Configuration](/blog/2025/10/images/mcp-server-config.png){data-zoomable}
*Caption: Configuring the MCP Server in Node-RED*

3. **Click Done** to save the server configuration.

Once the server is configured, clients can connect using a URL. The URL to connect with is your instance URL plus the MCP path you configured, for example:

```
https://your-instance.flowfuse.cloud/mcp
```

or if you are running FlowFuse Node-RED instance locally, use the host, port, and MCP path of your instance, for example:

```
http://localhost:1880/mcp
```

or

```
http://192.168.1.100:1880/mcp
```

This URL allows AI agents to discover resources, execute tools, and interact with your flows.

### Securing Your MCP Server

To ensure your MCP server is protected from unauthorized access, enable FlowFuse User Authentication.

1. Navigate to your instance **Settings → Security** tab
2. Select **FlowFuse User Authentication**, click **Save Changes**, and in the popup, click **Restart** to apply the changes.

![FlowFuse User Authentication settings screenshot](/blog/2025/10/images/ff-auth.png){data-zoomable}
*FlowFuse User Authentication settings screenshot*

3. Click **Add Token** and provide a descriptive name for identification
4. Set an expiry date (recommended for enhanced security)
5. Click **Create** and copy the generated token

When connecting to your MCP server from a client, include the token in the request headers:

```json
{
  "node-red-mcp-server": {
    "url": "http://localhost:1880/mcp",
    "type": "http",
    "headers": {
      "Authorization": "Bearer ffhttp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```

Replace `ffhttp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your actual token. This ensures that only authorized clients can access your MCP server resources and tools.

<div class="blog-update-notes">
    <p><strong>UPDATE:</strong> <a href="/blog/2025/12/flowfuse-release-2-25/#interact-with-mcp-resources-in-flowfuse-expert">FlowFuse Expert now allows you to connect directly with your MCP Resources and Tools</a>, so you don't need to connect external AI agents anymore.</p>
    
    <p>You'll need to select the MCP server you want to connect to in the FlowFuse Expert Insights tab. Once connected, FlowFuse Expert will automatically query your Resources and execute your Tools based on your team role and your instructions. The annotations you configure in the <a href="#defining-an-mcp-tool">MCP Tool node</a> (read-only, destructive, idempotent, open-world) integrate with FlowFuse's role-based access control to ensure secure, appropriate access for every team member.</p>
    
    ![FlowFuse Expert](/blog/2025/10/images/mcp-in-flowfuse.png){data-zoomable}
</div>

### Defining an MCP Resource

Now let's start by defining a Resource. In MCP, a Resource represents a data source that you want to expose to an AI agent. In an industrial context, this could be a sensor value, a machine's status, or a list of production lines.

1. Drag the MCP Resource node from the palette onto your workspace.
2. Double-click the node to open its configuration panel and select the added mcp server configuration.
3. Enter the unique id for the resource, for example : "all-production-lines"
4. Provide a unique URI for this specific resource, for example, `mcp://monitor-all-production-lines` Make sure your every resource must have a unique URI.
5. Enter a clear, human-readable title, like "Monitoring All production lines". This is the name the AI agent or client that will connect will see, so make it descriptive.
6. Give the node a descriptive name for your flow, such as Production Lines Resource, and enter a brief description.

![MCP Resource Configuration](/blog/2025/10/images/mcp-resource-node-config.png){data-zoomable}
*Setting up an MCP Resource in FlowFuse*

7. Click Done and then Deploy your flow.

At this point, your MCP server is live and resource is discoverable. However, it doesn't contain any data yet.

To expose data you will need to connect the MCP Resource node to any data-producing node in your flow. This could be an HTTP Request node retrieving data from an API, a FlowFuse Query node for fetching records from a FlowFuse data table, industrial connectors such as OPC UA Read, Modbus Read, PLC Read nodes.

8. Next, drag the MCP Response node and connect its input to the output of the upstream data source node. 

> The MCP Response node is crucial because it delivers the results of your flow back to the AI agent. Without it, the AI will not receive the data it requests. Any errors are also fed back to the MCP Response node, enabling the AI to handle them appropriately.

9. Deploy the flow

Now, when an AI agent or any other client requests this URI, the flow will automatically execute and query your data source for the latest information. This data is then returned to the agent, providing it with the real-time context needed to answer your questions.

#### Example: Monitoring Production Lines

For this article, we've built a demonstration data flow. We have a table named production-lines where new data is inserted every five seconds from 10 different lines.

We then created a data resource and exposed all the line data to it. Now, let's connect a AI Agent to this resource and explore the kinds of questions we can ask to monitor the factory floor effectively.

![Monitoring Production Lines](/blog/2025/10/images/resource-demo.gif){data-zoomable}
*Production line monitoring using MCP Resources*

### Defining an MCP Tool

While resources are useful for providing access to data, tools enable an AI agent to perform specific, parameterized actions within your system.

1. Drag the MCP Tool node from the Node-RED palette onto your workspace.

2. Double-click the node to open the configuration panel and select the MCP Server configuration you previously created.

3. Enter a tool name that will be visible to clients connecting to the MCP server, such as *Maintenance* or *Maintenance Scheduler*.

4. Next, set annotations. Annotations help AI clients understand your tool's behavior and control which FlowFuse team members can access it based on their role (Viewer, Member, or Owner).

   - **Read-Only Hint**: Tool only reads data, doesn't modify anything. Safe for exploratory queries.
     * **Access**: Viewer role and above
   
   - **Destructive Hint**: Tool may delete or irreversibly modify data. Use with caution.
     * **Access**: Owner role only
   
   - **Idempotent Hint**: Calling the tool multiple times with same parameters has the same effect as calling it once. Safe to retry.
     * **Access**: No effect on roles (only relevant for writing tools, which require Member minimum)
   
   - **Open-World Hint**: Tool interacts with external systems or data sources that may change unpredictably.
     * **Access**: Member role and above

   > **Note:** These are hints only and do not enforce behavior. The actual behavior of a tool is determined by your Node-RED flow implementation. Annotations are used by FlowFuse for role-based access control (RBAC) and FlowFuse Expert. They are also part of the standard MCP specification and can be consumed by external agents, but their effect ultimately depends on the client's implementation.

5. Provide a clear description of the tool's purpose, and assign a descriptive name to the node within your flow.

6. Define the input schema in JSON format. This schema helps the AI understand what data is required to perform the action and also validates incoming requests. For detailed guidance, refer to the [Getting Started Guide](https://json-schema.org/learn/getting-started-step-by-step).

   > Tip: You can also use the FlowFuse Expert to generate the JSON schema automatically. Just click **Ask FlowFuse Expert** in the input schema field and describe the expected input in plain English.

   Below is an example schema for a Tool node. It shows how data is defined, its type, and which fields are required along with minimum lengths:

   ```json
   {
     "type": "object",
     "properties": {
       "line": {
         "type": "string",
         "description": "The production line where maintenance is required",
         "minLength": 1
       },
       "description": {
         "type": "string",
         "description": "Description of the maintenance task",
         "minLength": 1
       },
       "priority": {
         "type": "string",
         "description": "Priority of the task",
         "enum": [
           "Low",
           "Medium",
           "High"
         ]
       }
     },
     "required": [
       "line",
       "description",
       "priority"
     ]
   }
   ```

   ![MCP Tool Node Configuration](/blog/2025/10/images/mcp-tools.png){data-zoomable}
   *Setting up an MCP Tool in FlowFuse*

7. Click *Done*, then deploy your flow.

At this stage, the tool becomes discoverable by connected AI clients. However, it will not perform any action until it is linked to a flow that executes a task, such as an HTTP Request node performing a POST operation, a Query node inserting data into a database, or an OPC UA Write node controlling a device.

8. Drag the MCP Response node and connect its input to the output of the final node in your action flow. 

   > The MCP Response node is necessary because the AI needs to receive the outcome of the action—whether it was successful or not. Errors are also fed back to the MCP Response node, enabling the AI to handle them appropriately.

9. Deploy the flow once again.

Your MCP Tool is now active. When an AI agent invokes it, the connected flow executes the defined action and returns the result to the agent.

#### Example: Scheduling Maintenance for Production Lines

In this example, the flow includes a tool that triggers a POST request to the maintenance system API, which was developed using FlowFuse and the FlowFuse Dashboard. The AI Assistant was then asked to identify which production line was performing the worst and schedule a maintenance task for it.

![Scheduling Maintenance Example](/blog/2025/10/images/tools-demo.gif){data-zoomable}
*AI agent scheduling maintenance using an MCP Tool*

Below is the flow that includes the Resource we created to monitor production lines and the Tool that sends a POST request.

*Note: The flow uses the FlowFuse Query node and FlowFuse tables, which are only available on the Enterprise tier. If you do not have Enterprise, you can use other data sources instead, such as HTTP Request, OPC UA, or other database nodes.*



::render-flow
---
height: 300
flow: "W3siaWQiOiJjMDk1MmQ5N2RmM2ExNDkxIiwidHlwZSI6Imdyb3VwIiwieiI6IjM4MzFlNjNhZTNhY2M5YjAiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyIyZGEwNTlmMGI5NDY1MTIwIiwiNWVlMmNhYjFhNmFmZmM2NyIsIjFlYTMxMWU2M2I2YjdiODkiLCI2MjgxMzlmYTk5MDcyZTJlIl0sIngiOjk0LCJ5IjoxNzksInciOjcxMiwiaCI6MTQyfSx7ImlkIjoiMmRhMDU5ZjBiOTQ2NTEyMCIsInR5cGUiOiJtY3AtcmVzcG9uc2UiLCJ6IjoiMzgzMWU2M2FlM2FjYzliMCIsImciOiJjMDk1MmQ5N2RmM2ExNDkxIiwibmFtZSI6IiIsIngiOjcwMCwieSI6MjQwLCJ3aXJlcyI6W119LHsiaWQiOiI1ZWUyY2FiMWE2YWZmYzY3IiwidHlwZSI6Im1jcC1yZXNvdXJjZSIsInoiOiIzODMxZTYzYWUzYWNjOWIwIiwiZyI6ImMwOTUyZDk3ZGYzYTE0OTEiLCJuYW1lIjoiTGluZXMgTUNQIFJlc291cmNlIiwic2VydmVyIjoiNDYwMTU0ODkyNzg0ZmQ0ZSIsInJlc291cmNlVXJpIjoibWNwOi8vbW9uaXRvci1hbGwtcHJvZHVjdGlvbi1saW5lcyIsInJlc291cmNlSWQiOiJhbGwtcHJvZHVjdGlvbi1saW5lcyIsInRpdGxlIjoiTW9uaXRvcmluZyBBbGwgUHJvZHVjdGlvbiBsaW5lcyIsImRlc2NyaXB0aW9uIjoiUmVwcmVzZW50cyB0aGUgcmVhbC10aW1lIGRhdGEgc3RyZWFtIGZvciBhbGwgcHJvZHVjdGlvbiBMaW5lLiBDb250YWlucyBzZW5zb3IgcmVhZGluZ3MsIG9wZXJhdGlvbmFsIHN0YXR1cywgYW5kIHBlcmZvcm1hbmNlIG1ldHJpY3MgYWNjZXNzaWJsZSB2aWEgdGhlIE1DUCBzZXJ2ZXIuIiwibWltZVR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIiwieCI6MjIwLCJ5IjoyMjAsIndpcmVzIjpbWyIxZWEzMTFlNjNiNmI3Yjg5Il1dfSx7ImlkIjoiMWVhMzExZTYzYjZiN2I4OSIsInR5cGUiOiJ0YWJsZXMtcXVlcnkiLCJ6IjoiMzgzMWU2M2FlM2FjYzliMCIsImciOiJjMDk1MmQ5N2RmM2ExNDkxIiwibmFtZSI6IlJldHJpZXZlIExpbmVzIERhdGEiLCJxdWVyeSI6IlNFTEVDVCAqIEZST00gcHVibGljLnByb2R1Y3Rpb25fbGluZXM7Iiwic3BsaXQiOmZhbHNlLCJyb3dzUGVyTXNnIjoxLCJ4Ijo0NTAsInkiOjIyMCwid2lyZXMiOltbIjJkYTA1OWYwYjk0NjUxMjAiXV19LHsiaWQiOiI2MjgxMzlmYTk5MDcyZTJlIiwidHlwZSI6ImNhdGNoIiwieiI6IjM4MzFlNjNhZTNhY2M5YjAiLCJnIjoiYzA5NTJkOTdkZjNhMTQ5MSIsIm5hbWUiOiJDYXRjaCBlcnJvcnMgaW4gdGhpcyBncm91cCIsInNjb3BlIjoiZ3JvdXAiLCJ1bmNhdWdodCI6ZmFsc2UsIngiOjQzMCwieSI6MjgwLCJ3aXJlcyI6W1siMmRhMDU5ZjBiOTQ2NTEyMCJdXX0seyJpZCI6IjQ2MDE1NDg5Mjc4NGZkNGUiLCJ0eXBlIjoibWNwLXNlcnZlciIsIm5hbWUiOiJOT0RFLVJFRCBNQ1AgU0VSVkVSIiwicHJvdG9jb2wiOiJodHRwIiwicGF0aCI6Ii9tY3AifSx7ImlkIjoiYTU1NDcxYTlhM2M3YWY5ZiIsInR5cGUiOiJncm91cCIsInoiOiIzODMxZTYzYWUzYWNjOWIwIiwic3R5bGUiOnsic3Ryb2tlIjoiI2IyYjNiZCIsInN0cm9rZS1vcGFjaXR5IjoiMSIsImZpbGwiOiIjZjJmM2ZiIiwiZmlsbC1vcGFjaXR5IjoiMC41IiwibGFiZWwiOnRydWUsImxhYmVsLXBvc2l0aW9uIjoibnciLCJjb2xvciI6IiMzMjMzM2IifSwibm9kZXMiOlsiN2ZkMzJhYTBlZjdjYTk4NCIsImE0MTJiYjczMmFhNWU1ZTAiLCIzYjNjOGM1MjE0NmU2OWVmIiwiMDNhNzViNzczMDJiMWQxOSJdLCJ4Ijo5NCwieSI6MzM5LCJ3Ijo3MTIsImgiOjE0Mn0seyJpZCI6IjdmZDMyYWEwZWY3Y2E5ODQiLCJ0eXBlIjoiaHR0cCByZXF1ZXN0IiwieiI6IjM4MzFlNjNhZTNhY2M5YjAiLCJnIjoiYTU1NDcxYTlhM2M3YWY5ZiIsIm5hbWUiOiJTY2hlZHVsZSBNYWludGVuYW5jZSIsIm1ldGhvZCI6IlBPU1QiLCJyZXQiOiJ0eHQiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiIiwidGxzIjoiIiwicGVyc2lzdCI6ZmFsc2UsInByb3h5IjoiIiwiaW5zZWN1cmVIVFRQUGFyc2VyIjpmYWxzZSwiYXV0aFR5cGUiOiIiLCJzZW5kZXJyIjpmYWxzZSwiaGVhZGVycyI6W10sIngiOjQ0MCwieSI6MzgwLCJ3aXJlcyI6W1siM2IzYzhjNTIxNDZlNjllZiJdXX0seyJpZCI6ImE0MTJiYjczMmFhNWU1ZTAiLCJ0eXBlIjoibWNwLXRvb2wiLCJ6IjoiMzgzMWU2M2FlM2FjYzliMCIsImciOiJhNTU0NzFhOWEzYzdhZjlmIiwibmFtZSI6IiIsInNlcnZlciI6IjQ2MDE1NDg5Mjc4NGZkNGUiLCJ0b29sTmFtZSI6Im1haW50ZW5hbmNlIiwidGl0bGUiOiJDcmVhdGUgTWFpbnRlbmFuY2UgVGFzayIsImRlc2NyaXB0aW9uIjoiSGFuZGxlcyBtYWludGVuYW5jZSB0YXNrcyBvbiB0aGUgcHJvZHVjdGlvbiBsaW5lIiwiaW5wdXRTY2hlbWEiOiJ7XG4gIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICBcInByb3BlcnRpZXNcIjoge1xuICAgIFwibGluZVwiOiB7XG4gICAgICBcInR5cGVcIjogXCJzdHJpbmdcIixcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgcHJvZHVjdGlvbiBsaW5lIHdoZXJlIG1haW50ZW5hbmNlIGlzIHJlcXVpcmVkXCIsXG4gICAgICBcIm1pbkxlbmd0aFwiOiAxXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IHtcbiAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkRlc2NyaXB0aW9uIG9mIHRoZSBtYWludGVuYW5jZSB0YXNrXCIsXG4gICAgICBcIm1pbkxlbmd0aFwiOiAxXG4gICAgfSxcbiAgICBcInByaW9yaXR5XCI6IHtcbiAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlByaW9yaXR5IG9mIHRoZSB0YXNrXCIsXG4gICAgICBcImVudW1cIjogW1xuICAgICAgICBcIkxvd1wiLFxuICAgICAgICBcIk1lZGl1bVwiLFxuICAgICAgICBcIkhpZ2hcIlxuICAgICAgXVxuICAgIH1cbiAgfSxcbiAgXCJyZXF1aXJlZFwiOiBbXG4gICAgXCJsaW5lXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiLFxuICAgIFwicHJpb3JpdHlcIlxuICBdXG59IiwieCI6MTkwLCJ5IjozODAsIndpcmVzIjpbWyI3ZmQzMmFhMGVmN2NhOTg0Il1dfSx7ImlkIjoiM2IzYzhjNTIxNDZlNjllZiIsInR5cGUiOiJtY3AtcmVzcG9uc2UiLCJ6IjoiMzgzMWU2M2FlM2FjYzliMCIsImciOiJhNTU0NzFhOWEzYzdhZjlmIiwibmFtZSI6IiIsIngiOjcwMCwieSI6MzgwLCJ3aXJlcyI6W119LHsiaWQiOiIwM2E3NWI3NzMwMmIxZDE5IiwidHlwZSI6ImNhdGNoIiwieiI6IjM4MzFlNjNhZTNhY2M5YjAiLCJnIjoiYTU1NDcxYTlhM2M3YWY5ZiIsIm5hbWUiOiJDYXRjaCBlcnJvcnMgaW4gdGhpcyBncm91cCIsInNjb3BlIjoiZ3JvdXAiLCJ1bmNhdWdodCI6ZmFsc2UsIngiOjQzMCwieSI6NDQwLCJ3aXJlcyI6W1siM2IzYzhjNTIxNDZlNjllZiJdXX0seyJpZCI6IjRlOWM1MGM1OTQwMTAzYWIiLCJ0eXBlIjoiZ2xvYmFsLWNvbmZpZyIsImVudiI6W10sIm1vZHVsZXMiOnsiQGZsb3dmdXNlLW5vZGVzL25yLW1jcC1zZXJ2ZXItbm9kZXMiOiIwLjEuMSIsIkBmbG93ZnVzZS9uci10YWJsZXMtbm9kZXMiOiIwLjEuMCJ9fV0="
---
::



If you need more example flows, you can import the examples that come with the MCP nodes. Click the main menu from the top right, click Import, switch to Examples, and look for `@flowfuse-nodes/nr-mcp-server-node`, then select mcp_server and click Import. If you prefer a video tutorial, watch this [video tutorial on YouTube](https://www.youtube.com/watch?v=troUvaF8V68).

With your MCP server, Resources, and Tools in place, the AI agent can now interact with your industrial systems in a structured way. Up to this point, we've covered the basics and demonstrated a simple workflow. The MCP Prompt node, which allows AI agents to be guided through complex, multi-step tasks, will be explored in a future article.

## Conclusion

This guide demonstrated how to build a fully functional MCP server with FlowFuse and Node-RED, providing AI agents with structured access to industrial systems through Resources and Tools, which enable workflows such as monitoring production lines, scheduling maintenance, and automating operational decisions — all without complex coding.

FlowFuse [recently added ONNX AI nodes](/blog/2025/10/ai-on-flowfuse/). With these nodes, you can train custom models, deploy them in Node-RED, and execute tasks tailored to your processes. Combined with FlowFuse’s capabilities to collect, transform, and visualize industrial data, the platform makes development, monitoring, and optimization faster, smarter, and more scalable.

Adopting MCP with FlowFuse is a strategic step toward AI-enabled, future-ready industrial automation. [Book a demo today](https://flowfuse.com/blog/2025/10/ai-on-flowfuse/) to see how FlowFuse connects, transforms, and visualizes your industrial data while making AI-driven operations easy and actionable.
