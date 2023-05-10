---
title: FlowForge 1.7 Now Available
subtitle: FlowForge now supports access to the Node-RED Editor on devices
description: FlowForge now supports access to the Node-RED Editor on devices
date: 2023-05-11 
authors: ["marian-demme"]
# image: /blog/2023/04/images/release-1.6.0.png
---

FlowForge 1.7 adds new support for accessing the Node-RED Editor on Devices via FlowForge

<!--more-->

## Presenting Remote Node-RED Editor Access for Devices

We are excited to introduce a new feature that will simplify the process of debugging and developing flows for devices. Our latest feature, "Editing Flows on Devices," allows users to access the editor directly on their device without the need for complex network configurations or firewalls. This feature will significantly improve the user experience, making it easier and more efficient to work with devices.

<iframe width="560" height="315" src="https://youtu.be/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Device Status Visualisation

This upgrade simplifies device monitoring, making it even easier to manage your devices effectively. This new feature offers an intuitive, user-friendly method for users to keep an eye on their devices' status and evaluate the health of their team's devices overall. 

<iframe width="560" height="315" src="https://youtu.be/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Auto Restart for Hung Node-RED Instances

This enhancement ensures a more robust and reliable experience when working with Node-RED flows. The launcher now actively monitors the Node-RED process to detect if it has become unresponsive or hung, in addition to the existing checks for start-up and unexpected process exits. This advancement takes us one step further in enhancing the availability of our Node-RED instances.

[See details on GitHub](https://github.com/flowforge/flowforge-nr-launcher/issues/110)

## Ongoing Topics

### High Availibility

We're pleased to share our progress on enhancing High Availability in FlowForge. Based on customer feedback, our focus is implementing a hot-spare approach for Node-RED applications, providing automatic failover between instances for improved reliability and availability. We've identified our initial set of tasks and changes to how we'll run Node-RED instances with the k8s environment to create a more robust system. For a detailed update about High Availability you should definitely checkout our newest [Article](./....) about High Availability.

### SOC2 Certification

Dedicated to upholding the highest levels of security and privacy, our company acknowledges the significance of industry-standard certifications like SOC2 in fostering trust with our customers and partners. We aim to achieve SOC2 Type 1 certification by the end of Q2 and subsequently maintain a continuous SOC2 Type 2 certification. We will keep you informed on our progress as we reach essential milestones in our SOC2 certification journey. Rest assured, our commitment to delivering the utmost security and privacy for our customers and partners remains unwavering.

### AWS Marketplace onboarding

We are excited to provide an update on our ongoing task of onboarding Node-RED instances to AWS Marketplace via FlowForge Cloud, which we have started in this Iteration. By offering Node-RED instances through AWS Marketplace, we aim to simplify the deployment process for our customers.

One of the significant challenges we are currently addressing is handling our current payment system in parallel with a new method. This will ensure a seamless billing experience for our customers, as they will be able to manage their Node-RED instance subscriptions through their existing AWS accounts.

## What's next?

We're always working to enhance your experience with FlowForge. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](https://flowforge.com/product/roadmap/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/flowforge/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowForge. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/flowforge/flowforge/issues/new/choose). 

Together, we can make FlowForge better with each release!

## Bug Fixes

Incorrect number of days displayed when adding a new license [#1895](https://github.com/flowforge/flowforge/issues/1895)

Users were unable to upgrade modules in Manage Palette, even after restarting Node-RED. [#2005](https://github.com/flowforge/flowforge/issues/2005)

Enable 'Delete Team' Button [#2031](https://github.com/flowforge/flowforge/issues/2031)

Triggering a Node-RED restart using the action button resulted in two instances of Node-RED running in the container, causing one instance to crash due to port 1880 being already in use. [#2031](https://github.com/flowforge/flowforge/issues/1860)

Error deleting instance with missing subscription [#2080](https://github.com/flowforge/flowforge/issues/2080)

Snapshot Rollback no longer working [#2026](https://github.com/flowforge/flowforge/issues/2026)

Users receiving an unauthorized error when attempting to switch to a team in which they are a membe [#1845](https://github.com/flowforge/flowforge/issues/1845)

Cannot select "Member" option when inviting a team member [#2084](https://github.com/flowforge/flowforge/issues/2084)

## Try it out

We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), use [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Get started for free](https://app.flowforge.com/account/create) on FlowForge Cloud.

## Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.7.

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
