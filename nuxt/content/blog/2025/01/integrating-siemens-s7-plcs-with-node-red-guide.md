---
title: 'Getting Started: Integrating Siemens S7 PLCs with Node-RED'
navTitle: 'Getting Started: Integrating Siemens S7 PLCs with Node-RED'
---

Siemens S7 PLCs are a staple in industrial automation, powering everything from basic control functions to complex, large-scale processes. However, integrating these PLCs with other systems for remote monitoring or data sharing can present challenges.

<!--more-->

This is where Node-RED comes in, offering a user-friendly solution to seamlessly connect Siemens S7 PLCs with a variety of platforms. With its intuitive flow-based interface, Node-RED enables you to create custom workflows and dashboards—no deep technical expertise required.

Siemens S7 PLCs are typically programmed using TIA Portal, Siemens' integrated development environment, and communication with external systems usually relies on the S7 protocol (ISO over TCP/IP). In this article, we’ll walk you through how to use Node-RED to read from and write to Siemens S7 PLCs via the S7 protocol, unlocking new possibilities for remote control and system integration in your industrial automation setup.

## Prerequisite

Before integrating your Siemens S7 PLC with Node-RED, make sure you have the following :

1. Before downloading the ladder program and all configurations and settings to your PLC, make sure you have the following settings:

- Allow PUT/GET Communication from remote partners.

![PUT/GET Communication from remote partners is Allowed](/blog/2025/01/images/allow-put-get-communication.png){data-zoomable}
_PUT/GET Communication from remote partners is Allowed_

- Provide full access to the PLC (no protection), allowing unrestricted access to data exchange.

![Providing complete access to the PLC](/blog/2025/01/images/providing-full-access-to-plc.png){data-zoomable}
_Providing complete access to the PLC_

2. Ensure that the appropriate ladder program (or any other logic) is written according to your requirements and successfully downloaded to the PLC. However, before downloading, make sure the 'Optimized Block Access' option is disabled for the data block that your ladder program using.

![Untick 'Optimized Block Access'.](/blog/2025/01/images/optimized-block-access.png){data-zoomable}
_Untick 'Optimized Block Access.'_

3. Install Node-RED on the device that will communicate with the S7 PLC. You cannot install Node-RED directly on the S7 PLC, as PLCs are typically controllers, not computers. For example, you can use a device like the Revolutionary Pi to connect and transfer data across systems. Use the [FlowFuse Device Agent](/platform/device-agent/) to install Node-RED on your device. 

- Why FlowFuse Device Agent? It allows you to manage Node-RED remotely, enabling control, monitoring, and flow creation without the need for on-site visits. FlowFuse also offers a suite of enterprise-grade features such as collaboration, device management, and DevOps pipelines, which are essential in industrial environments. These features help streamline operations and ensure scalability in complex automation systems. [Sign up for free](https://app.flowfuse.com/account/create) to get started.

4. Verify that the device running Node-RED is in the same network as the PLC and can successfully ping the PLC. Also, a firewall should not block the S7 port (typically port 102).

## Integrating Siemens S7 PLCs with Node-RED

Now that everything is set up, let's integrate your Siemens S7 PLC with Node-RED. In this article, I’ll demonstrate the process using a Siemens S7-1212C PLC. I’ve connected it to a stack/tower light and will walk you through how to write data to the PLC to control this light. Later, I’ll show you how to read data and reflect the status of the light.

My program in TIA Portal is structured as shown below, utilizing DB (Data Blocks) and Q (physical outputs) to control devices. However, Node-RED can retrieve almost all types of data from the PLC. The process is similar for most data types.

![Ladder Logic to Control Outputs for Managing Lights](/blog/2025/01/images/ladder-to-control-lights.png)_Ladder Logic to Control Outputs for Managing Lights_

Let’s break down what’s happening in the ladder logic above. First, we have open contacts, each with address variables defined in a separate Data Block. There are three open branches, each starting with an open contact. Each contact is connected to an output that alters the status of a Q physical address. Each Q corresponds to a physical output on the PLC, which is wired to the lights. When we change the status of a contact to "true," it activates the corresponding light by altering the state of the Q output, which reflects the change in the physical output.

### Installing the S7 Node

To communicate from Node-RED to the PLC, we need to install the S7 node, which allows Node-RED to interface with Siemens S7 PLCs. In this article, we will be using `node-red-contrib-s7`, which is quite popular. If this particular node is not suitable for your workflow you can find alternatives in the [Node-RED catalog](https://flows.nodered.org/search?term=siemens&type=node).

#### Steps to Install the S7 Node:

1. Open your Node-RED editor in a web browser.
2. Open the main menu by clicking the three horizontal lines in the top-right corner.
3. Click "Manage Palette" from the menu.
4. Switch to the "Install" tab and type `node-red-contrib-s7` in the search field.
5. Click "Install" next to the node name.

Once the installation is complete, the S7 nodes will be available in your Node-RED palette, and you can start using it to communicate with your Siemens S7 PLC.

### Addressing Scheme for Variables in Node-RED with the S7 Node

Before we start, it's important to note that the variables and their addresses configured on the S7 endpoint follow a slightly different addressing scheme compared to those used in Step 7 or the TIA Portal. Therefore, when adding variables to the S7 node in Node-RED, you must ensure that you follow the correct addressing format outlined in the table below.


| **Node-RED Address**      | **Step7 Equivalent**   | **Data Type**       | **Description**                                  |
|---------------------------|------------------------|---------------------|--------------------------------------------------|
| `DB5,X0.1`                | `DB5.DBX0.1`           | Boolean             | Bit 1 of byte 0 in DB5                          |
| `DB23,BYTE1`              | `DB23.DBB1`            | Number (Byte)       | Byte 1 (0-255) of DB23                          |
| `DB100,CHAR2`             | `DB100.DBB2`           | String              | Byte 2 of DB100 as Char                         |
| `DB42,INT3`               | `DB42.DBW3`            | Number (16-bit)     | Signed 16-bit number at byte 3 in DB42          |
| `DB57,WORD4`              | `DB57.DBW4`            | Number (16-bit)     | Unsigned 16-bit number at byte 4 in DB57        |
| `DB13,DINT5`              | `DB13.DBD5`            | Number (32-bit)     | Signed 32-bit number at byte 5 in DB13          |
| `DB19,DWORD6`             | `DB19.DBD6`            | Number (32-bit)     | Unsigned 32-bit number at byte 6 in DB19        |
| `DB21,REAL7`              | `DB21.DBD7`            | Floating Point (32) | Floating point number at byte 7 in DB21         |
| `DB2,S7.10*`              | -                      | String              | String (length 10) starting at byte 7 in DB2    |
| `I1.0`                    | `I1.0`                 | Boolean             | Bit 0 of byte 1 in input area                   |
| `Q2.1`                    | `Q2.1`                 | Boolean             | Bit 1 of byte 2 in output area                  |
| `M3.2`                    | `M3.2`                 | Boolean             | Bit 2 of byte 3 in memory area                  |
| `IB4`                     | `IB4`                  | Number (Byte)       | Byte 4 (0-255) in input area                    |
| `QB5`                     | `QB5`                  | Number (Byte)       | Byte 5 (0-255) in output area                   |
| `MB6`                     | `MB6`                  | Number (Byte)       | Byte 6 (0-255) in memory area                   |
| `IC7`                     | `IB7`                  | String              | Byte 7 of input area as Char                    |
| `QC8`                     | `QB8`                  | String              | Byte 8 of output area as Char                   |
| `MC9`                     | `MB9`                  | String              | Byte 9 of memory area as Char                   |
| `II10`                    | `IW10`                 | Number (16-bit)     | Signed 16-bit number at byte 10 in input area   |
| `QI12`                    | `QW12`                 | Number (16-bit)     | Signed 16-bit number at byte 12 in output area  |
| `MI14`                    | `MW14`                 | Number (16-bit)     | Signed 16-bit number at byte 14 in memory area  |
| `IW16`                    | `IW16`                 | Number (16-bit)     | Unsigned 16-bit number at byte 16 in input area |
| `QW18`                    | `QW18`                 | Number (16-bit)     | Unsigned 16-bit number at byte 18 in output area|
| `MW20`                    | `MW20`                 | Number (16-bit)     | Unsigned 16-bit number at byte 20 in memory area|
| `IDI22`                   | `ID22`                 | Number (32-bit)     | Signed 32-bit number at byte 22 in input area   |
| `QDI24`                   | `QD24`                 | Number (32-bit)     | Signed 32-bit number at byte 24 in output area  |
| `MDI26`                   | `MD26`                 | Number (32-bit)     | Signed 32-bit number at byte 26 in memory area  |
| `ID28`                    | `ID28`                 | Number (32-bit)     | Unsigned 32-bit number at byte 28 in input area |
| `QD30`                    | `QD30`                 | Number (32-bit)     | Unsigned 32-bit number at byte 30 in output area|
| `MD32`                    | `MD32`                 | Number (32-bit)     | Unsigned 32-bit number at byte 32 in memory area|
| `IR34`                    | `IR34`                 | Floating Point      | Floating point number at byte 34 in input area |
| `QR36`                    | `QR36`                 | Floating Point      | Floating point number at byte 36 in output area|
| `MR38`                    | `MR38`                 | Floating Point      | Floating point number at byte 38 in memory area|
| `DB1,DT0`                 | -                      | Date                | Timestamp in DATE_AND_TIME format              |
| `DB1,DTZ10`               | -                      | Date                | Timestamp in DATE_AND_TIME format (UTC)        |
| `DB2,DTL2`                | -                      | Date                | Timestamp in DTL format                         |
| `DB2,DTLZ12`              | -                      | Date                | Timestamp in DTL format (UTC)                  |
| `DB57,RWORD4`             | `DB57.DBW4`            | Number (16-bit)     | Unsigned 16-bit number, Little-Endian at byte 4|
| `DB13,RDI5`               | `DB13.DBD5`            | Number (32-bit)     | Signed 32-bit number, Little-Endian at byte 5  |
| `MRW20`                   | `MW20`                 | Number (16-bit)     | Unsigned 16-bit number, Little-Endian at byte 20|

For example, consider that you have a ladder logic program in the TIA Portal with addresses like DB5.DBX0.0 and DB13.DBW4. You must adjust the address format slightly when you want to use these in the Node-RED S7 node. In Node-RED, DB5.DBX0.0 would be represented as DB5,X0.0 and DB13.DBW4 would be written as DB13,WORD4. Essentially, you look at the TIA Portal address, find the corresponding format in the Node-RED address column, and use that format in the S7 node configuration.

If you wanted integrate Siemens LOGO, please refer to the node's [README](https://flows.nodered.org/node/node-red-contrib-s7), as the addressing differs.

### Configuring the S7 Node to Connect to the PLC

Now that you have all the necessary knowledge and setup, let's start by establishing a connection between Node-RED and your Siemens S7 PLC. The S7 node in Node-RED simplifies the process, making it easy to configure communication. Follow the steps below to connect and start interacting with your PLC

1. Drag the S7 node onto the Node-RED canvas.
2. Double-click on the S7 node and click on the "+" icon to add a PLC configuration.
3. Select "Ethernet (ISO on TCP)" as the transport protocol, then enter your PLC's IP address. The default port (102) is used for S7 communication, so leave it unchanged.
4. Set the Mode to "Rack," then enter the Rack ID and Slot ID. These values can be found in the TIA Portal under the Device View tab on your configured device.

![Image showing window from where you will get the Rack No and Slot No](/blog/2025/01/images/showing-rack-and-slot.png){data-zoomable}
_Image showing window from where you will get the Rack No and Slot No_

5. Enter the Cycle Time (interval for communication with the PLC) and Timeout Duration (maximum time to wait for a response).
6. Once done, switch to the Variables tab and add all the variables with the correct address and name you want to read or write.

![Adding Variables into s7 node](/blog/2025/01/images/s7-config-variables.png){data-zoomable}
_Adding Variables into s7 node_

7. After adding the variables, click Add and then Done.
8. Deploy the flow by clicking the top-right Deploy button. Once deployed, the connection status will be displayed at the bottom of the node. If connected successfully, it will show a green squre with "online" status.

![Configuring S7 node for connection](/blog/2025/01/images/s7-connection-configuration.png){data-zoomable}
_Configuring S7 node for connection_

### Writing Data to the PLC

Now that you’ve configured the connection, it’s time to use Node-RED to write data to the PLC to control light.

1. Drag the s7-out node onto the canvas.
2. Double-click on the node and select the variable to which you want to update or write a value.
3. Select the PLC configuration that we have added.
4. Click Done.

![Configuring S7-out Node to write data to plc](/blog/2025/01/images/configuring-s7-out-node.png){data-zoomable}
_Configuring S7-out Node to write data to plc_

5. The node is now ready to write data to the PLC. You can use standard Node-RED nodes like Inject, Change, or Function to create a workflow that sends the data. Ensure the data type matches the configuration set in the PLC program. For example, in my ladder logic, I need to modify the status of individual open contacts, each with its own address, such as DB1.DBX0.0, DB1.DBX0.1, and DB1.DBX0.2, to control the tower lights. Setting these contacts to TRUE will turn on the red, yellow, and green lights, respectively. You can send the data using the nodes I’ve mentioned, or you can build a custom dashboard with [FlowFuse Dashboard](/platform/dashboard/) for easier interaction.

6. Once your flow is set up and the s7-out node for each variable is configured, click Deploy in the top-right corner to activate the flow.

<lite-youtube videoid="AilWMNPzP1Q" params="rel=0" style="width: 704px; height: 100%;" title="YouTube video player"></lite-youtube>

In the video above, the dashboard interface is built to control the stack light. At the end of this article, I will provide the complete flow for you to download.

If you're building a dashboard, keep in mind that while you can create it on Node-RED within the remote instance on FlowFuse Device Agent, you won’t be able to access it remotely across the editor tunnel. You can of course access it locally on the device or on the local LAN. For this demonstration, I wish to access the dashboard remotely across the internet and so I will create the dashboard in a hosted instance of Node-RED and use the FlowFuse Projects nodes to simply and securely pass the necessary values to and from the remote Node-RED instance. For more details on how to set this up, check out our article: [Exploring FlowFuse Project Nodes](/blog/2024/10/exploring-flowfuse-project-nodes/).

### Reading Data from the PLC 

Now that we’ve covered how to write data to your Siemens S7 PLC, let's move on to reading data from it. Node-RED makes it easy to retrieve important information such as the status of inputs, outputs, or internal memory. By pulling this data into your workflows or visualizing it on a dashboard, you can monitor key parameters in real time and gain valuable insights.

However, before we dive in, it's important to consider that reading individual data points one by one in large-scale manufacturing systems can lead to delays. This approach may not be efficient, especially when dealing with a large number of data points. For more information on these challenges and potential solutions, you can refer to this article: [Modernize Your Legacy Industrial Data - Part 2](/blog/2023/09/modernize-your-legacy-industrial-data-part2/).

To address this issue, you can optimize data retrieval by storing output status values in a single word or double word within the PLC. For our example, I have created a custom function in my program that assigns the output values to individual bits of the word. 

![Ladder diagram showing a custom function that stores the status of outputs in a single word within the PLC.](/blog/2025/01/images/custom-function-storing-bits-in-word.png){data-zoomable}
_Custom ladder diagram function storing output statuses in a single word for optimized data retrieval._

There are several ways to implement this, and depending on your system’s needs, some methods may be more efficient than others. In this case, the output values are stored in a single word within the PLC, as shown in the ladder diagram above. This is not the only correct method—it's simply one approach that works for this particular scenario. Feel free to adapt or explore other methods that might better suit your setup. 

Additionally, if the data you’re reading is mission-critical and you can't afford to lose any, consider using a FIFO stack or buffer in your PLC program. This method ensures that even if there is a network outage or computer problem, no data is lost as it will remain siting in the stack until your Node-RED is back on line and retrieves it.  This ensures no gaps or interruptions in your data and guarantees data integrity.

Now, let’s begin reading the data from the PLC.

1. Drag the `s7-in` node onto the canvas.
2. Double-click on the node to open the configuration and select the appropriate PLC configuration from the list of available connections.
3. Choose the appropriate mode based on your requirements. If you want to read only one variable, select "Single Variable Mode". In this mode, the "Variable" dropdown will allow you to select only a single variable at a time. If you need to read multiple variables, you can select "All Variables" mode, but be aware that the node might still process each request sequentially, depending on its internal workings (which is not fully documented). This can be inefficient when dealing with hundreds of variables.
4. Choose the variable that corresponds to the word or double word containing all the data points you want to read. For example, if you’ve configured the word in the PLC as `DB.DBW2`, the format in the s7-in node will be `DB,WORD2`.
5. Enable the "Emit only when value changes (diff)" option to ensure that the node only triggers when the value of the variable changes, reducing unnecessary reads and improving efficiency.
6. Once your configuration is set, click "Done" and then deploy the flow to start reading data from the PLC.

![Configuring S7-in Node to Read data from plc](/blog/2025/01/images/configuring-s7-in-node.png){data-zoomable}
_Configuring S7-in Node to Read data from plc_

You can add a "Debug" node to the `s7-in` node's output to verify that the data is being read correctly.

Once you see the printed data, you might be surprised, or perhaps you already expected this: since the word data type we're reading is not directly available in Node.js or Node-RED, we'll receive it as an integer. But don't worry—you can convert it into the format that suits your needs using node-red-contrib-buffer-parser. In this integer scenario, you'll need to shift the bits or extract individual values to match your desired output, such as isolating specific bits to represent different statuses or control points. The flow provided at the end demonstrates the implementation of this conversion.

Now that you have the desired format for your output data, you may want to build a dashboard interface with LEDs, gauges, or charts to monitor and visualize the data you've retrieved. You can use the FlowFuse Dashboard, as suggested earlier.

The video below shows the updated dashboard interface used to monitor the stack light LED status:

<lite-youtube videoid="Nlyk_BATKGE" params="rel=0" style="width: 704px; height: 100%;" title="YouTube video player"></lite-youtube>

Here is the flow you can import into your FlowFuse remote instance and deploy. Ensure that you have installed `node-red-contrib-s7` and `node-red-contrib-buffer-parser`. This flow includes S7 nodes for interacting with the S7 PLC and Project nodes for communicating with the FlowFuse hosted instance, where you will build the dashboard.



::render-flow
---
height: 200
flow: "W3siaWQiOiIwZmZjOGMyNzAzYjVlMDU5IiwidHlwZSI6Imdyb3VwIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyIwNjEzMTMyNzc1OTFhMDA0IiwiYTg0OTliYzI0NDNmMGJkOSIsIjI5NzRkZDQ3ZmRhNTRiOWMiLCI0YzAwOWY2MDc2ZjQ3ZWI2IiwiZjQzNzhkMWU3YzI2OGUxZSIsIjYzYWJkNjc3NDMyNjM3MzkiXSwieCI6NTQsInkiOjk5LCJ3Ijo3MzIsImgiOjIwMn0seyJpZCI6IjA2MTMxMzI3NzU5MWEwMDQiLCJ0eXBlIjoiczcgb3V0IiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJnIjoiMGZmYzhjMjcwM2I1ZTA1OSIsImVuZHBvaW50IjoiZjJmMDZjZTAyN2M5N2U0ZCIsInZhcmlhYmxlIjoiQnV0dG9uXzEiLCJuYW1lIjoiQnV0dG9uIHRvIFR1cm4gdGhlIFJFRCBMaWdodCBPTiIsIngiOjYyMCwieSI6MTQwLCJ3aXJlcyI6W119LHsiaWQiOiJhODQ5OWJjMjQ0M2YwYmQ5IiwidHlwZSI6InM3IG91dCIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwiZyI6IjBmZmM4YzI3MDNiNWUwNTkiLCJlbmRwb2ludCI6ImYyZjA2Y2UwMjdjOTdlNGQiLCJ2YXJpYWJsZSI6IkJ1dHRvbl8yIiwibmFtZSI6IkJ1dHRvbiB0byB0dXJuIHRoZSBZZWxsb3cgbGlnaHQgT04iLCJ4Ijo2MjAsInkiOjIwMCwid2lyZXMiOltdfSx7ImlkIjoiMjk3NGRkNDdmZGE1NGI5YyIsInR5cGUiOiJzNyBvdXQiLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsImciOiIwZmZjOGMyNzAzYjVlMDU5IiwiZW5kcG9pbnQiOiJmMmYwNmNlMDI3Yzk3ZTRkIiwidmFyaWFibGUiOiJCdXR0b25fMyIsIm5hbWUiOiJCdXR0b24gdG8gdHVybiBHcmVlbiBsaWdodCAgT04iLCJ4Ijo2MTAsInkiOjI2MCwid2lyZXMiOltdfSx7ImlkIjoiNGMwMDlmNjA3NmY0N2ViNiIsInR5cGUiOiJwcm9qZWN0IGxpbmsgaW4iLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsImciOiIwZmZjOGMyNzAzYjVlMDU5IiwibmFtZSI6IlByb2plY3QgaW4gbm9kZSB0byBjb250cm9sIHRoZSByZWQgbGlnaHQiLCJwcm9qZWN0IjoiYWxsIiwiYnJvYWRjYXN0Ijp0cnVlLCJ0b3BpYyI6ImxpZ2h0X2NvbnRyb2xfcmVkIiwieCI6MjMwLCJ5IjoxNDAsIndpcmVzIjpbWyIwNjEzMTMyNzc1OTFhMDA0Il1dfSx7ImlkIjoiZjQzNzhkMWU3YzI2OGUxZSIsInR5cGUiOiJwcm9qZWN0IGxpbmsgaW4iLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsImciOiIwZmZjOGMyNzAzYjVlMDU5IiwibmFtZSI6IlByb2plY3QgaW4gbm9kZSB0byBjb250cm9sIHRoZSB5ZWxsb3cgbGlnaHQiLCJwcm9qZWN0IjoiYWxsIiwiYnJvYWRjYXN0Ijp0cnVlLCJ0b3BpYyI6ImxpZ2h0X2NvbnRyb2xfeWVsbG93IiwieCI6MjQwLCJ5IjoyMDAsIndpcmVzIjpbWyJhODQ5OWJjMjQ0M2YwYmQ5Il1dfSx7ImlkIjoiNjNhYmQ2Nzc0MzI2MzczOSIsInR5cGUiOiJwcm9qZWN0IGxpbmsgaW4iLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsImciOiIwZmZjOGMyNzAzYjVlMDU5IiwibmFtZSI6IlByb2plY3QgaW4gbm9kZSB0byBjb250cm9sIHRoZSBncmVlbiBsaWdodCIsInByb2plY3QiOiJhbGwiLCJicm9hZGNhc3QiOnRydWUsInRvcGljIjoibGlnaHRfY29udHJvbF9ncmVlbiIsIngiOjI0MCwieSI6MjYwLCJ3aXJlcyI6W1siMjk3NGRkNDdmZGE1NGI5YyJdXX0seyJpZCI6ImYyZjA2Y2UwMjdjOTdlNGQiLCJ0eXBlIjoiczcgZW5kcG9pbnQiLCJ0cmFuc3BvcnQiOiJpc28tb24tdGNwIiwiYWRkcmVzcyI6IjE5Mi4xNjguMS42IiwicG9ydCI6IjEwMiIsInJhY2siOiIwIiwic2xvdCI6IjEiLCJsb2NhbHRzYXBoaSI6IjAxIiwibG9jYWx0c2FwbG8iOiIwMCIsInJlbW90ZXRzYXBoaSI6IjAxIiwicmVtb3RldHNhcGxvIjoiMDAiLCJjb25ubW9kZSI6InJhY2stc2xvdCIsImFkYXB0ZXIiOiIiLCJidXNhZGRyIjoiMiIsImN5Y2xldGltZSI6IjEwMDAiLCJ0aW1lb3V0IjoiMjAwMCIsIm5hbWUiOiJTNyBDb25uZWN0aW9uIENvbmZpZ3VyYXRpb24iLCJ2YXJ0YWJsZSI6W3siYWRkciI6IkRCMSxYMC4wIiwibmFtZSI6IkJ1dHRvbl8xIn0seyJhZGRyIjoiREIxLFgwLjEiLCJuYW1lIjoiQnV0dG9uXzIifSx7ImFkZHIiOiJEQjEsWDAuMiIsIm5hbWUiOiJCdXR0b25fMyJ9LHsiYWRkciI6IkRCMSxXT1JEMiIsIm5hbWUiOiJMaWdodFN0YXR1cyJ9XX0seyJpZCI6IjIzZmQ0MDYzMGRiZWY3MTIiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsInN0eWxlIjp7InN0cm9rZSI6IiNiMmIzYmQiLCJzdHJva2Utb3BhY2l0eSI6IjEiLCJmaWxsIjoiI2YyZjNmYiIsImZpbGwtb3BhY2l0eSI6IjAuNSIsImxhYmVsIjp0cnVlLCJsYWJlbC1wb3NpdGlvbiI6Im53IiwiY29sb3IiOiIjMzIzMzNiIn0sIm5vZGVzIjpbImE0NTYzNzQxODAwNWQwZTUiLCJhOGVhMTYyMmQxZmFkNGJhIiwiOGQ5YTlkYzQxODNhNzc4ZSIsImQ2MGE3NGE1NDMwZGY3YWUiXSwieCI6NTQsInkiOjMzOSwidyI6OTcyLCJoIjo4Mn0seyJpZCI6ImE0NTYzNzQxODAwNWQwZTUiLCJ0eXBlIjoiczcgaW4iLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsImciOiIyM2ZkNDA2MzBkYmVmNzEyIiwiZW5kcG9pbnQiOiJmMmYwNmNlMDI3Yzk3ZTRkIiwibW9kZSI6InNpbmdsZSIsInZhcmlhYmxlIjoiTGlnaHRTdGF0dXMiLCJkaWZmIjp0cnVlLCJuYW1lIjoiIiwieCI6MTUwLCJ5IjozODAsIndpcmVzIjpbWyJkNjBhNzRhNTQzMGRmN2FlIl1dfSx7ImlkIjoiYThlYTE2MjJkMWZhZDRiYSIsInR5cGUiOiJwcm9qZWN0IGxpbmsgb3V0IiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJnIjoiMjNmZDQwNjMwZGJlZjcxMiIsIm5hbWUiOiJwcm9qZWN0IG91dCBub2RlIHRvIHNlbmQgdGhlIGxpZ2h0IHN0YXR1cyIsIm1vZGUiOiJsaW5rIiwiYnJvYWRjYXN0Ijp0cnVlLCJwcm9qZWN0IjoiYzUxZjM4YzItNmM4MC00NDJhLWE5ZTItMTBkZGQ2OGZiNjA2IiwidG9waWMiOiJsaWdodF9zdGF0dXMiLCJ4Ijo4NDAsInkiOjM4MCwid2lyZXMiOltdfSx7ImlkIjoiOGQ5YTlkYzQxODNhNzc4ZSIsInR5cGUiOiJidWZmZXItcGFyc2VyIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJnIjoiMjNmZDQwNjMwZGJlZjcxMiIsIm5hbWUiOiIiLCJkYXRhIjoicGF5bG9hZCIsImRhdGFUeXBlIjoibXNnIiwic3BlY2lmaWNhdGlvbiI6InNwZWMiLCJzcGVjaWZpY2F0aW9uVHlwZSI6InVpIiwiaXRlbXMiOlt7InR5cGUiOiJib29sIiwibmFtZSI6InJlZCIsIm9mZnNldCI6MCwibGVuZ3RoIjoxLCJvZmZzZXRiaXQiOjAsInNjYWxlIjoiMSIsIm1hc2siOiIifSx7InR5cGUiOiJib29sIiwibmFtZSI6InllbGxvdyIsIm9mZnNldCI6MCwibGVuZ3RoIjoxLCJvZmZzZXRiaXQiOjEsInNjYWxlIjoiMSIsIm1hc2siOiIifSx7InR5cGUiOiJib29sIiwibmFtZSI6ImdyZWVuIiwib2Zmc2V0IjowLCJsZW5ndGgiOjEsIm9mZnNldGJpdCI6Miwic2NhbGUiOiIxIiwibWFzayI6IiJ9LHsidHlwZSI6ImJvb2wiLCJuYW1lIjoiYWxsIiwib2Zmc2V0IjowLCJsZW5ndGgiOjE2LCJvZmZzZXRiaXQiOjAsInNjYWxlIjoiMSIsIm1hc2siOiIifV0sInN3YXAxIjoiIiwic3dhcDIiOiIiLCJzd2FwMyI6IiIsInN3YXAxVHlwZSI6InN3YXAiLCJzd2FwMlR5cGUiOiJzd2FwIiwic3dhcDNUeXBlIjoic3dhcCIsIm1zZ1Byb3BlcnR5IjoicGF5bG9hZCIsIm1zZ1Byb3BlcnR5VHlwZSI6InN0ciIsInJlc3VsdFR5cGUiOiJrZXl2YWx1ZSIsInJlc3VsdFR5cGVUeXBlIjoicmV0dXJuIiwibXVsdGlwbGVSZXN1bHQiOmZhbHNlLCJmYW5PdXRNdWx0aXBsZVJlc3VsdCI6ZmFsc2UsInNldFRvcGljIjp0cnVlLCJvdXRwdXRzIjoxLCJ4Ijo1MzAsInkiOjM4MCwid2lyZXMiOltbImE4ZWExNjIyZDFmYWQ0YmEiXV19LHsiaWQiOiJkNjBhNzRhNTQzMGRmN2FlIiwidHlwZSI6ImJ1ZmZlci1tYWtlciIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwiZyI6IjIzZmQ0MDYzMGRiZWY3MTIiLCJuYW1lIjoiIiwic3BlY2lmaWNhdGlvbiI6InNwZWMiLCJzcGVjaWZpY2F0aW9uVHlwZSI6InVpIiwiaXRlbXMiOlt7Im5hbWUiOiIxc3R3b3JkIiwidHlwZSI6InVpbnQxNmxlIiwibGVuZ3RoIjoxLCJkYXRhVHlwZSI6Im1zZyIsImRhdGEiOiJwYXlsb2FkIn1dLCJzd2FwMSI6IiIsInN3YXAyIjoiIiwic3dhcDMiOiIiLCJzd2FwMVR5cGUiOiJzd2FwIiwic3dhcDJUeXBlIjoic3dhcCIsInN3YXAzVHlwZSI6InN3YXAiLCJtc2dQcm9wZXJ0eSI6InBheWxvYWQiLCJtc2dQcm9wZXJ0eVR5cGUiOiJzdHIiLCJ4IjozMzAsInkiOjM4MCwid2lyZXMiOltbIjhkOWE5ZGM0MTgzYTc3OGUiXV19XQ=="
---
::



Below is the flow that you can import and deploy into the hosted instance created on FlowFuse. With this flow, you'll have a dashboard to control and monitor the tower lights. Just make sure you have installed `@flowfuse/node-red-dashboard` and `@flowfuse/node-red-dashboard-2-ui-led`, and ensure the hosted instance is in the same FlowFuse team as your remote instance.



::render-flow
---
height: 200
flow: "W3siaWQiOiIxZjU2MDk5ZDUzNzk4Yjk5IiwidHlwZSI6Imdyb3VwIiwieiI6ImViMzUxZTUwMzkwMWQwNGYiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyIxZTZhMzc5YzgzYmFjNmI0IiwiZjAxNTEyNTg4NmZlYzVhNiIsIjc2YzY5NmYxNjBkYjNjYTIiLCIxOTc0Y2ZjNDE3ODk4MTUxIiwiOWM1MDNmZTMxMDgxZGMyZiIsIjk1MDFlMmViNzY5MGEwYjUiXSwieCI6NzQsInkiOjc5LCJ3Ijo2NTIsImgiOjIwMn0seyJpZCI6IjFlNmEzNzljODNiYWM2YjQiLCJ0eXBlIjoidWktYnV0dG9uIiwieiI6ImViMzUxZTUwMzkwMWQwNGYiLCJnIjoiMWY1NjA5OWQ1Mzc5OGI5OSIsImdyb3VwIjoiZDQxMDI4MDlkMjI5Y2I5NSIsIm5hbWUiOiIiLCJsYWJlbCI6IllFTExPVyIsIm9yZGVyIjo1LCJ3aWR0aCI6IjMiLCJoZWlnaHQiOiIyIiwiZW11bGF0ZUNsaWNrIjpmYWxzZSwidG9vbHRpcCI6IiIsImNvbG9yIjoiIiwiYmdjb2xvciI6IiIsImNsYXNzTmFtZSI6IiIsImljb24iOiIiLCJpY29uUG9zaXRpb24iOiJsZWZ0IiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoic3RyIiwidG9waWMiOiJ0b3BpYyIsInRvcGljVHlwZSI6Im1zZyIsImJ1dHRvbkNvbG9yIjoieWVsbG93IiwidGV4dENvbG9yIjoiIiwiaWNvbkNvbG9yIjoiIiwiZW5hYmxlQ2xpY2siOmZhbHNlLCJlbmFibGVQb2ludGVyZG93biI6dHJ1ZSwicG9pbnRlcmRvd25QYXlsb2FkIjoiMSIsInBvaW50ZXJkb3duUGF5bG9hZFR5cGUiOiJudW0iLCJlbmFibGVQb2ludGVydXAiOnRydWUsInBvaW50ZXJ1cFBheWxvYWQiOiIwIiwicG9pbnRlcnVwUGF5bG9hZFR5cGUiOiJudW0iLCJ4IjoxNjAsInkiOjE4MCwid2lyZXMiOltbIjE5NzRjZmM0MTc4OTgxNTEiXV19LHsiaWQiOiJmMDE1MTI1ODg2ZmVjNWE2IiwidHlwZSI6InVpLWJ1dHRvbiIsInoiOiJlYjM1MWU1MDM5MDFkMDRmIiwiZyI6IjFmNTYwOTlkNTM3OThiOTkiLCJncm91cCI6ImQ0MTAyODA5ZDIyOWNiOTUiLCJuYW1lIjoiIiwibGFiZWwiOiJSRUQiLCJvcmRlciI6NCwid2lkdGgiOiIzIiwiaGVpZ2h0IjoiMiIsImVtdWxhdGVDbGljayI6ZmFsc2UsInRvb2x0aXAiOiIiLCJjb2xvciI6IiIsImJnY29sb3IiOiIiLCJjbGFzc05hbWUiOiIiLCJpY29uIjoiIiwiaWNvblBvc2l0aW9uIjoibGVmdCIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6InN0ciIsInRvcGljIjoidG9waWMiLCJ0b3BpY1R5cGUiOiJtc2ciLCJidXR0b25Db2xvciI6InJlZCIsInRleHRDb2xvciI6IiIsImljb25Db2xvciI6IiIsImVuYWJsZUNsaWNrIjpmYWxzZSwiZW5hYmxlUG9pbnRlcmRvd24iOnRydWUsInBvaW50ZXJkb3duUGF5bG9hZCI6IjEiLCJwb2ludGVyZG93blBheWxvYWRUeXBlIjoibnVtIiwiZW5hYmxlUG9pbnRlcnVwIjp0cnVlLCJwb2ludGVydXBQYXlsb2FkIjoiMCIsInBvaW50ZXJ1cFBheWxvYWRUeXBlIjoibnVtIiwieCI6MTUwLCJ5IjoxMjAsIndpcmVzIjpbWyI5NTAxZTJlYjc2OTBhMGI1Il1dfSx7ImlkIjoiNzZjNjk2ZjE2MGRiM2NhMiIsInR5cGUiOiJ1aS1idXR0b24iLCJ6IjoiZWIzNTFlNTAzOTAxZDA0ZiIsImciOiIxZjU2MDk5ZDUzNzk4Yjk5IiwiZ3JvdXAiOiJkNDEwMjgwOWQyMjljYjk1IiwibmFtZSI6IiIsImxhYmVsIjoiR1JFRU4iLCJvcmRlciI6Niwid2lkdGgiOiIzIiwiaGVpZ2h0IjoiMiIsImVtdWxhdGVDbGljayI6ZmFsc2UsInRvb2x0aXAiOiIiLCJjb2xvciI6IiIsImJnY29sb3IiOiIiLCJjbGFzc05hbWUiOiIiLCJpY29uIjoiIiwiaWNvblBvc2l0aW9uIjoibGVmdCIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6InN0ciIsInRvcGljIjoidG9waWMiLCJ0b3BpY1R5cGUiOiJtc2ciLCJidXR0b25Db2xvciI6ImdyZWVuIiwidGV4dENvbG9yIjoiIiwiaWNvbkNvbG9yIjoiIiwiZW5hYmxlQ2xpY2siOmZhbHNlLCJlbmFibGVQb2ludGVyZG93biI6dHJ1ZSwicG9pbnRlcmRvd25QYXlsb2FkIjoiMSIsInBvaW50ZXJkb3duUGF5bG9hZFR5cGUiOiJudW0iLCJlbmFibGVQb2ludGVydXAiOnRydWUsInBvaW50ZXJ1cFBheWxvYWQiOiIwIiwicG9pbnRlcnVwUGF5bG9hZFR5cGUiOiJudW0iLCJ4IjoxNjAsInkiOjI0MCwid2lyZXMiOltbIjljNTAzZmUzMTA4MWRjMmYiXV19LHsiaWQiOiIxOTc0Y2ZjNDE3ODk4MTUxIiwidHlwZSI6InByb2plY3QgbGluayBvdXQiLCJ6IjoiZWIzNTFlNTAzOTAxZDA0ZiIsImciOiIxZjU2MDk5ZDUzNzk4Yjk5IiwibmFtZSI6IlByb2plY3Qgb3V0IG5vZGUgdG8gY29udHJvbCB0aGUgeWVsbG93IGxpZ2h0IiwibW9kZSI6ImxpbmsiLCJicm9hZGNhc3QiOnRydWUsInByb2plY3QiOiJjNTFmMzhjMi02YzgwLTQ0MmEtYTllMi0xMGRkZDY4ZmI2MDYiLCJ0b3BpYyI6ImxpZ2h0X2NvbnRyb2xfeWVsbG93IiwieCI6NTMwLCJ5IjoxODAsIndpcmVzIjpbXX0seyJpZCI6IjljNTAzZmUzMTA4MWRjMmYiLCJ0eXBlIjoicHJvamVjdCBsaW5rIG91dCIsInoiOiJlYjM1MWU1MDM5MDFkMDRmIiwiZyI6IjFmNTYwOTlkNTM3OThiOTkiLCJuYW1lIjoiUHJvamVjdCBvdXQgbm9kZSB0byBjb250cm9sIHRoZSBncmVlbiBsaWdodCIsIm1vZGUiOiJsaW5rIiwiYnJvYWRjYXN0Ijp0cnVlLCJwcm9qZWN0IjoiYzUxZjM4YzItNmM4MC00NDJhLWE5ZTItMTBkZGQ2OGZiNjA2IiwidG9waWMiOiJsaWdodF9jb250cm9sX2dyZWVuIiwieCI6NTIwLCJ5IjoyNDAsIndpcmVzIjpbXX0seyJpZCI6Ijk1MDFlMmViNzY5MGEwYjUiLCJ0eXBlIjoicHJvamVjdCBsaW5rIG91dCIsInoiOiJlYjM1MWU1MDM5MDFkMDRmIiwiZyI6IjFmNTYwOTlkNTM3OThiOTkiLCJuYW1lIjoiUHJvamVjdCBvdXQgbm9kZSB0byBjb250cm9sIHRoZSByZWQgbGlnaHQiLCJtb2RlIjoibGluayIsImJyb2FkY2FzdCI6dHJ1ZSwicHJvamVjdCI6ImM1MWYzOGMyLTZjODAtNDQyYS1hOWUyLTEwZGRkNjhmYjYwNiIsInRvcGljIjoibGlnaHRfY29udHJvbF9yZWQiLCJ4Ijo1MjAsInkiOjEyMCwid2lyZXMiOltdfSx7ImlkIjoiZDQxMDI4MDlkMjI5Y2I5NSIsInR5cGUiOiJ1aS1ncm91cCIsIm5hbWUiOiJHcm91cCAxIiwicGFnZSI6IjYyMDg1Yjk2ZjE3OGY2NDMiLCJ3aWR0aCI6IjMiLCJoZWlnaHQiOjEsIm9yZGVyIjoxLCJzaG93VGl0bGUiOmZhbHNlLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UiLCJncm91cFR5cGUiOiJkZWZhdWx0In0seyJpZCI6IjYyMDg1Yjk2ZjE3OGY2NDMiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJQYWdlIDEiLCJ1aSI6IjAyYzI1ZThhMzBmOTM3OWQiLCJwYXRoIjoiL3BhZ2UxIiwiaWNvbiI6ImhvbWUiLCJsYXlvdXQiOiJub3RlYm9vayIsInRoZW1lIjoiZjZmNWU3YWUzM2JmNjg3OCIsImJyZWFrcG9pbnRzIjpbeyJuYW1lIjoiRGVmYXVsdCIsInB4IjoiMCIsImNvbHMiOiIzIn0seyJuYW1lIjoiVGFibGV0IiwicHgiOiI1NzYiLCJjb2xzIjoiNiJ9LHsibmFtZSI6IlNtYWxsIERlc2t0b3AiLCJweCI6Ijc2OCIsImNvbHMiOiI5In0seyJuYW1lIjoiRGVza3RvcCIsInB4IjoiMTAyNCIsImNvbHMiOiIxMiJ9XSwib3JkZXIiOjEsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiIwMmMyNWU4YTMwZjkzNzlkIiwidHlwZSI6InVpLWJhc2UiLCJuYW1lIjoiTXkgRGFzaGJvYXJkIiwicGF0aCI6Ii9kYXNoYm9hcmQiLCJhcHBJY29uIjoiIiwiaW5jbHVkZUNsaWVudERhdGEiOnRydWUsImFjY2VwdHNDbGllbnRDb25maWciOlsidWktbm90aWZpY2F0aW9uIiwidWktY29udHJvbCJdLCJzaG93UGF0aEluU2lkZWJhciI6ZmFsc2UsInNob3dQYWdlVGl0bGUiOnRydWUsIm5hdmlnYXRpb25TdHlsZSI6ImRlZmF1bHQiLCJ0aXRsZUJhclN0eWxlIjoiaGlkZGVuIn0seyJpZCI6ImY2ZjVlN2FlMzNiZjY4NzgiLCJ0eXBlIjoidWktdGhlbWUiLCJuYW1lIjoiRGVmYXVsdCBUaGVtZSIsImNvbG9ycyI6eyJzdXJmYWNlIjoiI2ZmZmZmZiIsInByaW1hcnkiOiIjMDA5NGNlIiwiYmdQYWdlIjoiIzFhMWExYSIsImdyb3VwQmciOiIjMDAwMDAwIiwiZ3JvdXBPdXRsaW5lIjoiIzAwMDAwMCJ9LCJzaXplcyI6eyJkZW5zaXR5IjoiZGVmYXVsdCIsInBhZ2VQYWRkaW5nIjoiMTJweCIsImdyb3VwR2FwIjoiMTJweCIsImdyb3VwQm9yZGVyUmFkaXVzIjoiNHB4Iiwid2lkZ2V0R2FwIjoiMTJweCJ9fSx7ImlkIjoiODJjYzY5OTdmZGRkMGI0YiIsInR5cGUiOiJncm91cCIsInoiOiJlYjM1MWU1MDM5MDFkMDRmIiwic3R5bGUiOnsic3Ryb2tlIjoiI2IyYjNiZCIsInN0cm9rZS1vcGFjaXR5IjoiMSIsImZpbGwiOiIjZjJmM2ZiIiwiZmlsbC1vcGFjaXR5IjoiMC41IiwibGFiZWwiOnRydWUsImxhYmVsLXBvc2l0aW9uIjoibnciLCJjb2xvciI6IiMzMjMzM2IifSwibm9kZXMiOlsiZDE2M2E3YWIyM2Y3NDU4ZiIsIjIwZDIxMTY4MzUzNDM2MmIiLCJiMTQ3NzE5Mzk1NmU1OTFiIiwiZmI4ODAxYTRhY2NjM2MxNSIsIjJmNjI5NDhhZmNmZGUyNTkiLCI2OTY2ZjEyOWU3MThkMjBhIiwiYTVjZWNmOGU4YWRmNmVlZiJdLCJ4Ijo3NCwieSI6Mjk5LCJ3Ijo4NzIsImgiOjIwMn0seyJpZCI6ImQxNjNhN2FiMjNmNzQ1OGYiLCJ0eXBlIjoidWktbGVkIiwieiI6ImViMzUxZTUwMzkwMWQwNGYiLCJnIjoiODJjYzY5OTdmZGRkMGI0YiIsIm5hbWUiOiJTdGF0dXMgb2YgUkVEIGxpZ2h0IiwiZ3JvdXAiOiJkNDEwMjgwOWQyMjljYjk1Iiwib3JkZXIiOjEsIndpZHRoIjoiMSIsImhlaWdodCI6IjMiLCJsYWJlbCI6IiIsImxhYmVsUGxhY2VtZW50IjoibGVmdCIsImxhYmVsQWxpZ25tZW50IjoibGVmdCIsInN0YXRlcyI6W3sidmFsdWUiOiJ0cnVlIiwidmFsdWVUeXBlIjoiYm9vbCIsImNvbG9yIjoiI2ZmMDAwMCJ9LHsidmFsdWUiOiJmYWxzZSIsInZhbHVlVHlwZSI6ImJvb2wiLCJjb2xvciI6IiM3ODc4NzgifV0sImFsbG93Q29sb3JGb3JWYWx1ZUluTWVzc2FnZSI6ZmFsc2UsInNoYXBlIjoiY2lyY2xlIiwic2hvd0JvcmRlciI6dHJ1ZSwic2hvd0dsb3ciOnRydWUsIngiOjgxMCwieSI6MzQwLCJ3aXJlcyI6W119LHsiaWQiOiIyMGQyMTE2ODM1MzQzNjJiIiwidHlwZSI6InVpLWxlZCIsInoiOiJlYjM1MWU1MDM5MDFkMDRmIiwiZyI6IjgyY2M2OTk3ZmRkZDBiNGIiLCJuYW1lIjoiU3RhdHVzIG9mIFllbGxvdyBsaWdodCIsImdyb3VwIjoiZDQxMDI4MDlkMjI5Y2I5NSIsIm9yZGVyIjoyLCJ3aWR0aCI6IjEiLCJoZWlnaHQiOiIzIiwibGFiZWwiOiIiLCJsYWJlbFBsYWNlbWVudCI6ImxlZnQiLCJsYWJlbEFsaWdubWVudCI6ImxlZnQiLCJzdGF0ZXMiOlt7InZhbHVlIjoidHJ1ZSIsInZhbHVlVHlwZSI6ImJvb2wiLCJjb2xvciI6IiNjOGZmMDAifSx7InZhbHVlIjoiZmFsc2UiLCJ2YWx1ZVR5cGUiOiJib29sIiwiY29sb3IiOiIjNzg3ODc4In1dLCJhbGxvd0NvbG9yRm9yVmFsdWVJbk1lc3NhZ2UiOmZhbHNlLCJzaGFwZSI6ImNpcmNsZSIsInNob3dCb3JkZXIiOnRydWUsInNob3dHbG93Ijp0cnVlLCJ4Ijo4MjAsInkiOjQwMCwid2lyZXMiOltdfSx7ImlkIjoiYjE0NzcxOTM5NTZlNTkxYiIsInR5cGUiOiJ1aS1sZWQiLCJ6IjoiZWIzNTFlNTAzOTAxZDA0ZiIsImciOiI4MmNjNjk5N2ZkZGQwYjRiIiwibmFtZSI6IlN0YXR1cyBvZiBHcmVlbiBsaWdodCIsImdyb3VwIjoiZDQxMDI4MDlkMjI5Y2I5NSIsIm9yZGVyIjozLCJ3aWR0aCI6IjEiLCJoZWlnaHQiOiIzIiwibGFiZWwiOiIiLCJsYWJlbFBsYWNlbWVudCI6ImxlZnQiLCJsYWJlbEFsaWdubWVudCI6ImxlZnQiLCJzdGF0ZXMiOlt7InZhbHVlIjoidHJ1ZSIsInZhbHVlVHlwZSI6ImJvb2wiLCJjb2xvciI6IiM0MTg5MWEifSx7InZhbHVlIjoiZmFsc2UiLCJ2YWx1ZVR5cGUiOiJib29sIiwiY29sb3IiOiIjNzg3ODc4In1dLCJhbGxvd0NvbG9yRm9yVmFsdWVJbk1lc3NhZ2UiOmZhbHNlLCJzaGFwZSI6ImNpcmNsZSIsInNob3dCb3JkZXIiOnRydWUsInNob3dHbG93Ijp0cnVlLCJ4Ijo4MjAsInkiOjQ2MCwid2lyZXMiOltdfSx7ImlkIjoiZmI4ODAxYTRhY2NjM2MxNSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZWIzNTFlNTAzOTAxZDA0ZiIsImciOiI4MmNjNjk5N2ZkZGQwYjRiIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5yZWQiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NjAwLCJ5IjozNDAsIndpcmVzIjpbWyJkMTYzYTdhYjIzZjc0NThmIl1dfSx7ImlkIjoiMmY2Mjk0OGFmY2ZkZTI1OSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZWIzNTFlNTAzOTAxZDA0ZiIsImciOiI4MmNjNjk5N2ZkZGQwYjRiIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC55ZWxsb3ciLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NjAwLCJ5Ijo0MDAsIndpcmVzIjpbWyIyMGQyMTE2ODM1MzQzNjJiIl1dfSx7ImlkIjoiNjk2NmYxMjllNzE4ZDIwYSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZWIzNTFlNTAzOTAxZDA0ZiIsImciOiI4MmNjNjk5N2ZkZGQwYjRiIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5ncmVlbiIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo2MDAsInkiOjQ2MCwid2lyZXMiOltbImIxNDc3MTkzOTU2ZTU5MWIiXV19LHsiaWQiOiJhNWNlY2Y4ZThhZGY2ZWVmIiwidHlwZSI6InByb2plY3QgbGluayBpbiIsInoiOiJlYjM1MWU1MDM5MDFkMDRmIiwiZyI6IjgyY2M2OTk3ZmRkZDBiNGIiLCJuYW1lIjoicHJvamVjdCBpbiBub2RlIHRvIHJlY2VpdmUgdGhlIGxpZ2h0IHN0YXR1cyIsInByb2plY3QiOiJhbGwiLCJicm9hZGNhc3QiOnRydWUsInRvcGljIjoibGlnaHRfc3RhdHVzIiwieCI6MjYwLCJ5Ijo0MDAsIndpcmVzIjpbWyJmYjg4MDFhNGFjY2MzYzE1IiwiMmY2Mjk0OGFmY2ZkZTI1OSIsIjY5NjZmMTI5ZTcxOGQyMGEiXV19XQ=="
---
::



## Troubleshooting 

When you try to establish a connection with the PLC, you may encounter the following error. This error occurs because your device has established the connection but is unable to communicate. To resolve this issue, ensure that you have configured all the settings mentioned in the prerequisites. If the problem persists, it could be because your PLC and the device running Node-RED are on different networks.

!["Error: This service is not implemented on the modeul or frame error was reported"](/blog/2025/01/images/error.png){data-zoomable}
_"Error: This service is not implemented on the modeul or frame error was reported"_

Make sure the IP addresses of your device and PLC are in the same subnet. If the PLC is connected to the internet via a router, all devices (PLC, Node-RED device, and router) should have IP addresses within the same subnet. For example, if your PLC has the address 192.168.1.1, ensure that the other devices have IP addresses in the range 192.168.1.x.

## Conclusion 

Integrating Siemens S7 PLCs with Node-RED opens up powerful automation possibilities with minimal complexity. By following the steps outlined in this guide, you can easily connect your PLC to Node-RED, control devices, and visualize real-time data on dashboards. Whether you're writing data to control outputs or reading sensor values, Node-RED offers a flexible, user-friendly platform for industrial automation.

Beyond Siemens S7, FlowFuse connects Allen-Bradley, Omron, Beckhoff, and any Modbus or OPC UA-enabled PLC to MQTT, cloud, and enterprise systems. See the [FlowFuse PLC integration overview](/landing/plc/) for all supported protocols and use cases.