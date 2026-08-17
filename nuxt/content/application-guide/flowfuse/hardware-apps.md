---
title: Hardware apps
navTitle: Hardware apps
navOrder: 4
guide: flowfuse
slug: hardware-apps
blurb: "The three shapes a FlowFuse app takes when it runs on a device. Pick by how much varies per site: nothing (Packaged App), a few settings (Configurable App), or you assemble it yourself (Edge Building Block)."
---

# Hardware apps

**Hardware apps — start here**

The three shapes a FlowFuse app takes when it runs on a device. Pick by how much varies per site: nothing (Packaged App), a few settings (Configurable App), or you assemble it yourself (Edge Building Block).

:::guide-tabs
::guide-tab{label="Packaged App"}
![Packaged App — diagram](/images/application-guide/flowfuse/hardware-apps-packaged.svg)

A sealed product that ships on a piece of hardware and is identical everywhere — buy it, it runs on its device, nothing to configure.

**Use it when** — The app ships with a known partner device and the data it reads is fixed by that hardware.

**How it works** — Built and promoted through a pipeline (dev → staging → prod), then deployed to a Remote Instance as a snapshot. Everything is baked in; only fixed env vars vary at deploy.

**Major components**

- **Pipeline snapshot** — the app built once, promoted to the device
- **Remote Instance (edge device)** — FlowFuse-managed Node-RED running the sealed app
- **Team Broker (MQTT)** — carries the app's events to subscribers
- **FlowFuse Tables** — stores the rows the app writes

**Where config & data live**

- **Config** — baked into the snapshot; only fixed env vars at deploy, nothing per-site.
- **Data** — events to the Team Broker, records to FlowFuse Tables.

::
::guide-tab{label="Configurable App"}
![Configurable App — diagram](/images/application-guide/flowfuse/hardware-apps-configurable.svg)

The same shelf product, plus a few knobs — tag names, broker address, site name — that differ per site and live on the Remote Instance.

**Use it when** — The flows are the same everywhere but the values they use differ per install and may change over time.

**How it works** — Same pipeline delivery to a Remote Instance; the runtime loads a per-site config from a file on the device. Back that file up to the database, so a device swap restores the config — the device is the source of truth, the DB is the safety net.

**Major components**

- **Pipeline snapshot** — the same build promoted to every device
- **Remote Instance (edge device)** — runs the app and loads its own per-site config
- **Per-site config (tags · broker · site)** — a file on the device, backed up to the DB
- **Team Broker / FlowFuse Tables** — event egress + records

**Where config & data live**

- **Config** — a per-site file on the device (tags, broker address, site name), backed up to FlowFuse Tables so a swap restores it.
- **Data** — Team Broker + FlowFuse Tables.

::
::guide-tab{label="Edge Building Block"}
![Edge Building Block — diagram](/images/application-guide/flowfuse/hardware-apps-edge.svg)

Not a finished app — one hardware-facing block plus example flows, running on a Remote Instance. You assemble everything upstream of it yourself.

**Use it when** — The hardware-facing piece is reusable, but everything before it differs so much per site that no finished app would fit.

**How it works** — Blocks are published as subflows to the Team Library with an example flow. Consumers drop them onto a Remote Instance and wire them up.

**Major components**

- **Equipment (signals / PLC)** — the source hardware the block reads
- **Remote Instance (edge device)** — runs the edge building block at the line
- **Team Broker (MQTT)** — publishes the normalized data upstream
- **Team Library** — where the block is published as an installable subflow

**Where config & data live**

- **Config** — lives in the consuming flow you build around the block (env / context).
- **Data** — Team Broker (normalized, upstream).

::
:::
