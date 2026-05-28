---
title: "MCP Prompt"
description: "The MCP Prompt node allows you to create pre-configured prompt templates that users can easily invoke from their MCP client."
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


Define your prompt text using **double curly braces `{{ }}`** for variables.


### Arguments

`JSON` — *Required*
JSON schema defining the template variables that users can customize. This follows the same **JSON Schema** format used in MCP Tool input schemas.

## Prompt Template Examples

### Basic Example


```
Hello {{ name }}! Welcome to {{ location }}.
```


**Variables:** `name`, `location`

### Complex Example


```
You are a holiday planning agent.
You should provide information about {{ location }}.
You should also provide rough budget ideas for visiting this place in {{ time_of_year }} for {{ duration }} days.
Please breakdown rough ideas for hotels and local tourist hot spots to visit.
```


**Variables:** `location`, `time_of_year`, `duration`

### Multi-Section Example


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




::render-flow
---
height: 300
flow: "W3siaWQiOiIxZGQ1NmFiYzUzZjUwZGUwIiwidHlwZSI6Imdyb3VwIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiTUNQIFByb21wdHMiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImNjMmJlZGI4NTJkOGNlYTQiLCIyNDFlNjA0MTQ3MGQ3MzVjIl0sIngiOjcxNCwieSI6ODE5LCJ3IjoyMTIsImgiOjE0Mn0seyJpZCI6ImNjMmJlZGI4NTJkOGNlYTQiLCJ0eXBlIjoibWNwLXByb21wdCIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwiZyI6IjFkZDU2YWJjNTNmNTBkZTAiLCJuYW1lIjoiIiwic2VydmVyIjoiMjg5MDdlZDlkZGNkZDRiOSIsInByb21wdElkIjoidXBwZXJjYXNlIiwidGl0bGUiOiJVcHBlcmNhc2UiLCJkZXNjcmlwdGlvbiI6IlRoaXMgcHJvbXB0IHdpbGwgcmV0dXJuIHRoZSBwcm92aWRlZCBjb250ZW50IGluIGFsbCB1cHBlcmNhc2UgY2hhcmFjdGVycyIsInRlbXBsYXRlIjoiUGxlYXNlIHJldHVybiB0aGUgZm9sbG93aW5nIGluIHVwcGVyY2FzZToge3ttZXNzYWdlfX0iLCJhcmd1bWVudHMiOiJ7XG4gIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICBcInByb3BlcnRpZXNcIjoge1xuICAgIFwibWVzc2FnZVwiOiB7XG4gICAgICAgIFwidHlwZVwiOiBcInN0cmluZ1wiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIHRleHQgcHJvdmlkZWQgYnkgdGhlIHVzZXJcIlxuICAgIH1cbiAgfSxcbiAgXCJyZXF1aXJlZFwiOiBbXCJtZXNzYWdlXCJdXG59IiwieCI6ODAwLCJ5Ijo5MjAsIndpcmVzIjpbXX0seyJpZCI6IjI0MWU2MDQxNDcwZDczNWMiLCJ0eXBlIjoibWNwLXByb21wdCIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwiZyI6IjFkZDU2YWJjNTNmNTBkZTAiLCJuYW1lIjoiIiwic2VydmVyIjoiMjg5MDdlZDlkZGNkZDRiOSIsInByb21wdElkIjoiaG9saWRheV9wbGFubmVyIiwidGl0bGUiOiJIb2xpZGF5IFBsYW5uaW5nIGFuZCBCdWRnZXRpbmcgQWdlbnQiLCJkZXNjcmlwdGlvbiI6IlRoaXMgcHJvbXB0IGNhbiBhc3Npc3QgdXNlcnMgd2l0aCBjcmVhdGluZyBidWRnZXRzIGZvciB0aGVpciBkZXNpcmVkIGhvbGlkYXkgZGVzdGluYXRpb25zLiAiLCJ0ZW1wbGF0ZSI6IllvdSBhcmUgYSBob2xpZGF5IHBsYW5uaW5nIGFnZW50LlxuWW91IHNob3VsZCBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHt7IGxvY2F0aW9uIH19LlxuWW91IHNob3VsZCBhbHNvIHByb3ZpZGUgcm91Z2ggYnVkZ2V0IGlkZWFzIGZvciB2aXNpdGluZyB0aGlzIHBsYWNlIGluIHt7IHRpbWVfb2ZfeWVhciB9fSBmb3Ige3sgZHVyYXRpb24gfX0gZGF5cy5cblBsZWFzZSBicmVha2Rvd24gcm91Z2ggaWRlYXMgZm9yIGhvdGVscyBhbmQgbG9jYWwgdG91cmlzdCBob3Qgc3BvdHMgdG8gdmlzaXQuIiwiYXJndW1lbnRzIjoie1xuICAgIFwidHlwZVwiOiBcIm9iamVjdFwiLFxuICAgIFwicHJvcGVydGllc1wiOiB7XG4gICAgICAgIFwibG9jYXRpb25cIjoge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSBjb3VudHJ5LCBjaXR5IG9yIHRvd24gc29tZXdoZXJlIGluIHRoZSB3b3JsZC5cIixcbiAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0aW1lX29mX3llYXJcIjoge1xuICAgICAgICAgICAgXCJ0eXBlXCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhpcyBjYW4gYmUgYSBzcGVjaWZpYyBkYXRlLCBzZWFzb24gb3IgbW9udGguIFVzZWQgdG8gcHJvdmlkZSBjb250ZXh0IHRvIHRoZSBhZ2VudCBhcyB0byB3aGVuIGluIHRoZSB5ZWFyIHRoZSB1c2VyIHdhbnRzIHRvIHRha2UgdGhlaXIgaG9saWRheS5cIixcbiAgICAgICAgICAgIFwibWluTGVuZ3RoXCI6IDFcbiAgICAgICAgfSxcbiAgICAgICAgXCJkdXJhdGlvblwiOiB7XG4gICAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIixcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiA3LFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBudW1iZXIgb2YgZGF5c1wiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwicmVxdWlyZWRcIjogW1wibG9jYXRpb25cIiwgXCJ0aW1lX29mX3llYXJcIl1cbn0iLCJ4Ijo4MjAsInkiOjg2MCwid2lyZXMiOltdfSx7ImlkIjoiMjg5MDdlZDlkZGNkZDRiOSIsInR5cGUiOiJtY3Atc2VydmVyIiwibmFtZSI6Ik15IE5vZGUtUkVEIE1DUCBTZXJ2ZXIiLCJwcm90b2NvbCI6Imh0dHAiLCJwYXRoIjoiL21jcCJ9LHsiaWQiOiI4OWE0MzZmYTU2NGUzZDU4IiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7IkBmbG93ZnVzZS1ub2Rlcy9uci1tY3Atc2VydmVyLW5vZGVzIjoiMC4xLjIifX1d"
---
::


