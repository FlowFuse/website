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

!["Status of the FlowFuse Device Agent systemd service"](./images/systemctl-status.png "Status of the FlowFuse Device Agent systemd service"){data-zoomable}