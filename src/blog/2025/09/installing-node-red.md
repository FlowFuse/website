---
title: "Download and Install Node-RED for Production"
subtitle: Scale Node-RED from prototype to production with centralized management and 24/7 reliability
description: "Learn how to install and run Node-RED on various platforms, such as local computer, Raspberry Pi, Mac, Linux, or Cloud."
date: 2025-09-18
authors: ["sumit-shinde"]
image: 
keywords: "download node-red, download nodered, install nodered, install node-red, getting started with node-red"
tags:
    - flowfuse
    - node-red
---

Installing Node-RED is straightforward. install Node.js, run a command, and you’re ready for visual programming in industrial automation. The real challenge begins when it must run across production lines, connect to PLCs, and stay operational 24/7.

<!--more-->

## Local Setup

Testing Node-RED locally takes minutes. First, make sure you have Node.js installed:

```bash
sudo npm install -g --unsafe-perm node-red
node-red
```

If you are using Windows, do not start the command with sudo:

```bash
npm install -g --unsafe-perm node-red
node-red
```

Open `http://localhost:1880` in your browser and start connecting nodes. You can quickly build flows that read sensors, control actuators, and process data. While this setup is perfect for development and small projects, a true production environment has far greater requirements.

## Production Requirements

Local Node-RED works great for testing, but production is different. When your flows control PLCs and critical equipment, downtime costs thousands per minute.

Hardware fails. Networks drop. Power cuts out. Your Node-RED instance must restart automatically, handle connectivity issues, and keep production running without manual intervention. Deploying, managing and scaling must be easy and quick in such environments.

Managing dozens of industrial PCs running Node-RED? You need centralized updates, secure remote access, proper backups, and role-based permissions. Your engineering team's months of flow development can't be lost to a hardware failure.

Production Node-RED needs enterprise reliability, security, and management capabilities that the basic installation simply can't provide.

## **FlowFuse for Production**

FlowFuse makes Node-RED production-ready with centralized management across industrial infrastructure.

When hardware fails, FlowFuse keeps operations running through High Availability mode that distributes processing across multiple instances. Device Agents monitor system health and provide secure remote access for engineering teams.

Engineering teams get proper DevOps workflows that move flows through development, testing, and production with automated deployments. Device grouping makes updates reach thousands of devices possible while version control and rapid rollbacks keep projects on track.

Enterprise security comes built-in with single sign-on, role-based access control, comprehensive audit logging, and encrypted communications. Automated snapshots protect engineering work with rapid recovery when needed.

These core capabilities are just the foundation—FlowFuse includes dozens of additional features designed specifically for industrial environments.

## Setting Up FlowFuse

Sign up for the [14-day trial](https://app.flowfuse.com/account/create) at FlowFuse, and you can get started immediately.

### Step 1: Add Remote Instance

Once the platform opens:

1. Click on **Remote Instances** from the left sidebar

![FlowFuse Platform Dashboard](./images/platform-ff.png){data-zoomable}
*FlowFuse platform dashboard showing Remote Instances option*

2. Click **Add Remote Instance**

![Add Remote Instance Button](./images/add-remote-instance.png){data-zoomable}
*Button to add a new remote Node-RED instance*

3. Give it a name and select the device type

![Device Instance Configuration](./images/trail-add-instance.png){data-zoomable}
*Configuring the remote device instance with name and type*

4. Select your application and click **Add**

### Step 2: Install Device Agent

FlowFuse shows you a device configuration window with two options. The **One-Line Install** handles everything automatically. It installs Node.js if missing, installs the device agent, and registers your device with the platform.

The **NPM Installation** method provides manual instructions for Windows, Mac, or Linux.

![FlowFuse Device Configuration Window](./images/device-configuration-window-2.gif){data-zoomable}
*Device configuration window showing installation options for the FlowFuse Device Agent*

Follow the steps given within the window, which takes less than a minute to connect your device.

### Step 3: Manage Your Device

Once registered, you get complete control over your remote Node-RED instance through FlowFuse's management interface:

![FlowFuse Device Management Tools](./images/ff-instance-tools.gif){data-zoomable}
*Tools for managing Node-RED instance remotely via FlowFuse*

There are even more features available at the application level and team level that you can explore. To remove infrastructure management complexity of required services such as MQTT and PostgreSQL, they are built-in and available for use.

### Step 4: Start Building

To start building flows:

1. Enable **Developer Mode** from the top right

![Developer Mode Option](./images/developer-mode.png){data-zoomable}
*Developer Mode Option*

2. Click **Open Editor**

![Developer Mode Option](./images/open-editor.png){data-zoomable}
*Developer Mode Option*

Your automation flows now run with production reliability. Remote access works securely, and your team can collaborate while production continues running.

![Developer Mode Option](./images/node-red-editor.png){data-zoomable}
*Developer Mode Option*

## Up Next

FlowFuse bridges the gap between Node-RED's simplicity and production reliability requirements.

Ready to see FlowFuse in action? [Book a demo](https://flowfuse.com/book-demo/) and we'll show you how it works with your setup.