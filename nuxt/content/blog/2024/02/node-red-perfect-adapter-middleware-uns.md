---
title: "Node-RED: The perfect adapter and middleware for your UNS"
subtitle: How Node-RED Enhances Connectivity and Efficiency in Unified Namespace Environments.
description: Discover how Node-RED boosts connectivity and efficiency in Unified Namespace Environments by adapting legacy machines, contextualizing data, and more.
date: 2024-02-06
authors: ["zeger-jan-van-de-weg", "marian-demme"]
image: /blog/2024/02/images/node-red-for-uns.png
tags:
    - posts
    - flowfuse
    - unified-namespace
---

Digitalization is at the inflection point where it’s been adopted enough that the additional investments provided better and better ROIs for organizations. The next bump in ROI will be achieved through the UNS. A torrent of information is more useful when structured and adapted for new use-cases. Either a [performance dashboard](/blueprints/manufacturing/performance-overview/), Artificial Intelligence, or station metrics – each is built faster when the data is readily available and well structured? As a company started around Node-RED, we’ve not spoken a lot where FlowFuse fits into the picture, which is what this post is about.

<!--more-->

## Adapting legacy machines to the UNS

The digitalization effort in traditional industries like manufacturing, agriculture, and beyond, has additional challenges due to the high capex assets that need to join in the effort. As these assets will not be replaced, the only way is to adapt them. Adaptation will require tooling that can interact with sensor data regardless of the protocol, data format, and data structures.

Node-RED bridges the gap between analog and digital data acquisition by seamlessly integrating with a vast array of protocols including serial bus support, Modbus, MQTT, and OPC-UA. Its format agnostic nature allows it to handle diverse data formats, from parsing binary data, to JSON, Protobuf (Sparkplug B), making it a versatile tool for extracting and manipulating data from various sources. With its widespread adoption, Node-RED ensures compatibility with almost every protocol, enabling users to connect and process data from a wide range of devices and applications.

## Contextualisation of the data

When data is captured and parsed, it needs to be contextualized. For example; in a UNS the topic hierarchy on which to publish and subscribe to is based on location – that is; context. Furthermore, a raw sensor reading might miss details like the unit of measurement, what message version is required, or doesn’t supply the information in a proper type. All these minor niggles are actual blocking issues for adopting all sensors to the UNS. In some cases makes and models of the sensor might influence the tolerances of readings, it’s a good idea in those cases to include that information in the message.

## Filtering and preprocessing

Not all messages are created equal, which was discussed in [an earlier post](/blog/2024/01/unified-namespace-when-not-to-use/.). In two of the three examples provided in that post, Node-RED can preprocess or filter information before sending it to the UNS. In the case of big files or binary data, Node-RED can store it in S3 or a network attached storage layer, or even store it locally through a REST interface. The distribution of the event that created the binary data is still published through the UNS though.

Filtering of data is also a great use-case for Node-RED, generally just a `change` node and the data is ready to be published. The flexibility to do virtually anything with captured data is what makes Node-RED such a strong partner for your UNS.

## Continuous improvement

While it would be ideal if data schemas were stable, changes are frequent and unpredictable. It’s a non-obvious requirement for your UNS edge to be adaptable. Message structures can change, to add or remove data from them. Though also the format, from JSON to Sparkplug B, or maybe to XML. Not to say that standardization of messages will continuously require updates to leverage the UNS for higher business value.

A swiss-army knife as both data sender and receiver is not just a nice-to-have, it’s a requirement.

## Scalable operations

While there are other tools available that can adapt to a few protocols, or parse a handful of data formats, there’s no alternative for Node-REDs breadth and depth of integration level. This is why many organizations have already adopted Node-RED for their edge cases, which their current standard solution doesn’t handle.

There’s no situation where a vendor provided, off-the-shelf solution handles protocols and formats across vendors, modern and legacy OT, that also satisfies the IT requirements unless the extensibility is handled through an Open-Source community, with compliance and security controls from a professional entity surrounding the open source project.

### How FlowFuse Enhances Node-RED

While Node-RED is powerful for implementing UNS, its management and deployment can be complex. FlowFuse simplifies this process with a unified platform that offers one-click deployment, secure management, and scalability for Node-RED applications. It enhances collaboration through centralized management of all Node-RED instances, ensuring streamlined operations and increased efficiency.

**[Sign up]({% include "sign-up-url.njk" %}) now for a free trial and explore how FlowFuse can transform your Node-RED experience.**