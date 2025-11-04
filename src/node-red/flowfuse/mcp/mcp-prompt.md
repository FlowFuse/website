---
eleventyNavigation:
  key: MCP Prompt
  parent: MCP
meta:
  title: MCP Prompt
  description: The MCP Prompt node allows you to create pre-configured prompt templates that users can easily invoke from their MCP client.
---

# {{ meta.title }}

The MCP Prompt node allows you to create pre-configured prompt templates that users can easily invoke from their MCP client. These templates can include variable placeholders that users fill in, making it simple to create consistent, well-structured prompts for common tasks. Unlike tools and resources, prompts don't require flows or response nodes - they simply register the template with the MCP server.

## Flow Requirements

**None** — MCP Prompt nodes do not require flows or MCP Response nodes.
They only register the prompt template with the MCP server, making it available for users to select and customize in their MCP client.

## Configuration

### Name

`string` — *Optional*
Optional display name for this node in the flow. This helps identify the node in your Node-RED editor but is not visible to MCP clients.

### Server

`mcp-server` — *Required*
The MCP server configuration this prompt will be registered with. Select from your configured MCP server instances.

### Prompt ID

`string` — *Required*
Unique identifier for the prompt used by MCP clients to access this prompt template. Use **snake_case** for naming.

**Examples:**

* `holiday_planner`
* `code_reviewer`
* `bug_report_template`
* `meeting_summarizer`

### Title

`string` — *Required*
Human-readable name shown to users in MCP clients. This is what users see when browsing available prompts.

### Description

`string` — *Required*
Detailed description of what this prompt does and when to use it.

### Prompt Template

`string` — *Required*

{% raw %}
Define your prompt text using **double curly braces `{{ }}`** for variables.
{% endraw %}

### Arguments

`JSON` — *Required*
JSON schema defining the template variables that users can customize. This follows the same **JSON Schema** format used in MCP Tool input schemas.

## Prompt Template Examples

### Basic Example

{% raw %}
```
Hello {{ name }}! Welcome to {{ location }}.
```
{% endraw %}

**Variables:** `name`, `location`

### Complex Example

{% raw %}
```
You are a holiday planning agent.
You should provide information about {{ location }}.
You should also provide rough budget ideas for visiting this place in {{ time_of_year }} for {{ duration }} days.
Please breakdown rough ideas for hotels and local tourist hot spots to visit.
```
{% endraw %}

**Variables:** `location`, `time_of_year`, `duration`

### Multi-Section Example

{% raw %}
```
# Code Review Request

## File: {{ filename }}
## Language: {{ language }}

Please review the following code:

{{ code }}

Focus on:
- {{ focus_area_1 }}
- {{ focus_area_2 }}
- {{ focus_area_3 }}

Provide feedback on code quality, potential bugs, and suggestions for improvement.
```
{% endraw %}

**Variables:** `filename`, `language`, `code`, `focus_area_1`, `focus_area_2`, `focus_area_3`

## Argument Schema Examples

### Basic Schema

```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Your name",
      "minLength": 1
    },
    "location": {
      "type": "string",
      "description": "The place you're visiting",
      "minLength": 1
    }
  },
  "required": ["name", "location"]
}
```

### Extended Schema

```json
{
  "type": "object",
  "properties": {
    "location": {
      "type": "string",
      "description": "A country, city or town somewhere in the world",
      "minLength": 1
    },
    "time_of_year": {
      "type": "string",
      "description": "A specific date, season or month giving context for the travel period",
      "minLength": 1
    },
    "duration": {
      "type": "number",
      "default": 7,
      "description": "The number of days for the trip"
    }
  },
  "required": ["location", "time_of_year"]
}
```

### Schema with Enums and Defaults

```json
{
  "type": "object",
  "properties": {
    "report_type": {
      "type": "string",
      "description": "Type of report to generate",
      "enum": ["daily", "weekly", "monthly", "quarterly"],
      "default": "weekly"
    },
    "include_charts": {
      "type": "boolean",
      "description": "Include visual charts in the report",
      "default": true
    },
    "detail_level": {
      "type": "string",
      "description": "Level of detail for the report",
      "enum": ["summary", "detailed", "comprehensive"],
      "default": "detailed"
    }
  },
  "required": ["report_type"]
}
```

## Example Flow


{% renderFlow 300 %}
[{"id":"1dd56abc53f50de0","type":"group","z":"FFF0000000000001","name":"MCP Prompts","style":{"label":true},"nodes":["cc2bedb852d8cea4","241e6041470d735c"],"x":714,"y":819,"w":212,"h":142},{"id":"cc2bedb852d8cea4","type":"mcp-prompt","z":"FFF0000000000001","g":"1dd56abc53f50de0","name":"","server":"28907ed9ddcdd4b9","promptId":"uppercase","title":"Uppercase","description":"This prompt will return the provided content in all uppercase characters","template":"Please return the following in uppercase: {{message}}","arguments":"{\n  \"type\": \"object\",\n  \"properties\": {\n    \"message\": {\n        \"type\": \"string\",\n        \"description\": \"The text provided by the user\"\n    }\n  },\n  \"required\": [\"message\"]\n}","x":800,"y":920,"wires":[]},{"id":"241e6041470d735c","type":"mcp-prompt","z":"FFF0000000000001","g":"1dd56abc53f50de0","name":"","server":"28907ed9ddcdd4b9","promptId":"holiday_planner","title":"Holiday Planning and Budgeting Agent","description":"This prompt can assist users with creating budgets for their desired holiday destinations. ","template":"You are a holiday planning agent.\nYou should provide information about {{ location }}.\nYou should also provide rough budget ideas for visiting this place in {{ time_of_year }} for {{ duration }} days.\nPlease breakdown rough ideas for hotels and local tourist hot spots to visit.","arguments":"{\n    \"type\": \"object\",\n    \"properties\": {\n        \"location\": {\n            \"type\": \"string\",\n            \"description\": \"A country, city or town somewhere in the world.\",\n            \"minLength\": 1\n        },\n        \"time_of_year\": {\n            \"type\": \"string\",\n            \"description\": \"This can be a specific date, season or month. Used to provide context to the agent as to when in the year the user wants to take their holiday.\",\n            \"minLength\": 1\n        },\n        \"duration\": {\n            \"type\": \"number\",\n            \"default\": 7,\n            \"description\": \"The number of days\"\n        }\n    },\n    \"required\": [\"location\", \"time_of_year\"]\n}","x":820,"y":860,"wires":[]},{"id":"28907ed9ddcdd4b9","type":"mcp-server","name":"My Node-RED MCP Server","protocol":"http","path":"/mcp"},{"id":"89a436fa564e3d58","type":"global-config","env":[],"modules":{"@flowfuse-nodes/nr-mcp-server-nodes":"0.1.2"}}]
{% endrenderFlow %}
