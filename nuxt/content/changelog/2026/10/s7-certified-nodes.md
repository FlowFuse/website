---
title: Siemens S7 Certified Nodes
description: Read, write and monitor data on Siemens S7-300, S7-400, S7-1200, S7-1500 and LOGO! PLCs from your flows, with the first release of the S7 Certified Nodes.
date: 2026-10-08 12:00:00
release: "3.2"
authors: ["stephen-mclaughlin"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/certified-nr-nodes/issues/91
---

The FlowFuse Edge Certified Nodes catalogue now includes the Siemens S7 nodes. Use them to read, write and monitor data on S7-300, S7-400, S7-1200, S7-1500, S7-200 and LOGO! PLCs from your flows over Ethernet. No OPC server or gateway in between.

Community S7 nodes vary in quality and can go unmaintained without warning. These are Certified Nodes, so FlowFuse vets them for quality, security and support, and maintains them for you.

## What's in the package

- **s7-config** holds the connection to one PLC. It reconnects automatically, and host, port, rack and slot can come from environment variables, so one flow can run against different PLCs.
- **s7-read** reads one or many addresses as a single value, an object keyed by address, a raw buffer, a structure or an array of bits.
- **s7-write** writes single values, arrays, strings or a whole structure.
- **s7-trigger** polls addresses and only sends a message when something changes. It detects rising and falling edges on bits and applies a deadband to analog values.
- **s7-browse** lists the data blocks and memory areas on a PLC.
- **s7-control** starts, stops or cold-starts the PLC CPU.

Addresses can use `DB1,REAL0`, `DB1.DBD0` or `MW10`, and you can mix the styles in one node.

## Work with tags, not raw addresses

Typing byte offsets from memory is where most S7 projects lose time. In **s7-read** you can import a tag list exported from TIA Portal or STEP 7, and the tag names become the keys of the output object. If you only have a STEP 7 `.cfg` export, **s7-browse** reads it without a live PLC connection, so you can build flows before the hardware is on site.

## Pick a backend per connection

- **nodes7** is pure JavaScript, needs nothing to compile and is the default.
- **snap7** uses the native Snap7 library. It adds block listing, CPU status and CPU control, and a few extra data types.
- **sim** is a built-in simulated PLC, for building and testing without hardware.

## Getting started

1. Open the **Palette Manager** in the Node-RED editor.
2. On the **Install** tab, search for the **FlowFuse Edge Certified Nodes** collection.
3. Install `@flowfuse-certified-nodes/s7`.

The nodes appear under **S7 Suite** in the palette. S7-1200 and S7-1500 PLCs block external access by default, so you need to enable PUT/GET access and turn off optimized block access on each data block you want to read. The [S7 documentation](/node-red/flowfuse/edge/s7/) walks through both steps.

The S7 Certified Nodes are available to FlowFuse Edge customers on FlowFuse Cloud and Self Hosted, as version 1.0.0 of `@flowfuse-certified-nodes/s7`. [Contact us](/contact-us/) for access to the catalogue.
