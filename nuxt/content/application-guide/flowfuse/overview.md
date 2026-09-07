---
title: Overview
navTitle: Overview
navOrder: 1
guide: flowfuse
slug: overview
blurb: "The map of the FlowFuse guide — apps, architectures, and a worked example."
---

# Overview

Turn an app idea into FlowFuse pieces you can name and say in one sentence.

::callout{icon="i-lucide-flag"}
**New to FlowFuse? Start with the [Foundations →](/application-guide/flowfuse/foundations/)** — what FlowFuse is and its core pieces, the grounding for everything in this guide.
::

## Apps

### [App delivery methods](/application-guide/flowfuse/app-delivery-methods/)

- **[Whole app](/application-guide/flowfuse/app-delivery-methods/)** — A complete, versioned project promoted through dev, staging and prod — via snapshots & pipelines.
- **[Pieces](/application-guide/flowfuse/app-delivery-methods/)** — A reusable piece packaged to the Team Library, installed like a shared library — via subflow export.

### [Hardware apps](/application-guide/flowfuse/hardware-apps/)

- **[Packaged App](/application-guide/flowfuse/hardware-apps/)** — Sealed product on a Remote Instance, identical on every device.
- **[Configurable App](/application-guide/flowfuse/hardware-apps/)** — Same build on a Remote Instance, tuned by a per-site config file that lives on the device.
- **[Edge Building Block](/application-guide/flowfuse/hardware-apps/)** — A reusable edge block you wire into your own upstream flows.

### [Software apps](/application-guide/flowfuse/software-apps/)

- **[Packaged App](/application-guide/flowfuse/software-apps/)** — Headless job on a Hosted or Remote Instance, no screen.
- **[Data-Driven App](/application-guide/flowfuse/software-apps/)** — User-facing app on a Hosted Instance, backed by data.
- **[Shared Building Block](/application-guide/flowfuse/software-apps/)** — Reusable UI or logic many Hosted Instances embed.

## Architectures

### [Data plane — how data is handled](/application-guide/flowfuse/data-plane/)

- **[Built in — Tables](/application-guide/flowfuse/data-plane/)** — Relational records — built into every FlowFuse install, exposed to every instance.
- **[Built in — Broker / UNS](/application-guide/flowfuse/data-plane/)** — Team Broker — built into every FlowFuse install; publish once, many subscribe.
- **[Time-series](/application-guide/flowfuse/data-plane/)** — External today — no built-in TSDB; run Timescale/Quest and expose it to the fleet.
- **[Bring your own](/application-guide/flowfuse/data-plane/)** — Expose any other store or service (SQL, ML, gateway) over Project Link.

### Execution plane — where it runs

- **[OT architectures](/application-guide/flowfuse/ot-architectures/)** — Near the equipment — edge with the server in IT or an OT/DMZ, hardware-saving consolidation, and air-gapped sites.
- **[IT architectures](/application-guide/flowfuse/it-architectures/)** — Hosting & governing — on-prem, your cloud per-site, hosting choice at scale, and enterprise governance.
- **[IIoT architectures](/application-guide/flowfuse/iiot-architectures/)** — The live data backbone — a Unified Namespace where edge publishes once and many subscribe, across every site.

## Examples

- **[Worked example](/application-guide/flowfuse/worked-example/)** — OEE, end to end — the full chain from edge to broker to cloud to history.
