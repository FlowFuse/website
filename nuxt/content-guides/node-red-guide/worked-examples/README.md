---
title: "Worked examples"
navTitle: "Worked examples"
navOrder: 3
meta:
    description: "Turn an app concept into a Node-RED flow — or a few — leaning on the design patterns and data handling. The method, then the OEE apps end to end."
---

# Worked examples

An **app** is a job to do — with a delivery method and a pattern, decided in the [FlowFuse guide](/docs/application-guide/worked-examples/). The **solution** is a Node-RED flow — and an app isn't always a single one. A bigger app is **one or more flows working together**.

Each worked example takes a real app and turns it into a flow — showing the [design pattern(s)](/docs/node-red-guide/patterns/design-patterns/) and [data-handling method(s)](/docs/node-red-guide/patterns/handling-data/) it selects, and why.

The app can be **built entirely by FlowFuse, built together with your team, or built by you** from these examples. The build is the same either way.

## From app to flow

Turn the app into a flow the same way each time — two selections, then keep to good form:

1. **Start from the app** — its one job, and (from the [FlowFuse guide](/docs/application-guide/app-delivery-methods/)) how it's delivered and what shape it takes.
2. **Break it into flows** — most apps are a single flow; a bigger one is a few, each doing a clear part.
3. **Select the [design pattern(s)](/docs/node-red-guide/patterns/design-patterns/)** — find the seams, then pick a reuse level for each piece: link in/out, link call, subflow, or packaged node. A flow often uses more than one — **or none: a simple, one-path flow may need no pattern at all, and that's fine.**
4. **Select the [data-handling method(s)](/docs/node-red-guide/patterns/handling-data/)** — this part is never skippable. Even a simple flow with no pattern still has to **classify** what it's getting (event or stream?) and decide whether it needs **batching / rate-limit**, separate paths, context, or config.

Then keep it in [good form](/docs/node-red-guide/patterns/good-form/) — the general habits (call shared things, one path per beginning, a single sink, catch errors) that keep any flow readable.

## The examples

The FlowFuse [OEE worked example](/docs/application-guide/worked-examples/oee/) breaks that use case into two apps. Here's how each one looks as a Node-RED flow, shaped by the patterns it uses.

::callout{icon="i-lucide-arrow-right"}
**[OEE - Edge Aggregator →](/docs/node-red-guide/worked-examples/oee-edge-aggregator/)** — the edge piece, packaged as a reusable subflow: poll → read → compute → publish, one per line.
::

::callout{icon="i-lucide-arrow-right"}
**[OEE - Central Dashboard →](/docs/node-red-guide/worked-examples/oee-central-dashboard/)** — the cloud app: subscribe → compute → link out, fanning to a link in for the dashboard and a second link in for batched history, with the UI decoupled from the logic.
::

More examples will land here — each one takes an app and turns it into a flow, move by move.
