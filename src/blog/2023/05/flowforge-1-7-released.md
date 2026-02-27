---
title: FlowFuse 1.7 Now Available with Remote Node-RED Editor Access
subtitle: Further improving fleet management and maintenance of remote Node-RED instances
description: FlowFuse now supports access to the Node-RED Editor on devices
date: 2023-05-11 
authors: ["marian-demme"]
image: /blog/2023/05/images/release-1.7.0.png
tags:
    - posts
    - flowfuse
    - releases
---

FlowFuse 1.7 adds new support for accessing the Node-RED Editor on Devices via FlowFuse.

<!--more-->

## Further improving fleet management and maintenance of remote Node-RED instances

We are excited to introduce a new feature that will simplify the process of debugging and developing flows for devices. Our latest feature, "Editing Flows on Devices" allows users to access the editor directly on their device without the need for complex network configurations or firewalls. This feature will significantly improve the user experience, making it easier and more efficient to work with devices.

This update is a part of our ongoing commitment to making FlowFuse the best possible solution for developing your Node-RED flows, no matter where they're running. In fact, as part of our last release 1.6, we already introduced the feature: ["Access Node-RED logs from remote devices"](../../04/flowforge-1-6-released/#access-node-red-logs-from-remote-devices). This feature made it easy for users to troubleshoot and debug. Building on that, we've taken the next step, and it's now possible to access the Device Editor.

<lite-youtube videoid="zS6P3RR86vE" params="rel=0" style="width: 100%; height: 315px;" title="YouTube video player"></lite-youtube>

## Device Status Visualisation

This FlowFuse version upgrades device monitoring. It's made easier to manage your devices effectively, especially when there's many of them. Now we offer an intuitive, user-friendly method for users to keep an eye on their devices' status and evaluate the health of their team's devices overall. Creating an overview of your fleet's health, however large your fleet might be.

<lite-youtube videoid="S--viuPhrS8" params="rel=0" style="width: 100%; height: 315px;" title="YouTube video player"></lite-youtube>

## Auto Restart for Hung Node-RED Instances

This enhancement ensures a more robust and reliable experience when working with Node-RED flows. The launcher now actively monitors the Node-RED process to detect if it has become unresponsive or hung, in addition to the existing checks for start-up and unexpected process exits. This advancement takes us one step further in improving the availability of our Node-RED instances.

## Ongoing Topics

### High Availability

We're actively progressing on the topic of enhancing High Availability in FlowFuse for Node-RED. Our initial tasks and modifications have been identified, specifically pertaining to the operation of Node-RED instances within the k8s environment. These adjustments are aimed at constructing a more resilient system. Stay tuned for a comprehensive update regarding our advancements in High Availability.

### SOC2 Certification

Dedicated to upholding the highest levels of security and privacy, our company acknowledges the significance of industry-standard certifications like SOC2 in fostering trust with our customers and partners. We aim to achieve SOC2 Type 1 certification by the end of Q2 and subsequently maintain a continuous SOC2 Type 2 certification. We will keep you informed on our progress as we reach essential milestones in our SOC2 certification journey. Rest assured, our commitment to delivering the utmost security and privacy for our customers and partners remains unwavering.

### AWS Marketplace onboarding

We are excited to provide an update on our ongoing task of onboarding Node-RED instances to AWS Marketplace via FlowFuse Cloud, which we have started in this Iteration. By offering Node-RED instances through AWS Marketplace, we aim to simplify the deployment process for our customers.

One of the significant challenges we are currently addressing is handling our current payment system in parallel with a new method. This will ensure a seamless billing experience for our customers, as they will be able to manage their Node-RED instance subscriptions through their existing AWS accounts.

## Contributors
We'd like the thank the following for their contributions to this release:

- [@andreikop](https://github.com/andreikop) for their work on the [flowforge-driver-k8s #80](https://github.com/FlowFuse/flowforge-driver-k8s/pull/80) and [flowforge/helm #125](https://github.com/FlowFuse/helm/pull/125)
- [@elenaviter](https://github.com/elenaviter) for their work on [flowforge/helm #126](https://github.com/FlowFuse/helm/pull/126)

As an open-source project, we welcome community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](/docs/contribute/).

## What's next?

We're always working to enhance your experience with FlowFuse. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page/changelog/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/FlowFuse/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowFuse. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose). 

Together, we can make FlowFuse better with each release!

## Bug Fixes

Incorrect number of days displayed when adding a new license [#1895](https://github.com/FlowFuse/flowfuse/issues/1895)

Users were unable to upgrade modules in Manage Palette, even after restarting Node-RED. [#2005](https://github.com/FlowFuse/flowfuse/issues/2005)

Enable 'Delete Team' Button [#2031](https://github.com/FlowFuse/flowfuse/issues/2031)

Triggering a Node-RED restart using the action button resulted in two instances of Node-RED running in the container, causing one instance to crash due to port 1880 being already in use. [#2031](https://github.com/FlowFuse/flowfuse/issues/1860)

Error deleting instance with missing subscription [#2080](https://github.com/FlowFuse/flowfuse/issues/2080)

Snapshot Rollback no longer working [#2026](https://github.com/FlowFuse/flowfuse/issues/2026)

Users receiving an unauthorized error when attempting to switch to a team in which they are a member [#1845](https://github.com/FlowFuse/flowfuse/issues/1845)

Cannot select "Member" option when inviting a team member [#2084](https://github.com/FlowFuse/flowfuse/issues/2084)

## Try it out

We're confident you can have self managed FlowFuse running locally in under 30 minutes.
You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({% include "sign-up-url.njk" %}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 1.7.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform please raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).
That's also a great place to send us any feedback or feature requests.

You can also get help on [the Node-RED forums](https://discourse.nodered.org/)

As well as in the [forum within our Github project](https://github.com/FlowFuse/flowfuse/discussions)

Chat with us on the `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack)

You can raise a support ticket by emailing [support@flowfuse.com](mailto:support@flowfuse.com)

We've also added a live chat widget to our website, you can access it using the icon on the bottom right corner of our website. We'd love to hear from you.
