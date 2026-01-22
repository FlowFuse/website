---
title: FlowFuse 1.9.3 and Device Agent 1.9.5 released
subtitle: A maintenance release to improve the Device Agent editor experience
description: A maintenance release to improve the Device Agent editor experience
date: 2023-07-21
authors: ["nick-oleary"]
tags:
    - posts
    - flowfuse
    - releases
---

FlowFuse and the Device Agent both received updates yesterday that bring improvements to the Device Agent editor experience, making it more resilient to network issues.

<!--more-->

## Improving the Device Agent editor experience

The ability to remotely edit flows running the Device Agent has been warmly welcomed by many users on the platform. Along with that comes great feedback we can use to continue improving the user experience.

Some early feedback identified issues with the resilience of the tunnel we connect between the Device Agent and the platform. If the tunnel was interrupted for any reason, the user would have to manually set it up again.

With the FlowFuse 1.9.3 release, now running FlowFuse Cloud, along with the latest version of the Device Agent, we have made the tunnel much more resilient. It can now restablish itself without any intervention from the user - making for a much more seamless experience.

 - [#2488](https://github.com/FlowFuse/flowfuse/pull/2488)
 - [#2507](https://github.com/FlowFuse/flowfuse/pull/2507)

## Other New Features and Bug Fixes

- Fixes incorrect 'start-failed' notifications when restarting an instance [#2505](https://github.com/FlowFuse/flowfuse/pull/2505) The system log now includes more information about the callingThe FlowFuse device agent is now supported on Windows [#78](https://github.com/FlowFuse/device-agent/issues/78)
- Ensures the system logging captures the proper source IP address of requests [#2505](https://github.com/FlowFuse/flowfuse/pull/2503)
- A few documentation updates, including a clarfication on how to run the Device Agent under docker [#2498](https://github.com/FlowFuse/flowfuse/pull/2498)

## What's next?

We're always working to enhance your experience with FlowFuse. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](/changelog/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/FlowFuse/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowFuse. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose). 

Together, we can make FlowFuse better with each release!

## Try it out

We're confident you can have self managed FlowFuse running locally in under 30 minutes.
You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({{ site.onboardingURL }}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 1.9.3.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go the the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.
