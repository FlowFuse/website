---
title: FlowForge 1.3 is now available with team flow libraries, a new dashboard access control option and support for devices which can't access NPM.
subtitle: Our first release of 2023 with some great new features to try out, happy new year from everyone at FlowForge!
description: 
date: 2023-01-19 18:00:00.0
authors: ["rob-marcer"]
video: TODO
---

Share your flows via team libraries, control access to your Node-RED dashboards using FlowForge credentials and install FlowForge Node-RED instances on devices which cannot access NPM.

<!--more-->

We're pleased to announce version 1.3 is now available! Due to recent the holiday season, a lot of the FlowForge team has been away from their desks but we have still added some great new features to share. Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.

## Features

[Share your flows via team libraries](https://github.com/flowforge/flowforge/issues/226) FlowForge has now added the ability for you to share your flows via the import and export features in Node-RED. Once you export a flow everyone else in your FlowForge team will be able to access your work.

[Control access to your Node-RED dashboards using FlowForge credentials](https://github.com/flowforge/flowforge/issues/226) In FlowForge 0.10.0 we added the ability to secure endpoints created within your FlowForge projects. This allowed you to create dashboards or APIs and limit who can access them. in 1.3.0 we've added thew ability for you to limit access to those same resources based on the visitor having a user account on your FlowForge team.

[Install FlowForge Node-RED instances on devices which cannot access NPM](https://github.com/flowforge/flowforge/issues/226) We've had feedback from customers that in some cases they want to use FlowForge devices on hardware which cannot access Node Package Manager (NPM). In a standard configuration of Node-RED access to NPM is mandatory to run your flows. In FlowForge 1.3.0 we've added the ability for you to import all the data usually accessed from NPM without your devices having access to the domains NPM runs from.

## Bug Fixes

We've fixed the following bugs in this release.

- Project status UI sometimes getting stuck when restarting [#1232](https://github.com/flowforge/flowforge/issues/1232)

- SSO users asked to click link in email to verify. [#1543](https://github.com/flowforge/flowforge/issues/1543)

- SSO users unable to edit settings [#1542](https://github.com/flowforge/flowforge/issues/1542)

- SSO users not redirected to editor when signing in [#1481](https://github.com/flowforge/flowforge/issues/1481)

## Contributors TODO

We'd like the thank the following for their contributions to this release:

[flecoufle](https://github.com/flecoufle) for their work on [#59](https://github.com/flowforge/docker-compose/pull/59)

As an open-source project, we welcome community involvement in what we're building.
If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out

In 1.3 we've continued to improve the experience of running your own self managed FlowForge installation. We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), through [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Sign up for FlowForge Cloud](https://app.flowforge.com/account/create?code=FF13)
with the coupon **FF13** to get your first project free for a month.

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.3.0.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/upgrade/).

### Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Chat with us on the `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

You can raise a support ticket by emailing [support@flowforge.com](mailto:support@flowforge.com).

We've also added a live chat widget to our website, you can access it using the icon on the bottom right corner of our website. We'd love to hear from you.

