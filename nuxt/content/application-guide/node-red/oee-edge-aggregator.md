---
title: OEE - Edge Aggregator
navTitle: OEE - Edge Aggregator
navOrder: 4.1
guide: node-red
slug: oee-edge-aggregator
parent: worked-examples
blurb: "The edge app from the OEE use case as a Node-RED flow — packaged as a reusable subflow: poll the line, read the PLC, compute state, publish. One per line."
---

# OEE - Edge Aggregator

The edge app from the FlowFuse [OEE worked example](/application-guide/flowfuse/worked-example/) — it reads a line's machine signals and publishes its state, one Remote Instance per line. Here's how that app looks as a Node-RED flow, and the patterns that shape it.

## The flow

::flow-diagram
---
align: left
nodes:
  - { id: tick, label: "inject / timer", sub: "poll tick", accent: indigo, col: 1, row: 1 }
  - { id: read, label: "PLC read", sub: "OPC-UA / S7", col: 2, row: 1 }
  - { id: calc, label: "compute state", sub: "counts · run / stop", col: 3, row: 1 }
  - { id: pub, label: "MQTT out", sub: "publish line state", accent: indigo, col: 4, row: 1 }
  - { id: catch, label: "Catch", sub: "read fails", accent: red, col: 2, row: 2 }
groups:
  - { label: "Edge Aggregator · packaged as one subflow, dropped on every line", accent: teal, nodes: [tick, read, calc, pub] }
edges:
  - tick>read
  - read>calc
  - calc>pub
  - { from: read, to: catch, dashed: true, accent: red, label: "error" }
legend:
  - { line: red, dashed: true, label: "error path" }
---
::

## How the patterns shape it

- **Reuse — a [subflow](/application-guide/node-red/design-patterns/).** The same job runs identically on every line, so it's packaged once as a subflow with the line id as per-instance config, then dropped on each line's Remote Instance. That's the reuse rung that fits: cross-instance reuse with per-instance config.
- **[Good form](/application-guide/node-red/good-form/).** One beginning (the poll timer), one straight left-to-right path, and **MQTT out is the single sink** — it publishes and routes nothing. The PLC read is the one shared service the cycle calls.
- **[Handling data](/application-guide/node-red/handling-data/).** Machine signals are telemetry: hold the running counts in flow context and pace the publish (one message per cycle) so the broker sees a steady stream, not a burst.
- **Catch the read.** A PLC read can time out; a Catch scoped to it keeps a dropped read from stalling the line's publish — an error you can see, not a silent stall.

::callout{icon="i-lucide-check"}
**In one line** — a subflow: poll → read → compute → publish, one per line, with a catch on the read.
::
