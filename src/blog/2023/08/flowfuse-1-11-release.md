---
title: FlowFuse 1.11 makes it easier to get started with FlowFuse and Node-RED
subtitle: Our latest release includes a new starter tier for FlowFuse Cloud, Personal Access Tokens for API access and improvements to device management.
description: The new FlowFuse 1.11 release includes a new starter tier for FlowFuse Cloud, Personal Access Tokens for API access and improvements to device management.
date: 2023-08-31 
authors: ["ian-skerrett"]
image: /blog/2023/08/images/release-1-11-graphic.png
tags:
    - posts
    - flowfuse
    - releases
---

FlowFuse 1.11 introduces a new starter tier for FlowFuse Cloud that makes it easier to get started with FlowFuse and Node-RED.

<!--more-->
## New FlowFuse Cloud Starter Tier  [#2328](https://github.com/FlowFuse/flowfuse/issues/2328)

It is now easier for Node-RED developers to get started with FlowFuse and Node-RED. The new starter tier allows developers to use two Node-RED instances and two remote device deployments. Ideal for creating proof of concepts or running a home automation system with Node-RED. 

FlowFuse provides a cloud hosted version of Node-RED so developers don't need to worry about Node-RED installation or operation. This makes it a lot easier to get started with Node-RED and easier to maintain a running instance. 


## FlowFuse API access now possible via personal access tokens [#14](https://github.com/FlowFuse/flowfuse/issues/14)
FlowFuse APIs are now accessible via personal access tokens (PAT). This makes it possible to create automation scripts that interact with the FlowFuse platform using the API and authenticate the scripts with the PAT. 

## Usability Improvements to Device Management [#2294](https://github.com/FlowFuse/flowfuse/issues/2334)

A number of usability improvements have been added to the FlowFuse device management solution to make it more flexible and intuitive to use. These improvements include being able to associate devices at the application level allowing for easier editing of Node-RED instances on edge devices.

## FlowFuse Rebranding [#119](https://github.com/orgs/FlowFuse/projects/1?pane=issue&itemId=34719640)

Earlier in August, [FlowForge announced](/blog/2023/08/flowforge-is-now-flowfuse/) a change to our company and product name to FlowFuse. Work has begun to change the product branding to FlowFuse. The UI has been rebranded and the remaining points will be changed in the next release.

## Other New Features

- Add ability to add a description to an application and display it in the portal [#2279](https://github.com/FlowFuse/flowfuse/issues/2279)
- UI Improvements to device management [#2427](https://github.com/FlowFuse/flowfuse/issues/2427)
- Improve landing page for documentation [#842](https://github.com/FlowFuse/website/issues/842)
- Restructure of user interface navigation [#2474](https://github.com/FlowFuse/flowfuse/issues/2474)


## Bug Fixes

- Device running old snapshot [#132](https://github.com/FlowFuse/device-agent/issues/132)




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

[FlowFuse Cloud]({{ site.appURL }}) is already running 1.11.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go to the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.
