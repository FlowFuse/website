---
title: "Node-RED - Catch Node"
---
# Catch

Catches and handles errors that occur in flows.

## Where and why do we use the Catch node?

The Catch node handles errors within your flows, preventing crashes and enabling graceful error recovery. When an error occurs in any node, the Catch node intercepts it and lets you respond appropriately - whether that's logging the error, retrying the operation, sending alerts, or providing user feedback. This is essential for building robust flows that can handle unexpected situations without failing completely.

**Note:** Some third-party nodes have their own error-handling mechanisms, such as updating status or sending custom error messages, which may not properly inform the runtime about errors occurring. The Catch node cannot capture or handle these errors.

## Modes of operation

The Catch node can be configured to catch errors from different scopes:

### All Nodes

Captures errors from all nodes in the same tab or flow. This is useful for implementing flow-wide error handling where you want a single catch-all error handler.

### Same Group

Limits error capture to nodes within the same group as the Catch node. Use this when you want isolated error handling for specific sections of your flow that are grouped together.

### Selected Nodes

Captures errors from specific nodes you choose. This gives you fine-grained control over which nodes' errors are handled by this particular Catch node, useful when different nodes need different error handling strategies.

## How the node handles messages

When an error occurs in a monitored node, the Catch node emits a message object containing error information. The node doesn't modify or stop the original error - it creates a new message flow that you can use to respond to the error.

The message object emitted by the Catch node contains:

- **payload** - the payload that was passed to the node which threw the error
- **error.message** - the error message text
- **error.source** - object containing information about the node that logged the error:
  - **id** - the source node id
  - **type** - the type of the source node
  - **name** - the name, if set, of the source node
  - **count** - how many times this message has been thrown by this node

This information lets you implement sophisticated error handling logic, including conditional responses based on which node failed or what type of error occurred.

## Examples

### Error handling for external integrations

The Catch node handles errors when interacting with APIs, including network issues, response errors, server unavailability, database connection losses, timeout errors, and MQTT broker disconnections. It can also trigger retry actions as necessary.

In this example, the inject node sets a request timeout of 2000 milliseconds. The HTTP request node calls a mock URL with a 3-second delay parameter, simulating a delayed response. This causes a timeout error that the Catch node intercepts. After catching the error, the flow retries the request after a 5-second delay.



::render-flow
---
height: 200
flow: "W3siaWQiOiJhYTNlNTQyZTJiMzc5ZDllIiwidHlwZSI6ImNhdGNoIiwieiI6ImRmZjZmYTkzOGNmZGE1YzgiLCJuYW1lIjoiIiwic2NvcGUiOm51bGwsInVuY2F1Z2h0IjpmYWxzZSwieCI6MTQwLCJ5Ijo0MjAsIndpcmVzIjpbWyJmNTIxNjVkNjQyOGJmNDAxIiwiN2MzZDhkOTI3YzJiODdkOSJdXX0seyJpZCI6ImQ2ZDg3ZDc1YzIzMTExOGEiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImRmZjZmYTkzOGNmZGE1YzgiLCJuYW1lIjoiU2VuZCByZXF1ZXN0IiwicHJvcHMiOlt7InAiOiJyZXF1ZXN0VGltZW91dCIsInYiOiIyMDAwIiwidnQiOiJudW0ifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MzcwLCJ5IjoyMjAsIndpcmVzIjpbWyIyYTY4NGJmZTg2YmYzNTk3Il1dfSx7ImlkIjoiMmE2ODRiZmU4NmJmMzU5NyIsInR5cGUiOiJodHRwIHJlcXVlc3QiLCJ6IjoiZGZmNmZhOTM4Y2ZkYTVjOCIsIm5hbWUiOiIiLCJtZXRob2QiOiJHRVQiLCJyZXQiOiJ0eHQiLCJwYXl0b3FzIjoicXVlcnkiLCJ1cmwiOiJodHRwczovL3JlcXJlcy5pbi9hcGkvdXNlcnM/ZGVsYXk9MyIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4Ijo1NTAsInkiOjI4MCwid2lyZXMiOltbImRmMWM0Y2JhNjA2MjQ2NTQiXV19LHsiaWQiOiJkZjFjNGNiYTYwNjI0NjU0IiwidHlwZSI6ImRlYnVnIiwieiI6ImRmZjZmYTkzOGNmZGE1YzgiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NDAsInkiOjI4MCwid2lyZXMiOltdfSx7ImlkIjoiZjUyMTY1ZDY0MjhiZjQwMSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkZmY2ZmE5MzhjZmRhNWM4IiwibmFtZSI6ImRlYnVnIDIiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjM2MCwieSI6NDQwLCJ3aXJlcyI6W119LHsiaWQiOiI3YzNkOGQ5MjdjMmI4N2Q5IiwidHlwZSI6ImRlbGF5IiwieiI6ImRmZjZmYTkzOGNmZGE1YzgiLCJuYW1lIjoiIiwicGF1c2VUeXBlIjoiZGVsYXkiLCJ0aW1lb3V0IjoiNSIsInRpbWVvdXRVbml0cyI6InNlY29uZHMiLCJyYXRlIjoiMSIsIm5iUmF0ZVVuaXRzIjoiMSIsInJhdGVVbml0cyI6InNlY29uZCIsInJhbmRvbUZpcnN0IjoiMSIsInJhbmRvbUxhc3QiOiI1IiwicmFuZG9tVW5pdHMiOiJzZWNvbmRzIiwiZHJvcCI6ZmFsc2UsImFsbG93cmF0ZSI6ZmFsc2UsIm91dHB1dHMiOjEsIngiOjM2MCwieSI6MzgwLCJ3aXJlcyI6W1siMmE2ODRiZmU4NmJmMzU5NyJdXX0seyJpZCI6ImMyZGViMTgyZTJjMjRlOTgiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJkZmY2ZmE5MzhjZmRhNWM4IiwibmFtZSI6IlNlbmQgcmVxdWVzdCB3aXRoIHRpbWVvdXQgb2YgMjAwMCBtaWwgc2Vjb25kcyIsImluZm8iOiIiLCJ4IjoyOTAsInkiOjE2MCwid2lyZXMiOltdfSx7ImlkIjoiMzAzY2JlYWQ2YTU4OTUxNyIsInR5cGUiOiJjb21tZW50IiwieiI6ImRmZjZmYTkzOGNmZGE1YzgiLCJuYW1lIjoiU2V0IGEgZGVsYXkgb2YgMyBzZWNvbmRzIGZvciB0aGUgcmVzcG9uc2UuIiwiaW5mbyI6IiIsIngiOjY2MCwieSI6MjIwLCJ3aXJlcyI6W119LHsiaWQiOiI4MjhmYjFhMjU1YWFlYjY1IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiZGZmNmZhOTM4Y2ZkYTVjOCIsIm5hbWUiOiJSZXRyeSByZXF1ZXN0IGFmdGVyIDUgc2Vjb25kcyBpZiByZXF1ZXN0IHRpbWVvdXQiLCJpbmZvIjoiIiwieCI6MjQwLCJ5IjozMjAsIndpcmVzIjpbXX1d"
---
::



### User input validation

In applications with user input, validation errors can disrupt the flow. The Catch node handles these errors, providing feedback or corrective actions to guide users.

In this example, the function node attempts to sort input data received from an inject node using the sort method, which only works with arrays. Sending other data types causes an error that the Catch node catches, which then sends a validation message to the user.



::render-flow
---
height: 200
flow: "W3siaWQiOiI1YjUzOTJiZGEzNTE5Y2E1IiwidHlwZSI6ImluamVjdCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IlNlbmQgaW52YWxpZCBpbnB1dCIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiVGhpcyBpcyBzdHJpbmciLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjI0MCwieSI6MTYwLCJ3aXJlcyI6W1siMmMzZjUxNzE2NWY3ZWUzNyJdXX0seyJpZCI6ImY2MzIzOWRiY2EzOGI0YmQiLCJ0eXBlIjoiY2F0Y2giLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiIiLCJzY29wZSI6bnVsbCwidW5jYXVnaHQiOmZhbHNlLCJ4IjoyMDAsInkiOjQwMCwid2lyZXMiOltbIjIyMjEyMWY1MjgwYTY4ZDgiLCJkMGYwNjJhNjY0NDIwMDUwIl1dfSx7ImlkIjoiMjIyMTIxZjUyODBhNjhkOCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjM4MCwieSI6MzgwLCJ3aXJlcyI6W119LHsiaWQiOiJjNzliZjVmNTNmMjg0MzM4IiwidHlwZSI6ImluamVjdCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IlNlbmQgdmFsaWQgaW5wdXQiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IlsxLDIsMyw0LDUsNiw3LDgsOSwxMF0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoyNDAsInkiOjI0MCwid2lyZXMiOltbIjJjM2Y1MTcxNjVmN2VlMzciXV19LHsiaWQiOiIyYzNmNTE3MTY1ZjdlZTM3IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiU29ydCBkYXRhIGFycmF5IiwiZnVuYyI6ImxldCBkYXRhID0gbXNnLnBheWxvYWQ7XG5kYXRhID0gZGF0YS5zb3J0KChhLGIpPT5hK2IpXG5tc2cucGF5bG9hZCA9IGRhdGFcbnJldHVybiBtc2c7Iiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo2MjAsInkiOjIwMCwid2lyZXMiOltbXV19LHsiaWQiOiI3YzBhYWRkMTc2NmMyOTA5IiwidHlwZSI6ImRlYnVnIiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiZGVidWcgMiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2MDAsInkiOjQ0MCwid2lyZXMiOltdfSx7ImlkIjoiZDBmMDYyYTY2NDQyMDA1MCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6InBsZWFzZSBlbnRlciB2YWxpZCBpbnB1dCAiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NDAwLCJ5Ijo0NDAsIndpcmVzIjpbWyI3YzBhYWRkMTc2NmMyOTA5Il1dfSx7ImlkIjoiNTFmOWE0NDMxZjY2N2RkNCIsInR5cGUiOiJjb21tZW50IiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiU2VuZCBhbGVydCB3aGVuIGludmFsaWQgaW5wdXQgcmVjaWV2ZWQiLCJpbmZvIjoiIiwieCI6NDEwLCJ5IjozMDAsIndpcmVzIjpbXX0seyJpZCI6ImE2NmMyZjcyNzQ0ZDdiMzMiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IkZ1bmN0aW9uIHNvcnRzIGRhdGEgYXJyYXkgcmVjaXZlZCBieSBpbmplY3Qgbm9kZSIsImluZm8iOiIiLCJ4Ijo0NDAsInkiOjgwLCJ3aXJlcyI6W119XQ=="
---
::



## Node Documentation

<div class="core-node-doc">

<p>Catch errors thrown by nodes on the same tab.</p> <h3>Outputs</h3> <dl class="message-properties">
<dt>error.message <span class="property-type">string</span></dt>
<dd>the error message.</dd>
<dt>error.source.id <span class="property-type">string</span></dt>
<dd>the id of the node that threw the error.</dd>
<dt>error.source.type <span class="property-type">string</span></dt>
<dd>the type of the node that threw the error.</dd>
<dt>error.source.name <span class="property-type">string</span></dt>
<dd>the name, if set, of the node that threw the error.</dd>
</dl> <h3>Details</h3> <p>If a node throws an error whilst handling a message, the flow will typically
halt. This node can be used to catch those errors and handle them with a
dedicated flow.</p> <p>By default, the node will catch errors thrown by any node on the same tab. Alternatively
it can be targetted at specific nodes, or configured to only catch errors that
have not already been caught by a 'targeted' catch node.</p> <p>When an error is thrown, all matching catch nodes will receive the message.</p> <p>If an error is thrown within a subflow, the error will get handled by any
catch nodes within the subflow. If none exists, the error will be propagated
up to the tab the subflow instance is on.</p> <p>If the message already has a <code>error</code> property, it is copied to <code>_error</code>.</p>

</div>