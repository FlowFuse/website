---
title: Using Webhook with Node-RED
subtitle: A guide to building a webhook in Node-RED.
description: 
date: 2024-04-07
authors: ["sumit-shinde"]
image:
tags:
    - post
    - node-red
    - webhook
---

Have you ever needed to automate tasks based on specific events in your IoT applications? The answer lies in the technology known as webhooks. webhooks play a crucial role in streamlining operations. In this comprehensive guide, we delve into the world of webhooks, exploring their significance in IoT scenarios. Additionally, we provide detailed step-by-step instructions on integrating webhooks within Node-RED applications.

<!--more-->

## What are the Webhooks?

Webhooks are a mechanism that allows real-time communication between two different applications or services. They are essentially HTTP requests triggered by events in a source system and sent to a destination system, often with a payload of data. Webhooks are automated, meaning they are automatically sent out when their corresponding event is fired in the source system. 

In simple terms, Webhooks are "user-defined HTTP callbacks.”

## How Webhook works 

!["Image displaying how webhook works"](./images/using-webhook-with-node-red-how-webhook-works.png "Image displaying how webhook works"){data-zoomable}

- Event Initiator: This refers to the event specified to trigger the WebHook. Whenever this event occurs, the WebHook will be activated.
- WebHook Provider: The WebHook provider is responsible for configuring and creating the WebHook. It monitors the specified event and generates the WebHook accordingly. Upon event triggering, the WebHook generator will dispatch the POST HTTP request to the designated third-party application.
- Data Reception by Third-Party Application: The third-party application will receive the data sent via the WebHook to the designated URL or listener provided during registration.
- Custom Action Execution: Upon receiving the POST request, specific actions can be performed.

## API Vs Webhook

Commonly, people always confused between API and webhook some assume it is similar to an HTTP request and some assume it is different and more complex than it but let differentiate

## API:

- **Direction:**
  - Typically involves client-to-server communication.
- **Initiation:**
  - Requests are initiated by the client.
- **Request Method:**
  - Usually employs HTTP methods like GET, POST, etc.
- **Response:**
  - Provides an immediate response upon request.
- **Data Transfer:**
  - Utilizes a pull model where the client fetches data.
- **Polling:**
  - Requires periodic polling for updates.
- **Payload:**
  - The client specifies the payload in the request.
- **Error Handling:**
  - Typically includes error codes and messages.

## Webhook:

- **Direction:**
  - Typically involves server-to-server communication.
- **Initiation:**
  - Requests are initiated by the server.
- **Request Method:**
  - Typically uses the HTTP POST method.
- **Response:**
  - Does not provide an immediate response; asynchronous.
- **Data Transfer:**
  - Operates on a push model where the server pushes data to the client.
- **Polling:**
  - No need for polling; receives updates directly.
- **Payload:**
  - The server defines the payload in the outgoing request.
- **Error Handling:**
  - Errors are handled by retry mechanisms or manual intervention.

### Example Scenario:

!["Diagram explaining how component works in"](./images/using-webhook-with-node-red-diagram.png "Role Based Access Control For Node-RED with FlowFuse"){data-zoomable}

For example, Consider a manufacturing facility that utilizes temperature sensors to monitor temperature levels in critical areas. When the temperature surpasses predefined thresholds, it triggers a series of actions for maintenance and monitoring.

- Temperature Sensor ( server 1): These are the physical temperature sensors installed in the manufacturing plant. They trigger webhook requests to Server 2 whenever abnormal temperature patterns are detected.

- Server 2 (Webhook provider ): This server creates and hosts the webhook. It receives HTTP requests from the temperature sensors (Server 1) when abnormal temperatures are detected. The request contains temperature data. Server 2 then processes this data and sends a POST request with relevant information to Server 3.

- Maintenance System (Server 3): This system will recive post request containing event related data, then it will schedule maintainance automatically.

## Practical implementation

In this section, we will construct the practical implementation of the scenario described above. However, all three components or servers will be hosted on the same Node-RED instance in our example. Furthermore, we will simulate data rather than using real sensors by utilizing random number expressions.

### Setting Up a Webhook Receiver or HTTP Endpoint (Server 2)

- Drag an http-in node onto the canvas. Configure the method as POST and set the path to "/test-webhook".

!["Screenshot displaying webhook http-in nodes configuration"](./images/using-webhook-with-node-red-http-in-node-endpoint-for-receiving-data-from-server-2.png "Screenshot displaying webhook http-in nodes configuration"){data-zoomable}

- Drag an http request node onto the canvas. Configure the method as POST and set the URL to `https://<your-instance-name>.flowfuse.cloud/schedule-maintenance` This will serve as our endpoint for posting requests to the maintenance monitoring system.

!["Screenshot displaying http request nodes configuration for sending post request to server 3"](./images/using-webhook-with-node-red-request-node-sending-request-to-server3.png "Screenshot displaying http request nodes configuration for sending post request to server 3"){data-zoomable}

- Drag an http response node onto the canvas and connect its input to the output of the http-in node. Also, connect an http request node's input to the same http response node's output.

## Setting Up a Temperature sensors (Server 1)

1. Drag an inject node onto the canvas and set msg.payload as below:

```
{"name": "sensor 1", "temperature": ($random() * 100)}
```
!["Screenshot displaying the inject node setting payload for genrating simulated data for sensor 1"](./images/using-webhook-with-node-sensor1-inject-node.png "Screenshot displaying the inject node setting payload for genrating simulated data for sensor 1"){data-zoomable}

2. Drag another inject node onto the canvas and set msg.payload as below:

```
{"name": "sensor 2", "temperature": ($random() * 100)}
```
!["Screenshot displaying the inject node setting payload for genrating simulated data for sensor 2"](./images/using-webhook-with-node-red-sensor2-inject-node.png "Screenshot displaying the inject node setting payload for genrating simulated data for sensor 2"){data-zoomable}

3. Drag a switch node onto the canvas, click on it, and set up three conditions: one to check if the temperature is less than 50, the second to check if the temperature is greater than 70, and the last one for other cases.

!["Screenshot displaying the switch node with conditions checking whether the temperature is normal or not"](./images/using-webhook-with-node-red-switch-node.png "Screenshot displaying the switch node with conditions checking whether the temperature is normal or not"){data-zoomable}

4. Drag an http request node onto the canvas, click on it, set the method as POST, and set the URL as `https://<your-instance-name>.flowfuse.cloud/test-webhook`

!["Screenshot displaying HTTP request node configuration for triggering or sending a POST request to the webhook server in case of abnormal temperature."](./images/using-webhook-with-node-red-webhook-trigger.png "Screenshot displaying HTTP request node configuration for triggering or sending a POST request to the webhook server in case of abnormal temperature."){data-zoomable}

5. Connect the http request node’s output to the first and second output of the switch node. then connect the third of the switch node debug node.

## Setting Up a Server 3

Before moving further install Dashboard 2.0 as we will display the scheduled maintenance on the table for more information for more information refer to [Getting started with Dashboard 2.0](https://flowfuse.com/blog/2024/03/dashboard-getting-started/).

- Drag the http in node onto canvas, select the method as POST, and set the method as “/schedule-maintenance”.

!["Screenshot displaying HTTP In node configuration for creating the POST request endpoint."](./images/using-webhook-with-node-red-http-in-node-endpoint-for-receiving-data-from-server-2.png "Screenshot displaying HTTP In node configuration for creating the POST request endpoint."){data-zoomable}

- Drag the function node onto Canvas and copy the below code in it.

```js
// Extract data from the incoming request
let data = msg.req.body;

// Retrieve or initialize scheduled maintenance data
let scheduledMaintenanceData = global.get('scheduledMaintenance') || [];

// Randomly assign maintenance task
let assignedTo = Math.random() < 0.5 ? "Bob Smith": "Alice Walker";

// Create a recent maintenance schedule record
let maintenanceScheduleRecentData = {
    "ocured_at": new Date().toISOString(), // Current timestamp
    ...data, // Include incoming data
    "assigned_to": assignedTo // Assign to a worker
};

// Add recent maintenance data to records
scheduledMaintenanceData.push(maintenanceScheduleRecentData);

// Update global scheduled maintenance data
global.set('scheduledMaintenance', scheduledMaintenanceData);

// Return the processed message object
return msg;
```
!["Screenshot displaying function node processing and storing data to global context"](./images/using-webhook-with-node-red-function-node.png "Screenshot displaying function node processing and storing data to global context"){data-zoomable}

3. Drag the http response node onto the canvas.
4. Drag the change node onto the canvas and set `msg.payload` as 
`global.scheduledMaintenance`.

!["Screenshot displaying the change node retriving data"](./images/using-webhook-with-node-red-change-node.png "Screenshot displaying the change node retriving data"){data-zoomable}

5. Drag the ui-table widget onto Canvas, and create a new ui group for it in which it will render.
6. Connect the http in the node’s output to the function node’s and the change node’s input and connect the function node’s output to the http response node’s input and the change node’s output to the ui-table widget’s input.

!["Screenshot Displaying the flow of scheduled maintenance table"](./images/using-webhook-with-node-red-flow.png "Screenshot Displaying the flow of scheduled maintenance table"){data-zoomable}

!["Screenshot Displaying the flow of scheduled maintenance table"](./images/using-webhook-with-node-red-scheduled-maintenance-table-dashboard-view.png "Screenshot Displaying the flow of scheduled maintenance table"){data-zoomable}

## Conclusion 
