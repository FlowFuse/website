# MQTT-in Node Configuration in Node-RED

The MQTT-in node is used to subscribe to a topic pattern on a given MQTT broker. This means messages published to a topic that matches the pattern will be delivered to the flow by this node.

## Configuration Options

**Server**:
Specifies the MQTT broker to connect to. You need to select or configure the broker details. For more details, refer to the [MQTT broker config node documentation](/node-red/core-nodes/mqtt-broker-config/). Additionally, you can override individual broker configuration settings by sending  `msg.broker`, `msg.url`, `msg.port`, `msg.username`, and `msg.password`. <!--todo: need to test -->

**Action**: 
- **Subscribe to single topic**: Subscribes to a specific topic.
- **Dynamic subscription**: Subscribes to topics dynamically based on the properties of incoming messages.

**Topic**:
- - The topic or topic pattern to subscribe to. For example, `sensor/temperature`, `sensor/#` (where `#` is a wildcard that matches multiple levels of topics), or `sensor/+/humidity` (where `+` is a wildcard that matches a single level in the topic hierarchy), you can also set topic dynamically with `msg.topic`.

**QoS (Quality of Service)**: Allows to select the level of assurance for message delivery, but you can also set it dynamically with `msg.qos`.
- **0 (At most once)**: The message is delivered at most once, with no confirmation.
- **1 (At least once)**: The message is delivered at least once, with confirmation but possible duplicates.
- **2 (Exactly once)**: The message is delivered exactly once using a four-step handshake.

**Output**:
Determines how the message payload should be processed and presented:
- **Auto detect (parsed JSON object, buffer, string)**: Automatically detects the type of payload and parses it accordingly.
- **Auto detect (string, buffer)**: Detects if the payload is a string or a buffer.
- **A buffer**: The payload is delivered as a buffer (binary data).
- **A string**: The payload is delivered as a string.
- **A parsed JSON object**: The payload is parsed as JSON and delivered as an object.
- **A base64 encoded string**: The payload is encoded in base64 and delivered as a string.

## Use Cases

- **Home Automation:** Integrate smart devices like lights, thermostats, and security systems using MQTT to send and receive control messages via Node-RED.

- **IoT Data Collection:** Collect and process data from multiple IoT sensors (temperature, humidity, etc.) using MQTT to transmit data to Node-RED for analysis or visualization.

- **Industrial Automation:** Monitor and control industrial equipment by using MQTT to handle real-time data streams from machinery, managing operations through Node-RED.

- **Smart Agriculture:** Manage irrigation, soil moisture levels, and weather data by sending sensor data via MQTT to Node-RED for processing and automated decision-making.

- **Remote Monitoring:** Implement remote monitoring solutions for systems like server rooms or environmental conditions using MQTT to communicate status updates and alerts to Node-RED dashboards.

- **Vehicle Telematics:** Track and monitor vehicle data (location, speed, diagnostics) by transmitting MQTT messages from the vehicle to Node-RED for real-time processing and alerts.

## Examples

1. In the following example flow, we are sending data to a test MQTT broker using the MQTT-Out node and then receiving it using the MQTT-In node.

{% renderFlow %}
[{"id":"2cac450cf825bfb9","type":"group","z":"a149bb66646389a3","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["bb79f2f114f79b39","cbc885829f5cf0dc","f2641dab58edbc70","75dbd3c2f8e97550","597643a335fb9b8f"],"x":194,"y":199,"w":732,"h":222},{"id":"bb79f2f114f79b39","type":"mqtt in","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"","topic":"ff/#","qos":"0","datatype":"auto-detect","broker":"037ca6b6ca0d7699","nl":false,"rap":true,"rh":0,"inputs":0,"x":410,"y":380,"wires":[["75dbd3c2f8e97550"]]},{"id":"cbc885829f5cf0dc","type":"mqtt out","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"","topic":"ff/test","qos":"","retain":"","respTopic":"","contentType":"","userProps":"","correl":"","expiry":"","broker":"037ca6b6ca0d7699","x":690,"y":320,"wires":[]},{"id":"f2641dab58edbc70","type":"inject","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":400,"y":320,"wires":[["cbc885829f5cf0dc"]]},{"id":"75dbd3c2f8e97550","type":"debug","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":700,"y":380,"wires":[]},{"id":"597643a335fb9b8f","type":"comment","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"Sending data to an MQTT broker using the MQTT-Out node and receiving it using the MQTT-In node","info":"","x":560,"y":240,"wires":[]},{"id":"037ca6b6ca0d7699","type":"mqtt-broker","name":"","broker":"test.mosquitto.org","port":"1883","clientid":"","autoConnect":true,"usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willPayload":"","willMsg":{},"userProps":"","sessionExpiry":""}]
{% endrenderFlow %}

2. In the following example flow, we are showing how you can subscribe to topics dynamically.

{% renderFlow %}
[{"id":"2cac450cf825bfb9","type":"group","z":"a149bb66646389a3","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["597643a335fb9b8f","bb79f2f114f79b39","cbc885829f5cf0dc","f2641dab58edbc70","75dbd3c2f8e97550","53f2a3fce26bf602"],"x":154,"y":199,"w":652,"h":222},{"id":"597643a335fb9b8f","type":"comment","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":" Showing How to Subscribe to Topics Dynamically","info":"","x":460,"y":240,"wires":[]},{"id":"bb79f2f114f79b39","type":"mqtt in","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"","topic":"","qos":"0","datatype":"auto-detect","broker":"0c9e6dcc8f028390","nl":false,"rap":true,"rh":0,"inputs":1,"x":450,"y":380,"wires":[["75dbd3c2f8e97550"]]},{"id":"cbc885829f5cf0dc","type":"mqtt out","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"","topic":"ff/test","qos":"","retain":"","respTopic":"","contentType":"","userProps":"","correl":"","expiry":"","broker":"0c9e6dcc8f028390","x":690,"y":320,"wires":[]},{"id":"f2641dab58edbc70","type":"inject","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"","props":[{"p":"payload"},{"p":"connect","v":"{\"url\":\"test.mosquitto.org\",\"port\":1883,\"force\":true}","vt":"json"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":270,"y":320,"wires":[["cbc885829f5cf0dc"]]},{"id":"75dbd3c2f8e97550","type":"debug","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":700,"y":380,"wires":[]},{"id":"53f2a3fce26bf602","type":"inject","z":"a149bb66646389a3","g":"2cac450cf825bfb9","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"},{"p":"action","v":"subscribe","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"ff/#","payload":"","payloadType":"date","x":270,"y":380,"wires":[["bb79f2f114f79b39"]]},{"id":"0c9e6dcc8f028390","type":"mqtt-broker","name":"","broker":"test.mosquitto.org","port":"1883","clientid":"","autoConnect":true,"usetls":false,"protocolVersion":"4","keepalive":"60","cleansession":true,"autoUnsubscribe":true,"birthTopic":"","birthQos":"0","birthRetain":"false","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closeRetain":"false","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willRetain":"false","willPayload":"","willMsg":{},"userProps":"","sessionExpiry":""}]
{% endrenderFlow %}