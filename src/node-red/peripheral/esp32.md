---
eleventyNavigation:
  key: "ESP32"
  parent: "Peripheral Devices"
meta:
  title: Connect ESP32 with Node-RED using MQTT
  description: Learn how to send and receive MQTT messages between ESP32 and Node-RED using FlowFuse.
  keywords: node-red, flowfuse, esp32, mqtt, esp32 node-red
image: /node-red/peripheral/images/esp32-with-node-red.png
---

# {{meta.title}}

This documentation explains how to establish MQTT-based communication between an ESP32 microcontroller and Node-RED using FlowFuse.

## Requirements

To follow this guide, ensure you have the following components ready:

- **ESP32 device**  
  The device must be programmed with firmware that supports MQTT communication.

- **MQTT broker**  
  A server that facilitates message exchange between the ESP32 and Node-RED.  
  > If you do not already have one, [FlowFuse](/) provides a built-in MQTT broker as part of its platform.

- **Node-RED instance**  
  A running instance of Node-RED to process and visualize data from the ESP32.  
  > The quickest way to get started is with [FlowFuse Cloud](/). It allows you to deploy and manage Node-RED instances effortlessly.

- **Two MQTT clients**  
  Create two separate clients in the MQTT broker:
  - One for the **ESP32**
  - One for **Node-RED**

## Step 1: Set Up MQTT Clients in FlowFuse

To create the necessary MQTT clients (one for ESP32 and one for Node-RED), follow the official guide:

👉 [Creating MQTT Clients in FlowFuse](/docs/cloud/introduction/#enterprise-team-broker)

Once created, note down the client ID, username, and password for each client. These credentials will be used to authenticate both devices.

## Step 2: Configure Node-RED to Communicate Over MQTT

1. Open the Node-RED editor.
2. Add `mqtt in` or `mqtt out` nodes from the palette.
3. Double-click a node to open the configuration dialog.
4. Set the following fields:
   - **Server**: `broker.flowfuse.cloud`
   - **Client ID**: (as configured in FlowFuse)
   - **Username**: (MQTT username)
   - **Password**: (MQTT password)
5. Set a topic (e.g., `/esp32/control` or `/esp32/data`) depending on whether you are sending or receiving data.

Once configured and deployed, the Node-RED flow can exchange messages with the ESP32 through these MQTT topics.

## Step 3: ESP32 Device Behavior

To enable your ESP32 to communicate with Node-RED over MQTT, follow these steps:

1. Connect the ESP32 to your Wi-Fi network using your SSID and password.
2. Connect the ESP32 to the FlowFuse MQTT broker (`broker.flowfuse.cloud`) using the MQTT credentials created in Step 1.
3. Subscribe to an MQTT topic that matches the topic configured in Node-RED (e.g., `/esp32/control`) to listen for incoming commands.
4. Implement behavior to react to messages—such as toggling a GPIO pin or updating a sensor reading based on the received payload.
5. Publish messages back to Node-RED on another topic (e.g., `/esp32/sensor`) with telemetry or status data. Payloads can be simple values or structured as JSON.

🔗 For a complete end-to-end example, see: [Interacting with ESP32 Using Node-RED and MQTT](https://flowfuse.com/blog/2024/11/interacting-with-esp32-using-node-red-and-mqtt/)
