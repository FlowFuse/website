---
title: Worked examples
navTitle: Worked examples
navOrder: 4
guide: node-red
slug: worked-examples
blurb: "Take one app and turn it into a clean Node-RED flow — the method, then examples end to end."
---

# Worked examples

The FlowFuse guide breaks a **use case** into **apps** — each with a job, a delivery method and a pattern. This guide picks up one of those apps and turns it into a clean Node-RED flow you can read at a glance.

Each worked example takes a single app and builds it end to end — the shape rules and patterns applied together, so you can see what the seams buy you.

## From app to flow

Start with one app — its one job, and (from the [App delivery methods](/application-guide/flowfuse/app-delivery-methods/) and app-pattern pages) how it's delivered and what shape it takes. Turn it into a flow in four moves:

1. **List the beginnings** — every way work enters the app: an http in, an MQTT in, an inject. Each beginning is its own path.
2. **Name the shared services** — the pools and calls many paths depend on: a database pool, a model call, the broker. Reuse them at the lightest level — [link call, subflow, or packaged node](/application-guide/node-red/design-patterns/); results return.
3. **Pick the single sink** — the one sink each family of paths converges on. It responds; it routes nothing.
4. **Draw the shape** — paths across, services called in the middle, one sink each. Now the app reads as a flow at a glance.

Work the [patterns](/application-guide/node-red/patterns/) in order to sharpen each move.

## The examples

The FlowFuse [OEE worked example](/application-guide/flowfuse/worked-example/) breaks that use case into two apps. The problem is broken down there; here's how each one looks as a Node-RED flow, shaped by the patterns it uses.

::callout{icon="i-lucide-arrow-right"}
**[OEE - Edge Aggregator →](/application-guide/node-red/oee-edge-aggregator/)** — the edge piece, packaged as a reusable subflow: poll → read → compute → publish, one per line.
::

::callout{icon="i-lucide-arrow-right"}
**[OEE - Central Dashboard →](/application-guide/node-red/oee-central-dashboard/)** — the cloud app: subscribe → compute → dashboard, with history through a link call and the UI decoupled from the logic.
::

More examples will land here — each one takes an app and turns it into a flow, move by move.
