---
title: Overview
navTitle: Overview
navOrder: 1
guide: node-red
slug: overview
blurb: "The map of the Node-RED guide — the pattern families that turn an app into a clean flow."
---

# Overview

Turn an architecture sentence into a clean flow shape you can read at a glance.

**Node-RED — start here**

Node-RED is a visual programming platform for integration and logic: you build by wiring pre-built nodes into flows. The connectors and the syntax are handled for you, so your effort goes into what the system should do — the logic — not the plumbing to connect things or the boilerplate of a language.

::callout{icon="i-lucide-flag"}
**New here? Start with the [Foundations →](/application-guide/node-red/foundations/)**
::

::callout{icon="i-lucide-sparkles"}
**Writing flows? Keep to [Good form →](/application-guide/node-red/good-form/)** — the habits that keep a flow readable and out of spaghetti: call shared things, one path per beginning, decouple UI from logic, catch errors where you can see them.
::

## The patterns, by family

### [Design patterns](/application-guide/node-red/design-patterns/)

- **Find the seams** — Name the three or four components hiding in a flow.
- **Levels of reuse** — Reuse each piece at the lightest rung: link in/out, link call, subflow, or packaged node.

### [Handling data (PLC)](/application-guide/node-red/handling-data/)

- **Classify the data** — Name each signal by shape, purpose, and direction.
- **Separate the paths** — Give telemetry and control their own routes.
- **Batch / rate-limit** — Pace a fast source into a slow sink so memory doesn't blow.
- **Hold state in context** — Keep a logical object in context, not threaded through wires.
- **Config** — Static in env vars, runtime in persisted context.

### [Worked examples](/application-guide/node-red/worked-examples/)

- **OEE - Edge Aggregator** — the edge piece as a reusable subflow: poll, read, compute, publish.
- **OEE - Central Dashboard** — subscribe, compute, dashboard, fanning out via link out to a second link in for batched history.
