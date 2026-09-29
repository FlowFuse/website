---
title: "Handling data"
navTitle: "Handling data"
navOrder: 2
meta:
    description: "Classify each signal by shape, purpose and direction, then pick the methods it needs — separate the paths, pace the flow, hold state in context, and manage config. The methods you select to move a flow's data."
---

# Handling data

**Handling data — classify what you've got, then pick your methods**

A flow's data isn't one thing. First **classify** each signal — by shape, purpose, and direction — then select the handling methods each kind needs. Building a flow you'll usually reach for more than one: separate the paths, pace the flow, hold state in context, manage config. Start in the first tab; the rest are the methods you choose from.

::::guide-tabs
:::guide-tab{label="Classify the data"}
**Know what kind of data you're handling** — before you pick any method, name each signal by its shape, its purpose, and its direction. What a signal *is* decides how you move it, how fast, and where it's stored. Mixing kinds — and polling everything at the fastest rate — is what creates load a controller can't sustain.

Every point you touch is some combination of the three:

**By shape — is it an event or a stream?**

- **Event** — something happened at a moment: a button press, a state change, a fault, a batch complete. Discrete and irregular, and each one matters on its own. You handle it *when it fires* — you don't poll for it.
- **Stream** — a continuous series of readings sampled on a clock: temperature, flow, level, vibration. Regular and high-volume, where the latest value usually matters more than any single earlier one. You read it *at a cadence* and often only keep the trend.

**By purpose — what is the value for?**

::flow-diagram
---
align: left
nodes:
  - { id: src, label: "a signal", sub: "event or stream", accent: slate, col: 1, row: 2 }
  - { id: telemetry, label: "Telemetry", sub: "observe & trend · latency-tolerant", accent: green, col: 2, row: 1 }
  - { id: control, label: "Control", sub: "drives a decision · time-critical", accent: red, col: 2, row: 2 }
  - { id: config, label: "Config", sub: "shapes the app · written rarely", accent: slate, col: 2, row: 3 }
edges:
  - { from: src, to: telemetry }
  - { from: src, to: control }
  - { from: src, to: config }
---
::

- **Telemetry** — readings you observe and trend. Continuous and latency-tolerant: a second late only moves a timestamp.
- **Control** — a value that drives a decision or an actuator. Small and time-critical: a second late changes an outcome.
- **Config** — a setting that shapes how the app runs. Written rarely, read often.

**By direction — read or write?**

Reading a value out of a device and writing one back into it are not the same cost or risk. Writes touch the process; treat them with more care and a tighter path than the reads you take for observation.

**Put it together** — for each point, ask: event or stream? Does a delay change a decision or only a timestamp? Read or write? Those three answers set its rate, its path, and its store — and point you at the methods in the next tabs. The common mistake is treating every point as one population and polling all of it at the fastest rate; usually only a handful genuinely need the fast path, and the rest just starve the ones that do.

:::
:::guide-tab{label="Separate the paths"}
**Telemetry one way, control another** — give each kind its own route so the fast path never inherits the slow one's load.

*Select when — a flow carries both telemetry and control (from Classify).* This split is the foundational method; the pacing and storage choices all follow from it.

::flow-diagram
---
align: left
nodes:
  - { id: plc, label: "PLC", sub: "reads · writes", col: 1, row: 2 }
  - { id: nodered, label: "Node-RED", sub: "splits by kind", accent: slate, col: 2, row: 2 }
  - { id: broker, label: "Broker", sub: "live telemetry · minimal set", accent: teal, col: 3, row: 1 }
  - { id: ctrl, label: "actuator / setpoint", sub: "control · lean, dedicated", accent: red, col: 3, row: 2 }
  - { id: sqldb, label: "SQL database", sub: "history telemetry · batched", accent: green, col: 3, row: 3 }
edges:
  - { from: plc, to: nodered, label: "reads" }
  - { from: nodered, to: broker, label: "live" }
  - { from: nodered, to: ctrl, label: "control write", accent: red }
  - { from: nodered, to: sqldb, label: "history, batched" }
---
::

Telemetry and control have different timing needs. Share one route and one protocol, and the fast, time-critical path inherits the load of the slow, high-volume one — a burst of telemetry can delay a control decision.

**How** — buffer telemetry in the source and pull it at its real cadence, timestamped at acquisition, then batch it into history. Keep the control path to the minimum tag set on a dedicated, faster route. Reads you take for observation and writes that touch the process never share a lane.

**The payoff** — the fast path stays lean no matter how much telemetry flows, and each kind can be paced and stored on its own terms.

:::
:::guide-tab{label="Batch / rate-limit"}
**Pace a fast source into a slow sink** — add the brake that a fast-in / slow-out path doesn't have on its own.

*Select when — a fast or bursty source (a stream, or high-rate events) feeds a slower sink.* This is the #1 event-driven failure, so reach for it whenever input can outrun output.

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

A fast source (an MQTT topic, a tight poll) feeding a slow sink (a DB write, a remote API) has no natural brake. Messages pile up in memory faster than they drain, and the runtime eventually runs out of heap and dies.

**How** — a delay node in rate-limit mode; batching (join into chunks), which also cuts per-write overhead; or dropping stale readings when only the latest matters. Watch heap and the node's queue — if it only grows, you have backpressure, not a spike.

**The tell** — a backend holding a live connection (an MQTT subscription) can't be pooled away; pace at the source or offload the heavy work.

:::
:::guide-tab{label="Hold state in context"}
**One place for state** — keep a logical object in context instead of threading it through wires.

*Select when — you're passing the same object through many nodes just to move it, or state must survive a restart.* Messages are verbs; context is nouns.

::flow-diagram
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

Context is shared memory with a defined scope. It holds a logical object in one place instead of threading it through fifteen nodes just to carry it — wire gymnastics to avoid storing a value is the real anti-pattern.

**How** — store the object once under a namespaced key at the narrowest scope that works. **Node** scope is private to that one node, so anything *shared* between nodes starts at **flow** scope (then **global** only if it must cross tabs). Each node reads the one key it needs, and a persistent store holds anything that must survive a restart.

**Watch out** — one writer per key, serialize concurrent updates, and keep enough on the wire to stay debuggable.

:::
:::guide-tab{label="Config"}
**Static in env vars, runtime in persisted context** — decide which kind each setting is, then store it accordingly.

*Select when — the flow has settings.* The question for each one: does it change per environment at deploy, or while running, by a user?

::flow-diagram
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

**Static config** changes per environment and is set at deploy — broker host, DB connection. It's resolved at deploy time and read-only to the running flow. **Runtime config** changes while running, by a user, with no redeploy.

**How** — keep static config in env vars or a config node; put user-editable config in persisted context (or a config file), edited through the UI via an intent message and read by the flow at execution time.

**The rule** — if a value would ever be changed through a button or form, it is not an env var.

:::
::::
