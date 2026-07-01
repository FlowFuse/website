---
title: "FlowFuse 2.32: Insights Mode for Remote Instances, Dark Mode, Git Pipelines for Any Server, & Certified Redis Integration"
subtitle: "The FlowFuse Expert can now answer questions about the live data on your remote instances in plain language, a dark mode arrives, DevOps pipelines connect to any Git server, and the certified catalog gains Redis."
description: "FlowFuse 2.32 adds Insights mode, so the FlowFuse Expert can answer questions about the live data on your remote instances in plain language. It also brings a dark mode across the platform and editor, connects DevOps pipelines to any Git server, adds a Redis certified node, ships Device Agent 4, and introduces a Plan Mode for the Expert."
date: 2026-07-02
authors: ["jamie-strusz"]
# image: /blog/2026/07/images/flowfuse-release-2-32.png  # uncomment when hero art lands; image-handler stats this path locally so it must be a real file, not a URL (falls back to default blog tile until then)
tags:
   - flowfuse
   - news
   - releases
tldr: "Insights mode lets the FlowFuse Expert answer questions about the live data on your remote instances in plain language. A dark mode arrives across FlowFuse and Node-RED, DevOps pipelines connect to any HTTPS Git server, Certified Nodes gains Redis, the Device Agent reaches version 4, and the Expert gains a Plan Mode."

---

FlowFuse 2.32 brings Insights mode to the FlowFuse Expert, so you can ask questions about the live data on your remote instances in plain language. It also adds a dark mode across the platform and Node-RED editor, connects DevOps pipelines to any Git server, adds a Redis certified node, ships a new major version of the Device Agent, and gives the Expert a Plan Mode.

Here is what shipped. 🚀

<!--more-->

## FlowFuse Expert

The FlowFuse Expert takes a big step this release: it can now answer questions about the live data coming off your machines on remote instances, and it plans a task before it acts instead of guessing.

### Insights Mode: Ask Your Machine Data in Plain Language

With Insights mode, you can point the FlowFuse Expert, or any AI agent, straight at the live data coming off your equipment and ask questions in plain language. You get answers on demand, with no dashboards to wire up, and it works right on the remote instances running at the edge. When you need to set it up, the FlowFuse Expert can also help you build the MCP servers that power it, directly in Node-RED.

![The FlowFuse Expert answering a plain-language question about live machine data](https://placehold.co/1200x675?text=Insights+Mode){data-zoomable}
_TODO asset: FlowFuse Expert Insights mode answering a plain-language question about machine data_

<!-- TODO: confirm availability (tier / licence) for Insights mode before publish -->

### Plan Mode

FlowFuse Expert now plans before it acts. Give it a task and it works out the steps to get there. When your request is unclear, it asks you a question instead of guessing, so it understands what you need before it starts. You see the plan, and the result matches what you actually asked for.

![FlowFuse Expert planning a task and asking a clarifying question](https://placehold.co/1200x675?text=Plan+Mode){data-zoomable}
_TODO asset: FlowFuse Expert laying out a plan and asking a clarifying question before it runs_

### Acting on Your Platform

Once the plan is set, FlowFuse Expert can begin to carry out platform actions for you, such as creating an instance or registering a device, instead of pointing you to where to click. This is the groundwork for building flows by talking to the platform, with more to follow in upcoming releases.

### In practice

- You ask questions of the live data on your remote instances in plain language, and let the Expert help build the MCP servers that power Insights
- You give the Expert a task and see its plan first, with a clarifying question when a request is ambiguous rather than a wrong answer to fix later
- You let it begin to act on your platform once you are happy with the plan

## Dark Mode

FlowFuse and the Node-RED editor have only ever offered a light interface. If you spend your day building and monitoring flows, long sessions in a bright UI are tiring on the eyes, more so in a dark room or alongside the dark-themed tools most of us already run.

### A Dark Theme for FlowFuse

FlowFuse now has a dark mode. Turn it on and the platform switches to a dark theme that is easier on the eyes for long editing and monitoring sessions, and a better match for a dark desktop.

![FlowFuse in dark mode](https://placehold.co/1200x675?text=Dark+Mode){data-zoomable}
_TODO asset: FlowFuse platform and the Node-RED editor in dark mode_

_Note: your dark mode preference also carries through into the Node-RED editor, including Node-RED 5, so the platform and your flows share one look and you set it just once._

<!-- TODO: confirm availability (tier / licence) for Dark Mode before publish -->

### In practice

- You turn dark mode on once and it applies across FlowFuse and the Node-RED editor
- You keep a consistent theme on Node-RED 5 and earlier versions
- You cut eye strain on long editing sessions

## Device Agent 4

The Device Agent reaches version 4.0.0, a major release that modernizes how the agent runs and unlocks this release's AI and remote-instance capabilities.

### A New Major Version

Device Agent 4 runs on Node.js 22 by default (the baseline for Node-RED 5), and its Docker image now runs as an unprivileged user instead of root, a more secure default. Because that is a breaking change, bind-mounted state directories need to be owned by the agent's user when you upgrade (see the upgrade notes).

On top of that, v4 is what lights up the rest of this release on your devices:

- **Insights on your devices**: the agent answers live-state and MCP requests, so the FlowFuse Expert can query real data straight from the hardware a remote instance is connected to
- **Token auth to remote instances**: HTTP Bearer token support, matching hosted instances
- **Clearer operations**: structured JSON logging, and the agent reports its Node.js version so the platform can prompt you when an upgrade is needed

### In practice

- You upgrade to Device Agent 4 to use Insights mode and the latest capabilities on your remote instances
- You run the agent on a current, more secure Node.js 22 base
- You let the platform tell you when a device needs the new version

## Certified Redis Integration

Every node in a flow is code running in your environment, and community nodes carry security, compatibility, and maintenance risk you have to manage yourself. Certified Nodes take that work on through a defined quality, security, and support process.

### Redis Joins the Catalog

The certified node catalog grows again in 2.32 with a **Redis** certified node, so you can connect to Redis with a node FlowFuse tests, secures, and supports. Each certified node carries the same trust contract: vetted quality, proactive security with a CVE response commitment, and a real path to support when something breaks.

To see what certification covers and browse the current catalog, visit the [integrations page](https://flowfuse.com/integrations/?certified=1).

Certified Nodes are available to Teams and Enterprise tier customers. New instances get the catalog automatically, and you can contact us to add Certified Nodes to an existing instance.

![The Redis certified node in the palette manager](https://placehold.co/1200x675?text=Redis+Certified+Node){data-zoomable}
_TODO asset: the Redis certified node in the palette manager_

### In practice

- You connect to Redis with a node FlowFuse tests and supports, not a community package you vet yourself
- You reach the Redis certified node directly in the palette manager, with no separate workflow
- You build on a node knowing it has cleared defined quality and security checks

## Pipelines Connect to Any Git Server

DevOps Pipeline Git stages backed up and deployed your flows through version control, but only if your team used GitHub or Azure DevOps. Self-hosted GitLab or on-prem Bitbucket? That workflow was closed to you.

### Any HTTPS Git Server

Git Repository stages now connect to any Git server that speaks HTTPS: GitLab, Bitbucket, Gitea, or a self-hosted instance. Point a pipeline at the repository and it pushes and pulls snapshots as before.

For servers behind a private certificate authority, paste in a CA certificate so FlowFuse trusts the connection. No infrastructure changes on your end.

This feature is available to Team and Enterprise tier users of FlowFuse Cloud and Enterprise Licensed Self Hosted users.

![The Add Git Token dialog with the Other provider selected, showing the username and CA certificate fields](./images/generic-git-provider.png){data-zoomable}
_Creating a generic Git token for a self-hosted server._

### In practice

- You back up and deploy flows through your own GitLab, Bitbucket, Gitea, or self-hosted Git server
- You add a Git Repository stage and point it at any HTTPS repository, not just GitHub and Azure DevOps
- You connect to a server behind a private CA by pasting in its certificate

## What else is new?

- **Real-time status over MQTT**: instance, device, and team status now stream over MQTT instead of HTTP polling, so the platform reflects changes faster
- **Node-RED 5 theming**: the FlowFuse theme, including dark mode, now applies cleanly on Node-RED 5
- **Namespace-scoped RBAC**: role-based access scoped to a namespace for shared-cluster self-hosted deployments
- **Faster instance lists**: pagination and performance fixes on the Hosted and Remote Instances pages, plus sorting by status
- **Polish**: descriptive page titles, a cookie-consent notice on the login page, and a fix for instances that could report as suspended while still running

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.32, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.32) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
