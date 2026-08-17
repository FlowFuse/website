---
title: Handling data
navTitle: Handling data
navOrder: 5
guide: node-red
slug: handling-data
blurb: "Sort data by what it is for before you tune anything. Telemetry and control have different timing needs — classify them, respect the controller's scan budget, and give each its own path so the fast path never inherits the slow one's load."
---

# Handling data

**Handling data — start here**

Sort data by what it is for before you tune anything. Telemetry and control have different timing needs — classify them, respect the controller's scan budget, and give each its own path so the fast path never inherits the slow one's load.

:::guide-tabs
::guide-tab{label="Classify the data"}
**Sort by purpose first** — telemetry is continuous and latency-tolerant; control is small and time-critical. Don't poll it all at the fast rate.

![Classify the data — diagram](/images/application-guide/node-red/handling-data-hd-classify.svg)

Before tuning anything, sort the data by what it is for. Telemetry is continuous and latency-tolerant. Control data is small and time-critical. Config is written rarely.

**Use it when** — The common mistake is treating every point as one population and polling all of it at the fastest rate. That is what creates load a controller cannot sustain.

**How it works** — Ask whether a delay changes a control decision or only a timestamp, whether it is read or write, and what cadence the data actually needs versus how fast it is polled today.

**Good to know**

- **Good for** — Deciding which few points genuinely need the fast path, usually far fewer than ride it.

::
::guide-tab{label="How PLCs respond"}
**Mind the scan budget** — comms is only one slice of a PLC's per-scan budget; fast-polling everything starves the data that needs the rate.

![How PLCs respond — diagram](/images/application-guide/node-red/handling-data-hd-plc.svg)

A PLC has a finite budget per scan, and communications is only one slice of it. Every poll, read, and connection costs the controller.

**Use it when** — Polling a large set of points fast spends the budget on data that did not need the rate, leaving less headroom for the data that does.

**How it works** — Know which direction a connection is established and that each protocol is its own driver. Common protocols (MQTT, OPC UA, WebSocket, Modbus TCP) are not deterministic; data handling, not the runtime, decides the timing you hit.

**Good to know**

- **Watch out** — test one signal end to end, isolated from the rest, so you measure the transport itself and not your application logic.

::
::guide-tab{label="Treat data reliably"}
**Split read from event-driven** — buffer telemetry and batch it to a time-series DB; keep the control path lean and on its own.

![Treat data reliably — diagram](/images/application-guide/node-red/handling-data-hd-reliable.svg)

Separate read traffic from event-driven traffic, then handle each on its own path. This split is the foundational step; everything else follows from it.

**Use it when** — Telemetry and control have different timing needs. Sharing one path and one protocol makes the fast path inherit the load of the slow one.

**How it works** — Buffer telemetry in the PLC and pull it at its real cadence, timestamped at acquisition. Batch it into a time-series database. Keep the control path to the minimum tag set on a dedicated, faster route.

**Good to know**

- **Good for** — Batched inserts into a time-series DB land at a fraction of the overhead of individual writes.

::
:::
