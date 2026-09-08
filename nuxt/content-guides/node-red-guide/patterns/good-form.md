---
title: "Good form"
navTitle: "Good form"
navOrder: 3
meta:
    description: "A clean flow isn't luck — it's a handful of habits. Wire for reading, lay it out on a grid, decouple UI from logic, catch errors where you can see them, and keep data on a stable contract. Follow these and a flow stays readable, reusable, and out of spaghetti."
---

# Good form

**Good form — how not to make spaghetti**

A clean flow isn't luck — it's a handful of habits. The golden rule: **shared things are *called* rather than funneled into, and every beginning is its own left-justified path.** Everything below follows from that.

::::guide-tabs
:::guide-tab{label="Wire for reading"}
**Call shared things; don't funnel into them** — many paths wiring into one shared node is the core spaghetti anti-pattern.

::flow-diagram
---
align: left
nodes:
  - { id: a, label: "path A", accent: indigo, col: 1, row: 1 }
  - { id: b, label: "path B", accent: indigo, col: 1, row: 2 }
  - { id: c, label: "path C", accent: indigo, col: 1, row: 3 }
  - { id: call, label: "link call", sub: "the shared service", accent: teal, col: 2, row: 2 }
  - { id: svc, label: "SQL / broker / model", sub: "one dependency", accent: green, col: 3, row: 2 }
edges:
  - a>call
  - b>call
  - c>call
  - { from: call, to: svc, dir: both, label: "result back" }
---
::

When many paths share a dependency — a DB pool, a broker, a model call — don't wire them all *into* one node (a funnel). Expose it once as a service each path **calls** with a `link call`; the result returns and per-path handling happens after. The shared node keeps exactly one wire in and stays reusable.

**The rules**

- **No funnels into a shared dependency** — when many paths need the same service, they should *call* it, not all wire into it. (Aggregators like a `join` node that legitimately gather many inputs are the exception — that's their job, not a funnel.)
- **Each beginning is its own path** — one straight, left-justified path per entry; don't merge them through a shared front door.
- **Flow left → right** — beginning → prep → service call → format → sink. A backward (right-to-left) wire reads as tangle.
- **A crossing is a missing link node** — if two wires cross, row-align the column with its targets or bridge it with a link node. Same for any wire longer than the canvas — a link node reads cleaner.

:::
:::guide-tab{label="Lay it out"}
**One column per role, everything on the grid** — layout is what makes a flow scannable at a glance.

- **One entry column** — every beginning (inject, http in, mqtt in) shares one left edge. That column is the visual anchor.
- **Columns by role** — beginning → prep → service call → format → sink, left to right, each role in its own column.
- **On the grid, no overlaps** — snap to the 20px grid, leave a gap between neighbours, and never let two nodes (or two groups) overlap.
- **Align and pad groups** — left-justify group boxes to a common column, keep members inside the box with a little padding, and drop empty groups.
- **Comments are short labels** — a couple of words on the canvas; put the detail in the comment's info field, not a paragraph that runs off-page.

::flow-diagram
---
align: left
nodes:
  - { id: begin, label: "beginning", sub: "one entry column", accent: indigo, col: 1, row: 1 }
  - { id: prep, label: "prep", col: 2, row: 1 }
  - { id: call, label: "service call", accent: teal, col: 3, row: 1 }
  - { id: fmt, label: "format", col: 4, row: 1 }
  - { id: sink, label: "sink", accent: indigo, col: 5, row: 1 }
edges:
  - begin>prep
  - prep>call
  - call>fmt
  - fmt>sink
---
::

:::
:::guide-tab{label="Decouple UI from logic"}
**Widgets are an API** — the backend sends a display-ready view-model; the frontend emits intent. Treat the dashboard-to-logic boundary like a client and a server.

::flow-diagram
---
nodes:
  - { id: fe, label: "widget", sub: "renders + emits", accent: indigo }
  - { id: be, label: "flow logic", sub: "holds the truth", accent: indigo }
  - { id: db, label: "SQL database", sub: "records", accent: green }
edges:
  - { from: fe, to: be, label: "intent · { action, payload }" }
  - { from: be, to: fe, label: "view-model · display-ready", dashed: true }
  - be>db
legend:
  - { line: neutral, label: "intent · frontend → backend" }
  - { line: neutral, dashed: true, label: "view-model · backend → frontend" }
---
::

The frontend renders state and emits intent; the backend holds the truth. When you build payloads inside templates or cram logic next to a widget, every change touches both.

- **Reads** — the backend sends a finished, display-ready view-model. Templates bind and display; they never fetch, transform, or decide.
- **Writes** — the widget emits one consistent intent message: an action plus a payload. The backend decides what it means.
- **One place for state** — hold state in one shared `global` object the widgets read. The wire carries events, not fat objects, and never a live subscription per widget.
- **`ui-template` is the escape hatch** — reach for it for the one custom widget, never to build the whole UI as one block. Let it auto-size (`height="0"`) so content isn't clipped, and remember tables **replace, not append**.
- **Give every page an on-load trigger** — dashboard widgets emit only on real interaction, so a page that waits for a click to populate opens empty. Fire the load path on page-show.

:::
:::guide-tab{label="Catch errors visibly"}
**Every work path has a catch** — otherwise errors drop silently and you're debugging blind.

::flow-diagram
---
nodes:
  - { id: in, label: "in", col: 1, row: 1 }
  - { id: work, label: "work", sub: "may throw", col: 2, row: 1 }
  - { id: sink, label: "sink", sub: "on success", col: 3, row: 1 }
  - { id: catch, label: "Catch", sub: "scoped to the work", accent: red, col: 2, row: 2 }
  - { id: errpath, label: "log · notify · return", sub: "the error path", accent: red, col: 3, row: 2 }
edges:
  - { from: in, to: work }
  - { from: work, to: sink, label: "ok" }
  - { from: work, to: catch, label: "in scope", accent: red, dashed: true }
  - { from: catch, to: errpath, accent: red, dashed: true }
legend:
  - { line: neutral, label: "success" }
  - { line: red, dashed: true, label: "Catch scope · not a wire" }
---
::

Anything that talks to the outside world — an HTTP call, a DB write, a broker publish, a model call — will fail sometimes. Route those failures somewhere you control. (A Catch node has no input wire — it registers to catch errors from every node in its scope automatically; the dashed line marks that scope, not a connection you draw.)

- **No work without a catch** — a tab with function / request / DB / link-call / AI nodes and no Catch node drops its errors silently.
- **Scope the catch to cover the path** — make sure every reachable work node is in the catch's scope, or the ones outside it throw where nothing is listening.
- **In a shared service, format and return the error** — return it via `link out` in return mode so the caller sees `msg.error` and a bad call never hangs.

:::
:::guide-tab{label="Keep data on a contract"}
**Swap a source by keeping the message shape** — good seams mean a data change touches one node, not the whole flow.

- **Stable msg contract** — a query returns rows on the same property; the broker path is `msg.topic` + `msg.payload`. Keep the shape and only one node changes when you swap the source behind it.
- **SQL goes on the property your node reads** — the Postgres query node reads `msg.query` (with `msg.params` for parameters); the mysql / sqlite nodes read `msg.topic`. Either way it's never `msg.payload` — put SQL on the wrong property and the query silently runs empty.
- **Parameterize** — use parameterized queries and quote case-sensitive identifiers; don't string-build SQL into the payload.
- **Preserve the message through the chain** — return context (a callback, a link-call return) has to survive every hop, so keep functions and query nodes passing `msg` through.

:::
::::

::callout{icon="i-lucide-check"}
Follow these and a flow reads cleanly — beginnings in one column, shared things called not funneled, UI and logic on their own sides of a contract, errors on a path you can see, and data on a stable shape. That's good form.
::
