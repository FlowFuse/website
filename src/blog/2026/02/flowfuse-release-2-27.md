---
title: "FlowFuse 2.27: Integrated Editor in Remote Instances & Context-Aware FlowFuse Expert"
subtitle: "A more consistent Node-RED experience across environments and deeper live context for FlowFuse Expert."
description: "FlowFuse 2.27 improves Remote workflows, simplifies rollback in developer mode, enhances FlowFuse Expert with live context, and introduces rolling restarts for HA Hosted instances."
date: 2026-02-12
authors: ["jamie-strusz"]
image:
tags:
   - flowfuse
   - news
   - releases
---

FlowFuse 2.27 removes friction from two places that matter most: working in Remote instances and debugging real flows.

It delivers a consistent editor experience across environments and gives FlowFuse Expert awareness of your live Node-RED context. The result is fewer manual steps and faster iteration on production systems.

<!--more-->

## A More Integrated Remote Development Workflow

Teams run real systems in Remote instances. Your tooling should feel consistent and safe while you actively edit flows.

With 2.27, FlowFuse brings the integrated editor to Remote instances. When you click **Open Editor**, you access the same tools and capabilities regardless of where your instance runs.

### In practice, this means:

- You no longer adapt your workflow based on deployment type  
- Your team moves between hosted and remote environments without losing tooling  
- You avoid confusion when debugging distributed systems  

### Also in 2.27: Restore snapshots without leaving developer mode

Previously, if you edited a Remote instance in developer mode and needed to roll back changes, you had to exit developer mode, restore a snapshot, and then re-enter developer mode.

With Device Agent v3.8.0, you can now manually restore snapshots without leaving developer mode. FlowFuse still blocks pipeline-driven snapshot deploys to protect in-progress work.

### In practice, this means:

- You recover faster during active debugging  
- You take fewer steps when testing changes remotely  
- You keep iterating without disrupting your workflow  

Together, these improvements make Remote development more predictable and less frustrating.

## FlowFuse Expert Now Uses Live Flow and Palette Context

FlowFuse Expert delivers the most value when it understands what runs in your environment.

In 2.27, FlowFuse deeply integrates the Expert into your Node-RED development workflow.

The Expert now:

- Understands your currently selected flows as troubleshooting context  
- Detects installed custom nodes automatically  
- Answers questions about your Node-RED palette, including versions, updates, and disabled nodes  
- Suggests node packages and links directly to manage them  
- Installs suggested nodes and imports flows with a single click  

### In practice, this means:

- You no longer copy JSON or manually describe your setup  
- You identify missing or outdated nodes faster  
- You troubleshoot flows with context tied to what you are editing  
- You move between chat, palette manager, and editor with fewer clicks  

FlowFuse Expert surfaces context and performs actions only when you initiate them. It does not modify your system autonomously.

## High Availability Improvements for Hosted Instances

FlowFuse now restarts HA-enabled Hosted Node-RED instances sequentially instead of in parallel.

When you trigger a restart, whether manually or through a pipeline deploy, FlowFuse restarts instances one at a time. This approach reduces downtime and in many cases eliminates it entirely.

Enterprise licensed self-hosted users and Enterprise tier users of FlowFuse Cloud can use this improvement.

## Why This Matters

Teams operate production systems in Remote instances. They iterate, test, debug, and recover in those environments.

FlowFuse 2.27 tightens that development loop and strengthens resilience for hosted environments. The editor stays consistent. Rollback happens quickly. The Expert understands what you are working on. HA deployments remain available during restarts.

Less friction. Faster feedback. More confidence when changing live systems.

## What else is new?

Review the complete list of changes in the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If this release improves your workflow, or if you see friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.27).

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.  
[Get started for free](https://flowfuse.com/get-started/) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
