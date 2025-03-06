---
eleventyNavigation:
  key: Raspberry Pi 4
  parent: Hardware
meta:
  title: Setting Node-RED on Raspberry Pi 4
  description: Learn how to install the FlowFuse Edge Agent on the Raspberry Pi 4 effortlessly. Manage your device with Node-RED through FlowFuse with ease.
  keywords: node-red, flowfuse, raspberry pi, raspberry pi 4
image: "/node-red/hardware/images/raspberry-pi-4-b.png"
specifications:
  Model: Raspberry Pi 4 B 8GB
  RAM: 8GB
  Processor: Broadcom BCM2711, ARM Cortex-A72 (ARMv8-A), 4 (Quad-core)
  GPIO: (Fully backwar ds-compatible with previous boards), Standard 40-pin GPIO Header
  Connectivity: Dual-band Wi-Fi, Bluetooth 5.0, Gigabit Ethernet, 2x USB 3.0, 2x USB 2.0
  Clock Speed: 1.5 GHz
  Storage: microSD
layout: layouts/hardware.njk
---

## Raspberry Pi OS Installation

To set up your Raspberry Pi 4 for use with Node-RED and FlowFuse, follow these steps:
To set up your Raspberry Pi 4 for use with Node-RED and FlowFuse, follow these steps:

### Flashing Raspberry Pi OS

1. Use the [official Raspberry Pi Imager](https://www.raspberrypi.com/software/) to flash the 64-bit version of Raspberry Pi OS to an SD card.

![Flash Raspberry Pi OS on an SD-card](./images/raspberry-pi-5-flash-os.png)

2. Before writing to the SD card, configure the OS for headless mode, including Wi-Fi, SSH, and authentication settings.

![Configure RPi OS before flashing](./images/raspberry-pi-5-config-before-flash.png)

3. Write the OS and configuration to the SD card. This process takes about 10 minutes.

4. Insert the SD card into the Raspberry Pi 4 and power it on. The device should appear on your network after a minute or so.
4. Insert the SD card into the Raspberry Pi 4 and power it on. The device should appear on your network after a minute or so.

5. Connect to the Raspberry Pi using SSH:

    ```sh
    ssh pi@raspberrypi.local
    ```

6. Update and upgrade the system:

    ```sh
    sudo apt-get update
    sudo apt-get upgrade -y
    ```

## Installing FlowFuse Device Agent

The FlowFuse Device Agent manages Node-RED on the Raspberry Pi, handling Node-RED versions, upgrades, setup, management, and access controls.

FlowFuse provides a script to install the FlowFuse Device Agent onto a Raspberry Pi in an easy way. This script will check if Node.js is installed and ensure it's at least version 14; if not found, it installs latest Node.js version. Then, it installs the latest FlowFuse Device Agent using npm and sets it up to run as a service, which means it sets up the Pi to run the FlowFuse agent every time it boots up and restart it if it ever crashes.

```sh
bash <(curl -sL https://raw.githubusercontent.com/FlowFuse/device-agent/main/service/raspbian-install-device-agent.sh)
```

## Linking the Device Agent to Your FlowFuse Team

Now, before you begin developing applications with FlowFuse running on the device, you need the device to be configured with a token to identify itself on FlowFuse.

### Configuring the FlowFuse Agent

To configure the FlowFuse Cloud with your devices:

1. Log into the FlowFuse team and go to the devices option in the sidebar.
2. Add a new device by clicking on the top right "Add Device" button. In the popup that opens, enter the name for your device, select the type (optional), and assign the device to an application (optional). Then, click on the "Add" button.
3. After successfully creating and adding the device, you'll see a popup window with the command that allows you to quickly configure the device with FlowFuse Cloud.

![Image showing command device configuration dialog and the command placeholder, where you will find the command to link the device to your FlowFuse team.](./images/how-to-setup-node-red-on-raspberry-pi-device-configuration-dialog.png "Image showing command device configuration dialog and the command placeholder, where you will find the command to link the device to your FlowFuse team."){data-zoomable}

4. Copy that command and run it in your device's terminal. The device agent will start, and it will be configured with FlowFuse Cloud. To verify this, go to the FlowFuse team, click on the devices option in the sidebar, and then click on the device you have configured. You will see the status as running and last seen in green color.

![Image showing command device connection status](./images/raspberry-pi-4.png "Image showing command device connection status"){data-zoomable}

### Accessing Node-RED Editor.

![Image showing device edtitor button.](./images/raspberry-4-editor.png "Image showing device edtitor button."){data-zoomable}

1. Login into your FlowFuse account.
2. Click on the **Devices** option in the left sidebar.
3. Click on the device and enable the **developer mode** by clicking on the top right-corner switch.
4. Once Developer Mode is enabled, click on the **Device Editor** option located next to the that switch.

For more information refer to [FlowFuse documentation](/docs/user/introduction/#working-with-devices)