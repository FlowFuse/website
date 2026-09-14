---
title: "Building FlowFuse applications"
navTitle: "Building FlowFuse applications"
navOrder: 1
navGroup: "Application Guide"
navGroupOrder: 0
meta:
    description: "The map of the FlowFuse guide — apps, architectures, and a worked example."
---

# Building FlowFuse applications

Turn an app idea into FlowFuse pieces you can name and say in one sentence.

::callout{icon="i-lucide-flag"}
**New to FlowFuse? Start with the [Foundations →](/docs/application-guide/foundations/)** — what FlowFuse is and its core pieces, the grounding for everything in this guide.
::

## Apps

### [App delivery methods](/docs/application-guide/app-delivery-methods/)

- **[Whole app](/docs/application-guide/app-delivery-methods/)** — A complete, versioned project promoted through dev, staging and prod — via snapshots & pipelines.
- **[Pieces](/docs/application-guide/app-delivery-methods/)** — A reusable piece packaged to the Team Library, installed like a shared library — via subflow export.

### [Hardware apps](/docs/application-guide/app-delivery-methods/hardware-apps/)

- **[Packaged App](/docs/application-guide/app-delivery-methods/hardware-apps/)** — Sealed product on a Remote Instance, identical on every device.
- **[Configurable App](/docs/application-guide/app-delivery-methods/hardware-apps/)** — Same build on a Remote Instance, tuned by a per-site config file that lives on the device.
- **[Edge Building Block](/docs/application-guide/app-delivery-methods/hardware-apps/)** — A reusable edge block you wire into your own upstream flows.

### [Software apps](/docs/application-guide/app-delivery-methods/software-apps/)

- **[Packaged App](/docs/application-guide/app-delivery-methods/software-apps/)** — Headless job on a Hosted or Remote Instance, no screen.
- **[Data-Driven App](/docs/application-guide/app-delivery-methods/software-apps/)** — User-facing app on a Hosted Instance, backed by data.
- **[Shared Building Block](/docs/application-guide/app-delivery-methods/software-apps/)** — Reusable UI or logic many Hosted Instances embed.

## Architectures

### [Data plane — how data is handled](/docs/application-guide/data-plane/)

- **[Built in — Tables](/docs/application-guide/data-plane/)** — Relational records — built into every FlowFuse install, exposed to every instance.
- **[Built in — Broker / UNS](/docs/application-guide/data-plane/)** — Team Broker — built into every FlowFuse install; publish once, many subscribe.
- **[Time-series](/docs/application-guide/data-plane/)** — External today — no built-in TSDB; run Timescale/Quest and expose it to the fleet.
- **[Bring your own](/docs/application-guide/data-plane/)** — Expose any other store or service (SQL, ML, gateway) over Project Link.

### Execution plane — where it runs

- **[OT architectures](/docs/application-guide/architectures/ot/)** — Near the equipment — edge with the server in IT or an OT/DMZ, hardware-saving consolidation, and air-gapped sites.
- **[IT architectures](/docs/application-guide/architectures/it/)** — Hosting & governing — on-prem, your cloud per-site, hosting choice at scale, and enterprise governance.
- **[IIoT architectures](/docs/application-guide/architectures/iiot/)** — The live data backbone — a Unified Namespace where edge publishes once and many subscribe, across every site.

## Examples

- **[Worked example](/docs/application-guide/worked-examples/oee/)** — OEE, end to end — the full chain from edge to broker to cloud to history.

::callout{icon="i-lucide-arrow-right"}
**Ready to build one?** This guide covers the decisions. [Using FlowFuse](/docs/user/) covers the steps that carry them out — creating instances, running pipelines, registering remote instances.
::
