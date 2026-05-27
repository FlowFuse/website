---
title: Bridging OPC UA Data to MQTT with Node-RED
navTitle: Bridging OPC UA Data to MQTT with Node-RED
---

Have you ever found yourself trying to connect old industrial systems with new IoT tools? This is a common scenario when trying to digitally transform while setting up your Unified Name Space. Maybe you have machinery that uses OPC UA, but your data is sent through MQTT. How do you make these systems work together smoothly?  

<!--more-->

In this guide, we'll demonstrate how to use Node-RED to bridge OPC UA data to MQTT. This integration will streamline your data flow and enhance real-time monitoring, helping you modernize your setup and improve communication between systems.

### Why Bridge OPC UA to MQTT

![Diagram showing the data flow when bridging OPC UA to MQTT to enable communication between non-OPC UA compatible systems and devices](/blog/2024/08/images/opc-ua-to-mqtt.png){data-zoomable}
_Diagram showing the data flow when bridging OPC UA to MQTT to enable communication between non-OPC UA compatible systems and devices._

In modern industrial environments, integrating systems with different communication protocols can be a significant challenge. For example, a CNC machine on the factory floor might use OPC UA, while some cloud solutions, edge devices, and other systems, such as custom ERP solutions and IoT applications, might rely on MQTT protocol. This is where bridging OPC UA to MQTT becomes highly beneficial.

By converting OPC UA data into MQTT messages, you make the data from the CNC machine accessible to a broader range of systems that use MQTT, which is a more universally supported messaging protocol. This bridging solution simplifies the integration process, allowing diverse systems to communicate effectively without needing direct OPC UA support.

**Node-RED** is perfect for this job. It can connect both OPC UA and MQTT, making it easy to transform and route data between different systems. Its flexibility and support for many protocols make it great for integrating various industrial hardware and software. For more on how Node-RED can improve industrial operations, check out [Building on FlowFuse: Remote Device Monitoring](/blog/2024/07/building-on-flowfuse-devices/).

## Bridging OPC UA Data to MQTT with Node-RED

In this section, I'll demonstrate how to bridge OPC UA data to MQTT using Node-RED. We will use simulated OPC UA server data from a CNC machine as an example. The goal is to show how you can efficiently transfer this data to an MQTT broker, making it accessible to various applications and systems.

### Prerequisite

- OPC UA Server: Make sure you have an OPC UA server configured and running with the necessary data. For this blog, we'll use the Prosys OPC UA Simulation Server, which simulates data from CNC machines designed for testing OPC UA client applications and learning the technology. You can download it from [here](https://prosysopc.com/products/opc-ua-simulation-server/).

- FlowFuse Account: A FlowFuse account lets you quickly create, deploy, and manage Node-RED instances in the cloud. [sign up now](https://app.flowfuse.com/account/create?utm_campaign=60718323-BCTA&utm_source=blog&utm_medium=cta&utm_term=high_intent&utm_content=Bridging%20OPC%20UA%20Data%20to%20MQTT%20with%20Node-RED).

- [node-red-contrib-opcua](https://flows.nodered.org/node/node-red-contrib-opcua): install the node-red contrib package that will enable integration of opcua in Node-RED.

- MQTT Broker: We’ll need an MQTT broker for data communication. FlowFuse offers an integrated MQTT Broker Service within Platform for easy setup. For more details, check out [FlowFuse's MQTT Broker Announcement](/blog/2024/10/announcement-mqtt-broker/).

### Retrieving Data from the OPC UA Server

To begin retrieving data from your OPC UA server using Node-RED, follow these steps:

1. Drag the **inject** node onto the canvas.
2. Drag the **change** node onto the canvas and double-click on the node to open its configuration settings. Set the `msg.topic` to the node ID and datatype of the property you wish to read.

![(Left) Image of the Change node setting the 'msg.topic' to retrieve the cycle time data and (Right) the OPC UA Prosys interface.](/blog/2024/08/images/change-node-setting-nodeid-datatype.png){data-zoomable}
_(Left) Image of the Change node setting the 'msg.topic' to retrieve the cycle time data and (Right) the OPC UA Prosys interface._

2. Drag the **OpcUa-Client** node onto the canvas. Double-click on it to open its configuration settings. Click the "+" icon next to the Endpoint field and enter the URL of your running OPC UA server. Configure the security policy and mode according to your server setup. If you use the Prosys OPC UA Simulation Server and have not enabled any security features, you can leave the security policy and mode as "None."

![Configuring opc-ua client node with the opc ua server endpoint](/blog/2024/08/images/opc-ua-config.png){data-zoomable}
_Configuring opc-ua node with the opc ua server endpoint_

3. In the **OpcUa-Client** node settings, select the action type as "READ." This instructs Node-RED to read data from the OPC UA server.

![Configuring OpcUa-Client node to select the read operation](/blog/2024/08/images/opc-ua-config2.png){data-zoomable}
_Configuring OpcUa-Client node to select the read operation_

4. If your OPC UA server uses security features, specify the path to your certificate files in the relevant fields. If no security is configured, this step can be skipped.
5. Drag the **debug** node onto the canvas. The output will help you verify the data retrieved from the OPC UA server.
6. Connect the output of the **inject** node to the input of the **change** node and the output of the **change** node to the input of the **OpcUa-Client** node. Then, connect the output of the **OpcUa-Client** node to the input of the **debug** node. This setup ensures that when the **inject** node triggers, it sends data to the **OpcUa-Client** node, and the results are displayed in the Debug node.
7. Deploy the flow by clicking the "Deploy" button in the top right corner. To test the setup, press the Inject button.

You can follow the same steps to retrieve other property values from the OPC UA server. In this example, we are retrieving four simulated data properties: the cycle time, temperature, and spindle speed of the simulated CNC machine. Your setup might differ depending on the properties and data available on your OPC UA server.

### Transforming and Aggregating Data

Once you have successfully retrieved data from your OPC UA server, the next step is to transform and aggregate this data to make it suitable for publishing to an MQTT broker. This demonstration, we will aggregate the retrieved individual property values into a single object. Depending on your specific needs, you might choose to split the object properties and send them separately or perform various calculations and transformations on the data.

1. Drag the **change** node onto the canvas.
2. Double-click on the node and set `msg.topic` to the name of the property you want to set for the retrieved data. In this context, set `msg.topic` to `'cycle-time'`, which will be the key in the object that we will create.

![Setting the msg.topic with the Change node to retrieve data from the OPC UA server.](/blog/2024/08/images/change-node-setting-nodeid-datatype.png){data-zoomable}
_Setting the msg.topic with the change node to retrieve data from the OPC UA server._

3. Drag the **join** node onto the canvas. Set the mode to manual, with the option to create `msg.payload` using the values of `msg.topic` as keys. Set the count to 3 and ensure that the interval for all of the **inject** nodes triggering data retrieval is the same. This ensures that the data is collected and aggregated correctly at the same time.
4. Connect the output of the **OpcUa-Client** node (which retrieves the data) to the input of the **change** node. For example, if I have set the **change** node for the 'cycle-time' data property, connect it to the **OpcUa-Client** node that retrieves this data.
5. Connect the output of the **change** node to the input of the **join** node.
6. Repeat this process for all of your data properties.

### Sending Data to the MQTT Broker

Now, in this section, we will show you how to send the collected data to an MQTT broker:

1. Drag the **mqtt out** node onto the canvas.
2. Double-click on it and configure it with your MQTT broker details.

![Configuring the mqtt out node with broker information](/blog/2024/08/images/mqtt-out-node-config.png){data-zoomable}
_Configuring the mqtt out node with broker information_

3. Set the topic for your data in the **mqtt out** node.
4. Connect the output of the **join** node to the input of the **mqtt out** node.
5. Deploy the flow. After deploying, you will see the status "connected" with a green dot at the bottom of each node, indicating that you have successfully connected to your MQTT broker.

![Image showing the successful bridging of OPC UA data to MQTT](/blog/2024/08/images/opcua-to-mqtt.gif){data-zoomable}
_Image showing the successful bridging of OPC UA data to MQTT_



::render-flow
---
height: 200
flow: "W3siaWQiOiJhMDk5YWVmYjA4ODM3ZTcwIiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwiZW5kcG9pbnQiOiI5ZGQ1NmVkYTA0ZjVjNWI1IiwiYWN0aW9uIjoicmVhZCIsImRlYWRiYW5kdHlwZSI6ImEiLCJkZWFkYmFuZHZhbHVlIjoxLCJ0aW1lIjoxMCwidGltZVVuaXQiOiJzIiwiY2VydGlmaWNhdGUiOiJuIiwibG9jYWxmaWxlIjoiIiwibG9jYWxrZXlmaWxlIjoiIiwic2VjdXJpdHltb2RlIjoiTm9uZSIsInNlY3VyaXR5cG9saWN5IjoiTm9uZSIsInVzZVRyYW5zcG9ydCI6ZmFsc2UsIm1heENodW5rQ291bnQiOjEsIm1heE1lc3NhZ2VTaXplIjo4MTkyLCJyZWNlaXZlQnVmZmVyU2l6ZSI6ODE5Miwic2VuZEJ1ZmZlclNpemUiOjgxOTIsIm5hbWUiOiIiLCJ4Ijo0ODAsInkiOjMyMCwid2lyZXMiOltbImY1ZmQxZmZhZmRmZTc5MGYiXSxbXV19LHsiaWQiOiIxYWEwMmIyN2I5OWRmZTlkIiwidHlwZSI6Im1xdHQgb3V0IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiIiwidG9waWMiOiIvbWFudWZhY3R1cmluZy9jbmMiLCJxb3MiOiIyIiwicmV0YWluIjoidHJ1ZSIsInJlc3BUb3BpYyI6IiIsImNvbnRlbnRUeXBlIjoiIiwidXNlclByb3BzIjoiIiwiY29ycmVsIjoiIiwiZXhwaXJ5IjoiIiwiYnJva2VyIjoiYWJkNGU2MjAyOTQ1ZmVlMyIsIngiOjEzOTAsInkiOjM4MCwid2lyZXMiOltdfSx7ImlkIjoiZDU2NWFlNjIwZDkwNDk4YSIsInR5cGUiOiJPcGNVYS1DbGllbnQiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsImVuZHBvaW50IjoiOWRkNTZlZGEwNGY1YzViNSIsImFjdGlvbiI6InJlYWQiLCJkZWFkYmFuZHR5cGUiOiJhIiwiZGVhZGJhbmR2YWx1ZSI6MSwidGltZSI6MTAsInRpbWVVbml0IjoicyIsImNlcnRpZmljYXRlIjoibiIsImxvY2FsZmlsZSI6IiIsImxvY2Fsa2V5ZmlsZSI6IiIsInNlY3VyaXR5bW9kZSI6Ik5vbmUiLCJzZWN1cml0eXBvbGljeSI6Ik5vbmUiLCJ1c2VUcmFuc3BvcnQiOmZhbHNlLCJtYXhDaHVua0NvdW50IjoxLCJtYXhNZXNzYWdlU2l6ZSI6ODE5MiwicmVjZWl2ZUJ1ZmZlclNpemUiOjgxOTIsInNlbmRCdWZmZXJTaXplIjo4MTkyLCJuYW1lIjoiIiwieCI6NDgwLCJ5Ijo0MDAsIndpcmVzIjpbWyJmYzRiODNhOGEwYmUzYTM1Il0sW11dfSx7ImlkIjoiMGUwNjE0YWRhMzI2OTYyNyIsInR5cGUiOiJPcGNVYS1DbGllbnQiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsImVuZHBvaW50IjoiOWRkNTZlZGEwNGY1YzViNSIsImFjdGlvbiI6InJlYWQiLCJkZWFkYmFuZHR5cGUiOiJhIiwiZGVhZGJhbmR2YWx1ZSI6MSwidGltZSI6MTAsInRpbWVVbml0IjoicyIsImNlcnRpZmljYXRlIjoibiIsImxvY2FsZmlsZSI6IiIsImxvY2Fsa2V5ZmlsZSI6IiIsInNlY3VyaXR5bW9kZSI6Ik5vbmUiLCJzZWN1cml0eXBvbGljeSI6Ik5vbmUiLCJ1c2VUcmFuc3BvcnQiOmZhbHNlLCJtYXhDaHVua0NvdW50IjoxLCJtYXhNZXNzYWdlU2l6ZSI6ODE5MiwicmVjZWl2ZUJ1ZmZlclNpemUiOjgxOTIsInNlbmRCdWZmZXJTaXplIjo4MTkyLCJuYW1lIjoiIiwieCI6NDgwLCJ5Ijo0ODAsIndpcmVzIjpbWyJlMWM0ZmU3MmU0ZjM3YjZhIl0sW11dfSx7ImlkIjoiZjVmZDFmZmFmZGZlNzkwZiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJTZXQgdGhlIHRvcGljIGZvciB0aGUgZGF0YSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6ImN5Y2xlLXRpbWUiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NzMwLCJ5IjozMDAsIndpcmVzIjpbWyI5MTNlOWRlMTMyNGE2ZjIxIl1dfSx7ImlkIjoiZmM0YjgzYThhMGJlM2EzNSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJTZXQgdGhlIHRvcGljIGZvciB0aGUgZGF0YSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6InNwaW5kbGUtc3BlZWQiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NzMwLCJ5IjozODAsIndpcmVzIjpbWyI5MTNlOWRlMTMyNGE2ZjIxIl1dfSx7ImlkIjoiZTFjNGZlNzJlNGYzN2I2YSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJTZXQgdGhlIHRvcGljIGZvciB0aGUgZGF0YSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6InRlbXBlcmF0dXJlIiwidG90Ijoic3RyIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjczMCwieSI6NDYwLCJ3aXJlcyI6W1siOTEzZTlkZTEzMjRhNmYyMSJdXX0seyJpZCI6IjkxM2U5ZGUxMzI0YTZmMjEiLCJ0eXBlIjoiam9pbiIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IkNyZWF0ZSBvYmplY3QgZnJvbSB0aG9zZSB0aHJlZSBkYXRhIHByb3BlcnR5ICIsIm1vZGUiOiJjdXN0b20iLCJidWlsZCI6Im9iamVjdCIsInByb3BlcnR5IjoicGF5bG9hZCIsInByb3BlcnR5VHlwZSI6Im1zZyIsImtleSI6InRvcGljIiwiam9pbmVyIjoiXFxuIiwiam9pbmVyVHlwZSI6InN0ciIsInVzZXBhcnRzIjpmYWxzZSwiYWNjdW11bGF0ZSI6ZmFsc2UsInRpbWVvdXQiOiIiLCJjb3VudCI6IjMiLCJyZWR1Y2VSaWdodCI6ZmFsc2UsInJlZHVjZUV4cCI6IiIsInJlZHVjZUluaXQiOiIiLCJyZWR1Y2VJbml0VHlwZSI6IiIsInJlZHVjZUZpeHVwIjoiIiwieCI6MTA4MCwieSI6MzgwLCJ3aXJlcyI6W1siMWFhMDJiMjdiOTlkZmU5ZCJdXX0seyJpZCI6IjMzMzk0ODNmNjQxMTZmY2UiLCJ0eXBlIjoibXF0dCBpbiIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IiIsInRvcGljIjoiL21hbnVmYWN0dXJpbmcvY25jIiwicW9zIjoiMiIsImRhdGF0eXBlIjoiYXV0by1kZXRlY3QiLCJicm9rZXIiOiJhYmQ0ZTYyMDI5NDVmZWUzIiwibmwiOmZhbHNlLCJyYXAiOnRydWUsInJoIjowLCJpbnB1dHMiOjAsIngiOjE3MCwieSI6NjYwLCJ3aXJlcyI6W1siZDg4MWQyNTEwNzFiZDMxNyJdXX0seyJpZCI6ImQ4ODFkMjUxMDcxYmQzMTciLCJ0eXBlIjoiZGVidWciLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJkZWJ1ZyAxIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjQ2MCwieSI6NjYwLCJ3aXJlcyI6W119LHsiaWQiOiI1NWY0MzQ2MGFmOTYwMWVjIiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiJSZXRyaWV2aW5nIHRoZSBkYXRhIGZyb20gbXF0dCIsImluZm8iOiIiLCJ4IjozMjAsInkiOjYwMCwid2lyZXMiOltdfSx7ImlkIjoiNjI4YWI1NDQ5NTkwMTAyMSIsInR5cGUiOiJjb21tZW50IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiQnJpZGdpbmcgT1BDIFVBIGRhdGEgdG8gTVFUVCIsImluZm8iOiIiLCJ4IjozNTAsInkiOjI0MCwid2lyZXMiOltdfSx7ImlkIjoiY2U2YjhhMGUyYzhhODk1ZCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiODA3NzU4ZWM1NzZmYmZkOCIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJucz0zO2k9MTAxMCxkYXRhdHlwZT1mbG9hdCIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoyOTAsInkiOjMyMCwid2lyZXMiOltbImEwOTlhZWZiMDg4MzdlNzAiXV19LHsiaWQiOiI1MGZlMmI5MzEwZDNiYjNmIiwidHlwZSI6ImNoYW5nZSIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6Im5zPTM7aT0xMDExLGRhdGF0eXBlPWJhc2VkYXRhdHlwZSIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoyOTAsInkiOjQwMCwid2lyZXMiOltbImQ1NjVhZTYyMGQ5MDQ5OGEiXV19LHsiaWQiOiI5Y2Y2OTFmNTU3NDhkMDEzIiwidHlwZSI6ImNoYW5nZSIsInoiOiI4MDc3NThlYzU3NmZiZmQ4IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6Im5zPTM7aT0xMDEyLGRhdGF0eXBlPWZsb2F0IiwidG90Ijoic3RyIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjI5MCwieSI6NDgwLCJ3aXJlcyI6W1siMGUwNjE0YWRhMzI2OTYyNyJdXX0seyJpZCI6ImRlNzRkYWJjNjE2YzMwOTQiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjgwNzc1OGVjNTc2ZmJmZDgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MTIwLCJ5Ijo0MDAsIndpcmVzIjpbWyJjZTZiOGEwZTJjOGE4OTVkIiwiNTBmZTJiOTMxMGQzYmIzZiIsIjljZjY5MWY1NTc0OGQwMTMiXV19LHsiaWQiOiI5ZGQ1NmVkYTA0ZjVjNWI1IiwidHlwZSI6Ik9wY1VhLUVuZHBvaW50IiwiZW5kcG9pbnQiOiJvcGMudGNwOi8vUm9uaTo1MzUzMC9PUENVQS9TaW11bGF0aW9uU2VydmVyIiwic2VjcG9sIjoiTm9uZSIsInNlY21vZGUiOiJOb25lIiwibm9uZSI6dHJ1ZSwibG9naW4iOmZhbHNlLCJ1c2VyY2VydCI6ZmFsc2UsInVzZXJjZXJ0aWZpY2F0ZSI6IiIsInVzZXJwcml2YXRla2V5IjoiIn0seyJpZCI6ImFiZDRlNjIwMjk0NWZlZTMiLCJ0eXBlIjoibXF0dC1icm9rZXIiLCJuYW1lIjoiIiwiYnJva2VyIjoiaHR0cDovL2Jyb2tlci5oaXZlbXEuY29tIiwicG9ydCI6IjE4ODMiLCJjbGllbnRpZCI6IiIsImF1dG9Db25uZWN0Ijp0cnVlLCJ1c2V0bHMiOmZhbHNlLCJwcm90b2NvbFZlcnNpb24iOiI0Iiwia2VlcGFsaXZlIjoiNjAiLCJjbGVhbnNlc3Npb24iOnRydWUsImF1dG9VbnN1YnNjcmliZSI6dHJ1ZSwiYmlydGhUb3BpYyI6IiIsImJpcnRoUW9zIjoiMCIsImJpcnRoUmV0YWluIjoiZmFsc2UiLCJiaXJ0aFBheWxvYWQiOiIiLCJiaXJ0aE1zZyI6e30sImNsb3NlVG9waWMiOiIiLCJjbG9zZVFvcyI6IjAiLCJjbG9zZVJldGFpbiI6ImZhbHNlIiwiY2xvc2VQYXlsb2FkIjoiIiwiY2xvc2VNc2ciOnt9LCJ3aWxsVG9waWMiOiIiLCJ3aWxsUW9zIjoiMCIsIndpbGxSZXRhaW4iOiJmYWxzZSIsIndpbGxQYXlsb2FkIjoiIiwid2lsbE1zZyI6e30sInVzZXJQcm9wcyI6IiIsInNlc3Npb25FeHBpcnkiOiIifV0="
---
::



## Bridging MQTT Data to OPC UA

In addition to bridging data from OPC UA to MQTT, you might also need to send data from MQTT back to an OPC UA server. This is often required in scenarios where external systems, such as Manufacturing Execution Systems (MES), need to update or control machinery settings.

For example, an MES can send commands or configuration changes via MQTT, which then need to be applied to an OPC UA-controlled machine.

1. Drag an **mqtt in** node onto the Node-RED canvas and configure it with your MQTT broker details and the appropriate topic where the MES publishes commands.
2. Drag the **change** node onto the canvas, Set the `msg.topic` to the node ID and datatype of the property you wish to update.
3. Add an **OpcUa-Client** node to the canvas and configure it with your OPC UA server. Set the action type to "WRITE" to send the received data.
4. Connect the output of the **mqtt in** node to the input of the **change** node, and the output of the **change** node to the input of the **OpcUa-Client** node.

![Image showing the successful bridging of MQTT data to OPC UA](/blog/2024/08/images/mqtt-to-opcua.gif){data-zoomable}
_Image showing the successful bridging of OPC UA data to MQTT_



::render-flow
---
height: 200
flow: "W3siaWQiOiJhMDk5YWVmYjA4ODM3ZTcwIiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwiZW5kcG9pbnQiOiI5ZGQ1NmVkYTA0ZjVjNWI1IiwiYWN0aW9uIjoid3JpdGUiLCJkZWFkYmFuZHR5cGUiOiJhIiwiZGVhZGJhbmR2YWx1ZSI6MSwidGltZSI6MTAsInRpbWVVbml0IjoicyIsImNlcnRpZmljYXRlIjoibiIsImxvY2FsZmlsZSI6IiIsImxvY2Fsa2V5ZmlsZSI6IiIsInNlY3VyaXR5bW9kZSI6Ik5vbmUiLCJzZWN1cml0eXBvbGljeSI6Ik5vbmUiLCJ1c2VUcmFuc3BvcnQiOmZhbHNlLCJtYXhDaHVua0NvdW50IjoxLCJtYXhNZXNzYWdlU2l6ZSI6ODE5MiwicmVjZWl2ZUJ1ZmZlclNpemUiOjgxOTIsInNlbmRCdWZmZXJTaXplIjo4MTkyLCJuYW1lIjoiIiwieCI6NzYwLCJ5IjoyMjAsIndpcmVzIjpbW10sW11dfSx7ImlkIjoiNjI4YWI1NDQ5NTkwMTAyMSIsInR5cGUiOiJjb21tZW50IiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiQnJpZGdpbmcgTVFUVCB0byBPUEMgVUEiLCJpbmZvIjoiIiwieCI6NTEwLCJ5IjoxNDAsIndpcmVzIjpbXX0seyJpZCI6ImNlNmI4YTBlMmM4YTg5NWQiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoidG9waWMiLCJwdCI6Im1zZyIsInRvIjoibnM9MztpPTEwMTAsZGF0YXR5cGU9Qm9vbGVhbiIsInRvdCI6InN0ciJ9LHsidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6InBheWxhZCIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1NDAsInkiOjIyMCwid2lyZXMiOltbImEwOTlhZWZiMDg4MzdlNzAiXV19LHsiaWQiOiIwYTg5ZWJkMGQ5ZjZmNTc3IiwidHlwZSI6Im1xdHQgaW4iLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsIm5hbWUiOiIiLCJ0b3BpYyI6ImNvbW1hbmQvY25jLyIsInFvcyI6IjIiLCJkYXRhdHlwZSI6ImF1dG8tZGV0ZWN0IiwiYnJva2VyIjoiYWJkNGU2MjAyOTQ1ZmVlMyIsIm5sIjpmYWxzZSwicmFwIjp0cnVlLCJyaCI6MCwiaW5wdXRzIjowLCJ4IjozMDAsInkiOjIyMCwid2lyZXMiOltbImNlNmI4YTBlMmM4YTg5NWQiXV19LHsiaWQiOiI0Y2Y0ZTQyNWQwNzU3MjJhIiwidHlwZSI6Im1xdHQgb3V0IiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiIiwidG9waWMiOiJjb21tYW5kL2NuYy8iLCJxb3MiOiIxIiwicmV0YWluIjoiIiwicmVzcFRvcGljIjoiIiwiY29udGVudFR5cGUiOiIiLCJ1c2VyUHJvcHMiOiIiLCJjb3JyZWwiOiIiLCJleHBpcnkiOiIiLCJicm9rZXIiOiJhYmQ0ZTYyMDI5NDVmZWUzIiwieCI6NjYwLCJ5Ijo0MDAsIndpcmVzIjpbXX0seyJpZCI6IjhlMzM5ZTUxMWM1NzM5MDUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJmYWxzZSIsInBheWxvYWRUeXBlIjoiYm9vbCIsIngiOjMzMCwieSI6NDAwLCJ3aXJlcyI6W1siNGNmNGU0MjVkMDc1NzIyYSJdXX0seyJpZCI6IjljMzNjZmY1NGIwYWNhMTUiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwibmFtZSI6IlNlbmRpbmcgQ29tbWFuZCIsImluZm8iOiIiLCJ4Ijo0OTAsInkiOjM0MCwid2lyZXMiOltdfSx7ImlkIjoiOWRkNTZlZGEwNGY1YzViNSIsInR5cGUiOiJPcGNVYS1FbmRwb2ludCIsImVuZHBvaW50Ijoib3BjLnRjcDovL1Jvbmk6NTM1MzAvT1BDVUEvU2ltdWxhdGlvblNlcnZlciIsInNlY3BvbCI6Ik5vbmUiLCJzZWNtb2RlIjoiTm9uZSIsIm5vbmUiOnRydWUsImxvZ2luIjpmYWxzZSwidXNlcmNlcnQiOmZhbHNlLCJ1c2VyY2VydGlmaWNhdGUiOiIiLCJ1c2VycHJpdmF0ZWtleSI6IiJ9LHsiaWQiOiJhYmQ0ZTYyMDI5NDVmZWUzIiwidHlwZSI6Im1xdHQtYnJva2VyIiwibmFtZSI6IiIsImJyb2tlciI6Imh0dHA6Ly9icm9rZXIuaGl2ZW1xLmNvbSIsInBvcnQiOiIxODgzIiwiY2xpZW50aWQiOiIiLCJhdXRvQ29ubmVjdCI6dHJ1ZSwidXNldGxzIjpmYWxzZSwicHJvdG9jb2xWZXJzaW9uIjoiNCIsImtlZXBhbGl2ZSI6IjYwIiwiY2xlYW5zZXNzaW9uIjp0cnVlLCJhdXRvVW5zdWJzY3JpYmUiOnRydWUsImJpcnRoVG9waWMiOiIiLCJiaXJ0aFFvcyI6IjAiLCJiaXJ0aFJldGFpbiI6ImZhbHNlIiwiYmlydGhQYXlsb2FkIjoiIiwiYmlydGhNc2ciOnt9LCJjbG9zZVRvcGljIjoiIiwiY2xvc2VRb3MiOiIwIiwiY2xvc2VSZXRhaW4iOiJmYWxzZSIsImNsb3NlUGF5bG9hZCI6IiIsImNsb3NlTXNnIjp7fSwid2lsbFRvcGljIjoiIiwid2lsbFFvcyI6IjAiLCJ3aWxsUmV0YWluIjoiZmFsc2UiLCJ3aWxsUGF5bG9hZCI6IiIsIndpbGxNc2ciOnt9LCJ1c2VyUHJvcHMiOiIiLCJzZXNzaW9uRXhwaXJ5IjoiIn1d"
---
::



### Up Next

- [Using MQTT with Node-RED](/node-red/protocol/mqtt/)
  Learn how to integrate MQTT with Node-RED to enhance your IoT solutions with real-time data messaging.

- [How to Build an OPC UA Client Dashboard in Node-RED](/blog/2023/07/how-to-build-a-opc-client-dashboard-in-node-red/)
  Follow a step-by-step guide to create a comprehensive OPC UA client dashboard in Node-RED for effective monitoring and control.

- [Building a Secure OPC UA Server in Node-RED](/node-red/protocol/opc-ua/)
  Explore best practices for configuring a secure OPC UA server in Node-RED to ensure safe and reliable data exchange.

- [How to Deploy a Basic OPC UA Server in Node-RED](/blog/2023/07/how-to-deploy-a-basic-opc-ua-server-in-node-red/)
  Learn how to quickly deploy a basic OPC UA server in Node-RED for testing and development purposes.

- [Node-RED as a No-Code EtherNet/IP to S7 Protocol Converter](/blog/2023/06/node-red-as-a-no-code-ethernet_ip-to-s7-protocol-converter/)
  Discover how to use Node-RED to seamlessly convert EtherNet/IP to S7 protocols with Node-RED.
