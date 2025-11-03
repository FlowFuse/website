# {{ meta.title }}

The MQTT Out node connects to an MQTT broker and publishes messages to one or more topics.  
It is typically used to send sensor data, commands, or event notifications from Node-RED to external systems or devices that subscribe to MQTT topics.

## How it works

When a message arrives at the node input, it publishes the content of `msg.payload` to the specified topic on the broker.  
If no topic is set in the node, it must be provided in `msg.topic`.

If `msg.payload` is not set, no message will be sent.  
To send an empty message, set `msg.payload` to an empty string (`""`).

## Configuration

The MQTT Out node requires a connection to an MQTT broker.  
This can be configured by clicking the pencil icon next to the **Server** field.  
Multiple MQTT nodes (in or out) can share the same broker configuration.

### Server

Defines the broker connection details:
- Broker address (for example, `test.mosquitto.org`)
- Port (default 1883 for non-TLS, 8883 for TLS)
- Optional username and password
- MQTT version (v3.1, v3.1.1, or v5)
- Enable TLS for encrypted connections
- Client ID and session options

### Topic

Specifies the MQTT topic to publish to.  
You can enter a fixed topic or leave it blank to use `msg.topic` dynamically.

### QoS

Defines the message delivery quality level:
- 0 – fire and forget  
- 1 – at least once  
- 2 – once and once only (default)

The QoS can be overridden at runtime using `msg.qos`.

### Retain

If set to true, the broker will retain the last message sent to the topic and deliver it to new subscribers immediately.  
You can override this in the flow using `msg.retain`.

To clear a retained topic, send a blank message (`msg.payload = ""`) with `msg.retain = true`.

## Input properties

The MQTT Out node accepts the following properties in incoming messages:

- `msg.payload` (string | buffer) – the message payload to publish.  
  If it contains an object, it is automatically converted to a JSON string.  
  If it contains a buffer, it is sent as-is.

- `msg.topic` (string) – the topic to publish to. Required if not defined in the node.

- `msg.qos` (number) – overrides the configured QoS (0, 1, or 2).

- `msg.retain` (boolean) – overrides the retain flag.

### MQTT v5 properties

If the broker and node are using MQTT version 5, the following properties can also be set:

- `msg.responseTopic` (string) – the MQTT response topic for the message  
- `msg.correlationData` (buffer) – correlation data for the message  
- `msg.contentType` (string) – the content type of the payload  
- `msg.userProperties` (object) – any user-defined properties  
- `msg.messageExpiryInterval` (number) – expiry time, in seconds  
- `msg.topicAlias` (number) – topic alias to use  

## Dynamic control

The MQTT Out node can also respond to special control messages to manage the connection dynamically.  
If one of these control messages is received, the node will perform the action but will not publish the payload.

### `msg.action`

Defines the action to perform. Supported actions:
- `connect` – establish a connection to the broker  
- `disconnect` – close the current connection  

### `msg.broker`

For the **connect** action, this property can override broker configuration options dynamically, including:
- `broker`  
- `port`  
- `url` (overrides both broker and port)  
- `username`  
- `password`  

If the node is already connected and new settings are provided, it will log an error unless the property `force` is set to true.  
In that case, it will disconnect, apply the new configuration, and reconnect.

## Example: Simple Publish

This example shows how to publish a timestamp to an MQTT topic on the public Mosquitto test broker.

{% renderFlow %}
[{"id":"c1b20f45c3c3e77e","type":"tab","label":"MQTT Publish Example","disabled":false,"info":"","env":[]},{"id":"e5b31919a35d7f51","type":"inject","z":"c1b20f45c3c3e77e","name":"Inject Timestamp","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"example/time","payload":"","payloadType":"date","x":180,"y":120,"wires":[["6cd12cecb82889e2"]]},{"id":"6cd12cecb82889e2","type":"mqtt out","z":"c1b20f45c3c3e77e","name":"MQTT Out","topic":"","qos":"1","retain":"false","broker":"da4d8b90.3a89d8","x":430,"y":120,"wires":[]},{"id":"da4d8b90.3a89d8","type":"mqtt-broker","name":"Public Mosquitto Broker","broker":"test.mosquitto.org","port":"1883","clientid":"","autoConnect":true,"usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true}]
{% endrenderFlow %}

## Notes

- The node automatically converts objects to JSON strings when publishing.  
- For large payloads or binary data, use buffers to avoid unnecessary conversion.  
- Multiple MQTT Out nodes can share the same broker connection.  
- MQTT v5 users can take advantage of additional properties for richer message metadata.
