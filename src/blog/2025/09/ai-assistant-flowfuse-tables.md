---
title: "Query Your Database with Natural Language in FlowFuse Tables"
subtitle: "A faster, more intuitive way to get data from your tables without writing a single line of SQL."
description: "Learn the easiest way to connect to your database and get data—no coding knowledge required."
date: 2025-09-09
keywords: FlowFuse Tables, SQL natural language, database queries, Tables node, Node-RED, sensor data, temperature monitoring, industrial automation, low-code platform, data analysis
authors: ["sumit-shinde"]
image: /blog/2025/09/images/flowfuse-assistant-query-node.png
tags:
  - flowfuse
---

Getting data from your database used to mean writing SQL queries. Not anymore. FlowFuse Tables now lets you ask for what you want in plain English and automatically generates the SQL for you.

<!--more-->

## Removing Technical Barriers

Industrial operations generate enormous volumes of valuable information: sensor readings from production lines, equipment performance metrics, quality measurements, and operational logs. This data represents millions of dollars in optimization opportunities, yet accessing it remains challenging for most operational teams.

FlowFuse has already simplified database connectivity—connecting to your databases and setting up data flows is now straightforward with our Tables nodes. However, once connected, teams still faced a significant hurdle: writing SQL queries to extract meaningful insights from their data.

FlowFuse has consistently focused on democratizing industrial automation. We've made building applications and data pipelines simple without extensive coding knowledge. Recently, FlowFuse Assistant solved JavaScript and Vue.js barriers, helping users create custom functions and UI components through natural language.

Now in FlowFuse [2.21](/blog/2025/08/flowfuse-release-2-21/), we're tackling the remaining SQL barrier. While connecting to databases is already simple with FlowFuse, querying that data effectively still required SQL expertise. The latest FlowFuse Assistant brings natural language capabilities to Tables nodes, completing the democratization of database access:

## Getting Started

Let's see how this works with a practical example using FlowFuse Tables. First, import the following flow and deploy it to create a "sensor_readings" table for practice:

{% renderFlow 300 %}
[{"id":"e9a3b71d40addd8b","type":"group","z":"901337216b60b25a","name":"Create Table","style":{"label":true},"nodes":["48b1380ff7bfe716","44bb8750d961e415","4a3976e062b2ddd2"],"x":54,"y":59,"w":572,"h":82},{"id":"48b1380ff7bfe716","type":"inject","z":"901337216b60b25a","g":"e9a3b71d40addd8b","name":"","props":[],"repeat":"","crontab":"","once":true,"onceDelay":"1","topic":"","x":150,"y":100,"wires":[["44bb8750d961e415"]]},{"id":"44bb8750d961e415","type":"tables-query","z":"901337216b60b25a","g":"e9a3b71d40addd8b","name":"Create Table","query":"CREATE TABLE IF NOT EXISTS sensor_readings (\n    id SERIAL PRIMARY KEY,\n    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    sensor_id VARCHAR(50) NOT NULL,\n    location VARCHAR(100),\n    temperature DECIMAL(5,2)\n);\n","split":false,"rowsPerMsg":1,"x":330,"y":100,"wires":[["4a3976e062b2ddd2"]]},{"id":"4a3976e062b2ddd2","type":"debug","z":"901337216b60b25a","g":"e9a3b71d40addd8b","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":520,"y":100,"wires":[]},{"id":"68fbcdb03e3a5346","type":"group","z":"901337216b60b25a","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["4f24ab5b5628a1ba","fbf36a7b3c59461d"],"x":634,"y":59,"w":392,"h":82},{"id":"4f24ab5b5628a1ba","type":"catch","z":"901337216b60b25a","g":"68fbcdb03e3a5346","name":"","scope":null,"uncaught":false,"x":720,"y":100,"wires":[["fbf36a7b3c59461d"]]},{"id":"fbf36a7b3c59461d","type":"debug","z":"901337216b60b25a","g":"68fbcdb03e3a5346","name":"debug 6","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":920,"y":100,"wires":[]},{"id":"01137d02c4832962","type":"group","z":"901337216b60b25a","name":"","style":{"label":true},"nodes":["e465d4328d9d42d9","f8269cf412b4200f","2ce801643e01510b","40d48ffb90e5674a"],"x":54,"y":159,"w":972,"h":82},{"id":"e465d4328d9d42d9","type":"inject","z":"901337216b60b25a","g":"01137d02c4832962","name":"Insert simulated Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":200,"y":200,"wires":[["40d48ffb90e5674a"]]},{"id":"f8269cf412b4200f","type":"debug","z":"901337216b60b25a","g":"01137d02c4832962","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":920,"y":200,"wires":[]},{"id":"2ce801643e01510b","type":"tables-query","z":"901337216b60b25a","g":"01137d02c4832962","name":"","query":"INSERT INTO public.sensor_readings (sensor_id, timestamp, location, temperature) \nVALUES ($sensor_id, $timestamp, $location, $temperature);\n","split":false,"rowsPerMsg":1,"x":710,"y":200,"wires":[["f8269cf412b4200f"]]},{"id":"40d48ffb90e5674a","type":"function","z":"901337216b60b25a","g":"01137d02c4832962","name":"Generate last 7 days sensor data","func":"// Generate simulated sensor readings for the last 7 days, at every even hour\nlet now = new Date();\nlet start = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago\nlet readings = [];\n\n// Collect all readings first\nfor (let ts = new Date(start); ts <= now; ts.setHours(ts.getHours() + 1)) {\n    if (ts.getHours() % 2 === 0) {\n        readings.push({\n            queryParameters: {\n                sensor_id: \"sensor-1\",\n                timestamp: new Date(ts), // clone timestamp\n                location: \"Lab A\",\n                temperature: (20 + Math.random() * 10).toFixed(2)\n            }\n        });\n    }\n}\n\n// Send them one by one with delay\nreadings.forEach((reading, i) => {\n    setTimeout(() => {\n        node.send(reading);\n    }, i * 200); // 200ms delay between messages\n});\n\nreturn null; // don't send extra msg\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":480,"y":200,"wires":[["2ce801643e01510b"]]},{"id":"6f450d9fb26372b9","type":"global-config","env":[],"modules":{"@flowfuse/nr-tables-nodes":"0.1.0"}}]
{% endrenderFlow %}

After deployment, press the "Insert simulated Data" inject button to populate your table with a week's worth of hourly sensor readings. This sample data will help you explore the natural language capabilities.

> **Note:** FlowFuse Tables is currently available for Enterprise users

Now let's test the natural language feature:

1. Add an Inject node to your flow
2. Connect it to your Table node  
3. Open the Table node and locate the new "Assistant" field
4. Enter: "Show me all readings from today"
5. Click Ask the FlowFuse Assistant. Once the process is complete, the Assistant-generated SQL query will appear in the Table node’s SQL field. Click Done.
6. Connect a Debug node to see the results
7. Deploy and test your flow

![FlowFuse Natural Language Queries in Table Node](./images/flowfuse-ai-assistance-table-demo.gif){data-zoomable}
_Natural language queries in FlowFuse Tables_

## Practical Query Examples

With your sample data in place, here are some immediately useful queries to try:

### Performance Analysis

**Track temperature averages:**
Prompt: "What's the average temperature for this week?"

<lite-youtube videoid="MZxrI9SEegE" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

This automatically handles complex date functions and GROUP BY clauses that would normally require SQL expertise.

**Identify peak readings:**
Prompt: "Find the highest temperature reading this month"

<lite-youtube videoid="jDIRH2i_1Uk" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

The system generates MAX functions and date ranges without any manual coding.

### Time-Based Analysis

**Hourly patterns:**
Prompt: "Average temperature per hour today"

<lite-youtube videoid="m4L9ZHE6tdI" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

This creates sophisticated time-grouping queries that reveal patterns throughout your operational day—essential for identifying trends and anomalies.

These examples demonstrate how natural language queries transform complex data analysis into simple, conversational requests. What once required database expertise is now accessible to anyone who can describe what they need.

## Advanced Query Capabilities

Beyond basic queries, the natural language interface handles sophisticated analysis:

**Complex filtering:**
Prompt: "Show readings where temperature > 20, temperature < 25, and temperature ≠ 22"

<lite-youtube videoid="MtzcbmFg1-4" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

**Statistical operations:**
Prompt: "Calculate standard deviation of temperature readings this month"

<lite-youtube videoid="aJ8znXOn9Hc" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

These examples show how natural language queries can handle the sophisticated analysis that operational teams need daily, from quality control checks to performance optimization.

## What's Next

FlowFuse AI Assistant now brings natural language capabilities to database queries in FlowFuse Tables. This eliminates SQL complexity, allowing industrial teams to extract insights through simple conversational commands rather than technical database knowledge.

FlowFuse's mission has always been to democratize industrial automation and reduce complexity for engineers and operational teams. As part of this commitment, more AI-powered features are on our roadmap to further simplify complex industrial workflows—from enhanced query understanding to intelligent data suggestions that anticipate your analytical needs.

We're building an ecosystem where artificial intelligence handles the technical complexity while your team focuses on what matters most—making informed operational decisions. Our vision is creating a future where every team member, regardless of technical background, can unlock the insights hidden in their operational data through intelligent, conversational interfaces.

Ready to transform how your team works with data? [book demo](https://app.flowfuse.com/account/create) and see how FlowFuse makes building industrial applications simple and accessible.