---
title: Migrating from Self-Managed Node-RED to FlowFuse-Managed Node-RED
subtitle: A Step-by-Step Guide to Transitioning Your Node-RED Flows to a Streamlined FlowFuse Environment
description: Discover how to migrate from a self-managed Node-RED setup to a FlowFuse-managed environment, including step-by-step instructions for instance creation, data backup, and snapshot deployment.
date: 2024-11-13
authors: ["sumit-shinde"]
image: /blog/2024/11/images/migrating-from-self-managed-nr-to-flowfuse-managed-nr.png
keywords: node-red migration, node-red snapshot, node-red instance management, Cloud Instance management, edge device management,  node-red backup, node-red to flowfuse migration, flowfuse static assets, node-red deployment, cloud-based node-red, node-red instance snapshot
tags:
   - flowfuse
   - flowfuse features
---

Migrating your Node-RED instance to [FlowFuse](/) centralizes management and simplifies deployment. Once migrated, FlowFuse takes care of the infrastructure, security, and scalability, making the process much easier. This allows you to focus on building solutions without worrying about the complexities of self-hosting. Whether you're working with edge devices or want to work on cloud instances, this migration streamlines the management of your IIoT workflows, improving efficiency and scalability.

<!--more-->

Let's explore how to migrate from a self-managed and self-hosted Node-RED setup to a FlowFuse-managed environment. We'll look at how the migration works for both edge devices and cloud instances.

## Why Switch from Self-Managed Node-RED to FlowFuse-Managed Node-RED?

Managing self-hosted Node-RED instances can introduce a range of challenges, especially as your Industrial Internet of Things (IIoT) environment scales. These challenges include:

- **Deployment Complexity**: Installing and configuring Node-RED across multiple devices or environments requires technical expertise and attention to detail. For large-scale deployments, managing numerous instances across different devices or servers can become cumbersome and error-prone.

- **Security and Maintenance**: Ensuring your Node-RED instances are secure and up-to-date requires continuous monitoring, timely security patches, and ongoing maintenance. Keeping instances stable and secure can be time-consuming and requires dedicated resources to avoid vulnerabilities.

- **Scalability**: As your IIoT environment grows, scaling your Node-RED infrastructure to handle increased workloads can be challenging. Managing multiple distributed instances often leads to inconsistencies and difficulties in maintaining optimal performance across your entire system.

- **Edge Device Management**: Managing Node-RED instances on edge devices introduces additional complexity. Remote access, secure monitoring, and seamless updates become more difficult as your network expands, especially when dealing with a large number of edge devices.

FlowFuse addresses these challenges by providing a fully managed, secure, and scalable environment for your Node-RED instances. With FlowFuse, you can focus on building and deploying your IIoT solutions, while FlowFuse handles the infrastructure, updates, and scalability. This reduces operational overhead and ensures your instances remain up-to-date and secure.

For more information, read the article: [Transform Chaos into Control: Centralize Node-RED Management with FlowFuse](/blog/2024/10/managing-node-red-instances-in-centralize-platfrom/).

## Migrating from Node-RED to FlowFuse

Before you start, make sure you have a FlowFuse Account created. Next, consider how your Node-RED instance needs to be deployed. Decide whether it should run on the edge device or as a cloud instance. 

Running Node-RED on an edge device is ideal when your application flow needs direct access to hardware components, such as reading sensors or controlling actuators. This setup allows immediate data processing and control, crucial for applications requiring low latency responses.

On the other hand, if your use case involves monitoring or collecting metrics—such as through MQTT—without needing direct hardware interaction, and you primarily need to transform, contextualize, visualize, or automate repetitive tasks that don't require hardware interaction, a **Cloud Instance** may be more suitable. This option allows you to centralize data collection and processing, making it easier to manage and analyze data from multiple devices.

*Note: The instructions provided in this article also work for [self-hosted](/docs/install/introduction/) FlowFuse environments. Just ensure that when following the steps, you're performing the actions within your self-hosted FlowFuse setup rather than the FlowFuse cloud platform.*

### Creating a Cloud Instance

The FlowFuse snapshot feature, available through the `@flowfuse/nr-tools-plugin` for self-managed Node-RED (a plugin that allows you to create snapshots from a self-managed Node-RED instance to the FlowFuse platform), However, it does not support direct device snapshots. Instead, you must first create a snapshot for the Cloud Instance and then assign it as the target for your device.

1. Navigate to the FlowFuse platform and log in to your account.
2. Select the application under which you want to manage your Node-RED instance. You can either choose the default application created with your account or click the "Create Application" button to create a new one.
3. Once inside the application, select "Add Instance."
4. Enter a name (or let the system generate one automatically), select the instance type, and choose the Node-RED version that matches your current setup.
5. Click "Create" to launch the instance.

### Creating a Device Instance and Connecting It to FlowFuse

If you need to run Node-RED on the edge device itself but want to manage it remotely, follow the steps below. Skip this step if your Node-RED Application flow can run on the cloud.

1. Navigate to the cloud instance you created above.
2. Go to the "Devices" tab by clicking on top "Devices" option and select "Add Device".
3. Once you click "Add Device", a device configuration popup will appear. Copy the command provided and save it for later.
4. Follow the steps to install the FlowFuse Device Agent on your device as given in this [documentation](/docs/device-agent/install/).
5. Execute the saved command on the device.
6. Start the FlowFuse device agent by executing the following command:

```bash
   flowfuse-device-agent --port=1881
```

Running on port `1881` ensures it doesn't conflict with your locally running Node-RED instance, allowing both to run without issues.

### Creating Essential Backups Before Migration

Creating a cloud instance is essential for the migration process, regardless of whether your Node-RED instance will run on the device or on the cloud. As discussed earlier, the `@flowfuse/nr-tools-plugin` does not support creating direct snapshots for devices on the platform. Therefore, you must first create a snapshot for the cloud instance before deploying it to the device.

Follow these steps to create a cloud instance:

1. Install the `@flowfuse/nr-tools-plugin` into your Node-RED instance via the Palette Manager.
2. Once installed, open the "FlowFuse tools" tab in the sidebar.
3. Connect to your FlowFuse Cloud account by clicking the "Connect to FlowFuse" button.  
   *(If you're migrating to a self-hosted FlowFuse instance, ensure you configure the plugin with the correct URL. For detailed steps, refer to the [FlowFuse Node-RED Tools plugin Documentation](/docs/migration/node-red-tools/#connecting-to-flowfuse))*.
4. A browser popup will appear, prompting you to log in to your FlowFuse account. Click "Allow" to grant permission.
5. After successful authorization, you'll be able to select your team and the associated instance from the "FlowFuse tools" tab.
6. Choose the team and FlowFuse instance you want to migrate to or the one you will use to take snapshots for your device.
7. Click the "+ Snapshot" button to create a snapshot. A popup will appear asking for a name and description. Enter the required details and click "Create".
8. Once the snapshot is created, it will be listed in the sidebar.
9. To verify, navigate to the FlowFuse platform, go to the FlowFuse Cloud instance you created earlier, and switch to the "Snapshots" tab. The snapshot you created should be visible there.

#### Backing Up System-level Environment Variables

While the snapshot captures flows, credentials, and environment variables at the flow and global level, it does not capture **process environment variables**—those set in the Node-RED `settings.json` file.

To get these variables, you can use the following flow to dump a list of all process environment variables into the debug window:

{% renderFlow %}
[{"id":"3ed886625239a5d0","type":"function","z":"a87879f70edc3463","name":"process.env","func":"msg.payload = process.env\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[{"var":"process","module":"process"}],"x":650,"y":480,"wires":[["9ca3edbd6857853f"]]},{"id":"b35ef390a46ff129","type":"inject","z":"a87879f70edc3463","name":"List env vars","props":[{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":430,"y":480,"wires":[["3ed886625239a5d0"]]},{"id":"9ca3edbd6857853f","type":"debug","z":"a87879f70edc3463","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":880,"y":480,"wires":[]}]
{% endrenderFlow %}

1. Import and deploy the flow into your self-managed Node-RED instance.
2. Click the Inject Node's button

Once clicked, the flow will print all environment variables in the debug window. Identify the environment variables required for your flow and save them in a notepad for later use.

#### Setting System-Level Environment Variables in FlowFuse

Now that you have created the snapshots and copied the process environment variables, you need to set these variables in the Node-RED instance to avoid errors during deployment and smooth application running.

1. Go to the your FlowFuse Cloud/Device instance.
2. Open the Settings tab by clicking the "Settings" option at the top of the page, then select the Environment tab.
3. Add the environment variables one by one by clicking the "+ Add" button in the bottom-left corner.
4. After adding all the environment variables, click "Save."

For more information refer to [Using Environment Variables in Node-RED](/blog/2023/01/environment-variables-in-node-red/)

#### Migrating Static Assets to FlowFuse Static Assets

When working with dashboards or files required in your Node-RED project, these files are typically stored locally and are always available, even if you restart or modify the flows. However, when migrating from Node-RED to a FlowFuse cloud environment, you'll need to manually migrate these files to the cloud-based Node-RED instances. To make this process easier, FlowFuse offers a static assets service feature at the instance level.

Here’s how you can migrate your assets:

1. Locate your static assets in your local system that are used in your Self-managed Node-RED instance from the snapshot we have taken.
2. Upload them one by one through the Instance "Static Assets" tab. For more information, refer to the [Static Asset Service documentation](/docs/user/static-asset-service/).

Once you have migrated all your assets, you will be able to access them in the instance created in the FlowFuse cloud. Just ensure that after deploying the snapshot, the path set in the flow matches the static assets migrated to the FlowFuse instance.

### Deploying Snapshot for the Cloud/Device instance

Once the system-level environment variables are set and all static assets have been migrated ( if your Node-RED application flow is using static assets), you can deploy the captured snapshot to either the Cloud or Device instance.

1. Navigate to the FlowFuse Cloud instance where you created the snapshot by clicking "Hosted Instance" in the left sidebar and selecting the instance from the list.
2. Switch to the "Snapshots" tab at the top to locate the snapshot you created from the list.
3. On the right side of the snapshot, click the three-dot icon:

   - If you are migrating to the Cloud Instance, select **"Restore Snapshot"**
   - If you are migrating to a Device Instance, select **"Set as Device Target"** 

Setting a device target will ensure that the snapshot will be deployed on all of the devices associated with this instance.

## Conclusion

Migrating from a self-managed Node-RED setup to FlowFuse is simple and offers significant benefits. By transitioning, you’ll reduce operational complexity, enhance security, and improve scalability. FlowFuse handles the infrastructure, so you can focus on building and optimizing your IIoT solutions—whether on edge devices or in the cloud.

{% include "cta.njk", cta_query: "utm_campaign=60718323-BCTA&utm_source=blog&utm_medium=cta&utm_term=high_intent&utm_content=Migrating%20from%20Self-Managed%20Node-RED%20to%20FlowFuse-Managed%20Node-RED", cta_type: "signup", cta_text: "" %}