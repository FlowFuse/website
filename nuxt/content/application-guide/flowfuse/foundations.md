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

## The big picture

::arch-diagram
---
nodes:
  - { id: hosted, label: "Hosted Instance", sub: "one or many, in the cloud", accent: indigo, many: true, col: 1, row: 1 }
  - { id: dash, label: "Dashboard", sub: "live operator UI", accent: blue, col: 2, row: 1 }
  - { id: broker, label: "Team Broker", sub: "MQTT message bus", accent: teal, col: 3, row: 1 }
  - { id: tables, label: "FlowFuse Tables", sub: "shared SQL database", accent: green, col: 4, row: 1 }
  - { id: remote, label: "Remote Instance", sub: "one per device, across sites", accent: slate, many: true, span: 2, col: 2, row: 2 }
  - { id: plc, label: "PLC", sub: "controller", col: 1, row: 3 }
  - { id: io, label: "IO module", sub: "sensors & actuators", col: 2, row: 3 }
  - { id: gw, label: "Gateway", sub: "protocol bridge", col: 3, row: 3 }
  - { id: emb, label: "Embedded", sub: "microcontroller", col: 4, row: 3 }
  - { id: lora, label: "LoRaWAN GW", sub: "wireless sensors", col: 5, row: 3 }
groups:
  - { id: platform, label: "FlowFuse Platform — runs and connects your instances", accent: indigo, nodes: [hosted, dash, broker, tables] }
  - { id: agent, label: "Device Agent — bridges platform to the edge", accent: red, nodes: [remote] }
edges:
  - { from: agent, to: platform, label: "managed by" }
  - { from: remote, to: plc }
  - { from: remote, to: io }
  - { from: remote, to: gw }
  - { from: remote, to: emb }
  - { from: remote, to: lora }
---
::

## The core pieces

- **Single platform** — Manage, secure, and govern everything from one place.
- **Instances** — Node-RED runtimes. A **Hosted Instance** runs on FlowFuse-managed infrastructure (cloud or your own server); a **Remote Instance** runs on your own edge hardware via the Device Agent. Same Node-RED, managed the same way — they differ only in where the runtime lives.
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

## The method, in four moves

1. **Say what it does** — one plain sentence. No nouns you would have to explain.
2. **Pick the package** — match it to a package — often several (most real apps are more than one piece).
3. **Decide where data goes** — choose the target(s): FlowFuse Tables (relational), an external time-series DB, the Team Broker, or a single service.
4. **Read off the sentence** — package plus target is the architecture, stated in one line.

## How code gets shared

Two ways code moves in FlowFuse: promote a whole app through environments, or compose an app from shared parts. Both live on the App delivery methods page — and when dev and prod sit on separate servers, a GitHub bridge (an architecture decision) carries the versioned code between them.

::callout{icon="i-lucide-arrow-right"}
**[App delivery methods →](/application-guide/flowfuse/app-delivery-methods/)** — whole app or reusable pieces: how a build reaches every place that should run it.
::
