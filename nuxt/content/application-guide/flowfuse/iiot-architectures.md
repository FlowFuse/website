---
title: IIoT architectures
navTitle: IIoT architectures
navOrder: 10
guide: flowfuse
slug: iiot-architectures
---

# IIoT architectures

:::guide-tabs
::guide-tab{label="Distributed edge"}
![Distributed edge — diagram](/images/application-guide/flowfuse/iiot-architectures-distributed.svg)

The IIoT shape: many distributed Remote Instances, each reading just a few sensors and doing one small job, publish to a central Team Broker. One central app subscribes and sees every node at once. Each node is small — the value is the large-scale live picture they add up to. Think water-quality monitoring across dozens of pump stations.

**Use it when** — Lots of small, spread-out measurement points that only pay off when aggregated into one live view.

::
::guide-tab{label="Across many sites"}
![Across many sites — diagram](/images/application-guide/flowfuse/iiot-architectures-sites.svg)

Scale the same pattern across sites. Each site — itself a cluster of edge nodes — publishes into one enterprise namespace over Project Link, with no inbound ports. A single Team Broker carries every site's live data, and enterprise dashboards, historians and analytics subscribe across all of them.

**Use it when** — The distributed-edge pattern spans multiple plants or geographies that must roll up to one enterprise view.

::
:::
