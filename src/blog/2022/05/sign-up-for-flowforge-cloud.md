---
title: FlowFuse open for everybody
subtitle: Sign up and start a new Node-RED project within a minute!
description: With the waitlist now phased out users can sign up and start using FlowFuse right away and start developing on new projects.
date: 2022-05-25 09:00:00.0
authors: ["zeger-jan-van-de-weg"]
tags:
    - posts
    - flowfuse
    - news
---

FlowFuse wants to enable everyone to build workflows in Node-RED. Since announcing
[FlowFuse Cloud](https://flowforge.com/blog/2022/02/announcing-flowforge-cloud/)
two months ago we've had a waiting list for users to sign up to. That allowed us
to control the pace we were bringing new users onto the platform, learning what
is needed to scale up our platform and continue to improve our first user experience.

Today we have removed the waiting list. Anyone can sign up to FlowFuse and start a
new Node-RED project in under a minute!

<!--more-->

<div class="max-w-md m-auto">
  <a class="ff-btn ff-btn--primary" href="{{ site.onboardingURL }}">Sign up</a>
</div>

## What we offer

Besides the sub minute time to start a new Node-RED project, there's many more
features our offering includes. Two we'd like to highlight.

To start our blog highlight reel: Collaboration. FlowFuse allows you to work
with a team on your flows. There's the ability to create multiple users, each
with their own credentials that can alter the flows on Node-RED, and it's
execution environment like for example the [environments variables](https://flowforge.com/docs/user/envvar/).

Furthermore, [stacks](https://flowforge.com/docs/user/changestack). These allow
a user to select the execution environment for their Node-RED project. For example; the
Node-RED version being used. Combined with the ability for one to copy a project
to a new stack, this allows FlowFuse users to copy their project to the Node-RED
3.0-beta stack to validate their solutions will continue to work on the new release
without disrupting their main project.

## Our roadmap

Currently we're working towards our 0.6 release. The main feature of this release
will be support for Devices. This will allow you to send a snapshot of a project
to a Node-RED instance running outside of the FlowFuse platform and update the flows
remotely. Remote devices will run our [agent](https://github.com/FlowFuse/device-agent)
to communicate with the FlowFuse Cloud project.

While the first iteration will be considered an Alpha release, by shipping early and often, it lets us get
welcome feedback from our users and the wider community - helping to shape the future direction.
It also allows users to start validating the feature for their own proof of concept projects.

Over the next few months we're continuing to drive development of the platform
across a number of areas - including further improvements to the Device feature.
But also looking at new Enterprise-ready features, such as Single-Sign On integration
and more tools to make collaboration even easy.

We intend to grow our offering so that FlowFuse remains the best way to run
Node-RED.

Stay informed by registering for our newsletter!
