---
title: "FlowFuse 2.20: FlowFuse Tables Database Offering, Smart Suggestions for Node-RED, More Powerful Instances, and Streamlined Applications Management"
subtitle: "Introducing FlowFuse Tables for data storage, Tables nodes for database querying, Smart Suggestions in the Node-RED editor, More Powerful Instances, Retrieval Augmented Generation Blueprint for building intelligent applications, and a redesigned Applications page for better workspace management."
description: "Introducing FlowFuse Tables for data storage, Tables nodes for dashboard visualization, Smart Suggestions in the Node-RED editor, More Powerful Starter tier, Retrieval Augmented Generation Blueprint for intelligent applications, and a redesigned Applications page for better workspace management."
date: 2025-07-31
authors: ["greg-stoutenburg"]
image: /blog/2025/07/images/release-2-20.png
tags:
   - flowfuse
   - news
   - releases
---

This release represents a major leap forward in FlowFuse's data management and AI capabilities, introducing our new FlowFuse Tables database feature, along with enhanced AI assistance features and a streamlined user interface. These improvements make FlowFuse a complete solution for building industrial applications, even while reducing development time.

<!--more-->

## FlowFuse Tables: Enterprise Database Storage

![Screenshot of FlowFuse Tables](./images/flowfuse-tables.png)
_Screenshot of FlowFuse Tables_

FlowFuse Tables is our in-app database feature that allows you to control your data right within the FlowFuse app. This comprehensive database offering comes with FlowFuse's enterprise-grade security and application management abilities and enables building critical systems like MES and ERP.

FlowFuse Tables eliminates the complexity of setting up and managing separate database infrastructure, allowing you to focus on building applications that drive operational efficiency. Along with Tables, we have shipped a Tables query node that is automatically aware of your Tables configuration.

## Smart Suggestions: AI-Powered Development Assistance

![Screenshot of Smart Suggestions](./images/smart-suggestions.png)
_Screenshot of Smart Suggestions in Action_

Development in Node-RED is now even faster with Smart Suggestions, an intelligent code completion and recommendation system that provides intelligent next-node recommendations based on your current flow context and node configurations. With Smart Suggestions, as you build in Node-RED, a constantly updating context menu provides recommendations automatically, which you can accept and have placed next in your flow, or revise as you move forward.

This work is enabled by a custom MCP server run within FlowFuse, which will further power additional development enhancements specific to application development in FlowFuse.

## More Powerful "Small" Instances

Based on user feedback and our own review of instance performance, we have increased the CPU and memory of "small" instances. This will have the immediate benefit of preventing slowdowns and loading issues for all Starter and Team customers.  

## Blueprint: Retrieval Augmented Generation

<p><video src="https://website-data.s3.eu-west-1.amazonaws.com/Blueprint+-+Open+AI+RAG.mp4" controls=""></video></p>

The new RAG (Retrieval Augmented Generation) Blueprint enables you to train your own LLM agents that combine your proprietary data with AI capabilities. This Blueprint provides two flows: one that adds text into Node-RED's flow context store and uses it to train an OpenAI agent, so you can query the content of the flow directly; and one flow that scrapes websites to train an OpenAI agent so that content can be queried and used as well.

The RAG Blueprint makes it easy to create intelligent agents that leverage your organizational knowledge without requiring deep AI expertise. See it here: [RAG Blueprint](https://flowfuse.com/blueprints/ai/rag-chat-agent/).

## Redesigned Applications Page

![Screenshot of New Applications Page](./07/images/applications.png)
_Screenshot of Redesigned Applications Page_

With the new FlowFuse Home page in place, we have greatly streamlined the Applications page. The new structure includes:

- **Streamlined Navigation**: Applications now appear under Instances in the navigation hierarchy
- **Focused Overview Page**: A clean interface that prioritizes recent team activity and recently deployed instances
- **Performance Optimizations**: Faster page loading and improved responsiveness
- **Reduced Cognitive Load**: Eliminated the overwhelming number of call-to-action buttons from the previous design

This redesign creates a more intuitive workflow that aligns with how teams actually use FlowFuse, reducing clicks and improving productivity.

## What's Next?

Our development roadmap continues to focus on AI integration and enterprise data management. Upcoming releases will expand FlowFuse Tables with additional database types and analytics capabilities, while our AI Assistant will gain more sophisticated workflow automation features.

We're also working on enhanced Blueprint offerings and deeper integration between our AI capabilities and industrial data sources, with several exciting announcements planned for the coming months!

## What else is new?

For a complete list of everything included in our 2.20 release, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases/).

Your feedback continues to be invaluable in shaping FlowFuse's development. We'd love to hear your thoughts on these new features and any suggestions for future improvements. Please share your experiences or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose).

Which of these new features are you most excited to try? Email me directly at greg@flowfuse.com - I'd love to hear from you!

## Try FlowFuse


### FlowFuse Cloud

The quickest way to get started is with FlowFuse Cloud.

[Get started for free]({{ site.appURL }}/account/create) and have your Node-RED instances running in the cloud within minutes.

### Self-Hosted

Get FlowFuse running locally in under 30 minutes using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).