---
title: "Setting Up Node-RED on Raspberry Pi: Quick Guide"
subtitle: Step-by-step guide to set up Node-RED on Raspberry Pi
description: Set up Node-RED on Raspberry Pi swiftly. Learn installation, configuration, deploying flows, hardware integration, security, and other advanced configurations.
date: 2024-05-15
authors: ["sumit-shinde"]
image: 
tags:
   - node red 
   - raspberry pi
---

Creating applications for IoT and IIoT projects is often challenging, especially when dealing with hardware devices. However, Node-RED simplifies this process by providing an intuitive platform for interacting with hardware devices, sensors, and microcontrollers. Raspberry Pi is a widely used microcontroller in conjunction with Node-RED according to [survey conducted in 2023](https://nodered.org/about/community/survey/2023/). In this guide, we will explore how to set up Node-RED on Raspberry Pi and utilize it to read sensors and more.

## What is the Raspberry Pi and why to use it?

The Raspberry Pi is a series of small, affordable single-board computers developed by the Raspberry Pi Foundation. These credit card-sized computers are designed to promote education in computer science and programming. They run various operating systems like Raspberry Pi OS (formerly Raspbian) and Ubuntu, and feature GPIO pins for hardware connections. Raspberry Pi boards are popular for DIY electronics projects, home automation, and educational purposes.

- **Affordable:** Raspberry Pi boards are cost-effective, making them accessible for individuals, educators, and hobbyists.
- **Versatility:** Raspberry Pi supports various operating systems and can be used for a wide range of projects, from basic computing tasks to advanced IoT applications.
- **GPIO Pins:** The GPIO (General Purpose Input/Output) pins allow for hardware connections, enabling users to interface with sensors, motors, and other devices.
- **Compact Size:** Raspberry Pi boards are small in size, making them convenient for embedding into projects with limited space.

## Installing Flowfuse Device Agent on Raspberry Pi

The FlowFuse Device Agent, built by FlowFuse, facilitates connecting and interacting with your devices. Additionally, it enables remote management, making it easier to oversee the Node-RED application running on the device.

### Prerequisites for Installation:

- Required Hardware:

Before proceeding further, ensure you have all the necessary hardware components ready. This includes the Raspberry Pi single-board computer (recommended models: Raspberry Pi 3 or newer), an SD card (8GB or larger recommended), a compatible power supply, and any required peripherals such as a keyboard, mouse, and display. 

- Software Preparation:

Ensure your Raspberry Pi is fully set up and running on the latest version of Raspbian OS. For more information on installing Raspberry Pi OS, refer to [How to Install Raspberry Pi OS on Your Pi](https://raspberrytips.com/install-raspberry-pi-os/). Additionally, ensure your Raspberry Pi is connected to a stable network, either via Ethernet or Wi-Fi.

### Installing the Device Agent

FlowFuse provides a script to install the FlowFuse Device Agent onto a Raspberry Pi in an easy way. This script will check if Node.js is installed and ensure it's at least version 14; if not found, it installs Node.js 14 LTS. Then, it installs the latest FlowFuse Device Agent using npm and sets it up to run as a service, it means it sets up the Pi to run the FlowFuse agent every time it boots up, and restart it if it ever crashes.

```
bash <(curl -sL https://raw.githubusercontent.com/FlowFuse/device-agent/main/service/raspbian-install-device-agent.sh)
```

## Linking the Device Agent to Your FlowFuse Team:

Now, before you began developing applications with FlowFuse running on device, you  need the device to be configured with a token to identify itself. To register and genrate configuration details, visit `flowfuse.com`, log in with your ID and password, or if you don't have an account, create one, and then follow the steps below:

### Generating "Device Configuration"

1. Go to your team's Devices page.
2. Click the Add Device button.
3. You will be prompted to give the device a Name, an optional Type, and to choose which Application, if any, the device should be assigned to.
4. The Type field can be used to record additional meta information about the device.
5. If you do not wish to assign the device to an Application at this time, you can do so later.
6. Click Add.
7. Once the device has been registered, you will be shown the Device Configuration dialog which contains all the information needed to connect the device to the platform.

### Linking to FlowFuse Team and Running

To link the FlowFuse Device Agent to your FlowFuse team, you have two different options. You can either utilize the command provided by FlowFuse, as explained in this section, or opt for the Device Agent web UI interface. For more details on using the Device Agent web UI, refer to the [Device Agent Web UI documentation](/docs/device-agent/register/#device-agent-web-ui).

1. Copy the command given in the dialog.
2. Paste that into your Raspberry Pi command line.

Now you are successfully connected to your FlowFuse team now when you restart the raspberry pi it should now start the agent automatically fully configured. The device will then ping back to FlowFuse.

## Accessing Node-RED Editor and Creating your first flow

To begin development, you need to access the Node-RED editor, which can be done in two ways: within the local network and from outside of the network anywhere in the world.

### Accessing Node-RED Editor within the same Network

1. Open your browser on the same device where flowfuse is running as service.
2. Type `127.0.0.1:8080` into the URL input field and press enter.

### Accessing Node-RED Editor Outside of the Network

1. Login into your FlowFuse account.
2. Click on the Devices option in the left sidebar.
3. Click on the added device and enable the developer mode option.
4. Then click on the Device Editor option.

### Creating Your First Flow

Now you will see a nice editor with various options. To gain an understanding of the Node-RED editor and other basic things, refer to [Node-RED Editor Guide](https://nodered.org/docs/user-guide/editor/).

- Drag an Inject node onto the canvas from Palette.
- Drag a Debug node onto the canvas.
- Connect the Inject node's output to the Debug node's input.
- Click on the red deploy button located at the top right corner.

Now, your basic flow is set up. When you click the "Inject" button, it will trigger a message to be sent to the "Debug" node, which will display the message in the debug panel. This helps you understand how nodes can be connected to create a flow in Node-RED. 

## Integrating sensors and actuators

Interacting with sensors and actuators using Raspberry Pi involves a lot of hassles, such as Python programming and managing various libraries. However, with FlowFuse running directly on your hardware device, it becomes much easier and faster to manage these tasks. This section will provide a detailed guide on how to seamlessly integrate sensors and actuators using FlowFuse and Node-RED. For a practical demonstration, we will walk through the process of connecting a DHT11 sensor to a Raspberry Pi and reading data using FlowFuse.

