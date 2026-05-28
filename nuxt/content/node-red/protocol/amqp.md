---
title: "Using AMQP with Node-RED"
description: "Learn how to integrate AMQP with Node-RED for reliable message delivery, advanced routing, and improved data management in your flows."
---

# {{meta.title}}

Imagine your Node-RED flow working well, handling data from different sources, until suddenly, messages start disappearing or arriving out of order. [MQTT](/node-red/protocol/mqtt/) works fine for basic messaging, but it can struggle in more complex situations where you need delivery guarantees and advanced routing.

That’s where AMQP comes in. AMQP solves these issues with features that MQTT doesn’t have. In this guide, we'll explain what AMQP is and how to use it with Node-RED.

## What is AMQP 

AMQP, or Advanced Message Queuing Protocol, is a set of rules for managing messages between systems. It ensures that messages are sent and received reliably, even if there are network issues. AMQP uses message queues to store messages until they can be processed, making sure they are delivered in the correct order. It supports various messaging patterns, such as one-to-one or one-to-many. In short, AMQP helps different systems communicate with each other effectively and consistently.

At the heart of AMQP is the **Message Broker**, which acts as the central hub for managing and routing messages. Producers, the systems or applications that create and send messages, send their data to the broker.

The broker uses **Exchanges** to determine how to route these messages. There are several types of exchanges:

- **Direct Exchange (point-to-point):** Routes messages to specific queues based on an exact match with the routing key. For example, if a message has a routing key of "error," it will only go to queues set up to receive messages with that key.
- **Topic Exchange (publish-subscribe):** Routes messages to queues based on patterns in the routing key. This allows messages to be sent to multiple queues based on partial matches or wildcard patterns. For instance, a routing key of "logs.error" could match queues set up to handle "logs.*" or "logs.error".
- **Fanout Exchange:** Broadcast messages to all queues bound to it without considering the routing key. Every queue connected to this exchange receives a copy of the message.
- **Headers Exchange (publish-subscribe):** Routes messages based on attributes in the message headers instead of the routing key. For example, messages with specific header attributes can be directed to particular queues.

Messages are placed in **Queues**, where they are stored until they are processed. Queues ensure that messages are delivered in the correct order and are kept until they are successfully handled.

Finally, **Consumers** are systems or applications that retrieve and process messages from the queues. They perform actions based on the messages they receive. AMQP uses acknowledgments to confirm that messages have been processed before removing them from the queues, ensuring reliable message handling.

## Using AMQP with Node-RED

In this section, we will guide you through integrating AMQP with Node-RED. The guide will cover setting up AMQP in Node-RED, configuring various exchange types, and incorporating them into your flows. You will learn how to send and receive messages based on different exchange methods. To effectively demonstrate these concepts, we will use a variety of scenarios and examples.

### Prequiste

- **AMQP Supported Broker Server:** Ensure you have a running AMQP-supported broker server. For this guide, we are using RabbitMQ.
- **Node-RED AMQP Node:** Install the [AMQP contrib node](https://flows.nodered.org/node/@stormpass/node-red-contrib-amqp) via Node-RED palette manager.

### Understanding AMQP Node configuration settings.

#### AMQP Broker 

   - **Host:** Specify the hostname or IP address where your AMQP broker is located. This tells your node where to connect.
   - **Port:** This is the network port the AMQP broker communicates with. The default port for AMQP is 5672, but it might differ if configured otherwise.
   - **vhost:** Virtual hosts segregate different environments or applications within the same broker instance. The default is `/,` but you might have specific virtual hosts for various use cases.
   - **Use TLS:** Enable TLS/SSL if the broker requires encrypted communication to ensure data security during transmission.
   - **User:** The username required for authentication with the broker. RabbitMQ, for example, defaults to `guest`.
   - **Password:** The password associated with the username for authentication. RabbitMQ’s default is `guest`.

Configure the node by dragging an AMQP node onto the canvas. Double-click the node, then click the "+" icon next to the pencil icon. In the prompt that opens, enter the details of your broker server. For added security, ensure you use environment variables to configure nodes. For more information, refer to [Using Environment Variables in Node-RED](/blog/2023/01/environment-variables-in-node-red/).

#### AMQP Out

- **Broker** Select the broker configuration you’ve set up using the AMQP Broker node. This links your outgoing messages to the correct broker instance.
- **Reconnect On Error:** Determines whether the node should attempt to reconnect automatically if it encounters an error. This helps maintain communication with the broker even if temporary issues occur.
- **Exchange Configuration**
   - **Type:** Choose the exchange type that dictates how messages are routed such as fanout, direct, topic and headers:
   - **Exchange Name:** Name of the exchange where messages will be published. This is where the message is sent before being routed to the appropriate queue.
   - **Routing Key:** This key is Used to direct messages to the correct queues based on the exchange type. It helps specify which queue should receive the message.
   - **Durable:** Specifies whether the exchange should survive broker restarts. A durable exchange retains its messages through broker restarts.
- **Message Properties**
   - **AMQP Properties:** Allows setting additional properties such as priority, expiration, or delivery mode for messages, influencing their handling and delivery.
- **Remote Procedure Call (RPC) Settings**
   - **Request RPC Response:** Configure whether to request a response for RPC calls:
     - **YES:** Request a response from the server.
     - **NO:** Do not request a response.
   - **RPC Timeout (ms):** Set the timeout for waiting for an RPC response in milliseconds.

#### AMQP In

- **Broker:** Use the broker configuration details provided by the AMQP Broker node to ensure incoming messages are received from the correct broker.
- **Prefetch:** Determines the number of messages to fetch from the broker in advance. Reducing the number of times the broker needs to send messages can help with performance.
- **Reconnect On Error:** Configure whether the node should automatically reconnect if it encounters an error. This helps maintain a continuous flow of data.
- **noAck:** When enabled, the node will automatically acknowledge messages as soon as they are received. This can be useful for ensuring messages are processed but might lead to message loss if the node fails to process the message correctly.
- **Exchange Configuration**
   - **Type:** Select the exchange type used to route incoming messages:
     - **Topic**
     - **Direct**
     - **Fanout**
     - **Headers**
   - **Exchange Name:** The exchange name from which messages are routed. This helps direct incoming messages to the appropriate queue.
   - **Routing Key:** Specifies how to route messages from the exchange to the correct queue(s). This is essential for ensuring messages are received by the proper consumers.
   - **Headers:** Set specific headers to filter messages according to routing criteria when the headers exchange type is selected.
   - **Durable:** Indicates whether the exchange should survive broker restarts.
- **Queue Info**
   - **Queue Name:** Name of the queue where messages are received. This is the storage location for messages before they are processed. Leave it blank if you want it to be generated automatically.
   - **Exclusive:** If set to true, the queue is exclusive to the connection and will be deleted when the connection closes.
   - **Durable:** Whether the queue should survive broker restarts, retaining messages until they are consumed.
   - **Auto Delete:** Determines whether the queue should be deleted automatically when it is no longer in use, helping to manage resources efficiently.

### Direct Exchange

**Scenario:** You have a smart irrigation system with multiple zones. You want to send commands to specific zones, such as turning irrigation on or off.

#### Sending Data using Direct Exchange

1. Drag two `inject` nodes on to the canvas. Configure the first `inject` node to send data with a `msg.routingKey` of `"zone1"` and the second with a `msg.routingKey` of `"zone2"`. Set the payload for each inject node you want to send to zones.
2. Add an `amqp-out` node. Set the exchange to `irrigation_control`, where the commands will be sent.
3. Connect the `inject` nodes to the `amqp-out` node.

#### Receiving Data using Direct Exchange

1. Add two `amqp-in` nodes on to the canvas. Configure one to listen for messages with the `routingKey` of `"zone1"` and the other with `"zone2"`. Both nodes should be set to the `"irrigation_control"` exchange.
2. Connect each `amqp-in` node to a `debug` node to see the received commands for each zone.

![Image showing the flow that uses the Direct exchange type to send messages and receive messages](/node-red-media/protocol/images/direct.gif){data-zoomable}
_Image showing the flow that uses the Direct exchange type to send messages and receive messages_



::render-flow
---
height: 200
flow: "W3siaWQiOiJlZmU3YTI2MDMwN2U2MjAyIiwidHlwZSI6ImFtcXAtb3V0IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiIiwiYnJva2VyIjoiYmZiMWU3ZTk3ZWVmNWUwNCIsInJlY29ubmVjdE9uRXJyb3IiOnRydWUsImV4Y2hhbmdlTmFtZSI6ImlycmlnYXRpb25fY29udHJvbCIsImV4Y2hhbmdlVHlwZSI6ImRpcmVjdCIsImV4Y2hhbmdlUm91dGluZ0tleSI6IiIsImV4Y2hhbmdlUm91dGluZ0tleVR5cGUiOiJzdHIiLCJleGNoYW5nZUR1cmFibGUiOnRydWUsImFtcXBQcm9wZXJ0aWVzIjoieyBcImhlYWRlcnNcIjoge30gfSIsInJwY1RpbWVvdXRNaWxsaXNlY29uZHMiOjMwMDAsIm91dHB1dHMiOjAsIngiOjQ3MCwieSI6MTYwLCJ3aXJlcyI6W119LHsiaWQiOiI1MzhkZTMzZjU0ODgzM2FjIiwidHlwZSI6ImluamVjdCIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IlNlbmQgY29tbWFuZCB0byB6b25lIDEiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJyb3V0aW5nS2V5IiwidiI6InpvbmUxIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6InsgXCJjb21tYW5kXCI6IFwic3RhcnRcIiB9IiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MjMwLCJ5IjoxMDAsIndpcmVzIjpbWyJlZmU3YTI2MDMwN2U2MjAyIl1dfSx7ImlkIjoiMjBjZmUwNGZhYjU2MmVhOSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJTZW5kIGNvbW1hbmQgdG8gem9uZSAyIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoicm91dGluZ0tleSIsInYiOiJ6b25lMiIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJ7IFwiY29tbWFuZFwiOiBcInN0b3BcIiB9IiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjoyMzAsInkiOjI0MCwid2lyZXMiOltbImVmZTdhMjYwMzA3ZTYyMDIiXV19LHsiaWQiOiI3YTVlMGYzYTY2ZGMxY2NjIiwidHlwZSI6ImFtcXAtaW4iLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiIiLCJicm9rZXIiOiJiZmIxZTdlOTdlZWY1ZTA0IiwicHJlZmV0Y2giOjAsInJlY29ubmVjdE9uRXJyb3IiOnRydWUsIm5vQWNrIjp0cnVlLCJleGNoYW5nZU5hbWUiOiJpcnJpZ2F0aW9uX2NvbnRyb2wiLCJleGNoYW5nZVR5cGUiOiJkaXJlY3QiLCJleGNoYW5nZVJvdXRpbmdLZXkiOiJ6b25lMSIsImV4Y2hhbmdlRHVyYWJsZSI6dHJ1ZSwicXVldWVOYW1lIjoiIiwicXVldWVFeGNsdXNpdmUiOnRydWUsInF1ZXVlRHVyYWJsZSI6ZmFsc2UsInF1ZXVlQXV0b0RlbGV0ZSI6dHJ1ZSwiaGVhZGVycyI6Int9IiwieCI6MjMwLCJ5IjozNjAsIndpcmVzIjpbWyI2M2M1NjcxZDZmNGVmZDA3Il1dfSx7ImlkIjoiNGJmMWI0NGI2NTZjMzVjMiIsInR5cGUiOiJhbXFwLWluIiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiIiwiYnJva2VyIjoiYmZiMWU3ZTk3ZWVmNWUwNCIsInByZWZldGNoIjowLCJyZWNvbm5lY3RPbkVycm9yIjp0cnVlLCJub0FjayI6dHJ1ZSwiZXhjaGFuZ2VOYW1lIjoiaXJyaWdhdGlvbl9jb250cm9sIiwiZXhjaGFuZ2VUeXBlIjoiZGlyZWN0IiwiZXhjaGFuZ2VSb3V0aW5nS2V5Ijoiem9uZTIiLCJleGNoYW5nZUR1cmFibGUiOnRydWUsInF1ZXVlTmFtZSI6IiIsInF1ZXVlRXhjbHVzaXZlIjp0cnVlLCJxdWV1ZUR1cmFibGUiOmZhbHNlLCJxdWV1ZUF1dG9EZWxldGUiOnRydWUsImhlYWRlcnMiOiJ7fSIsIngiOjIzMCwieSI6NDQwLCJ3aXJlcyI6W1siZTdkNGZhYmU5ZWY2NjhmZSJdXX0seyJpZCI6IjYzYzU2NzFkNmY0ZWZkMDciLCJ0eXBlIjoiZGVidWciLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJab25lIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NTAwLCJ5IjozNjAsIndpcmVzIjpbXX0seyJpZCI6ImU3ZDRmYWJlOWVmNjY4ZmUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJab25lIDIiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NTAwLCJ5Ijo0NDAsIndpcmVzIjpbXX0seyJpZCI6ImJmYjFlN2U5N2VlZjVlMDQiLCJ0eXBlIjoiYW1xcC1icm9rZXIiLCJuYW1lIjoiQU1RUCBDb25maWciLCJob3N0IjoibG9jYWxob3N0IiwicG9ydCI6IjU2NzIiLCJ2aG9zdCI6IiIsInRscyI6ZmFsc2UsImNyZWRzRnJvbVNldHRpbmdzIjpmYWxzZX1d"
---
::



We configured a Direct type exchange in Node-RED to route messages to specific queues based on the routing key. We demonstrated how to send and receive commands in a smart irrigation system, ensuring that messages for different zones are delivered correctly. This setup is proper when you need precise message delivery based on an exact match with the routing key.

## Topic Exchange

**Scenario**: You have a smart weather station that collects data from multiple sensors, such as temperature, humidity, and air quality. You want to publish and handle data based on the type of sensor and data, such as all temperature or humidity sensor data. You can use topic exchange, which allows you to use wild cards.

#### Sending Data using Topic Exchange

1. Drag multiple `inject` nodes onto the canvas. Configure these nodes to send payloads representing temperature data. Set the `msg.routingKey` to values like `temperature.sensor1`, `temperature.sensor2`, etc.
2. Similarly, add `inject` nodes for humidity sensor data. Set the `msg.routingKey` for these nodes to `humidity.sensor1`, `humidity.sensor2`, etc.
3. Drag an `amqp-out` node onto the canvas. Set the exchange type to `"Topic"` and specify the exchange name as `"weather_data"`.
4. Connect each `inject` node to the `amqp-out` node. This setup ensures that each `inject` node sends its data to the `weather_data` exchange with the corresponding routing key.

#### Receiving Data using Topic Exchange

1. Add two `amqp-in` nodes on to the canvas. Configure one to listen for messages with the `routingKey` of `"temperature.*"` and the other with `"humidity.*"`. Both nodes should be set to the `"weather_data"` exchange.
2. Connect each `amqp-in` node to a `debug` node to view the sensor data received.

![Image showing the flow that uses the Topic exchange type to send messages and receive messages.](/node-red-media/protocol/images/topic.gif){data-zoomable}
_Image showing the flow that uses the Topic exchange type to send messages and receive messages_



::render-flow
---
height: 200
flow: "W3siaWQiOiIwNmNhNzM3YTIzYzkzYzc1IiwidHlwZSI6ImluamVjdCIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IlRlbXAgc2Vuc29yIDEiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJyb3V0aW5nS2V5IiwidiI6InRlbXBlcmF0dXJlLnNlbnNvcjEiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMTAwXHQiLCJwYXlsb2FkVHlwZSI6Impzb25hdGEiLCJ4IjoxODAsInkiOjYwMCwid2lyZXMiOltbIjY1M2FlYzM3MmVjYjY4YTMiXV19LHsiaWQiOiI2NTNhZWMzNzJlY2I2OGEzIiwidHlwZSI6ImFtcXAtb3V0IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiIiwiYnJva2VyIjoiYmZiMWU3ZTk3ZWVmNWUwNCIsInJlY29ubmVjdE9uRXJyb3IiOmZhbHNlLCJleGNoYW5nZU5hbWUiOiJ3ZWF0aGVyX2RhdGEiLCJleGNoYW5nZVR5cGUiOiJ0b3BpYyIsImV4Y2hhbmdlUm91dGluZ0tleSI6IiIsImV4Y2hhbmdlUm91dGluZ0tleVR5cGUiOiJzdHIiLCJleGNoYW5nZUR1cmFibGUiOnRydWUsImFtcXBQcm9wZXJ0aWVzIjoieyBcImhlYWRlcnNcIjoge30gfSIsInJwY1RpbWVvdXRNaWxsaXNlY29uZHMiOjMwMDAsIm91dHB1dHMiOjAsIngiOjQyMCwieSI6NjYwLCJ3aXJlcyI6W119LHsiaWQiOiIzOTU0NmNiNmM3NTA0NGUyIiwidHlwZSI6ImluamVjdCIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IlRlbXAgc2Vuc29yIDIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJyb3V0aW5nS2V5IiwidiI6InRlbXBlcmF0dXJlLnNlbnNvcjIiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMTAwXHQiLCJwYXlsb2FkVHlwZSI6Impzb25hdGEiLCJ4IjoxODAsInkiOjY2MCwid2lyZXMiOltbIjY1M2FlYzM3MmVjYjY4YTMiXV19LHsiaWQiOiIwNGQ0MDU2YTg3MTkzNDNkIiwidHlwZSI6ImluamVjdCIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IlRlbXAgc2Vuc29yIDMiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJyb3V0aW5nS2V5IiwidiI6InRlbXBlcmF0dXJlLnNlbnNvcjMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMTAwXHQiLCJwYXlsb2FkVHlwZSI6Impzb25hdGEiLCJ4IjoxODAsInkiOjcyMCwid2lyZXMiOltbIjY1M2FlYzM3MmVjYjY4YTMiXV19LHsiaWQiOiJhN2M1NWViMzhiYjVmODI4IiwidHlwZSI6ImFtcXAtaW4iLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiIiLCJicm9rZXIiOiJiZmIxZTdlOTdlZWY1ZTA0IiwicHJlZmV0Y2giOjAsInJlY29ubmVjdE9uRXJyb3IiOmZhbHNlLCJub0FjayI6dHJ1ZSwiZXhjaGFuZ2VOYW1lIjoid2VhdGhlcl9kYXRhIiwiZXhjaGFuZ2VUeXBlIjoidG9waWMiLCJleGNoYW5nZVJvdXRpbmdLZXkiOiJ0ZW1wZXJhdHVyZS4qIiwiZXhjaGFuZ2VEdXJhYmxlIjp0cnVlLCJxdWV1ZU5hbWUiOiIiLCJxdWV1ZUV4Y2x1c2l2ZSI6dHJ1ZSwicXVldWVEdXJhYmxlIjpmYWxzZSwicXVldWVBdXRvRGVsZXRlIjp0cnVlLCJoZWFkZXJzIjoie30iLCJ4Ijo0NjAsInkiOjg0MCwid2lyZXMiOltbIjAwNTJhOWZhYjgxMjAwMmYiXV19LHsiaWQiOiI0YWMwZDgyZGYxMzdmNGJlIiwidHlwZSI6ImFtcXAtaW4iLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiIiLCJicm9rZXIiOiJiZmIxZTdlOTdlZWY1ZTA0IiwicHJlZmV0Y2giOjAsInJlY29ubmVjdE9uRXJyb3IiOmZhbHNlLCJub0FjayI6dHJ1ZSwiZXhjaGFuZ2VOYW1lIjoid2VhdGhlcl9kYXRhIiwiZXhjaGFuZ2VUeXBlIjoidG9waWMiLCJleGNoYW5nZVJvdXRpbmdLZXkiOiJodW1pZGl0eS4qIiwiZXhjaGFuZ2VEdXJhYmxlIjp0cnVlLCJxdWV1ZU5hbWUiOiIiLCJxdWV1ZUV4Y2x1c2l2ZSI6dHJ1ZSwicXVldWVEdXJhYmxlIjpmYWxzZSwicXVldWVBdXRvRGVsZXRlIjp0cnVlLCJoZWFkZXJzIjoie30iLCJ4Ijo0NTAsInkiOjkyMCwid2lyZXMiOltbIjU4Zjg2ZGI5NThmOWMzMmQiXV19LHsiaWQiOiJhMzY3NzM0ZDc3YmQ1ZGNkIiwidHlwZSI6ImluamVjdCIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6Ikh1bSBzZW5zb3IgMSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InJvdXRpbmdLZXkiLCJ2IjoiaHVtaWRpdHkuc2Vuc29yMSIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIkcmFuZG9tKCkgKiAyMDBcdCIsInBheWxvYWRUeXBlIjoianNvbmF0YSIsIngiOjY5MCwieSI6NTgwLCJ3aXJlcyI6W1siMDQyNDgxOTRjY2NmOGM3YSJdXX0seyJpZCI6IjA0MjQ4MTk0Y2NjZjhjN2EiLCJ0eXBlIjoiYW1xcC1vdXQiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiIiLCJicm9rZXIiOiJiZmIxZTdlOTdlZWY1ZTA0IiwicmVjb25uZWN0T25FcnJvciI6ZmFsc2UsImV4Y2hhbmdlTmFtZSI6IndlYXRoZXJfZGF0YSIsImV4Y2hhbmdlVHlwZSI6InRvcGljIiwiZXhjaGFuZ2VSb3V0aW5nS2V5IjoiIiwiZXhjaGFuZ2VSb3V0aW5nS2V5VHlwZSI6InN0ciIsImV4Y2hhbmdlRHVyYWJsZSI6dHJ1ZSwiYW1xcFByb3BlcnRpZXMiOiJ7IFwiaGVhZGVyc1wiOiB7fSB9IiwicnBjVGltZW91dE1pbGxpc2Vjb25kcyI6MzAwMCwib3V0cHV0cyI6MCwieCI6OTQwLCJ5Ijo2NDAsIndpcmVzIjpbXX0seyJpZCI6IjNjZDQ4MDZlMWJiNjQ1NjQiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiSHVtIHNlbnNvciAyIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoicm91dGluZ0tleSIsInYiOiJodW1pZGl0eS5zZW5zb3IyIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiRyYW5kb20oKSAqIDEwMFx0IiwicGF5bG9hZFR5cGUiOiJqc29uYXRhIiwieCI6NjkwLCJ5Ijo2NDAsIndpcmVzIjpbWyIwNDI0ODE5NGNjY2Y4YzdhIl1dfSx7ImlkIjoiMzU3MjVkZmUyODVlMGRiMSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJIdW0gc2Vuc29yIDMiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJyb3V0aW5nS2V5IiwidiI6Imh1bWlkaXR5LnNlbnNvcjMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMTAwXHQiLCJwYXlsb2FkVHlwZSI6Impzb25hdGEiLCJ4Ijo2OTAsInkiOjcwMCwid2lyZXMiOltbIjA0MjQ4MTk0Y2NjZjhjN2EiXV19LHsiaWQiOiIwMDUyYTlmYWI4MTIwMDJmIiwidHlwZSI6ImRlYnVnIiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiVGVtcGVyYXR1cmUgc2Vuc29ycyBkYXRhIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc3MCwieSI6ODQwLCJ3aXJlcyI6W119LHsiaWQiOiI1OGY4NmRiOTU4ZjljMzJkIiwidHlwZSI6ImRlYnVnIiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiSHVtaWRpdHkgc2Vuc29ycyBkYXRhIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc2MCwieSI6OTIwLCJ3aXJlcyI6W119LHsiaWQiOiJiZmIxZTdlOTdlZWY1ZTA0IiwidHlwZSI6ImFtcXAtYnJva2VyIiwibmFtZSI6IkFNUVAgQ29uZmlnIiwiaG9zdCI6ImxvY2FsaG9zdCIsInBvcnQiOiI1NjcyIiwidmhvc3QiOiIiLCJ0bHMiOmZhbHNlLCJjcmVkc0Zyb21TZXR0aW5ncyI6ZmFsc2V9XQ=="
---
::



We explored the Topic type exchange, which allows for more flexible routing using wildcard patterns in the routing key. The example involved a smart weather station where data from various sensors is published and handled based on sensor types. This setup is ideal for situations where you need to route messages based on partial matches or patterns, offering more granular control over message delivery.

## Fanout Exchange

Scenario: You have a smart home system with various components, such as lights, thermostats, and security cameras, and you want to broadcast status updates to all components simultaneously.

#### Sending Data using Fanout Exchange

1. Drag some inject nodes onto the canvas and set the payload for each. These inject nodes will act as the components sending updates such as lights, thermostats, etc
2. Drag the mqtt-out node onto the canvas, Set the exchange type to `"Fanout"` and specify the exchange name as `"system_updates"`
3. Connect each inject node to the `amqp-out` node. This setup ensures that each status update payload is sent to the "system_updates" exchange, broadcasting to all subscribed components.

#### Receiving Data from Fanout Exchange

1. Drag `amqp-in` nodes onto the canvas. Configure one to listen for messages from the `"weather_data"` exchange.
2. Connect the `amqp-in` node to a `debug` node to see the update received from all your components' data.

![Image showing the flow that uses the Fanout exchange type to send messages and receive messages.](/node-red-media/protocol/images/fanout.gif){data-zoomable}
_Image showing the flow that uses the Fanout exchange type to send and receive messages._



::render-flow
---
height: 200
flow: "W3siaWQiOiI3YmViNDIzN2JhMDkwMTBiIiwidHlwZSI6ImluamVjdCIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IkxpZ2h0IHVwZGF0ZSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiTGlnaHQgdHVybmVkIG9uIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjoxNzAsInkiOjEyMjAsIndpcmVzIjpbWyJkNjk5Y2Q3MzVjYzhhMGFlIl1dfSx7ImlkIjoiODgxOGYxMjJjODkzN2U1OCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJ0aGVybW9zdGF0cyB1cGRhdGUiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IkEgbmV3IGZpcm13YXJlIHVwZGF0ZSBpcyBhdmFpbGFibGUgZm9yIHlvdXIgdGhlcm1vc3RhdCIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MTkwLCJ5IjoxMjgwLCJ3aXJlcyI6W1siZDY5OWNkNzM1Y2M4YTBhZSJdXX0seyJpZCI6IjUxN2FhZDdiMTYzZDViZGUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiQ2FtZXJhIHVwZGF0ZSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiTW92ZW1lbnQgZGV0ZWN0ZWQiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjE4MCwieSI6MTM0MCwid2lyZXMiOltbImQ2OTljZDczNWNjOGEwYWUiXV19LHsiaWQiOiJkNjk5Y2Q3MzVjYzhhMGFlIiwidHlwZSI6ImFtcXAtb3V0IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiIiwiYnJva2VyIjoiYmZiMWU3ZTk3ZWVmNWUwNCIsInJlY29ubmVjdE9uRXJyb3IiOmZhbHNlLCJleGNoYW5nZU5hbWUiOiJzeXN0ZW1fdXBkYXRlcyIsImV4Y2hhbmdlVHlwZSI6ImZhbm91dCIsImV4Y2hhbmdlUm91dGluZ0tleSI6IiIsImV4Y2hhbmdlUm91dGluZ0tleVR5cGUiOiJzdHIiLCJleGNoYW5nZUR1cmFibGUiOnRydWUsImFtcXBQcm9wZXJ0aWVzIjoieyBcImhlYWRlcnNcIjoge30gfSIsInJwY1RpbWVvdXRNaWxsaXNlY29uZHMiOjMwMDAsIm91dHB1dHMiOjAsIngiOjQ2MCwieSI6MTI4MCwid2lyZXMiOltdfSx7ImlkIjoiMWRiNDA1NmI0YzY2Y2IyMiIsInR5cGUiOiJhbXFwLWluIiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiIiwiYnJva2VyIjoiYmZiMWU3ZTk3ZWVmNWUwNCIsInByZWZldGNoIjowLCJyZWNvbm5lY3RPbkVycm9yIjp0cnVlLCJub0FjayI6ZmFsc2UsImV4Y2hhbmdlTmFtZSI6InN5c3RlbV91cGRhdGVzIiwiZXhjaGFuZ2VUeXBlIjoiZmFub3V0IiwiZXhjaGFuZ2VSb3V0aW5nS2V5IjoiIiwiZXhjaGFuZ2VEdXJhYmxlIjp0cnVlLCJxdWV1ZU5hbWUiOiIiLCJxdWV1ZUV4Y2x1c2l2ZSI6dHJ1ZSwicXVldWVEdXJhYmxlIjpmYWxzZSwicXVldWVBdXRvRGVsZXRlIjp0cnVlLCJoZWFkZXJzIjoie30iLCJ4IjoxODAsInkiOjE1MjAsIndpcmVzIjpbWyIyMzkyZTdkOTEzOTgxM2EzIl1dfSx7ImlkIjoiMjM5MmU3ZDkxMzk4MTNhMyIsInR5cGUiOiJkZWJ1ZyIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NDIwLCJ5IjoxNTIwLCJ3aXJlcyI6W119LHsiaWQiOiJiZmIxZTdlOTdlZWY1ZTA0IiwidHlwZSI6ImFtcXAtYnJva2VyIiwibmFtZSI6IkFNUVAgQ29uZmlnIiwiaG9zdCI6ImxvY2FsaG9zdCIsInBvcnQiOiI1NjcyIiwidmhvc3QiOiIiLCJ0bHMiOmZhbHNlLCJjcmVkc0Zyb21TZXR0aW5ncyI6ZmFsc2V9XQ=="
---
::



We used a Fanout type exchange to broadcast messages to all queues connected to the exchange. We illustrated this with a smart home system where status updates from different components are sent to all devices simultaneously. This type of exchange is perfect for scenarios where you need to send the same message to multiple recipients without concern for routing keys.

## Headers Exchange

**Scenario**: Suppose you have different machines in a factory sending data about their operational status, such as whether they are running, idle, or experiencing an error. You want to route messages based on machine type, operational status, and priority level. Has two components in your monitoring system: one that receives updates from only the CNC machine with the status of error and priority high and another that receives updates from all of the machines with the idle status and high priority. 

#### Sending Data from Headers Exchange

1. Drag two inject nodes on to the canvas. Configure the first `inject` node to send data with a `msg.properties` of `{"headers":{"machine-type": "CNC," "status": "error," "priority": "high"}}` and the second with a `msg.properties` of `{"headers":{"machine-type": "A," "status": "idle," "priority": "high"}}.` set the payload for each of the inject node you want to send.

2. Drag the amqp-out node onto the canvas, Set the exchange type to `headers,` and specify the exchange name as `system_update.`

#### Receiving Data from Headers Exchange

1. Drag two `amqp-in` nodes on to the canvas. Configure one to listen for messages with the `headers` of `{ "x-match": "all," "machine-type": "CNC," "status": "error," "priority": "high"}` and the other with `{ "x-match": "any," machine-type": "A," "status": "idle," "priority": "high"}.` Both nodes should be set to the `system_update` exchange.
2. Connect each `amqp-in` node to a `debug` node to see the updates received for each component. 

!["Image showing the flow that uses the Headers exchange type to send messages and receive messages."](/node-red-media/protocol/images/header.gif){data-zoomable}
_Image showing the flow that uses the Headers exchange type to send messages and receive messages_



::render-flow
---
height: 200
flow: "W3siaWQiOiIxMmM4MDQ4Zi40ZWFlZmIiLCJ0eXBlIjoiYW1xcC1pbiIsInoiOiJlNGZlOWM0NC42ZGVlMSIsIm5hbWUiOiIiLCJicm9rZXIiOiI4M2U5YmY3MWZiZTA5OWM4IiwicHJlZmV0Y2giOjAsInJlY29ubmVjdE9uRXJyb3IiOnRydWUsIm5vQWNrIjp0cnVlLCJleGNoYW5nZU5hbWUiOiJtYWNoaW5lc191cGRhdGUiLCJleGNoYW5nZVR5cGUiOiJoZWFkZXJzIiwiZXhjaGFuZ2VSb3V0aW5nS2V5IjoiIiwiZXhjaGFuZ2VEdXJhYmxlIjpmYWxzZSwicXVldWVOYW1lIjoiIiwicXVldWVFeGNsdXNpdmUiOnRydWUsInF1ZXVlRHVyYWJsZSI6ZmFsc2UsInF1ZXVlQXV0b0RlbGV0ZSI6dHJ1ZSwiaGVhZGVycyI6IntcIngtbWF0Y2hcIjpcImFsbFwiLFwibWFjaGluZS10eXBlXCI6XCJDTkNcIixcInN0YXR1c1wiOlwiZXJyb3JcIixcInByaW9yaXR5XCI6XCJoaWdoXCJ9IiwieCI6MTcwLCJ5IjoxMDAwLCJ3aXJlcyI6W1siOGVjM2ZhODcuNzBjMzM4Il1dfSx7ImlkIjoiNmVjY2M0Zi5jNmEyYTNjIiwidHlwZSI6ImFtcXAtb3V0IiwieiI6ImU0ZmU5YzQ0LjZkZWUxIiwibmFtZSI6IiIsImJyb2tlciI6IjgzZTliZjcxZmJlMDk5YzgiLCJyZWNvbm5lY3RPbkVycm9yIjp0cnVlLCJleGNoYW5nZU5hbWUiOiJtYWNoaW5lc191cGRhdGUiLCJleGNoYW5nZVR5cGUiOiJoZWFkZXJzIiwiZXhjaGFuZ2VSb3V0aW5nS2V5IjoiIiwiZXhjaGFuZ2VSb3V0aW5nS2V5VHlwZSI6InN0ciIsImV4Y2hhbmdlRHVyYWJsZSI6ZmFsc2UsImFtcXBQcm9wZXJ0aWVzIjoie30iLCJycGNUaW1lb3V0TWlsbGlzZWNvbmRzIjoiIiwib3V0cHV0cyI6MCwieCI6NTMwLCJ5Ijo3ODAsIndpcmVzIjpbXX0seyJpZCI6ImNiNTA5M2JmLjFkNTI0IiwidHlwZSI6ImluamVjdCIsInoiOiJlNGZlOWM0NC42ZGVlMSIsIm5hbWUiOiJDTkMgbWFjaGluZTogZXJyb3Igb2NjdXJlZCIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InByb3BlcnRpZXMiLCJ2Ijoie1wiaGVhZGVyc1wiOntcIm1hY2hpbmUtdHlwZVwiOlwiQ05DXCIsXCJzdGF0dXNcIjpcImVycm9yXCIsXCJwcmlvcml0eVwiOlwiaGlnaFwifX0iLCJ2dCI6Impzb24ifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IkVycnJvciBvY2N1cmVkIGluIHRoZSBDTkMgbWFjaGluZSIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MjAwLCJ5Ijo3ODAsIndpcmVzIjpbWyI2ZWNjYzRmLmM2YTJhM2MiXV19LHsiaWQiOiI4ZWMzZmE4Ny43MGMzMzgiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZTRmZTljNDQuNmRlZTEiLCJuYW1lIjoiT25seSBmcm9tIENOQyBtYWNoaW5lcyB0aGF0IGhhcyBzdGF0dXMgZXJyb3IgYW5kIHByaW9yaXR5IGhpZ2giLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjYxMCwieSI6MTAwMCwid2lyZXMiOltdfSx7ImlkIjoiZDRjMmY4NGI1MWQyZDNjYiIsInR5cGUiOiJhbXFwLW91dCIsInoiOiJlNGZlOWM0NC42ZGVlMSIsIm5hbWUiOiIiLCJicm9rZXIiOiI4M2U5YmY3MWZiZTA5OWM4IiwicmVjb25uZWN0T25FcnJvciI6dHJ1ZSwiZXhjaGFuZ2VOYW1lIjoibWFjaGluZXNfdXBkYXRlIiwiZXhjaGFuZ2VUeXBlIjoiaGVhZGVycyIsImV4Y2hhbmdlUm91dGluZ0tleSI6IiIsImV4Y2hhbmdlUm91dGluZ0tleVR5cGUiOiJzdHIiLCJleGNoYW5nZUR1cmFibGUiOmZhbHNlLCJhbXFwUHJvcGVydGllcyI6Int9IiwicnBjVGltZW91dE1pbGxpc2Vjb25kcyI6IiIsIm91dHB1dHMiOjAsIngiOjUzMCwieSI6ODQwLCJ3aXJlcyI6W119LHsiaWQiOiI4MWMyMWU5OTQxZTA2YTU4IiwidHlwZSI6ImluamVjdCIsInoiOiJlNGZlOWM0NC42ZGVlMSIsIm5hbWUiOiJVcGRhdGUgZnJvbSBNYWNoaW5lIEEiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJwcm9wZXJ0aWVzIiwidiI6IntcImhlYWRlcnNcIjp7XCJtYWNoaW5lLXR5cGVcIjpcIkFcIixcInN0YXR1c1wiOlwiaWRsZVwiLFwicHJpb3JpdHlcIjpcImhpZ2hcIn19IiwidnQiOiJqc29uIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJNYWNoaW5lIEEgaXMgY3VycmVudGx5IGlkbGUsIGF3YWl0aW5nIG5leHQgb3BlcmF0aW9uLiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MTgwLCJ5Ijo4NDAsIndpcmVzIjpbWyJkNGMyZjg0YjUxZDJkM2NiIl1dfSx7ImlkIjoiYWJlNTVhYWZiNWY2NWVhYyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJlNGZlOWM0NC42ZGVlMSIsIm5hbWUiOiJGcm9tIGFsbCBvZiB0aGUgbWFjaGluZXMgaGF2aW5nICBzdGF0dXMgaWRsZSBvciBwcmlvcml0eSBoaWdoIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo1NzAsInkiOjExMjAsIndpcmVzIjpbXX0seyJpZCI6ImFkZmNhYTk1MTIyYTM1NTYiLCJ0eXBlIjoiYW1xcC1pbiIsInoiOiJlNGZlOWM0NC42ZGVlMSIsIm5hbWUiOiIiLCJicm9rZXIiOiI4M2U5YmY3MWZiZTA5OWM4IiwicHJlZmV0Y2giOjAsInJlY29ubmVjdE9uRXJyb3IiOnRydWUsIm5vQWNrIjp0cnVlLCJleGNoYW5nZU5hbWUiOiJtYWNoaW5lc191cGRhdGUiLCJleGNoYW5nZVR5cGUiOiJoZWFkZXJzIiwiZXhjaGFuZ2VSb3V0aW5nS2V5IjoiIiwiZXhjaGFuZ2VEdXJhYmxlIjpmYWxzZSwicXVldWVOYW1lIjoiIiwicXVldWVFeGNsdXNpdmUiOnRydWUsInF1ZXVlRHVyYWJsZSI6ZmFsc2UsInF1ZXVlQXV0b0RlbGV0ZSI6dHJ1ZSwiaGVhZGVycyI6IntcIngtbWF0Y2hcIjpcImFueVwiLFwibWFjaGluZS10eXBlXCI6XCJBXCIsXCJzdGF0dXNcIjpcImlkbGVcIixcInByaW9yaXR5XCI6XCJoaWdoXCJ9IiwieCI6MTcwLCJ5IjoxMTIwLCJ3aXJlcyI6W1siYWJlNTVhYWZiNWY2NWVhYyJdXX0seyJpZCI6IjgzZTliZjcxZmJlMDk5YzgiLCJ0eXBlIjoiYW1xcC1icm9rZXIiLCJuYW1lIjoiIiwiaG9zdCI6ImxvY2FsaG9zdCIsInBvcnQiOiI1NjcyIiwidmhvc3QiOiIiLCJ0bHMiOmZhbHNlLCJjcmVkc0Zyb21TZXR0aW5ncyI6ZmFsc2V9XQ=="
---
::



Finally, we configured a Headers type exchange, which routes messages based on attributes in the message headers. The example focused on a factory monitoring system, where updates from machines are routed based on criteria like machine type, status, and priority. This exchange type is powerful for complex routing scenarios where decisions are based on multiple attributes rather than just the routing key.
