---
title: Architectures
navTitle: Architectures
navOrder: 7
guide: flowfuse
slug: architectures
blurb: "Every FlowFuse deployment is the same building blocks arranged for where it runs — pick the world you're designing for."
---

# Architectures

Every FlowFuse deployment is the same building blocks — instances, broker, data, edge — arranged for where it runs. Read any diagram as a vertical stack, then pick the world you're designing for.

::callout{icon="i-lucide-arrow-right"}
**[OT architectures →](/application-guide/flowfuse/ot-architectures/)** — Near the equipment — edge deployments with the server in IT or in an OT/DMZ, hardware-saving consolidation, and air-gapped sites.
::

::callout{icon="i-lucide-arrow-right"}
**[IT architectures →](/application-guide/flowfuse/it-architectures/)** — Hosting and governing — on-prem, your cloud per-site, hosting choice at scale, enterprise governance, and secure data exposure.
::

::callout{icon="i-lucide-arrow-right"}
**[IIoT architectures →](/application-guide/flowfuse/iiot-architectures/)** — The live data backbone — a Unified Namespace where edge publishes once and many subscribe, across every site.
::

## Separating dev from prod

A modifier for any of the three worlds above. When your development server is a different server from production — dev in IT or the cloud, prod down in OT or air-gapped — a GitHub bridge carries the same versioned code across the boundary.

### GitHub bridge

**Modifier · works across OT, IT & IIoT.**

A pipeline pushes your dev work up to a repo; each site's instance pulls it back down. One versioned source of truth — with review, history and rollback in Git — and dev kept safely off the production deployment servers.

![Architectures — diagram](/images/application-guide/flowfuse/architectures-overview.svg)

::callout{icon="i-lucide-arrow-right"}
**[App delivery methods →](/application-guide/flowfuse/app-delivery-methods/)** — Once code is on a server, it ships via snapshots or subflows.
::
