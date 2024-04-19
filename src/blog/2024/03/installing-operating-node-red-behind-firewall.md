---
title: Installing and operating Node-RED behind a firewall
subtitle: FlowFuse was built to empower Node-RED to run everywhere, even behind a firewall
description: FlowFuse was built to empower Node-RED to run everywhere, even behind a firewall
date: 2024-03-06
authors: ["zeger-jan-van-de-weg"]
image: /blog/2024/03/images/node-red-vpn.png
tags:
    - posts
    - flowfuse
    - node-red
    - vpn
---

Practitioners using Node-RED often find themselves in a situation where a firewall
is deployed in their organization. This network configuration is a fact of life and is generally not controlled by the same people using Node-RED. Given security reigns supreme in Industrial IoT (IIoT), and a firewall offers a lot of benefits, we anticipate it will be deployed more often in the future, and as such it’s good to understand how you can get the most out of Node-RED when deployed behind a firewall.

<!--more-->

## Node-RED installation with a firewall

Generally, the standard install procedure for Node-RED requires a connection to the NPM servers that host the package. Due to NPM’s unaudited nature, IT is unlikely to agree to a permanent exception to the firewall to allow access to it. However, there are a couple of actions one can take to install Node-RED anyway.

First, ask for a temporary exception. Node-RED is installed in a few minutes, so if there’s a set time schedule an exception can be made there’s a regular method available again through collaboration with the network administrator. The second option is leveraging vendor specific package managers. As these are vetted repositories, it’s not uncommon that these gates in the firewall have been created and opened to you. Some vendors supply repositories for major package managers like `apt-get` on Debian/Ubuntu-based systems, or there’s a marketplace approach to install Node-RED like for example the [Rexroth CtrlX with Node-RED in it](https://developer.community.boschrexroth.com/t5/Store-and-How-to/FlowFuse-Node-RED/ba-p/82135). Lastly, you could consider downloading the NPM package beforehand and transferring it to your machine within the network. NPM allows the installation of local packages, which in turn allows you to create applications with Node-RED. This is generally a shadow IT action, and not recommended unless it’s approved.

## FlowFuse and your firewall

As FlowFuse can be installed in a VPN behind a firewall, there’s no requirement to open up a ‘gate’ in your firewall to FlowFuse servers. The safe perimeter provided remains to the outside world. The security aspect remains, though as a Node-RED developer, there are still everyday tasks you’ll need access to the outside world.

Consider installing third party nodes to connect your Node-RED instance to virtually any protocol or digital service. There are over 5000 of these nodes available, and as an organization it’s challenging to keep on top of. Your firewall provides one layer of security so that the data you’re accessing remains safe. FlowFuse provides a second layer of protection; we’ve introduced a [“Certified Nodes” catalog](/certified-nodes/). These nodes have gone through automated and manual inspection to prevent malicious code from making it onto your production systems.

Installing these packages would typically still require you to obtain files from NPM. With FlowFuse however, a cache can be built with only vetted nodes – All other nodes remain unavailable.

Once Node-RED is installed and the initial development has been completed, FlowFuse aims to reduce the maintenance burden on both IT and OT teams too. In the same package cache aforementioned, Node-RED versions can be added. Updating Node-RED to the latest version becomes a job of just a few clicks. Updating your Node-RED instances, even behind a firewall, is imperative, as virtually all breaches are the result of daisy-chaining multiple security vulnerabilities into a high to critical event.

## Wrap up

FlowFuse founding engineers have decades of experience running Node-RED wherever it is valuable. Our product is the culmination of that, and we’re excited to help you become successful in your digitization efforts – even when a firewall is in play.
