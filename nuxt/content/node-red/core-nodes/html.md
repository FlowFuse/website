---
title: "Node-RED - HTML Node"
---
# HTML

Extracts elements from an HTML document.

## Where and why do we use the HTML node?

The HTML node parses HTML documents and extracts specific elements using CSS selectors. This is essential when you need to scrape data from web pages, extract specific content from HTML responses, or process HTML documents to retrieve structured information. Unlike the [template node](/node-red/core-nodes/template/) which generates HTML, this node is purely for parsing and extraction.

## How it works

The HTML node uses CSS selectors to find and extract elements from HTML content in `msg.payload`. You specify which elements to extract using standard CSS selector syntax (like `h1`, `.classname`, `#id`, or more complex selectors). The node supports a combination of CSS and jQuery selectors - see the [css-select documentation](https://github.com/fb55/css-select) for the full syntax.

The selector can be configured in the node's edit panel or provided dynamically via `msg.select`.

## Modes of operation

The HTML node can output extracted content in different ways:

### Single Message with Array

Returns one message where `msg.payload` contains an array of all matched elements. Use this when you want to process all results together or need to know the total count of matches.

### Multiple Messages

Sends separate messages for each matched element. Each message contains one matched element in `msg.payload` and includes a `msg.parts` property for sequence tracking. Use this when you want to process each match individually through subsequent nodes.

### Return Format

For each matched element, you can choose to return:
- **HTML markup** - the complete HTML including tags and attributes
- **Text content** - just the text with all HTML tags stripped

## How the node handles messages

The HTML node processes the HTML string in `msg.payload`. After parsing and extracting the specified elements, it outputs the results according to the configured mode.

When outputting multiple messages, the node automatically adds the `msg.parts` property to enable proper handling by downstream nodes like Join. This property includes the sequence identifier, message index, and total count.

The node uses CSS selector syntax with jQuery extensions, so you can use:
- Tag selectors: `h1`, `div`, `span`
- Class selectors: `.classname`
- ID selectors: `#elementid`
- Attribute selectors: `[href]`, `[data-value="123"]`
- Complex selectors: `div.content > p`, `ul li:first-child`
- jQuery extensions: `:first`, `:last`, `:even`, `:odd`

## Examples

### Extracting page titles

This example fetches the Node-RED homepage and extracts the text from the `h1` tag. The HTTP Request node retrieves the page, and the HTML node parses it to find the heading.



::render-flow
---
height: 200
flow: "W3siaWQiOiJmZTNmZmE5MThiYTQ1ZjI3IiwidHlwZSI6Imh0bWwiLCJ6IjoiOTlhMGI0NTExMGQ1NTNlYyIsIm5hbWUiOiJTZWxlY3QgSDEgZWxlbWVudCIsInByb3BlcnR5IjoicGF5bG9hZCIsIm91dHByb3BlcnR5IjoicGF5bG9hZCIsInRhZyI6ImgxIiwicmV0IjoiaHRtbCIsImFzIjoic2luZ2xlIiwieCI6NjEwLCJ5Ijo0MCwid2lyZXMiOltbIjA3ZGQxZWZmZjA0ZDIzMWEiXV19LHsiaWQiOiIzMzkzNTliNmE2NzkzYjNkIiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiI5OWEwYjQ1MTEwZDU1M2VjIiwibmFtZSI6IkdldCBOb2RlLVJFRC5vcmcgaG9tZXBhZ2UiLCJtZXRob2QiOiJHRVQiLCJyZXQiOiJ0eHQiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiaHR0cHM6Ly9ub2RlcmVkLm9yZy8iLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6IiIsInNlbmRlcnIiOnRydWUsImhlYWRlcnMiOltdLCJ4IjozNTAsInkiOjQwLCJ3aXJlcyI6W1siZmUzZmZhOTE4YmE0NWYyNyJdXX0seyJpZCI6ImU3ZGNkY2ZmNDljMTRhYjEiLCJ0eXBlIjoiaW5qZWN0IiwieiI6Ijk5YTBiNDUxMTBkNTUzZWMiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MTIwLCJ5Ijo0MCwid2lyZXMiOltbIjMzOTM1OWI2YTY3OTNiM2QiXV19LHsiaWQiOiIwN2RkMWVmZmYwNGQyMzFhIiwidHlwZSI6ImRlYnVnIiwieiI6Ijk5YTBiNDUxMTBkNTUzZWMiLCJuYW1lIjoiUHJpbnQgSDEgY29udGVudCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo4MjAsInkiOjQwLCJ3aXJlcyI6W119XQ=="
---
::




## Node Documentation

<div class="core-node-doc">

<p>Extracts elements from an html document held in <code>msg.payload</code> using a CSS selector.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload <span class="property-type">string</span></dt>
<dd>the html string from which to extract elements.</dd>
<dt class="optional">select <span class="property-type">string</span></dt>
<dd>if not configured in the edit panel the selector can be set as a property of msg.</dd>
</dl> <h3>Output</h3> <dl class="message-properties">
<dt>payload <span class="property-type">array | string</span></dt>
<dd>the result can be either a single message with a payload containing an array of the matched elements, or multiple
messages that each contain a matched element. If multiple messages are sent they will also have <code>parts</code> set.</dd>
</dl> <h3>Details</h3> <p>This node supports a combination of CSS and jQuery selectors. See the
<a href="https://github.com/fb55/CSSselect#user-content-supported-selectors" target="_blank">css-select documentation</a> for more information
on the supported syntax.</p>

</div>