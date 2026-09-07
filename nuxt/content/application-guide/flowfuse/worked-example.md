---
title: OEE, end to end
navTitle: OEE, end to end
navOrder: 6.1
guide: flowfuse
slug: worked-example
blurb: "One use case — OEE across three lines — broken into two apps and two shared services, then drawn out end to end."
parent: worked-examples
---

# OEE, end to end

## The use case

**Track OEE across three production lines.** OEE (Overall Equipment Effectiveness) tells you how much good product a line makes versus its full potential — one live number per line, plus history for trends.

**What "good" looks like** — every line shows a live OEE figure the team trusts, and any line's OEE can be charted back over weeks to spot drift.

It's not one app. OEE takes **two apps** — one at the edge, one in the cloud — joined by **two shared services** (a broker and a history store).

## The apps

### 1 · OEE - Edge Aggregator

**What it does** — Reads the machine signals on a line and publishes the line's state.

- **Delivery method** — [whole app](/application-guide/flowfuse/app-delivery-methods/): promoted as a snapshot through a pipeline to a Remote Instance on every line.
- **App pattern** — [hardware app · Configurable App](/application-guide/flowfuse/hardware-apps/): the same build everywhere, with each line's PLC tag names loaded as per-site config.
- **Runs on** — a Remote Instance, one per line.
- **Why this shape** — the same flows run on every line, right next to the equipment, and keep working if the link drops — but each line's PLC tags differ, so the values are configured per install. Build it once; roll the same version to the whole fleet and point each at its own tags.
- **See the flow** — [how OEE - Edge Aggregator is built in Node-RED →](/application-guide/node-red/oee-edge-aggregator/)

### 2 · OEE - Central Dashboard

**What it does** — Subscribes to the line states, computes availability, performance and quality, and presents the live OEE dashboard.

- **Delivery method** — [whole app](/application-guide/flowfuse/app-delivery-methods/): promoted dev → staging → prod as one versioned build.
- **App pattern** — [software app · Data-Driven App](/application-guide/flowfuse/software-apps/).
- **Runs on** — a Hosted Instance in the cloud.
- **Why this shape** — it's a user-facing app driven by live data, with no hardware of its own; one instance serves the whole plant.
- **See the flow** — [how OEE - Central Dashboard is built in Node-RED →](/application-guide/node-red/oee-central-dashboard/)

### Shared services

- **Team Broker (MQTT · UNS)** — carries line state from edge to cloud. The edge publishes to a topic; the dashboard subscribes. Neither references the other.
- **External time-series DB (Timescale / QuestDB)** — FlowFuse has no built-in time-series store, so history goes to an external DB over the Postgres wire protocol — a second egress, because the data is a timestamped stream.

## The full architecture

::arch-diagram
---
nodes:
  - { id: hosted, label: "Hosted Instance", sub: "OEE · Central Dashboard", accent: indigo, col: 2, row: 1 }
  - { id: tsdb, label: "Time-series DB", sub: "external · history", accent: slate, col: 3, row: 1 }
  - { id: broker, label: "Team Broker", sub: "MQTT · UNS", accent: teal, col: 2, row: 2 }
  - { id: lineA, label: "Remote Instance", sub: "Line A · Edge Aggregator", accent: slate, col: 1, row: 3 }
  - { id: lineB, label: "Remote Instance", sub: "Line B · Edge Aggregator", accent: slate, col: 2, row: 3 }
  - { id: lineC, label: "Remote Instance", sub: "Line C · Edge Aggregator", accent: slate, col: 3, row: 3 }
groups:
  - { id: cloud, label: "Cloud · platform — the app + history", accent: blue, nodes: [hosted, tsdb] }
  - { id: edge, label: "OT · edge — one Remote Instance per line, all the same Edge Aggregator", accent: red, nodes: [lineA, lineB, lineC] }
edges:
  - { from: lineA, to: broker, dashed: true, accent: teal }
  - { from: lineB, to: broker, label: "publish state", dashed: true, accent: teal }
  - { from: lineC, to: broker, dashed: true, accent: teal }
  - { from: broker, to: hosted, label: "subscribe", dashed: true, accent: teal }
  - { from: hosted, to: tsdb, label: "writes history · Postgres wire", accent: slate }
legend:
  - { swatch: red, label: "OT edge" }
  - { swatch: blue, label: "Cloud" }
  - { line: teal, dashed: true, label: "MQTT / UNS" }
  - { line: slate, label: "Postgres wire" }
---
::

::callout{icon="i-lucide-quote"}
**The architecture, in one sentence** — OEE is the **Edge Aggregator** (a hardware Configurable App, on a Remote Instance per line) publishing machine state over the Team Broker to the **Central Dashboard** (a software Data-Driven App, on a Hosted Instance), which computes and displays OEE and writes history to an external time-series DB.
::
