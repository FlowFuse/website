---
eleventyNavigation:
  key: Modbus
  parent: Edge
  order: 3
meta:
  title: Modbus
  description: A FlowFuse-certified package for reading and writing coils and registers over Modbus TCP, Modbus UDP (where supported), and Serial (RTU/ASCII), and for simulating a Modbus server, all from within your flows.
---

# {{ meta.title }}

Connect a FlowFuse instance to Modbus TCP and Serial devices — PLCs, sensors, meters, drives, and gateways. Poll or read coils and registers, write setpoints and commands, and simulate a Modbus server for testing, all from within your flows.

This is a **FlowFuse Certified Node**. Unlike community nodes, which vary in quality and can go unmaintained without warning, FlowFuse vets Certified Nodes for quality, security, and support, and maintains them on an ongoing basis. [Read more about Certified Nodes](/blog/2025/07/certified-nodes-v2/).

## Get the Certified Node in FlowFuse

{% note %}
The Modbus package is not available by default. It is part of the FlowFuse Edge Certified Nodes catalogue, which is part of the **FlowFuse Edge** offering. Please contact our sales team at [Contact us](/contact-us/) to learn more or to request access.
{% endnote %}

### Installation steps

1. Open your instance in the FlowFuse editor.
2. Click the menu icon (☰) in the top-right corner.
3. Select **Manage palette**.
4. Go to the **Install** tab.
5. Switch to the **FlowFuse Edge Certified Nodes** category.
6. Search for `@flowfuse-certified-nodes/modbus`.
7. Click **Install**.

The Modbus nodes then appear in your palette, ready to drag onto the canvas.

{% note %}
If your device or hosted instance was already running before Modbus was enabled for your team, it won't show the package in the Install tab search. Restart the instance or device first, then repeat the steps above.
{% endnote %}

## What is Modbus?

Modbus is one of the oldest and most widely supported industrial communication protocols, implemented by an enormous range of PLCs, sensors, power meters, VFDs, and gateways. It comes in several transports, all supported side by side:

- **Modbus TCP** — Modbus messages over a standard Ethernet/IP network, typically on port 502. The framing can be the default MBAP header or RTU-buffered.
- **Modbus UDP** — the same message format over UDP instead of TCP, for the devices and gateways that expect it. Support varies by device.
- **Modbus Serial** — Modbus RTU (binary) or ASCII framing over RS-232/RS-485.

Modbus-Client also offers TELNET and C701 modes for TCP-to-serial gateways.

{% note %}
Modbus now uses **client** for the device making requests and **server** for the device answering them. Older device manuals and tools use **master** and **slave** for the same two roles — a Modbus master is a client, a Modbus slave is a server. This package follows the newer terminology, so the FlowFuse instance is the client and the PLC, meter, or drive it polls is the server.
{% endnote %}

Every Modbus device exposes its data as one of four addressable table types, and every read or write targets one of them:

| Table | FC (read) | FC (write) | Access | Manual-style reference | Typical use |
|---|---|---|---|---|---|
| Coils | 1 | 5, 15 | Read/write, 1 bit | `0xxxx` / `00001+` | Digital outputs — relays, enable flags |
| Discrete Inputs | 2 | — | Read-only, 1 bit | `1xxxx` / `10001+` | Digital inputs — switches, limit sensors |
| Holding Registers | 3 | 6, 16 | Read/write, 16-bit | `4xxxx` / `40001+` | Setpoints, configuration, read/write process values |
| Input Registers | 4 | — | Read-only, 16-bit | `3xxxx` / `30001+` | Read-only measurements — sensor readings |

{% note %}
**Addresses in this package are raw, zero-based protocol addresses.** Device manuals often number the same register differently. A manual that lists a holding register as `40001` (or `4x0001`, or `400001` on devices with more than 9,999 registers) is describing the register at address `0`. Other manuals number within the table starting at `1`, so their "register 1" is also address `0`. Check which convention your device's register map uses before entering an address — an off-by-one here is the most common cause of reading the wrong value, and an address one past the end of the table returns Illegal Data Address.
{% endnote %}

A device is also identified by a **Unit ID** (also called station address, or slave ID in older documentation), which matters when several logical devices share one connection — for example several RTU devices on the same RS-485 bus, or several logical devices behind one TCP gateway.

On a serial bus, valid device addresses are **1–247**. Address **0 is the broadcast address** — a write sent to unit 0 goes to every device on the bus and none of them reply, so a read addressed to unit 0 will always time out. Addresses 248–255 are reserved. Native Modbus TCP devices often ignore the unit ID altogether (`0`, `1`, and `255` are all common), but it matters as soon as a gateway sits in front of serial devices.

{% note %}
Modbus itself moves only raw bits and 16-bit words — the protocol carries no data-type information. A read returns an **array** of booleans (coils/discrete inputs) or **raw 16-bit register values, each `0`–`65535`,** (input/holding registers). Anything larger or more structured — 32-bit integers, floating-point values, scaled measurements — spans multiple registers: the device packs it across them, and you reconstruct it in your flow. See [Decoding register values](#decoding-register-values) for how to do this.
{% endnote %}

## Use case

Most Modbus devices already hold the data a plant needs — tank levels, motor status, energy readings, setpoints — but that data is normally only visible to a single SCADA package or the device's own local panel. This certified node package turns a FlowFuse instance into a Modbus client (and, where useful, a Modbus server), so that data becomes ordinary flow data you can route, transform, and act on alongside everything else in Node-RED.

### Example: bringing a legacy PLC's data onto MQTT

An older PLC exposes tank level, pump status, and a fault word through its holding registers, with no other way off the machine except a proprietary HMI cable. A single **Modbus-Client** connection points at the PLC over TCP. A **Modbus-Read** node polls the holding registers on a fixed interval, emitting the raw register values as an array. Because those registers represent more than plain 16-bit integers (tank level as a float spanning two registers, a fault word to be split bit by bit), a downstream **function node** — or a dedicated buffer-parser node — decodes the raw buffer into named, typed values. Those values are published to the plant's MQTT broker, so dashboards and historians see live data from a PLC that was never designed to leave the panel. A **Modbus-Flex-Write** node, gated behind an operator confirmation on a dashboard, lets the same flow push a new setpoint back down to the PLC.

### Where this shows up in practice

- **Polling process data**: use [Modbus-Read](#modbus-read) to cyclically poll coils and registers at a fixed rate and feed the results straight into a Unified Namespace, historian, or dashboard.
- **On-demand reads**: use [Modbus-Getter](#modbus-getter-and-modbus-flex-getter) to read a value only when triggered by an incoming message, instead of continuously polling.
- **Dynamic, message-driven addressing**: use [Modbus-Flex-Getter](#modbus-getter-and-modbus-flex-getter) when the table, address, quantity, or unit ID needs to change per message, for example a generic "read any register on any configured device" flow.
- **Ordered multi-range reads**: use [Modbus-Flex-Sequencer](#modbus-flex-sequencer) to read several different ranges in a defined order through one node, instead of wiring up many separate reads.
- **Writing setpoints and commands**: use [Modbus-Write and Modbus-Flex-Write](#modbus-write-and-modbus-flex-write) to set coils or holding registers from a dashboard form, an MES, or a calculated value elsewhere in the flow.
- **Decoding raw registers**: turn raw 16-bit register arrays into signed/unsigned integers, 32-bit values, or floating-point numbers — see [Decoding register values](#decoding-register-values).
- **Testing and simulation**: use [Modbus-Server](#modbus-server) to run a buffer-backed Modbus server, so you can build and test a flow against a virtual device before any real hardware is available.

## The Node Set

Each node performs one Modbus operation and reuses the shared connection you configure once on **Modbus-Client**.

| Node | Purpose |
|---|---|
| Modbus-Client (config) | Defines the connection — TCP host/port (with default/RTU-buffered/UDP/TELNET/C701 framing) or serial port/baud rate, timeout, and reconnect behaviour. Every other node references it. |
| Modbus-Read | Polls a fixed table/address/quantity on a repeating interval and emits the raw result on every poll. |
| Modbus-Getter | Reads a fixed table/address/quantity, but only when triggered by an incoming message rather than on a timer. |
| Modbus-Flex-Getter | Like Modbus-Getter, but the table, address, quantity, and unit ID are taken from the incoming message, so one node can serve many different reads. |
| Modbus-Flex-Sequencer | Reads several configured ranges in a defined order through a single node. |
| Modbus-Write | Writes a single coil or holding register, or a block of them, using addressing fixed on the node. |
| Modbus-Flex-Write | Like Modbus-Write, but the target table, address, and value(s) are taken from the incoming message. |
| Modbus-Flex-Fc | Sends custom or less-common function codes using configurable argument maps, for devices that need function codes beyond the standard read/write set. |
| Modbus-Flex-Connector | Changes the connection endpoint (host/port or serial settings) at runtime from an incoming message, to reconnect or switch devices without redeploying. |
| Modbus-Response | Displays the status and content of a Modbus response in the editor, as a diagnostic/inspection aid downstream of a read. |
| Modbus-IO-Config (config) | Holds a JSON IO file mapping IEC-style addresses (`%QW0`, `%IX8.0`, …) to typed names, where a name's first letter sets its data type. Read nodes can attach it to their output. |
| Modbus-Response-Filter | Filters an IO-mapped payload down to named values, so downstream nodes receive only the fields they need. |
| Modbus-Server | Runs a buffer-backed Modbus TCP server inside Node-RED, so it responds to reads and writes from an external Modbus client — useful for testing and simulation. |
| Modbus-Queue-Info | Reports (and can reset) the internal request queue depth for a connection, useful for spotting a device that can't keep up with the configured poll rate. |

{% note %}
All nodes that share the same Modbus-Client connection share one underlying socket/serial port and are queued through it in order, so a device is never sent two requests at once. A busy queue (see Modbus-Queue-Info) usually means the poll rate is faster than the device can respond to.
{% endnote %}

## Configure a Modbus Client Connection

Every node in this package uses a **Modbus-Client** configuration node to communicate with a Modbus device. Create the connection once, then reuse it across every Read, Getter, Write, and Server node that connects to the same device or bus.

1. Drag any Modbus node (for example, **Modbus-Read**) onto the canvas and double-click it.
2. Next to the **Server** field, click the **+** icon to create a new **Modbus-Client** configuration.
3. Select the connection **Type**:
   - **TCP** — Enter the device's IP address and port (default: `502`). Then choose the **TCP Type**: **Default**, **RTU Buffered**, **UDP**, **TELNET**, or **C701** (for TCP-to-serial gateways).
   - **Serial** / **Serial Expert** — Select the serial port, baud rate, parity, data bits, stop bits, and the Modbus framing (**RTU** or **ASCII**).
4. Configure the remaining connection settings:
   - **Unit ID** — Default: `1`. Serial devices use `1`–`247` (`0` is broadcast); TCP accepts `0`–`255`.
   - **Timeout** — Default: `1000` ms
   - **Reconnect Timeout** — Default: `2000` ms
5. Click **Done**, then **Deploy** the flow.

{% note %}
The connection is shared. Changing its parameters affects every node that uses it, and you must redeploy the flow for connection changes to take effect. To change the endpoint at runtime without redeploying, see [Modbus-Flex-Connector](#modbus-flex-connector).
{% endnote %}

{% note %}
Keep host/IP addresses and serial port paths in FlowFuse Environment Variables (your instance's **Settings → Environment**) rather than hard-coding them in the connection, so the same flow can be promoted across instances that reach the device differently.
{% endnote %}

## Modbus-Read

The Modbus-Read node polls a fixed location on a repeating interval — the node acts continuously once deployed, with no input needed.

### Configuration

- **FC (Function Code)** — which table to read: Coils, Discrete Inputs, Holding Registers, or Input Registers (FC 1–4).
- **Address** — the starting zero-based address in that table — see [Register addressing](#what-is-modbus) if your device manual uses 4xxxx-style numbering.
- **Quantity** — how many consecutive coils/registers to read in one request.
- **Poll rate** — how often to repeat the read (milliseconds).
- **Unit ID** — overrides the connection's default unit ID for this node, when needed.

Each poll emits a message carrying the raw values on `msg.payload` (an array of booleans for coils/discrete inputs, or an array of raw 16-bit register values, each `0`–`65535`, for registers) and the raw response buffer. If the register values represent something other than plain 16-bit integers, decode the buffer downstream — see [Decoding register values](#decoding-register-values).

```
[Modbus-Read] (polls every 1000ms)  →  [function / buffer-parser]  →  [Debug]
```

{% note %}
Set the poll rate no faster than the device can reliably answer. A rate that outpaces the device causes requests to back up in the queue, check [Modbus-Queue-Info](#modbus-queue-info) if reads start arriving late or with gaps.
{% endnote %}

## Modbus-Getter and Modbus-Flex-Getter

Use these nodes instead of Modbus-Read when a read should happen on demand rather than on a timer.

- **Modbus-Getter** — configuration (FC, address, quantity, unit ID) is fixed on the node, exactly like Modbus-Read, but the node only reads when it receives an input message. Useful for occasional, event-driven reads, for example reading a value only when a dashboard page opens.
- **Modbus-Flex-Getter** — the same operation, but every parameter is taken from the incoming message (`msg.payload` carries `fc`, `address`, `quantity`, and `unitid`) instead of the node's own configuration, so one node can serve reads against many different addresses, tables, or devices. The result comes back on `msg.payload` (an array of values) with the request parameters echoed alongside it, so a Flex-Getter response can be routed and identified even when many different reads share the same node.

Both getter nodes support read function codes 1, 2, 3, and 4.

## Modbus-Flex-Sequencer

Modbus-Flex-Sequencer reads several configured ranges in order through a single node, triggered by any incoming message. Each range in the sequence is defined by `unitid`, `fc` (function code, given as `FC1`–`FC4` or `1`–`4`), `address`, and `quantity`, and supports read function codes 1–4 only. The sequence is configured as a list on the node, but can be overridden per-message by supplying `msg.sequences`. It is useful when a device's data of interest is spread across several non-contiguous ranges (or tables) that you would otherwise have to read with several separate nodes and then recombine. Each range is read in turn over the shared connection, respecting the same queue as every other node on that connection.

## Modbus-Write and Modbus-Flex-Write

- **Modbus-Write** — the target table (Coils or Holding Registers), address, and quantity are fixed on the node; the value(s) to write come from the incoming message. Uses write function codes FC 5/6 (single coil/register) and FC 15/16 (multiple).
- **Modbus-Flex-Write** — the table, address, and value(s) are all taken from the incoming message, so a single node can write to different coils/registers depending on what triggers it.

{% warning %}
Writes to production equipment change real-world state. Gate write nodes behind validation or an operator confirmation step before deploying to a live instance.
{% endwarning %}

## Modbus-Flex-Fc

Some devices expose data through function codes outside the standard read/write set. Modbus-Flex-Fc lets you send those custom or less-common function codes using configurable argument maps, so you can talk to a device whose behaviour isn't covered by the ordinary Read/Write/Getter nodes. This is an advanced node — you'll need the exact request format from the device's Modbus documentation.

## Modbus-Flex-Connector

Modbus-Flex-Connector changes the active connection's endpoint at runtime from an incoming message — for example switching the target host/port or serial settings, or forcing a reconnect — without editing the Modbus-Client config and redeploying. This is useful for flows that must talk to one of several devices in turn over a single set of nodes, or that need to recover a connection programmatically.

## Decoding register values

Modbus registers are just 16-bit words — the protocol itself carries no data-type information, so a temperature reading, a setpoint, and a status word are all indistinguishable raw integers until you interpret them. A read node therefore hands your flow an **array of raw 16-bit register values** (or booleans for coils and discrete inputs). Turning those into meaningful values — signed integers, 32-bit integers or floats spanning two registers, scaled measurements, or a status word split into individual bits — is done **downstream in your flow**, not by the Modbus read node itself.

There are a few common approaches:

- **A function node** — reconstruct the value in JavaScript. `msg.payload` is an array of numbers, not a Buffer, so `Buffer` methods aren't available on it directly. Either read the raw bytes from the response buffer the node attaches to the message, or build a Buffer from the values first, writing each register big-endian to match the wire order:

  ```js
  const input = msg.payload  // array of 16-bit register values
  const buf = Buffer.alloc(input.length * 2)
  input.forEach((reg, i) => buf.writeUInt16BE(reg, i * 2))

  msg.payload = {}  // decode into a new object
  msg.payload.temperature = buf.readFloatBE(0)   // registers 0–1 as a 32-bit float
  msg.payload.counter = buf.readUInt32BE(4)      // registers 2–3 as a 32-bit unsigned int
  msg.payload.setpoint = buf.readInt16BE(8)      // register 4 as a signed 16-bit int
  return msg
  ```

  Avoid `Buffer.from(new Uint16Array(msg.payload).buffer)` — that uses the host's byte order, which may be little-endian depending on where Node-RED runs, and silently gives you byte-swapped values.
- **A buffer-parser node** — a dedicated parsing node (such as `node-red-contrib-buffer-parser`) accepts the values array directly, so you don't have to deal with the Buffer question at all. It lets you declare each field's type and endianness in configuration rather than in code, which is convenient when a single response contains many differently-typed fields.
- **The package's built-in IO mapping** — a **Modbus-IO-Config** node holds a JSON file that maps IEC-style addresses (`%QW0`, `%IX8.0`, and so on) to names, where the first character of each name selects the data type (`i` integer, `w` word, `u` unsigned, `b` boolean, `f`/`r` float, and so on). A read node can attach that mapping to its output, and **Modbus-Response-Filter** narrows the result down to the named fields a downstream node needs. This is convenient when your address list originates from a PLC export.

{% note %}
Choose the data type and word order that matches how the device packs its data, which is usually documented in the device's Modbus register map. If a decoded value looks wildly wrong (for example a temperature reading in the millions), the most common cause is a word-order mismatch on a multi-register value. Try the other byte/word order before assuming the device or wiring is at fault.
{% endnote %}

## Modbus-Response

The Modbus-Response node displays the status and content of a Modbus response in the editor. Placed downstream of a read node, it is an inspection/diagnostic aid that shows what came back, which is helpful while building and debugging a flow.

{% note %}
Modbus-Response is for **display and inspection** — it does not convert raw registers into typed values. To turn raw registers into integers, floats, or scaled measurements, decode them in your flow as described in [Decoding register values](#decoding-register-values).
{% endnote %}

## Modbus-Server

The Modbus-Server node runs a buffer-backed Modbus TCP server inside your FlowFuse instance, responding to reads and writes initiated by an external Modbus client (a PLC, SCADA system, or test tool). Fixed-size in-memory buffers back the holding registers, coils, input registers, and discrete inputs, which suits development and testing rather than full device emulation.

This is primarily useful for:

- **Testing flows without hardware** — stand up a server so a Modbus-Read/Write flow can be built and verified before real hardware is available.
- **Local integration testing** — exercise read and write paths end to end against a server running in the same instance.

{% note %}
The in-package Modbus-Server is a **buffer-backed server for demos and tests**. It is not intended to replicate a specific device's complete register-map behaviour. For more elaborate simulation needs, a dedicated Modbus simulation tool is a better fit.
{% endnote %}

## Modbus-Queue-Info

Each Modbus-Client connection processes its requests through a single ordered queue. Modbus-Queue-Info reports the current depth of that queue (and can reset it), which is the quickest way to spot a connection whose poll rate is faster than the device — or shared bus — can service. A queue that grows over time means requests are arriving faster than replies, and the poll rate should be lowered.

## Network Requirements

When the certified node runs inside a corporate or industrial network, allow the following outbound connections through your firewall or URL-filtering proxy. Share this section with your IT or OT/security team.

| Hostname / Target | Port | Protocol | Purpose | Required? |
|---|---|---|---|---|
| Your Modbus TCP/UDP device(s) | typically 502 | TCP / UDP | Modbus TCP/UDP data plane | Yes, for TCP/UDP connections |
| Local serial port | — | RS-232 / RS-485 | Modbus RTU/ASCII data plane | Yes, for Serial connections |
| `registry.npmjs.org` | 443 | HTTPS | Package installation (one-time, via the palette) | Standard Node-RED requirement |

The Modbus TCP/UDP port (default 502) is configurable per device; update the firewall rule if your device uses a non-default port. The certified node does not make any external licence-check or activation calls — licensing is managed through FlowFuse.

## Troubleshooting

| Symptom | What to check |
|---|---|
| Connection never establishes | Verify the IP/port (TCP/UDP) or serial port/baud rate/parity (Serial) match the device, and that the device is reachable on the network or physically wired. |
| Illegal Function (exception code 1) | The device does not support the function code you're using — check its register map for which FCs it implements. |
| Illegal Data Address (exception code 2) | The address (or address + quantity) falls outside the device's supported range for that table. |
| Illegal Data Value (exception code 3) | The value being written is out of range for the target register/coil. |
| Slave Device Failure (exception code 4) | The protocol's name for a server-side fault — an internal fault on the device itself. Check the device's own diagnostics. |
| Requests time out intermittently | Lower the poll rate, check for other clients competing for the same device, and confirm the timeout setting is generous enough for the device's actual response time. |
| Decoded values look wrong (huge, negative, or garbled) | Check the data type and byte/word order used in your decoding step against the device's documented register format — see [Decoding register values](#decoding-register-values). |
| Requests appear delayed or bunched up | Check [Modbus-Queue-Info](#modbus-queue-info) — the poll rate is likely faster than the device (or shared bus) can keep up with. |
| Serial connection works from a test tool but not from FlowFuse | Confirm no other process holds the serial port open, and that the FlowFuse instance's OS user has permission to access it. |
| Multiple devices on one connection interfere with each other | Confirm each node/device uses the correct **Unit ID** — a wrong unit ID silently talks to the wrong logical device on a shared bus or gateway. |

For help enabling the Modbus Certified Node, licensing, or anything else, [contact FlowFuse](/contact-us/).
