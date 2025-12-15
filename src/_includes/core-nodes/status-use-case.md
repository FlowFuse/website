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

{% renderFlow %}
[{"id":"delay-inject","type":"inject","z":"f1e2d3c4b5a69788","name":"Send Messages","props":[{"p":"payload"}],"repeat":"0.5","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":190,"y":200,"wires":[["delay-node"]]},{"id":"delay-node","type":"delay","z":"f1e2d3c4b5a69788","name":"Rate Limit Queue","pauseType":"rate","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"allowrate":false,"outputs":1,"x":400,"y":200,"wires":[["delay-output"]]},{"id":"status-monitor","type":"status","z":"f1e2d3c4b5a69788","name":"Monitor Queue","scope":["delay-node"],"x":190,"y":280,"wires":[["status-debug"]]},{"id":"delay-output","type":"debug","z":"f1e2d3c4b5a69788","name":"Rate Limited Output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":620,"y":200,"wires":[]},{"id":"status-debug","type":"debug","z":"f1e2d3c4b5a69788","name":"Queue Status","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"status","targetType":"msg","statusVal":"","statusType":"auto","x":390,"y":280,"wires":[]}]
{% endrenderFlow %}

### Connection state monitoring

Monitor the connection status of MQTT or other connection-based nodes. This example shows how to capture connection state changes and use them to trigger reconnection logic, send alerts, or update application state based on connectivity.

{% renderFlow %}
[{"id":"mqtt-in","type":"mqtt in","z":"a9b8c7d6e5f4g3h2","name":"MQTT Subscriber","topic":"sensor/#","qos":"0","datatype":"auto","broker":"mqtt-broker","nl":false,"rap":false,"inputs":0,"x":200,"y":180,"wires":[["mqtt-debug"]]},{"id":"mqtt-status","type":"status","z":"a9b8c7d6e5f4g3h2","name":"Connection Monitor","scope":["mqtt-in"],"x":210,"y":260,"wires":[["connection-check"]]},{"id":"mqtt-debug","type":"debug","z":"a9b8c7d6e5f4g3h2","name":"MQTT Messages","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":420,"y":180,"wires":[]},{"id":"connection-check","type":"switch","z":"a9b8c7d6e5f4g3h2","name":"Check Connection","property":"status.text","propertyType":"msg","rules":[{"t":"eq","v":"connected","vt":"str"},{"t":"eq","v":"disconnected","vt":"str"}],"checkall":"true","outputs":2,"x":430,"y":260,"wires":[["connected-debug"],["disconnected-debug"]]},{"id":"connected-debug","type":"debug","z":"a9b8c7d6e5f4g3h2","name":"Connected","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"status","targetType":"msg","statusVal":"","statusType":"auto","x":650,"y":240,"wires":[]},{"id":"disconnected-debug","type":"debug","z":"a9b8c7d6e5f4g3h2","name":"Disconnected","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"status","targetType":"msg","statusVal":"","statusType":"auto","x":660,"y":280,"wires":[]},{"id":"mqtt-broker","type":"mqtt-broker","name":"","broker":"localhost","port":"1883","clientid":"","autoConnect":true,"usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willPayload":"","willMsg":{},"userProps":"","sessionExpiry":""}]
{% endrenderFlow %}