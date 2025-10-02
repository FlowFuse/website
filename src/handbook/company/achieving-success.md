---
navTitle: KPIs and OKRs
meta:
    title: KPIs and OKRs
---

# Achieving Success at FlowFuse

There's multiple ways to align a company around business goals, and at FlowFuse
we've identified two ways to help us shape this. The core metric are captured in
our [KPIs](#kpi). A KPI is a tool to identify problems and areas for improvement.

## KPI

A KPI, or Key Performance Indicator, is used as a heuristic metric for company-wide
success. At FlowFuse we're engaged in many initiatives to grow our offering and
assess product-market fit. 

We review KPIs every Tuesday as part of our recurring strategy meeting. 
At this point in time, we review the following KPIs:
* [Engineering Throughput](../development/project-management.md#engineering-throughput) 
* NR Active Instances
* MQLs
* CARR Projected (This Q)
* CARR Closed (This Q)
* CARR Goal (This Q)
* MRR

### Annual Recurring Revenue (ARR)

Now FlowFuse has a stable and maturing product, we're trying to verify product
market fit. The market verification requires sales, and ARR is a good metric to
track this.

Incidental revenue, that's not recurring, doesn't factor into this metric as it's
hard to build a business with products with unpredictable revenue streams. Furthermore,
it's usually harder to scale.

### Monthly Recurring Revenue (MRR) for Self-Service

Customers on self-service plans, which presently includes only FlowFuse Cloud (FFC) Starter and Pro tier, pay on a monthly basis. For these customers, we track Monthly Recurring Revenue (MRR). 

The MRR of both the Starter and Pro tier is equal to the sum of all monthly subscriptions for those two tiers, including metered add-ons for additional services like remote instances and larger instances. As fees are paid on a monthly basis, such revenue is considered to be recurring.

At any time, the current MRR of FFC Starter and Pro can be calculated by looking up the corresponding products in Stripe, and adding the sum of each individual product's MRR. 

Those products are:
- FlowFuse Cloud - Starter
- Starter - Small Instance Add-On
- Starter - Remote Instance Add-On
- FlowFuse Pro Platform - Cloud
- Pro - Small Instance Add-On
- Pro - Medium Instance Add-On
- Pro - Large Instance Add-On
- Pro - Remote Instance Add-On

The current sum of these subscriptions is found in the Billing Overview area in Stripe. The number there is considered to be the single source of truth for self-service revenue.
