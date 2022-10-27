---
title: FlowForge 1.0 released
subtitle: FlowForge at 1.0, a huge milestone for us.
description: FlowForge is now 1.0!
date: 2022-10-27 18:00:00.0
authors: ["rob-marcer"]
video: mjR1iiEFiBg
---

Auto assigment of unique IDs to Devices, define custom Nodes to be pre-installed in your Templates and import credentials files into your FlowForge Projects.

<!--more-->

Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above. 

We're pleased to announce version 1.0 FlowForge is now available. Keep reading for a promotion code to get your first month free on FlowForge. Version 1.0 represents our vision of the base set of features needed for you to get great value from using FlowForge in production. That's not to say we are done, we are only just getting started. We will continue to add features, improve our interfaces and fix bugs with the same enthusiasm as we've worked towards 1.0. We'd like to hear your feedback on what we will be including in [1.1 and beyond](https://github.com/orgs/flowforge/projects/5), as an open source project our users drive our development.

## Features
[Auto assigment of unique IDs to Devices](https://github.com/flowforge/flowforge/issues/841)
We've updated FlowForge so that each running instance of Node-RED is assigned unique IDs. This can make handling of data returned from multiple Devices far more robust.

[Define custom Nodes to be pre-installed in your Templates](https://github.com/flowforge/flowforge/issues/657)
This feature allows you to pre-define which custom Nodes you want as part of your FlowForge Templates.

[Import credentials files into your FlowForge Projects](https://github.com/flowforge/CloudProject/issues/59)
When migrating an existing flow into FlowForge you can now import your credentials file, saving you some error prone manual steps.

## Improvements
We've made a number of improvements to the overall experience of running FlowForge.

- Human friendly Stack names [#915](https://github.com/flowforge/flowforge/issues/915)
- Check for suitable version of Node on Devices [#989](https://github.com/flowforge/flowforge/issues/37)
- Realtime Project status details in Project overview  [#917](https://github.com/flowforge/flowforge/issues/990)

## Bug Fixes
We've fixed the following bugs in this release.
- [Pressing retun in search box reloads page](https://github.com/flowforge/flowforge/issues/1143)
- [Vue Router Warn](https://github.com/flowforge/flowforge/issues/1126)
- [Kebab menu in Settings breaks](https://github.com/flowforge/forge-ui-components/issues/58)
- [flowforge-nr-launcher missing try/catch on http request](https://github.com/flowforge/flowforge/issues/1096)
- [Invite with + in email address is incorrectly sanitised](https://github.com/flowforge/flowforge/issues/1145)
- [Table does not sort correctly when empty fields are present](https://github.com/flowforge/forge-ui-components/issues/59)
- [4xx Errors not shown in App](https://github.com/flowforge/flowforge/issues/929)
- [Inconsistent errors returned from the API](https://github.com/flowforge/flowforge/issues/1076)
- [Module install not working on windows](https://github.com/flowforge/flowforge-nr-launcher/issues/77)
- [avatar lettering is mis-allinged when only rendering 1 character](https://github.com/flowforge/flowforge/issues/1038)
- [it.only is not prohibited](https://github.com/flowforge/flowforge/issues/968)
- [No feedback when an API error occurs editing user](https://github.com/flowforge/flowforge/issues/966)
- [Start action is availble on a running project](https://github.com/flowforge/flowforge/issues/1040)
- 
## Contributors
We'd like the thank the following for their contributions to this release:

[Pezmc](https://github.com/Pezmc) for their work on [Add device count and project counts by type to admin](https://github.com/flowforge/flowforge/pull/949)

[ArshErgon](https://github.com/ArshErgon) for their work on [Update vue component name for NoVerifiedEmail.vue](https://github.com/flowforge/flowforge/pull/977)

As an open-source project, we welcome the community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out

[Sign up for FlowForge](https://app.flowforge.com/account/create?code=RELEASE1) with this link  or at the checkout enter the code **RELEASE1** to get your first project free for a month.

### Upgrading FlowForge

[FlowForge](https://app.flowforge.com) is already running 1.0. Upgrade your project stacks to the latest version to make sure you get all the latest changes.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading FlowForge on a local server](http://flowforge.com/docs/install#upgrade).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Customers of FlowForge Cloud can raise a ticket by emailing support@flowforge.com

We also have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).
