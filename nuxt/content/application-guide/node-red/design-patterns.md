---
title: Design patterns
navTitle: Design patterns
navOrder: 3.1
guide: node-red
slug: design-patterns
blurb: "Find the three or four components hiding in a blob, then reuse each at the lightest level that solves it — link in/out, link call, subflow, or packaged node."
parent: patterns
---

# Design patterns

**Design patterns — start here**

Most spaghetti is three or four well-defined components that were never named. Before reaching for reuse, **find the seams**: look for a repeated cluster, a logical stage (ingest → normalize → enrich → publish), a bounded responsibility, or a reuse magnet, and draw a box around each.

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

Then reuse each piece at the **lightest level that solves it**. There are four levels of extraction, cheapest first — pick the lowest rung that works; each rung up buys more reuse but costs more to build and maintain.

::::guide-tabs
:::guide-tab{label="Palette node"}
**Real packaged code** — installable and distributable, versioned like a dependency.

The top rung: package a piece as an installable palette node with real code. It is the most powerful level of reuse and the most to maintain — the same **custom node** the [FlowFuse app delivery methods](/application-guide/flowfuse/app-delivery-methods/) publish for reuse across apps.

**Use it when** — The piece is used across many projects or teams and deserves to be versioned, installed, and upgraded like a library dependency — not copied.

**Good to know**

- **Watch out** — A palette node is real code with a real release cycle. Don't take this rung until link call and subflow genuinely can't cover the reuse.

:::
:::guide-tab{label="Subflow"}
**A reusable assembly with its own config** — drop it in many times, each with its own per-instance settings.

::flow-diagram
---
nodes:
  - { id: callerA, label: "caller A", col: 1, row: 1 }
  - { id: pool, label: "link call", sub: "one shared config", accent: teal, col: 2, row: 1 }
  - { id: callerB, label: "caller B", col: 1, row: 2 }
  - { id: inst1, label: "subflow", sub: "config A", accent: indigo, col: 4, row: 1 }
  - { id: inst2, label: "subflow", sub: "config B", accent: indigo, col: 4, row: 2 }
edges:
  - callerA>pool
  - callerB>pool
groups:
  - { label: "LINK CALL · one shared config", accent: indigo, nodes: [callerA, pool, callerB] }
  - { label: "SUBFLOW · config per instance", accent: indigo, nodes: [inst1, inst2] }
---
::

Both a link call and a subflow reuse logic, but they are not interchangeable. A link call shares one fixed configuration; a subflow is a reusable assembly with its own per-instance config. Reach for a subflow only when a piece needs per-instance config, or reuse across other Node-RED instances.

**Use it when** — The piece needs different settings per drop, or it is reused across other Node-RED instances. Otherwise a link call is lighter and enough. Start as a link call and promote it if it earns the distribution.

**Good to know**

- **Watch out** — Defaulting to subflows for everything duplicates connections and adds indirection.

:::
:::guide-tab{label="Link call"}
**A shared, returning service** — expose a resource once; every path calls it and the result comes back, no central router.

::flow-diagram
---
align: left
nodes:
  - { id: a, label: "GET /assets", accent: indigo, col: 1, row: 1 }
  - { id: b, label: "GET /knowledge", accent: indigo, col: 1, row: 2 }
  - { id: c, label: "POST /knowledge", accent: indigo, col: 1, row: 3 }
  - { id: call, label: "link call", sub: "one shared service", accent: teal, col: 2, row: 2 }
  - { id: db, label: "SQL database", sub: "one pool", accent: green, col: 3, row: 2 }
edges:
  - a>call
  - b>call
  - c>call
  - { from: call, to: db, dir: both, label: "result back" }
---
::

The workhorse for shared services — anything that holds a connection or is a common dependency many paths use: a database pool, a model call, a broker. Expose it once behind a link in that ends in a returning link out; each path calls it and the result returns to whoever asked, with no central router to build.

**Use it when** — More than one path needs the same resource and you do not want a copy per path. One pool, one call, a result back to whoever asked.

**Good to know**

- **Good for** — One DB pool serving every read and write path without mixing them.

:::
:::guide-tab{label="Link in / out"}
**Tidiness only** — organize a flow and route between tabs; this is not a reusable unit.

Link in and link out tidy wiring and route messages tab-to-tab. They keep a canvas readable, but they are organization, not modularity — nothing is packaged or reused, the message just jumps to a labelled point.

**Use it when** — You want to de-clutter wires or route between tabs without dragging a wire across the whole canvas.

**Good to know**

- **Watch out** — Link nodes are organization, not modularity. Do not mistake tidiness for a reusable unit.

:::
::::
