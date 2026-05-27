---
title: 'Node-RED Timer Tutorial: Create Stopwatch and Countdown Timers'
navTitle: 'Node-RED Timer Tutorial: Create Stopwatch and Countdown Timers'
---

Timers are everywhere in industrial automation. You need them to track how long a machine has been running, measure downtime, schedule maintenance, or coordinate processes that happen in sequence.

<!--more-->

Through my work as a technical writer covering IIoT, building industrial applications, and being part of a company where our customers deploy real-world automation systems, I've observed that **timers** are ubiquitous in production environments. Whether it's a production floor display showing machine runtime, a maintenance terminal counting down to the next service window, or an operator interface tracking downtime by reason code—timers are foundational to industrial visibility. Here's an example of a performance operator terminal with timer functionality:

![Performance Operator Terminal](/blog/2025/12/images/performance-operator-terminal.png){data-zoomable}
_Performance operator terminal displaying real-time production metrics with timer functionality_

If you want to explore this interface yourself, you can [deploy this blueprint](/blueprints/manufacturing/performance-operator-terminal/) to your **FlowFuse** instance and start experimenting immediately.

In this article, we'll build two types of timers in [Node-RED](/): **stopwatches** that measure elapsed time and countdowns that trigger actions after a set duration. Both are straightforward to implement and essential for most automation projects.

## Prerequisites

Before following this tutorial, you should have:

- A running **Node-RED instance**. For professional development and production deployments, **[FlowFuse](/)** is the recommended platform. If you don’t have an account, [start your free trial](http://app.flowfuse.com) today.

> FlowFuse provides enterprise-grade Node-RED hosting with managed infrastructure, built-in [DevOps tools](/blog/2024/10/how-to-build-automate-devops-pipelines-node-red-deployments/), [MQTT broker](/blog/2025/10/plc-to-mqtt-using-flowfuse/#step-3%3A-set-up-mqtt-with-flowfuse), [database](/blog/2025/08/getting-started-with-flowfuse-tables/), [team collaboration](/blog/2024/12/flowfuse-team-collaboration/) with [granular access control](https://www.youtube.com/watch?v=mb1s1YQIpZY), and seamless scaling capabilities. Whether you need cloud-hosted instances managed by FlowFuse or remote instances running on your edge devices, the platform provides unified management for both. FlowFuse also includes AI-powered features that accelerate flow development and streamline automation projects. From prototyping to mission-critical production deployments, FlowFuse handles the infrastructure complexity so you can focus on building flows.

That's all you need to get started.

# Getting Started

We'll use two Node-RED community nodes for this tutorial: **node-red-contrib-hourglass** for stopwatch timers and node-red-contrib-countdown for **countdown timers**. Both are simple to configure and work reliably in production environments.

Let's start with installing and building a stopwatch.

### Installing the Hourglass Node

First, install the **hourglass node** in your Node-RED instance:

1. Open the Node-RED editor
2. Click the **hamburger menu** (top right) and select "Manage palette"
3. Go to the "Install" tab
4. Search for `node-red-contrib-hourglass`
5. Click **"Install"**

The **hourglass node** will appear in your palette under the function category.

## Understanding Hourglass Commands

The hourglass node responds to control commands sent via `msg.command`. The available commands are:

- **start** - Begins timing operation
- **stop** - Stops the timer and outputs elapsed time
- **pause** - Pauses timing without resetting
- **reset** - Clears timer state and stops operation
- **status** - Outputs current timer state without stopping

These commands control timer behavior.

### Implementing a Stopwatch Timer

Build a basic **stopwatch flow**:

1. Drag four inject nodes onto the canvas
2. Add four **change nodes**, one after each inject node, and connect them
3. Configure the change nodes to set `msg.command`:
   - First **change node**: set to `"start"`
   - Second change node: set to `"status"`
   - Third **change node**: set to `"stop"`
   - Fourth change node: set to `"reset"`
4. Drag an **hourglass node** onto the canvas
5. Connect all four change nodes to the **hourglass node** input
6. Add a debug node and connect it to the hourglass node output
7. Deploy the flow

When you trigger the first inject node, the **stopwatch starts**. The second inject node checks current elapsed time without stopping the timer—you can configure this inject node to repeat at intervals for continuous time monitoring. The third inject node stops the **stopwatch** and outputs the total elapsed time. The fourth inject node resets the stopwatch back to zero.

The node outputs a message containing timing information:

![Hourglass node output message showing elapsed time in multiple formats](/blog/2025/12/images/hourglass-output.png){data-zoomable}
_Hourglass node output message showing elapsed time in multiple formats_

The `elapsed` object provides multiple formats: a human-readable string, total milliseconds, and broken-down time components. This flexibility supports different display requirements and calculation needs.

This basic example demonstrates the pattern. In production applications, replace the inject nodes with actual process triggers—**machine status signals** from PLCs or MQTT messages from sensors. The **hourglass node output** then connects to databases for logging, dashboards for visualization, or notification systems for alerts when thresholds are exceeded.

Below is the complete flow.



::render-flow
---
height: 300
flow: "W3siaWQiOiJhOGUwNWU0YjFhOGE4ZTVlIiwidHlwZSI6Imdyb3VwIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyI4MTM2NWZhYzFjY2Y2Mjk5IiwiNjVjZjVhNTIzZWFlZTkyNiIsIjU2MGE5MjcxZjJiNDY2ODciLCI0YzU0NDlhZjdhNGRkNmVmIiwiZTg0MDA0NjFjZDUwYjM1NiIsIjU1YTAwOGFhYjYyMDQ1NjUiLCIxODYzMGRlZWRjMzhhZjlmIiwiOWVmNGE3NDViZDAxOTRjZiIsImNmODRhZGQ1NDBjMDc5Y2UiLCIzNWFiM2JiYjE2NzRiNGY2Il0sIngiOjE5NCwieSI6MjIzMSwidyI6ODkyLCJoIjoyMzB9LHsiaWQiOiI4MTM2NWZhYzFjY2Y2Mjk5IiwidHlwZSI6ImhvdXJnbGFzcyIsInoiOiJiNDQ2ZGZhMDRkNzlkMzU5IiwiZyI6ImE4ZTA1ZTRiMWE4YThlNWUiLCJuYW1lIjoiIiwiaHVtYW5pemVMb2NhbGUiOiIiLCJ4Ijo4MjAsInkiOjIzNDAsIndpcmVzIjpbWyI5ZWY0YTc0NWJkMDE5NGNmIl1dfSx7ImlkIjoiNjVjZjVhNTIzZWFlZTkyNiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsImciOiJhOGUwNWU0YjFhOGE4ZTVlIiwibmFtZSI6IkF1dG8gU3RhcnQiLCJwcm9wcyI6W3sicCI6InBheWxvYWQiLCJ2IjoiIiwidnQiOiJkYXRlIn0seyJwIjoidG9waWMiLCJ2IjoiIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjp0cnVlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MzEwLCJ5IjoyMjcyLCJ3aXJlcyI6W1siNTYwYTkyNzFmMmI0NjY4NyJdXX0seyJpZCI6IjU2MGE5MjcxZjJiNDY2ODciLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJnIjoiYThlMDVlNGIxYThhOGU1ZSIsIm5hbWUiOiJTdGFydCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImNvbW1hbmQiLCJwdCI6Im1zZyIsInRvIjoic3RhcnQiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTcwLCJ5IjoyMjcyLCJ3aXJlcyI6W1siODEzNjVmYWMxY2NmNjI5OSJdXX0seyJpZCI6IjRjNTQ0OWFmN2E0ZGQ2ZWYiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJnIjoiYThlMDVlNGIxYThhOGU1ZSIsIm5hbWUiOiJTdGF0dXMiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJjb21tYW5kIiwicHQiOiJtc2ciLCJ0byI6InN0YXR1cyIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1NzAsInkiOjIzMjAsIndpcmVzIjpbWyI4MTM2NWZhYzFjY2Y2Mjk5Il1dfSx7ImlkIjoiZTg0MDA0NjFjZDUwYjM1NiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsImciOiJhOGUwNWU0YjFhOGE4ZTVlIiwibmFtZSI6IlN0b3AiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJjb21tYW5kIiwicHQiOiJtc2ciLCJ0byI6InN0b3AiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTcwLCJ5IjoyMzY4LCJ3aXJlcyI6W1siODEzNjVmYWMxY2NmNjI5OSJdXX0seyJpZCI6IjU1YTAwOGFhYjYyMDQ1NjUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJnIjoiYThlMDVlNGIxYThhOGU1ZSIsIm5hbWUiOiJSZWFkIGV2ZXJ5IDEgc2Vjb25kcyIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IjEiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozNTAsInkiOjIzMjAsIndpcmVzIjpbWyI0YzU0NDlhZjdhNGRkNmVmIl1dfSx7ImlkIjoiMTg2MzBkZWVkYzM4YWY5ZiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsImciOiJhOGUwNWU0YjFhOGE4ZTVlIiwibmFtZSI6Ik1hbnVhbCBTdG9wIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIiwidiI6IiIsInZ0IjoiZGF0ZSJ9LHsicCI6InRvcGljIiwidiI6IiIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozMTAsInkiOjIzNjksIndpcmVzIjpbWyJlODQwMDQ2MWNkNTBiMzU2Il1dfSx7ImlkIjoiOWVmNGE3NDViZDAxOTRjZiIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiNDQ2ZGZhMDRkNzlkMzU5IiwiZyI6ImE4ZTA1ZTRiMWE4YThlNWUiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5OTAsInkiOjIzNDAsIndpcmVzIjpbXX0seyJpZCI6ImNmODRhZGQ1NDBjMDc5Y2UiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJnIjoiYThlMDVlNGIxYThhOGU1ZSIsIm5hbWUiOiJSZXNldCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImNvbW1hbmQiLCJwdCI6Im1zZyIsInRvIjoicmVzZXQiLCJ0b3QiOiJzdHIifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTcwLCJ5IjoyNDIwLCJ3aXJlcyI6W1siODEzNjVmYWMxY2NmNjI5OSJdXX0seyJpZCI6IjM1YWIzYmJiMTY3NGI0ZjYiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJnIjoiYThlMDVlNGIxYThhOGU1ZSIsIm5hbWUiOiJNYW51YWwgUmVzZXQiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozMTAsInkiOjI0MjAsIndpcmVzIjpbWyJjZjg0YWRkNTQwYzA3OWNlIl1dfSx7ImlkIjoiNTE5MWRkMjU4OThjNjMxYyIsInR5cGUiOiJnbG9iYWwtY29uZmlnIiwiZW52IjpbXSwibW9kdWxlcyI6eyJub2RlLXJlZC1jb250cmliLWhvdXJnbGFzcyI6IjEuNS4wIn19XQ=="
---
::



## Implementing a Countdown Timer

Countdown timers trigger actions after a specified duration. Common applications include scheduled maintenance windows, batch process timeouts, and timed equipment shutdowns.

To implement a countdown, we will use `node-red-contrib-countdown`.

#### Installing the Countdown Node

Install the **countdown node** in your Node-RED instance:

1. Open the Node-RED editor
2. Click the hamburger menu (top right) and select **"Manage palette"**
3. Go to the "Install" tab
4. Search for `node-red-contrib-countdown`
5. Click **"Install"**

The countdown node will appear in your palette.

### Building a Countdown Timer

Create a **countdown timer flow** in Node-RED:

1. Drag an **Inject** node onto the canvas.
2. Add a Change node and configure it to:

   - Set `msg.payload` to the countdown duration in **seconds** (for example, `50` for 50 seconds).
   - Set `msg.topic` to `"control"`.
   - You can configure the countdown duration either in the **Change** node or directly in the Inject node, as long as `msg.payload` is in milliseconds and `msg.topic` is `"control"`.

3. Drag a **Countdown** node onto the canvas and configure it with the following settings:

   - **Timer On payload**: The message payload sent when the countdown starts (for example, `true`).
   - **Timer Off payload**: The message payload sent when the countdown completes (for example, `false`).
   - **Restart countdown if message is received while running**: Enable this to restart the countdown if a new control message is received.
   - **Send output message on Reset**: Enable this to send a message when the countdown is reset.
   - **Set time to new duration if control message is received while running**: Enable this to update the countdown duration while it is running.
   - **Start countdown if control message is received while not running**: Enable this to start the countdown using a control message, enable it for this example to allow starting countdown when control message recived 

4. Connect the Change node to the **Countdown** node.
5. Add a **Debug** node and connect it to the Countdown node output.
6. Click **Deploy** to activate the flow.

When you trigger the Inject node, the **countdown starts**. The Countdown node outputs messages at regular intervals, and the **second output** shows the remaining time.

![Countdown node output showing remaining time updates](/blog/2025/12/images/countdown.png){data-zoomable}
_Countdown node output showing remaining time updates_

From the first output, it will send the message you configured at the start of the count and at the end of the countdown.

Below is the flow implementation that you can use as a starting point.



::render-flow
---
height: 300
flow: "W3siaWQiOiIxM2UzOTM3YjA1NTVkMzRkIiwidHlwZSI6Imdyb3VwIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyIwYTdmZGNlYjdiODQ0Yzc2IiwiYjFkMzZiNjA4YmFmYjUzMSIsImU3ZTA4OTRiMjgzMmU5M2UiLCI1MmQwYWJlMTVlMzUzM2M4IiwiYzQ4ZGNhZWM5OTg0NDBhYSJdLCJ4IjoxMzQsInkiOjM0MTksInciOjY5MiwiaCI6MTIyfSx7ImlkIjoiMGE3ZmRjZWI3Yjg0NGM3NiIsInR5cGUiOiJjb3VudGRvd24iLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsImciOiIxM2UzOTM3YjA1NTVkMzRkIiwibmFtZSI6IiIsInRvcGljIjoiIiwicGF5bG9hZFRpbWVyU3RhcnQiOiJ0cnVlIiwicGF5bG9hZFRpbWVyU3RhcnRUeXBlIjoiYm9vbCIsInBheWxvYWRUaW1lclN0b3AiOiJmYWxzZSIsInBheWxvYWRUaW1lclN0b3BUeXBlIjoiYm9vbCIsInRpbWVyIjoiMzAiLCJyZXNldFdoaWxlUnVubmluZyI6ZmFsc2UsIm91dHB1dE9uUmVzZXQiOmZhbHNlLCJzZXRUaW1lVG9OZXdXaGlsZVJ1bm5pbmciOmZhbHNlLCJzdGFydENvdW50ZG93bk9uQ29udHJvbE1lc3NhZ2UiOnRydWUsIngiOjU1MCwieSI6MzQ4MCwid2lyZXMiOltbImU3ZTA4OTRiMjgzMmU5M2UiXSxbIjUyZDBhYmUxNWUzNTMzYzgiXV19LHsiaWQiOiJiMWQzNmI2MDhiYWZiNTMxIiwidHlwZSI6ImluamVjdCIsInoiOiJiNDQ2ZGZhMDRkNzlkMzU5IiwiZyI6IjEzZTM5MzdiMDU1NWQzNGQiLCJuYW1lIjoiU3RhcnQiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjMwLCJ5IjozNDgwLCJ3aXJlcyI6W1siYzQ4ZGNhZWM5OTg0NDBhYSJdXX0seyJpZCI6ImU3ZTA4OTRiMjgzMmU5M2UiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsImciOiIxM2UzOTM3YjA1NTVkMzRkIiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2OTAsInkiOjM0NjAsIndpcmVzIjpbXX0seyJpZCI6IjUyZDBhYmUxNWUzNTMzYzgiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsImciOiIxM2UzOTM3YjA1NTVkMzRkIiwibmFtZSI6IkNvdW50ZG93biIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3MTAsInkiOjM1MDAsIndpcmVzIjpbXX0seyJpZCI6ImM0OGRjYWVjOTk4NDQwYWEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJnIjoiMTNlMzkzN2IwNTU1ZDM0ZCIsIm5hbWUiOiJTZXQgQ291bnRkb3duIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiI1MCIsInRvdCI6Im51bSJ9LHsidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJjb250cm9sIiwidG90Ijoic3RyIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjM4MCwieSI6MzQ4MCwid2lyZXMiOltbIjBhN2ZkY2ViN2I4NDRjNzYiXV19LHsiaWQiOiI2NmJlMDhlYWQ3OTMwNGJmIiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7Im5vZGUtcmVkLWNvbnRyaWItY291bnRkb3duIjoiMS4zLjIifX1d"
---
::



For this demonstration, we used an inject node to manually trigger the countdown. In production environments, you would replace this with actual process triggers—**equipment status signals** from [PLCs](/blog/2025/10/plc-to-mqtt-using-flowfuse/), [MQTT](/blog/2024/06/how-to-use-mqtt-in-node-red/) messages from sensors, or completion signals from upstream operations. For example, you might start a **maintenance window countdown** when equipment reaches a scheduled service interval, or initiate a cleanup cycle timer when a batch process completes.

While these examples cover the essential timer operations, both nodes offer additional configuration options. For comprehensive documentation, visit the [node-red-contrib-hourglass](https://flows.nodered.org/node/node-red-contrib-hourglass) and [node-red-contrib-countdown](https://flows.nodered.org/node/node-red-contrib-countdown) pages on the **Node-RED flows library**.

# Conclusion

That's it, you now have working **stopwatch** and **countdown timers** in Node-RED. The hourglass node tracks elapsed time, and the countdown node triggers actions after a set duration.

These implementations are ready for production use. Start with these basic patterns, test them in your environment, and expand as needed. Connect them to your **PLCs**, add dashboard displays, or integrate with your existing automation workflows.

Both nodes are actively maintained and used in real industrial systems, so you're building on proven foundations.
