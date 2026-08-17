---
title: Flow shape
navTitle: Flow shape
navOrder: 3
guide: node-red
slug: flow-shape
blurb: "Turn an architecture sentence into a flow you can read at a glance. Four shape rules — where paths begin, how they share services, when to reuse as a subflow vs a link call, and where they end — draw the flow for you."
---

# Flow shape

**Flow shape — start here**

Turn an architecture sentence into a flow you can read at a glance. Four shape rules — where paths begin, how they share services, when to reuse as a subflow vs a link call, and where they end — draw the flow for you.

:::guide-tabs
::guide-tab{label="Beginnings"}
**Entry paths** — list every entry first; keep each path separate, don't funnel through one front door.

![Beginnings — diagram](/images/application-guide/node-red/flow-shape-fs-beginnings.svg)

Every way work enters a piece: an http in, an MQTT in, an inject or timer. Each beginning is its own path.

**Use it when** — You are laying out a piece and want to see its paths before wiring. List the entries first, and do not funnel them through one shared front door.

**How it works** — Draw one row per beginning. Each row runs straight: beginning, prep, a call to services, then a sink. The paths stay separate the whole way across.

**Good to know**

- **Good for** — Keeping a device path and a browser path from running through each other.

::
::guide-tab{label="Shared services (link call)"}
**Shared services** — expose a resource once behind link-in/out; every path calls it, results return, no central router.

![Shared services (link call) — diagram](/images/application-guide/node-red/flow-shape-fs-services.svg)

Anything that holds a connection or is a common dependency many paths use: a database pool, a model call, a broker. You call it and the result returns to the caller.

**Use it when** — More than one path needs the same resource and you do not want a copy per path. One pool, one call, a result back to whoever asked.

**How it works** — Expose the resource once behind a link in that ends in a returning link out. Each path uses link call, and results come back with no central router to build.

**Good to know**

- **Good for** — One DB pool serving every read and write path without mixing them.

::
::guide-tab{label="Subflow vs link call"}
**Reuse: subflow or link call** — link call for one fixed config; subflow only when it needs per-instance config or cross-instance reuse.

![Subflow vs link call — diagram](/images/application-guide/node-red/flow-shape-fs-subvscall.svg)

Both reuse logic, but they are not interchangeable. A link call shares one fixed configuration; a subflow is a reusable assembly with its own per-instance config.

**Use it when** — Use a subflow only if it needs per-instance config, or it is reused in other Node-RED instances. Otherwise a link call is lighter and enough.

**How it works** — Single config and single project means link call. Different settings per drop, or reuse across other Node-RED instances, means subflow. Start as a link call and promote it if it earns the distribution.

**Good to know**

- **Watch out** — Defaulting to subflows for everything duplicates connections and adds indirection.

::
::guide-tab{label="Single sink"}
**Single sink** — each family converges on one sink that routes nothing; keep the decisions upstream.

![Single sink — diagram](/images/application-guide/node-red/flow-shape-fs-endings.svg)

The one sink each family of paths converges on — an http response, an MQTT publish, or a dashboard update — reached by a labeled link. It only sends; no decisions live here.

**Use it when** — Every path in a surface needs to end somewhere, and that ending should route nothing. Keep the logic upstream so the sink makes no routing decisions.

**How it works** — Point each path at one labeled sink that only sends and never branches — an http response, an MQTT publish, or a dashboard update. Reads and writes converge there; an HTTP path responds exactly once, a streaming path simply emits.

**Good to know**

- **Watch out** — If a node everything passes through decides where things go, that is a router. Split it back out.

::
:::
