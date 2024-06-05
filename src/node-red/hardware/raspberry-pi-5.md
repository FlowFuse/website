---
eleventyNavigation:
  key: Raspberry Pi 5
  parent: Hardwares
meta:
   title: Setting Up Node-RED on Raspberry Pi 5
   description: Learn how to install the FlowFuse Edge Agent on the Raspberry Pi 5 effortlessly. Manage your device with Node-RED through FlowFuse with ease.
   keywords: node-red, flowfuse, raspberry pi, raspberry pi 5
image: "./images/raspberry-pi-5-device-agent.png"
---

# {{meta.title}}

## Raspberry Pi OS Installation

To set up your Raspberry Pi 5 for use with Node-RED and FlowFuse, follow these steps:

### Flashing Raspberry Pi OS

1. Use the [official Raspberry Pi Imager](https://www.raspberrypi.com/software/) to flash the 64-bit version of Raspberry Pi OS to an SD card.

![Flash Raspberry Pi OS on an SD-card](./images/raspberry-pi-5-flash-os.png)

2. Before writing to the SD card, configure the OS for headless mode, including Wi-Fi, SSH, and authentication settings.

![Configure RPi OS before flashing](./images/raspberry-pi-5-config-before-flash.png)

3. Write the OS and configuration to the SD card. This process takes about 10 minutes.

4. Insert the SD card into the Raspberry Pi 5 and power it on. The device should appear on your network after a minute or so.

5. Connect to the Raspberry Pi using SSH:

    ```sh
    ssh pi@raspberrypi.local
    ```

6. Update and upgrade the system:

    ```sh
    sudo apt-get update
    sudo apt-get upgrade -y
    ```

## Installing the FlowFuse Device Agent

The FlowFuse Device Agent manages Node-RED on the Raspberry Pi, handling Node-RED versions, upgrades, setup, management, and access controls.

1. Install the agent using the following command:

    ```sh
    bash <(curl -sL https://raw.githubusercontent.com/FlowFuse/device-agent/main/service/raspbian-install-device-agent.sh)
    ```

   This script installs a Node.js runtime, the agent, and configures the Raspberry Pi to run the FlowFuse agent on boot and restart it if it crashes.

### Configuring the FlowFuse Agent

To configure the FlowFuse Cloud with your devices, you need to set up a token for identification. Follow the instructions in the [FlowFuse documentation](/docs/user/introduction/#working-with-devices) to obtain and configure the device YAML file.

1. Copy the YAML file to `/opt/flowforge/device.yml` on the Raspberry Pi.

2. Reboot the Raspberry Pi. The agent should start automatically and register with FlowFuse Cloud, making the device available for use.