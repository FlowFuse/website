---
eleventyNavigation:
  key: Opto-22 Groov Epic
  parent: Hardware
meta:
  title: Setting up Node-RED on Opto-22 Groov Rio R7
  description: Learn how to install and configure Node-RED on the Opto-22 Groov Rio R7, a rugged edge I/O module for industrial applications.
  keywords: node-red, flowfuse, Opto-22 Groov Rio, groov RIO, industrial IoT, edge computing
image: "/node-red/hardware/images/GRV-R7-MM1001-10.jpeg"
specifications:
  Model: GRV-R7-MM2001-10
  RAM: 1024 MB
  Processor: ARM Cortex-A8, 1 GHz
  I/O Channels: 10 multi-signal, multifunction channels (analog I/O, temperature, discrete I/O, mechanical relays)
  Connectivity:
    - Dual switched Gigabit Ethernet
    - USB 2.0 (host)
    - Power over Ethernet (PoE)
    - 10–32 VDC power input
  Clock Speed: 1 GHz
  Storage:
    - 4 GB eMMC (internal)
    - USB memory stick support (up to 32 GB)
layout: layouts/hardware.njk
---

The Opto-22 Groov Rio R7 is a rugged edge I/O module designed for industrial applications. Equipped with a powerful ARM Cortex-A8 processor, versatile I/O channels, and various connectivity options, it’s an ideal solution for edge computing and industrial IoT.

## Prerequisites

Before proceeding with the installation, ensure you have the following:

- **Opto-22 Groov Rio R7** – A functioning device with internet access.
- **FlowFuse Account** - You need an active FlowFuse account to access the platform and configure your instance. If you do not have one, please visit the FlowFuse website and [sign up](https://app.flowfuse.com/account/create) for a new account before proceeding.
- **Sudo Privileges** – Administrator access to install required packages.

## Getting Started

This guide will walk you through setting up Node-RED on the Groov Rio R7 using the FlowFuse Device Agent, allowing you to manage, scale, and secure your remote instances effectively.

{% include "hardware/system/opto-22-groove-rio.md" %}

{% include "hardware/device-registration.md" %}
