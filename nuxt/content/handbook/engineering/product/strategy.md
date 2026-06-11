---
title: "Strategy"
---

# Product Strategy

In support of our [company strategy](/handbook/company/strategy), we build our product around a single product mission statement:

> **Provide the best way to build, manage and deploy Node-RED applications at scale, in reliable and secure production environments.**

Our strategy is an indication and statement of intent for the next 2 years. FlowFuse will empower everyone to build custom applications to achieve their business goals and depend less on off-the-shelf point solutions.

Our strategy is reviewed on a regular basis and we will iterate when there is reason to do so; timing is everything.

## Product Pillars

When we talk about our product features and the value it offers to our customers, we refer to our product pillars.

These three pillars ensure we are aligned with our product mission statement and company strategy.

Any new feature requests, product improvements, or other changes to our product can be reflected back to these pillars to ensure they are in line with our product strategy.

| Build | Manage | Deploy |
|-------|--------|--------|
| [Simplified Hosting](#simplified-hosting) | [Security](#security) | [DevOps](#devops) |
| [Version Control](#version-control) | [Centralized Management](#centralized-management) | [Remote Deployments](#remote-deployments) |
| [Trust](#trust) | [Administration](#administration) | [Scale](#scale) |
| [Remote Access](#remote-access) | [Frictionless Maintenance](#frictionless-maintenance) | [Reliability](#reliability) |
| [Full Stack Applications](#full-stack-applications) | [Observability](#observability) |  |
| [Low Code](#low-code) |  |  |
| [Collaborative Development](#collaborative-development) |  |  |

### Build

#### Simplified Hosting

FlowFuse should offer a seamless hosting experience for Node-RED applications. This includes a simple onboarding process, control over the hosting environment (e.g. Node-RED versions), and a reliable infrastructure.

#### Version Control

FlowFuse should provide a way to manage and track changes to Node-RED applications. This includes the ability to save progress of work, compare changes made over time. and revert to previous versions when required.

#### Trust

One of the joys of Node-RED as an open-source technology is the [rich ecosystem of community-contributed nodes and flows](https://flows.nodered.org/). The disadvantage of this in a production/enterprise context is the difficulty to trust in the reliability, quality and security of these contributions.

FlowFuse should ensure that users have an easy way to identify trustworthy and stable third-party nodes, without compromising the flexibility and openness of the platform.

#### Remote Access

Most of our customers are using Node-RED in remote environments, where they do not have easy access to the device running Node-RED. FlowFuse should provide a secure and reliable way to access, and deploy on Node-RED instances remotely.

#### Full Stack Applications

FlowFuse should support the full end-to-end architecture of a modern application. This includes the ability to build both the frontend and backend of an application, as well as the ability to integrate with external services and APIs.

Additionally, FlowFuse should ensure that it not only supports, but flourishes with, modern IT/OT architecture such as the [Unified Namespace](https://flowfuse.com/unified-namespace/).

#### Low-Code

Node-RED's popularity is due to it's user-friendly, low-code user interface. FlowFuse should offer improvements to lower the point of entry for new users even further, and make it easier for users to build applications without needing to write code.

#### Collaborative Development

FlowFuse should ensure that it is optimized for collaborative development. We often see teams of over a dozen developers all needing to contribute and access the same Node-RED application. FlowFuse should provide the tools to make working in such an environment as easy as possible.

In addition to the scope of collaboration within a team, FlowFuse has an opportunity to become an ecosystem for sharing and collaborating on Node-RED applications with the wider Node-RED community too.

### Manage

#### Security

It goes without saying that security is a top priority for any product. FlowFuse should ensure that Node-RED applications are secure by default, and that users have the tools to manage and monitor the security of their applications, for example through role-based access control (RBAC). Users should not have to worry about the security of their applications, but be able to have clear control over access and permissions to their applications when required.

#### Centralized Management

This refers to the tooling that FlowFuse provides for the centralized management of Node-RED instances. In particular, the ability to manage multiple Node-RED instances from a single interface, whether that be a few instances hosted on FlowFuse or thousands of Node-RED environments running on edge devices.

#### Administration

Clear control over the full FlowFuse platform. This includes the ability to have clarity on platform-wide activity and the billing aspects of the platform and associated resources.

#### Frictionless Maintenance

FlowFuse should ensure that maintenance, e.g. upgrading of Node-RED versions and dependencies. Maintenance will always be a chore for any application, but with FlowFuse, it should be as frictionless as possible.

#### Observability

FlowFuse should provide users with the tools to monitor appropriate activity of their Node-RED applications, ranging from performance metrics, to audit and error logging. This will ensure users are able to identify and resolve issues quickly, ideally before problems even occur, and ensure that their applications can stay running smoothly.

#### Billing

FlowFuse should provide a clear and transparent billing system for users. This includes the ability to manage and monitor costs, and the ability to scale up and down as required.

### Deploy

#### DevOps

FlowFuse should provide the tools to enable a DevOps workflow for Node-RED applications. In particular, users of FlowFuse should have confidence in developing and experimenting with Node-RED, without fear of interfering with their production environments, and trust that it can easily be deployed to production environments when it is ready.

#### Remote Deployments

FlowFuse should provide a seamless experience when deploying flows to remote environments, known in FlowFuse as "Devices". This includes the ability to deploy to multiple devices at once.

#### Scale

FlowFuse users should not have to concern when scaling their own applications. FlowFuse should provide intuitive tooling to ensure that applications can scale with ease, and where possible handle this automatically.

#### Reliability

FlowFuse users can trust that their applications will run reliably. This includes ensuring that applications are highly available, and that users have the tools to monitor and manage the reliability of their applications, including being alerted when things go wrong, and making the recovery as easy as possible.
