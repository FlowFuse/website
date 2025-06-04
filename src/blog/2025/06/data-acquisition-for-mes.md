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
   - MES
   - Industry 4.0
---

In the last article, we talked about what MES is and how it helps your factory run better. But for MES to work well, it needs live data from your machines. Getting this data—and actually making it useful—is often difficult.

<!--more-->

This article will explain what data your MES needs, where it comes from, and how it moves through your factory. We’ll also explore the challenges in collecting this data and show how FlowFuse makes it easier to deliver the right information to your MES.

## Understanding Your Factory's Data: Where It Comes From and How It Moves

For your Manufacturing Execution System (MES) to truly work as the central control for your factory, it needs to know everything important. We're talking about the key facts that show what's truly happening: how many items are made, if a machine is working or stopped, exact measurements like how hot something is or how fast it's going, even why a machine broke down, or how much power a production line used. This steady flow of correct information is what gives your MES the power to provide really useful ideas, helping with everything from planning work precisely to fixing machines before they break.

But where does all this important information actually live? It's often found deep inside the small computers that control your machines, your PLCs. These are the tiny controllers that tell your equipment what to do. It's also caught by small sensors right on the floor, measuring things as they happen. You might see information pop up on screens that operators use to control things. And for keeping old records, it's carefully saved in Historians, which are special storage places made to hold lots of machine information for a long time.

The hard part is that these different systems often speak completely different digital languages. An older system, for example, might "talk" differently than a newer one. And for sending information easily to one central spot, especially for sharing widely, there's a common way to do it. So, the real challenge isn't just that the information exists; it's getting all these different parts of your factory, speaking their own technical languages, to actually share information in a way your MES can understand. Getting all those different pieces of information to come together in one clear picture for your MES is the main problem. It's simply key for running your factory smarter.

Here's a clear breakdown of where your factory data resides, the types of data it represents, and the common protocols used for its movement:

| **Data Source/System** | **Type of Data Captured** | **Common Data Exchange Protocols** |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PLCs (Machine Controllers)** | **Machine States:** Running, stopped, part counts, alarms (on/off), error codes. <br> **Process Values:** Temperature, pressure, flow, speed, current, voltage. <br> **Control Data:** Setpoints, program variables, recipe parameters.                                                                                                                                                                                                            | Modbus (TCP/RTU), PROFINET, EtherNet/IP, OPC UA, DeviceNet, CC-Link, HART, Vendor-specific TCP/IP protocols.                                                                                                                                                                                                                                                                                                                                                                     |
| **Sensors (Field Devices)** | **Raw Process Values:** Temperature, humidity, pressure, flow rate, vibration, proximity, light, level, position, current, voltage. <br> **Environmental Data:** Ambient conditions, air quality. <br> **Quality Data:** Dimensions, weights (from specialized sensors or gauges).                                                                                                                                                            | Analog signals (4-20mA, 0-10V), Digital signals (on/off), IO-Link, HART, Wireless protocols (e.g., WirelessHART, LoRaWAN, BLE), Modbus (for smart sensors).                                                                                                                                                                                                                                                                                                           |
| **SCADA/HMI Screens** | **Operational Status:** Real-time machine status, production counts, active alarms, current process values. <br> **Operator Input:** Manual data entries, control commands, alarm acknowledgements, recipe selections. <br> **Short-term Historical Trends:** Recently logged process variable history.                                                                                                                                  | OPC Classic (DA, AE, HDA), OPC UA, DNP3, Modbus TCP, EtherNet/IP, Vendor-specific communication drivers.                                                                                                                                                                                                                                                                                                                                                                                          |
| **Historians (Data Archives)** | **Time-Series Data:** Comprehensive historical machine and process data (temperature, pressure, flow, speed, energy consumption) stored with high-fidelity timestamps. <br> **Event Data:** Historical alarms, operator actions, system events. <br> **Batch Records:** Aggregated data associated with specific production batches.                                                                                                                                      | OPC HDA, OPC UA Historical Access, SQL, ODBC, Proprietary APIs, MQTT (for aggregated or summary data publication).                                                                                                                                                                                                                                                                                                                                                                          |
| **ERP** | **Production Orders:** Detailed order specifications (start/end times, quantities, materials, routing). <br> **Material Consumption:** Bill of materials, actual material usage, inventory levels. <br> **Labor Tracking:** Operator assignments, time spent, labor costs. <br> **Quality Specifications:** Product requirements, test plans, recorded quality inspection results. <br> **Maintenance Schedules:** Machine availability, repair logs, spare parts inventory. | SQL (for direct database access), HTTP APIs, OPC UA (for shop-floor integration).                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                                                              |

## Moving Factory Data: The Real Challenges

You've got all this important factory data, sitting in various machines, sensors, and computer systems. But for your MES to actually use it, this data has to move. And getting it to move reliably from where it is to where it needs to be in your MES? That's the real tough part.

Your factory has many different machines, and they all "speak" different technical languages. These are called **protocols**. Your PLCs might talk using Modbus or Profinet. Your older machines might have their own old protocols. Your newer stuff often uses OPC UA. And your office systems, like your ERP, use different ways to talk, usually through direct connections or web APIs.

Because these factory systems use so many different languages, they can't simply share information directly. This is the main problem, often called "data silos." Here's why that’s tricky:

-   **No One Standard:** There’s no single way all factory data talks universally. This often means you face custom integration challenges for each factory, or even for each unique machine type you add, making a unified data strategy difficult.
-   **Data Formats:** Even if two systems *can* talk, they might not *understand* each other. The data comes in different formats and structures, so it needs to be cleaned, standardized, and set up in the right way for your MES to make sense of it. This "making sense" part is critical for accurate insights.

Solving these problems needs a smart plan. It requires a complete approach to connect, change, and deliver data reliably and securely to your MES. This is exactly where **FlowFuse** can help.

## How FlowFuse Makes Data Flow Smoothly for Your MES

Dealing with all the different machines, protocols, and data formats in your factory can feel overwhelming — and that’s exactly why FlowFuse is so valuable. It acts like a smart translator and traffic controller for your factory data, connecting to all your machines, sensors, and systems no matter what language or protocol they speak. FlowFuse then cleans, organizes, and delivers the right data exactly where your MES needs it, all in real time.

One of FlowFuse’s biggest strengths is its universal connectivity. It supports a wide range of industrial protocols, covering everything from classic ones like Modbus (TCP/RTU), PROFINET, EtherNet/IP, and OPC UA, to sensor-level protocols like HART, IO-Link, and wireless standards such as WirelessHART or LoRaWAN. It even handles vendor-specific TCP/IP protocols and modern messaging systems like MQTT. This broad compatibility means you don’t have to worry about incompatible machines or building complex custom bridges to get your data flowing.

Here are a few common protocol nodes you can use to connect your factory equipment:

-   Modbus: https://flows.nodered.org/node/node-red-contrib-modbus
-   OPC UA: https://flows.nodered.org/node/node-red-contrib-opcua
-   OPC DA: https://flows.nodered.org/node/node-red-contrib-opc-da
-   MQTT: https://flowfuse.com/node-red/core-nodes/mqtt/
-   Ethernet/IP: https://flows.nodered.org/node/node-red-contrib-ethernet-ip
-   Siemens S7: https://flows.nodered.org/node/node-red-contrib-s7comm
-   MITSUBISHI MC: https://flows.nodered.org/node/node-red-contrib-mcprotocol
-   OMRON FINS: https://flows.nodered.org/node/node-red-contrib-omron-fins
-   HTTP: https://flowfuse.com/node-red/core-nodes/http-in/
-   LwM2M: https://flows.nodered.org/node/node-red-contrib-lwm2m
-   AMQP: https://flowfuse.com/node-red/protocol/amqp/
-   Serialport: https://flows.nodered.org/node/node-red-node-serialport
-   Lorawan: https://flows.nodered.org/node/node-red-contrib-lorawan

These are just a few examples focused on protocol nodes. There are many more nodes available for databases, user interfaces, analytics, and countless other functions. The Node-RED ecosystem features over 5,000 nodes, so you will almost certainly find the exact connector or tool you need to integrate your factory equipment or systems.

Using this nodes you can moves data instantly and reliably across your entire factory floor. Because of this real-time data flow, your MES always has fresh, accurate information to base its decisions on, avoiding costly delays. But FlowFuse doesn’t just pass data along — it can also transform and filter that data to match exactly what your MES expects. This results in cleaner, more reliable data and fewer errors downstream.

What makes FlowFuse especially user-friendly is its easy interface for building data flows, industrail applications. You don’t need to be a software engineer or spend months coding complex integrations. Instead, FlowFuse offers a visual, drag-and-drop interface that lets you set up your data flows quickly and make changes on the fly, adapting as your factory evolves.

Finally, FlowFuse is designed to grow with your operation. Whether you’re running a small factory or managing multiple large sites, FlowFuse scales smoothly. You can add new remote instances, build solutions, and deploy them across your multiple devices easily.

In short, FlowFuse takes the headache out of connecting all your factory data sources. It helps you break down data silos, reduce integration costs, and speed up your digital transformation. This allows your MES to work at its full potential, helping you run a smarter, more efficient factory.