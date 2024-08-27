---
title: Using LwM2M with Node-RED
subtitle: A Step-by-Step Guide to Using LwM2M with Node-RED
description: Discover how to integrate LwM2M, the Lightweight Machine-to-Machine protocol, with Node-RED to manage IoT devices effectively. This guide covers everything from configuring LwM2M nodes to reading and writing data and executing commands remotely, ensuring you can easily optimize your device management.
date: 2024-08-15
authors: ["sumit-shinde"]
image: /blog/2024/08/images/using-lwm2m-with-node-red.png
tags:
   - posts
   - LwM2M
   - how to use LwM2M with Node-RED
   - LwM2M for low-power devices
---

IoT devices, especially those designed for low-power operation, can be difficult to manage due to their limited resources and the need for efficient communication and control. This is where LwM2M (Lightweight Machine-to-Machine) comes in. LwM2M is designed to help you monitor, update, and control your devices with minimal overhead, making it ideal for everything from smart sensors to industrial equipment. In this post, we'll explore how you can use LwM2M with Node-RED. It is ideal for anyone starting their journey with LwM2M or Node-RED.

<!--more-->

## What is LwM2M

LwM2M (Lightweight Machine-to-Machine) is a protocol specifically crafted to handle and interact with IoT devices, particularly those that consume less energy and have limited resources. LwM2M facilitates easy remote oversight, control, and administration by linking these devices to a central server.

Within LwM2M, the server issues commands collects data and modifies settings over a compact communication protocol named CoAP (Constrained Application Protocol). LwM2M also bolsters security with capabilities such as DTLS (Datagram Transport Layer Security), rendering it a dependable option for expansive IoT implementations in smart cities, industrial systems, and similar settings where overseeing multiple devices from a central hub is essential.

## Using LwM2M with Node-RED

In this section, I will demonstrate how you can monitor and control IoT devices using LwM2M with Node-RED. For demonstration purposes, I'll show you how to monitor and control an Ubuntu machine running Node-RED via the [FlowFuse Device Agent](/product/device-agent/). This setup will help you understand how to use LwM2M to manage your devices remotely.

### Prerequisites

- **node-red-contrib-lwm2m:** Install the LwM2M contribution node via the Palette Manager in Node-RED.
- **LwM2M Server:** Ensure you have a running OMA LwM2M server available and have its configuration details on hand. For more information, refer to [Eclipse Leshan](https://eclipse.dev/leshan/).

### Configuring LwM2M Node

1. Drag the LwM2M node onto the canvas in Node-RED.
2. Double-click on the LwM2M node to open its configuration window.
3. Click the "+" icon next to the Client field to add a new client.
4. Enter a unique endpoint in URN format. This endpoint should be a unique identifier for your device, typically in the format `urn:uuid:<unique-id>,` where `<unique-id>` is a UUID or custom string specific to your device. Ensure that each device has a distinct endpoint to avoid conflicts.
5. Enter the server host.
6. Enter the server port:
   - For plain UDP, use port `5683`.
   - For DTLS (encrypted communication), use port `5684`.
7. Check the "Enable DTLS" option to enable secure communication.
8. Enter the PSK (Pre-Shared Key) details if DTLS is enabled.
9. Add the object to the "Objects" field. This allows you to include custom objects and resources specific to your application that can be handled similarly to other objects, the id of this custom object should be in the range of 10241 - 32768. Below is an example object:

```json
{
  "32764": {
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

9. If you are using a public server, make sure you enable "hide sensitive data," which will hide all of the device's sensitive information from the public server.
10. Click "Add" to save the configuration.

Once you've configured the LwM2M node with the server details, you can confirm that the client is connected by visiting the server's web UI. Navigate to `<your-server-host>/#/clients` and enter the endpoint of your client device in the search field. If the client appears in the list, it means it is connected. Alternatively, you can check the node's status in Node-RED, which will display "connected" if the connection is successful.

### Reading Device Configuration and Data on the Server

1. Navigate to your server’s clients section and select the device URN you registered.
2. In the new window that opens, look at the top-left for information about your device, including registration and update details. You can also configure settings such as request timeout and data types for single and multi-value writes.
3. Below this, you'll find the available objects that you can control for your devices and server.
4. Click on the "Device" object option to read device realted information. In the instance 0 section click on the "R" for each object you want. Alternatively, you can click on the top "R" next to instance 0 or "Device-v1.0" to read all values at once. Note that this may not work if any values are unavailable for your device, it will return 404 not found.

!["Image showing LwM2M Server reading the device details"](./images/lwm2m-server-reading.gif "Image showing LwM2M Server reading the device details")
_Image showing LwM2M Server reading the device details_

You can now read information such as device battery level, available memory, device manufacturer, timezone, device type, and a lot.

### Writing Data and Executing Commands to a Device on the Server

1. Navigate to your server’s clients section and select the device URN you registered.
2. Click on the object to which you want to write data.
3. In the list of resources, identify those with write permission and click on the "w" icon to initiate the write process.
4. In the form that opens, enter the new value in the correct format.
5. Click on "Write" to update the value for that resource.

![Image showing how to perform write operation in the LwM2M server](./images/writing-in-server.gif "Image showing the LwM2M server executing reboot command for device")
*Image showing how to perform write operation in the LwM2M server*

6. Drag the **lwm2m client** node onto the canvas, select the correct configuration, and enable the "Subscribe LwM2M object events" option. This setting will trigger and send an event object when commands are executed on the server.
7. Drag an exec node onto the canvas and add the command you want to execute. For example, you can add the "reboot" command.
8. Connect the output of the **lwm2m client** node to the input of the **exec** node.
9. To execute the commands, click on the 'exec' option next to resources such as Reboot.

![Image showing the LwM2M server executing reboot command for device](./images/executing-command-from-server.gif "Image showing the LwM2M server executing reboot command for device")
*Image showing the LwM2M server executing reboot command for device*

### Reading Data and Configuration from the LwM2M Server in Node-RED

1. Drag the **lwm2m client** node onto the canvas. Ensure that you have selected the correct configuration for it.
2. Drag the **inject** node onto the canvas. Set the topic in the format `/ObjectID/ObjectInstanceID/ResourceID`. For example, to read the manufacturer’s available free memory, which is in the Object `3`, Instance `0`, and  has Resource ID `10`, set the topic to `/3/0/10`.
3. Add a **debug** node onto the canvas to display the read values in the debug panel for verification.
4. Connect the output of the **inject** node to the input of the LwM2M client node, and connect the output of the **lwm2m client** node to the input of the **debug** node.
5. Deploy the flow by clicking on the top-right "deploy" button.

!["Image showing Node-RED flow that reading data from LwM2M Server"](./images/reading-data-from-server-in-nr.gif "Image showing Node-RED flow that reading data from LwM2M Server")
_Image showing Node-RED flow that is reading data from LwM2M Server_

### Writing data and configuration to the LwM2M Server from Node-RED

1. Drag an **inject** node onto the canvas.
2. Double-click on it and set the `msg.payload` to the updated value.
3. Set the `msg.topic` to the resource notion in the correct format `/ObjectID/ObjectInstanceID/ResourceID`
4. Drag the **lwm2m client** out node onto the canvas, and select the correct server configuration.
5. Connect the **inject** node's output to the input of **lwm2m client out** node.
6. Deploy the flow and click the inject button to perform the write operation.

!["Image showing Node-RED flow that writing data to LwM2M Server"](./images/writing-data-to-server-from-nr.gif "Image showing Node-RED flow that writing data to LwM2M Server")
_Image showing Node-RED flow that is writing data to LwM2M Server_

In the same way, you can execute commands from node-red. You have to replace the notion and end that notion with `execute`, like `0/0/4/execute.` When executing the command, you will not have to specify the `msg.payload`.

### Conclusion

Integrating LwM2M with Node-RED opens up powerful possibilities for managing IoT devices with efficiency and flexibility. Whether you're monitoring device data, executing commands, or configuring settings remotely, this setup provides a robust framework for IoT device management. By following the steps outlined in this guide, you can effectively leverage the capabilities of LwM2M within Node-RED to optimize your IoT deployments, ensuring that your devices are well-managed, secure, and responsive to the needs of your applications. As you gain more experience, you'll find even more ways to tailor this integration to meet the specific demands of your projects.

Integrating LwM2M with Node-RED provides an efficient way to manage IoT devices remotely. By following the steps in this guide, you can easily monitor, control, and configure your devices, ensuring they operate smoothly and securely. 