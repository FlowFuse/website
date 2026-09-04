---
title: "Foundations"
navTitle: "Foundations"
navOrder: 1
meta:
    description: "The handful of concepts you need to build with Node-RED, and how they fit together."
---

# Foundations

The handful of concepts you need to build with Node-RED, and how they fit together. You wire pre-built nodes into flows and spend your effort on the logic — what the system should do — while the platform handles the syntax and the connectivity. Learn these and you can build real integrations in Node-RED with only a little JavaScript — the structure carries most of the weight.

## How it fits together

::flow-diagram
---
nodes:
  - { id: msgin, label: "Message in", sub: "http in / inject" }
  - { id: transform, label: "Node", sub: "transform" }
  - { id: route, label: "Node", sub: "route" }
  - { id: sink, label: "Sink", sub: "no routing" }
  - { id: context, label: "Context", sub: "shared state", accent: green, col: 3, row: 2 }
edges:
  - msgin>transform
  - transform>route
  - route>sink
  - { from: route, to: context, dir: both, accent: green, label: "read / write state" }
---
::

A **message** enters a **flow** and passes from **node** to node, transformed along the way, until it reaches a sink that sends and routes nothing. Reuse comes from **subflows** and **link nodes**; shared state lives in **context**; new capabilities come from installing nodes off the **palette**.

## What it connects to

Node-RED's reach comes from its nodes: install one for a protocol or service and the instance can talk to it. The same runtime — a Hosted Instance in the cloud or a Remote Instance on your own hardware — reaches field hardware, databases, message buses, cloud services and other systems. And **any instance can serve its own Dashboard** for the people who use it.

::arch-diagram
---
nodes:
  - { id: dash, label: "Dashboard", sub: "its own operator UI", accent: blue, col: 1, row: 1 }
  - { id: db, label: "Databases", sub: "SQL · time-series", accent: green, col: 2, row: 1 }
  - { id: mqtt, label: "Brokers", sub: "MQTT · UNS", accent: teal, col: 3, row: 1 }
  - { id: cloud, label: "Cloud services", sub: "AWS · Azure · GCP", accent: blue, col: 4, row: 1 }
  - { id: inst, label: "Instance", sub: "hosted or remote — same runtime", accent: indigo, span: 2, col: 2, row: 2 }
  - { id: plc, label: "PLCs", sub: "controllers", col: 1, row: 3 }
  - { id: io, label: "Sensors & IO", sub: "signals", col: 2, row: 3 }
  - { id: gw, label: "Gateways", sub: "protocol bridges", col: 3, row: 3 }
  - { id: api, label: "HTTP / APIs", sub: "REST · services", accent: blue, col: 4, row: 3 }
edges:
  - { from: inst, to: dash, label: "serves" }
  - { from: inst, to: db, dir: both }
  - { from: inst, to: mqtt, dir: both }
  - { from: inst, to: cloud, dir: both }
  - { from: inst, to: plc, dir: both }
  - { from: inst, to: io, dir: both }
  - { from: inst, to: gw, dir: both }
  - { from: inst, to: api, dir: both }
---
::

## The core pieces

- **Node** — A single processing block: it receives a message, does one thing — read, transform, call, route — and passes it on.
- **Flow** — Nodes wired left-to-right on a tab; a message enters, is transformed, and exits. One working unit of automation.
- **Message (msg)** — The object that travels the wires, carrying **msg.payload** plus metadata between nodes.
- **Subflow** — A block you define once and drop in many places, with its own inputs, outputs and per-instance config.
- **Link nodes** — link in / link out route messages across tabs with no visible wires; **link call** is the one that *returns* — your in-process service call.
- **Context** — Storage that keeps state between messages — flow and global scope, in memory or persisted.
- **Palette** — The library of installable nodes (npm) you add new capabilities from.
- **Editor & runtime** — The browser editor where you wire flows, and the runtime that executes them continuously.

::callout{icon="i-lucide-book-open"}
**In the Node-RED docs** — that's the working model. For the full glossary — every core term and node type, straight from the Node-RED project — see the [official Node-RED documentation](https://nodered.org/docs/user-guide/concepts) instead of a glossary here.
::
