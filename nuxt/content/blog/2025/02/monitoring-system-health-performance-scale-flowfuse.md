---
title: ''
navTitle: ''
---
--- 
title: "Monitoring Device Health and Performance at Scale with FlowFuse" 
subtitle: "Track and Optimize Edge Device Performance with Node-RED and FlowFuse."
description: "Learn how to monitor system health and performance with Node-RED. Track CPU usage, memory, and other key metrics, and efficiently scale device monitoring with FlowFuse to thousands of devices."
date: 2025-02-21
authors: ["sumit-shinde"]
image:  /blog/2025/02/images/monitoring-device-health-and-performance-at-scale.png
keywords: real-time device monitoring, FlowFuse for IoT monitoring, scalable edge device monitoring, remote device performance tracking, centralized device monitoring dashboard, optimizing IoT device health, real-time performance tracking with Node-RED, remote monitoring for industrial automation
tags: 
 - node-red
 - flowfuse
---

Edge devices are everywhere, and their numbers are skyrocketing—from 2.7 billion in 2020 to a projected 7.8 billion by 2030, according to [various reports](https://transformainsights.com/news/edge-computing-rapid-growth-iot#:~:text=New%20Transforma%20Insights%20reports%20covering,edge%20capabilities%20in%20IoT%20devices.). As these devices become critical for automation and data processing, monitoring their health is essential to ensure reliability and efficiency.  

<!--more-->

Tracking CPU usage, memory, and system performance helps detect potential issues early, preventing downtime and optimizing operations. In this post, we will explore how to monitor devices using Node-RED and scale this process efficiently with FlowFuse.  

<lite-youtube videoid="43te5aD1RRw" params="rel=0" style="width: 704px; height: 100%;" title="YouTube video player"></lite-youtube>

## What is Device Health Monitoring, and Why is it Important?  

Edge devices power IoT and automation, handling communication and data processing. As their numbers grow, ensuring they run efficiently is crucial.  

Monitoring device health means tracking key metrics like CPU usage, memory, uptime, and system load. High CPU usage or low memory can slow down processes, disrupt data flow, and reduce efficiency.  

For example, in manufacturing, edge devices connect machines to cloud systems for real-time data. If a device fails, production can be impacted.  

Regular monitoring helps detect issues early, prevents downtime, and keeps devices running smoothly. 

## Getting Started with Monitoring Devices

We will begin by monitoring a single device, such as a Raspberry Pi, collecting system data, and visualizing it using FlowFuse. Once the process is clear, we will expand it to monitor multiple devices at scale.  

### Prerequisites

Before you begin, ensure you have the following:

1. **Running Node-RED Instance:** You need a running Node-RED instance on the device you want to monitor. The easiest way to set this up is with the [FlowFuse Device Agent](/platform/device-agent/), which provides secure remote access, real-time collaboration, snapshots for quick recovery, DevOps tools, and device group management. With it, you can push updates to multiple devices with a single click.  

For a step-by-step installation guide, refer to the [FlowFuse Device Agent Quickstart](/docs/device-agent/quickstart/).  

If you haven’t yet signed up for a FlowFuse account, [sign up now](https://app.flowfuse.com/account/create?utm_campaign=60718323-BCTA&utm_source=blog&utm_medium=cta&utm_term=high_intent&utm_content=Monitoring%20Device%20Health%20and%20Performance%20at%20Scale%20with%20FlowFuse).

1. **Required Node-RED Nodes:** To collect system data and display it on a dashboard, install the following Node-RED nodes via the [Node-RED Palette Manager](https://nodered.org/docs/user-guide/editor/palette/manager):  

- `node-red-contrib-os`: Retrieves system information such as memory, uptime, and load.
- `node-red-contrib-cpu`: Monitors CPU usage.
- `@flowfuse/node-red-dashboard`: Provides UI components for visualizing system metrics.
- `node-red-contrib-moment`: Formats uptime duration in a human-readable format.

### Collecting CPU and System Metrics with Node-RED  

Now that Node-RED is running on your device, it’s time to gather essential system metrics. Monitoring CPU usage, memory consumption, system uptime, and load averages helps you monitormonitor performance and spot potential issues before they become serious problems.  

Let’s break it down step by step.  

#### Collecting CPU Usage Data  

To start, let’s capture CPU usage in real time:  

1. Drag a **CPU** node from the "Performance" category onto the canvas.  
2. Double-click the node and uncheck all options except "Send a message for overall usage." This ensures you get a clear view of total CPU performance. If you need per-core metrics, you can enable the other options.  
3. Add an **Inject** node, double-click it, and set it to trigger at a suitable interval (e.g., every second, every 10 seconds, or every 30 seconds). Connect its output to the CPU node.  
4. Add a **Debug** node and connect it to the output of the CPU node. This lets you view CPU data in the debug pane.  
5. **Click Deploy** in the top-right corner of the Node-RED editor.  

Your debug pane will now start showing live CPU usage data:

![An image showing the flow that gathers CPU usage data and prints it in the debug pane](/blog/2025/02/images/cpu-usage.png){data-zoomable}
_An image showing the flow that gathers CPU usage data and prints it in the debug pane_

#### Monitoring Memory Usage  

Next, let’s track memory consumption:  

1. Drag a Memory node onto the canvas and double-click it.  
2. Choose the unit for memory display (e.g., gigabytes for easier readability).  
3. Connect the Memory node’s input to the Inject node’s output.  
4. Connect the Memory node’s output to the existing Debug node.  
5. Click Deploy to start monitoring.  

Once deployed, you will see a structured object in the debug pane containing along with cpu usage:  

![An image showing the flow that gathers memory usage data and prints it in the debug pane](/blog/2025/02/images/memory-usage.png){data-zoomable}
_An image showing the flow that gathers memory usage data and prints it in the debug pane_

- totalmem: Total available memory  
- freemem: Free memory  
- memusage: Current memory usage  

#### Tracking System Uptime  

Monitoring uptime helps detect unexpected reboots and ensures system stability.  

1. Drag an Uptime node onto the canvas.  
2. Connect its input to the Inject node’s output.  
3. Connect its output to the Debug node.  
4. Click Deploy to activate uptime tracking.  

Each time the Inject node triggers, the debug pane will display the uptime in seconds and CPU and memory usage. 

![An image showing the flow that gathers system uptime data and prints it in the debug pane](/blog/2025/02/images/uptime.png){data-zoomable}
_An image showing the flow that gathers system uptime data and prints it in the debug pane_

#### Analyzing Load Average  

To understand how busy your system has been over time, let’s analyze the load average:  

1. Drag a **Loadavg** node onto the canvas.  
2. Connect its input to the Inject node’s output.  
3. Connect its output to the Debug node.  
4. Click Deploy to start tracking.  

This will give you three key metrics:  

![An image showing the flow that gathers system load average data and prints it in the debug pane](/blog/2025/02/images/load-avg.png){data-zoomable}

- 1-minute load average: Immediate system load  
- 5-minute load average: Recent short-term trend  
- 15-minute load average: Long-term system trend  

If these values remain consistently high, your system may struggle under excessive demand, signaling a need for optimization or additional processing power.  

With these metrics in place, you have a solid foundation for real-time system monitoring.   

### Sharing Data Across Different Node-RED Instances

Once we have the data, we must send it to the Node-RED instance handling visualization. Keeping the dashboard separate is essential for scalability. As the number of devices increases, a dedicated instance ensures we can monitor all of them from a single, centralized dashboard. This approach also makes management more efficient.

To send data between multiple Node-RED instances we can use [FlowFuse's Project Nodes](/blog/2024/10/exploring-flowfuse-project-nodes/).

Before sending the data though, we combine all collected metrics into a single object for better organization and easier processing. Currently, each node sends its metrics as a separate message object. Merging them into a single object streamlines data handling and reduces message overhead.

Import the following flow and deploy it in the device instance. While I am not covering the step-by-step process here, the explanation below covers what the flow includes and how it works.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2ZjY1NTYzMGQ5N2JhYzg3IiwidHlwZSI6ImNwdSIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwibmFtZSI6IiIsIm1zZ0NvcmUiOmZhbHNlLCJtc2dPdmVyYWxsIjp0cnVlLCJtc2dBcnJheSI6ZmFsc2UsIm1zZ1RlbXAiOmZhbHNlLCJ4Ijo4NzAsInkiOjQ2MCwid2lyZXMiOltbImQ0N2IyZGE4MDI0MTIzYmYiXV19LHsiaWQiOiI3MzNkYzkxZDk0ZjAzZTQ5IiwidHlwZSI6ImluamVjdCIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwibmFtZSI6IiIsInByb3BzIjpbXSwicmVwZWF0IjoiMTAiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjYzMCwieSI6NTIwLCJ3aXJlcyI6W1siNmY2NTU2MzBkOTdiYWM4NyIsImJjZGRjM2FiYTgyYTEyZGEiLCI3YWYxMWVkMjQ1ZGRmOWMzIiwiZDZkNThjODFjZWE5MzY3MSJdXX0seyJpZCI6ImJjZGRjM2FiYTgyYTEyZGEiLCJ0eXBlIjoiTWVtb3J5IiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiIiwic2NhbGUiOiJHaWdhYnl0ZSIsIngiOjg2MCwieSI6NTAwLCJ3aXJlcyI6W1siMDNlZTMyZGRiZDgwZDdhMiJdXX0seyJpZCI6IjdhZjExZWQyNDVkZGY5YzMiLCJ0eXBlIjoiVXB0aW1lIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiIiwieCI6ODYwLCJ5Ijo1NDAsIndpcmVzIjpbWyI2MTE3ZTAxM2JlMmExMWFjIl1dfSx7ImlkIjoiZDZkNThjODFjZWE5MzY3MSIsInR5cGUiOiJMb2FkYXZnIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiIiwieCI6ODYwLCJ5Ijo1ODAsIndpcmVzIjpbWyJiNzU5MTY3YzE2NjNlYjIxIl1dfSx7ImlkIjoiZDQ3YjJkYTgwMjQxMjNiZiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiRkZGMDAwMDAwMDAwMDAwMSIsIm5hbWUiOiJDUFUgVVNBR0UiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJkYXRhIiwicHQiOiJtc2ciLCJ0byI6Int9IiwidG90IjoianNvbiJ9LHsidCI6InNldCIsInAiOiJkYXRhLkNQVV9VU0FHRSIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjEwNzAsInkiOjQ2MCwid2lyZXMiOltbIjc0MjlmYTk3MGQxZTMwOTkiXV19LHsiaWQiOiIwM2VlMzJkZGJkODBkN2EyIiwidHlwZSI6ImNoYW5nZSIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwibmFtZSI6Ik1FTU9SWSBVU0FHRSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImRhdGEiLCJwdCI6Im1zZyIsInRvIjoie30iLCJ0b3QiOiJqc29uIn0seyJ0Ijoic2V0IiwicCI6ImRhdGEuTUVNT1JZX1VTQUdFIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTA5MCwieSI6NTAwLCJ3aXJlcyI6W1siNzQyOWZhOTcwZDFlMzA5OSJdXX0seyJpZCI6IjYxMTdlMDEzYmUyYTExYWMiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiU1lTVEVNIFVQVElNRSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImRhdGEiLCJwdCI6Im1zZyIsInRvIjoie30iLCJ0b3QiOiJqc29uIn0seyJ0Ijoic2V0IiwicCI6ImRhdGEuVVBUSU1FIiwicHQiOiJtc2ciLCJ0byI6IiRmbG9vcihwYXlsb2FkLnVwdGltZSlcdCIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTA5MCwieSI6NTQwLCJ3aXJlcyI6W1siNzQyOWZhOTcwZDFlMzA5OSJdXX0seyJpZCI6ImI3NTkxNjdjMTY2M2ViMjEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiTE9BRCBBVkVSQUdFIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoiZGF0YSIsInB0IjoibXNnIiwidG8iOiJ7fSIsInRvdCI6Impzb24ifSx7InQiOiJzZXQiLCJwIjoiZGF0YS5MT0FEX0FWRVJBR0UuT05FX01JTiIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLmxvYWRhdmdbMF0iLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoiZGF0YS5MT0FEX0FWRVJBR0UuRklWRV9NSU4iLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5sb2FkYXZnWzFdIiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6ImRhdGEuTE9BRF9BVkVSQUdFLkZJRlRFRU5fTUlOIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQubG9hZGF2Z1syXSIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoxMDkwLCJ5Ijo1ODAsIndpcmVzIjpbWyI3NDI5ZmE5NzBkMWUzMDk5Il1dfSx7ImlkIjoiNzQyOWZhOTcwZDFlMzA5OSIsInR5cGUiOiJqb2luIiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoiIiwibW9kZSI6ImN1c3RvbSIsImJ1aWxkIjoibWVyZ2VkIiwicHJvcGVydHkiOiJkYXRhIiwicHJvcGVydHlUeXBlIjoibXNnIiwia2V5IjoidG9waWMiLCJqb2luZXIiOiJcXG4iLCJqb2luZXJUeXBlIjoic3RyIiwidXNlcGFydHMiOmZhbHNlLCJhY2N1bXVsYXRlIjp0cnVlLCJ0aW1lb3V0IjoiIiwiY291bnQiOiI0IiwicmVkdWNlUmlnaHQiOmZhbHNlLCJyZWR1Y2VFeHAiOiIiLCJyZWR1Y2VJbml0IjoiIiwicmVkdWNlSW5pdFR5cGUiOiIiLCJyZWR1Y2VGaXh1cCI6IiIsIngiOjEzMTAsInkiOjUyMCwid2lyZXMiOltbIjEzM2Q1NzA0OGE3YjA1N2QiXV19LHsiaWQiOiIxMzNkNTcwNDhhN2IwNTdkIiwidHlwZSI6ImNoYW5nZSIsInoiOiJGRkYwMDAwMDAwMDAwMDAxIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiZGF0YSIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoxNDkwLCJ5Ijo1MjAsIndpcmVzIjpbWyI4MTIzYWQ2MWNmNTBlNjFlIl1dfSx7ImlkIjoiODEyM2FkNjFjZjUwZTYxZSIsInR5cGUiOiJwcm9qZWN0IGxpbmsgb3V0IiwieiI6IkZGRjAwMDAwMDAwMDAwMDEiLCJuYW1lIjoicHJvamVjdCBvdXQgMSIsIm1vZGUiOiJsaW5rIiwiYnJvYWRjYXN0Ijp0cnVlLCJwcm9qZWN0IjoiMjhhODA5YzYtYjhmMy00OTlmLWJiMjAtZTM1N2MyOTJiNDQzIiwidG9waWMiOiIke0ZGX0RFVklDRV9OQU1FfSIsIngiOjE2NzAsInkiOjUyMCwid2lyZXMiOltdfV0="
---
::



Let's understand the flow.

In the flow above, four Change nodes are used, each connected to the output of the **CPU**, **Memory**, **Uptime**, and **Loadavg** nodes. As mentioned earlier, these nodes provide their data separately as `msg.payload`. We use Change nodes to modify the message structure before sending the data to ensure a more structured and organized format.  

Next, a Join node merges the `msg.data` objects from all Change nodes into a single data object. After that, another Change node assigns this combined object to `msg.payload`.  

The final combined object appears as shown in the image below:

![Combined object containing system data such as CPU usage, memory usage, uptime, and load average.](/blog/2025/02/images/combine-object.png){data-zoomable}
_Combined object containing system data such as CPU usage, memory usage, uptime, and load average._

To share this data with other Node-RED instances, we use the **Project Out** node, which is available exclusively on FlowFuse. It works similarly to the Node-RED Link nodes, but allows for communication between multiple Instances, and uses MQTT in the background, so also beenfits with topic hierarchies for any communications.

In this Project node, we broadcast the message across all instances in the team using `${FF_DEVICE_NAME}` as the topic—an environment variable automatically created in all FlowFuse instances. 

![Image showing the environment variables of Raspberry Pi devices with their values.](/blog/2025/02/images/env.png){data-zoomable}
_Image showing the environment variables of Raspberry Pi devices with their values._

Using environment variables as the topic enables the same flow to be used across multiple devices without modification, ensuring that each device utilizes its own environment variables (device name) and sends data under its respective topic.

### Visualizing Data with the FlowFuse Dashboard  

Now that the data is being broadcasted, it can be used to build a simple dashboard that visualizes it with different types of charts.  

![Dashboard monitoring device CPU usage, memory uptime, and load average](/blog/2025/02/images/dashboard-monitoring-device.png){data-zoomable}
_Dashboard monitoring device CPU usage, memory uptime, and load average_

Ensure that a separate **Hosted Instance** has been created in the same Team where the hardware is registered. This instance will be used to deploy the dashboard.  

#### Setting Up the Data Source

1. Drag the **Project In** node onto the canvas.  
2. Double-click on it and select "Listen for broadcast messages from".  
3. Choose "All instances and devices" from the "Source" dropdown menu.  
4. Enter the device name in the topic field, ensuring it matches exactly with the `${FF_DEVICE_NAME}` device environment variable.  
5. Click **Done**.  

#### Memory Usage Visualization

1. Drag two **Change** nodes onto the canvas.  
2. Double-click on the first **Change** node. Set `msg.payload` to:  
   ```json
   payload.MEMORY_USAGE.totalmem - payload.MEMORY_USAGE.freemem
   ```  
3. Set `msg.topic` to "USED MEMORY" and click **Done**.  
4. Double-click on the second **Change** node, Set `msg.payload` to:  
   ```json
   msg.payload.MEMORY_USAGE.freemem
   ```  
5. Set `msg.topic` to "Free Memory" and click **Done**.  
6. Drag a **ui-chart** widget onto the canvas.  
7. Double-click on the widget and create a new Group.  
8. Set the chart type to "Pie" and action to "Append".  
9. Set X to `msg.topic` and leave Y empty.  
10. Click **Done**.  
11. Connect the nodes as follows:  

 Project In node → Change nodes → ui-chart widget  

#### CPU Usage Visualization

1. Drag a Change node onto the canvas.  
2. Double-click on the node. Set `msg.payload` to:  
   ```json
   $round(payload.CPU_USAGE, 2)
   ```  
3. Click Done.  
4. Drag a ui-gauge widget onto the canvas.  
5. Double-click on the widget and create a new group.  
6. Set the height and size.  
7. Select "3/4 gauge" with a rounded style.  
8. Set the range from 0 to 100.  
9. Add three segments with colors: 0 (Green), 50 (Yellow), 80 (Red).  
10. Set the label to "CPU" and unit to %.  
11. Click Done.  
12. Connect the nodes as follows:  

 Project In node → Change node → ui-gauge widget

#### System Uptime Visualization

1. Drag the Humanizer node onto the canvas.  
2. Double-click on the node and enter "UPTIME" in the input variable field.  
3. Click Done.  
4. Drag a Change node onto the canvas.  
5. Double-click on the node. Set `msg.payload` to:  
   ```json
   msg.payload.humanized
   ```  
6. Click Done.  
7. Drag a ui-text widget onto the canvas.  
8. Double-click on it and create a new group.  
9. Select the correct layout.
10. Check the "Apply Styles" option and select the color, font, and size that best suits your needs.
11. Click Done.
12. Connect the nodes as follows:
   
 Project In node → Humanizer node → Change node → ui-text widget 

Below is the complete dashboard flow, which visualizes the system data we collected.



::render-flow
---
height: 200
flow: "W3siaWQiOiIwMTg2NTdmZDZhN2U0MjM3IiwidHlwZSI6InByb2plY3QgbGluayBpbiIsInoiOiI3OTdlMDg0MTAwY2VjODY0IiwibmFtZSI6InByb2plY3QgaW4gMSIsInByb2plY3QiOiJhbGwiLCJicm9hZGNhc3QiOnRydWUsInRvcGljIjoiTWFjT1MiLCJ4Ijo4MCwieSI6MjYwLCJ3aXJlcyI6W1siMTMzNWY0MjgzYjZiYWMxMCIsImFjZDY3NWZlYmJkYWRjNmYiLCJmODc1ZGRjYzBkZTFjNDBmIiwiOTVlM2QzNTZiZDU4OWJlNyIsIjdjZGUxODZkZDE2MDFlZmIiLCI2NDQ4Y2FiNzg1NzNiZjM5IiwiZDBlMjMyZWM3ODA2NTBmYSJdXX0seyJpZCI6IjEzMzVmNDI4M2I2YmFjMTAiLCJ0eXBlIjoiY2hhbmdlIiwieiI6Ijc5N2UwODQxMDBjZWM4NjQiLCJuYW1lIjoiRnJlZSBNZW1vcnkiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuTUVNT1JZX1VTQUdFLmZyZWVtZW0iLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoidG9waWMiLCJwdCI6Im1zZyIsInRvIjoiRnJlZSBNZW1vcnkiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MjcwLCJ5IjoxNjAsIndpcmVzIjpbWyJlZWQwODM3ZmNjZjI2MzlkIl1dfSx7ImlkIjoiZWVkMDgzN2ZjY2YyNjM5ZCIsInR5cGUiOiJ1aS1jaGFydCIsInoiOiI3OTdlMDg0MTAwY2VjODY0IiwiZ3JvdXAiOiJhNTRlZWQ0YzcxMTBkZmI1IiwibmFtZSI6Ik1lbW9yeSBVc2FnZSIsImxhYmVsIjoiWCAtIG1zZy50b3BpYywgU2VyaWVzIC0gbXNnLnNlcmllcyIsIm9yZGVyIjoxLCJjaGFydFR5cGUiOiJwaWUiLCJjYXRlZ29yeSI6IlBpZSIsImNhdGVnb3J5VHlwZSI6InN0ciIsInhBeGlzTGFiZWwiOiIiLCJ4QXhpc1Byb3BlcnR5IjoidG9waWMiLCJ4QXhpc1Byb3BlcnR5VHlwZSI6Im1zZyIsInhBeGlzVHlwZSI6InJhZGlhbCIsInhBeGlzRm9ybWF0IjoiIiwieEF4aXNGb3JtYXRUeXBlIjoiYXV0byIsInhtaW4iOiIiLCJ4bWF4IjoiIiwieUF4aXNMYWJlbCI6IiIsInlBeGlzUHJvcGVydHkiOiIiLCJ5QXhpc1Byb3BlcnR5VHlwZSI6InByb3BlcnR5IiwieW1pbiI6IiIsInltYXgiOiIiLCJiaW5zIjoiIiwiYWN0aW9uIjoiYXBwZW5kIiwic3RhY2tTZXJpZXMiOmZhbHNlLCJwb2ludFNoYXBlIjoiY2lyY2xlIiwicG9pbnRSYWRpdXMiOjQsInNob3dMZWdlbmQiOnRydWUsInJlbW92ZU9sZGVyIjoxLCJyZW1vdmVPbGRlclVuaXQiOiIzNjAwIiwicmVtb3ZlT2xkZXJQb2ludHMiOiIiLCJjb2xvcnMiOlsiIzAwOTVmZiIsIiNmZjAwMDAiLCIjZmY3ZjBlIiwiIzJjYTAyYyIsIiM5OGRmOGEiLCIjZDYyNzI4IiwiI2ZmOTg5NiIsIiM5NDY3YmQiLCIjYzViMGQ1Il0sInRleHRDb2xvciI6WyIjNjY2NjY2Il0sInRleHRDb2xvckRlZmF1bHQiOnRydWUsImdyaWRDb2xvciI6WyIjZTVlNWU1Il0sImdyaWRDb2xvckRlZmF1bHQiOnRydWUsIndpZHRoIjoiMyIsImhlaWdodCI6IjMiLCJjbGFzc05hbWUiOiIiLCJpbnRlcnBvbGF0aW9uIjoibGluZWFyIiwieCI6NTIwLCJ5IjoxNDAsIndpcmVzIjpbW11dfSx7ImlkIjoiYWNkNjc1ZmViYmRhZGM2ZiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiNzk3ZTA4NDEwMGNlYzg2NCIsIm5hbWUiOiJVc2VkIE1lbW9yeSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5NRU1PUllfVVNBR0UudG90YWxtZW0gLSBwYXlsb2FkLk1FTU9SWV9VU0FHRS5mcmVlbWVtIiwidG90IjoianNvbmF0YSJ9LHsidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJVc2VkIE1lbW9yeSIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoyODAsInkiOjEyMCwid2lyZXMiOltbImVlZDA4MzdmY2NmMjYzOWQiXV19LHsiaWQiOiJmODc1ZGRjYzBkZTFjNDBmIiwidHlwZSI6ImNoYW5nZSIsInoiOiI3OTdlMDg0MTAwY2VjODY0IiwibmFtZSI6IkNQVSBPdmVyYWxsIFVzYWdlIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiIkcm91bmQocGF5bG9hZC5DUFVfVVNBR0UsIDIpIiwidG90IjoianNvbmF0YSJ9LHsidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJDUFUgT3ZlcmFsbCBVc2FnZSIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoyOTAsInkiOjI2MCwid2lyZXMiOltbImE3NzdlYjU3NjExZGRkNjAiXV19LHsiaWQiOiJhNzc3ZWI1NzYxMWRkZDYwIiwidHlwZSI6InVpLWdhdWdlIiwieiI6Ijc5N2UwODQxMDBjZWM4NjQiLCJuYW1lIjoiIiwiZ3JvdXAiOiIwZDFmN2U0NzAzMWM3NGMxIiwib3JkZXIiOjEsIndpZHRoIjoiNCIsImhlaWdodCI6IjUiLCJndHlwZSI6ImdhdWdlLTM0IiwiZ3N0eWxlIjoicm91bmRlZCIsInRpdGxlIjoiQ1BVICIsInVuaXRzIjoidW5pdHMiLCJpY29uIjoiIiwicHJlZml4IjoiIiwic3VmZml4IjoiIiwic2VnbWVudHMiOlt7ImZyb20iOiIwIiwiY29sb3IiOiIjNWNkNjVjIn0seyJmcm9tIjoiNCIsImNvbG9yIjoiI2ZmYzgwMCJ9LHsiZnJvbSI6IjciLCJjb2xvciI6IiNlYTUzNTMifV0sIm1pbiI6MCwibWF4IjoxMCwic2l6ZVRoaWNrbmVzcyI6MTYsInNpemVHYXAiOjQsInNpemVLZXlUaGlja25lc3MiOjgsInN0eWxlUm91bmRlZCI6dHJ1ZSwic3R5bGVHbG93IjpmYWxzZSwiY2xhc3NOYW1lIjoiIiwieCI6NDkwLCJ5IjoyNjAsIndpcmVzIjpbXX0seyJpZCI6Ijk1ZTNkMzU2YmQ1ODliZTciLCJ0eXBlIjoiaHVtYW5pemVyIiwieiI6Ijc5N2UwODQxMDBjZWM4NjQiLCJuYW1lIjoiIiwiaW5wdXQiOiJVUFRJTUUiLCJ4IjoyOTAsInkiOjM0MCwid2lyZXMiOltbIjlkMjM3ZmY2NzZhZDYwODMiXV19LHsiaWQiOiI3OWU1YmRmYTMwOWQyN2VhIiwidHlwZSI6InVpLXRleHQiLCJ6IjoiNzk3ZTA4NDEwMGNlYzg2NCIsImdyb3VwIjoiMzgyN2ZhNzY1MGZhMmZhMSIsIm9yZGVyIjoxLCJ3aWR0aCI6IjQiLCJoZWlnaHQiOiI1IiwibmFtZSI6IlVwdGltZSIsImxhYmVsIjoiIiwiZm9ybWF0Ijoie3ttc2cucGF5bG9hZH19IiwibGF5b3V0IjoiY29sLWNlbnRlciIsInN0eWxlIjp0cnVlLCJmb250IjoiIiwiZm9udFNpemUiOiI5OSIsImNvbG9yIjoiIzAwNTZkNiIsIndyYXBUZXh0IjpmYWxzZSwiY2xhc3NOYW1lIjoiIiwieCI6NjgwLCJ5IjozNDAsIndpcmVzIjpbXX0seyJpZCI6IjlkMjM3ZmY2NzZhZDYwODMiLCJ0eXBlIjoiY2hhbmdlIiwieiI6Ijc5N2UwODQxMDBjZWM4NjQiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkLmh1bWFuaXplZCIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo0ODAsInkiOjM0MCwid2lyZXMiOltbIjc5ZTViZGZhMzA5ZDI3ZWEiXV19LHsiaWQiOiI3Y2RlMTg2ZGQxNjAxZWZiIiwidHlwZSI6ImNoYW5nZSIsInoiOiI3OTdlMDg0MTAwY2VjODY0IiwibmFtZSI6Ik9uZSBNaW51dGUgKExPQURfQVZFUkFHRSkiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuTE9BRF9BVkVSQUdFLk9ORV9NSU4iLCJ0b3QiOiJqc29uYXRhIn0seyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6Ik9uZSBNaW51dGUiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MzMwLCJ5Ijo0MDAsIndpcmVzIjpbWyJiNWJmMmM4YzkzYWJiNWE5Il1dfSx7ImlkIjoiNjQ0OGNhYjc4NTczYmYzOSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiNzk3ZTA4NDEwMGNlYzg2NCIsIm5hbWUiOiJGaXZlIE1pbnV0ZSAoTE9BRF9BVkVSQUdFKSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC5MT0FEX0FWRVJBR0UuRklWRV9NSU4iLCJ0b3QiOiJqc29uYXRhIn0seyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6IkZpdmUgTWludXRlIiwidG90Ijoic3RyIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjMzMCwieSI6NDQwLCJ3aXJlcyI6W1siYjViZjJjOGM5M2FiYjVhOSJdXX0seyJpZCI6ImQwZTIzMmVjNzgwNjUwZmEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6Ijc5N2UwODQxMDBjZWM4NjQiLCJuYW1lIjoiRmlmdGVlbiBNaW51dGUgKExPQURfQVZFUkFHRSkiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuTE9BRF9BVkVSQUdFLkZJRlRFRU5fTUlOIiwidG90IjoianNvbmF0YSJ9LHsidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJGaWZ0ZWVuIE1pbnV0ZSIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjozNDAsInkiOjQ4MCwid2lyZXMiOltbImI1YmYyYzhjOTNhYmI1YTkiXV19LHsiaWQiOiJiNWJmMmM4YzkzYWJiNWE5IiwidHlwZSI6InVpLWNoYXJ0IiwieiI6Ijc5N2UwODQxMDBjZWM4NjQiLCJncm91cCI6IjBjNzhkY2IzYWVmYjM4YTgiLCJuYW1lIjoiTE9BRCBBVkVSQUdFIiwibGFiZWwiOiJjaGFydCIsIm9yZGVyIjoxLCJjaGFydFR5cGUiOiJsaW5lIiwiY2F0ZWdvcnkiOiJ0b3BpYyIsImNhdGVnb3J5VHlwZSI6Im1zZyIsInhBeGlzTGFiZWwiOiIiLCJ4QXhpc1Byb3BlcnR5IjoiIiwieEF4aXNQcm9wZXJ0eVR5cGUiOiJ0aW1lc3RhbXAiLCJ4QXhpc1R5cGUiOiJ0aW1lIiwieEF4aXNGb3JtYXQiOiIiLCJ4QXhpc0Zvcm1hdFR5cGUiOiJhdXRvIiwieG1pbiI6IiIsInhtYXgiOiIiLCJ5QXhpc0xhYmVsIjoiIiwieUF4aXNQcm9wZXJ0eSI6InBheWxvYWQiLCJ5QXhpc1Byb3BlcnR5VHlwZSI6Im1zZyIsInltaW4iOiIiLCJ5bWF4IjoiIiwiYmlucyI6MTAsImFjdGlvbiI6ImFwcGVuZCIsInN0YWNrU2VyaWVzIjpmYWxzZSwicG9pbnRTaGFwZSI6ImRhc2giLCJwb2ludFJhZGl1cyI6NCwic2hvd0xlZ2VuZCI6dHJ1ZSwicmVtb3ZlT2xkZXIiOjEsInJlbW92ZU9sZGVyVW5pdCI6IjM2MDAiLCJyZW1vdmVPbGRlclBvaW50cyI6IiIsImNvbG9ycyI6WyIjMDA5NWZmIiwiI2ZmMDAwMCIsIiNmZjdmMGUiLCIjMmNhMDJjIiwiI2EzNDdlMSIsIiNkNjI3MjgiLCIjZmY5ODk2IiwiIzk0NjdiZCIsIiNjNWIwZDUiXSwidGV4dENvbG9yIjpbIiM2NjY2NjYiXSwidGV4dENvbG9yRGVmYXVsdCI6dHJ1ZSwiZ3JpZENvbG9yIjpbIiNlNWU1ZTUiXSwiZ3JpZENvbG9yRGVmYXVsdCI6dHJ1ZSwid2lkdGgiOiIxMiIsImhlaWdodCI6IjYiLCJjbGFzc05hbWUiOiIiLCJpbnRlcnBvbGF0aW9uIjoibGluZWFyIiwieCI6NjEwLCJ5Ijo0NDAsIndpcmVzIjpbW11dfSx7ImlkIjoiYTU0ZWVkNGM3MTEwZGZiNSIsInR5cGUiOiJ1aS1ncm91cCIsIm5hbWUiOiJNZW1vcnkgVXNhZ2UiLCJwYWdlIjoiZDA2MjFiOGYyMGFlZTY3MSIsIndpZHRoIjoiMyIsImhlaWdodCI6IjMiLCJvcmRlciI6Mywic2hvd1RpdGxlIjp0cnVlLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UiLCJncm91cFR5cGUiOiJkZWZhdWx0In0seyJpZCI6IjBkMWY3ZTQ3MDMxYzc0YzEiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiQ1BVIFVzYWdlIiwicGFnZSI6ImQwNjIxYjhmMjBhZWU2NzEiLCJ3aWR0aCI6IjQiLCJoZWlnaHQiOiI1Iiwib3JkZXIiOjIsInNob3dUaXRsZSI6dHJ1ZSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIiwiZ3JvdXBUeXBlIjoiZGVmYXVsdCJ9LHsiaWQiOiIzODI3ZmE3NjUwZmEyZmExIiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6IlNZU1RFTSBVUFRJTUUiLCJwYWdlIjoiZDA2MjFiOGYyMGFlZTY3MSIsIndpZHRoIjoiNSIsImhlaWdodCI6IjUiLCJvcmRlciI6MSwic2hvd1RpdGxlIjp0cnVlLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UiLCJncm91cFR5cGUiOiJkZWZhdWx0In0seyJpZCI6IjBjNzhkY2IzYWVmYjM4YTgiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiTG9hZCBBdmVyYWdlIiwicGFnZSI6ImQwNjIxYjhmMjBhZWU2NzEiLCJ3aWR0aCI6IjEyIiwiaGVpZ2h0IjoxLCJvcmRlciI6NCwic2hvd1RpdGxlIjp0cnVlLCJjbGFzc05hbWUiOiIiLCJ2aXNpYmxlIjoidHJ1ZSIsImRpc2FibGVkIjoiZmFsc2UiLCJncm91cFR5cGUiOiJkZWZhdWx0In0seyJpZCI6ImQwNjIxYjhmMjBhZWU2NzEiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJNYWMgT1MiLCJ1aSI6IjZjODQ1MGM1MmNhZmExNDUiLCJwYXRoIjoiL21hY29zIiwiaWNvbiI6ImhvbWUiLCJsYXlvdXQiOiJncmlkIiwidGhlbWUiOiI1MDc1YTdkOGU0OTQ3NTg2IiwiYnJlYWtwb2ludHMiOlt7Im5hbWUiOiJEZWZhdWx0IiwicHgiOiIwIiwiY29scyI6IjMifSx7Im5hbWUiOiJUYWJsZXQiLCJweCI6IjU3NiIsImNvbHMiOiI2In0seyJuYW1lIjoiU21hbGwgRGVza3RvcCIsInB4IjoiNzY4IiwiY29scyI6IjkifSx7Im5hbWUiOiJEZXNrdG9wIiwicHgiOiIxMDI0IiwiY29scyI6IjEyIn1dLCJvcmRlciI6MSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6IjZjODQ1MGM1MmNhZmExNDUiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJNeSBEYXNoYm9hcmQiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImFwcEljb24iOiIiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1ub3RpZmljYXRpb24iLCJ1aS1jb250cm9sIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwiaGVhZGVyQ29udGVudCI6InBhZ2UiLCJuYXZpZ2F0aW9uU3R5bGUiOiJkZWZhdWx0IiwidGl0bGVCYXJTdHlsZSI6ImRlZmF1bHQiLCJzaG93UmVjb25uZWN0Tm90aWZpY2F0aW9uIjp0cnVlLCJub3RpZmljYXRpb25EaXNwbGF5VGltZSI6MSwic2hvd0Rpc2Nvbm5lY3ROb3RpZmljYXRpb24iOnRydWV9LHsiaWQiOiI1MDc1YTdkOGU0OTQ3NTg2IiwidHlwZSI6InVpLXRoZW1lIiwibmFtZSI6IkRlZmF1bHQgVGhlbWUiLCJjb2xvcnMiOnsic3VyZmFjZSI6IiNmZmZmZmYiLCJwcmltYXJ5IjoiIzAwOTRDRSIsImJnUGFnZSI6IiNlZWVlZWUiLCJncm91cEJnIjoiI2ZmZmZmZiIsImdyb3VwT3V0bGluZSI6IiNjY2NjY2MifSwic2l6ZXMiOnsicGFnZVBhZGRpbmciOiIxMnB4IiwiZ3JvdXBHYXAiOiIxMnB4IiwiZ3JvdXBCb3JkZXJSYWRpdXMiOiI0cHgiLCJ3aWRnZXRHYXAiOiIxMnB4In19XQ=="
---
::



### Scaling Device Monitoring with FlowFuse

Now that we have learned how to monitor a single device, built a flow to gather system data, and created a dashboard to visualize those metrics, the real challenge arises when scaling up to thousands or even tens of thousands of devices. Manually creating a system data-gathering flow for each device would be impractical. However, FlowFuse can automate this process in less than five minutes. Let's see how.

#### Creating Device Group

1. Navigate to the FlowFuse platform and go to the Application where your devices are and where you want to create a group. Ensure that all the devices you want to monitor are part of this application.  

![Showing the option to switch to "Device Groups" and the "Add Device Group" button.](/blog/2025/02/images/option-add-device-group.png){data-zoomable}  
_Showing the option to switch to "Device Groups" and the "Add Device Group" button._

1. Click on "Device Groups" from the top menu. Next, click on the "Add Device Group" button. In the newly opened window, enter a group name and description, then click "Create".  

![Form to Create a Device Group: Enter the group name and description ](/blog/2025/02/images/device-group-form-create.png){data-zoomable}  
_Form to Create a Device Group: Enter the group name and description_

2. Click on the newly created group and then click the "Edit" button at the top-right.

![Image showing the edit button to be clicked on.](/blog/2025/02/images/edit-device-group.png){data-zoomable}  
_Image showing the edit button to be clicked on._

3. Next, in the left-side container, you will see a list of all available devices in your application. Select the devices you want to add to the group (make sure to add only the devices that require the deployment of the flow built to gather system metrics). Click the "Add Devices" button at the top-right of that container, and then click "Save Changes". Once done, you will see all added devices in the right-side container, confirming that they have been successfully added to the group.

![Interface to select the devices that need to be added to the group, along with the 'Add Devices' button.](./images/device-group-device-adding.png ){data-zoomable}  
_Interface to select the devices that must be added to the group, along with the 'Add Devices' button._

![Showing the selected devices we chose to add, along with the 'Save Changes' button.](./images/save-changes-to-add-devices.png ){data-zoomable}  
_Showing the selected devices we chose to add, along with the 'Save Changes' button._

#### Creating Snapshot

1. Navigate to the Remote Instance on which we developed the flow to monitor performance. Switch to "Version History" by clicking on "Version History" from the top.

2. Go to the Snapshots tab and create a new snapshot by clicking the "Create Snapshot" button. Enter details such as the name and description. While making the snapshot, ensure the "Set as Target" option is checked before clicking "Create". Enabling this option sets the created snapshot as the device’s active snapshot. Later, this snapshot will be used for deployment on devices within the device group via the DevOps pipeline.

![Showing the option to switch to "Version history" and the "Create Snapshot" button.](./images/create-snapshot.png ){data-zoomable}  
_Showing the option to switch to "Version history" and the "Create Snapshot" button._

!["Showing the form to create a snapshot and the "Set as Target" option."](./images/set-active-snapshot.png ){data-zoomable}  
_Showing the form to create a snapshot and the "Set as Target" option._

If you want to learn more about snapshots, you can read our article [Using Snapshots for Version Control in Node-RED with FlowFuse](/blog/2024/09/node-red-version-control-with-snapshots/).

#### Creating a DevOps Pipeline  

1. Navigate to the application where the devices were added and the device group was created. Switch to the "Pipelines" tab at the top, then click "Add Pipeline". In the newly opened window, enter a pipeline name.  

![Image showing the 'Add Pipeline' button.](/blog/2025/02/images/add-pipeline-button.png){data-zoomable}  
_Image showing the 'Add Pipeline' button._  

![Image showing the form to create a pipeline by entering a name.](/blog/2025/02/images/pipeline-creation-form.png){data-zoomable}  
_Image showing the form to create a pipeline by entering a name._  

2. In the newly added pipeline, click "Add Stage".  

![Image showing the button to add a stage.](/blog/2025/02/images/adding-stage-button.png){data-zoomable}  
_Image showing the button to add a stage._  

3. In the newly opened window, select "Remote Instance" as the stage type, enter a stage name, and select the device where the flow was previously built for a single device. Under "Action," select "Use active snapshot" and click "Add Stage".  

![Image showing the form to add a stage, where a stage is being added for a Raspberry Pi remote instance.](/blog/2025/02/images/rpi-stage.png){data-zoomable}  
_Image showing the form to add a stage, where a stage is being added for a Raspberry Pi remote instance._  

4. To add another stage, select "Device Group" as the stage type, enter a stage name, choose the previously created device group, and click "Add Stage."  

![Image showing the form to add a stage, where a stage is being added for a Device Group.](/blog/2025/02/images/production-with-deviec-group.png){data-zoomable}  
_Image showing the form to add a stage, where a stage is being added for a Device Group._ 

5. Before moving further, ensure all devices are in fleet mode.  

![Image showing the fleet mode status of the device (disabling the developer mode option will set the device to fleet mode).](/blog/2025/02/images/fleet-mode.png){data-zoomable}  
_Image showing the fleet mode status of the device (disabling the developer mode option will set the device to fleet mode)._  

6. Once both stages are added, click the 'Run Pipeline' button for the first stage. Running the pipeline will deploy the active snapshot to the devices in the device group, including all settings, environment variables, and flows of that instance. Whether the device group has two devices or thousands, the deployment will be completed efficiently and quickly.

To learn more about DevOps pipelines, read the article: [Creating and Automating DevOps Pipelines for Node-RED in Industrial Environments](/blog/2024/10/how-to-build-automate-devops-pipelines-node-red-deployments/).  

Now, you have the system data of all devices broadcasted on the topic and the device name. To monitor each device, go to the dashboard instance, copy the flow, and create copies for each device. Ensure that you replace the topic with the corresponding device name. Additionally, create a separate page for each device, assign them to separate groups, and correctly move all copied widgets into the appropriate groups. Alternatively, follow [these steps](#visualizing-data-with-the-flowfuse-dashboard) again for each device, and you will have a centralized dashboard monitoring thousands of devices live.

<lite-youtube videoid="43te5aD1RRw" params="rel=0" style="width: 704px; height: 100%;" title="YouTube video player"></lite-youtube>

## Conclusion

Building a monitoring flow in Node-RED is simple. It allows you to track key system metrics like CPU usage, memory, and uptime with minimal effort. Its low-code Interface makes it easy to create and deploy monitoring solutions quickly.

However, manually deploying this monitoring flow across 10,000 or even 100,000 devices can be a complex and time-consuming task. This is where FlowFuse makes a difference. With features like Device Groups and DevOps pipelines, you can deploy your application from a single device or hosted Node-RED instance to thousands of devices with just a single click. FlowFuse also provides powerful tools for scaling, managing, and monitoring industrial operations, making large-scale deployments more efficient and hassle-free.
