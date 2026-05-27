---
title: >-
  OPC UA Tutorial: Advanced Monitoring with Subscriptions, Alarms, and
  Historical Data
navTitle: >-
  OPC UA Tutorial: Advanced Monitoring with Subscriptions, Alarms, and
  Historical Data
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


> Managing and scaling Node-RED instances is easy with FlowFuse, offering DevOps pipelines, audit logs, snapshots, high availability, and much more. [Start your free trial today!](https://app.flowfuse.com/account/create)

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



::render-flow
---
height: 300
flow: "W3siaWQiOiJjNjJlOGRhYjM0NmQ2MmJiIiwidHlwZSI6ImluamVjdCIsInoiOiI3MDA4NDAxYS5iOTRkYiIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6NDkwLCJ5Ijo3NDAsIndpcmVzIjpbWyJjY2U5MTU5YTY1Njg1OGI5Il1dfSx7ImlkIjoiY2NlOTE1OWE2NTY4NThiOSIsInR5cGUiOiJPcGNVYS1JdGVtIiwieiI6IjcwMDg0MDFhLmI5NGRiIiwiaXRlbSI6Im5zPTM7aT0xMDAzIiwiZGF0YXR5cGUiOiJJbnQzMiIsInZhbHVlIjoiIiwibmFtZSI6IiIsIngiOjcwMCwieSI6NzQwLCJ3aXJlcyI6W1siMDQyYTVkMDE2Y2U4NzljNiJdXX0seyJpZCI6IjFjMWQ1NjgzNGI4ZDMzNzMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNzAwODQwMWEuYjk0ZGIiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjExMzAsInkiOjcyMCwid2lyZXMiOltdfSx7ImlkIjoiYmNjY2ExMzU2NjI2ZjExNyIsInR5cGUiOiJkZWJ1ZyIsInoiOiI3MDA4NDAxYS5iOTRkYiIsIm5hbWUiOiJFcnJvcnMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTEzMCwieSI6NzYwLCJ3aXJlcyI6W119LHsiaWQiOiIwNDJhNWQwMTZjZTg3OWM2IiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiI3MDA4NDAxYS5iOTRkYiIsImVuZHBvaW50IjoiIiwiYWN0aW9uIjoic3Vic2NyaWJlIiwiZGVhZGJhbmR0eXBlIjoiYSIsImRlYWRiYW5kdmFsdWUiOjEsInRpbWUiOiIyIiwidGltZVVuaXQiOiJzIiwiY2VydGlmaWNhdGUiOiJuIiwibG9jYWxmaWxlIjoiIiwibG9jYWxrZXlmaWxlIjoiIiwic2VjdXJpdHltb2RlIjoiTm9uZSIsInNlY3VyaXR5cG9saWN5IjoiTm9uZSIsInVzZVRyYW5zcG9ydCI6ZmFsc2UsIm1heENodW5rQ291bnQiOjEsIm1heE1lc3NhZ2VTaXplIjo4MTkyLCJyZWNlaXZlQnVmZmVyU2l6ZSI6ODE5Miwic2VuZEJ1ZmZlclNpemUiOjgxOTIsInNldHN0YXR1c2FuZHRpbWUiOmZhbHNlLCJrZWVwc2Vzc2lvbmFsaXZlIjpmYWxzZSwibmFtZSI6IiIsIngiOjk0MCwieSI6NzQwLCJ3aXJlcyI6W1siMWMxZDU2ODM0YjhkMzM3MyJdLFsiYmNjY2ExMzU2NjI2ZjExNyJdLFtdXX1d"
---
::




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



::render-flow
---
height: 300
flow: "W3siaWQiOiI5M2Q4YTc2Ni5jNTdhYTgiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiNThiM2JhNThjNDViMjJkZCIsIm5hbWUiOiJOb2RlSWQgQXJyYXkiLCJmdW5jIjoibXNnLnBheWxvYWQgPSBbXTtcbm1zZy5wYXlsb2FkLnB1c2goeyBub2RlSWQ6IFwibnM9MztpPTEwMDFcIn0pO1xubXNnLnBheWxvYWQucHVzaCh7IG5vZGVJZDogXCJucz0zO2k9MTAwMlwifSk7XG5tc2cucGF5bG9hZC5wdXNoKHsgbm9kZUlkOiBcIm5zPTM7aT0xMDAzXCJ9KTtcbnJldHVybiBtc2c7Iiwib3V0cHV0cyI6MSwidGltZW91dCI6IiIsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6NDMwLCJ5Ijo0MDAsIndpcmVzIjpbWyJiYTQ1YjgwOC43ZmY1NzgiXV19LHsiaWQiOiIyZDgwNWRkMy40NzM2MzIiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjU4YjNiYTU4YzQ1YjIyZGQiLCJuYW1lIjoiU3Vic2NyaWJlIG11bHRpcGxlIiwicHJvcHMiOlt7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6Im11bHRpcGxlIiwieCI6MjMwLCJ5Ijo0MDAsIndpcmVzIjpbWyI5M2Q4YTc2Ni5jNTdhYTgiXV19LHsiaWQiOiJiYTQ1YjgwOC43ZmY1NzgiLCJ0eXBlIjoiT3BjVWEtQ2xpZW50IiwieiI6IjU4YjNiYTU4YzQ1YjIyZGQiLCJlbmRwb2ludCI6IiIsImFjdGlvbiI6InN1YnNjcmliZSIsImRlYWRiYW5kdHlwZSI6ImEiLCJkZWFkYmFuZHZhbHVlIjoxLCJ0aW1lIjoiMiIsInRpbWVVbml0IjoicyIsImNlcnRpZmljYXRlIjoibiIsImxvY2FsZmlsZSI6IiIsImxvY2Fsa2V5ZmlsZSI6IiIsInNlY3VyaXR5bW9kZSI6Ik5vbmUiLCJzZWN1cml0eXBvbGljeSI6Ik5vbmUiLCJ1c2VUcmFuc3BvcnQiOmZhbHNlLCJtYXhDaHVua0NvdW50IjoiIiwibWF4TWVzc2FnZVNpemUiOiIiLCJyZWNlaXZlQnVmZmVyU2l6ZSI6IiIsInNlbmRCdWZmZXJTaXplIjoiIiwic2V0c3RhdHVzYW5kdGltZSI6ZmFsc2UsImtlZXBzZXNzaW9uYWxpdmUiOmZhbHNlLCJuYW1lIjoiIiwieCI6NjIwLCJ5Ijo0MDAsIndpcmVzIjpbWyI4ZDdlZjA1ZmJkODBkMmY5Il0sWyI1OTFjYjdmNDZkZDUwN2FmIl0sW11dfSx7ImlkIjoiOGQ3ZWYwNWZiZDgwZDJmOSIsInR5cGUiOiJkZWJ1ZyIsInoiOiI1OGIzYmE1OGM0NWIyMmRkIiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3OTAsInkiOjM4MCwid2lyZXMiOltdfSx7ImlkIjoiNTkxY2I3ZjQ2ZGQ1MDdhZiIsInR5cGUiOiJkZWJ1ZyIsInoiOiI1OGIzYmE1OGM0NWIyMmRkIiwibmFtZSI6IkVycm9ycyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3OTAsInkiOjQyMCwid2lyZXMiOltdfV0="
---
::



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



::render-flow
---
height: 300
flow: "W3siaWQiOiJkNzJmNTJhNi4zNWZhMyIsInR5cGUiOiJPcGNVYS1FdmVudCIsInoiOiI1ZDY2NTI5NC5mNjVmMTQiLCJyb290IjoibnM9MDtpPTIyNTMiLCJhY3RpdmF0ZWN1c3RvbWV2ZW50IjpmYWxzZSwiZXZlbnR0eXBlIjoiaT0yMDQxIiwiY3VzdG9tZXZlbnR0eXBlIjoiIiwibmFtZSI6IkFsbCBldmVudHMiLCJ4Ijo0MDAsInkiOjEyMCwid2lyZXMiOltbImFlNjI4MDQ2LmNhNjdjIl1dfSx7ImlkIjoiOTZjM2VhNGMuNzg5N2U4IiwidHlwZSI6ImluamVjdCIsInoiOiI1ZDY2NTI5NC5mNjVmMTQiLCJuYW1lIjoiU3Vic2NyaWJlIGV2ZW50cyIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjoiIiwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjoyMjAsInkiOjEyMCwid2lyZXMiOltbImQ3MmY1MmE2LjM1ZmEzIl1dfSx7ImlkIjoiYWU2MjgwNDYuY2E2N2MiLCJ0eXBlIjoiT3BjVWEtQ2xpZW50IiwieiI6IjVkNjY1Mjk0LmY2NWYxNCIsImVuZHBvaW50IjoiIiwiYWN0aW9uIjoiZXZlbnRzIiwiZGVhZGJhbmR2YWx1ZSI6IiIsInRpbWUiOiIyIiwidGltZVVuaXQiOiJzIiwibG9jYWxmaWxlIjoiIiwibG9jYWxrZXlmaWxlIjoiIiwic2VjdXJpdHltb2RlIjoiTm9uZSIsInNlY3VyaXR5cG9saWN5IjoiTm9uZSIsInVzZVRyYW5zcG9ydCI6ZmFsc2UsIm1heENodW5rQ291bnQiOiIiLCJtYXhNZXNzYWdlU2l6ZSI6IiIsInJlY2VpdmVCdWZmZXJTaXplIjoiIiwic2VuZEJ1ZmZlclNpemUiOiIiLCJzZXRzdGF0dXNhbmR0aW1lIjpmYWxzZSwia2VlcHNlc3Npb25hbGl2ZSI6ZmFsc2UsIm5hbWUiOiJQcm9zeXMgZXZlbnRzIiwieCI6NTgwLCJ5IjoxMjAsIndpcmVzIjpbWyI2NzIwMzEzMC5hN2EwNSJdLFsiMWE3YmY2NjAwY2M4YmVjMCJdLFtdXX0seyJpZCI6IjY3MjAzMTMwLmE3YTA1IiwidHlwZSI6ImRlYnVnIiwieiI6IjVkNjY1Mjk0LmY2NWYxNCIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzUwLCJ5IjoxMDAsIndpcmVzIjpbXX0seyJpZCI6IjFhN2JmNjYwMGNjOGJlYzAiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNWQ2NjUyOTQuZjY1ZjE0IiwibmFtZSI6IkVycnJvcnMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzUwLCJ5IjoxNDAsIndpcmVzIjpbXX1d"
---
::



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



::render-flow
---
height: 300
flow: "W3siaWQiOiI5OWE1YzEzMy5kOWJkYiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiNThiM2JhNThjNDViMjJkZCIsIm5hbWUiOiJBY2tub3dsZWRnZSBldmVudCIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjoiIiwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjoyMTAsInkiOjMwMCwid2lyZXMiOltbImNmMTgyYjMuMDQwMTdkOCJdXX0seyJpZCI6ImNmMTgyYjMuMDQwMTdkOCIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiI1OGIzYmE1OGM0NWIyMmRkIiwibmFtZSI6IkFsYXJtSUQgYW5kIEV2ZW50SUQiLCJmdW5jIjoibXNnLnRvcGljID0gXCJucz02O3M9TXlMZXZlbC5BbGFybVwiO1xubXNnLmNvbmRpdGlvbklkID0gXCJucz02O3M9TXlMZXZlbC5BbGFybS8wOkV2ZW50SWRcIjtcbm1zZy5jb21tZW50ID0gXCJOb2RlLVJFRCBPUENVQSBBY2tcIjtcbnJldHVybiBtc2c7Iiwib3V0cHV0cyI6MSwidGltZW91dCI6IiIsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6NDMwLCJ5IjozMDAsIndpcmVzIjpbWyJhZjM5NjYyYS4xZmQwNzgiXV19LHsiaWQiOiIzOWExYzc3YjFmYjMzNjk1IiwidHlwZSI6ImRlYnVnIiwieiI6IjU4YjNiYTU4YzQ1YjIyZGQiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjgxMCwieSI6MjgwLCJ3aXJlcyI6W119LHsiaWQiOiJlNTA3NzljNzQ5MThiMWI5IiwidHlwZSI6ImRlYnVnIiwieiI6IjU4YjNiYTU4YzQ1YjIyZGQiLCJuYW1lIjoiRXJycm9ycyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo4MTAsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiYWYzOTY2MmEuMWZkMDc4IiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiI1OGIzYmE1OGM0NWIyMmRkIiwiZW5kcG9pbnQiOiIiLCJhY3Rpb24iOiJhY2tub3dsZWRnZSIsImRlYWRiYW5kdHlwZSI6ImEiLCJkZWFkYmFuZHZhbHVlIjoiNSIsInRpbWUiOiIxIiwidGltZVVuaXQiOiJzIiwibG9jYWxmaWxlIjoiIiwibG9jYWxrZXlmaWxlIjoiIiwic2VjdXJpdHltb2RlIjoiTm9uZSIsInNlY3VyaXR5cG9saWN5IjoiTm9uZSIsInVzZVRyYW5zcG9ydCI6ZmFsc2UsIm1heENodW5rQ291bnQiOiIiLCJtYXhNZXNzYWdlU2l6ZSI6IiIsInJlY2VpdmVCdWZmZXJTaXplIjoiIiwic2VuZEJ1ZmZlclNpemUiOiIiLCJzZXRzdGF0dXNhbmR0aW1lIjpmYWxzZSwia2VlcHNlc3Npb25hbGl2ZSI6ZmFsc2UsIm5hbWUiOiJPUEMgVUEgQ2xpZW50IiwieCI6NjQwLCJ5IjozMDAsIndpcmVzIjpbWyIzOWExYzc3YjFmYjMzNjk1Il0sWyJlNTA3NzljNzQ5MThiMWI5Il0sW11dfV0="
---
::



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



::render-flow
---
height: 300
flow: "W3siaWQiOiI5YjE5OWM3Zi44MmY0NyIsInR5cGUiOiJPcGNVYS1NZXRob2QiLCJ6IjoiNGQyNGVhZTUuM2I5YjI0IiwiZW5kcG9pbnQiOiIiLCJvYmplY3RJZCI6Im5zPTY7cz1NeURldmljZSIsIm1ldGhvZElkIjoibnM9NjtzPU15TWV0aG9kIiwibmFtZSI6IlByb3N5cyBNeU1ldGhvZChzaW4sIDMuMykiLCJpbnB1dEFyZ3VtZW50cyI6W10sImFyZzBuYW1lIjoiT3BlcmF0b3IiLCJhcmcwdHlwZSI6IlN0cmluZyIsImFyZzB0eXBlaWQiOiIiLCJhcmcwdmFsdWUiOiJzaW4iLCJhcmcxbmFtZSI6IlZhbHVlIiwiYXJnMXR5cGUiOiJEb3VibGUiLCJhcmcxdHlwZWlkIjoiIiwiYXJnMXZhbHVlIjoiMy4zIiwiYXJnMm5hbWUiOiIiLCJhcmcydHlwZSI6IiIsImFyZzJ0eXBlaWQiOiIiLCJhcmcydmFsdWUiOiIiLCJvdXQwbmFtZSI6IiIsIm91dDB0eXBlIjoiIiwib3V0MHR5cGVpZCI6IiIsIm91dDB2YWx1ZSI6IiIsIngiOjc2MCwieSI6MTIwLCJ3aXJlcyI6W1siYWFkOWZjMmEuYTk0YjQiXV19LHsiaWQiOiJhYWQ5ZmMyYS5hOTRiNCIsInR5cGUiOiJkZWJ1ZyIsInoiOiI0ZDI0ZWFlNS4zYjliMjQiLCJuYW1lIjoiIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwieCI6OTcwLCJ5IjoxMjAsIndpcmVzIjpbXX0seyJpZCI6IjYxODhkMWRlNzcwZmJiOTUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjRkMjRlYWU1LjNiOWIyNCIsIm5hbWUiOiJDYWxsIE1ldGhvZCIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4Ijo1MzAsInkiOjEyMCwid2lyZXMiOltbIjliMTk5YzdmLjgyZjQ3Il1dfV0="
---
::



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



::render-flow
---
height: 300
flow: "W3siaWQiOiIwYzQzYmQzNTIzMDEzMmFmIiwidHlwZSI6Ik9wY1VhLUNsaWVudCIsInoiOiI1OGIzYmE1OGM0NWIyMmRkIiwiZW5kcG9pbnQiOiIiLCJhY3Rpb24iOiJoaXN0b3J5IiwiZGVhZGJhbmR0eXBlIjoiYSIsImRlYWRiYW5kdmFsdWUiOjEsInRpbWUiOjEwLCJ0aW1lVW5pdCI6InMiLCJjZXJ0aWZpY2F0ZSI6Im4iLCJsb2NhbGZpbGUiOiIiLCJsb2NhbGtleWZpbGUiOiIiLCJzZWN1cml0eW1vZGUiOiJOb25lIiwic2VjdXJpdHlwb2xpY3kiOiJOb25lIiwidXNlVHJhbnNwb3J0IjpmYWxzZSwibWF4Q2h1bmtDb3VudCI6IiIsIm1heE1lc3NhZ2VTaXplIjoiIiwicmVjZWl2ZUJ1ZmZlclNpemUiOiIiLCJzZW5kQnVmZmVyU2l6ZSI6IiIsInNldHN0YXR1c2FuZHRpbWUiOmZhbHNlLCJrZWVwc2Vzc2lvbmFsaXZlIjpmYWxzZSwibmFtZSI6IiIsIngiOjYyMCwieSI6MTQwLCJ3aXJlcyI6W1siNTMyYWU2NDBiMzg2ZTM0ZSJdLFsiMjQ2NzhlMDc5YjA4YzgxZCJdLFtdXX0seyJpZCI6IjVkOGY5YjU4NTRhMTI5MTkiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjU4YjNiYTU4YzQ1YjIyZGQiLCJuYW1lIjoiR2V0IEhpc3RvcmljYWwgRGF0YSIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyNzAsInkiOjE0MCwid2lyZXMiOltbIjljMDcxZTVhOGU1NDNlYmEiXV19LHsiaWQiOiI5YzA3MWU1YThlNTQzZWJhIiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6IjU4YjNiYTU4YzQ1YjIyZGQiLCJuYW1lIjoiIiwiZnVuYyI6Im1zZy50b3BpYyA9IFwibnM9MztpPTEwMDFcIjtcbm1zZy5hZ2dyZWdhdGUgPSBcImF2ZVwiOyAgLy8gVHJ5OiBcIm1pblwiLCBcIm1heFwiLCBcImF2ZVwiLCBcImludGVycG9sYXRpdmVcIlxubXNnLnN0YXJ0ID0gbmV3IERhdGUoRGF0ZS5ub3coKSAtIDYwICogNjAgKiAxMDAwKTsgLy8gMSBob3VyIGFnb1xubXNnLmVuZCA9IG5ldyBEYXRlKCk7IC8vIE5vd1xubXNnLmludGVydmFsID0gMzAwMDAwOyAgLy8gUmVxdWlyZWQgZm9yIGFnZ3JlZ2F0ZXM6IDUtbWludXRlIGludGVydmFsc1xucmV0dXJuIG1zZzsiLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjQ0MCwieSI6MTQwLCJ3aXJlcyI6W1siMGM0M2JkMzUyMzAxMzJhZiJdXX0seyJpZCI6IjUzMmFlNjQwYjM4NmUzNGUiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNThiM2JhNThjNDViMjJkZCIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzkwLCJ5IjoxMjAsIndpcmVzIjpbXX0seyJpZCI6IjI0Njc4ZTA3OWIwOGM4MWQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNThiM2JhNThjNDViMjJkZCIsIm5hbWUiOiJFcnJyb3JzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc5MCwieSI6MTYwLCJ3aXJlcyI6W119XQ=="
---
::



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

Connecting PLCs beyond OPC UA? FlowFuse also supports Siemens S7, EtherNet/IP, Modbus TCP/RTU, and MQTT — see the [FlowFuse PLC integration overview](/landing/plc/) for all supported protocols and use cases.

[Get started free](https://app.flowfuse.com/account/create) and scale and manage your Node-RED deployments today.
