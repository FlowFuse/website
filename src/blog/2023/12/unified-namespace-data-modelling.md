---
title: Data Modelling for your Unified Namespace
subtitle: How to use FlowFuse as your schema registry?
date: 2023-12-27
authors: ["marian-demme"]
# image: /blog/2023/12/images/agent-as-windows-service.png
tags:
    - posts
    - flowfuse
---

In the realm of industrial manufacturing, the concept of a Unified Namespace (UNS) emerges as a pivotal instrument for enhanced communication within a manufacturing network framework. Predicated on an event-driven architectural model, this approach advocates for the universal accessibility of data, irrespective of the immediate presence of a data consumer. This paradigm allows for a flexible role allocation within the network, where nodes can dynamically switch between being data producers and consumers, contingent upon the fluctuating requirements of the system at any specific juncture. 

<!--more-->

For those unfamiliar with UNS, I recommend revisiting my [previous article](https://flowfuse.com/blog/2023/08/isa-95-automation-pyramid-to-unified-namespace/) on the subject.

This article aims to explain the process of data modeling for your UNS, highlighting the role of tools like FlowFuse Team Library in schema management. 

## Connecting to Operational Technology (OT) equipment

The journey begins with establishing connections to OT equipment, which may include Programmable Logic Controllers (PLCs), Historian databases, and sensors. It is essential to facilitate compatibility with a diverse array of protocols. In this context, Node-RED emerges as a pivotal tool, bolstered by its expansive community-generated catalog featuring over 4500 nodes. 

In my example, the focus is on integration with a RevolutionPi. To achieve this, the FlowFuse Device Agent was deployed on a RevolutionPi (see our [documentaion](https://flowfuse.com/docs/hardware/raspbian/)), and specific RevolutionPi nodes were installed. These nodes enable direct interaction with all interfaces of the PLC and are available through the [Node-RED library](https://flows.nodered.org/node/node-red-contrib-revpi-nodes). Subsequent steps involved acquiring temperature data directly from the PLC.

A general recommendation is the imperative of maintaining data integrity during transmission from OT systems to the message broker. This is particularly salient in regulated sectors such as pharmaceuticals, where standards like GxP mandate the preservation of unaltered data during transfer to the UNS.

## Structuring your payload

The payload is the core of transmitted data. Transforming the payload for mutual intelligibility between sender and receiver, even within the same protocol, is sometimes necessary. Standardizing payload formats ensures consistent data storage and transmission. I recommend including schema type information with the data to cater to diverse use cases.

Utilizing FlowFuse and Node-RED can enforce schema consistency. Node-RED's template node lets you define JSON schemas for your flows, while FlowFuse Team Library facilitates schema sharing and consistency across your organization.

…



## Building your Topic Hierarchy

Your topic hierarchy should reflect your physical plant structure or align with existing asset naming systems. This approach improves data visibility and eases navigation for OT engineers. Many enterprises opt for the ISA-95 model to structure their topics.

In our example we follow the structure of: Enterprise/Site/Line1/StationA


## Connection to your Unified Namespace

Finally, transfer your data to the UNS, using protocols like MQTT or Kafka, depending on your UNS setup. While MQTT can handle up to 256 MB per payload, Kafka's default is 1MB, expandable to 10MB. These capacities suffice for most data types. In our example, we'll employ MQTT, readily available in Node-RED.



