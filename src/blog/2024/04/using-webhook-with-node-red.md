---
title: Using Webhooks with Node-RED
subtitle: Learn to Integrate and Automate with Webhooks and Node-RED.
description: Learn how to seamlessly integrate webhooks into your Node-RED applications for automating tasks and enhancing communication. Get detailed, step-by-step instructions on setting up webhooks and practical implementation examples.
date: 2024-04-07
authors: ["sumit-shinde"]
image:
tags:
    - post
    - node-red
    - webhooks
    - event-driven
    - automation
---

Have you found yourself needing to automate tasks based on specific events within your IoT applications? If so, utilizing webhooks presents an efficient solution for this challenge. Webhooks play an integral role in streamlining operations, facilitating real-time communication and seamless integration between disparate systems and devices. In this guide, we cover everything you need to get started with webhooks, from basics to practical implementation. We provide detailed, step-by-step instructions on integrating systems through webhooks using Node-RED.

<!--more-->

## What are Webhooks?

Webhooks are a mechanism that allows fast communication between two different applications or services. They are essentially HTTP requests triggered by events in a source system and sent to a destination system, often with a payload of data. Webhooks are automated, meaning they are automatically sent out when their corresponding event is fired in the source system. 

In simple terms, Webhooks are "user-defined HTTP callbacks.” This callback is triggered after a specific event occurs in the source system, prompting the system to automatically send an HTTP request to the designated destination system.

## How Webhook works 

!["Image displaying how webhook works"](./images/using-webhook-with-node-red-how-webhook-works.png "Image displaying how webhook works"){data-zoomable}

- Event Initiator: This refers to the event specified to trigger the WebHook. Whenever this event occurs, the WebHook will be activated.
- Webhook Server: The webhook server is responsible for managing webhook configurations and endpoints. It listens for the specified event. When the event is detected, the webhook server automatically sends an HTTP POST request containing relevant data to the designated third-party application or service.
- Data Reception by Third-Party Application: The third-party application will receive the data sent via the WebHook to the designated URL or listener provided during registration.
- Custom Action Execution: Upon receiving the POST request, specific actions can be performed.

## API Vs Webhook

It's common and understandable to get confused between APIs and webhooks, especially when you are learning about webhooks for the first time. However, comparing the two can help dispel these confusions.

| Aspect            | API                                                    | Webhook                                              |
|-------------------|--------------------------------------------------------|------------------------------------------------------|
| Direction         | Typically involves client-to-server communication.     | Typically involves server-to-server communication.   |
| Initiation        | The client initiates requests.                  | The server initiates requests.                |
| Request Method    | Usually employs HTTP methods like GET, POST, etc.      | Typically uses the HTTP POST method.                 |
| Response          | Provides an immediate response upon request.           | Does not provide an immediate response; asynchronous.|
| Data Transfer     | Utilizes a pull model where the client fetches data.  | Operates on a push model where the server pushes data to the client.|
| Polling           | Requires periodic polling for updates.                 | No need for polling; receives updates directly.      |
| Payload           | The client specifies the payload in the request.       | The server defines the payload in the outgoing request. |
| Error Handling    | Typically includes error codes and messages.           | Errors are handled by retry mechanisms or manual intervention. |

### Example Scenario:

Consider a manufacturing facility that utilizes temperature sensors to monitor temperature levels in critical areas. When the temperature exceeds predefined thresholds, it triggers a series of actions for maintenance and monitoring.

!["Diagram explaining how component works in Webhook"](./images/using-webhook-with-node-red-diagram.png "Diagram explaining how component works in Webhook"){data-zoomable}

- Temperature Sensor (Server 1): Physical sensors are installed in the manufacturing facility and connected to a Raspberry Pi running Node-RED for reading and monitoring temperature data. The application running on Node-RED triggers webhook requests to Server 2 whenever abnormal temperature patterns are detected.
- Server 2 (Webhook Server): This server creates and hosts the webhook endpoint. It receives HTTP requests from (Server 1) when abnormal temperatures are detected. The request contains temperature data. Server 2 then processes this data and sends a POST request with relevant information to Server 3.
- Maintenance System (Server 3): This system receives POST requests from Server 2 containing event-related data on a specific endpoint provided to Server 2. It then automatically schedules maintenance tasks based on the received information.

## Practical implementation

In this section, we will construct the practical implementation of the scenario described above. all three components or servers will be hosted on the seprate Node-RED instance in our example.

### Setting Up a Webhook (Server 2) 

Having a separate server for webhooks is crucial as it will receive data from multiple sensors. You might wonder why we need a separate Server 2 instead of using one server running on the Raspberry Pi (Server 1) to send data directly to Server 3. The answer is simple: the Raspberry Pi is hardware with limited memory and power, which can slow down communication if the server running on it receives a lot of traffic. Therefore, running a separate instance on each Raspberry Pi and having one centralized separate webhook server is necessary. This central server, running on the cloud, will have significantly more power and resources to handle the incoming traffic efficiently.                              

- Drag an **http-in** node onto the canvas. Configure the method as POST and set the path as **/test-webhook**.

!["Screenshot displaying webhook http-in nodes configuration"](./images/using-webhook-with-node-red-http-in-node-endpoint-for-receiving-data-from-server-2.png "Screenshot displaying webhook http-in nodes configuration"){data-zoomable}

- Drag an **http request** node onto the canvas. Configure the method as POST and set the URL to `https://<your-instance-name>.flowfuse.cloud/schedule-maintenance`, replace <your-instance-name> with your actual name of the instance. **/schedule-maintenance** will be the endpoint for posting requests to the maintenance monitoring system provided by Server 3. 

!["Screenshot displaying http request nodes configuration for sending post request to server 3"](./images/using-webhook-with-node-red-request-node-sending-request-to-server3.png "Screenshot displaying http request nodes configuration for sending post request to server 3"){data-zoomable}

- Drag an **http response** node onto the canvas and connect its input to the output of the http-in node. Also, connect an http request node's input to the same http in node's output.

## Setting Up a Temperature sensors

While writing this blog, I connected my DHT11 sensor to my Raspberry Pi 4, and I am running the FlowFuse device agent on this RPi. Running Node-RED on the RPi allows me to directly read and monitor sensor data in Node-RED, and the FlowFuse device agent allows me to edit and manage flows running on the RPi from any corner of the world. For more details, refer to the [Running the FlowFuse Device Agent as a service on a Raspberry Pi](https://flowfuse.com/blog/2023/05/device-agent-as-a-service/).

### Installing custom node for reading sensor data

1. Click the Node-RED Settings (top-right).
2. Click "Manage Palette."
3. Switch to the "Install" tab.
4. Search for `node-red-contrib-dht-sensor`.
5. Click "Install"

### Reading sensor data

Before proceeding with this step, it is necessary to run Node-RED on your Raspberry Pi as a superuser and ensure that the DHT11 sensor is correctly connected with wires. Also, make sure to install the [BCM2835](https://www.airspayce.com/mikem/bcm2835/).

1. Drag an **inject** node onto the canvas and set the interval to your preference so that it triggers readings after a specific interval of time.
2. Drag an **rpi-dht11** sensor node onto the canvas.
3. Select the sensor model. Since I am using the DHT11 sensor, I will select "DHT11."
4. Choose the pin numbering as **BCM GPIO**.
5. Select the GPIO pin to which your sensor's data output is connected.
6. Connect the **inject** node's output to the **rpi-dht11** node's input.

## Monitoring Temperature ( Server 1 )

1. Drag a **switch** node onto the canvas, click on it, and set up three conditions: one to check if the temperature is less than 50, the second to check if the temperature is greater than 70, and the last one for other cases.

!["Screenshot displaying the switch node with conditions checking whether the temperature is normal or not"](./images/using-webhook-with-node-red-switch-node.png "Screenshot displaying the switch node with conditions checking whether the temperature is normal or not"){data-zoomable}

2. Drag an **http request** node onto the canvas, click on it, set the method as POST, and set the URL as `https://<your-instance-name of webhook server>.flowfuse.cloud/test-webhook`

!["Screenshot displaying HTTP request node configuration for triggering or sending a POST request to the webhook server in case of abnormal temperature."](./images/using-webhook-with-node-red-webhook-trigger.png "Screenshot displaying HTTP request node configuration for triggering or sending a POST request to the webhook server in case of abnormal temperature."){data-zoomable}

3. Connect the **rpi-dht22** node's output to the switch node's input and the http request node’s output to the first and second output of the switch node. then connect the third output of the switch node to the debug node.

## Setting Up a Server 3

Before moving further install Dashboard 2.0 as we will display the scheduled maintenance on the table for more information for more information refer to [Getting started with Dashboard 2.0](https://flowfuse.com/blog/2024/03/dashboard-getting-started/).

1. Drag the **http in** node onto canvas, select the method as POST, and set the method as **/schedule-maintenance**.

!["Screenshot displaying HTTP In node configuration for creating the POST request endpoint."](./images/using-webhook-with-node-red-http-in-node-endpoint-for-receiving-data-from-server-2.png "Screenshot displaying HTTP In node configuration for creating the POST request endpoint."){data-zoomable}

2. Drag a **change** node onto the canvas, and set `msg.payload` to `msg.req.body`. Name this node "Set payload as request body."
3. Drag another **change** node onto the canvas, and set `msg.payload` as `{ "ocured_at":$moment(), "temperature": payload.temperature, "name": payload.topic }` using JSON expression. Name this node "Format the payload."
4. Drag the **function** node onto Canvas and copy the below code in it.

```js

// Retrieve or initialize scheduled maintenance data
let scheduledMaintenanceData = global.get('scheduledMaintenance') || [];

// Randomly assign maintenance task
let assignedTo = Math.random() < 0.5 ? "Bob Smith": "Alice Walker";
msg.payload.assignedTo = assignedTo

// Add recent maintenance data to records
scheduledMaintenanceData.push(maintenanceScheduleRecentData);

// Update scheduled maintenance data to global context
global.set('scheduledMaintenance', scheduledMaintenanceData);

return msg;
```

!["Screenshot displaying function node processing and storing data to global context"](./images/using-webhook-with-node-red-function-node.png "Screenshot displaying function node processing and storing data to global context"){data-zoomable}

5. Drag the **http response** node onto the canvas.
6. Drag another change node onto the canvas and set `msg.payload` to `global.scheduledMaintenance`. Name this node "Retrieve data from global context."

!["Screenshot displaying the change node retriving data"](./images/using-webhook-with-node-red-change-node.png "Screenshot displaying the change node retriving data"){data-zoomable}

7. Drag the **ui-table** widget onto Canvas, and create a new **ui-group** for it in which it will render.
8. Connect the output of the **http in** node to the input of the "Set payload as request body" **change** node.
9. Connect the output of the "Set payload as request body" **change** node to the input of the "Format the payload" **change** node, and subsequently, connect the output of the "Format the payload" **change** node to the input of the **function** node.
10. Connect the output of the **function** node to the input of the **http response** node, and connect the output of the "Retrieve data from global context" **change** node to the input of the **ui-table** widget.

### Deploying the flow

!["Screenshot Displaying the flow of scheduled maintenance table"](./images/using-webhook-with-node-red-flow.png "Screenshot Displaying the flow of scheduled maintenance table"){data-zoomable}

- With your flow updated to include the above, click the "Deploy" button in the top-right of the Node-RED Editor.
- Locate the 'Open Dashboard' button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

!["Screenshot Displaying the flow of scheduled maintenance table"](./images/using-webhook-with-node-red-scheduled-maintenance-table-dashboard-view.png "Screenshot Displaying the flow of scheduled maintenance table"){data-zoomable}

## Conclusion 

In summary, this guide comprehensively covers using webhooks in Node-RED for automating tasks in their Node-RED applications. With clear explanations and practical demonstrations, users can seamlessly integrate webhooks to enhance communication, automate responses to events, and streamline operations.
