---
title: Worked example
navTitle: Worked example
navOrder: 7
guide: node-red
slug: worked-example
blurb: "The shape rules and patterns applied end to end. One app reached three ways over shared services, and the same requirement built with and without seams — so you can see what the seams buy you."
---

# Worked example

**Worked example — start here**

The shape rules and patterns applied end to end. One app reached three ways over shared services, and the same requirement built with and without seams — so you can see what the seams buy you.

:::guide-tabs
::guide-tab{label="Napkin: multi-surface app"}
**One app, three surfaces** — an HTTP API, a dashboard and MQTT over one shared Tables pool; each surface ends at its own sink.

![Napkin: multi-surface app — diagram](/images/application-guide/node-red/worked-example-ex-napkin.svg)

One app reached three ways over shared services.

**In one sentence** — A Software: Data-Driven App backed by a Relational DB, reached three ways over one shared Tables pool and one external service call, each surface ending at its own sink.

**Pieces**

- **Surfaces** — A dashboard for people, an HTTP API for services, an MQTT feed for devices and events. Each beginning is its own path, so a device path never runs through a browser path.
- **Shared services** — One Tables pool and one external service call, both invoked with link call. One pool serves all three surfaces without mixing them.
- **Single sink** — Each surface converges on one sink through a labeled link — an http response or an MQTT publish. It only sends; the HTTP path responds exactly once, the MQTT path just publishes.
- **People reuse HTTP** — The dashboard is a ui-template that fetches the HTTP API, so it adds no new backend paths of its own.

::
::guide-tab{label="Good vs bad"}
**Same requirement, with vs without seams** — draw the boundary on purpose and define the contract; spaghetti has nowhere to accumulate.

![Good vs bad — diagram](/images/application-guide/node-red/worked-example-ex-goodbad.svg)

The same requirement built with and without seams.

**In one sentence** — Draw the boundary on purpose and define the contract across it, and there is nowhere for spaghetti to accumulate.

**Pieces**

- **The bad version** — One tab, everything on it. Tags and thresholds frozen in Function nodes, a template that holds logic and pulls its own data, the full object threaded node to node. A second line means copy, paste, edit.
- **The good version** — Four tabs with clear boundaries: Config, Ingestion, Processing, Presentation. Config lives in a persistent store the operator edits, the template only renders a view-model, and state lives in a namespaced context key.
- **Why it wins** — Named seams you can read one at a time, runtime config with no redeploy, a clean UI boundary, and a Threshold Evaluator subflow, so a second line is configuration rather than copy-paste.

::
:::
