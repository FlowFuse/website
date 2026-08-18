---
title: Handling data
navTitle: Handling data
navOrder: 3.2
guide: node-red
slug: handling-data
blurb: "Sort data by what it is for before you tune anything. Telemetry and control have different timing needs — classify them, give each its own path, pace fast inputs, and hold state and config in context so the fast path never inherits the slow one's load."
parent: patterns
---

# Handling data

**Handling data — start here**

Sort data by what it is for before you tune anything. Telemetry and control have different timing needs — classify them, give each its own path, pace fast inputs, and hold state and config in context so the fast path never inherits the slow one's load.

::::guide-tabs
:::guide-tab{label="Classify the data"}
**Sort by purpose first** — telemetry is continuous and latency-tolerant; control is small and time-critical. Don't poll it all at the fast rate.

::flow-diagram
---
nodes:
  - { id: plc, label: "PLC", sub: "signals", col: 1, row: 2 }
  - { id: nodered, label: "Node-RED", sub: "edge device", accent: slate, col: 2, row: 2 }
  - { id: telemetry, label: "Telemetry", sub: "continuous, latency-tolerant", accent: green, col: 3, row: 1 }
  - { id: control, label: "Control", sub: "small, time-critical", accent: red, col: 3, row: 2 }
  - { id: config, label: "Config", sub: "written rarely", col: 3, row: 3 }
edges:
  - nodered>plc
  - nodered>telemetry
  - nodered>control
  - nodered>config
---
::

Before tuning anything, sort the data by what it is for. Telemetry is continuous and latency-tolerant. Control data is small and time-critical. Config is written rarely.

**Use it when** — The common mistake is treating every point as one population and polling all of it at the fastest rate. That is what creates load a controller cannot sustain.

**How it works** — Ask whether a delay changes a control decision or only a timestamp, whether it is read or write, and what cadence the data actually needs versus how fast it is polled today.

**Good to know**

- **Good for** — Deciding which few points genuinely need the fast path, usually far fewer than ride it.

:::
:::guide-tab{label="Treat data reliably"}
**Split read from event-driven** — buffer telemetry and batch it to a time-series DB; keep the control path lean and on its own.

::flow-diagram
---
align: left
nodes:
  - { id: plc, label: "PLC", sub: "buffered", col: 1, row: 2 }
  - { id: nodered, label: "Node-RED", sub: "buffer + batch", accent: slate, col: 2, row: 2 }
  - { id: broker, label: "Broker", sub: "MQTT", accent: teal, col: 3, row: 1 }
  - { id: sqldb, label: "SQL database", sub: "time-series", accent: green, col: 3, row: 3 }
edges:
  - plc>nodered
  - { from: nodered, to: broker, label: "live, minimal set" }
  - { from: nodered, to: sqldb, label: "history, batched" }
---
::

Separate read traffic from event-driven traffic, then handle each on its own path. This split is the foundational step; everything else follows from it.

**Use it when** — Telemetry and control have different timing needs. Sharing one path and one protocol makes the fast path inherit the load of the slow one.

**How it works** — Buffer telemetry in the PLC and pull it at its real cadence, timestamped at acquisition. Batch it into a time-series database. Keep the control path to the minimum tag set on a dedicated, faster route.

**Good to know**

- **Good for** — Batched inserts into a time-series DB land at a fraction of the overhead of individual writes.

:::
:::guide-tab{label="Batching / rate limit"}
**Pace the fast side to the slow side** — when input outruns the sink, the queue grows and the heap blows. This is the #1 event-driven failure.

::flow-diagram
---
nodes:
  - { id: mqtt, label: "MQTT in", sub: "fast · bursty", accent: teal, col: 1 }
  - { id: pace, label: "rate limit / batch", sub: "delay · queue · drop", col: 2 }
  - { id: db, label: "DB write", sub: "slow · the bottleneck", accent: green, col: 3 }
edges:
  - { from: mqtt, to: pace, label: "many msg/s", accent: indigo, dashed: true }
  - { from: pace, to: db, label: "steady rate" }
legend:
  - { line: indigo, dashed: true, label: "fast in" }
  - { line: neutral, label: "paced out" }
---
::

A fast source (an MQTT topic, a tight poll) feeding a slow sink (a DB write, an API) has no natural brake. Messages pile up in memory faster than they drain, and the runtime eventually runs out of heap and dies.

**Use it when** — Any high-rate or bursty input into a slower downstream — telemetry to a database, fan-out to a remote API.

**How it works** — Pace the slow side explicitly: a delay node in rate-limit mode, batching (join into chunks), or dropping stale readings when only the latest matters. Batched inserts also cut per-write overhead. Watch heap and the node's queue; if it only grows, you have backpressure, not a spike.

**Good to know**

- **Watch out** — a backend that holds a live connection (an MQTT subscription) can't be pooled away; pace at the source or offload the heavy work.

:::
:::guide-tab{label="Use the context store"}
**Context is shared memory** — hold the object in one place at the narrowest scope; messages are verbs, context is state.

::arch-diagram
---
nodes:
  - { id: event, label: "event", sub: "a reading arrived", col: 1, row: 1 }
  - { id: node, label: "node", sub: "recompute", col: 2, row: 1, accent: indigo }
  - { id: store, label: "context store", sub: "assets.<id>, oee.line1", col: 3, row: 1, accent: green }
  - { id: reader, label: "another node", sub: "reads one key", col: 2, row: 2 }
edges:
  - event>node
  - { from: node, to: store, label: "write" }
  - { from: store, to: reader, label: "read the one key it needs", dashed: true }
legend:
  - { line: neutral, label: "write / flow" }
  - { line: neutral, dashed: true, label: "read" }
---
::

Context is shared memory with a defined scope. It holds a logical object in one place instead of threading it through wires. Messages are verbs; context is nouns.

**Use it when** — If you pass the same fat object through fifteen nodes just to move it, that is the job context exists to do. Wire gymnastics to avoid storing a value is the real anti-pattern.

**How it works** — Store the object once under a namespaced key at the narrowest scope that works (node, then flow, then global). Each node reads the one key it needs, and a persistent store holds anything that must survive a restart.

**Good to know**

- **Watch out** — One writer per key, serialize concurrent updates, and keep enough on the wire to stay debuggable.

:::
:::guide-tab{label="Config: env vars vs persisted context"}
**Static config vs runtime config** — env vars set at deploy (read-only to the flow); persisted context for anything a user edits.

::arch-diagram
---
nodes:
  - { id: broker, label: "BROKER_HOST", sub: "baked, read-only — edit env + redeploy", col: 1, row: 1, accent: slate }
  - { id: ui, label: "UI edits", sub: "a form or button", col: 2, row: 1, accent: indigo }
  - { id: store, label: "context store", sub: "live config", col: 3, row: 1, accent: green }
  - { id: flowrun, label: "flow at run", sub: "reads current", col: 4, row: 1 }
edges:
  - { from: ui, to: store, label: "intent" }
  - store>flowrun
groups:
  - { label: "Env var — set at deploy", nodes: [broker] }
  - { label: "Persisted context — changed by a user", accent: green, nodes: [ui, store, flowrun] }
---
::

Two different kinds of configuration. Static config changes per environment and is set at deploy: broker host, DB connection. Runtime config changes while running, by a user, with no redeploy.

**Use it when** — Env vars are resolved at deploy time and are read-only to the running flow. The moment a user needs to change what the flow operates on, an env var forces a developer and a redeploy.

**How it works** — Keep static config in env vars or a config node. Put user-editable config in persisted context (or a config file), edited through the UI via an intent message, and read by the flow at execution time.

**Good to know**

- **Watch out** — If a value would ever be changed through a button or form, it is not an env var.

:::
::::
</content>
</invoke>
