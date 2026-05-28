---
title: "Node-RED - Status Node"
---
# Status

Monitors and captures status updates from other nodes in your flows.

## Where and why do we use the Status node?

The Status node lets you programmatically react to state changes in other nodes by capturing their status updates. While many nodes display status information visually below themselves in the editor, the Status node converts these updates into message flows you can process. This is essential for building automated error handling, creating custom monitoring dashboards, tracking node performance, or implementing logic that responds to operational conditions like queue sizes or connection states.

## Modes of operation

The Status node can monitor status updates from different scopes:

### All Nodes

Captures status updates from all nodes in the same tab or flow. This provides flow-wide visibility into node states, useful for centralized monitoring or logging.

### Same Group

Limits status capture to nodes within the same group as the Status node. Use this when you want isolated status monitoring for specific sections of your flow that are grouped together.

### Selected Nodes

Captures status from specific nodes you choose. This gives you fine-grained control over which nodes' status updates are monitored, useful when you only care about particular nodes or want different handling for different node types.

## How the node handles messages

When a monitored node updates its status, the Status node emits a message object containing status information. The node creates a new message flow that you can use to react to status changes programmatically.

The message object emitted by the Status node contains:

- **status.text** - the status text displayed below the node
- **status.fill** - the color of the status indicator (red, green, yellow, blue, grey)
- **status.shape** - the shape of the status indicator (ring or dot)
- **status.source** - object containing information about the node that generated the status:
  - **id** - the source node id
  - **type** - the type of the source node
  - **name** - the name, if set, of the source node

This information enables you to implement sophisticated monitoring logic, including conditional responses based on which node changed status, what the status indicates, or patterns of status changes over time.

## Examples

### Monitoring delay node queue size

The Status node tracks the number of messages queued in a delay node. This example captures status updates from the delay node and processes them to monitor queue depth, useful for detecting backpressure or triggering alerts when the queue grows too large.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkZWxheS1pbmplY3QiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImYxZTJkM2M0YjVhNjk3ODgiLCJuYW1lIjoiU2VuZCBNZXNzYWdlcyIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiMC41IiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MTkwLCJ5IjoyMDAsIndpcmVzIjpbWyJkZWxheS1ub2RlIl1dfSx7ImlkIjoiZGVsYXktbm9kZSIsInR5cGUiOiJkZWxheSIsInoiOiJmMWUyZDNjNGI1YTY5Nzg4IiwibmFtZSI6IlJhdGUgTGltaXQgUXVldWUiLCJwYXVzZVR5cGUiOiJyYXRlIiwidGltZW91dCI6IjUiLCJ0aW1lb3V0VW5pdHMiOiJzZWNvbmRzIiwicmF0ZSI6IjEiLCJuYlJhdGVVbml0cyI6IjEiLCJyYXRlVW5pdHMiOiJzZWNvbmQiLCJyYW5kb21GaXJzdCI6IjEiLCJyYW5kb21MYXN0IjoiNSIsInJhbmRvbVVuaXRzIjoic2Vjb25kcyIsImRyb3AiOmZhbHNlLCJhbGxvd3JhdGUiOmZhbHNlLCJvdXRwdXRzIjoxLCJ4Ijo0MDAsInkiOjIwMCwid2lyZXMiOltbImRlbGF5LW91dHB1dCJdXX0seyJpZCI6InN0YXR1cy1tb25pdG9yIiwidHlwZSI6InN0YXR1cyIsInoiOiJmMWUyZDNjNGI1YTY5Nzg4IiwibmFtZSI6Ik1vbml0b3IgUXVldWUiLCJzY29wZSI6WyJkZWxheS1ub2RlIl0sIngiOjE5MCwieSI6MjgwLCJ3aXJlcyI6W1sic3RhdHVzLWRlYnVnIl1dfSx7ImlkIjoiZGVsYXktb3V0cHV0IiwidHlwZSI6ImRlYnVnIiwieiI6ImYxZTJkM2M0YjVhNjk3ODgiLCJuYW1lIjoiUmF0ZSBMaW1pdGVkIE91dHB1dCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2MjAsInkiOjIwMCwid2lyZXMiOltdfSx7ImlkIjoic3RhdHVzLWRlYnVnIiwidHlwZSI6ImRlYnVnIiwieiI6ImYxZTJkM2M0YjVhNjk3ODgiLCJuYW1lIjoiUXVldWUgU3RhdHVzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoic3RhdHVzIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MzkwLCJ5IjoyODAsIndpcmVzIjpbXX1d"
---
::



### Connection state monitoring

Monitor the connection status of MQTT or other connection-based nodes. This example shows how to capture connection state changes and use them to trigger reconnection logic, send alerts, or update application state based on connectivity.



::render-flow
---
height: 200
flow: "W3siaWQiOiJtcXR0LWluIiwidHlwZSI6Im1xdHQgaW4iLCJ6IjoiYTliOGM3ZDZlNWY0ZzNoMiIsIm5hbWUiOiJNUVRUIFN1YnNjcmliZXIiLCJ0b3BpYyI6InNlbnNvci8jIiwicW9zIjoiMCIsImRhdGF0eXBlIjoiYXV0byIsImJyb2tlciI6Im1xdHQtYnJva2VyIiwibmwiOmZhbHNlLCJyYXAiOmZhbHNlLCJpbnB1dHMiOjAsIngiOjIwMCwieSI6MTgwLCJ3aXJlcyI6W1sibXF0dC1kZWJ1ZyJdXX0seyJpZCI6Im1xdHQtc3RhdHVzIiwidHlwZSI6InN0YXR1cyIsInoiOiJhOWI4YzdkNmU1ZjRnM2gyIiwibmFtZSI6IkNvbm5lY3Rpb24gTW9uaXRvciIsInNjb3BlIjpbIm1xdHQtaW4iXSwieCI6MjEwLCJ5IjoyNjAsIndpcmVzIjpbWyJjb25uZWN0aW9uLWNoZWNrIl1dfSx7ImlkIjoibXF0dC1kZWJ1ZyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhOWI4YzdkNmU1ZjRnM2gyIiwibmFtZSI6Ik1RVFQgTWVzc2FnZXMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NDIwLCJ5IjoxODAsIndpcmVzIjpbXX0seyJpZCI6ImNvbm5lY3Rpb24tY2hlY2siLCJ0eXBlIjoic3dpdGNoIiwieiI6ImE5YjhjN2Q2ZTVmNGczaDIiLCJuYW1lIjoiQ2hlY2sgQ29ubmVjdGlvbiIsInByb3BlcnR5Ijoic3RhdHVzLnRleHQiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJydWxlcyI6W3sidCI6ImVxIiwidiI6ImNvbm5lY3RlZCIsInZ0Ijoic3RyIn0seyJ0IjoiZXEiLCJ2IjoiZGlzY29ubmVjdGVkIiwidnQiOiJzdHIifV0sImNoZWNrYWxsIjoidHJ1ZSIsIm91dHB1dHMiOjIsIngiOjQzMCwieSI6MjYwLCJ3aXJlcyI6W1siY29ubmVjdGVkLWRlYnVnIl0sWyJkaXNjb25uZWN0ZWQtZGVidWciXV19LHsiaWQiOiJjb25uZWN0ZWQtZGVidWciLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTliOGM3ZDZlNWY0ZzNoMiIsIm5hbWUiOiJDb25uZWN0ZWQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJzdGF0dXMiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2NTAsInkiOjI0MCwid2lyZXMiOltdfSx7ImlkIjoiZGlzY29ubmVjdGVkLWRlYnVnIiwidHlwZSI6ImRlYnVnIiwieiI6ImE5YjhjN2Q2ZTVmNGczaDIiLCJuYW1lIjoiRGlzY29ubmVjdGVkIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoic3RhdHVzIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjYwLCJ5IjoyODAsIndpcmVzIjpbXX0seyJpZCI6Im1xdHQtYnJva2VyIiwidHlwZSI6Im1xdHQtYnJva2VyIiwibmFtZSI6IiIsImJyb2tlciI6ImxvY2FsaG9zdCIsInBvcnQiOiIxODgzIiwiY2xpZW50aWQiOiIiLCJhdXRvQ29ubmVjdCI6dHJ1ZSwidXNldGxzIjpmYWxzZSwicHJvdG9jb2xWZXJzaW9uIjoiNCIsImtlZXBhbGl2ZSI6IjYwIiwiY2xlYW5zZXNzaW9uIjp0cnVlLCJiaXJ0aFRvcGljIjoiIiwiYmlydGhRb3MiOiIwIiwiYmlydGhQYXlsb2FkIjoiIiwiYmlydGhNc2ciOnt9LCJjbG9zZVRvcGljIjoiIiwiY2xvc2VRb3MiOiIwIiwiY2xvc2VQYXlsb2FkIjoiIiwiY2xvc2VNc2ciOnt9LCJ3aWxsVG9waWMiOiIiLCJ3aWxsUW9zIjoiMCIsIndpbGxQYXlsb2FkIjoiIiwid2lsbE1zZyI6e30sInVzZXJQcm9wcyI6IiIsInNlc3Npb25FeHBpcnkiOiIifV0="
---
::



## Node Documentation

<div class="core-node-doc">

<p>Report status messages from other nodes on the same tab.</p> <h3>Outputs</h3> <dl class="message-properties">
<dt>status.text <span class="property-type">string</span></dt>
<dd>the status text.</dd>
<dt>status.source.type <span class="property-type">string</span></dt>
<dd>the type of the node that reported status.</dd>
<dt>status.source.id <span class="property-type">string</span></dt>
<dd>the id of the node that reported status.</dd>
<dt>status.source.name <span class="property-type">string</span></dt>
<dd>the name, if set, of the node that reported status.</dd>
</dl> <h3>Details</h3> <p>This node does not produce a <code>payload</code>.</p> <p>By default the node reports status for all nodes on the same workspace tab.
It can be configured to selectively report status for individual nodes.</p>

</div>