---
title: "IT architectures"
navTitle: "IT architectures"
navOrder: 1
---

# IT architectures

::::guide-tabs
:::guide-tab{label="On-prem IT"}
::arch-diagram
---
nodes:
  - { id: users, label: "IT users", sub: "dashboards & tools", accent: slate, col: 2, row: 1 }
  - { id: plat, label: "FlowFuse platform", sub: "on your own servers", accent: indigo, col: 2, row: 2 }
  - { id: i1, label: "Hosted Instance", sub: "app", accent: indigo, col: 1, row: 3 }
  - { id: i2, label: "Hosted Instance", sub: "app", accent: indigo, col: 2, row: 3 }
  - { id: i3, label: "Hosted Instance", sub: "app", accent: indigo, col: 3, row: 3 }
groups:
  - { id: dc, label: "On-prem IT data center · self-managed", accent: green, nodes: [plat, i1, i2, i3] }
edges:
  - { from: users, to: plat, label: "access" }
  - { from: plat, to: i1 }
  - { from: plat, to: i2, label: "hosts" }
  - { from: plat, to: i3 }
legend:
  - { swatch: green, label: "IT zone" }
---
::

The whole FlowFuse platform runs on the company's own servers in their IT data center. It hosts the apps as Hosted Instances and serves them to IT users. Nothing leaves the building unless you choose to connect it.

**Use it when** — IT wants to own and run the platform entirely in-house, on their own infrastructure.

:::
:::guide-tab{label="Cloud + per-site"}
::arch-diagram
---
nodes:
  - { id: plat, label: "FlowFuse platform", sub: "your cloud account", accent: indigo, col: 2, row: 1 }
  - { id: a, label: "Remote Instance", sub: "Site A · IT layer", accent: slate, col: 1, row: 2 }
  - { id: b, label: "Remote Instance", sub: "Site B · IT layer", accent: slate, col: 2, row: 2 }
  - { id: c, label: "Remote Instance", sub: "Site C · IT layer", accent: slate, col: 3, row: 2 }
groups:
  - { id: cloud, label: "Cloud · your own AWS account", accent: blue, nodes: [plat] }
  - { id: sites, label: "Sites · IT layer — one Remote Instance each", accent: green, nodes: [a, b, c] }
edges:
  - { from: plat, to: a }
  - { from: plat, to: b, label: "deploys" }
  - { from: plat, to: c }
legend:
  - { swatch: blue, label: "Cloud" }
  - { swatch: green, label: "IT zone" }
---
::

The FlowFuse platform runs in the company's own cloud account (e.g. AWS) and deploys and manages a Remote Instance in each site's IT layer via the Device Agent. The cloud platform governs and deploys; each site's instance runs locally and keeps working on its own even if the link drops.

**Use it when** — The platform lives in your cloud, but each site needs its own instance in its IT layer.

:::
:::guide-tab{label="Scaled-out · hosting choice"}
::arch-diagram
---
nodes:
  - { id: s1, label: "FlowFuse server", sub: "Site A · on-prem", accent: indigo, col: 1, row: 1 }
  - { id: s2, label: "FlowFuse server", sub: "Site B · on-prem", accent: indigo, col: 2, row: 1 }
  - { id: s3, label: "FlowFuse server", sub: "Site C · in the cloud", accent: indigo, col: 3, row: 1 }
groups:
  - { id: sites, label: "Sites · one independent FlowFuse server each, host it where you want", accent: green, nodes: [s1, s2, s3] }
edges: []
legend:
  - { swatch: green, label: "Site" }
---
::

Scale out by running a **FlowFuse server at each site** — host each one where it fits, on-prem or in the cloud. Each site's server is fully independent: its own platform, run and governed on its own. There's no central server above them.

**Use it when** — Every site wants its own full, self-contained FlowFuse server, hosted wherever suits it, with nothing central above it.

:::
:::guide-tab{label="Enterprise governance"}
::arch-diagram
---
nodes:
  - { id: central, label: "FlowFuse", sub: "corporate apps", accent: indigo, col: 2, row: 1 }
  - { id: s1, label: "FlowFuse server", sub: "Site A · local apps", accent: indigo, col: 1, row: 2 }
  - { id: s2, label: "FlowFuse server", sub: "Site B · local apps", accent: indigo, col: 2, row: 2 }
  - { id: s3, label: "FlowFuse server", sub: "Site C · local apps", accent: indigo, col: 3, row: 2 }
groups:
  - { id: ent, label: "Corporate · company-wide apps", accent: indigo, nodes: [central] }
  - { id: servers, label: "Sites · apps that run locally", accent: green, nodes: [s1, s2, s3] }
edges:
  - { from: central, to: s1 }
  - { from: central, to: s2, label: "dev once · share code down" }
  - { from: central, to: s3 }
legend:
  - { swatch: green, label: "Site server" }
---
::

Split where apps live: company-wide apps run on a central corporate FlowFuse, while apps specific to a site run locally on that site's own FlowFuse server. You can still develop in one place and **share code down** to the sites — but because these are separate servers, that travels over the **GitHub bridge or a snapshot export**, not a Pipeline (a Pipeline only promotes within a single platform).

**Use it when** — Some apps belong to the whole company and some are site-specific, and you want to build centrally but let each site run its own local apps.

:::
::::
