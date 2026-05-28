---
title: "Node-RED - UDP In Node"
---
# UDP In

## What is udp-in node in Node-RED?

The UDP-In node in Node-RED enables the reception of UDP messages from remote devices or services. It acts as a listener, waiting for incoming UDP packets on a specified port. This functionality is crucial for real-time applications, such as IoT data ingestion and network communication. Whether you're receiving sensor data from IoT devices or communicating with other networked systems, the UDP-In node seamlessly integrates UDP communication into your Node-RED workflows, providing a lightweight and efficient solution for data reception.

### What is UDP?

UDP (User Datagram Protocol) is a connectionless protocol in the Internet Protocol suite. It transmits data packets, or datagrams, without establishing a connection, prioritizing speed over reliability. Commonly used for real-time applications like video streaming, online gaming, and VoIP. UDP's simplicity reduces latency but doesn't guarantee delivery of data packets. For more information refer to [UDP MDN Docs](https://developer.mozilla.org/en-US/docs/Glossary/UDP).

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

**Note: The default UDP nodes have been removed from the Node-RED palette in the FlowFuse Cloud due to limitations in routing connections to the container running Node-RED inside the FlowFuse platform**

## Usecases

- **Sensor data acquisition:** Receive real-time data from IoT sensors deployed in the field, such as temperature, humidity, or motion sensor readings.
- **Device status monitoring:** Monitor the operational status of IoT devices, such as connected appliances or industrial machinery, by receiving status updates over UDP.
- **Environmental monitoring:** Collect environmental data from IoT devices installed in remote locations, such as air quality sensors or weather stations, for analysis and decision-making.
- **Asset tracking:** Receive location data from IoT devices equipped with GPS or RFID technology to track the movement of assets, vehicles, or livestock in real-time.
- **Media stream reception:** Receive media streams, such as video or audio content, for applications like CCTV surveillance, live broadcasting, or multimedia communication.

## Example

1. In the example below, we have a UDP-In node configured to receive data sent over localhost and port 90, using a UDP-Out node.



::render-flow
---
height: 200
flow: "W3siaWQiOiI4YjY1MTk2ZDhlMDY4MmE3IiwidHlwZSI6Imdyb3VwIiwieiI6IjViOTcyMTYxYzRlMDQ2NGUiLCJzdHlsZSI6eyJzdHJva2UiOiIjOTk5OTk5Iiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6Im5vbmUiLCJmaWxsLW9wYWNpdHkiOiIxIiwibGFiZWwiOnRydWUsImxhYmVsLXBvc2l0aW9uIjoibnciLCJjb2xvciI6IiNhNGE0YTQifSwibm9kZXMiOlsiYzY5MTkwNDE2MjkzYzJjNSIsIjE0NDhiZWU5NTI4MWY1YmIiLCI0ZDMxZDA1NzMxZjBmYTZjIiwiY2QwMTU1Nzc5YjUyN2ViMiIsIjliMGZkMjhjZTM1MWNiZWUiLCI1MzY2MGI0NjhmMTUwZmFhIl0sIngiOjM3NCwieSI6NTksInciOjQ3MiwiaCI6MjYyfSx7ImlkIjoiYzY5MTkwNDE2MjkzYzJjNSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IjEiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4Ijo0OTAsInkiOjE2MCwid2lyZXMiOltbIjE0NDhiZWU5NTI4MWY1YmIiXV19LHsiaWQiOiIxNDQ4YmVlOTUyODFmNWJiIiwidHlwZSI6InVkcCBvdXQiLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IiIsImFkZHIiOiIxMjcuMC4wLjEiLCJpZmFjZSI6IiIsInBvcnQiOiI5MCIsImlwdiI6InVkcDQiLCJvdXRwb3J0IjoiIiwiYmFzZTY0IjpmYWxzZSwibXVsdGljYXN0IjoiZmFsc2UiLCJ4Ijo3MzAsInkiOjE2MCwid2lyZXMiOltdfSx7ImlkIjoiNGQzMWQwNTczMWYwZmE2YyIsInR5cGUiOiJ1ZHAgaW4iLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IiIsImlmYWNlIjoiIiwicG9ydCI6IjkwIiwiaXB2IjoidWRwNCIsIm11bHRpY2FzdCI6ImZhbHNlIiwiZ3JvdXAiOiIiLCJkYXRhdHlwZSI6ImJ1ZmZlciIsIngiOjQ3MCwieSI6MjgwLCJ3aXJlcyI6W1siY2QwMTU1Nzc5YjUyN2ViMiJdXX0seyJpZCI6ImNkMDE1NTc3OWI1MjdlYjIiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjcyMCwieSI6MjgwLCJ3aXJlcyI6W119LHsiaWQiOiI5YjBmZDI4Y2UzNTFjYmVlIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IlNlbmRpbmcgZGF0YSB0byBjbGllbnQiLCJpbmZvIjoiIiwieCI6NjAwLCJ5IjoxMDAsIndpcmVzIjpbXX0seyJpZCI6IjUzNjYwYjQ2OGYxNTBmYWEiLCJ0eXBlIjoiY29tbWVudCIsInoiOiI1Yjk3MjE2MWM0ZTA0NjRlIiwiZyI6IjhiNjUxOTZkOGUwNjgyYTciLCJuYW1lIjoiUmVjZXZpbmcgZGF0YSBmcm9tIHNlcnZlciAiLCJpbmZvIjoiIiwieCI6NjEwLCJ5IjoyMjAsIndpcmVzIjpbXX1d"
---
::



## Output

- **msg.payload:** Output received messages as a Buffer, string, or base64 encoded string.
- **msg.fromip:** The IP address and port from which the message was received, formatted as "IP:Port".
- **msg.ip and msg.port:** The IP address and port from which the message was received.



## Node Documentation
