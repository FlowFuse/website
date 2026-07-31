---
title: "The Agile Factory on the Connected Edge: Streamlining Operational Complexity into High-Value Insights"
subtitle: Unifying Uncoordinated Edge Assets into a Centralized Smart Farm Alongside Custom Endpoints, and Beyond
meta:
    description: See how Aperia Technologies replaced traditional PLCs with Node-RED and FlowFuse, connecting 100+ edge devices into a real-time MongoDB data pipeline.
image: /images/webinars/the-agile-factory-on-the-connected-edge.jpg
date: 2026-07-30
time: 17:00 CET (11:00am ET)
duration: 75
video: DL06LolYqU8
hosts: ["rhythm-agarwal", "kristopher-sandoval"]
hubspot:
    formId: bb64da93-29ff-46be-9422-7d8694491f2f
    downloadFormId: 
---
A testing machinery farm so good that R&D took over half of it. That's the problem [Aperia Technologies](https://aperiatech.com/) — maker of the Halo automatic tire inflation and fleet monitoring system — had to solve.

<!--more-->

Production still had to run 24/7. R&D still needed to experiment. And the usual fix, more [PLCs](/blog/2025/12/what-is-plc/), couldn't scale across a shop floor running over 100 edge devices — from handheld scanners to custom test machinery.

In this session, Rhythm Agarwal (Senior Manufacturing Test Engineer at Aperia) and Kristopher Sandoval (FlowFuse) walk through how Aperia rebuilt its shop floor as an edge-native system — no PLC layer, no rip-and-replace, and no one-off fix per machine.

## How Aperia Replaced Traditional PLCs with Edge Applications

- **Extends the shop floor, doesn't replace it.** Smart fixtures run on FlowFuse instead of a PLC — existing equipment keeps working, just connected.
- **Speaks every protocol.** Sensors, scanners, and actuators connect over [MODBUS-TCP](/node-red/protocol/modbus/), [RS-232](/blog/2025/07/connect-legacy-equipment-serial-flowfuse/), and [raw TCP](/node-red/core-nodes/tcp-in/) — all feeding into one data flow.
- **Logs data the moment it happens.** Every station writes to a shared [MongoDB](/node-red/database/mongodb/) backend in real time, not on a delay.
- **One fix, applied everywhere.** Code changes roll out to entire device groups from a single pipeline, with full version control — not machine by machine.

## Three Manufacturing Applications Built on the Edge

Two real production examples anchored the session.

### Real-Time Weld Inspection and Part Traceability

A Keyence smart camera inspects a weld and sends the result straight into Node-RED. From there, a custom sequence (Aperia calls it *tap create → tap push → tap close*) does the rest:

1. **Tap create** verifies the part's serial number and fixture, then generates a MongoDB record for that specific unit — its "birth certificate" — in milliseconds.
2. **Tap push** sends the sensor reading to the cloud, which looks up the live spec for that station, evaluates pass/fail, and appends the result to the same record.
3. **Tap close** stamps the final pass/fail verdict and resets the station for the next part.

A separate, fully asynchronous process logs high-frequency raw sensor data (100ms polling) the entire time. The result: every part gets a full, queryable history, and the dashboard shows pass/fail data live as parts move down the line.

### Manufacturing Label Printing with Edge-Based Automation

Label printing sounds simple until you're running it at manufacturing volume. Commercial cloud-printing SaaS platforms brought three problems Aperia couldn't live with:

- Per-label transaction pricing that penalizes high-volume production
- Opaque third-party desktop listeners that silently crash on the shop floor
- Zero diagnostics when a print job fails

Aperia's fix: a centralized, decoupled printing architecture built on Node-RED. A station that needs a label (a failed part, a passed part, a rework tag) emits a lightweight MQTT request the moment that event happens — machine ID, part number, file location. A hosted Node-RED "printing station" listens for these requests and prints, reusing Aperia's existing Bartender label templates. No per-label fees, no black-box listener, no data moving until something on the floor actually happens.

### Deploying Production Changes Across Multiple Devices

To show deployment in practice, Rhythm changed the torque limit on a screwdriver spec, captured it as a snapshot (FlowFuse's equivalent of a commit), and deployed it with one pipeline run to every device in the Halo Inflator Line 1 group. No custom PLC logic, no per-machine reprogramming.

## Who this is for

Controls Engineers, IIoT Solutions Architects, and Manufacturing Operations Managers balancing rapid R&D experimentation with stable, 24/7 production data pipelines — without drowning in custom code. It's also relevant if you're on an IT team trying to give OT teams the tools to build their own solutions, without taking on that build yourselves.

## Want to see how this applies to your shop floor?

[Talk to our team](/book-demo) about your specific edge connectivity and PLC-replacement challenges, or explore the [Edge Connectivity](/use-cases/edge-connectivity/) use case to see how FlowFuse builds, deploys, and governs operational applications across every plant and production line — distributed to the edge.
