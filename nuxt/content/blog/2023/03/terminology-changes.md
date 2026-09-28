---
title: Terminology Changes
subtitle: Applications, Instances & Devices - the new way forward for FlowFuse
description: "FlowFuse introduces new terminology: Applications, Instances & Devices for better organization and management."
date: 2023-03-16 14:00:00.0
authors: ["joe-pavitt"]
image: /blog/2023/03/images/concept-changes.png
tags:
    - posts
    - flowfuse
    - news
---

As a new product in the market, we constantly have to make choices on how to name things. Naming things is hard! As you name a thing, say "Project", it might be suitable now, but the product evolves, and may outgrow the name such that it doesn’t fit anymore.

<!--more-->

We are at this point with FlowFuse, and want to walk you through what we have planned, and why we are changing a couple of things.


### Enter the "Application"

In [FlowFuse 1.5](/blog/2023/03/flowforge-1-5-0-released/), we have introduced a new concept called an **Application**. 

An Application will allow you to organize multiple Node-RED instances into a single managed group. 

As of the 1.5 release, an Application can still only have a single Node-RED instance, but in future releases, Applications will allow for multiple Node-RED instances and will allow us to implement capabilities such as **DevOps Pipelines** and **High Availability**.

### "Projects" to "Instances"

Until now, 'Project' encapsulated both the Node-RED instance that was running in FlowFuse, and the associated devices (remote instances), settings and environment variables. It was an overloaded term, and it caused confusion with our users.

To simplify things, and to adhere more to the terminology familiar with the Node-RED community, we are renaming Projects to **Instances**.

An **Instance** is a customized version of Node-RED that includes various FlowFuse plugins to integrate it with the FlowFuse platform. It can also be used to manage the environment variables used in your Node-RED flows. 

Instances can either be:

- **Local** - An instance of Node-RED running in FlowFuse.
- **Remote** - An instance of Node-RED, managed by FlowFuse, running on a Device.

In future releases, environment variables will also be able to be stored at the Application level, and shared across multiple Node-RED Instances.

### Devices

FlowFuse can also be used to manage remote Node-RED instances. This is typically useful when you have a number of remote devices that are required to run the same Node-RED instance, and may have variation in configuration or environment variables for example.

Devices are registered to an Instance, and can be configured to run [Snapshots](/docs/user/concepts/#snapshot) of the Instance running in FlowFuse.

To accomplish this remote management capability, the [FlowFuse Device Agent](https://github.com/FlowFuse/device-agent) needs to be installed on each device. Devices are registered with a Team, and then the appropriate device(s) are assigned to a Node-RED instance that should be deployed to the device(s). When the Node-RED instance is ready for deployment, a user creates a snapshot of the instance and marks it as a target snapshot for the device.

We hope these changes will simplify the FlowFuse terminology for our users and allow us to grow the FlowFuse platform. If you have any feedback or thoughts, please do reach out to us.