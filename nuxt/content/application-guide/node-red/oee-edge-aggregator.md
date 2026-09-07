---
title: OEE - Edge Aggregator
navTitle: OEE - Edge Aggregator
navOrder: 4.1
guide: node-red
slug: oee-edge-aggregator
parent: worked-examples
blurb: "The edge app from the OEE use case as a Node-RED flow — a straight-line flow packaged as a subflow and configured per line (its PLC tags, via a config UI and a get-config node), with the data treated as a stream and its counts held in context."
---

# OEE - Edge Aggregator

The edge app from the FlowFuse [OEE worked example](/application-guide/flowfuse/worked-example/) — it reads a line's machine signals and publishes its state, one Remote Instance per line. The flow logic is a simple straight line; the choices that matter are packaging it for reuse and treating the data as a stream.

## Definition

- **The app** — reads a line's machine signals and publishes its state.
- **Design pattern** — [subflow](/application-guide/node-red/design-patterns/), applied to the *whole* flow (not to extract an internal seam): the straight-line flow is packaged as one subflow and dropped onto every line, each configured with its own line's PLC tags as per-instance config — the Node-RED side of the [Configurable App](/application-guide/flowfuse/hardware-apps/) pattern.
- **Data handling** — [classify](/application-guide/node-red/handling-data/) (the signals are a telemetry **stream**, read at the poll cadence) → hold the running run/stop counts in **[context](/application-guide/node-red/handling-data/)**.
- **Runs on** — a Remote Instance, one per line.
- **Why this shape** — the same complete job runs identically on every line, right next to the equipment, and keeps working if the link drops.

## The flow

::flow-diagram
---
align: left
nodes:
  - { id: ui, label: "config UI", sub: "set this line's tags", accent: blue, col: 2, row: 1 }
  - { id: cfg, label: "context", sub: "tag config", accent: green, col: 3, row: 1 }
  - { id: tick, label: "inject / timer", sub: "poll tick", accent: indigo, col: 1, row: 2 }
  - { id: getcfg, label: "get config", sub: "load the tags", col: 2, row: 2 }
  - { id: read, label: "PLC read", sub: "reads those tags", col: 3, row: 2 }
  - { id: calc, label: "compute state", sub: "counts in context", col: 4, row: 2 }
  - { id: pub, label: "MQTT out", sub: "publish line state", accent: indigo, col: 5, row: 2 }
  - { id: catch, label: "Catch", sub: "scoped to the read", accent: red, col: 3, row: 3 }
groups:
  - { label: "Edge Aggregator · one subflow, dropped on every line", accent: teal, nodes: [ui, cfg, tick, getcfg, read, calc, pub] }
edges:
  - { from: ui, to: cfg, label: "save tags" }
  - { from: cfg, to: getcfg, dashed: true, label: "load tags" }
  - tick>getcfg
  - getcfg>read
  - read>calc
  - calc>pub
  - { from: read, to: catch, dashed: true, accent: red, label: "catches (scope)" }
legend:
  - { line: neutral, dashed: true, label: "context read" }
  - { line: red, dashed: true, label: "Catch scope · not a wire" }
---
::

## Why these choices

- **Subflow, applied whole-flow** — the flow itself is a straight line with no seams to extract, so there's no *internal* pattern to reach for. But because the same complete flow runs on every line, it's packaged as a subflow — reuse across instances is exactly the subflow rung. The pattern is applied to the whole flow, not to a piece inside it.
- **Configured per line — why it's a Configurable App** — a config UI node sets this line's PLC tag names into context; a *get config* node in front of the PLC read loads them, so the one subflow reads different tags on every line without changing the build. That per-line configuration is exactly what makes it a Configurable App.
- **Classify: it's a stream** — the signals are telemetry read at the poll cadence, so the latest value matters more than any single earlier one. One read → one compute → one publish per tick; the poll interval already paces it, so there's no fast-in / slow-out to rate-limit.
- **Context for the counts** — running run/stop counts live in flow context, not threaded through the wires.
- **Catch the read** — a PLC read can time out; a Catch scoped to the read handles a dropped read so it doesn't stall the publish. A Catch node isn't wired *from* the read — it registers to catch errors in its scope, so the dashed line shows that scope, not a connection. Catching errors is [good form](/application-guide/node-red/good-form/), not a per-flow choice.

::callout{icon="i-lucide-check"}
**In one line** — a subflow per line: set the tags in a config UI, load them, then poll → read → compute → publish (with a scoped catch); the data call is treating it as a stream and holding the counts in context.
::
