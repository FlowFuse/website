---
eleventyNavigation:
  key: WebSocket
  parent : Network
---

# Node-RED WebSocket Node

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

{% renderFlow %}
[{"id":"43294be738b7699a","type":"tab","label":"WebSockets","disabled":false,"info":"","env":[]},{"id":"e788dbc44428f6b7","type":"websocket in","z":"43294be738b7699a","name":"","server":"","client":"4db78eb653d6d50d","x":290,"y":240,"wires":[["d86baf93795dbb2d"]]},{"id":"8c702971b0292f9b","type":"websocket out","z":"43294be738b7699a","name":"","server":"","client":"4db78eb653d6d50d","x":510,"y":180,"wires":[]},{"id":"dda81a976ccf2a2b","type":"inject","z":"43294be738b7699a","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":220,"y":180,"wires":[["8c702971b0292f9b"]]},{"id":"d86baf93795dbb2d","type":"debug","z":"43294be738b7699a","name":"debug 5","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":580,"y":240,"wires":[]},{"id":"d36a13e17814e375","type":"websocket in","z":"43294be738b7699a","name":"","server":"542f751e15337c46","client":"","x":230,"y":320,"wires":[["1660b4da46db22ad"]]},{"id":"1660b4da46db22ad","type":"websocket out","z":"43294be738b7699a","name":"","server":"542f751e15337c46","client":"","x":560,"y":320,"wires":[]},{"id":"4db78eb653d6d50d","type":"websocket-client","path":"ws://localhost:1880/ws/echo","tls":"","wholemsg":"false","hb":"0","subprotocol":""},{"id":"542f751e15337c46","type":"websocket-listener","path":"/ws/echo","wholemsg":"false"}]
{% endrenderFlow %}

