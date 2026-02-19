---
title: "FlowFuse 2.21: AI-Assisted SQL, Low-Code Custom Nodes, and Remote Instance Performance Insights"
subtitle: "Introducing FlowFuse Expert functionality in Tables to do natural language queries of your databases, Remote Instance observability to improve performance monitoring, Team Broker nodes to make MQTT even easier to work with, a new Energy Monitoring Blueprint, Annual Billing for Self-Service, AI-Generated Snapshot Summaries, and new subflow version control to provide low-code development of custom nodes."
description: "Introducing FlowFuse Expert functionality in Tables to do natural language queries of your databases, Remote Instance observability to improve performance monitoring, Team Broker nodes to make MQTT even easier to work with, a new Energy Monitoring Blueprint, Annual Billing for Self-Service, AI-Generated Snapshot Summaries, and new subflow version control to provide low-code development of custom nodes"
date: 2025-08-28
authors: ["greg-stoutenburg"]
image: /blog/2025/08/images/release-2.21.png
tags:
   - flowfuse
   - news
   - releases
---

It's been a very busy release and we have many great new features available on FlowFuse that will provide a better Node-RED development experience, makes it easier to develop and interface with your Unified Namespace, provide more insight into Remote Instance performance and new low-code tooling for building your own custom Node-RED nodes.

<!--more-->

## Assistant Functionality in Tables Nodes
![Gif showing FlowFuse Expert in Tables](./images/tables.gif)
_FlowFuse Expert in Tables recognizes table schema and turns natural language prompts into SQL queries_

Building on our successful [Tables launch in 2.20](/blog/2025/07/flowfuse-release-2-20/), we've now integrated AI assistance directly into our Tables nodes. This lowers the barrier for working with databases, reducing the dependency on SQL knowledge. With this, you can type a natural language prompt that will be interpreted in light of the structure of tables in your FlowFuse Tables, which enables an AI-supported autocomplete and assists with writing SQL specifically for connected FlowFuse tables. 

This integration makes working with FlowFuse Tables even more accessible, allowing developers to leverage AI guidance for database operations without requiring deep SQL expertise.

## Summarize Snapshots

![Screenshot showing snapshot summarization feature](./images/snapshot.png){data-zoomable}
_New snapshot summarization provides clear, AI-generated descriptions of changes between versions_

Managing instance versions becomes more intuitive with our new Snapshot Summary feature. When creating snapshots, FlowFuse can now automatically generate intelligent summaries that describes the changes introduced. This saves you time, and makes it much easier for teams to understand project evolution and quickly identify the right version for deployment or rollback scenarios.

Available for Pro and Enterprise.

## Team Broker Nodes

Easily publish and subscribe to topics in the FlowFuse Broker using new Team Broker nodes. Send a message from a Node-RED flow directly into the FlowFuse Broker. These new nodes extend the Unified Namespace capabilities of FlowFuse and provide:

- **Publish Node**: Send messages to any topic on your team broker with configurable retention settings
- **Subscribe Node**: Receive messages from specified topics with flexible output formatting
- **Auto-Configuration**: Nodes automatically use your team's broker settings
- **TypedInput Support**: Dynamic topic configuration using message properties or static values

These nodes make working between Node-RED and the FlowFuse Broker much simpler and easier.

## Low-Code Custom Node Development

[Subflows](https://nodered.org/docs/user-guide/editor/workspace/subflows) are a great way in Node-RED to build custom nodes, all within the Node-RED Editor, and without having to write any code. The limitation of Subflows though is that they're constrained to just one Instance of Node-RED, they cannot be shared across your whole team. That is no longer the case.

We've now introduced the Subflow exporter which provides a low-code and intuitive way to create and manage custom nodes. 

From the sidebar in your Node-RED Editor, you can now very easily create and manage custom nodes, without writing code or having to create and manage your own version control infrastructure. Simply create a flow in Node-RED, convert it to a subflow, fill out the package details for your new custom node and hit "Publish". Now your new node is available for all to install across your FlowFuse team.

Available for Enterprise customers only.

## Remote Instance Observability
![Screenshot of remote instance monitoring interface](./images/remote.png)
_Remote Instance monitoring in the Performance view provides usage insights_

Following the success of our [Hosted Instance performance monitoring](/blog/2025/06/flowfuse-release-2-18/#enhanced-observability-for-better-performance-management), we've extended observability capabilities to include Remote Instances too. This extension gives insight into CPU usage and memory usage for your remote instances.

This enhancement is particularly valuable for industrial deployments where remote instances run critical processes across multiple locations.

## Blueprint: Energy Monitoring Dashboard
![Screenshot of energy monitoring dashboard](./images/energy-monitoring.png)
_Energy Monitoring Dashboard provides realtime usage and cost insights_

This Blueprint provides a real-time energy monitoring dashboard template for industrial facilities. It features live consumption tracking, cost analytics, spike detection, and historical trending with an integrated energy rate display. Perfect for demonstrating IoT energy management capabilities, and with Node-RED, it is fully customizable.

## Annual Billing Option

![Screenshot of annual billing selection interface](./images/annual-billing.png){data-zoomable}
_New annual billing options provide cost savings and simplified budget planning_

FlowFuse Cloud customers on Starter and Pro plans can now choose to subscribe on a yearly basis and receive a free month for doing so. This allows teams to save money compared to a monthly subscription and lock in current pricing.

## What's Next?

For the next release, we're working on features that will enable you to connect your own AI models with Node-RED and FlowFuse, paving the way to create AI-supported automations in your applications.  We're also planning on pushing a lot of performance updates to Dashboard, and to make it even easier to build your own applications on FlowFuse. We're excited about it -- stay tuned!

## What else is new?

For a complete list of everything included in our 2.21 release, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases/tag/v2.21.0).

Your feedback continues to be invaluable in shaping FlowFuse's development. We'd love to hear your thoughts on these new features and any suggestions for future improvements. Please share your experiences or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose).

Which of these new features are you most excited to try? Email me directly at greg@flowfuse.com - I'd love to hear from you!

## Try FlowFuse


### FlowFuse Cloud

The quickest way to get started is with FlowFuse Cloud.

[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in the cloud within minutes.

### Self-Hosted

Get FlowFuse running locally in under 30 minutes using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).