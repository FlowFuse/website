---
title: Software apps
navTitle: Software apps
navOrder: 5
guide: flowfuse
slug: software-apps
blurb: "The three shapes a FlowFuse app takes when it runs on the platform. Pick by what it needs: a headless job (Packaged App), a user-facing app driven by data (Data-Driven App), or a reusable piece other apps embed (Shared Building Block)."
---

# Software apps

**Software apps — start here**

The three shapes a FlowFuse app takes when it runs on the platform. Pick by what it needs: a headless job (Packaged App), a user-facing app driven by data (Data-Driven App), or a reusable piece other apps embed (Shared Building Block).

:::guide-tabs
::guide-tab{label="Packaged App"}
![Packaged App — diagram](/images/application-guide/flowfuse/software-apps-packaged.svg)

A headless, self-contained job that runs the same everywhere — an MQTT-to-DB connector, a pipeline, a scheduled task. No UI.

**Use it when** — A self-contained job with no screen and no per-site settings: connectors, pipelines, scheduled work.

**How it works** — Built and promoted through a pipeline; runs headless on a Hosted (or Remote) Instance. Everything is baked into the snapshot; only fixed env vars vary at deploy.

**Major components**

- **Team Broker (MQTT)** — the event stream the app subscribes to
- **Hosted Instance** — FlowFuse-managed Node-RED running the headless app
- **Packaged App (no UI)** — the logic itself, no dashboard
- **FlowFuse Tables** — where the app writes its rows

**Where config & data live**

- **Config** — baked into the snapshot; only fixed env vars at deploy.
- **Data** — reads the Team Broker, writes FlowFuse Tables.

::
::guide-tab{label="Data-Driven App"}
![Data-Driven App — diagram](/images/application-guide/flowfuse/software-apps-datadriven.svg)

A user-facing app on a Hosted Instance — a time clock, an asset manager — whose content is driven by data. It needs a backend and a data source to be complete.

**Use it when** — Apps whose displayed settings or records change between deployments and grow over time: time clocks, registries, asset managers.

**How it works** — Same pipeline delivery to a Hosted Instance; the runtime loads its data from FlowFuse Tables or the Team Broker, served by a backend behind the screen.

**Major components**

- **Users (browser)** — the people using the app's dashboard
- **Hosted Instance** — runs the data-driven app and serves its UI
- **FlowFuse Tables** — the records the app reads and writes

**Where config & data live**

- **Config** — app settings and records live in FlowFuse Tables (or context), editable without redeploying.
- **Data** — FlowFuse Tables for records, the Team Broker for live values.

::
::guide-tab{label="Shared Building Block"}
![Shared Building Block — diagram](/images/application-guide/flowfuse/software-apps-shared.svg)

A reusable piece of UI or logic that other apps embed — not an app itself. Think a common dashboard surface many Hosted Instances present through.

**Use it when** — Many apps should share one piece of UI or logic and upgrade it in lockstep.

**How it works** — Published as subflows to the Team Library with an example flow; updating the subflow updates every Hosted Instance that adopts the new version.

**Major components**

- **Shared Building Block (reusable subflows)** — the block authored once
- **Team Library** — the catalogue it's published to
- **Hosted Instances** — the apps that embed it and upgrade together

**Where config & data live**

- **Config** — via the subflow's instance properties / env where it's embedded.
- **Data** — none of its own; it embeds into the host app's data.

::
:::
