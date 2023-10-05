## What is are WebSocket nodes used for in Node-RED

Node-RED comes with 2 WebSocket nodes, both of which can work in 2 modes

### Listen on

In this mode Node-RED will create a WebSocket server and allow remote clients to connect.

The `WebSocket-in` node will receive messages sent from the remote client and the `WebSocket-out` allows the flow to send messages either to a specific connected client or to broadcast to all connected clients

### Connect to

In this mode Node-RED connects out to a remote WebSocket server.

The `WebSocket-in` node receives messages sent to Node-RED and the `WebSocket-out` node allows the flow to send messages to the remote server.

## Examples

Simple Echo test

This shows both modes, with one set acting as a WebSocket Echo Server
and the other connecting to that server and sending and receiving messages.

![WebSocket Node Example](./images/websocket-echo.png)

```json
[{"id":"43294be738b7699a","type":"tab","label":"WebSockets","disabled":false,"info":"","env":[]},{"id":"e788dbc44428f6b7","type":"websocket in","z":"43294be738b7699a","name":"","server":"","client":"4db78eb653d6d50d","x":290,"y":240,"wires":[["d86baf93795dbb2d"]]},{"id":"8c702971b0292f9b","type":"websocket out","z":"43294be738b7699a","name":"","server":"","client":"4db78eb653d6d50d","x":510,"y":180,"wires":[]},{"id":"dda81a976ccf2a2b","type":"inject","z":"43294be738b7699a","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":220,"y":180,"wires":[["8c702971b0292f9b"]]},{"id":"d86baf93795dbb2d","type":"debug","z":"43294be738b7699a","name":"debug 5","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":580,"y":240,"wires":[]},{"id":"d36a13e17814e375","type":"websocket in","z":"43294be738b7699a","name":"","server":"542f751e15337c46","client":"","x":230,"y":320,"wires":[["1660b4da46db22ad"]]},{"id":"1660b4da46db22ad","type":"websocket out","z":"43294be738b7699a","name":"","server":"542f751e15337c46","client":"","x":560,"y":320,"wires":[]},{"id":"4db78eb653d6d50d","type":"websocket-client","path":"ws://localhost:1880/ws/echo","tls":"","wholemsg":"false","hb":"0","subprotocol":""},{"id":"542f751e15337c46","type":"websocket-listener","path":"/ws/echo","wholemsg":"false"}]
```