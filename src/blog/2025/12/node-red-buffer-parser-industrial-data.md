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

When you first open the Buffer Parser configuration, it's easy to feel overwhelmed by all the options. But here's the thing: most of these settings you'll set once and forget. Let's focus on what actually matters when you're parsing real industrial data.

### Where Your Data Lives

The **Property** field is straightforward—it points to where your buffer sits in the message. In almost every case, this is `msg.payload`. Your PLC sends data, it lands in the payload, and that's what you're working with.

Keep **Specification** set to "UI" unless you have a specific reason not to. This lets you configure everything visually right here in the node. The dynamic option exists for edge cases where your parsing rules need to change based on incoming data, but that's rarely necessary.

Now, **Byte Swap**—this is one you ignore until suddenly your numbers are completely wrong. If you're expecting 100 but getting 25600, you've hit an endianness issue. Different manufacturers handle byte order differently, and it's frustrating. Try swap16 for 16-bit values or swap32 for 32-bit values, and watch your numbers snap into place.

**Output Property** is useful when you want to preserve the original buffer while storing the parsed results elsewhere. Handy for debugging or passing raw data downstream.

### Shaping Your Results

The output format determines how your parsed data looks when it comes out the other side.

**Key/value** is your bread and butter. It gives you a clean JSON object with named properties. Need nested structure? Use the arrow syntax: `motor1=>temperature` creates `msg.payload.motor1.temperature`. This is what you'll use most of the time.

**Multiple Results** and **Fan Out** are for when you need to split data into separate flows. Fan Out actually creates multiple output pins on the node—one for each value you're extracting. Route temperature to one dashboard, pressure to another, all without a switch node in sight. It's elegant when you need it.

**Array** and **value-only** formats shine when you're feeding data into charts or databases that expect arrays. **Buffer** mode is niche—it applies byte swapping without actually parsing anything, useful only in specific data transformation pipelines.

### Extracting Your Values

This is where the actual parsing happens. Each row you configure pulls one piece of information from your buffer.

**Name** is what you'll see in your output object. Make it meaningful. `temperature` tells you something; `val1` tells you nothing. Your future self debugging a flow at 2 AM will appreciate descriptive names.

**Type** is critical because those raw bytes mean nothing until you tell the parser how to interpret them. Is `0x64` the number 100, or is it the ASCII character 'd'? The type decides. Most industrial sensors use uint16 for positive integers up to 65,535, int16 when values can go negative, and float for measurements with decimal precision. Your device documentation should specify this.

**Offset** tells the parser which byte to start reading from. Byte 0 is first, byte 1 is second, and so on. If your sensor puts temperature data starting at byte 3, that's your offset. Get this wrong by even one byte and you're reading garbage.

**Length** is usually 1 for single values. If you're reading an array of sensor readings, increase it. Set it to -1 when you want everything from the offset to the end—useful when buffer sizes vary.

**Offset Bit** matters only when you're extracting individual bits for boolean values. Most of the time, you can ignore it.

**Mask** becomes important when multiple values are packed into a single byte. Say bits 0-3 hold one sensor reading and bits 4-7 hold another. Use masks like `0x0F` and `0xF0` to isolate each value. It sounds complicated, but you're just telling the parser which bits to pay attention to.

**Scale** is incredibly practical. Industrial sensors rarely send values in the format you want. A temperature sensor might send 235 when the actual reading is 23.5°C. Add `10` in the scale field and you're done.