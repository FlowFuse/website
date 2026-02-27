---
title: FlowFuse 0.2 released
subtitle: Keeping the releases flowing of our open platform for Node-RED
description: Keeping the releases flowing of our open platform for Node-RED
date: 2022-02-17 1:00:00.0
authors: ["nick-oleary"]
tags:
    - posts
    - flowfuse
    - releases
---

Four weeks have passed since our initial release of FlowFuse, and we're happy
to release v0.2 today as we continue moving forward and evolve the platform.

<!--more-->

There aren't lots of headline features in this release to tell you about as a lot
of the work has been on the internals, as well as responding to some of the early
feedback from the community.

Features like improving the test framework, and building a database migration
framework may not sound too exciting to the end user, but they are critical pieces
when build a platform that needs to be stable and easy to upgrade.

We've also been doing work to get our own instance of the platform running in the
Cloud - and figuring out how to automate as much of that as possible. Aside
from being a key way to test the platform, it helps validate the work we're doing
for when others come to run it in that way. It also lays the ground work for our
own cloud service we'll be sharing more about in the coming days.

The full change-log for the core of the platform is available [on GitHub](https://github.com/FlowFuse/flowfuse/blob/v0.2.0/CHANGELOG.md).
But with a further 15 repositories containing different components, each with its
own change-log, we're still thinking about how best to share a single view of the
updates.


### Getting started with FlowFuse

The documentation provides a guide for [installing FlowFuse on a local server](https://github.com/FlowFuse/flowfuse/tree/main/docs).

If you haven't played with FlowFuse 0.1 yet, here's a more complete walk-through
of the platform:

<lite-youtube videoid="YYZDx8n17Ys" params="rel=0" style="width: 100%; height: 315px;" title="YouTube video player"></lite-youtube>

### Upgrading FlowFuse

If you installed FlowFuse 0.1 and want to upgrade, our documentation provides a
guide for [upgrading FlowFuse on a local server](/docs/upgrade/).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).

That also includes if you have any feedback or feature requests.

We also have a `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

### What's next?

Our regular release cycle puts the next release on Thursday 17th March. We've
got some key features planned in this release around [Project Templates](https://github.com/FlowFuse/flowfuse/issues/141) and [Stacks](https://github.com/FlowFuse/flowfuse/issues/285) -
which will underpin how you can customise Node-RED within FlowFuse.

We'll also have some exciting news to share about our own hosted service you'll
be able to sign-up for.

Sign up to the mailing list below if you want to hear more about the work we're
doing.
