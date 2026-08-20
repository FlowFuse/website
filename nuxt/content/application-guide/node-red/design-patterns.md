---
title: Design patterns
navTitle: Design patterns
navOrder: 3.1
guide: node-red
slug: design-patterns
blurb: "The structural choices you select for a flow: find the seams it breaks into, then reuse each piece at the lightest level that solves it — link in/out, link call, subflow, or packaged node."
parent: patterns
---

# Design patterns

**Design patterns — pick how a flow is structured and reused**

A design pattern is a structural choice you make for a piece of a flow. Building a flow you'll select one or more: first **find the seams** — the components the flow really breaks into — then, for each piece worth reusing, pick the **level of reuse** that fits. Reuse is a ladder — link in/out → link call → subflow → palette node — and each rung up buys more reuse but costs more to build and maintain, so climb only when the rung below won't do.

::::guide-tabs
:::guide-tab{label="Find the seams"}
**Name the pieces first** — before any reuse, find the components hiding in the flow and draw a box around each.

Most spaghetti is three or four well-defined components that were never named. A giant flow is bad because it has no seams: you can't reuse, test, or hand off part of a blob, and any edit means reading the whole tab. Naming the structure is the fix — not tidier wires.

::flow-diagram
---
nodes:
  - { id: ingest, label: "Ingest", accent: indigo }
  - { id: normalize, label: "Normalize", accent: indigo }
  - { id: enrich, label: "Enrich", accent: indigo }
  - { id: publish, label: "Publish", accent: indigo }
edges:
  - ingest>normalize
  - normalize>enrich
  - enrich>publish
---
::

Look for one of these and box it off:

- **A repeated cluster** — the same three or four nodes appearing in more than one place.
- **A logical stage** — ingest, normalize, enrich, publish; each a bounded step with a clear input and output.
- **A bounded responsibility** — one thing the piece owns from end to end.
- **A reuse magnet** — a piece other flows will obviously want.

Once the seams are named, each becomes a candidate for reuse — and *how* you reuse it is the choice in the tabs that follow. A piece you'll only ever use once still earns its box; it just stays a plain seam.

:::
:::guide-tab{label="Link in / out"}
**Route within one instance** — *local · organization, not reuse.*

Link in and link out route messages between points and tabs inside a single Node-RED instance, without dragging a wire across the canvas. One link out can feed many link ins — **one producer, many consumers** — so it's the clean way to fan a message out to several independent paths.

::flow-diagram
---
align: left
nodes:
  - { id: prod, label: "producer", sub: "one source", accent: indigo, col: 1, row: 2 }
  - { id: lout, label: "link out", sub: "broadcast", accent: indigo, col: 2, row: 2 }
  - { id: lin1, label: "link in", accent: indigo, col: 3, row: 1 }
  - { id: c1, label: "consumer A", accent: slate, col: 4, row: 1 }
  - { id: lin2, label: "link in", accent: indigo, col: 3, row: 2 }
  - { id: c2, label: "consumer B", accent: slate, col: 4, row: 2 }
  - { id: lin3, label: "link in", accent: indigo, col: 3, row: 3 }
  - { id: c3, label: "consumer C", accent: slate, col: 4, row: 3 }
edges:
  - prod>lout
  - { from: lout, to: lin1, dashed: true, label: "link" }
  - { from: lout, to: lin2, dashed: true }
  - { from: lout, to: lin3, dashed: true }
  - lin1>c1
  - lin2>c2
  - lin3>c3
legend:
  - { line: neutral, dashed: true, label: "link out → link in" }
---
::

Nothing is packaged or reused, though — the message just teleports to the matching link.

**Select it when** — you need to tidy wiring, route between tabs, or fan one message out to several consumers. It's the bottom rung: routing and organization, no reuse of logic.

**Not this when** — you're trying to share *work*. The moment more than one path needs the same logic or resource, climb to a link call.

**Stays local** — link in/out never leave the instance and distribute nothing.

:::
:::guide-tab{label="Link call"}
**A shared, returning service** — *local · one instance.*

Turn a link-in / link-out pair into a callable service: a piece of work exposed once that any path calls and that returns the result to whoever called it, with no central router to build. It's the workhorse for shared services inside one instance — a database pool, a model call, a broker connection, a common transform.

::flow-diagram
---
align: left
nodes:
  - { id: in, label: "http in", sub: "a request", accent: indigo, col: 1, row: 1 }
  - { id: lc, label: "link call", sub: "calls the service", accent: teal, col: 2, row: 1 }
  - { id: resp, label: "http response", sub: "the end · sends result", accent: indigo, col: 3, row: 1 }
  - { id: lin, label: "link in", sub: "service entry", accent: green, col: 1, row: 2 }
  - { id: pool, label: "SQL pool", sub: "one shared connection", accent: green, col: 2, row: 2 }
  - { id: lout, label: "link out", sub: "return mode", accent: green, col: 3, row: 2 }
groups:
  - { id: svc, label: "Shared service · every path calls this one link in", accent: green, nodes: [lin, pool, lout] }
edges:
  - in>lc
  - lc>resp
  - lin>pool
  - pool>lout
  - { from: lc, to: lin, dashed: true, label: "call", accent: teal }
  - { from: lout, to: lc, dashed: true, label: "return", accent: teal }
legend:
  - { line: teal, dashed: true, label: "call / return" }
---
::

**Select it when** — more than one path needs the same resource or logic and you don't want a copy per path. Each path calls the one shared service, the result comes back, and the path finishes at its own sink — an http response here. No funnel: the shared service has exactly one wire in.

**The trade-off** — every caller shares *one* configuration. That's the point when the config is fixed; it's the limit when each use needs its own settings — which is when you climb to a subflow.

**Stays local** — reuse within one instance; it doesn't package or distribute.

:::
:::guide-tab{label="Subflow"}
**A packaged set of actions, with its own config** — *cross-instance.*

A subflow bundles a *set of actions* — several nodes — into one reusable node you can drop into a flow many times, each instance carrying its own configuration. Unlike a link call, which shares one fixed config, a subflow is a packaged assembly that varies per drop, and it travels between Node-RED instances.

::flow-diagram
---
align: left
nodes:
  - { id: a1, label: "validate", col: 1, row: 1 }
  - { id: a2, label: "transform", col: 2, row: 1 }
  - { id: a3, label: "publish", col: 3, row: 1 }
  - { id: n1, label: "subflow", sub: "config A", accent: indigo, col: 1, row: 2 }
  - { id: n2, label: "subflow", sub: "config B", accent: indigo, col: 2, row: 2 }
  - { id: n3, label: "subflow", sub: "config C", accent: indigo, col: 3, row: 2 }
groups:
  - { id: def, label: "Subflow · a set of actions packaged into one node, authored once", accent: teal, nodes: [a1, a2, a3] }
  - { id: uses, label: "Reused · that one node dropped in, each with its own config", accent: indigo, nodes: [n1, n2, n3] }
edges:
  - a1>a2
  - a2>a3
  - { from: def, to: uses, dashed: true, label: "packaged as one node" }
---
::

**Select it when** — a piece needs per-instance config (the same logic, different settings each place), or you need to reuse it across other Node-RED instances. Start as a link call and promote to a subflow only once it earns that.

**The trade-off** — heavier than a link call: each instance duplicates its connections, and defaulting to subflows for everything adds indirection. Use it for genuine per-instance reuse, not as the default.

:::
:::guide-tab{label="Palette node"}
**Real packaged code** — *distributed.*

The top rung: package a piece as an installable palette node — real code, versioned and installed like any library dependency. It's the same **custom node** the [FlowFuse app delivery methods](/application-guide/flowfuse/app-delivery-methods/) publish for reuse across apps, and the point where Node-RED reuse hands off to the FlowFuse guide's distribution story.

**Select it when** — a piece is used across many projects or teams and deserves to be versioned, installed, and upgraded like a dependency — not copied, and beyond what a shared subflow can carry.

**The trade-off** — it's real code with a real release cycle: a package to build, test, and maintain. The most powerful reuse and the most to own. Don't take this rung until link call and subflow genuinely can't cover it.

:::
::::
