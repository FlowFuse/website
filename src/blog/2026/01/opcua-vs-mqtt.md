---
title: "MQTT vs OPC UA: Why This Question Never Has a Straight Answer"
subtitle: "Why comparing MQTT and OPC UA is a category error and how to choose based on requirements, not marketing."
description: "MQTT vs OPC UA isn't a real choice; they solve different problems. Learn when to use each protocol based on your actual requirements, not vendor marketing."
date: 2026-01-20
authors: ["sumit-shinde"]
image: 
keywords:
tags:
 - flowfuse
---

The question is broken.

<!--more-->

MQTT moves messages. OPC UA defines meaning. They operate at different layers of the stack. Comparing them is like comparing TCP to JSON.

Yet the debate persists. Vendors position them as competitors. Consultants bill by the confusion. Your procurement department demands a choice.

The industry knows better. OPC UA includes MQTT in its spec. Real factories use both: MQTT for telemetry, OPC UA for machine coordination. The technologies already converged.

The false choice exists because confusion is profitable.

This article explains what each does, where they differ, and how to decide based on requirements instead of marketing.

## What Each Actually Does

The confusion starts with category error. Asking "MQTT or OPC UA?" is like asking "HTTP or PostgreSQL?" One moves bytes. The other organizes meaning.

### MQTT: The Minimalist Messenger

MQTT is a publish-subscribe messaging protocol designed in 1999 for satellite oil pipeline monitoring. It does exactly one thing: *move small messages between devices over unreliable networks with minimal overhead.*

**The entire protocol fits on a napkin:**

Publishers send messages to named topics. Subscribers express interest in topic patterns. A broker routes messages from publishers to matching subscribers. That's it.

```
Device A publishes: "factory/line3/temperature" → 72.4
Device B subscribes: "factory/line3/#"
Broker delivers: Device B receives 72.4
```

MQTT's three quality-of-service levels handle network reality:

- **QoS 0**: Fire and forget. Message might arrive. Might not. Zero guarantees.
- **QoS 1**: At least once delivery. Message arrives one or more times. Duplicates possible.
- **QoS 2**: Exactly once. Four-way handshake ensures single delivery. Expensive but reliable.

The protocol header is 2 bytes. A temperature reading with topic and payload fits in under 50 bytes. This economy matters when you're transmitting over cellular networks, paying per kilobyte, or running on battery-powered sensors.

**What MQTT doesn't provide:**

MQTT has no concept of data types. That "72.4" could be Celsius, Fahrenheit, or an error code; the protocol doesn't know or care. It doesn't validate message structure, enforce schemas, or understand relationships between data points. Topic namespaces are conventions, not specifications. `factory/line3/temp` and `factory/line3/temperature` and `line3/factory/temp` are entirely different topics with no semantic relationship.

The broker is a single point of failure unless you architect clustering separately. Security depends entirely on broker implementation; MQTT itself just transports bytes. Discovery is non-existent; subscribers must know exact topic names in advance.

MQTT is deliberately stupid. Stupidity at this layer is a feature, not a bug.

### OPC UA: The Semantic Framework

OPC UA (Unified Architecture) isn't primarily about moving data; it's about describing what data means, how it relates to other data, and what operations are valid.

Released in 2008, OPC UA replaced a fragmented collection of Windows-only industrial protocols with a platform-independent standard. Where MQTT is minimal, OPC UA is comprehensive. The specification spans 14 parts covering everything from information modeling to historical data access to alarm conditions.

**At its core is the address space, a hierarchical graph of nodes:**

Every piece of industrial equipment is modeled as a connected set of typed nodes. A motor isn't just a collection of variables; it's an object with defined properties, methods, and relationships.

```
Motor (ObjectNode)
├── Speed (VariableNode: Double, Engineering Units: RPM)
├── Temperature (VariableNode: Float, Range: 0-150°C)
├── Status (VariableNode: Enum {Running, Stopped, Fault})
├── Start() (MethodNode: Returns StatusCode)
└── ConnectedTo → Pump_A (Reference: HasComponent)
```

The type system is rich. Variables carry metadata: engineering units, valid ranges, historical access, alarm limits. References define relationships: hierarchical containment, semantic associations, type inheritance.

**Companion specifications extend this model for specific industries:**

The Euromap 83 specification defines a complete injection molding machine in OPC UA terms: every sensor, every actuator, every state transition. A client connecting to any Euromap 83 compliant machine encounters the same address space structure. Software written for one machine works with any conforming machine, no custom integration required.

This semantic interoperability is OPC UA's primary value. Two systems can exchange meaningful information without prior coordination because the information model is standardized, not just the byte format.

**OPC UA provides multiple interaction patterns:**

- **Data access**: Read/write variables synchronously
- **Subscriptions**: Monitor variables, receive change notifications
- **Methods**: Execute operations on server objects (start motor, set recipe)
- **Events**: Structured alarm and event notifications
- **Historical access**: Time-series query interface
- **PubSub** (Part 14): Publish address space updates to message brokers, including MQTT

Security is integrated. Certificate-based authentication, message signing, and encryption are specification requirements, not implementation options. Every OPC UA server must support security policies.

**The tradeoff is complexity:**

Implementing an OPC UA server requires managing an address space, handling multiple services, maintaining subscriptions, and processing security handshakes. Client libraries are measured in megabytes, not kilobytes. A simple "read a value" operation involves session establishment, service negotiation, and potentially certificate exchange.

This overhead is absurd for a battery-powered sensor reporting temperature every 30 minutes. It's appropriate for a $2M manufacturing cell where understanding that a temperature reading represents "bearing temperature on the output shaft of motor 3, measured in Celsius, with a normal operating range of 40-65°C and critical alarm at 85°C" matters.

### The Layer Mismatch

Think about the OSI model, that seven-layer networking abstraction everyone learns and immediately forgets:

**MQTT operates at layers 5-7**: Session, Presentation, Application. It's a messaging protocol that happens to carry application data. What that data represents is outside its scope.

**OPC UA operates primarily at layer 7**: Application. It defines data models, type systems, and semantic relationships. Transport is abstracted; OPC UA can run over TCP, HTTPS, WebSockets, or MQTT.

Comparing them is comparing different architectural concerns:

- MQTT answers: "How do I efficiently move this message from publisher to subscriber?"
- OPC UA answers: "What does this data represent, and how does it relate to other data?"

They're not competing solutions to the same problem. They're solving different problems that happen to intersect in industrial automation architectures.

### The Convergence

OPC UA [Part 14](https://reference.opcfoundation.org/Core/Part14/v104/docs/) specifies OPC UA PubSub, a publish-subscribe model that can use MQTT as its transport mechanism. An OPC UA server publishes address space updates as MQTT messages encoded with OPC UA's type information.

MQTT Sparkplug B (2016) borrowed OPC UA's semantic modeling approach, adding type definitions and metric metadata to MQTT payloads. A Sparkplug message doesn't just carry "72.4"; it carries "Temperature (Float32, Engineering Units: °C, timestamp: 1704470400000) = 72.4".

The technologies are converging, not diverging. Industry 4.0 architectures increasingly use both: OPC UA for machine-to-machine communication where semantic interoperability matters, MQTT for high-frequency telemetry where bandwidth efficiency matters, and OPC UA PubSub over MQTT where both matter.

Yet vendor marketing, procurement processes, and consultant billable hours perpetuate the false choice. The question isn't "which one?"; it's "which one for what?"

## Where They Actually Differ

Understanding real differences requires moving past marketing claims to examine what each technology optimizes for and what constraints it accepts as tradeoffs.

### Network Assumptions

MQTT assumes unreliable networks and designs around them. The protocol was literally built for satellite links where latency is measured in seconds and packet loss is expected. QoS levels give explicit control over delivery guarantees versus bandwidth cost. The persistent session feature lets devices reconnect after network interruptions and resume exactly where they left off, receiving any messages published while offline.

OPC UA assumes reliable networks and builds on that foundation. The request-response model expects millisecond response times. Session management assumes stable connections. Historical access and complex queries make sense when networks can support them. Running OPC UA over cellular or satellite links works, but you're fighting the protocol's design assumptions.

This difference cascades into deployment patterns. MQTT excels when you're collecting data from thousands of remote assets: wind turbines, pipeline sensors, fleet vehicles. OPC UA excels when you're integrating systems within a plant where network quality is controlled and semantic understanding matters more than last-mile efficiency.

### Discovery and Configuration

Walk up to an OPC UA server with a generic client. Hit the discovery endpoint. The server returns its complete address space: every node, every relationship, every available operation. You can browse the hierarchy, inspect type definitions, and understand capabilities without reading documentation. The server is self-describing.

Point an MQTT client at a broker. You get nothing. No topic list. No schema information. No metadata. The broker doesn't know what topics exist until something publishes to them. Subscribers must know exact topic patterns in advance or use wildcards and filter everything they receive. Topic naming is pure convention with no enforcement.

This reflects philosophical differences. OPC UA optimizes for systems integration where understanding what's available matters. MQTT optimizes for data distribution where publishers and subscribers coordinate through external mechanisms: configuration files, documentation, human agreement.

In practice, MQTT deployments build discovery and schema management in separate layers. Sparkplug defines topic namespaces and birth certificates that announce available metrics. Cloud platforms provide device registries and schema repositories. These additions acknowledge that pure MQTT is insufficient for complex systems, but they're additions, not native protocol features.

### State and Synchronization

OPC UA maintains state. The server knows current variable values. Clients can read the current state at any time. Subscriptions detect changes and notify clients. If a client disconnects and reconnects, it can query what changed during the outage. The historical access service provides time-series queries.

MQTT is stateless. The broker routes messages but doesn't track values. If you want the current temperature, someone has to publish it after you subscribe. The "retained message" feature lets the broker store the last message per topic, but that's a single value with no history or change tracking. There's no way to query "what happened between 2PM and 3PM yesterday?"

This difference shapes architecture. OPC UA servers are authoritative sources of truth. MQTT systems require separate databases if historical data or current state matters. Time-series databases like InfluxDB or Timescale became standard MQTT architecture components specifically because MQTT itself doesn't retain data.

### Security Models

OPC UA bakes security into the specification. Every implementation must support certificate-based authentication and encrypted sessions. Security policies are negotiated during connection establishment. Message signing and encryption are first-class protocol features. The specification defines exactly how certificates should be managed, what cipher suites are allowed, and how security auditing works.

MQTT treats security as someone else's problem. MQTT 3.1.1 supports username/password authentication and expects TLS encryption to happen at the transport layer, but these are optional features. Securing an MQTT deployment means configuring the broker correctly, managing TLS certificates, implementing access control lists, and possibly adding an authentication service. Two MQTT brokers can have completely different security characteristics.

MQTT 5.0 added enhanced authentication mechanisms, but security remains a broker implementation concern rather than a protocol guarantee. In practice, this means MQTT security varies wildly. Some deployments run wide open with no authentication. Others implement enterprise-grade security with certificate management, role-based access control, and full encryption. The protocol allows both.

For regulated industries (pharmaceuticals, food processing, utilities) OPC UA's integrated security is often a requirement, not a preference. Compliance documentation is simpler when the protocol specification defines security rather than depending on correct broker configuration.

### Bandwidth and Overhead

MQTT's 2-byte header and compact binary format minimize overhead. Publishing a temperature reading consumes roughly 50 bytes including topic and payload. Over a cellular connection transmitting 10,000 readings per day, that's under 500KB. At $1 per megabyte (typical M2M cellular rates), you're paying $0.50 per device per day just for bandwidth.

OPC UA's overhead varies by transport, but even optimized binary encoding uses hundreds of bytes per value due to security handshakes, message signatures, and type information. The same 10,000 readings might consume 5-10MB. At cellular data rates, that's $5-10 per device per day.

For battery-powered remote sensors, this difference determines project feasibility. For plant-floor equipment connected via ethernet, it's irrelevant. The question isn't which protocol has less overhead; it's whether that overhead matters in your deployment.

### Scalability Patterns

MQTT scales horizontally through broker clustering. Mosquitto, EMQX, and HiveMQ all support distributed deployments where multiple broker instances share message routing. Add brokers as subscriber count grows. Millions of devices can publish to a broker cluster, and the brokers handle distribution to subscribers.

OPC UA scales through federation and aggregation. An aggregation server connects to multiple OPC UA devices, presents a unified address space, and handles client connections. Clients connect to the aggregator instead of individual devices. Adding devices means configuring the aggregator, not changing the client.

These patterns fit different problems. MQTT's approach works when you're collecting data from massive device fleets. OPC UA's approach works when you're building a plant information system that integrates hundreds of machines.

## The Unified Namespace Question

"Just use Unified Namespace" appears in every MQTT versus OPC UA discussion, framed as the answer that makes protocol choice irrelevant.

It isn't.

[UNS](/blog/2023/12/introduction-to-unified-namespace/) is an integration pattern: all plant data flows through a central MQTT broker with hierarchical topics. Systems publish once. Systems subscribe to what they need. Instead of 200 point-to-point connections, you have one hub. Add systems without breaking existing integrations. This solves real problems in brownfield plants.

But UNS doesn't eliminate protocol choice. It relocates it.

Your OPC UA machines still speak OPC UA. Edge gateways consume that semantic data, translate it to MQTT Sparkplug, and publish to the UNS broker. Protocol choice happened at the edge. Your MES connects via OPC UA when it needs semantic precision, subscribes via MQTT when it just needs telemetry. Same downstream system, different protocols for different needs.

UNS centralizes data flow. It doesn't centralize protocol decisions; those still happen at every connection point based on the same factors: semantic requirements, bandwidth constraints, scale characteristics, native support.

The question changes from "MQTT or OPC UA for everything?" to "MQTT or OPC UA for this specific connection?"

UNS is valuable architecture. It's not a protocol substitute.

### How to Actually Decide

Most protocol comparisons start with feature matrices. Yours should start with data flow diagrams.

Map your requirements first, not your preferences. Draw every connection in your architecture. Each arrow represents a data flow with distinct characteristics that should guide protocol selection. A temperature sensor transmitting hourly readings over satellite has fundamentally different needs than a CNC machine coordinating with your MES where both systems must agree on what "cycle complete" means.

Consider four factors for each data flow:

**1. Semantic requirements** 

Do the connected systems need shared understanding of what data means? If your MES and machines must coordinate on production states, downtime codes, and quality parameters, OPC UA's information modeling provides that common language. If you're collecting sensor data for ML analysis where patterns matter more than metadata, MQTT with basic context suffices.

**2. Network constraints**

Let the infrastructure decide. Gigabit plant ethernet makes protocol overhead irrelevant; choose based on semantic needs. Cellular links where you pay per megabyte make the difference between MQTT's 50-byte messages and OPC UA's kilobyte handshakes a line-item cost. Satellite connections with multi-second latency need MQTT's QoS handling regardless of other factors.

**3. Native protocol support**

Work with your equipment, not against it. Siemens PLCs, Rockwell controllers, and Schneider drives speak OPC UA natively. AWS IoT expects MQTT. HiveMQ clusters scale MQTT brilliantly. Fighting native support to use your preferred protocol creates integration work without adding value.

**4. Scale characteristics**

Five hundred vibration sensors streaming to cloud storage need MQTT's horizontal scaling through broker clusters. Fifty machines requiring discovered operations and validated method calls need OPC UA's self-describing address spaces. Different problems, different optimal solutions.

For example, you're connecting 50 CNC machines, 500 environmental sensors, [MES](/solutions/mes/), predictive maintenance, and cloud analytics.

```
- Machines → Edge: OPC UA (semantic interoperability for production coordination)
- Sensors → Edge: MQTT (efficient collection at scale)
- Edge → Cloud: MQTT Sparkplug (metadata preservation with bandwidth efficiency)  
- Edge → MES: OPC UA (shared understanding of manufacturing operations)
```

Four data flows, two protocols, zero false choices. The architecture reflects requirements, not vendor marketing.

The pattern emerges naturally: OPC UA where systems must share meaning. MQTT where efficiency and scale matter. OPC UA PubSub when you need both. Protocol choice becomes a local optimization within each data flow, not a global architecture decision that locks you into one approach.

## Moving Forward

The persistence of this debate reveals something: we're still thinking protocol-first instead of problem-first.

Stop asking "which protocol?" Start mapping your actual data flows and constraints. That pipeline sensor? [MQTT](/blog/2024/06/how-to-use-mqtt-in-node-red/). That machine coordination? [OPC UA](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/). That edge-to-cloud telemetry? [Sparkplug](/blog/2024/08/using-mqtt-sparkplugb-with-node-red/). The modern industrial stack uses multiple protocols because different problems have different optimal solutions.

The convergence technologies (OPC UA PubSub, MQTT Sparkplug, edge gateways) prove the industry already knows this. Protocol choice is becoming a local optimization, not a global architecture decision.

Your next project: map requirements first, select protocols second. Use semantic modeling where systems must share meaning. Use efficient messaging where scale and bandwidth matter. Use both when both matter.

The right question isn't "MQTT or OPC UA?" 

It's "MQTT where? OPC UA where? Both where?"

Answer that based on your requirements, not vendor marketing.

***If you're figuring out how to connect legacy equipment, new sensors, and cloud systems and the answer isn't obvious, we get it. We work through these architecture questions with teams every day. Want to talk through your specific setup? [Get in touch](/contact-us/).***