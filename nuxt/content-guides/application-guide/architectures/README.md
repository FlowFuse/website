---
title: "Architectures"
navTitle: "Architectures"
navOrder: 4
meta:
    description: "Every FlowFuse deployment is the same building blocks arranged for where it runs — pick the world you're designing for."
---

# Architectures

Every FlowFuse deployment is the same building blocks — instances, broker, data, edge — arranged for where it runs. Read any diagram as a vertical stack, then pick the world you're designing for.

::callout{icon="i-lucide-arrow-right"}
**[OT architectures →](/docs/application-guide/architectures/ot/)** — Near the equipment — edge deployments with the server in IT or in an OT/DMZ, hardware-saving consolidation, and air-gapped sites.
::

::callout{icon="i-lucide-arrow-right"}
**[IT architectures →](/docs/application-guide/architectures/it/)** — Hosting and governing — on-prem, your cloud per-site, hosting choice at scale, enterprise governance, and secure data exposure.
::

::callout{icon="i-lucide-arrow-right"}
**[IIoT architectures →](/docs/application-guide/architectures/iiot/)** — The live data backbone — a Unified Namespace where edge publishes once and many subscribe, across every site.
::

## Separating dev from prod

A modifier for any of the three worlds above. When your development server is a different server from production — dev in IT or the cloud, prod down in OT or behind a tighter network boundary — a GitHub bridge carries the same versioned code across the boundary. (A truly air-gapped site can't pull from GitHub; there, code crosses by offline snapshot import instead.)

### GitHub bridge

**Modifier · works across OT, IT & IIoT.**

A pipeline pushes your dev work up to a repo; each site's instance pulls it back down. One versioned source of truth — with review, history and rollback in Git — and dev kept safely off the production deployment servers.

::arch-diagram
---
nodes:
  - { id: dev, label: "Dev instance", sub: "develop once", accent: indigo, col: 2, row: 1 }
  - { id: github, label: "GitHub", sub: "versioned source of truth", accent: slate, col: 2, row: 2 }
  - { id: siteA, label: "Instance", sub: "Site A · OT", accent: indigo, col: 1, row: 3 }
  - { id: siteB, label: "Instance", sub: "Site B · IT", accent: indigo, col: 2, row: 3 }
  - { id: siteC, label: "Instance", sub: "Site C · OT", accent: indigo, col: 3, row: 3 }
groups:
  - { label: "Dev · one build", nodes: [dev] }
  - { label: "Sites · prod instances (OT & IT)", nodes: [siteA, siteB, siteC] }
edges:
  - { from: dev, to: github, label: "pipeline push", dashed: true, accent: red }
  - { from: github, to: siteA, label: "pull", dashed: true, accent: red }
  - { from: github, to: siteB, dashed: true, accent: red }
  - { from: github, to: siteC, dashed: true, accent: red }
legend:
  - { line: red, dashed: true, label: "push / pull" }
---
::

::callout{icon="i-lucide-arrow-right"}
**[App delivery methods →](/docs/application-guide/app-delivery-methods/)** — Once code is on a server, it ships via snapshots or subflows.
::
