---
eleventyNavigation:
  key: Siemens IoT2050
  parent: Hardware
meta:
  title: Run Node-RED on Siemens IoT2050
  description: In this guide, we will discuss how to install FlowFuse Device agent on Siemens IoT2050.
  keywords: node-red, flowfuse, siemens iot2050 flowfuse
image: "/node-red/hardware/images/siemens-iot-2050.jpg"
specifications:
  Model: IOT2050 Basic
  RAM_MB: 1024
  Processor: ARM TI AM6528 GP
  GPIO: x20 Digital I/O
  Connectivity: 1x RS 232 / 422 / 485, Ethernet, USB 2.0, Arduino, mPCIe
  Clock Speed: 1 GHz
  Storage: SD Card
layout: layouts/hardware.njk
---

Siemens [announced](https://press.siemens.com/global/en/pressrelease/new-siemens-gateway-between-cloud-company-it-and-production) the IoT2000 series in March of 2020.  With this tool many have been using it to function as a gateway between their plant operations and cloud infrastructure.  Onboard it came with Node-RED pre-installed. To manage Node-RED as an organization the FlowFuse agent is recommended, this documentation shows you how to do so.

<div style="background-color: #fff4b9; border:1px solid #ffc400; color: #a27110; padding: 12px; border-radius: 6px; font-style: italic;">Warning: Later in the documentation we will be updating Node.js. This will break <a href="https://www.npmjs.com/package/mraa">MRAA</a> library. This will prevent communication to the GPIO of the device.</div>

## Goal

The goal of this documentation is to guide the user through the installation process of getting FlowFuse Device agent installed on an IoT2050. The IoT2050 comes pre-installed with version 12.22.x Node.js on the [IOT2050_Example_Image_V1.3.1](https://support.industry.siemens.com/cs/document/109741799/downloads-for-simatic-iot20x0?dti=0&lc=en-GB) image. A requirement to install FlowFuse Device Agent, Node.js needs to be upgraded to version 18 minimum.  We will be going through that process.

## Prerequisites 

We will be working with the IoT2050 Advanced, *6ES7 647-0BA00-1YA2*. The device has been [upgraded](https://support.industry.siemens.com/cs/attachments/109741799/IOT2050_How_To_Firmware_Update_V1.3.pdf) to the latest firmware at the time of writing this article of v1.3.1.  We will be leveraging the IOT2050_Example_Image_V1.3.1.zip image which is a Debian base OS.  To complete this guide, knowledge of Linux-based cli is necessary.  Documentation to complete these requirements can be found [here](https://support.industry.siemens.com/cs/document/109741799/downloads-for-simatic-iot20x0?dti=0&lc=en-GB).

## Step by Step Guide

1. First we need to run the standard updates.

```shell
apt-get update
apt-get upgrade
```

2. If you need to migrate your existing Node-RED follow these [instructions](/docs/migration) to backup your existing progress.  From there we will need to remove the existing service that autostarts Node-RED by running the following command and rebooting:

```shell
systemctl disable node-red.service
reboot -h now
```

3. Confirm that your Node-RED instance is no longer running.

```shell
systemctl status node-red
```

In the output look for the text that signifies the service has been stopped.

> iot2050-debian systemd[1]: Stopped Node-RED.


4. Now it is time to upgrade your Node.js version.  To check the version before we get started run ```node -v```.

You should see an output like this:

> v12.22.5


<div style="background-color: #fff4b9; border:1px solid #ffc400; color: #a27110; padding: 12px; border-radius: 6px; font-style: italic;">Warning: updating Node.js will break the <a href="https://www.npmjs.com/package/mraa">MRAA</a> library. This will prevent communication to the GPIO of the device. Details can be found <a href="https://support.industry.siemens.com/forum/WW/en/posts/iot2050-node-js-versions/297170">here</a>.</div>

Then, install a tool called *n* that will allow you to change your versions of Node.js with the following command.


```shell
npm install n -g
```

5. Next we will install the version 18.17.x (LTS) of Node.js.

```shell
n v18.17
```
Now run ```node -v``` again to confirm the installation.  You should see the latest version now installed.

> v18.17.1

6. Now that we have Node.js installed, we can proceed with the standard installation process.  First [install](/docs/device-agent/install/) the FlowFuse Device agent.  Then, to connect your FlowFuse Device Agent, follow these [instructions](/docs/device-agent/register/).

7. Lastly, if you want your device to run on boot.  Follow these [instructions](/blog/2023/05/device-agent-as-a-service/).

## Switching between versions of Node.js

Switching between versions of Node.js can now be completed by leveraging *n* command that was installed in step 4.  To do so simply run the following to switch back.

```shell
n v12.22.5
```

## More on MRAA

The MRAA library is a "Low Level Skeleton Library for Communication on GNU/Linux platform."  It has been key for various solutions to communicate to hardware boards GPIO, General Purpose Input Output.  The MRAA library only supports version 6.x.x of Node.js, but Siemens put in the effort to patch their deployment up to version 12.22.x of Node.js.
