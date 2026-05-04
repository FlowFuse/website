---
eleventyNavigation:
  key: MCP Responses
  parent: MCP
meta:
  title: MCP Response
  description: Sends responses back to the MCP client for tools and resources.
---

# {{ meta.title }}

Sends responses back to the MCP client for tools and resources. This node should be the final node in any flow that begins with an MCP Tool or MCP Resource node.

#### Flow Requirements

Must be connected as the final node in flows starting with MCP Tool or MCP Resource nodes.

#### Configuration

**Name** `string`  
Optional display name for this node in the flow.

#### Input

The node accepts `msg.payload` containing the data to return to the MCP client. The format depends on the type of request:

**For MCP Tool Responses:**
- Can be any data type (string, number, object, array)
- Will be returned as the tool execution result

**For MCP Resource Responses:**
- Should match the MIME type specified in the MCP Resource configuration
- For `text/plain`: string content
- For `application/json`: object or array
- For `text/markdown`: markdown formatted string

#### Usage

```
[MCP Tool/Resource] → [Your Processing Nodes] → [MCP Response]
```

The MCP Response node completes the request cycle by sending your processed data back to the AI assistant that made the request.