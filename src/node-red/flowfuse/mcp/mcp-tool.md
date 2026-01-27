---
eleventyNavigation:
  key: MCP Tool
  parent: MCP
meta:
  title: MCP Tool
  description: MCP Tool node allows you to create custom tools that FlowFuse Expert can invoke to perform specific tasks.
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

{% renderFlow %}
[{"id":"4076896ebd9fb8b4","type":"group","z":"e1ceeedf31ce1ebd","name":"MCP Tools","style":{"label":true},"nodes":["670d69227fd02715","d473b3e38011a7d1","8bb8104fab25a772","b4398fb68fb3d363","561f103a1ac605c4","d31cc0acdb813863","3c23f963f4982c1a","644e76704eb56f41","30ead11f52f1bf19","8b5faff4ad12d406","079eacf59ffc7032"],"x":254,"y":1399,"w":892,"h":282},{"id":"670d69227fd02715","type":"mcp-tool","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"","server":"28907ed9ddcdd4b9","toolName":"greeting","title":"","description":"Greet person by name","inputSchema":"{\n  \"type\": \"object\",\n  \"properties\": {\n    \"name\": {\n        \"type\": \"string\",\n        \"description\": \"The name to greet\",\n        \"minLength\": 1\n    }\n  },\n  \"required\": [\"name\"]\n}","x":340,"y":1480,"wires":[["8bb8104fab25a772"]]},{"id":"d473b3e38011a7d1","type":"change","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"\"This response is defined in a Node-RED change node. Hi \" & payload.name","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":720,"y":1480,"wires":[["079eacf59ffc7032"]]},{"id":"8bb8104fab25a772","type":"delay","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"","pauseType":"delay","timeout":"2","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"allowrate":false,"outputs":1,"x":540,"y":1480,"wires":[["d473b3e38011a7d1"]]},{"id":"b4398fb68fb3d363","type":"mcp-tool","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"","server":"28907ed9ddcdd4b9","toolName":"get_iss_position","title":"Get ISS Position","description":"Retrieves the latitude and longitude of the Internanational Space Station","inputSchema":"{}","x":360,"y":1580,"wires":[["561f103a1ac605c4"]]},{"id":"561f103a1ac605c4","type":"http request","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"","method":"GET","ret":"obj","paytoqs":"ignore","url":"http://api.open-notify.org/iss-now.json","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":730,"y":1580,"wires":[["079eacf59ffc7032"]]},{"id":"d31cc0acdb813863","type":"catch","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"","scope":"group","uncaught":false,"x":730,"y":1640,"wires":[["079eacf59ffc7032"]]},{"id":"3c23f963f4982c1a","type":"debug","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"tool response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":1020,"y":1520,"wires":[]},{"id":"644e76704eb56f41","type":"mcp-response","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"","x":1020,"y":1560,"wires":[]},{"id":"30ead11f52f1bf19","type":"comment","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"Simple Greeting Tool","info":"","x":370,"y":1440,"wires":[]},{"id":"8b5faff4ad12d406","type":"comment","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","name":"Get IIS Position Tool","info":"","x":370,"y":1540,"wires":[]},{"id":"079eacf59ffc7032","type":"junction","z":"e1ceeedf31ce1ebd","g":"4076896ebd9fb8b4","x":880,"y":1540,"wires":[["644e76704eb56f41","3c23f963f4982c1a"]]},{"id":"28907ed9ddcdd4b9","type":"mcp-server","name":"My Node-RED MCP Server","protocol":"http","path":"/mcp"},{"id":"c05fb032a62e8357","type":"global-config","env":[],"modules":{"@flowfuse-nodes/nr-mcp-server-nodes":"0.1.1"}}]
{% endrenderFlow %}