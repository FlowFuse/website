---
title: Migrating from Self-Managed Node-RED to FlowFuse-Managed Node-RED
subtitle: A Step-by-Step Guide to Transitioning Your Node-RED Flows to a Streamlined FlowFuse Environment
description: Discover how to migrate from a self-managed Node-RED setup to a FlowFuse-managed environment, including step-by-step instructions for instance creation, data backup, and snapshot deployment.
date: 2024-11-06
authors: ["sumit-shinde"]
image: 
tags:
   - node-red
   - devops
---

In this article, you will learn how to migrate from a self-managed and self-hosted Node-RED setup to a FlowFuse-managed environment and how that flow works for both edge devices and remote instances.

## What is FlowFuse?

[FlowFuse](/) is a platform that helps engineers easily build and manage their Node-RED solutions for digitalizing operations. It allows teams to connect IT and OT environments, making it simple to connect, collect, transform, and visualize data to improve industrial workflows.

## Why Switch from Self-Managed Node-RED to FlowFuse-Managed Node-RED?

Node-RED is a powerful low-code tool that connects hardware devices, APIs, and various services. It enables the transformation, contextualization, and visualization of data, making it increasingly popular in IIoT (Industrial Internet of Things) environments. While Node-RED is easy to install, deploying it on servers often requires technical expertise and presents several challenges. In IIoT use cases, the growing need for multiple instances—one for each device—adds complexity, making the deployment even more challenging.

Transitioning from a self-managed Node-RED setup to a FlowFuse-managed environment offers significant benefits. Self-hosting Node-RED introduces challenges such as deployment difficulties, security concerns, operational issues, and the complexities of remotely accessing edge devices securely.

With FlowFuse, you can concentrate on building innovative solutions, while we handle the complexities of infrastructure, security, and scalability—empowering you to deliver results faster and more efficiently. For more information on how FlowFuse centralizes Node-RED instance management, while ensuring secure, scalable, and high-performance solutions refer to Article: [Transform Chaos into Control: Centralize Node-RED Management with FlowFuse](/blog/2024/10/managing-node-red-instances-in-centralize-platfrom/).

## Migrating from Node-RED to FlowFuse

Before you start, make sure you have an FlowFuse Account created and Next, consider how your Node-RED instance needs to be deployed. Decide whether it should run **on the device itself** or as a **remote instance**. 

Running Node-RED on the device is ideal when you need direct access to hardware components, such as reading sensors or controlling actuators. This setup allows for immediate data processing and control, which is crucial for applications requiring real-time responses.

On the other hand, if your use case involves monitoring or collecting metrics—such as through MQTT—without needing direct hardware interaction, a **remote instance** may be more suitable. This option allows you to centralize data collection and processing, making it easier to manage and analyze data from multiple devices.

### Creating a Remote Instance

Creating a remote instance is necessary in both cases. The FlowFuse snapshot feature, accessible via the `flowfuse-nr-plugin`, does not support direct device snapshots. Instead, you must first create a snapshot for the remote instance and then assign it as the target for your device.

1. Navigate to the FlowFuse platform and log in to your account.
2. Select the application under which you want to manage your Node-RED instance. You can either choose the default application created with your account or click the "Create Application" button to create a new one.
3. Once inside the application, select "Add Instance."
4. Enter a name (or let the system generate one automatically), select the instance type, and choose the Node-RED version that matches your current setup.
5. Click "Create" to launch the instance. You can now manage this Node-RED instance remotely via FlowFuse.

### Creating a Device Instance and Connecting It to FlowFuse

Now if your Node-RED instance that needs to be migrated can on the remote instance  then you can skip the section but, If you need to run Node-RED on the device itself, follow the steps given below.

1. Navigate to the remote instance you created above.
2. Go to the "Devices" tab and select "Add Device."
3. Once you click "Add Device," a device configuration popup will appear. Copy the command provided and save it for later.
4. Follow the steps to install the FlowFuse agent on your device as given in this [documentation](/docs/device-agent/install/).
5. Execute the saved command on the device.
6. Start the FlowFuse device agent by executing the following command:

```bash
   flowfuse-device-agent --port=1881
```

Running on port `1881` ensures it doesn't conflict with your locally running Node-RED instance, allowing both to run without issues.

### Creating Essential Backups Before Migration

Creating a remote instance is essential for the migration process, regardless of whether your Node-RED instance will run on the device or as a remote setup. Self-managed or locally running Node-RED does not support direct snapshots for devices. Therefore, you must first create a snapshot for the remote instance before deploying it to the device.

Follow these steps to create a remote instance:

1. Install the `@flowfuse/nr-tools-plugin` into your Node-RED instance from the Palette Manager, which will help create the snapshots from Node-RED instance.
2. Once installed, open the FlowFuse tools tab in the sidebar.
3. Connect to your FlowFuse account by clicking the "Connect to FlowFuse" button.
4. A browser popup will appear asking you to log in to your FlowFuse account (if not already logged in). Grant permission by clicking "Allow."
5. After authorization, you’ll see options to select the team and associated instances in the FlowFuse tools tab.
6. Select the Team and Node-RED instance you want to migrate to or going to use to take snapshot for your device.
7. Click the "+ Snapshot" button to create a snapshot. A popup will appear asking for a name, description. Enter the details and click "Create."
8. Once the snapshot is created, it will be listed in the sidebar.
9. To confirm, go to the FlowFuse platform, navigate to the FlowFuse instance, and switch to the "Snapshots" tab. The snapshot you created should be listed there.

### Backing Up System-level Environment Variables

While the snapshot captures flows, credentials, and environment variables at the flow and global level, it does not capture **process environment variables**—those set in the Node-RED `settings.json` file.

To get these variables, you can use the following flow to dump a list of all process environment variables into the debug window:

{% renderFlow %}
[{"id":"3ed886625239a5d0","type":"function","z":"a87879f70edc3463","name":"process.env","func":"msg.payload = process.env\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[{"var":"process","module":"process"}],"x":650,"y":480,"wires":[["9ca3edbd6857853f"]]},{"id":"b35ef390a46ff129","type":"inject","z":"a87879f70edc3463","name":"List env vars","props":[{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":430,"y":480,"wires":[["3ed886625239a5d0"]]},{"id":"9ca3edbd6857853f","type":"debug","z":"a87879f70edc3463","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":880,"y":480,"wires":[]}]
{% endrenderFlow %}

1. Import and deploy the flow into your  sefl-managed Node-RED instance.
2. Click the Inject button.

Once clicked, the flow will print all environment variables in the debug window. Identify the environment variables required for your flow and save them in a notepad for later use.

### Setting System-Level Environment Variables in FlowFuse

Now that you have created the snapshots and copied the process environment variables, you need to set these variables in the Node-RED instance to avoid errors during deployment.

1. Go to the Node-RED Remote/Device instance.
2. Switch to the environment tab by clicking the "Environments" option at the top.
3. Add the environment variables one by one by clicking the "+ Add" button in the bottom-left corner.
4. After adding all the environment variables, click "Save."

For more information refer to [Using Environment Variables in Node-RED](/blog/2023/01/environment-variables-in-node-red/)

### Migrating Static Assets to FlowFuse Static Assets

When working with dashboards or files required in your Node-RED project, these files are typically stored locally and are always available, even if you restart or modify the flows. However, when migrating from Node-RED to a FlowFuse cloud environment, you'll need to manually migrate these files to the cloud-based Node-RED instances. To make this process easier, FlowFuse offers a static assets service feature at the instance level.

Here’s how you can migrate your assets:

1. Locate your static assets in your local system that are used in your Node-RED instance from the snapshot we have taken.
2. Upload them one by one through the Instance Static Assets tab. For more information, refer to the [Static Asset Service documentation]( /docs/user/static-asset-service/).

Once you have migrated all your assets, you will be able to access them in the instance created in FlowFuse cloud. Just ensure that after deploying the snapshot, the path set in the flow matches the static assets migrated to the FlowFuse instance.

### Deploying Snapshot for the Remote/Device instance

Once the System-level environment variables are set, your good to deploy that captured snapshot in the Device or the Remote instance.

1. Navigate to the remote instance for which you created the snapshot, either to migrate your current Node-RED setup or to prepare it for later deployment on a device.
2. Switch to the "Snapshots" tab at the top to locate the snapshot you created from the list.
3. On the right side of the snapshot, click the three-dot icon:

   - If you are migrating to the remote instance, select **"Restore Snapshot."**
   - If you are migrating to a Device Instance, select **"Set as Device Target."**

Setting as device target will ensure that the snapshot will be deployed on all of the devices assigned to this instance.

## Conclusion

Migrating your Node-RED instance to FlowFuse centralizes management and simplifies deployment. Once migrated, FlowFuse takes care of the infrastructure, security, and scalability, making the process much easier. This allows you to focus on building solutions without worrying about the complexities of self-hosting. Whether you're working with edge devices or remote instances, this migration streamlines the management of your IIoT workflows, improving efficiency and scalability.
