---
title: "OPC UA Tutorial: Connect and Exchange Data with Industrial Equipment"
subtitle: "A practical guide to accessing industrial data through OPC UA server gateways"
description: "OPC UA tutorial: Connect Node-RED to industrial PLCs step-by-step. Configure Kepware endpoints, read/write Siemens S7 tags, browse Allen-Bradley data. Free guide."
date: 2025-07-16
image: blog/2025/07/images/opcua-tutorial.png
keywords: OPC UA Node-RED tutorial, connect PLC to Node-RED, OPC UA example, Node-RED industrial IoT, OPC UA browser Node-RED, read PLC data Node-RED, OPC UA client configuration, Kepware Node-RED, OPC UA port 4840, industrial automation tutorial
authors: ["sumit-shinde"]
tags:
   - flowfuse
   - opcua
meta:
  faq:
  - question: "How do I connect Node-RED to an OPC UA server?"
    answer: "Install the node-red-contrib-opcua package from the Node-RED Palette Manager. Then, drag an OPC UA Client node onto your flow, configure the endpoint URL (typically opc.tcp://[IP]:4840), set security to None for testing, and connect it to OPC UA Item nodes to read or write specific tags."
  - question: "What is the default OPC UA port number?"
    answer: "The default OPC UA port is 4840 for standard TCP connections and 4843 for secure connections. However, these can be configured differently in your OPC UA server settings. Always check your server documentation for the correct port."
  - question: "Can Node-RED connect to a Kepware OPC server?"
    answer: "Yes, Node-RED can connect to Kepware using the OPC UA protocol. Kepware includes a built-in OPC UA server interface. Use the endpoint URL from Kepware’s OPC UA Configuration in your Node-RED OPC UA Client node."
  - question: "How do I find an OPC UA Node ID?"
    answer: "Use the OPC UA Browser node in Node-RED to explore the server’s address space. Start with ns=0;i=85 (root Objects folder) and navigate through the hierarchy. Each tag will show its Node ID in the format ns=[namespace];i=[identifier] or ns=[namespace];s=[string identifier]."
  - question: "What is the difference between OPC UA and MQTT?"
    answer: "OPC UA is designed for industrial automation with built-in information modeling, security, and complex data types. MQTT is a lightweight publish-subscribe protocol ideal for IoT. OPC UA provides richer context and methods, while MQTT excels at simple, efficient message transport. Many systems use both—OPC UA for equipment integration and MQTT for cloud connectivity."
  - question: "Is OPC UA free to use?"
    answer: "The OPC UA specification is open and free to implement. Many open-source clients and servers are available at no cost. However, commercial OPC UA servers (like Kepware or MatrikonOPC) and some certified stacks require licenses. OPC Foundation membership is optional unless you need certification."
  - question: "Can OPC UA work without internet?"
    answer: "Yes, OPC UA works perfectly on local networks without internet access. It is commonly deployed on isolated industrial networks for security. OPC UA only requires network connectivity between the client and server—this can be a local LAN, industrial network, or even a direct connection."
  - question: "How do I test an OPC UA connection?"
    answer: "Use free tools like UaExpert or Prosys OPC UA Browser to test connections before implementing them in Node-RED. These tools let you browse the address space, read values, and verify security settings. In Node-RED, use the Browser node with a Debug node to test connectivity."
  - question: "What causes the OPC UA BadNodeIdUnknown error?"
    answer: "This error means the Node ID you are trying to access does not exist on the server. Common causes include an incorrect namespace index (ns=), invalid identifier format, or a tag that was removed or renamed. Use the Browser node to verify the exact Node ID format from the server."
  - question: "Can multiple clients connect to one OPC UA server?"
    answer: "Yes, OPC UA servers support multiple simultaneous client connections. The exact number depends on the server implementation and licensing. Most industrial OPC UA servers handle 10–100+ concurrent clients. Each client maintains its own session and can have different security levels and access rights."
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

[Get started →]({% include "sign-up-url.njk" %})

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

![OPC UA endpoint configuration](./images/opcua-endpoint-config.png){data-zoomable}
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

![OPC UA Browser node](./images/opcua-browser.png){data-zoomable} 
_OPC UA Browser node_

{% renderFlow 300 %}
[{"id":"c3a8303048e6588f","type":"OpcUa-Browser","z":"f66e9c91c269e7fb","endpoint":"c0f8c79fc00845c8","item":"","datatype":"","topic":"ns=0;i=85","items":[],"name":"","x":510,"y":300,"wires":[["3428199852f9fcdc"]]},{"id":"1549f797c58ba667","type":"inject","z":"f66e9c91c269e7fb","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":280,"y":300,"wires":[["c3a8303048e6588f"]]},{"id":"3428199852f9fcdc","type":"debug","z":"f66e9c91c269e7fb","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":740,"y":300,"wires":[]},{"id":"c0f8c79fc00845c8","type":"OpcUa-Endpoint","endpoint":"","secpol":"None","secmode":"None","none":true,"login":false,"usercert":false,"usercertificate":"","userprivatekey":""}]
{% endrenderFlow %}

### Reading Tag Values

Once you know the Node IDs, you can start reading data from your industrial equipment through the OPC UA server.

#### Reading a Single Tag

Here’s how to read a single value in real time:

1. Drag an **Inject** node onto the canvas (this will trigger the read operation).
2. Add an **OPC UA Item** node and configure:
   - **Node ID**: Enter the tag’s identifier (e.g., `ns=3;i=1003`)
   - **Data Type**: Select the appropriate type (e.g., `Boolean`)

   ![OPC UA Item node configuration](./images/opcua-item-node.png){data-zoomable}

3. Connect the output of the **Inject** node to the input of the **Item** node.
4. Add an **OPC UA Client** node and set its **Action** to `read`.

   ![OPC UA Client node configured for reading](./images/opcua-client-read-node.png){data-zoomable}

5. Select the endpoint configuration you created earlier.
6. Connect the output of the **Item** node to the input of the **Client** node, then connect the **Client** node's top output to a **Debug** node.

> The **OPC UA Client** node has three outputs: the top carries the data payload, the middle indicates connection status, and the bottom provides raw responses for debugging.

7. Deploy the flow and click the **Inject** button to trigger the read.

You should see the tag value appear in the debug panel. This confirms that communication is working correctly.

You can also pass the Node ID dynamically using `msg.topic` from the Inject node if you prefer not to use an Item node.

{% renderFlow 300 %}
[{"id":"d128582dda7adbed","type":"OpcUa-Client","z":"ead97ed756a13a15","endpoint":"a4df18253e5a79a0","action":"read","deadbandtype":"a","deadbandvalue":1,"time":10,"timeUnit":"s","certificate":"n","localfile":"","localkeyfile":"","securitymode":"None","securitypolicy":"None","useTransport":false,"maxChunkCount":1,"maxMessageSize":8192,"receiveBufferSize":8192,"sendBufferSize":8192,"setstatusandtime":false,"keepsessionalive":false,"name":"","x":580,"y":240,"wires":[["3fc16bf912f16169"],["17724a6889ec7378"],["c6b0f16ef7371699"]]},{"id":"3fc16bf912f16169","type":"debug","z":"ead97ed756a13a15","name":"Tag Value","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":740,"y":200,"wires":[]},{"id":"2691196551812a21","type":"OpcUa-Item","z":"ead97ed756a13a15","item":"ns=3;i=1001","datatype":"Boolean","value":"","name":"OPC UA Item Node","x":370,"y":240,"wires":[["d128582dda7adbed"]]},{"id":"96d17841a7f13ac4","type":"inject","z":"ead97ed756a13a15","name":"Read tag","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":200,"y":200,"wires":[["2691196551812a21"]]},{"id":"17724a6889ec7378","type":"debug","z":"ead97ed756a13a15","name":"Errors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":730,"y":240,"wires":[]},{"id":"c6b0f16ef7371699","type":"debug","z":"ead97ed756a13a15","name":"Raw Respons","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":760,"y":280,"wires":[]},{"id":"a4df18253e5a79a0","type":"OpcUa-Endpoint","endpoint":"opc.tcp://192.168.0.10:4840","secpol":"None","secmode":"None","none":true,"login":false,"usercert":false,"usercertificate":"","userprivatekey":""}]
{% endrenderFlow %}

#### Reading Multiple Tags

Batch reading improves performance when you need multiple data points from your equipment

1. Drag an **OPC UA Client** node and set its **Action** to "READ MULTIPLE".

![Screenshot showing OPC UA Client node with "READ MULTIPLE" action selected](./images/read-multiple.png){data-zoomable}  
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

{% renderFlow 300 %}
[{"id":"6f5e2b1cbce15025","type":"OpcUa-Client","z":"ead97ed756a13a15","endpoint":"","action":"readmultiple","deadbandtype":"a","deadbandvalue":1,"time":10,"timeUnit":"s","certificate":"n","localfile":"","localkeyfile":"","useTransport":false,"maxChunkCount":"","maxMessageSize":"","receiveBufferSize":"","sendBufferSize":"","setstatusandtime":false,"keepsessionalive":false,"name":"","x":580,"y":500,"wires":[["28b575f06bbbe7a7"],["139d346aab204f2f"],["3497d5566fb78f5f"]]},{"id":"4daa958d34c648c5","type":"OpcUa-Item","z":"ead97ed756a13a15","item":"ns=5;s=Counter1","datatype":"Int32","value":"","name":"","x":380,"y":480,"wires":[["6f5e2b1cbce15025"]]},{"id":"baa2733ca1fcb69d","type":"inject","z":"ead97ed756a13a15","name":"Add item","repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":200,"y":480,"wires":[["4daa958d34c648c5"]]},{"id":"dfd96a4dfe6330af","type":"OpcUa-Item","z":"ead97ed756a13a15","item":"ns=5;s=Random1","datatype":"Double","value":"","name":"","x":380,"y":520,"wires":[["6f5e2b1cbce15025"]]},{"id":"b8d5e40a98b1fb9f","type":"inject","z":"ead97ed756a13a15","name":"Add item","repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":200,"y":520,"wires":[["dfd96a4dfe6330af"]]},{"id":"3f63c46f499c3bca","type":"inject","z":"ead97ed756a13a15","name":"Read multiple items","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"readmultiple","payload":"","payloadType":"str","x":370,"y":440,"wires":[["6f5e2b1cbce15025"]]},{"id":"75c7927996cf44c2","type":"inject","z":"ead97ed756a13a15","name":"Clear nodeId array","repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"clearitems","payload":"","payloadType":"str","x":370,"y":560,"wires":[["6f5e2b1cbce15025"]]},{"id":"28b575f06bbbe7a7","type":"debug","z":"ead97ed756a13a15","name":"Tag Value","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":760,"y":460,"wires":[]},{"id":"139d346aab204f2f","type":"debug","z":"ead97ed756a13a15","name":"Errors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":750,"y":500,"wires":[]},{"id":"3497d5566fb78f5f","type":"debug","z":"ead97ed756a13a15","name":"Raw Response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":540,"wires":[]}]
{% endrenderFlow %}

### Writing Values

In addition to reading data, OPC UA also allows you to write control signals or parameters to your equipment.

#### Writing a Single Tag

To write a single value:

1. Drag an **Inject** node onto the canvas (used to trigger the write operation).
2. Add an **OPC UA Item** node and configure:
   - **Node ID**: Enter the target identifier.
   - **Data Type**: Choose the appropriate type (e.g., `Boolean`, `Double`).
   - **Value**: Enter the value to write.

   ![Screenshot showing OPC UA Item node configuration for write operation](./images/opcua-item-node-write.png){data-zoomable}  
   _OPC UA Item node configured for a write operation_

3. Connect the **Inject** node to the **Item** node.
4. Add an **OPC UA Client** node and set its **Action** to `WRITE`.

   ![Screenshot showing OPC UA Client node with "WRITE" action selected](./images/opcua-client-write-ops.png){data-zoomable}  
   _OPC UA Client node with "WRITE" action selected_

5. Select the endpoint configuration you created earlier.
6. Connect the **Item** node to the **Client** node, then connect the **Client** node's top output to a **Debug** node.
7. Deploy the flow and click the **Inject** button to trigger the write.

The OPC UA Client node will confirm the operation with a status like **"values written"**.

{% renderFlow 300 %}
[{"id":"c922a70d48ecba6f","type":"OpcUa-Client","z":"ead97ed756a13a15","endpoint":"","action":"write","deadbandtype":"a","deadbandvalue":1,"time":10,"timeUnit":"s","certificate":"n","localfile":"","localkeyfile":"","useTransport":false,"maxChunkCount":"","maxMessageSize":"","receiveBufferSize":"","sendBufferSize":"","setstatusandtime":false,"keepsessionalive":false,"name":"","x":520,"y":480,"wires":[["7eb010a4671ac181"],["392bb1fd60c29baf"],["e9d279677dbc87e8"]]},{"id":"5ff1e3c2d5977a34","type":"OpcUa-Item","z":"ead97ed756a13a15","item":"ns=5;s=Counter1","datatype":"Int32","value":"20","name":"","x":340,"y":480,"wires":[["c922a70d48ecba6f"]]},{"id":"8cdd141dbdb350c7","type":"inject","z":"ead97ed756a13a15","name":"Write","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":190,"y":480,"wires":[["5ff1e3c2d5977a34"]]},{"id":"7eb010a4671ac181","type":"debug","z":"ead97ed756a13a15","name":"Tag Value","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":680,"y":440,"wires":[]},{"id":"392bb1fd60c29baf","type":"debug","z":"ead97ed756a13a15","name":"Errors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":670,"y":480,"wires":[]},{"id":"e9d279677dbc87e8","type":"debug","z":"ead97ed756a13a15","name":"Raw Response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":700,"y":520,"wires":[]}]
{% endrenderFlow %}

#### Writing Multiple Tags

To write multiple values at once, follow this pattern:

1. Add an **OPC UA Client** node and set its **Action** to `WRITE MULTIPLE`.

   ![Screenshot showing OPC UA Client node with "WRITE MULTIPLE" action selected](./images/opcua-client-write-multiple.png){data-zoomable}  
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

{% renderFlow 300 %}
[{"id":"ed421a9.d6319e8","type":"OpcUa-Client","z":"ead97ed756a13a15","endpoint":"","action":"writemultiple","deadbandtype":"a","deadbandvalue":1,"time":10,"timeUnit":"s","certificate":"n","localfile":"","localkeyfile":"","useTransport":false,"maxChunkCount":"","maxMessageSize":"","receiveBufferSize":"","sendBufferSize":"","setstatusandtime":false,"keepsessionalive":false,"name":"","x":560,"y":420,"wires":[["b0788fb9285c48ea"],["bde690208cbf2c4c"],["0883826b4a0ca030"]]},{"id":"96bd763.14a9308","type":"OpcUa-Item","z":"ead97ed756a13a15","item":"ns=3;i=1007","datatype":"Double","value":"1.0","name":"","x":360,"y":400,"wires":[["ed421a9.d6319e8"]]},{"id":"d8a68c7a.a73008","type":"inject","z":"ead97ed756a13a15","name":"Add item","repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":180,"y":400,"wires":[["96bd763.14a9308"]]},{"id":"8ae51c8c.20bd3","type":"OpcUa-Item","z":"ead97ed756a13a15","item":"ns=3;i=1008","datatype":"Int32","value":"50","name":"","x":360,"y":440,"wires":[["ed421a9.d6319e8"]]},{"id":"1335adce.7f46ba","type":"inject","z":"ead97ed756a13a15","name":"Add item","repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":180,"y":440,"wires":[["8ae51c8c.20bd3"]]},{"id":"2c050a3d.91f496","type":"inject","z":"ead97ed756a13a15","name":"Write multiple items","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"writemultiple","payload":"","payloadType":"str","x":350,"y":360,"wires":[["ed421a9.d6319e8"]]},{"id":"690e4f9f.faeca","type":"inject","z":"ead97ed756a13a15","name":"Clear nodeId array","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"clearitems","payload":"","payloadType":"str","x":350,"y":480,"wires":[["ed421a9.d6319e8"]]},{"id":"b0788fb9285c48ea","type":"debug","z":"ead97ed756a13a15","name":"Tag Value","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":740,"y":380,"wires":[]},{"id":"bde690208cbf2c4c","type":"debug","z":"ead97ed756a13a15","name":"Errors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":730,"y":420,"wires":[]},{"id":"0883826b4a0ca030","type":"debug","z":"ead97ed756a13a15","name":"Raw Response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":760,"y":460,"wires":[]}]
{% endrenderFlow %}

## What’s Next

You’ve now mastered the fundamentals of OPC UA integration—connecting to servers, browsing tags, and reading or writing data. These core building blocks lay the foundation for powerful industrial automation.

In real deployments, you will want more than Inject nodes and debug panels. With **FlowFuse Dashboard 2.0**, you can build full operator interfaces—live gauges, control buttons, trend charts—fully connected to your OPC UA data.

This guide covered the basics, but OPC UA offers far more. In the next article, we will explore:

* Subscriptions for real-time monitoring without polling
* Events and alarms directly from equipment
* Historical data queries for trend analysis
* Method calls to execute functions on your devices

When it is time to move beyond prototypes, **FlowFuse** delivers what industrial systems truly need—remote device management, instant rollbacks with full version control, built-in team collaboration, and high availability you can trust.

If you’re ready to simplify your OPC UA integration and scale industrial workflows with Node-RED, [start your free trial]({% include "sign-up-url.njk" %}) of FlowFuse today.
