---
title: FlowForge 1.1 released with persistent file storage
subtitle: A new set of features to improve FlowForge as the best solution for running Node-RED in production in a secure, scalable, and team-based environment.
description: A new set of features to improve FlowForge as the best solution for running Node-RED in production in a secure, scalable, and team-based environment.
date: 2022-11-24 18:00:00.0
authors: ["rob-marcer"]
video: TODO
---

Persist files on your FlowForge projects, publish locally developed flows to dozens of devices in a few clicks, and use our new interface for managing Project Deployments

<!--more-->

We're pleased to announce version 1.1 is now available! The latest release of the FlowForge application containing new features, many improvements, and bug fixes. Keep reading for the details of what's in this release or you can watch our 1 minute roundup video of the new release above.

## Features

[Persistent File Storage](TODO docs link) We've had a great deal of feed back
from our customers that being able to persist files in a project is a vital feature
in Node-RED. In FlowForge 1.1 the flows can now create and persist files within
your projects. We know those files are used in many creative ways and we're looking
forward to seeing how uses improve their projects using this new feature.

[Import Snapshots from Outside FlowForge](TODO docs link) Developers may wish to
work on Node-RED in a local environment but want an easy path to share that with their team. You can now link your Node-RED instances running outside of FlowForge and push snapshots directly into your FlowForge projects to leverage FlowForge fully.  With this new feature we've made it effortless to push a local build of a project to FlowForge for deployment to your staging and production FlowForge instances.

## Improvements

[Project Deployments UX](https://github.com/flowforge/flowforge/issues/1046)
We've reworked the interface for managing your FlowForge Deployments of Node-RED.
We are seeing FlowForge users deploying their projects to edge devices at scale.
This is another step towards making it easier for users to manage a large quantity
of devices in their projects.

When users change their username, email address, or password they'll now be
notified through email of these changes to ensure these changes are made by the
user.

This release a lot of effort went into the install process, specifically the
local install method. First and foremost; a default stack and template will be
installed automatically. With that it ensures users get up and running with
Node-RED much quicker. Administrators of each platform can still change stacks
and templates when needed. Secondly, the installer now auto generates the
configuration file for Mosquitto, the MQTT broker FlowForge uses. Again making
administrators much quicker when installing FlowForge.

## Bug Fixes

The v1.0.1 release included a bug fix where [snapshot rollbacks](https://github.com/flowforge/flowforge/issues/1186)
didn't work, which has also been included in v1.1 onwards.


We've fixed the following bugs in this release.

- When installing the stack during a FlowForge installation the process would quit on Windows [#62](https://github.com/flowforge/installer/issues/62)

- After accepting an invite to join a team, users are no longer seeing a blank page [#1208](https://github.com/flowforge/flowforge/issues/1208)

- Pagination on device deployments wasn't showing all devices [#1207](https://github.com/flowforge/flowforge/issues/1207)

- Markdown rendering when selecting the project type wasn't quite working, fixed now! [#1171](https://github.com/flowforge/flowforge/issues/1171)

- Continuous spinner in UI body when entering a new (short) password [#1280](https://github.com/flowforge/flowforge/issues/1280)

- Friendly stack name not shown in the Change Project Stack option list [#1169](https://github.com/flowforge/flowforge/issues/1169)

- The stacks view in the admin area didn't render properly [#1260](https://github.com/flowforge/flowforge/issues/1260)

- Like the deployments page, pagination for stacks was broken. [#1164](https://github.com/flowforge/flowforge/issues/1164)

- Several UX and UI bugs got polished away!

## Contributors

We'd like the thank the following for their contributions to this release:

TODO

As an open-source project, we welcome the community involvement in what we're building.
If you're interested in contributing, checkout our [guide in the docs](https://flowforge.com/docs/contribute/).

### Try it out

As said before, a lot of effort went into the local installer. We're confident
you can have your own FlowForge running locally in about 30 minutes.
[Get started right away!](https://flowforge.com/docs/install/local/)
([Docker](https://flowforge.com/docs/install/docker/) and [Kubernetes](https://flowforge.com/docs/install/kubernetes/)
are available too!)

If you'd rather use our hosted offering: [Sign up for FlowForge Cloud](https://app.flowforge.com/account/create?code=RELEASE11)
with the coupon **RELEASE11** to get your first project free for a month.

### Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.1. To use
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
