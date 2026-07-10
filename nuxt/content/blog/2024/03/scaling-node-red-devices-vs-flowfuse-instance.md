---
title: "Scaling Node-RED with FlowFuse: Differences between a FlowFuse Instance and a Device Instance"
subtitle: Managing your Node-RED instances is easier with FlowFuse.
description: With FlowFuse, Node-RED instances can be scaled and managed easily.
date: 2024-03-25
authors: ["grey-dziuba"]
image: /blog/2024/03/images/scaling-node-red-with-flowfuse.png
tags:
    - posts
    - flowfuse
    - device instance
    - scaling node-red
---

FlowFuse is a Software as a Service (SaaS) platform designed to enhance the experience and capabilities of Node-RED for its users. By focusing on scalability, security, and Dev Ops, FlowFuse aims to remove some of the technical barriers associated with using Node-RED, making it easier for citizen developers to automate tasks, process data, and create applications. In this blog post, we will discuss the differences between a FlowFuse instance and a FlowFuse device instance while highlighting how FlowFuse addresses scalability challenges in Node-RED deployments.

<!--more-->

## Scalability Challenges with Traditional Node-RED Deployments

While deploying Node-RED is quite simple, managing multiple instances across different environments can become complex and time-consuming. As the number of devices and use cases grow, users face difficulties in scaling their Node-RED applications efficiently to handle increased load without compromising performance or security. This is where FlowFuse comes into play.

## The Role of FlowFuse as an Orchestration Tool

FlowFuse functions as an orchestration tool that allows the deployment and management of all your Node-RED instances at scale, addressing scalability challenges head-on. By leveraging its platform, users can quickly deploy and manage multiple Node-RED instances while ensuring optimal performance and security. This enables them to connect with a wide range of devices, from PLCs and sensors to legacy software, without worrying about the complexities of managing their Node-RED deployment.

## Deploying Node-RED Next to Devices

One common issue in IoT deployments is that device instances of Node-RED often communicate with unsecure devices or networks. To mitigate security risks and ensure data protection, it's common to deploy Node-RED in close proximity to these devices. The FlowFuse platform uses [device agents](/platform/device-agent/) that communicate back to the platform via a reverse tunnel over port 443. This setup requires only one firewall rule: allowing outbound connections from the [device agent](/platform/device-agent/) running Node-RED to the FlowFuse platform, significantly minimizing security risks while enabling remote monitoring, flow editing, and configuration deployment at scale.

## Deploying Node-RED Instances Within the FlowFuse Platform

Not all instances of Node-RED need to be deployed at the edge and can be deployed anywhere. FlowFuse offers this flexibility in cases where users prefer or require deploying their Node-RED instances within the platform itself. This capability allows users to focus on developing and managing their applications without worrying about the underlying infrastructure.

## Conclusion

FlowFuse addresses scalability challenges in Node-RED deployments by providing an easy-to-use platform that enables users to manage multiple instances at scale while maintaining security and performance. By understanding the differences between a FlowFuse instance and a device instance, you can make informed decisions about your deployment strategy and leverage the full potential of Node-RED for your applications. Stay tuned for our upcoming blogs where we will dive deeper into the areas of security, dev ops, and backup solutions provided by FlowFuse.

