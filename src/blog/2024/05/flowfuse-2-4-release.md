---
title: "FlowFuse 2.4: making it easier to work with Snapshots, Blueprints & Devices"
subtitle: Our latest release introduces better ways to work with Snapshots, Blueprints, view the content of you flows in FlowFuse, and manage the version of Node-RED running on Devices
description: FlowFuse 2.4 introduces better ways to work with Snapshots, Blueprints, view the content of you flows in FlowFuse, and manage the version of Node-RED running on Devices 
date: 2024-05-09 
authors: ["rob-marcer"]
image: /blog/2024/05/images/release-2-4-graphic.png
tags:
    - posts
    - flowfuse
    - releases
---

FlowFuse 2.4 introduces better ways to work with Snapshots, Blueprints, view the content of you flows in FlowFuse, and manage the version of Node-RED running on Devices 

<!--more-->
## Export Snapshots from FlowFuse [#3627](https://github.com/FlowFuse/flowfuse/issues/3627)

You can now export your Snapshots of your Node-RED instances. This is our first step towards making it easier to move Snapshots in and out or your FlowFuse projects, as well as share them with other teams. We will be adding many more Snapshot management features over the next few releases.

## Easier creation of Node-RED instances from Blueprints [#3729](https://github.com/FlowFuse/flowfuse/issues/3729)

We introduced our library of Node-RED [Blueprints](/blog/2023/10/blueprints/) in October 2023. FlowFuse Blueprints aim to make the Node-RED experience more accessible for newcomers, while also offering a treasure trove of fresh ideas for seasoned Node-RED users. In this release, we are making it even easier to start a new Node-RED instance based on a Blueprint from our library.

## View Flows within the Team Library without loading Node-RED [#3803](https://github.com/FlowFuse/flowfuse/issues/3803)

In September 2023, Node-RED community member [gorenje](https://github.com/gorenje) created some code that could be used to visualise Node-RED flows without having to load the full Node-RED editor. This was added to the community [flow library](/blog/2023/09/flow-viewer/) and has proven to be a great addition.

With gorenje's support, we've packaged up his library to make it easier to embed in other sites and have made it generally available [here](https://github.com/FlowFuse/flow-renderer). A big thanks to gorenje for laying the ground work and allow us to build on it.

We've wasted no time putting this to good use within FlowFuse. Our first step is in our [Team Library](/changelog/2024/05/library-flowviewer/). You can now view a visual representation of saved flows in your Team Library.

## View Flows within Snapshots without loading Node-RED [#3798](https://github.com/FlowFuse/flowfuse/issues/3798)

The second place we are adding the ability to preview flows is to the Snapshots interface. Again, based on [node-red-flowviewer-js](https://github.com/gorenje/node-red-flowviewer-js), the Flow Viewer will make loading the snapshot you need into your Node-RED instance quicker and easier. 

## Manage Node-RED versions on Devices [#3766](https://github.com/FlowFuse/flowfuse/pull/3766)

It can be useful to select a specific version of Node-RED to run, for example where you are using a custom node which only runs on specific versions of Node-RED. In this release we have added the ability to easily select the version of Node-RED you wish to run on your devices. 

## Full list of release features and bug fixes

You can view everything included in 2.4 on the [Github Release page](https://github.com/FlowFuse/flowfuse/releases/tag/v2.4.0).

We also regularly release updates to [FlowFuse Cloud]({{ site.appURL }}) in between our monthly releases. You can follow the updates as they are made via our [ChangeLog](/changelog).

## What's next?

We're always working to enhance your experience with FlowFuse. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](/changelog/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/FlowFuse/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowFuse. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose). 

Together, we can make FlowFuse better with each release!

## Try it out

We're confident you can have self managed FlowFuse running locally in under 30 minutes.
You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({% include "sign-up-url.njk" %}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 2.4.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go to the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.
