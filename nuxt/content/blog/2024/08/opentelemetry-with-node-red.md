---
title: Monitoring and Optimizing Node-RED Flows with Open Telemetry.
navTitle: Monitoring and Optimizing Node-RED Flows with Open Telemetry.
---

Have you ever found yourself frustrated by unexpected delays in your Node-RED flows, wondering where the bottlenecks are hiding? Even small latency issues can have a big impact on your system's performance. That's where Open Telemetry comes in. With its powerful distributed tracing capabilities, you can finally take control and get a clear view of how your flows are performing in real time.

<!--more-->

Integrating Open Telemetry with Node-RED allows you to monitor latency across your flows. By implementing distributed tracing, you’ll gain the ability to see exactly where delays occur, helping you optimize performance and ensure your IoT applications run efficiently.

## What is Distributed Tracing and How Does Open Telemetry Help?

Distributed tracing is a method used to track and observe the flow of requests through different services within a distributed system. It provides insights into how requests are handled, where delays occur, and how different components interact. By visualizing the path of a request across your system, distributed tracing helps you identify performance bottlenecks and optimize the overall efficiency of your applications.

### What is OpenTelemetry?

Open Telemetry is an open-source framework designed to help you monitor and understand your software systems. It collects and organizes data on how your applications perform and behave, allowing you to track requests as they move through various services. Open Telemetry provides a standardized way to gather and analyze telemetry data, including traces, metrics, and logs, to give you a comprehensive view of your system’s performance.

In Node-RED The Open Telemetry module helps track messages by creating "spans" that record details about each message's journey. Every time a message moves from one node to another, a span is created to capture where it came from, where it’s going, and how long it took. These spans are linked together, showing the entire path of the message through the system. This makes it easier to spot slowdowns, fix problems, and improve how data moves through Node-RED. The module also makes sure this tracking information follows the message as it moves across different nodes and external services.

## Tracing in Node-RED Flows using Opentelemetry

In a manufacturing plant, Node-RED manages different machines and sensors. Suppose there's a problem with the production line, such as a delay in processing or a GPIO node experiencing issues reading data. With Open Telemetry integrated, you can trace the data flow through the system to see exactly where the issue is happening. This helps you quickly identify whether the problem is with a specific node that is reading the machine data or a delay in data processing, allowing you to fix the issue faster and keep the production line running smoothly.

For demonstration purposes, we will use a flow that simulates sensor reading and data processing. We will monitor this flow using Open Telemetry to track data across the system, identify bottlenecks, and optimize performance.



::render-flow
---
height: 200
flow: "W3siaWQiOiI3OGU0YTEyNTVmOWQwYWQxIiwidHlwZSI6Imdyb3VwIiwieiI6IjQ1ZTU2YjQwODljYWRhOTQiLCJuYW1lIjoiIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI2MzZhYzdiNGQ3OThhNWM0IiwiYWM4N2RiODJjMmFiNjZmNSIsImM4YTE3NDk2MjkzNTkwMzEiLCJjMGQzMDI4MTAzMWYwN2RiIl0sIngiOjM0LCJ5IjoxMzksInciOjg1MiwiaCI6ODJ9LHsiaWQiOiI2MzZhYzdiNGQ3OThhNWM0IiwidHlwZSI6ImluamVjdCIsInoiOiI0NWU1NmI0MDg5Y2FkYTk0IiwiZyI6Ijc4ZTRhMTI1NWY5ZDBhZDEiLCJuYW1lIjoiVGVtcGVyYXR1cmUgc2Vuc29yIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6dHJ1ZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IjMwMCIsInBheWxvYWRUeXBlIjoianNvbmF0YSIsIngiOjE4MCwieSI6MTgwLCJ3aXJlcyI6W1siYzhhMTc0OTYyOTM1OTAzMSJdXX0seyJpZCI6ImFjODdkYjgyYzJhYjY2ZjUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNDVlNTZiNDA4OWNhZGE5NCIsImciOiI3OGU0YTEyNTVmOWQwYWQxIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5IjoxODAsIndpcmVzIjpbXX0seyJpZCI6ImM4YTE3NDk2MjkzNTkwMzEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjQ1ZTU2YjQwODljYWRhOTQiLCJnIjoiNzhlNGExMjU1ZjlkMGFkMSIsIm5hbWUiOiJLZWx2aW4gdG8gQ2Vsc2l1cyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZCAtIDI3My4xNSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NDAwLCJ5IjoxODAsIndpcmVzIjpbWyJjMGQzMDI4MTAzMWYwN2RiIl1dfSx7ImlkIjoiYzBkMzAyODEwMzFmMDdkYiIsInR5cGUiOiJkZWxheSIsInoiOiI0NWU1NmI0MDg5Y2FkYTk0IiwiZyI6Ijc4ZTRhMTI1NWY5ZDBhZDEiLCJuYW1lIjoiIiwicGF1c2VUeXBlIjoiZGVsYXkiLCJ0aW1lb3V0IjoiMiIsInRpbWVvdXRVbml0cyI6InNlY29uZHMiLCJyYXRlIjoiMSIsIm5iUmF0ZVVuaXRzIjoiMSIsInJhdGVVbml0cyI6InNlY29uZCIsInJhbmRvbUZpcnN0IjoiMSIsInJhbmRvbUxhc3QiOiI1IiwicmFuZG9tVW5pdHMiOiJzZWNvbmRzIiwiZHJvcCI6ZmFsc2UsImFsbG93cmF0ZSI6ZmFsc2UsIm91dHB1dHMiOjEsIngiOjYwMCwieSI6MTgwLCJ3aXJlcyI6W1siYWM4N2RiODJjMmFiNjZmNSJdXX1d"
---
::



Deploy the flow above, and you might see a delay in the data shown on the debug panel. For this example, we added a Delay node before the Change node that converts temperature data from Kelvin to Celsius. While this delay is visible here, finding such delays in larger flows with many nodes can be difficult and time-consuming. Open Telemetry makes this easier by giving you detailed traces that show where delays or issues are happening

### Prerequisite

Before you start, ensure you have the following:

- [node-red-contrib-opentelemetry](https://flows.nodered.org/node/node-red-contrib-opentelemetry) : Install this Node-RED module via the Node-RED Palette Manager.
- Open Telemetry exporter: Set up an Open Telemetry exporter to send trace data to a backend. For details on available exporters, visit [Open Telemetry Exporters](https://opentelemetry.io/docs/instrumentation/js/exporters/). For this guide, I have set up the [Jaeger](https://jaegertracing.io/).

### Setting Open Telemetry in Node-RED

!["Screenshot showing the configuration of opentelmetry node"](/blog/2024/08/images/opentelmetry-node.png "Screenshot showing the configuration of opentelmetry node")
_Screenshot showing the configuration of opentelmetry node_

1. Drag an `OTEL` node onto the canvas.
2. Double-click on the node and set the URL to your exporter endpoint (e.g., `http://localhost:4318/v1/traces` for a locally running Jaeger exporter). Provide a name for the service according to your preference, and set the Prefix, which will be added to the root Node-RED span name before the initial node name (you can keep it as "Message" if preferred).
3. In the Ignore field, add the names of nodes you want to exclude from Open Telemetry tracing.
4. In the Propagate field, add the names of nodes if you want them to forward trace headers to external systems or other nodes in the flow. This ensures that these nodes participate in the distributed trace, allowing the trace context to be maintained across different components.
5. Set the Timeout to define how long (in seconds) the OTEL node should wait before ending and discarding a message that has not been modified.
6. Now deploy the flow by clicking on the top-right deploy button.

Once the flow is deployed, Open Telemetry will start collecting and sending trace data to your specified exporter.

### Monitoring Performance Using the Exporter Web UI

Now, let's monitor the performance and latency between each node to identify delays. For this section, I am assuming you have Jaeger running as your exporter.

1. Open the Jaeger web UI in your browser. By default, it will be available at `http://localhost:16686/`.
2. Navigate to the "Search" by clicking on the "Search" option at the top.
3. Select the service name that you configured in the OTEL node from the service field. Once selected, you will see all the traces for each interaction in the flow. You can filter the traces by specific nodes using the operation field.
4. To monitor and find issues, select the desired trace and click on the "Find Trace" button. Click on the first trace to examine it.

Once the trace opens, you will see the duration taken by each node to process and pass data. Notice the time taken by the delay node, which is 2 seconds, indicating the problem. By clicking on the green line corresponding to this delay node, you can view more detailed information about the trace.

!["Image showing the total duration taken by the flow"](/blog/2024/08/images/before.png "Image showing the total duration taken by the flow")
_Image showing the tototal duration taken by the flow_

Since the issue was identified with the delay node, let's remove that delay node.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2MzZhYzdiNGQ3OThhNWM0IiwidHlwZSI6ImluamVjdCIsInoiOiIzNTBmYjlmYmI5ODAxMmJlIiwibmFtZSI6IlRlbXBlcmF0dXJlIHNlbnNvciIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOnRydWUsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIzMDAiLCJwYXlsb2FkVHlwZSI6Impzb25hdGEiLCJ4IjoyMDAsInkiOjEwMCwid2lyZXMiOltbImM4YTE3NDk2MjkzNTkwMzEiXV19LHsiaWQiOiJhYzg3ZGI4MmMyYWI2NmY1IiwidHlwZSI6ImRlYnVnIiwieiI6IjM1MGZiOWZiYjk4MDEyYmUiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2NDAsInkiOjEwMCwid2lyZXMiOltdfSx7ImlkIjoiYzhhMTc0OTYyOTM1OTAzMSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMzUwZmI5ZmJiOTgwMTJiZSIsIm5hbWUiOiJLZWx2aW4gdG8gQ2Vsc2l1cyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZCAtIDI3My4xNSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NDIwLCJ5IjoxMDAsIndpcmVzIjpbWyJhYzg3ZGI4MmMyYWI2NmY1Il1dfV0="
---
::



After updating the flow, redeploy the flow and check the traces again. You should see that the total time has been reduced significantly, with the overall flow now taking around 8 milliseconds instead of the previous 2 seconds. This demonstrates how Open Telemetry helps in identifying and resolving performance issues in your Node-RED flows.

!["Image showing the total duration taken by the flow after fixing the issue"](/blog/2024/08/images/after.png "Image showing the total duration taken by the flow after fixing the issue")
_Image showing the total duration taken by the flow after fixing the issue_

Throughout this guide, we’ve interacted with an exporter which is running locally. However, by deploying and setting up your exporter on a server, you can remotely monitor the performance of your Node-RED flows. This setup enables you to oversee your system's performance from anywhere, making it easier to detect and address issues promptly.

## Enhancing Monitoring and Optimization with FlowFuse

While OpenTelemetry excels at tracing and optimizing Node-RED flows, FlowFuse offers a powerful solution for managing and monitoring Node-RED instances. It streamlines the creation, deployment, and management of instances, allowing you to deploy your applications with a single click and minimizing deployment complexity and errors.

FlowFuse also boosts collaboration and security through features like team management, role-based access control, multi-factor authentication, and snapshot recovery. These capabilities ensure effective management, secure access, and easy recovery from changes, making FlowFuse an essential tool for optimizing and overseeing your Node-RED deployments.

## Conclusion

Integrating OpenTelemetry with Node-RED enables you to efficiently trace and resolve delays in your flows, ensuring smoother and more efficient operation of your IoT applications. By following the steps outlined in this guide, you can leverage distributed tracing to identify performance bottlenecks and optimize your flows effectively. With OpenTelemetry's detailed insights and FlowFuse's robust features, you'll be well-equipped to maintain peak performance and manage your Node-RED environment seamlessly.

