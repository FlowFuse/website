---
title: FlowForge now offers High Availability Node-RED
subtitle: FlowForge 1.8 makes Node-RED applications more reliable and scalable, plus more streamline deployment pipelines.
description: FlowForge now supports High Availibility, DevOps Pipelines and more
date: 2023-06-08 
authors: ["marian-demme"]
image: /blog/2023/06/images/release-1.8.0.png
---

FlowForge 1.8 introduces two key features that allow organizations to reliably deploy Node-RED applications into production. In 1.8, it is now possible to run Node-RED applications with high availability so the application is more scalable and more fault tolerant. FlowForge 1.8 also introduces software deliver pipelines, so development teams can now set up dev/test/production environments for their Node-RED applications.

<!--more-->

## More reliable and scalable Node-RED applications
Do you want to run business-critical processes in Node-RED and need to ensure they are always available and can handle increasing workloads? We're excited to introduce High Availability (HA) in FlowForge to support your needs. Suppose you're managing a large influx of HTTP requests to your Node-RED instances. With our latest update, FlowForge now ensures that these requests are evenly distributed across two instances. This means your applications are less likely to experience downtime and can manage higher traffic loads. You can easily activate HA mode during the creation of an instance. For more details, please see our [documentation](https://flowforge.com/docs/user/).

High Availability is our first [preview feature](https://flowforge.com/handbook/product/versioning/#preview-features), and your feedback is crucial. We encourage you to try out HA in your Node-RED instances and share your experiences with us. Your feedback will help us refine this feature and make it even better.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zS6P3RR86vE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## DevOps Pipelines

DevOps Pipelines enable you to manage and track multiple deployments of your Node-RED instances, effortlessly progressing through stages such as testing, development, staging, and production. In [FlowForge Version 1.4](../../02/flowforge-1-4-0-released),  we introduced the "Support for Staged Development". Now, we're taking it one step further. Within your applications section, you are now able to create your own DevOps Pipeline and track the progress across each instance in one view.

<iframe width="560" height="315" src="https://www.youtube.com/embed/S--viuPhrS8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## User interface for Device Agent

In our previous release, we introduced [Editor Access for Devices](../../05/flowforge-1-7-released). Now, the FlowForge Device Agent now comes with its very own User Interface (UI) for configuration.

Imagine this: Your industrial equipment arrives with the Device Agent preinstalled. In the past, you might have faced challenges in configuring and connecting your device with FlowForge, particularly if you had no direct shell access. But not any more.

With the newly introduced UI, you can easily set up and connect your device with FlowForge without needing to access the command line interface directly. This simplifies the process significantly and saves you time. For more details, see our [documentation](https://flowforge.com/docs/user/devices/).

## Node-RED 3.1 Beta 3 Available

FlowForge Cloud is a great place to try out the new Node-RED features, with FlowForge Cloud now including the [Node-RED 3.1.0-beta.3](https://discourse.nodered.org/t/node-red-3-1-0-beta-3-released/78716). If you want to try this version you can [duplicate your instance](https://flowforge.com/docs/user/instance-settings/) and [upgrade your stack](https://flowforge.com/docs/user/changestack/).

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

When editing a device in developer mode via the tunnel/proxy connection, a list of team projects are not presented in the "Target" field of the project-link nodes. [#2228](https://github.com/flowforge/flowforge/issues/2228)

If a user invites an external user to their team with an sso-enable email domain, when that user registers and logs in, they are not added to the team they were invited to and must be re-invited. [#2232](https://github.com/flowforge/flowforge/issues/2232)

No warning given if tying to start device editor when NR is not running [#2233](https://github.com/flowforge/flowforge/issues/2233)

Stuck on the form Create a new Application & Instance after using an already known instance name [#2221](https://github.com/flowforge/flowforge/issues/2221)

If the device agent finds itself in Developer mode, it stops pulling snapshots from the platform [#97](https://github.com/flowforge/flowforge-device-agent/issues/97)

Accessing the Admin Settings General page resets the Platform Statstics token [#2140](https://github.com/flowforge/flowforge/issues/2140)

Selection of Team and Instance in nr-tools-plugin not possible [#15](https://github.com/flowforge/flowforge-nr-tools-plugin/issues/15)

HOME env var not set within Node-RED process [#117](https://github.com/flowforge/flowforge-nr-launcher/issues/117)

## Try it out

We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), use [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Get started for free](https://app.flowforge.com/account/create) on FlowForge Cloud.

## Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.8.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/upgrade/).

## Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there. Additionally you can go the the [community forum](https://community.flowforge.com) if you have
any feedback or feature requests.
