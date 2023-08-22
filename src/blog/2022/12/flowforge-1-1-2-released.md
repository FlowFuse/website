---
title: FlowFuse 1.1.2 released
subtitle: Release includes a fix for installing additional nodes into Node-RED.
description: Release includes a fix for installing additional nodes into Node-RED.
date: 2022-12-09 12:00:00.0
authors: ["nick-oleary"]
tags:
    - posts
    - flowforge
    - releases
---

We've published a maintenance fix with an important fix for the Palette Manager in Node-RED.

<!--more-->

A [bug](https://github.com/flowforge/flowforge/issues/1367) was reported this week
where a user was unable to install additional nodes into their Node-RED project
using the editor's palette manager.

We tracked it down to an issue that was introduced in the 1.1 release, where the
project template lets you list nodes that should be blocked from being installed.
It was interpreting an empty list to mean _disallow everything_! Not quite the
intended behaviour.

Whilst tracking this down, we also spotted a bug ([#1379](https://github.com/flowforge/flowforge/issues/1379))
around editing this same setting that made it tricky to work around without this
release being published.

These issues have now been fixed and FlowFuse 1.1.2 published.

## Bug Fixes

In additional to the above issues, this release includes some further fixes around
the docker and helm components:

 - Fix fileStore hostname by @flecoufle in [#59](https://github.com/flowforge/docker-compose/pull/59)
 - Fix healthcheck [#62](https://github.com/flowforge/docker-compose/pull/62) [#63](https://github.com/flowforge/docker-compose/pull/63) [#74](https://github.com/flowforge/helm/pull/74)


## Contributors

We'd like to thank the following people for their contributions to this release:

[flecoufle](https://github.com/flecoufle) for their work on [#59](https://github.com/flowforge/docker-compose/pull/59)

As an open-source project, we welcome community involvement in what we're building.
If you're interested in contributing, checkout our [guide in the docs](/docs/contribute/).

### Upgrading FlowFuse

This release has already been rolled out to [FlowFuse Cloud](https://app.flowforge.com).

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/)

### Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there.

If you hit any problems with the platform, please raise an [issue on GitHub](https://github.com/flowforge/flowforge/issues).
That also includes if you have any feedback or feature requests.

Chat with us on the `#flowforge` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

You can also raise a support ticket by emailing [support@flowfuse.com](mailto:support@flowfuse.com)
