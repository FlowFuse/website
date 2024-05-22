---
title: How to Use MQTT in Node-RED
subtitle: Step-by-step guide on integrating MQTT with Node-RED.
description: Learn how to effectively integrate MQTT and Node-RED in this comprehensive guide, covering setup, configuration, and practical applications for IoT projects.
date: 2024-05-25
authors: ["sumit-shinde"]
image: 
tags:
   - posts
   - node-red
   - mqtt
---



<!--more-->

## Understanding MQTT

MQTT, or Message Queuing Telemetry Transport, is a lightweight messaging protocol designed for efficient communication between devices in low-bandwidth and high-latency environments. It operates on a publish-subscribe model, where devices (clients) can publish messages to topics or subscribe to topics to receive messages. This architecture is particularly beneficial for IoT applications, where sensors and devices often need to communicate in real-time across unreliable networks.

## Setting up your MQTT and Node-RED Environment

### Setting up your MQTT Environment

In this guide, we will utilize the [HiveMQ Cloud MQTT](https://www.hivemq.com/mqtt-cloud-broker/) broker, a fully managed MQTT broker service platform provided by HiveMQ. We will use their free trial.

1. Create your account with HiveMQ and log in.
2. After logging in, you will be asked to select a cluster. Choose the **Starter** cluster, then select the **AWS Cloud** provider and set the tier to **Production S**. Make sure to select the correct region.
3. Now, click on **Manage Cluster**, then click on the **Access Management** option located at the top. Create credentials in the **Authentication** tab with the correct permissions.

### Setting up your Node-RED Environment

For Node-RED, we will be using FlowFuse, which enhances Node-RED usage with managed instances, automated deployments, and real-time collaboration feature, making it ideal for developers and enterprise teams. It simplifies configuration, monitoring, and operation of Node-RED applications. FlowFuse ensures efficient and reliable operation of Node-RED flows. However, If you wanted to install Node-RED locally refer to [Installing Node-RED](https://nodered.org/docs/getting-started/local).

1. Head to the [FlowFuse sign-up](https://app.flowfuse.com/account/create) page to create your new account and the [FlowFuse login](https://app.flowfuse.com/) page to log in.
2. After successfull login, you will see the Application and instance which is added by default.
3. Click on that instance and then click on the editor URL to open the Node-RED editor.

## Configuring MQTT Node in Node-RED

When you open the Node-RED editor, you'll see the MQTT nodes already installed as they are core Node-RED nodes. When you drag an **mqtt-in** or **mqtt-out** node onto the workspace, you need to configure the MQTT broker node. You can do this by clicking on the edit icon next to the Server field in the MQTT nodes and enter the following details of your mqtt broker into mqtt broker node.

## Connection Tab

1. **Server:** Enter the server address of your HiveMQ cluster, ex - `<yourclustername>.a02.usw2.aws.hivemq.cloud`

2. **Port:** Use the default MQTT port (typically 1883 for non-secure or 8883 for secure connections).

3. **Connect Automatically:** Enable this option to ensure the MQTT node attempts to connect automatically when Node-RED starts or flow is deployed.

4. **Use TLS:** Enable this option if you are connecting to a secure MQTT broker.

5. **Protocol:** Choose the MQTT protocol version. Typically, MQTT V3.1.1 is widely supported:

6. **Client ID:** Provide a unique client ID for your connection. This can be left blank to let the broker generate.

7. **Keep Alive:** Set the keep-alive interval in seconds. it is set by default 60 seconds.

8. **Use Clean Session:** Enable this to ensure the broker does not store session information between connections.

### Security Tab

1. **Username:** Enter the username you created in the HiveMQ Access Management. If you are using another broker, use the corresponding username.

2. **Password:** Enter the password associated with the username.

## Publishing Data to a Topic on MQTT Broker

1. Drag an **Inject** node onto the canvas, set `msg.payload` to timestamp, and set repeat to an interval of **5 seconds**.
2. Drag an **mqtt-out** node onto the canvas.
3. Double-click on the **mqtt-out** node and select the added configuration in the server field.
4. In the topic field, enter the desired topic name.
5. Set the **QoS** to **2** for accurate and guaranteed data delivery.
6. Set **retain** to true if you want to retain the data.
7. Connect the **Inject** node's output to the input of the **mqtt-out** node.

## Subscribing to a Topic on MQTT Broker

1. Drag an **mqtt-in** node onto the canvas.
2. Double-click on the **mqtt-in** node and select the appropriate added configuration from which you want to receive data in the server field.
3. Set **action** to **subscribe to a single topic** and enter the topic name in the topic field.
4. Set the **QoS** to **2**.
5. Set the output to the desired format.
6. Drag a **Debug** node onto the canvas.
7. Connect the output of the **mqtt-in** node to the input of the **Debug** node.

## Deploying the Flow

1. To deploy the flow, click on the **deploy** button located at the top-right corner.

*Tip: To ensure that your MQTT node is connected to the broker, check the node status. It will display 'connected' if the connection is successful.*

Now, you'll notice the timestamp printed on the debug tab every 5 seconds, confirming that the **mqtt-out** node is successfully publishing data to the topic, and the **mqtt-in** node is properly subscribing to receive it.

## Creating a Simple Project

Now that you're familiar with sending and receiving data using MQTT, let's dive into creating a simple project in this section. We'll transmit temperature data obtained from a temperature sensor from one instance of Node-RED to another. This project will provide a practical demonstration of how MQTT can be utilized for communication. If you don't know how to run Node-RED on your edge device and read sensor data data, please refer to this guide on [Setting up Node-RED on Raspberry Pi](/blog/2024/05/how-to-setup-node-red-on-raspberry-pi).

### Publishing Temperature Data to a Topic on the MQTT Broker

1. Drag an **mqtt-out** node onto the canvas, and configure it with the MQTT broker to which you want to send data.
2. Enter "temp" in the topic field and set **QoS** to **2**.
3. Connect the output of the node that is reading your temperature data to the input of the **mqtt-out** node.
4. Deploy the flow by clicking on the **deploy** button located at the top-right corner.

### Subscribing to the Topic on the MQTT Broker to Receive Temperature Data

Now, create the new instance in which we will receive the temperature data by subscribing to the topic. Refer to this guide which shows how you can [create a new instance in FlowFuse](/docs/user/introduction/#creating-a-node-red-instance).

1. Drag an **mqtt-in** node onto the canvas, and configure it with the broker to which you are sending temperature data.
2. Enter "temp" in the topic field and set **QoS** to **2**.
3. Drag a **Debug** node onto the canvas.
4. Connect the **mqtt-in** node's output to the **Debug** node's input.
5. Deploy the flow by clicking on the **deploy** button located at the top-right corner.

Now, you will see the temperature data printed in the debug tab in the sidebar. Additionally, you can display this data on a chart using Dashboard 2.0 or store it in a database. For details refer to this following guides:

- [Sending data to influxDB](/blog/2023/07/connect-node-red-to-influxdb/)
- [Charting Data in on Dashboard 2.0](/blog/2023/09/dashboard-chart-for-rest-api-data/)

## Best Practices

Ensuring the security and efficiency of your MQTT and Node-RED deployments is crucial for successful IoT projects. Explore these best practices to enhance your system's performance and protect your data.

### Security

- **SSL/TLS Encryption:** Secure your MQTT communication by enabling SSL/TLS encryption. This ensures that data transmitted between devices and the broker is encrypted, safeguarding it from unauthorized access.

- **Authentication and Authorization:** Implement strong authentication mechanisms to verify the identity of clients connecting to the broker. Additionally, enforce access control policies to restrict clients' actions based on their roles and permissions. For instance, you can allow specific clients to only publish or subscribe to data as needed.

- **Environment Variables:** Utilize environment variables to prevent exposing your sensitive configuration data within the flow. For more details, refer to  [Using Environment varriables](/blog/2023/01/environment-variables-in-node-red/)

### Performance Optimization

- **Quality of Service (QoS) Levels:** Choose the appropriate QoS level for your MQTT messages based on the reliability requirements of your application. Higher QoS levels ensure message delivery but may incur increased network overhead.

- **Payload Size Optimization:** Optimize the size of MQTT message payloads to minimize bandwidth usage and improve network efficiency. Transmit only essential data and consider compressing payloads when applicable to reduce transmission times.

## Applications for Node-RED & MQTT

- **Industrial Automation and Remote Monitoring:** In industrial settings, Node-RED combined with MQTT enables automation of processes, monitoring of equipment status, and remote management of industrial systems. This setup is scalable and can handle large volumes of data efficiently.

- **Data Logging and Analytics:** Node-RED can be used to collect data from various sources via MQTT and log it into databases or cloud services. You can then analyze this data, generate reports, and gain insights into trends and patterns for decision-making.

- **Home Automation:** With Node-RED and MQTT, you can build sophisticated home automation systems. Examples include controlling lights, thermostats, security cameras, and other smart devices using MQTT messages.

- **Environmental Monitoring and Smart Agriculture:** For environmental monitoring applications such as weather stations or smart agriculture systems, Node-RED can gather sensor data through MQTT, process it in real-time, and trigger actions based on predefined conditions like irrigation control or alert notifications.

- **Integration with Third-Party Services:** Node-RED's extensibility allows integration with a wide range of third-party services and APIs. By using MQTT as a communication bridge, you can connect Node-RED flows with cloud platforms, messaging services, social media, and more, enabling seamless data exchange and automation across different platforms.

- **Fleet Management and Tracking:** For fleet management applications, Node-RED can receive GPS data from vehicles or assets via MQTT, track their locations, monitor performance metrics, and send notifications or commands based on predefined rules, enhancing operational efficiency and safety.

- **Healthcare and Remote Patient Monitoring:** In healthcare, Node-RED coupled with MQTT can facilitate remote patient monitoring by collecting health data from sensors or wearable devices, transmitting it securely, and providing real-time alerts to healthcare providers or patients for timely interventions.

- **Energy Management and Smart Grids:** Node-RED can play a crucial role in energy management systems by integrating with smart meters, renewable energy sources, and grid infrastructure via MQTT. This integration enables real-time monitoring, demand response, and optimization of energy consumption.

- **Building Automation and Energy Efficiency:** For building automation and energy efficiency projects, Node-RED can control HVAC systems, lighting, and other building components based on occupancy, environmental conditions, and energy demand signals received through MQTT, leading to cost savings and sustainability.

## Conclusion 

This guide comprehensively covers integrating MQTT with Node-RED, including setup instructions, MQTT node configuration, practical application examples like data publishing and subscribing, and essential best practices for security and performance optimization. It serves as a valuable resource for developers looking to leverage MQTT's capabilities within Node-RED for effective IoT communication and automation.
