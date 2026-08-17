---
title: Overview
navTitle: Overview
navOrder: 1
guide: node-red
slug: overview
blurb: "The map of the Node-RED guide — the four-move method and the patterns by family."
---

# Overview

Turn an architecture sentence into a clean flow shape you can read at a glance.

**Node-RED — start here**

Node-RED is a visual programming platform for integration and logic: you build by wiring pre-built nodes into flows. The connectors and the syntax are handled for you, so your effort goes into what the system should do — the logic — not the plumbing to connect things or the boilerplate of a language.

::callout{icon="i-lucide-flag"}
**New here? Start with the [Foundations →](/application-guide/node-red/foundations/)**
::

## The method, in four moves

1. **List the beginnings** — Every way work enters the piece: an http in, an MQTT in, an inject. Each beginning is its own path.
2. **Name the shared services** — The pools and calls many paths depend on: a database pool, a model call, the broker. Call them, results return.
3. **Pick the single sink** — The one sink each family of paths converges on. It responds, it routes nothing.
4. **Draw the shape** — Paths across, services called in the middle, one sink each. Now you can read the flow at a glance.

## The patterns, by family

### [Flow shape](/application-guide/node-red/flow-shape/)

- **Beginnings** — Every way work enters a piece, each as its own path.
- **Shared services (link call)** — Shared pools and calls, invoked once, results return.
- **Subflow vs link call** — When a link call is enough, and when a subflow earns its keep.
- **Single sink** — The one sink each family of paths converges on — it only sends, never routes.

### [Design patterns](/application-guide/node-red/design-patterns/)

- **Find the seams** — Find the three or four components hiding in a blob.
- **Levels of reuse** — Pick the lowest rung of extraction that solves it.
- **Decouple frontend & backend** — Treat the dashboard-to-logic boundary like a client and a server.
- **Use the context store** — Hold the object in context instead of threading it through wires.
- **Config: env vars vs persisted context** — Env vars for deploy-time, persisted context for user edits.
- **Generating flows (Admin API)** — Emit flow JSON and deploy it through the Admin API.

### [Handling data (PLC)](/application-guide/node-red/handling-data/)

- **Classify the data** — Sort data by what it is for before tuning anything.
- **How PLCs respond** — Every poll spends a slice of the controller scan budget.
- **Treat data reliably** — Split telemetry from control, each on its own path.

### [Worked example](/application-guide/node-red/worked-example/)

- **Napkin: multi-surface app** — One app reached three ways over shared services.
- **Good vs bad** — The same requirement built with and without seams.
