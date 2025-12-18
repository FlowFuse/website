---
title: "FlowFuse 2.25: FlowFuse Expert in Open-Source Node-RED, Interact with MCP Resources in FlowFuse, Improved Update Scheduling, and lots of UI improvements!"
subtitle: "FlowFuse 2.25: FlowFuse Expert in Open-Source Node-RED, Interact with MCP Resources in FlowFuse, Improved Update Scheduling, and lots of UI improvements!"
description: "FlowFuse 2.25: FlowFuse Expert in Open-Source Node-RED, Interact with MCP Resources in FlowFuse, Improved Update Scheduling, and lots of UI improvements!"
date: 2025-12-18
authors: ["greg-stoutenburg"]
image: (./images/release-2-25.png)
tags:
   - flowfuse
   - news
   - releases
---

This release comes with lots of exciting improvements and one very big announcement: the FlowFuse Expert is now available for free, in open-source Node-RED!

<!--more-->

## FlowFuse Expert in Open-Source Node-RED

_[FlowFuse Expert UI]_

We're very excited to announce that all Node-RED users can now use the FlowFuse Expert! The Expert will help you create Function nodes, Template nodes, and explain highlighted flows using the Flow Explainer. 

Now everyone using Node-RED, whether they are a FlowFuse user or not, can make use of this technology and speed the development of their Node-RED workflows.

## Interact with MCP Resources in FlowFuse Expert
![Image of MCP in FlowFuse](./images/mcp-in-flowfuse.png)
_[FlowFuse Expert Interface]_
You can now select MCP resources and interact with them directly in the FlowFuse Expert. 

Previously, when setting up an MCP server in FlowFuse, you would first designate your tools, resources, and servers in side of Node-RED using the MCP nodes. Then, to interact with them, you needed a separate tool like VSCode to query and perform operations.

We want you to be able to access your resources as quickly and easily as possible, and reduce the manual overhead involved in managing and querying your MCP resources.

We've greatly simplified this process. You can now set everything up in Node-RED and then use the FlowFuse expert to designate your tools and interact with them, without ever leaving FlowFuse. This will speed you up and simplify your operations.

## Improved Update Scheduling
![Image of Scheduled Updates UI](./images/updates.png)
_[Scheduled Updates Interface]_

Scheduling instance updates and restarts is now simpler and more intuitive.

You can now designate that your instances will restart whether or not there is an update available, which adds to your ability to manage your instances and schedule maintenance windows.

## Lots of UI Updates

_[Scheduled Updates Interface]_

# Sneak Peek

FlowFuse MCP nodes allow you to surface information to an LLM to create custom AI agents. We're working on enabling FlowFuse to identify anything you have surfaced to an MCP, paving the way for creating massively powerful agents, enabled by everything you've connected to FlowFuse.



## What else is new?

For a complete list of everything included in our 2.25 release, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases/tag/v2.25.0).

Your feedback continues to be invaluable in shaping FlowFuse's development. We'd love to hear your thoughts on these new features and any suggestions for future improvements. Please share your experiences or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose).

Which of these new features are you most excited to try? Reach out on GitHub or social media!

## Try FlowFuse

### FlowFuse Cloud

The quickest way to get started is with FlowFuse Cloud.

[Get started for free]({{ site.appURL }}/account/create) and have your Node-RED instances running in the cloud within minutes.

### Self-Hosted

Get FlowFuse running locally in under 30 minutes using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
