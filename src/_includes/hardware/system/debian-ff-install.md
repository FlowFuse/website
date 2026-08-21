### Installing FlowFuse Device Agent

Before we start, it is recommended to update and upgrade your system to ensure all your
packages are up to date:

```bash
sudo apt update && sudo apt upgrade -y
```

Next, download and run the FlowFuse Device Agent installer:

```bash
/bin/bash -c "$(curl -fsSL https://flowfuse.github.io/device-agent/get.sh)" && ./flowfuse-device-agent-installer
```

The installer sets up a Node.js runtime, installs the FlowFuse Device Agent, and registers
it as a system service so it starts on boot and restarts after a crash. It then steps you
through connecting the device to your FlowFuse team.

If the device already runs Node-RED, the installer finds those flows and offers to import
them.
