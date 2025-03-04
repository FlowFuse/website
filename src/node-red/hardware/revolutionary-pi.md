---
eleventyNavigation:
  key: Revolutionary Pi
  parent: Hardware
meta:
   title: Setting Node-RED on Revolutionary Pi
   description: Learn how to set up Node-RED on a Raspberry Pi 4, including installation, configuration, and integration with sensors and actuators.
   keywords: node-red, raspberry pi, Revolutionary Pi
---

# {{meta.title}}

Revolution Pi is an industrial-grade computer based on the Raspberry Pi Compute Module, designed specifically for use in industrial automation environments, offering features like robust hardware, a real-time operating system, and support for various industrial protocols, allowing it to be used as an IIoT gateway to collect and send data from factory machines to the cloud.

## Goal

This documentation guides users through installing the FlowFuse Device Agent on a Revolution Pi. The agent enables running Node-RED on the edge device, managing it remotely via FlowFuse, and accessing [enterprise features](/product/features/) that are useful for organizations. Since the device does not come with Node.js preinstalled, this guide covers installing both Node.js and the FlowFuse Device Agent.

## Prerequisites

Before proceeding with the installation, ensure you have the following:

- **Revolutionary Pi** – A functioning device with internet access.
- **Sudo Privileges** – Administrator access to install required packages.
- **Network Access** – Ensure outbound traffic is allowed on port 443 for connections to:
  
  - `app.flowfuse.com:443`
  - `mqtt.flowfuse.cloud:443`
  
- **Firewall Rules** – The Device Agent does not install Node-RED at startup. When receiving a snapshot, it downloads the required Node-RED version. Allow access to:

  - `https://registry.npmjs.com`

## Getting Started

This guide provides step-by-step instructions for setting up the FlowFuse Device Agent on a Revolutionary Pi. It begins with installing Node.js, a prerequisite for running the agent, followed by the installation and configuration of the FlowFuse Device Agent.

### Installing Node.js

Since Node.js is not preinstalled on the Revolutionary Pi, follow these steps to install it:

#### Step 1: Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

#### Step 2: Install Required Dependencies

Before adding the NodeSource repository, ensure that curl is installed, as it is required to download the setup script.

```bash
sudo apt install -y curl
```

#### Step 3: Install the Latest LTS Version of Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```

#### Step 4: Verify Installation

```bash
node -v
```

After running the verification command, the installed Node.js version should be displayed in the terminal.

> **Note:** Ensure that the installed version is **Node.js 18 or later**,as this is the recommended version for optimal compatibility with the device agent.

### Installing the FlowFuse Device Agent

Once Node.js is installed, proceed with the installation of the FlowFuse Device Agent.

#### Step 1: Install the FlowFuse Device Agent

```bash
sudo npm install -g @flowfuse/device-agent
```

### Registering the Device Agent to FlowFuse and Running It 

After installing the FlowFuse Device Agent, the next step is to link the Revolutionary Pi to your [FlowFuse team](/docs/user/team/). This allows the device to be managed remotely and receive Node-RED deployments.

#### Step 1: Add a New Device to Your FlowFuse Team

Follow the instructions in the official documentation to add your device to your FlowFuse team: [Add a Remote Instance](/docs/device-agent/register/#add-remote-instance).

**Add a Remote Instance**.

Once you register the device, you will receive the configuration details required to connect it to your team. Copy the provided configuration.

#### Step 2: Create the Configuration Directory

Create a directory for the FlowFuse device and its configuration:

```bash
sudo mkdir -p /opt/flowfuse-device
sudo chown -R $USER /opt/flowfuse-device
```

#### Step 3: Add the Configuration File

Open the configuration file in a text editor:

```bash
sudo nano /opt/flowfuse-device/device.yml
```

Paste the configuration details you copied from the FlowFuse web interface into the file, then save it by pressing **Ctrl + X**, followed by **Y**, and then **Enter**.

If you prefer using the web interface for configuring the device, refer to the [FlowFuse documentation](/docs/device-agent/register/#device-agent-web-ui).

> **Alternative:** Instead of manually performing **Steps 1, 2, and 3**, you can use a **single command** to simplify the process, saving extra steps and time. For more details, refer to the **FlowFuse Quickstart Guide**.

#### Step 4: Start the Device Agent

Run the following command to start the device agent:

```bash
flowfuse-device-agent
```

This will connect the device to your FlowFuse team and allow remote management.
