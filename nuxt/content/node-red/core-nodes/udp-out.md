---
title: "Node-RED - UDP Out Node"
---
# UDP Out

## What is udp-out node in Node-RED?

The udp-out node in Node-RED is a node used for sending UDP messages to a specified network destination. When you add a udp-out node to your Node-RED flow, you configure it with the IP address and port of the destination device or service. Then, any messages received by the udp-out node are sent as UDP packets to that destination. This node is particularly useful for applications where real-time communication or lightweight message transmission is required.

For more information on UDP refer to [What is UDP](/node-red/core-nodes/udp-in/#what-is-udp%3F)

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



::render-flow
---
height: 200
flow: "W3siaWQiOiI4YjY1MTk2ZDhlMDY4MmE3IiwidHlwZSI6Imdyb3VwIiwieiI6IjViOTcyMTYxYzRlMDQ2NGUiLCJzdHlsZSI6eyJzdHJva2UiOiIjOTk5OTk5Iiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6Im5vbmUiLCJmaWxsLW9wYWNpdHkiOiIxIiwibGFiZWwiOnRydWUsImxhYmVsLXBvc2l0aW9uIjoibnciLCJjb2xvciI6IiNhNGE0YTQifSwibm9kZXMiOlsiYzY5MTkwNDE2MjkzYzJjNSIsIjE0NDhiZWU5NTI4MWY1YmIiLCI0ZDMxZDA1NzMxZjBmYTZjIiwiY2QwMTU1Nzc5YjUyN2ViMiIsIjliMGZkMjhjZTM1MWNiZWUiLCI1MzY2MGI0NjhmMTUwZmFhIl0sIngiOjM3NCwieSI6NTksInciOjQ3MiwiaCI6MjYyfSx7ImlkIjoiYzY5MTkwNDE2MjkzYzJjNSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IjEiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4Ijo0OTAsInkiOjE2MCwid2lyZXMiOltbIjE0NDhiZWU5NTI4MWY1YmIiXV19LHsiaWQiOiIxNDQ4YmVlOTUyODFmNWJiIiwidHlwZSI6InVkcCBvdXQiLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IiIsImFkZHIiOiIxMjcuMC4wLjEiLCJpZmFjZSI6IiIsInBvcnQiOiI5MCIsImlwdiI6InVkcDQiLCJvdXRwb3J0IjoiIiwiYmFzZTY0IjpmYWxzZSwibXVsdGljYXN0IjoiZmFsc2UiLCJ4Ijo3MzAsInkiOjE2MCwid2lyZXMiOltdfSx7ImlkIjoiNGQzMWQwNTczMWYwZmE2YyIsInR5cGUiOiJ1ZHAgaW4iLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IiIsImlmYWNlIjoiIiwicG9ydCI6IjkwIiwiaXB2IjoidWRwNCIsIm11bHRpY2FzdCI6ImZhbHNlIiwiZ3JvdXAiOiIiLCJkYXRhdHlwZSI6ImJ1ZmZlciIsIngiOjQ3MCwieSI6MjgwLCJ3aXJlcyI6W1siY2QwMTU1Nzc5YjUyN2ViMiJdXX0seyJpZCI6ImNkMDE1NTc3OWI1MjdlYjIiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjcyMCwieSI6MjgwLCJ3aXJlcyI6W119LHsiaWQiOiI5YjBmZDI4Y2UzNTFjYmVlIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiNWI5NzIxNjFjNGUwNDY0ZSIsImciOiI4YjY1MTk2ZDhlMDY4MmE3IiwibmFtZSI6IlNlbmRpbmcgZGF0YSB0byBjbGllbnQiLCJpbmZvIjoiIiwieCI6NjAwLCJ5IjoxMDAsIndpcmVzIjpbXX0seyJpZCI6IjUzNjYwYjQ2OGYxNTBmYWEiLCJ0eXBlIjoiY29tbWVudCIsInoiOiI1Yjk3MjE2MWM0ZTA0NjRlIiwiZyI6IjhiNjUxOTZkOGUwNjgyYTciLCJuYW1lIjoiUmVjZXZpbmcgZGF0YSBmcm9tIHNlcnZlciAiLCJpbmZvIjoiIiwieCI6NjEwLCJ5IjoyMjAsIndpcmVzIjpbXX1d"
---
::




## Node Documentation
