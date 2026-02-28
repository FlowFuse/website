---
updated: 2026-01-16 11:34:09 +0100
title: Store and Forward
description: Ensure reliable data transmission in Node-RED with local SQLite buffering for handling intermittent network connectivity.
image: blueprints/getting-started/store-and-forward/store-and-forward.png
author: flowfuse
tags:
    - blueprints
    - other
layout: layouts/blueprint.njk
blueprintId: vGVN2wmD6e
---

Never lose data due to network interruptions again. This blueprint provides an enterprise-grade solution for buffering data locally when network connectivity becomes unreliable or intermittent. By automatically storing data in a local SQLite database during transmission failures—and seamlessly forwarding it when connectivity returns—you ensure complete data integrity across industrial applications, remote sensors, and edge devices.

## How It Works

The blueprint implements an intelligent buffering system designed to handle real-world connectivity challenges:

### 1. Local Database Initialization

On startup, the system automatically creates a SQLite database table to store buffered messages. Each entry includes comprehensive metadata: **timestamp, payload, and send status**.

### 2. Data Collection and Buffering

All incoming data is immediately stored in the local database, creating a resilient safety net. The example flow includes a simulated sensor that generates realistic machine measurements (temperature, pressure, vibration, RPM). Simply replace this with your actual data source to get started.

### 3. Connection Monitoring

The system actively monitors internet connectivity by pinging a remote server every 5 seconds. The moment connection is restored, it automatically triggers the data forwarding process—no manual intervention required.

### 4. Smart Data Forwarding

Unsent records are intelligently retrieved from the buffer in optimized batches of 50 and published via project nodes (though you can easily adapt this to use HTTP requests, webhooks, MQTT, or other protocols). Each buffered message is sent to the destination. Successfully transmitted records are marked as sent and then cleanly removed from the buffer, keeping your database lean and efficient.

### 5. Error Handling and Retry Logic

Built-in resilience ensures nothing falls through the cracks. The system captures transmission errors and connection status changes. When transmission fails, data remains safely in the buffer, ready for the next transmission attempt.

## Prerequisites

To get started, you'll need:

* A FlowFuse account with Starter, Pro, or Enterprise tier access.

## Setting Up the Blueprint on a Hosted Instance

1. To get started with the blueprint, click the **Deploy** button on the right side. This will redirect you to the FlowFuse instance-creation interface with the blueprint pre-selected.
2. Select the appropriate settings based on your preferences, such as instance type, application, and Node-RED version.
3. Click the **Create Instance** button.

Once the instance is successfully created, open the Node-RED editor and you will see the blueprint flow along with all necessary node packages installed.

## Setting Up the Blueprint on a Remote Instance

1. To use this blueprint on a remote instance, open the Node-RED editor for your remote instance.
2. Open the **Main Menu** in the top-right corner, select **Import**, choose **Blueprints** from the left, select your blueprint, and click **Import**.

## Getting Started

### 1. Replace the Simulated Sensor

The flow includes a simulated sensor that generates random machine data every 5 seconds.

1. Locate the **Simulate Sensor** inject node in the flow.
2. Delete it and connect your actual data source—sensors, MQTT subscriptions, HTTP requests, database queries, or whatever you're working with.
3. Make sure your data flows into the **Stringify JSON** node, which node converts your data object into a text string for storage. If your data source already provides a JSON string (not an object), you must delete this node.

### 2. Choose Your Output

This blueprint uses project nodes as an example. Replace the project nodes with whatever you need—HTTP requests, webhooks, MQTT outputs, database writes, etc.—and configure them accordingly. The buffering logic doesn't depend on the protocol. It stores your data locally and pushes it through whatever output you configure.

### 3. Deploy and Test

1. Click the **Deploy** button.
2. Trigger your data source and watch the Debug panel to see data flowing through.
3. Verify your data reaches the destination (MQTT broker, API, database, etc.).

To test the buffering:

1. Turn off internet access on the Store and Forward instance.
2. Generate some data—it should store in the local buffer.
3. Restore your connection and watch the buffered data automatically forward.

### 4. Adjusting Intervals (Optional)

If you want to change how often the system checks for connectivity or sends buffered data:

* **Connection check interval**: Open the **Ping** node and change the interval. The default is 5 seconds, but you can set this higher or lower based on your needs.

### Understanding Error Detection and Successful Transmission

The flow uses Catch and Status nodes to detect failures. For confirming successful data transmission when replacing the project-out node:

* If you use an MQTT Out node: Add a corresponding MQTT In node subscribed to the same topic to verify the message was received by the broker.
* If you're using HTTP, check the response status code. Any **2xx** value indicates successful transmission.
