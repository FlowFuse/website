---
title: FlowForge 1.4 is now available, FEATURE and much more
subtitle: Our second release of 2023 with some great new features to try out.
description: FlowForge v1.4 is now available, FEATURE
date: 2023-02-16 18:00:00.0
authors: ["rob-marcer"]
video: ey3xv5j5x7k
image: /blog/2023/01/images/flowforge-130-hero.png
---

Share your flows via team libraries, control access to your Node-RED dashboards using FlowForge credentials, and filter your audit logs by users and actions.

<!--more-->

We're pleased to announce version 1.3 is now available! Due to the recent holiday season, most of our team have been away from their desks but we still have some great new features to share. Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.

To make it easy for everyone to experience FlowForge, we are introducing a new [free 30-day trial](https://app.flowforge.com/account/create). With this trial, you can experience the power of using FlowForge to quickly deliver Node-RED applications in a reliable, repeatable, collaborative, and secure manner. To get your trial simply [sign up for a new FlowForge team](https://app.flowforge.com/account/create).

## Features

[Share your flows via team libraries](https://github.com/flowforge/flowforge/issues/237) \
FlowForge has now added the ability for you to share your flows via the import and export features in Node-RED. Once you export a flow everyone else in your FlowForge team will be able to import your work into their projects. You can see a demonstration of this new feature in [the video](https://youtu.be/B7XK3TUklUU) below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/B7XK3TUklUU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Control access to your Node-RED dashboards using FlowForge credentials](https://github.com/flowforge/flowforge/issues/1325) \
In FlowForge 0.10 we added the ability to secure endpoints created within your FlowForge projects. This allows you to create dashboards or APIs and limit who can access them. In 1.3 we've added the ability for you to limit access to those same resources based on the visitor having a user account on your FlowForge team. You can see a demonstration of this new feature in [the video](https://youtu.be/JRk-Cf7eNIo) below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/JRk-Cf7eNIo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Filter your audit logs for easier reading](https://github.com/flowforge/flowforge/issues/1448) \
In FlowForge 1.3 we’ve added the ability to filter your admin logs by user or action type. We think this is a great new feature which will help admins have confidence that they will be able to review the audit logs quickly when needed. You can see a demonstration of this new feature in [the video](https://youtu.be/p0Vuy5x42Go) below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/p0Vuy5x42Go" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Improvements

With FlowForge v1.4 some changes were made under the hood to speed up the recovery
of Node-RED instances. On terminal failures of an instance it will now be
automatically be redeployed with the correct flows. This uses Kubernetes features
and is also available if you've installed through [kubernetes](https://flowforge.com/docs/install/kubernetes/).
To migrate the old style of deployments to this system a restart or stack upgrade is needed.



## Bug Fixes

We've fixed the following bugs in this release.
- Project status UI sometimes getting stuck when restarting [#1232](https://github.com/flowforge/flowforge/issues/1232)
- SSO users asked to click link in email to verify [#1543](https://github.com/flowforge/flowforge/issues/1543)
- SSO users unable to edit settings [#1542](https://github.com/flowforge/flowforge/issues/1542)
- SSO users not redirected to editor when signing in [#1481](https://github.com/flowforge/flowforge/issues/1481)

## Contributors

We'd like to thank the following for their contributions to this release:

[flecoufle](https://github.com/flecoufle) for their work on [#89](https://github.com/flowforge/helm/pull/89)

As an open-source project, we welcome community involvement in what we're building.
If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

## Try it out

We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), use [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Get started for free](https://app.flowforge.com/account/create) on FlowForge Cloud.

## Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.3.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/upgrade/).

## Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That's also a great place to send us any feedback or feature requests.

You can also get help on [the Node-RED forums](https://discourse.nodered.org/)

AS well as in the [forum within our Github project](https://github.com/flowforge/flowforge/discussions)

Chat with us on the `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack)

You can raise a support ticket by emailing [support@flowforge.com](mailto:support@flowforge.com)

We've also added a live chat widget to our website, you can access it using the icon on the bottom right corner of our website. We'd love to hear from you.