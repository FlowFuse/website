---
title: Design patterns
navTitle: Design patterns
navOrder: 4
guide: node-red
slug: design-patterns
blurb: "The moves that turn a flow into something you can reuse, test and hand off. Find the seams, pick the lightest level of reuse, keep the UI and logic apart, and hold state in context — then scale only when one instance proves it must."
---

# Design patterns

**Design patterns — start here**

The moves that turn a flow into something you can reuse, test and hand off. Find the seams, pick the lightest level of reuse, keep the UI and logic apart, and hold state in context — then scale only when one instance proves it must.

:::guide-tabs
::guide-tab{label="Find the seams"}
**Name the structure** — most spaghetti is three or four components never named; draw a box around each.

![Find the seams — diagram](/images/application-guide/node-red/design-patterns-dp-seams.svg)

A giant flow is bad because it has no seams. Most spaghetti is three or four well-defined components that were never named.

**Use it when** — You cannot reuse, test, or hand off a piece of a blob, and any edit means reading the whole tab. Naming the structure is the fix, not tidier wires.

**How it works** — Look for a repeated cluster, a logical stage (ingest, normalize, enrich, publish), a bounded responsibility, or a reuse magnet. Draw a box around each and extract it.

**Good to know**

- **Good for** — Splitting one tab into ingestion, processing, storage, and presentation.

::
::guide-tab{label="Levels of reuse"}
**Pick the lowest rung** — link in/out → link call → subflow → packaged node; each rung costs more than the one below.

![Levels of reuse — diagram](/images/application-guide/node-red/design-patterns-dp-ladder.svg)

When you find structure there are levels of extraction: link in and out, then link call, then subflow, then a packaged node. Pick the lowest one that solves the problem.

**Use it when** — Each rung costs more than the one below it. Reaching straight for a subflow or a custom node when a link call would do adds weight you do not need.

**How it works** — Link in and out for tidiness and tab-to-tab routing. Link call for a shared returning service. Subflow when it needs per-instance config or cross-instance reuse. Palette node for real code or distribution.

**Good to know**

- **Watch out** — Link nodes are organization, not modularity. Do not mistake tidiness for a reusable unit.

::
::guide-tab{label="Decouple frontend & backend"}
**UI ↔ logic like client ↔ server** — the backend sends a display-ready view-model; the frontend emits intent (action + payload).

![Decouple frontend & backend — diagram](/images/application-guide/node-red/design-patterns-dp-decouple.svg)

Treat the boundary between the Dashboard and your flow logic like a client and server API. The frontend renders state and emits intent; the backend holds the truth.

**Use it when** — The UI and the logic change at different rates. When you build payloads inside templates or cram logic next to a widget, every change touches both.

**How it works** — The backend sends a finished, display-ready view-model. The frontend emits a consistent intent message, an action plus a payload. Templates bind and emit; they never fetch, transform, or decide.

**Good to know**

- **Good for** — Redesigning the whole dashboard without touching a single business-logic node.

::
::guide-tab{label="Use the context store"}
**Context is shared memory** — hold the object in one place at the narrowest scope; messages are verbs, context is state.

![Use the context store — diagram](/images/application-guide/node-red/design-patterns-dp-context.svg)

Context is shared memory with a defined scope. It holds a logical object in one place instead of threading it through wires. Messages are verbs; context is nouns.

**Use it when** — If you pass the same fat object through fifteen nodes just to move it, that is the job context exists to do. Wire gymnastics to avoid storing a value is the real anti-pattern.

**How it works** — Store the object once under a namespaced key at the narrowest scope that works (node, then flow, then global). Each node reads the one key it needs, and a persistent store holds anything that must survive a restart.

**Good to know**

- **Watch out** — One writer per key, serialize concurrent updates, and keep enough on the wire to stay debuggable.

::
::guide-tab{label="Config: env vars vs persisted context"}
**Static config vs runtime config** — env vars set at deploy (read-only to the flow); persisted context for anything a user edits.

![Config: env vars vs persisted context — diagram](/images/application-guide/node-red/design-patterns-dp-config.svg)

Two different kinds of configuration. Static config changes per environment and is set at deploy: broker host, DB connection. Runtime config changes while running, by a user, with no redeploy.

**Use it when** — Env vars are resolved at deploy time and are read-only to the running flow. The moment a user needs to change what the flow operates on, an env var forces a developer and a redeploy.

**How it works** — Keep static config in env vars or a config node. Put user-editable config in persisted context (or a config file), edited through the UI via an intent message, and read by the flow at execution time.

**Good to know**

- **Watch out** — If a value would ever be changed through a button or form, it is not an env var.

::
::guide-tab{label="Generating flows (Admin API)"}
**Deploy flows as JSON** — populate link arrays with node ids and l:true; the editor's quiet fixes won't happen over the API.

![Generating flows (Admin API) — diagram](/images/application-guide/node-red/design-patterns-dp-generate.svg)

Emitting flows as JSON and deploying via the Admin API. The editor quietly fixes mistakes that a programmatic deploy does not, so the failure classes are different.

**Use it when** — API-deployed flows look right but hang, double-respond, loop, or read as spaghetti when the things the editor papers over are left undone.

**How it works** — Populate link arrays with target node ids (name matching is editor-only) and set l:true. Skip success formatters when msg.error is set so you respond once. Never let a tab-wide catch re-dispatch a response-layer error. Compute x as LEFT + width/2.

**Good to know**

- **Watch out** — Empty link arrays are the top reason an API-deployed flow does nothing.

::
:::
