---
title: Operating flows
navTitle: Operating flows
navOrder: 6
guide: node-red
slug: operating-flows
blurb: "A clean flow shape isn't enough to survive production. Four operational habits keep a flow running when the real world pushes back: catch errors on a path you control, pace fast inputs so memory doesn't blow, deploy with the smallest restart, and keep the flow observable."
---

# Operating flows

**Operating flows — start here**

A clean flow shape isn't enough to survive production. Four operational habits keep a flow running when the real world pushes back: catch errors on a path you control, pace fast inputs so memory doesn't blow, deploy with the smallest restart, and keep the flow observable.

:::guide-tabs
::guide-tab{label="Error handling"}
**Design the error path** — a Catch node per tab turns a thrown error into a route you control, not a silent stall.

![Error handling — diagram](/images/application-guide/node-red/operating-flows-op-error.svg)

Every flow that talks to the outside world will fail sometimes — a DB is down, a payload is malformed, a request times out. Node-RED routes those failures to a Catch node instead of crashing; you decide what happens next.

**Use it when** — Any flow with I/O: HTTP calls, DB writes, broker publishes, file access — i.e. almost all of them.

**How it works** — Drop a Catch node on the tab (scope it to specific nodes or the whole tab). Throw with node.error(msg, msg) so the message reaches Catch. From Catch, branch to log, notify, or retry — and on an API flow, respond with an error status instead of hanging. Pair with a Status node to surface node health on the canvas.

**Good to know**

- **Watch out** — an unscoped tab-wide Catch that re-runs your success/response nodes will double-respond; keep the error path separate from the happy path.

::
::guide-tab{label="Backpressure & memory"}
**Pace the fast side to the slow side** — when input outruns a sink, the queue grows and the heap blows. This is the #1 event-driven failure.

![Backpressure & memory — diagram](/images/application-guide/node-red/operating-flows-op-backpressure.svg)

A fast source (an MQTT topic, a tight poll) feeding a slow sink (a DB write, an API) has no natural brake. Messages pile up in memory faster than they drain, and the runtime eventually runs out of heap and dies.

**Use it when** — Any high-rate or bursty input into a slower downstream — telemetry to a database, fan-out to a remote API.

**How it works** — Pace the slow side explicitly: a delay node in rate-limit mode, batching (join into chunks), or dropping stale readings when only the latest matters. Batched inserts also cut per-write overhead. Watch heap and the node's queue; if it only grows, you have backpressure, not a spike.

**Good to know**

- **Watch out** — a backend that holds a live connection (an MQTT subscription) can't be pooled away; pace at the source or offload the heavy work.

::
::guide-tab{label="Deploy modes"}
**Pick the smallest restart that ships the change** — Full vs Modified Flows vs Modified Nodes decide what stops and what keeps running.

![Deploy modes — diagram](/images/application-guide/node-red/operating-flows-op-deploy.svg)

Deploy doesn't just save — it restarts nodes, and that drops their connections and in-flight state. Node-RED offers three scopes so you don't restart the world for a one-node change.

**Use it when** — Every deploy to a running system, especially one holding live connections (brokers, serial, websockets) you don't want to bounce.

**How it works** — Modified Nodes (the default) restarts only nodes you edited — least disruptive. Modified Flows restarts changed tabs. Full restarts everything and drops all connections. Prefer the smallest scope; use Full when config nodes or global state changed. Deploying via the Admin API (POST /flows) takes a Node-RED-Deployment-Type header that sets the same modes.

**Good to know**

- **Watch out** — nodes holding a connection re-initialise on restart; a Full deploy on a busy broker flow drops and re-subscribes everything.

::
::guide-tab{label="Debugging"}
**Make the flow observable** — tap the wire, surface node state, and keep enough on the message to trace it.

![Debugging — diagram](/images/application-guide/node-red/operating-flows-op-debug.svg)

You can't fix what you can't see. Node-RED gives you live message inspection and per-node status without stopping the flow — use them instead of guessing.

**Use it when** — Building, and any time a flow misbehaves in a way the shape doesn't explain.

**How it works** — Drop a debug node to tap any wire (view msg.payload or the full msg, and route to the sidebar). Call node.status() / node.warn() to surface state and hints on the canvas. Keep enough context on the message to trace a request end-to-end — but don't ship fat debug payloads to production dashboards.

**Good to know**

- **Good for** — confirming which branch a message took and what it carried, before assuming the logic is wrong.

::
:::
