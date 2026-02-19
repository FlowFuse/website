---
title: "OPC UA Tutorial: Advanced Monitoring with Subscriptions, Alarms, and Historical Data"
subtitle: "Master advanced OPC UA features in Node-RED for production-ready industrial automation"
description: "Learn advanced OPC UA techniques in Node-RED: real-time subscriptions, alarm handling, historical data queries, and method calls for production-ready industrial systems."
date: 2025-08-14
keywords: OPC UA subscriptions Node-RED, OPC UA events alarms, OPC UA historical data, OPC UA method calls, real-time monitoring OPC UA, industrial automation advanced, OPC UA HA redundancy, OPC UA performance optimization
authors: ["sumit-shinde"]
image: /blog/2025/08/images/advanced-opcua-real-time-subscriptions-alarms-historical-data.png
tags:
  - flowfuse
  - opcua
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

## Prerequisites

To follow this guide, you'll need:

- FlowFuse running instance with the `node-red-contrib-opcua` nodes installed
- A working OPC UA server connection
- The basics from our [previous tutorial](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/)


> Managing and scaling Node-RED instances is easy with FlowFuse, offering DevOps pipelines, audit logs, snapshots, high availability, and much more. [Start your free trial today!]({% include "sign-up-url.njk" %})

Before proceeding, check which features your OPC UA server supports—most handle subscriptions and events, but historical data and methods vary by vendor.

Let's get started.


## Real-Time Monitoring with Subscriptions

OPC UA subscriptions monitor values on the server side and notify you only when they change. This is fundamentally different from polling, where you repeatedly ask for values whether they've changed or not.

Consider a pressure sensor that spikes from 5 to 20 bar and back to 5 bar in one second. With 2-second polling, you miss this critical event entirely. With subscriptions, the server captures it and notifies you immediately.

The efficiency gains are significant too. Monitoring 100 tags with polling means 100 requests every 2 seconds, consuming bandwidth even when nothing changes. Subscriptions send updates only when values actually change, reducing network traffic and server load.

### Setting Up Subscriptions

To create your first subscription:

1. Drag an Inject node onto your canvas. This will trigger the subscription to start.

> Note: This article uses Inject nodes for manual triggering to illustrate key concepts. In production, it is advisable to create interactive dashboards with FlowFuse Dashboard to enable effective monitoring and control. For more information on designing operator interfaces, please refer to [this article](/blog/2023/07/how-to-build-a-opc-client-dashboard-in-node-red/).


2. Add an OpcUa-Item node. Double-click it and enter the NodeId of the tag you want to monitor, like `ns=2;i=2007`. Select the correct data type for your tag.

3. Place an OpcUa-Client node on the canvas. Open its Configuration, select your OPC UA server endpoint configuration, and change the Action dropdown to "SUBSCRIBE". Set the interval to how often you want updates.

4. Connect the Inject output to the OpcUa-Item input. Connect the OpcUa-Item output to the OpcUa-Client input. Add a Debug node and connect the OpcUa-Client output to the Debug input.

5. Deploy your flow and click the Inject button. 

{% renderFlow 300 %}
[{"id":"c62e8dab346d62bb","type":"inject","z":"7008401a.b94db","name":"","props":[{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":490,"y":740,"wires":[["cce9159a656858b9"]]},{"id":"cce9159a656858b9","type":"OpcUa-Item","z":"7008401a.b94db","item":"ns=3;i=1003","datatype":"Int32","value":"","name":"","x":700,"y":740,"wires":[["042a5d016ce879c6"]]},{"id":"1c1d56834b8d3373","type":"debug","z":"7008401a.b94db","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":720,"wires":[]},{"id":"bccca1356626f117","type":"debug","z":"7008401a.b94db","name":"Errors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":760,"wires":[]},{"id":"042a5d016ce879c6","type":"OpcUa-Client","z":"7008401a.b94db","endpoint":"","action":"subscribe","deadbandtype":"a","deadbandvalue":1,"time":"2","timeUnit":"s","certificate":"n","localfile":"","localkeyfile":"","securitymode":"None","securitypolicy":"None","useTransport":false,"maxChunkCount":1,"maxMessageSize":8192,"receiveBufferSize":8192,"sendBufferSize":8192,"setstatusandtime":false,"keepsessionalive":false,"name":"","x":940,"y":740,"wires":[["1c1d56834b8d3373"],["bccca1356626f117"],[]]}]
{% endrenderFlow %}


When clicked, the OpcUa-Item node sends the tag to the OpcUa-Client and creates the subscription. The node’s status will update to “subscribed” once the subscription is active. When values change, they appear in the debug panel. If no value changes occur within the interval time, the status will show “keep alive” to confirm that the connection is still active.


### Subscribing to Multiple Tags

To monitor multiple tags, simply create multiple OpcUa-Item nodes and connect them all to the OpcUa-Client node. Each item node should have its own NodeId configured. When you trigger the flow, all tags start updating simultaneously.

For many tags, you can also use a Function node to subscribe to multiple tags at once. Connect the Function node directly to the OpcUa-Client node (no OpcUa-Item node needed). Use the "multiple" topic with the following code:

```javascript
msg.topic = "multiple";
msg.payload = [
    { nodeId: "ns=3;i=1007" },
    { nodeId: "ns=3;i=1002" },
    { nodeId: "ns=3;i=1001" }
];
return msg;
```

Below is the complete flow monitoring multiple tags:

{% renderFlow 300 %}
[{"id":"93d8a766.c57aa8","type":"function","z":"58b3ba58c45b22dd","name":"NodeId Array","func":"msg.payload = [];\nmsg.payload.push({ nodeId: \"ns=3;i=1001\"});\nmsg.payload.push({ nodeId: \"ns=3;i=1002\"});\nmsg.payload.push({ nodeId: \"ns=3;i=1003\"});\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":430,"y":400,"wires":[["ba45b808.7ff578"]]},{"id":"2d805dd3.473632","type":"inject","z":"58b3ba58c45b22dd","name":"Subscribe multiple","props":[{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"multiple","x":230,"y":400,"wires":[["93d8a766.c57aa8"]]},{"id":"ba45b808.7ff578","type":"OpcUa-Client","z":"58b3ba58c45b22dd","endpoint":"","action":"subscribe","deadbandtype":"a","deadbandvalue":1,"time":"2","timeUnit":"s","certificate":"n","localfile":"","localkeyfile":"","securitymode":"None","securitypolicy":"None","useTransport":false,"maxChunkCount":"","maxMessageSize":"","receiveBufferSize":"","sendBufferSize":"","setstatusandtime":false,"keepsessionalive":false,"name":"","x":620,"y":400,"wires":[["8d7ef05fbd80d2f9"],["591cb7f46dd507af"],[]]},{"id":"8d7ef05fbd80d2f9","type":"debug","z":"58b3ba58c45b22dd","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":790,"y":380,"wires":[]},{"id":"591cb7f46dd507af","type":"debug","z":"58b3ba58c45b22dd","name":"Errors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":790,"y":420,"wires":[]}]
{% endrenderFlow %}

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

To use either action, change the OpcUa-Client node's Action dropdown to "unsubscribe" or "deletesubscription".

## Events and Alarms

OPC UA events and alarms go beyond simple value monitoring. While subscriptions tell you "the temperature is 95°C", events tell you "high temperature alarm triggered at 14:32:15 on Tank 3". 

Events capture the full context of what happened, when it happened, and what needs attention. Alarms are a special type of event that requires acknowledgment - perfect for critical situations that need human intervention.

### Setting Up Event Monitoring

1. Add an Inject node to trigger the event subscription.

2. Add an OpcUa-Event node and configure the Source node to the event source. For server-wide events, use `ns=0;i=2253` (the Server object).

3. Add an OpcUa-Client node with Action set to "EVENTS".

4. Connect the Inject output to the OpcUa-Item node input. Connect the OpcUa-Item output to the OpcUa-Client input. Add a Debug node and connect the OpcUa-Client output to the Debug input.

Deploy and trigger the flow. The debug panel will show events as they occur on your server.

{% renderFlow 300 %}
[{"id":"d72f52a6.35fa3","type":"OpcUa-Event","z":"5d665294.f65f14","root":"ns=0;i=2253","activatecustomevent":false,"eventtype":"i=2041","customeventtype":"","name":"All events","x":400,"y":120,"wires":[["ae628046.ca67c"]]},{"id":"96c3ea4c.7897e8","type":"inject","z":"5d665294.f65f14","name":"Subscribe events","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":"","topic":"","payload":"","payloadType":"str","x":220,"y":120,"wires":[["d72f52a6.35fa3"]]},{"id":"ae628046.ca67c","type":"OpcUa-Client","z":"5d665294.f65f14","endpoint":"","action":"events","deadbandvalue":"","time":"2","timeUnit":"s","localfile":"","localkeyfile":"","securitymode":"None","securitypolicy":"None","useTransport":false,"maxChunkCount":"","maxMessageSize":"","receiveBufferSize":"","sendBufferSize":"","setstatusandtime":false,"keepsessionalive":false,"name":"Prosys events","x":580,"y":120,"wires":[["67203130.a7a05"],["1a7bf6600cc8bec0"],[]]},{"id":"67203130.a7a05","type":"debug","z":"5d665294.f65f14","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":750,"y":100,"wires":[]},{"id":"1a7bf6600cc8bec0","type":"debug","z":"5d665294.f65f14","name":"Errrors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":750,"y":140,"wires":[]}]
{% endrenderFlow %}

### Acknowledging Events

When alarms trigger, operators often need to acknowledge them to indicate they've seen the issue. Here's how to send acknowledgments back to the OPC UA server:

1. Add an Inject node to manually trigger the acknowledgment.

2. Add a Function node to prepare the acknowledgment message.

3. In the Function node, add the following code. Comments within the code explain what needs to be replaced.

```javascript
msg.topic = "ns=6;s=MyLevel.Alarm";        // The alarm's NodeId
msg.conditionId = "ns=6;s=MyLevel.Alarm/0:EventId";  // NodeId + "/0:EventId"
msg.comment = "Acknowledged via Node-RED";  // Your acknowledgment message
return msg;
```

4. Add an OpcUa-Client node and configure it with your OPC UA server endpoint. Open the node’s configuration and set the Action dropdown to "ACKNOWLEDGE".

5. Connect the Inject output to the Function input. Connect the Function output to the OpcUa-Client input.

{% renderFlow 300 %}
[{"id":"99a5c133.d9bdb","type":"inject","z":"58b3ba58c45b22dd","name":"Acknowledge event","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":"","topic":"","payload":"","payloadType":"str","x":210,"y":300,"wires":[["cf182b3.04017d8"]]},{"id":"cf182b3.04017d8","type":"function","z":"58b3ba58c45b22dd","name":"AlarmID and EventID","func":"msg.topic = \"ns=6;s=MyLevel.Alarm\";\nmsg.conditionId = \"ns=6;s=MyLevel.Alarm/0:EventId\";\nmsg.comment = \"Node-RED OPCUA Ack\";\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":430,"y":300,"wires":[["af39662a.1fd078"]]},{"id":"39a1c77b1fb33695","type":"debug","z":"58b3ba58c45b22dd","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":810,"y":280,"wires":[]},{"id":"e50779c74918b1b9","type":"debug","z":"58b3ba58c45b22dd","name":"Errrors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":810,"y":320,"wires":[]},{"id":"af39662a.1fd078","type":"OpcUa-Client","z":"58b3ba58c45b22dd","endpoint":"","action":"acknowledge","deadbandtype":"a","deadbandvalue":"5","time":"1","timeUnit":"s","localfile":"","localkeyfile":"","securitymode":"None","securitypolicy":"None","useTransport":false,"maxChunkCount":"","maxMessageSize":"","receiveBufferSize":"","sendBufferSize":"","setstatusandtime":false,"keepsessionalive":false,"name":"OPC UA Client","x":640,"y":300,"wires":[["39a1c77b1fb33695"],["e50779c74918b1b9"],[]]}]
{% endrenderFlow %}

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

{% renderFlow 300 %}
[{"id":"9b199c7f.82f47","type":"OpcUa-Method","z":"4d24eae5.3b9b24","endpoint":"","objectId":"ns=6;s=MyDevice","methodId":"ns=6;s=MyMethod","name":"Prosys MyMethod(sin, 3.3)","inputArguments":[],"arg0name":"Operator","arg0type":"String","arg0typeid":"","arg0value":"sin","arg1name":"Value","arg1type":"Double","arg1typeid":"","arg1value":"3.3","arg2name":"","arg2type":"","arg2typeid":"","arg2value":"","out0name":"","out0type":"","out0typeid":"","out0value":"","x":760,"y":120,"wires":[["aad9fc2a.a94b4"]]},{"id":"aad9fc2a.a94b4","type":"debug","z":"4d24eae5.3b9b24","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","x":970,"y":120,"wires":[]},{"id":"6188d1de770fbb95","type":"inject","z":"4d24eae5.3b9b24","name":"Call Method","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":530,"y":120,"wires":[["9b199c7f.82f47"]]}]
{% endrenderFlow %}

Deploy and click the Inject button. The method executes on the server and the node status changes to "Method Executed". The result appears in the debug panel.

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

{% renderFlow 300 %}
[{"id":"0c43bd35230132af","type":"OpcUa-Client","z":"58b3ba58c45b22dd","endpoint":"","action":"history","deadbandtype":"a","deadbandvalue":1,"time":10,"timeUnit":"s","certificate":"n","localfile":"","localkeyfile":"","securitymode":"None","securitypolicy":"None","useTransport":false,"maxChunkCount":"","maxMessageSize":"","receiveBufferSize":"","sendBufferSize":"","setstatusandtime":false,"keepsessionalive":false,"name":"","x":620,"y":140,"wires":[["532ae640b386e34e"],["24678e079b08c81d"],[]]},{"id":"5d8f9b5854a12919","type":"inject","z":"58b3ba58c45b22dd","name":"Get Historical Data","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":140,"wires":[["9c071e5a8e543eba"]]},{"id":"9c071e5a8e543eba","type":"function","z":"58b3ba58c45b22dd","name":"","func":"msg.topic = \"ns=3;i=1001\";\nmsg.aggregate = \"ave\";  // Try: \"min\", \"max\", \"ave\", \"interpolative\"\nmsg.start = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago\nmsg.end = new Date(); // Now\nmsg.interval = 300000;  // Required for aggregates: 5-minute intervals\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":440,"y":140,"wires":[["0c43bd35230132af"]]},{"id":"532ae640b386e34e","type":"debug","z":"58b3ba58c45b22dd","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":790,"y":120,"wires":[]},{"id":"24678e079b08c81d","type":"debug","z":"58b3ba58c45b22dd","name":"Errrors","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":790,"y":160,"wires":[]}]
{% endrenderFlow %}

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

You've now mastered the advanced features that make OPC UA essential for industrial systems. With subscriptions, you're monitoring values in real-time without wasting bandwidth. With events and alarms, you're capturing critical alerts the moment they happen. With method calls, you're executing complex operations with a single command. And with historical access, you have the data trail needed for analysis and compliance.


## Scale Your OPC UA Implementation

Managing OPC UA flows across multiple sites? FlowFuse helps teams deploy Node-RED to hundreds of edge devices with one click, monitor everything from a central dashboard, and roll back instantly if something goes wrong. Built-in team collaboration, audit logs, and enterprise security keep your industrial data safe.

Following our managed MQTT broker, we've now added database services built right into the platform, plus new AI features that make building flows faster than ever.

[Get started free]({% include "sign-up-url.njk" %}) and scale and manage your Node-RED deployments today.
