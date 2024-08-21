---
title: Using LwM2M with Node-RED
subtitle: A Step-by-Step Guide to Using LwM2M with Node-RED
description: Discover how to integrate LwM2M with Node-RED to manage IoT devices effectively. This guide covers everything from configuring LwM2M nodes to reading and writing data, and executing commands remotely, ensuring you can optimize your device management with ease.
date: 2024-08-15
authors: ["sumit-shinde"]
image: 
tags:
   - posts
   - LwM2M
   - how to use LwM2M with Node-RED
   - LwM2M for low power devices
---

When you're working with IoT devices, especially those that need to be efficient with power and resources, managing them effectively can be a challenge. This is where LwM2M (Lightweight Machine-to-Machine) comes in. LwM2M is designed to help you monitor, update, and control your devices with minimal overhead, making it ideal for everything from smart sensors to industrial equipment. In this post, we'll explore how you can use LwM2M with Node-RED Whether you're new to LwM2M or Node-RED this guide help you to get started.

<!--more-->

## What is LwM2M

LwM2M (Lightweight Machine-to-Machine) is a protocol designed to efficiently manage and communicate with IoT devices, especially those that are low-power and resource-constrained. By connecting these devices to a central server, LwM2M allows you to remotely monitor, control, and manage them with ease.

In the LwM2M the server sends commands, retrieves data, and adjusts settings, all through a lightweight communication protocol called CoAP (Constrained Application Protocol). LwM2M also ensures security with features like DTLS (Datagram Transport Layer Security), making it a reliable choice for large-scale IoT deployments in smart cities, industrial systems, and other environments where managing numerous devices from a single platform is crucial.

## Using LwM2M with Node-RED

In this section, I will demonstrate how you can monitor and control IoT devices using LwM2M with Node-RED. For demonstration purposes, I'll show you how to monitor and control an Ubuntu machine running Node-RED via the FlowFuse Device Agent. This setup will help you understand how to use LwM2M to manage your devices remotely.

### Prerequisites

- **node-red-contrib-lwm2m:** Install the LwM2M contribution node via the Palette Manager in Node-RED.
- **LwM2M Server:** Ensure you have a running OMA LwM2M server. For more information, refer to [Eclipse Leshan](https://eclipse.dev/leshan/). For this guide, we will use its public server, which is specifically developed for testing and learning purposes.

### Configuring LwM2M Node

1. Drag the LwM2M node onto the canvas in Node-RED.
2. Double-click on the LwM2M node to open its configuration window.
3. Click on the "+" icon next to the Client field to add a new client.
4. Enter a unique endpoint in URN format. This endpoint should be a unique identifier for your device, typically in the format `urn:uuid:<unique-id>`, where `<unique-id>` is a UUID or custom string specific to your device. Ensure that each device has a distinct endpoint to avoid conflicts.
5. Enter the server host. For the public server, use `leshan.eclipseprojects.io`.
6. Enter the server port:
   - For plain UDP, use port `5683`.
   - For DTLS (encrypted communication), use port `5684`.
7. Check the "Enable DTLS" option to enable secure communication.
8. Enter the PSK (Pre-Shared Key) details if DTLS is enabled.
9. Add the object into the "Objects" field. This allows you to include custom objects and resources specific to your application. Below is an example object:

```json
{
  "32769": {
    "0": {
      "0": {
        "type": "STRING",
        "acl": "RW",
        "value": "abcd"
      },
      "1": {
        "type": "INTEGER",
        "acl": "RW",
        "value": 123456
      },
      "2": {
        "type": "BOOLEAN",
        "acl": "RW",
        "value": true
      }
    }
  }
}
```
9. if you are using public server make sure you enable the "hide sensitive data" which will hide all of the device sensitive information to the public server.
10. Click add to save the configuration.

Once you have added the LwM2M node and configured with server details, you can go the server web ui and conform it that is cleint is connected. for public server go to the `https://leshan.eclipseprojects.io/#/clients` and enter the endopoint of your client device into search field if it is appearing that means it is connected.

### Reading Device Configuration and Data on the Server

1. Navigate to your server’s clients section and select the device URN you registered.
2. In the new window that opens, look at the top-left for information about your device, including registration and update details. You can also configure settings such as request timeout and data types for single and multi-value writes.
3. Below this, you'll find the available objects that you can control for your devices and server.
4. Click on the "Device" object option to read device realted information. In the instance 0 section click on the "R" for each object you want. Alternatively, you can click on the top "R" next to instance 0 or "Device-v1.0" to read all values at once. Note that this may not work if any values are unavailable for your device, it will return 404 not found.

!["Image showing LwM2M Server reading the device details"](./images/lwm2m-server-reading.gif "Image showing LwM2M Server reading the device details")
_Image showing LwM2M Server reading the device details_

You can now read information such as device battery level, available memory, device manufacturer, timezone, device type, and more.

### Writing Data and Executing Commands to a Device on the Server

1. Navigate to your server’s clients section and select the device URN you registered.
2. Click on the object to which you want to write data.
3. In the list of resources, identify those with write permission and click on the "w" icon to initiate the write process.
4. In the form that opens, enter the new value in the correct format.
5. Click on "Write" to update the value for that resource.

![Image showing how to perform write operation in the LwM2M server](./images/writing-in-server.gif "Image showing the LwM2M server executing reboot command for device")
*Image showing how to perform write operation in the LwM2M server*

6. Drag another lwm2m client node onto the canvas, select the correct configuration, and enable the "Subscribe LwM2M object events" option. This setting will trigger and send an event object when commands are executed on the server.
7. Drag an exec node onto the canvas and add the command you want to execute. For example, you can add the "reboot" command.
8. Connect the output of the lwm2m client node to the input of the exec node.
9. To execute the commands, click on the 'exec' option next to resources such as Reboot.

![Image showing the LwM2M server executing reboot command for device](./images/executing-command-from-server.gif "Image showing the LwM2M server executing reboot command for device")
*Image showing the LwM2M server executing reboot command for device*

### Reading Data and Configuration from the LwM2M Server in Node-RED

1. Drag the LwM2M client node onto the canvas. Ensure that you have selected the correct configuration for it.
2. Drag the inject node onto the canvas. Set the topic in the format `/ObjectID/ObjectInstanceID/ResourceID`. For example, to read the manufacturer’s available free memory, which is in the Object `3`, Instance `0`, and  has Resource ID `10`, set the topic to `/3/0/10`.
3. Add a debug node onto the canvas to display the read values in the debug panel for verification.
4. Connect the output of the inject node to the input of the LwM2M client node, and connect the output of the LwM2M client node to the input of the debug node.
5. Deploy the flow by clicking on to the top-right deploy button.

!["Image showing Node-RED flow that reading data from LwM2M Server"](./images/executing-command-from-server.gif "Image showing Node-RED flow that reading data from LwM2M Server")
_Image showing Node-RED flow that reading data from LwM2M Server_

### Writing data and configuration to the LwM2M Server from Node-RED

1. Drag an inject node onto the canvas.
2. Double click on and set the msg.payload to the updted value.
3. set the msg.topic to the resource notion in the correct format `/ObjectID/ObjectInstanceID/ResourceID`
4. Drag the lwm2m client out node onto the canvas, make sure to select correct configuration for it.
5. Connect the inject node's output to the input of lwm2m client out node.
6. Deploy the flow and click the inject button to perform the write operation.

!["Image showing Node-RED flow that writing data to LwM2M Server"](./images/writing-data-to-server-from-nr.gif "Image showing Node-RED flow that writing data to LwM2M Server")
_Image showing Node-RED flow that writing data to LwM2M Server_

In the same way you can execute commands from node-red you just have to replace the notion and end that notion with `execute` like `0/0/4/execute` you will not have to specify the msg.payload.
