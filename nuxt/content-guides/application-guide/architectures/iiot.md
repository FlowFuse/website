---
title: "IIoT architectures"
navTitle: "IIoT architectures"
navOrder: 3
---

# IIoT architectures

::arch-diagram
---
nodes:
  - { id: central, label: "Central app", sub: "one live view of every node", accent: indigo, col: 2, row: 1 }
  - { id: broker, label: "Team Broker", sub: "MQTT · UNS", accent: teal, col: 2, row: 2 }
  - { id: ria, label: "Remote Instance", sub: "Site A", accent: slate, col: 1, row: 3 }
  - { id: rib, label: "Remote Instance", sub: "Site B", accent: slate, col: 2, row: 3 }
  - { id: ric, label: "Remote Instance", sub: "Site C", accent: slate, col: 3, row: 3 }
  - { id: sa, label: "Sensors", sub: "pH · flow · level", accent: neutral, col: 1, row: 4 }
  - { id: sb, label: "Sensors", sub: "pH · flow · level", accent: neutral, col: 2, row: 4 }
  - { id: sc, label: "Sensors", sub: "pH · flow · level", accent: neutral, col: 3, row: 4 }
groups:
  - { id: central_z, label: "Central system · one live view of every node", accent: indigo, nodes: [central, broker] }
  - { id: sites_z, label: "Distributed sites · a Remote Instance + a few sensors, each a small job", accent: red, nodes: [ria, rib, ric, sa, sb, sc] }
edges:
  - { from: sa, to: ria }
  - { from: sb, to: rib, label: "reads" }
  - { from: sc, to: ric }
  - { from: ria, to: broker, dashed: true, accent: teal }
  - { from: rib, to: broker, label: "publish", dashed: true, accent: teal }
  - { from: ric, to: broker, dashed: true, accent: teal }
  - { from: broker, to: central, label: "subscribe", dashed: true, accent: teal }
legend:
  - { swatch: indigo, label: "Central" }
  - { swatch: red, label: "Edge sites" }
  - { line: teal, dashed: true, label: "MQTT / UNS" }
  - { line: neutral, label: "sensor wire" }
---
::

The IIoT shape: many distributed Remote Instances, each reading just a few sensors and doing one small job, publish to a central Team Broker. One central app subscribes and sees every node at once. Each node is small — the value is the large-scale live picture they add up to. Think water-quality monitoring across dozens of pump stations.

**Use it when** — Lots of small, spread-out measurement points that only pay off when aggregated into one live view.
