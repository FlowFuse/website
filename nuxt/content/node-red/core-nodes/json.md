---
title: "Node-RED - JSON Node"
---
# JSON

Converts between JSON strings and JavaScript objects.

## Where and why do we use the JSON node?

The JSON node processes JavaScript Object Notation (JSON) data. It converts between JSON-formatted strings and JavaScript objects, making it essential when working with APIs, storing data, or transmitting information between different services. This bidirectional conversion lets you parse incoming JSON data for processing and format JavaScript objects into JSON strings for output.

## Modes of operation

The JSON node operates in two directions depending on what it detects in the input:

### JSON String to Object

When the input is a JSON string, the node parses it into a JavaScript object. This mode is essential when receiving data from APIs, reading JSON files, or processing JSON payloads from HTTP requests. Once converted to an object, you can access and manipulate the data using standard JavaScript operations.

### Object to JSON String

When the input is a JavaScript object, the node converts it into a JSON string. Use this mode when preparing data to send to APIs, writing to files, or transmitting structured data. You can optionally format the output with indentation for improved readability.

### Automatic Detection

The node automatically detects whether the input is a JSON string or JavaScript object and performs the appropriate conversion. You can also configure it to always convert in a specific direction or validate JSON without conversion.

## How the node handles messages

The JSON node processes the `msg.payload` property by default, but you can configure it to work with any message property. After conversion, it replaces the property with the converted value.

When parsing JSON strings, the node validates the syntax and reports errors if the JSON is malformed. When converting objects to strings, it handles nested structures, arrays, and standard JavaScript data types (strings, numbers, booleans, null).

The node can format JSON output with pretty printing, adding indentation and line breaks to make the structure more readable. This is useful for debugging or generating human-readable output files.

## Examples

### Monitoring equipment efficiency

Suppose you have a JSON data stream from sensors installed on an assembly line in a manufacturing plant. The JSON objects include equipment name, timestamp, and efficiency percentage. This flow extracts the information and calculates a daily average efficiency for each equipment to help with predictive maintenance and production optimization.

**JSON Input:**
```json
{
  "equipment": "Drill Press",
  "timestamp": "2023-09-22T12:34:56Z",
  "efficiency": 89.5
}
```

The flow parses incoming JSON strings, groups messages together, calculates the average efficiency, and converts the result back to JSON format.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2MDllNWViNjM0YmVhZjVjIiwidHlwZSI6InRhYiIsImxhYmVsIjoiRmxvdyA0IiwiZGlzYWJsZWQiOmZhbHNlLCJpbmZvIjoiIiwiZW52IjpbXX0seyJpZCI6ImEwY2UyZWEwLmI3NTk3IiwidHlwZSI6ImluamVjdCIsInoiOiI2MDllNWViNjM0YmVhZjVjIiwibmFtZSI6IlNpbXVsYXRlIERhdGEiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IjAuNSIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcImVxdWlwbWVudFwiOlwiRHJpbGwgUHJlc3NcIixcInRpbWVzdGFtcFwiOlwiMjAyMy0wOS0yMlQxMjozNDo1NlpcIixcImVmZmljaWVuY3lcIjo4OS41fSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjE0MCwieSI6ODAsIndpcmVzIjpbWyI4ZDMyYmQ4ZC42ZDVjYyJdXX0seyJpZCI6IjhkMzJiZDhkLjZkNWNjIiwidHlwZSI6Impzb24iLCJ6IjoiNjA5ZTVlYjYzNGJlYWY1YyIsIm5hbWUiOiJQYXJzZSBKU09OIiwicHJvcGVydHkiOiJwYXlsb2FkIiwiYWN0aW9uIjoib2JqIiwicHJldHR5IjpmYWxzZSwieCI6MzMwLCJ5Ijo4MCwid2lyZXMiOltbIjY3M2RjODllLjY0YWMxOCJdXX0seyJpZCI6IjY3M2RjODllLjY0YWMxOCIsInR5cGUiOiJqb2luIiwieiI6IjYwOWU1ZWI2MzRiZWFmNWMiLCJuYW1lIjoiR3JvdXAgTWVzc2FnZXMiLCJtb2RlIjoiY3VzdG9tIiwiYnVpbGQiOiJhcnJheSIsInByb3BlcnR5IjoicGF5bG9hZCIsInByb3BlcnR5VHlwZSI6Im1zZyIsImtleSI6InRvcGljIiwiam9pbmVyIjoiXFxuIiwiam9pbmVyVHlwZSI6InN0ciIsImFjY3VtdWxhdGUiOmZhbHNlLCJ0aW1lb3V0IjoiIiwiY291bnQiOiIxMCIsInJlZHVjZVJpZ2h0IjpmYWxzZSwicmVkdWNlRXhwIjoiIiwicmVkdWNlSW5pdCI6IiIsInJlZHVjZUluaXRUeXBlIjoiIiwicmVkdWNlRml4dXAiOiIiLCJ4Ijo1MzAsInkiOjgwLCJ3aXJlcyI6W1siMTc4MGUxMmEuYWE0MDdmIl1dfSx7ImlkIjoiMTc4MGUxMmEuYWE0MDdmIiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6IjYwOWU1ZWI2MzRiZWFmNWMiLCJuYW1lIjoiQ2FsY3VsYXRlIEVmZmljaWVuY3kiLCJmdW5jIjoibGV0IGFyciA9IG1zZy5wYXlsb2FkO1xubGV0IHN1bSA9IDA7XG5sZXQgY291bnQgPSAwO1xuXG5hcnIuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgc3VtICs9IGl0ZW0uZWZmaWNpZW5jeTtcbiAgICBjb3VudCsrO1xufSk7XG5cbmxldCBhdmVyYWdlRWZmaWNpZW5jeSA9IHN1bSAvIGNvdW50O1xuXG5tc2cucGF5bG9hZCA9IHtcbiAgICBlcXVpcG1lbnQ6IGFyclswXS5lcXVpcG1lbnQsXG4gICAgYXZlcmFnZUVmZmljaWVuY3k6IGF2ZXJhZ2VFZmZpY2llbmN5XG59O1xuXG5yZXR1cm4gbXNnOyIsIm91dHB1dHMiOjEsInRpbWVvdXQiOiIiLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjc1MCwieSI6ODAsIndpcmVzIjpbWyI2Mjg1ZGRkMjlmOGIzOGM3Il1dfSx7ImlkIjoiNmE3OWJhOS40NGRiNDQ0IiwidHlwZSI6ImRlYnVnIiwieiI6IjYwOWU1ZWI2MzRiZWFmNWMiLCJuYW1lIjoiT3V0cHV0IiwiYWN0aXZlIjpmYWxzZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwieCI6MTExMCwieSI6ODAsIndpcmVzIjpbXX0seyJpZCI6IjYyODVkZGQyOWY4YjM4YzciLCJ0eXBlIjoianNvbiIsInoiOiI2MDllNWViNjM0YmVhZjVjIiwibmFtZSI6IlBhcnNlIE9iamVjdCIsInByb3BlcnR5IjoicGF5bG9hZCIsImFjdGlvbiI6InN0ciIsInByZXR0eSI6ZmFsc2UsIngiOjk1MCwieSI6ODAsIndpcmVzIjpbWyI2YTc5YmE5LjQ0ZGI0NDQiXV19XQ=="
---
::



## Node Documentation

<div class="core-node-doc">

<p>Converts between a JSON string and its JavaScript object representation, in either direction.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | string</span></dt>
<dd>A JavaScript object or JSON string.</dd>
<dt>schema<span class="property-type">object</span></dt>
<dd>An optional JSON Schema object to validate the payload against.
The property will be deleted before the <code>msg</code> is sent to the next node.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | string</span></dt>
<dd>
<ul>
<li>If the input is a JSON string it tries to parse it to a JavaScript object.</li>
<li>If the input is a JavaScript object it creates a JSON string. The string can optionally be well-formatted.</li>
</ul>
</dd>
<dt>schemaError<span class="property-type">array</span></dt>
<dd>If JSON schema validation fails, the catch node will have a <code>schemaError</code> property
containing an array of errors.</dd>
</dl> <h3>Details</h3> <p>By default, the node operates on <code>msg.payload</code>, but can be configured
to convert any message property.</p> <p>The node can also be configured to ensure a particular encoding instead of toggling
between the two. This can be used, for example, with the <code>HTTP In</code>
node to ensure the payload is a parsed object even if an incoming request
did not set its content-type correctly for the HTTP In node to do the conversion.</p> <p>If the node is configured to ensure the property is encoded as a String and it
receives a String, no further checks will be made of the property. It will
not check the String is valid JSON nor will it reformat it if the format option
is selected.</p> <p>For more details about JSON Schema you can consult the specification
<a href="http://json-schema.org/latest/json-schema-validation.html">here</a>.</p>

</div>