---
title: "Historical Data Logging with OPC UA and InfluxDB"
subtitle: "Turn live equipment readings into a durable history you can query, chart, and analyze"
description: "Learn how to connect OPC UA and InfluxDB in FlowFuse to log industrial equipment data as timestamped history, so you can spot trends, prove compliance, and catch failures before they happen."
date: 2026-06-24
authors: ["sumit-shinde"]
image: /blog/2026/06/images/opcua-to-influxdb.png
keywords: opc ua influxdb, opc ua historical data, influxdb node-red, flowfuse opc ua, industrial data logging, opc ua time series, node-red influxdb, log opc ua data, equipment data history, iiot data logging
tags:
  - post
  - flowfuse
  - opcua
cta:
  type: contact
  title: "Build on a foundation you can trust"
  description: "FlowFuse Edge Certified Nodes are vetted, maintained, and tested by the FlowFuse team, so your OPC UA connections stay reliable in production. Contact sales to enable them for your team."
meta:
  howto:
    name: "How to Log OPC UA Data to InfluxDB with FlowFuse"
    description: "Turn live OPC UA equipment readings into durable, queryable history in InfluxDB: install the InfluxDB and FlowFuse Edge Certified OPC UA nodes, connect to your OPC UA server, read tags on a schedule, shape each reading into fields and tags, write it to InfluxDB against the server's sample time, then verify the history is landing."
    totalTime: "PT30M"
    tool:
      - "FlowFuse remote instance on an edge device"
      - "OPC UA server (PLC, gateway, or simulator)"
      - "InfluxDB instance (1.x or 2.0)"
      - "node-red-contrib-influxdb"
      - "@flowfuse-certified-nodes/opcua"
    steps:
      - name: "Install the InfluxDB and OPC UA nodes"
        text: "From Manage palette, install node-red-contrib-influxdb from the community catalog, then switch the catalog to FlowFuse Edge Certified Nodes and install @flowfuse-certified-nodes/opcua. Restart any existing instance so it picks up the updated catalogue."
        url: "installing-the-nodes"
      - name: "Connect to your OPC UA server"
        text: "Drag a Read node onto the canvas, add an endpoint configuration with your server URL, and set the Security Policy and Security Mode to match your server. On production equipment use a certificate-based policy and mode rather than None, and enter credentials if the server requires them."
        url: "connecting-to-your-opc-ua-server"
      - name: "Read the tag values on a schedule"
        text: "Find the tag's Node ID using the Read node's tree browser, then wire an inject node set to repeat at a fixed interval into the Read node so each pulse triggers a fresh read. The value lands in msg.payload, with msg.statusCode, msg.sourceTimestamp, and other metadata on separate properties."
        url: "read-the-values-on-a-schedule"
      - name: "Shape the reading and write it to InfluxDB"
        text: "Add a function node that builds the payload InfluxDB expects, an array of a fields object and a tags object, sets msg.measurement, and sets msg.timestamp from msg.sourceTimestamp so the point is stored against when the reading actually happened. Wire it into an influxdb out node configured with your InfluxDB URL, version, and credentials."
        url: "writing-data-to-influxdb"
      - name: "Verify the history is landing"
        text: "Open the InfluxDB Data Explorer, select your bucket, the equipment_readings measurement, and the temperature field, and run a query over the last few minutes. New rows arriving on each read interval confirm the pipeline works end to end."
        url: "verifying-your-data"
  faq:
    - question: "Why log OPC UA data to a time-series database instead of just reading it live?"
      answer: "Real-time values only tell you what is happening right now. Storing readings as timestamped history lets you spot trends, prove a batch stayed within spec, and trace the conditions behind a fault. InfluxDB is built to store and query that history at scale, so a degrading pump or a slowly drifting temperature becomes visible instead of vanishing the moment it happens."
    - question: "Which InfluxDB nodes do I need in FlowFuse, and are they certified?"
      answer: "You need node-red-contrib-influxdb to write to and query InfluxDB, and the FlowFuse Edge Certified OPC UA package (@flowfuse-certified-nodes/opcua) to read from your equipment. The InfluxDB nodes are currently a community package with a FlowFuse Edge Certified version on the way; the OPC UA package is already Certified, vetted, maintained, and tested by the FlowFuse team. Community nodes work too, but they do not get the same vetting, so reliability varies."
    - question: "How do I store readings against when they were measured rather than when they were written?"
      answer: "In the function node before the influxdb out node, set msg.timestamp from msg.sourceTimestamp, the time the OPC UA server sampled the value. InfluxDB then stores each point against the measurement time rather than the write time. If you omit that line, InfluxDB falls back to stamping each point with the time it reached the database, which skews any later time-based analysis."
    - question: "What is the difference between fields and tags when writing to InfluxDB?"
      answer: "The influxdb out node expects an array of two objects: fields first, then tags. Fields hold the actual measured values, such as the temperature reading. Tags hold metadata you filter and group by later, such as the sensor name or location. Tags are the difference between querying every temperature and querying one tank's temperature over a specific window."
    - question: "How can I tell a real zero reading from a tag that failed to read?"
      answer: "Watch msg.statusCode on the Read node's output. It returns Good on a successful read, or an error such as BadUnknownNode when the read fails. Because a failed read and a genuine 0 both leave a number in msg.payload, the status code is how you distinguish a true zero value from a tag that did not read at all."
    - question: "Can I read the logged data back into FlowFuse instead of only viewing it in InfluxDB?"
      answer: "Yes. The influxdb in node runs a query against your bucket and returns the results to your flow, so you can pull back any slice of history, the last hour of a tag, a daily average, and feed it straight into a FlowFuse Dashboard chart for a live trend view without leaving FlowFuse."
tldr: "Real-time OPC UA values tell you what's happening now; the history is where the value lives. This guide connects OPC UA to InfluxDB in FlowFuse to turn live equipment readings into durable, timestamped history. Install the InfluxDB and FlowFuse Edge Certified OPC UA nodes, configure an OPC UA endpoint and read tags on a schedule, shape each reading into fields and tags with a function node, set the point's timestamp from the server's sample time, and write to InfluxDB with the influxdb out node. Verify the data lands in the Data Explorer, then query it back into FlowFuse Dashboard to chart trends and catch slow drift before it becomes a fault."
---

Industrial equipment produces data constantly: temperatures, pressures, motor speeds, tank levels, all changing by the second. Real-time values tell you what's happening now, but the history is where the value lives, spotting a degrading pump, proving a batch stayed within spec, tracing the conditions behind a fault. OPC UA gets that data out of your equipment in a vendor-neutral way, and InfluxDB stores it as timestamped history built to query at scale. In this article, you'll connect the two in FlowFuse to turn live readings into a durable record you can query, chart, and analyze.

> **ℹ Note:** If you'd rather not leave FlowFuse and want a good time-series database built in, [FlowFuse Tables](https://flowfuse.com/docs/user/ff-tables/) is the answer.

<!--more-->

![The finished flow on the FlowFuse canvas: inject → Read (OPC UA) → function → influxdb out](./images/opcua-to-influxdb-flow.png)
_The complete pipeline: an inject node triggers a read, a function node shapes the reading, and the influxdb out node stores it._

## What you'll need

Before building the flow, make sure you have:

- **A FlowFuse remote instance on an edge device.** OPC UA servers and PLCs sit on the local network, so run this flow on an edge device close to the equipment. Install the [Device Agent](/docs/device-agent/install/overview/) and register it as a remote instance.
- **An OPC UA server to read from.** Your data source: a PLC, gateway, or device exposing tags over OPC UA. No hardware? The free Prosys OPC UA Simulation Server works for testing.
- **A running InfluxDB instance.** Cloud or self-hosted. Create an organization, a bucket, and an API token with write access.
- **Endpoint details for both.** The OPC UA endpoint URL (like `opc.tcp://192.168.1.10:4840`) plus any credentials, and your InfluxDB URL, org, bucket, and token.

For the OPC UA connection, this guide uses the **FlowFuse Edge Certified Nodes package**, vetted, maintained, and tested by the FlowFuse team. [Contact sales](/contact-us/) to enable it for your team. Community nodes work too, but they don't get the same vetting, maintenance, or testing, so reliability varies.

With those ready, the next step is installing the nodes that connect FlowFuse to OPC UA and InfluxDB.

## Installing the nodes

You'll install two packages: the InfluxDB nodes and the FlowFuse Edge Certified OPC UA nodes.

1. Open the editor on your remote instance.
2. From the menu (top right), select **Manage palette**, then switch to the **Install** tab.
3. Search for **`node-red-contrib-influxdb`** and click **Install**. These nodes write to and query InfluxDB.
4. Switch the catalog using the top dropdown to **FlowFuse Edge Certified Nodes**. Once sales enables FlowFuse Edge Certified Nodes for your team, this catalog shows up here; restart any existing instance so it picks up the updated catalogue.
5. Search for **`@flowfuse-certified-nodes/opcua`** and click **Install**.

![Manage palette Install tab showing the OPC UA certified package in search results](./images/opcua-manage-pallete.png)
_Install the OPC UA certified package from the FlowFuse Edge Certified Nodes catalog._

Both packages now appear in the palette on the left: an OPC UA group for reading your equipment, and an InfluxDB group for storing the data. Now you're ready to connect to your server and pull live values.

## Connecting to your OPC UA server

With the nodes installed, you'll build the read side of the flow: define the connection, then read your tag values on a schedule.

### Define the connection

1. Drag a **Read** node onto the canvas.
2. Double-click it to open its settings, then click the "+" next to the **Endpoint** field to add a new endpoint configuration.
3. Enter your endpoint URL, for example `opc.tcp://192.168.1.10:4840`.
4. Set the **Security Policy** and **Security Mode** to match your server. For a local test server such as the Prosys simulator with security disabled, set both to `None`. On production equipment, choose the certificate-based policy and mode your server requires, and point the node at your certificate and private-key files.
5. If your server needs credentials, enable the login option on the endpoint and enter the username and password. Otherwise leave it anonymous.
6. Click **Add**, then **Done**.

![The OPC UA endpoint configuration dialog with URL, Security Policy, and Security Mode fields](./images/opcua-config.png)
_Point the endpoint at your server's URL and match its Security Policy and Mode._

> **ℹ Note:** This guide uses a simulator server for convenience. On production equipment, always enable a certificate-based Security Policy and Mode rather than `None`, so the connection between FlowFuse and your OPC UA server stays encrypted and authenticated.

> **ℹ Note:** Store connection details, endpoint URLs, credentials, InfluxDB tokens, org and bucket names in environment variables rather than hardcoding them in your nodes. This keeps secrets out of your flows and lets you move the same flow between instances without editing each node. See [Using Environment Variables](/docs/user/envvar/) for how to set them.

### Read the values on a schedule

The Read node takes the Node ID of the tag from the incoming message, so feed it a message carrying the tag you want and it returns the value. First you need that Node ID, something like `ns=3;s=Temperature`.

1. In the **Read** node, click the tree button next to the **NodeId** field. Enter the Node ID you want to drill into (a root node such as the Objects folder is the usual starting point), and the node renders your server's address space as an expandable tree. Drill down, click the tag you want, and its Node ID fills in automatically.
2. Add an **inject** node and set it to repeat at a fixed interval, say every 5 seconds, so each pulse triggers a fresh read. Wire it into the Read node.
3. Connect a **debug** node to the Read node's output, then deploy.

![Opcua read node config](./images/opcua-read-node.png)
_Opcua read node config_

Each time a message arrives, the Read node returns more than just the number. The value lands in `msg.payload`, and the message also carries `msg.dataType` (such as `Double` or `Boolean`), `msg.statusCode` (`Good` on success, or an error like `BadUnknownNode`), `msg.sourceTimestamp` and `msg.serverTimestamp` as ISO strings, and `msg.nodeId` echoing back what was read. Watch that `statusCode`, it's how you tell a real `0` reading from a tag that failed to read at all.

To read several tags at once, pass an array of Node IDs in `msg.topic` or `msg.nodeId` and the node returns an array of values in `msg.payload`, more efficient than running a separate read per tag.

> **ℹ Tip:** If you ever need the *flow itself* to discover Node IDs while it's running, say, to enumerate tags on a server whose address space changes, there's a dedicated **Browse** node for that. It's overkill for a fixed set of tags like this one, so we'll skip it here.

Deploy and watch the debug output. You should see a value arriving on each interval. The value itself is in `msg.payload`, while the timestamp and quality ride along on separate properties (`msg.sourceTimestamp`, `msg.statusCode`, and so on), so `msg.payload` is just the bare reading, like `42.5`. That's the shape the next step builds on.

![The debug sidebar showing a reading with msg.payload, msg.statusCode, and msg.sourceTimestamp expanded](./images/read-output.png)
_Each read returns the value in msg.payload, with timestamp and quality on separate properties._

## Writing Data to InfluxDB

The OPC UA Read node and InfluxDB Out node use different message formats, so add a **Function** node between them to format the data before writing it to InfluxDB.

1. Drop a **Function** node after the Read node and open it.
2. Configure it to build the payload InfluxDB expects. `msg.payload` contains the OPC UA value, and `msg.sourceTimestamp` contains the timestamp from the OPC UA server:

```javascript
const value = msg.payload;

msg.measurement = "equipment_readings";
msg.timestamp = msg.sourceTimestamp;

msg.payload = [
    {
        temperature: value
    },
    {
        sensor: "tank-1",
        location: "plant-floor"
    }
];

return msg;
```

The first object contains the field values, while the second contains tags used for filtering and grouping data during queries.

3. Wire the Function node to an **InfluxDB Out** node.
4. Open the InfluxDB Out node and click the "+" icon next to **Server** to configure the connection. Enter your InfluxDB URL and select the appropriate version (1.x or 2.0).
5. For InfluxDB 2.0, provide your **Token**, **Organization**, and **Bucket**. For InfluxDB 1.x, enter the database name and any required credentials.
6. If you did not set `msg.measurement` in the Function node, specify the measurement name (for example, `equipment_readings`) in the InfluxDB Out node configuration.
7. Deploy the flow.

![The influxdb node configuration with URL and version fields](./images/influxdb-config.png)
*Configure the server connection with your InfluxDB URL and version.*

![The influxdb out node configuration with token, org, and bucket fields](./images/influxdb-write-node-config.png)
*Set the token, organization, and bucket so readings are written to the correct destination.*

Your readings are now flowing into InfluxDB. On each interval, the Read node retrieves the OPC UA value, the Function node formats it, and the InfluxDB Out node writes the timestamped data point to your bucket.

## Verifying your data

Confirm the history is actually landing before you rely on it.

1. Open the InfluxDB UI and go to the **Data Explorer**.
2. Select your bucket, your `equipment_readings` measurement, and the `temperature` field.
3. Set the time range to the last few minutes and run the query.

![InfluxDB Data Explorer showing the temperature filling in](./images/influxdb-explorer.png)
_InfluxDB Data Explorer showing the temperature filling in_

You'll see your readings listed in a table, one row per read interval. If new rows keep appearing as time passes, your pipeline is working end to end: equipment to OPC UA to FlowFuse to InfluxDB.

Storing data is only half the story. The InfluxDB In node lets you query readings back from InfluxDB, whether you need the latest values, historical trends, or aggregated metrics. You can then feed the results directly into a [FlowFuse Dashboard](https://dashboard.flowfuse.com) to build charts, tables, and real-time monitoring views of your OPC UA data.

## Where to go from here

You now have a durable, queryable record of your equipment's behavior. From here you can read more tags, tag each reading with its machine or line so you can slice the data later, and build dashboards on top of InfluxDB to chart trends and spot the slow drift that real-time values hide.

The real payoff comes when you stop reacting to problems and start seeing them coming. A pump that's drawing a little more current each week, a tank that's taking longer to fill, a temperature that's creeping past its usual range, all of it now sits in a history you can query, instead of vanishing the moment it happens.
