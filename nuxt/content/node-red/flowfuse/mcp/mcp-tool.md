---
title: "MCP Tool"
description: "MCP Tool node allows you to create custom tools that FlowFuse Expert can invoke to perform specific tasks."
---

# {{ meta.title }}

MCP Tool node allows you to create custom tools that FlowFuse Expert can invoke to perform specific tasks. These tools can do anything a Node-RED flow can do - from querying databases and calling APIs to controlling IoT devices and processing data. The FlowFuse Expert decides when to call your tool based on the description and input schema you provide.

## Flow Requirements

MCP Tool nodes must be connected to a flow that ends with an **MCP Response** node to send results back to the MCP client.

## Configuration

### Name
`string` - Optional

Optional display name for this node in the flow. This helps you identify the node in your Node-RED editor but is not visible to MCP clients.

### Server
`mcp-server` - Required

The MCP server configuration this tool will be registered with. Select from your configured MCP server instances.

### Tool Name
`string` - Required

Unique identifier for the tool used by MCP clients to call this tool. Should be written in snake_case.

**Examples:**
- `get_weather`
- `send_email`
- `query_database`
- `control_lights`

### Title
`string` - Required

Human-readable name shown to users in MCP clients. This is what users see when browsing available tools.

**Examples:**
- "Send Email"
- "Control Smart Lights"

### Description
`string` - Required

Detailed description of what this tool does and when to use it. Be specific to help FlowFuse Expert understand when to invoke this tool.

### Annotations
`checkboxes` - Optional

Annotations help AI clients understand your tool's behavior and control which FlowFuse team members can access it based on their role (Viewer, Member, or Owner).

- **Read-Only Hint**: Tool only reads data, doesn't modify anything. Safe for exploratory queries.
  * **Access**: Viewer role and above
  
- **Destructive Hint**: Tool may delete or irreversibly modify data. Use with caution.
  * **Access**: Owner role only
  
- **Idempotent Hint**: Calling the tool multiple times with same parameters has the same effect as calling it once. Safe to retry.
  * **Access**: No effect on roles (only relevant for writing tools, which require Member minimum)
  
- **Open-World Hint**: Tool interacts with external systems or data sources that may change unpredictably.
  * **Access**: Member role and above

> **Note:** These are hints only and do not enforce behavior. The actual behavior of a tool is determined by your Node-RED flow implementation. Annotations are used by FlowFuse for role-based access control (RBAC) and FlowFuse Expert. They are also part of the standard MCP specification and can be consumed by external agents, but their effect ultimately depends on the client's implementation.

### Input Schema
`JSON` - Required

JSON schema defining the expected arguments for this tool. This tells the FlowFuse Expert what parameters to provide when calling your tool.

## Input Schema

The input schema uses JSON Schema format to define the structure and validation rules for tool arguments.

### Basic Example

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "The name to greet",
      "minLength": 1
    }
  },
  "required": ["name"]
}
```

### Complete Example with Multiple Types

```json
{
  "type": "object",
  "properties": {
    "location": {
      "type": "string",
      "description": "City name or ZIP code",
      "minLength": 1
    },
    "units": {
      "type": "string",
      "description": "Temperature units",
      "enum": ["celsius", "fahrenheit"],
      "default": "celsius"
    },
    "days": {
      "type": "number",
      "description": "Number of days to forecast",
      "minimum": 1,
      "maximum": 7,
      "default": 1
    },
    "include_hourly": {
      "type": "boolean",
      "description": "Include hourly breakdown",
      "default": false
    }
  },
  "required": ["location"]
}
```

## Output

When the tool is called by an MCP client, the output `msg.payload` contains the arguments passed according to your input schema.

### Example

If your input schema defines:
```json
{
  "type": "object",
  "properties": {
    "city": { "type": "string" },
    "units": { "type": "string" }
  }
}
```

The FlowFuse Expert calls your tool with:
```json
{
  "city": "London",
  "units": "celsius"
}
```

You can then use these values in subsequent nodes to perform your tool's logic.

## Example Flow



::render-flow
---
height: 200
flow: "W3siaWQiOiI0MDc2ODk2ZWJkOWZiOGI0IiwidHlwZSI6Imdyb3VwIiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJuYW1lIjoiTUNQIFRvb2xzIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI2NzBkNjkyMjdmZDAyNzE1IiwiZDQ3M2IzZTM4MDExYTdkMSIsIjhiYjgxMDRmYWIyNWE3NzIiLCJiNDM5OGZiNjhmYjNkMzYzIiwiNTYxZjEwM2ExYWM2MDVjNCIsImQzMWNjMGFjZGI4MTM4NjMiLCIzYzIzZjk2M2Y0OTgyYzFhIiwiNjQ0ZTc2NzA0ZWI1NmY0MSIsIjMwZWFkMTFmNTJmMWJmMTkiLCI4YjVmYWZmNGFkMTJkNDA2IiwiMDc5ZWFjZjU5ZmZjNzAzMiJdLCJ4IjoyNTQsInkiOjEzOTksInciOjg5MiwiaCI6MjgyfSx7ImlkIjoiNjcwZDY5MjI3ZmQwMjcxNSIsInR5cGUiOiJtY3AtdG9vbCIsInoiOiJlMWNlZWVkZjMxY2UxZWJkIiwiZyI6IjQwNzY4OTZlYmQ5ZmI4YjQiLCJuYW1lIjoiIiwic2VydmVyIjoiMjg5MDdlZDlkZGNkZDRiOSIsInRvb2xOYW1lIjoiZ3JlZXRpbmciLCJ0aXRsZSI6IiIsImRlc2NyaXB0aW9uIjoiR3JlZXQgcGVyc29uIGJ5IG5hbWUiLCJpbnB1dFNjaGVtYSI6IntcbiAgXCJ0eXBlXCI6IFwib2JqZWN0XCIsXG4gIFwicHJvcGVydGllc1wiOiB7XG4gICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgbmFtZSB0byBncmVldFwiLFxuICAgICAgICBcIm1pbkxlbmd0aFwiOiAxXG4gICAgfVxuICB9LFxuICBcInJlcXVpcmVkXCI6IFtcIm5hbWVcIl1cbn0iLCJ4IjozNDAsInkiOjE0ODAsIndpcmVzIjpbWyI4YmI4MTA0ZmFiMjVhNzcyIl1dfSx7ImlkIjoiZDQ3M2IzZTM4MDExYTdkMSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsImciOiI0MDc2ODk2ZWJkOWZiOGI0IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiXCJUaGlzIHJlc3BvbnNlIGlzIGRlZmluZWQgaW4gYSBOb2RlLVJFRCBjaGFuZ2Ugbm9kZS4gSGkgXCIgJiBwYXlsb2FkLm5hbWUiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjcyMCwieSI6MTQ4MCwid2lyZXMiOltbIjA3OWVhY2Y1OWZmYzcwMzIiXV19LHsiaWQiOiI4YmI4MTA0ZmFiMjVhNzcyIiwidHlwZSI6ImRlbGF5IiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJnIjoiNDA3Njg5NmViZDlmYjhiNCIsIm5hbWUiOiIiLCJwYXVzZVR5cGUiOiJkZWxheSIsInRpbWVvdXQiOiIyIiwidGltZW91dFVuaXRzIjoic2Vjb25kcyIsInJhdGUiOiIxIiwibmJSYXRlVW5pdHMiOiIxIiwicmF0ZVVuaXRzIjoic2Vjb25kIiwicmFuZG9tRmlyc3QiOiIxIiwicmFuZG9tTGFzdCI6IjUiLCJyYW5kb21Vbml0cyI6InNlY29uZHMiLCJkcm9wIjpmYWxzZSwiYWxsb3dyYXRlIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6NTQwLCJ5IjoxNDgwLCJ3aXJlcyI6W1siZDQ3M2IzZTM4MDExYTdkMSJdXX0seyJpZCI6ImI0Mzk4ZmI2OGZiM2QzNjMiLCJ0eXBlIjoibWNwLXRvb2wiLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsImciOiI0MDc2ODk2ZWJkOWZiOGI0IiwibmFtZSI6IiIsInNlcnZlciI6IjI4OTA3ZWQ5ZGRjZGQ0YjkiLCJ0b29sTmFtZSI6ImdldF9pc3NfcG9zaXRpb24iLCJ0aXRsZSI6IkdldCBJU1MgUG9zaXRpb24iLCJkZXNjcmlwdGlvbiI6IlJldHJpZXZlcyB0aGUgbGF0aXR1ZGUgYW5kIGxvbmdpdHVkZSBvZiB0aGUgSW50ZXJuYW5hdGlvbmFsIFNwYWNlIFN0YXRpb24iLCJpbnB1dFNjaGVtYSI6Int9IiwieCI6MzYwLCJ5IjoxNTgwLCJ3aXJlcyI6W1siNTYxZjEwM2ExYWM2MDVjNCJdXX0seyJpZCI6IjU2MWYxMDNhMWFjNjA1YzQiLCJ0eXBlIjoiaHR0cCByZXF1ZXN0IiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJnIjoiNDA3Njg5NmViZDlmYjhiNCIsIm5hbWUiOiIiLCJtZXRob2QiOiJHRVQiLCJyZXQiOiJvYmoiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiaHR0cDovL2FwaS5vcGVuLW5vdGlmeS5vcmcvaXNzLW5vdy5qc29uIiwidGxzIjoiIiwicGVyc2lzdCI6ZmFsc2UsInByb3h5IjoiIiwiaW5zZWN1cmVIVFRQUGFyc2VyIjpmYWxzZSwiYXV0aFR5cGUiOiIiLCJzZW5kZXJyIjpmYWxzZSwiaGVhZGVycyI6W10sIngiOjczMCwieSI6MTU4MCwid2lyZXMiOltbIjA3OWVhY2Y1OWZmYzcwMzIiXV19LHsiaWQiOiJkMzFjYzBhY2RiODEzODYzIiwidHlwZSI6ImNhdGNoIiwieiI6ImUxY2VlZWRmMzFjZTFlYmQiLCJnIjoiNDA3Njg5NmViZDlmYjhiNCIsIm5hbWUiOiIiLCJzY29wZSI6Imdyb3VwIiwidW5jYXVnaHQiOmZhbHNlLCJ4Ijo3MzAsInkiOjE2NDAsIndpcmVzIjpbWyIwNzllYWNmNTlmZmM3MDMyIl1dfSx7ImlkIjoiM2MyM2Y5NjNmNDk4MmMxYSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJlMWNlZWVkZjMxY2UxZWJkIiwiZyI6IjQwNzY4OTZlYmQ5ZmI4YjQiLCJuYW1lIjoidG9vbCByZXNwb25zZSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTAyMCwieSI6MTUyMCwid2lyZXMiOltdfSx7ImlkIjoiNjQ0ZTc2NzA0ZWI1NmY0MSIsInR5cGUiOiJtY3AtcmVzcG9uc2UiLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsImciOiI0MDc2ODk2ZWJkOWZiOGI0IiwibmFtZSI6IiIsIngiOjEwMjAsInkiOjE1NjAsIndpcmVzIjpbXX0seyJpZCI6IjMwZWFkMTFmNTJmMWJmMTkiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJlMWNlZWVkZjMxY2UxZWJkIiwiZyI6IjQwNzY4OTZlYmQ5ZmI4YjQiLCJuYW1lIjoiU2ltcGxlIEdyZWV0aW5nIFRvb2wiLCJpbmZvIjoiIiwieCI6MzcwLCJ5IjoxNDQwLCJ3aXJlcyI6W119LHsiaWQiOiI4YjVmYWZmNGFkMTJkNDA2IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsImciOiI0MDc2ODk2ZWJkOWZiOGI0IiwibmFtZSI6IkdldCBJSVMgUG9zaXRpb24gVG9vbCIsImluZm8iOiIiLCJ4IjozNzAsInkiOjE1NDAsIndpcmVzIjpbXX0seyJpZCI6IjA3OWVhY2Y1OWZmYzcwMzIiLCJ0eXBlIjoianVuY3Rpb24iLCJ6IjoiZTFjZWVlZGYzMWNlMWViZCIsImciOiI0MDc2ODk2ZWJkOWZiOGI0IiwieCI6ODgwLCJ5IjoxNTQwLCJ3aXJlcyI6W1siNjQ0ZTc2NzA0ZWI1NmY0MSIsIjNjMjNmOTYzZjQ5ODJjMWEiXV19LHsiaWQiOiIyODkwN2VkOWRkY2RkNGI5IiwidHlwZSI6Im1jcC1zZXJ2ZXIiLCJuYW1lIjoiTXkgTm9kZS1SRUQgTUNQIFNlcnZlciIsInByb3RvY29sIjoiaHR0cCIsInBhdGgiOiIvbWNwIn0seyJpZCI6ImMwNWZiMDMyYTYyZTgzNTciLCJ0eXBlIjoiZ2xvYmFsLWNvbmZpZyIsImVudiI6W10sIm1vZHVsZXMiOnsiQGZsb3dmdXNlLW5vZGVzL25yLW1jcC1zZXJ2ZXItbm9kZXMiOiIwLjEuMSJ9fV0="
---
::

