---
eleventyNavigation:
  key: ARMxy BL340
  parent: Hardware
meta:
  title: Setting Node-RED on ARMxy BL340
  description: Guide to setting up Node-RED on ARMxy BL340, including installation and configuration steps.
  keywords: node-red, flowfuse, ARMxy BL340
image: "/node-red/hardware/images/armxy-bl340.jpg"
specifications:
  Model: ARMxy BL340 Series
  RAM: 16GB LPDDR4X
  Processor: ARM Cortex-A76 + Cortex-A55, Octa-core
  GPU: Mali-G57
  GPIO: 40-pin expansion header
  Connectivity: Dual-band Wi-Fi 6, Bluetooth 5.2, Gigabit Ethernet, 4x USB 3.0, 1x USB-C
  Clock Speed: Up to 2.2 GHz
  Storage: NVMe SSD, microSD
  Display Output: HDMI 2.0, DisplayPort
  Power Supply: 12V DC, USB-C PD
layout: layouts/hardware.njk
---

The ARMxy BL340 is a high-performance single-board computer designed for demanding applications, including edge computing, automation, and embedded systems. Featuring an octa-core ARM processor, advanced connectivity options, and support for high-speed storage, it provides a powerful platform for developers and engineers.

Integrating this powerful hardware with FlowFuse not only enhances its capabilities but also simplifies the management and deployment process.

## Prerequisites

Before proceeding with the installation, ensure you have the following:

- **ARMxy BL340** – A functioning device with internet access.
- **FlowFuse Account** - Ensure you have a FlowFuse account. If not, you can create a free account that allows you to manage up to two edge devices for free. For more information, refer to [FlowFuse Free Tier](/blog/2024/12/flowfuse-release-2-12/)
- **Sudo Privileges** – Administrator access to install required packages.

## Getting Started

This guide explores how to install and run Node-RED through the FlowFuse Device Agent on the ARMxy BL340, enabling you to build, manage, and scale Node-RED flows efficiently from a remote location.

{% include "hardware/system/debian-ff-install.njk" %}

{% include "hardware/device-registration.njk" %}

!["Status of the ARMxy BL340 remote instance in FlowFuse, showing its connection and operational state"](./images/status-flowfuse.png "Status of the ARMxy BL340 remote instance in FlowFuse, showing its connection and operational state"){data-zoomable}

Now, when your device reboots, the FlowFuse Device Agent will automatically start, ensuring that your ARMxy BL340 remains connected to the FlowFuse platform.

{% include "hardware/accessing-node-red-editor.njk" %}