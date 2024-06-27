---
templateEngineOverride: md, njk
title: "Developing on FlowFuse: Device Monitoring"
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

FlowFuse has established a rich ecosystem of products to help you build bespoke and powerful applications. We've seen customers utilizing these to [revolutionise precision manufacturing](https://flowfuse.com/customer-stories/leveraging-node-red-and-flowfuse-to-automate-precision-manufacturing/), [automate building management](https://flowfuse.com/customer-stories/node-red-building-management/) and [modernize the distribution of global weather data](https://flowfuse.com/customer-stories/un-wmo-nr-data-sharing/), just to name a few examples. 

In this series of articles, we'll be taking a look at the common architectures and design patterns we are seeing across our customer base, and how you can use these to build your own applications, and to kick things off, this article will focus on "Device Monitoring".

<!-- more -->

## Use Case

You have hundreds, if not, thousands of devices deployed remotely. These could be anything from sensors, to actuators, to entire machines. You need to monitor these devices, and potentially control them, from a central location.

It's important to know when they are online, that they're running optimally and if something is about to, or already has, gone wrong.

Breaking it down we have a few fundamental requirements:

- Reading data from the devices
- Retrieving the data from the devices
- Analysis & monitoring of the data from all devices
- Alerting when something goes wrong

Then, we have to consider that this functionality needs to be deployed out to thousands of devices. If we update functionality on one device, we need to be able to easily roll those updates out to all devices.

## Design Pattern




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