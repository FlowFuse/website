---
title: "Building Your First Pareto Chart in FlowFuse for Production Data"
subtitle: "Transform Raw Production Data into Actionable Insights with a Visual Pareto Analysis"
description: "Learn how to build a Pareto Chart in FlowFuse to identify the vital few defects in your production data. Step-by-step guide with live data integration, visualization, and actionable insights."
date: 2025-09-01
keywords: FlowFuse, Pareto Chart, production data analysis, manufacturing analytics, Node-RED dashboard, industrial data visualization, defect tracking, real-time monitoring
authors: ["sumit-shinde"]
image: 
tags:
  - flowfuse
  - opcua
---

In the [first part of this series](/blog/2025/08/pareto-chart-manufacturing-guide/), we explored the foundational principles of the Pareto Chart, understanding how this powerful tool can help manufacturing teams quickly identify and focus on the "vital few" problems that have the biggest impact. We learned that by combining a bar graph and a cumulative percentage line, a Pareto Chart provides a clear visual roadmap to prioritize quality issues, equipment downtime, or other key performance indicators.

<!--more-->

Now, it's time to move from theory to practice. In this guide, we'll walk you through the process of building your first Pareto Chart using FlowFuse, a low-code platform designed to streamline your industrial data workflows. You'll learn how to connect to your production data, process it to calculate frequencies and cumulative percentages, and then visualize it in a chart that empowers your team to make data-driven decisions.

![Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line.](./images/pareto-chart.png){data-zoomable}
_Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line._

## Setting Up the Data Flow in FlowFuse

Before we can create a Pareto Chart, we need to prepare the data that will feed into it. A Pareto Chart relies on two key components:

1. **Frequencies** – how often each issue, defect, or event occurs.
2. **Cumulative Percentages** – the running total that shows how much each issue contributes to the whole.

FlowFuse, built on Node-RED, makes this process straightforward by allowing you to visually connect data sources, transformations, and outputs without heavy coding.

### Step 1: Connect to Your Data Source

Most production environments collect machine or process data through [protocols](/node-red/protocol/) like **[OPC-UA](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/)**, **[MQTT](/blog/2024/06/how-to-use-mqtt-in-node-red/)**, or direct [database](/node-red/database/) queries. In FlowFuse:

1. Drag in the relevant input node (for example, an OPC-UA Read node).
2. Configure the connection details to point to your production system.
3. Test the connection to ensure live data is flowing in.

If you do not have access to a live PLC or factory dataset, you can start with a simple Inject node in FlowFuse to simulate production data.

### Step 2: Format and Aggregate the Data

Once the data is flowing, the next step is to **organize it into categories and count how often each category appears**. A Pareto Chart becomes useful when you can say, for example:

*“Machine Jam – 20 occurrences, Sensor Fault – 10 occurrences, Packaging Error – 5 occurrences.”*

In FlowFuse, you can achieve this in three steps:

1. **Format the data** – Use a JSON, CSV, or Change node if the incoming data needs to be cleaned or converted.

2. **Aggregate in a Function node** – Map each event to a label (such as a machine type, process step, or category) and keep a running count of how many times each one occurs.

   > 💡 **Tip:** You do not need to know JavaScript. Simply describe the outcome you want and provide a sample dataset—the **FlowFuse AI Assistant** will generate the Function node for you. [Learn more](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/).

3. **Sort the results** – Use a Sort node to arrange the categories so the most frequent ones appear first.

At the end of this step, your events should be transformed into a structure like this, which is the **required format for the Pareto Chart** in Step 3:

```json
[
  { "type": "Machine Jam", "count": 20 },
  { "type": "Power Outage", "count": 12 },
  { "type": "Sensor Fault", "count": 10 },
  { "type": "Packaging Error", "count": 5 },
  { "type": "Software Glitch", "count": 3 }
]
```

### Step 3: Visualizing the Chart

Before proceeding, ensure that you have installed the **`@flowfuse/node-red-dashboard`** node. This library provides the essential user interface components needed to create a real-time dashboard in Node-RED.

1. Open the **FlowFuse Editor** and click on the **hamburger menu** (☰) in the top-right corner.
2. Select **Manage palette**.
3. Navigate to the **Install** tab.
4. Search for **`@flowfuse/node-red-dashboard`** and click **Install**.

After installation, new UI nodes such as **UI Chart**, **UI Gauge**, and **UI Template** will appear in your palette. These nodes allow you to build interactive dashboards for industrial applications.

While the standard **UI Chart** node supports most common chart types, it does not provide a native **Pareto chart**. To achieve this, you can use the **UI Template** node, which enables you to embed custom code and create fully customized visualizations.

Below is a Pareto Chart implementation built using the **UI Template** node. You can copy the following flow and import it directly into your Node-RED editor to reuse it:

{% renderFlow 300 %}
[{"id":"fef40951758bc433","type":"ui-template","z":"fd8e1f4dd4a1bb0b","group":"5a4c5fe0a49298d4","page":"","ui":"","name":"Pareto Chart","order":1,"width":0,"height":0,"head":"","format":"<template>\n    <canvas ref=\"chart\" />\n</template>\n\n<script src=\"https://cdn.jsdelivr.net/npm/chart.js@4\"></script>\n<script>\n    export default {\n        mounted() {\n            // Register a listener for incoming data from Node-RED\n            this.$socket.on('msg-input:' + this.id, this.onInput);\n            \n            // Check every 100ms if Chart.js is loaded, then draw the chart\n            let interval = setInterval(() => {\n                if (window.Chart) {\n                    clearInterval(interval);\n                    this.draw();\n                }\n            }, 100);\n        },\n        methods: {\n            draw() {\n                // Get the canvas element to draw the chart on\n                const ctx = this.$refs.chart;\n                \n                // Initialize the chart with no data\n                const chart = new Chart(ctx, {\n                    type: 'bar', // This is the default type\n                    data: {\n                        labels: [],\n                        datasets: []\n                    },\n                    options: {\n                        responsive: true,\n                        interaction: {\n                            mode: 'index',\n                            intersect: false,\n                        },\n                        scales: {\n                            // Left Y-axis for the bars (counts)\n                            y: {\n                                type: 'linear',\n                                display: true,\n                                position: 'left',\n                                title: {\n                                    display: true,\n                                    text: 'Frequency'\n                                },\n                                beginAtZero: true\n                            },\n                            // Right Y-axis for the cumulative line (percentages)\n                            y1: {\n                                type: 'linear',\n                                display: true,\n                                position: 'right',\n                                title: {\n                                    display: true,\n                                    text: 'Cumulative %'\n                                },\n                                // Do not display grid lines for this axis\n                                grid: {\n                                    drawOnChartArea: false,\n                                },\n                                // Ensure the percentage scale goes to 100%\n                                max: 100\n                            }\n                        }\n                    }\n                });\n                \n                // Make the chart object accessible to other methods\n                this.chart = chart;\n            },\n            onInput(msg) {\n                // Get the raw data from the incoming message payload\n                const rawData = msg.payload;\n\n                // Sort the data in descending order based on the count/value\n                rawData.sort((a, b) => b.count - a.count);\n\n                let cumulativeSum = 0;\n                const total = rawData.reduce((sum, item) => sum + item.count, 0);\n\n                const labels = [];\n                const barData = [];\n                const lineData = [];\n\n                // Process the sorted data to build chart datasets\n                rawData.forEach(item => {\n                    labels.push(item.type);\n                    barData.push(item.count);\n\n                    // Calculate cumulative sum and percentage\n                    cumulativeSum += item.count;\n                    const cumulativePercentage = (cumulativeSum / total) * 100;\n                    lineData.push(cumulativePercentage);\n                });\n\n                // Update the chart's data and labels\n                this.chart.data.labels = labels;\n                this.chart.data.datasets = [\n                    {\n                        type: 'bar',\n                        label: 'Frequency',\n                        data: barData,\n                        backgroundColor: 'rgba(54, 162, 235, 0.6)',\n                        yAxisID: 'y'\n                    },\n                    {\n                        type: 'line',\n                        label: 'Cumulative Percentage',\n                        data: lineData,\n                        borderColor: 'rgb(255, 99, 132)',\n                        backgroundColor: 'rgba(255, 99, 132, 0.4)',\n                        fill: false,\n                        yAxisID: 'y1'\n                    }\n                ];\n\n                // Redraw the chart to show the new data\n                this.chart.update();\n            }\n        }\n    }\n</script>","storeOutMessages":true,"passthru":true,"resendOnRefresh":true,"templateScope":"local","className":"","x":610,"y":300,"wires":[[]]},{"id":"5a4c5fe0a49298d4","type":"ui-group","name":"Pareto Chart Group","page":"74853f680cb16c6c","width":6,"height":1,"order":1,"showTitle":true,"className":"","visible":"true","disabled":"false","groupType":"default"},{"id":"74853f680cb16c6c","type":"ui-page","name":"Home","ui":"d7fb2be4d7cb92b9","path":"/","icon":"home","layout":"grid","theme":"faac104f34962f3e","breakpoints":[{"name":"Default","px":"0","cols":"3"},{"name":"Tablet","px":"576","cols":"6"},{"name":"Small Desktop","px":"768","cols":"9"},{"name":"Desktop","px":"1024","cols":"12"}],"order":1,"className":"","visible":"true","disabled":"false"},{"id":"d7fb2be4d7cb92b9","type":"ui-base","name":"My Dashboard","path":"/dashboard","appIcon":"","includeClientData":true,"acceptsClientConfig":["ui-notification","ui-control"],"showPathInSidebar":false,"headerContent":"page","navigationStyle":"default","titleBarStyle":"default","showReconnectNotification":true,"notificationDisplayTime":1,"showDisconnectNotification":true,"allowInstall":true},{"id":"faac104f34962f3e","type":"ui-theme","name":"Default Theme","colors":{"surface":"#ffffff","primary":"#0094CE","bgPage":"#eeeeee","groupBg":"#ffffff","groupOutline":"#cccccc"},"sizes":{"density":"default","pagePadding":"12px","groupGap":"12px","groupBorderRadius":"4px","widgetGap":"12px"}},{"id":"9e34cc0cce27f687","type":"global-config","env":[],"modules":{"@flowfuse/node-red-dashboard":"1.26.0"}}]
{% endrenderFlow %}

The Pareto Chart you just imported expects input data in a **specific JSON format**, like this:

```json
[
  { "type": "Machine Jam", "count": 20 },
  { "type": "Power Outage", "count": 12 },
  { "type": "Sensor Fault", "count": 10 },
  { "type": "Packaging Error", "count": 5 },
  { "type": "Software Glitch", "count": 3 }
]
```

To connect your **real production data**:

1. Make sure your upstream data flow (from OPC-UA, MQTT, or database nodes) is cleaned and aggregated into this format.
2. Wire the output of that flow into the **Pareto Chart (UI Template)** node you imported and deploy the flow.
3. Each time new data is received, the chart will automatically re-render with the updated bars (frequency) and cumulative percentage line.

now open dashboad, to open it click on the open dashboard button which is on the top-right corner of the dashboard 2.0 sidebar once opened you will see the pareto chart with bars and cumlin line and 80% threshold

![Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line.](./images/pareto-chart.png){data-zoomable}
_Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line._

The chart displays the types of defects using bar charts. Observe the cumulative line and the 80% threshold: the point where they intersect marks the cutoff. The bars to the left of this intersection represent the vital few defects that contribute most to the total.

![Pareto Chart showing defect categories in manufacturing. The bars on the left, highlighted with a red box, represent the vital few defects](./images/pareto-chart-decoded.png){data-zoomable}
_Pareto Chart showing defect categories in manufacturing. The bars on the left, highlighted with a red box, represent the vital few defects_

## Takeaways

By following the steps outlined above, you have successfully built a **Pareto Chart in FlowFuse** that transforms raw production data into clear, actionable insights. This visualization allows manufacturing teams to quickly identify the **vital few** issues that have the greatest impact on operations, enabling more focused problem-solving and continuous improvement.

The combination of FlowFuse’s low-code interface and the flexibility of the FlowFuse Dashboard provides a powerful way to integrate, process, and visualize real-time industrial data without heavy coding. With this chart in place, you can now monitor trends, track recurring defects, and make data-driven decisions that improve efficiency and product quality.

Next steps: experiment with different datasets, integrate live data from your production floor, and explore other dashboard components to build a comprehensive industrial analytics solution. FlowFuse ensures you dont have to worry about deployment, scalablity as your need grows, security and lots of enterpise feature such team collaboraiton, snapshot, devops tool so you can buiodl and deploy to 1000s - 10000s of instances....

> Ready to see FlowFuse in action and learn how other leading manufacturers are using it? **[Book a demo today](/book-demo/)** and discover how your production data can reveal the **vital few** opportunities for improvement.