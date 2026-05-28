---
title: "Node-RED - Link Node"
---
# Link

Creates virtual connections between nodes without visible wires, helping organize complex flows.

## Where and why do we use the Link nodes?

The Link In and Link Out nodes help organize flows by creating virtual connections that aren't visible until selected. This is essential for managing complex flows where physical wires would create visual clutter or when you want to reuse logic across multiple locations. By connecting distant parts of your flow without drawing wires across the canvas, you can keep related nodes grouped together, reduce wire crossings, and make flows more maintainable and easier to understand.

## Modes of operation

Link nodes work in pairs to create virtual connections:

### Link Out Node

Sends messages to one or more Link In nodes. You can configure which Link In nodes receive the message by selecting them from a list. The Link Out node can send to Link In nodes on the same tab or on different tabs, enabling cross-flow communication.

### Link In Node

Receives messages from Link Out nodes. When a Link Out node sends a message, all connected Link In nodes receive a copy. The Link In node acts as a starting point for a new branch of your flow.

### Link Call Node

Sends messages to a Link In node and waits for a response, similar to calling a function. This enables request-response patterns where you need to process data and return results. The response comes from a Link Out node configured to return to the calling Link Call node.

## How the nodes handle messages

Link Out nodes pass messages to their connected Link In nodes exactly as received - no modifications are made. When multiple Link In nodes are connected to a single Link Out, each receives an independent copy of the message.

Link In nodes emit the received message and start a new flow branch. Any nodes connected to a Link In node process the message as if it came from any other node.

Link Call nodes send messages and pause, waiting for a response. The called Link In node processes the message through its connected nodes until reaching a Link Out node configured to return responses. This creates synchronous, function-like behavior within otherwise asynchronous flows.

The virtual connections between Link nodes only become visible in the editor when you select either the Link In or Link Out node, showing which nodes are connected with dashed lines.

## Examples

### Organizing flow sections

Link nodes separate different functional areas of a flow without cluttering the canvas with long wires. This example shows input processing separated from output handling, making each section easier to understand and maintain.



::render-flow
---
height: 200
flow: "W3siaWQiOiIyMmNhNmVmOTY2OGI1ZGRkIiwidHlwZSI6Imdyb3VwIiwieiI6ImY3N2Y2MWI5MDM5NWY1ODgiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyJpbnB1dC1pbmplY3QiLCJwcm9jZXNzLWlucHV0IiwibGluay1vdXQtcHJvY2VzcyIsImxpbmstaW4tb3V0cHV0IiwiZm9ybWF0LW91dHB1dCIsIm91dHB1dC1kZWJ1ZyJdLCJ4IjozMzQsInkiOjUyOTksInciOjc5MiwiaCI6MjAyfSx7ImlkIjoiaW5wdXQtaW5qZWN0IiwidHlwZSI6ImluamVjdCIsInoiOiJmNzdmNjFiOTAzOTVmNTg4IiwiZyI6IjIyY2E2ZWY5NjY4YjVkZGQiLCJuYW1lIjoiU2Vuc29yIERhdGEiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcInRlbXBlcmF0dXJlXCI6MjIsXCJodW1pZGl0eVwiOjY1fSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjQ1MCwieSI6NTM0MCwid2lyZXMiOltbInByb2Nlc3MtaW5wdXQiXV19LHsiaWQiOiJwcm9jZXNzLWlucHV0IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImY3N2Y2MWI5MDM5NWY1ODgiLCJnIjoiMjJjYTZlZjk2NjhiNWRkZCIsIm5hbWUiOiJWYWxpZGF0ZSBJbnB1dCIsImZ1bmMiOiJpZiAoXG4gICAgbXNnLnBheWxvYWQgJiZcbiAgICBtc2cucGF5bG9hZC50ZW1wZXJhdHVyZSAhPT0gdW5kZWZpbmVkICYmXG4gICAgbXNnLnBheWxvYWQuaHVtaWRpdHkgIT09IHVuZGVmaW5lZFxuKSB7XG4gICAgcmV0dXJuIG1zZztcbn1cbnJldHVybiBudWxsOyIsIm91dHB1dHMiOjEsIngiOjc2MCwieSI6NTM0MCwid2lyZXMiOltbImxpbmstb3V0LXByb2Nlc3MiXV19LHsiaWQiOiJsaW5rLW91dC1wcm9jZXNzIiwidHlwZSI6Imxpbmsgb3V0IiwieiI6ImY3N2Y2MWI5MDM5NWY1ODgiLCJnIjoiMjJjYTZlZjk2NjhiNWRkZCIsIm5hbWUiOiJUbyBPdXRwdXQgSGFuZGxlciIsIm1vZGUiOiJsaW5rIiwibGlua3MiOlsibGluay1pbi1vdXRwdXQiXSwieCI6OTM1LCJ5Ijo1MzQwLCJ3aXJlcyI6W119LHsiaWQiOiJsaW5rLWluLW91dHB1dCIsInR5cGUiOiJsaW5rIGluIiwieiI6ImY3N2Y2MWI5MDM5NWY1ODgiLCJnIjoiMjJjYTZlZjk2NjhiNWRkZCIsIm5hbWUiOiJGcm9tIElucHV0IFByb2Nlc3MiLCJsaW5rcyI6WyJsaW5rLW91dC1wcm9jZXNzIl0sIngiOjUxNSwieSI6NTQ2MCwid2lyZXMiOltbImZvcm1hdC1vdXRwdXQiXV19LHsiaWQiOiJmb3JtYXQtb3V0cHV0IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImY3N2Y2MWI5MDM5NWY1ODgiLCJnIjoiMjJjYTZlZjk2NjhiNWRkZCIsIm5hbWUiOiJGb3JtYXQgZm9yIERpc3BsYXkiLCJmdW5jIjoibXNnLnBheWxvYWQgPSBgVGVtcDogJHttc2cucGF5bG9hZC50ZW1wZXJhdHVyZX3CsEMsIEh1bWlkaXR5OiAke21zZy5wYXlsb2FkLmh1bWlkaXR5fSVgO1xucmV0dXJuIG1zZzsiLCJvdXRwdXRzIjoxLCJ4Ijo3NzAsInkiOjU0NjAsIndpcmVzIjpbWyJvdXRwdXQtZGVidWciXV19LHsiaWQiOiJvdXRwdXQtZGVidWciLCJ0eXBlIjoiZGVidWciLCJ6IjoiZjc3ZjYxYjkwMzk1ZjU4OCIsImciOiIyMmNhNmVmOTY2OGI1ZGRkIiwibmFtZSI6IkRpc3BsYXkgT3V0cHV0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbXBsZXRlIjoicGF5bG9hZCIsIngiOjEwMDAsInkiOjU0NjAsIndpcmVzIjpbXX1d"
---
::



### Reusable processing logic

Link In nodes enable reusing the same processing logic from multiple sources without duplicating nodes. This example shows multiple inputs feeding into a single processing pipeline through Link nodes, useful for common transformations or validations.



::render-flow
---
height: 200
flow: "W3siaWQiOiJzb3VyY2UxLWluamVjdCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTFiMmMzZDRlNWY2ZzdoOCIsIm5hbWUiOiJTb3VyY2UgMSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InNvdXJjZSIsInYiOiJzZW5zb3ItMSIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIyNSIsInBheWxvYWRUeXBlIjoibnVtIiwieCI6MTgwLCJ5IjoxNDAsIndpcmVzIjpbWyJsaW5rLW91dC0xIl1dfSx7ImlkIjoic291cmNlMi1pbmplY3QiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImExYjJjM2Q0ZTVmNmc3aDgiLCJuYW1lIjoiU291cmNlIDIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJzb3VyY2UiLCJ2Ijoic2Vuc29yLTIiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiMzAiLCJwYXlsb2FkVHlwZSI6Im51bSIsIngiOjE4MCwieSI6MjAwLCJ3aXJlcyI6W1sibGluay1vdXQtMiJdXX0seyJpZCI6InNvdXJjZTMtaW5qZWN0IiwidHlwZSI6ImluamVjdCIsInoiOiJhMWIyYzNkNGU1ZjZnN2g4IiwibmFtZSI6IlNvdXJjZSAzIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoic291cmNlIiwidiI6InNlbnNvci0zIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IjI4IiwicGF5bG9hZFR5cGUiOiJudW0iLCJ4IjoxODAsInkiOjI2MCwid2lyZXMiOltbImxpbmstb3V0LTMiXV19LHsiaWQiOiJsaW5rLW91dC0xIiwidHlwZSI6Imxpbmsgb3V0IiwieiI6ImExYjJjM2Q0ZTVmNmc3aDgiLCJuYW1lIjoiIiwibW9kZSI6ImxpbmsiLCJsaW5rcyI6WyJsaW5rLWluLXByb2Nlc3MiXSwieCI6MzM1LCJ5IjoxNDAsIndpcmVzIjpbXX0seyJpZCI6Imxpbmstb3V0LTIiLCJ0eXBlIjoibGluayBvdXQiLCJ6IjoiYTFiMmMzZDRlNWY2ZzdoOCIsIm5hbWUiOiIiLCJtb2RlIjoibGluayIsImxpbmtzIjpbImxpbmstaW4tcHJvY2VzcyJdLCJ4IjozMzUsInkiOjIwMCwid2lyZXMiOltdfSx7ImlkIjoibGluay1vdXQtMyIsInR5cGUiOiJsaW5rIG91dCIsInoiOiJhMWIyYzNkNGU1ZjZnN2g4IiwibmFtZSI6IiIsIm1vZGUiOiJsaW5rIiwibGlua3MiOlsibGluay1pbi1wcm9jZXNzIl0sIngiOjMzNSwieSI6MjYwLCJ3aXJlcyI6W119LHsiaWQiOiJsaW5rLWluLXByb2Nlc3MiLCJ0eXBlIjoibGluayBpbiIsInoiOiJhMWIyYzNkNGU1ZjZnN2g4IiwibmFtZSI6IkNvbW1vbiBQcm9jZXNzb3IiLCJsaW5rcyI6WyJsaW5rLW91dC0xIiwibGluay1vdXQtMiIsImxpbmstb3V0LTMiXSwieCI6MTk1LCJ5IjozODAsIndpcmVzIjpbWyJwcm9jZXNzLWRhdGEiXV19LHsiaWQiOiJwcm9jZXNzLWRhdGEiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiYTFiMmMzZDRlNWY2ZzdoOCIsIm5hbWUiOiJDb252ZXJ0IHRvIEZhaHJlbmhlaXQiLCJmdW5jIjoibXNnLnBheWxvYWQgPSAobXNnLnBheWxvYWQgKiA5LzUpICsgMzI7XG5tc2cucGF5bG9hZCA9IGAke21zZy5zb3VyY2V9OiAke21zZy5wYXlsb2FkLnRvRml4ZWQoMSl9wrBGYDtcbnJldHVybiBtc2c7Iiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo0MDAsInkiOjM4MCwid2lyZXMiOltbInJlc3VsdC1kZWJ1ZyJdXX0seyJpZCI6InJlc3VsdC1kZWJ1ZyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhMWIyYzNkNGU1ZjZnN2g4IiwibmFtZSI6IlByb2Nlc3NlZCBSZXN1bHRzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjYyMCwieSI6MzgwLCJ3aXJlcyI6W119XQ=="
---
::



## Node Documentation

<div class="core-node-doc">

<p>Create virtual wires between flows.</p> <h3>Details</h3> <p>The node can be connected to any <code>link out</code> node that exists on any tab.
Once connected, they behave as if they were wired together.</p> <p>The wires between link nodes are only displayed when a link node is selected.
If there are any wires to other tabs, a virtual node is shown that can be clicked
on to jump to the appropriate tab.</p> <p><b>Note: </b>Links cannot be created going into, or out of, a subflow.</p> <p>Create virtual wires between flows.</p> <h3>Details</h3> <p>This node can be configured to either send messages to all <code>link in</code>
nodes it is connected to, or to send a response back to the <code>link call</code>
node that triggered the flow.</p> <p>When in 'send to all' mode, the wires between link nodes are only displayed when
the node is selected. If there are any wires to other tabs, a virtual node
is shown that can be clicked on to jump to the appropriate tab.</p> <p><b>Note: </b>Links cannot be created going into, or out of, a subflow.</p> <p>Calls a flow that starts with a <code>link in</code> node and passes on the response.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt class="optional">target<span class="property-type">string</span></dt>
<dd>When the option <b>Link Type</b> is set to "Dynamic target", set <code>msg.target</code> to the name of the
<code>link in</code> node you wish to call.</dd>
</dl> <h3>Details</h3> <p>This node can be connected to a <code>link in</code> node that exists on any tab.
The flow connected to that node must end with a <code>link out</code> node configured
in 'return' mode.</p> <p>When this node receives a message, it is passed to the connected <code>link in</code> node.
It then waits for a response which it then sends on.</p> <p>If no response is received within the configured timeout, default 30 seconds, the node
will log an error that can be caught using the <code>catch</code> node.</p> <p>When the option <b>Link Type</b> is set to "Dynamic target" <code>msg.target</code> can be used to call a
<code>link in</code> by name or id. 
<ul>
<li>If there is a <code>link in</code> nodes with the same id, it will be called</li>
<li>If there are two or more <code>link in</code> nodes with the same name, an error will be raised</li>
<li>A <code>link call</code> cannot call a <code>link in</code> node inside a subflow</li>
</ul>
</p> <code>link out</code>

</div>