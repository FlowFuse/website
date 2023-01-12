---
title: FlowForge 1.2.1 released
subtitle: Release includes fix for emailing new user
description: Release includes fix for emailing new user
date: 2023-01-12 12:00:00.0
authors: ["ben-hardill"]
---

We've published a maintenance release containing a fix for new users.

<!--more-->

A [bug](https://github.com/flowforge/flowforge/issues/1514) was found that prevented new users signing up if their email addresses contained
a `+` symbol. This error also prevented new users receiving their initial email verification email.

We found the error in the code supporting the use of Single Sign On providers.

### Upgrading FlowForge

This release has already been rolled out to [FlowForge Cloud](https://app.flowforge.com).

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/install/upgrading/)

### Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform, please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Chat with us on the `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

You can also raise a support ticket by emailing [support@flowforge.com](mailto:support@flowforge.com)
