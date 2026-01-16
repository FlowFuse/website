---
title: FlowFuse 2.0 Release
subtitle: Elevating Node-RED Device Management to new heights
description: Announcing the launch of FlowFuse 2.0, a significant upgrade in managing Node-RED remote instances.
date: 2024-01-18
authors: ["marian-demme"]
image: /blog/2024/01/images/flowfuse-2-release.png
tags:
    - posts
    - flowfuse
    - news
    - releases
---

Following the release of FlowFuse 1.0 end of 2022, we're excited to release FlowFuse 2.0, marking a significant step in managing Node-RED remote instances, which we call Devices. FlowFuse already was the best place to operate Node-RED at scale in the cloud or on-premise, now it's able to manage Node-RED where ever it's run.
 
<!--more-->


Many organizations position Node-RED instances on remote servers like edge or industrial devices. This way they can meet network requirement, interact with analog protocols, and overcome other infrastructure requirements. Management of remote instances is crucial for the overall success of closing the gap between IT and OT. A key enhancement was the introduction of Device Groups (from version 1.15) and the new feature to assign target snapshots. This allows for direct and streamlined management of Node-RED Device fleets, setting the stage for future advancements in device management capabilities.

For our FlowFuse users, this means it is no longer necessary or recommended to assign devices to an instance. Node-RED devices can be managed independently, and snapshots can be assigned via DevOps pipelines.

## Enterprise-Readiness

FlowFuse is committed to augmenting the enterprise-readiness of Node-RED with introductions like [Single Sign-On (SSO)](/docs/admin/sso/), [Multi-Factor Authentication (MFA)](/docs/user/user-settings/#two-factor-authentication), and [High Availability](/docs/user/high-availability/) since version 1.0. Furthermore, we recently achieved [SOC2 Type 1 compliance](/blog/2024/01/soc2/). With these advancements, Node-RED, in combination with FlowFuse, is genuinely ready for enterprise and production use.

## Enhanced Integration Capabilities

The Node-RED Flow Library has always been a cornerstone, offering over 4800 connectors (nodes) for various OT and IT protocols. Thanks to the community and the Node-RED library. Building on this foundation, FlowFuse introduced "Certified Nodes" and "Blueprints". These [Blueprints](/blog/2023/10/blueprints/) are designed to provide an easier start with Node-RED, showcasing its full potential, while Certified Nodes ensure the security of the nodes used. Learn more about our new Certified Nodes [here](/blog/2023/10/certified-nodes/).

## Developer Velocity

Node-RED team development is made possible with FlowFuse. Different development team members are able to share and collaborate on the same Node-RED instance. This makes for much easier collaboration between Node-RED developers. We've worked hard on maturing our [snapshot capabilties](/docs/user/snapshots/) and introduced [DevOps Pipelines](/docs/user/devops-pipelines/) that can be set up to stage Node-RED instances that have different development stages, e.g. test, development and production.

## Looking Ahead

At FlowFuse, our mission is to empower bottom-up innovation and enable organizations to transform their workflows into business-critical applications with unprecedented efficiency. As we move forward, we are excited to invite our users to actively engage with our future developments. Our [Roadmap](/changelog/) lays out the advancements we're targeting, offering a glimpse into the features and enhancements that are on the horizon. We also encourage our users to stay informed and involved by checking out our latest updates in our detailed [changelog](/changelog/). Your insights and feedback are crucial to us; they fuel our commitment to continuous improvement and innovation. We warmly invite you to [share your thoughts and suggestions](/contact-us/), as your input is a vital part of our journey in shaping the next steps for FlowFuse.

## How to get started

You can install FlowFuse yourself via a variety of install options. You can find out more details [here](/docs/install/introduction/).

If you'd rather use our hosted offering: [Get started for free]({{ site.onboardingURL }}) on FlowFuse Cloud.

## Upgrading FlowFuse

[FlowFuse Cloud]({{ site.appURL }}) is already running version 2.0.

If you installed a previous version of FlowFuse and want to upgrade, our documentation provides a
guide for [upgrading your FlowFuse instance](/docs/upgrade/).

The version 2.0 release of the FlowFuse Helm Chart includes a breaking change for deployments making use of the `forge.localPostgresql` setting when upgrading. This is where the helm chart installs a dedicated PostgreSQL database instance.
With version 2.0 we have updated the version of the Bitnami PostgreSQL Helm sub-chart we bundle and the upgrade process will require some manual intervention to ensure things work correctly. A fresh install should not require any extra steps.

The steps are documented on the [Upgrade instructions](/docs/install/kubernetes/#upgrade) page, please read them carefully before upgrading

## Getting help

Please check FlowFuse's [documentation](/docs/) as the answers to many questions are covered there. Additionally you can go to the [community forum](https://discourse.nodered.org/c/vendors/flowfuse/24) if you have
any feedback or feature requests.