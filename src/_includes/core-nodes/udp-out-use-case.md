## What is udp-out node in Node-RED?

The udp-out node in Node-RED is a node used for sending UDP messages to a specified network destination. When you add a udp-out node to your Node-RED flow, you configure it with the IP address and port of the destination device or service. Then, any messages received by the udp-out node are sent as UDP packets to that destination. This node is particularly useful for applications where real-time communication or lightweight message transmission is required.

### What is Udp?

UDP (User Datagram Protocol) is a connectionless protocol in the Internet Protocol suite. It transmits data packets, or datagrams, without establishing a connection, prioritizing speed over reliability. Commonly used for real-time applications like video streaming, online gaming, and VoIP. UDP's simplicity reduces latency but doesn't guarantee the delivery of data packets. For more information refer to [UDP MDN Docs](https://developer.mozilla.org/en-US/docs/Glossary/UDP).

## Configuring UDP-Out Node

- **Send to:**
    - Choose the destination type:
        - Single IP: Specify the IP address of the target device or service. you can also specify the ip dynamically with msg.ip when this field left blank
        - Broadcast: Send the message to all devices on the network. you can either specify the address as the local broadcast IP address or use 255.255.255.255, which represents the global broadcast address.
        - Multicast: Send the message to a group of devices.
            - Group: Specify the multicast group address.
            - Local Interface: Select the network interface for sending multicast messages.

- **Port:**
    - Specify the port number that the UDP packets will be sent to. you can also specify the ip dynamically with msg.port when this field left blank

- **Address:**
    - Choose the type of address:
        - IPv4 Address: Specify an IPv4 address for the destination.
        - IPv6 Address: Specify an IPv6 address for the destination.
    - bind to random local port: When selected, the system automatically assigns an available local port for sending UDP packets.
    - bind to local port: When selected, you need to specify the local port number to which the UDP socket will be bound.

- **Decode Base64 encoded payload?:**
    - Choose whether to decode the payload as Base64 before sending it. This option is useful if the payload is encoded in Base64 format and needs to be decoded before being sent as a UDP message.

*Note: On some systems, you may need root or administrator access to use ports below 1024 and/or broadcast, and have to ensure your firewall allows the data in.*

**Note: The default UDP nodes have been removed from the Node-RED palette in the FlowFuse Cloud due to limitations in routing connections to the container running Node-RED inside the FlowFuse platform**

## Usecases

- **Sensor data transmission:** Utilize the udp-out node to transmit real-time data acquired from IoT sensors deployed in the field, such as temperature, humidity, or motion sensor readings, to a centralized processing system or server for analysis and storage.
- **Environmental monitoring:** Utilize the udp-out node to transmit environmental data collected from IoT devices, such as air quality sensors or weather stations, to a central server for analysis and decision-making.
- **Asset tracking:** Utilize the udp-out node to send location data from IoT devices equipped with GPS or RFID technology to a tracking system for real-time monitoring of assets, vehicles, or livestock.
- **Media stream transmission:** Employ the udp-out node to transmit media streams, such as video or audio content, for applications like live broadcasting, surveillance, or multimedia communication.

## Example

1. In the example below, we have a udp-out node configured to send data over localhost on port 90 and receive it with a udp-in node.

{% renderFlow %}
[{"id":"8b65196d8e0682a7","type":"group","z":"5b972161c4e0464e","style":{"stroke":"#999999","stroke-opacity":"1","fill":"none","fill-opacity":"1","label":true,"label-position":"nw","color":"#a4a4a4"},"nodes":["c69190416293c2c5","1448bee95281f5bb","4d31d05731f0fa6c","cd0155779b527eb2","9b0fd28ce351cbee","53660b468f150faa"],"x":374,"y":59,"w":472,"h":262},{"id":"c69190416293c2c5","type":"inject","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":490,"y":160,"wires":[["1448bee95281f5bb"]]},{"id":"1448bee95281f5bb","type":"udp out","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"","addr":"127.0.0.1","iface":"","port":"90","ipv":"udp4","outport":"","base64":false,"multicast":"false","x":730,"y":160,"wires":[]},{"id":"4d31d05731f0fa6c","type":"udp in","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"","iface":"","port":"90","ipv":"udp4","multicast":"false","group":"","datatype":"buffer","x":470,"y":280,"wires":[["cd0155779b527eb2"]]},{"id":"cd0155779b527eb2","type":"debug","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":720,"y":280,"wires":[]},{"id":"9b0fd28ce351cbee","type":"comment","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"Sending data to client","info":"","x":600,"y":100,"wires":[]},{"id":"53660b468f150faa","type":"comment","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"Receving data from server ","info":"","x":610,"y":220,"wires":[]}]
{% endrenderFlow %}
