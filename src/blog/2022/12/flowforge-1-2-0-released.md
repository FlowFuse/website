---
title: FlowForge 1.2 released with support for single sign on and persistant context storage
subtitle: Our final release for 2022 with some great new features to try out
description: 
date: 2022-12-22 18:00:00.0
authors: ["rob-marcer"]
video: TODO
---

Control access to FlowForge using single sign on, persistent context storage and use our new detailed admin audit log.

<!--more-->

We're pleased to announce version 1.2 is now available! The latest release of the FlowForge application contains new features, many improvements, and bug fixes. Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.

## Features TODO

[Single Sign On](https://github.com/flowforge/flowforge/issues/226) Single sign-on (SSO) is a method of authentication that allows a user to access multiple applications or systems with a single set of login credentials, improving security, productivity, and user experience, and reducing IT overhead. We've implemented SSO using the Security Assertion Markup Language (SAML) framework. This allows users of FlowForge Cloud, Enterprise and Community Edition to easily access their FlowForge projects.

[Persistent Context](https://github.com/flowforge/flowforge/issues/212) Node-RED provides a way to store information that can be shared between different nodes without using the messages that pass through a flow. This is called ‘context’. You can now select if context should be stored in memory or in persistent storage. Persistent storage allows the stored values to be recalled after a restart of your project.

[New Admin Audit Log](https://github.com/flowforge/flowforge/issues/517) In FlowForge 1.1 we added logging of user actions. In 1.2 we’ve now exposed that data in a new interface which makes it easier for admins to review previous actions across their uses even for projects which have now been deleted.

Team admins can view all interactions for their team in the new interface, if you are running your own Enterprise or Community Edition you can view all actions across all teams, projects and users on FlowForge.


## Improvements TODO

In this release of FlowForge we've put a lot of work into improving the experience of running your own FlowForge service for both Enterprise and Community Edition users.

We've improved our documentation around Kubernetes Helm.

We've added documentation explaining how to deal with DNS records in Docker and Kubernetes.

We've updated our documentation to always link to the latest build (older builds are still available).

We are now pushing our Docker builds to Docker Hub, this saves users from having to build the Docker images when installing or updating. We've [updated our documentation](https://github.com/flowforge/flowforge/commit/c9363c8d422569df8c0a25767f9e4a647ca032ee) to reflect this improvement.

We've improved the documentation around configuration of MQTT.


## Bug Fixes

We've fixed the following bugs in this release.

- Unable to edit 'Prevent Install of External nodes' template option [#1376](https://github.com/flowforge/flowforge/issues/1376)

- Email features do not pick up if email server is offline when FF launches [#1159](https://github.com/flowforge/flowforge/issues/1159)


## Contributors TODO

We'd like the thank the following for their contributions to this release:

[mikermcneil](https://github.com/mikermcneil) for their work on [#1301](https://github.com/flowforge/flowforge/pull/1301)

As an open-source project, we welcome community involvement in what we're building.
If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out TODO

In 1.2 we've continued to improve the experience of running your own FlowForge installation, for both Enterprise and Community Edition. We're confident you can have your own FlowForge running locally in under 30 minutes.
You can install our [local](https://flowforge.com/docs/install/local/), [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/) builds.

If you'd rather use our hosted offering: [Sign up for FlowForge Cloud](https://app.flowforge.com/account/create?code=FF12)
with the coupon **FF12** to get your first project free for a month.

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.2. To use
persisted files you'll need to upgrade your projects stack. You'll be prompted
to do so on the project page.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/install/upgrading/)

### Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Chat with us on the `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

You can also raise a support ticket by emailing [support@flowforge.com](mailto:support@flowforge.com)