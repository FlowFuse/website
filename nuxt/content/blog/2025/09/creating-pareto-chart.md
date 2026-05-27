---
title: How to Create a Pareto Chart for Manufacturing Data
navTitle: How to Create a Pareto Chart for Manufacturing Data
---

In the [first part of this series](/blog/2025/08/pareto-chart-manufacturing-guide/), we explored the foundational principles of the Pareto Chart, understanding how this powerful tool can help manufacturing teams quickly identify and focus on the "vital few" problems that have the biggest impact. We learned that by combining a bar graph and a cumulative percentage line, a Pareto Chart provides a clear visual roadmap to prioritize quality issues, equipment downtime, or other key performance indicators.

<!--more-->

Now, it's time to move from theory to practice. This guide will show you how to create a Pareto Chart using modern industrial data tools. You will learn how to connect to your production data, calculate frequencies and format data, and visualize the results in a chart that helps your team make data-driven decisions.

![Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line.](/blog/2025/09/images/pareto-chart.png){data-zoomable}
_Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line._

## Getting Started

To create a Pareto Chart for manufacturing data, you'll need access to industrial data platforms that can connect to your production systems. This guide uses FlowFuse, a low-code platform that simplifies industrial data workflows. If you don't have an account yet, you can [sign up for a 14-day free trial](https://app.flowfuse.com/).

### Step 1: Connect to Your Data Source

The first step to create a Pareto Chart is accessing the data you want to analyze. In industrial environments, machine or process data is commonly collected via [industrial protocols](/node-red/protocol/) such as [OPC-UA](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/), [MQTT](/blog/2024/06/how-to-use-mqtt-in-node-red/), or direct [database](/node-red/database/) queries. Modern industrial platforms support nearly all industrial protocols and databases, making it easy to connect to your existing systems.

To connect your data:

1. Drag the appropriate input node into your flow (e.g., an OPC-UA Read node).
2. Enter the connection details for your industrial system.
3. Test the connection to confirm that live data is flowing correctly.

If a live PLC or factory dataset is not available, you can use a simple Inject node to simulate production data and learn how to make a Pareto Chart with sample data.

### Step 2: Format and Aggregate the Data

Once data is flowing, the next step to create a Pareto Chart is to **organize it into types or categories and count how often each occurs**. A Pareto Chart is most useful when you can clearly see, for example, defect data like:

*"Scratch on Surface – 20 occurrences, Misaligned Parts – 10 occurrences, Loose Screws – 5 occurrences."*

When you make a Pareto Chart, this can be done in three steps:

1. **Format the data** – Use a JSON, CSV, or Change node to clean or convert incoming data if needed.

2. **Aggregate in a Function node** – Map each data point to a type (e.g., machine type, process step, defect category) and keep a running count of occurrences.

   > **Tip:** You do not need to know JavaScript. Simply describe the desired outcome and provide a sample dataset—the **FlowFuse Expert** will generate the Function node for you. [Learn more](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/).

3. **Sort the results** – Use a Sort node to arrange categories so the most frequent appear first.

At the end of this step, your data should be transformed into a structure like this, which is the **required format to create a Pareto Chart** in Step 3:

```json
[
  { "type": "Paint Defect", "count": 8 },
  { "type": "Faulty Electronics", "count": 6 },
  { "type": "Scratch on Surface", "count": 5 },
  { "type": "Misaligned Parts", "count": 3 },
  { "type": "Loose Screws", "count": 2 },
  { "type": "Cracked Housing", "count": 1 }
]
```

### Step 3: Visualizing the Chart

Before you can create a Pareto Chart visualization, ensure that you have installed the **`@flowfuse/node-red-dashboard`** node. This library provides the essential user interface components needed to create a real-time dashboard.

1. Open the Editor and click on the **hamburger menu** (☰) in the top-right corner.
2. Select **Manage palette**.
3. Navigate to the **Install** tab.
4. Search for **`@flowfuse/node-red-dashboard`** and click **Install**.

After installation, new UI nodes—such as **UI Chart**, **UI Gauge**, **UI Template**, and others—will appear in your palette. These nodes provide the building blocks to make a Pareto Chart and other interactive dashboard components for industrial applications.

While the standard **UI Chart** node supports most common chart types, it does not include a native **Pareto chart**. To create a Pareto Chart with advanced features, the **UI Template** node can be used, allowing you to embed custom components for fully tailored visualizations.

Below is an example showing how to create a Pareto Chart using the **UI Template** node. You can copy and import this flow directly into your editor to start using it immediately.



::render-flow
---
height: 300
flow: "W3siaWQiOiJmZWY0MDk1MTc1OGJjNDMzIiwidHlwZSI6InVpLXRlbXBsYXRlIiwieiI6ImZkOGUxZjRkZDRhMWJiMGIiLCJncm91cCI6IjVhNGM1ZmUwYTQ5Mjk4ZDQiLCJwYWdlIjoiIiwidWkiOiIiLCJuYW1lIjoiUGFyZXRvIENoYXJ0Iiwib3JkZXIiOjEsIndpZHRoIjowLCJoZWlnaHQiOjAsImhlYWQiOiIiLCJmb3JtYXQiOiI8dGVtcGxhdGU+XG4gICAgPGNhbnZhcyByZWY9XCJjaGFydFwiIC8+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vY2hhcnQuanNANFwiPjwvc2NyaXB0PlxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB0aGlzLmRyYXcoKTtcbiAgICAgICAgICAgIC8vIFJlZ2lzdGVyIGEgbGlzdGVuZXIgZm9yIGluY29taW5nIGRhdGEgZnJvbSBOb2RlLVJFRFxuICAgICAgICAgICAgdGhpcy4kc29ja2V0Lm9uKCdtc2ctaW5wdXQ6JyArIHRoaXMuaWQsIHRoaXMub25JbnB1dCk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGRyYXcoKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBjYW52YXMgZWxlbWVudCB0byBkcmF3IHRoZSBjaGFydCBvblxuICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IHRoaXMuJHJlZnMuY2hhcnQ7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgY2hhcnQgd2l0aCBubyBkYXRhXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhcnQgPSBuZXcgQ2hhcnQoY3R4LCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdiYXInLCAvLyBUaGlzIGlzIHRoZSBkZWZhdWx0IHR5cGVcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzOiBbXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJhY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVyc2VjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGVmdCBZLWF4aXMgZm9yIHRoZSBiYXJzIChjb3VudHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRnJlcXVlbmN5J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbkF0WmVybzogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmlnaHQgWS1heGlzIGZvciB0aGUgY3VtdWxhdGl2ZSBsaW5lIChwZXJjZW50YWdlcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5MToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyaWdodCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0N1bXVsYXRpdmUgJSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gbm90IGRpc3BsYXkgZ3JpZCBsaW5lcyBmb3IgdGhpcyBheGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdPbkNoYXJ0QXJlYTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuc3VyZSB0aGUgcGVyY2VudGFnZSBzY2FsZSBnb2VzIHRvIDEwMCVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4OiAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBNYWtlIHRoZSBjaGFydCBvYmplY3QgYWNjZXNzaWJsZSB0byBvdGhlciBtZXRob2RzXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydCA9IGNoYXJ0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uSW5wdXQobXNnKSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHRoZSByYXcgZGF0YSBmcm9tIHRoZSBpbmNvbWluZyBtZXNzYWdlIHBheWxvYWRcbiAgICAgICAgICAgICAgICBjb25zdCByYXdEYXRhID0gbXNnLnBheWxvYWQ7XG5cbiAgICAgICAgICAgICAgICBsZXQgY3VtdWxhdGl2ZVN1bSA9IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSByYXdEYXRhLnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyBpdGVtLmNvdW50LCAwKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVscyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJhckRhdGEgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lRGF0YSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgLy8gUHJvY2VzcyB0aGUgZGF0YSB0byBidWlsZCBjaGFydCBkYXRhc2V0c1xuICAgICAgICAgICAgICAgIHJhd0RhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWxzLnB1c2goaXRlbS50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgYmFyRGF0YS5wdXNoKGl0ZW0uY291bnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBjdW11bGF0aXZlIHN1bSBhbmQgcGVyY2VudGFnZVxuICAgICAgICAgICAgICAgICAgICBjdW11bGF0aXZlU3VtICs9IGl0ZW0uY291bnQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1bXVsYXRpdmVQZXJjZW50YWdlID0gKGN1bXVsYXRpdmVTdW0gLyB0b3RhbCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVEYXRhLnB1c2goY3VtdWxhdGl2ZVBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBjaGFydCdzIGRhdGEgYW5kIGxhYmVsc1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnQuZGF0YS5sYWJlbHMgPSBsYWJlbHM7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydC5kYXRhLmRhdGFzZXRzID0gW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnRnJlcXVlbmN5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGJhckRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDU0LCAxNjIsIDIzNSwgMC42KScsXG4gICAgICAgICAgICAgICAgICAgICAgICB5QXhpc0lEOiAneSdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdDdW11bGF0aXZlIFBlcmNlbnRhZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbGluZURhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJ3JnYigyNTUsIDk5LCAxMzIpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCA5OSwgMTMyLCAwLjQpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNJRDogJ3kxJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAvLyAtLSBTVEFSVCBPRiBNT0RJRklDQVRJT05TIC0tXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnODAlIFRocmVzaG9sZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBsYWJlbHMubWFwKCgpID0+IDgwKSwgLy8gQ3JlYXRlcyBhIGhvcml6b250YWwgbGluZSBhdCA4MFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICdyZ2JhKDc1LCAxOTIsIDE5MiwgMSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJEYXNoOiBbNSwgNV0sIC8vIFRoaXMgcHJvcGVydHkgY3JlYXRlcyBhIGRvdHRlZCBsaW5lXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiAwLCAvLyBIaWRlcyBkYXRhIHBvaW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNJRDogJ3kxJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIC8vIFJlZHJhdyB0aGUgY2hhcnQgdG8gc2hvdyB0aGUgbmV3IGRhdGFcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0LnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+Iiwic3RvcmVPdXRNZXNzYWdlcyI6dHJ1ZSwicGFzc3RocnUiOnRydWUsInJlc2VuZE9uUmVmcmVzaCI6dHJ1ZSwidGVtcGxhdGVTY29wZSI6ImxvY2FsIiwiY2xhc3NOYW1lIjoiIiwieCI6MTAzMCwieSI6MjYwLCJ3aXJlcyI6W1tdXX0seyJpZCI6IjVhNGM1ZmUwYTQ5Mjk4ZDQiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiUGFyZXRvIENoYXJ0IEdyb3VwIiwicGFnZSI6Ijc0ODUzZjY4MGNiMTZjNmMiLCJ3aWR0aCI6IjEyIiwiaGVpZ2h0IjoxLCJvcmRlciI6MSwic2hvd1RpdGxlIjpmYWxzZSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIiwiZ3JvdXBUeXBlIjoiZGVmYXVsdCJ9LHsiaWQiOiI3NDg1M2Y2ODBjYjE2YzZjIiwidHlwZSI6InVpLXBhZ2UiLCJuYW1lIjoiSG9tZSIsInVpIjoiZDdmYjJiZTRkN2NiOTJiOSIsInBhdGgiOiIvIiwiaWNvbiI6ImhvbWUiLCJsYXlvdXQiOiJncmlkIiwidGhlbWUiOiJmYWFjMTA0ZjM0OTYyZjNlIiwiYnJlYWtwb2ludHMiOlt7Im5hbWUiOiJEZWZhdWx0IiwicHgiOiIwIiwiY29scyI6IjMifSx7Im5hbWUiOiJUYWJsZXQiLCJweCI6IjU3NiIsImNvbHMiOiI2In0seyJuYW1lIjoiU21hbGwgRGVza3RvcCIsInB4IjoiNzY4IiwiY29scyI6IjkifSx7Im5hbWUiOiJEZXNrdG9wIiwicHgiOiIxMDI0IiwiY29scyI6IjEyIn1dLCJvcmRlciI6MSwiY2xhc3NOYW1lIjoiIiwidmlzaWJsZSI6InRydWUiLCJkaXNhYmxlZCI6ImZhbHNlIn0seyJpZCI6ImQ3ZmIyYmU0ZDdjYjkyYjkiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJNeSBEYXNoYm9hcmQiLCJwYXRoIjoiL2Rhc2hib2FyZCIsImFwcEljb24iOiIiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1ub3RpZmljYXRpb24iLCJ1aS1jb250cm9sIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwiaGVhZGVyQ29udGVudCI6InBhZ2UiLCJuYXZpZ2F0aW9uU3R5bGUiOiJkZWZhdWx0IiwidGl0bGVCYXJTdHlsZSI6ImRlZmF1bHQiLCJzaG93UmVjb25uZWN0Tm90aWZpY2F0aW9uIjp0cnVlLCJub3RpZmljYXRpb25EaXNwbGF5VGltZSI6MSwic2hvd0Rpc2Nvbm5lY3ROb3RpZmljYXRpb24iOnRydWUsImFsbG93SW5zdGFsbCI6dHJ1ZX0seyJpZCI6ImZhYWMxMDRmMzQ5NjJmM2UiLCJ0eXBlIjoidWktdGhlbWUiLCJuYW1lIjoiRGVmYXVsdCBUaGVtZSIsImNvbG9ycyI6eyJzdXJmYWNlIjoiIzhlYzhmMyIsInByaW1hcnkiOiIjMDA5NGNlIiwiYmdQYWdlIjoiI2VlZWVlZSIsImdyb3VwQmciOiIjZmZmZmZmIiwiZ3JvdXBPdXRsaW5lIjoiI2NjY2NjYyJ9LCJzaXplcyI6eyJkZW5zaXR5IjoiZGVmYXVsdCIsInBhZ2VQYWRkaW5nIjoiMTJweCIsImdyb3VwR2FwIjoiMTJweCIsImdyb3VwQm9yZGVyUmFkaXVzIjoiNHB4Iiwid2lkZ2V0R2FwIjoiMTJweCJ9fSx7ImlkIjoiMmViZGIwNDJiOGQ3MmZkNSIsInR5cGUiOiJnbG9iYWwtY29uZmlnIiwiZW52IjpbXSwibW9kdWxlcyI6eyJAZmxvd2Z1c2Uvbm9kZS1yZWQtZGFzaGJvYXJkIjoiMS4yNi4wIn19XQ=="
---
::



### Connecting Your Real Production Data

1. Ensure your upstream data flow (from OPC-UA, MQTT, or database nodes) is cleaned and aggregated into the JSON format described in Step 2.
2. Connect the output of that flow to the **Pareto Chart (UI Template)** node you imported, then deploy the flow.
3. Whenever new data arrives, the chart will automatically update, displaying both the bars (frequency) and the cumulative percentage line.

To view the dashboard, click the **Open Dashboard** button in the top-right corner of the Dashboard 2.0 sidebar. Your newly created Pareto Chart will appear, complete with bars, the cumulative line, and the 80% threshold.

![Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line.](/blog/2025/09/images/pareto-chart.png){data-zoomable}
_Pareto Chart showing defect categories in manufacturing with bars for scratches, cracks, color issues, and other defects, alongside a cumulative percentage line._

The chart visualizes defect types using bars. The cumulative line and the 80% threshold indicate the cutoff point: bars to the left of this intersection represent the vital few defects that contribute most to the total—and these are the areas where you should focus your improvement efforts.

![Pareto Chart showing defect categories in manufacturing. The bars on the left, highlighted with a red box, represent the vital few defects](/blog/2025/09/images/pareto-chart-decoded.png){data-zoomable}
_Pareto Chart showing defect categories in manufacturing. The bars on the left, highlighted with a red box, represent the vital few defects_

## Takeaways

By following the steps outlined above, you have successfully learned how to create a Pareto Chart that transforms raw production data into clear, actionable insights. This visualization helps manufacturing teams focus their limited time and resources on the problems that matter most.

### Why This Matters for Your Business

The real power when you create a Pareto Chart isn't just in identifying problems—it's in changing how your team makes decisions. Instead of trying to fix everything at once or relying on gut feelings, you now have **data-driven clarity** on where to focus. This translates into:

* **Less firefighting, more strategic improvement:** Teams can stop chasing every small issue and concentrate on the critical few that truly impact production.
* **Faster problem resolution:** When everyone can see which issues dominate, alignment happens quickly and solutions get implemented faster.
* **Better conversations with management:** Visual data makes it easier to justify resource allocation and demonstrate the impact of improvement initiatives.
* **Continuous learning:** As the top issues are resolved, new patterns emerge, creating a cycle of ongoing improvement.

### Building on Your Success

With your ability to create a Pareto Chart established, you've built a foundation for **data-driven decision-making**. The same approach to make a Pareto Chart can be applied to other areas of operations:

* Track equipment downtime reasons to optimize maintenance schedules.
* Analyze customer feedback to prioritize product improvements.
* Monitor supplier performance to strengthen the supply chain.
* Identify training gaps by analyzing operator errors.

FowFuse makes it simple to replicate this success across your organization. The same flow can be deployed to multiple lines, shared with other teams, and adapted for different use cases—while maintaining security and control through enterprise-grade features.

Ready to see how FlowFuse can help your team make better decisions with production data? [Book a demo](/book-demo/) to discover how manufacturers are using visual analytics to drive continuous improvement and operational excellence.