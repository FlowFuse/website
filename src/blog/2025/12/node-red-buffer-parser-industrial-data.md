---
title: "Parsing Industrial Device Data with Node-RED Buffer Parser Node"
subtitle: ""
description: ""
date: 2025-12-05
keywords: 
authors: ["sumit-shinde"]
image: 
tags:
  - flowfuse
---

Industrial devices often communicate using raw binary data in the form of buffers. Whether you're working with Modbus sensors, PLCs, or custom hardware, parsing this binary data correctly is essential for extracting meaningful values like temperature readings or equipment status.

Node-RED's Buffer Parser node simplifies this challenge. Instead of writing complex JavaScript to decode buffers manually, it provides an intuitive, visual way to define data structures and extract values. With support for various data types—integers, floats, strings, and bit fields—it transforms raw binary payloads into usable JSON objects.

In this article, we'll explore how to use the Buffer Parser node for real-world industrial data parsing scenarios.

## What Are Buffers and Why Do Industrial Devices Use Them?

A buffer is just a chunk of raw bytes sitting in memory. When your PLC or Modbus sensor sends data, it comes through as one of these byte sequences. 

Here's what you'll see in Node-RED:

```
<Buffer 01 03 04 00 c8 13 88 b5 c1>
```

Each pair of characters is one byte in hexadecimal. So `01` is one byte, `03` is another, and so on. This particular buffer has 9 bytes total. The tricky part? Those bytes mean nothing by themselves. Byte 0 might be a device address. Bytes 3 and 4 together might encode a temperature reading. But you won't know unless you understand the device's protocol.

Take `00 c8` for example—that's 200 in decimal. If the device uses a scale factor of 10, it's actually telling you the temperature is 20.0°C. But the buffer doesn't explain this. You have to parse it correctly, or you'll misread your sensor data completely.

So why do industrial devices even use this cryptic format? Why not just send readable JSON like `{"temp":25.5}`? The answer is efficiency and decades of legacy equipment. That simple JSON temperature reading takes 13 bytes to transmit. The same data in binary? Two bytes. When you're on a slow serial line running at 9600 baud, that difference compounds across thousands of messages per day.

Then there's the hardware reality. Modbus was created in 1979. Millions of devices in factories worldwide still speak these binary protocols, and they're not going anywhere. Old PLCs don't have the memory or processing power for JSON parsing anyway—they read bytes directly from registers and that's it. You work with what's actually deployed on the factory floor, not what would be convenient.

The Buffer Parser node provides a visual approach to handling this binary data without writing complex JavaScript for every parsing operation. Let's look at how to use it.


> Before you start, Make sure you have a FlowFuse instance running on your edge device that should be collect data. If you don't have an account yet, create one with our [free trial](https://app.flowfuse.com/account/create/). FlowFuse simplifies connecting devices and systems—transform, validate, contextualize, and visualize data while building industrial applications, all in a low-code environment. It includes enterprise features that accelerate management, development, deployment, and scaling with built-in security.

## Installing the Buffer Parser Node

The Buffer Parser node isn't included in Node-RED by default, so you'll need to install it first.

1. Open your Node-RED editor
2. Click the hamburger menu (☰) in the top right corner
3. Select "Manage palette"
4. Go to the "Install" tab
5. Search for `node-red-contrib-buffer-parser`
6. Click the install button next to the package

Once installed, you will see two nodes: Buffer Parser and Buffer Maker in your palette under the parser category. The Buffer Parser extracts data from buffers, while Buffer Maker does the opposite—it creates buffers from JSON objects, useful when you need to send commands back to devices. In this article, we will be showing how to use the Buffer Parser node.

## Understanding the Configuration

![Buffer Parser Configuration](./images/buffer-parser.png){data-zoomable}

When you first open the Buffer Parser configuration, it's easy to feel overwhelmed by all the options. But most of these settings you'll configure once and rarely touch again. Let's break down what actually matters for parsing real industrial data.

### Where Your Data Lives

The **Property** field points to where your buffer sits in the message. In nearly every case, this is `msg.payload`. Your PLC sends data, it lands in the payload, and that's what you're working with.

Keep **Specification Type** set to "UI" unless you have a specific reason not to. This lets you configure everything visually right here in the node. The JSON option exists for edge cases where your parsing rules need to change dynamically based on incoming data, but that's rarely necessary.

**Byte Swap** is one you ignore until suddenly your numbers are completely wrong. If you're expecting 100 but getting 25600, you've hit an endianness issue. Different manufacturers handle byte order differently. Try swap16 for 16-bit values or swap32 for 32-bit values, and watch your numbers snap into place.

**Output Property** is useful when you want to preserve the original buffer while storing the parsed results elsewhere. Handy for debugging or passing raw data downstream.

### Shaping Your Results

The output format determines how your parsed data looks when it comes out the other side.

**Key/value** is your bread and butter. It gives you a clean JSON object with named properties. This is what you'll use most of the time. Need nested structure? Use the arrow syntax in the name field: `motor1=>temperature` creates `msg.payload.motor1.temperature`.

**Multiple Results** sends each parsed value as a separate message flowing out of the node. Instead of one message with all your data, you get sequential messages—one for temperature, one for pressure, one for status. Useful when different values need to go to completely different parts of your flow.

**Fan Out** takes this further by creating multiple output pins on the node—one for each value you're extracting. Route temperature to one dashboard, pressure to another, all without a switch node. It gives you physical separation of your data streams right at the parsing stage.

**Array** and **value** formats work well when you're feeding data into charts or databases that expect arrays. **Buffer** mode is niche—it applies byte swapping without actually parsing anything, useful only in specific data transformation pipelines.

### Extracting Your Values

This is where the actual parsing happens. Each row you configure pulls one piece of information from your buffer.

**Name** is what you'll see in your output object. Make it meaningful. `temperature` tells you something; `val1` tells you nothing. Your future self debugging a flow at 2 AM will appreciate descriptive names.

**Type** is critical because those raw bytes mean nothing until you tell the parser how to interpret them. Is `0x64` the number 100, or is it the ASCII character 'd'? The type decides. Most industrial sensors use uint16 for positive integers up to 65,535, int16 when values can go negative, and float for measurements with decimal precision. Your device documentation should specify this. The bool type is special—it extracts a single bit from a byte, perfect for status flags packed into register values.

**Offset** tells the parser which byte to start reading from. Byte 0 is first, byte 1 is second, and so on. If your sensor puts temperature data starting at byte 3, that's your offset. Get this wrong by even one byte and you're reading garbage.

**Length** is usually 1 for single values. If you're reading an array of sensor readings, increase it. Set it to -1 when you want everything from the offset to the end—useful when buffer sizes vary.

**Offset Bit** only matters when you're using the bool type to extract individual bits. It specifies which bit within the byte to read (0-7, where 0 is the least significant bit). If you're extracting a status flag from bit 3 of byte 5, you'd set Offset to 5 and Offset Bit to 3. For all other data types, ignore this field.

**Mask** becomes important when multiple values are packed into a single byte. Industrial protocols love this trick—why waste a whole byte on a simple on/off flag when you can pack eight of them in there? Say bits 0-3 hold one sensor reading and bits 4-7 hold another. Use masks like `0x0F` and `0xF0` to isolate each value. The mask tells the parser which bits matter and which to ignore. It's bitwise AND under the hood, but you don't need to think about it that way—just remember that `0x0F` grabs the lower four bits and `0xF0` grabs the upper four.

**Scale** is incredibly practical. Industrial sensors rarely send values in the format you want. A temperature sensor might send 235 when the actual reading is 23.5°C. Set the scale to `10` and the node divides the raw value for you. You can also use division notation like `/10` if that's clearer. Either way, you get properly scaled values without needing a function node downstream.

## Parsing a Modbus Pressure Sensor

Let's parse data from a pressure sensor to see how these configuration options work in practice. The sensor connects via Modbus and returns this buffer when queried:

```
<Buffer 01 03 06 e8 03 00 12 d2 00 a4 f1>
```

According to the device manual, here's what these bytes mean:

- Byte 0: Device address (0x01)
- Byte 1: Function code (0x03)  
- Byte 2: Data byte count (0x06)
- Bytes 3-4: Pressure reading (int16, little-endian, divide by 100)
- Bytes 5-6: Status flags (uint16, big-endian)
- Bytes 7-8: Temperature (int16, little-endian, divide by 10)
- Bytes 9-10: CRC checksum

We only care about bytes 3-8. The rest is Modbus protocol overhead.

### Configuring the Parser

Drop a Buffer Parser node on your canvas and open it up.

Set **Property** to `msg.payload` (where your Modbus read node puts the buffer), keep **Specification Type** on "UI", and leave **Byte Swap** at "No swap". Our pressure and temperature values are little-endian while status is big-endian, so we'll handle that with type-specific settings rather than swapping the entire buffer. Set **Result Type** to "Key/value object" for clean JSON output.

Now let's add the items to parse. Click the "add" button in the Items section to create a new parsing rule for each value we want to extract.

### Parsing the Values

**Pressure:**

- **Name:** `pressure`
- **Type:** `int16le`
- **Offset:** `3`
- **Length:** `1`
- **Scale:** `100`

The sensor sends signed 16-bit integers in little-endian format. We start reading at byte 3 (after the Modbus header) and divide by 100 to get the actual pressure value.

Bytes 3-4 are `e8 03`. Little-endian reads them backwards: `03 e8`. That's (3 × 256) + 232 = 1000 in decimal. Divided by 100 gives us 10.00 bar.

**Status:**

- **Name:** `status`  
- **Type:** `uint16be`
- **Offset:** `5`
- **Length:** `1`

Bytes 5-6 are `00 12`. Big-endian reads these in order: (0 × 256) + 18 = 18. If you needed individual flags (like "pump running" from bit 0), you'd add separate bool entries with masks. For now, we just want the status word itself.

**Temperature:**

- **Name:** `temperature`
- **Type:** `int16le`  
- **Offset:** `7`
- **Length:** `1`
- **Scale:** `10`

Bytes 7-8 are `d2 00`, which reads as `00 d2` in little-endian—210 in decimal. Divide by 10 and you get 21.0°C.

Deploy and read from the sensor. You get:

```json
{
  "pressure": 10.00,
  "status": 18,
  "temperature": 21.0
}
```

If your pressure shows up as 59,368 instead, you've got a byte order problem. Some older PLCs swap byte pairs in weird ways. Set **Byte Swap** to `swap16` to flip `e8 03` into `03 e8` before parsing, then change the pressure type to `int16be`. That should fix it.

## Wrapping Up

Binary data parsing doesn't need to be complicated. The Buffer Parser node takes what would normally require careful JavaScript buffer manipulation and turns it into a configuration you can set up visually and understand months later when you need to modify it.

The real work happens before you even open the node. Get your device documentation. Figure out which bytes matter, what data types they use, and how they're ordered. Once you have that mapped out, the Buffer Parser configuration is just translating those specs into offset, type, and scale fields.

When you're setting up a new parser, work incrementally. Configure one value, deploy it, and check the output. Add the next value only after the first one works. This catches byte order issues and offset mistakes immediately instead of leaving you with a broken flow and no idea which of ten configured values went wrong.

The Buffer Parser won't handle every exotic binary format you encounter in industrial systems. But for standard Modbus registers, PLC memory layouts, and serial sensor protocols—the stuff you deal with daily—it does exactly what you need without forcing you into bitwise math and DataView objects.