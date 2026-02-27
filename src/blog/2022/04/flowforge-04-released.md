---
title: FlowFuse 0.4 released
subtitle: Getting ready for Node-RED 3.0
description: Getting ready for Node-RED 3.0
date: 2022-04-14 12:00:00.0
authors: ["sam-machin"]
tags:
    - posts
    - flowfuse
    - releases
---

This release of the FlowFuse adds a seemingly small, but significant new feature.

<!--more-->

With [Node-RED 3.0 fast approaching](https://nodered.org/about/releases/) we've been making sure we are ready to support this.

### Upgrading Node-RED

The goal of FlowFuse is to be the best way to run Node-RED at any scale, whether that's many users or many instances. Node-RED is a constantly developing as a platform and therefore part of running Node-RED is also upgrading the version you are running.

With the 0.4 release today we've made that super simple in FlowFuse. Last month we introduced the concept of [Project Stacks](/docs/user/concepts/#stack). One of the key elements of a Stack was the version of Node-RED in use. Initially this may have seemed fairly basic, when you create a new project you usually want to use the latest version of Node-RED. However what happens when a new version is released and you have an existing project?
Now you can change the stack that a project is running on, which in turn will change the version of Node-RED. This is a simple process from the project settings, it only requires a short period of downtime while the project restarts on the new stack, typically around 10-15 seconds.

Our driver to get this feature into the 0.4 release is the approaching release of Node-RED 3.0, now we know that we can be ready to offer our users Node-RED 3.0 as soon as it is released.

We will also be making available the Beta's of Node-RED 3.0 within FlowFuse Cloud,  this becomes a great way to test out the new features without having to touch your own environments.

 - [Story #288 - Change Stacks](https://github.com/FlowFuse/flowfuse/issues/288)
 - [Docs](/docs/user/changestack/)

### Environment Variables

Another key new feature we are introducing is the ability to set and manage environment variables within your projects.
Environment Variables are a key tool when building applications as they allow you to to separate the configuration of your system from the logic in the code. Even in Low-Code platforms this is an important design pattern. Environment variables are fully integrated into [Templates](/docs/user/concepts/#template) that we introduced last month so they can be set both at the platform level or on an individual project.
Our plans for the next release will make these even more useful as we introduce the ability to [duplicate a project](https://github.com/FlowFuse/flowfuse/issues/271) and then modify those variables for the new project.

 - [Story #225 - Project Environment Variables](https://github.com/FlowFuse/flowfuse/issues/225)
 - [Docs](/docs/user/envvar/)

### There's more

There are many more improvements in this release, such as the ability to [Set the timezone](https://github.com/FlowFuse/flowfuse/issues/239) your project is running in, we've also been iterating on our billing experience as we've welcomed the first paying customers to FlowFuse Cloud.

Finally we're very happy that we've had our first external contribution to the code base, as an Open Core company we believe strongly that Open Source lives at the heart of everything we do. 
We would like to say a big thank-you to [Fakorede Damilola Idris](https://fakocodes.netlify.app/) for his work on fixing a [bug](https://github.com/FlowFuse/flowfuse/issues/424) in the UI.


### Getting started with FlowFuse

The documentation provides a guide for [installing FlowFuse on a local server](/docs/install/).

If you haven't played with FlowFuse yet, here's a more complete walk-through
of the platform:

<lite-youtube videoid="YYZDx8n17Ys" params="rel=0" style="width: 100%; height: 315px;" title="YouTube video player"></lite-youtube>

### Upgrading FlowFuse

If you installed a previous version of FlowFuse  and want to upgrade, our documentation provides a
guide for [upgrading FlowFuse on a local server](/docs/upgrade/#upgrading-flowfuse).

### Getting help

If you hit any problems with the platform, or have questions to ask, please do
raise an [issue on GitHub](https://github.com/FlowFuse/flowfuse/issues).

That also includes if you have any feedback or feature requests.

We also have a `#flowfuse` channel on the [Node-RED Slack workspace](https://nodered.org/slack).

### What's next?

Our regular release cycle puts the next release on Thursday 12th May.
We will be building on features in the last few releases around managing your projects and using templates, we're also  setting the foundations of our work to [manage Node-RED on your own devices running at the Edge](https://github.com/FlowFuse/flowfuse/issues/446).

For more information, check out the [announcement blog post](/blog/2022/02/announcing-flowforge-cloud/).

You can also sign up to our general mailing list below if you want to hear more
about the work we're doing.
