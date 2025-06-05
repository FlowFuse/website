---
title: "MES: Acquiring Operational Data"
subtitle: Getting Live Factory Info Where It Needs to Be, Made Easier.
description: Learn how to effectively acquire and integrate operational data from your factory floor for MES using FlowFuse.
date: 2025-06-02
authors: ["sumit-shinde"]
image:
keywords: MES, Data Acquisition, Operational Technology, Industrial IoT, FlowFuse, Factory Data, Real-time Data, PLCs, SCADA, OPC UA, Modbus, MQTT
tags:
  - flowfuse
  - mes
---

In our last post, we talked about how a **MES** helps your factory run better and smarter. An MES can truly make a difference in your operations.

<!--more-->

However, for an MES to be effective, it needs real-time information from your factory floor. This means getting live data, moment by moment, from every machine and sensor. Bringing all this operational data together and making it useful is often a significant challenge.

This article will explain what data your MES needs, where it comes from, and how it moves through your factory. We’ll also look at the common difficulties in collecting this data. Then, we’ll show how **FlowFuse** simplifies getting the right information to your MES, when and where it's needed most.

## Understanding Your Factory's Data: Where It Comes From and How It Moves

Let's talk about what makes a factory run well, or why it might struggle. For your MES to be an effective control center, it needs to see all the important details. This isn't just about numbers; it's about the core activity of your operation. We mean knowing exactly how many items are made, if a machine is running or stopped, precise measurements like temperature or speed, why a line had downtime, or how much power a production run used. When your MES gets this steady flow of correct information, it becomes a powerful tool, helping you plan smoothly, predict issues before they become costly, and keep things running well.

So, where does this key information about your factory actually live? A large part of it is inside the PLCs – the controllers that tell your machines what to do. Then there's the broader data, often managed by SCADA systems that oversee whole processes. You get raw signals from sensors on the floor, measuring every detail. Operators also create key info on their HMI screens. And for looking at past trends, Historians diligently save machine data, sometimes for years. Don't forget, your ERP system also holds important data like production orders and material availability that your MES needs to understand production, and in return, the MES sends updates back to ERP.

Now, here's the reality: all these different systems often use different digital languages, or protocols. For example, you might find PLCs using Modbus, SCADA systems communicating via OPC UA, and newer Industrial IoT devices transmitting data with MQTT. An older machine might use a different language than a new sensor, and connecting systems across different levels, like SCADA and ERP, also requires specific methods. The key is recognizing this diverse landscape of information sources and communication methods. Building a unified picture for your MES from these varied systems is what makes smarter factory management possible.

To better understand what data is involved, where it is found, and the common protocols used, let's look at a detailed breakdown:

| **Data Source/System** | **Type of Data Captured** | **Common Data Exchange Protocols** |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PLCs (Machine Controllers)** | Machine States: Running, stopped, part counts, alarms (on/off), error codes. <br> Process Values: Temperature, pressure, flow, speed, current, voltage. <br> Control Data: Setpoints, program variables, recipe parameters. | Modbus (TCP/RTU), PROFINET, EtherNet/IP, OPC UA, DeviceNet, CC-Link, HART, Vendor-specific TCP/IP protocols. |
| **Sensors (Field Devices)** | Raw Process Values: Temperature, humidity, pressure, flow rate, vibration, proximity, light, level, position, current, voltage. <br> Environmental Data: Ambient conditions, air quality. <br> Quality Data: Dimensions, weights (from specialized sensors or gauges). | Analog signals (4-20mA, 0-10V), Digital signals (on/off), IO-Link, HART, Wireless protocols (e.g., WirelessHART, LoRaWAN, BLE), Modbus (for smart sensors). |
| **SCADA/HMI Screens** | Operational Status: Real-time machine status, production counts, active alarms, current process values. <br> Operator Input: Manual data entries, control commands, alarm acknowledgements, recipe selections. <br> Short-term Historical Trends: Recently logged process variable history. | OPC Classic (DA, AE, HDA), OPC UA, DNP3, Modbus TCP, EtherNet/IP, Vendor-specific communication drivers. |
| **Historians (Data Archives)** | Time-Series Data: Comprehensive historical machine and process data (temperature, pressure, flow, speed, energy consumption) stored with high-fidelity timestamps. <br> Event Data: Historical alarms, operator actions, system events. <br> Batch Records: Aggregated data associated with specific production batches. | OPC HDA, OPC UA Historical Access, SQL, ODBC, Proprietary APIs, MQTT (for aggregated or summary data publication). |
| **ERP** | Production Orders: Detailed order specifications (start/end times, quantities, materials, routing). <br> Material Consumption: Bill of materials, actual material usage, inventory levels. <br> Labor Tracking: Operator assignments, time spent, labor costs. <br> Quality Specifications: Product requirements, test plans, recorded quality inspection results. <br> Maintenance Schedules: Machine availability, repair logs, spare parts inventory. | SQL (for direct database access), HTTP APIs, OPC UA (for shop-floor integration). |

## Moving Factory Data: The Real Challenges

Now you know what data you need for your MES, where you can find it, and how it can move. But here’s the critical part: can you actually use it? Getting that vital information from where it sits to your MES so you can act on it, make real-time decisions, and genuinely improve operations? That’s the core struggle for most factories, and it’s costing businesses more than they realize.

Because your factory's various systems speak different digital languages and store information in different ways, data often gets stuck. It's isolated in "silos," acting like hidden treasure you can't access. This isn't just a technical detail; it creates significant, expensive problems. There's no single, universal way for all your factory data to communicate. This means every new machine, every system upgrade, every attempt to connect means custom coding, complex middleware, and endless workarounds. It's a never-ending cycle of expensive, fragile integrations. You end up with a fragmented view of your operations, leading to slow decisions, missed opportunities, and preventable downtime. How can you optimize when you can't even see the whole picture?

Even if you manage to pull data from different systems, the data itself often doesn't make sense. It comes in mismatched forms and structures. Imagine trying to combine financial reports where one uses tons and another uses pounds, and neither tells you if it's raw material or finished product. Your MES needs clean, standardized, and perfectly structured data to give you accurate, trustworthy answers. Without it, you're making critical business decisions based on incomplete or even incorrect information, which can lead to wasted materials, production errors, and lost profits.

It's true, these are just some of the core challenges. Other critical issues like data security and finding the right place to store your data also come into play. However, for this article, our focus will remain squarely on the significant hurdle of getting the data itself from your machines to your MES.

## How FlowFuse Makes Data Flow Smoothly for Your MES

Dealing with all the different machines, their unique languages, and those messy data formats in your factory can truly feel like a tangled mess. It's frustrating to know the data is there, but feel powerless to use it. That's precisely where **FlowFuse** steps in, acting as your factory's smart translator and traffic controller. It cuts through that complexity, connecting to virtually all your machines, sensors, and systems, no matter what industrial language (protocol) they speak. FlowFuse then doesn't just move data; it intelligently cleans, organizes, and delivers the *right* data, in the *right format*, exactly where your MES needs it, all in real time.

One of **FlowFuse's** biggest strengths, the power behind its universal connectivity, lies in its powerful foundation: the vast **Node-RED** ecosystem. This means you gain access to an incredible library of pre-built connectors, called "nodes," that understand a huge array of industrial protocols. Whether you're dealing with classic protocols like Modbus, PROFINET, EtherNet/IP, and OPC UA, or more specialized ones for sensors like HART and IO-Link, or even modern messaging systems like MQTT and wireless standards like LoRaWAN, FlowFuse has you covered. You won't have to worry about incompatible machines or wasting time building custom bridges. Instead, you can simply grab the right node and instantly connect.

This extensive library makes connecting your diverse factory equipment remarkably straightforward. Imagine easily linking up your Siemens S7 or Mitsubishi MC controllers, or even Omron FINS devices, just by dragging and dropping. There are even general-purpose nodes for HTTP requests or Serialport connections, ensuring almost anything can be brought into your data flow. With over 5,000 nodes available in the Node-RED ecosystem, you'll almost certainly find the exact connector or tool you need to integrate any factory system or piece of equipment.

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

Thanks to these powerful connections, **FlowFuse** moves data instantly and reliably across your entire factory floor. This constant, real-time data flow means your MES always has fresh, accurate information to base its decisions on, helping you avoid those costly delays and errors we talked about earlier. But FlowFuse doesn't just pass data along; it's also incredibly smart. You can easily set it up to transform, filter, and normalize that raw data, ensuring it perfectly matches what your MES expects. This results in cleaner, more reliable data feeding your critical systems, reducing errors and improving the trustworthiness of your insights.

So with **FlowFuse**, you can:

- Connect to PLCs, sensors, SCADA systems, and more using ready-made nodes for OPC UA, Modbus, MQTT, and HTTP/REST.
- Transform and structure data using flow logic so it matches what your MES expects.
- Schedule or trigger data flows based on machine events or production states.
- Deploy and manage flows at scale across multiple devices using **FlowFuse’s** remote deployment features.

### Example Use Case: Packaging Line Integration

Imagine a packaging line where each machine reports production counts, jam alerts, and speed settings. With an **edge device running FlowFuse** on your factory floor, you can:

1.  Use OPC UA or Modbus nodes to collect runtime values from the PLCs, **no coding, just drag and drop**.
2.  Clean data and Normalize the values to a standard format, **again no coding**.
3.  Send structured data via MQTT to a central broker or REST API to the MES.
4.  Log data to an **InfluxDB using the InfluxDB node** for future analysis.
5.  Visualize the data using **FlowFuse Dashboards**, helping line supervisors identify bottlenecks or failures early.

This illustrates how FlowFuse provides the robust capability to transform complex, raw machine data into the precise, real-time insights your MES needs to drive effective operations.

## Final Thoughts

It can feel like a big job to get live information from your factory machines over to your MES. Connecting all the different equipment, which often speak different computer "languages," and then making sense of all that raw data can seem overwhelming. But it doesn't have to be a constant struggle.

That's where FlowFuse comes in. It acts like a central hub, making it much simpler to connect to almost any machine or system in your factory. Once connected, FlowFuse helps you tidy up and organize that data so your MES gets exactly what it needs, in a way it can easily understand. This makes your MES much more effective, helping you make better choices, run things smoother, and make your factory work more efficiently.

Want to make getting your factory data to your MES easier? [Let's connect](/contact-us/) and discuss your needs.
