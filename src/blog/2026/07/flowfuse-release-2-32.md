---
title: "FlowFuse 2.32: Plan Mode for FlowFuse Expert, Git Pipelines for Any Server, Device Agent 4, & Expanded Certified Nodes"
subtitle: "FlowFuse Expert now plans how to carry out your request and asks before it guesses, DevOps pipelines connect to any Git server, the Device Agent reaches version 4, and Certified Nodes expands with new nodes."
description: "FlowFuse 2.32 introduces Plan Mode, so FlowFuse Expert plans how to carry out your request and asks clarifying questions when it needs them. It also connects DevOps pipelines to any Git server, adds Insights mode so you can ask your machine data questions in plain language, brings a dark mode across the platform and editor, ships Device Agent 4, and adds a Redis certified node."
date: 2026-07-02
authors: ["jamie-strusz"]
# image: /blog/2026/07/images/flowfuse-release-2-32.png  # uncomment when hero art lands; image-handler stats this path locally so it must be a real file, not a URL (falls back to default blog tile until then)
tags:
   - flowfuse
   - news
   - releases
tldr: "FlowFuse Expert now plans how to accomplish your request and asks clarifying questions when a request is unclear, rather than guessing. DevOps pipelines connect to any HTTPS Git server, Insights mode lets you ask your machine data questions in plain language, a dark mode arrives across FlowFuse and Node-RED, the Device Agent reaches version 4, and Certified Nodes gains Redis."

---

FlowFuse 2.32 introduces Plan Mode. FlowFuse Expert now plans how to carry out your request and asks before it guesses. It also connects DevOps pipelines to any Git server, adds Insights mode for asking your machine data questions in plain language, brings a dark mode to the platform and Node-RED editor, ships a new major version of the Device Agent, and adds a Redis certified node.

Here is what shipped. 🚀

<!--more-->

## FlowFuse Expert Plans Before It Acts

FlowFuse Expert could answer your question, but it could not work through a task for you. And when a request was ambiguous, it guessed, which left you spotting and correcting the wrong answer after the fact.

### Plan Mode

FlowFuse Expert now plans before it acts. Give it a task and it works out the steps to get there. When your request is unclear, it asks you a question instead of guessing, so it understands what you need before it starts. You see the plan, and the result matches what you actually asked for.

![FlowFuse Expert planning a task and asking a clarifying question](https://placehold.co/1200x675?text=Plan+Mode){data-zoomable}
_TODO asset: FlowFuse Expert laying out a plan and asking a clarifying question before it runs_

### Acting on Your Platform

Once the plan is set, FlowFuse Expert can carry out platform actions for you, such as creating an instance or registering a device, instead of pointing you to where to click. This is the groundwork for building flows by talking to the platform, with more to follow in upcoming releases.

### In practice

- You give FlowFuse Expert a task and see the plan it intends to follow before it runs
- You get a clarifying question when a request is ambiguous, rather than a wrong answer to correct later
- You let it carry out the plan on your platform once you are happy with it

## Ask Your Machine Data in Plain Language

Getting answers out of the data flowing through your machines used to mean building dashboards and queries by hand. Insights mode changes that.

### Insights Mode

With Insights mode, you can point the FlowFuse Expert, or any AI agent, straight at the live data coming off your equipment and ask questions in plain language. You get answers on demand, with no dashboards to wire up, and it works right on the remote instances running at the edge. When you need to set it up, the FlowFuse Expert can also help you build the MCP servers that power it, directly in Node-RED.

![The FlowFuse Expert answering a plain-language question about live machine data](https://placehold.co/1200x675?text=Insights+Mode){data-zoomable}
_TODO asset: FlowFuse Expert Insights mode answering a plain-language question about machine data_

<!-- TODO: confirm availability (tier / licence) for Insights mode before publish -->

### In practice

- You ask questions of live data from your edge hardware, in plain language
- You use the FlowFuse Expert or any AI agent as the interface, on demand
- You let the FlowFuse Expert help you build the required MCP servers in Node-RED

## Dark Mode

Long editing sessions in a bright interface are hard on the eyes, and FlowFuse only offered a light theme.

### A Dark Theme Across FlowFuse and Node-RED

FlowFuse now has a dark mode. Turn it on and the theme carries through from the FlowFuse platform into the Node-RED editor, so the platform and your flows follow the same look. The preference syncs across FlowFuse and Node-RED (including Node-RED 5), so you set it once.

![FlowFuse in dark mode](https://placehold.co/1200x675?text=Dark+Mode){data-zoomable}
_TODO asset: FlowFuse platform and the Node-RED editor in dark mode_

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

## Expanded Certified Nodes

Every node in a flow is code running in your environment, and community nodes carry security, compatibility, and maintenance risk you have to manage yourself. Certified Nodes take that work on through a defined quality, security, and support process.

### Redis Joins the Catalog

The certified node catalog grows again in 2.32 with a **Redis** certified node, so you can connect to Redis with a node FlowFuse tests, secures, and supports. Each certified node carries the same trust contract: vetted quality, proactive security with a CVE response commitment, and a real path to support when something breaks.

To see what certification covers and browse the current catalog, visit the [integrations page](https://flowfuse.com/integrations/?certified=1).

Certified Nodes are available to Teams and Enterprise tier customers. New instances get the catalog automatically, and you can contact us to add Certified Nodes to an existing instance.

![A certified node in the palette manager](https://placehold.co/1200x675?text=Certified+Nodes){data-zoomable}
_TODO asset: a certified node in the palette manager_

### In practice

- You connect to more systems with nodes FlowFuse tests and supports, not community packages you vet yourself
- You reach certified nodes directly in the palette manager, with no separate workflow
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
- **More Expert canvas actions**: the FlowFuse Expert can now create subroutines, move groups across tabs, arrange and distribute nodes, set deploy mode, and control the sidebar
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
