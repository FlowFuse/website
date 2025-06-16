---
title: Browse for Node-RED Flows During Remote Instance Setup
description: Remote Instance setup improvements to help you get up and running faster with the FlowFuse Device Agent.
date: 2025-06-16 12:00:00.0
authors: ['stephen-mclaughlin']
tags:
  - changelog
---

Last month we introduced a way for the FlowFuse Device Agent to import Node-RED flows during the setup process. Today, we have built on that and added some new features:

- Automatically scan common file locations and offer any flows found for immediate selection
- Scan common directories and present any that contain multiple flows as a quick browse selection
- Offer a "Browse filesystem" option to let you navigate and select any flows on your device


### Lets see it in action

**Import automatically located `~/.node-red/flows.json` flows file**

![Screenshot of the Importing an Automatically located flows file during Device Agent Setup](./images/import-flows-quick-select.gif){data-zoomable}
_Screenshot of the Importing an Automatically located flows file during Device Agent Setup_

**Using the "Browse filesystem" option to navigate the filwsystem to chose a different flows file**

![Screenshot of Browsing the filesystem for flows file during Device Agent Setup](./images/import-flows-browsed.gif){data-zoomable}
_Screenshot of Browsing the filesystem for flows file during Device Agent Setup_

We hope these new enhancements make the process of migrating existing Node-RED flows to FlowFuse even easier.
