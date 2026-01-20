---
title: "MCP and Custom AI Models on FlowFuse!"
subtitle: "Create your own AI agents and deploy trained models in Node-RED"
description: "Create your own AI agents and deploy trained models in Node-RED"
date: 2025-10-13
authors: ["greg-stoutenburg"]
image: /blog/2025/10/images/ai-on-flowfuse.png
keywords: 
tags:
  - flowfuse
  - node-red
  - post
  - AI
---

We have a VERY exciting announcement today: you can now build an MCP server and upload custom-trained AI models to FlowFuse! 
<!--more-->
## AI on FlowFuse
Node-RED is already the most capable and flexible low-code development environment out there. FlowFuse makes it secure, robust, and scalable.

As of today, you can now use FlowFuse to create your own MCP server and use custom-trained AI models that you've built for any application. 

Build an MCP server to create an AI agent that will do whatever you've design it to do. And add a training model that you've built using your own training data, so data processing works exactly the way you want it to.

## Model Context Protocol
LLMs were trained by scraping data from the internet to build data models that can complete a task (like answering a question or writing a blog article -- but not this one!) given some input prompt. When you rely on an LLM to answer questions that are very general or perform operations that are rather straightforward, LLMs can generally do so with ease.

However, if you want to do something more sophisticated, or create an AI agent that will rely on specific data, that data needs to be presented to the AI somehow. MCP is what enables that.

Instead of relying just on LLMs trained from scraping the entire internet, the new MCP nodes enable you to create your own MCP servers, so you can present information to an AI tool, putting much more power and control in your hands as a developer.

You are now able to create your own, custom AI agent using FlowFuse. 

## Custom Data Models
When creating an AI agent or getting AI assistance with some task, one component is the data that is surfaced to the model. That part is handled by MCP. Another part is how the model interacts with that data. That part is handled with our new AI nodes.

Instead of relying on a standard LLM, even one that has been set up to connect with an MCP server, it is possible to train the model itself. The new AI nodes allow you to train a custom model, put it in [ONNX](https://onnx.ai) format, and connect it to Node-RED, where it can be deployed to run any operation you wish with your new, personally-trained AI.

## The Sky Is the Limit
The flexibility of Node-RED, the reliability of FlowFuse, and the customizability enabled by these MCP and AI nodes means you can build just about any AI application you wish!

And this week, we're going to tell you all about it. Stay tuned for a demo or three, some tutorials, and overall plenty of instructional content goodness that will demonstrate the power that is now available with these AI releases!

While we're at it, we are also going to unveil a new feature right on our home page: a trained FlowFuse Expert (AI) that will teach you how to build applications in FlowFuse and Node-RED!

## Try it Now
Ready to try out these new nodes? If you're new to FlowFuse, [create a trial team]({{ site.onboardingURL }}). Then, head to Manage Palette (in the hamburger menu on the right side of the Node-RED editor), click Install, and in the dropdown menu, choose FlowFuse Nodes to see the catalog of nodes that are exclusive to FlowFuse customers. From here, you can install both the MCP nodes and AI ONNX nodes.

If you're an existing FlowFuse user, begin by restarting the Node-RED instance where you want to use the nodes, then follow the same instructions as above.
