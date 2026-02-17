---
title: FlowFuse now offers API Documentation with Swagger UI
subtitle: FlowFuse 1.9 adds new features to make it easier to administer FlowFuse
description: The new release of FlowFuse 1.9 adds new API Swagger documentation and the ability to customize Node-RED pallettes.
date: 2023-07-06 
authors: ["ian-skerrett"]
image: /blog/2023/07/images/release-1.9.0.png
tags:
    - posts
    - flowfuse
    - releases
---

FlowFuse 1.9 adds new features to make it easier to administer FlowFuse platform deployments, including new API documentation and the ability to create customized Node-RED palettes.

<!--more-->

## API Documentation
FlowFuse API allows developers to programmatically interact with the FlowFuse platform. This makes it possible to integrate FlowFuse into different infrastructure technologies, create scripts to automate specific FlowFuse tasks and embed FlowFuse into other applications.

In the 1.9 release we are now publishing our [API documentation](/docs/api/) using the [OpenAPI specification](https://swagger.io/specification/) and making it viewable with the Swagger UI. Both these industrial standards will make using the FlowFuse API easier to use and understand.


## Customize Node-RED Palettes  [#2002](https://github.com/FlowFuse/flowfuse/issues/2002)

FlowFuse platform adminstrators are now able to create customized Node-RED palettes that will be used when a Node-RED instance is created. An adminstator can create pre-defined templates to specify the nodes that should be included in the palette. This makes it easier for FlowFuse teams to standardized on Node-RED usage across an organization.

Note: this feature is not available for FlowFuse cloud users since they do not have administrator access.


## New RBAC Role for Dashboard users [#2292](https://github.com/FlowFuse/flowfuse/issues/1924)
A new FlowFuse user role has been created to view Node-RED dashboards. This allows for users to view Nod-RED dashboards without access to the Node-RED editor or requiring separate login credentials.

## Other New Features

- FlowFuse device agent is now supported on Windows [#78](https://github.com/FlowFuse/device-agent/issues/78)
- Allow local configuration of https/httpStatic on a device [#110](https://github.com/FlowFuse/device-agent/issues/110)
- Implementing custom certificate settings for device configuration [#2257](https://github.com/FlowFuse/flowfuse/issues/2257)
- Allow devices to access the "Snapshot ID" and the "Snapshot Name" running on them [#94](https://github.com/FlowFuse/device-agent/issues/94)
- High Availability logging enhanced: Individual Node-RED Instance replica querying and filtering [#2260](https://github.com/FlowFuse/flowfuse/issues/2260)
- High Availability is now generally available [#2414](https://github.com/FlowFuse/flowfuse/issues/2412)

## Bug Fixes

- Can not promote NR instance in DevOps Pipeline  [#2363](https://github.com/FlowFuse/flowfuse/issues/2363)
- Billing team menu item missing on first page load [#2398](https://github.com/FlowFuse/flowfuse/issues/2398)
- Duplicate labels in Instance Import dialog [#2200](https://github.com/FlowFuse/flowfuse/issues/2200)
- Broken littie animations [#2354](https://github.com/FlowFuse/flowfuse/issues/2354)
- Instance Logs page doesn't handle errors well [#1083](https://github.com/FlowFuse/flowfuse/issues/1083)
- Device continues to run edited flows once taken out of dev mode [#2323](https://github.com/FlowFuse/flowfuse/issues/2323)
- Device Editor cannot pickup FF theme [#89](https://github.com/FlowFuse/device-agent/issues/89)

## Community Contributions

Thanks to our community members for their contributions to this release.

- sumitshinde-84 - make Instance and application names in delete popup easily selectable [#2291](https://github.com/FlowFuse/flowfuse/pull/2291)
- biancode - Fixed typo in doc  [#2327](https://github.com/FlowFuse/flowfuse/pull/2327)

## What's next?

We're always working to enhance your experience with FlowFuse. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](/changelog/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/FlowFuse/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowFuse. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/FlowFuse/flowfuse/issues/new/choose). 

Together, we can make FlowFuse better with each release!

## Try it out

We're confident you can have self managed FlowFuse running locally in under 30 minutes.
You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({% include "main-cta-url.njk" %}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running 1.9.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go the the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.
