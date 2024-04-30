---
title: Run FlowFuse on robustel EG5120
subtitle: How to install FlowFuse Device Agent on robustel EG5120
description: In this guide, we will discuss how to install FlowFuse Device agent on robustel EG5120.
date: 2024-05-01
authors: ["grey-dziuba"]
image: /blog/2024/05/images/flowfuse-on-rubustel-eg5120-node-red.png
tags:
    - posts
    - flowfuse
    - node.js
    - robustel
    - eg5120
---

The [robustel EG5120](https://www.robustel.com/product/eg5120-industrial-edge-computing-gateway/) is a versatile gateway that facilitates robust connectivity for industrial IoT applications. Integrating this powerful hardware with FlowFuse not only enhances its capabilities but also simplifies the management and deployment process. In this guide, we’ll walk through the steps to integrate the robustel EG5120 with FlowFuse, making your IoT solutions more efficient and easier to manage.

<!--more-->


This blog is designed for IoT enthusiasts and professionals who are looking to enhance their industrial IoT applications. The [robustel EG5120](https://www.robustel.com/product/eg5120-industrial-edge-computing-gateway/), equipped with Linux-based Debian 11 and preinstalled Node-RED, offers robust connectivity options. When combined with FlowFuse, this gateway becomes even more powerful, enabling seamless device management and deployment. 


#### **Robustel and Node-RED**

The robustel EG5120 supports multiple connectivity options including Ethernet, Wi-Fi, and cellular networks, which are essential for flexible deployments in various industrial scenarios. Its built-in support for MQTT and Modbus protocols facilitates seamless integration with a wide array of IoT devices and services. This blog will guide you through using FlowFuse to effectively manage your Node-RED instance, enhancing both the security and scalability of your IoT applications.

#### **Migration**

If you're looking to migrate your Node-RED instance, follow the steps in [this migration guide](/docs/migration/node-red-tools/) to back up and transfer your configurations safely. By incorporating the FlowFuse device agent, we aim to replace the preinstalled Node-RED runtime, thus providing enhanced monitoring, automated backups, and improved management capabilities. This transition will make your deployments more secure and resilient.

#### **Setting Up the Environment**

**Important Notice:** The device encounters an issue where the SuperUser and the default user are running different versions of Node.js. The SuperUser is running an outdated version incompatible with our needs. For the FlowFuse device agent, a minimum of NodeJS v14 is required, though v20 or later is recommended. For the latest recommendations, check this [documentation](/docs/device-agent/install/#prerequisites).

**1. Gaining Root Access:**
   - Start by opening your terminal and gain root access to adjust system configurations crucial for the following steps:
     ```bash
     sudo su
     ```
   - Verify the version of Node.js:
     ```bash
     node -v
     ```
   - If the version is below v14, proceed to the next step to upgrade. If it's v14 or higher, you might opt to skip to step 4.

**2. Updating Node.js:**
   - To ensure optimal functionality, update or install Node.js v20.12 using the Node version manager:
     ```bash
     npm install n -g
     n v20.12
     ```

**3. Verifying Node.js Installation:**
   - Confirm the update by checking the Node.js version again:
     ```bash
     node -v
     ```
   - If the output confirms v20.12, proceed to the next installation step.

**4. Installing FlowFuse Device Agent:**
   - Install the FlowFuse device agent globally to connect your robustel EG5120 to the FlowFuse platform efficiently:
     ```bash
     sudo npm install -g @flowfuse/device-agent
     ```

**4. Might need to turn off Node-RED service:**

**Checking with the robustel team.**

**5. Device Registration and Initialization:**
   - After the installation of the device agent, it is now time to start the device agent:
     ```bash
     flowfuse-device-agent
     ```
   - Congratulation you now you now are utilizing FlowFuse to manage your Node-RED runtime.  If you would like this to run as a service please follow this [documentation](/blog/2023/05/device-agent-as-a-service/).

#### **Visual Aids and Practical Application**
Consider a scenario where a manufacturing facility needs to efficiently monitor and manage multiple industrial machines. By integrating the robustel EG5120 with FlowFuse, the facility can streamline data collection, enhance device management, and improve operational efficiencies through real-time analytics and remote management capabilities. Below are visual aids including diagrams and flowcharts that illustrate the integration process and clarify these complex concepts.

#### **Troubleshooting Tips**
During the integration process, you may encounter issues such as conflicting Node.js versions or connectivity problems. Here are some troubleshooting tips:
- Ensure all commands are run with appropriate permissions.
- Revisit the Node.js installation steps if version discrepancies occur.
- For connectivity issues, check network settings and device configuration.

#### **Conclusion**
Integrating the robustel EG5120 with FlowFuse simplifies the deployment of IoT solutions and enhances the manageability and scalability of your IoT infrastructure. This setup ensures your devices are secure, backed up, and optimized for performance. We encourage you to explore this solution further and enhance your industrial IoT applications.




