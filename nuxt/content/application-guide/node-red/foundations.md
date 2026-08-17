---
title: Foundations
navTitle: Foundations
navOrder: 2
guide: node-red
slug: foundations
blurb: "The handful of concepts you need to build with Node-RED, and how they fit together."
---

# Foundations

The handful of concepts you need to build with Node-RED, and how they fit together. You wire pre-built nodes into flows and spend your effort on the logic — what the system should do — while the platform handles the syntax and the connectivity. Learn these and you can build real integrations in Node-RED with only a little JavaScript — the structure carries most of the weight.

## How it fits together

![A message enters a Node-RED flow and passes from node to node, transformed along the way, until it reaches a sink; shared state lives in context](/images/application-guide/node-red/foundations-big-picture.svg)

A **message** enters a **flow** and passes from **node** to node, transformed along the way, until it reaches a sink that sends and routes nothing. Reuse comes from **subflows** and **link nodes**; shared state lives in **context**; new capabilities come from installing nodes off the **palette**.

## The core pieces

- **Node** — A single processing block: it receives a message, does one thing — read, transform, call, route — and passes it on.
- **Flow** — Nodes wired left-to-right on a tab; a message enters, is transformed, and exits. One working unit of automation.
- **Message (msg)** — The object that travels the wires, carrying **msg.payload** plus metadata between nodes.
- **Subflow** — A block you define once and drop in many places, with its own inputs, outputs and per-instance config.
- **Link nodes** — link in / link out / link call wire flows together across tabs with no visible wires — your in-process service calls.
- **Context** — Storage that keeps state between messages — flow and global scope, in memory or persisted.
- **Palette** — The library of installable nodes (npm) you add new capabilities from.
- **Editor & runtime** — The browser editor where you wire flows, and the runtime that executes them continuously.

::callout{icon="i-lucide-book-open"}
**In the Node-RED docs** — that's the working model. For the full glossary — every core term and node type, straight from the Node-RED project — see the [official Node-RED documentation](https://nodered.org/docs/user-guide/concepts) instead of a glossary here.
::
