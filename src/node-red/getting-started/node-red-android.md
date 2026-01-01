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

# Installing Node-RED on Android

You can run Node-RED on Android devices using Termux, a terminal emulator and Linux environment app. This guide walks you through the installation process and helps you get Node-RED running on your Android phone or tablet.

## Prerequisites

- Android device running Android 7.0 or later
- At least 1GB of free storage space
- Stable internet connection for downloading packages

## Installation Steps

### 1. Install Termux

Download and install Termux from [F-Droid](https://f-droid.org/packages/com.termux/). Note that the Google Play Store version is outdated and no longer maintained.

**Important:** Do not install Termux from the Google Play Store. Use F-Droid instead.

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

2. Access Node-RED from another device using:

```
http://YOUR_ANDROID_IP:1880
```

## Device Access

You can get direct access to various hardware on the device by using the extra Termux device plugins - which can then be accessed via Node-RED using the `exec` node.

Note: you need to install both the add-on app, and also the add-on API in Termux.

1. Install add-on app - [Termux:API](https://f-droid.org/en/packages/com.termux.api/) from the same source you got Termux
2. Install add-on access into Termux:

```bash
pkg install termux-api
```

3. Use the [node-red-contrib-termux-api](https://flows.nodered.org/node/node-red-contrib-termux-api) node to access device features like camera, GPS, sensors, and more

Learn more about [how to use Termux API](https://wiki.termux.com/wiki/Termux:API).

## Autostarting Node-RED

The recommended way of starting applications running in Termux is using the [Termux:Boot](https://f-droid.org/en/packages/com.termux.boot/) application (available from F-Droid - note that the Play Store version may not be maintained, and it's recommended to use the same source that you installed Termux from).

We have found this other app useful for autostarting Termux on boot - [Autostart - No Root](https://play.google.com/store/apps/details?id=com.autostart) (Note: with Termux:Boot, use of other autoboot apps does not seem to be required).

Note that the shebang in the Node-RED script is incompatible with Termux:Boot scripts. The workaround is to start Node-RED using a Termux:Boot startup script like:

```bash
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
node /data/data/com.termux/files/usr/bin/node-red
```

## Limitations

Running Node-RED on Android has some limitations:

- Performance depends on your device's hardware
- Some nodes may not work due to Android/Termux limitations
- Battery consumption can be significant for long-running instances
- Background execution may be restricted by Android's power management
