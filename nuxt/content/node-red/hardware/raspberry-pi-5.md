---
title: "Setting Up Node-RED on Raspberry Pi 5"
description: "Learn how to install the FlowFuse Edge Agent on the Raspberry Pi 5 effortlessly. Manage your device with Node-RED through FlowFuse with ease."
---

## Raspberry Pi OS Installation

To set up your Raspberry Pi 5 for use with Node-RED and FlowFuse, follow these steps:

### Flashing Raspberry Pi OS

1. Use the [official Raspberry Pi Imager](https://www.raspberrypi.com/software/) to flash the 64-bit version of Raspberry Pi OS to an SD card.

![Flash Raspberry Pi OS on an SD-card](/node-red-media/hardware/images/raspberry-pi-5-flash-os.png)

2. Before writing to the SD card, configure the OS for headless mode, including Wi-Fi, SSH, and authentication settings.

![Configure RPi OS before flashing](/node-red-media/hardware/images/raspberry-pi-5-config-before-flash.png)

3. Write the OS and configuration to the SD card. This process takes about 10 minutes.

4. Insert the SD card into the Raspberry Pi 5 and power it on. The device should appear on your network after a minute or so.

5. Connect to the Raspberry Pi using SSH:

    ```sh
    ssh pi@raspberrypi.local
    ```

## Getting Started

This guide explores how to install and run Node-RED through the FlowFuse Device Agent on the Raspberry Pi 5, enabling you to build, manage, and scale Node-RED flows efficiently from a remote location.



### Installing FlowFuse Device Agent

Before we start, it is recommended to update and upgrade your system to ensure all your packages are up to date:

```bash
sudo apt update && sudo apt upgrade -y
```

Next, let's install the FlowFuse device agent with the following script.

```bash
bash <(curl -sL https://raw.githubusercontent.com/FlowFuse/device-agent/main/service/raspbian-install-device-agent.sh)
```

This script installs the Node.js runtime (if not already installed), sets up the FlowFuse device agent, and configures the device to automatically run the FlowFuse agent on boot and restart it in case of a crash.

To verify that the service is running, use the following command:

```bash
sudo systemctl status flowfuse-device-agent.service
```

If running, you should see a result similar to the one shown in the image below:

!["Status of the FlowFuse Device Agent systemd service"](/node-red-media/hardware/images/systemctl-status.png "Status of the FlowFuse Device Agent systemd service"){data-zoomable}





### Registering the Device to Connect to FlowFuse

Once you have installed the FlowFuse Device Agent, you need to register the hardware to connect it to your FlowFuse team.

For instructions on how to register the hardware with your FlowFuse team, follow the documentation: [Register your Remote Instance](https://flowfuse.com/docs/device-agent/register/).

When registering your hardware, you will be presented with a dialog containing a one-time passcode command that the Device Agent uses to retrieve its configuration. **Make sure to copy it.**

!["Dialog containing a one-time passcode command that the Device Agent can use to retrieve its configuration"](/node-red-media/hardware/images/configuration-dailog-with-one-time-code.png "Dialog containing a one-time passcode command that the Device Agent can use to retrieve its configuration"){data-zoomable}

### Connecting Device

Execute the command you have copied with sudo as shown below

```bash
sudo flowfuse-device-agent -o <insert-your-three-word-token> https://app.flowfuse.com
```

Once executed, you should see an output similar to the one below, indicating that the FlowFuse Device Agent has been successfully configured:

```bash
[AGENT] 3/21/2025 7:09:25 PM [info] Entering Device setup...
[AGENT] 3/21/2025 7:09:27 PM [info] Device setup was successful
[AGENT] 3/21/2025 7:09:27 PM [info] To start the Device Agent with the new configuration, run the following command:
[AGENT] 3/21/2025 7:09:27 PM [info] flowfuse-device-agent
```

Now, you can check the remote instance in the FlowFuse platform, where its status should be displayed as **"running."**.




![Status of the remote instance in FlowFuse, showing its connection and operational state](/node-red-media/hardware/images/raspberry-pi-5.png "Status of the remote instance in FlowFuse, showing its connection and operational state."){data-zoomable}



## Accessing Node-RED Editor.

1. Login into your FlowFuse account.
2. Click on the remote instances option in the left sidebar.
3. Click on the device and enable the developer mode by clicking on the top right-corner switch.
4. Once Developer Mode is enabled, click on the Open Editor option located next to the that switch.

For more information refer to [FlowFuse documentation](/docs/user/introduction/#working-with-devices)

