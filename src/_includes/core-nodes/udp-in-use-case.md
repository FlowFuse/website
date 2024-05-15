## What is udp-in node in Node-RED?

The UDP-In node in Node-RED enables the reception of UDP messages from remote devices or services. It acts as a listener, waiting for incoming UDP packets on a specified port. This functionality is crucial for real-time applications, such as IoT data ingestion and network communication. Whether you're receiving sensor data from IoT devices or communicating with other networked systems, the UDP-In node seamlessly integrates UDP communication into your Node-RED workflows, providing a lightweight and efficient solution for data reception.

### What is Udp?

UDP (User Datagram Protocol) is a connectionless protocol in the Internet Protocol suite. It transmits data packets, or datagrams, without establishing a connection, prioritizing speed over reliability. Commonly used for real-time applications like video streaming, online gaming, and VoIP. UDP's simplicity reduces latency but doesn't guarantee delivery of data packets. For more information refer to [UDP MDN Docs](https://developer.mozilla.org/en-US/docs/Glossary/UDP)

## Configuring UDP-In Node 

The UDP-In node in Node-RED provides versatile configuration options to tailor UDP message reception according to specific requirements:

- **Listen for:**
    - **UDP messages:** Receive standard UDP messages from remote devices or services.
    - **Multicast messages:** Listen for multicast messages, allowing communication with multiple recipients simultaneously.
        - **Group:** Specify the multicast group address.
        - **Local IF:** Choose the network interface to use for receiving multicast messages.

- **On port:** Define the port number on which the UDP-In node will listen for incoming messages.

- **Using:**
    - **IPv4:** Utilize IPv4 addressing for communication.
    - **IPv6:** Utilize IPv6 addressing for communication, supporting the latest IP version.

- **Output:** Choose the format for the received data:
    - **As a buffer:** Receive messages as buffer objects.
    - **As a string:** Receive messages as strings.
    - **As a base64 encoded string:** Receive messages encoded in base64 format.

*Note: On some systems, you may need root or administrator access to use ports below 1024 and/or broadcast, and have to ensure your firewall allows the data in.*

**Note: The default TCP and UDP nodes have been removed from the Node-RED palette in the FlowFuse Cloud due to limitations in routing connections to the container running Node-RED inside the FlowFuse platform**

## Usecases

- **Sensor data acquisition:** Receive real-time data from IoT sensors deployed in the field, such as temperature, humidity, or motion sensor readings.
- **Device status monitoring:** Monitor the operational status of IoT devices, such as connected appliances or industrial machinery, by receiving status updates over UDP.
- **Environmental monitoring:** Collect environmental data from IoT devices installed in remote locations, such as air quality sensors or weather stations, for analysis and decision-making.
- **Asset tracking:** Receive location data from IoT devices equipped with GPS or RFID technology to track the movement of assets, vehicles, or livestock in real-time.
- **Media stream reception:** Receive media streams, such as video or audio content, for applications like CCTV surveillance, live broadcasting, or multimedia communication.

## Example

1. In the example below, we have a UDP-In node configured to receive data sent over localhost and port 90, using a UDP-Out node.

[{"id":"8b65196d8e0682a7","type":"group","z":"5b972161c4e0464e","style":{"stroke":"#999999","stroke-opacity":"1","fill":"none","fill-opacity":"1","label":true,"label-position":"nw","color":"#a4a4a4"},"nodes":["c69190416293c2c5","1448bee95281f5bb","4d31d05731f0fa6c","cd0155779b527eb2","9b0fd28ce351cbee","53660b468f150faa"],"x":374,"y":59,"w":472,"h":262},{"id":"c69190416293c2c5","type":"inject","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":490,"y":160,"wires":[["1448bee95281f5bb"]]},{"id":"1448bee95281f5bb","type":"udp out","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"","addr":"127.0.0.1","iface":"","port":"90","ipv":"udp4","outport":"","base64":false,"multicast":"false","x":730,"y":160,"wires":[]},{"id":"4d31d05731f0fa6c","type":"udp in","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"","iface":"","port":"90","ipv":"udp4","multicast":"false","group":"","datatype":"buffer","x":470,"y":280,"wires":[["cd0155779b527eb2"]]},{"id":"cd0155779b527eb2","type":"debug","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":720,"y":280,"wires":[]},{"id":"9b0fd28ce351cbee","type":"comment","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"Sending data to client","info":"","x":600,"y":100,"wires":[]},{"id":"53660b468f150faa","type":"comment","z":"5b972161c4e0464e","g":"8b65196d8e0682a7","name":"Receving data from server ","info":"","x":610,"y":220,"wires":[]}]

## Output

- **msg.payload:** Output received messages as a Buffer, string, or base64 encoded string.
- **msg.fromip:** The IP address and port from which the message was received, formatted as "IP:Port".
- **msg.ip and msg.port:** The IP address and port from which the message was received.

