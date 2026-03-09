---
title: FlowFuse 1.10 Release Now Available
subtitle: New FlowFuse 1.10 also includes improvements to device management and importing environment variable templates.
description: New FlowFuse 1.10 release introduces importing of environment variable templates and improvements to device management.
date: 2023-08-03 
authors: ["ian-skerrett"]
image: /blog/2023/08/images/release-1-10-graphic.png
tags:
    - posts
    - flowfuse
    - releases
---

FlowFuse 1.10 release includes improvements to device management and importing environment variable templates.

<!--more-->
## Import Environment Variable Templates  [#2372](https://github.com/FlowFuse/flowfuse/issues/2372)

FlowFuse 1.10 now allows users to import environment variable templates. This makes it much easier and less error prone to maintain and add new environment variables to Node-RED instances running on FlowFuse. 


## DevOps Pipelines now can include devices [#2243](https://github.com/FlowFuse/flowfuse/issues/2243)
DevOps pipelines have proven very popular for creating dev/test/production environments for Node-RED flow development. Now, devices can be associated with a pipeline so when a snapshot is created it can be pushed to all the devices associated with the pipeline.  This will improve the overall quality and reliability of Node-RED development for remote devices.

## Devices can now access the team library [#2294](https://github.com/FlowFuse/flowfuse/issues/2294)

Team libraries allow Node-RED development team to share common flows and nodes through a shared library. Until the 1.10 release, Node-RED running remotely on a device did not have access to the team library. This limitation is now removed so device development can benefit from reusing standard flows.

## Other New Features

- Add description of device type field  [#2428](https://github.com/FlowFuse/flowfuse/issues/2428)
- Improve reliability of device editor [#2483](https://github.com/FlowFuse/flowfuse/issues/2483)
- Improve error feedback from device editor tunnel [#2473](https://github.com/FlowFuse/flowfuse/issues/2473)


## Bug Fixes

- Improve visualization of Last Seen & Last Known with large amounts of devices. [#2380](https://github.com/FlowFuse/flowfuse/issues/2380)
- Fix billing information error in FlowFuse Cloud [#2416](https://github.com/FlowFuse/flowfuse/issues/2416)
- Fix T&C checkbox on sign-up page [#2419](https://github.com/FlowFuse/flowfuse/issues/2419)


## Community Contributions

Thanks to our community members for their contributions to this release.
- [dfulgham](https://github.com/dfulgham) - Added support for annotation substitutions [#95](https://github.com/FlowFuse/flowforge-driver-k8s/pull/95)
- [elanaviter](https://github.com/elenaviter) - Editors: allow optional service account linkage [#92](https://github.com/FlowFuse/flowforge-driver-k8s/pull/92)

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

[FlowFuse Cloud]({{ site.appURL }}) is already running 1.10.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go the the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.
