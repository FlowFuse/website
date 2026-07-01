---
title: "FlowFuse 2.32: Certified Redis Integration, Git Pipelines for Any Server, Insights on Remote Instances & Dark Mode"
subtitle: "A Redis certified node, DevOps pipelines for any Git server, plain-language Insights on your remote instances, and a dark mode across FlowFuse and Node-RED."
description: "FlowFuse 2.32 adds a Redis certified node, DevOps pipelines for any Git server, and Insights mode on remote instances, so the FlowFuse Expert can answer questions about their live data in plain language. It also brings a dark mode, Device Agent 4, and a Plan Mode for the Expert."
date: 2026-07-02
authors: ["jamie-strusz"]
# image: /blog/2026/07/images/flowfuse-release-2-32.png  # uncomment when hero art lands; image-handler stats this path locally so it must be a real file, not a URL (falls back to default blog tile until then)
tags:
   - flowfuse
   - news
   - releases
tldr: "A Redis certified node, DevOps pipelines for any HTTPS Git server, and Insights mode on remote instances so the FlowFuse Expert can answer questions about their live data in plain language. Plus a dark mode, Device Agent 4, and a Plan Mode for the Expert."

---

FlowFuse 2.32 adds a Redis certified node, DevOps pipelines for any Git server, and Insights mode on your remote instances, so you can ask questions about their live data in plain language. It also brings a dark mode, Device Agent 4, and a Plan Mode for the Expert.

<!--more-->

## Certified Redis Integration

Community nodes are code you have to vet, secure, and maintain yourself. Certified Nodes take that on with a defined quality, security, and support process.

### Redis Joins the Catalog

2.32 adds a **Redis** certified node, so you can connect to Redis with a node FlowFuse tests, secures, and supports, backed by the same trust contract as every certified node: vetted quality, a CVE response commitment, and a real path to support.

Browse the full catalog on the [integrations page](https://flowfuse.com/integrations/?certified=1). Certified Nodes are available to Teams and Enterprise customers; new instances get the catalog automatically, and you can contact us to add them to an existing one.

![The Redis certified node in the palette manager](https://placehold.co/1200x675?text=Redis+Certified+Node){data-zoomable}
_TODO asset: the Redis certified node in the palette manager_

## Pipelines Connect to Any Git Server

DevOps Pipeline Git stages only worked with GitHub or Azure DevOps, leaving self-hosted GitLab or on-prem Bitbucket out.

Git Repository stages now connect to any HTTPS Git server: GitLab, Bitbucket, Gitea, or a self-hosted instance. Point a pipeline at the repository and it pushes and pulls snapshots as before. For a server behind a private CA, paste in its certificate, no infrastructure changes needed.

## Do More With the FlowFuse Expert

The FlowFuse Expert now works from your live data and plans alongside you, doing more of the work.

### Ask Your Remote Instances in Plain Language

Insights mode now reaches your remote instances. Point the FlowFuse Expert, or any AI agent, at the live data coming off the connected hardware and ask questions in plain language, no dashboards required. The Expert can even help you build the MCP servers that power it, right in Node-RED.

![The FlowFuse Expert answering a plain-language question about live machine data](https://placehold.co/1200x675?text=Insights+Mode){data-zoomable}
_TODO asset: FlowFuse Expert Insights mode answering a plain-language question about machine data_

<!-- TODO: confirm availability (tier / licence) for Insights mode before publish -->

### Plan Together, Build What You Expect

With Plan Mode, the Expert plans the work alongside you, proposing a plan and asking a clarifying question when your request is ambiguous, so the result matches what you expect instead of a guess you have to correct.

### From Advice to Action

Once you approve the plan, the Expert can begin carrying out platform actions like creating an instance or registering a device, rather than just pointing you to the button. This is groundwork, with more to follow.

## Dark Mode

FlowFuse has only ever had a light interface, and long sessions in a bright UI are tiring on the eyes.

### A Dark Theme for FlowFuse

FlowFuse now has a dark mode. Turn it on and the platform switches to a dark theme, easier on the eyes and a better match for a dark desktop.

![FlowFuse in dark mode](https://placehold.co/1200x675?text=Dark+Mode){data-zoomable}
_TODO asset: FlowFuse platform and the Node-RED editor in dark mode_

_Note: on Node-RED 5 and newer, your preference also carries into the Node-RED editor, so you set it once._

<!-- TODO: confirm availability (tier / licence) for Dark Mode before publish -->

## Device Agent 4

The Device Agent reaches a new major version. Its container now runs as an unprivileged user instead of root and on Node.js 22, a more secure, modern base that unlocks Insights, token auth, and Node-RED 5 on your devices.

### What This Means for You

Device Agent 4 is a breaking upgrade. When you move to it, make your bind-mounted state directories owned by the agent's user, then upgrade. The platform flags any device that needs v4 to use this release's features. Check the upgrade notes before upgrading.

## What else is new?

- **Real-time status over MQTT**: instance, device, and team status now stream over MQTT instead of HTTP polling, so changes show faster
- **Namespace-scoped RBAC**: role-based access scoped to a namespace for shared-cluster self-hosted deployments
- **Faster instance lists**: pagination and an N+1 fix on the Hosted and Remote Instances pages, plus sorting by status
- **Polish**: descriptive page titles, a login-page cookie-consent notice, and a fix for instances reporting suspended while still running

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.32, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.32) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
