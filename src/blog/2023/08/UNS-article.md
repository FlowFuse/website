---
title: Why the Automation Pyramid blocks digital transformation - The Role of Unified Namespace
subtitle: A Critical Examination of the Automation Pyramid's Obstruction to Digital Transformation
description: This article analyzes the Automation Pyramid's constraints and explains the Unified Namespace, highlighting its potential to evolve digital transformation in manufacturing.
date: 2023-08-08 
authors: ["marian-demme"]
#image: blog/2023/07/images/opc-ua-3/opc-ua-3-title-image.png
tags:
    - posts
---
A few years ago, I wrote an article, in German, detailing my understanding of how the Automation Pyramid, a widely adopted reference model for the IT landscape of manufacturing firms, is essentially hindering digital transformation. Now, as conversations around the Unified Namespace (UNS) and particular frameworks continue to evolve, I revisit my earlier notions, review the latest updates to reference frameworks and update my article.
<!--more-->

## The Pyramid’s Dilemma

The Automation Pyramid is grounded in the standard ISA-95, which aligns with IEC 62264 and DIN EN 62264. It delineates the functional hierarchy within a manufacturing enterprise. Over 25 variations of the Automation Pyramid exist in academic literature, all of them fundamentally mapping to the same core concept, tracing back to the Computer-integrated manufacturing (CIM)-Pyramid of the 1970s. Although ISA-95 does not explicitly refer to a pyramid, it introduces five functional hierarchical levels often visualized as a pyramid.

![Automation Pyramid ISA95](./images/UNS/ISA95.JPG)

A notable critique of ISA-95 is the absence of some operational functions and hierarchical levels commonly seen in manufacturing, leading to a rigidity that limits its applicability. This inflexibility has been acknowledged in the more recent framework, the "Reference Architectural Model Industry 4.0" RAMI 4.0 (IEC PAS 63088). As a result, the authors' introduced a "Smart Grid Architecture Model" (SGAM) with three primary dimensions: Life Cycle & Value Stream (IEC 62890), Hierarchy Levels (IEC 62264 and IEC 61512), and six main layers displaying the functional architecture of the asset and the separation into physical and digital world.

![RAMI4.0](./images/UNS/RAMI40.jpeg)

However, my primary critique revolves around another issue – the structure and proposed communication methodology. Models based on layers, where each tier represents a functional area and could be covered by one or more applications, almost always lead to three fundamental problems:

### Problem 1: Information Loss and Transaction Costs

The traditional upward flow of data collection (Levels 0 to 4) while planning goes downwards (Level 4 to 0). Information traversing from Level 0 to Level 4 has to pass through at least four stages. Despite theoretical lossless transmission of information, the practical scenario inevitably results in some degree of information loss between levels. The upshot is that original information from Level 0 arrives at Level 4 late, altered, or not at all.

### Problem 2: The Expense of One-to-One Connections 

The Automation Pyramid does not explicitly provide a data management approach. Consequently, one-to-one connections between IT systems become a necessity for data transfer between levels. For example, Level 3 IT systems need at least two connections to the adjacent levels. This can lead to thousands of one-to-one interfaces between IT systems, incurring exorbitant costs for projects and maintenance.

### Problem 3: AI's Dependence on Data 

Artificial intelligence (AI) requires extensive, well-organized data. Given the current architecture, data would have to be manually collected and prepared from individual systems and levels. This would invariably lead to numerous new one-to-one connections, offering no flexibility. Hence, AI and the Automation Pyramid can only collaborate in a significantly restricted manner.

## IIoT Circle and Unified Namespace

To overcome the limitations of traditional industrial data architecture, a paradigm shift towards a modern distributed architecture is necessary. Rather than allowing data to exist in silos within and across layers of the technology stack, data should be made accessible in a unified manner, creating a single, centralized repository. This approach facilitates a single centralized source for all enterprise systems to access the required data for their operations. This framework, which I have been calling the IIoT Circle, modernizes the original idea of the Automation Pyramid. A "Unified Namespace" operates as the core element that stores, processes, and permits data streams to be loaded and exported from other systems. All other applications communicate exclusively through the Unified Namespace, requiring only a single interface to be maintained per application. 

![IToT Circle Image](PLACEHOLDER)

In essence, Unified Namespace serves as the main data exchange hub within an organization. It structures, organizes, and maintains a real-time flow of data from a variety of sources, becoming the indisputable source of truth across the business. It simplifies data integration, eliminating the frequently convoluted, layered approach of traditional data systems.

### Single Source of Truth 

The Unified Namespace breaks down the linear and deterministic data structure, which creates data silos restricted to their specific systems. Instead, Unified Namespace centralizes data from across the entire organization. This results in a 'single source of truth' - a consolidated, current, and comprehensive overview of the organization's data.

### The Organizational Structure 

Unified Namespace organizes data using a semantic hierarchy, similar to a meticulously arranged file share system. It can use the ISA-95 part 2 or the RAMI 4.0 Hierarchy Level standards to structure the hierarchy. This data organization facilitates navigation, management, and decision-making.

### The Pub-Sub Approach

The Publish-Subscribe (Pub-Sub) model facilitates communication that decouples the sender (publisher) from the receiver (subscriber), providing an efficient communication protocol to avoid one-to-one connections. It offers flexibility and scalability as it allows for one-to-many and many-to-one communications, enabling data to flow freely between systems.

## A Necessity for Open Source

Moreover, in this discourse on the Unified Namespace, we cannot overlook the role of open-source. Owning foundational digital infrastructure, such as the Unified Namespace, is a necessity for any corporation embarking on its digital transformation journey. This ownership provides a solid foundation, allowing companies to chart their destinies. To avoid the constraining bounds of vendor lock-in, which can significantly limit a company's digital capabilities; open-source or self-developed software offers the best recourse. By its nature, open-source promotes transparency, collaboration, and freedom of use. These aspects are fundamental in fostering innovation and continuous improvement. As exemplified by the [MING Stack](../../02/ming-blog.md), open source can be incorporated into every level of the hierarchy.

## Summary – Advancing Current Standards

The lag of standards behind the latest innovation is an open secret, a problem rooted in the nature and development of these standards. However, maintaining and updating these standards remains crucial as many people adhere to them.

ISA-95 Part 6 mentions a Messaging Service Model (MSM) and proposes a "publish-subscribe" model as an option for transactions. This is a great step in the right direction. My recommendation for ISA-95 is to further develop Part 6 to clearly delineate the implementation pattern of the Unified Namespace. Additionally, ISA-95 Part 1 should make explicit references to the communication pattern detailed in Part 6 and transition from a layer model to a cycle, with the Unified Namespace as an integral part of the framework. 

RAMI 4.0's Communication Layer is rather skeletal. It suggests the use of OPC-UA for everything in manufacturing, from "Product" to "Work Center". For "Enterprise" and "Connected World", it states "still undecided". My improvement suggestion is to define the "Communication Layer" new and to be more technology-agnostic. Be more explicit about what needs to be done and more flexible about how to do it.