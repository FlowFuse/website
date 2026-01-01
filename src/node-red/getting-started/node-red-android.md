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

***Note: Node-RED and FlowFuse are not affiliated with Termux or F-Droid. These are independent third-party applications that enable running Node-RED on Android devices. Use them at your own discretion.***

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

## Running Node-RED in the Background

To keep Node-RED running when you close Termux, you can use `nohup`:

```bash
nohup node-red &
```

To stop Node-RED when running in the background:

```bash
pkill -f node-red
```

## Accessing Node-RED from Other Devices

To access Node-RED from other devices on your local network:

1. Find your Android device's IP address:

```bash
ifconfig
```

Look for your IP address (typically starting with 192.168.x.x or 10.x.x.x)

2. Start Node-RED with the `-a` flag to bind to all network interfaces:

```bash
node-red -a 0.0.0.0
```

3. Access Node-RED from another device using:

```
http://YOUR_ANDROID_IP:1880
```

**Security Note:** Only do this on trusted networks. Consider adding authentication if exposing Node-RED to your network.

## Autostart Node-RED on Termux Launch

To automatically start Node-RED when you open Termux:

1. Create a `.bashrc` file:

```bash
nano ~/.bashrc
```

2. Add the following line:

```bash
node-red
```

3. Save and exit (Ctrl+X, then Y, then Enter)

Now Node-RED will start automatically whenever you open Termux.

## Common Issues and Solutions

### Installation Fails

If the installation fails, try:

```bash
pkg install nodejs-lts
npm install -g --unsafe-perm node-red
```

### Cannot Access Editor

- Ensure Node-RED is running in Termux
- Check that you're using the correct URL: `http://127.0.0.1:1880`
- Try restarting Node-RED

### Termux Closes and Stops Node-RED

Android's battery optimization may kill Termux. To prevent this:

1. Go to Android Settings → Apps → Termux
2. Disable battery optimization for Termux
3. Enable "Run in background" permission

### Out of Memory Errors

If you encounter memory issues:

```bash
node-red --max-old-space-size=256
```

This limits Node.js memory usage to 256MB, suitable for most Android devices.

## Limitations

Running Node-RED on Android has some limitations:

- Performance depends on your device's hardware
- Some nodes may not work due to Android/Termux limitations
- Battery consumption can be significant for long-running instances
- Background execution may be restricted by Android's power management
