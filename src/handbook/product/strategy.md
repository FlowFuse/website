---
navTitle: Strategy
---

# Product Strategy

In support of our [company strategy](/handbook/company/strategy.md), we build our product around a single product mission statement:

> **Provide the best way to build, manage and deploy Node-RED applications at scale, in reliable and secure production environments.**

Our strategy is an indication and statement of intent for the next 2 years. FlowFuse will empower everyone to build custom applications to achieve their business goals and depend less on off-the-shelf point solutions. 

Our strategy is reviewed on a regular basis and we will iterate when there is reason to do so; timing is everything. 

## Product Pillars

When we talk about our product features and the value it offers to our customers, we refer to our product pillars. 

These three pillars ensure we are aligned with our product mission statement and company strategy.

Any new feature requests, product improvements, or other changes to our product can be reflected back to these pillars to ensure they are in line with our product strategy.

We can break down our product pillars into smaller "Areas", which are more specific focus areas on how to optimize the product pillar. You can see how these Areas are used in our product planning [here](../development/project-management.md).

| Build | Manage | Deploy |
|-------|--------|--------|
| [Simplified Hosting](#simplified-hosting) | [Security](#security) | [DevOps](#devops) |
| [Version Control](#version-control) | [Centralized Management](#centralized-management) | [Remote Deployments](#remote-deployments) |
| [Trust](#trust) | [Adminsitration](#administration) | [Scale](#scale) |
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

FlowFuse users should not have to be concerned when scaling their own applications. FlowFuse should provide intuitive tooling to ensure that applications can scale with ease, and where possible handle this automatically.

#### Reliability

Flowfuse users should have trust that their applications will run reliably. This includes ensuring that applications are highly available, and that users have the tools to monitor and manage the reliability of their applications, including being alerted when things go wrong, and making the recovery as easy as possible.

## Go to Market (GTM) Pillars and Initiatives

Our strategic pillars guide investment and innovation efforts toward our [Ideal Customer Profile (ICP)](https://flowfuse.com/handbook/marketing/messaging/#ideal-customer-profile-(icp)) in manufacturing and other data-intensive industrial sectors. In accordance with [our company mission](https://flowfuse.com/handbook/company/strategy/) \- to “fuse the digital realm and physical reality through building bespoke workflows, applications, and integrations, unleashing their creativity so that they can effortlessly leverage their own skills and expertise” \- these initiatives represent our focused commitment, for the next 12 months, to building bespoke workflows, applications, and integrations that deliver measurable value to industrial operations while enabling all application-builders to create. All GTM pricing principles can be found [here](https://flowfuse.com/handbook/product/pricing/).

- [Industrial Application Development](#industrial-application-development)
- [Decreasing Time to Value](#decreasing-time-to-value)
- [Improved Visualization and Analytics](#improved-visualization-and-analytics)
- [Leading Node-RED Adoption](#leading-node-red-adoption)

### Industrial Application Development

FlowFuse is positioned to become the leading platform for building custom industrial applications by providing the resources to augment or enable the creation of value provided by Manufacturing Execution Systems (MES), Enterprise Resource Planning (ERP) systems, Supervisory Control and Data Acquisition (SCADA) systems, and Unified Namespace (UNS) architectures. Some roadmap items that fit this theme are:

* Database offering: Database feature in FlowFuse that enables seamless integration with Node-RED, easy read/write/query functionality, and simplifies manufacturing application building by bringing more tools into the secure FlowFuse ecosystem.    
* MQTT Broker: Managed MQTT broker service that provides reliable, scalable messaging infrastructure for industrial IoT applications, enabling secure communication and supporting Unified Namespace architectures with built-in topic management.
* UNS schema extension: Further develops FlowFuse UNS capabilities by bringing in data sources that rely on protocols other than MQTT.  
* MES modules: Provides rapid MES development by providing easy UI views of labor management, regulatory compliance, and quality management.  
* MES and ERP visualization packages: Enables visualizaton of core charts found in MES and ERP softwares.

### Decreasing Time to Value

Users can already create just about anything they want to create using FlowFuse. This initiative will further empower industrial application development by making that faster, by creating the ingredients for quickly building  solutions, streamlined onboarding experiences that reduce complexity and accelerate deployment timelines, and AI features that will allow engineers to create effective Node-RED flows and manage instances within FlowFuse very quickly and effectively.

* Blueprints Library: 3x expansion of manufacturing-focused blueprints for faster time-to-value across automotive, pharmaceutical, food & beverage, and other industrial use cases with database scaffolding capabilities.  
* AI Integration: LLM-powered natural language queries, chat-to-flow generation for Node-RED applications, and flow troubleshooting recommendations.  
* Segmented Onboarding: Faster time-to-value with use case-specific onboarding paths and interactive product demonstrations tailored to industrial applications.  
* Smart Suggestions: AI-powered recommendations for process optimization, automated anomaly detection, and intelligent workflow optimization.

### Improved Visualization and Analytics

Our visualization and analytics offerings transform industrial data into actionable insights through advanced dashboarding, predictive analytics, and digital twin capabilities that drive operational excellence. This will be achieved through continued investment in the open-source Dashboard project as well as by building manufacturing-specific visualization and analytics tools.

* Industrial Visualization Suite: Comprehensive component library including 3D modeling for quality control and production, SVG nodes, and industry-specific dashboard templates for manufacturing environments.  
* Dashboard Enhancement: Feature parity improvements, manufacturing widgets extension, and AI-generated dashboards with improved sizing and layout controls.  
* Predictive Analytics Engine: Machine learning models for predictive maintenance, demand forecasting, and labor management.  
* Digital Twin Architecture: Physics-based simulation capabilities with real-time synchronization, asset hierarchy management, and performance monitoring.

### Leading Node-RED Adoption

FlowFuse drives Node-RED adoption across industrial sectors through education, community building, and platform enhancements that showcase Node-RED's capabilities as the premier low-code solution for industrial applications. We will continue to lead in this way by investing in the open-source Node-RED project, through developing FlowFuse-specific enhancements to Node-RED, and by building the Node-RED Academy educational resource.

* Node-RED Academy: Comprehensive educational program including Building Applications, Node-RED for Industry, Node-RED for Teams, FlowFuse Basics, FlowFuse Advanced, and specialized courses for Application Development and Manufacturing.  
* Enhanced Node-RED Experience: Immersive Node-RED experience embedded within FlowFuse, improved UI modernization, and enhanced editor integration capabilities.  
* Development Improvements: Tighter autocomplete functionality with MQTT topics and database credentials, streamlined development workflows, and more granular Role-Based Access Control.  
* Community Ecosystem: Platform optimizations for sharing and collaborating on Node-RED applications with the wider Node-RED community while maintaining enterprise-grade security and reliability.
