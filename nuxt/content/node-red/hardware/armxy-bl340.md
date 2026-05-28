---
title: "Setting Node-RED on BLIIOT ARMxy BL340"
description: "Guide to setting up Node-RED on BLIIOT ARMxy BL340, including installation and configuration steps."
---

The BLIIOT ARMxy BL340 is a high-performance single-board computer designed for demanding applications, including edge computing, automation, and embedded systems. Featuring an octa-core ARM processor, advanced connectivity options, and support for high-speed storage, it provides a powerful platform for developers and engineers.

Integrating this powerful hardware with FlowFuse not only enhances its capabilities but also simplifies the management and deployment process.

## Prerequisites

Before proceeding with the installation, ensure you have the following:

- **BLIIOT ARMxy BL340** – A functioning device with internet access.
- **FlowFuse Account** - Ensure you have a FlowFuse account. If not, you can create a free account that allows you to manage up to two edge devices for free. For more information, refer to [FlowFuse Free Tier](/blog/2024/12/flowfuse-release-2-12/)
- **Sudo Privileges** – Administrator access to install required packages.

## Getting Started

This guide explores how to install and run Node-RED through the FlowFuse Device Agent on the BLIIOT ARMxy BL340, enabling you to build, manage, and scale Node-RED flows efficiently from a remote location.



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




!["Status of the BLIIOT ARMxy BL340 remote instance in FlowFuse, showing its connection and operational state"](/node-red-media/hardware/images/status-flowfuse.png "Status of the BLIIOT ARMxy BL340 remote instance in FlowFuse, showing its connection and operational state"){data-zoomable}

Now, when your device reboots, the FlowFuse Device Agent will automatically start, ensuring that your BLIIOT ARMxy BL340 remains connected to the FlowFuse platform.



## Accessing Node-RED Editor.

1. Login into your FlowFuse account.
2. Click on the remote instances option in the left sidebar.
3. Click on the device and enable the developer mode by clicking on the top right-corner switch.
4. Once Developer Mode is enabled, click on the Open Editor option located next to the that switch.

For more information refer to [FlowFuse documentation](/docs/user/introduction/#working-with-devices)


