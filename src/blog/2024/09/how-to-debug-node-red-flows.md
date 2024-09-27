---
title: How to Debug Node-RED Flows Using Debugger
subtitle: Learn Advanced Debugging Techniques for Node-RED
description: Debug Node-RED flows using the Debugger. Learn to set breakpoints, step through execution, and inspect messages for efficient troubleshooting.
date: 2024-09-27
authors: ["sumit-shinde"]
image: 
tags:
   - post
   - nodered
---

When it comes to debugging application flows in Node-RED, the tool most Node-RED developers often reach for is the [Debug](/node-red/core-nodes/debug/) node. It provides a simple way to output message payloads or other data to the debug sidebar, helping you gain insights into how your flow is working. But what if you needed more control and visibility over the flow’s execution? What if you wanted to step through each node in detail, inspect variables, or pause the flow at certain points to understand what’s happening?

<!--more-->

In these cases, using the **Node-RED Debugger** becomes invaluable. The debugger allows you to interactively trace the execution of your flows, set breakpoints, and gain deeper insights beyond what the Debug node offers. This guide will show you how to effectively use the Node-RED Debugger to pinpoint issues and fine-tune your applications.

## What is Debugging  and Why it is crucial in Node-RED Flows?

Debugging is the process of finding and fixing issues in your code or workflow. In Node-RED, debugging helps you understand how your flows are functioning by providing insights into the data being processed and identifying where things might be going wrong. 

Typically, developers use the **Debug** node to output message payloads and view them in the sidebar. While this is useful for simple debugging, it can be limiting when you need to troubleshoot more complex scenarios. As flows become larger and more interconnected, pinpointing the exact source of an issue using just a Debug node can be like searching for a needle in a haystack.

That’s where the **Node-RED Debugger** steps in, offering a more granular approach to debugging. The debugger allows you to:

- **Manual stop**: to manually stop the runtime and execution of the flow
- **Step through** the execution of nodes one by one.
- **Set breakpoints** to pause the flow at critical points.
- **Inspect messages** and data in real time, including message payloads, context, and more.
- **Control the flow’s pace**, so you can watch how each node processes data.

By offering these advanced debugging capabilities, the Node-RED Debugger transforms troubleshooting from a time-consuming guesswork process into a structured, efficient workflow.

## Installing and Enabling Node-RED Debugger

To install the Node-RED Debugger:

1. Click the menu icon in the top-right corner.
2. Select **Manage palette** and switch to the **Install** tab.
3. Search for `[node-red-debugger](https://flows.nodered.org/node/node-red-debugger)`.
4. Click **Install** to add the package.

### Enabling the Debugger

Once installed, open the debugger tab in the sidebar by clicking the collapsible arrow icon in the right sidebar and selecting **Flow Debugger**.

In the new Debugger tab, toggle the switch located at the top-left corner of the sidebar to enable the debugger. By default, it is disabled, so make sure to enable it before proceeding further.

## Using the Debugger for Debugging Flows

To illustrate how to use the Node-RED Debugger effectively, let’s consider a flow that simulates sensor data processing. The flow consists of an Inject node that sends a set of simulated sensor data, including temperature readings in Kelvin and their corresponding dates. The subsequent nodes perform the following operations:

1. Convert the temperature from Kelvin to Celsius.
2. Filter the data to forward specific date entries.
3. Create a new array from the filtered results.
4. Split the array and calculate the average temperature.

{% renderFlow %}
[{"id":"3c012808d6b397e2","type":"group","z":"8d55eeb793510c58","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["5ff0902202c21e85","993ffc096c3e8089","3bbb68c2dc2a0f5c","580210c585730f97","362ec9c482688cf6","b9f2f83a330140ca","6116c1efc3f7f682","01e7066b3ff012e7"],"x":2674,"y":199,"w":532,"h":642},{"id":"5ff0902202c21e85","type":"inject","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"Inject the sample data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[{\"timestamp\":\"2024-06-17T10:00:00Z\",\"temperature\":298.15},{\"timestamp\":\"2024-06-17T11:00:00Z\",\"temperature\":299.15},{\"timestamp\":\"2024-06-17T10:30:00Z\",\"temperature\":300.15},{\"timestamp\":\"2024-06-17T10:15:00Z\",\"temperature\":301.15},{\"timestamp\":\"2024-06-17T10:45:00Z\",\"temperature\":303.15},{\"timestamp\":\"2024-06-18T09:00:00Z\",\"temperature\":297.15},{\"timestamp\":\"2024-06-18T10:00:00Z\",\"temperature\":300.15},{\"timestamp\":\"2024-06-18T11:00:00Z\",\"temperature\":301.15},{\"timestamp\":\"2024-06-18T12:00:00Z\",\"temperature\":302.15},{\"timestamp\":\"2024-06-19T10:00:00Z\",\"temperature\":298.15},{\"timestamp\":\"2024-06-19T11:00:00Z\",\"temperature\":299.15}]","payloadType":"json","x":2820,"y":240,"wires":[["993ffc096c3e8089"]]},{"id":"993ffc096c3e8089","type":"split","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"Splits a message into a sequence of messages.","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","property":"payload","x":2920,"y":320,"wires":[["3bbb68c2dc2a0f5c"]]},{"id":"3bbb68c2dc2a0f5c","type":"change","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"Kelvin to celcius","rules":[{"t":"set","p":"payload.temperature","pt":"msg","to":"payload.temperature - 273.15","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":2840,"y":400,"wires":[["580210c585730f97"]]},{"id":"580210c585730f97","type":"switch","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"Routing message sequence based on condition","property":"payload.timestamp","propertyType":"msg","rules":[{"t":"cont","v":"2024-06-17","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":2940,"y":480,"wires":[["01e7066b3ff012e7"]]},{"id":"362ec9c482688cf6","type":"debug","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"debug 4","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":2940,"y":800,"wires":[]},{"id":"b9f2f83a330140ca","type":"join","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"Calculating the  the average of temperature","mode":"reduce","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","useparts":true,"accumulate":true,"timeout":"","count":"","reduceRight":false,"reduceExp":"$A+ payload.temperature","reduceInit":"0","reduceInitType":"num","reduceFixup":"$A/$N","x":2970,"y":700,"wires":[["362ec9c482688cf6"]]},{"id":"6116c1efc3f7f682","type":"split","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"Splits a message into a sequence of messages.","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","property":"payload","x":2980,"y":640,"wires":[["b9f2f83a330140ca"]]},{"id":"01e7066b3ff012e7","type":"join","z":"8d55eeb793510c58","g":"3c012808d6b397e2","name":"Creating new array by combining message sequence","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","useparts":true,"accumulate":false,"timeout":"","count":"","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":2980,"y":560,"wires":[["6116c1efc3f7f682"]]}]
{% endrenderFlow %}

But the problem is that when clicking the **Inject** node once, it does not produce the expected results; instead, it requires clicking it again to get the output. This indicates that there might be a timing issue or a logic flaw in the flow that prevents it from processing correctly on the first click. lets debug the flow with debugger now.

### Understanding the Debugger sidebar tab

Before proceeding further, let's first understand the Debugger tab and its different sections. The Debugger tab contains two main areas: **Breakpoints** and **Messages**. 

1. **Breakpoints**: This section displays a list of all the breakpoints you have set within your flow. It allows you to manage and navigate through the breakpoints effectively.

2. **Messages**: This section shows any messages that are currently queued up in the runtime, giving you visibility into the data being processed at various stages of your flow.

At the top of the Debugger tab, you will find controls to manually stop the runtime, as well as buttons to resume execution and step through the flow one input or output at a time when it is paused.

### Pausing the Runtime Manually and Navigating Through Each Step

Now, let's diagnose the flow. We’ll manually pause the runtime, then step through each part of the flow using the debugger controls, observing the changes at each step.

Follow these steps:

1. Go to the **Debugger** tab in the sidebar.
2. Click the **Pause** button located in the top-right corner to halt the runtime.
3. Next, click the **Inject** button to start the execution of the flow.
4. Once paused, you'll notice that the flow executes step by step, depending on the total inputs and outputs in your flow, as well as the message length. Each message will be printed in the **Messages** section of the debugger tab. At the top of each message, the name of the node that generated it will be displayed.
5. To proceed, click the **step forward** button (represented as an array icon next to the pause button). As you move forward, the **Messages** field will update with the message sent by each node, and the execution will also resume at the next step. Additionally, the input/output of the node sending the message will be highlighted in the flow with a light-bordered rectangle.
6. As we move forward through the execution, we can see everything seems to work fine up to the **Switch** node, where the message passes through correctly. However, when you reach the **Join** node, the highlighted box does not move forward, and no message is printed in the debugger tab. This indicates that the issue lies between the **Switch** node and the **Join** node.

Now that we have identified the problem area through manual pausing and stepping through the flow execution, we can utilize breakpoints. Adding breakpoints to the suspected areas is always recommended, as it saves time and effort. While manual stepping through the flow is useful for demonstration purposes and going through the manual process first can enhance your understanding of how the flow operates, making it easier to identify where breakpoints should be placed effectively.

## Adding Breakpoints for Debugging Flows

Now that we've pinpointed the problem area between the [Switch](/node-red/core-nodes/switch/) node and the [Join](/node-red/core-nodes/join/) node, it’s time to leverage breakpoints for a more efficient debugging experience. Breakpoints allow you to pause the flow automatically at specific points, enabling you to inspect messages and context without having to manually step through each node. This is especially useful for larger or more intricate flows.

First, let’s discuss where exactly we should add breakpoints. From our previous debugging, we know that all 11 messages are coming to the Switch node correctly, but we need to determine how many messages pass through the condition and if they contain the part property required by the Join node to create a single value—in this case, an array, so we adding breakpoint at the output of switch node ouput for conformation and input of join node also to outpuf join node.

To add a breakpoint:

1. In the flow, find the node where you want to add the breakpoint.
2. Hover over the input or output of the desired node; a dotted rectangle will appear.
3. Click within that rectangle to add the breakpoint. It will turn solid blue, indicating that your breakpoint has been added.
4. Once added, the breakpoint will appear in the debugger sidebar tab list.

### Debugging: Pinpointing the Exact Problem and Solving the Issue in the Flow

Start by clicking the inject node to trigger execution, which will pause at the output of the switch node. Check the blue rectangle to see how many messages have passed through; it shows 5, indicating that only 5 messages met the condition. As you proceed, you will see those five messages are also reaching the input of the join node correctly. 

Next, look in the debugger tab's messages section to verify if these messages have the `parts` property, noting the value of `count`. You will see that the count value is 11, which means the join node is waiting for all 11 messages to create a single message; otherwise, it will not send anything. Click the arrow button to see how many messages reach the output of the join node; you’ll notice that nothing reaches the output, indicating that the join node is still waiting for the remaining 6 messages. This is likely due to an issue with the `parts.count` property. 

While the split node previously set the count to 11, which is correct, the switch node filtered some messages, resulting in only 5 passing through. Therefore, the count should be corrected to reflect 5 instead of 11.

To correct this, enable the option "Recreate message sequences," which will adjust the count.

Now, if you debug the flow again, you will see that the output of the switch node is sending 11 messages, and it includes the `parts` object with a count that is now 5. As you proceed further and stop at the output of the join node, you will see an array of objects containing the 5 objects. This means we have successfully debugged and resolved the issue!

## Disabling and Removing Breakpoints

Now that you’ve learned how to add breakpoints and pinpoint problems, it’s important to know how to manage them effectively. Sometimes you may need to disable certain breakpoints to allow the flow to run without interruption, or you may want to remove them altogether once you’ve finished debugging.

### Disabling Breakpoints

To disable a breakpoint without removing it:

1. Go to the **Debugger** tab in the sidebar.
2. Locate the list of active breakpoints; for each breakpoint, you will see a checkbox on the left side.
3. Click the checkbox for the breakpoint you wish to disable. This will toggle its state, and it will no longer pause execution when reached.
4. Alternatively, in the flow, locate the breakpoints you have added. Click on the breakpoint once, and it will turn into a transparent blue rectangle with a border, indicating it is disabled.

### Removing Breakpoints

To remove a breakpoint completely:

1. In the **Debugger** tab, find the breakpoint you want to remove.
2. Click the **X** available on the right side of each breakpoint to remove it.
3. Alternatively, in the flow, locate the breakpoints you have added. Click on the breakpoint twice, and it will turn into a transparent rectangle with a dotted border, indicating it is removed.

In conclusion, mastering debugging in Node-RED is crucial for creating reliable flows. While the Debug node is great for quick insights, don’t underestimate the power of the Node-RED Debugger. Setting breakpoints can significantly streamline your troubleshooting process and help you identify issues more effectively.

## Up Next

- [Monitoring and Optimizing Node-RED Flows with Open Telemetry](/blog/2024/08/opentelemetry-with-node-red/): Learn how to Monitor and Optimize Node-RED Flows using Open Telemetry that will help you spot and fix delays in your flows quickly.

- [Format your Node-RED flows for better team collaboration](/blog/2022/12/node-red-flow-best-practice/):  Learn how to format your flows for readability to providing clear comments on nodes and groups, a little bit of effort upfront can save your team a lot of headaches down the road.