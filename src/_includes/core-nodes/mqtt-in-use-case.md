# {{ meta.title }}

This node connects to an MQTT broker and subscribes to messages from a specified topic.

## Configuration Options

### Server Configuration

The MQTT server is automatically configured and managed by FlowFuse. When this node is added to the canvas, a corresponding MQTT broker client is created automatically. The connection settings are handled internally, requiring no manual configuration.

### Topic

Defines the topic to subscribe to. The topic can include MQTT wildcards:

* `+` for a single-level wildcard
* `#` for a multi-level wildcard

### QoS (Quality of Service)

Specifies the message delivery guarantee level:

* 0: Fire and forget
* 1: At least once
* 2: Once and once only (default)

If not defined, the default value is 0.

## Output Properties

When a message is received, the node outputs the following properties:

* `msg.payload`: The message content. Strings are passed as-is, and binary data is output as a Buffer.
* `msg.topic`: The topic on which the message was received.
* `msg.qos`: The QoS level of the received message.
* `msg.retain`: True if the message was retained on the broker.
* `msg.responseTopic`: MQTTv5 response topic.
* `msg.correlationData`: MQTTv5 correlation data.
* `msg.contentType`: MQTTv5 content type of the payload.
* `msg.userProperties`: MQTTv5 user properties.
* `msg.messageExpiryInterval`: MQTTv5 message expiry time in seconds.

## Dynamic Subscription Control

The MQTT In node can be configured to dynamically manage connections and topic subscriptions. When this feature is enabled, the node accepts control messages through its input.

### Input Properties

These inputs only apply when dynamic subscriptions are enabled:

* `msg.action`: Defines the action to perform. Supported actions include:
  `"connect"`, `"disconnect"`, `"getSubscriptions"`, `"subscribe"`, and `"unsubscribe"`.

* `msg.topic`: For `"subscribe"` or `"unsubscribe"`, specifies the target topic(s). This can be:

  * A string containing a single topic filter.
  * An object containing `topic` and `qos` properties.
  * An array of strings or objects for multiple topics.

* `msg.broker`: For `"connect"`, this can override broker configuration properties such as:

  * `broker`
  * `port`
  * `url` (overrides broker and port)
  * `username`
  * `password`

If a broker is already connected, an error is logged unless `force` is specified. In that case, the node disconnects, applies the new settings, and reconnects with the updated configuration.

## Example: Cheerlights

This example subscribes to the public topic `cheerlights/coloured/hex` on the Mosquitto test broker.  
Each time a new color is published, the color code is displayed in the Debug panel.

{% renderFlow %}
[{"id":"0e7402215650517c","type":"mqtt in","z":"a149bb66646389a3","name":"Cheerlights","topic":"cheerlights/coloured/hex","qos":"2","datatype":"auto-detect","broker":"037ca6b6ca0d7699","nl":false,"rap":true,"rh":0,"inputs":0,"x":220,"y":260,"wires":[["6173b5c60df9bfee"]]},{"id":"6173b5c60df9bfee","type":"debug","z":"a149bb66646389a3","name":"Cheerlights Debug","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":530,"y":260,"wires":[]},{"id":"037ca6b6ca0d7699","type":"mqtt-broker","name":"Public Mosquitto Broker","broker":"test.mosquitto.org","port":"1883","clientid":"","autoConnect":true,"usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true}]
{% endrenderFlow %}

## Notes

- The MQTT In node automatically reconnects if the connection to the broker is lost.  
- Retained messages are received immediately when subscribing to a topic that has one.  
- The node can work alongside the MQTT Out node for bi-directional communication.
