---
title: Introducing Static IP Addresses on FlowForge Cloud #9
subtitle: Static IP addresses are here for your FlowForge Cloud projects’ outbound connections
description: Static IP addresses are here for your FlowForge Cloud projects’ outbound connections
date: 2022-09-27
authors: ["rob-marcer"]
---

On Friday last week we updated FlowForge Cloud to use a static IP address for outbound traffic. This will allow you to predict which IP address your traffic will come from for example when traversing a firewall or accessing a remote database.

You will need to manually suspend then start each of your projects (a restart will not move your projects to the fixed IP address). Once that action is completed all outbound connections will come from one of our static IP address.

Any inbound traffic should still use the hostname assigned to each of your projects, you cannot use our IP address to route http traffic to your projects.

You can view our IP address in the [Docs](https://github.com/flowforge/flowforge/tree/main/docs/cloud#ip-addresses) section of our website.

If you’d like to stay up to date with our latest releases you can do so on [our blog](https://flowforge.com/blog).
