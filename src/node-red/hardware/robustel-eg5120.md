---
eleventyNavigation:
  key: Robustel EG5120
  parent: Hardware
meta:
  title: Setting Node-RED on Robustel EG5120
  description: In this guide, we will discuss how to install FlowFuse Device agent on Robustel EG5120.
  keywords:  node-red, flowfuse, robustel eg5120
image: "/node-red/hardware/images/robustel-eg5120.png"
specifications:
  Model: Robustel EG5120
  RAM: 2048
  Processor: Broadcom BCM2711, ARM Cortex-A72 (ARMv8-A), 4 (Quad-core)
  GPIO: Standard 40-pin GPIO Header
  Connectivity: Dual-band Wi-Fi, Bluetooth 5.0, Gigabit Ethernet, 2x USB 3.0, 2x USB 2.0
  Clock Speed: 1.5 GHz
  Storage: microSD
layout: layouts/hardware.njk
---

The [Robustel EG5120](https://www.robustel.com/product/eg5120-industrial-edge-computing-gateway/) is a versatile gateway that facilitates robust connectivity for industrial IoT applications. Integrating this powerful hardware with FlowFuse not only enhances its capabilities but also simplifies the management and deployment process. In this documentation, we’ll walk through the steps to integrate the Robustel EG5120 with FlowFuse.

The [Robustel EG5120](https://www.robustel.com/product/eg5120-industrial-edge-computing-gateway/), equipped with Linux-based Debian 11 supporting a wide variety of programming languages including Node.js, offers robust connectivity options. When combined with FlowFuse, this gateway becomes even more powerful, enabling seamless device management and deployment. 

The Robustel EG5120 supports multiple connectivity options including Ethernet, Wi-Fi, and cellular networks, which are essential for flexible deployments in various industrial scenarios. Its built-in support for Bluetooth, cellular connectivity, RS232, RS485, and Modbus facilitates seamless integration with a wide array of IoT devices and services. This blog will guide you through using FlowFuse to effectively manage your Node-RED instance, enhancing both the security and scalability of your IoT applications.

## Getting Started

This guide explores how to install and run Node-RED through the FlowFuse Device Agent on the Robustel EG5120, enabling you to build, manage, and scale Node-RED flows efficiently from a remote location.

{% include "hardware/system/debian-ff-install.njk" %}

{% include "hardware/device-registration.njk" %}

{% include "hardware/accessing-node-red-editor.njk" %}