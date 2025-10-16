---
title: "How to Log PLC Data to CSV Files"
subtitle: "Building a reliable, hands-off CSV logging setup with FlowFuse"
description: "Learn how to reliably log PLC data to CSV files using FlowFuse, handling connection drops, file corruption, and timestamp drift."
date: 2025-10-09
keywords:
authors: ["sumit-shinde"]
image: png
tags:
- flowfuse
---

CSV files have been recording manufacturing data since the mid-1980s — over 40 years of continuous use across every industry. They’ve outlasted proprietary databases, specialized historians, and expensive SCADA extensions. Every plant still uses them because they’re universally compatible — and if you’re reading this, you probably need to do the same.

Any system can read CSV. Excel opens it instantly, databases import it natively, and analysis tools expect it. No licensing, no vendor tie-ins, no format obsolescence. Data captured decades ago is still perfectly readable today.

But building reliable PLC-to-CSV logging that runs automatically without breaking is harder than it looks. Small issues that can consume days of troubleshooting.  

This guide shows how to implement PLC data logging with **FlowFuse** in a way that keeps running — stable, resilient, and production-ready.

## Prerequisites

Before getting started, make sure you have:

- **A running FlowFuse instance** – If you do not have one yet, sign up for FlowFuse and deploy an instance on your edge device. This device will handle data collection and logging from your PLC using Node-RED.

## Step 1: Setting Up PLC Communication in FlowFuse

Before logging data, you need a stable connection to your PLC. FlowFuse uses Node-RED under the hood, which supports every major industrial protocol through community-maintained packages. This means you can connect to any equipment—regardless of age or manufacturer.

### Choosing Your Protocol

The right protocol depends on what your PLC supports.

Modern PLCs typically offer open standards like OPC UA, Modbus TCP, or EtherNet/IP. These protocols work across different manufacturers and give you the most flexibility.

If your PLC supports OPC UA, that's probably your best option. It's becoming the common language across industrial equipment—Siemens, Rockwell, Schneider, and most other manufacturers support it, and thats the option i have used in demo i prepared for the this article 

Legacy systems use vendor-specific protocols: S7 for Siemens, MC Protocol for Mitsubishi, FINS for Omron, and EtherNet/IP for Allen-Bradley. If your PLC only speaks its native language, Node-RED has dedicated nodes for each one.

### Installing the Right Node

Node-RED's package ecosystem includes nodes for virtually every industrial protocol. The most common ones:

- `node-red-contrib-modbus` – Modbus RTU/TCP devices
- `node-red-contrib-s7` – Siemens S7-300/400/1200/1500
- `node-red-contrib-opcua` – OPC UA servers
- `node-red-contrib-cip-ethernet-ip` – Allen-Bradley PLCs
- `node-red-contrib-mcprotocol` – Mitsubishi Q/L series
- `node-red-contrib-omron-fins` – Omron PLCs

To install a package in FlowFuse, go to the palette manager (hamburger menu → Manage palette → Install) and search for the node you need. Installation takes seconds.

### Configuring Your Connection

Drag the appropriate input node onto your canvas and configure it according to the node's documentation.

### Verifying Data Quality

Before building your logging flow, verify you're getting clean, consistent data. Connect a debug node to your PLC input, deploy, and watch the incoming messages.

You should see values updating at your configured interval with consistent structure and sensible numbers. No connection errors, timeouts, or garbage data.

If something's wrong—intermittent connections, bad values, protocol errors—fix it now. Connection problems multiply when you add logging logic on top.

A stable PLC connection is the foundation. Get this right, and the rest is straightforward.

## Step 2: Building the Basic CSV Logging Flow

With a stable PLC connection verified, you can now build the flow that writes data to CSV files.

### Understanding the Data Flow

The logging system needs four components working together:

1. PLC input node that collects data at regular intervals
2. Function node that adds timestamps and handles daily file rotation
3. CSV node that formats data into proper CSV structure
4. File node that writes to disk

### Adding Timestamps and Daily File Rotation

Your PLC data needs timestamps and a way to organize files by date.

1. Drag a function node onto your canvas
2. Connect it to your PLC input node
3. Double-click the function node and add this code:
```javascript
const now = new Date();
const timestamp = now.toISOString();

// Create filename with today's date (YYYY-MM-DD format)
const dateStr = now.toISOString().split('T')[0];
const filename = `./plc_data_${dateStr}.csv`;

// Structure the data
msg.payload = {
    timestamp: timestamp,
    temperature: msg.payload.temperature,
    pressure: msg.payload.pressure,
    flowRate: msg.payload.flowRate
};

// Store filename for the file node
msg.filename = filename;

return msg;
```

4. Click Done

This creates a new file each day automatically. When the date changes, the filename changes, and Node-RED starts writing to a fresh file. Your logs stay organized by date: `plc_data_2025-10-16.csv`, `plc_data_2025-10-17.csv`, and so on.

### Formatting Data with the CSV Node

The CSV node handles all the formatting work—proper escaping, column ordering, and headers.

1. Drag a CSV node onto your canvas
2. Connect it to your function node
3. Double-click to configure:
   - Set the columns: `timestamp,temperature,pressure,flowRate`
   - Enable "first row contains column names"
   - Choose comma as the separator
   - Choose RFC 4180 as parser (this handles commas in your data—like alarm messages or status text—by wrapping them in quotes so they don't break the CSV structure)
4. Click Done

The CSV node converts your data object into a properly formatted CSV line with headers included automatically when a new file is created.

### Writing to File

The file node writes your formatted CSV data to disk.

1. Drag a file node onto your canvas
2. Connect it to your CSV node
3. Double-click to configure:
   - Set filename to `msg.filename` (uses the dynamic filename from your function)
   - Choose "append to file" mode
   - Enable "Create directory if it doesn't exist"
4. Click Done
5. Deploy your flow

Let it run. Each day at midnight, the system automatically starts a new file. Old files stay untouched, new data goes to today's file.

This daily rotation keeps file sizes manageable and makes it easy to find data from specific dates. But there are still edge cases to handle—what happens when disk space runs low or file writes fail? The next step addresses these reliability issues.

## Step 4: Monitoring Disk Usage

Running a logging system continuously means files accumulate. Monitor disk space to prevent unexpected failures when storage runs low.

Add disk space monitoring to prevent unexpected failures.

1. Drag an inject node onto your canvas and configure it to trigger every hour
2. Add a function node with this code:

```javascript
const os = require('os');
const fs = require('fs');

// Get disk usage information
const stats = fs.statfsSync('./');
const totalSpace = stats.blocks * stats.bsize;
const freeSpace = stats.bfree * stats.bsize;
const usedSpace = totalSpace - freeSpace;
const percentUsed = (usedSpace / totalSpace) * 100;

msg.payload = {
    totalGB: (totalSpace / (1024**3)).toFixed(2),
    freeGB: (freeSpace / (1024**3)).toFixed(2),
    usedGB: (usedSpace / (1024**3)).toFixed(2),
    percentUsed: percentUsed.toFixed(2)
};

// Warning threshold
if (percentUsed > 90) {
    msg.warning = `Disk space critical: ${percentUsed.toFixed(1)}% used`;
}

return msg;
```

3. Add a switch node to check for the warning property
4. Connect it to your notification system to alert when space is critical
5. Deploy the flow

Now you'll get warnings before disk space becomes critical, giving you time to archive old data or expand storage.

## Step 5: Handling Connection Interruptions

Network issues, PLC restarts, and equipment maintenance cause connection drops. Your logging system needs to handle these gracefully and resume automatically.

### Detecting Connection Loss

Most PLC nodes emit error events when connections fail. Add error handling to detect and log these events.

1. Add a catch node configured for your PLC input node
2. Connect it to a function node that logs connection failures
3. Add logic to track how long the connection has been down

### Implementing Automatic Reconnection

Your PLC node should be configured to reconnect automatically. Most nodes have this built in—verify it's enabled in your node configuration.

Add a status node to monitor connection state:

1. Drag a status node onto your canvas
2. Configure it to monitor your PLC input node
3. Connect to a debug node to see connection state changes
4. Deploy and verify it shows "connected" status

When connection drops, the node will attempt to reconnect based on its retry settings. You'll see status changes in your debug output.

## Conclusion

You now have a production-ready PLC data logging system built on FlowFuse. It handles the critical reliability issues—connection drops, write failures, disk space management, and daily rotation—that turn a basic logging flow into something that runs hands-off for months.

The CSV format ensures your data remains accessible regardless of future system changes. Every tool can read it, and it'll still be readable decades from now.

Start simple. Get one PLC connected, verify clean data, and deploy the basic logging flow. Add error handling and disk management as you gain confidence. The system will prove itself over time.

FlowFuse makes this practical because it gives you Node-RED's flexibility with professional deployment infrastructure. You can update flows remotely, manage multiple sites from one dashboard, and scale from one PLC to hundreds without rebuilding everything.

The patterns shown here apply to any industrial data logging project—adapt them to your specific equipment and requirements. Once you have reliable CSV logging in place, you can build analytics, dashboards, and reports on top of data you know is captured consistently.

Your manufacturing data is too valuable to lose. Build logging that doesn't break.