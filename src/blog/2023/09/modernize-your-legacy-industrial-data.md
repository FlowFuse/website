---
title: Modernize your legacy industrial data
subtitle: Working with legacy industrial protocol data from the likes of Modbus and older, non IIoT protocols and putting it to work in an IIoT world.
description: Learn how to bridge legacy industrial protocols like Modbus to the IIoT era using Node-RED and buffer parsing. Explore data types, conversion challenges, and examples
date: 2023-09-14
lastUpdated: 2025-07-23
authors: ["stephen-mclaughlin"]
image: "/blog/2023/09/images/industrial-legacy-data-blog-image.png"
tags:
    - posts
    - node-red
    - community
---

Industrial systems generate valuable data, but legacy protocols like Modbus or non-IIoT standards often make it hard to use. Bridging this gap is essential to connect traditional systems with the modern Industrial Internet of Things (IIoT).  

Whether it’s Modbus registers, serial communication without a protocol, or standards like Siemens S7 and Mitsubishi MC-Protocol, the challenge lies in making sense of this raw information. With tools like Node-RED and the node-red-contrib-buffer-parser, you can turn complex, outdated data streams into usable formats that power IIoT innovation. 


<!--more-->

### Legacy Industrial Data: Modbus

Modbus is one of the most widely used industrial protocols. Originally developed in the late 1970s, it has been a popular choice for industrial communication ever since. However, its data format can be challenging to work with in the context of modern IIoT applications. Modbus typically represents data in 16-bit unsigned registers, making it necessary to convert this data into more usable formats like Signed integer, Float, Signed and Unsigned Long, String, or even individual bits.

### A short primer on data types

Before we dive into how to make sense of Modbus data, let's take a quick look at some of the common data types we have to deal with.

#### 16-bit unsigned

16-bit unsigned data is an integer that can only be positive. It can represent values from 0 to 65535. For example, the number 12345 is represented as `0x3039` in hexadecimal or `0011000000111001` in binary.

#### 16-bit signed

16-bit signed data is an integer that can be positive or negative. It can represent values from -32768 to 32767. For example, the number -12345 is represented as `0xCFC7` in hexadecimal or `1100111111000111` in binary.

#### 32-bit data

32-bit data, like 16-bit data can mean many things. It could be signed or unsigned, or even a floating point number. For example, the number 12345 is represented as `0x00003039` in hexadecimal or `00000000000000000011000000111001` in binary. Typically, 32-bit data is represented as two 16-bit registers. Therefore, when dealing with 32-bit data, you need to combine two 16-bit registers to get the full value.

#### Endianness

Endianness, particularly in the context of data communications, refers to the order of bytes and how they are stored or transmitted. There are two types of endianness: big-endian (BE) and little-endian (LE). In big-endian, the most significant byte is first, while in little-endian, the least significant byte is first. For example, the number 12345 is represented as `0x3039` in a big-endian word and `0x3930` in little-endian word.  This can often cause confusion and complicate the process of converting Modbus data into more usable formats.


### Node-RED and node-red-contrib-buffer-parser to the rescue

Node-RED is an open-source flow-based development tool for visual programming. It's particularly well-suited for IIoT applications because of its versatility and extensive library of nodes. One such node, `node-red-contrib-buffer-parser`, provides a solution to the legacy data conversion challenge.

This powerful Node-RED module allows you to parse a Buffer of bytes or an Array of integer data (which, by no coincidence, the popular module `node-red-contrib-modbus` outputs), and convert it into various data types. It can output pretty much any data type, including byte-swapped data, WORD swapped data, masked/shifted/scaled data, and even individual bits.

Here's a quick overview of how it works:

1. **Data Parsing**: Start by setting up a Modbus READ node in Node-RED to retrieve data from your industrial device. Then, use the buffer parser node to parse the Modbus data.

1. **Data Conversion**: With the buffer parser, you can easily convert the 16-bit unsigned data into more meaningful formats. Whether you need to translate it into Float, Long, String, or even extract specific bits, this tool makes the process straightforward.

1. **Publishing to MQTT, influxDB, a dashboard, an IIoT system**: Once your data is in a usable format, Node-RED enables you to publish it to many places. MQTT (Message Queuing Telemetry Transport), a popular protocol for IIoT communication is a perfect example. This makes your data accessible to other IIoT systems and applications for further analysis and action.

### Unlocking the Potential of Legacy Data

By leveraging Node-RED and buffer parser, you can bridge the gap between legacy industrial protocols and the IIoT world. This means you can extract valuable insights from your existing infrastructure without the need for costly hardware upgrades or replacements.

In the era of the Industrial Internet of Things, making sense of your industrial data is no longer a daunting challenge. With the right tools approach, you can unlock the full potential of your legacy data and drive efficiency, productivity, and innovation in your industrial processes. Yey!

### 3 quick demos of Node-RED and the buffer parser node in action

Here are 3 quick demonstrations that barely scratch the surface of possibilities:

#### Example 1: Modbus to MQTT
Converting an array of 16-bit unsigned integers to String, Float and a scaled integer and passing them to an MQTT broker in 4 nodes!
![Legacy data to MQTT](images/industrial-legacy-data-to-mqtt.gif)

#### Example 2: Modbus to InfluxDB
Converting an array of 16-bit unsigned integers to String, Float and a scaled integer for publishing to influxDB!
![Legacy data to influxDB](images/industrial-legacy-data-to-influx.png)
![Legacy data to influxDB2](images/industrial-legacy-data-to-influx2.png)

#### Example 3: Modbus data on a dashboard
Converting an array of 16-bit unsigned integers to String, Float and a scaled integer for publishing to a dashboard!
![Legacy data to dashboard](images/industrial-legacy-data-to-dashboard.png)

### Simplify Your Node-RED Operations with FlowFuse

While Node-RED is a fantastic tool for data collection, transformation, and analysis, integrating it into a production environment can sometimes feel like navigating a maze. Whether you’re deploying Node-RED on a server, ensuring secure remote access for your team, or managing a sprawling network of thousands of instances, it’s easy to feel overwhelmed.

That’s where FlowFuse steps in to make your life easier. FlowFuse is designed to tackle these challenges head-on. It enhances Node-RED with features that simplify collaboration, strengthen security, and provide scalable deployment options. Imagine having a robust system that not only keeps your Node-RED applications running smoothly but also scales effortlessly with your needs. With FlowFuse, you gain access to a comprehensive suite of production-ready [features](/platform/features/) designed to streamline your Node-RED workflows and boost overall performance.

**[Sign up]({% include "main-cta-url.njk" %}) now for a free trial and experience FlowFuse's features**

### Learn More

We will be publishing follow-up blog posts with more details, best practices and examples on how to use Node-RED to make sense of your industrial data. In the meantime, you can learn more about these tools by visiting the following links:
* [Node-RED blog posts](/blog/node-red/)
* [Node-RED videos](https://www.youtube.com/playlist?list=PLpcyqc7kNgp09XeRx_cae1fEIOloPqM1C)
* [Buffer Parser Node](https://flows.nodered.org/node/node-red-contrib-buffer-parser) 
