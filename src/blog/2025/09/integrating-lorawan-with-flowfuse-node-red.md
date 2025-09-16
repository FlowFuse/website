---
title: "Integrating LoRaWAN with FlowFuse Node-RED"
subtitle: "Connect your IoT sensors to the cloud with ease"
description: "Learn how to seamlessly integrate LoRaWAN devices with FlowFuse Node-RED using The Things Network. This comprehensive guide covers MQTT setup, data processing methods, and real-time sensor data visualization for scalable IoT applications."
date: 2025-09-16
authors: ["sumit-shinde"]
image:
keywords: LoRaWAN", FlowFuse", Node-RED, IoT integration, The Things Network, TTN, MQTT
tags:
    - flowfuse
---

LoRaWAN (Long Range Wide Area Network) is a low-power wireless protocol designed for IoT devices that need to transmit small amounts of data over long distances. FlowFuse Node-RED is a cloud-based platform that provides a visual programming interface for connecting IoT devices and services.

<!--more-->

By combining LoRaWAN with FlowFuse Node-RED, you can easily collect data from remote sensors, process it, and integrate it with other systems or dashboards—all without writing complex code. In this article, we will guide you through setting up the integration and creating your first data processing flows.

## **What is LoRaWAN and How Does It Work?**

LoRaWAN is designed for devices that need to send small amounts of data over long distances while using very little battery power. Your sensors can communicate up to 15 kilometers away and run for years on a single battery.

The system has three main parts:
- **End devices** - Your sensors that collect and send data
- **Gateways** - These receive data from your sensors and pass it along
- **Network server** - Manages everything and sends your data to applications

**[The Things Network (TTN)](https://www.thethingsnetwork.org/)** is a free, global LoRaWAN network with thousands of gateways around the world. It's perfect for getting started with LoRaWAN projects and provides easy-to-use tools for managing your devices.

In this article, we'll leverage The Things Network as our LoRaWAN infrastructure, demonstrating how to connect TTN with FlowFuse Node-RED to create powerful IoT applications that can scale from proof-of-concept to production deployments.

## **Getting Started**

Now that we understand the basics of LoRaWAN and TTN, let's set up the integration with FlowFuse Node-RED.

### **Prerequisites**

Before we begin, make sure you have the following components ready:

1. **Node-RED instance** – Ensure you have a running Node-RED instance. The quickest way to set one up is through FlowFuse. Sign up, create your instance, and you can manage, deploy, and scale your flows easily.

2. **LoRaWAN device and gateway registered on TTN** – You need a sensor or device connected to The Things Network (TTN) and a gateway that can receive its uplinks.

If you do not have a LoRaWAN device, you can simulate one using available tools. For this guide, I am using the [LWN-Simulator](https://github.com/UniCT-ARSLab/LWN-Simulator).

## **Setting Up TTN MQTT Connection**

The Things Network provides MQTT integration that allows external applications to receive uplink messages from your devices. We'll use this to connect TTN with FlowFuse Node-RED.

### Step 1: Getting TTN Connection Details

1. Log into your **The Things Network Console** (https://console.thethingsnetwork.org)
2. Navigate to your application
3. Go to the **Other Integrations** tab and select **MQTT**
4. Note down the following connection details:
   - **Server Address**: `nam1.cloud.thethings.network` (for North America region)
   - **Port**: `1883` (for non-TLS) or `8883` (for TLS)
   - **Username**: Your application ID
   - **Password**: Your API key

![Screenshot of The Things Network console showing MQTT integration details including server address, port, username, and API key](./images/mqtt-connection-details.png){data-zoomable}
_Screenshot of The Things Network console showing MQTT integration details including server address, port, username, and API key_

### Step 2: Configure MQTT Node in Node-RED

1. Open your FlowFuse Node-RED instance Editor.
2. Drag an **MQTT In** node from the palette onto your workspace
3. Double-click the node to configure it:
   - **Server**: Add a new MQTT broker configuration
   - **Host**: Enter your TTN server address (e.g., `nam1.cloud.thethings.network`)
   - **Port**: `1883` or `8883` (if using TLS)
   - **Username**: Your TTN application ID
   - **Password**: Your TTN API key
   - **Topic**: `v3/{application-id}/devices/{device-id}/up` (replace with your actual application and device IDs)

4. Click **Done** to save the configuration
5. Connect a **Debug** node to the output of your MQTT In node
6. Deploy the flow by clicking the **Deploy** button
7. Open the **Debug** panel to see incoming messages from your LoRaWAN device

The messages you receive will be in JSON format and contain various fields as following:

| **Field**                        | **Description**                                                 |
| -------------------------------- | --------------------------------------------------------------- |
| `end_device_ids.device_id`       | Unique identifier of the device in TTN                          |
| `end_device_ids.dev_eui`         | Globally unique hardware identifier (EUI) of the device         |
| `end_device_ids.join_eui`        | Identifier used during device activation (JoinEUI/AppEUI)       |
| `end_device_ids.dev_addr`        | Device address assigned by the network                          |
| `received_at`                    | Timestamp when TTN received the message                         |
| `uplink_message.f_port`          | LoRaWAN port number (used to separate types of payloads)        |
| `uplink_message.f_cnt`           | Frame counter for tracking uplinks                              |
| `uplink_message.frm_payload`     | Raw payload in Base64 format                                    |
| `uplink_message.decoded_payload` | Decoded values (requires a payload formatter in TTN)            |
| `uplink_message.rx_metadata`     | Metadata per gateway (includes RSSI, SNR, gateway ID, etc.)     |
| `uplink_message.settings`        | Radio parameters (frequency, data rate, spreading factor, etc.) |
| `uplink_message.received_at`     | Timestamp when TTN processed the uplink                         |
| `correlation_ids`                | IDs used internally to correlate events across the TTN stack    |

## **Processing Sensor Data**

Let's add some processing to extract and format the sensor data. Choose one of these two methods:

### **Method 1: Using Nodes (Visual Approach)**

This approach uses pre-built nodes and requires minimal coding. Install `node-red-node-base64` and `node-red-contrib-buffer-parser`.

1. Drag a **Change** node and set `msg.payload` to `msg.payload.uplink_message.frm_payload`
2. Drag a **base64** node and set the action to "Decode" (converts Base64 string to Buffer)
3. Drag the **buffer parser** node and configure elements based on your sensor's data format
4. Click the "+" button to add each element and fill in the following fields for each data point you want to extract:

**Example Configuration for Temperature/Humidity Sensor:**
| **Element** | **Type** | **Name** | **Length** | **Offset** | **Scale** |
|-------------|----------|----------|------------|------------|-----------|
| 1 | int16be | temperature | 2 | 0 | 0.01 |
| 2 | int16be | humidity | 2 | 2 | 0.01 |

**Quick Parameter Guide:**
- **Type**: How to read the bytes (`int16be` = 2-byte big-endian signed integer, `uint8` = 1-byte unsigned integer)
- **Name**: What to call it in your output (becomes `msg.payload.temperature`)
- **Length**: Number of bytes to read (2 for `int16be`, 1 for `uint8`)
- **Offset**: Where to start reading (0 = first byte, 2 = third byte, etc.)
- **Scale**: Math to apply (0.01 = divide by 100, 1 = no scaling)

5. Connect the MQTT in node to the input of change node, change node output to base64 node and base64 node output to the input of buffer parser and add the debug node at the end to see the output.
6. Deploy the flow.

### **Method 2: Using Function Node (Code Approach)**

This method gives you full control over the data processing using JavaScript. It's ideal when you need custom logic, complex calculations, or want to handle multiple payload formats dynamically.

1. Drag a **Function** node onto your workspace
2. Double-click to open the editor and paste the following code:

```javascript
// Extract the Base64 encoded payload
const base64Payload = msg.payload.uplink_message.frm_payload;

if (!base64Payload) {
    node.warn("No payload found in message");
    return null;
}

// Convert Base64 to Buffer
const buffer = Buffer.from(base64Payload, 'base64');

// Parse the buffer based on your sensor's data format
// Example: Temperature/Humidity sensor with 2 bytes each, big-endian, scaled by 0.01
const parsedData = {
    temperature: buffer.readInt16BE(0) * 0.01,  // Read bytes 0-1
    humidity: buffer.readInt16BE(2) * 0.01,     // Read bytes 2-3
};

// Add payload validation
if (parsedData.temperature < -40 || parsedData.temperature > 85) {
    node.warn(`Temperature out of range: ${parsedData.temperature}`);
}

if (parsedData.humidity < 0 || parsedData.humidity > 100) {
    node.warn(`Humidity out of range: ${parsedData.humidity}`);
}

// Set the processed data as the new payload
msg.payload = parsedData;

return msg;
```

3. Connect the MQTT in node to the input of change node, change node output to the input of function node and add the debug node at the end to see the output.
4. Deploy the flow.

*Tip: You don't need to know JavaScript! [FlowFuse Assistant](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/) can generate JavaScript code for you. Just describe what you want in plain English and it will generate the function node code for you.*

Now you will see the object with the parsed sensor data in the debug panel. The output will show something like:

```json
{
  "temperature": 21.5,
  "humidity": 57.2
}
```

As you can see in the image below, The Things Network console shows live data on the left side, and FlowFuse Node-RED successfully reads and processes it on the right side, demonstrating the complete integration working in real-time.

![Image showing The Things Network console with live uplink messages on the left and FlowFuse Node-RED debug panel with processed sensor data on the right"](./images/live-data-ttn-ff1.gif){data-zoomable}
_Image showing The Things Network console with live uplink messages on the left and FlowFuse Node-RED debug panel with processed sensor data on the right_

## **Next Steps**

Next, you can store this data in a database. With FlowFuse, a managed PostgreSQL database is already provided—so you do not need to install or configure one manually. FlowFuse also offers a **Query node** that is automatically configured for your instance. Inside the Query node, you can use **FlowFuse Assistant**, which allows you to write natural language prompts instead of SQL queries. The assistant will generate SQL automatically based on your table schema.

For a complete guide on storing and visualizing data, see the article on [Building Historical Data Dashboards with FlowFuse Tables](https://flowfuse.com/blog/2025/08/time-series-dashboard-flowfuse-postgresql/). It also includes step-by-step instructions for creating dashboards using [FlowFuse Dashboard](https://dashboard.flowfuse.com/)—a low-code way to build powerful industrial dashboards.

If you're interested in exploring FlowFuse further for your industrial IoT applications, you can visit us at our booth at upcoming Things Network conferences to see live manufacturing demos, [book a demo](/book-demo/) to discover how FlowFuse can streamline your industrial IoT development and deployment processes, or [start your free trial](https://app.flowfuse.com/account/create) to build your first LoRaWAN-enabled manufacturing dashboard today.
