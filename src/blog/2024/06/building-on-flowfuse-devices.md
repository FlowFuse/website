---
templateEngineOverride: njk, md
title: "Developing on FlowFuse: Remote Device Monitoring"
subtitle: In this article we take a look at how elements of the FlowFuse ecosystem can be used to build powerful IoT applications for monitoring remote devices.
description: In this article we take a look at how elements of the FlowFuse ecosystem can be used to build powerful IoT applications for monitoring remote devices.
date: 2024-06-27
authors: ["joe-pavitt"]
image: /blog/2024/06/images/design-pattern-device-monitoring.png
tags:
   - posts
   - news
   - node-red
   - flowfuse
stories:
    - title: "Leveraging Node-RED and FlowFuse to Revolutionize Irrigation"
      logo: ""
      image: "/images/stories/pidd-view.png"
      brand: "Paloma Irrigation and Drainage District"
      url: "/customer-stories/leveraging-node-red-and-flowfuse-to-revolutionize-irrigation"
    - title: "Revolutionizing Precision Manufacturing with Node-RED"
      logo: ""
      image: "/images/stories/abrasive_tech.jpg"
      brand: "Abrasive Technology"
      url: "/customer-stories/leveraging-node-red-and-flowfuse-to-automate-precision-manufacturing"
---

{% from "stories/customer-story.njk" import storyTile %}

FlowFuse has established a rich ecosystem of products to help you build bespoke, powerful, low-code applications. We've seen customers utilizing these to [revolutionise precision manufacturing](https://flowfuse.com/customer-stories/leveraging-node-red-and-flowfuse-to-automate-precision-manufacturing/), [automate building management](https://flowfuse.com/customer-stories/node-red-building-management/) and [modernize the distribution of global weather data](https://flowfuse.com/customer-stories/un-wmo-nr-data-sharing/), just to name a few examples. 

In this series of articles, we'll be taking a look at the common architectures and design patterns we are seeing used across our customer base, and how you can use these to build your own applications. To kick things off, this article will focus on "Remote Device Monitoring".

<!--more-->

## Use Case

You have hundreds, if not, thousands of devices deployed remotely. These could be anything from sensors, to actuators, to entire machines. You need to monitor these devices, and potentially control them. It's important to know when they are online, that they're running optimally and if something is about to, or already has, gone wrong.

![Diagram showing the breakdown of each component that makes up a "Device Monitoring" use case.](./images/device-monitoring-use-case.png){data-zoomable}
_Diagram showing the breakdown of each component that makes up a "Device Monitoring" use case._

Breaking it down we have the following fundamental requirements:

- **Read:** Reading data from the devices using the relevant protocol
- **Parse:** Process the data into a computational format
- **Monitor:** Analysis & monitoring of the data from all devices
- **Action:** Taking action based on the data from the devices

Then, we have to consider that this functionality needs to be deployed out to thousands of devices. So, our final requirement is:

- **Maintain:** If we update functionality on one device, we may need to be able to easily roll those updates out to other devices. We need to sure it's easy to update and deploy to our devices, and if anything goes wrong, we should be able to easily find out what the problem is, and get easy access to fix it.

## FlowFuse Offerings

![Lineup of each of the FlowFuse offerings](./images/ff-ecosystem-lineup.png){data-zoomable}

With the FlowFuse Ecosystem, we have serval offerings that will help build a robust and scalable solution for the above use case:

- **Node-RED:** Low-code platform for reading and parsing data from the hardware, building the application logic, analysis and alerting.
- **FlowFuse Dashboard:** An add-on to Node-RED for building interactive user interfaces and dashboards to monitor the devices.
- **FlowFuse:** Centralised platform that provides a single entry point to manage all of your Node-RED applications.
- **FlowFuse Device Agent:** Deployed to remote hardware, this provides a connection to FlowFuse, and allows for remote deployment, management and updating of Node-RED instances.
- **FlowFuse Project Nodes:** An add-on to Node-RED that provides (MQTT-based) nodes to interface directly between multiple instances of Node-RED.

## Architecture

So, given the use case, how do the FlowFuse offerings piece together to build a solution?




## What Next?

### Deploy to FlowFuse

If you're interested in discussing how your company could benefit from this design pattern, please do [get in touch](/contact/).

### Customer Stories

If you want to deep dive further into how this design pattern has been used by our customers, we have some customer stories that you might find interesting:

<ul class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-0 list-none">
    {%- for story in stories | sort(attribute='item.date') | reverse -%}
    {{ storyTile(title=story.title, url=story.url, brand=story.brand, logo=story.logo, image=story.image) }}
    {%- endfor -%}
</ul>