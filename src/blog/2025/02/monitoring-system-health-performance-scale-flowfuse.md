--- 
title: "Monitoring System Health and Performance at Scale with FlowFuse" 
subtitle: "Track and Optimize Device Performance with Node-RED and FlowFuse."
description: "Learn how to monitor system health and performance with Node-RED. Track CPU usage, memory, and other key metrics, and scale device monitoring efficiently with FlowFuse."
date: 2025-02-11
authors: ["sumit-shinde"]
image:
keywords: 
tags: 
 - node-red
---

Monitoring system health is crucial for keeping devices running smoothly, whether in an IoT network or an industrial setup. High CPU usage, memory overload, or unexpected failures can lead to downtime, data loss, and costly repairs. By tracking key metrics in real time, issues can be detected early, preventing disruptions.

<!--more-->

In this post, we will show you how to monitor devices using Node-RED. We will start by building a flow that captures system metrics from a Raspberry Pi, and later, we will explore how FlowFuse simplifies large-scale device monitoring.

## What Exactly Does Monitoring Device Health Mean and Why Is It Essential?

Monitoring device health means keeping an eye on basic metrics like CPU usage, memory, and performance to make sure devices are working properly. This helps you spot problems early, before they turn into bigger issues like crashes or downtime. In IoT and IIoT, devices are often essential for daily tasks, and if they fail, it can cause disruptions, safety risks, or financial losses. For example, if a machine’s CPU is overloaded or its memory is full, it can lead to wrong data or a complete failure of the system.

By monitoring these metrics regularly, you can catch problems early, fix them quickly, and reduce downtime. It also ensures devices are running efficiently, not wasting resources. In industrial settings, this can prevent costly breakdowns or unsafe situations, while in IoT networks, it makes sure that smart devices are working as they should.

## Monitoring CPU and System Data

Throughout this section, we will demonstrate how to retrieve key metrics such as CPU usage, memory usage, and other system data from a device. For this guide, I have used a Raspberry Pi, a Windows machine, and a macOS device.

First, we will focus on monitoring a single device—starting with the Raspberry Pi. We will send this data to a hosted Node-RED instance and visualize it using the FlowFuse dashboard. Later, we will explore how to scale the monitoring process to multiple devices efficiently. Additionally, we will build a basic dashboard to display the collected data.

### Prerequisites

Before you begin, ensure you have the following:

- Running Node-RED Instance: Make sure you have a running Node-RED instance on the device you need to monitor. You can use the FlowFuse Device Agent to install Node-RED, which allows you to access the instance remotely with full security. It also provides additional features such as real-time collaboration with your team, snapshot for recovering from accidental changes, DevOps tools, and the ability to manage multiple devices in groups. You can push updates to all devices with a single click and much more.

For a step-by-step guide on installing and running the FlowFuse device agent, refer to the official documentation: [FlowFuse Device Agent Quickstart](/docs/device-agent/quickstart/).

If you haven’t signed up for a FlowFuse account yet, [sign up now](https://app.flowfuse.com/account/create/).

- Install Necessary Nodes: Install [node-red-contrib-os](https://flows.nodered.org/node/node-red-contrib-os) and [node-red-contrib-cpu](https://flows.nodered.org/node/node-red-contrib-cpu) to retrieve system and CPU usage data. You can install them via the [Node-RED Palette Manager](https://nodered.org/docs/user-guide/editor/palette/manager). Additionally, install [@flowfuse/node-red-dashboard](https://flows.nodered.org/node/@flowfuse/node-red-dashboard) to build a dashboard for visualizing and monitoring system metrics in real-time. Also, install [node-red-contrib-moment](https://flows.nodered.org/node/node-red-contrib-moment) to format the uptime duration in a human-readable format.  

## Collecting CPU and System Metrics with Node-RED

Now that Node-RED is set up on the device, let's collect key system metrics that are important for monitoring such as overall CPU Usage, Memory Usage, System Uptime 

**Collecting CPU Usage Data**

1. Drag the CPU node from the Performance category onto the canvas, double-click it, and uncheck all options except the first one: "Send a message for overall usage." This simplifies monitoring overall CPU performance. If you need separate metrics for each core, you can select the second or third option instead.
2. Drag an Inject node onto the canvas, double-click it, and set it to trigger at the desired interval (e.g., every second, every 10 seconds, or every 30 seconds). Connect the output of the Inject node to the input of the CPU node.
3. Drag a Debug node onto the canvas and connect it to the output of the CPU node to view the collected data in the debug pane.
4. Deploy the flow by clicking the Deploy button in the top right corner of the Node-RED editor.

Once deployed, you will start receiving CPU usage data in the debug pane, allowing you to monitor system performance in real time.

**Monitoring Memory Usage**

1. Drag the Memory node the onto the canvas, double-click it, and select the unit you want to use for memory (e.g., byte, gigabyte, etc.). Selecting gigabyte will make it easier to interpret.  
2. Connect the Memory node input to the output of the Inject node.  
3. Then, connect the output of the Memory node to the input of the Debug node that you previously added.
4. Deploy the flow.  

Now, alongside the CPU data, you will receive an object containing the following properties in the debug pane:  

- totalmem: total available memory  
- freemem: free memory  
- memusage: current memory usage.

**Tracking System Uptime**

1. Drag the Uptime node onto the canvas.  
2. Connect the input of the Uptime node to the output of the Inject node.  
3. Then, connect the output of the Uptime node to the input of the Debug node that you previously added.  
4. Deploy the flow.  

Once deployed, you will start receiving uptime data in the debug pane. The uptime value represents the total number of seconds the system has been running.

**Analyzing Load Average**

1. Drag the Loadavg node onto the canvas.  
2. Connect the input of the Loadavg node to the output of the Inject node.  
3. Then, connect the output of the Loadavg node to the input of the Debug node.  
4. Deploy the flow.

This will give us the average load over 1 minute, 5 minutes, and 15 minutes. The load average represents the number of processes waiting for CPU time. A high value means the system is under heavy load, while a low value indicates it has available processing capacity. By analyzing these values, you can determine whether system performance is degrading over time. If the load average stays consistently high, it may indicate excessive CPU demand, which could require optimization or additional processing resources.

## Sharing Data Across Different Node-RED Instances

Now that we have the data, we need to send it to the instance where we will build the monitoring dashboard. Using a separate instance ensures that as we scale to multiple devices, we can efficiently monitor all of them from a single dashboard. Additionally, we will combine all the collected data into a single object for better organization and easier processing.

{% renderFlow %}
[{"id":"6f655630d97bac87","type":"cpu","z":"FFF0000000000001","name":"","msgCore":false,"msgOverall":true,"msgArray":false,"msgTemp":false,"x":450,"y":380,"wires":[["d47b2da8024123bf"]]},{"id":"733dc91d94f03e49","type":"inject","z":"FFF0000000000001","name":"","props":[],"repeat":"10","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":210,"y":440,"wires":[["6f655630d97bac87","bcddc3aba82a12da","7af11ed245ddf9c3","d6d58c81cea93671"]]},{"id":"bcddc3aba82a12da","type":"Memory","z":"FFF0000000000001","name":"","scale":"Gigabyte","x":440,"y":420,"wires":[["03ee32ddbd80d7a2"]]},{"id":"7af11ed245ddf9c3","type":"Uptime","z":"FFF0000000000001","name":"","x":440,"y":460,"wires":[["6117e013be2a11ac"]]},{"id":"d6d58c81cea93671","type":"Loadavg","z":"FFF0000000000001","name":"","x":440,"y":500,"wires":[["b759167c1663eb21"]]},{"id":"d47b2da8024123bf","type":"change","z":"FFF0000000000001","name":"CPU USAGE","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.CPU_USAGE","pt":"msg","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":650,"y":380,"wires":[["7429fa970d1e3099"]]},{"id":"03ee32ddbd80d7a2","type":"change","z":"FFF0000000000001","name":"MEMORY USAGE","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.MEMORY_USAGE","pt":"msg","to":"payload","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":670,"y":420,"wires":[["7429fa970d1e3099"]]},{"id":"6117e013be2a11ac","type":"change","z":"FFF0000000000001","name":"SYSTEM UPTIME","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.UPTIME","pt":"msg","to":"payload.uptime","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":670,"y":460,"wires":[["7429fa970d1e3099"]]},{"id":"b759167c1663eb21","type":"change","z":"FFF0000000000001","name":"LOAD AVERAGE","rules":[{"t":"set","p":"data","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"data.LOAD_AVERAGE.ONE_MIN","pt":"msg","to":"payload.loadavg[0]","tot":"msg"},{"t":"set","p":"data.LOAD_AVERAGE.FIVE_MIN","pt":"msg","to":"payload.loadavg[1]","tot":"msg"},{"t":"set","p":"data.LOAD_AVERAGE.FIFTEEN_MIN","pt":"msg","to":"payload.loadavg[2]","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":670,"y":500,"wires":[["7429fa970d1e3099"]]},{"id":"7429fa970d1e3099","type":"join","z":"FFF0000000000001","name":"","mode":"custom","build":"merged","property":"data","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","useparts":false,"accumulate":true,"timeout":"","count":"4","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"","reduceFixup":"","x":890,"y":440,"wires":[["133d57048a7b057d"]]},{"id":"133d57048a7b057d","type":"change","z":"FFF0000000000001","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"data","tot":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":1070,"y":440,"wires":[["8123ad61cf50e61e"]]},{"id":"8123ad61cf50e61e","type":"project link out","z":"FFF0000000000001","name":"project out 1","mode":"link","broadcast":true,"project":"28a809c6-b8f3-499f-bb20-e357c292b443","topic":"${FF_DEVICE_NAME}","x":1250,"y":440,"wires":[]}]
{% endrenderFlow %}

Let's understand the flow.

We use four Change nodes, each connected to the output of the CPU, Memory, Uptime, and Loadavg nodes. Since these nodes output data as `msg.payload`, we first use a Change node to initialize msg.data as an empty object. Then, we assign each payload value to a meaningful property within `msg.data`, such as `msg.data.CPU_USAGE` for CPU usage.

Next, we use a Join node to combine the msg.data objects from all Change nodes into a single data object. Another Change node then assigns this combined object back to msg.payload.

To share this data with other Node-RED instances, we use the Project Out node, which are only available in the FlowFuse. It works similarly to MQTT, using MQTT in the background but without requiring manual configuration—just a topic name and the target instance.

We use `${FF_DEVICE_NAME}` as the topic, an environment variable automatically created in all FlowFuse instances. This allows the same flow to be used across multiple devices without modification.  

## Visualizing Data with the FlowFuse Dashboard  

Now that the data is being broadcasted, it can be used to build a simple dashboard that visualizes it with different types of charts.  

Ensure that a separate hosted instance has been created in the same team where the device is registered. This instance will be used to deploy the dashboard.  

1. Drag the Project In node onto the canvas. Double-click on it and select "Listen for broadcast messages from". Choose "All instances and devices" from the dropdown menu. Enter the device name in the topic field and ensure it matches exactly with the device name environment variable. Click Done.  

2. Drag two Change nodes onto the canvas.  

3. Double-click on the first Change node. Set msg.payload to the JSONata expression:  
   ```json
   payload.MEMORY_USAGE.totalmem - payload.MEMORY_USAGE.freemem
   ```  
   Set msg.topic to "USED MEMORY". Click Done.  

4. Double-click on the second Change node. Set msg.payload to:  
   ```json
   msg.payload.MEMORY_USAGE.freemem
   ```  
   Set msg.topic to "Free Memory". Click Done.  

5. Drag the ui-chart widget onto the canvas. Double-click on it and create a new group. Set the correct width and height. Select "Pie" as the chart type. Set the action to "Append". Set X to msg.topic. Leave Y empty. Click Done.  

6. Connect the nodes as follows:  

   Project In node → Change nodes → ui-chart widget  

7. Drag another Change node onto the canvas. Double-click on it and set msg.payload to the JSONata expression:  
   ```json
   $round(payload.CPU_USAGE, 2)
   ```  
   Click Done.  

8. Drag the ui-gauge widget onto the canvas. Double-click on it and create a new group. Set the height and size. Select "3/4 gauge" with a rounded style. Set the range from 0 to 10. Add three segments with different colors: 0 (Green), 4 (Yellow), 7 (Red). Set the label to "CPU". Click Done.  

9. Connect the nodes as follows:  

   Project In node → Change node → ui-gauge widget  

10. Drag the Humanizer node onto the canvas. Double-click on it and enter "UPTIME" in the input variable field.  

11. Drag a Change node onto the canvas. Double-click on it and set msg.payload to msg.payload.humanized.  

12. Drag the ui-text widget onto the canvas. Double-click on it and create a new group. Select the fifth layout. Check "Apply style" and set the text size to 99. Click Done.  

13. Connect the nodes as follows:  

   Project In node → Humanizer node → Change node → ui-text widget  

14. Drag three Change nodes onto the canvas.  

15. Double-click on the first Change node. Set msg.payload to msg.payload.LOAD_AVERAGE.ONE_MIN. Set msg.topic to "One Minute". Click Done.  

16. Double-click on the second Change node. Set msg.payload to msg.payload.LOAD_AVERAGE.FIVE_MIN. Set msg.topic to "Five Minute". Click Done.  

17. Double-click on the third Change node. Set msg.payload to msg.payload.LOAD_AVERAGE.FIFTEEN_MIN. Set msg.topic to "Fifteen Minute". Click Done.  

18. Drag the ui-chart widget onto the canvas. Double-click on it and create a new group. Set the width and height. Set the chart type to "Linear". Set the action to "Append". Set the X-axis type to "Timescale". Set the series to msg.topic. Set X to timestamp and Y to msg.payload. Click Done.  

19. Connect the nodes as follows:  

   Project In node → Change nodes → ui-chart widget  

20 . Deploy the flow by click top-right deploy button

## Scaling Device Monitoring with FlowFuse  

Now that we have learned how to monitor a single device and built a flow that gathers system data from it, the real challenge arises when scaling up to thousands or even tens of thousands of devices. Manually creating a system data-gathering flow for each device would be impractical. However, with FlowFuse, this process can be automated in less than five minutes. Let's see how.  

1. Navigate to the FlowFuse platform and go to the "Groups" page by clicking on "Groups" from the main sidebar.  

2. Click on "Create Group". In the newly opened window, select the application to which this group should belong. Ensure that all the devices you want to monitor are part of this application. Enter a group name and description, then click "Create".  

3. Click on the newly created group and then click the "Edit" button at the top-right. In the left-side container, you will see a list of all available devices in your application. Select the devices you want to add to the group, click the "Add Devices" button at the top-right of that container, and then click "Save Changes" at the top-right of the right-side container. Once done, you will see all added devices in the right-side container, confirming that the devices have been successfully added to the group.  

4. Navigate to the application where the devices were added and the group was created. Switch to the "Pipelines" tab at the top, then click "Add Pipeline". In the newly opened window, enter a pipeline name.  

5. In the newly added pipeline, click "Add Stage". In the newly opened window, select "Remote Instance" as the stage type, enter a stage name, and select the device where we previously built the flow for a single device. Select "Use latest device snapshot" under "Action" and click "Add Stage".  

6. Add another stage, select "Device Group" as the stage type, enter a stage name, choose the device group created earlier, and click "Add Stage".  

7. Once both stages are added, click the "Run Pipeline" button for the first stage. Running the pipeline creates a snapshot that includes all settings, environment variables, and flows for that instance. This snapshot is then copied and deployed to the next stage, which includes all devices in the group. Whether you have 100, 1,000, or 10,000 devices, your system data-gathering flow will be deployed and running in just a few seconds.

Now you have the system data of all devices broadcasted on the topic with the device name. To monitor each device, go to the dashboard instance, copy the flow, and create copies for each device. Make sure to replace the topic with the corresponding device name. Additionally, ensure that you have created a separate page for each device, assigned them to separate groups, and correctly moved all copied widgets in to the correct groups.  

## Conclusion

Building a monitoring flow in Node-RED is simple, allowing you to track key system metrics like CPU usage, memory, and uptime with minimal effort. Its low-code interface makes it easy to create and deploy monitoring solutions quickly.

However, manually deploying this monitoring flow across 10,000 or even 100,000 devices can be a complex and time-consuming task. This is where FlowFuse makes a difference. With features like Device Groups and DevOps pipelines, you can deploy your application from a single device or hosted Node-RED instance to thousands of devices with just a single click. FlowFuse also provides powerful tools for scaling, managing, and monitoring industrial operations, making large-scale deployments more efficient and hassle-free.