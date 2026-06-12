---
title: "Metrics"
---

# Product Metrics

Our ongoing mission is to enable data-driven decision-making, facilitating strategic product development and enhancing user experience. To achieve this, we focus on specific product metrics that illuminate user behavior, feature adoption, and overall product performance. 

This handbook page provides an overview of the metrics we concentrate on, and how they contribute to our overall product strategy. Metrics are how we measure whether our [Objectives](./methodology.md) are moving: an Objective is a change in customer behaviour, and these metrics are the evidence that the change is happening.

## Principles

#### Data-driven decision making 
Aligned with our value of [Results](../../company/values#results), we are staunch advocates for data-driven decision-making. Instead of relying on assumptions or rushing decisions, we let data guide our actions to drive results. This doesn't mean we become paralyzed in the absence of data. Our Iterative Improvement and Bias for Action values remind us that it's crucial to keep moving forward, even when perfect data isn't available. We balance careful analysis with swift action, using the best information available to us at any given moment.

#### Continuous learning and improvement
Consistent with [Iterative Improvement](../../company/values#iterative-improvement), we believe even the smallest changes can contribute to our growth. We're committed to consistently reassessing, learning, and evolving based on the insights our data provides.

## Business Health: Weighted Customer Index (WCI)

The **Weighted Customer Index (WCI)** is our top-line measure of business health: the value and distribution of our paying customer base across tiers.

```Weighted Customer Index = Number of Starter Tier customers + (Number of Teams Tier customers * 4) + (Number of Enterprise Tier customers * 8)```

Higher tiers are weighted more heavily because of their greater impact on revenue and strategic value.

WCI is a **lagging business metric, not a product outcome.** Per our [methodology](./methodology.md), the outcomes we steer by are changes in customer behaviour; WCI is the business result those behaviours are meant to produce. We track it to confirm that our product work is translating into business value, but an Objective is never "increase WCI" directly: it is the customer-behaviour change that moves it.

WCI can be found on the [product metrics dashboard](https://new-product-metrics.flowfuse.cloud/dashboard/product).

## Available Metrics

Alongside WCI, we track product metrics that show how customers actually use the platform. These are closer to the customer-behaviour [Objectives](./methodology.md) we target, and act as the leading signals that an objective is moving before WCI catches up. Each validates or disproves a product hypothesis and guides where we invest.

The set below is reviewed against the [product metrics dashboard](https://new-product-metrics.flowfuse.cloud/dashboard/product); validate the tier names and the list against current data before relying on them:

1. **Applications with Multiple Instances**: Applications were designed to group Node-RED instances for enhanced organization, thus serving as a foundational element for numerous other features.

2. **High Availability Adoption Rate**: This metric quantifies the proportion of active instances with activated [High Availability (HA)](/docs/user/high-availability/). It's calculated by dividing the number of HA instances by the total number of active instances.

3. **Overall Pipeline Adoption Rate**: This metric illustrates the degree of [pipeline](/docs/user/devops-pipelines/) adoption relative to applications, calculated by dividing the total number of pipelines by the total number of applications.

4. **Snapshot Adoption Rate**: This rate evaluates the prevalence of active instances using one or more [snapshots](/docs/user/snapshots/). It's determined by dividing the number of active instances with one or more snapshots by the total number of active instances.

5. **Device Adoption Rate**: This metric demonstrates the rate at which teams adopt [devices](/docs/device-agent/introduction/), determined by dividing the number of teams with one or more devices by the total number of teams.

6. **Weekly Active Users**: This fundamental metric provides insight into the overall usage and engagement with our product on a weekly basis.

7. **Trial Effectiveness**: Percentage of users who started a free trial on FlowFuse Cloud and provided credit card details during or after the trial.

8. **Teams Tier Overview**: Number of teams in each tier of FlowFuse Cloud.

9. **Churn**: Percentage of deleted teams on FlowFuse Cloud for each tier in the last 14 days.