---
title: 'OPC UA Tutorial: Connect and Exchange Data with Industrial Equipment'
navTitle: 'OPC UA Tutorial: Connect and Exchange Data with Industrial Equipment'
---

If you’ve ever tried to connect industrial equipment from different vendors, you know how frustrating it can be, a mess of incompatible protocols, proprietary software, and confusing drivers. Your Siemens PLC speaks one language, your Allen-Bradley controller another, and that Modbus sensor? Yet another protocol entirely.

<!--more-->

**OPC UA changes that.**

OPC UA (Open Platform Communications Unified Architecture) is the industry-standard protocol that eliminates this chaos. Also known as OPC Unified Architecture or IEC 62541, it provides a universal language for secure communication between PLCs, SCADA systems, HMIs, and enterprise applications ,regardless of the manufacturer.

This hands-on guide walks you through building your first **OPC UA integration** using **Node-RED** and **FlowFuse**:

* **Connect** to any OPC UA server—Kepware, MatrikonOPC, or built-in PLC servers
* **Browse** available tags and discover Node IDs from your equipment
* **Read** real-time values from PLCs, sensors, and industrial devices
* **Write** control signals and setpoints back to your systems

## Why OPC UA?

If you have worked with industrial equipment, you know the pain. Every PLC vendor uses a different protocol. Your Siemens S7-1500 requires TIA Portal and PROFINET drivers. The Allen-Bradley ControlLogix needs RSLinx and EtherNet/IP. A Modbus temperature sensor needs yet another tool. Before long, you are juggling a dozen different software packages—each with its own licensing, training, and maintenance overhead.

### Breaking the Cycle

OPC UA eliminates this fragmentation. Instead of relying on vendor-specific protocols, it provides a universal language for all your equipment. Here is why it is becoming the industry standard:

### Universal Connectivity

Connect to any modern PLC using a single protocol. Leading manufacturers like Siemens, Rockwell, Schneider, and ABB now embed OPC UA servers directly into their controllers. One client, all your equipment.

### Information, Not Just Data

Reading a temperature value from OPC UA does not just give you "42.5"—it gives the full context: 42.5 °C, measured at 14:32:15.625 with "Good" quality, from "Tank\_01/Temperature", and includes alarm limits (10 °C / 80 °C). This context reduces guesswork and helps prevent costly mistakes.

### Security Built for Industry

While protocols like Modbus transmit everything in plain text, OPC UA uses enterprise-grade security. It supports X.509 certificates, 256-bit encryption, and robust user authentication to safeguard critical infrastructure from cyber threats.

### Future-Proof Investment

OPC UA is the foundation of Industry 4.0 initiatives around the world. It is not just another protocol—it is the one major vendors are standardizing on. Choosing OPC UA today ensures long-term compatibility and ROI.

## Getting Started

Now that you understand why OPC UA is widely adopted, let’s explore how to implement it using FlowFuse Node-RED.

This next section walks you through exactly what you need to get started with a working setup, whether for prototyping or production.

### What You’ll Need

Before diving into the flow-building process, make sure you have the following:

- An OPC UA server (like Kepware, MatrikonOPC, or built into your PLC)
- A FlowFuse Node-RED instance running on your edge device.

For production OPC UA deployments, we recommend using FlowFuse. When connecting to industrial systems, you need more than just Node-RED—you need team collaboration so multiple engineers can work on flows safely, audit logs for compliance tracking, high availability to prevent downtime, and remote device management for edge deployments. 

FlowFuse provides these enterprise features plus automatic backups, one-click rollbacks, environment variables for different sites, and DevOps pipelines for testing changes before they reach production.

[Get started →](https://app.flowfuse.com/account/create)

### Installing OPC UA Support in FlowFuse

To work with OPC UA in FlowFuse Node-RED, you will first need to install the required nodes.

#### Install the OPC UA Node Package

1. Open the **FlowFuse Node-RED editor**.
2. Click the menu in the top-right and choose **Manage palette**.
3. Navigate to the **Install** tab and search for `node-red-contrib-opcua`.
4. Click **Install**.

Once installed, you will find new nodes for OPC UA communication in your palette, including **Client**, **Item**, and **Browser** and other OPC UA nodes.

### Connecting to Your OPC UA Server

To begin accessing industrial data, create a client connection using the OPC UA Client node.

1. Drag an **OPC UA Client** node onto the canvas.
2. Double-click to configure it.
3. Click the **+** icon to create a new endpoint configuration.
4. Enter your OPC UA server address, for example: `opc.tcp://192.168.0.10:4840`
5. Set the security mode to **None** (you can add security later).

> **Security Note:** This tutorial uses **"None"** for the security setting to keep things simple.
> In production environments, always use appropriate security—typically **"Sign & Encrypt"** with certificates.

6. Click **Add**, then **Done**.

![OPC UA endpoint configuration](/blog/2025/07/images/opcua-endpoint-config.png){data-zoomable}
_OPC UA endpoint configuration_

With the connection now defined, you’re ready to explore what tags are available.

### Browsing Tags (Optional)

If you do not already know the Node IDs of the tags you want to access, use the OPC UA Browser node to explore the tag structure.

1. Drag an **Inject**, **OPC UA Browser**, and **Debug** node onto the canvas.
2. Connect the output of the Inject node to the input of the **Browser** node, then connect the Browser's output to the Debug node.
3. In the **Browser** node, set the topic to `ns=0;i=85` (the root *Objects* folder).
4. Configure the Inject node to send a timestamp.
5. Deploy the flow and click the Inject node.

Tag information will be printed to the debug sidebar. You can now identify the exact Node IDs to use in your reads or writes.

![OPC UA Browser node](/blog/2025/07/images/opcua-browser.png){data-zoomable} 
_OPC UA Browser node_



::render-flow
---
height: 300
flow: "W3siaWQiOiJjM2E4MzAzMDQ4ZTY1ODhmIiwidHlwZSI6Ik9wY1VhLUJyb3dzZXIiLCJ6IjoiZjY2ZTljOTFjMjY5ZTdmYiIsImVuZHBvaW50IjoiYzBmOGM3OWZjMDA4NDVjOCIsIml0ZW0iOiIiLCJkYXRhdHlwZSI6IiIsInRvcGljIjoibnM9MDtpPTg1IiwiaXRlbXMiOltdLCJuYW1lIjoiIiwieCI6NTEwLCJ5IjozMDAsIndpcmVzIjpbWyIzNDI4MTk5ODUyZjlmY2RjIl1dfSx7ImlkIjoiMTU0OWY3OTdjNThiYTY2NyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZjY2ZTljOTFjMjY5ZTdmYiIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoyODAsInkiOjMwMCwid2lyZXMiOltbImMzYTgzMDMwNDhlNjU4OGYiXV19LHsiaWQiOiIzNDI4MTk5ODUyZjlmY2RjIiwidHlwZSI6ImRlYnVnIiwieiI6ImY2NmU5YzkxYzI2OWU3ZmIiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NDAsInkiOjMwMCwid2lyZXMiOltdfSx7ImlkIjoiYzBmOGM3OWZjMDA4NDVjOCIsInR5cGUiOiJPcGNVYS1FbmRwb2ludCIsImVuZHBvaW50IjoiIiwic2VjcG9sIjoiTm9uZSIsInNlY21vZGUiOiJOb25lIiwibm9uZSI6dHJ1ZSwibG9naW4iOmZhbHNlLCJ1c2VyY2VydCI6ZmFsc2UsInVzZXJjZXJ0aWZpY2F0ZSI6IiIsInVzZXJwcml2YXRla2V5IjoiIn1d"
---
::



### Reading Tag Values

Once you know the Node IDs, you can start reading data from your industrial equipment through the OPC UA server.

#### Reading a Single Tag

Here’s how to read a single value in real time:

1. Drag an **Inject** node onto the canvas (this will trigger the read operation).
2. Add an **OPC UA Item** node and configure:
   - **Node ID**: Enter the tag’s identifier (e.g., `ns=3;i=1003`)
   - **Data Type**: Select the appropriate type (e.g., `Boolean`)

   ![OPC UA Item node configuration](/blog/2025/07/images/opcua-item-node.png){data-zoomable}

3. Connect the output of the **Inject** node to the input of the **Item** node.
4. Add an **OPC UA Client** node and set its **Action** to `read`.

   ![OPC UA Client node configured for reading](/blog/2025/07/images/opcua-client-read-node.png){data-zoomable}

5. Select the endpoint configuration you created earlier.
6. Connect the output of the **Item** node to the input of the **Client** node, then connect the **Client** node's top output to a **Debug** node.

> The **OPC UA Client** node has three outputs: the top carries the data payload, the middle indicates connection status, and the bottom provides raw responses for debugging.

7. Deploy the flow and click the **Inject** button to trigger the read.

You should see the tag value appear in the debug panel. This confirms that communication is working correctly.

You can also pass the Node ID dynamically using `msg.topic` from the Inject node if you prefer not to use an Item node.



::render-flow
---
height: 300
flow: "W3siaWQiOiJkMTI4NTgyZGRhN2FkYmVkIiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiJlYWQ5N2VkNzU2YTEzYTE1IiwiZW5kcG9pbnQiOiJhNGRmMTgyNTNlNWE3OWEwIiwiYWN0aW9uIjoicmVhZCIsImRlYWRiYW5kdHlwZSI6ImEiLCJkZWFkYmFuZHZhbHVlIjoxLCJ0aW1lIjoxMCwidGltZVVuaXQiOiJzIiwiY2VydGlmaWNhdGUiOiJuIiwibG9jYWxmaWxlIjoiIiwibG9jYWxrZXlmaWxlIjoiIiwic2VjdXJpdHltb2RlIjoiTm9uZSIsInNlY3VyaXR5cG9saWN5IjoiTm9uZSIsInVzZVRyYW5zcG9ydCI6ZmFsc2UsIm1heENodW5rQ291bnQiOjEsIm1heE1lc3NhZ2VTaXplIjo4MTkyLCJyZWNlaXZlQnVmZmVyU2l6ZSI6ODE5Miwic2VuZEJ1ZmZlclNpemUiOjgxOTIsInNldHN0YXR1c2FuZHRpbWUiOmZhbHNlLCJrZWVwc2Vzc2lvbmFsaXZlIjpmYWxzZSwibmFtZSI6IiIsIngiOjU4MCwieSI6MjQwLCJ3aXJlcyI6W1siM2ZjMTZiZjkxMmYxNjE2OSJdLFsiMTc3MjRhNjg4OWVjNzM3OCJdLFsiYzZiMGYxNmVmNzM3MTY5OSJdXX0seyJpZCI6IjNmYzE2YmY5MTJmMTYxNjkiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJUYWcgVmFsdWUiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzQwLCJ5IjoyMDAsIndpcmVzIjpbXX0seyJpZCI6IjI2OTExOTY1NTE4MTJhMjEiLCJ0eXBlIjoiT3BjVWEtSXRlbSIsInoiOiJlYWQ5N2VkNzU2YTEzYTE1IiwiaXRlbSI6Im5zPTM7aT0xMDAxIiwiZGF0YXR5cGUiOiJCb29sZWFuIiwidmFsdWUiOiIiLCJuYW1lIjoiT1BDIFVBIEl0ZW0gTm9kZSIsIngiOjM3MCwieSI6MjQwLCJ3aXJlcyI6W1siZDEyODU4MmRkYTdhZGJlZCJdXX0seyJpZCI6Ijk2ZDE3ODQxYTdmMTNhYzQiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiUmVhZCB0YWciLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoyMDAsInkiOjIwMCwid2lyZXMiOltbIjI2OTExOTY1NTE4MTJhMjEiXV19LHsiaWQiOiIxNzcyNGE2ODg5ZWM3Mzc4IiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiRXJyb3JzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjczMCwieSI6MjQwLCJ3aXJlcyI6W119LHsiaWQiOiJjNmIwZjE2ZWY3MzcxNjk5IiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiUmF3IFJlc3BvbnMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzYwLCJ5IjoyODAsIndpcmVzIjpbXX0seyJpZCI6ImE0ZGYxODI1M2U1YTc5YTAiLCJ0eXBlIjoiT3BjVWEtRW5kcG9pbnQiLCJlbmRwb2ludCI6Im9wYy50Y3A6Ly8xOTIuMTY4LjAuMTA6NDg0MCIsInNlY3BvbCI6Ik5vbmUiLCJzZWNtb2RlIjoiTm9uZSIsIm5vbmUiOnRydWUsImxvZ2luIjpmYWxzZSwidXNlcmNlcnQiOmZhbHNlLCJ1c2VyY2VydGlmaWNhdGUiOiIiLCJ1c2VycHJpdmF0ZWtleSI6IiJ9XQ=="
---
::



#### Reading Multiple Tags

Batch reading improves performance when you need multiple data points from your equipment

1. Drag an **OPC UA Client** node and set its **Action** to "READ MULTIPLE".

![Screenshot showing OPC UA Client node with "READ MULTIPLE" action selected](/blog/2025/07/images/read-multiple.png){data-zoomable}  
_Screenshot showing OPC UA Client node with "READ MULTIPLE" action selected_

2. Select the endpoint configuration.
3. Add an **OPC UA Item** node for each tag you want to read.
4. Add an **Inject** node for each Item node to trigger it.
5. Connect each Inject node to its corresponding Item node.
6. Wire all Item nodes into the OPC UA Client node.
7. Add a **Debug** node to the top output of the **Client** node.
8. Deploy the flow.
9. Click each Inject node once, the client node will store the tag definitions.
10.  Send a message with `msg.topic = "readmultiple"` to trigger the actual read.
11. To clear stored items, send `msg.topic = "clearitems"`.

You now have a flexible setup for reading multiple values from your PLC on demand.



::render-flow
---
height: 300
flow: "W3siaWQiOiI2ZjVlMmIxY2JjZTE1MDI1IiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiJlYWQ5N2VkNzU2YTEzYTE1IiwiZW5kcG9pbnQiOiIiLCJhY3Rpb24iOiJyZWFkbXVsdGlwbGUiLCJkZWFkYmFuZHR5cGUiOiJhIiwiZGVhZGJhbmR2YWx1ZSI6MSwidGltZSI6MTAsInRpbWVVbml0IjoicyIsImNlcnRpZmljYXRlIjoibiIsImxvY2FsZmlsZSI6IiIsImxvY2Fsa2V5ZmlsZSI6IiIsInVzZVRyYW5zcG9ydCI6ZmFsc2UsIm1heENodW5rQ291bnQiOiIiLCJtYXhNZXNzYWdlU2l6ZSI6IiIsInJlY2VpdmVCdWZmZXJTaXplIjoiIiwic2VuZEJ1ZmZlclNpemUiOiIiLCJzZXRzdGF0dXNhbmR0aW1lIjpmYWxzZSwia2VlcHNlc3Npb25hbGl2ZSI6ZmFsc2UsIm5hbWUiOiIiLCJ4Ijo1ODAsInkiOjUwMCwid2lyZXMiOltbIjI4YjU3NWYwNmJiYmU3YTciXSxbIjEzOWQzNDZhYWIyMDRmMmYiXSxbIjM0OTdkNTU2NmZiNzhmNWYiXV19LHsiaWQiOiI0ZGFhOTU4ZDM0YzY0OGM1IiwidHlwZSI6Ik9wY1VhLUl0ZW0iLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIml0ZW0iOiJucz01O3M9Q291bnRlcjEiLCJkYXRhdHlwZSI6IkludDMyIiwidmFsdWUiOiIiLCJuYW1lIjoiIiwieCI6MzgwLCJ5Ijo0ODAsIndpcmVzIjpbWyI2ZjVlMmIxY2JjZTE1MDI1Il1dfSx7ImlkIjoiYmFhMjczM2NhMWZjYjY5ZCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJBZGQgaXRlbSIsInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MjAwLCJ5Ijo0ODAsIndpcmVzIjpbWyI0ZGFhOTU4ZDM0YzY0OGM1Il1dfSx7ImlkIjoiZGZkOTZhNGRmZTYzMzBhZiIsInR5cGUiOiJPcGNVYS1JdGVtIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJpdGVtIjoibnM9NTtzPVJhbmRvbTEiLCJkYXRhdHlwZSI6IkRvdWJsZSIsInZhbHVlIjoiIiwibmFtZSI6IiIsIngiOjM4MCwieSI6NTIwLCJ3aXJlcyI6W1siNmY1ZTJiMWNiY2UxNTAyNSJdXX0seyJpZCI6ImI4ZDVlNDBhOThiMWZiOWYiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiQWRkIGl0ZW0iLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjIwMCwieSI6NTIwLCJ3aXJlcyI6W1siZGZkOTZhNGRmZTYzMzBhZiJdXX0seyJpZCI6IjNmNjNjNDZmNDk5YzNiY2EiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiUmVhZCBtdWx0aXBsZSBpdGVtcyIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoicmVhZG11bHRpcGxlIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MzcwLCJ5Ijo0NDAsIndpcmVzIjpbWyI2ZjVlMmIxY2JjZTE1MDI1Il1dfSx7ImlkIjoiNzVjNzkyNzk5NmNmNDRjMiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJDbGVhciBub2RlSWQgYXJyYXkiLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6ImNsZWFyaXRlbXMiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjozNzAsInkiOjU2MCwid2lyZXMiOltbIjZmNWUyYjFjYmNlMTUwMjUiXV19LHsiaWQiOiIyOGI1NzVmMDZiYmJlN2E3IiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiVGFnIFZhbHVlIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc2MCwieSI6NDYwLCJ3aXJlcyI6W119LHsiaWQiOiIxMzlkMzQ2YWFiMjA0ZjJmIiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiRXJyb3JzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc1MCwieSI6NTAwLCJ3aXJlcyI6W119LHsiaWQiOiIzNDk3ZDU1NjZmYjc4ZjVmIiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiUmF3IFJlc3BvbnNlIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc4MCwieSI6NTQwLCJ3aXJlcyI6W119XQ=="
---
::



### Writing Values

In addition to reading data, OPC UA also allows you to write control signals or parameters to your equipment.

#### Writing a Single Tag

To write a single value:

1. Drag an **Inject** node onto the canvas (used to trigger the write operation).
2. Add an **OPC UA Item** node and configure:
   - **Node ID**: Enter the target identifier.
   - **Data Type**: Choose the appropriate type (e.g., `Boolean`, `Double`).
   - **Value**: Enter the value to write.

   ![Screenshot showing OPC UA Item node configuration for write operation](/blog/2025/07/images/opcua-item-node-write.png){data-zoomable}  
   _OPC UA Item node configured for a write operation_

3. Connect the **Inject** node to the **Item** node.
4. Add an **OPC UA Client** node and set its **Action** to `WRITE`.

   ![Screenshot showing OPC UA Client node with "WRITE" action selected](/blog/2025/07/images/opcua-client-write-ops.png){data-zoomable}  
   _OPC UA Client node with "WRITE" action selected_

5. Select the endpoint configuration you created earlier.
6. Connect the **Item** node to the **Client** node, then connect the **Client** node's top output to a **Debug** node.
7. Deploy the flow and click the **Inject** button to trigger the write.

The OPC UA Client node will confirm the operation with a status like **"values written"**.



::render-flow
---
height: 300
flow: "W3siaWQiOiJjOTIyYTcwZDQ4ZWNiYTZmIiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiJlYWQ5N2VkNzU2YTEzYTE1IiwiZW5kcG9pbnQiOiIiLCJhY3Rpb24iOiJ3cml0ZSIsImRlYWRiYW5kdHlwZSI6ImEiLCJkZWFkYmFuZHZhbHVlIjoxLCJ0aW1lIjoxMCwidGltZVVuaXQiOiJzIiwiY2VydGlmaWNhdGUiOiJuIiwibG9jYWxmaWxlIjoiIiwibG9jYWxrZXlmaWxlIjoiIiwidXNlVHJhbnNwb3J0IjpmYWxzZSwibWF4Q2h1bmtDb3VudCI6IiIsIm1heE1lc3NhZ2VTaXplIjoiIiwicmVjZWl2ZUJ1ZmZlclNpemUiOiIiLCJzZW5kQnVmZmVyU2l6ZSI6IiIsInNldHN0YXR1c2FuZHRpbWUiOmZhbHNlLCJrZWVwc2Vzc2lvbmFsaXZlIjpmYWxzZSwibmFtZSI6IiIsIngiOjUyMCwieSI6NDgwLCJ3aXJlcyI6W1siN2ViMDEwYTQ2NzFhYzE4MSJdLFsiMzkyYmIxZmQ2MGMyOWJhZiJdLFsiZTlkMjc5Njc3ZGJjODdlOCJdXX0seyJpZCI6IjVmZjFlM2MyZDU5NzdhMzQiLCJ0eXBlIjoiT3BjVWEtSXRlbSIsInoiOiJlYWQ5N2VkNzU2YTEzYTE1IiwiaXRlbSI6Im5zPTU7cz1Db3VudGVyMSIsImRhdGF0eXBlIjoiSW50MzIiLCJ2YWx1ZSI6IjIwIiwibmFtZSI6IiIsIngiOjM0MCwieSI6NDgwLCJ3aXJlcyI6W1siYzkyMmE3MGQ0OGVjYmE2ZiJdXX0seyJpZCI6IjhjZGQxNDFkYmRiMzUwYzciLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiV3JpdGUiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjE5MCwieSI6NDgwLCJ3aXJlcyI6W1siNWZmMWUzYzJkNTk3N2EzNCJdXX0seyJpZCI6IjdlYjAxMGE0NjcxYWMxODEiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJUYWcgVmFsdWUiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjgwLCJ5Ijo0NDAsIndpcmVzIjpbXX0seyJpZCI6IjM5MmJiMWZkNjBjMjliYWYiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJFcnJvcnMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjcwLCJ5Ijo0ODAsIndpcmVzIjpbXX0seyJpZCI6ImU5ZDI3OTY3N2RiYzg3ZTgiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJSYXcgUmVzcG9uc2UiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzAwLCJ5Ijo1MjAsIndpcmVzIjpbXX1d"
---
::



#### Writing Multiple Tags

To write multiple values at once, follow this pattern:

1. Add an **OPC UA Client** node and set its **Action** to `WRITE MULTIPLE`.

   ![Screenshot showing OPC UA Client node with "WRITE MULTIPLE" action selected](/blog/2025/07/images/opcua-client-write-multiple.png){data-zoomable}  
   _OPC UA Client node configured for writing multiple values_

2. Select the appropriate endpoint configuration.
3. Add multiple **OPC UA Item** nodes, each configured with a **Node ID**, **Data Type**, and **Value** to be written.
4. Add an **Inject** node for each **Item** node.
5. Connect each **Inject** node to its corresponding **Item** node, then connect all **Item** nodes to the **Client** node.
6. Add a **Debug** node to the top output of the **Client** node.
7. Deploy the flow and trigger all **Inject** nodes to load the values.
8. To execute the write operation, send a message with `msg.topic = "writemultiple"`.
9. To clear the stored items, send a message with `msg.topic = "clearitems"`.

This setup allows you to prepare multiple tag values and write them all at once, giving you precise control through a single command.



::render-flow
---
height: 300
flow: "W3siaWQiOiJlZDQyMWE5LmQ2MzE5ZTgiLCJ0eXBlIjoiT3BjVWEtQ2xpZW50IiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJlbmRwb2ludCI6IiIsImFjdGlvbiI6IndyaXRlbXVsdGlwbGUiLCJkZWFkYmFuZHR5cGUiOiJhIiwiZGVhZGJhbmR2YWx1ZSI6MSwidGltZSI6MTAsInRpbWVVbml0IjoicyIsImNlcnRpZmljYXRlIjoibiIsImxvY2FsZmlsZSI6IiIsImxvY2Fsa2V5ZmlsZSI6IiIsInVzZVRyYW5zcG9ydCI6ZmFsc2UsIm1heENodW5rQ291bnQiOiIiLCJtYXhNZXNzYWdlU2l6ZSI6IiIsInJlY2VpdmVCdWZmZXJTaXplIjoiIiwic2VuZEJ1ZmZlclNpemUiOiIiLCJzZXRzdGF0dXNhbmR0aW1lIjpmYWxzZSwia2VlcHNlc3Npb25hbGl2ZSI6ZmFsc2UsIm5hbWUiOiIiLCJ4Ijo1NjAsInkiOjQyMCwid2lyZXMiOltbImIwNzg4ZmI5Mjg1YzQ4ZWEiXSxbImJkZTY5MDIwOGNiZjJjNGMiXSxbIjA4ODM4MjZiNGEwY2EwMzAiXV19LHsiaWQiOiI5NmJkNzYzLjE0YTkzMDgiLCJ0eXBlIjoiT3BjVWEtSXRlbSIsInoiOiJlYWQ5N2VkNzU2YTEzYTE1IiwiaXRlbSI6Im5zPTM7aT0xMDA3IiwiZGF0YXR5cGUiOiJEb3VibGUiLCJ2YWx1ZSI6IjEuMCIsIm5hbWUiOiIiLCJ4IjozNjAsInkiOjQwMCwid2lyZXMiOltbImVkNDIxYTkuZDYzMTllOCJdXX0seyJpZCI6ImQ4YTY4YzdhLmE3MzAwOCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJBZGQgaXRlbSIsInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MTgwLCJ5Ijo0MDAsIndpcmVzIjpbWyI5NmJkNzYzLjE0YTkzMDgiXV19LHsiaWQiOiI4YWU1MWM4Yy4yMGJkMyIsInR5cGUiOiJPcGNVYS1JdGVtIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJpdGVtIjoibnM9MztpPTEwMDgiLCJkYXRhdHlwZSI6IkludDMyIiwidmFsdWUiOiI1MCIsIm5hbWUiOiIiLCJ4IjozNjAsInkiOjQ0MCwid2lyZXMiOltbImVkNDIxYTkuZDYzMTllOCJdXX0seyJpZCI6IjEzMzVhZGNlLjdmNDZiYSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJBZGQgaXRlbSIsInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MTgwLCJ5Ijo0NDAsIndpcmVzIjpbWyI4YWU1MWM4Yy4yMGJkMyJdXX0seyJpZCI6IjJjMDUwYTNkLjkxZjQ5NiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZWFkOTdlZDc1NmExM2ExNSIsIm5hbWUiOiJXcml0ZSBtdWx0aXBsZSBpdGVtcyIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoid3JpdGVtdWx0aXBsZSIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjM1MCwieSI6MzYwLCJ3aXJlcyI6W1siZWQ0MjFhOS5kNjMxOWU4Il1dfSx7ImlkIjoiNjkwZTRmOWYuZmFlY2EiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiQ2xlYXIgbm9kZUlkIGFycmF5IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiJjbGVhcml0ZW1zIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6MzUwLCJ5Ijo0ODAsIndpcmVzIjpbWyJlZDQyMWE5LmQ2MzE5ZTgiXV19LHsiaWQiOiJiMDc4OGZiOTI4NWM0OGVhIiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiVGFnIFZhbHVlIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc0MCwieSI6MzgwLCJ3aXJlcyI6W119LHsiaWQiOiJiZGU2OTAyMDhjYmYyYzRjIiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiRXJyb3JzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjczMCwieSI6NDIwLCJ3aXJlcyI6W119LHsiaWQiOiIwODgzODI2YjRhMGNhMDMwIiwidHlwZSI6ImRlYnVnIiwieiI6ImVhZDk3ZWQ3NTZhMTNhMTUiLCJuYW1lIjoiUmF3IFJlc3BvbnNlIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc2MCwieSI6NDYwLCJ3aXJlcyI6W119XQ=="
---
::



## What’s Next

You’ve now mastered the fundamentals of OPC UA integration—connecting to servers, browsing tags, and reading or writing data. These core building blocks lay the foundation for powerful industrial automation.

In real deployments, you will want more than Inject nodes and debug panels. With **FlowFuse Dashboard 2.0**, you can build full operator interfaces—live gauges, control buttons, trend charts—fully connected to your OPC UA data.

This guide covered the basics, but OPC UA offers far more. In the next article, we will explore:

* Subscriptions for real-time monitoring without polling
* Events and alarms directly from equipment
* Historical data queries for trend analysis
* Method calls to execute functions on your devices

When it is time to move beyond prototypes, **FlowFuse** delivers what industrial systems truly need—remote device management, instant rollbacks with full version control, built-in team collaboration, and high availability you can trust.

If you’re ready to simplify your OPC UA integration and scale industrial workflows with Node-RED, [start your free trial](https://app.flowfuse.com/account/create) of FlowFuse today.

OPC UA is one of several protocols FlowFuse uses to connect PLCs to MQTT, cloud platforms, and enterprise systems. See the [FlowFuse PLC integration overview](/landing/plc/) for EtherNet/IP, Siemens S7, Modbus, and more.
