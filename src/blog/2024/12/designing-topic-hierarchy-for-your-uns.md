---
title: "Designing a Clear Topic Structure for Your UNS"
subtitle: Why Topic Structuring is Key to Scaling and Optimizing Your UNS
description: Learn why topic structuring is crucial for your UNS’s performance and scalability. In this post, we explore best practices and strategies to design an effective topic hierarchy for your system.
date: 2024-12-13
authors: ["sumit-shinde"]
image:
tags:
 - flowfuse
 - unified-namespace
 - mqtt
---

We’ve been talking a lot about UNS lately—how it works, why pub-sub is often a better choice than point-to-point, and even how you can set up your UNS in just 15 minutes using Flowfuse. But there’s one thing we haven’t discussed enough: topic structuring. It’s not rocket science, but it’s essential. Getting your topic structure right can make a huge difference in how your UNS performs and scales. In this post, we’ll dive into why it matters and how to approach it for the best results.

<--more-->

## Why Topic Structuring Matters for Your UNS

When you're building a Unified Namespace (UNS), one thing you really can't overlook is how you structure your topics. If you're using MQTT (which is super common for UNS), you’re dealing with a hierarchical system, where topics are organized like a tree, with slashes (/) separating each level. Think of it like a folder system on your computer—everything has its place, and that makes a big difference when you’re handling lots of data.

Why does topic structuring matter so much? Well, a good structure helps your system scale. As your UNS grows, you’ll likely add more topics, but with the right hierarchy, it’s easy to do that without making everything a mess. It keeps things organized and lets you expand without a headache.

Another bonus is performance. When your topics are well-organized, it’s easier to ensure that consumers only get the data they actually need. For example, if a device only cares about temperature, it can subscribe to something like /`sensor/temperature` rather than receiving every bit of data that’s floating around. This reduces unnecessary traffic and helps your system and edge device run smoothly.

## Designing a Topic Structure for Your UNS

Before you start collecting data in your UNS, it’s essential to design your topic structure. While it might seem like a small step, it’s the foundation of your system. Taking the time to plan will save you significant time and effort down the road. More importantly, it gives you a clear, high-level view of your entire factory, which is crucial for scaling effectively.

### Organizing the Hierarchy

First, think about the key components of your factory. For example, in a manufacturing setting, you might have different plants or production lines. Within each production line, there will be machines or devices that produce data. Then, you’ll have various data points coming from sensors on these machines, such as temperature, humidity, or pressure.

By organizing your topics around these components, you’re setting up a structure that’s easy to scale.

This way, you can easily track where each piece of data is coming from and avoid confusion as your system grows.

Next, remember that MQTT topics are hierarchical, so think of them like a tree. At the top of the tree, you’ll have the broadest categories (like plants or regions). As you go down, you’ll get more specific, with production lines, machines, and then individual data points like sensor readings. The key is to keep things logical, so you can quickly locate the data you need. This organization lets you easily expand your system later by adding new plants, lines, or machines without disrupting the entire structure.

The concept of structuring topics in a logical, hierarchical manner draws from a well-known framework in manufacturing: ISA-95. ISA-95 is a standard that defines a hierarchical model for organizing and managing manufacturing systems. It divides operations from the company level down to individual machines, providing a clear structure for system management.

![ISA-95 Equipment Hierarchy Model](./images/isa-95-equipement-model.png){data-zoomable}
_ISA-95 Equipment Hierarchy Model_

Here’s a brief breakdown of the ISA-95 levels and how they can be translated to MQTT topics:

- **Level 0 – Physical Devices and Control**

This is where the physical data originates: sensors, actuators, and devices that directly interact with machinery and production lines. These are typically represented as devices in your MQTT topic structure.

Example Topics:

`/plantA/productionLine1/machineB/sensor/temperature`

`/plantA/productionLine1/machineB/sensor/pressure`

`/plantA/productionLine2/machineC/sensor/humidity`

At this level, you're dealing with specific machines and sensors. The topic name clearly defines the device type (e.g., "sensor") and the type of data it generates (e.g., "temperature"). This structure makes it easy to track sensor data per machine or production line.

- **Level 1 – Control Devices and Systems**

This level represents the control systems that operate the machinery and manage the data flow. These systems might include PLCs, SCADA systems, or other control devices that manage real-time operations.

Example Topics:

`/plantA/productionLine1/machineB/PLC/status`

`/plantA/productionLine1/machineB/PLC/mode`

`/plantA/productionLine2/machineC/SCADA/alerts`

Topics at this level might focus on the status and control functions of the machines. By separating control systems like PLCs or SCADA, you're ensuring that operational data (e.g., machine modes or alerts) is distinct from raw sensor data. This approach ensures that each system component can be monitored and managed independently.

- **Level 2 – Monitoring and Supervisory Control**

At this level, systems are monitoring and managing operations. It might include higher-level systems that oversee the production lines, collect data from multiple PLCs, and trigger alerts or analyses based on predefined criteria.

Example Topics:

`/plantA/productionLine1/supervisor/alerts`

`/plantA/productionLine1/supervisor/performance`

`/plantA/productionLine2/supervisor/utilization`

Here, you might aggregate data from several control devices (like PLCs) and provide higher-level insight into the overall system. For example, a "performance" topic could aggregate sensor data to monitor the efficiency of a production line, while "alerts" might be used for system-wide warnings.

- **Level 3 – Manufacturing Operations Management**

This level encompasses the management of the overall production process, such as scheduling, production orders, and resource management. This is often where MES (Manufacturing Execution Systems) comes into play.

Example Topics:

`/plantA/productionLine1/MES/productionOrder`

`/plantA/productionLine2/MES/scheduling`

`/plantB/productionLine1/MES/inventoryStatus`

At this level, the data becomes more abstract, as you're dealing with business logic, production orders, and scheduling systems. For example, the "productionOrder" topic could track orders for specific products, while "inventoryStatus" could provide data on material availability for each production line.

- **Level 4 – Enterprise Resource Planning (ERP)**

The highest level in the ISA-95 hierarchy is focused on enterprise-wide resource planning, financials, and decision-making processes. ERP systems integrate with manufacturing systems to provide broader business insights.

Example Topics:

`/enterprise/ERP/inventory/overview`

`/enterprise/ERP/sales/orders`

`/enterprise/ERP/production/metrics`

At the ERP level, topics might reflect cross-plant business data like inventory, order management, or performance metrics. These are less granular than lower levels and serve to provide decision-makers with high-level insights into the health of the overall business.

## Best Practices for Managing Your Topic Structure

As your UNS scales, following some essential best practices will ensure your topic structure remains efficient, secure, and easy to manage.

**1. Maintain Clear Documentation:**

First and foremost, maintaining clear documentation is key. A well-documented topic hierarchy acts as a reference point for everyone involved in the system—from developers and engineers to system administrators. This documentation should outline the naming conventions, the purpose of each topic, and how new topics should be added. Without it, there's a risk of inconsistency creeping into your system, especially as new data streams and devices are introduced. A clear, organized reference ensures that your team can efficiently navigate and expand the system without confusion.

**2. Ensuring Consistency in Naming and Structure:**

Using clear, descriptive names for each topic and sticking to a consistent naming pattern across your system is essential for long-term success. A well-defined naming convention ensures that everyone involved—whether it’s developers, engineers, or system administrators—can easily understand the purpose of each topic. When topics are consistently named, navigating your UNS becomes intuitive, and troubleshooting issues is much easier.

For instance, avoid vague or overly generic names like `/sensor1/data`, which don’t offer much context. Instead, adopt more descriptive, hierarchical names that reflect the actual source and nature of the data, such as `/plantA/productionLine1/machineB/temperature`. A consistent structure not only enhances system readability but also ensures scalability.

**3. Keep Topic Names Simple and Avoid Special Characters:**

While it’s important to have descriptive topic names, they should also be simple and easy to use. Long topic names can make it harder to work with your UNS quickly and efficiently. Additionally, avoid using spaces or special characters, as they might cause compatibility issues with some MQTT brokers or clients.

**4. Perform Regular Topic Cleanup and Expiration:**

Next, don’t overlook the importance of topic cleanup and expiration. Over time, unused or obsolete topics can accumulate, adding unnecessary complexity and overhead to the system. Left unchecked, these stale topics can lead to unwanted confusion. It’s important to regularly audit the topics in your UNS, archiving or removing those that are no longer needed. While some MQTT systems support automatic topic expiration, it’s still a good practice to implement manual checks as part of your routine system maintenance. You’ll also want to manage the use of retained messages carefully. While they can be useful for providing the latest state to new subscribers, overuse or misuse can lead to outdated information circulating across the system. Be mindful about which topics should retain data and ensure they are updated or cleaned up regularly.

**5. Implement Robust Access Control:**

Access control is another fundamental aspect of managing a large-scale UNS. The hierarchical nature of MQTT topics naturally lends itself to role-based access control (RBAC). By defining permissions based on topic hierarchy, you can ensure that users and devices only access the data they need. For instance, an engineer might only need access to machine-level sensor data, while a plant manager may require broader access to performance metrics across multiple production lines.

By taking the time to implement clear documentation, regular topic cleanup, and robust access control, you’re laying a solid foundation for a scalable and secure UNS that will grow with your business needs.

## Effortless MQTT and Topic Management with FlowFuse

FlowFuse is more than just a low-code platform; it’s a game-changer for building and scaling your Unified Namespace (UNS). By seamlessly integrating MQTT, FlowFuse empowers you to connect, manage, and scale your industrial data systems with unmatched efficiency.

With FlowFuse's built-in MQTT broker, you get high-performance data handling with no additional infrastructure overhead. The platform also features an interface for managing MQTT clients with access control for topics and an intuitive Topic Hierarchy View, which provides a real-time, visual representation of your entire MQTT topic structure. This makes it easy to organize, monitor, and manage your topics, ensuring clarity and consistency as your system grows.

![Image showing FlowFuse topic hierarchy interface for UNS](./images/flowfuse-mqtt-topic-hierarchy-monitoring.png){data-zoomable}
_Image showing FlowFuse topic hierarchy interface for UNS_

What makes FlowFuse truly stand out is its ability to handle both legacy and modern industrial protocols, bridging the gap between old and new systems effortlessly. Whether you’re adding new devices, integrating data streams, or scaling to thousands of devices, FlowFuse gives you the flexibility, scalability, and security you need to optimize your UNS at every step.

FlowFuse doesn’t just help you manage topics—it streamlines collaboration, enhances system performance, and accelerates your journey toward a fully integrated, future-proof UNS.

**Looking to simplify your UNS management? [Start](https://app.flowfuse.com/account/create) using FlowFuse today and unlock the full potential of your data architecture. Get started now with a free trial!**