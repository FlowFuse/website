---
title: OEE - Central Dashboard
navTitle: OEE - Central Dashboard
navOrder: 4.2
guide: node-red
slug: oee-central-dashboard
parent: worked-examples
blurb: "The cloud app from the OEE use case as a Node-RED flow — subscribe to every line, compute OEE, show it live, and write history through a link call, with UI decoupled from logic."
---

# OEE - Central Dashboard

The cloud app from the FlowFuse [OEE worked example](/application-guide/flowfuse/worked-example/) — it subscribes to every line's state, computes OEE, shows it live, and writes each reading to history. It runs on one Hosted Instance. Here's how that app looks as a Node-RED flow, and the patterns that shape it.

## The flow

::flow-diagram
---
align: left
nodes:
  - { id: sub, label: "MQTT in", sub: "subscribe · line state", accent: indigo, col: 1, row: 1 }
  - { id: oee, label: "compute OEE", sub: "availability × perf × quality", col: 2, row: 1 }
  - { id: dash, label: "dashboard", sub: "view-model out · intent in", accent: indigo, col: 3, row: 1 }
  - { id: hist, label: "link call", sub: "write history", accent: teal, col: 2, row: 2 }
  - { id: tsdb, label: "time-series DB", sub: "external", accent: green, col: 3, row: 2 }
  - { id: catch, label: "Catch", sub: "write fails", accent: red, col: 2, row: 3 }
edges:
  - sub>oee
  - oee>dash
  - { from: oee, to: hist, label: "each reading" }
  - { from: hist, to: tsdb, dir: both, label: "result back" }
  - { from: hist, to: catch, dashed: true, accent: red }
legend:
  - { line: red, dashed: true, label: "error path" }
---
::

## How the patterns shape it

- **[Decouple UI from logic](/application-guide/node-red/good-form/).** The compute path builds a display-ready view-model; the dashboard widgets render it and emit `{action, payload}` intent back — no logic in the templates. Redesign the dashboard without touching a business-logic node.
- **History as a [link call](/application-guide/node-red/design-patterns/).** Each reading is written to the external time-series DB through one link call, so the DB connection lives in a single shared service and the compute path stays clean.
- **[Good form](/application-guide/node-red/good-form/).** The **dashboard is the single sink** — it displays and routes nothing. Everything else stays upstream.
- **[Handling data](/application-guide/node-red/handling-data/).** Live state (MQTT in) and history (batched writes to the time-series DB) travel on separate paths, so the live view never waits on the historian.
- **Catch the write.** A Catch on the history write keeps a database hiccup from taking down the live dashboard.

::callout{icon="i-lucide-check"}
**In one line** — subscribe → compute → dashboard, with history written to an external DB via a link call, caught on failure.
::
