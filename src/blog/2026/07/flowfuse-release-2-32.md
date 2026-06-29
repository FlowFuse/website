---
title: "FlowFuse 2.32: Introducing Plan Mode for FlowFuse Expert & Device Agent 4"
subtitle: "FlowFuse Expert now plans how to carry out your request and asks before it guesses, and the Device Agent reaches version 4."
description: "FlowFuse 2.32 introduces Plan Mode, so FlowFuse Expert plans how to carry out your request and asks clarifying questions when it needs them. It also runs Insights on self-hosted instances, ships Device Agent 4, and adds new certified nodes."
date: 2026-07-02
authors: ["jamie-strusz"]
image: /blog/2026/07/images/flowfuse-release-2-32TODO.png
tags:
   - flowfuse
   - news
   - releases
tldr: "FlowFuse Expert now plans how to accomplish your request and asks clarifying questions when a request is unclear, rather than guessing. Self-hosted users can run Insights on their own instances, the Device Agent reaches version 4, and new certified nodes join the catalog."
---

FlowFuse 2.32 introduces Plan Mode. FlowFuse Expert now plans how to carry out your request and asks before it guesses. It also runs Insights on self-hosted instances, ships a new major version of the Device Agent, and grows the certified node catalog.

Here is what shipped. 🚀

<!--more-->

## FlowFuse Expert Plans Before It Acts

FlowFuse Expert could answer your question, but it could not work through a task for you. And when a request was ambiguous, it guessed, which left you spotting and correcting the wrong answer after the fact.

### Plan Mode

FlowFuse Expert now plans before it acts. Give it a task and it works out the steps to get there. When your request is unclear, it asks you a question instead of guessing, so it understands what you need before it starts. You see the plan, and the result matches what you actually asked for.

![FlowFuse Expert planning a task and asking a clarifying question](./images/expert-plan-mode.gif){data-zoomable}
_TODO asset: FlowFuse Expert laying out a plan and asking a clarifying question before it runs_

### Acting on Your Platform

Once the plan is set, FlowFuse Expert can carry out platform actions for you, such as creating an instance or registering a device, instead of pointing you to where to click. This is the groundwork for building flows by talking to the platform, with more to follow in upcoming releases.

### In practice

- You give FlowFuse Expert a task and see the plan it intends to follow before it runs
- You get a clarifying question when a request is ambiguous, rather than a wrong answer to correct later
- You let it carry out the plan on your platform once you are happy with it

## Insights on Self-Hosted Instances

Insights showed you how your flows behaved, but self-hosted users were left out. Running your own infrastructure meant giving up the visibility Cloud users already had.

### Running Insights on Your Own Instances

Self-hosted users can now run Insights on their own instances. If your devices have connectivity and the pieces in place, they respond to Insights requests directly, the same way Cloud instances do.

You no longer choose between running your own infrastructure and seeing how your flows perform. Insights comes with you.

This feature is available to [CONFIRM licence] self-hosted users and [CONFIRM tier] tier users of FlowFuse Cloud.

![Insights running on a self-hosted instance](./images/insights-self-hosted.png){data-zoomable}
_TODO asset: the Insights view on a self-hosted instance_

### In practice

- You run Insights on a self-hosted instance without moving workloads to Cloud
- You see how your flows perform on your own infrastructure
- You keep your data where it is and still get the same visibility

## Device Agent 4 and New Certified Nodes

Managing edge devices and connecting to industrial systems often means tracking versions by hand and vetting community packages you cannot fully trust.

### Device Agent 4

The Device Agent reaches version 4. Install or upgrade to v4 to use the latest remote instance and agent capabilities in this release. Where a feature needs it, the platform prompts you.

<!-- CONFIRM: the user-facing one-liner for what v4 actually brings. I have the version and that it gates the new agent features, but not a clean benefit. Nick owns the changelog. -->

### Certified Modbus and Redis Nodes

Two more certified nodes join the catalog. The certified Modbus node connects FlowFuse to Modbus devices and PLCs, one of the most common protocols on a factory floor, with the testing and support behind it that a community package cannot promise. The certified Redis node brings Redis into your flows for caching and fast data exchange. Both carry the same trust contract as the rest of the catalog: signed releases, an SBOM, and a CVE response commitment.

![The certified Modbus node in a flow](./images/certified-modbus-node.png){data-zoomable}
_TODO asset: the certified Modbus node wired into a flow_

### In practice

- You upgrade a device to Device Agent 4 to pick up this release's remote instance capabilities
- You connect to Modbus devices with a node we test and support, not a community package you vet yourself
- You bring Redis into your flows for caching and fast data exchange, with signed releases and an SBOM behind it

## What else is new?

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.32, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.32) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
