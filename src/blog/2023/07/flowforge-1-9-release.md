---
title: FlowForge now offers API Documentation with Swagger UI
subtitle: FlowForge 1.9 adds new features to make it easier to administer FlowForge
description: The new release of FlowForge 1.9 adds new API Swagger documentation and the ability to customize Node-RED pallettes.
date: 2023-07-06 
authors: ["ian-skerrett"]
image: 
tags:
    - posts
    - flowforge
    - releases
---

FlowForge 1.9 adds new features to make it easier to adminster FlowForge platform deployments, including new API documentation and the ability to create customized Node-RED palettes.

<!--more-->

## API Documentation
FlowForge platform API allows developers to progammatically interact with the FlowForge platform. This makes it possible to integrate FlowForge into different infrastrcutre technologies, automate specifc FlowForge tasks with scripts and embedd FlowForge into other applications.  

In our 1.9 release we are now publishing our API documentation with the OpenAPI specification and making it viewable with the Swagger UI. Both these industrial standards will make using the FlowForge API easier to use and understand.


## Customize Node-RED Palettes

FlowForge platform adminstrators are now able to create customized Node-RED palettes that will be used when an Node-RED instance is created. An adminstator is now able to create a templates that specify the nodes that should be included in the palette. This allows adminstators to make available pre-defined templates to their FlowForge teams making it easier to standardized on Node-RED usage across an organization.

Note: this feature is not available for FlowForge cloud users since they do not have adminstrator access. FlowForge Cloud will begin to include the Node-RED debugger and lint node in their default templates. In the future, the ability to create templates will be enabled for teams.


## New RBAC Role for Dashboard users [#2292](https://github.com/flowforge/flowforge/issues/1924)
A new FlowForge user role has been created to view Node-RED dashboards. This allows for users to view Nod-RED dashboards without access to the Node-RED editor or requiring seperate login credentials.

## Other New Features

- FlowForge device agent is now supported on Windows [#78](https://github.com/flowforge/flowforge-device-agent/issues/78)
- Allow local configuration of https/httpStatic on a device [#110](https://github.com/flowforge/flowforge-device-agent/issues/110)
- Instance settings: Add https.key and https.certs [#2257](https://github.com/flowforge/flowforge/issues/2257)
- Allow devices to access details of the snapshot running on them [#94](https://github.com/flowforge/flowforge-device-agent/issues/94)


## Bug Fixes

- Can not promote NR instance in DevOps Pipeline  [#2363](https://github.com/flowforge/flowforge/issues/2363)
- Billing team menu item missing on first page load [#2398](https://github.com/flowforge/flowforge/issues/2398)
- Duplicate labels in Instance Import dialog [#2200](https://github.com/flowforge/flowforge/issues/2200)
- Broken littie animations [#2354](https://github.com/flowforge/flowforge/issues/2354)
- Instance Logs page doesn't handle errors well [#1083](https://github.com/flowforge/flowforge/issues/1083)
- Device continues to run edited flows once taken out of dev mode [#2323](https://github.com/flowforge/flowforge/issues/2323)
- Device Editor cannot pickup FF theme [#89](https://github.com/flowforge/flowforge-device-agent/issues/89)

## What's next?

We're always working to enhance your experience with FlowForge. Here's how you can stay informed and contribute:

- **Roadmap Overview**: Check out our [Product Roadmap Page](https://flowforge.com/product/roadmap/) to see what we're planning for future updates.
- **Entire Roadmap**: Visit our [Roadmap on GitHub](https://github.com/orgs/flowforge/projects/5) to follow our progress and contribute your ideas.
- **Feedback**: We're interested in your thoughts about FlowForge. Your feedback is crucial to us, and we'd love to hear about your experiences with the new features and improvements. Please share your thoughts, suggestions, or report any [issues on GitHub](https://github.com/flowforge/flowforge/issues/new/choose). 

Together, we can make FlowForge better with each release!

## Try it out

We're confident you can have self managed FlowForge running locally in under 30 minutes.
You can install our [local build](https://flowforge.com/docs/install/local/), use [Docker](https://flowforge.com/docs/install/docker/), or [Kubernetes](https://flowforge.com/docs/install/kubernetes/).

If you'd rather use our hosted offering: [Get started for free](https://app.flowforge.com/account/create) on FlowForge Cloud.

## Upgrading FlowForge

[FlowForge Cloud](https://app.flowforge.com) is already running 1.8.

If you installed a previous version of FlowForge and want to upgrade, our documentation provides a
guide for [upgrading your FlowForge instance](https://flowforge.com/docs/upgrade/).

## Getting help

Please check FlowForge's [documentation](https://flowforge.com/docs/) as the answers to many questions are covered there. Additionally you can go the the [community forum](https://community.flowforge.com) if you have
any feedback or feature requests.
