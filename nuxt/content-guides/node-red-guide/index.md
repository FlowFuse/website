---
title: "Designing Node-RED flows"
navTitle: "Designing Node-RED flows"
navOrder: 2
navGroup: "Application Guide"
navGroupOrder: 0
meta:
    description: "The map of the Node-RED guide — the pattern families that turn an app into a clean flow."
---

# Designing Node-RED flows

Turn an architecture sentence into a clean flow shape you can read at a glance.

**Node-RED — start here**

Node-RED is a visual programming platform for integration and logic: you build by wiring pre-built nodes into flows. The connectors and the syntax are handled for you, so your effort goes into what the system should do — the logic — not the plumbing to connect things or the boilerplate of a language.

::callout{icon="i-lucide-flag"}
**New here? Start with the [Foundations →](/docs/node-red-guide/foundations/)**
::

::callout{icon="i-lucide-sparkles"}
**Writing flows? Keep to [Good form →](/docs/node-red-guide/patterns/good-form/)** — the habits that keep a flow readable and out of spaghetti: call shared things, one path per beginning, decouple UI from logic, catch errors where you can see them.
::

## The patterns, by family

### [Design patterns](/docs/node-red-guide/patterns/design-patterns/)

- **Find the seams** — Name the three or four components hiding in a flow.
- **Levels of reuse** — Reuse each piece at the lightest rung: link in/out, link call, subflow, or packaged node.

### [Handling data (PLC)](/docs/node-red-guide/patterns/handling-data/)

- **Classify the data** — Name each signal by shape, purpose, and direction.
- **Separate the paths** — Give telemetry and control their own routes.
- **Batch / rate-limit** — Pace a fast source into a slow sink so memory doesn't blow.
- **Hold state in context** — Keep a logical object in context, not threaded through wires.
- **Config** — Static in env vars, runtime in persisted context.

### [Worked examples](/docs/node-red-guide/worked-examples/)

- **OEE - Edge Aggregator** — the edge piece as a reusable subflow: poll, read, compute, publish.
- **OEE - Central Dashboard** — subscribe, compute, dashboard, fanning out via link out to a second link in for batched history.

::callout{icon="i-lucide-arrow-right"}
**Ready to build one?** These are the shapes a flow should take. [Using FlowFuse](/docs/user/) covers working with instances, snapshots and the editor itself.
::
