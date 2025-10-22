---
title: "MQTT Integration: Publishing PLC Data to Cloud"
subtitle: ""
description: ""
date: 2025-10-09
keywords: 
authors: ["sumit-shinde"]
image: 
tags:
  - flowfuse
---

Monitoring factory equipment and machines is becoming standard practice in industrial IoT. MQTT sits at the center of this - it's a lightweight protocol that streams data in real-time. It's designed to be simple and efficient. But when you actually try to implement it, things get complicated, and the costs can spiral out of control.

<!--more-->

That's why we put this guide together. We'll show you how to connect your PLCs to the cloud using MQTT without spending too much time, money, or needing deep expertise. You'll learn to read PLC data, set up an MQTT broker, and get everything talking to the cloud. 

## Why PLC-to-Cloud Gets So Complicated

Here's what usually goes wrong. First, people underestimate the protocol mess. Your factory floor has PLCs from different manufacturers, each speaking their own language - Modbus, OPC-UA, Ethernet/IP, Profinet. Getting data out means dealing with all of them, and suddenly you're maintaining multiple drivers and connections.

Then there's the networking nightmare. Factory networks weren't built for internet connectivity. You've got isolated subnets, strict firewalls, and IT departments (rightfully) worried about security. Punching holes through these networks to reach the cloud is where projects stall for months.

The costs sneak up on you too. Cloud platforms charge per message or per device. When you're streaming data every few seconds from dozens of machines, those pennies add up fast. Before you know it, you're looking at thousands per month just for data transmission.

And finally, there's the expertise gap. This work sits between OT and IT. Your plant engineers know the PLCs inside out but might not be comfortable with cloud APIs. Your IT team knows cloud infrastructure but doesn't understand industrial protocols. You end up needing expensive consultants to bridge that gap.

## Prerequisites

Before you start, make sure you have the following:

- A properly configured and fully operational PLC, located on the same network as the edge device that will be reading its data.
- A running FlowFuse instance on your edge device. If you do not have an account, [sign up for a free trial](https://flowfuse.com/blog/2025/09/installing-node-red/) and set up your instance following the instructions in this article.

## Step 1: Extract Data from Your PLC

As mentioned earlier, extracting data is the first and most complex step. Get this wrong, and the complexity and costs spiral out of control. FlowFuse changes this. Its pre-built connectors handle Modbus, OPC-UA, Ethernet/IP, and other protocols out of the box. No custom coding, no expensive proprietary gateways, no per-tag licensing fees. You'll configure your connections visually and have data flowing in minutes.

We're not just saying this works—Fortune 500 manufacturers are running production systems on FlowFuse right now. The consistent feedback? Massive cost savings compared to legacy systems, especially when rolling out across multiple facilities. The enterprise features handle the scale and security requirements that large operations demand.

The Node-RED ecosystem that powers FlowFuse comes with protocol support built in. You'll find nodes available for every major PLC manufacturer:

- `node-red-contrib-modbus` – Modbus RTU/TCP devices
- `node-red-contrib-s7` – Siemens S7-300/400/1200/1500
- `node-red-contrib-opcua` – OPC UA servers
- `node-red-contrib-cip-ethernet-ip` – Allen-Bradley PLCs
- `node-red-contrib-mcprotocol` – Mitsubishi Q/L series
- `node-red-contrib-omron-fins` – Omron PLCs

Adding a protocol node to your FlowFuse instance takes just a few clicks. Access the palette manager from the hamburger menu, click "Manage palette," find the Install section, and search for what you need.

For this demonstration, we'll be collecting data from four different sources to showcase FlowFuse's versatility: Siemens PLCs, Allen-Bradley controllers, an OPC UA server, and Modbus. This will give you a comprehensive understanding of how FlowFuse handles multiple protocols simultaneously in a real-world scenario.

## Step 2: Transform and Structure Your Data

Raw PLC data needs reshaping before cloud transmission. Register values, bit arrays, floating points, and timestamps arrive in different formats. FlowFuse offers several transformation methods matched to different skill levels.

**Visual Transformation with Change and Switch Nodes**

Change nodes handle basic transformations without code. Map fields, modify values, and add metadata through dropdown menus and form fields. Switch nodes create conditional routing—send temperature readings above 80°C down one path, everything else down another.

Plant engineers work directly with these visual tools. No programming required.

**JSONata for Complex Mappings**

JSONata handles sophisticated data transformations inside Change nodes. Restructure messages, calculate derived values, and apply conditional logic:

```json
{
 "timestamp": $now(),
 "facility": "Plant_A",
 "machine_id": "LINE_02",
 "metrics": {
 "temperature": payload.temp,
 "pressure": payload.pressure,
 "efficiency": $round((payload.goodParts / payload.totalParts) * 100, 2)
 }
}
```

**Function Nodes for Custom Logic**

Function nodes provide full JavaScript access for complex requirements. Write custom logic, install npm packages, and access the complete JavaScript standard library when Change nodes and JSONata reach their limits.

*Tip: Use the FlowFuse assistant to generate function nodes. Describe the transformation you need in plain English, and it will create the code for you. For best results, provide sample input data to ensure the output matches your requirements.*

**Pre-built Community Nodes**

Check the palette manager before building custom solutions. The Node-RED ecosystem includes thousands of nodes for data aggregation, statistical analysis, time-series buffering, and unit conversions. Most common transformation problems already have solutions.

Match the tool to the task. Change nodes for simple mapping. JSONata for calculations and restructuring. Function nodes for specialized logic. This range accommodates both engineers and developers working on the same flows.