---
title: "How to Debug Node-RED Flows Using Debugger"
description: "Debug Node-RED flows using the Debugger. Learn to set breakpoints, step through execution, and inspect messages for efficient troubleshooting."
---

# {{meta.title}}

When it comes to debugging application flows in Node-RED, the tool most Node-RED developers often reach for is the [Debug](/node-red/core-nodes/debug/) node. It provides a simple way to output message payloads or other data to the debug sidebar, helping you gain insights into how your flow is working. But what if you needed more control and visibility over the flow’s execution? What if you wanted to step through each node in detail, inspect variables, or pause the flow at specific points to understand what’s happening?

In these cases, using the **Node-RED Debugger** becomes invaluable. The debugger allows you to trace the execution of your flows interactively, set breakpoints, and gain deeper insights beyond what the Debug node offers. This Documentation will show you how to effectively use the Node-RED Debugger to pinpoint issues and fine-tune your applications.

> **Tip:** If your flows aren’t named or formatted clearly, making them hard to understand, you can use **[FlowFuse Expert](/docs/user/expert/)** to analyze, debug, and build your flows faster with AI-powered features, including code completion, Function builders, templates, and more.

## What is Debugging, and Why is it crucial in Node-RED Flows?

Debugging is finding and fixing issues in your code or workflow. In Node-RED, debugging helps you understand how your flows function by providing insights into the data being processed and identifying where things might go wrong. 

Typically, developers use the **Debug** node to output message payloads and view them in the sidebar. While this is useful for simple debugging, it can be limiting when you need to troubleshoot more complex scenarios. As flows become larger and more interconnected, pinpointing the exact source of an issue using just a Debug node can be like searching for a needle in a haystack.

That’s where the **Node-RED Debugger** steps in, offering a more granular approach to debugging. The debugger allows you to:

- **Manual stop**: to manually stop the runtime and execution of the flow
- **Step through** the execution of nodes one by one.
- **Set breakpoints** to pause the flow at critical points.
- **Inspect messages** and data in real-time, including message payloads, context, and more.

## Installing and Enabling Node-RED Debugger

To install the Node-RED Debugger:

1. Click the menu icon in the top-right corner.
2. Select **Manage palette** and switch to the **Install** tab.
3. Search for [node-red-debugger](https://flows.nodered.org/node/node-red-debugger).
4. Click **Install** to add the package.

### Enabling the Debugger

![Image showing the option to turn the debugger on and off in the sidebar](../images/disable-enable-button.png
){data-zoomable}
_Image showing the option to turn the debugger on and off in the sidebar_

Once installed, open the debugger tab in the sidebar by clicking the collapsible arrow icon in the right sidebar and selecting **Flow Debugger**.

In the new Debugger tab, toggle the switch at the sidebar's top-left corner to enable the debugger. By default, it is disabled, so enable it before proceeding further.

## Using the Debugger for Debugging Flows

To illustrate how to use the Node-RED Debugger effectively, let’s consider a flow that simulates sensor data processing. The flow consists of an Inject node that sends a set of simulated sensor data, including temperature readings in Kelvin and their corresponding dates. The subsequent nodes perform the following operations:

1. Convert the temperature from Kelvin to Celsius.
2. Filter the data to forward specific date entries.
3. Create a new array from the filtered results.
4. Split the array and calculate the average temperature.



::render-flow
---
height: 200
flow: "W3siaWQiOiIzYzAxMjgwOGQ2YjM5N2UyIiwidHlwZSI6Imdyb3VwIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyI1ZmYwOTAyMjAyYzIxZTg1IiwiOTkzZmZjMDk2YzNlODA4OSIsIjNiYmI2OGMyZGMyYTBmNWMiLCI1ODAyMTBjNTg1NzMwZjk3IiwiMzYyZWM5YzQ4MjY4OGNmNiIsImI5ZjJmODNhMzMwMTQwY2EiLCI2MTE2YzFlZmMzZjdmNjgyIiwiMDFlNzA2NmIzZmYwMTJlNyJdLCJ4IjozOTQsInkiOjE4OTksInciOjUzMiwiaCI6NjQyfSx7ImlkIjoiNWZmMDkwMjIwMmMyMWU4NSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiIzYzAxMjgwOGQ2YjM5N2UyIiwibmFtZSI6IkluamVjdCB0aGUgc2FtcGxlIGRhdGEiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6Ilt7XCJ0aW1lc3RhbXBcIjpcIjIwMjQtMDYtMTdUMTA6MDA6MDBaXCIsXCJ0ZW1wZXJhdHVyZVwiOjI5OC4xNX0se1widGltZXN0YW1wXCI6XCIyMDI0LTA2LTE3VDExOjAwOjAwWlwiLFwidGVtcGVyYXR1cmVcIjoyOTkuMTV9LHtcInRpbWVzdGFtcFwiOlwiMjAyNC0wNi0xN1QxMDozMDowMFpcIixcInRlbXBlcmF0dXJlXCI6MzAwLjE1fSx7XCJ0aW1lc3RhbXBcIjpcIjIwMjQtMDYtMTdUMTA6MTU6MDBaXCIsXCJ0ZW1wZXJhdHVyZVwiOjMwMS4xNX0se1widGltZXN0YW1wXCI6XCIyMDI0LTA2LTE3VDEwOjQ1OjAwWlwiLFwidGVtcGVyYXR1cmVcIjozMDMuMTV9LHtcInRpbWVzdGFtcFwiOlwiMjAyNC0wNi0xOFQwOTowMDowMFpcIixcInRlbXBlcmF0dXJlXCI6Mjk3LjE1fSx7XCJ0aW1lc3RhbXBcIjpcIjIwMjQtMDYtMThUMTA6MDA6MDBaXCIsXCJ0ZW1wZXJhdHVyZVwiOjMwMC4xNX0se1widGltZXN0YW1wXCI6XCIyMDI0LTA2LTE4VDExOjAwOjAwWlwiLFwidGVtcGVyYXR1cmVcIjozMDEuMTV9LHtcInRpbWVzdGFtcFwiOlwiMjAyNC0wNi0xOFQxMjowMDowMFpcIixcInRlbXBlcmF0dXJlXCI6MzAyLjE1fSx7XCJ0aW1lc3RhbXBcIjpcIjIwMjQtMDYtMTlUMTA6MDA6MDBaXCIsXCJ0ZW1wZXJhdHVyZVwiOjI5OC4xNX0se1widGltZXN0YW1wXCI6XCIyMDI0LTA2LTE5VDExOjAwOjAwWlwiLFwidGVtcGVyYXR1cmVcIjoyOTkuMTV9XSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjU0MCwieSI6MTk0MCwid2lyZXMiOltbIjk5M2ZmYzA5NmMzZTgwODkiXV19LHsiaWQiOiI5OTNmZmMwOTZjM2U4MDg5IiwidHlwZSI6InNwbGl0IiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiM2MwMTI4MDhkNmIzOTdlMiIsIm5hbWUiOiJTcGxpdHMgYSBtZXNzYWdlIGludG8gYSBzZXF1ZW5jZSBvZiBtZXNzYWdlcy4iLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwicHJvcGVydHkiOiJwYXlsb2FkIiwieCI6NjQwLCJ5IjoyMDIwLCJ3aXJlcyI6W1siM2JiYjY4YzJkYzJhMGY1YyJdXX0seyJpZCI6IjNiYmI2OGMyZGMyYTBmNWMiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiM2MwMTI4MDhkNmIzOTdlMiIsIm5hbWUiOiJLZWx2aW4gdG8gY2VsY2l1cyIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQudGVtcGVyYXR1cmUiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZC50ZW1wZXJhdHVyZSAtIDI3My4xNSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTYwLCJ5IjoyMTAwLCJ3aXJlcyI6W1siNTgwMjEwYzU4NTczMGY5NyJdXX0seyJpZCI6IjU4MDIxMGM1ODU3MzBmOTciLCJ0eXBlIjoic3dpdGNoIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiM2MwMTI4MDhkNmIzOTdlMiIsIm5hbWUiOiJSb3V0aW5nIG1lc3NhZ2Ugc2VxdWVuY2UgYmFzZWQgb24gY29uZGl0aW9uIiwicHJvcGVydHkiOiJwYXlsb2FkLnRpbWVzdGFtcCIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiY29udCIsInYiOiIyMDI0LTA2LTE3IiwidnQiOiJzdHIifV0sImNoZWNrYWxsIjoidHJ1ZSIsInJlcGFpciI6ZmFsc2UsIm91dHB1dHMiOjEsIngiOjY2MCwieSI6MjE4MCwid2lyZXMiOltbIjAxZTcwNjZiM2ZmMDEyZTciXV19LHsiaWQiOiIzNjJlYzljNDgyNjg4Y2Y2IiwidHlwZSI6ImRlYnVnIiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiM2MwMTI4MDhkNmIzOTdlMiIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjUwLCJ5IjoyNTAwLCJ3aXJlcyI6W119LHsiaWQiOiJiOWYyZjgzYTMzMDE0MGNhIiwidHlwZSI6ImpvaW4iLCJ6IjoiOWNmODJiNjhiYjg5ZThjZSIsImciOiIzYzAxMjgwOGQ2YjM5N2UyIiwibmFtZSI6IkNhbGN1bGF0aW5nIHRoZSDCoHRoZSBhdmVyYWdlIG9mIHRlbXBlcmF0dXJlIiwibW9kZSI6InJlZHVjZSIsImJ1aWxkIjoib2JqZWN0IiwicHJvcGVydHkiOiJwYXlsb2FkIiwicHJvcGVydHlUeXBlIjoibXNnIiwia2V5IjoidG9waWMiLCJqb2luZXIiOiJcXG4iLCJqb2luZXJUeXBlIjoic3RyIiwidXNlcGFydHMiOnRydWUsImFjY3VtdWxhdGUiOnRydWUsInRpbWVvdXQiOiIiLCJjb3VudCI6IiIsInJlZHVjZVJpZ2h0IjpmYWxzZSwicmVkdWNlRXhwIjoiJEErIHBheWxvYWQudGVtcGVyYXR1cmUiLCJyZWR1Y2VJbml0IjoiMCIsInJlZHVjZUluaXRUeXBlIjoibnVtIiwicmVkdWNlRml4dXAiOiIkQS8kTiIsIngiOjY5MCwieSI6MjQwMCwid2lyZXMiOltbIjM2MmVjOWM0ODI2ODhjZjYiXV19LHsiaWQiOiI2MTE2YzFlZmMzZjdmNjgyIiwidHlwZSI6InNwbGl0IiwieiI6IjljZjgyYjY4YmI4OWU4Y2UiLCJnIjoiM2MwMTI4MDhkNmIzOTdlMiIsIm5hbWUiOiJTcGxpdHMgYSBtZXNzYWdlIGludG8gYSBzZXF1ZW5jZSBvZiBtZXNzYWdlcy4iLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwicHJvcGVydHkiOiJwYXlsb2FkIiwieCI6NzAwLCJ5IjoyMzQwLCJ3aXJlcyI6W1siYjlmMmY4M2EzMzAxNDBjYSJdXX0seyJpZCI6IjAxZTcwNjZiM2ZmMDEyZTciLCJ0eXBlIjoiam9pbiIsInoiOiI5Y2Y4MmI2OGJiODllOGNlIiwiZyI6IjNjMDEyODA4ZDZiMzk3ZTIiLCJuYW1lIjoiQ3JlYXRpbmcgbmV3IGFycmF5IGJ5IGNvbWJpbmluZyBtZXNzYWdlIHNlcXVlbmNlIiwibW9kZSI6ImN1c3RvbSIsImJ1aWxkIjoiYXJyYXkiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJrZXkiOiJ0b3BpYyIsImpvaW5lciI6IlxcbiIsImpvaW5lclR5cGUiOiJzdHIiLCJ1c2VwYXJ0cyI6dHJ1ZSwiYWNjdW11bGF0ZSI6ZmFsc2UsInRpbWVvdXQiOiIiLCJjb3VudCI6IiIsInJlZHVjZVJpZ2h0IjpmYWxzZSwicmVkdWNlRXhwIjoiIiwicmVkdWNlSW5pdCI6IiIsInJlZHVjZUluaXRUeXBlIjoibnVtIiwicmVkdWNlRml4dXAiOiIiLCJ4Ijo3MDAsInkiOjIyNjAsIndpcmVzIjpbWyI2MTE2YzFlZmMzZjdmNjgyIl1dfV0="
---
::



However, clicking the **Inject** node once does not produce the expected results; instead, it requires clicking again to get the output. This indicates that there might be a timing issue or a logic flaw in the flow that prevents it from processing correctly on the first click. Let's debug the flow with a debugger now.

### Understanding the Debugger sidebar tab

Before proceeding further, let's first understand the Debugger tab and its different sections. The Debugger tab contains two main areas: **Breakpoints** and **Messages**. 

![Image showing the breakpoint section in the sidebar](../images/breakpoints-section.png
){data-zoomable}
_Image showing the breakpoint section in the sidebar_

1. **Breakpoints**: This section lists all the breakpoints you have set within your flow. It allows you to manage and navigate through the breakpoints effectively.

![Image showing the messages section in the sidebar](/node-red-media/getting-started/images/message-section.png){data-zoomable}
_Image showing the messages section in the sidebar_

2. **Messages**: This section shows any messages currently queued up in the runtime, giving you visibility into the data being processed at various stages of your flow.

![Image showing the controls in the sidebar](/node-red-media/getting-started/images/debugger-controls.png){data-zoomable}
_Image showing the controls in the sidebar_

At the top of the Debugger tab, you will find controls to stop the runtime manually and buttons to resume execution and step through the flow one input or output at a time when it is paused.

### Pausing the Runtime Manually and Navigating Through Each Step

Now, let's diagnose the flow. We’ll manually pause the runtime, then step through each part of the flow using the debugger controls, observing the changes at each step.

![Image shows the execution of flow while debugger enabled and how to proceed to subsequent execution](/node-red-media/getting-started/images/proceeding-further-execution.gif){data-zoomable}
_Image show the execution of flow while debugger enabled and how to proceed to subsequent execution_

Follow these steps:

1. Go to the **Debugger** tab in the sidebar.
2. Click the **Pause** button in the top-right corner to halt the runtime.
3. Next, click the **Inject** button to start the execution of the flow.
4. Once paused, you'll notice that the flow executes step by step, depending on the total inputs, outputs, and number of messages they produce and the message length. Each message will be printed in the **Messages** section of the debugger tab. At the top of each message, the name of the node that generated it will be displayed.
5. To proceed, click the **step forward** button (represented as an array icon next to the pause button). As you move forward, the **Messages** field will update with the message sent by each node, and the execution will also resume at the next step. Additionally, the input/output of the node sending the message will be highlighted in the flow with a light-bordered rectangle.
6. As we progress through the execution, everything works fine up to the **Switch** node, where the message passes through correctly. However, when you reach the **Join** node, the highlighted box does not move forward, and no message is printed in the debugger tab. This indicates the issue lies between the **Switch** node and the **Join** node.

Manually stepping through the flow is useful for understanding how the flow operates, making it easier to identify where breakpoints should be placed effectively.

## Adding Breakpoints for Debugging Flows

Now that we've pinpointed the problem to be somewhere between the[Switch](/node-red/core-nodes/switch/) node and the [Join](/node-red/core-nodes/join/) node, it’s time to leverage breakpoints for a more efficient debugging experience. These breakpoints allow you to pause the flow automatically allowing you to inspect messages and context without having to step through each node manually. This is especially useful for larger or more intricate flows.

First, let’s discuss where exactly we should add breakpoints. Our previous debugging shows that all 11 messages are correctly reaching the input of the Switch node. However, we need to check how many messages pass through the Switch node's condition and whether they contain the required part object for the Join node to create a single value (array).

To do this, we should add breakpoints at the output of the Switch node to monitor how many messages pass through, as well as at the input and output of the Join node. This will help us determine how many messages are reaching the input of the Join node and whether they contain the part object necessary for the Join node to automatically convert them into an array of those objects.

![Image showing how to add breakpoints](/node-red-media/getting-started/images/adding-breakpoints.gif){data-zoomable}
_Image showing how to add breakpoints_

To add a breakpoint:

1. In the flow, find the node where you want to add the breakpoint.
2. Hover over the input or output of the desired node; a dotted rectangle will appear.
3. Click within that rectangle to add the breakpoint. It will turn solid blue, indicating that your breakpoint has been added.
4. The breakpoint will appear in the debugger sidebar tab list once added.

### Debugging: Pinpointing the Exact Problem and Solving the Issue in the Flow

![Image showing the execution of the flow with added breakpoints, indicating the number of each input/output being sent and received for debugging.](/node-red-media/getting-started/images/breakpoint-debugging.gif){data-zoomable}
_Image showing the execution of the flow with added breakpoints, indicating the number of each input/output being sent and received for debugging._

Start by clicking the inject node to trigger execution, which will pause at the output of the switch node. Check the blue rectangle to see how many messages have passed through; it shows only a few, not 11, indicating that only those messages met the condition. As you proceed, you will see those messages also reaching the input of the join node correctly. 

Next, look in the debugger tab's messages section to verify if these messages have the `parts` property, noting the value of `count`. You will see that the count value is 11, which means the join node is waiting for all 11 messages to create a single message; otherwise, it will not send anything. Click the arrow button to see how many messages reach the output of the join node; you’ll notice that nothing reaches the output, indicating that the join node is still waiting for the remaining messages. This is likely due to an issue with the `parts.count` property. 

While the split node previously set the count to 11 automatically, which is correct, the switch node filtered some messages, resulting in only a few passing through. Therefore, the count should be corrected to reflect the correct number of messages that passed through the switch node instead of 11.

## Disabling and Removing Breakpoints

Now that you’ve learned how to add breakpoints and pinpoint problems, lets look at how to manage them. Sometimes you may need to disable specific breakpoints to allow the flow to run without interruption, or you may want to remove them once you’ve finished debugging.

### Disabling Breakpoints

![Image showing two ways of disabling breakpoints](/node-red-media/getting-started/images/disabling-breakpoints.gif){data-zoomable}
_Image showing two ways of disabling breakpoints_

To disable a breakpoint without removing it:

1. Go to the **Debugger** tab in the sidebar.
2. Locate the list of active breakpoints; you will see a checkbox on the left side for each breakpoint.
3. Click the checkbox for the breakpoint you wish to disable. This will toggle its state and no longer pause execution when reached.
4. Alternatively, locate the breakpoints you have added to the flow. Click on the breakpoint once, and it will turn into a transparent blue rectangle with a border, indicating it is disabled.
5. To enable them again, click on the checkbox or the breakpoints again.

### Removing Breakpoints

![Image showing two ways of removing breakpoints](/node-red-media/getting-started/images/removing-breakpoints.gif){data-zoomable}
_Image showing two ways of removing breakpoints_

To remove a breakpoint:

1. In the **Debugger** tab, find the breakpoint you want to remove.
2. Click the **x** button located to the right of the breakpoint.
3. Alternatively, locate the breakpoint on the flow and click it twice until it is a transparent rectangle with a dotted border, indicating it is removed.

In conclusion, debugging in Node-RED is a great way to verify and improve your flows. While the Debug node is excellent for quick insights, the Node-RED Debugger adds another level of insight. Setting breakpoints can significantly streamline your troubleshooting process and help you identify issues more effectively.

## Up Next

- [Monitoring and Optimizing Node-RED Flows with Open Telemetry](/blog/2024/08/opentelemetry-with-node-red/): Learn how to Monitor and Optimize Node-RED Flows using Open Telemetry that will help you spot and fix delays in your flows quickly.

- [Format your Node-RED flows for better team collaboration](/blog/2022/12/node-red-flow-best-practice/):  Learn how to format your flows for readability to providing explicit comments on nodes and groups, a little bit of effort upfront can save your team many headaches down the road.
