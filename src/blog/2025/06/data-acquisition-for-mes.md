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

In our last post, we talked about how a **MES** helps your factory run better and smarter. An MES can truly make a difference in your operations. However, for an MES to be effective, it needs real-time information from your factory floor. This means getting live data, moment by moment, from every machine and sensor. Bringing all this operational data together and making it useful is often a significant challenge.

<!--more-->

This article will explain what data your MES needs, where it comes from, and how it moves through your factory. We’ll also look at the common difficulties in collecting this data. Then, we’ll show how **FlowFuse** simplifies getting the right information to your MES, when and where it's needed most.

## The Data That Drives Your MES

For your MES to be an effective control center, it needs to see all the important details of your factory's activity. This isn't just about raw machine numbers; it's about understanding the core components of your operation. This "anatomy" of operational data includes several critical pieces:

* **Production Data:** The fundamental output metrics. This includes `Production Counts` (how many items are made), `Cycle Times` (how long it takes to make one item), and `Scrap/Defect Counts`.

* **Machine & Process Data:** The real-time heartbeat of your equipment. This covers `Machine Status` (running, stopped, idle, faulted), `Process Parameters` (precise measurements like temperature, pressure, or speed), and `Energy Consumption`.

* **Contextual & Quality Data:** The information that adds meaning and ensures standards are met. This includes `Downtime Reason Codes` (why a line stopped), `Labor Tracking` (who performed a task), and `Quality Inspection Results`.

* **Material & Traceability Data:** The data that tracks resources and product history. This involves `Material Consumption`, `Lot Numbers`, and full product `Genealogy` from raw materials to finished goods.

When your MES gets this steady flow of correct, contextualized information, it becomes a powerful tool, helping you plan smoothly, predict issues before they become costly, and keep things running well.

## Understanding Your Factory’s Data Sources and How Data Moves

So, where does all this key information about your factory actually live? It’s not in one single place but is spread across your operations.

First, a large amount of data comes directly from the shop floor equipment. This includes the controllers (PLCs) that tell your machines what to do, the thousands of sensors measuring every detail. For analyzing past performance, Historian diligently saves all this machine data.

Next, you have your core business and support systems. Your ERP provides the overall context, like what production orders to run and what materials are needed. Similarly, dedicated Quality Systems (QCS) provide detailed inspection data, while Maintenance Systems (CMMS) track machine health and repair schedules.

Finally, and most importantly, is the human element. An operator often provides the most valuable context, such as explaining exactly why a machine went down or confirming a quality check. This human input turns raw data into truly meaningful information.

Each of these data sources communicates using a specific digital language known as a protocol. This means a typical factory floor has a variety of communication methods running at once. For instance, it's common to see PLCs using Modbus, SCADA systems on OPC UA, and new IoT sensors using MQTT. This collection of different protocols simply defines the communication architecture of the operation.

To better understand the data involved, its sources, and the common protocols used, let's look at a detailed breakdown.

| Data Source/System | What Type of Data It Captures | Common Ways Data Is Exchanged (Protocols/Methods) |
|---|---|---|
| **PLCs (Machine Controllers)** | Machine status (on/off, fault), current measurements (temp, pressure, flow), control settings, counts of items made, alarms. | Modbus, PROFINET, EtherNet/IP, OPC UA, Proprietary protocols. |
| **Sensors (Field Devices)** | Raw measurements (temp, humidity, pressure, vibration), environmental data, basic quality checks (e.g., presence, absence). | Analog/Digital signals, IO-Link, HART, Wireless (LoRaWAN, Wi-Fi), Modbus. |
| **SCADA/HMI Screens** | Real-time plant status, operator actions (starting/stopping batches, recipe changes), recent trends, acknowledged alarms. | OPC Classic/UA, DNP3, Modbus TCP, EtherNet/IP, Specific APIs. |
| **Historians (Data Archives)** | All recorded historical machine data, event logs, detailed records of past production runs for long-term analysis. | OPC HDA/UA, SQL (database queries), ODBC, MQTT, Specific APIs. |
| **ERP (Enterprise Resource Planning)** | Production orders, Bill of Materials (what materials are needed), current inventory, material availability, customer orders, product details. | SQL (database queries), HTTP APIs (REST/SOAP), SAP iDocs. |
| **Manual Input (Operators/Quality Personnel)** | Why machines stopped (downtime reasons), detailed quality inspection results (e.g., defect type, severity), material lot numbers used, start/end times for tasks, shift notes. | HMI screens, Manual entry terminals, Tablets/Mobile devices, Barcode scanners, (Data often stored/transferred via SQL or HTTP APIs). |
| **Quality Control Systems (QCS)** | Comprehensive quality test results, statistical process control (SPC) data, lab results (LIMS). | SQL (database queries), HTTP APIs. |
| **Maintenance Management Systems (CMMS/EAM)** | Machine fault codes, maintenance schedules, work order status, repair history, spare parts usage. | SQL (database queries), HTTP APIs. |

## The Core Challenge: Data Trapped in Silos

You now know what data your MES needs and where to find it. But here is the most important question: can you actually *get* that information from your machines and bring it into your MES?

This is the central struggle for most factories. Getting data from point A to point B sounds simple, but it's the gap where real-time decisions get delayed, opportunities are lost, and money is wasted. The primary reason for this is that data gets trapped.

Because your factory's different systems don't speak the same digital language, data gets stuck in "silos," making it nearly impossible to access. This isn't just a technical problem; it's a business problem.

Every new machine or system upgrade requires expensive, custom-coded integrations. These connections are often fragile and break easily. This creates a messy patchwork of data, giving you a fragmented view of your operations instead of the clear, complete picture you need. How can you optimize a factory when you can't see everything at once?

While integration is the main hurdle, it's not the only one. Subsequent challenges include data quality, consistency, standardization, and security. For this article, however, we will focus entirely on that first, fundamental step: successfully acquiring the data.

## Getting Your Data Moving with FlowFuse

Dealing with different machines and their unique communication languages is the biggest barrier to effective data collection. It's frustrating to know the data is there but be unable to get to it. This is the exact problem FlowFuse is built to solve. It acts as a universal data acquisition bridge for your factory, specializing in connecting to your many systems and ensuring a reliable flow of information from these sources to your MES.

The key to FlowFuse’s powerful acquisition capabilities is its foundation in the vast Node-RED ecosystem. This gives you immediate access to an incredible library of over 5,000 pre-built connectors, called "nodes," designed to communicate with a huge array of industrial protocols. This means you don’t need to write expensive custom code to connect your equipment. The library includes nodes for common protocols like Modbus, OPC UA, and Ethernet/IP, as well as for specific controllers from brands like Siemens, Mitsubishi, and Omron and more.

Here are a few common protocol nodes you can use to connect your factory equipment:

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
- **Lorawan:** <https://flows.nodered.org/node/node-red-contrib-lorawan>

This extensive library makes connecting your diverse factory equipment remarkably straightforward. With thousands of ready-made nodes, you can reliably acquire data from all your different machines and systems, often with a simple drag-and-drop approach. This allows you to bring all your factory's trapped data together into one cohesive and manageable flow.

By successfully acquiring data from all these different sources, FlowFuse creates the single, unified stream of information that is essential for an effective MES. This constant, real-time data flow gives your system the fresh, accurate information it needs for you to see a true picture of your operations, helping you spot issues faster and make better-informed decisions. While successfully acquiring the data is the critical first step, FlowFuse also provides powerful tools to then filter, standardize, and format that data. This ensures the information delivered to your MES is not only complete but also perfectly clean and consistent.

So with **FlowFuse**, you can follow a logical process:

* **Run FlowFuse agents** on your edge devices right on the factory floor, all managed remotely from a central platform.
* **Connect to any industrial asset,** including PLCs, sensors, and SCADA systems, using ready-made nodes for protocols like OPC UA, Modbus, and MQTT and more.
* **Transform and structure raw data** using visual flow logic so it perfectly matches what your MES or other IT systems expect.
* **Build custom industrial applications** and operator dashboards with pre-built UI widgets to visualize and interact with your data.
* **Automate your data flows** by triggering them based on schedules, machine events, or production states.
* **Secure the entire process** with robust features like multi-user authentication and granular role-based access control.
* **Scale your solution easily** from a single production line to your entire factory, or even across multiple locations.

Following this process does more than just solve a technical problem. At the end of the day, it’s about making your whole business run better. When you can finally see everything working together in one clear picture, your production lines simply run faster and more efficiently. You'll start seeing real savings as you cut down on waste and catch mistakes before they become expensive problems.

And it doesn’t stop there. When you're known for great quality and can handle compliance without breaking a sweat, customers notice. That’s how you win. You take that messy, trapped data that’s been holding you back and turn it into the very thing that pushes you ahead of the competition.

## Final Thoughts

So, getting real-time data from your factory floor into your MES might seem like a big task—and honestly, it is. There are so many machines, systems, and protocols, all doing their own thing. But the good news? It doesn’t have to be that complicated.

This is exactly where FlowFuse really shines. It brings everything together, no matter what language your equipment speaks. With so many ready-to-use connectors and a simple drag-and-drop interface, FlowFuse makes it so much easier to get the data flowing just the way your MES needs it.

Well, once that live data starts moving, your MES becomes way more powerful—helping you spot problems faster, plan better, and keep things running smoothly.

So if you’re thinking about how to get started or just want to make your current setup work better, maybe it’s time to give FlowFuse a closer look.

[Let’s talk!](/contact-us/)
