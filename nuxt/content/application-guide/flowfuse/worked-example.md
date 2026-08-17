---
title: Worked example
navTitle: Worked example
navOrder: 11
guide: flowfuse
slug: worked-example
blurb: "OEE, end to end — how an Edge Building Block, the Team Broker, a Data-Driven App and an external time-series DB snap together into one architecture you can say in a sentence."
---

# Worked example

OEE, end to end — how an Edge Building Block, the Team Broker, a Data-Driven App and an external time-series DB snap together into one architecture you can say in a sentence.

## Worked example: OEE

Two packages, two connections.

OEE (Overall Equipment Effectiveness) tells you how much good product a line makes versus its full potential — one live number per line, plus history for trends.

Most real apps are more than one piece. OEE joins an Edge Building Block and a Data-Driven App through the Team Broker, with an external time-series DB added for history.

![OEE, end to end — diagram](/images/application-guide/flowfuse/worked-example-chain.svg)

- **Remote Instance (Edge Block)** — Reads the machine signals at the edge and publishes its state. Built once, rolled out to every device across the fleet.
- **Team Broker (MQTT)** — Carries machine state from edge to cloud. The edge publishes to a topic; the cloud app subscribes. Neither references the other.
- **Hosted Instance (Data-Driven App)** — Subscribes to the machine state, computes availability, performance and quality, and presents the OEE dashboard.
- **External time-series DB (Timescale / QuestDB)** — Each reading is written so trends can be charted over time. FlowFuse has no built-in time-series store, so history goes to an external Timescale/QuestDB reached over the Postgres wire protocol (a second egress, because the data is a timestamped stream).

::callout{icon="i-lucide-quote"}
**The architecture, in one sentence** — OEE is a Hardware: Edge Building Block (on a Remote Instance) publishing machine state over the Team Broker to a Software: Data-Driven App (on a Hosted Instance), which computes and displays OEE and writes history to an external time-series DB (Timescale / QuestDB).
::
