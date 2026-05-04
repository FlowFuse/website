---
eleventyNavigation:
  key: Node-RED On Android
  order: 4
  parent: Getting Started
meta:
  title: Installing Node-RED on Android
  description: Learn how to install and run Node-RED on Android devices using Termux
  keywords: node-red android, termux, android installation, mobile node-red
---

# {{ meta.title }}

You can run Node-RED on Android devices using Termux, a terminal emulator and Linux environment app. This guide walks you through the installation process and helps you get Node-RED running on your Android phone or tablet.

## Prerequisites

- Android device running Android 7.0 or later
- At least 1GB of free storage space
- Stable internet connection for downloading packages

## Installation Steps

### 1. Install Termux

Download and install Termux from [F-Droid](https://f-droid.org/packages/com.termux/). Note that the Google Play Store version is outdated and no longer maintained.

**Note:** Node-RED and FlowFuse are not affiliated with Termux or F-Droid. These are independent third-party applications that enable running Node-RED on Android devices. Use them at your own discretion.

### 2. Update Termux Packages

Open Termux and update the package repository:

```bash
pkg update && pkg upgrade
```

Press `Y` when prompted to confirm the updates.

### 3. Install Node.js

Install Node.js and npm:

```bash
pkg install nodejs
```

Verify the installation:

```bash
node --version
npm --version
```

### 4. Install Node-RED

Install Node-RED globally using npm:

```bash
npm install -g --unsafe-perm node-red
```

The `--unsafe-perm` flag is necessary for the installation to complete successfully on Termux.

### 5. Start Node-RED

Launch Node-RED:

```bash
node-red
```

You should see output indicating that Node-RED has started. Look for a line similar to:

```
[info] Server now running at http://127.0.0.1:1880/
```

### 6. Access the Editor

Open a web browser on your Android device and navigate to:

```
http://127.0.0.1:1880
```

You should see the Node-RED editor interface.

## Accessing Node-RED from Other Devices

To access Node-RED from other devices on your local network:

1. Find your Android device's IP address:

```bash
ifconfig
```

Look for your IP address (typically starting with 192.168.x.x or 10.x.x.x)

2. Access Node-RED from another device using:

```
http://YOUR_ANDROID_IP:1880
```

## Security Considerations

**Important:** By default, Node-RED runs without any authentication or encryption. This means anyone who can access the editor URL can view and modify your flows.

Before accessing Node-RED from other devices on your network, make sure to secure your installation by enabling authentication and following security best practices.

For detailed instructions on securing Node-RED, including enabling authentication, HTTPS, and other security features, refer to the official [Node-RED Security documentation](https://nodered.org/docs/user-guide/runtime/securing-node-red).

## Device Access

You can get direct access to various hardware on the device by using the extra Termux device plugins - which can then be accessed via Node-RED using the `exec` node.

Note: you need to install both the add-on app, and also the add-on API in Termux.

1. Install add-on app - Termux:API from the same source you got Termux
2. Install add-on access into Termux:

```bash
pkg install termux-api
```

3. Use the [node-red-contrib-termux-api](https://flows.nodered.org/node/node-red-contrib-termux-api) node to access device features like camera, GPS, sensors, and more

Learn more about [how to use Termux API](https://wiki.termux.com/wiki/Termux:API).

## Limitations

Running Node-RED on Android has some limitations:

- Performance depends on your device's hardware
- Some nodes may not work due to Android/Termux limitations
- Battery consumption can be significant for long-running instances
- Background execution may be restricted by Android's power management
