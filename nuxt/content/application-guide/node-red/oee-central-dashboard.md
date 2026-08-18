---
title: OEE - Central Dashboard
navTitle: OEE - Central Dashboard
navOrder: 4.2
guide: node-red
slug: oee-central-dashboard
parent: worked-examples
blurb: "The cloud app from the OEE use case as a Node-RED flow — one link out fanning to two link ins on separate tabs (dashboard and batched history), so the live and history paths stay separate and easy to read."
---

# OEE - Central Dashboard

The cloud app from the FlowFuse [OEE worked example](/application-guide/flowfuse/worked-example/) — it subscribes to every line's state, computes OEE, shows it live, and writes each reading to history. It runs on one Hosted Instance. Unlike the Edge Aggregator, this one earns a design pattern and more than one data-handling method.

## Definition

- **The app** — subscribes to every line's state, computes OEE, shows it live, and writes each reading to history.
- **Design pattern** — [link out / link in](/application-guide/node-red/design-patterns/): the OEE result leaves the calc through one link out; a link in on the dashboard tab and a separate link in on the history tab pick it up — a clean fan-out across tabs with no cross-tab wire.
- **Data handling** — [classify](/application-guide/node-red/handling-data/) (a live event stream, plus history) → the two link-ins **[separate the paths](/application-guide/node-red/handling-data/)** (live vs history) → **batch** the history writes.
- **Runs on** — one Hosted Instance.
- **Why this shape** — a user-facing app driven by live data, with history kept off the live path so the dashboard never waits on the database.

## The flow

::flow-diagram
---
align: left
nodes:
  - { id: sub, label: "MQTT in", sub: "subscribe · line state", accent: indigo, col: 1, row: 1 }
  - { id: oee, label: "compute OEE", sub: "availability × perf × quality", col: 2, row: 1 }
  - { id: lout, label: "link out", sub: "broadcast the result", accent: indigo, col: 3, row: 1 }
  - { id: lindash, label: "link in", sub: "dashboard tab", accent: indigo, col: 3, row: 2 }
  - { id: dash, label: "dashboard", sub: "live OEE per line", accent: indigo, col: 4, row: 2 }
  - { id: lindb, label: "link in", sub: "history tab", accent: indigo, col: 3, row: 3 }
  - { id: batch, label: "join / batch", sub: "N readings or T secs", col: 4, row: 3 }
  - { id: db, label: "time-series DB", sub: "external · history", accent: green, col: 5, row: 3 }
edges:
  - sub>oee
  - oee>lout
  - { from: lout, to: lindash, dashed: true, label: "link" }
  - { from: lout, to: lindb, dashed: true, label: "link" }
  - lindash>dash
  - lindb>batch
  - batch>db
legend:
  - { line: neutral, dashed: true, label: "link out → link in" }
---
::

## Why these choices

- **Link out, two link ins on separate tabs** — the OEE result leaves the calc once through a link out; the dashboard tab and the history tab each pick it up through their own link in. Nothing crosses tabs, so each path reads on its own and the split is named — not a wire snaking across the canvas. (For two consumers on the *same* tab a plain node with two outputs would do; the link out/in earns its keep because these live on separate tabs.)
- **The link-ins are the path split** — the live dashboard rides one, batched history the other; neither waits on the other.
- **Batch the writes** — the history link in feeds a join / batch node, so readings land in the time-series DB in batches, not one insert per reading — cutting per-write overhead.
- **Decouple UI from logic** — the compute path builds a display-ready view-model; the widgets render it and emit intent. That's [good form](/application-guide/node-red/good-form/), not a selection — it applies to every dashboard.

::callout{icon="i-lucide-check"}
**In one line** — subscribe → compute → link out; one link in to the dashboard tab, a separate link in to a batch node then history.
::
