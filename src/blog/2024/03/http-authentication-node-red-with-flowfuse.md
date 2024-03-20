---
title: Securing HTTP Traffic for Node-RED with FlowFuse
subtitle: Choosing the right form of authentication for your Node-RED integration is important.
description: In this blog we will discuss the various forms of authentication for integrating web applications with Node-RED.
date: 2024-03-25
authors: ["grey-dziuba"]
image: 
tags:
    - posts
    - flowfuse
    - http in
    - http node
    - api
---

In today’s interconnected world, web development often involves interacting with APIs through a variety of authentication methods for secure data exchange. As a citizen developer using Node-RED and FlowFuse, it's essential to understand these authentication types and how they can be utilized in your projects.

<!--more-->


## Basic Authentication: A Simple Approach

Basic Authentication is widely supported and straightforward to implement. It requires users to provide a username and password before accessing the Node-RED instance. In FlowFuse, developers can create application-specific usernames and passwords for Basic Authentication, making it suitable for internal applications or environments with tight control over access. Remember that the security of this method relies on secure connections like HTTPS to prevent credential interception.

## FlowFuse Authentication: Seamless Integration

FlowFuse Authentication is similar to Basic Authentication, with one distinct difference. It allows users to authenticate using the same credentials as their FlowFuse platform login. This approach is excellent for when a citizen developer wants to create an application backend that will only be used by FlowFuse-authenticated team members, outside of that it functions the same as the Basic Authentication method.  This prevents the need to share passwords between team members because they will use their own authentication to interact with the application.

## Bearer Authentication: A Token-Based Approach

Bearer Authentication offers a more secure and flexible alternative to traditional username/password authentication. Users will generate the token through the FlowFuse platform with each instance generating it's own token. These tokens can be designed to have limited lifespans, reducing the risk if compromised.   In the case the token then becomes compromised only the instance in which the token is generated can become subject to malicious behaviors.  In the case that this does occur, simple deleting the token will elevate any unwanted access.

## Choosing the Right Authentication Strategy

FlowFuse provides multiple authentication mechanisms to cater to various aspects of security and user experience. When designing your Node-RED applications, consider the specific requirements of your project and the patterns of user interaction to select the most appropriate authentication strategy. By doing so, you can ensure both a high level of security and an optimal user experience for your web development projects with API calls through Node-RED.

In conclusion, understanding and utilizing these different types of authentication in FlowFuse empowers citizen developers like you to create more secure and efficient applications for diverse use cases. 
