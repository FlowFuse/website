---
title: Data plane
navTitle: Data plane
navOrder: 6
guide: flowfuse
slug: data-plane
blurb: "Before you pick where things run, decide how data is handled. Two stores come built into every FlowFuse server install — the Team Broker and relational Tables — exposed to every instance with nothing extra to stand up. Everything else you bring your own: run it (a time-series DB, an existing database, a model) and expose it to the community over Project Link, no inbound ports. This is the data plane the architectures on the next pages all sit on."
---

# Data plane

**Data plane — start here**

Before you pick where things run, decide how data is handled. Two stores come built into every FlowFuse server install — the Team Broker and relational Tables — exposed to every instance with nothing extra to stand up. Everything else you bring your own: run it (a time-series DB, an existing database, a model) and expose it to the community over Project Link, no inbound ports. This is the data plane the architectures on the next pages all sit on.

:::guide-tabs
::guide-tab{label="Relational"}
**Built in** — ships with every FlowFuse server install; exposed to every instance.

![Relational — diagram](/images/application-guide/flowfuse/data-plane-dp-relational.svg)

A place for records that relate to each other — assets, config, users, orders — that you look up, join and update in place. It's FlowFuse Tables, built into every FlowFuse server install and exposed to every instance on the team.

**Use it when** — The data has structure and relationships, and apps across the team should read and write the same store.

**How it works** — FlowFuse Tables (managed PostgreSQL) via the Query node; because it ships with the server, any instance on the team reaches it natively over an authenticated connection. External systems can read it too.

**In FlowFuse**

- **FlowFuse Tables** — managed PostgreSQL, built into every FlowFuse install
- **Query node** — read, join and update from any instance
- **Exposed to the whole team automatically** — nothing to stand up
- **Also any external Postgres** — same node

**Good to know**

- **Watch out** — not for high-rate timestamped streams; use the time-series target for those.

::
::guide-tab{label="Broker / UNS"}
**Built in** — ships with every FlowFuse server install; publish once, many subscribe.

![Broker / UNS — diagram](/images/application-guide/flowfuse/data-plane-dp-broker.svg)

A real-time bus, not storage: one instance publishes to a topic, any number subscribe. It's the Team Broker, built into every FlowFuse server install — the backbone of a Unified Namespace.

**Use it when** — Live data needs to reach many consumers at once, decoupled, as it happens.

**How it works** — The built-in Team Broker with publish / subscribe nodes; because it ships with the server, every instance on the team can publish and subscribe over MQTT. Pair with Tables when you also need to keep history.

**In FlowFuse**

- **Team Broker** — built into every FlowFuse install, no separate product to stand up
- publish / subscribe nodes
- **Topic structure** — your Unified Namespace
- Exposed to the whole team; pair with Tables for history

**Good to know**

- **Watch out** — it carries data, it doesn't store it; write to Tables too if you need history.

::
::guide-tab{label="Time-series"}
**Bring your own** — external today; FlowFuse has no built-in time-series DB.

![Time-series — diagram](/images/application-guide/flowfuse/data-plane-dp-timeseries.svg)

A store built for a steady stream of timestamped readings — sensor data, telemetry, trends — written fast and queried by time. FlowFuse has no built-in time-series database, so you run one and expose it to the fleet.

**Use it when** — The data is a continuous stream of timestamped values, written at high rate and queried by time window.

**How it works** — Run TimescaleDB, QuestDB or InfluxDB where you want. A Hosted Instance connects to it — Timescale and Quest speak the Postgres wire, so the Query node connects exactly like Tables — and fronts it; other instances reach it over Project Link, which always calls a Hosted Instance, with no inbound ports.

**In FlowFuse**

- **External** — FlowFuse has no built-in time-series DB today
- **TimescaleDB / QuestDB** — speak the Postgres wire; Query node connects like Tables
- **Hosted Instance** — connects to it and fronts it for the fleet
- **Project Link** — reaches it with no inbound ports (targets a Hosted Instance)

**Good to know**

- **Watch out** — not part of FlowFuse; you run and expose it. Pair with the Team Broker for live + history.

::
::guide-tab{label="Bring your own"}
**Bring your own** — expose any other store or service to the fleet over Project Link.

![Bring your own — diagram](/images/application-guide/flowfuse/data-plane-dp-byo.svg)

Any other store or service FlowFuse doesn't provide — an existing SQL database, an ML model, a site gateway. You run it where it already lives and expose it to the community of managed instances over Project Link, with no inbound ports.

**Use it when** — You need to reach a store or service that isn't built in and isn't a time-series DB — an existing database, a model, a gateway.

**How it works** — A Hosted Instance connects to the store or service and fronts it; other instances reach it over Project Link — which always targets a Hosted Instance — as a secure API / MCP endpoint, with no inbound ports and no copy into a warehouse.

**In FlowFuse**

- **Hosted Instance** — connects to the store / service and fronts it
- **Project Link** — calls a Hosted Instance (only Hosted Instances are callable targets)
- Any SQL database, ML model or gateway
- Exposed as a secure API / MCP endpoint, no inbound ports

**Good to know**

- **Good for** — keeping data and services where they already live and exposing them securely to the fleet. FlowFuse doesn't care what the target is.

::
:::

::callout{icon="i-lucide-git-branch"}
**Single service?** Calling one external endpoint from a flow — an HTTP request or webhook to one system — is a Node-RED decision, not a platform data target. [Node-RED guide →](/application-guide/node-red/handling-data/)
::
