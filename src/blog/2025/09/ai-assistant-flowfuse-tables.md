---
title: "Query Your Database with Natural Language Using FlowFuse Expert"
subtitle: "A faster, more intuitive way to get data from your tables without writing a single line of SQL."
description: "Learn the easiest way to connect to your database and get data—no coding knowledge required."
date: 2025-09-18
keywords: FlowFuse Tables, SQL natural language, database queries, Query node, Node-RED, sensor data, temperature monitoring, industrial automation, low-code platform, data analysis
authors: ["sumit-shinde"]
image: /blog/2025/09/images/flowfuse-assistant-query-node.png
tags:
  - flowfuse
---

Getting data from your database used to mean writing SQL queries. Not anymore. The FlowFuse Expert now lets you ask for what you want in plain English and automatically generates the SQL for you in query node.

<!--more-->

## Removing Technical Barriers

Industrial operations generate massive amounts of valuable data from sensors, equipment, and PLCs. This data can drive optimization and cost savings, but extracting insights often requires SQL skills that not every team member possesses.

FlowFuse already makes it simple to connect to databases and build data flows using its Query nodes. However, the need to manually write SQL queries has remained a significant barrier for many users.

To address this, FlowFuse continues its mission of making industrial automation accessible to everyone, regardless of coding expertise. Features like the FlowFuse Expert have already reduced complexity by enabling users to create custom functions and UI components using natural language.

With FlowFuse [2.21](/blog/2025/08/flowfuse-release-2-21/), this ease of use extends to database queries as well. Users can now ask questions in plain English and have SQL automatically generated, removing the last major hurdle and empowering a broader audience to gain actionable insights quickly and easily.

## Getting Started

Let's see how this works with a practical example. This feature combines two FlowFuse components:

- **FlowFuse Tables** provides the database connectivity and Query nodes
- **FlowFuse Expert** adds the natural language processing capability that converts plain English into SQL

Before you begin, make sure FlowFuse Tables is activated in your FlowFuse team. For more information, refer to [Getting Started with FlowFuse Tables](/blog/2025/08/getting-started-with-flowfuse-tables/). Then, import the following flow and deploy it to create a `sensor_readings` table for practice:

{% renderFlow 300 %}
[{"id":"e9a3b71d40addd8b","type":"group","z":"d74afda3e83a644e","name":"Create Table","style":{"label":true},"nodes":["48b1380ff7bfe716","44bb8750d961e415","4a3976e062b2ddd2"],"x":274,"y":419,"w":572,"h":82},{"id":"48b1380ff7bfe716","type":"inject","z":"d74afda3e83a644e","g":"e9a3b71d40addd8b","name":"","props":[],"repeat":"","crontab":"","once":true,"onceDelay":"1","topic":"","x":370,"y":460,"wires":[["44bb8750d961e415"]]},{"id":"44bb8750d961e415","type":"tables-query","z":"d74afda3e83a644e","g":"e9a3b71d40addd8b","name":"Create Table","query":"CREATE TABLE IF NOT EXISTS public.sensor_readings ( (\n    id SERIAL PRIMARY KEY,\n    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    sensor_id VARCHAR(50) NOT NULL,\n    location VARCHAR(100),\n    temperature DECIMAL(5,2)\n);\n","split":false,"rowsPerMsg":1,"x":550,"y":460,"wires":[["4a3976e062b2ddd2"]]},{"id":"4a3976e062b2ddd2","type":"debug","z":"d74afda3e83a644e","g":"e9a3b71d40addd8b","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":740,"y":460,"wires":[]},{"id":"68fbcdb03e3a5346","type":"group","z":"d74afda3e83a644e","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["4f24ab5b5628a1ba","fbf36a7b3c59461d"],"x":854,"y":419,"w":392,"h":82},{"id":"4f24ab5b5628a1ba","type":"catch","z":"d74afda3e83a644e","g":"68fbcdb03e3a5346","name":"","scope":null,"uncaught":false,"x":940,"y":460,"wires":[["fbf36a7b3c59461d"]]},{"id":"fbf36a7b3c59461d","type":"debug","z":"d74afda3e83a644e","g":"68fbcdb03e3a5346","name":"debug 6","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1140,"y":460,"wires":[]},{"id":"01137d02c4832962","type":"group","z":"d74afda3e83a644e","name":"","style":{"label":true},"nodes":["e465d4328d9d42d9","f8269cf412b4200f","2ce801643e01510b","40d48ffb90e5674a"],"x":274,"y":519,"w":972,"h":82},{"id":"e465d4328d9d42d9","type":"inject","z":"d74afda3e83a644e","g":"01137d02c4832962","name":"Insert simulated Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":420,"y":560,"wires":[["40d48ffb90e5674a"]]},{"id":"f8269cf412b4200f","type":"debug","z":"d74afda3e83a644e","g":"01137d02c4832962","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1140,"y":560,"wires":[]},{"id":"2ce801643e01510b","type":"tables-query","z":"d74afda3e83a644e","g":"01137d02c4832962","name":"","query":"INSERT INTO public.sensor_readings (sensor_id, timestamp, location, temperature) \nVALUES ($sensor_id, $timestamp, $location, $temperature);\n","split":false,"rowsPerMsg":1,"x":930,"y":560,"wires":[["f8269cf412b4200f"]]},{"id":"40d48ffb90e5674a","type":"function","z":"d74afda3e83a644e","g":"01137d02c4832962","name":"Generate last 7 days sensor data","func":"// Generate simulated sensor readings for the last 7 days, at every even hour\nlet now = new Date();\nlet start = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago\nlet readings = [];\n\n// Collect all readings first\nfor (let ts = new Date(start); ts <= now; ts.setHours(ts.getHours() + 1)) {\n    if (ts.getHours() % 2 === 0) {\n        readings.push({\n            queryParameters: {\n                sensor_id: \"sensor-1\",\n                timestamp: new Date(ts), // clone timestamp\n                location: \"Lab A\",\n                temperature: Number((20 + Math.random() * 10).toFixed(2)) // Ensure number type\n            }\n        });\n    }\n}\n\n// Send them one by one with delay\nreadings.forEach((reading, i) => {\n    setTimeout(() => {\n        node.send(reading);\n    }, i * 200); // 200ms delay between messages\n});\n\nreturn null; // Prevent immediate msg sending\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":700,"y":560,"wires":[["2ce801643e01510b"]]},{"id":"89c52680263e6cba","type":"global-config","env":[],"modules":{"@flowfuse/nr-tables-nodes":"0.1.0"}}]
{% endrenderFlow %}

After deployment, press the "Insert simulated Data" inject button to populate your table with a week's worth of hourly sensor readings. This sample data will help you explore Query node capabilities.

> **Note:** FlowFuse Tables is currently available for Enterprise users only.

Now, let us test the natural language querying powered by the FlowFuse Expert:  
1. Add an Inject node to your flow  
2. Connect it to your Query node  
3. Open the Query node and locate the new "Assistant" codelens  
4. Enter: "Show me all readings from today"  
5. Click **Ask the FlowFuse Expert**. The FlowFuse Expert will process your natural language request and automatically generate the corresponding SQL query in the Query node's SQL field. Click Done.  
6. Connect a Debug node to see the results  
7. Deploy the flow and click the Inject button to test it.

![FlowFuse Expert in Query Node](./images/flowfuse-ai-assistance-table-demo.gif){data-zoomable}  
_FlowFuse Expert in Query Node_

## Practical Query Examples

With your sample data in place, here are some immediately useful queries to try:

### Performance Analysis

**Track temperature averages:**  
Prompt: "What's the average temperature for this week?"

<lite-youtube videoid="MZxrI9SEegE" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

**Identify peak readings:**  
Prompt: "Find the highest temperature reading this month"

<lite-youtube videoid="jDIRH2i_1Uk" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

### Time-Based Analysis

**Hourly patterns:**  
Prompt: "Average temperature per hour today"

<lite-youtube videoid="m4L9ZHE6tdI" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

## Advanced Query Capabilities

Beyond basic queries, the FlowFuse Expert can handle sophisticated analysis:

**Complex filtering:**  
Prompt: "Show readings where temperature > 20, temperature < 25, and temperature ≠ 22"

<lite-youtube videoid="MtzcbmFg1-4" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

**Statistical operations:**  
Prompt: "Calculate standard deviation of temperature readings this month"

<lite-youtube videoid="aJ8znXOn9Hc" params="rel=0" style="margin-top: 20px; margin-bottom: 20px; width: 100%; height: 480px;" title="YouTube video player"></lite-youtube>

These examples demonstrate how the FlowFuse Expert simplifies advanced analysis, turning complex database operations into easy, natural-language requests.

## What's Next

The FlowFuse Expert now brings natural language capabilities to database queries in FlowFuse Tables. This removes the complexity of SQL, allowing industrial teams to extract insights using simple conversational commands.

FlowFuse's mission has always been to democratize industrial automation and reduce complexity for engineers and operational teams. As part of this commitment, more AI-powered features are on the roadmap to simplify industrial workflows even further.

Ready to transform how your team works with data? [Book a demo]({% include "sign-up-url.njk" %}) and see how FlowFuse makes building industrial applications simple and accessible.