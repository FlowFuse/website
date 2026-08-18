---
title: Foundations
navTitle: Foundations
navOrder: 2
guide: flowfuse
slug: foundations
blurb: "The foundation to build on: what FlowFuse is, its core pieces, and how code is shared across teams."
---

# Foundations

The foundation to build on: what FlowFuse is, its core pieces, and how code is shared across teams.

**FlowFuse is an application platform for building, deploying and managing industrial applications on Node-RED** — across IT, OT and IIoT, from the edge to the cloud, governed from one place.

## The big picture

::arch-diagram
---
nodes:
  - { id: users, label: "Users", sub: "operators & teams", accent: slate, many: true, span: 2, col: 2, row: 1 }
  - { id: hosted, label: "Hosted Instance", sub: "one or many · cloud or your server", accent: indigo, many: true, col: 1, row: 2 }
  - { id: dash, label: "Dashboard", sub: "live operator UI", accent: blue, col: 2, row: 2 }
  - { id: broker, label: "Team Broker", sub: "MQTT message bus", accent: teal, col: 3, row: 2 }
  - { id: tables, label: "FlowFuse Tables", sub: "shared SQL database", accent: green, col: 4, row: 2 }
  - { id: remote, label: "Remote Instance", sub: "one per device, across sites", accent: slate, many: true, span: 2, col: 2, row: 3 }
groups:
  - { id: platform, label: "FlowFuse Platform — runs and connects your instances", accent: indigo, nodes: [hosted, dash, broker, tables] }
  - { id: agent, label: "Device Agent — bridges platform to the edge", accent: red, nodes: [remote] }
edges:
  - { from: users, to: platform, label: "access" }
  - { from: agent, to: platform, label: "managed by" }
---
::

## The core pieces

- **Single platform** — Manage, secure, and govern everything from one place.
- **Instances** — Node-RED runtimes. A **Hosted Instance** runs on FlowFuse-managed infrastructure (cloud or your own server); a **Remote Instance** runs on your own edge hardware via the Device Agent. Same runtime either way — it connects to whatever the job needs (hardware, data, cloud) and can serve its own Dashboard. [What an instance connects to →](/application-guide/node-red/foundations/)
- **Team Broker** — A shared message bus that ties data together across sites.
- **Database** — One shared operational data store.
- **Dashboards** — Operator-facing UIs for the people who run it.
- **Edge & device management** — Deploy and manage across many devices, lines, and plants.

::callout{icon="i-lucide-square-stack"}
**Remote Instance** — A Remote Instance lives in both worlds: edge execution down in OT, or an on-prem worker under an IT/cloud platform.
::

::callout{icon="i-lucide-book-open"}
**In the FlowFuse docs** — that's the mental model in plain language. For the full glossary — every FlowFuse piece and term (Applications, Instances, Snapshots, Pipelines, Team Broker, Tables, Devices and more) — see the [FlowFuse Concepts documentation](/docs/user/concepts/).
::

## How code gets shared

Two ways code moves in FlowFuse: promote a whole app through environments, or compose an app from shared parts.

::callout{icon="i-lucide-arrow-right"}
**[App delivery methods →](/application-guide/flowfuse/app-delivery-methods/)** — whole app or reusable pieces: how a build reaches every place that should run it.
::
