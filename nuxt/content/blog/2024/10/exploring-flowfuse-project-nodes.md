---
title: Using FlowFuse Project Nodes for Faster and More Efficient Communication
navTitle: Using FlowFuse Project Nodes for Faster and More Efficient Communication
---

Node-RED is a powerful tool for IoT application development, connecting various services and devices. However, establishing communication between different Node-RED instances—whether for monitoring or control—can be complex. This often requires detailed configurations and protocols like MQTT, HTTP, or CoAP, despite its seamless integration with many protocols.
<!--more-->
FlowFuse addresses this challenge with project nodes designed for easy and efficient communication between Node-RED instances. This guide will show you how to use FlowFuse project nodes to enhance communication and integration, complete with practical demonstrations.

## What Are FlowFuse Project Nodes?

[FlowFuse](/) is a platform that helps manage multiple Node-RED instances in one place. This centralized management makes it easier for teams to collaborate and share resources while simplifying scaling and enhancing project security. 

To facilitate communication between these centrally organized instances, FlowFuse introduces specific project nodes that enable easy and secure message exchange without complex setup. Behind the scenes, these project nodes utilize MQTT, ensuring that communication is lightweight and fast.

These project nodes include three main types:

![Image: Project nodes.](/blog/2024/10/images/project-nodes.png){data-zoomable}
_Left :Project-in node, Middle: Project-out node, Right: Project-call node_

- **Project In**: Listens for messages being broadcast by other Node-RED instances or for messages sent directly to this instance.
- **Project Out**: Sends messages to other Node-RED instances.
- **Project Call**:Sends messages to other Node-RED instances to trigger specific flows and waits for a response that can be sent using the project out node.

## Using FlowFuse Project nodes

In this section, we will explore how to use the FlowFuse project nodes. We’ll begin by explaining the Project In and Project Out nodes, followed by a detailed look at the Project Call node.

### Using Project in and out nodes 
To demostrate this nodes, we will use an example where a central instance monitors the CPU performance of multiple Node-RED instances every 10 seconds. 

Before we start, let’s understand their configurations:

#### Project In Node

- **Name**: A descriptive label for the node.
- **Source**:
  - **Receive**: Select this option to receive messages sent specifically to this instance.
  - **Receive Broadcast From**: Choose this option to listen for messages broadcast from other instances. A dropdown will include the names of all instances within your team.
- **Topic**: This field allows you to specify a topic, similar to MQTT, to categorize the messages.

#### Project Out Node

- **Name**: A descriptive label for the node.
- **Mode**: 
    - **Send Specified Project Node**: This option allows you to send a specific message or payload to the selected instance. Use this for one-way communication.
    - **Return Project Link Call**: This option sends used to sent response back using a Project Out node project call node.
- **Target**:
  - **Send Message To Instance**: A dropdown to select the instance.
  - **Broadcast Messages**: Option to send messages to all instances.
- **Topic**: This field allows you to specify a topic, similar to MQTT, to categorize the messages.

## Example: Monitoring CPU Performance Of Node-RED Instances

## Prerequisites

Before we begin, ensure you have installed the following nodes via the Palette Manager:

- **node-red-contrib-cpu**: This node is essential for monitoring CPU performance. Install it on the instances that you want to monitor.
- **@flowfuse/node-red-dashboard**: This node is used for creating a dashboard interface. Install it on the central instance, as we will be visualizing the CPU performance data collected from the monitored instances.

### Creating the Flow on the Instances to Monitor

In this section, we will learn how to create a flow that monitors CPU performance and sends data using **Project out**. We will also discuss how to make this flow reusable, allowing you to apply the same setup across multiple instances without editing the flow each time.

1. Drag the **Inject** node onto the canvas and set the repeat interval to "2 seconds". This will trigger the flow after every 2 seconds.
2. Drag the **CPU** node onto the canvas. Double-click it to configure, enable the option "Send message for overall usage," and click "Done".
3. Drag the **Change** node onto the canvas. Configure it to add metadata, including the instance name, instance ID, using default environment variablesand and the CPU data received from the CPU node.
4. Drag the **Project Out** node onto the canvas. Double-click it to set the Mode to "Send to specified project node." For the Target, select "Send message to instance" and choose the name of your centralized instance. 
5. Next, Enter the topic as "cpu-performance".
6. Connect the output of the **Inject** node to the input of the **CPU** node, the output of the **CPU** node to the input of the **Change** node, and finally, connect the **Change** node to the **Project Out** node.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkZDE4MmZlZGNlNmM1MzJhIiwidHlwZSI6ImluamVjdCIsInoiOiJmZTYxZjU0Yzg1NjMyNzlkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiMSIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjE5MCwieSI6MjAwLCJ3aXJlcyI6W1siYzQ3YmM0MmY4YTZmNjg4NCJdXX0seyJpZCI6ImUwZGQ5MTVhN2IzN2FmMmIiLCJ0eXBlIjoicHJvamVjdCBsaW5rIG91dCIsInoiOiJmZTYxZjU0Yzg1NjMyNzlkIiwibmFtZSI6InByb2plY3Qgb3V0IDEiLCJtb2RlIjoibGluayIsImJyb2FkY2FzdCI6ZmFsc2UsInByb2plY3QiOiIwNTRiYjVjZi0yMGRmLTQzMWYtYTAwYi0yOWIyOGUxNjBiMjciLCJ0b3BpYyI6ImNwdS1wZXJmb3JtYW5jZSIsIngiOjc3MCwieSI6MjAwLCJ3aXJlcyI6W119LHsiaWQiOiIwNWE5ZWM3YjJhZTU3Y2MwIiwidHlwZSI6ImNoYW5nZSIsInoiOiJmZTYxZjU0Yzg1NjMyNzlkIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImRhdGEubmFtZSIsInB0IjoibXNnIiwidG8iOiJGRl9JTlNUQU5DRV9OQU1FIiwidG90IjoiZW52In0seyJ0Ijoic2V0IiwicCI6ImRhdGEuY3B1IiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTYwLCJ5IjoyMDAsIndpcmVzIjpbWyJlMGRkOTE1YTdiMzdhZjJiIl1dfSx7ImlkIjoiYzQ3YmM0MmY4YTZmNjg4NCIsInR5cGUiOiJjcHUiLCJ6IjoiZmU2MWY1NGM4NTYzMjc5ZCIsIm5hbWUiOiIiLCJtc2dDb3JlIjpmYWxzZSwibXNnT3ZlcmFsbCI6dHJ1ZSwibXNnQXJyYXkiOmZhbHNlLCJtc2dUZW1wIjpmYWxzZSwieCI6MzcwLCJ5IjoyMDAsIndpcmVzIjpbWyIwNWE5ZWM3YjJhZTU3Y2MwIl1dfV0="
---
::



By utilizing environment variables, this flow becomes reusable, allowing you to copy and paste flow to monitor multple instances.

### Receiving Data to Monitor and Visualize

![Image: Line chart visualizing CPU performance of all instances.](/blog/2024/10/images/device-monitoring-chart.gif){data-zoomable}
_Image: Line chart visualizing CPU performance of all instances._

To receive the CPU data from monitored instances, follow these steps in your centralized Node-RED instance:

1. Open the editor for your central instance.
2. Drag the **Project In** node onto the canvas.
3. Double-click the **Project In** node and set the **Source** to "Listen for broadcast messages from." Select the name of the instances you want to monitor from the dropdown. If you want data from all instances, select "All instances and devices."
4. Enter the **Topic** as "cpu-performance" (or the topic you configured in the Project Out nodes).
5. Drag a **ui-chart** widget onto the canvas. Set the chart type to "line" and configure the series to `msg.payload`.
6. Connect the output of the **Project In** node to the input of the **ui-chart** node.
7. Click the "deploy" button.



::render-flow
---
height: 200
flow: "W3siaWQiOiIyZDY4MWIxOWViNTc5OWI3IiwidHlwZSI6ImNoYW5nZSIsInoiOiJkMzgyYmQyYjU3MzNhM2E5IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiZGF0YS5jcHUiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoidG9waWMiLCJwdCI6Im1zZyIsInRvIjoiZGF0YS5uYW1lIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjQwMCwieSI6MjIwLCJ3aXJlcyI6W1siMzA3ZDljNTkxMzUwOTU1NyJdXX0seyJpZCI6IjMwN2Q5YzU5MTM1MDk1NTciLCJ0eXBlIjoidWktY2hhcnQiLCJ6IjoiZDM4MmJkMmI1NzMzYTNhOSIsImdyb3VwIjoiZDBkYmQ0MDE2YzdhYWMyMSIsIm5hbWUiOiIiLCJsYWJlbCI6ImNoYXJ0Iiwib3JkZXIiOjEsImNoYXJ0VHlwZSI6ImxpbmUiLCJjYXRlZ29yeSI6InRvcGljIiwiY2F0ZWdvcnlUeXBlIjoibXNnIiwieEF4aXNMYWJlbCI6IiIsInhBeGlzUHJvcGVydHkiOiIiLCJ4QXhpc1Byb3BlcnR5VHlwZSI6InByb3BlcnR5IiwieEF4aXNUeXBlIjoidGltZSIsInhBeGlzRm9ybWF0IjoiIiwieEF4aXNGb3JtYXRUeXBlIjoiYXV0byIsInlBeGlzTGFiZWwiOiIiLCJ5QXhpc1Byb3BlcnR5IjoiIiwieW1pbiI6IiIsInltYXgiOiIiLCJhY3Rpb24iOiJhcHBlbmQiLCJzdGFja1NlcmllcyI6ZmFsc2UsInBvaW50U2hhcGUiOiJjcm9zcyIsInBvaW50UmFkaXVzIjo0LCJzaG93TGVnZW5kIjp0cnVlLCJyZW1vdmVPbGRlciI6MSwicmVtb3ZlT2xkZXJVbml0IjoiMzYwMCIsInJlbW92ZU9sZGVyUG9pbnRzIjoiIiwiY29sb3JzIjpbIiMwMDk1ZmYiLCIjZmYwMDAwIiwiI2ZmN2YwZSIsIiMyY2EwMmMiLCIjYTM0N2UxIiwiI2Q2MjcyOCIsIiNmZjk4OTYiLCIjOTQ2N2JkIiwiI2M1YjBkNSJdLCJ0ZXh0Q29sb3IiOlsiIzY2NjY2NiJdLCJ0ZXh0Q29sb3JEZWZhdWx0Ijp0cnVlLCJncmlkQ29sb3IiOlsiI2U1ZTVlNSJdLCJncmlkQ29sb3JEZWZhdWx0Ijp0cnVlLCJ3aWR0aCI6IjEyIiwiaGVpZ2h0Ijo4LCJjbGFzc05hbWUiOiIiLCJ4Ijo2MzAsInkiOjIyMCwid2lyZXMiOltbXV19LHsiaWQiOiI0NjVlZTU1MGJmOWQxMDFkIiwidHlwZSI6InByb2plY3QgbGluayBpbiIsInoiOiJkMzgyYmQyYjU3MzNhM2E5IiwibmFtZSI6InByb2plY3QgaW4gMSIsInByb2plY3QiOiJhbGwiLCJicm9hZGNhc3QiOmZhbHNlLCJ0b3BpYyI6ImNwdS1wZXJmb3JtYW5jZSIsIngiOjE4MCwieSI6MjIwLCJ3aXJlcyI6W1siMmQ2ODFiMTllYjU3OTliNyJdXX0seyJpZCI6ImQwZGJkNDAxNmM3YWFjMjEiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiRGV2aWNlIE1vbml0b3JpbmcgQ2hhcnQiLCJwYWdlIjoiMzlmYWU4MDlmNmY3ZmM3YiIsIndpZHRoIjoiMTIiLCJoZWlnaHQiOiIxIiwib3JkZXIiOjEsInNob3dUaXRsZSI6dHJ1ZSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6IjM5ZmFlODA5ZjZmN2ZjN2IiLCJ0eXBlIjoidWktcGFnZSIsIm5hbWUiOiJEZXZpY2UgTW9uaXRvcmluZyIsInVpIjoiZGVkODZmMzgyMDM0Mjk4NSIsInBhdGgiOiIvY2hhcnRzLWV4YW1wbGUiLCJpY29uIjoiY2hhcnQtYm94LW91dGxpbmUiLCJsYXlvdXQiOiJncmlkIiwidGhlbWUiOiI1MDc1YTdkOGU0OTQ3NTg2IiwiYnJlYWtwb2ludHMiOlt7Im5hbWUiOiJEZWZhdWx0IiwicHgiOiIwIiwiY29scyI6IjMifSx7Im5hbWUiOiJUYWJsZXQiLCJweCI6IjU3NiIsImNvbHMiOiI2In0seyJuYW1lIjoiU21hbGwgRGVza3RvcCIsInB4IjoiNzY4IiwiY29scyI6IjkifSx7Im5hbWUiOiJEZXNrdG9wIiwicHgiOiIxMDI0IiwiY29scyI6IjEyIn1dLCJvcmRlciI6MSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6ImRlZDg2ZjM4MjAzNDI5ODUiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJNeSBEYXNoYm9hcmQiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImluY2x1ZGVDbGllbnREYXRhIjp0cnVlLCJhY2NlcHRzQ2xpZW50Q29uZmlnIjpbInVpLW5vdGlmaWNhdGlvbiIsInVpLWNvbnRyb2wiXSwic2hvd1BhdGhJblNpZGViYXIiOmZhbHNlLCJzaG93UGFnZVRpdGxlIjp0cnVlLCJuYXZpZ2F0aW9uU3R5bGUiOiJkZWZhdWx0IiwidGl0bGVCYXJTdHlsZSI6ImRlZmF1bHQifSx7ImlkIjoiNTA3NWE3ZDhlNDk0NzU4NiIsInR5cGUiOiJ1aS10aGVtZSIsIm5hbWUiOiJEZWZhdWx0IFRoZW1lIiwiY29sb3JzIjp7InN1cmZhY2UiOiIjZmZmZmZmIiwicHJpbWFyeSI6IiMwMDk0Q0UiLCJiZ1BhZ2UiOiIjZWVlZWVlIiwiZ3JvdXBCZyI6IiNmZmZmZmYiLCJncm91cE91dGxpbmUiOiIjY2NjY2NjIn0sInNpemVzIjp7InBhZ2VQYWRkaW5nIjoiMTJweCIsImdyb3VwR2FwIjoiMTJweCIsImdyb3VwQm9yZGVyUmFkaXVzIjoiNHB4Iiwid2lkZ2V0R2FwIjoiMTJweCJ9fV0="
---
::



Once deployed, open the dashboard to view an interactive live line chart displaying the CPU performance of all monitored devices.

#### Visualizing Data for Specific Devices

![Image: Gauges visualizing the CPU performance of different devices.](/blog/2024/10/images/device-monitoring-gauges.gif){data-zoomable}
_Image: Gauges visualizing the CPU performance of different devices._

To visualize CPU data for specific devices separately, configure the **Project In** node to "Listen for broadcast messages from" and select the desired instance name that you want to monitor.

In the instance sending the CPU data for monitoring, set the **Project Out** node to "Broadcast messages." This will send CPU data to all instances within your team, allowing the centralized instance to capture and display the information.

If you prefer not to use broadcasting, configure the **Project Out** node with specific topics. This will ensure that receiving nodes capture only specific instance data based on the topic. You can then connect these nodes to gauge nodes to distinctly display the CPU performance for each instance.



::render-flow
---
height: 200
flow: "W3siaWQiOiJjMDAyMWNhODk0ZGQzZTE3IiwidHlwZSI6ImNoYW5nZSIsInoiOiJkMzgyYmQyYjU3MzNhM2E5IiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiZGF0YS5jcHUiLCJ0b3QiOiJtc2cifSx7InQiOiJzZXQiLCJwIjoidWlfdXBkYXRlLmxhYmVsIiwicHQiOiJtc2ciLCJ0byI6ImRhdGEubmFtZSIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjozNjAsInkiOjE0MCwid2lyZXMiOltbIjkzMmE2NzMzZDUzYWI4N2QiXV19LHsiaWQiOiI0MjY5MjVlNzRkOGUzMGY1IiwidHlwZSI6InByb2plY3QgbGluayBpbiIsInoiOiJkMzgyYmQyYjU3MzNhM2E5IiwibmFtZSI6InByb2plY3QgaW4gMSIsInByb2plY3QiOiIwNDE3NTEyMC1lYmViLTQ4MTMtODkxMC0wM2Y5MmY4ZWQ0MjkiLCJicm9hZGNhc3QiOnRydWUsInRvcGljIjoiY3B1LXBlcmZvcm1hbmNlIiwieCI6MTQwLCJ5IjoxNDAsIndpcmVzIjpbWyJjMDAyMWNhODk0ZGQzZTE3Il1dfSx7ImlkIjoiOTMyYTY3MzNkNTNhYjg3ZCIsInR5cGUiOiJ1aS1nYXVnZSIsInoiOiJkMzgyYmQyYjU3MzNhM2E5IiwibmFtZSI6IiIsImdyb3VwIjoiMDg3NTU5ZjliOTlmMDQ3YSIsIm9yZGVyIjoxLCJ3aWR0aCI6IjQiLCJoZWlnaHQiOiI0IiwiZ3R5cGUiOiJnYXVnZS1oYWxmIiwiZ3N0eWxlIjoibmVlZGxlIiwidGl0bGUiOiJnYXVnZSIsInVuaXRzIjoidW5pdHMiLCJpY29uIjoiIiwicHJlZml4IjoiIiwic3VmZml4IjoiIiwic2VnbWVudHMiOlt7ImZyb20iOiIwIiwiY29sb3IiOiIjNWNkNjVjIn0seyJmcm9tIjoiNCIsImNvbG9yIjoiI2ZmYzgwMCJ9LHsiZnJvbSI6IjciLCJjb2xvciI6IiNlYTUzNTMifV0sIm1pbiI6MCwibWF4IjoxMCwic2l6ZVRoaWNrbmVzcyI6MTYsInNpemVHYXAiOjQsInNpemVLZXlUaGlja25lc3MiOjgsInN0eWxlUm91bmRlZCI6dHJ1ZSwic3R5bGVHbG93IjpmYWxzZSwiY2xhc3NOYW1lIjoiIiwieCI6NTkwLCJ5IjoxNDAsIndpcmVzIjpbXX0seyJpZCI6IjM4NTM5ZGM0YmZkYmY2YmUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImQzODJiZDJiNTczM2EzYTkiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJkYXRhLmNwdSIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJ1aV91cGRhdGUubGFiZWwiLCJwdCI6Im1zZyIsInRvIjoiZGF0YS5uYW1lIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjM2MCwieSI6MjQwLCJ3aXJlcyI6W1siYmRiY2Q1ZjlmOGFjNjEwYyJdXX0seyJpZCI6ImUzNmIxMmFhNTFkMzY1ZmUiLCJ0eXBlIjoicHJvamVjdCBsaW5rIGluIiwieiI6ImQzODJiZDJiNTczM2EzYTkiLCJuYW1lIjoicHJvamVjdCBpbiAyIiwicHJvamVjdCI6IjA0MTc1MTIwLWViZWItNDgxMy04OTEwLTAzZjkyZjhlZDQyOSIsImJyb2FkY2FzdCI6dHJ1ZSwidG9waWMiOiJjcHUtcGVyZm9ybWFuY2UiLCJ4IjoxNDAsInkiOjI0MCwid2lyZXMiOltbIjM4NTM5ZGM0YmZkYmY2YmUiXV19LHsiaWQiOiJiZGJjZDVmOWY4YWM2MTBjIiwidHlwZSI6InVpLWdhdWdlIiwieiI6ImQzODJiZDJiNTczM2EzYTkiLCJuYW1lIjoiIiwiZ3JvdXAiOiI2Y2Y1MzI2ZmU5MjhjOWNmIiwib3JkZXIiOjEsIndpZHRoIjoiNCIsImhlaWdodCI6IjQiLCJndHlwZSI6ImdhdWdlLWhhbGYiLCJnc3R5bGUiOiJuZWVkbGUiLCJ0aXRsZSI6ImdhdWdlIiwidW5pdHMiOiJ1bml0cyIsImljb24iOiIiLCJwcmVmaXgiOiIiLCJzdWZmaXgiOiIiLCJzZWdtZW50cyI6W3siZnJvbSI6IjAiLCJjb2xvciI6IiM1Y2Q2NWMifSx7ImZyb20iOiI0IiwiY29sb3IiOiIjZmZjODAwIn0seyJmcm9tIjoiNyIsImNvbG9yIjoiI2VhNTM1MyJ9XSwibWluIjowLCJtYXgiOjEwLCJzaXplVGhpY2tuZXNzIjoxNiwic2l6ZUdhcCI6NCwic2l6ZUtleVRoaWNrbmVzcyI6OCwic3R5bGVSb3VuZGVkIjp0cnVlLCJzdHlsZUdsb3ciOmZhbHNlLCJjbGFzc05hbWUiOiIiLCJ4Ijo1OTAsInkiOjI0MCwid2lyZXMiOltdfSx7ImlkIjoiYTJlMWZiYTBlOWNkOTg1YSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDM4MmJkMmI1NzMzYTNhOSIsIm5hbWUiOiIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6ImRhdGEuY3B1IiwidG90IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6InVpX3VwZGF0ZS5sYWJlbCIsInB0IjoibXNnIiwidG8iOiJkYXRhLm5hbWUiLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MzYwLCJ5IjozNDAsIndpcmVzIjpbWyJjMjk4YjY0YjI2MGRmNzA4Il1dfSx7ImlkIjoiZGNmZTczYzE2ZTE3NjQ4YSIsInR5cGUiOiJwcm9qZWN0IGxpbmsgaW4iLCJ6IjoiZDM4MmJkMmI1NzMzYTNhOSIsIm5hbWUiOiJwcm9qZWN0IGluIDMiLCJwcm9qZWN0IjoiOGE2MTExMzYtNmUzZi00NDdlLTk0MzYtMzRiMmQwMGVhYzhlIiwiYnJvYWRjYXN0Ijp0cnVlLCJ0b3BpYyI6ImNwdS1wZXJmb3JtYW5jZSIsIngiOjE0MCwieSI6MzQwLCJ3aXJlcyI6W1siYTJlMWZiYTBlOWNkOTg1YSJdXX0seyJpZCI6ImMyOThiNjRiMjYwZGY3MDgiLCJ0eXBlIjoidWktZ2F1Z2UiLCJ6IjoiZDM4MmJkMmI1NzMzYTNhOSIsIm5hbWUiOiIiLCJncm91cCI6ImVlNWZjM2ViMjlhN2VlNGIiLCJvcmRlciI6MSwid2lkdGgiOiI0IiwiaGVpZ2h0IjoiNCIsImd0eXBlIjoiZ2F1Z2UtaGFsZiIsImdzdHlsZSI6Im5lZWRsZSIsInRpdGxlIjoiZ2F1Z2UiLCJ1bml0cyI6InVuaXRzIiwiaWNvbiI6IiIsInByZWZpeCI6IiIsInN1ZmZpeCI6IiIsInNlZ21lbnRzIjpbeyJmcm9tIjoiMCIsImNvbG9yIjoiIzVjZDY1YyJ9LHsiZnJvbSI6IjQiLCJjb2xvciI6IiNmZmM4MDAifSx7ImZyb20iOiI3IiwiY29sb3IiOiIjZWE1MzUzIn1dLCJtaW4iOjAsIm1heCI6MTAsInNpemVUaGlja25lc3MiOjE2LCJzaXplR2FwIjo0LCJzaXplS2V5VGhpY2tuZXNzIjo4LCJzdHlsZVJvdW5kZWQiOnRydWUsInN0eWxlR2xvdyI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsIngiOjU5MCwieSI6MzQwLCJ3aXJlcyI6W119LHsiaWQiOiIwODc1NTlmOWI5OWYwNDdhIiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6IkRldmljZSBHcm91cCAxIiwicGFnZSI6IjM5ZmFlODA5ZjZmN2ZjN2IiLCJ3aWR0aCI6IjQiLCJoZWlnaHQiOiIyIiwib3JkZXIiOjMsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiI2Y2Y1MzI2ZmU5MjhjOWNmIiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6IkRldmljZSBHcm91cCAyIiwicGFnZSI6IjM5ZmFlODA5ZjZmN2ZjN2IiLCJ3aWR0aCI6IjQiLCJoZWlnaHQiOiIyIiwib3JkZXIiOjIsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiJlZTVmYzNlYjI5YTdlZTRiIiwidHlwZSI6InVpLWdyb3VwIiwibmFtZSI6IkRldmljZSBHcm91cCAzIiwicGFnZSI6IjM5ZmFlODA5ZjZmN2ZjN2IiLCJ3aWR0aCI6IjQiLCJoZWlnaHQiOiIyIiwib3JkZXIiOjEsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiIzOWZhZTgwOWY2ZjdmYzdiIiwidHlwZSI6InVpLXBhZ2UiLCJuYW1lIjoiRGV2aWNlIE1vbml0b3JpbmciLCJ1aSI6ImRlZDg2ZjM4MjAzNDI5ODUiLCJwYXRoIjoiL2NoYXJ0cy1leGFtcGxlIiwiaWNvbiI6ImNoYXJ0LWJveC1vdXRsaW5lIiwibGF5b3V0IjoiZ3JpZCIsInRoZW1lIjoiNTA3NWE3ZDhlNDk0NzU4NiIsImJyZWFrcG9pbnRzIjpbeyJuYW1lIjoiRGVmYXVsdCIsInB4IjoiMCIsImNvbHMiOiIzIn0seyJuYW1lIjoiVGFibGV0IiwicHgiOiI1NzYiLCJjb2xzIjoiNiJ9LHsibmFtZSI6IlNtYWxsIERlc2t0b3AiLCJweCI6Ijc2OCIsImNvbHMiOiI5In0seyJuYW1lIjoiRGVza3RvcCIsInB4IjoiMTAyNCIsImNvbHMiOiIxMiJ9XSwib3JkZXIiOjEsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiJkZWQ4NmYzODIwMzQyOTg1IiwidHlwZSI6InVpLWJhc2UiLCJuYW1lIjoiTXkgRGFzaGJvYXJkIiwicGF0aCI6Ii9kYXNoYm9hcmQiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1ub3RpZmljYXRpb24iLCJ1aS1jb250cm9sIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwic2hvd1BhZ2VUaXRsZSI6dHJ1ZSwibmF2aWdhdGlvblN0eWxlIjoiZGVmYXVsdCIsInRpdGxlQmFyU3R5bGUiOiJkZWZhdWx0In0seyJpZCI6IjUwNzVhN2Q4ZTQ5NDc1ODYiLCJ0eXBlIjoidWktdGhlbWUiLCJuYW1lIjoiRGVmYXVsdCBUaGVtZSIsImNvbG9ycyI6eyJzdXJmYWNlIjoiI2ZmZmZmZiIsInByaW1hcnkiOiIjMDA5NENFIiwiYmdQYWdlIjoiI2VlZWVlZSIsImdyb3VwQmciOiIjZmZmZmZmIiwiZ3JvdXBPdXRsaW5lIjoiI2NjY2NjYyJ9LCJzaXplcyI6eyJwYWdlUGFkZGluZyI6IjEycHgiLCJncm91cEdhcCI6IjEycHgiLCJncm91cEJvcmRlclJhZGl1cyI6IjRweCIsIndpZGdldEdhcCI6IjEycHgifX1d"
---
::



This example showcases one of many powerful use cases for FlowFuse project nodes. By utilizing these capabilities, you can transform how your Node-RED instances communicate, enabling efficient workflows and innovative solutions.

## Using Project Call Nodes

**Project Call** nodes are ideal for triggering flows deployed on another Node-RED instance and retrieving the final result as a response. While they function similarly to [webhooks](/node-red/integration-technologies/webhook/), they utilize [MQTT](/node-red/protocol/mqtt/) as their underlying mechanism instead of HTTP. In this section, we will demonstrate the use of a **Project Call** node through an example of making an on-demand temperature request.

### How Project Call Nodes Work

The **Project Call** node does not operate in isolation; it requires both **Project In** and **Project Out** nodes to function properly. The **Project Call** node triggers the **Project In** node deployed on the specified target instance, while the **Project Out** node handles the response. This means the flow that needs to be triggered should start with a **Project In** node and end with a **Project Out** node.

### Example: On-Demand Temperature Request

In this example, we will trigger a flow on a Raspberry Pi instance that reads the temperature using a DHT11 sensor and sends the response back to the instance where we use the **Project Call** node.

Before we start, let’s review the configuration options for the **Project Call** node:

#### Project Call Node Configuration

- **Name**: A descriptive label for the node.
- **Timeout**: Set the duration to wait for a response before timing out.
- **Target**: Specify the target instance where the flow is deployed.
- **Topic**: This field allows you to specify a topic, similar to MQTT, to categorize the messages.

#### Prerequisites

Before we begin, ensure you have the following prepared:

- **node-red-contrib-dht-sensor**: Install this node via the palette manager. This node is used to manage the connection to a DHT11 or DHT22 sensor on a Raspberry Pi.
- **FlowFuse Device Agent Setup**: Ensure you have set up and are running the FlowFuse device agent on your Raspberry Pi, and it is connected to the platform.

#### Developing a Flow to Handle On-Demand Data Requests

Throughout this section, we will explore how to utilize the **Project Call** node along with **Project In** and **Project Out** nodes to trigger a flow that retrieves temperature readings from a Raspberry Pi on demand. 

***Note**: Before proceeding, make sure your device is assigned to an instance. If the device is assigned to an application, you cannot use Project nodes, as they are designed to work with instances.*



::render-flow
---
height: 200
flow: "W3siaWQiOiJiZGIyN2I5YWIwZDk0ODk3IiwidHlwZSI6ImluamVjdCIsInoiOiJiMTUyYTkxNDY1M2Q5ZmNlIiwibmFtZSI6IlRyaWdnZXIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiI1IiwiY3JvbnRhYiI6IiIsIm9uY2UiOnRydWUsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoyNjAsInkiOjM4MCwid2lyZXMiOltbIjhhNGZlOWNmMzQyYjYxNTYiXV19LHsiaWQiOiI0ZWNlNTRjYTNjOTFmN2ZmIiwidHlwZSI6ImRlYnVnIiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjgwLCJ5IjozODAsIndpcmVzIjpbXX0seyJpZCI6IjhhNGZlOWNmMzQyYjYxNTYiLCJ0eXBlIjoicnBpLWRodDIyIiwieiI6ImIxNTJhOTE0NjUzZDlmY2UiLCJuYW1lIjoiIiwidG9waWMiOiJycGktZGh0MjIiLCJkaHQiOiIxMSIsInBpbnR5cGUiOiIwIiwicGluIjo0LCJ4Ijo0NjAsInkiOjM4MCwid2lyZXMiOltbIjRlY2U1NGNhM2M5MWY3ZmYiXV19XQ=="
---
::



1. Copy/download the flow above and import/upload it into your Raspberry Pi Node-RED instance. Ensure you have correctly interfaced the DHT11 sensor with your Raspberry Pi. For more information, refer to our guide on [Setting Up Node-RED on Raspberry Pi 4](/node-red/hardware/raspberry-pi-4/), which explains how to install the device agent on the Raspberry Pi and read temperature data from the DHT11 sensor.
2. Deploy the flow.

Once you deploy the flow, you will see the temperature data displayed on the Debug panel if everything was done correctly. Now, let’s add the project nodes to trigger the temperature reading flow on demand and retrieve the data accordingly.

3. Drag the **Project In** node onto the canvas, double-click on it, and set the source to "Receive messages sent to this instance." Next, enter the topic.
4. Replace the **Inject** node with the **Project In** node.
5. Next, you can add a **Change** node to format the data received by the **DHT** node.
6. Drag the **Project Out** node onto the canvas, double-click on it, and set the mode to "Return to project link call."

Once the flow is ready, deploy it. The final flow should look like the one below:



::render-flow
---
height: 200
flow: "W3siaWQiOiIwMjBlZGUwYmY2OGNmMDYzIiwidHlwZSI6ImNoYW5nZSIsInoiOiJmZTYxZjU0Yzg1NjMyNzlkIiwibmFtZSI6IiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImRhdGEudGVtcGVyYXR1cmUiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZCIsInRvdCI6Im1zZyJ9LHsidCI6InNldCIsInAiOiJkYXRhLmh1bWlkaXR5IiwicHQiOiJtc2ciLCJ0byI6Imh1bWlkaXR5IiwidG90IjoibXNnIn0seyJ0IjoiZGVsZXRlIiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyJ9LHsidCI6ImRlbGV0ZSIsInAiOiJodW1pZGl0eSIsInB0IjoibXNnIn0seyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6InJwaS1kaHQxMSIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1NjAsInkiOjIyMCwid2lyZXMiOltbIjFhNTkyNDE0YWI2OWYxZDgiXV19LHsiaWQiOiJhMzlmY2ZjZDEzM2VjYWFlIiwidHlwZSI6InByb2plY3QgbGluayBpbiIsInoiOiJmZTYxZjU0Yzg1NjMyNzlkIiwibmFtZSI6InByb2plY3QgaW4gMSIsInByb2plY3QiOiJhbGwiLCJicm9hZGNhc3QiOmZhbHNlLCJ0b3BpYyI6InRlbXBlcmF0dXJlIiwieCI6MTYwLCJ5IjoyMjAsIndpcmVzIjpbWyIxNmU4YTI0NTQ1ZDMyNThmIl1dfSx7ImlkIjoiMWE1OTI0MTRhYjY5ZjFkOCIsInR5cGUiOiJwcm9qZWN0IGxpbmsgb3V0IiwieiI6ImZlNjFmNTRjODU2MzI3OWQiLCJuYW1lIjoicHJvamVjdCBvdXQgMSIsIm1vZGUiOiJyZXR1cm4iLCJicm9hZGNhc3QiOmZhbHNlLCJwcm9qZWN0IjoiYjFkZDFkN2QtNTU2ZS00ZGQ0LTliOGYtZDc4ZmZlM2Y1MTBkIiwidG9waWMiOiIiLCJ4Ijo3OTAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiMTZlOGEyNDU0NWQzMjU4ZiIsInR5cGUiOiJycGktZGh0MjIiLCJ6IjoiZmU2MWY1NGM4NTYzMjc5ZCIsIm5hbWUiOiIiLCJ0b3BpYyI6InJwaS1kaHQxMSIsImRodCI6IjExIiwicGludHlwZSI6IjAiLCJwaW4iOjQsIngiOjM0MCwieSI6MjIwLCJ3aXJlcyI6W1siMDIwZWRlMGJmNjhjZjA2MyJdXX1d"
---
::



Now that we have added the **Project In** and **Project Out** nodes, the flow can be triggered to read the temperature from any Node-RED instance within your team using the **Project Call** node and receive the response.

#### Triggering the Flow and Receiving Temperature Data

In this section, we will explore how to trigger the flow we created in the previous step and receive the on-demand temperature data.

1. Navigate to the instance within your team where you want to receive the data.
2. Drag the **Project Call** node onto the canvas. Double-click it to set the timeout according to your preference, then set the target to the instance where your flow needs to be triggered. Next, enter the topic you configured in the **Project In** node previously.
3. Drag an **Inject** node onto the canvas and connect it to the input of the **Project Call** node. This will allow you to trigger the **Project Call** node manually.
4. Finally, drag a **Debug** node onto the canvas and connect it to the output of the **Project Call** node. This will help you view the response received from the triggered flow in the Debug panel.
5. Deploy the flow.



::render-flow
---
height: 200
flow: "W3siaWQiOiI4Mjc2ZmJhNTE2ZjM2OTdiIiwidHlwZSI6InByb2plY3QgbGluayBjYWxsIiwieiI6ImQzODJiZDJiNTczM2EzYTkiLCJuYW1lIjoiIiwicHJvamVjdCI6ImQxYjZjZjNhLTcwZmMtNGVjNC1iMzBjLWUyMDczMzhiMmNjNCIsInRvcGljIjoidGVtcGVyYXR1cmUiLCJ0aW1lb3V0IjoiMzAiLCJ4Ijo1MzAsInkiOjIwMCwid2lyZXMiOltbIjllZjY2MzgzODJkN2U5ZDUiXV19LHsiaWQiOiIwYWJkYmY0MzM1MGViMzYyIiwidHlwZSI6ImluamVjdCIsInoiOiJkMzgyYmQyYjU3MzNhM2E5IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MzIwLCJ5IjoyMDAsIndpcmVzIjpbWyI4Mjc2ZmJhNTE2ZjM2OTdiIl1dfSx7ImlkIjoiOWVmNjYzODM4MmQ3ZTlkNSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkMzgyYmQyYjU3MzNhM2E5IiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc0MCwieSI6MjAwLCJ3aXJlcyI6W119XQ=="
---
::



Now, once you click the **Inject** button, you will see the response that includes the temperature in the debug panel, which is read by the flow deployed on the Raspberry Pi.

![Image showing the project call node triggering the flow to read the temperature data](/blog/2024/10/images/project-out-node-triggering-flow.gif){data-zoomable}
_Image showing the project call node triggering the flow deployed on the device to read the temperature data._

Now that you understand how to use FlowFuse project nodes, you can significantly improve the way your Node-RED instances communicate with one another.

## Conclusion

FlowFuse project nodes streamline communication between Node-RED instances. By using these nodes, you can easily monitor performance, request data, and more. This makes your workflows smoother and more efficient. 