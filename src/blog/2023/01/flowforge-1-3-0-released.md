---
title: FlowFuse 1.3 is now available, share your flows through our new team libraries and much more
subtitle: Our first release of 2023 with some great new features to try out, happy new year from everyone at FlowFuse!
description: FlowFuse 1.3 is now available, share your flows through our new team libraries and much more
date: 2023-01-19 18:00:00.0
authors: ["rob-marcer"]
video: ey3xv5j5x7k
image: /blog/2023/01/images/flowforge-130-hero.png
tags:
    - posts
    - flowfuse
    - releases
---

Share your flows via team libraries, control access to your Node-RED dashboards using FlowFuse credentials, and filter your audit logs by users and actions.

<!--more-->

We're pleased to announce version 1.3 is now available! Due to the recent holiday season, most of our team have been away from their desks but we still have some great new features to share. Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.

To make it easy for everyone to experience FlowFuse, we are introducing a new [free 30-day trial]({% include "main-cta-url.njk" %}). With this trial, you can experience the power of using FlowFuse to quickly deliver Node-RED applications in a reliable, repeatable, collaborative, and secure manner. To get your trial simply [sign up for a new FlowFuse team]({% include "main-cta-url.njk" %}).

## Features

[Share your flows via team libraries](https://github.com/FlowFuse/flowfuse/issues/237) \
FlowFuse has now added the ability for you to share your flows via the import and export features in Node-RED. Once you export a flow everyone else in your FlowFuse team will be able to import your work into their projects. You can see a demonstration of this new feature in [the video](https://youtu.be/B7XK3TUklUU) below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/B7XK3TUklUU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Control access to your Node-RED dashboards using FlowFuse credentials](https://github.com/FlowFuse/flowfuse/issues/1325) \
In FlowFuse 0.10 we added the ability to secure endpoints created within your FlowFuse projects. This allows you to create dashboards or APIs and limit who can access them. In 1.3 we've added the ability for you to limit access to those same resources based on the visitor having a user account on your FlowFuse team. You can see a demonstration of this new feature in [the video](https://youtu.be/JRk-Cf7eNIo) below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/JRk-Cf7eNIo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Filter your audit logs for easier reading](https://github.com/FlowFuse/flowfuse/issues/1448) \
In FlowFuse 1.3 we’ve added the ability to filter your admin logs by user or action type. We think this is a great new feature which will help admins have confidence that they will be able to review the audit logs quickly when needed. You can see a demonstration of this new feature in [the video](https://youtu.be/p0Vuy5x42Go) below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/p0Vuy5x42Go" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Improvements

[Allow installation of FlowFuse on devices which can't access npm](https://github.com/FlowFuse/device-agent/issues/45) \
We've had feedback from customers that in some cases they want to use FlowFuse devices on hardware which cannot access [Node Package Manager](https://www.npmjs.com/) (npm). In a standard configuration of Node-RED, access to npm is mandatory to run your flows. In FlowFuse 1.3.0 we've added the ability for you to import all the data usually installed from npm without your devices having access to the npm service.

## Bug Fixes

We've fixed the following bugs in this release.
- Project status UI sometimes getting stuck when restarting [#1232](https://github.com/FlowFuse/flowfuse/issues/1232)
- SSO users asked to click link in email to verify [#1543](https://github.com/FlowFuse/flowfuse/issues/1543)
- SSO users unable to edit settings [#1542](https://github.com/FlowFuse/flowfuse/issues/1542)
- SSO users not redirected to editor when signing in [#1481](https://github.com/FlowFuse/flowfuse/issues/1481)

## Contributors

We'd like to thank the following for their contributions to this release:

[flecoufle](https://github.com/flecoufle) for their work on [#89](https://github.com/FlowFuse/helm/pull/89)

As an open-source project, we welcome community involvement in what we're building.
If you're interested in contributing, checkout our [guide in the docs](/docs/contribute/).

## Try it out

We're confident you can have self managed FlowFuse running locally in under 30 minutes.
You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({% include "main-cta-url.njk" %}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 1.3.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform please raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).
That's also a great place to send us any feedback or feature requests.

You can also get help on [the Node-RED forums](https://discourse.nodered.org/)

AS well as in the [forum within our Github project](https://github.com/FlowFuse/flowfuse/discussions)

Chat with us on the `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack)

You can raise a support ticket by emailing [support@flowfuse.com](mailto:support@flowfuse.com)

We've also added a live chat widget to our website, you can access it using the icon on the bottom right corner of our website. We'd love to hear from you.