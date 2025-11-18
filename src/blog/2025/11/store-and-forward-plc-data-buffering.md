---
title: "Store-and-Forward at the Edge: Buffering PLC Data During Network Outages"
subtitle: "Keep collecting data when your network goes down"
description: Learn how to implement store-and-forward buffering for PLC data collection. This guide shows you how to build an edge system with FlowFuse that maintains complete data continuity during network outages, preventing production data loss and compliance gaps.
date: 2025-11-18
authors: ["sumit-shinde"]
image: 
keywords: store-and-forward, edge computing, PLC data buffering, network resilience, industrial IoT, data continuity, FlowFuse, SQLite buffering, SCADA data collection, network outage recovery
tags:
    - flowfuse
---

Network outages happen. A fiber cut, a switch failure, or infrastructure maintenance can take your connectivity offline without warning. When it does, your PLCs continue operating normally—they don't wait for the network to recover.

<!--more-->

The problem is that all the data they generate during that outage has nowhere to go. Production metrics, quality measurements, and alarm events accumulate with no path to your historian or cloud platform. When connectivity returns, you're left with gaps in your operational records. Those gaps create real problems: incomplete batch records for quality audits, missing data for troubleshooting production issues, and compliance documentation that doesn't hold up under review.

Store-and-forward solves this. This guide walks through building a store-and-forward system with FlowFuse that maintains complete data continuity during network failures.

## What is Store-and-Forward?

Store-and-forward is a pattern where data is saved locally before transmission, then forwarded when network connectivity is available. Your edge device writes every PLC data point to local SQLite storage first. If the network is up, the data transmits to your destination—MQTT broker, historian, cloud platform, or database. If the network is down, the data stays in storage until connectivity returns.

The edge device operates in three states. During normal operation, data writes to the buffer and forwards successfully—the buffer stays near-empty. During a network outage, data continues writing to the buffer but cannot forward—the buffer grows. When connectivity returns, the device forwards the buffered backlog in chronological order while continuing to collect new data—the buffer drains back to empty.

This solves the core problem in industrial data collection: network failures creating gaps in your time-series data. A four-hour outage would normally mean four hours of missing production data, incomplete quality records, and compliance issues. With store-and-forward, that same outage causes zero data loss. Your destination system receives complete chronological data with only a delivery delay.

The implementation needs four components: persistent storage with transaction support, connectivity health checks, batch transmission with retry logic, and buffer management for storage limits. Build these correctly and network outages stop destroying data.

## Getting Started

Let's build a store-and-forward system that keeps your PLC data safe during network outages.

We'll build this in six steps: first, set up data collection from your PLC. Second, create local storage to buffer that data. Third, store incoming data in the buffer. Fourth, implement connectivity monitoring. Fifth, build forwarding logic that sends buffered data to your destination when the network is available. Sixth, handle errors, retry logic, and buffer cleanup to make the system production-ready.

### Prerequisites

You'll need the following before implementing store-and-forward:

- **FlowFuse Edge Device**: A running FlowFuse instance deployed on your edge hardware or gateway device.
- **node-red-contrib-sqlite**: SQLite node for local data storage.
- **node-red-contrib-ping**: Ping node for connectivity monitoring.

### Step 1: Set Up PLC Data Collection

Data collection is the foundation of store-and-forward. Your edge device needs reliable connectivity to your PLCs before you can buffer and forward their data.

FlowFuse handles this through Node-RED's 5,000+ community nodes, which support virtually every PLC protocol—Siemens, Allen-Bradley, Modbus, OPC UA, and more. You collect data from your PLCs, transform it into the format you need, and prepare it for buffering.

For this guide, we'll assume you already have PLC data flowing into Node-RED. The store-and-forward pattern works the same regardless of which PLCs you're connected to.

For more information on how FlowFuse can help you connect, collect, transform, and contextualize your data, and how it simplifies deployment, management, scaling, and security with enterprise features for production environments, [book a demo](/book-demo/).

### Step 2: Implement SQLite Buffering

SQLite provides the persistent storage layer for your store-and-forward buffer. It's lightweight, requires no separate database server, and handles the write volumes typical of industrial data collection without issue.

Follow these steps to set up your SQLite buffer:

1. Drag the `sqlite` node from the palette onto your workspace.

2. Double-click the node to open its configuration panel. Click the pencil icon next to the Database field to create a new database configuration. Give it a name like `sqlite`, select `Read-write-create` as the mode, and click **Add** to save the configuration.

3. Set the SQL Query mode to `Fixed Statement`. In the SQL Query field, enter:

```sql
CREATE TABLE IF NOT EXISTS data_buffer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp INTEGER NOT NULL,
    topic TEXT,
    sent INTEGER DEFAULT 0,
    payload TEXT,
    retry_count INTEGER DEFAULT 0,
    created_at INTEGER DEFAULT (strftime('%s','now') * 1000)
);
```

This table schema is designed to handle buffering for any destination system. The `topic` field stores your routing information—it could be an MQTT topic if you're publishing to a broker, an API endpoint URL if you're sending to HTTP services, a database table name if you're writing to a historian, or any identifier that tells the forwarding logic where this data needs to go. The `payload` field holds your serialized PLC data as JSON text, preserving the exact structure you need to send. The `sent` flag tracks transmission status: 0 means the data is waiting in the buffer, 1 means it's been successfully forwarded and can be cleaned up. The `retry_count` field increments with each failed transmission attempt, allowing you to implement backoff strategies or abandon records that consistently fail after a threshold number of retries.

4. Connect an `inject` node (configured to fire once at startup) to the sqlite node. Label the inject node "Create Table".

5. Deploy your flow and click the inject node button to create the table.

Your SQLite buffer is now ready to store PLC data during network outages. The next step implements the logic to write incoming data to this buffer.

### Step 3: Store Incoming Data in Buffer

With your SQLite buffer ready, implement the logic to write incoming PLC data to storage.

Follow these steps to set up data buffering:

1. Drag a `json` node onto the canvas and connect it to your PLC data input source.

2. Double-click the node to open its configuration. Set the Action to `Always convert to JSON String` and set the Property to `msg.payload`, then click **Done** to save.

3. Drag a `change` node onto the canvas and connect it to the json node.

4. Double-click the change node to configure it. Add the following rules:
   - **Rule 1**: Set `msg.params` to `{}` (JSONata expression)
   - **Rule 2**: Set `msg.params.$timestamp` to `msg.timestamp`
   - **Rule 3**: Set `msg.params.$payload` to `msg.payload`
   - **Rule 4**: Set `msg.params.$topic` to your topic string, for example: `acme_manufacturing/plant_01/floor_2/cell_a/machine_A12/measurements`

The topic field stores your routing information. It could be an MQTT topic for publishing to a broker, an API endpoint URL for HTTP services, a database table name for historians, or any identifier that tells the forwarding logic where this data needs to go.

5. Drag another `sqlite` node onto the canvas and connect it to the change node.

6. Double-click the node to configure it. Select your existing `sqlite` database, set the SQL Query mode to `Prepared Statement`, and in the SQL Query field, enter:

```sql
INSERT INTO data_buffer (timestamp, topic, payload, sent, retry_count)
VALUES ($timestamp, $topic, $payload, 0, 0);
```

7. Click **Done** to save the configuration and deploy your flow.

Your buffer now accumulates all incoming PLC data. Each data point is serialized to JSON, structured into parameters, and written to SQLite with `sent=0` (not yet forwarded) and `retry_count=0` (no transmission attempts). The prepared statement approach prevents SQL injection issues and handles special characters correctly.

The next step implements connectivity monitoring to determine when your system can forward buffered data.

### Step 4: Monitor Network Connectivity

Network connectivity monitoring determines when your system can forward buffered data. The ping node continuously checks connectivity to your destination system, and when the network is available, it triggers the forwarding process.

Follow these steps to implement connectivity monitoring:

1. Drag a `ping` node onto the canvas.

2. Double-click the node to configure it. Enter the IP address or hostname of your destination system in the Target field (e.g., `https://broker.flowfuse.cloud`), select mode to "Triggered", set "Ping every" to `30` seconds (adjust based on your requirements), name it "Network Health Check", and click **Done** to save.

3. Drag a `switch` node onto the canvas and connect it to the ping node.

4. Double-click the switch node to configure it. Set the Property to `msg.payload` (number), add Rule 1 as `false` (network is down), add Rule 2 as `otherwise` (network is reachable), and click **Done** to save.

The switch node routes messages based on ping results. When ping fails, `msg.payload` is `false`. Otherwise, the ping succeeded with a response time.

5. Drag two **change** nodes onto the canvas. Connect the first one to output 1 of the switch node (network down), and the second one to output 2 (network reachable).

6. Double-click the first change node to configure it:
   - **Rule 1**: Set `flow.networkOnline` to `false` (boolean)
   - Name it "Set Network Offline"
   - Click **Done** to save.

7. Double-click the second change node to configure it:
   - **Rule 1**: Set `flow.networkOnline` to `true` (boolean)
   - Name it "Set Network Online"
   - Click **Done** to save.

8. Drag a **Link Out** node onto the canvas and connect it to the "Set Network Online" node. Name it "Trigger Forward".

Your connectivity monitoring is now complete. When the network is available, the system will trigger the forwarding logic to send buffered data.

### Step 5: Build the Forwarding Logic

The forwarding logic retrieves unsent data from the buffer, prepares it for transmission, and sends it to the destination. This section shows how to build a forwarding system that processes buffered data in batches.

#### Retrieve and Prepare Unsent Records

1. Drag a **Link In** node onto the canvas.

2. Name it "Trigger Forward" and link this to the **Link Out** node from Step 4.

3. Drag an **SQLite** node onto the canvas and connect it to the Link In node.

4. Name it "Get Unsent Data" and configure it by selecting your database, setting "SQL Query" to **Fixed statement**, and entering the following SQL:

```sql
SELECT * FROM data_buffer 
WHERE sent = 0 
ORDER BY timestamp ASC 
LIMIT 50;
```

5. Click **Done** to save.

6. Drag a **Split** node onto the canvas and connect it to the SQLite node.

7. Configure it to split **msg.payload** and click **Done**.

8. Drag a **Change** node onto the canvas and connect it to the Split node.

9. Name it "Prepare Forward Message" and add the following rules:
   - **Rule 1**: Set **msg.topic** to **msg.payload.topic**
   - **Rule 2**: Set **msg.id** to **msg.payload.id**
   - **Rule 3**: Set **msg.payload** to **msg.payload.payload**

10. Click **Done** to save.

11. Drag a **JSON** node onto the canvas and connect it to the Change node.

12. Configure it by setting "Action" to **Always Convert to JSON Object** and setting "Property" to **msg.payload**, then click **Done**.

13. Drag a **Link Out** node onto the canvas and connect it to the JSON node. Name it "Send to Destination".

Your forwarding logic now retrieves unsent records, prepares them for transmission, and passes them to the next stage for sending.

### Step 6: Send Data and Handle Errors

The final step implements data transmission to your destination with comprehensive error handling and buffer management.

#### Send Data to Destination

1. Drag a **Link In** node onto the canvas and link it to the **Link Out** node from Step 5. Name it "Send to Destination".

2. Drag a **Switch** node onto the canvas and connect it to the Link In node. Name it "Check Network Online", set the Property to `flow.networkOnline`, add a condition `is true`, and click **Done** to save.

3. Drag another **Switch** node onto the canvas and connect it to the first switch node's output. Name it "Check Flow Error", set the Property to `flow.flowError`, add a condition `is false`, and click **Done** to save.

4. Drag an **MQTT Out** node onto the canvas and connect it to the second switch node's output. Configure your MQTT broker connection (the topic will be dynamically set from `msg.topic`), and click **Done** to save.

**Note:** This example uses MQTT Out, but you can use any destination node—HTTP Request for REST APIs, database nodes for historians, or other protocol-specific nodes. If your destination node provides output responses (like HTTP Request nodes that return status codes), you can use those responses to confirm successful transmission before marking records as sent.

5. Deploy the flow.

#### Mark Records as Sent and Clear Buffer

1. Drag a **Change** node onto the canvas and connect it to the MQTT Out node's output.

2. Name it "Prepare Record ID" and add the following rules:
   - **Rule 1**: Set `msg.params` to `{}` (JSONata expression)
   - **Rule 2**: Set `msg.params.$record_id` to `msg.id`

3. Click **Done** to save.

4. Drag an **SQLite** node onto the canvas and connect it to the Change node.

5. Name it "Mark as Sent", double-click it and select your database, set SQL Query mode to **Prepared Statement**, and enter the following SQL:

```sql
UPDATE data_buffer 
SET sent = 1 
WHERE id = $record_id;
```

6. Click **Done** to save.

7. Drag another **SQLite** node onto the canvas and connect it to the previous SQLite node.

8. Name it "Delete Record", double-click it and select your database, set SQL Query mode to **Prepared Statement**, and enter the following SQL:

```sql
DELETE FROM data_buffer 
WHERE id = $record_id;
```

9. Click **Done** to save.

#### Handle Errors and Disconnections

1. Drag a **Catch** node onto the canvas. Configure it to catch errors from all nodes (or scope it to specific nodes if preferred).

2. Drag a **Change** node onto the canvas and connect it to the catch node.

3. Name it "Set Flow Error" and configure it:
   - **Rule 1**: Set `flow.flowError` to `true` (boolean)

4. Click **Done** to save.

5. Drag a **Status** node onto the canvas and configure it to monitor the MQTT Out node's status.

6. Drag a **Switch** node onto the canvas and connect it to the status node.

7. Name it "Check Disconnected", set the Property to `msg.status.text`, add a condition `==` with value `disconnected`, and click **Done** to save.

8. Connect the switch node's output to the "Set Flow Error" change node.

9. Drag another **Change** node onto the canvas and connect it to the "Set Flow Error" change node's output.

10. Name it "Prepare Retry Update" and configure it:
    - **Rule 1**: Set `msg.params` to `{}` (JSONata expression)
    - **Rule 2**: Set `msg.params.$record_id` to `msg.id`

11. Click **Done** to save.

12. Drag an **SQLite** node onto the canvas and connect it to the "Prepare Retry Update" change node.

13. Name it "Increment Retry Count", double-click it and select your database, set SQL Query mode to **Prepared Statement**, and enter the following SQL:

```sql
UPDATE data_buffer 
SET retry_count = retry_count + 1 
WHERE id = $record_id;
```

14. Click **Done** to save and deploy your flow.

## Conclusion

Your store-and-forward system is now complete. PLC data writes to the local buffer, forwards to your destination when the network is available, and accumulates safely during outages without data loss.

The system operates autonomously: during normal operation, data flows through the buffer with minimal latency. During network outages, data accumulates in SQLite storage with no loss. When connectivity returns, the system automatically forwards the backlog in chronological order while continuing to collect new data.

This implementation provides the foundation for production-grade industrial data collection with complete continuity during network failures.
