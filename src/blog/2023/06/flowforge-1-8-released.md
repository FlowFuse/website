---
title: FlowFuse now offers High Availability Node-RED
subtitle: FlowFuse 1.8 makes Node-RED applications more reliable and scalable, plus more streamline deployment pipelines.
description: FlowFuse now supports High Availibility, DevOps Pipelines and more
date: 2023-06-08 
authors: ["marian-demme"]
image: /blog/2023/06/images/release-1.8.0.png
tags:
    - posts
    - flowfuse
    - releases
---

FlowFuse 1.8 introduces two key features that allow organizations to reliably deploy Node-RED applications into production. In 1.8, it is now possible to run Node-RED applications with high availability so the application is more scalable and more fault tolerant. FlowFuse 1.8 also introduces software deliver pipelines, so development teams can now set up dev/test/production environments for their Node-RED applications.

<!--more-->

## More reliable and scalable Node-RED applications
FlowFuse now makes it possible to deploy business critical applications built in Node-RED that are reliable and scalable. The new 1.8 features allows a Node-RED instance to be deployed in high availability mode, meaning two instances of the same Node-RED flows are available behind a load balancer. This allows for increased traffic to be automatically distributed across the two Node-RED instances. This means your Node-RED applications can handle more traffic and experience less downtime. For more details, please see our [documentation](/docs/user/high-availability).

Additionally, we're pleased to offer a 30-day premium trial license for self-managed installs on Kubernetes. To avail of this offer, book a demo at [flowforge.com/book-demo](/book-demo).

High Availability is our first [preview feature](/handbook/product/versioning/#preview-features), and your feedback is crucial. We encourage you to try out HA in your Node-RED instances and share your experiences with us. Your feedback will help us refine this feature and make it even better.

<iframe width="560" height="315" src="https://www.youtube.com/embed/mbDkjKhVwIw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## DevOps Pipelines

FlowFuse 1.8 introduces the concept of Pipelines to better organize your Node-RED development. Development team can now set up different staging environments for different steps in the development cycle, ex. test, development and production. Node-RED instances can be pushed along a pipeline as they move along the development process. This allows for a better organized and predictable development process for your team. 

The new Pipelines feature builds upon the Staged Development support that we introduced in[FlowFuse Version 1.4](../../02/flowforge-1-4-0-released). We highly recommend that development teams avoid developing their flows directly in production instances. This approach fosters a more reliable and robust development process, reducing the risks associated with production environment modifications. Instead, start your development in a dedicated development or test instance and then deploy your Node-RED instance to production once they have been thoroughly tested and reviewed. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/Pbql22f3vqY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## User interface for Device Agent

In our previous release, we introduced [Editor Access for Devices](../../05/flowforge-1-7-released). Now, the FlowFuse Device Agent now comes with its very own User Interface (UI) for configuration.

Imagine this: Your industrial equipment arrives with the Device Agent preinstalled. In the past, you might have faced challenges in configuring and connecting your device with FlowFuse, particularly if you had no direct shell access. But not any more.

With the newly introduced UI, you can easily set up and connect your device with FlowFuse without needing to access the command line interface directly. This simplifies the process significantly and saves you time. For more details, see our [documentation](/docs/device-agent/introduction/).

## Node-RED 3.1 Beta 3 Available

FlowFuse Cloud is a great place to try out the new Node-RED features, with FlowFuse Cloud now including the [Node-RED 3.1.0-beta.3](https://discourse.nodered.org/t/node-red-3-1-0-beta-3-released/78716). If you want to try this version you can [duplicate your instance](/docs/user/instance-settings/) and [upgrade your stack](/docs/user/changestack/).

## Ongoing Topics

### SOC2 Certification

We're making great strides on our journey towards SOC2 certification, striving to meet the highest industry standards for security and privacy. While we're not quite ready to disclose specific milestones, be assured that everything is progressing smoothly. As we continue working diligently towards our target, we promise to keep you informed every step of the way. Our unwavering commitment to deliver secure and private services to our customers and partners remains our foremost priority. Stay tuned for more updates!

## What's next?

We're always working to enhance your experience with FlowFuse. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](/changelog/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/FlowFuse/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowFuse. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose). 

Together, we can make FlowFuse better with each release!

## Bug Fixes

When editing a device in developer mode via the tunnel/proxy connection, a list of team projects are not presented in the "Target" field of the project-link nodes. [#2228](https://github.com/FlowFuse/flowfuse/issues/2228)

If a user invites an external user to their team with an sso-enable email domain, when that user registers and logs in, they are not added to the team they were invited to and must be re-invited. [#2232](https://github.com/FlowFuse/flowfuse/issues/2232)

No warning given if tying to start device editor when NR is not running [#2233](https://github.com/FlowFuse/flowfuse/issues/2233)

Stuck on the form Create a new Application & Instance after using an already known instance name [#2221](https://github.com/FlowFuse/flowfuse/issues/2221)

If the device agent finds itself in Developer mode, it stops pulling snapshots from the platform [#97](https://github.com/FlowFuse/device-agent/issues/97)

Accessing the Admin Settings General page resets the Platform Statstics token [#2140](https://github.com/FlowFuse/flowfuse/issues/2140)

Selection of Team and Instance in nr-tools-plugin not possible [#15](https://github.com/FlowFuse/nr-tools-plugin/issues/15)

HOME env var not set within Node-RED process [#117](https://github.com/FlowFuse/flowforge-nr-launcher/issues/117)

## Try it out

We're confident you can have self managed FlowFuse running locally in under 30 minutes.
You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({{ site.onboardingURL }}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 1.8.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go the the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.
