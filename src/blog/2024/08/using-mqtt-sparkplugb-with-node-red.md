---
title: Using MQTT Sparkplug B with Node-RED
subtitle: A Practical Guide to integrating MQTT Sparkplug B with Node-RED
description: Explore how MQTT Sparkplug B enhances MQTT with standardized data formats, making integration easier. Learn how to set up Sparkplug B in Node-RED for efficient data management in industrial environments.
date: 2024-08-21
authors: ["sumit-shinde"]
image: 
tags:
   - post
   - nodered
   - mqtt sparkplug b with node-red
---

Connected devices are transforming industries with vast amounts of data, and MQTT is central to this change with its efficient messaging capabilities. However, MQTT’s messaging flexibility can lead to integration challenges due to inconsistent data formats.

<!--more-->

Sparkplug B simplifies these challenges by adding a standardized data format to MQTT, making data management across devices more consistent and easier. In this blog post, we’ll explore how Sparkplug B enhances MQTT, covering everything from basic to advanced, and guiding you through its integration with Node-RED.

## What is MQTT Sparkplug?

*Sparkplug B* is an open-source specification hosted at the Eclipse Foundation that extends MQTT by providing a standardized way to structure data. It ensures that all devices use a consistent message format, simplifying integration and improving data consistency.

Now, imagine a factory where every machine sends data using different formats or terminologies. While parsing this data is possible, it introduces complexity, increases the risk of errors, and complicates maintenance. A consistent data format can greatly simplify integration and reduce these challenges.

![Manufacturing floor where a dashboard isn't monitoring data from devices due to MQTT's lack of standardized data formats](./images/with-plane-mqtt.png){data-zoomable}
_Manufacturing floor where a dashboard isn't monitoring data from devices due to MQTT's lack of standardized data formats_

Sparkplug B addresses these issues by standardizing the data format and structure, making it easier to integrate and manage data from different sources.

![Manufacturing floor where a dashboard is effectively monitoring data from all devices using MQTT Sparkplug B's standardized data format.](./images/with-sparkplug.png){data-zoomable}
_Manufacturing floor where a dashboard is effectively monitoring data from all devices using MQTT Sparkplug B's standardized data format_

## Understanding MQTT Sparkplug B Message Types, Payloads, and Topic Structures

Now that we have an overview of Sparkplug B and its role in standardizing data formats, it’s time to dive deeper into how this protocol structures its payloads and topics. Understanding these details will give you insight into how Sparkplug B efficiently manages data in complex industrial environments and will assist you in implementing it effectively in your own projects.

Sparkplug B utilizes Google Protocol Buffers (Protobufs) for encoding its messages. Protobufs offer a compact and fast way to serialize structured data, preserving MQTT's lightweight nature while introducing a robust framework for handling complex data.

### Types of Sparkplug B Messages

Sparkplug B defines several message types to handle different aspects of device communication:

- **NBIRTH**: Announced when a device initially connects to the system, detailing the metrics it will report.
- **NDATA**: Sent periodically to provide updated values for the device's metrics.
- **NDEATH**: Indicates that a device has disconnected or is no longer available.
- **NCMD**: Allows for sending commands to a device for remote control or configuration.
- **DBIRTH**: Sent immediately upon deployment and connection to the MQTT broker, often used for dynamic configurations or updates.
- **REBIRTH**: Similar to `DBIRTH`, used to announce that a device has reconnected or restarted.
- **DDEATH**: Used to indicate that a device has been removed or is no longer available, complementing `NDEATH`.

### Key Components of a Sparkplug B Payload

When dealing with Sparkplug B messages, such as `NBIRTH`, `NDATA`, `NDEATH`, `NCMD`, `DBIRTH`, `DDEATH`, and `DCMD`, the payloads include several key components.

- **Timestamp**: Every Sparkplug B payload includes a timestamp to record the exact time the data was captured. This is essential for understanding the timing and relevance of the data.

- **Metrics**: Metrics are data points within the payload, crucial for `NBIRTH`, `NDATA`, `DBIRTH`, and `DDEATH` messages. Each metric includes:
  - **Name**: The identifier for the metric (e.g., "Temperature").
  - **Alias**: A shorthand identifier to reduce the payload size.
  - **Timestamp**: The time when the metric was sampled or updated.
  - **Datatype**: The type of data (e.g., Integer, Float, String).
  - **Value**: The actual data being communicated.
  - **Flags**: Indicators such as `is_historical`, `is_transient`, and `is_null`.

- **Sequence Number**: Each message includes a sequence number that increments with each new message. This helps detect any missing messages and ensures data consistency.

- **Command and Parameters** (for `NCMD` and `DCMD` messages): Includes:
  - **Command**: The specific command to be executed (e.g., "Restart").
  - **Parameters**: Additional parameters for the command, if applicable.
  - **Timestamp**: The time when the command was issued.
  - **Sequence Number**: To track the order of commands and ensure correct execution.

### Topic Naming Conventions

To effectively manage and route messages in Sparkplug B, it uses a well-structured topic namespace. This structured approach ensures that messages are organized logically and can be easily identified and processed by different systems

The topic namespace in Sparkplug B follows a specific format:

```
spBv1.0/[Group ID]/[Message Type]/[EON Node ID]/[Device ID]
```

- **[Group ID]**: Represents the group or application context.
- **[Message Type]**: Specifies the type of message (e.g., NBIRTH, NDATA).
- **[EON Node ID]**: Identifies the edge node or system.
- **[Device ID]**: Identifies the specific device (if applicable).

## Using MQTT Sparkplug with Node-RED

In this section, we'll explore an example where Machine1 on the factory floor sends temperature and humidity data to an MQTT broker. We’ll cover how to integrate MQTT Sparkplug B into Node-RED and demonstrate basic operations such as sending and receiving data using MQTT Sparkplug B and more.

### Prequsite

Before you begin, ensure you have the following:

- [node-red-contrib-mqtt-sparkplug-plus](https://flows.nodered.org/node/node-red-contrib-mqtt-sparkplug-plus): Install this Node-RED package for Sparkplug B support via pallete manager.

### Configuring Node-RED for MQTT Sparkplug B

1. Drag any MQTT Sparkplug node onto the canvas.
2. Double-click the MQTT Sparkplug node to open the configuration panel.
3. Click the "+" icon next to the **Broker** field. Enter your MQTT broker's host address (e.g., `mqtt.example.com`), specify the port number (e.g., 1883 for unencrypted or 8883 for TLS), and configure the TLS settings if required. Enter the username and password if authentication is needed. Optionally, enter a Client ID or leave it blank for auto-generation. Set the **Keep Alive** interval (default is 60 seconds).
4. Switch to the Sparkplug tab by clicking the Sparkplug option in the top-right corner.
5. Enter a name in the **Name** field (this will be the Edge Node ID). Enter the group name in the **Group** field. Select **No** for the compression setting. Enable the **Use Alias for Metrics** option if you prefer not to send the full metric names every time and use aliases instead.
6. Click **Add** to save the configuration.

### Sending Data to MQTT with Sparkplug B

1. Drag the Inject node onto the canvas. Set the `msg.payload` to the metrics you want to send and set the repeat interval to 5 seconds. This Inject node could be any node that triggers the data sending. For example, you can use the following JSON expression:

    ```json
    {
        "metrics": [
            {
                "name": "sensor/temperature",
                "value": $random * 100
            },
            {
                "name": "sensor/humidity",
                "value": $random * 100
            }
        ]
    }
    ```

2. Drag the MQTT Sparkplug Device node onto the canvas.
3. Double-click the MQTT Sparkplug Device node to open the configuration panel. Add the metric names that you will be sending by clicking the bottom-left **Add** button. Ensure that the names match the metric names in the payload you are sending and specify the data types for each metric.
4. Switch to the Advanced tab by clicking the "Advanced" option at the top-right.
5. Enable the Send Birth Immediately option. This ensures that a Birth message (DBIRTH) is sent immediately upon deployment and connection to the MQTT broker. Note that enabling this option will send the DBIRTH message when the device node connects, but an NBIRTH message will always be sent regardless of this setting.
6. Optionally, enable Store Forward when not connected if you want to ensure that messages are stored and sent once the connection is re-established.
7. Connect the Inject node's output to the MQTT Sparkplug Device node's input.
8. Deploy the flow by clicking the top-right **Deploy** button.

Once you deploy the flow and all devices connect to the MQTT broker, the system automatically sends an NBIRTH message, indicating that the node ( group of devices) is online and ready to communicate. If the **Send Birth Immediately option** is enabled, the system will also send a `DBIRTH` message as soon as each device within the node connects, signaling that the device is ready for data transmission.

### Receiving Data from MQTT with Sparkplug B

1. Drag the mqtt sparkplug in node onto the canvas.
2. Double-click the node and configure the broker settings.
3. Enter the topic in the **Topic** field in the format `namespace/group_id/message_type/edge_node_id/[device_id]`. Use `DDATA` for receiving metrics you are sending using device node or a wildcard like `spBv1.0/group_id/+/+/[device_id]` to listen to all message types from a specific device.
4. Select the desired **QoS** level.
5. Drag a debug node onto the canvas.
6. Connect the mqtt sparkplug in node’s output to the debug node’s input.
7. Click **Deploy** to save and run the flow.

Now you will be able to see the `NBIRTH`, `DBIRTH`, and `DDATA` messages printed on the debug panel.
