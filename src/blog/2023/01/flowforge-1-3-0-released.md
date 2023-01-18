---
title: FlowForge 1.3 is now available, share your flows through our new team libraries and much more
subtitle: Our first release of 2023 with some great new features to try out, happy new year from everyone at FlowForge!
description: 
date: 2023-01-19 18:00:00.0
authors: ["rob-marcer"]
video: TODO
---

Share your flows via team libraries, control access to your Node-RED dashboards using FlowForge credentials, and install FlowForge Node-RED instances on devices which cannot access npm.

<!--more-->

We're pleased to announce version 1.3.0 is now available! Due to the recent holiday season, most of our team have been away from their desks but we still have some great new features to share. Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.

To make it easy for everyone to experience FlowForge, we are introducing a new [free 30-day trial](https://app.flowforge.com/account/create). With this trial, you can experience the power of using FlowForge to quickly deliver Node-RED applications in a reliable, repeatable, collaborative, and secure manner. To get your trial simply [sign up for a new FlowForge team](https://app.flowforge.com/account/create).

## Features

[Share your flows via team libraries](https://github.com/flowforge/flowforge/issues/237)
FlowForge has now added the ability for you to share your flows via the import and export features in Node-RED. Once you export a flow everyone else in your FlowForge team will be able to import your work into their projects. You can see a demonstration of this new feature in [the video]() below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/TODO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Control access to your Node-RED dashboards using FlowForge credentials](https://github.com/flowforge/flowforge/issues/1325)
In FlowForge 0.10.0 we added the ability to secure endpoints created within your FlowForge projects. This allows you to create dashboards or APIs and limit who can access them. In 1.3.0 we've added the ability for you to limit access to those same resources based on the visitor having a user account on your FlowForge team. You can see a demonstration of this new feature in [the video]() below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/TODO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Install FlowForge Node-RED instances on devices which cannot access npm](https://github.com/flowforge/flowforge-device-agent/issues/45)
We've had feedback from customers that in some cases they want to use FlowForge devices on hardware which cannot access [Node Package Manager](https://www.npmjs.com/) (npm). In a standard configuration of Node-RED access to npm is mandatory to run your flows. In FlowForge 1.3.0 we've added the ability for you to import all the data usually installed from npm without your devices having access to the npm service. You can see a demonstration of this new feature in [the video]() below.

<div><iframe width="560" height="315" src="https://www.youtube.com/embed/TODO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Bug Fixes

We've fixed the following bugs in this release.

- Project status UI sometimes getting stuck when restarting [#1232](https://github.com/flowforge/flowforge/issues/1232)

- SSO users asked to click link in email to verify [#1543](https://github.com/flowforge/flowforge/issues/1543)

- SSO users unable to edit settings [#1542](https://github.com/flowforge/flowforge/issues/1542)

- SSO users not redirected to editor when signing in [#1481](https://github.com/flowforge/flowforge/issues/1481)

## Contributors TO DO!

We'd like the thank the following for their contributions to this release:

[flecoufle](https://github.com/flecoufle) for their work on [#59](https://github.com/flowforge/docker-compose/pull/59)

As an open-source project, we welcome community involvement in what we're building.
If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out

We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), use [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Sign up for FlowForge Cloud](https://app.flowforge.com/account/create) to get your first project free for a month.

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.3.0.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/upgrade/).

### Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That's also a great place to send us any feedback or feature requests.

Chat with us on the `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

You can raise a support ticket by emailing [support@flowforge.com](mailto:support@flowforge.com).

We've also added a live chat widget to our website, you can access it using the icon on the bottom right corner of our website. We'd love to hear from you.