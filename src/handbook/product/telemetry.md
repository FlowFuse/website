---
navTitle: Product Growth
---

# Product Growth

It is important to track the growth and adoption of our product. Having our finger on the pulse of this data is critical to success, and driving conversation about product priorities and long term direction.

## Product Metrics Dashboard

We have a [dashboard](https://product-metrics.flowfuse.cloud/dashboard) that shows the summaries of the snapshot data. This is all running in a single Node-RED instance, and uses FlowFuse Dashboard for the reporting.

## Telemetry Snapshots

Daily, we take snapshots that detail usage data for FlowFuse Cloud, tracking elements like the number of teams and Instances running on FlowFuse Cloud. This data allows us to gain insights into the usage of our product and how it is being used, and monitor the health of our product over time.

This is the data that is used to populate the Product Metrics Dashboard. The data collected can be modified in the [Main](https://main.flowfuse.cloud) Hosted Instance in the FlowFuse team on FlowFuse Cloud.

## Feature Adoption

For major feature releases, e.g. MQTT Team Broker or FlowFuse Tables, it is useful to add usage/adoption data to the daily meta snapshots. This data is important to track the adoption of new features and how they are being used, especially in the earlier stages as this will impact follow-on iterations, and short-term product planning.

A new section can be added to the [Main](https://main.flowfuse.cloud) Hosted Instance and when deployed, the relevant data will be collected and added to the daily meta snapshots from the next day.

## Week on Week Growth

An important metric for product adoption is week-on-week growth. This is a simple metric that shows the percentage tracks growth of adoption or provisioning of resources (e.g. number of hosted instances, number of teams).

We have a [week-on-week growth calculator](https://product-metrics.flowfuse.cloud/dashboard/growth-calculator) as part of the Product Metrics Dashboard that you can use.

Given our current size, growth should be assessed as:

- 6+% week-on-week is exceptional
- 4-6% week-on-week is strong
- 2-4% week-on-week is sustainable
- 1-2% is okay but needs improvement
- 1% or less is not acceptable

### Example Growth

To give some examples, if we assume a metric to be at "100" as of January 1st, after 12 months, with the following, sustained, week-on-week growths, the metric would be as follows:

- 10%: 14,204 (~142x)
- 7%: 3,372 (~34x)
- 6%: 2,070 (~20x)
- 5%: 1,265 (~13x)
- 4%: 769 (~7.7x)
- 3%: 465 (~4.6x)
- 2%: 280 (~2.8x)
- 1%: 167 (~1.6x)
- 0.5%: 132 (~1.3x)