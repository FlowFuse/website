---
navTitle: Product Growth
---

# Product Growth

It is important to track the growth and adoption of our product. Having our finger on the pulse of this data is critical to success, and driving conversation about product priorities and long term direction.

We track two major datasets on the adoption of FlowFuse and it's features:

- **FlowFuse Installations:** This is telemetry that is emitted by each instance of FlowFuse, including our own FlowFuse Cloud, and then any self-hosted installations users are running in their own infrastructure.
- **FlowFuse Cloud Meta Snapshots:** For FlowFuse Cloud specifically, we then get daily "Meta Snapshots". These snapshots capture usage data within FlowFuse Cloud of major features. The data gathered is controlled in a Node-RED flow and can be updated to icnlude more metrics as we need them, and as new features are released.

## FlowFuse Installations

The [Telemetry Data Dashboard](https://product-metrics.flowfuse.cloud/dashboard/telemetry) displays insights into how many instances of FlowFuse are running (with telemetry enabled), and then a sum of the number of Hosted and Remote Instances ech of these instances run. We can see breakdowns by the driver these instances are using, which operating system they're running on and the number of platforms added/removed on a given day.

## FlowFuse Cloud Meta Snapshots

Daily, we take snapshots that detail usage data for FlowFuse Cloud, tracking elements like the number of teams and Instances running on FlowFuse Cloud. This data allows us to gain insights into the usage of our product and how it is being used, and monitor the health of our product over time.

This is the data that is used to populate the Product Metrics Dashboard. The data collected can be modified in the [Main Hosted Instance](https://main.flowforge.cloud) in the FlowFuse team on FlowFuse Cloud.

### Generating Snapshots

These snapshots are generated inside a Node-RED flow running on FlowFuse Cloud. If you wat to update the data captured in a Snapshot, it can be added to the [Main Hosted Instance](https://main.flowforge.cloud) and when deployed, the relevant data will be collected and added to the daily meta snapshots from the next day.

For major feature releases, e.g. MQTT Team Broker or FlowFuse Tables, it is useful to add usage/adoption data to the daily meta snapshots. This data is important to track the adoption of new features and how they are being used, especially in the earlier stages as this will impact follow-on iterations, and short-term product planning.

### Product Metrics Dashboard

We have a [dashboard](https://product-metrics.flowfuse.cloud/dashboard) that shows the summaries of the Installations and FlowFuse Cloud Meta Snapshots datasets. This is all running in a single Node-RED instance, and uses FlowFuse Dashboard for the reporting.

## Week on Week Growth

An important metric for product adoption is week-on-week growth. This is a simple metric that shows the percentage tracks growth of adoption or provisioning of resources (e.g. number of hosted instances, number of teams).

We have a [week-on-week growth calculator](https://product-metrics.flowfuse.cloud/dashboard/growth-calculator) as part of the Product Metrics Dashboard that you can use.

### Example Growth

To give some context, if we assume a metric to be at "100" as of January 1st, after 12 months, with the following, sustained, week-on-week growths, the metric would be as follows:

- 10%: 14,204 (~142x)
- 7%: 3,372 (~34x)
- 6%: 2,070 (~20x)
- 5%: 1,265 (~13x)
- 4%: 769 (~7.7x)
- 3%: 465 (~4.6x)
- 2%: 280 (~2.8x)
- 1%: 167 (~1.6x)
- 0.5%: 132 (~1.3x)