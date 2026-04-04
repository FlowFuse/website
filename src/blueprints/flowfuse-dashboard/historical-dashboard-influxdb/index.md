---
updated: 2026-01-16 11:34:09 +0100
title: Historical Data Dashboard with InfluxDB
description: This dashboard demonstrates the utilization of InfluxDB for retrieving and displaying both real-time and historical data with timestamp series.
image: blueprints/flowfuse-dashboard/historical-dashboard-influxdb/historical-data-dashboard.png
tags:
    - blueprints
    - dashboard-20
layout: layouts/blueprint.njk
blueprintId: 6EbLVbLa9j
---

This dashboard demonstrates the utilization of InfluxDB in Node-RED for storing historical data and visualizing both real-time and historical time-series data through interactive charts and progress indicators.

## Understanding the Dashboard Sections

### Live Data Display

This section shows real-time circular progress indicators for humidity and pressure measurements. The progress circles update automatically as new data arrives, providing immediate visibility into current conditions.

### Live Progress Bars

Linear progress bars display additional real-time metrics including rainfall, wind, and cloud coverage. These horizontal indicators make it easy to quickly compare multiple measurements at a glance.

### Live Chart

A time-series line chart displays temperature data in real-time. The chart automatically updates as new data points arrive, showing the trend over the last 10 seconds with smooth transitions.

### Historical Data Form

A form allows users to select specific dates, times, and time windows (in minutes) to retrieve historical data. This enables detailed investigation of past events or comparison of performance across different time periods.

### Historical Chart

The historical chart displays temperature data for the selected time range. Unlike the live chart, this shows data from InfluxDB based on the user's date and time selection, enabling analysis of past trends.

### Historical Progress Indicators

Circular progress indicators show the average humidity and pressure values for the selected historical time window. These provide a quick summary of conditions during the specified period.

## Getting Started with Historical Data Dashboard

### Prerequisites

Before moving forward, ensure you have the following prepared:

- A FlowFuse account with the Starter, Pro, or Enterprise tier.
- An InfluxDB instance (either cloud-based or self-hosted).
- InfluxDB credentials including organization, bucket, and API token.

### Setting Up the Blueprint

1. Click the **Deploy** button on the right. You will be redirected to the FlowFuse platform's instance creation interface with the blueprint pre-selected.
2. Select the appropriate settings based on your preferences, such as instance type, application, and Node-RED version.
3. Click the **Create Instance** button.

Once the instance is successfully created, you can:

- Click the **Dashboard** button in the top-right corner to test the Historical Data Dashboard Blueprint.
- Click the **Open Editor** button in the top-right corner to navigate to the Node-RED Editor.

### Configuring InfluxDB Connection

After creating the instance, you need to configure the InfluxDB connection:

1. Open the Node-RED Editor by clicking the **Open Editor** button.
2. Locate the InfluxDB configuration nodes (both influxdb-in and influxdb-out nodes).
3. Double-click on any InfluxDB node to open its configuration.
4. Click the pencil icon next to the server field to edit the connection settings.
5. Enter your InfluxDB credentials:
   - Server URL (e.g., https://us-east-1-1.aws.cloud2.influxdata.com)
   - Organization name
   - Bucket name
   - API Token
6. Click **Update**, then **Done**, and finally **Deploy** to save your changes.

### Configuring Timezone

The blueprint uses the node-red-contrib-moment node to convert local time to UTC time for InfluxDB queries:

1. Locate the "LocalTzToUtcTzFormatter" moment node in the "Reading Historical Data from InfluxDB" group.
2. Double-click the node to open its configuration.
3. Change the "Input Timezone" field from "Asia/Calcutta" to your local timezone.
4. Click **Done** and **Deploy**.

### Replacing Simulated Data

Currently, the blueprint uses inject nodes to simulate data for demonstration purposes. Before use in production, replace these nodes with your actual data source nodes.

To replace the simulated data:

1. Open the Node-RED Editor by clicking the **Open Editor** button.
2. Locate the inject nodes in the "Sending Data to InfluxDB" group.
3. Replace these nodes with your source nodes (e.g., MQTT, OPC-UA, HTTP request, Database, or Modbus nodes).
4. Ensure your source nodes output data with a `value` property containing the measurement value.
5. Update the measurement names in the influxdb-out nodes if needed (current measurements: temperature, humidity, pressure).
6. Deploy your changes and verify the dashboard displays your live data correctly.

### Customizing for Your Environment

The dashboard can be customized to match your specific requirements:

- Modify measurement names and field names to match your data structure
- Adjust the time window options in the historical data form
- Add additional measurements by duplicating the existing flows
- Customize chart types and visualizations for different data types
- Update the CSS styling in the template node to match your branding