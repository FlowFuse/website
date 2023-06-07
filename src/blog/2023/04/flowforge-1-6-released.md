---
title: FlowForge v1.6 Now Available
subtitle: FlowForge Now Supports Multi-Instance Node-RED for Complex Application Development
description: FlowForge Now Supports Multi-Instance Node-RED for Complex Application Development
date: 2023-04-13 
authors: ["ian-skerrett"]
image: /blog/2023/04/images/release-1.6.0.png
tags:
    - posts
    - flowforge
    - releases
---

The new FlowForge 1.6 adds new support for multi-instance Node-RED within a single application and support for logging from remote devices.

<!--more-->

## FlowForge Applications Can Now Support Multi-Instance Node-RED

FlowForge 1.6 expands the scope of applications to now allow for multiple instances of Node-RED. For complex Node-RED applications, it is common to have different flows interacting with other flows or flows deployed to different target environments. The ability to associate all these different flows with a single application makes it easier for the development, test and deployment of these types of complex applications.

<iframe width="560" height="315" src="https://www.youtube.com/embed/OHChdWeRI9Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Access Node-RED logs from remote devices

FlowForge makes it easy to deploy Node-RED out to remote devices. However, once Node-RED has been deployed to the remote device it is often difficult to troubleshoot or debug. Now with FlowForge 1.6, you can get access to the Node-RED logs from remote devices. This makes it much easier to understand and debug the behavior of a remote device.

<iframe width="560" height="315" src="https://www.youtube.com/embed/yW1zxwiCmto" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Other Improvements


Update email address verification  [#813](https://github.com/flowforge/flowforge/issues/813)

Reminder email about trial doesn't include a link to FF Cloud [#1815](https://github.com/flowforge/flowforge/issues/1815)

Sign-up coupons improvement [#1788](https://github.com/flowforge/flowforge/issues/1788)

New FF_Instance_* envvars inline with new terminology [#1844](https://github.com/flowforge/flowforge/issues/1844)

Deprecate FF_PROJECT_* envvars [#1844](https://github.com/flowforge/flowforge/issues/1844)

Integrate with PostHog events [#1922](https://github.com/flowforge/flowforge/pull/1922)

Introduce search bar to docs/handbook  [#620](https://github.com/flowforge/website/pull/620) 


## Bug Fixes

Deleting instances from the instance list fails [#1859](https://github.com/flowforge/flowforge/issues/1859)

Removing old projects with missing subscriptions fails [#1837](https://github.com/flowforge/flowforge/issues/1837)

Changing to a team as a member shows unauthorized error [#1845](https://github.com/flowforge/flowforge/issues/1845)

Application Overview: “Open Editor” shouldn’t show (or should be disabled) if in “Starting” state [#1931](https://github.com/flowforge/flowforge/issues/1931)


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
