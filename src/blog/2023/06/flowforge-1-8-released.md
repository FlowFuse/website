---
title: Enhancing Node-RED with High Availability in FlowForge 1.8
subtitle: Empowering Node-RED with increased availability and streamlined deployment pipelines
description: FlowForge now supports High Availibility, DevOps Pipelines and more
date: 2023-06-08 
authors: ["marian-demme"]
#image: /blog/2023/05/images/release-1.8.0.png
---

The FlowForge 1.8 update introduces a suite of features designed to optimize your Node-RED experience. High Availability ensures your business-critical processes stay running under heavy workloads, while DevOps Pipelines allow for smoother, staged deployments. Additionally, the integration of a new User Interface for the Device Agent significantly streamlines the configuration process.

<!--more-->

## High Availability
Are you running business-critical processes in Node-RED and need to ensure they're always available and can handle increasing workloads? We heard you! We're excited to introduce High Availability (HA) in FlowForge to support your needs.

Say you're managing a large influx of HTTP requests to your Node-RED instances. With our latest update, FlowForge now ensures that these requests are distributed evenly across your instances. This means your applications are less likely to experience downtime and can handle higher traffic loads​.

You might be wondering about editing flows in this new HA environment. For now, we've disabled editing in the HA environment to ensure consistency across instances. But don't worry, you can still develop your flows in a single instance and then seamlessly roll them out to your HA-ready production instance. See therefore also our next new feature, DevOps Pipelines. High Availability is our first [preview feature](https://flowforge.com/handbook/product/versioning/#preview-features), and your feedback is crucial. We encourage you to try out HA in your Node-RED instances and share your experiences with us. Your feedback will help us refine this feature and make it even better.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zS6P3RR86vE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## DevOps Pipelines

Have you ever worried about the stability of new updates in your Node-RED production environment? Our new feature is designed to help you manage these concerns. DevOps Pipelines allow you to manage and track multiple deployments of your Node-RED instances, progressing through stages like test, development, staging, and production with ease​.

<iframe width="560" height="315" src="https://www.youtube.com/embed/S--viuPhrS8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## User interface for Device Agent

In our previous release, we introduced [Editor Access for Devices](blog/2023/05/flowforge-1-7-released.md). Now, we're taking it a step further. The FlowForge Device Agent now comes with its very own User Interface (UI) for configuration.

Imagine this: Your industrial equipment arrives with the Device Agent preinstalled. In the past, you might have faced challenges in configuring and connecting your device with FlowForge, particularly if you had no direct shell access. But not any more.

With the newly introduced UI, you can easily set up and connect your device with FlowForge without needing to access the command line interface directly. This simplifies the process significantly and saves you time. For more details, see our [documentation](https://flowforge.com/docs/user/devices/).

## Ongoing Topics

### SOC2 Certification

We're making great strides on our journey towards SOC2 certification, striving to meet the highest industry standards for security and privacy. While we're not quite ready to disclose specific milestones, be assured that everything is progressing smoothly. As we continue working diligently towards our target, we promise to keep you informed every step of the way. Our unwavering commitment to deliver secure and private services to our customers and partners remains our foremost priority. Stay tuned for more updates!

## What's next?

We're always working to enhance your experience with FlowForge. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](https://flowforge.com/product/roadmap/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/flowforge/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowForge. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/flowforge/flowforge/issues/new/choose). 

Together, we can make FlowForge better with each release!

## Bug Fixes

...

## Try it out

We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), use [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Get started for free](https://app.flowforge.com/account/create) on FlowForge Cloud.

## Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.8.

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
