---
title: "FlowFuse 2.20: Revolutionary FlowFuse Tables, Enhanced AI Assistance, and Streamlined Application Management"
subtitle: "Introducing FlowFuse Tables for data storage, Tables nodes for dashboard visualization, Smart Suggestions in the AI Assistant, RAG Blueprint for intelligent applications, and a redesigned Applications page for better workflow management."
description: "Introducing FlowFuse Tables for data storage, Tables nodes for dashboard visualization, Smart Suggestions in the AI Assistant, RAG Blueprint for intelligent applications, and a redesigned Applications page for better workflow management."
date: 2025-07-31
authors: ["greg-stoutenburg"]
image: /blog/2025/07/images/release-2-20.png
tags:
   - flowfuse
   - news
   - releases
---

This release represents a major leap forward in FlowFuse's data management and AI capabilities, introducing our revolutionary FlowFuse Tables database solution alongside enhanced AI assistance features and a streamlined user interface. These improvements significantly reduce development time while expanding the possibilities for industrial data applications.

<!--more-->

## FlowFuse Tables: Enterprise Database Storage

![Screenshot of FlowFuse Tables](./images/flowfuse-tables.png)
_Screenshot of FlowFuse Tables_

FlowFuse Tables transforms how you store and manage data within your industrial applications. This comprehensive database offering provides both historian/timeseries and structured SQL database capabilities specifically designed for critical systems like UNS, MES, SCADA, and ERP.

Key features include:

- **Flexible Database Options**: Choose between timeseries databases for historian data or SQL databases for structured data
- **Industrial Application Focus**: Optimized for manufacturing and industrial use cases
- **Seamless Integration**: Native integration with your existing FlowFuse instances and Node-RED flows
- **Enterprise Reliability**: Built for mission-critical applications with robust performance and security

FlowFuse Tables eliminates the complexity of setting up and managing separate database infrastructure, allowing you to focus on building applications that drive operational efficiency.

## Tables Nodes: Advanced Data Visualization

![Screenshot of Tables Nodes in Dashboard](./images/tables-nodes.png)
_Screenshot of Tables Nodes_

Building on our Dashboard 2.0 foundation, the new Tables nodes provide powerful data visualization capabilities with enhanced interactivity and customization options. These nodes offer:

- **Dynamic Color Coding**: Automatically color-code table cells based on thresholds and values
- **Interactive Data Selection**: Click-to-select functionality with both single-row and multi-row checkbox selection
- **Responsive Design**: Automatically adapts to mobile and narrow layouts with card views
- **Advanced Cell Types**: Support for text, progress bars, sparkline charts, and custom content
- **Built-in Search**: Integrated search functionality for large datasets

The Tables nodes make it easier than ever to create professional data displays that help operators quickly identify trends, anomalies, and actionable insights.

## Smart Suggestions: AI-Powered Development Assistance

![Screenshot of Smart Suggestions](./images/smart-suggestions.png)
_Screenshot of Smart Suggestions in Action_

Our FlowFuse Assistant now includes Smart Suggestions, an intelligent code completion and recommendation system that accelerates Node-RED development. This enhancement provides:

- **Context-Aware Suggestions**: Intelligent recommendations based on your current flow context and node configurations
- **Multi-Language Support**: Generate code suggestions in JavaScript, Python, and other supported languages
- **Pattern Recognition**: Learn from your coding patterns to provide increasingly relevant suggestions
- **Error Prevention**: Proactive suggestions to avoid common coding mistakes and security vulnerabilities

Smart Suggestions reduces development time by anticipating your needs and providing relevant code snippets, function templates, and configuration recommendations as you build your flows.

## RAG Blueprint: Intelligent Knowledge Applications

![Screenshot of RAG Blueprint](./images/rag-blueprint.png)
_Screenshot of RAG Blueprint Implementation_

The new RAG (Retrieval-Augmented Generation) Blueprint enables you to quickly build intelligent applications that combine your proprietary data with AI capabilities. This blueprint provides:

- **Pre-built AI Workflows**: Ready-to-use flows for document ingestion, embedding generation, and intelligent query processing
- **Flexible Data Integration**: Connect to various data sources including databases, file systems, and APIs
- **Customizable AI Models**: Support for multiple LLM providers and model configurations
- **Industrial Use Cases**: Optimized for manufacturing documentation, maintenance procedures, and operational knowledge bases

The RAG Blueprint democratizes AI implementation, making it easy to create intelligent applications that leverage your organizational knowledge without requiring deep AI expertise.

## Redesigned Applications Page

![Screenshot of New Applications Page](./images/applications-page.png)
_Screenshot of Redesigned Applications Page_

Based on user feedback showing that nearly 50% of users navigate directly to Instance and Device pages, we've completely redesigned the Applications experience. The new structure includes:

- **Streamlined Navigation**: Applications now appear under Instances in the navigation hierarchy
- **Focused Overview Page**: A clean interface that prioritizes recent team activity and recently deployed instances
- **Quick Access Favorites**: Star your most-used instances for immediate access
- **Performance Optimizations**: Faster page loading and improved responsiveness
- **Reduced Cognitive Load**: Eliminated the overwhelming number of call-to-action buttons from the previous design

This redesign creates a more intuitive workflow that aligns with how teams actually use FlowFuse, reducing clicks and improving productivity.

## What's Next?

Our development roadmap continues to focus on AI integration and enterprise data management. Upcoming releases will expand FlowFuse Tables with additional database types and advanced analytics capabilities, while our AI Assistant will gain more sophisticated workflow automation features.

We're also working on enhanced Blueprint offerings and deeper integration between our AI capabilities and industrial data sources, with several exciting announcements planned for the coming months.

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