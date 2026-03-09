---
title: FlowFuse 0.3 released
subtitle: Moving towards the launch of FlowFuse Cloud
description: Moving towards the launch of FlowFuse Cloud
date: 2022-03-17 1:00:00.0
authors: ["nick-oleary"]
tags:
    - posts
    - flowfuse
    - releases
---

The FlowFuse 0.3 release brings us closer to the launch of FlowFuse Cloud.
Find out more about what's in this new release.

<!--more-->

This release of the FlowFuse platform brings some significant new features that
will underpin more of what is to come.

### Project Stacks & Templates

When we think about what a makes a Project inside FlowFuse, the simple answer
is Node-RED.

The more complete answer is: a version of Node-RED, a version of Node.js, some
memory, some CPU and a bunch of Node-RED settings to customise the instance.

In a platform like FlowFuse, it's important to have the tools to manage all
of these things.

This is where Project Stacks and Template come in.

A Project Stack defines the underlying characteristics of the Node-RED process - 
or the container it is running in. For example, with our Local deployment model,
it defines the version of Node-RED to use and how much memory the process should
try to use. In our container based deployment models, the stack identifies the
container to use for the project, along with memory and CPU limits.

In a future release, this will be the way we will support upgrading the version
of Node-RED a project is using - and doing so in a well managed way. An Administrator
will be able to create a new Stack containing the new version of Node-RED.
Project owners will then be able to update their projects to use the new Stack - 
at a time that is convenient to them.

A Project Template is more about how the Node-RED instance is configured - exposing
the options a user would traditional modify in their Node-RED settings file.
With this release, we're not exposing a lot of settings as the focus has been 
more on the underlying Template concept. But it will be the basis for gradually
exposing more options for customisation in the future.


 - [Epic #285 - Project Stacks](https://github.com/FlowFuse/flowfuse/issues/285)
 - [Epic #141 - Project Templates](https://github.com/FlowFuse/flowfuse/issues/141)

### Billing Integration

With our open core philosophy, the heart of the FlowFuse platform is open source
and available under the Apache 2 license for anyone to use.

But the plan was always to have certain features that were licensed separately.

This release brings the first of those features - Stripe Billing Integration. This
feature brings the ability to require a Team to have a Stripe Billing agreement
in place and to be able to charge on a per-project basis within that Team.

Being able to charge is an important feature for any commercial platform, and
with our own FlowFuse Cloud launching soon, we needed to get this feature in
place today.

We've structured the code in the repository and updated the LICENSE file to make it
very clear what parts of the code base are *not* covered by the Apache 2 license.

 - [Epic #224 - Billing](https://github.com/FlowFuse/flowfuse/issues/224)


### Getting started with FlowFuse

The documentation provides a guide for [installing FlowFuse on a local server](https://github.com/FlowFuse/flowfuse/tree/main/docs).

If you haven't played with FlowFuse yet, here's a more complete walk-through
of the platform:

<lite-youtube videoid="YYZDx8n17Ys" params="rel=0" style="width: 100%; height: 315px;" title="YouTube video player"></lite-youtube>

### Upgrading FlowFuse

If you installed FlowFuse 0.1 or 0.2 and want to upgrade, our documentation provides a
guide for [upgrading FlowFuse on a local server](/docs/upgrade/).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).

That also includes if you have any feedback or feature requests.

We also have a `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

### What's next?

Our regular release cycle puts the next release on Thursday 14th April.

We're still in planning stage for the release, but we'll also be beginning to invite
people from the waiting list to sign-up to FlowFuse Cloud.

For more information, check out the [annoucement blog post](/blog/2022/02/announcing-flowforge-cloud/).
You can also sign up to our general mailing list below if you want to hear more
about the work we're doing.
