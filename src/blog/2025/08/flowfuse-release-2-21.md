---
title: "FlowFuse 2.21: Enhanced AI Assistant & Snapshot Management"
subtitle: "Introducing Assistant functionality in Tables nodes, Snapshot Summarization for better version control, and SubFlow Version Control for modular development workflows."
description: "Introducing Assistant functionality in Tables nodes, Snapshot Summarization for better version control, and SubFlow Version Control for modular development workflows."
date: 2025-08-28
authors: ["greg-stoutenberg"]
image: /blog/2025/08/images/release-2-21.png
tags:
   - flowfuse
   - news
   - releases
---

This release builds on FlowFuse's AI capabilities and development workflow improvements, introducing enhanced Assistant functionality for Tables, intelligent snapshot management, and advanced SubFlow version control. These features continue to streamline industrial application development while providing better project organization and collaboration tools.

<!--more-->

## Assistant Functionality in Tables Nodes

Building on our successful Tables launch in 2.20, we've now integrated AI assistance directly into Tables nodes, making database operations more intuitive and efficient. The FlowFuse Assistant can now help you:

- Generate optimized SQL queries for your Tables
- Suggest database schema improvements
- Provide intelligent data validation and transformation suggestions
- Assist with complex joins and aggregations

This integration makes working with FlowFuse Tables even more accessible, allowing developers to leverage AI guidance for database operations without requiring deep SQL expertise.

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

Our roadmap continues to focus on AI-enhanced development experiences and enterprise workflow optimization. Upcoming releases will expand AI assistance capabilities across more node types while introducing advanced team collaboration features.

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