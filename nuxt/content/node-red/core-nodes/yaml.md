---
title: "Node-RED - YAML Node"
---
# YAML

Converts between YAML format and JavaScript objects.

## Where and why do we use the YAML node?

The YAML node processes YAML (Yet Another Markup Language) data, which is a human-readable data serialization format. It converts between YAML strings and JavaScript objects, making it essential when working with configuration files, Kubernetes manifests, CI/CD pipelines, or any system that uses YAML for data representation. The format's readability makes it popular for configuration management and data exchange.

## Modes of operation

The YAML node operates bidirectionally, automatically detecting the input format:

### YAML to Object

When the input is a YAML string, the node parses it into a JavaScript object. This mode is essential when reading YAML configuration files, processing YAML data from APIs, or converting YAML documents into a structure you can manipulate programmatically.

### Object to YAML

When the input is a JavaScript object, the node converts it into YAML format. Use this mode when generating configuration files, creating YAML documents for deployment systems, or formatting data in a human-readable way for storage or transmission.

## How the node handles messages

The YAML node processes a configurable message property (default is `msg.payload`). After successful conversion, it replaces that property with the converted value. If parsing fails due to invalid syntax, the node throws an error that can be caught using a Catch node.

When no data is passed in the configured property, the node passes the full message unchanged to the next node. This allows it to be used in flows where the property might not always be present.

The node validates the structure during parsing and will report errors for malformed YAML, such as incorrect indentation, missing colons, or unclosed quotes.

## Examples

### Parsing JSON to YAML

The YAML node automatically detects the input format. When it receives JSON, it converts the data to YAML format. In this example, a JSON object `{"foo":"bar"}` is converted to YAML.



::render-flow
---
height: 200
flow: "W3siaWQiOiI0NDgxZWEwOGE5ZmUyN2UxIiwidHlwZSI6ImluamVjdCIsInoiOiI3ZDM4ODAzZTNkNDBlZTdlIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoie1wiZm9vXCI6XCJiYXJcIn0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoxOTAsInkiOjIyMCwid2lyZXMiOltbImIzMTUzNjgzM2QyN2FlZTAiXV19LHsiaWQiOiJiMzE1MzY4MzNkMjdhZWUwIiwidHlwZSI6InlhbWwiLCJ6IjoiN2QzODgwM2UzZDQwZWU3ZSIsInByb3BlcnR5IjoicGF5bG9hZCIsIm5hbWUiOiJQYXJzZSBKU09OIHRvIFlBTUwiLCJ4Ijo0MDAsInkiOjIyMCwid2lyZXMiOltbIjkwZmVkMTY4YTlkMWE0YjUiXV19LHsiaWQiOiI5MGZlZDE2OGE5ZDFhNGI1IiwidHlwZSI6ImRlYnVnIiwieiI6IjdkMzg4MDNlM2Q0MGVlN2UiLCJuYW1lIjoiRGVidWc6IE91dHB1dCBZQU1MIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjY0MCwieSI6MjIwLCJ3aXJlcyI6W119XQ=="
---
::



### Parsing YAML to JSON

When the input is YAML format, the node automatically converts it to a JavaScript object (JSON). This makes it easy to work with YAML configuration files in Node-RED flows.



::render-flow
---
height: 200
flow: "W3siaWQiOiJhMGRjMzBkOGY1MjI1OTYyIiwidHlwZSI6ImluamVjdCIsInoiOiI3ZDM4ODAzZTNkNDBlZTdlIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiZm9vOiBiYXIiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjE4MCwieSI6MzAwLCJ3aXJlcyI6W1siMGZjMjE2YjhjZWJjY2MyNSJdXX0seyJpZCI6IjBmYzIxNmI4Y2ViY2NjMjUiLCJ0eXBlIjoieWFtbCIsInoiOiI3ZDM4ODAzZTNkNDBlZTdlIiwicHJvcGVydHkiOiJwYXlsb2FkIiwibmFtZSI6IlBhcnNlIFlBTUwgdG8gSlNPTiIsIngiOjQwMCwieSI6MzAwLCJ3aXJlcyI6W1siYzlhM2Y2NmU2N2I0MWFkNCJdXX0seyJpZCI6ImM5YTNmNjZlNjdiNDFhZDQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiN2QzODgwM2UzZDQwZWU3ZSIsIm5hbWUiOiJEZWJ1ZzogT3V0cHV0IEpTT04iLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjQwLCJ5IjozMDAsIndpcmVzIjpbXX1d"
---
::



### Error handling for invalid input

When the input is malformed, the YAML node throws an error. This error can be caught using a Catch node, allowing you to handle parsing failures gracefully. In this example, the YAML string is missing a closing quote, which triggers an error.



::render-flow
---
height: 200
flow: "W3siaWQiOiIwZmMyMTZiOGNlYmNjYzI1IiwidHlwZSI6InlhbWwiLCJ6IjoiN2QzODgwM2UzZDQwZWU3ZSIsInByb3BlcnR5IjoicGF5bG9hZCIsIm5hbWUiOiJJbnB1dCBpbnZhbGlkIiwieCI6MzcwLCJ5Ijo0MjAsIndpcmVzIjpbW11dfSx7ImlkIjoiYTBkYzMwZDhmNTIyNTk2MiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiN2QzODgwM2UzZDQwZWU3ZSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6ImZvbzogXCJiYXIiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjE4MCwieSI6NDIwLCJ3aXJlcyI6W1siMGZjMjE2YjhjZWJjY2MyNSJdXX0seyJpZCI6ImM5YTNmNjZlNjdiNDFhZDQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiN2QzODgwM2UzZDQwZWU3ZSIsIm5hbWUiOiJDYXVnaHQgZXJyb3IiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MzcwLCJ5Ijo1MDAsIndpcmVzIjpbXX0seyJpZCI6IjZlM2JhMWViYzdiZWFmODEiLCJ0eXBlIjoiY2F0Y2giLCJ6IjoiN2QzODgwM2UzZDQwZWU3ZSIsIm5hbWUiOiIiLCJzY29wZSI6WyIwZmMyMTZiOGNlYmNjYzI1Il0sInVuY2F1Z2h0IjpmYWxzZSwieCI6MTkwLCJ5Ijo1MDAsIndpcmVzIjpbWyJjOWEzZjY2ZTY3YjQxYWQ0Il1dfV0="
---
::




## Node Documentation

<div class="core-node-doc">

<p>Converts between a YAML formatted string and its JavaScript object representation, in either direction.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | string</span></dt>
<dd>A JavaScript object or YAML string.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | string</span></dt>
<dd>
<ul>
<li>If the input is a YAML string it tries to parse it to a JavaScript object.</li>
<li>If the input is a JavaScript object it creates a YAML string.</li>
</ul>
</dd>
</dl>

</div>