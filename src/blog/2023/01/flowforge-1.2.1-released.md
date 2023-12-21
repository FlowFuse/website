---
title: FlowFuse 1.2.1 released
subtitle: Release includes fix for emailing new user
description: Release includes fix for emailing new user
date: 2023-01-12 12:00:00.0
authors: ["ben-hardill"]
tags:
    - posts
    - flowfuse
    - releases
---

We've published a maintenance release containing a fix for new users.

<!--more-->

This release fixes an [issue](https://github.com/FlowFuse/flowfuse/issues/1537) introduced in FlowFuse 1.2 where users were not being sent their welcome email when they first sign up to the platform. As the sign-up page asks them to click on the link in that email, it left them waiting for an email that wasn't going to arrive.

The same fix also addresses an [issue](https://github.com/FlowFuse/flowfuse/issues/1514) where users could not sign up using an email with a `+` in it. This is a restriction we apply to users signing up with Single Sign-On enabled email domains - but the check was being applied to everyone.

### Upgrading FlowFuse

This release has already been rolled out to [FlowFuse Cloud]({{ site.appURL }}).

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/)

### Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform, please raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).
That also includes if you have any feedback or feature requests.

Chat with us on the `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

You can also raise a support ticket by emailing [support@flowfuse.com](mailto:support@flowfuse.com)
