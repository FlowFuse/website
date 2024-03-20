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


## HTTP Basic Authentication: A Simple Approach

HTTP Basic Authentication is widely supported and straightforward to implement, making it a popular choice for securing APIs. It requires users to provide a username and password before accessing the Node-RED instance. While this method is easy to use, it's important to note that the username and password are shared and transmitted in plain text, making it vulnerable to interception.

## FlowFuse Authentication: Seamless Integration

FlowFuse authentication offers a seamless and secure way for users to access dashboards and other resources that are typically accessed through a browser. It leverages single sign-on (SSO) and SAML 2.0, reducing the management burden for organizations. 

For users this is convenient as they can access multiple applications and resources using a single set of credentials, eliminating the need to remember and manage multiple passwords.

For organizations, SSO enhances security by centralizing authentication and authorization, reducing the risk of unauthorized access. By leveraging SSO and SAML 2.0, FlowFuse takes care of user management, freeing up customers from the administrative burden of managing user accounts and passwords. FlowFuse authentication adheres to industry-standard security protocols, ensuring compliance with regulatory requirements.

This method of authentication is however impractical for API access by other services, to programmatically transfer data between them.


## Bearer Authentication: A Token-Based Approach

Bearer Authentication offers a more secure and flexible alternative to traditional username/password authentication. Users will generate the token through the FlowFuse platform with each instance generating it's own token. These tokens can be designed to have limited lifespans, reducing the risk if compromised.   In the case the token then becomes compromised only the instance in which the token is generated can become subject to malicious behaviors.  In the case that this does occur, simple deleting the token will elevate any unwanted access.

## Choosing the Right Authentication Strategy

FlowFuse provides multiple authentication mechanisms to cater to various aspects of security and user experience. When designing your Node-RED applications, consider the specific requirements of your project and the patterns of user interaction to select the most appropriate authentication strategy. By doing so, you can ensure both a high level of security and an optimal user experience for your web development projects with API calls through Node-RED.

In conclusion, understanding and utilizing these different types of authentication in FlowFuse empowers citizen developers like you to create more secure and efficient applications for diverse use cases. 
