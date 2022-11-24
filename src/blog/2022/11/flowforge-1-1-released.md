---
title: FlowForge 1.1 released
subtitle: In FlowForge 1.1, we are continuing to add the features we believe makes FlowForge the best solution for running Node-RED in production in a secure, scalable, and team-based environment.
description: In FlowForge 1.1, we are continuing to add the features we believe makes FlowForge the best solution for running Node-RED in production in a secure, scalable, and team-based environment.
date: 2022-11-24 18:00:00.0
authors: ["rob-marcer"]
video: TODO
---

Persist files on your FlowForge projects, import Node-RED snapshots into FlowForge directly from the Node-RED editor and use our new interface for managing Project Deployments

<!--more-->

We're pleased to announce version 1.1 is now available. The next release of the FlowForge application containing new features, a number of improvements, and bug fixes. Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.

## Features
[Persistent File Storage](https://github.com/flowforge/flowforge/issues/998)  We've had a great deal of feed back from our customers that being able to persist files in a Project is a vital feature in Node-RED. In FlowForge 1.1 the flows can now created and persisted files within your projects. We know those files are used in many, creative ways and we're looking forward to seeing how uses improve their projects using this new feature.

[Import Snapshots from Outside FlowForge](https://github.com/flowforge/flowforge/issues/1165) You can now link your Node-RED instances running outside of FlowForge and push snapshots directly into your FlowForge Projects for later use. Developers may wish to work on a Project in a local environment but want an easy path to share that with their team. With this new feature we've made it effortless to push a local build of a project to FlowForge for deployment to your staging and production FlowForge instances.

[Project Deployments UX](https://github.com/flowforge/flowforge/issues/1046) We've reworked the interface for managing your FlowForge Deployments of Node-RED. We are seeing FlowForge users deploying their Projects to Devices at scale. This is another step towards making it easier for users to manage a large quantity of Devices in their Projects.

## Improvements

- [Notify User on username change](https://github.com/flowforge/flowforge/issues/821)

- [Notify User on email address change](https://github.com/flowforge/flowforge/issues/815)

- [Notify User on password change](https://github.com/flowforge/flowforge/issues/814)

- [Auto generation of Mosquitto Configuration file](https://github.com/flowforge/installer/issues/50)

- [Default Stack and Template when installing FlowForge](TODO)

We've also been working on improving our documentation to help users install FlowForge on their platform of choice.

## Bug Fixes

We've fixed the following bugs in this release.

- Email features do not pick up if email server is offline when FF launches [#1159](https://github.com/flowforge/flowforge/issues/1159)

- (Windows) Installation of the stack kills the parent install process [#62](https://github.com/flowforge/installer/issues/62)

- Blank page when user accepts invitation for joining team [#1208](https://github.com/flowforge/flowforge/issues/1208)

- Devices list not showing all devices and pagination [#1207](https://github.com/flowforge/flowforge/issues/1207)

- Project Type description is entered in markdown but is not rendered in project selection dialog [#1171](https://github.com/flowforge/flowforge/issues/1171)

- Continuous spinner in UI body when entering a new (short) password [#1280](https://github.com/flowforge/flowforge/issues/1280)

- Rollbacks crash Node-RED [#1186](https://github.com/flowforge/flowforge/issues/1186)

- Friendly stack name not shown in the Change Project Stack option list [#1169](https://github.com/flowforge/flowforge/issues/1169)

- Admin Stacks page not rendering [#1260](https://github.com/flowforge/flowforge/issues/1260)

- Pagination broken on stacks page [#1164](https://github.com/flowforge/flowforge/issues/1164)

- Hamburger menu showing scrollbar [#1259](https://github.com/flowforge/flowforge/issues/1259)

- Label for Checkbox not displayed in-line [#1246](https://github.com/flowforge/flowforge/issues/1246)

## Contributors

We'd like the thank the following for their contributions to this release:

TODO

As an open-source project, we welcome the community involvement in what we're building. If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out

[Sign up for FlowForge Cloud](https://app.flowforge.com/account/create?code=RELEASE11) with this link  or at the checkout enter the code **RELEASE11** to get your first project free for a month. As an open source project you can also use FlowForge for free, forever. You can read more about how to install our open source [build here](https://flowforge.com/docs/install/).

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.1. Upgrade your project stacks to the latest version to make sure you get all the latest changes.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](http://flowforge.com/docs/install#upgrade).

### Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform, or have questions to ask, please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues). That also includes if you have any feedback or feature requests.

We have a `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

You can also raise a support ticket by emailing [support@flowforge.com](mailto:support@flowforge.com)