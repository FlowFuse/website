---
title: Introducing Static IP Addresses on FlowForge Cloud #9
subtitle: Static IP addresses are here for your FlowForge Cloud projects’ outbound connections
description: Static IP addresses are here for your FlowForge Cloud projects’ outbound connections
date: 2022-09-26
authors: ["rob-marcer"]
---

On Friday last week we updated FlowForge Cloud to use static IP addresses for outbound traffic. This will allow you to predict which IP addresses your traffic will come from for example when traversing a firewall or accessing a remote database.

You will need to manually suspend then start each of your projects (a restart will not move your projects to the fixed IP addresses). Once that action is completed all outbound connections will come from one of our static IP addresses.

Any inbound traffic should still use the hostname assigned to each of your projects, you cannot use our IP addresses to route http traffic to your projects.

You can view our IP addresses in the [Docs](https://flowforge.com/docs/cloud/#ip-addresses) section of our website.

If you’d like to stay up to date with our latest releases you can do so on [our blog](https://flowforge.com/blog).
