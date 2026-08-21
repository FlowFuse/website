---
eleventyNavigation:
  key: Install Node-RED
  order: 2
  parent: Getting Started
meta:
  title: How to Install Node-RED
  description: Install Node-RED on Linux, macOS, Windows or a Raspberry Pi, either as a managed instance with one command or standalone with npm.
  keywords: install node-red, node-red installation, install node-red raspberry pi, install node-red windows, node-red setup
---

# {{ meta.title }}

There are two ways to install Node-RED. Which one you want depends on whether the machine is
something you will come back to later.

## Option 1: One command, managed

This installs Node-RED as a managed remote instance. One command sets up a Node.js runtime,
Node-RED, the FlowFuse Device Agent, and a system service that restarts the instance on boot
and after a crash. The installer then opens your browser so you can register the machine. It
creates a FlowFuse account for you if you do not have one.

If the machine already runs Node-RED, the installer finds those flows and offers to import
them, so you can move an existing setup across without rebuilding it.

**Linux and macOS**

```bash
/bin/bash -c "$(curl -fsSL https://flowfuse.github.io/device-agent/get.sh)" && ./flowfuse-device-agent-installer
```

**Windows**, in an elevated PowerShell terminal:

```bash
Set-Location $env:USERPROFILE; powershell -c "irm https://flowfuse.github.io/device-agent/get.ps1 | iex"; .\flowfuse-device-agent-installer.exe
```

If port 1880 is already in use, the installer stops and tells you. Add `--port 1881` to the
end of the command to use a different port.

The [Device Agent quick start](/docs/device-agent/quickstart/) walks through each prompt.

## Option 2: Standalone with npm

This gives you plain Node-RED on one machine, with nothing managing it. It is the right
choice for a quick experiment on your laptop.

Install Node.js 20 or later first, then:

```bash
npm install -g --unsafe-perm node-red
```

Start it:

```bash
node-red
```

Open `http://localhost:1880` in your browser. The Node-RED project also publishes
[platform-specific install guides](https://nodered.org/docs/getting-started/) covering
Docker, Raspberry Pi and Windows.

## Which one should I pick

| | One command, managed | Standalone with npm |
| --- | --- | --- |
| Node.js installed for you | Yes | No |
| Restarts on boot and after a crash | Yes | You set this up |
| Remote access to the editor | Yes | Local network only |
| Flow backups and rollback | Yes | You set this up |
| Deploy the same flows to more machines | Yes | Copy by hand |
| Needs a FlowFuse account | Yes, created during install | No |

For anything that has to keep running once you walk away from it, take the first option.
Read [why standalone Node-RED runs into trouble in production](/blog/2025/09/installing-node-red/)
for the longer version of that argument.

## Next steps

- [Find your way around the editor](/node-red/getting-started/editor/)
- [Change the port Node-RED runs on](/node-red/getting-started/node-red-port/)
- [Keep Node-RED up to date](/node-red/getting-started/update-node-red/)
- [Set Node-RED up on specific hardware](/node-red/hardware/)
