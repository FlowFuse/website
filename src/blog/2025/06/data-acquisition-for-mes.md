---
title: "MES: Acquiring Operational Data"
subtitle: Getting Your Factory Data to Your MES
description: Learn how to effectively acquire and integrate operational data from your factory floor for MES using FlowFuse.
date: 2025-06-13
authors: ["sumit-shinde"]
image:
keywords: MES, Data Acquisition, Operational Technology, Industrial IoT, FlowFuse, Factory Data, Real-time Data, PLCs, SCADA, OPC UA, Modbus, MQTT
tags:
   - flowfuse
   - mes
---

A Manufacturing Execution System (MES) should act as the central command system for your factory. To be effective, it requires a constant flow of high-quality, real-time information from the shop floor. This data is fundamental to your entire operation. However, for most factories, the biggest challenge in improving their operations is simply getting this data from the machines to the MES.

<!--more-->

This article dives into the data that fuels your MES and the complex web of sources it comes from. We'll explore the core challenge that keeps this data locked away in silos. Most importantly, we’ll show how **FlowFuse** acts as the catalyst to liberate this data, empowering you to get the right information to your MES, exactly when and where you need it most.

## The Data That Defines Operational Excellence

For your MES to be an effective command center, it needs to see every critical detail of your factory's activity. This isn't just raw data; it's the very anatomy of your operational performance. This includes:

* **Production Data:** The fundamental metrics of output. This covers `Production Counts` (how many items were made), `Cycle Times` (how long each item takes), and `Scrap/Defect Counts`.
* **Machine & Process Data:** The real-time heartbeat of your equipment. This includes `Machine Status` (running, stopped, faulted), critical `Process Parameters` (temperature, pressure, speed), and `Energy Consumption`.
* **Contextual & Quality Data:** The information that adds meaning and ensures standards are met. This involves `Downtime Reason Codes`, operator `Labor Tracking`, and vital `Quality Inspection Results`.
* **Material & Traceability Data:** The data that provides a complete product story. This tracks `Material Consumption`, `Lot Numbers`, and full product `Genealogy` from raw materials to finished goods.

When this steady, contextualized flow of information feeds your MES, it transforms from a simple tracking system into a powerful predictive and planning tool, enabling you to anticipate issues and keep your operations running at peak performance.

## The Sources and Movement of Your Operational Data

This critical operational data doesn't live in one place; it's generated across a diverse and complex digital ecosystem.

A vast amount comes directly from shop floor equipment—the PLCs that orchestrate your machines, the thousands of sensors measuring every variable, and the Historians that diligently archive past performance. Then you have your core business systems. The ERP provides the what and why through production orders, while Quality (QCS) and Maintenance (CMMS) systems add essential layers of inspection and machine health data.

Finally, and most critically, is the human element. An operator provides the irreplaceable context—explaining why a machine stopped or confirming a quality check—that turns raw numbers into actionable intelligence.

Each of these sources speaks its own digital language. A single factory floor is a cacophony of `Modbus`, `OPC UA`, `EtherNet/IP`, and `MQTT`, etc all running simultaneously. This mix of protocols defines the communication architecture of the operation.

To better understand the data involved, its sources, and the common protocols used, let's look at a detailed breakdown:

| Data Source/System | What Type of Data It Captures | Common Ways Data Is Exchanged (Protocols/Methods) |
|---|---|---|
| **PLCs (Machine Controllers)** | Machine status (on/off, fault), current measurements (temp, pressure, flow), control settings, counts of items made, alarms. | Modbus, PROFINET, EtherNet/IP, OPC UA, Proprietary protocols. |
| **Sensors (Field Devices)** | Raw measurements (temp, humidity, pressure, vibration), environmental data, basic quality checks (e.g., presence, absence). | Analog/Digital signals, IO-Link, HART, Wireless (LoRaWAN, Wi-Fi), Modbus. |
| **SCADAs** | Real-time plant status, operator actions (starting/stopping batches, recipe changes), recent trends, acknowledged alarms. | OPC Classic/UA, DNP3, Modbus TCP, EtherNet/IP, Specific APIs. |
| **Historians (Data Archives)** | All recorded historical machine data, event logs, detailed records of past production runs for long-term analysis. | OPC HDA/UA, SQL (database queries), ODBC, MQTT, Specific APIs. |
| **ERP (Enterprise Resource Planning)** | Production orders, Bill of Materials (what materials are needed), current inventory, material availability, customer orders, product details. | SQL (database queries), HTTP APIs (REST/SOAP), SAP iDocs. |
| **Manual Input (Operators/Quality Personnel)** | Why machines stopped (downtime reasons), detailed quality inspection results (e.g., defect type, severity), material lot numbers used, start/end times for tasks, shift notes. | HMI screens, Manual entry terminals, Barcode scanners, (Data often stored/transferred via SQL or HTTP APIs). |
| **Quality Control Systems (QCS)** | Comprehensive quality test results, statistical process control (SPC) data, lab results (LIMS). | SQL (database queries), HTTP APIs. |
| **Maintenance Management Systems (CMMS/EAM)** | Machine fault codes, maintenance schedules, work order status, repair history, spare parts usage. | SQL (database queries), HTTP APIs. |

## The Core Challenge of Data Silos

You know what data you need and where it is. The fundamental question is: can you actually get it from your machines and deliver it to your MES?

This is the central struggle where real-time decisions get delayed, opportunities are lost, and innovation is stifled. Your most valuable data is trapped. Because your factory’s systems don’t speak the same digital language, data is locked away in "silos," inaccessible and unusable. This isn't a technical inconvenience; it's a critical business problem.

Every new piece of equipment demands expensive, custom-coded integrations that are fragile and brittle. This creates a chaotic patchwork of data connections, leaving you with a fragmented view of your operation instead of the unified picture you need to make intelligent decisions. How can you optimize a factory you can’t fully see?

## Orchestrate Your Factory's Data Flow with FlowFuse

t's frustrating to know the data is there but be unable to reach it. FlowFuse was built to solve this exact problem by acting as a data acquisition layer for your factory. It creates reliable pathways for information to get from your various machines and systems directly to your MES.

The power of FlowFuse lies in its foundation on the vast Node-RED ecosystem. This gives you immediate access to a library of over 5,000 pre-built connectors, or "nodes" ready to communicate with a massive array of industrial protocols. This eliminates the need for expensive, time-consuming custom code. The library includes robust nodes for standards like Modbus, OPC UA, and MQTT, as well as for specific controllers from Siemens, Mitsubishi, Omron, and more.

Following are some of the most commonly used protocol nodes:

- **Modbus:** <https://flows.nodered.org/node/node-red-contrib-modbus>
- **OPC UA:** <https://flows.nodered.org/node/node-red-contrib-opcua>
- **OPC DA:** <https://flows.nodered.org/node/node-red-contrib-opc-da>
- **MQTT:** <https://flowfuse.com/node-red/core-nodes/mqtt/>
- **Ethernet/IP:** <https://flows.nodered.org/node/node-red-contrib-ethernet-ip>
- **Siemens S7:** <https://flows.nodered.org/node/node-red-contrib-s7comm>
- **MITSUBISHI MC:** <https://flows.nodered.org/node/node-red-contrib-mcprotocol>
- **OMRON FINS:** <https://flows.nodered.org/node/node-red-contrib-omron-fins>
- **HTTP:** <https://flowfuse.com/node-red/core-nodes/http-in/>
- **LwM2M:** <https://flows.nodered.org/node/node-red-contrib-lwm2m>
- **AMQP:** <https://flowfuse.com/node-red/protocol/amqp/>
- **Serialport:** <https://flows.nodered.org/node/node-red-node-serialport>
- **GPIO:** <https://flows.nodered.org/node/node-red-contrib-gpio>
- **Lorawan:** <https://flows.nodered.org/node/node-red-contrib-lorawan>

This extensive library allows you to reliably acquire data from various assets using a simple drag-and-drop approach, bringing your factory's siloed data into a cohesive and manageable flow.

In addition to protocol connectors, there are also powerful database nodes available to integrate with systems such as InfluxDB, TimescaleDB, PostgreSQL, Microsoft SQL Server, and more—making it easy to store, query, and analyze your factory data.

So, With FlowFuse, you can:

* **Deploy intelligent agents** directly to the edge, all managed from a central platform remotely.
* **Connect to any industrial asset**—PLCs, sensors, SCADA—using ready-made nodes.
* **Transform raw data** with visual logic, so it’s perfectly structured for your MES.
* **Build custom operator dashboards** with pre-built UI widgets to visualize and act on data.
* **Automate data flows** based on schedules, machine events, or production states.
* **Secure the entire process** with enterprise-grade features like multi-user authentication and role-based access control.
* **Scale seamlessly** from a single line to your entire enterprise.

This isn't just about solving a technical challenge. It’s about driving business outcomes. When you can finally see your entire operation in one clear picture, your production lines run more efficiently. You'll see tangible savings as you reduce waste and catch errors before they become costly. When you are known for exceptional quality and effortless compliance, you win. You can turn the messy, trapped data that has been holding you back into the very asset that pushes you ahead of the competition.

## Your Next Step Towards Operational Excellence

Bridging the gap between your factory floor and your MES is a monumental task. The sheer diversity of machines, systems, and protocols can seem insurmountable. But it doesn’t have to be a barrier to innovation.

This is precisely where FlowFuse shines. It acts as the universal translator, bringing all your systems together regardless of the language they speak. With thousands of ready-to-use connectors and an intuitive low-code interface, FlowFuse empowers you to get your data flowing exactly where it needs to go.

Once that live data starts moving, your MES becomes exponentially more powerful—helping you spot problems faster, plan smarter, and run your operations with confidence.

[Let’s talk about how we can unlock your factory's data, together.](/contact-us/)
