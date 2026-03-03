---
navTitle: Strategy
---

# Product Strategy

In support of our [company strategy](//handbook/company/strategy.md), and derived from our [vision](//handbook/company/product/vision.md), we build our product around a single product mission statement:

>**We are the platform that moves you from fragile, project-based automation to governed, distributed industrial runtime infrastructure.**

Our strategy is reviewed on a regular basis and we will iterate when there is reason to do so. 

## Strategic Objectives

Our strategic Objectives direct our investment and innovation efforts, and are re evaluated each quarter.

- [Establish FlowFuse as the Enterprise-Trusted Node-RED Platform](#Establish-FlowFuse-as-the-Enterprise-Trusted-Node-RED-Platform)
- [Deliver the fastest, most flexible edge deployments](#deliver-the-fastest-most-flexible-edge-deployments)
- [Win ICP manufacturing Logos](#win-icp-manufacturing-logos)

### Establish FlowFuse as the Enterprise-Trusted Node-RED Platform

FlowFuse is committed to augmenting the enterprise-readiness of Node-RED. Our strategy emphasises enhancing audit and compliance capabilities, instituting stringent preventive and corrective controls, and bolstering security. By integrating these vital aspects, we aim to create a reliable, secure, and scalable environment. This initiative underlines our dedication to surpassing enterprise expectations and strengthening Node-RED's position in the industry.

### Deliver the Fastest, most Flexible Edge Deployments

Many organizations position Node-RED instances on remote servers, edge-, or industrial-devices. This practise allows them to meet network-, infrastructure-, or use-case- requirements.

FlowFuse already supports this process by creating snapshots on Node-RED instances that can be deployed to multiple remote targets. We will continue to expand the functionalities to allow users to manage existing Node-RED instances, improve their development practices to accelerate development and ensure a reliable and repeatable process, providing more flexible remote deployment options and offering the best support for devices in closed and segmented networks as we are facing it in production environments.

### Win ICP Manufacturing Logos
Our Industrial enterprise customers rely on node-red and FlowFuse to complete the observability of their OT and IT networks. Our product solves real, painful problems for people responsible for the uptime and observability of their networks and production. We are committed to building, selling and marketing our platform with their needs at the forefront of our product decisions.

## Roadmap

The company roadmap shows a high-level view of the features we are building to bring our company vision to fruition. Our roadmap provides transparency into our development priorities and helps align our team's efforts with our strategic objectives.

You can view our current roadmap in the [12 Month Plan view](https://github.com/orgs/FlowFuse/projects/3/views/19) of our Product Planning project on GitHub.

The roadmap may need to be adjusted over time as we pivot when we identify better ways to accomplish our company goals. This flexibility allows us to respond to market changes, customer feedback, and emerging opportunities while maintaining our focus on delivering maximum value to our customers.



## Product Pillars

When we talk about our product features and the value it offers to our customers, we refer to our product pillars. 

These three pillars ensure we are aligned with our product mission statement and company strategy.


| Pillar Name                  | Strategic Value Proposition                                                                                | The "Operational Scaling" Problem/Solution                                                                                                                                                                                                                                          | Differentiation (vs. Raw Node-RED/Competitors)                                                                                                                              |
|:-----------------------------|:-----------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Operational Scaling**      | **Deliver Consistency at Scale.** Move from "one-off" projects to a global fleet strategy.                 | **Problem:** Successful pilots often become "snowflakes" that are impossible to maintain or update across multiple sites.<br><br>**Solution:** Centralized management of application patterns, ensuring that a CNC monitoring app at Site A is identical to the one at Site B.      | Unlike raw Node-RED, FlowFuse provides the governance, deployment pipelines, and device management needed to scale without adding headcount.                                |
| **System Agility**           | **Extend & Adapt without Rip-and-Replace.** Turn rigid vendor software into flexible business assets.      | **Problem:** Purchased systems (MES/SCADA) rarely meet 100% of local operational needs, leading to manual workarounds.<br><br>**Solution:** A "low-code" agility layer that sits atop existing systems to add custom logic, vendor-agnostic workflows, and tailored business rules. | FlowFuse acts as the "anti-lock-in" layer. It allows teams to customize their stack without relying on expensive original vendor consultants or custom C#/.NET builds.      |
| **Event-Driven Data Bridge** | **High-Precision Data Orchestration.** Connect the shop floor to the top floor based on real-world events. | **Problem:** Traditional middleware is often too heavy, while historians are too passive for real-time action.<br><br>**Solution:** A lightweight, event-based bridge that triggers data movement, transformation, and storage only when specific operational events occur.         | We aren't a "data lake." We are the intelligent router. This avoids the "dump everything to the cloud" cost trap and positions us as a surgical tool for IT/OT integration. |


Any new feature requests, product improvements, or other changes to our product can be reflected back to these pillars to ensure they are in line with our product strategy.

### Product Areas
We can break down our product pillars into smaller "Areas", which are more specific focus areas on how to optimize the product pillar. You can see how these Areas are used in our product planning [here](../project-management.md).

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

