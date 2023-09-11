---
title: Making sense of your industrial data
subtitle: A look at legacy industrial protocol data and making sense of it in an IIoT world.
description: A look at legacy industrial protocol data and making sense of it in an IIoT world.
date: 2023-09-08
authors: ["stephen-mclaughlin"]
image: "/blog/2023/09/images/industrial-legacy-data-blog-image.png"
tags:
    - posts
    - node-red
    - community
---

In today's rapidly evolving industrial landscape, the ability to collect, analyse, and act upon data is more critical than ever.
The Industrial Internet of Things (IIoT) has ushered in a new era of connectivity and automation, but what about the wealth of data locked away in legacy industrial protocols like ModBus?
How can we unlock and make sense of this valuable information in the IIoT era? That's where tools like Node-RED and `node-red-contrib-buffer-parser` come into play.

<!--more-->

### Legacy Industrial Data: ModBus

ModBus is one of the most widely used industrial protocols. Originally developed in the late 1970s, it has been a popular choice for industrial communication ever since. However, its data format can be challenging to work with in the context of modern IIoT applications. ModBus typically represents data in 16-bit unsigned registers, making it necessary to convert this data into more usable formats like Signed integer, Float, Signed and Unsigned Long, String, or even individual bits.

### A short primer on data types

Before we dive into how to make sense of ModBus data, let's take a quick look at some of the common data types we have to deal with.

#### 16-bit unsigned

16-bit unsigned data is an integer that can only be positive. It can represent values from 0 to 65535. For example, the number 12345 is represented as `0x3039` in hexadecimal or `0011000000111001` in binary.

#### 16-bit signed

16-bit signed data is an integer that can be positive or negative. It can represent values from -32768 to 32767. For example, the number -12345 is represented as `0xCFC7` in hexadecimal or `1100111111000111` in binary.

#### 32-bit data

32-bit data, like 16-bit data can mean many things. It could be signed or unsigned, or even a floating point number. For example, the number 12345 is represented as `0x00003039` in hexadecimal or `00000000000000000011000000111001` in binary. Typically, 32-bit data is represented as two 16-bit registers. Therefore, when dealing with 32-bit data, you need to combine two 16-bit registers to get the full value.

#### Endianness

Endianness is a term used to describe the order in which bytes are stored in memory. There are two types of endianness: big-endian and little-endian. In big-endian, the most significant byte is stored first, while in little-endian, the least significant byte is stored first. For example, the number 12345 is represented as `0x3039` in big-endian and `0x3930` in little-endian.  In other words, the bytes might be stored in reverse order. This further complicates the process of converting ModBus data into more usable formats.


### Node-RED and node-red-contrib-buffer-parser to the rescue

Node-RED is an open-source flow-based development tool for visual programming. It's particularly well-suited for IIoT applications because of its versatility and extensive library of nodes. One such node, node-red-contrib-buffer-parser, provides a solution to the legacy data conversion challenge.

This powerful Node-RED module allows you to parse a Buffer of bytes or an Array of integer data (which, by no coincidence, the popular module `node-red-contrib-modbus` outputs), and convert it into various data types. It can output pretty much any data type, including byte-swapped data, WORD swapped data, masked/shifted/scaled data, and even individual bits.

Here's a quick overview of how it works:

1. **Data Parsing**: Start by setting up a ModBus READ node in Node-RED to retrieve data from your industrial device. Then, use the buffer parser node to parse the ModBus data.

1. **Data Conversion**: With the buffer parser, you can easily convert the 16-bit unsigned data into more meaningful formats. Whether you need to translate it into Float, Long, String, or even extract specific bits, this tool makes the process straightforward.

1. **Publishing to MQTT, influxDB, a dashboard, an IIoT system**: Once your data is in a usable format, Node-RED enables you to publish it to many places. MQTT (Message Queuing Telemetry Transport), a popular protocol for IIoT communication is a perfect example. This makes your data accessible to other IIoT systems and applications for further analysis and action.

### Unlocking the Potential of Legacy Data

By leveraging Node-RED and buffer parser, you can bridge the gap between legacy industrial protocols and the IIoT world. This means you can extract valuable insights from your existing infrastructure without the need for costly hardware upgrades or replacements.

In the era of the Industrial Internet of Things, making sense of your industrial data is no longer a daunting challenge. With the right tools approach, you can unlock the full potential of your legacy data and drive efficiency, productivity, and innovation in your industrial processes. Yey!

### Learn More

We will be publishing follow-up blog posts with more details, best practices and examples on how to use Node-RED to make sense of your industrial data. In the meantime, you can learn more about these tools by visiting the following links:
* [Node-RED blog posts](https://flowfuse.com/blog/node-red/)
* [Node-RED videos](https://www.youtube.com/playlist?list=PLpcyqc7kNgp09XeRx_cae1fEIOloPqM1C)
* [Buffer Parser Node](https://flows.nodered.org/node/node-red-contrib-buffer-parser) 

### A teaser

Here are 3 quick demonstrations of Node-RED and the buffer parser node in action:

#### Example 1: ModBus to MQTT
Converting an array of 16-bit unsigned integers to String, Float and a scaled integer and passing them to an MQTT broker in 4 nodes!
![Legacy data to MQTT](images/industrial-legacy-data-to-mqtt.gif)

#### Example 2: ModBus to InfluxDB
Converting an array of 16-bit unsigned integers to String, Float and a scaled integer for publishing to influxDB!
![Legacy data to influxDB](images/industrial-legacy-data-to-influx.png)
![Legacy data to influxDB2](images/industrial-legacy-data-to-influx2.png)

#### Example 3
Converting an array of 16-bit unsigned integers to String, Float and a scaled integer for publishing to a dashboard!
![Legacy data to dashboard](images/industrial-legacy-data-to-dashboard.png)