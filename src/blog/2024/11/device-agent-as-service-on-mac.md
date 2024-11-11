---
title: Run FlowFuse Device Agent as a service on Mac using docker
subtitle: Automating FlowFuse Device Agent on macOS with Docker and Colima.
description: Learn how to run the FlowFuse Device Agent as a service on macOS using Docker and Colima, ensuring automatic startup and seamless integration with the FlowFuse platform for managing IoT edge devices.
date: 2024-11-12
authors: ["sumit-shinde,rob-marcer"]
image:
keywords: FlowFuse Device Agent, Node-RED edge device, Node-RED macOS, FlowFuse agent macOS, IoT edge device management, Node-RED device agent
tags:
   - flowfuse
---

The FlowFuse Device Agent is a tool that enables you to run Node-RED on various hardware platforms, such as Raspberry Pi, Windows, macOS, and PLCs. running node-red direclty on device helps when your application flow needs direct access to sensors and actuators connected to the hardware, facilitating seamless integration with the FlowFuse platform. This integration enables secure management, monitoring, and remote editing of flows from a centralized platform, even at the edge.

<!--more-->

In this article, we will explore how to run the FlowFuse Device Agent as a service on macOS using Docker. This setup ensures that the Device Agent operates in the background, automatically starts on boot, and provides continuous access to the FlowFuse platform for remotely managing your flows, even after a device restart. This eliminates the need to manually start the agent after each reboot, saving you time and effort.

### Prerequisites

Before starting, ensure that you have the following installed:

- Homebrew: MacOS package manager for installing software
- Docker: Platform for running containers
- Colima: A tool for running Docker containers on macOS

**NOTE: The instructions in this guide were tested on MacBook M1 and MacBook Pro M4 Pro**

### Step 1: Install Homebrew

If you don't already have Homebrew installed, you can install it using the following command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

This script will install the Homebrew package manager on your Mac. Once installed, you can easily install other software packages like Docker and Colima.

### Step 2: Install Docker

With Homebrew installed, you can now install Docker by running:

```bash
brew install docker-credential-helper docker
```

This will install Docker and its credential helper, which is useful for managing authentication with Docker registries.

### Step 3: Install Colima

Since Colima is a lightweight alternative to Docker Desktop for Macs, you'll need it to run Docker containers on macOS. To install Colima, run:

```bash
brew install colima
```

### Step 4: Start Colima

Once Colima is installed, start it with:

```bash
colima start
```

This will start Colima’s virtual machine, which is optimized for running Docker containers on macOS. You can verify that Colima is running with the following command:

```bash
colima status
```

### Step 5: Set Colima to Run as a Service

To ensure Colima starts automatically in the background, run the following:

```bash
brew services start colima
```

This will set Colima to run as a service, so it will start automatically every time your Mac boots up.

### Step 6: Adding the Device to the FlowFuse Platform

Now, you'll need to add a new device to the FlowFuse platform and download the device configuration file. This configuration will help us connect to the FlowFuse team with the added device. For more information on how to add a device and generate the configuration, refer to [Generating "Device Configuration"](https://flowfuse.com/docs/device-agent/register/#generating-%22device-configuration%22).

### Step 7: Run the FlowFuse Device Agent Container

You can now run the FlowFuse Device Agent container using Docker. Replace `/path/to/device.yml` with the actual path to your device configuration file you have downloaded. The following command will launch the container:

```bash
docker run -d --restart unless-stopped \
  --mount type=bind,src=/path/to/device.yml,target=/opt/flowfuse-device/device.yml \
  -p 1880:1880 flowfuse/device-agent:latest
```

Explanation of the command:

- -d: Run the container in detached mode (in the background).
- --restart unless-stopped: Ensure the container restarts automatically unless explicitly stopped.
- --mount type=bind,src=/path/to/device.yml,target=/opt/flowfuse-device/device.yml: Mounts your local device.yml file into the container so it can be accessed by the agent.
- -p 1880:1880: Exposes port 1880 on your host machine, which is typically used for Node-RED web interface.
- flowfuse/device-agent:latest: The Docker image for the FlowFuse Device Agent.

### Step 8: Verify the Device Agent is Running

To verify that the Device Agent is running correctly, you can use the following command:

```bash
docker ps
```

This will list all running containers, and you should see the FlowFuse Device Agent listed there. If it's not running, you can check the logs to troubleshoot:

```bash
docker logs <container_id>
```

### Step 9: Ensure the Device Agent Restarts Automatically

The `--restart unless-stopped` flag in the Docker command ensures that your FlowFuse Device Agent container will automatically restart if your Mac reboots. However, it's always good to verify this by restarting your system:

1. Restart your Mac.
2. After rebooting, check the status of the FlowFuse Device Agent:

   ```bash
   docker ps
   ```

### Conclusion

By following these steps, you've successfully set up the FlowFuse Device Agent on your macOS system using Docker and Colima. Now, the agent will run seamlessly in the background and restart automatically after a system reboot.
