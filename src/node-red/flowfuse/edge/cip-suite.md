---
eleventyNavigation:
  key: CIP Suite — EtherNet/IP Nodes
  parent: Edge
  order: 2
meta:
  title: CIP Suite — EtherNet/IP Nodes
  description: A suite of nodes for reading, writing, and monitoring data on Rockwell Automation and Allen-Bradley PLCs, and other CIP-capable devices, using the EtherNet/IP protocol.
---

# {{ meta.title }}

A suite of nodes for communicating with Rockwell Automation and Allen-Bradley PLCs, and other CIP-capable devices, using the EtherNet/IP (Ethernet Industrial Protocol) protocol.

## Overview

The CIP Suite connects FlowFuse flows to industrial control systems across the full spectrum of Rockwell Automation hardware, from modern ControlLogix and CompactLogix controllers to legacy SLC 500 and PLC-5 systems. It provides dedicated nodes for reading and writing tags, continuous tag monitoring, tag discovery, controller management, and advanced CIP objects covering motion, energy, time synchronization, security, and more.

This is a **FlowFuse Certified Node**. Unlike community nodes, which vary in quality and can go unmaintained without warning, FlowFuse vets Certified Nodes for quality, security, and support, and maintains them on an ongoing basis. [Read more about Certified Nodes](/blog/2025/07/certified-nodes-v2/). It is built on the [st-ethernet-ip](https://www.npmjs.com/package/st-ethernet-ip) protocol driver.

{% note %}
The CIP Suite is not available by default. It is part of the FlowFuse Edge Certified Nodes catalogue, which is part of the **FlowFuse Edge** offering. Please contact our sales team at [Contact us](/contact-us/) to learn more or to request access.
{% endnote %}

## What is EtherNet/IP?

EtherNet/IP (Ethernet Industrial Protocol) is an industrial network protocol that adapts the Common Industrial Protocol (CIP) to standard Ethernet. It's the primary communication protocol used by Rockwell Automation and Allen-Bradley industrial controllers and devices.

## Supported Hardware

| Platform | Protocol | Notes |
|----------|----------|-------|
| **ControlLogix** (L6x, L7x, L8x) | CIP Symbolic | Slot-based backplane routing |
| **CompactLogix** (L1x, L2x, L3x) | CIP Symbolic | Typically slot 0 |
| **Micro800** (Micro820/850/870) | CIP Symbolic | No backplane; enable Micro800 mode |
| **SLC 500** | PCCC over CIP | File-based addressing (N7:0, F8:0) |
| **MicroLogix** (1100/1400) | PCCC over CIP | File-based addressing |
| **PLC-5** | PCCC over CIP | File-based addressing |
| **Third-party CIP devices** | CIP Raw | Any EtherNet/IP device with CIP objects |

## Use case

Manufacturers running Allen-Bradley and Rockwell controllers typically have production data trapped on the plant floor. It's visible on an HMI, but invisible to anything above it. The CIP Suite closes that gap in both directions: it reads live tag data off the PLC into your flows, and lets flows write values and commands back when your use case requires it.

### Example: tracking line performance in real time

A CompactLogix controller on a packaging line exposes tags for `ProductionCount`, `ConveyorRunning`, and `RejectCount`. Without this suite, getting that data into a dashboard or historian usually means an OT engineer manually configuring a separate SCADA tag, or a nightly CSV export that's already stale by morning.

With the CIP Suite, the flow looks like this:

1. **Connect**: a `cip-endpoint` configuration node holds the shared connection to the PLC, with automatic reconnection.
2. **Subscribe**: a `cip-subscribe` node scans the tags cyclically and emits messages on change, with deadband filtering to suppress noise.
3. **Enrich**: a `function` node attaches a line ID, timestamp, or shift code, and converts raw units into something business-readable.
4. **Deliver**: the enriched payload is published to an MQTT broker or Unified Namespace, written to a historian, or dropped straight into [FlowFuse Tables](/node-red/flowfuse/flowfuse-tables/).

The result: production counts, machine states, and reject rates are available to dashboards, analytics, and other systems within moments of changing on the floor. No polling scripts, no OPC server to license and maintain, no manual tag mapping in a separate SCADA package.

### Where this shows up in practice

- **OEE and downtime tracking**: feed `ConveyorRunning` and cycle-time tags into a calculation flow to surface availability and performance losses as they happen, instead of reconstructing them from end-of-shift reports.
- **Live operations dashboards**: wire tag changes straight into [FlowFuse Dashboard](https://dashboard.flowfuse.com/) widgets so operators and supervisors see machine state and counts update in real time.
- **Recipe and setpoint downloads**: use `cip-write` to push new setpoints, batch parameters, or recipe values to the PLC from an MES, a dashboard form, or a database lookup.
- **Threshold alerting**: route a `Temperature` or `Pressure` tag through a `switch` node and fire a Slack, Teams, or email notification the moment a value crosses a quality limit.
- **Unified Namespace / MQTT bridging**: treat the PLC as a data source feeding a plant-wide UNS, so IT and OT systems consume the same live tag data instead of duplicating integrations per PLC.
- **Legacy modernization**: connect SLC 500, MicroLogix, and PLC-5 systems through the PCCC nodes and bring decades-old equipment into the same data pipeline as modern controllers, without touching the ladder logic.

### Why it scales beyond one PLC

Only the source and sink nodes are protocol-specific. The transform stages of a flow, such as renaming tags, adding context, and routing data, don't care what protocol the data came from. The same flow pattern you build for one Allen-Bradley line can be reused for a Siemens PLC over [OPC UA](/node-red/flowfuse/edge/opcua/) or a Modbus device just by swapping the protocol nodes, which matters a lot on a mixed-vendor plant floor.

## Requirements

- Node.js >= 16.0.0
- Node-RED >= 2.0.0
- Access to the FlowFuse Edge Certified Nodes catalogue (part of the **FlowFuse Edge** offering)

## Installation

Because this suite is part of the FlowFuse Edge Certified Nodes catalogue, which is part of the **FlowFuse Edge** offering, make sure your account has access before installing. Contact our [sales team](/contact-us/) if you don't.

{% note %}
Existing devices and hosted instances will not see newly added nodes until they are restarted. Restart any instance you plan to install nodes on so it picks up the updated catalogue.
{% endnote %}

### Install via the Palette Manager (recommended)

1. Open the **Palette Manager** from the top-right menu in the FlowFuse editor.
2. Switch to the **Install** tab.
3. Search for the **FlowFuse Edge Certified Nodes** collection.
4. Locate `@flowfuse-certified-nodes/cip-suite` and click **Install**.

After installation, all nodes appear under the **CIP Suite** category in the palette.

## Nodes in the Suite

### Core CIP Nodes (Logix controllers)

| Node | Type | Description |
|------|------|-------------|
| **cip-endpoint** | Config | Shared TCP session to a Logix PLC. Auto-reconnect, Micro800 support, multi-hop routing. |
| **cip-read** | In/Out | Read tag values. Supports bit access (`Tag.5`), array elements (`Tag[3]`), array ranges (`Tag[0..9]`), UDT/structures, batch reads, and polling. |
| **cip-write** | In/Out | Write tag values. Supports atomic bit-level writes, arrays, UDT partial merge, and batch writes. |
| **cip-browse** | In/Out | Discover tags on the PLC. Glob/regex filtering, UDT detection, program-scoped tags. |
| **cip-subscribe** | Out | Continuous cyclic multi-tag scanning. Deadband filtering, report-by-exception, runtime reconfiguration. |
| **cip-controller** | In/Out | Read controller identity, mode, fault status, keyswitch, and tag count. Runtime commands: run/program/test/reset. |
| **cip-raw** | In/Out | Send raw CIP service requests to any CIP object, with full response parsing and human-readable status codes. |
| **cip-discover** | In/Out | UDP broadcast device discovery on the local network. Standalone; no endpoint required. |

### Legacy PCCC Nodes (SLC 500 / MicroLogix / PLC-5)

| Node | Type | Description |
|------|------|-------------|
| **cip-pccc-endpoint** | Config | Session to legacy controllers using EtherNet/IP with PCCC encapsulation. |
| **cip-pccc-read** | In/Out | Read data-file addresses: `N7:0`, `F8:0`, `B3:0/5`, `T4:0.ACC`, `S:1/5`. Multi-element reads and polling. |
| **cip-pccc-write** | In/Out | Write data-file addresses, including safe bit-level writes. |

### Advanced CIP Object Nodes

| Node | Description |
|------|-------------|
| **cip-io-scanner** | Implicit I/O with cyclic data exchange for remote I/O, drives, and servos. |
| **cip-security** | Read TLS/DTLS status and security profiles from the CIP Security Object. |
| **cip-sync** | IEEE 1588 PTP time synchronization: grandmaster discovery, offset monitoring, enable/disable. |
| **cip-motion** | Motion Axis Object: jog, absolute/relative moves, home, stop, enable/disable, axis status polling. |
| **cip-energy** | Energy monitoring: power, energy, and electrical measurements (V/A/Hz/PF/THD). |
| **cip-file** | File Object: firmware upload/download, file directory listing, metadata access. |
| **cip-param** | Parameter Object: device parameterization with discovery scan and scaled read/write. |

## Tag Addressing

### CIP Symbolic (Logix)

| Format | Example | Description |
|--------|---------|-------------|
| Simple | `MyTag` | Read/write a tag |
| Bit access | `MyDint.5` | Read/write bit 5 of a DINT |
| Array element | `MyArray[3]` | Single array element |
| Array range | `MyArray[0..9]` | Read elements 0 to 9 |
| Program-scoped | `Program:MainProgram.MyTag` | Tag inside a program |
| Batch | `msg.tags = ["Tag1","Tag2"]` | Multi-tag read in one request |

### PCCC (SLC 500 / MicroLogix / PLC-5)

| Format | Example | Description |
|--------|---------|-------------|
| Integer | `N7:0` | Integer file 7, element 0 |
| Float | `F8:5` | Float file 8, element 5 |
| Bit | `B3:0/5` | Bit file 3, element 0, bit 5 |
| Timer | `T4:0` | Full timer (CTL/PRE/ACC) |
| Timer sub-element | `T4:0.ACC` | Timer accumulator only |
| Counter | `C5:0.ACC` | Counter accumulator |
| Output/Input | `O:0/3`, `I:1/0` | I/O with bit access |
| Status | `S:1/5` | Status file with bit |
| String | `ST9:0` | String file |
| Long | `L10:0` | Long integer file |

## Configuration

### cip-endpoint

| Setting | Default | Description |
|---------|---------|-------------|
| IP Address | (required) | PLC IP address |
| Port | 44818 | EtherNet/IP port |
| Slot | 0 | Backplane slot (ControlLogix) |
| Timeout (ms) | 5000 | Connection timeout |
| Retry (ms) | 5000 | Reconnection interval |
| Micro800 | off | Enable for Micro800 controllers |
| Routing Path | (optional) | Multi-hop routing, e.g. `1/0/2/192.168.1.1` |

### cip-pccc-endpoint

| Setting | Default | Description |
|---------|---------|-------------|
| IP Address | (required) | PLC IP address |
| Port | 44818 | EtherNet/IP port |
| Timeout (ms) | 5000 | Connection/request timeout |
| Retry (ms) | 5000 | Reconnection interval |

## Usage

### Reading tags

Send a message to a `cip-read` node with the tag name configured on the node or in `msg.tagName`. The output:

```json
{
  "payload": 1250,
  "tagName": "ProductionCount",
  "dataType": "DINT",
  "timestamp": 1710000000000
}
```

### Writing tags

Send a message to a `cip-write` node with the value in `msg.payload`:

```json
{
  "payload": 42,
  "tagName": "TargetSpeed"
}
```

Bit-level writes use the atomic CIP Read-Modify-Write service where the controller supports it, so individual bits change without race conditions.

### Subscribing to tag changes

The `cip-subscribe` node scans a group of tags cyclically and emits when values change. Multi-tag output:

```json
{
  "payload": { "Tag1": 42, "Tag2": 3.14 },
  "tags": [
    { "name": "Tag1", "value": 42, "type": "DINT", "changed": true },
    { "name": "Tag2", "value": 3.14, "type": "REAL", "changed": false }
  ],
  "scanRate": 1000,
  "timestamp": 1710000000000
}
```

Deadband filtering suppresses small fluctuations on analog values so only meaningful changes flow downstream.

### Reading legacy controllers

The `cip-pccc-read` node returns data-file values from SLC 500, MicroLogix, and PLC-5 controllers:

```json
{
  "payload": 1234,
  "address": "N7:0",
  "fileType": "Integer",
  "timestamp": 1710000000000
}
```

## Node Status Indicators

| Color | Shape | Meaning |
|-------|-------|---------|
| Green | dot | Connected / OK |
| Yellow | ring | Connecting / warning |
| Red | ring | Error / disconnected |
| Blue | dot | Operation in progress |

## Best Practices

### Connection Management
- Share a single `cip-endpoint` configuration node across all read, write, browse, and subscribe nodes talking to the same PLC.
- The endpoint reconnects automatically at the configured retry interval; use a **status node** if you need to react to connection changes in your flow.
- All nodes skip new requests while a previous one is in flight, which protects the PLC from overload.

### Network Configuration
- Ensure your FlowFuse instance can reach the PLC IP address.
- Configure firewall rules to allow TCP port 44818 (EtherNet/IP).
- Use static IP addresses for PLCs in production environments.
- Use the routing path setting to reach PLCs behind ControlLogix backplanes or across multiple hops.

### Tag Selection and Scan Rates
- Only subscribe to tags you need to minimize network traffic.
- Use appropriate scan rates based on how quickly data changes; faster scan rates increase CPU and network load.
- Use deadband filtering on analog tags to avoid flooding downstream systems with insignificant changes.

### Writing Safely
- Validate values in a `function` node before they reach a `cip-write` node, especially when values originate from dashboards or external systems.
- Prefer bit-level writes for command bits so unrelated bits in the same word are never disturbed.
- Keep safety functions and interlocks in the PLC program. Never rely on a flow to enforce a safety condition.

### Error Handling
- Connect a **catch node** to handle errors gracefully.
- Use the admin metrics endpoint (`GET /cip-endpoint/:id/metrics`) to monitor response times, error counts, and uptime.

## Troubleshooting

### Cannot Connect to PLC
- Verify IP address and network connectivity (ping test).
- Check the slot number matches your controller configuration.
- For Micro800 controllers, enable Micro800 mode on the endpoint.
- Verify firewall settings allow TCP 44818.

### Tags Not Updating
- Confirm tag names match exactly (case-sensitive).
- For program-scoped tags, use the full `Program:ProgramName.TagName` format.
- For legacy controllers, verify the data-file address format (e.g. `N7:0`, not a tag name).
- Check the scan rate isn't too slow for your application.

### Connection Drops Frequently
- Reduce scan rates to decrease network load.
- Check network stability and switch configuration.
- Verify the PLC isn't overloaded with connections from other clients.