---
title: "Designing Flexible Cron Schedules in FlowFuse with Node-RED"
subtitle: Design Flexible Schedules for Seamless Automation in Node-RED
description:
date: 2025-04-09
authors: ["sumit-shinde"]
image: 
keywords: 
tags:
   - flowfuse
---

Automation isn’t just about reacting to events—sometimes it’s about doing things at the right time. In Node-RED, the Inject node is great for triggering flows at set intervals, but it’s limited when you need more control. Cron jobs offer precise scheduling, letting you set up custom times for your tasks. In this guide, we'll show you how to create flexible cron schedules in FlowFuse with Node-RED, so your flows run exactly when needed.

<!--more-->

## What is a Cron Job?

Let’s kick things off by demystifying what a cron job actually is. You’ve probably heard the term before, and while it might sound complex, it’s really just a way of setting up tasks to run at specific times — automatically.

Think of it this way: with Node-RED’s Inject node, you can trigger tasks at intervals like every 5 seconds, every minute, or even on specific weekdays at set times (for example, every Monday, Tuesday, or Sunday). But when you use cron jobs, you gain much more control over the timing.

For example, you can trigger a task every two hours, only on weekdays, but skip national holidays. Or run a job every 5 minutes during business hours, but only in the first week of each quarter. You can even schedule flows to run at 6:45 AM on the last Friday of every month, or at 11:59 PM on the last day of the year — these kinds of patterns are either extremely complex or completely unachievable using just the Inject node.

The magic of cron lies in its ability to express complex time logic in a simple, compact format — perfect for orchestrating automation schedules that go well beyond what the basic Inject node can offer.

## Prerequisites

Before we start building flexible cron schedules in FlowFuse, make sure you have the following in place:

- **Running FlowFuse Instance:** Make sure you have a FlowFuse instance set up and running. If you don't have an account, check out our [free trial](https://app.flowfuse.com/account/create) and learn how to create an instance in FlowFuse.
- **node-red-contrib-cron-plus:** Ensure you have [node-red-contrib-cron-plus](https://flows.nodered.org/node/node-red-contrib-cron-plus) installed.

## Building Scheduled Automations with cron-plus

Now that you understand what cron jobs are and why they’re useful, let’s dive into building them inside Node-RED using the cron-plus node. When working with cron-plus, you’ll encounter different types of schedules—each suited for different needs—and varying levels of complexity depending on what you're trying to automate.

At the most basic level, you can define static schedules using familiar cron expressions (like "every 5 minutes" or "at 8:00 AM daily"). As you progress, you’ll learn to use solar event triggers (like sunrise or sunset), create date-specific schedules, and even manage schedules dynamically at runtime—adding, removing, or modifying them based on incoming data or user interactions.

In this section, we’ll walk through each of these layers step by step, starting with the simplest use cases and gradually moving into more powerful and flexible scheduling techniques—giving you full control over when and how your flows run.

### Static Schedules — The Starting Point

The most straightforward way to use cron-plus is to define static schedules using cron expressions. These are pre-configured inside the node and run on a fixed pattern—perfect for predictable, repetitive tasks. For example we need to Trigger a flow every day at 8:00 AM.

1. Drag and drop the cron-plus node onto your Node-RED workspace.

2. Double-click on the cron-plus node to open its configuration panel.

3. If no schedules are configured yet, click the +add button to add a new schedule. Enter the following:
   - Schedule Name: e.g., "Daily 8 AM"
   - Topic: Enter a topic to send with the message when triggered, such as "daily-trigger".
   - Payload: Choose what payload you want to send when the cron job triggers, such as "Triggering Flow at 8 AM".

4. Select Cron from the Schedule Type dropdown.

5. In the Schedule field, enter the following cron expression to run the task at 8:00 AM every day:

   0 8 * * *

6. Connect the cron-plus node to other nodes (e.g., a debug node or an action node) to specify the actions when the flow is triggered.

7. Click Deploy to save and activate your flow. The cron-plus node will now trigger your flow every day at 8:00 AM.







