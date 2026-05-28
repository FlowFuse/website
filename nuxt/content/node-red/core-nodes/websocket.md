---
title: "Node-RED - WebSocket Node"
---
# WebSocket

## What are WebSocket nodes used for in Node-RED

Node-RED provides two WebSocket nodes that serve distinct purposes and can operate in two modes.

### Listen On

In this mode, Node-RED functions as a WebSocket server, enabling remote clients to establish connections.

- The `WebSocket-in` node is responsible for receiving messages sent from remote clients.
- The `WebSocket-out` node facilitates the flow to send messages either to a specific connected client or to broadcast messages to all connected clients.

### Connect To

In this mode, Node-RED acts as a client, establishing connections with remote WebSocket servers.

- The `WebSocket-in` node receives messages sent from the remote WebSocket server to Node-RED.
- The `WebSocket-out` node allows the flow to send messages to the remote server.

## WebSocket node configuration

### Path 

When you use the WebSocket node in "Listen on" mode, you'll have to specify the path or endpoint to which remote clients will establish a connection. 

### Send/Receive

- Payload: This option sends or receives only the `msg.payload` as data over the WebSocket connection. It excludes any additional `msg` properties.
- Entire Message: When enabled, this option allows the entire message object, including payload, and other properties to be sent or received as a JSON formatted string.

### URL 

When you use the WebSocket node in "Connect to" mode, you'll have to specify the connection URL that should use `ws://` or `wss://` scheme and point to an existing WebSocket listener.

### Subprotocol

This option allows you to specify a particular WebSocket subprotocol to use during the connection handshake.

For example, if a WebSocket server requires the use of the "mqtt" subprotocol, you would configure the WebSocket node's "Subprotocol" option to "mqtt" to ensure that the WebSocket handshake includes the MQTT protocol, enabling proper communication between Node-RED and the WebSocket server.

### Send heartbeat

Enabling this option allows specifying the time interval in seconds for sending periodic ping messages from the client to the server to maintain the connection. The server responds with a pong message to confirm the connection status.

This helps prevent the connection from being closed due to inactivity or network issues.

## Examples

Simple Echo test

This shows both modes, with one set acting as a WebSocket Echo Server
and the other connecting to that server and sending and receiving messages.



::render-flow
---
height: 200
flow: "W3siaWQiOiI0MzI5NGJlNzM4Yjc2OTlhIiwidHlwZSI6InRhYiIsImxhYmVsIjoiV2ViU29ja2V0cyIsImRpc2FibGVkIjpmYWxzZSwiaW5mbyI6IiIsImVudiI6W119LHsiaWQiOiJlNzg4ZGJjNDQ0MjhmNmI3IiwidHlwZSI6IndlYnNvY2tldCBpbiIsInoiOiI0MzI5NGJlNzM4Yjc2OTlhIiwibmFtZSI6IiIsInNlcnZlciI6IiIsImNsaWVudCI6IjRkYjc4ZWI2NTNkNmQ1MGQiLCJ4IjoyOTAsInkiOjI0MCwid2lyZXMiOltbImQ4NmJhZjkzNzk1ZGJiMmQiXV19LHsiaWQiOiI4YzcwMjk3MWIwMjkyZjliIiwidHlwZSI6IndlYnNvY2tldCBvdXQiLCJ6IjoiNDMyOTRiZTczOGI3Njk5YSIsIm5hbWUiOiIiLCJzZXJ2ZXIiOiIiLCJjbGllbnQiOiI0ZGI3OGViNjUzZDZkNTBkIiwieCI6NTEwLCJ5IjoxODAsIndpcmVzIjpbXX0seyJpZCI6ImRkYTgxYTk3NmNjZjJhMmIiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjQzMjk0YmU3MzhiNzY5OWEiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MjIwLCJ5IjoxODAsIndpcmVzIjpbWyI4YzcwMjk3MWIwMjkyZjliIl1dfSx7ImlkIjoiZDg2YmFmOTM3OTVkYmIyZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiI0MzI5NGJlNzM4Yjc2OTlhIiwibmFtZSI6ImRlYnVnIDUiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NTgwLCJ5IjoyNDAsIndpcmVzIjpbXX0seyJpZCI6ImQzNmExM2UxNzgxNGUzNzUiLCJ0eXBlIjoid2Vic29ja2V0IGluIiwieiI6IjQzMjk0YmU3MzhiNzY5OWEiLCJuYW1lIjoiIiwic2VydmVyIjoiNTQyZjc1MWUxNTMzN2M0NiIsImNsaWVudCI6IiIsIngiOjIzMCwieSI6MzIwLCJ3aXJlcyI6W1siMTY2MGI0ZGE0NmRiMjJhZCJdXX0seyJpZCI6IjE2NjBiNGRhNDZkYjIyYWQiLCJ0eXBlIjoid2Vic29ja2V0IG91dCIsInoiOiI0MzI5NGJlNzM4Yjc2OTlhIiwibmFtZSI6IiIsInNlcnZlciI6IjU0MmY3NTFlMTUzMzdjNDYiLCJjbGllbnQiOiIiLCJ4Ijo1NjAsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiNGRiNzhlYjY1M2Q2ZDUwZCIsInR5cGUiOiJ3ZWJzb2NrZXQtY2xpZW50IiwicGF0aCI6IndzOi8vbG9jYWxob3N0OjE4ODAvd3MvZWNobyIsInRscyI6IiIsIndob2xlbXNnIjoiZmFsc2UiLCJoYiI6IjAiLCJzdWJwcm90b2NvbCI6IiJ9LHsiaWQiOiI1NDJmNzUxZTE1MzM3YzQ2IiwidHlwZSI6IndlYnNvY2tldC1saXN0ZW5lciIsInBhdGgiOiIvd3MvZWNobyIsIndob2xlbXNnIjoiZmFsc2UifV0="
---
::





## Node Documentation

<div class="core-node-doc">

<p>WebSocket input node.</p> <p>By default, the data received from the WebSocket will be in <code>msg.payload</code>.
The socket can be configured to expect a properly formed JSON string, in which
case it will parse the JSON and send on the resulting object as the entire message.</p> <p>WebSocket out node.</p> <p>By default, <code>msg.payload</code> will be sent over the WebSocket. The socket
can be configured to encode the entire <code>msg</code> object as a JSON string and send that
over the WebSocket.</p> <p>If the message arriving at this node started at a WebSocket In node, the message
will be sent back to the client that triggered the flow. Otherwise, the message
will be broadcast to all connected clients.</p> <p>If you want to broadcast a message that started at a WebSocket In node, you
should delete the <code>msg._session</code> property within the flow.</p> <p>This configuration node creates a WebSocket Server endpoint using the specified path.</p> <p>This configuration node connects a WebSocket client to the specified URL.</p>

</div>