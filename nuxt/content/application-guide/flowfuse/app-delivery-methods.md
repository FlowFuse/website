---
title: App delivery methods
navTitle: App delivery methods
navOrder: 3
guide: flowfuse
slug: app-delivery-methods
blurb: "Two different units of code, delivered two ways. Ship the whole app — a complete, versioned project promoted through environments — or publish one reusable piece — a package the whole team installs and upgrades in one place. Pick by what you're shipping: the app, or a part of it."
---

# App delivery methods

**App delivery methods — start here**

Two different units of code, delivered two ways. Ship the whole app — a complete, versioned project promoted through environments — or publish one reusable piece — a package the whole team installs and upgrades in one place. Pick by what you're shipping: the app, or a part of it.

::::guide-tabs
:::guide-tab{label="Whole app"}
**Snapshots & pipelines** — promote a complete, versioned project through dev → staging → prod to every place that runs it.

::flow-diagram
---
nodes:
  - { id: golden, label: "Dev instance", sub: "the golden one you build & test", accent: indigo }
  - { id: fleet, label: "Instances", sub: "every place it runs", accent: slate, many: true }
edges:
  - { from: golden, to: fleet, accent: indigo, label: "snapshot · pipeline" }
---
::

Take the whole app — every flow, setting and dependency — as a versioned snapshot, then promote that one controlled build through pipeline stages to every place that should run it.

**Use it when** — You're shipping a complete application and every site should run the same, controlled version.

**How it works** — A pipeline promotes a snapshot dev → staging → production; each target is parameterised by its own env vars, so one controlled build serves every site.

**Major components**

- **Snapshot** — the whole app, frozen as one versioned build
- **Pipeline** — promotes that snapshot through dev → staging → prod
- **Dev instance** — where you build and test the project
- **Remote / Hosted Instances** — the fleet each snapshot rolls out to

**Where config & data live** depends on the kind of app you're shipping — a hardware app tied to a device, or a software app on the platform. See [Hardware apps →](/application-guide/flowfuse/hardware-apps/) and [Software apps →](/application-guide/flowfuse/software-apps/).

**More phases when you need them** — a pipeline isn't limited to two stages. Add the phases your process needs — an extra staging tier, an approval gate, per-region rollouts — each one a controlled promotion of the same golden build:

::flow-diagram
---
nodes:
  - { id: dev, label: "Dev", sub: "golden build", accent: indigo }
  - { id: stage, label: "Staging" }
  - { id: prod, label: "Production", sub: "every place it runs", accent: slate, many: true }
edges:
  - dev>stage
  - stage>prod
---
::

:::
:::guide-tab{label="Pieces"}
**Subflow export** — publish one piece as a package the team installs, like a shared library.

::flow-diagram
---
nodes:
  - { id: sub, label: "Subflow", sub: "reusable block", accent: indigo }
  - { id: node, label: "Custom node", sub: "installable package", accent: slate }
  - { id: inst, label: "Instances", sub: "install & run the piece", accent: indigo, many: true }
  - { id: bom, label: "Bill of Materials", sub: "which version each runs", accent: slate }
edges:
  - { from: sub, to: node, label: "export as" }
  - { from: node, to: inst, accent: red, dashed: true, label: "install" }
  - { from: inst, to: bom, label: "version-tracked" }
legend:
  - { line: red, dashed: true, label: "install" }
  - { line: neutral, label: "version-tracked" }
---
::

Package a single piece of a flow — a block of logic or UI — as a reusable subflow, export it as a **custom node** other apps install, and pull it in instead of copying code between projects.

**Use it when** — A part of an app should be reused across many apps and upgraded in one place — a shared library, not a whole application.

**How it works** — Export the subflow as a **custom node** — an installable package apps pull in like any library dependency. Apps install it and the Bill of Materials tracks every version in use. Share an **example flow** in the Team Library to show how to wire it up.

**Major components**

- **Subflow** — the one reusable piece you package
- **Custom node** — the installable package your subflow is exported to
- **Team Library** — example flows the team shares (a custom node can ship with one to show its use)
- **Instances** — the apps that install and run the piece
- **Bill of Materials** — tracks which version each app runs

**Where config & data live**

- **Config** — the subflow's instance properties / env where it's installed.
- **Distribution** — export once as a custom node; apps install and upgrade from it, like a library.

:::
::::

::callout{icon="i-lucide-triangle-alert"}
**Dev and prod in the same team?** Every instance on a team reaches the same shared resources — the Team Broker, FlowFuse Tables, project links, any external Postgres. So a dev instance can read and write the very data prod depends on. **Name and namespace resources per environment** so test data and real data never mix: separate broker topic prefixes, table or schema names, and project-link targets, driven by each instance's env vars. [See the Data plane →](/application-guide/flowfuse/data-plane/)
::

::callout{icon="i-lucide-git-branch"}
Dev and prod on **separate servers** — dev in IT or the cloud, prod in OT or air-gapped? A **GitHub bridge** carries the same versioned code across the boundary. That's an architecture decision. [See Architectures →](/application-guide/flowfuse/architectures/)
::
