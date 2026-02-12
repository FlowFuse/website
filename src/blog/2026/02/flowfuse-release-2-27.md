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

It delivers a consistent editor experience across environments and makes FlowFuse Expert aware of your live Node-RED context. The result is fewer manual steps and faster iteration on production systems.

<!--more-->

## A Smoother Remote Development Workflow

Remote instances are where real systems run. The tooling needs to feel consistent and safe when you are actively editing flows.

With 2.27, the integrated editor experience is now available in Remote instances. Clicking **Open Editor** provides the same tools and FlowFuse capabilities regardless of where your instance runs.

### In practice, this means:

- You no longer adapt your workflow based on deployment type  
- Teams can move between hosted and remote environments without losing tooling  
- Feature parity reduces confusion when debugging distributed systems  

### Also in 2.27: Restore snapshots without leaving developer mode

Previously, if you were editing a Remote instance in developer mode and needed to roll back changes, you had to exit developer mode, restore a snapshot, and then re-enter developer mode.

With Device Agent v3.8.0, snapshots can now be manually restored without leaving developer mode. Pipeline protections remain in place, but manual rollback is simpler and more direct.

### In practice, this means:

- Faster recovery during active debugging  
- Fewer steps when testing changes remotely  
- Less disruption while iterating on live systems  

Together, these changes make Remote development more predictable and less frustrating.

## FlowFuse Expert Now Uses Live Flow and Palette Context

FlowFuse Expert becomes more useful when it understands what is actually running in your environment.

In 2.27, the Expert is deeply integrated into your Node-RED workflow.

It can now:

- Understand your currently selected flows as troubleshooting context  
- Detect installed custom nodes automatically  
- Answer questions about your Node-RED palette, including versions, updates, and disabled nodes  
- Suggest node packages and link directly to manage them  
- Install suggested nodes and import flows with a single click  

### In practice, this means:

- No more copying JSON or manually describing your setup  
- Faster identification of missing or outdated nodes  
- Smarter troubleshooting tied to the flows you are actively editing  
- Fewer clicks between chat, palette manager, and editor  

FlowFuse Expert surfaces context and performs actions only when initiated by the user. It does not autonomously modify your system.

## High Availability Improvements for Hosted Instances

For Hosted Node-RED instances with High Availability enabled, restarts now happen sequentially rather than in parallel.

Any action that triggers a restart, whether manual or pipeline-driven, will restart instances one at a time. This significantly reduces downtime and in many cases eliminates it entirely.

This improvement is available to Enterprise licensed self-hosted users and Enterprise tier users of FlowFuse Cloud.

## Why This Matters

Most production systems run in Remote instances. That is where teams iterate, test, debug, and recover.

FlowFuse 2.27 tightens that development loop and improves resilience for hosted environments. The editor is consistent. Rollback is simpler. The Expert understands what you are working on. HA deployments are more resilient.

Less friction. Faster feedback. More confidence when changing live systems.

## What else is new?

For a complete list of everything included in FlowFuse 2.27, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.27) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.  
[Get started for free](https://flowfuse.com/get-started/) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
