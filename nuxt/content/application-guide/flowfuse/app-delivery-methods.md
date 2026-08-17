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
  - { id: golden, label: "Golden instance", sub: "the one you build & test", accent: indigo }
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

**Where config & data live**

- **Config** — each target is parameterised by its own env vars.
- **Rollout** — Device Groups + pipeline promotion: one controlled build, many places.

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
  - { id: lib, label: "Team Library", sub: "installable node", accent: slate }
  - { id: inst, label: "Instances", sub: "install & run the piece", accent: indigo, many: true }
  - { id: bom, label: "Bill of Materials", sub: "which version each runs", accent: slate }
edges:
  - { from: sub, to: lib, label: "export / publish" }
  - { from: lib, to: inst, accent: red, dashed: true, label: "install" }
  - { from: inst, to: bom, label: "version-tracked" }
legend:
  - { line: red, dashed: true, label: "install" }
  - { line: neutral, label: "version-tracked" }
---
::

Package a single piece of a flow — a block of logic or UI — as a reusable subflow, and publish it to the Team Library as an installable node other apps pull in, instead of copying code between projects.

**Use it when** — A part of an app should be reused across many apps and upgraded in one place — a shared library, not a whole application.

**How it works** — Export the subflow as importable JSON, or publish it to the Team Library as an installable package with an example flow. Apps install it like a library dependency, and the Bill of Materials tracks every version in use.

**Major components**

- **Subflow** — the one reusable piece you package
- **Team Library** — the catalogue you publish the package to
- **Instances** — the apps that install and run the piece
- **Bill of Materials** — tracks which version each app runs

**Where config & data live**

- **Config** — the subflow's instance properties / env where it's installed.
- **Distribution** — publish once to the Team Library; apps install and upgrade from it, like a library.

:::
::::

::callout{icon="i-lucide-git-branch"}
Dev and prod on **separate servers** — dev in IT or the cloud, prod in OT or air-gapped? A **GitHub bridge** carries the same versioned code across the boundary. That's an architecture decision. [See Architectures →](/application-guide/flowfuse/architectures/)
::
