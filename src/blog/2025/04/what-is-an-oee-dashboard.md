---
title: "What Is an OEE Dashboard? KPIs, Metrics, and How to Plan One"
subtitle: What OEE measures, how it is calculated, and how to decide what belongs on the dashboard before you build anything.
description: An OEE dashboard tracks availability, performance, and quality in one view. Learn how OEE is calculated, how to choose machine, line, or factory scope, and which KPIs and visualizations to plan for.
lastUpdated: 2026-08-07
date: 2025-04-01
usecase:
  - production-monitoring
authors: ["sumit-shinde"]
image: /blog/2025/04/images/building-oee-dashboard-part1.png
keywords: what is oee dashboard, oee kpi dashboard, oee dashboard, oee dashboard metrics, oee dashboard planning, flowfuse oee dashboard
tags:
   - flowfuse
meta:
  howto:
    name: "How to Plan an OEE Dashboard"
    description: "Decide what your OEE dashboard should show before you build it: pick the scope of the calculation, choose the metrics that make the score actionable, and plan a layout that surfaces problems at a glance."
    totalTime: "PT20M"
    tool:
      - "FlowFuse"
      - "FlowFuse Dashboard 2.0"
    steps:
      - name: "Define the scope of the OEE calculation"
        text: "Decide whether you are tracking OEE at machine, line, or factory level. Machine level is the fastest to start with because data collection begins at a single point, and you can scale up to line and factory level once the tracking is proven."
        url: "defining-the-scope-of-oee-calculation"
      - name: "Choose the key metrics to display"
        text: "Show availability, performance, quality, and the overall OEE score, then break OEE down by machine so underperformers are identifiable. Add recent downtime events, a downtime summary, good versus defective part counts, and a 30-day OEE trend."
        url: "key-metrics-and-insights"
      - name: "Plan the layout and visualizations"
        text: "Map each metric to a visual: gauges for the OEE overview, bar charts for downtime and production trends, tables for underperforming machines and recent downtime events, and line charts for efficiency over time."
        url: "dashboard-visualization--ui-design"
  faq:
  - question: "What is an OEE dashboard?"
    answer: "An OEE dashboard is a live view of Overall Equipment Effectiveness, the manufacturing KPI that multiplies availability, performance, and quality into a single score. Beyond the headline number, a useful OEE dashboard breaks the score down by machine and shows the downtime events and quality losses behind it, so teams can see not just that efficiency dropped but why."
  - question: "How is OEE calculated?"
    answer: "OEE (%) = Availability × Performance × Quality, where Availability is operating time divided by planned production time, Performance is actual output divided by maximum possible output, and Quality is good products divided by total products. A machine available 90% of the time, running at 95% of ideal speed, with 98% of products defect-free has an OEE of 0.90 × 0.95 × 0.98 = 83.7%."
  - question: "What is a good OEE score?"
    answer: "OEE is most useful as a trend against your own baseline rather than an absolute target, because what counts as good varies widely by industry, process, and how honestly the inputs are measured. The bigger risk is a score that looks healthy because planned downtime, changeovers, or minor stops were excluded from the calculation."
  - question: "Should I track OEE at machine, line, or factory level?"
    answer: "Start at machine level if you are building from scratch. Data collection begins at a single point, which reduces complexity and gets you to useful insight faster. Once machine-level tracking is established and you have identified inefficiencies, scale up to line level and then factory level. This series builds the dashboard at line level."
  - question: "What data do I need before I can build an OEE dashboard?"
    answer: "You need production records (timestamp, machine, line, shift, good units, defective units, total produced, target output, and operating time) and downtime records (start, end, duration, and whether the stoppage was planned or unplanned, ideally with a reason). If you are not capturing downtime with a reason attached yet, that is usually the first gap to close."
  - question: "Does OEE tell the whole story about equipment utilization?"
    answer: "No. OEE only judges equipment during scheduled production time, so it says nothing about hours the asset sits idle because of demand, staffing, or planning decisions. TEEP (Total Effective Equipment Performance) measures against all available calendar hours and exposes that hidden capacity."
tldr: "OEE multiplies availability, performance, and quality into one score for how effectively equipment runs. Before building a dashboard for it, decide the scope of the calculation (machine, line, or factory level), pick the metrics that make the score actionable, and plan a layout that surfaces problems at a glance."
---

OEE (Overall Equipment Effectiveness) is a KPI used in manufacturing to measure equipment performance based on availability, efficiency, and quality.

To effectively track this KPI, an OEE dashboard is built, but creating one can be complex, especially when consolidating data from various sources, with limited flexibility to integrate data across different systems. Additionally, building a customizable dashboard to suit specific needs adds another layer of complexity.

<!--more-->

With FlowFuse, it's possible to build a customized, OEE Dashboard, without writing any code, that can provide real-time production data based on your needs.

In this first part of a three-part series on building an OEE dashboard with FlowFuse, we explain the concept of OEE, how it is calculated, and outline the basic plan for the dashboard. In that plan, we cover the scope of OEE calculation, key metrics, visualization strategies, and the expected design of the dashboard.

Let’s get started!

## What is OEE?

Overall Equipment Effectiveness (OEE) is a crucial metric in manufacturing that assesses the productivity of equipment through three key components. These components evaluate the efficiency of equipment during the production process:

- **Availability:** How often does the equipment perform when needed?
- **Performance:** How much product does the equipment produce?
- **Production Quality:** How many high-quality products does the equipment produce?

The concept of OEE was introduced by Seiichi Nakajima in the 1960s as part of the [Total Productive Maintenance (TPM)](https://en.wikipedia.org/wiki/Total_productive_maintenance) initiative in Japan. Nakajima, an engineer at the Japan Institute of Plant Maintenance (JIPM), developed OEE to measure and enhance manufacturing productivity by identifying inefficiencies. This metric has since become widely adopted across the manufacturing industry. Today, OEE remains one of the most critical KPIs, with a really huge number of manufacturers considering it either important or very important for improving production efficiency and minimizing waste.

Measuring and improving OEE allows you to improve the utilization of existing machinery and improves operational efficiency. In many cases, improving OEE is the most strategic and cost-effective approach to increasing output.

Two caveats worth knowing before you build a dashboard around this number. First, OEE is easy to calculate in a way that flatters the plant - [OEE is misleading your factory: here's how to fix it](/blog/2026/05/fixing-oee-measurement-in-manufacturing/) covers the common measurement mistakes. Second, OEE only judges equipment during *scheduled* production time; [TEEP](/blog/2025/12/what-is-teep/) is the companion metric that accounts for the hours your assets sit idle by choice.

## How is OEE calculated?

OEE is calculated using the formula:

***OEE (%) = Availability × Performance × Quality***

Where:

- ***Availability (%) = (Operating Time ÷ Planned Production Time) × 100***
- ***Performance (%) = (Actual Output ÷ Maximum Possible Output) × 100***
- ***Quality (%) = (Good Products ÷ Total Products) × 100***

For example, if a machine is available 90% of the time, runs at 95% of its ideal speed, and 98% of products are defect-free, your OEE would be: 0.90 × 0.95 × 0.98 = 83.7%

## Planning Your OEE Dashboard

Now that we’ve covered what OEE is, let's focus on designing a basic plan that details what are the things that we should display on our dashboard. This should consist of three parts:

- **Scope of the Calculation:** How much data will be collected and analyzed?
- **Key Metrics:** Which metrics are the most important to track?
- **Layout & Visualisation:** What visual elements will be used to present the data? 

### Defining the Scope of OEE Calculation

The first and most important step before creating the dashboard is defining the scope of the OEE calculation. The tracking level can vary based on the focus on area. Scope can vary between:

- **Machine-level OEE:** Concentrates on individual machines, aiding in the identification of specific inefficiencies that impact performance.
- **Line-level OEE:** Assesses the entire production line, offering insights into the collaboration of multiple machines and pinpointing where bottlenecks arise.
- **Factory-level OEE:** Compiles data from various production lines to provide a comprehensive overview of overall efficiency and trends. 

For those building dashboards from scratch, it’s advisable to start at the machine level. This approach allows for faster time to value, as data collection can typically begin from a single point, reducing initial complexity. Once you’ve established the machine-level tracking and identified the inefficiencies, you can scale up to line-level and eventually factory-level OEE. Starting with machine-level data ensures that you can quickly uncover key insights and iteratively improve the scope and detail of your dashboard.

For this series, we will be building the dashboard at the line-level. In this case, we will collect data specific to a production line and perform the OEE calculation based on that data.

### Key Metrics and Insights

As mentioned earlier, the dashboard will calculate OEE for a production line, presenting key metrics such as availability, performance, quality, and the overall OEE score. While the overall OEE score provides a quick snapshot of performance, it does not offer enough detail to pinpoint specific areas that need improvement.

To address this, the dashboard will break down the OEE calculation at the machine level as well, enabling managers to identify underperforming machines that affect overall efficiency. Additionally, it will display recent downtime incidents, summarizing this data to uncover trends and identify potential root causes. This breakdown will provide a clearer understanding of where inefficiencies are occurring and allow for targeted corrective actions. The dashboard only displays downtime events, so something has to record them first. If you do not already capture stoppages with a reason attached, our [machine downtime logger](/blog/2026/07/build-downtime-logger/) covers building that: catching stop and start signals over MQTT and letting operators log why the line stopped.

The dashboard will also track production quality, displaying the number of acceptable versus defective parts to ensure a continued focus on quality control. Additionally, last 30-days OEE trend analysis will be included, offering insights into performance changes over time. This will help managers identify patterns, monitor improvements, and highlight areas requiring attention.

### Dashboard Visualization & UI Design

To ensure that insights are easy to understand and act upon, the dashboard will feature a well-structured visual layout that presents complex data in a clear and intuitive manner. After analyzing various OEE dashboards, I designed this one with a focus on clarity, usability, and actionable insights. It will include gauges for a quick OEE overview, bar charts to track downtime and production trends, tables to highlight underperforming machines and recent downtime events, and line charts to monitor efficiency patterns over time. This setup ensures managers can quickly spot problems, understand their causes, and take the necessary steps to optimize production.

The following dashboard image illustrates the intended design and key objectives of our OEE dashboard. Based on the plan outlined in this part, we will build the dashboard interface in the next part of the series using simulated production and downtime data.

Later, we will show how to connect real factory data, scale the dashboard across multiple production lines, and use it to enhance OEE effectively.

![OEE Dashboard](./images/oee-dashboard-1.png){data-zoomable}
_OEE Dashboard_

![OEE Dashboard](./images/oee-dashboard-2.png){data-zoomable}
_OEE Dashboard_

## What Next

With the plan settled, [Part 2 builds the manufacturing OEE dashboard](/blog/2025/04/build-manufacturing-oee-dashboard/): collecting the data, running the calculations, and assembling the widgets. [Part 3 then designs and scales it for factory screens](/blog/2025/04/design-and-scale-oee-dashboard/) - theming, responsive layout, multiple production lines, and your real database.

If you would rather skip the tutorials and dive straight in, [register for a FlowFuse account](https://app.flowfuse.com/account/create) and start from our ready-made [OEE Dashboard Blueprint](/blueprints/manufacturing/oee-dashboard/).

For a wider view of what else belongs on the shop floor, see our [manufacturing dashboard examples](/blog/2026/08/manufacturing-dashboard-examples/).
