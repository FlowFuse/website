---
title: "Node-RED - MQTT In Node"
---
# MQTT In

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



::render-flow
---
height: 200
flow: "W3siaWQiOiIwZTc0MDIyMTU2NTA1MTdjIiwidHlwZSI6Im1xdHQgaW4iLCJ6IjoiYTE0OWJiNjY2NDYzODlhMyIsIm5hbWUiOiJDaGVlcmxpZ2h0cyIsInRvcGljIjoiY2hlZXJsaWdodHMvY29sb3VyZWQvaGV4IiwicW9zIjoiMiIsImRhdGF0eXBlIjoiYXV0by1kZXRlY3QiLCJicm9rZXIiOiIwMzdjYTZiNmNhMGQ3Njk5IiwibmwiOmZhbHNlLCJyYXAiOnRydWUsInJoIjowLCJpbnB1dHMiOjAsIngiOjIyMCwieSI6MjYwLCJ3aXJlcyI6W1siNjE3M2I1YzYwZGY5YmZlZSJdXX0seyJpZCI6IjYxNzNiNWM2MGRmOWJmZWUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTE0OWJiNjY2NDYzODlhMyIsIm5hbWUiOiJDaGVlcmxpZ2h0cyBEZWJ1ZyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo1MzAsInkiOjI2MCwid2lyZXMiOltdfSx7ImlkIjoiMDM3Y2E2YjZjYTBkNzY5OSIsInR5cGUiOiJtcXR0LWJyb2tlciIsIm5hbWUiOiJQdWJsaWMgTW9zcXVpdHRvIEJyb2tlciIsImJyb2tlciI6InRlc3QubW9zcXVpdHRvLm9yZyIsInBvcnQiOiIxODgzIiwiY2xpZW50aWQiOiIiLCJhdXRvQ29ubmVjdCI6dHJ1ZSwidXNldGxzIjpmYWxzZSwicHJvdG9jb2xWZXJzaW9uIjoiNCIsImtlZXBhbGl2ZSI6IjYwIiwiY2xlYW5zZXNzaW9uIjp0cnVlfV0="
---
::



## Notes

- The MQTT In node automatically reconnects if the connection to the broker is lost.  
- Retained messages are received immediately when subscribing to a topic that has one.  
- The node can work alongside the MQTT Out node for bi-directional communication.


## Node Documentation
