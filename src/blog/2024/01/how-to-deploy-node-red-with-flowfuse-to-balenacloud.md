---
title: Step-by-Step Guide to Deploying Node-RED with FlowFuse in balenaCloud
subtitle: Fleet management made easier with FlowFuse and balena.
description: Deploy Node-RED with FlowFuse on balenaCloud effortlessly with our step-by-step guide. Simplify fleet management and enhance data processing capabilities.
date: 2024-01-30
authors: ["grey-dziuba"]
image: blog/2024/01/images/balena-and-flowfuse.png
tags:
    - posts
    - flowfuse
    - how-to
---

In a [recent webinar with balena](/webinars/2024/balena/), we explored the dynamic capabilities of deploying FlowFuse to a fleet of devices using [balenaCloud](https://www.balena.io/cloud). This blog post serves as a practical guide to replicate that process, specifically tailored for those aiming to streamline their deployment of FlowFuse in an efficient and user-friendly manner.

<!--more-->

## How to Implement FlowFuse with balenaCloud on a Fleet of devices

[![Deploying Node-RED with FlowFuse in balenaCloud](https://i.ytimg.com/vi/cKFu1ljUlKE/hqdefault.jpg)](https://www.youtube.com/watch?v=cKFu1ljUlKE "Deploying Node-RED with FlowFuse in balenaCloud")


### Preparation Steps
Before diving into the deployment process, it's crucial to familiarize yourself with key resources. We recommend reviewing our previous [blog post](/blog/2023/11/device-agent-balena/) on deploying the FlowFuse Device Agent via balena. This post contains a vital link to the GitHub repository, essential for deploying FlowFuse with balena, laying the groundwork for the steps ahead.

### Creating a New Fleet in balenaCloud
1. Navigate to the [FlowFuse git](https://github.com/FlowFuse/balena-device-agent) repository. Click on the **Deploy with balena** button.
2. Name your fleet.
3. Select your default device.
4. Click **Create and Deploy**.

### Adding Devices to the Fleet
Once your fleet is created, the next step is to add devices. To add a device to your fleet, follow these [instructions](https://docs.balena.io/learn/getting-started/var-som-mx6/rust/#add-a-device-and-download-os).

### Setting Up FlowFuse
Setting up FlowFuse correctly is essential for seamless operation:
1. Create a new instance within FlowFuse or use an existing one if you prefer. Follow these [instructions](/docs/user/introduction/#creating-a-node-red-instance) to create a new instance.
2. Create a **Device Provisioning Token** by following these [instructions](/docs/device-agent/register/#generating-%22provisioning-configuration%22).
3. Ensure you add the FlowFuse Node-RED application you want the devices to provision. If left at default, devices will need to be manually added to applications.

### Using the Device Provisioning Token
1. First, convert the contents of the Device Provisioning Token to base64. Follow these [instructions](/blog/2023/11/device-agent-balena/#environment-variable) to convert the file to base64.
2. Once converted, import this string into balena as a **Fleet** level variable, not a device level variable. Follow these [instructions](https://docs.balena.io/learn/manage/variables/#fleet-wide-variables) to import the Fleet level variable with the Name `FF_DEVICE_YML`.
3. This action will provision any new device added to the fleet with the yaml file configuration, automatically adding the device to a FlowFuse instance. 

### Deploying and Testing the FlowFuse Instance
Deploying the FlowFuse instance brings everything together:
1. Navigate to your FlowFuse application created earlier.
2. Go to your devices and you should now see your newly provisioned devices from balena.
3. If this is your first time setting up your fleet, the device will not have a snapshot. You will need to deploy a snapshot. Follow these [instructions](/docs/user/snapshots/#create-a-snapshot) to do so. Ensure that you select **Set Target Snapshot**.
4. Once complete, the FlowFuse instance will deploy to your device(s).

## Integrating InfluxDB (Optional)
Integrating InfluxDB enables effective data storage and management:
1. Similar to the previous steps, navigate to this [Github repository](https://github.com/mpous/flowfuse-agent-influx-balena/tree/main?tab=readme-ov-file) and click **Deploy with balena**.
2. This time, instead of creating a new fleet, select **Use an existing fleet instead**.
3. Choose your fleet for deployment and select **Deploy to fleet**.

### Data Generation and Management
For testing, we have created a flow to get you started. Follow this [link](https://flows.nodered.org/flow/66f37bb739b6cdb0c7ad3a4e2edd68ef) and import it. There are four sets of flows for you to begin with. The first is for data generation. The second is a manual data generation flow. The third is key as it initiates the creation of a database, in this case, **mydb**. The last flow is a simple query that pulls data from InfluxDB.
1. Import the flows into your FlowFuse instance of Node-RED and deploy. Follow these [instructions](/blog/2023/03/3-quick-node-red-tips-5/#2.-import-helpful-example-flows-provided-with-custom-nodes) for importing and exporting.
2. Return to Flowfuse, go to your instance, and create another [snapshot](/docs/user/snapshots/#create-a-snapshot).
3. Ensure that you **Set Target Snapshot**.

### Finalizing and Testing the Setup
The final steps ensure that your setup is fully operational:
1. Once deployed, navigate to the device.  
2. [Enable Developer Mode](/docs/device-agent/deploy/#editing-the-node-red-flows-on-a-remote-instance-that-is-assigned-to-an-application).
3. Next, click the newly revealed button, **Open Editor**, to access the deployed Flow.

### Conclusion
Implementing FlowFuse with balenaCloud significantly enhances your device management and data processing capabilities. This guide provides a foundational approach, but don't hesitate to delve deeper into each step to tailor the setup to your specific needs.
