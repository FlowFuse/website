---
title: IT architectures
navTitle: IT architectures
navOrder: 8
guide: flowfuse
slug: it-architectures
---

# IT architectures

::::guide-tabs
:::guide-tab{label="On-prem IT"}
::arch-diagram
---
nodes:
  - { id: plat, label: "FlowFuse platform", sub: "on your own servers", accent: indigo, col: 2, row: 1 }
  - { id: i1, label: "Hosted Instance", sub: "app", accent: indigo, col: 1, row: 2 }
  - { id: i2, label: "Hosted Instance", sub: "app", accent: indigo, col: 2, row: 2 }
  - { id: i3, label: "Hosted Instance", sub: "app", accent: indigo, col: 3, row: 2 }
  - { id: users, label: "IT users", sub: "dashboards & tools", accent: slate, col: 2, row: 3 }
groups:
  - { id: dc, label: "On-prem IT data center · self-managed", accent: green, nodes: [plat, i1, i2, i3] }
  - { id: usr, label: "IT users", accent: green, nodes: [users] }
edges:
  - { from: plat, to: i1 }
  - { from: plat, to: i2, label: "hosts" }
  - { from: plat, to: i3 }
  - { from: i1, to: users }
  - { from: i2, to: users, label: "served to" }
  - { from: i3, to: users }
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
  - { id: plat, label: "FlowFuse platform", sub: "own infra, cloud, or SaaS", accent: indigo, col: 2, row: 1 }
  - { id: a, label: "IT service", sub: "team A", accent: slate, col: 1, row: 2 }
  - { id: b, label: "IT service", sub: "team B", accent: slate, col: 2, row: 2 }
  - { id: c, label: "IT service", sub: "team C", accent: slate, col: 3, row: 2 }
groups:
  - { id: p, label: "Platform · host it where you want", accent: indigo, nodes: [plat] }
  - { id: svc, label: "IT services across the org", accent: green, nodes: [a, b, c] }
edges:
  - { from: plat, to: a }
  - { from: plat, to: b, label: "supports" }
  - { from: plat, to: c }
legend:
  - { swatch: green, label: "IT zone" }
---
::

One FlowFuse platform supports IT services across the whole organisation, and you choose where it runs: your own infrastructure, your own AWS, or FlowFuse's SaaS. Same platform, same apps, wherever it is hosted.

**Use it when** — Supporting IT broadly and you want freedom to host the platform on-prem, in your cloud, or as SaaS.

:::
:::guide-tab{label="Enterprise governance"}
::arch-diagram
---
nodes:
  - { id: plat, label: "FlowFuse platform", sub: "central governance", accent: indigo, col: 2, row: 1 }
  - { id: t1, label: "Team", sub: "site / BU", accent: slate, col: 1, row: 2 }
  - { id: t2, label: "Team", sub: "site / BU", accent: slate, col: 2, row: 2 }
  - { id: t3, label: "Team", sub: "site / BU", accent: slate, col: 3, row: 2 }
groups:
  - { id: ent, label: "Enterprise · one platform · central governance · one standard", accent: indigo, nodes: [plat] }
  - { id: teams, label: "Teams — isolated by role-based access", accent: green, nodes: [t1, t2, t3] }
edges:
  - { from: plat, to: t1 }
  - { from: plat, to: t2, label: "governs · isolates" }
  - { from: plat, to: t3 }
legend:
  - { swatch: green, label: "Team zone" }
---
::

One FlowFuse platform serves the whole company. Each site or business unit is its own team — its own instances and applications — isolated by role-based access and unified under central governance and one standard.

**Use it when** — Central governance and one standard across many sites, with each team's work kept separate.

:::
::::
