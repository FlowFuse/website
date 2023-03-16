---
title: Terminology Changes
subtitle: Applications, Instances & Devices - the new way forward for FlowForge
description: Applications, Instances & Devices - the new way forward for FlowForge
date: 2023-03-16 14:00:00.0
authors: ["joe-pavitt"]
image: /blog/2023/03/images/concept-changes.png
---

As a new product in the market, we constantly have to make choices on how to name things. Naming things is hard! As you name a thing, say "Project", it might be suitable now, but the product evolves, and may outgrow the name such that it doesn’t fit anymore.

<!--more-->

We are at this point with FlowForge, and want to walk you through what we have planned, and why we are changing a couple of things.


### Enter the "Application"

In [FlowForge 1.5](/blog/2023/03/flowforge-1-5-0-released/), we have introduced a new concept called an **Application**. 

An Application will allow you to organize multiple Node-RED instances into a single managed group. 

As of the 1.5 release, an Application can still only have a single Node-RED instance, but in future releases, Applications will allow for multiple Node-RED instances and will allow us to implement capabilities such as **DevOps Pipelines** and **High Availability**.

### "Projects" to "Instances"

Until now, 'Project' encapsulated both the Node-RED instance that was running in FlowForge, and the associated devices (remote instances), settings and environment variables. It was an overloaded term, and it caused confusion with our users.

To simplify things, and to adhere more to the terminology familiar with the Node-RED community, we are renaming Projects to **Instances**.

An **Instance** is a customized version of Node-RED that includes various FlowForge plugins to integrate it with the FlowForge platform. It can also be used to manage the environment variables used in your Node-RED flows. 

Instances can either be:

- **Local** - An instance of Node-RED running in FlowForge.
- **Remote** - An instance of Node-RED, managed by FlowForge, running on a Device.

In future releases, environment variables will also be able to be stored at the Application level, and shared across multiple Node-RED Instances.

### Devices

FlowForge can also be used to manage remote Node-RED instances. This is typically useful when you have a number of remote devices that are required to run the same Node-RED instance, and may have variation in configuration or environment variables for example.

Devices are registered to an Instance, and can be configured to run [Snapshots](https://flowforge.com/docs/user/concepts/#instance-snapshot) of the Instance running in FlowForge.

To accomplish this remote management capability, the [FlowForge Device Agent](https://github.com/flowforge/flowforge-device-agent) needs to be installed on each device. Devices are registered with a Team, and then the appropriate device(s) are assigned to a Node-RED instance that should be deployed to the device(s). When the Node-RED instance is ready for deployment, a user creates a snapshot of the instance and marks it as a target snapshot for the device.

We hope these changes will simplify the FlowForge terminology for our users and allow us to grow the FlowForge platform. If you have any feedback or thoughts, please do reach out to us.