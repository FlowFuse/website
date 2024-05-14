---
title: The MIND stack with Node-RED and FlowFuse Dashboard 2.0
subtitle: Leveraging FlowFuse for a Lighter MIND Stack (MIND = MQTT, InfluxDB, Node-RED, Dashboard 2.0)
description: Our objective is to streamline the deployment of the MIND stack, enhancing its usability without compromising functionality.
date: 2024-05-14
authors: ["grey-dziuba", "harshad-joshi"]
image: /blog/2024/05/images/mind-mqtt-influxdb-node-red-dashboard-2-0.png
tags:
    - posts
    - flowfuse
    - mind
    - ming
    - influx
    - dashboards
---

The MING stack has gained significant popularity over the years as it built upon open-sourced projects.  That has given way to many people leveraging this stack to build solutions upon in various different environments.  The MING stack is composed of 4 main components, MQTT, InfluxDB, Node-RED, and Graphana.  Combined together are the 4 main pillars, data transportation, data storage, data transformation, and visualizations.  With this, it requires the management of 4 different applications, which often reside on the same server, but not necessarily.  With more moving parts, creates complexity.

<!--more-->

## FlowFuse: Integrated IoT Deployment

With FlowFuse we have bundled up 3 of those 4.  First and foremost, the FlowFuse platform deploys Node-RED in two main ways.  A cloud based deployment and remote deployment with management from the FlowFuse platform.  Part of this management piece leverage MQTT between the devices for management.  Because of this we have a built in MQTT broker that allows for communication between Node-RED instance within the FlowFuse platform.  Lastly, with the release of Dashboards 2.0 from FlowFuse we have introduced the next generation of visualizations for the Node-RED platform.


## Optimizing IoT with the MIND Stack

It often makes sense to deploy a full MING stack, but in some deployments, it might be necessary to deploy a more simplistic version of the MING stack.  This is where MIND comes into play.


### FlowFuse MQTT: Simplified Communications

FlowFuse has a built-in feature called projects, which leverages MQTT, that allows the communication of data between FlowFuse runtimes of Node-RED.  One caveat is that this MQTT broker is only available within the FlowFuse platform. What this means is there needs to be some form of translation to be done within Node-RED.  This isn’t a big deal for small deployments, because often Node-RED runtimes at the edger are collecting data from various sources that aren’t MQTT.  The flow of data is as follows: 

Sensor > Node-RED(FlowFuse Device Agent) > MQTT Encapsulated by FlowFuse > Node-RED(FlowFuse Platform) > InfluxDB

!["Screenshot showing the flow of data: Sensor > Node-RED(FlowFuse Device Agent) > MQTT Encapsulated by FlowFuse > Node-RED(FlowFuse Platform) > InfluxDB"](./images/sensor-data-mqtt-node-red-dashboard-influxdb.png ""){data-zoomable}

A key benefit of having the MQTT broker encapsulated by FlowFuse is that it becomes extremely easy to set up.  With the project nodes, there isn’t a need to configure certificates or security credentials because it is only exposed internally to the FlowFuse platform.


### InfluxDB: Efficient Data Storage

InfluxDB doesn’t change much in the MIND configuration compared to how it is deployed in the MING stack, minus the fact that the data will be stored next to the FlowFuse Platform instead of the cloud.  


### Data Visualization with Dashboard 2.0

FlowFuse's Dashboard 2.0 makes it incredibly easy to visualize your data.  You can create beautiful and informative dashboards in minutes. Simply drag and drop your desired widgets onto the canvas, and configure them with a few clicks.  

We have gone through the step of providing you with an example dashboard for visualizing your MIND stack.   


_Sample Dashboard_

This dashboard example allows you to do quick visualizations of data from an InfluxDB.  In this particular case, it leverages the Relative Humidity (RH) and Temperature of a sensor.  It captures the data and stores in InfluxDB and then visualizes it in Dashboard 2.0.  Use this as a starting point to display data in the MIND stack. 


## Advantages of FlowFuse’s MIND Stack

FlowFuse provides built-in features, such as MQTT, backups, deployment pipelines, and access control, helping to protect data and devices from unauthorized access. FlowFuse simplifies the MING stack to the MIND deployment, bringing numerous benefits to organizations. It reduces the complexity of managing multiple components, minimizing configuration, update, and maintenance overhead. The single platform approach for MQTT, Node-RED, and visualization simplifies maintenance tasks, lowers the risk of conflicts, and ensures consistency. FlowFuse's lighter deployment requires fewer hardware resources, making it suitable for resource-constrained environments or cost-sensitive projects. Organizations can potentially save on licensing and maintenance costs by reducing the number of deployed software components. Faster deployment is enabled with fewer components to set up and configure, allowing projects to realize value sooner. FlowFuse's scalable architecture handles large data volumes and devices, ensuring suitability for growing IoT deployments. 


## Conclusion

While we believe that the MING stack is here to stay, we believe as the market matures, it should offer many different variations suitable for each customer's needs.  However, we find that the MIND offering does fill a niche in the market that may better suit your needs.  None the less, choosing FlowFuse to manage your Node-RED runtimes will ensure that your applications will be secure, scalable, and easily manageable.  Allowing your domain experts to take control and extend their knowledge bringing increased value to industrial facilities around the world.

Ready to get started, sign up today for your [free trial](https://app.flowfuse.com/account/create). 

