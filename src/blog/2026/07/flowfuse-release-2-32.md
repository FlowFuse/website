---
title: "FlowFuse 2.32: Introducing Plan Mode for FlowFuse Expert, Device Agent 4, & Expanded Certified Nodes"
subtitle: "FlowFuse Expert now plans how to carry out your request and asks before it guesses, the Device Agent reaches version 4, and Certified Nodes expands with new nodes."
description: "FlowFuse 2.32 introduces Plan Mode, so FlowFuse Expert plans how to carry out your request and asks clarifying questions when it needs them. It also runs Insights on self-hosted instances, ships Device Agent 4, and adds new certified nodes."
date: 2026-07-02
authors: ["jamie-strusz"]
image: /blog/2026/07/images/flowfuse-release-2-32TODO.png
tags:
   - flowfuse
   - news
   - releases
tldr: "FlowFuse Expert now plans how to accomplish your request and asks clarifying questions when a request is unclear, rather than guessing. Self-hosted users can run Insights on their own instances, the Device Agent reaches version 4, and Certified Nodes expands with new nodes."

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

## Device Agent 4

Managing edge devices means keeping each agent current, and a major version is the moment that matters most.

### A New Major Version

The Device Agent reaches version 4. Install or upgrade to v4 to use the latest remote instance and agent capabilities in this release. Where a feature needs it, the platform prompts you.

### In practice

- You upgrade a device to Device Agent 4 to pick up this release's remote instance capabilities
- You keep your fleet on a supported, current agent
- You let the platform tell you when a feature needs the new version

## Expanded Certified Nodes

Every node in a flow is code running in your environment, and community nodes carry security, compatibility, and maintenance risk you have to manage yourself. Certified Nodes take that work on through a defined quality, security, and support process.

### New Connections in the Catalog

The certified node catalog grows again in 2.32, so more of the systems you connect to are covered by a node FlowFuse tests, secures, and supports. Each certified node carries the same trust contract: vetted quality, proactive security with a CVE response commitment, and a real path to support when something breaks.

For the full picture of what certification covers and when it is worth it, see [Why FlowFuse Certified Nodes?](/blog/2026/06/flowfuse-certified-nodes/), and browse the current catalog on the [integrations page](https://flowfuse.com/integrations/?certified=1).

Certified Nodes are available to Teams and Enterprise tier customers. New instances get the catalog automatically, and you can contact us to add Certified Nodes to an existing instance.

![A certified node in the palette manager](./images/certified-node-palette.png){data-zoomable}
_TODO asset: a certified node in the palette manager_

### In practice

- You connect to more systems with nodes FlowFuse tests and supports, not community packages you vet yourself
- You reach certified nodes directly in the palette manager, with no separate workflow
- You build on a node knowing it has cleared defined quality and security checks

## What else is new?

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.32, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.32) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
