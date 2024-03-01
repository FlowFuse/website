---
title: "Run FlowFuse on Siemens IoT2050"
subtitle: How to install FlowFuse Device Agent on Siemens IoT2050
description: In this guide, we will discuss how to install FlowFuse Device agent on Siemens IoT2050.
date: 2024-03-04
authors: ["grey-dziuba"]
image: /blog/2024/03/images/using_webcam_with_node-red.png
tags:
    - posts
    - flowfuse
---

Siemens [announced](https://press.siemens.com/global/en/pressrelease/new-siemens-gateway-between-cloud-company-it-and-production) the IoT2000 series in March of 2020.  With this tool many have been using it to function as a gateway between their plant operations and cloud infrastructure.  Onboard it came with Node-RED pre installed.  In this guide we will show you how to install the FlowFuse device agent.  

<!--more-->

## Prerequisites 

In this guide we will be working with the IoT2050 Advanced, *6ES7 647-0BA00-1YA2*. The device has been [upgraded](https://support.industry.siemens.com/cs/attachments/109741799/IOT2050_How_To_Firmware_Update_V1.3.pdf) to the latest firmware at the time of writing this article of v1.3.1.  We will be leveraging the IOT2050_Example_Image_V1.3.1.zip image which is a debian base OS.  To complete this guide, knowledge of linux based cli is necessary.  Documentation to complete these requirements can be found [here](https://support.industry.siemens.com/cs/document/109741799/downloads-for-simatic-iot20x0?dti=0&lc=en-GB).  Our boot order is the following:

## Guide

<div style="background-color: #fff4b9; border:1px solid #ffc400; color: #a27110; padding: 12px; border-radius: 6px; font-style: italic;">Warning: updating Node.js will break mraa library.<code style="background-color: transparent;">@flowfuse</code> This will prevent communication to the I/O of the device. <code style="background-color: transparent;">@flowfuse/node-red-dashboard</code>, and not <code style="background-color: transparent;">@flowforge</code>.</div>

First we need to run the standard updates.

```cli
apt-get update
apt-get upgrade
```

If you need to migrate your existing Node-RED follow these [instruction](https://flowfuse.com/docs/migration) to backup your existing progress.  From there we will need to remove the existing service that autostart Node-RED by running the following command and reboot:

```cli
systemctl disable node-red.service
reboot -h now
```

Confirm that your Node-RED instance is no longer running.

Now it is time to upgrade your Node.js version.  To check the version before we get started run ```node -v```.  Then install a tool that will allow you to change your versions of Node.js with the following command.

```cli
npm install n -g
```

Next we will install the version 18.17.x (LTS) of Node.js.

```cli
n v18.17
```

From here we can now follow the instructions to [install](https://flowfuse.com/docs/device-agent/install/) the FlowFuse Device agent.  Then to connect your FlowFuse Device Agent follow these [instructions](https://flowfuse.com/docs/device-agent/register/).

Lastly, if you want your device to run on boot.  Follow these [instructions](https://flowfuse.com/blog/2023/05/device-agent-as-a-service/).