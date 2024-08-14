---
title: How to Integrate OpenTelemetry for Distributed Tracing in Node-RED Flows
subtitle: Optimize Node-RED Flows with OpenTelemetry
description: Learn to integrate OpenTelemetry with Node-RED to track and optimize flow performance.
date: 2024-08-31
authors: ["sumit-shinde"]
image: 
tags:
   - posts
   - flowfuse
   - distributed tracing in node-red
   - opentelemetry with node-red
---

Have you ever found yourself frustrated by unexpected delays in your Node-RED flows, wondering where the bottlenecks are hiding? In the fast-paced world of IoT, even small latency issues can have a big impact on your system's performance. That's where OpenTelemetry comes in. With its powerful distributed tracing capabilities, you can finally take control and get a clear view of how your flows are performing in real-time.

<!--more-->

In this guide, we’ll show you how to integrate OpenTelemetry with Node-RED to monitor latency across your flows. By implementing distributed tracing, you’ll gain the ability to see exactly where delays occur, helping you optimize performance and ensure your IoT applications run efficiently.

## What is Distributed Tracing and How Does OpenTelemetry Help?

Distributed tracing is a method used to track and observe the flow of requests through different services within a distributed system. It provides insights into how requests are handled, where delays occur, and how different components interact. By visualizing the path of a request across your system, distributed tracing helps you identify performance bottlenecks and optimize the overall efficiency of your applications.

### What is OpenTelemetry?

OpenTelemetry is an open-source framework designed to help you monitor and understand your software systems. It collects and organizes data on how your applications perform and behave, allowing you to track requests as they move through various services. OpenTelemetry provides a standardized way to gather and analyze telemetry data, including traces, metrics, and logs, to give you a comprehensive view of your system’s performance.

## Tracing in Node-RED Flows using Opentelemetry

In a manufacturing plant, Node-RED manages different machines and sensors. Suppose there's a problem with the production line, such as a delay in processing or a GPIO node experiencing issues reading data. With OpenTelemetry integrated, you can trace the data flow through the system to see exactly where the issue is happening. This helps you quickly identify whether the problem is with a specific node that is reading the machine data or a delay in data processing, allowing you to fix the issue faster and keep the production line running smoothly.

For demonstration purposes, we will use a flow that simulates sensor reading and data processing. We will monitor this flow using OpenTelemetry to track data across the system, identify bottlenecks, and optimize performance.

{% renderFlow %}
[{"id":"9e778f13beba757e","type":"group","z":"45e56b4089cada94","name":"flow1","style":{"label":true},"nodes":["636ac7b4d798a5c4","ac87db82c2ab66f5","ec0e6f08c443a048"],"x":134,"y":139,"w":692,"h":82},{"id":"636ac7b4d798a5c4","type":"inject","z":"45e56b4089cada94","g":"9e778f13beba757e","name":"Temperature sensor","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"$random()* 200\t","payloadType":"jsonata","x":280,"y":180,"wires":[["ec0e6f08c443a048"]]},{"id":"ac87db82c2ab66f5","type":"debug","z":"45e56b4089cada94","g":"9e778f13beba757e","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":720,"y":180,"wires":[]},{"id":"ec0e6f08c443a048","type":"function","z":"45e56b4089cada94","g":"9e778f13beba757e","name":"Kelvin to Celcius","func":"// Extract the Kelvin value from the incoming message payload\nlet kelvin = msg.payload;\n\n// Function to convert Kelvin to Celsius\nfunction kelvinToCelsius(kelvin) {\n    return kelvin - 273.15;\n}\n\n// Function to add an intentional delay (e.g., 1 second)\nfunction delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms));\n}\n\n// Convert Kelvin to Celsius\nlet celsius = kelvinToCelsius(kelvin);\n\n// Add an intentional delay (1 second)\nawait delay(1000);\n\n// Set the result in the message payload\nmsg.payload = celsius;\n\n// Return the modified message object\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":520,"y":180,"wires":[["ac87db82c2ab66f5"]]}]
{% endrenderFlow %}

Deploy the above flow, and you might notice that the data printed on the debug panel appears with a delay. For example purpose, in the function node that converts temperature data to Kelvin, we have intentionally added a delay. While you might have already spotted this delay quickly, in larger flows with hundreds of nodes, it can be challenging and time-consuming to pinpoint the exact problem. OpenTelemetry simplifies this task by providing detailed traces that help you identify where the delays or issues are occurring.

### Prequsite

Before you start, ensure you have the following:

- [node-red-contrib-opentelemetry](https://flows.nodered.org/node/node-red-contrib-opentelemetry) : Install this Node-RED module via the Node-RED Palette Manager.
- OpenTelemetry exporter: Set up an OpenTelemetry exporter to send trace data to a backend. For details on available exporters, visit [OpenTelemetry Exporters](https://opentelemetry.io/docs/instrumentation/js/exporters/). For this guide, i have setup the [Jaeger](https://jaegertracing.io/).

### Setting OpenTelemetry in Node-RED

!["Screenshot showing the configuration of opentelmetry node"](./images/opentelmetry-node.png "Screenshot showing the configuration of opentelmetry node")
_Screenshot showing the configuration of opentelmetry node_

1. Drag an `OTEL` node onto the canvas.
2. Double-click on the node and set the URL to your exporter endpoint (e.g., `http://localhost:4318/v1/traces` for a locally running Jaeger exporter). Provide a name for the service according to your preference, and set the Prefix, which will be added to the root Node-RED span name before the initial node name (you can keep it as "Message" if preferred).
3. In the Ignore field, add the names of nodes you want to exclude from OpenTelemetry tracing.
4. In the Propagate field, add the names of nodes to which you want OpenTelemetry to forward trace headers for tracking.
5. Set the Timeout to define how long (in seconds) the OTEL node should wait before ending and discarding a message that has not been modified.
6. Now deploy the flow by clicking onto the top-right deploy button.

Once the flow is deployed, OpenTelemetry will start collecting and sending trace data to your specified exporter.

## Monitoring Performance Using the Exporter Web UI

Now, let's monitor the performance and latency between each node to identify delays. For this section, I am assuming you have Jaeger running as your exporter.

1. Open the Jaeger web UI in your browser. By default, it will be available at `http://localhost:16686/`.
2. Navigate to the "Search" by clicking on the "Search" option at the top.
3. Select the service name that you configured in the OTEL node from the service field. Once selected, you will see all the traces for each interaction in the flow. You can filter the traces by specific nodes using the operation field.
4. To monitor and find issues, select the desired trace and click on the "Find Trace" button. Click on the first trace to examine it.

Once the trace opens, you will see the duration taken by each node to process and pass data. Notice the delay in the Kelvin to Celsius function, which is taking 2 seconds. By clicking on the green line corresponding to this function, you can view more detailed information about the trace.

!["Image showing the total dueration taken by the flow"](./images/before.png "Image showing the tototal dueration taken by the flow")
_Image showing the tototal dueration taken by the flow_

Since the issue was identified in the function node, you can update the function to remove the delay which we have intentionally added. Replace the current function node with the following JavaScript code:

```js
// Extract the Kelvin value from the incoming message payload
let kelvin = msg.payload;

// Function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

// Convert Kelvin to Celsius
let celsius = kelvinToCelsius(kelvin);

// Set the result in the message payload
msg.payload = celsius;

// Return the modified message object
return msg;
```

After updating the function node, redeploy the flow and check the traces again. You should see that the delay has been reduced significantly, with the overall flow now taking around 15 milliseconds instead of the previous 2 seconds. This demonstrates how OpenTelemetry helps in identifying and resolving performance issues in your Node-RED flows.

!["Image showing the total dueration taken by the flow after fixing the issue"](./images/after.png "Image showing the total dueration taken by the flow after fixing the issue")
_Image showing the total dueration taken by the flow after fixing the issue_

Throughout this guide, we’ve interacted with exporter which is running locally. However, by deploying and setting up your exporter on a server, you can remotely monitor the performance of your Node-RED flows. This setup enables you to oversee your system's performance from anywhere, making it easier to detect and address issues promptly.

## Conclusion

Using OpenTelemetry with Node-RED helps you spot and fix delays in your flows quickly. By tracking data through your system, you can see where things slow down and make improvements. This makes your IoT applications run smoother and more efficiently. With the steps in this guide, you're now ready to use distributed tracing to keep your Node-RED flows performing at their best.