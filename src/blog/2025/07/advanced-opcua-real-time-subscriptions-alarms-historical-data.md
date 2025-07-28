---
title: "Advanced OPC UA: Real-Time Subscriptions, Alarms, and Historical Data"
subtitle: "Build production-ready industrial monitoring with FlowFuse's advanced OPC UA capabilities"
description: "Learn advanced OPC UA techniques in Node-RED: real-time subscriptions, alarm handling, historical data queries, and method calls for production-ready industrial systems."
date: 2025-07-28
keywords: OPC UA subscriptions Node-RED, OPC UA events alarms, OPC UA historical data, OPC UA method calls, real-time monitoring OPC UA, industrial automation advanced, OPC UA HA redundancy, OPC UA performance optimization
authors: ["sumit-shinde"]
tags:
  - flowfuse
  - opcua
  - advanced
---

In our [previous tutorial](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/), we covered OPC UA basics—connecting to servers, reading tags, and writing values. Now it's time for the features that make OPC UA truly powerful in production.

<!--more-->

Polling for data every few seconds works fine for demos, but real systems need better. They need instant updates when values change. They need alarms that fire immediately when something goes wrong. They need access to historical data for troubleshooting. And they need to trigger complex operations without juggling dozens of write commands.

This guide shows you how to build all of that using advanced OPC UA features in FlowFuse Node-RED.

## What You'll Learn

This guide covers four powerful OPC UA features:

- **Subscriptions**: Get real-time updates without constant polling
- **Events & Alarms**: Capture and handle equipment alerts as they happen
- **Historical Data**: Query past values for trending and analysis
- **Method Calls**: Execute functions directly on your equipment

These aren't theoretical examples—they're patterns proven in production environments across manufacturing, energy, and process industries.

## Prerequisites

To follow this guide, you'll need:

- FlowFuse running instance with the `node-red-contrib-opcua` nodes installed
- A working OPC UA server connection
- The basics from our [previous tutorial](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/)

FlowFuse adds DevOps pipelines, audit logs, snapshots, and high availability to Node-RED. [Start free](https://app.flowfuse.com/account/create).

Before proceeding, check which features your OPC UA server supports—most handle subscriptions and events, but historical data and methods vary by vendor.

Let's get started.

## Real-Time Monitoring with Subscriptions

OPC UA subscriptions monitor values on the server side and notify you only when they change. This is fundamentally different from polling, where you repeatedly ask for values whether they've changed or not.

Consider a pressure sensor that spikes from 5 to 20 bar and back to 5 bar in one second. With 2-second polling, you miss this critical event entirely. With subscriptions, the server captures it and notifies you immediately.

The efficiency gains are significant too. Monitoring 100 tags with polling means 100 requests every 2 seconds, consuming bandwidth even when nothing changes. Subscriptions send updates only when values actually change, reducing network traffic and server load.

### Setting Up Subscriptions

To create your first subscription:

1. Drag an Inject node onto your canvas. This will trigger the subscription to start.

2. Add an OpcUa-Item node. Double-click it and enter the NodeId of the tag you want to monitor, like `ns=2;i=2007`. Select the correct data type for your tag.

3. Place an OpcUa-Client node on the canvas. Open its Configuration, select your OPC UA server endpoint configuration, and change the Action dropdown to "SUBSCRIBE". Set the interval to how often you want updates.

4. Connect the Inject output to the OpcUa-Item input. Connect the OpcUa-Item output to the OpcUa-Client input. Add a Debug node and connect the OpcUa-Client output to the Debug input.

5. Deploy your flow and click the Inject button. 

Once clicked, the OpcUa-Item node will connect to the OpcUa-Client and create the subscription. You'll see the node status change to show "subscribed" and then the subscription becomes active. When values change, they appear in the debug panel. If no values change within the interval time, the status shows "keep alive" to confirm the connection is still working.

### Subscribing to Multiple Tags

To monitor multiple tags, simply create multiple OpcUa-Item nodes and connect them all to the same OpcUa-Client node. Each item node should have its own NodeId configured. When you trigger the flow, all tags start updating simultaneously.

For many tags, you can use a Function node to subscribe to multiple items at once. Connect the Function node directly to the OpcUa-Client node (no OpcUa-Item node needed). Use the "multiple" topic with the following code:

```javascript
msg.topic = "multiple";
msg.payload = [
    { nodeId: "ns=3;i=1007" },
    { nodeId: "ns=3;i=1002" },
    { nodeId: "ns=3;i=1001" }
];
return msg;
```

This subscribes to all tags in the array with a single request.

When using the "multiple" topic, each value update arrives in OPC UA's DataValue format. Here's what you'll see in the debug panel:

```
{
    value: {
        dataType: "Double",
        value: 23.5
    },
    statusCode: {
        value: 0,  // 0 = Good
        description: "Good"
    },
    serverTimestamp: "2025-07-24T11:12:45.640Z",
    sourceTimestamp: "2025-07-24T10:33:17.697Z"
}
```

Subscribing to multiple tags with OpcUa-Item nodes returns just the value.

### Stopping Subscriptions

To stop receiving updates and free up server resources, you have two options:

**UNSUBSCRIBE**: Removes specific monitored items from the subscription but keeps the subscription alive. Use this when you want to stop monitoring certain tags while keeping others active.

**DELETESUBSCRIPTION**: Completely removes the subscription and all its monitored items. Use this when you're done monitoring and want to clean up all resources.

To use either action, change the OpcUa-Client node's Action dropdown to "UNSUBSCRIBE" or "DELETESUBSCRIPTION" and trigger the flow with the inject node.

## Events and Alarms

OPC UA events and alarms go beyond simple value monitoring. While subscriptions tell you "the temperature is 95°C", events tell you "high temperature alarm triggered at 14:32:15 on Tank 3". 

Events capture the full context of what happened, when it happened, and what needs attention. Alarms are a special type of event that requires acknowledgment - perfect for critical situations that need human intervention.

### Setting Up Event Monitoring

1. Add an Inject node to trigger the event subscription.

2. Add an OpcUa-Event node and configure the Source node to the event source. For server-wide events, use `ns=0;i=2253` (the Server object).

3. Add an OpcUa-Client node with Action set to "EVENTS".

4. Connect the Inject output to the OpcUa-Item input. Connect the OpcUa-Item output to the OpcUa-Client input. Add a Debug node and connect the OpcUa-Client output to the Debug input.

Deploy and trigger the flow. The debug panel will show events as they occur on your server.

### Acknowledging Alarms

When alarms trigger, operators often need to acknowledge them to indicate they've seen the issue. Here's how to send acknowledgments back to the OPC UA server:

1. Add an Inject node to manually trigger the acknowledgment.

2. Add a Function node to prepare the acknowledgment message.

3. In the Function node, add this code:

```javascript
msg.topic = "ns=6;s=MyLevel.Alarm";        // The alarm's NodeId
msg.conditionId = "ns=6;s=MyLevel.Alarm/0:EventId";  // NodeId + "/0:EventId"
msg.comment = "Acknowledged via Node-RED";  // Your acknowledgment message
return msg;
```

4. Add an OpcUa-Client node. Open its configuration and set the Action dropdown to "ACKNOWLEDGE".

5. Connect the Inject output to the Function input. Connect the Function output to the OpcUa-Client input.

Deploy the flow. When you click the Inject button, it sends the acknowledgment to the server. The alarm state changes to "Event: <alarm's NodeId> Acknowledged" and operators know someone has seen the issue.

## Method Calls

OPC UA methods let you execute functions directly on your equipment. Instead of writing multiple values to trigger an action, you call a method with parameters—like calling a function in code.

Methods are ideal for complex operations like starting batch processes, resetting counters, or triggering calibration routines. They encapsulate the logic on the server side, making your Node-RED flows simpler and more reliable.

### Calling Methods

To call a method on your OPC UA server:

1. Add an Inject node to trigger the method call.

2. Add an OpcUa-Method node and double-click it. Select your OPC UA endpoint, then enter the Object ID (like `ns=6;s=MyDevice`) and Method ID (like `ns=6;s=MyMethod`).

3. In the Arguments section, enter each argument's name, type, and value. For example:
   - Name: `Operator`, Type: `String`, Value: "sin"
   - Name: `Value`, Type: `Double`, Value: `3.3`

4. Connect the Inject output to the OpcUa-Method input. Add a Debug node to see the result.

Deploy and click the Inject button. The method executes on the server and the node status changes to "Method Executed". The result appears in the debug panel.

<!--todo: Image-->


## Historical Data Access

OPC UA Historical Access lets you query past values from your equipment. Instead of just seeing current temperature, you can ask "what was the temperature yesterday at 3 PM?" or "show me all pressure values from the last shift."

This is essential for troubleshooting, compliance reporting, and trend analysis. However, not all OPC UA servers support historical data—check your server documentation first. Also, not all tags are configured for history—verify that the "Historizing" attribute is set to true for your tag.

### Reading Historical Values

To query historical data from your server:

1. Add an Inject node to trigger the historical read.

2. Add a Function node to prepare the query parameters.

3. In the Function node, add this code:

```javascript
msg.topic = "NodeId ns=6;s=MyLevel"; // Replace with your NodeId
msg.aggregate = "raw"; // Or use: "min", "max", "ave", "interpolative"
msg.start = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
msg.end = new Date(); // Now
return msg;
```

4. Add an OpcUa-Client node. Open its configuration and set the Action dropdown to "HISTORY".

5. Connect the Inject output to the Function input. Connect the Function output to the OpcUa-Client input. Add a Debug node to see the historical values.

Deploy and click the Inject button. The debug panel shows all stored values for that tag within your time range.

### Advanced Historical Queries

While all historized tags support raw data, aggregate support varies by tag type. Analog values typically support aggregates like min, max, and ave, while discrete tags may only support raw.

**Working with Aggregates:**
```javascript
msg.topic = "ns=6;s=MyLevel";
msg.aggregate = "ave";  // Options: "min", "max", "ave", "interpolative"
msg.start = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago
msg.end = new Date(); // Now
msg.interval = 300000;  // Required for aggregates: 5-minute intervals
return msg;
```

**Hourly Averages for the Last Day:**
```javascript
msg.topic = "ns=3;s=Temperature";
msg.aggregate = "ave";
msg.start = new Date(Date.now() - 24*60*60*1000);  // 24 hours ago
msg.end = new Date();
msg.interval = 3600000;  // 1-hour intervals
return msg;
```

**Peak Detection:**
```javascript
// Find maximum values in 15-minute windows
msg.topic = "ns=3;s=Pressure";
msg.aggregate = "max";
msg.start = new Date().setHours(0,0,0,0);  // Midnight today
msg.end = new Date();
msg.interval = 900000;  // 15-minute intervals
return msg;
```

The historical data returns with timestamps and quality codes. Use this for shift reports, compliance documentation, or troubleshooting equipment issues that happened hours or days ago.

## Putting It All Together

You've now mastered the advanced features that make OPC UA essential for industrial systems. With subscriptions, you're monitoring values in real-time without wasting bandwidth. With events and alarms, you're capturing critical alerts the moment they happen. With method calls, you're executing complex operations with a single command. And with historical access, you have the data trail needed for analysis and compliance.

These features transform Node-RED from a simple data collection tool into a production-ready industrial platform. Your flows can now:

- React instantly to equipment changes
- Handle operator acknowledgments for critical alarms
- Execute complex sequences without fragile write chains
- Access historical trends for predictive maintenance

## Scale Your OPC UA Implementation

Managing OPC UA flows across multiple sites? FlowFuse helps teams deploy Node-RED to hundreds of edge devices, push updates without touching each server, and monitor all connections from one dashboard. No more manually copying flows or losing track of which version runs where.

[Get started free](https://app.flowfuse.com/account/create) or [see how others use FlowFuse for OPC UA](https://flowfuse.com/case-studies/).

