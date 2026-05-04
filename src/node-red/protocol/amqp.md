---
eleventyNavigation:
  key: AMQP
  parent: "Communication Protocols"
meta:
  title: Using AMQP with Node-RED
  description: Learn how to integrate AMQP with Node-RED for reliable message delivery, advanced routing, and improved data management in your flows.
  keywords: node-red amqp, node-red rabbitmq, how to use amqp with node-red, how to use rabbitmq with node-red, rabbitmq node red, amqp node red
image: /node-red/protocol/images/amqp-with-node-red.png
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

![Image showing the flow that uses the Direct exchange type to send messages and receive messages](./images/direct.gif){data-zoomable}
_Image showing the flow that uses the Direct exchange type to send messages and receive messages_

{% renderFlow %}
[{"id":"efe7a260307e6202","type":"amqp-out","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","reconnectOnError":true,"exchangeName":"irrigation_control","exchangeType":"direct","exchangeRoutingKey":"","exchangeRoutingKeyType":"str","exchangeDurable":true,"amqpProperties":"{ \"headers\": {} }","rpcTimeoutMilliseconds":3000,"outputs":0,"x":470,"y":160,"wires":[]},{"id":"538de33f548833ac","type":"inject","z":"807758ec576fbfd8","name":"Send command to zone 1","props":[{"p":"payload"},{"p":"routingKey","v":"zone1","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{ \"command\": \"start\" }","payloadType":"json","x":230,"y":100,"wires":[["efe7a260307e6202"]]},{"id":"20cfe04fab562ea9","type":"inject","z":"807758ec576fbfd8","name":"Send command to zone 2","props":[{"p":"payload"},{"p":"routingKey","v":"zone2","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{ \"command\": \"stop\" }","payloadType":"str","x":230,"y":240,"wires":[["efe7a260307e6202"]]},{"id":"7a5e0f3a66dc1ccc","type":"amqp-in","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","prefetch":0,"reconnectOnError":true,"noAck":true,"exchangeName":"irrigation_control","exchangeType":"direct","exchangeRoutingKey":"zone1","exchangeDurable":true,"queueName":"","queueExclusive":true,"queueDurable":false,"queueAutoDelete":true,"headers":"{}","x":230,"y":360,"wires":[["63c5671d6f4efd07"]]},{"id":"4bf1b44b656c35c2","type":"amqp-in","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","prefetch":0,"reconnectOnError":true,"noAck":true,"exchangeName":"irrigation_control","exchangeType":"direct","exchangeRoutingKey":"zone2","exchangeDurable":true,"queueName":"","queueExclusive":true,"queueDurable":false,"queueAutoDelete":true,"headers":"{}","x":230,"y":440,"wires":[["e7d4fabe9ef668fe"]]},{"id":"63c5671d6f4efd07","type":"debug","z":"807758ec576fbfd8","name":"Zone 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":500,"y":360,"wires":[]},{"id":"e7d4fabe9ef668fe","type":"debug","z":"807758ec576fbfd8","name":"Zone 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":500,"y":440,"wires":[]},{"id":"bfb1e7e97eef5e04","type":"amqp-broker","name":"AMQP Config","host":"localhost","port":"5672","vhost":"","tls":false,"credsFromSettings":false}]
{% endrenderFlow %}

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

![Image showing the flow that uses the Topic exchange type to send messages and receive messages.](./images/topic.gif){data-zoomable}
_Image showing the flow that uses the Topic exchange type to send messages and receive messages_

{% renderFlow %}
[{"id":"06ca737a23c93c75","type":"inject","z":"807758ec576fbfd8","name":"Temp sensor 1","props":[{"p":"payload"},{"p":"routingKey","v":"temperature.sensor1","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 100\t","payloadType":"jsonata","x":180,"y":600,"wires":[["653aec372ecb68a3"]]},{"id":"653aec372ecb68a3","type":"amqp-out","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","reconnectOnError":false,"exchangeName":"weather_data","exchangeType":"topic","exchangeRoutingKey":"","exchangeRoutingKeyType":"str","exchangeDurable":true,"amqpProperties":"{ \"headers\": {} }","rpcTimeoutMilliseconds":3000,"outputs":0,"x":420,"y":660,"wires":[]},{"id":"39546cb6c75044e2","type":"inject","z":"807758ec576fbfd8","name":"Temp sensor 2","props":[{"p":"payload"},{"p":"routingKey","v":"temperature.sensor2","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 100\t","payloadType":"jsonata","x":180,"y":660,"wires":[["653aec372ecb68a3"]]},{"id":"04d4056a8719343d","type":"inject","z":"807758ec576fbfd8","name":"Temp sensor 3","props":[{"p":"payload"},{"p":"routingKey","v":"temperature.sensor3","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 100\t","payloadType":"jsonata","x":180,"y":720,"wires":[["653aec372ecb68a3"]]},{"id":"a7c55eb38bb5f828","type":"amqp-in","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","prefetch":0,"reconnectOnError":false,"noAck":true,"exchangeName":"weather_data","exchangeType":"topic","exchangeRoutingKey":"temperature.*","exchangeDurable":true,"queueName":"","queueExclusive":true,"queueDurable":false,"queueAutoDelete":true,"headers":"{}","x":460,"y":840,"wires":[["0052a9fab812002f"]]},{"id":"4ac0d82df137f4be","type":"amqp-in","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","prefetch":0,"reconnectOnError":false,"noAck":true,"exchangeName":"weather_data","exchangeType":"topic","exchangeRoutingKey":"humidity.*","exchangeDurable":true,"queueName":"","queueExclusive":true,"queueDurable":false,"queueAutoDelete":true,"headers":"{}","x":450,"y":920,"wires":[["58f86db958f9c32d"]]},{"id":"a367734d77bd5dcd","type":"inject","z":"807758ec576fbfd8","name":"Hum sensor 1","props":[{"p":"payload"},{"p":"routingKey","v":"humidity.sensor1","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 200\t","payloadType":"jsonata","x":690,"y":580,"wires":[["04248194cccf8c7a"]]},{"id":"04248194cccf8c7a","type":"amqp-out","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","reconnectOnError":false,"exchangeName":"weather_data","exchangeType":"topic","exchangeRoutingKey":"","exchangeRoutingKeyType":"str","exchangeDurable":true,"amqpProperties":"{ \"headers\": {} }","rpcTimeoutMilliseconds":3000,"outputs":0,"x":940,"y":640,"wires":[]},{"id":"3cd4806e1bb64564","type":"inject","z":"807758ec576fbfd8","name":"Hum sensor 2","props":[{"p":"payload"},{"p":"routingKey","v":"humidity.sensor2","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 100\t","payloadType":"jsonata","x":690,"y":640,"wires":[["04248194cccf8c7a"]]},{"id":"35725dfe285e0db1","type":"inject","z":"807758ec576fbfd8","name":"Hum sensor 3","props":[{"p":"payload"},{"p":"routingKey","v":"humidity.sensor3","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 100\t","payloadType":"jsonata","x":690,"y":700,"wires":[["04248194cccf8c7a"]]},{"id":"0052a9fab812002f","type":"debug","z":"807758ec576fbfd8","name":"Temperature sensors data","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":770,"y":840,"wires":[]},{"id":"58f86db958f9c32d","type":"debug","z":"807758ec576fbfd8","name":"Humidity sensors data","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":760,"y":920,"wires":[]},{"id":"bfb1e7e97eef5e04","type":"amqp-broker","name":"AMQP Config","host":"localhost","port":"5672","vhost":"","tls":false,"credsFromSettings":false}]
{% endrenderFlow %}

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

![Image showing the flow that uses the Fanout exchange type to send messages and receive messages.](./images/fanout.gif){data-zoomable}
_Image showing the flow that uses the Fanout exchange type to send and receive messages._

{% renderFlow %}
[{"id":"7beb4237ba09010b","type":"inject","z":"807758ec576fbfd8","name":"Light update","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Light turned on","payloadType":"str","x":170,"y":1220,"wires":[["d699cd735cc8a0ae"]]},{"id":"8818f122c8937e58","type":"inject","z":"807758ec576fbfd8","name":"thermostats update","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"A new firmware update is available for your thermostat","payloadType":"str","x":190,"y":1280,"wires":[["d699cd735cc8a0ae"]]},{"id":"517aad7b163d5bde","type":"inject","z":"807758ec576fbfd8","name":"Camera update","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Movement detected","payloadType":"str","x":180,"y":1340,"wires":[["d699cd735cc8a0ae"]]},{"id":"d699cd735cc8a0ae","type":"amqp-out","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","reconnectOnError":false,"exchangeName":"system_updates","exchangeType":"fanout","exchangeRoutingKey":"","exchangeRoutingKeyType":"str","exchangeDurable":true,"amqpProperties":"{ \"headers\": {} }","rpcTimeoutMilliseconds":3000,"outputs":0,"x":460,"y":1280,"wires":[]},{"id":"1db4056b4c66cb22","type":"amqp-in","z":"807758ec576fbfd8","name":"","broker":"bfb1e7e97eef5e04","prefetch":0,"reconnectOnError":true,"noAck":false,"exchangeName":"system_updates","exchangeType":"fanout","exchangeRoutingKey":"","exchangeDurable":true,"queueName":"","queueExclusive":true,"queueDurable":false,"queueAutoDelete":true,"headers":"{}","x":180,"y":1520,"wires":[["2392e7d9139813a3"]]},{"id":"2392e7d9139813a3","type":"debug","z":"807758ec576fbfd8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":420,"y":1520,"wires":[]},{"id":"bfb1e7e97eef5e04","type":"amqp-broker","name":"AMQP Config","host":"localhost","port":"5672","vhost":"","tls":false,"credsFromSettings":false}]
{% endrenderFlow %}

We used a Fanout type exchange to broadcast messages to all queues connected to the exchange. We illustrated this with a smart home system where status updates from different components are sent to all devices simultaneously. This type of exchange is perfect for scenarios where you need to send the same message to multiple recipients without concern for routing keys.

## Headers Exchange

**Scenario**: Suppose you have different machines in a factory sending data about their operational status, such as whether they are running, idle, or experiencing an error. You want to route messages based on machine type, operational status, and priority level. Has two components in your monitoring system: one that receives updates from only the CNC machine with the status of error and priority high and another that receives updates from all of the machines with the idle status and high priority. 

#### Sending Data from Headers Exchange

1. Drag two inject nodes on to the canvas. Configure the first `inject` node to send data with a `msg.properties` of `{"headers":{"machine-type": "CNC," "status": "error," "priority": "high"}}` and the second with a `msg.properties` of `{"headers":{"machine-type": "A," "status": "idle," "priority": "high"}}.` set the payload for each of the inject node you want to send.

2. Drag the amqp-out node onto the canvas, Set the exchange type to `headers,` and specify the exchange name as `system_update.`

#### Receiving Data from Headers Exchange

1. Drag two `amqp-in` nodes on to the canvas. Configure one to listen for messages with the `headers` of `{ "x-match": "all," "machine-type": "CNC," "status": "error," "priority": "high"}` and the other with `{ "x-match": "any," machine-type": "A," "status": "idle," "priority": "high"}.` Both nodes should be set to the `system_update` exchange.
2. Connect each `amqp-in` node to a `debug` node to see the updates received for each component. 

!["Image showing the flow that uses the Headers exchange type to send messages and receive messages."](./images/header.gif){data-zoomable}
_Image showing the flow that uses the Headers exchange type to send messages and receive messages_

{% renderFlow %}
[{"id":"12c8048f.4eaefb","type":"amqp-in","z":"e4fe9c44.6dee1","name":"","broker":"83e9bf71fbe099c8","prefetch":0,"reconnectOnError":true,"noAck":true,"exchangeName":"machines_update","exchangeType":"headers","exchangeRoutingKey":"","exchangeDurable":false,"queueName":"","queueExclusive":true,"queueDurable":false,"queueAutoDelete":true,"headers":"{\"x-match\":\"all\",\"machine-type\":\"CNC\",\"status\":\"error\",\"priority\":\"high\"}","x":170,"y":1000,"wires":[["8ec3fa87.70c338"]]},{"id":"6eccc4f.c6a2a3c","type":"amqp-out","z":"e4fe9c44.6dee1","name":"","broker":"83e9bf71fbe099c8","reconnectOnError":true,"exchangeName":"machines_update","exchangeType":"headers","exchangeRoutingKey":"","exchangeRoutingKeyType":"str","exchangeDurable":false,"amqpProperties":"{}","rpcTimeoutMilliseconds":"","outputs":0,"x":530,"y":780,"wires":[]},{"id":"cb5093bf.1d524","type":"inject","z":"e4fe9c44.6dee1","name":"CNC machine: error occured","props":[{"p":"payload"},{"p":"properties","v":"{\"headers\":{\"machine-type\":\"CNC\",\"status\":\"error\",\"priority\":\"high\"}}","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Errror occured in the CNC machine","payloadType":"str","x":200,"y":780,"wires":[["6eccc4f.c6a2a3c"]]},{"id":"8ec3fa87.70c338","type":"debug","z":"e4fe9c44.6dee1","name":"Only from CNC machines that has status error and priority high","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":610,"y":1000,"wires":[]},{"id":"d4c2f84b51d2d3cb","type":"amqp-out","z":"e4fe9c44.6dee1","name":"","broker":"83e9bf71fbe099c8","reconnectOnError":true,"exchangeName":"machines_update","exchangeType":"headers","exchangeRoutingKey":"","exchangeRoutingKeyType":"str","exchangeDurable":false,"amqpProperties":"{}","rpcTimeoutMilliseconds":"","outputs":0,"x":530,"y":840,"wires":[]},{"id":"81c21e9941e06a58","type":"inject","z":"e4fe9c44.6dee1","name":"Update from Machine A","props":[{"p":"payload"},{"p":"properties","v":"{\"headers\":{\"machine-type\":\"A\",\"status\":\"idle\",\"priority\":\"high\"}}","vt":"json"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Machine A is currently idle, awaiting next operation.","payloadType":"str","x":180,"y":840,"wires":[["d4c2f84b51d2d3cb"]]},{"id":"abe55aafb5f65eac","type":"debug","z":"e4fe9c44.6dee1","name":"From all of the machines having  status idle or priority high","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":570,"y":1120,"wires":[]},{"id":"adfcaa95122a3556","type":"amqp-in","z":"e4fe9c44.6dee1","name":"","broker":"83e9bf71fbe099c8","prefetch":0,"reconnectOnError":true,"noAck":true,"exchangeName":"machines_update","exchangeType":"headers","exchangeRoutingKey":"","exchangeDurable":false,"queueName":"","queueExclusive":true,"queueDurable":false,"queueAutoDelete":true,"headers":"{\"x-match\":\"any\",\"machine-type\":\"A\",\"status\":\"idle\",\"priority\":\"high\"}","x":170,"y":1120,"wires":[["abe55aafb5f65eac"]]},{"id":"83e9bf71fbe099c8","type":"amqp-broker","name":"","host":"localhost","port":"5672","vhost":"","tls":false,"credsFromSettings":false}]
{% endrenderFlow %}

Finally, we configured a Headers type exchange, which routes messages based on attributes in the message headers. The example focused on a factory monitoring system, where updates from machines are routed based on criteria like machine type, status, and priority. This exchange type is powerful for complex routing scenarios where decisions are based on multiple attributes rather than just the routing key.
