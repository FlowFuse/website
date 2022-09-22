---
title: Introducing Static IP Addresses on FlowForge Cloud #9
subtitle: Static IP addresses are coming to your FlowForge Cloud projects’ outbound connections
description: Static IP addresses are coming to your FlowForge Cloud projects’ outbound connections
date: 2022-09-22
authors: ["rob-marcer"]
---

As part of our upcoming 0.10 release, we are updating FlowForge Cloud to use static IP addresses for outbound traffic. This will allow you to predict which IP addresses your traffic will come from for example when traversing a firewall or accessing a remote database.

Once 0.10 is released you will need to manually Suspend then Start each of your projects (a restart will not move your projects to the fixed IP addresses). Once that action is completed all outbound connections will come from one of the following IP addresses.

XXX.XXX.XXX.XXX  
XXX.XXX.XXX.XXX  
XXX.XXX.XXX.XXX  
XXX.XXX.XXX.XXX  
XXX.XXX.XXX.XXX  

Any inbound traffic should still use the hostname assigned to each of your projects.

We expect version 0.10 of FlowForge Cloud to be released before the end of September 2022, if you’d like to stay up to date with our latest releases you can do so on [our blog](https://flowforge.com/blog).
