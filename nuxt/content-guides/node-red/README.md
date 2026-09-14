---
title: "Using Node-RED"
navTitle: "Using Node-RED"
metaTitle: "Node-RED Documentation | Using Node-RED"
navOrder: 1
navGroup: "Node-RED"
navGroupOrder: 7
meta:
    description: "Reference documentation for using Node-RED with databases, communication protocols, hardware, peripheral devices, notification services and integration technologies."
    keywords: node-red, node red, node-red documentation, node-red core nodes, node-red database, node-red protocols, node-red hardware, industrial iot
---

# Using Node-RED

Node-RED is the open-source runtime FlowFuse runs, governs and scales. This section
provides reference documentation for working with Node-RED itself: connecting it to
databases, communication protocols, hardware and notification services, and
understanding what each core node does.

It is here to answer a question you already have. It is not a path into FlowFuse, and it
does not need to be read in order. If you are setting FlowFuse up, start with
[Using FlowFuse](/docs/user/) instead.

::callout{icon="i-lucide-book-open"}
**The Node-RED project's own documentation is the primary source.** Installing Node-RED,
the editor, the message model, writing functions and the API reference all live at
[nodered.org/docs](https://nodered.org/docs/). This section covers the ground that
documentation does not: per-node reference on the web, and connecting Node-RED to
specific databases, protocols, hardware and services.
::

## Getting started

Installing Node-RED, finding your way around the editor, and the basics of shaping a
message. [Getting started](/docs/node-red/getting-started/)

## Core nodes

Reference documentation for each node in the default Node-RED palette, with a worked
reason to reach for it. [Core nodes](/docs/node-red/core-nodes/)

## Communication protocols

Modbus, OPC UA, MQTT, AMQP, WebSocket and LwM2M, for connecting Node-RED to controllers
and edge equipment. [Communication protocols](/docs/node-red/protocol/)

## Databases

Reading and writing SQL, NoSQL and time-series databases with Node-RED, one guide per
database. [Databases](/docs/node-red/database/)

## Integration technologies

Webhooks, REST APIs and GraphQL, for connecting Node-RED to the rest of your systems.
[Integration technologies](/docs/node-red/integration-technologies/)

## Notification services

Sending alerts from Node-RED by email, Telegram and Discord.
[Notification services](/docs/node-red/notification/)

## Hardware

Running Node-RED on a Raspberry Pi, a Siemens IoT2050, and other industrial gateways.
[Hardware](/docs/node-red/hardware/)

## Peripheral devices

Webcams, barcode scanners and other devices connected to the machine Node-RED runs on.
[Peripheral devices](/docs/node-red/peripheral/)

## Reference

[Terminology](/docs/node-red/terminology/) for the words used in Node-RED documentation,
and [keyboard shortcuts](/docs/node-red/keyboard/) for the editor.

::callout{icon="i-lucide-arrow-right"}
**Running Node-RED for an organisation?** Access control, version history, deployment
across environments and remote instance management are what FlowFuse adds on top.
See [Using FlowFuse](/docs/user/).
::
