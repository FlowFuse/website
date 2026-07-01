---
title: "FlowFuse 2.32: Certified Redis Integration, Git Pipelines for Any Server, Insights Mode for Remote Instances, & Dark Mode"
subtitle: "A Redis certified node joins the catalog, DevOps pipelines connect to any Git server, the FlowFuse Expert can now answer questions about the live data on your remote instances in plain language, and a dark mode arrives across FlowFuse and Node-RED."
description: "FlowFuse 2.32 adds a Redis certified node, connects DevOps pipelines to any Git server, and brings Insights mode to your remote instances so the FlowFuse Expert can answer questions about their live data in plain language. It also adds a dark mode across the platform and editor, ships Device Agent 4, and introduces a Plan Mode for the Expert."
date: 2026-07-02
authors: ["jamie-strusz"]
# image: /blog/2026/07/images/flowfuse-release-2-32.png  # uncomment when hero art lands; image-handler stats this path locally so it must be a real file, not a URL (falls back to default blog tile until then)
tags:
   - flowfuse
   - news
   - releases
tldr: "Certified Nodes gains Redis, DevOps pipelines connect to any HTTPS Git server, and Insights mode reaches your remote instances so the FlowFuse Expert can answer questions about their live data in plain language. A dark mode arrives across FlowFuse and Node-RED, the Device Agent reaches version 4, and the Expert gains a Plan Mode."

---

FlowFuse 2.32 adds a Redis certified node, connects DevOps pipelines to any Git server, and brings Insights mode to your remote instances, so you can ask questions about their live data in plain language. It also adds a dark mode across the platform and Node-RED editor, ships a new major version of the Device Agent, and gives the Expert a Plan Mode.

<!--more-->

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

## Do More With the FlowFuse Expert

The FlowFuse Expert now works from your live data and plans a task before it acts, so it does more of the work for you.

### Ask Your Remote Instances in Plain Language

Insights mode now reaches your remote instances. Point the FlowFuse Expert, or any AI agent, at the live data coming off the hardware they are connected to and ask questions in plain language, with no dashboards to build. When you need to set it up, the Expert can help you build the MCP servers that power it, right in Node-RED.

![The FlowFuse Expert answering a plain-language question about live machine data](https://placehold.co/1200x675?text=Insights+Mode){data-zoomable}
_TODO asset: FlowFuse Expert Insights mode answering a plain-language question about machine data_

<!-- TODO: confirm availability (tier / licence) for Insights mode before publish -->

### Plan Together, Build What You Expect

With Plan Mode, the Expert plans the work alongside you. It proposes a plan and asks a clarifying question when your request is ambiguous, so what it builds lines up with what you actually expect rather than a guess you have to correct.

### From Advice to Action

Once you approve the plan, the Expert can begin to carry out platform actions for you, like creating an instance or registering a device, instead of just pointing you to where to click. This is groundwork, with more to follow in upcoming releases.

## Dark Mode

FlowFuse and the Node-RED editor have only ever offered a light interface. If you spend your day building and monitoring flows, long sessions in a bright UI are tiring on the eyes, more so in a dark room or alongside the dark-themed tools most of us already run.

### A Dark Theme for FlowFuse

FlowFuse now has a dark mode. Turn it on and the platform switches to a dark theme that is easier on the eyes for long editing and monitoring sessions, and a better match for a dark desktop.

![FlowFuse in dark mode](https://placehold.co/1200x675?text=Dark+Mode){data-zoomable}
_TODO asset: FlowFuse platform and the Node-RED editor in dark mode_

_Note: on Node-RED 5 and newer, your dark mode preference also carries through into the Node-RED editor, so the platform and your flows share one look and you set it just once._

<!-- TODO: confirm availability (tier / licence) for Dark Mode before publish -->

### In practice

- You turn dark mode on once, and it also applies in the Node-RED editor on Node-RED 5 and newer
- You cut eye strain on long editing sessions

## Device Agent 4

The Device Agent reaches a new major version. Its container now runs as an unprivileged user instead of root and on Node.js 22, a more secure, modern base that unlocks Insights, token auth, and Node-RED 5 on your devices.

### What This Means for You

Device Agent 4 is a breaking upgrade. When you move to it, make your bind-mounted state directories owned by the agent's user, then upgrade. The platform flags any device that needs v4 to use this release's features. Check the upgrade notes before upgrading.

## What else is new?

- **Real-time status over MQTT**: instance, device, and team status now stream over MQTT instead of HTTP polling, so the platform reflects changes faster
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
