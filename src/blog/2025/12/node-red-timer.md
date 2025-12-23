---
title: "Create Stopwatch and Countdown Timers in Node-RED (2026)"
subtitle: "Implement stopwatch and countdown timers for industrial automation and process control applications"
description: "Node-RED timer tutorial showing how to implement stopwatch and countdown timers for industrial automation and IoT applications."
date: 2025-12-23
authors: ["sumit-shinde"]
image: 
keywords:  
tags:
    - node-red
---

Timers are everywhere in industrial automation. You need them to track how long a machine has been running, measure downtime, schedule maintenance, or coordinate processes that happen in sequence.

<!--more-->

Through my work as a technical writer covering IIoT, building industrial applications, and being part of a company where our customers deploy real-world automation systems, I've observed that timers are ubiquitous in production environments. Whether it's a production floor display showing machine runtime, a maintenance terminal counting down to the next service window, or an operator interface tracking downtime by reason code—timers are foundational to industrial visibility. Here's an example of a performance operator terminal with timer functionality:

![Performance Operator Terminal](./images/performance-operator-terminal.png){data-zoomable}
_Performance operator terminal displaying real-time production metrics with timer functionality_

If you want to explore this interface yourself, you can [deploy this blueprint](/blueprint/performance-operator-terminal) to your FlowFuse instance and start experimenting immediately.

In this article, we'll build two types of timers in [Node-RED](/): stopwatches that measure elapsed time and countdowns that trigger actions after a set duration. Both are straightforward to implement and essential for most automation projects.

## Prerequisites

Before following this tutorial, you should have:

- A running Node-RED instance. For professional development and production deployments, [FlowFuse](/) is the recommended platform.

> FlowFuse provides enterprise-grade Node-RED hosting with managed infrastructure, built-in [DevOps tools](/blog/2024/10/how-to-build-automate-devops-pipelines-node-red-deployments/), [MQTT broker](/blog/2025/10/plc-to-mqtt-using-flowfuse/#step-3%3A-set-up-mqtt-with-flowfuse), [database](/blog/2025/08/getting-started-with-flowfuse-tables/), [team collaboration](/blog/2024/12/flowfuse-team-collaboration/) with [granular access control](https://www.youtube.com/watch?v=mb1s1YQIpZY), and seamless scaling capabilities. Whether you need cloud-hosted instances managed by FlowFuse or remote instances running on your edge devices, the platform provides unified management for both. FlowFuse also includes AI-powered features that accelerate flow development and streamline automation projects. From prototyping to mission-critical production deployments, FlowFuse handles the infrastructure complexity so you can focus on building flows. [Start with a free account](https://app.flowfuse.com/), your Node-RED instance will be ready immediately, accessible from any browser.

That's all you need to get started.

## Getting Started

We'll use two Node-RED community nodes for this tutorial: [node-red-contrib-hourglass](https://flows.nodered.org/node/node-red-contrib-hourglass) for stopwatch timers and [node-red-contrib-countdown](https://flows.nodered.org/node/node-red-contrib-countdown) for countdown timers. Both are simple to configure and work reliably in production environments.

Let's start with installing and building a stopwatch.

### Installing the Hourglass Node

First, install the hourglass node in your Node-RED instance:

1. Open the Node-RED editor
2. Click the hamburger menu (top right) and select "Manage palette"
3. Go to the "Install" tab
4. Search for `node-red-contrib-hourglass`
5. Click "Install"

The hourglass node will appear in your palette under the function category.

### Understanding Hourglass Commands

The hourglass node responds to control commands sent via `msg.command`. The available commands are:

- `start` - Begins timing operation
- `stop` - Stops the timer and outputs elapsed time
- `pause` - Pauses timing without resetting
- `reset` - Clears timer state and stops operation
- `status` - Outputs current timer state without stopping

These commands control timer behavior.

### Implementing a Stopwatch Timer

Build a basic stopwatch flow:

1. Drag four inject nodes onto the canvas
2. Add four change nodes, one after each inject node, and connect them
3. Configure the change nodes to set `msg.command`:
   - First change node: set to `"start"`
   - Second change node: set to `"status"`
   - Third change node: set to `"stop"`
   - Fourth change node: set to `"reset"`
4. Drag an hourglass node onto the canvas
5. Connect all four change nodes to the hourglass node input
6. Add a debug node and connect it to the hourglass node output
7. Deploy the flow

When you trigger the first inject node, the stopwatch starts. The second inject node checks current elapsed time without stopping the timer—you can configure this inject node to repeat at intervals for continuous time monitoring. The third inject node stops the stopwatch and outputs the total elapsed time. The fourth inject node resets the stopwatch back to zero.

The node outputs a message containing timing information:

![Hourglass node output message showing elapsed time in multiple formats](./images/hourglass-output.png){data-zoomable}
_Hourglass node output message showing elapsed time in multiple formats_

The `elapsed` object provides multiple formats: a human-readable string, total milliseconds, and broken-down time components. This flexibility supports different display requirements and calculation needs.

This basic example demonstrates the pattern. In production applications, replace the inject nodes with actual process triggers—machine status signals from PLCs or MQTT messages from sensors. The hourglass node output then connects to databases for logging, dashboards for visualization, or notification systems for alerts when thresholds are exceeded.

Below is the complete flow.

{% renderFlow 300 %}
[{"id":"650e5a4a5a977cb9","type":"group","z":"b446dfa04d79d359","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["f4c0fc7b.0d8ba","9dbff6e2.f4fa78","913ec325.43e08","3bc76c68.e85f64","c857c4c5.942628","3fa35199.275e3e","b4de9086.a01dc","cc439402.40cd98","8793a50e90bd2f3d","aa3b0df7de474d5d"],"x":74,"y":291,"w":892,"h":230},{"id":"f4c0fc7b.0d8ba","type":"hourglass","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"","humanizeLocale":"","x":700,"y":400,"wires":[["cc439402.40cd98"]]},{"id":"9dbff6e2.f4fa78","type":"inject","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Auto Start","props":[{"p":"payload","v":"","vt":"date"},{"p":"topic","v":"","vt":"str"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":190,"y":332,"wires":[["913ec325.43e08"]]},{"id":"913ec325.43e08","type":"change","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Start","rules":[{"t":"set","p":"command","pt":"msg","to":"start","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":450,"y":332,"wires":[["f4c0fc7b.0d8ba"]]},{"id":"3bc76c68.e85f64","type":"change","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Status","rules":[{"t":"set","p":"command","pt":"msg","to":"status","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":450,"y":380,"wires":[["f4c0fc7b.0d8ba"]]},{"id":"c857c4c5.942628","type":"change","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Stop","rules":[{"t":"set","p":"command","pt":"msg","to":"stop","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":450,"y":428,"wires":[["f4c0fc7b.0d8ba"]]},{"id":"3fa35199.275e3e","type":"inject","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Read every 15 seconds","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":230,"y":380,"wires":[["3bc76c68.e85f64"]]},{"id":"b4de9086.a01dc","type":"inject","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Manual Stop","props":[{"p":"payload","v":"","vt":"date"},{"p":"topic","v":"","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":190,"y":429,"wires":[["c857c4c5.942628"]]},{"id":"cc439402.40cd98","type":"debug","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":870,"y":400,"wires":[]},{"id":"8793a50e90bd2f3d","type":"change","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Reset","rules":[{"t":"set","p":"command","pt":"msg","to":"reset","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":450,"y":480,"wires":[["f4c0fc7b.0d8ba"]]},{"id":"aa3b0df7de474d5d","type":"inject","z":"b446dfa04d79d359","g":"650e5a4a5a977cb9","name":"Manual Reset","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":190,"y":480,"wires":[["8793a50e90bd2f3d"]]},{"id":"fd6f5f310e80f91f","type":"global-config","env":[],"modules":{"node-red-contrib-hourglass":"1.5.0"}}]
{% endrenderFlow %}

### Implementing a Countdown Timer

Countdown timers trigger actions after a specified duration. Common applications include scheduled maintenance windows, batch process timeouts, and timed equipment shutdowns.

To implement a countdown, we will use `node-red-contrib-countdown`.

#### Installing the Countdown Node

Install the countdown node in your Node-RED instance:

1. Open the Node-RED editor
2. Click the hamburger menu (top right) and select "Manage palette"
3. Go to the "Install" tab
4. Search for `node-red-contrib-countdown`
5. Click "Install"

The countdown node will appear in your palette.

#### Building a Countdown Timer

Create a countdown timer flow:

1. Drag an inject node onto the canvas
2. Add a change node and configure it to set `msg.payload` to the countdown duration in seconds (e.g., `30` for 30 seconds). You can also configure it with `msg.payload` in milliseconds and `msg.topic` set to `"control"`
3. Drag a countdown node onto the canvas and configure it with the following settings:
   - **Timer On payload**: The message payload to send when the timer completes (e.g., `"Timer Complete"`, `true`)
   - **Timer Off payload**: The message payload to send during countdown updates (e.g., remaining time)
   - **Restart countdown if message is received while running**: Leave unchecked for this example
   - **Send Output message on Reset**: Leave unchecked for this example
   - **Set time to new duration if control message is received while running**: Leave unchecked for this example
   - **Start countdown if control message is received while not running**: **Enable this option** (we'll use this for our example)
4. Connect the change node to the countdown node
5. Add a debug node and connect it to the countdown node output
6. Deploy the flow

When you trigger the inject node, the countdown starts. The countdown node outputs messages at regular intervals showing the remaining time from the second output as shown below. 

![Countdown node output showing remaining time updates](./images/countdown.png){data-zoomable}
_Countdown node output showing remaining time updates_

From the first output, it will send the message you configured at the start of the count and at the end of the countdown.

Below is the flow implementation that you can use as a starting point.

{% renderFlow 300 %}
[{"id":"97b534cd1edcb6da","type":"group","z":"b446dfa04d79d359","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["adefa2c7.627a98","baf24a69.e33e98","0ffb9329f6931118","4c496ba19e98c333"],"x":214,"y":859,"w":552,"h":122},{"id":"adefa2c7.627a98","type":"countdown","z":"b446dfa04d79d359","g":"97b534cd1edcb6da","name":"","topic":"","payloadTimerStart":"true","payloadTimerStartType":"bool","payloadTimerStop":"false","payloadTimerStopType":"bool","timer":"30","resetWhileRunning":false,"outputOnReset":false,"setTimeToNewWhileRunning":true,"startCountdownOnControlMessage":false,"x":470,"y":920,"wires":[["0ffb9329f6931118"],["4c496ba19e98c333"]]},{"id":"baf24a69.e33e98","type":"inject","z":"b446dfa04d79d359","g":"97b534cd1edcb6da","name":"start","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"str","x":310,"y":920,"wires":[["adefa2c7.627a98"]]},{"id":"0ffb9329f6931118","type":"debug","z":"b446dfa04d79d359","g":"97b534cd1edcb6da","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":630,"y":900,"wires":[]},{"id":"4c496ba19e98c333","type":"debug","z":"b446dfa04d79d359","g":"97b534cd1edcb6da","name":"Countdown","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":650,"y":940,"wires":[]},{"id":"eb58073c0919b30a","type":"global-config","env":[],"modules":{"node-red-contrib-countdown":"1.3.2"}}]
{% endrenderFlow %}

For this demonstration, we used an inject node to manually trigger the countdown. In production environments, you would replace this with actual process triggers—equipment status signals from PLCs, MQTT messages from sensors, or completion signals from upstream operations. For example, you might start a maintenance window countdown when equipment reaches a scheduled service interval, or initiate a cleanup cycle timer when a batch process completes.

While these examples cover the essential timer operations, both nodes offer additional configuration options. For comprehensive documentation, visit the [node-red-contrib-hourglass](https://flows.nodered.org/node/node-red-contrib-hourglass) and [node-red-contrib-countdown](https://flows.nodered.org/node/node-red-contrib-countdown) pages on the Node-RED flows library.

## Conclusion

That's it, you now have working stopwatch and countdown timers in Node-RED. The hourglass node tracks elapsed time, and the countdown node triggers actions after a set duration.

These implementations are ready for production use. Start with these basic patterns, test them in your environment, and expand as needed. Connect them to your PLCs, add dashboard displays, or integrate with your existing automation workflows.

Both nodes are actively maintained and used in real industrial systems, so you're building on proven foundations.