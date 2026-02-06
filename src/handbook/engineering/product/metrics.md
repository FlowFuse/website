---
navTitle: Metrics
---

# Product Metrics

Our ongoing mission is to enable data-driven decision-making, facilitating strategic product development and enhancing user experience. To achieve this, we focus on specific product metrics that illuminate user behavior, feature adoption, and overall product performance. 

This handbook page provides an overview of the metrics we concentrate on, and how they contribute to our overall [product strategy](./strategy.md).

## Principles

#### Data-driven decision making 
Aligned with our value of [Results](../../company/values.md#📈-results), we are staunch advocates for data-driven decision-making. Instead of relying on assumptions or rushing decisions, we let data guide our actions to drive results. This doesn't mean we become paralyzed in the absence of data. Our Iterative Improvement and Bias for Action values remind us that it's crucial to keep moving forward, even when perfect data isn't available. We balance careful analysis with swift action, using the best information available to us at any given moment.

#### Continuous learning and improvement
Consistent with [Iterative Improvement](../../company/values.md#🔁-iterative-improvement), we believe even the smallest changes can contribute to our growth. We're committed to consistently reassessing, learning, and evolving based on the insights our data provides.

## Leading Product Metric

The cornerstone of our department's evaluation is encapsulated in the Leading Product Metric, namely the Weighted Customer Index (WCI). This metric serves as our North Star, guiding strategic decisions and operational improvements. The WCI is calculated to reflect the value and distribution of our customer base across different product tiers.

The formula for calculating the WCI is as follows:

```Weighted Customer Index = Number of Starter Tier customers + (Number of Teams Tier customers * 4) + (Number of Enterprise Tier customers * 8)```

This metric is designed to reflect the relative value of different customer segments to the organization, with higher tiers of customers being weighted more heavily due to their greater impact on revenue and strategic value.

The metric can be found [on this dashboard](https://new-product-metrics.flowfuse.cloud/dashboard/product).

## Available Metrics

Each metric we track provides unique insights into different facets of our product. These metrics validate or disprove product hypotheses, guide product development, and assist in informed decision-making regarding feature improvements. The ultimate goal is always to create a product that fulfills the needs and preferences of our users. Here is a list of the current key metrics we track:

1. **Applications with Multiple Instances**: Applications were designed to group Node-RED instances for enhanced organization, thus serving as a foundational element for numerous other features.

2. **High Availability Adoption Rate**: This metric quantifies the proportion of active instances with activated [High Availability (HA)](/docs/user/high-availability/). It's calculated by dividing the number of HA instances by the total number of active instances.

3. **Overall Pipeline Adoption Rate**: This metric illustrates the degree of [pipeline](/docs/user/devops-pipelines/) adoption relative to applications, calculated by dividing the total number of pipelines by the total number of applications.

4. **Snapshot Adoption Rate**: This rate evaluates the prevalence of active instances using one or more [snapshots](/docs/user/snapshots/). It's determined by dividing the number of active instances with one or more snapshots by the total number of active instances.

5. **Device Adoption Rate**: This metric demonstrates the rate at which teams adopt [devices](/docs/device-agent/introduction/), determined by dividing the number of teams with one or more devices by the total number of teams.

6. **Weekly Active Users**: This fundamental metric provides insight into the overall usage and engagement with our product on a weekly basis.

7. **Trial Effectiveness**: Percentage of users who started a free trial on FlowFuse Cloud and provided credit card details during or after the trial.

8. **Teams Tier Overview**: Number of teams in each tier of FlowFuse Cloud.

9. **Churn**: Percentage of deleted teams on FlowFuse Cloud for each tier in the last 14 days.

All metrics can be found [here](https://product-metrics.flowforge.cloud/ui/#!/0?socketid=eqAkzz9g64b4fhnSAAGx).