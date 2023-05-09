---
title: FlowForge v1.7 Now Available
subtitle: FlowForge Now Supports Access to the Node-RED Editor on Devices
description: FlowForge Now Supports Access to the Node-RED Editor on Devices
date: 2023-05-11 
authors: ["marian-demme"]
image: /blog/2023/04/images/release-1.6.0.png
---

The new FlowForge 1.7 adds new support for accesing the Node-RED Editor on Devices via FlowForge

<!--more-->

## Presenting Remote Node-RED Editor Access for Devices

We are excited to introduce a new feature that will simplify the process of debugging and developing flows for devices. Our latest feature, "Direct Editing of Flows on Devices," allows users to access the editor directly on their device without the need for complex network configurations or firewalls. This feature will significantly improve the user experience, making it easier and more efficient to work with devices.

<iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Introducing DevOps Piplelines



<iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Further Improvements

### Device Status Visualisation

We are excited to announce the addition of a new chart for filtering devices in FlowForge. This feature provides customers with a more intuitive and user-friendly way to monitor the status of their devices and assess their team's overall device health.



### Detect hung Node-RED flows and force a restart when necessary

This enhancement ensures a more robust and reliable experience when working with Node-RED flows. The launcher now actively monitors the Node-RED process to detect if it has become unresponsive or hung, in addition to the existing checks for start-up and unexpected process exits. This advancement takes us one step further in enhancing the availability of our Node-RED instances.

[See details](https://github.com/flowforge/flowforge-nr-launcher/issues/110)

### Device Agent now available as SNAP




## Ongoing Topics

### High Availibility


### SOC2 Certification

Dedicated to upholding the highest levels of security and privacy, our company acknowledges the significance of industry-standard certifications like SOC2 in fostering trust with our customers and partners. We aim to achieve SOC2 Type 1 certification by the end of Q2 and subsequently maintain a continuous SOC2 Type 2 certification. We will keep you informed on our progress as we reach essential milestones in our SOC2 certification journey. Rest assured, our commitment to delivering the utmost security and privacy for our customers and partners remains unwavering.

### AWS Marketplace onboarding

We are excited to provide an update on our ongoing task of onboarding Node-RED instances to AWS Marketplace via FF-Cloud, which we have started in this Iteration. By offering Node-RED instances through AWS Marketplace, we aim to simplify the deployment process for our customers while also expanding our market presence and attracting more customers.

One of the significant challenges we are currently addressing is handling our current payment system Stripe in parallel with the AWS payment system. This will ensure a seamless billing experience for our customers, as they will be able to manage their Node-RED instance subscriptions through their existing AWS accounts.

## Bug Fixes

Incorrect number of days displayed when adding a new license [#1895](https://github.com/flowforge/flowforge/issues/1895)

Users were unable to upgrade modules in Manage Palette, even after restarting Node-RED. [#2005](https://github.com/flowforge/flowforge/issues/2005)

Enable 'Delete Team' Button [#2031](https://github.com/flowforge/flowforge/issues/2031)

Triggering a Node-RED restart using the action button resulted in two instances of Node-RED running in the container, causing one instance to crash due to port 1880 being already in use. [#2031](https://github.com/flowforge/flowforge/issues/1860)

Error deleting instance with missing subscription [#2080](https://github.com/flowforge/flowforge/issues/2080)

Snapshot Rollback no longer working [#2026]https://github.com/flowforge/flowforge/issues/2026

Users receiving an unauthorized error when attempting to switch to a team in which they are a membe [#1845](https://github.com/flowforge/flowforge/issues/1845)

## Try it out

We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), use [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Get started for free](https://app.flowforge.com/account/create) on FlowForge Cloud.

## Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.6.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/upgrade/).

## Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That's also a great place to send us any feedback or feature requests.

You can also get help on [the Node-RED forums](https://discourse.nodered.org/)

As well as in the [forum within our Github project](https://github.com/flowforge/flowforge/discussions)

Chat with us on the `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack)

You can raise a support ticket by emailing [support@flowforge.com](mailto:support@flowforge.com)

We've also added a live chat widget to our website, you can access it using the icon on the bottom right corner of our website. We'd love to hear from you.
