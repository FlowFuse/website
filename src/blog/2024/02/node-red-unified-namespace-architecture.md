---
title: Node-RED in a Unified Namespace Architecture
subtitle: 
description: 
date: 2024-02-14
authors: ["marian-demme"]
image: /blog/2024/02/images/unified-namespace-architecture.png
tags:
    - posts
    - flowfuse
    - unified-namespace
---

As we embark on the journey toward a more interconnected industrial environment, the emergence of a Unified Namespace (UNS) as the fundamental framework for facilitating communication among various systems and devices has become a focal point of discussion. I've often been queried about the role of Node-RED in a UNS architecture. To illuminate this, let's delve into an exemplary UNS architecture, underlining the classic use cases for Node-RED within this framework.

<!--more-->

In this Article: [Node-RED: The perfect adapter and middleware for your UNS](https://flowfuse.com/blog/2024/02/node-red-perfect-adapter-middleware-uns/), where classic use cases for Node-RED are delineated. Building upon that foundation, this discussion aims to present a tangible architectural example, showcasing the practical implementation of these use cases.


## Simplifying Complexity: The Two-Layered Approach

For ease of understanding, consider the architecture split into two principal layers: the Shopfloor layer and the Service layer.

**The Shopfloor Layer**
This is where the physical assets dwell, requiring connectivity through a network layer, which in our example, is the UNS. It acts as the foundation for data flow from the operational technology (OT) on the shop floor to the information technology (IT) in the Service layer.

**The Service Layer**
Here resides the applications and software that analyze data, transforming raw metrics into actionable insights. It's where the data becomes meaningful through analytics, dashboards, and decision-support tools.

## The Roles in UNS Architecture

Within this bifurcated architecture, we have two general categories of actors: Indirect Consumer/Producers and Direct Consumer/Producers.

**Indirect Consumer/Producers**
These actors cannot natively communicate with our UNS broker. The communication barrier could be due to protocol differences, such as not using MQTT, or payload structures incompatible with your UNS's schema. This is a common challenge in manufacturing, especially in "brownfield" scenarios where legacy machines and equipment from various eras must be integrated.

In such cases, Node-RED shines as a middleware for protocol conversion and data contextualization. Take, for example, the topic hierarchy in UNS based on location for context. A raw sensor reading might lack necessary details like measurement units or message versions. Node-RED steps in to enrich this data, ensuring compatibility with the UNS. In our [concrete architecture example](https://flowfuse.com/blog/2023/12/unified-namespace-data-modelling/), we have an indirect PLC producer. With Node-RED, we can convert and contextualize the data from this PLC for the UNS, ensuring smooth communication and effective integration.

**Direct Consumer/Producers**
Contrastingly, direct actors can interact with the UNS out of the box. Modern industrial equipment usually falls into this category, equipped to speak the language of the UNS directly. However, the challenge remains not just in protocol communication but also in data contextualization. Merely speaking the same language is not enough; the data must also carry the correct context to be fully understood and utilized.

![Example Architecture](/blog/2024/02/images/unified-namespace-architecture.png)

## Harnessing Node-RED for Actionable Insights

Node-RED's prowess extends beyond middleware capabilities; it can also derive actionable insights. Our example architecture includes Dashboards for both the Human Machine Interface on the Shopfloor and an OEE Dashboard in the Service Layer. These dashboards engage with the UNS, calculating KPIs directly within Node-RED. For manufacturing applications, our [Blueprint Library](https://flowfuse.com/blueprints/) serves as a robust starting point, offering one-click deployment to your Node-RED managed instance.
Node-RED emerges not just as a translator between machines and UNS but as an interpreter and analyst, generating real-time insights that drive decision-making and operational efficiency. The role of Node-RED in UNS architecture, therefore, is not ancillary; it is central to realizing the vision of a connected, intelligent industrial ecosystem.

![Andon Live Dashboard](https://flowfuse.com/img/ANDON-Screenshot-D4DBvWieJZ-650.avif)
