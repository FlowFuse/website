---
title: FlowForge 1.0 released
subtitle: FlowForge at 1.0, a huge milestone for us.
description: FlowForge is now 1.0!
date: 2022-10-28 12:00:00.0
authors: ["rob-marcer"]
video: mjR1iiEFiBg
---

Auto assigment of unique IDs to Devices, define custom Nodes to be pre-installed in your Template and import credentials files into your FlowForge Projects.

<!--more-->

Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above. 

We're pleased to announce version 1.0 is now available. This major release of the FlowForge application containing new features, a number of improvements, and bug fixes. Keep reading for a promotion code to get your first month free on FlowForge Cloud. 

## Features
[Auto assigment of unique IDs to Devices](https://github.com/flowforge/flowforge/issues/841)
We've updated FlowForge so that each running instance of Node-RED is assigned unique IDs. This can make handling of data returned from multiple Devices far more robust.

[Define custom Nodes to be pre-installed in your Templates](https://github.com/flowforge/flowforge/issues/657)
This feature allows you to pre-define which custom Nodes you want as part of your FlowForge Templates.

[Import credentials files into your FlowForge Projects](https://github.com/flowforge/CloudProject/issues/59)
When migrating an existing flow into FlowForge you can now import your credentials file, saving you some error prone manual steps.

[Give your Stacks friendly names](https://github.com/flowforge/flowforge/issues/915)
When defining your Stacks you can now give then friendly names which mean something to you and your team.

## Improvements
We've made a number of improvements to the overall experience of running FlowForge.

- Node-RED TCP & UDP Core Nodes in FlowForge [#999](https://github.com/flowforge/flowforge/issues/999)
- Default Stack and Templates [#989](https://github.com/flowforge/flowforge/issues/989)
- Provide platform containers and base stack container for administrators [#917](https://github.com/flowforge/flowforge/issues/917)

## Bug Fixes
We've fixed the following bugs in this release.
- [frewgrgrgrwg](https://github.com/flowforge/flowforge/issues/917)
- [User names can be same (but different case)](https://github.com/flowforge/flowforge/issues/983)
- [User list not refreshing after changing user details](https://github.com/flowforge/flowforge/issues/463)
- [Navigating directly to a device page gets the wrong team selected](https://github.com/flowforge/flowforge/issues/986)
- [Node-RED Isn't ready when FlowForge app says it is running following a project restart](https://github.com/flowforge/flowforge/issues/941)
- [Invitations left for deleted teams](https://github.com/flowforge/flowforge/issues/923)
- [Following email verification link twice throws error](https://github.com/flowforge/flowforge/issues/1024)
- [Agent does not log stderr from the Node-RED process](https://github.com/flowforge/flowforge-device-agent/issues/21)
- [On Kubernetes project names can not start with a number](https://github.com/flowforge/flowforge/issues/948)
- [When creating projects stack options do not wrap](https://github.com/flowforge/flowforge/issues/930)
- [Save button in admin user-edit dialog doesn't close dialog](https://github.com/flowforge/flowforge/issues/979)
- [Setting UI doesn't allow me to update settings](https://github.com/flowforge/flowforge/issues/911)

## Contributors
We'd like the thank the following for their contributions to this release:

[Pezmc](https://github.com/Pezmc) for their work on [Add device count and project counts by type to admin](https://github.com/flowforge/flowforge/pull/949)

[ArshErgon](https://github.com/ArshErgon) for their work on [Update vue component name for NoVerifiedEmail.vue](https://github.com/flowforge/flowforge/pull/977)

As an open-source project, we welcome the community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out

[Sign up for FlowForge Cloud](https://app.flowforge.com/account/create?code=RELEASE010) with this link  or at the checkout enter the code **RELEASE010** to get your first project free for a month.

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 0.10 and the stacks updated. Upgrade your project stacks to the latest version to make sure you get all the latest changes.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading FlowForge on a local server](http://flowforge.com/docs/install#upgrade).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowForge Cloud can raise a ticket by emailing support@flowforge.com

We also have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
