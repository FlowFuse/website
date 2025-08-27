---
title: "FlowFuse 2.21: Enhanced Enterprise Features & Remote Instance Observability"
subtitle: "Introducing Assistant functionality in Tables nodes, Remote Instance Observability, Streamlined SSO Authentication, Annual Billing Options, Snapshot Summarization, and SubFlow Version Control."
description: "Introducing Assistant functionality in Tables nodes, Remote Instance Observability, Streamlined SSO Authentication, Annual Billing Options, Snapshot Summarization, and SubFlow Version Control."
date: 2025-08-28
authors: ["greg-stoutenberg"]
image: /blog/2025/08/images/release-2-21.png
tags:
   - flowfuse
   - news
   - releases
---

This release focuses on enterprise capabilities and operational visibility, introducing enhanced AI assistance for Tables, comprehensive remote instance monitoring, streamlined authentication workflows, and flexible billing options. These improvements make FlowFuse more accessible for enterprise adoption while providing better insights into distributed deployments.

<!--more-->

## Assistant Functionality in Tables Nodes

Building on our successful Tables launch in 2.20, we've now integrated AI assistance directly into Tables nodes, making database operations more intuitive and efficient. The FlowFuse Assistant can now help you:

- Generate optimized SQL queries for your Tables
- Suggest database schema improvements
- Provide intelligent data validation and transformation suggestions
- Assist with complex joins and aggregations

This integration makes working with FlowFuse Tables even more accessible, allowing developers to leverage AI guidance for database operations without requiring deep SQL expertise.

## Remote Instance Observability

![Screenshot of remote instance performance monitoring](./images/remote-instance-observability.png){data-zoomable}
_New performance monitoring capabilities for remote instances provide comprehensive operational insights_

Following the success of our hosted instance performance monitoring, we've extended observability capabilities to remote instances. This highly requested feature provides:

- **Resource Monitoring**: Track CPU, memory, and disk usage across all your remote instances
- **Performance Analytics**: Historical performance data and trend analysis
- **Health Dashboards**: Centralized visibility into the operational status of distributed deployments
- **Alert Integration**: Proactive notifications for performance issues or resource constraints

This enhancement is particularly valuable for industrial deployments where remote instances run critical processes across multiple locations.

## Streamlined SSO Authentication

For organizations with single sign-on requirements, we've simplified the authentication experience. When only one SSO provider is configured, users are now automatically redirected to the SSO login, eliminating unnecessary clicks and reducing friction in the authentication workflow.

This improvement streamlines user onboarding and daily access for enterprise teams using SSO exclusively.

## Annual Billing Options

![Screenshot of annual billing selection interface](./images/annual-billing.png){data-zoomable}
_New annual billing options provide cost savings and simplified budget planning_

Enterprise customers can now choose annual billing with significant cost savings. The annual billing option includes:

- **Cost Savings**: Reduced pricing compared to monthly subscriptions
- **Budget Planning**: Simplified yearly budget allocation
- **Administrative Efficiency**: Reduced billing frequency and paperwork
- **Account Management**: Streamlined renewal processes

This option is particularly beneficial for organizations looking to optimize their FlowFuse investment while simplifying budget management.

## Summarize Snapshots

![Screenshot showing snapshot summarization feature](./images/snapshot-summary.png){data-zoomable}
_New snapshot summarization provides clear, AI-generated descriptions of changes between versions_

Managing project versions becomes significantly easier with our new Snapshot Summarization feature. When creating snapshots, FlowFuse now automatically generates intelligent summaries that highlight:

- Key changes made since the last snapshot
- New nodes and configurations added
- Flow logic modifications
- Configuration updates

This makes it much easier for teams to understand project evolution and quickly identify the right version for deployment or rollback scenarios.

## SubFlow Version Control

![Screenshot of SubFlow version control interface](./images/subflow-version-control.png){data-zoomable}
_SubFlow version control enables modular development with proper change tracking_

SubFlows now have comprehensive version control capabilities, enabling teams to manage reusable components across multiple applications. This feature includes:

- **Independent Versioning**: Track changes to SubFlows separately from parent applications
- **Dependency Management**: Clear visibility into which applications use specific SubFlow versions
- **Collaborative Development**: Teams can work on SubFlows independently and merge changes systematically
- **Reusability**: Share and maintain common logic patterns across multiple projects

This enhancement is particularly valuable for enterprise teams building complex industrial applications with shared components.

## What's Next?

Our roadmap continues to focus on enterprise-ready features and operational excellence. Upcoming releases will expand our observability capabilities with advanced analytics and alerting, while further enhancing AI assistance across the platform.

We're also working on enhanced Blueprint offerings that leverage the new SubFlow version control capabilities, making it easier to share and maintain reusable patterns across the FlowFuse community.

## What else is new?

For a complete list of everything included in our 2.21 release, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases/tag/v2.21.0).

Your feedback continues to be invaluable in shaping FlowFuse's development. We'd love to hear your thoughts on these new features and any suggestions for future improvements. Please share your experiences or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose).

Which of these new features are you most excited to try? Email me directly at greg@flowfuse.com - I'd love to hear from you!

## Try FlowFuse


### FlowFuse Cloud

The quickest way to get started is with FlowFuse Cloud.

[Get started for free]({{ site.appURL }}/account/create) and have your Node-RED instances running in the cloud within minutes.

### Self-Hosted

Get FlowFuse running locally in under 30 minutes using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).