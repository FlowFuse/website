---
title: "FlowFuse 2.32: Certified Redis, Git Pipelines for Any Server, Insights on Remote Instances, and Dark Mode"
subtitle: "Connect DevOps pipelines to any Git server, ask your live edge data questions in plain language, and give your eyes a break on long sessions."
description: "FlowFuse 2.32 certifies the Redis node, extends DevOps Git pipelines to any HTTPS server, and adds Insights mode on remote instances, plus dark mode, Device Agent 4, and a Plan Mode for the Expert."
date: 2026-07-02
authors: ["jamie-strusz"]
# image: /blog/2026/07/images/flowfuse-release-2-32.png  # uncomment when hero art lands; image-handler stats this path locally so it must be a real file, not a URL (falls back to default blog tile until then)
tags:
   - flowfuse
   - news
   - releases
tldr: "2.32 certifies the Redis node and extends DevOps Git pipelines to any HTTPS server: GitLab, Bitbucket, Gitea, or self-hosted. Insights mode now reaches your remote instances, so the FlowFuse Expert answers plain-language questions about live edge data. Plus dark mode, Device Agent 4, and a Plan Mode for the Expert."
cta:
  type: demo
  title: Want to see 2.32 in your environment?
  description: Book a demo to walk through remote Insights, namespace-scoped RBAC, and Device Agent 4 security for your fleet.

---

This release meets your stack where it already lives. Redis becomes a certified node. DevOps pipelines connect to any HTTPS Git server, not just GitHub. And the FlowFuse Expert can now read the live data on your remote instances and answer questions about it in plain language. Dark mode lands too, so the platform stops glaring at you through long sessions.

<!--more-->

## Certified Redis Integration

Community nodes are code you have to vet, secure, and maintain yourself. Certified Nodes take that on with a defined quality, security, and support process.

### Redis Joins the Catalog

2.32 adds **Redis** as a certified node, so you can integrate with Redis using a node FlowFuse tests, secures, and supports, backed by the same trust contract as every certified node: vetted quality, a CVE response commitment, and a real path to support.

Certified Nodes belong to specific FlowFuse packages. Browse the full catalog on the [integrations page](https://flowfuse.com/integrations/?certified=1), and contact us to get them enabled for your team or instance.

## Pipelines Connect to Any Git Server

DevOps Pipeline Git stages only worked with GitHub or Azure DevOps, leaving self-hosted GitLab or on-prem Bitbucket out.

Git Repository stages now connect to any HTTPS Git server: GitLab, Bitbucket, Gitea, or a self-hosted instance. Point a pipeline at the repository and it pushes and pulls snapshots as before. For a server behind a private CA, paste in its certificate, no infrastructure changes needed. Your team keeps its existing GitLab or Bitbucket workflow and its compliance setup, with no migration to GitHub.

## Do More With the FlowFuse Expert

### Ask about your machine or operational data in Plain Language

Your live machine data sits on your remote instances at the edge. Insights mode now reaches it directly. Point the FlowFuse Expert in "insights" mode, or any AI agent, at a remote instance and ask in plain language: "What was the average cycle time on line 3 today?" You get the answer from live data, with no dashboard to build and no query to write. The Expert can even help you build the MCP servers that feed it, right in Node-RED.

![The FlowFuse Expert answering a plain-language question about live machine data](https://placehold.co/1200x675?text=Insights+Mode){data-zoomable}
_TODO asset: FlowFuse Expert Insights mode answering a plain-language question about machine data_

### From Advice to Action

We are enabling the FlowFuse Expert to do things inside the platform, starting with setting up an instance and getting information about your fleet of instances for you. It is the first step toward building any application from beginning to end: you start with the Expert in the platform, it understands the context, provisions the instance, and leads you straight into the Node-RED editor to build it for you. Groundwork, with more to follow.

### Loose for Prototypes, Strict in Production

In support mode, you decide how freely the Expert acts, and you can fine-tune its permissions separately for building flows in Node-RED and for taking actions in the FlowFuse platform. Let it run without interruption while you stand up a first proof of concept, so it builds quickly. Then tighten those same tools for production flows, where you want to see and approve each change before it lands. When a tool is set to ask, an approval card shows exactly what the Expert intends to do and waits for your call.

### Plan Together, Build What You Expect

The Expert now understands your intent and plans with you. It asks clarifying questions before it starts implementing, so you get what you need built faster and closer to what you pictured. This is a solid step, and we'll keep improving the Expert from here.

## Dark Mode

FlowFuse has only ever had a light interface, and long sessions in a bright UI are tiring on the eyes. FlowFuse now has a dark mode. Turn it on and the platform switches to a dark theme, easier on the eyes and a better match for a dark desktop. Node-RED auto-switches along with you, which works especially well in combination with the new [Node-RED 5.0](/blog/2026/06/node-red-5-on-flowfuse/)!

![FlowFuse in dark mode](https://placehold.co/1200x675?text=Dark+Mode){data-zoomable}
_TODO asset: FlowFuse platform and the Node-RED editor in dark mode_

_Note: on Node-RED 5 and newer, your preference also carries into the Node-RED editor, so you set it once._

## Better Security with Device Agent 4

The Device Agent reaches a new major version. Its container now runs as an unprivileged user instead of root and on Node.js 22, a more secure, modern base that unlocks Insights, token auth, and Node-RED 5 on your devices.

### What This Means for You

Device Agent 4 is a breaking upgrade. When you move to it, make your bind-mounted state directories owned by the agent's user, then upgrade. The platform flags any device that needs v4 to use this release's features. Check the upgrade notes before upgrading.

## What else is new?

- **Real-time status over MQTT**: instance, device, and team status now stream over MQTT instead of HTTP polling, so changes show faster
- **Faster instance lists**: pagination and an N+1 fix on the Hosted and Remote Instances pages, plus sorting by status
- **Namespace-scoped RBAC**: role-based access scoped to a namespace for shared-cluster self-hosted deployments
- **Platform Polish**: descriptive page titles, a login-page cookie-consent notice, and a fix for instances reporting suspended while still running

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.32, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.32) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
