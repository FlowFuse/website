---
eleventyNavigation:
  key: FlowFuse MQTT Nodes 
  parent: FlowFuse Nodes
  order: 2
  title: MQTT
meta:
  title: MQTT Nodes
  description: MQTT In and Out nodes designed for FlowFuse users with automatic configuration.
---

# {{ meta.title }}

This document lists and explains the **MQTT nodes** available in FlowFuse. These nodes are enhanced versions of the standard **MQTT In** and **MQTT Out** nodes in Node-RED, designed for FlowFuse users.  

They are tightly integrated with the [FlowFuse MQTT Broker Service](/docs/user/teambroker/), a built-in, team-scoped broker managed directly by the FlowFuse platform. When an MQTT node is added to the canvas, the MQTT Broker Client is automatically created and configured. This ensures secure, easy communication without requiring any external broker setup or credentials.

## Nodes

This section lists the document of **MQTT nodes** available in FlowFuse:

{% include "navigation-items-list.njk" %}

Each node extends standard MQTT functionality with automatic configuration and full MQTT v5 support, making it easier to build reliable and real-time communication flows inside FlowFuse.