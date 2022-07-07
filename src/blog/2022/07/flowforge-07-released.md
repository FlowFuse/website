---
title: FlowForge 0.7 released
subtitle: Rollbacks, Device Environment Variables and a FlowForge Theme
description: Rollbacks, Device Environment Variables and a FlowForge Theme
date: 2022-07-07 12:00:00.0
authors: ["sam-machin"]
video: BBNzFInc_2E
---
Rollback projects to a previous snapshot, Improvements in using Devices and more.

<!--more-->
[TODO] Update video url and time.

Keep reading for  the details of whats in this release our you can watch our 1 min roundup video of the new release above. 

We're pleased to announce version 0.7 is now available. the next release of the FlowForge application.

## Features
[Rollback](https://github.com/flowforge/flowforge/issues/587)
FlowForge is about running Node-RED at any scale, part of that scale is having multiple users collaborate on the same project. When you are collaborating with people it's important to be able to go back in time to a known working state. As part of that we are introducing rollbacks, this means that you can now take a snapshot of your project at a point in time and then make changes safe in the knowledge that you can rollback to that previous snapshot if you need to.

[Device Environment Variables](https://github.com/flowforge/flowforge/issues/680)
In the last release we introduced the concept of devices. We're already learning from how these are used and one feature we've added in 0.7 is Device Environment Variables. You have been able to set Environment Variables at the project level but when deploying a snapshot to multiple devices you may want to override these values for each device, for example to set a site ID. With device specific variable users are enabled to differentiate based on the context in their flows.

[FlowForge Theme](https://github.com/flowforge/flowforge-nr-theme/)
Now that we have a stronger visual identity in the Forge application we have continued that work through to the Node-RED editor. If you are running a Node-RED 3.0 stack you will see a different theme in the editor. It's still very much Node-RED but just has some subtle hints to tie it back to the FlowForge application. We will continue to iterate on this to further integrate the experience between FlowForge and Node-RED in both directions.
![](../images/ff-07-theme.png)

[ProjectTypes](https://github.com/flowforge/flowforge/issues/380)
The introduction of ProjectTypes is largely an internal feature to support our FlowForge Cloud proposition by being able to have different price points for projects based on the capacity and features available. While Stacks were a part of this ProjectTypes allows for an aggregation of stacks so that users can change versions of Node-RED while remaining on the same pricing tier.

[Stack Versions](https://github.com/flowforge/flowforge/issues/694)
This allows an admin to link different stacks together in their lineage. This allows administrators to nudge users to new Node-RED versions or upgrade pre-installed dependencies when running in a container environment. Any users with projects on an old version will be prompted that there is an update available, making it even easier to stay up to date with Node-RED versions when you build your flows on FlowForge.


## Improvements
We've made a number of improvements to the overall experience of running FlowForge.
- The Team Switch menu has been moved to a more prominent position in the interface, this also makes it easier to see how to create a new team. [#616](https://github.com/flowforge/flowforge/issues/616)
- Notifications have had an overhaul, you will now see waiting invites on all pages. [#515](https://github.com/flowforge/flowforge/issues/515)
- If you are running your own copy of FlowForge you can now see the version details in the admin pages [#655](https://github.com/flowforge/flowforge/issues/655)
- Device polling is no longer an INFO level message  filling the log on your devices [#10](https://github.com/flowforge/flowforge-device-agent/issues/10)



## Bug Fixes
We've fixed the following bugs in this release.
- [Devices now listen on all Interfaces allowing you to run local http servers](https://github.com/flowforge/flowforge-device-agent/issues/7)<br>
- [Solved an issue where a device gets an error  unknown device](https://github.com/flowforge/flowforge-device-agent/issues/7)<br>
- [The Audit Log in the Forge app displays the correct IP when a user logs in to Node-RED](https://github.com/flowforge/flowforge/issues/507)<br>
- [Resolved an issue with devices downloading snaphots from legacy stacks](https://github.com/flowforge/flowforge/issues/507)<br>
- [Fixed an error where objects in the node-red log would hang the log page](https://github.com/flowforge/flowforge/issues/735)<br>
- [Next Billing Date is now shown correctly](https://github.com/flowforge/flowforge/issues/745)<br>
- [Fixed a bug where the loading page would flash during polling](https://github.com/flowforge/flowforge/issues/689)<br>

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 0.7 - 

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading FlowForge on a local server](http://flowforge.com/docs/install#upgrade).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowForge Cloud can raise a ticket by emailing support@flowforge.com

We also have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
