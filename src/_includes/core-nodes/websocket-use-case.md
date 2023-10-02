## What is are WebSocket nodes used for in Node-RED

Node-RED comes with 2 WebSocket nodes, both of which can work in 2 modes

### Listen on

In this mode Node-RED will create a WebSocket server and allow remote clients to connect.

The `WebSocket-in` node will receive messages sent from the remote client and the `WebSocket-out` allows the flow to send messages either to a specific connected client or to broadcast to all connected clients

### Connect to

In this mode Node-RED connects out to a remote WebSocket server.

The `WebSocket-in` node receives messages sent to Node-RED and the `WebSocket-out` node allows the flow to send messages to the remote server.

## Examples

```json
```