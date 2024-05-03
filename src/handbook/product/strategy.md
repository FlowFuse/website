---
navTitle: Strategy
---

# Product Strategy

In support of our [company strategy](/handbook/company/strategy.md), we build our product around a single product mission statement:

> **Provide the best way to build, manage and deploy Node-RED applications at scale, in reliable and secure production environments.**

Our strategy is an indication and statement of intent for the next 2 years. FlowFuse will empower everyone to build custom applications to achieve their business goals and depend less on off-the-shelf point solutions. 

Our strategy is reviewed on a regular basis and we will iterate when there is reason to do so; timing is everything. 

## Product Pillars

When we talk about our product features and the value it offers to our customers, we refer to our product pillars. These pillars ensure we are aligned with our product mission statement and company strategy.

Any new feature requests, product improvements, or other changes to our product can be reflected back to these pillars to ensure they are in line with our product strategy.

| Build | Manage | Deploy |
|-------|--------|--------|
| [Simplified Hosting](#simplified-hosting) | [Security](#security) | [DevOps](#devops) |
| [Version Control](#version-control) | [Centralized Management](#centralized-management) | [Remote Deployments](#remote-deployments) |
| [Trust](#trust) | [Frictionless Maintenance](#frictionless-maintences) | [Scale](#scale) |
| [Remote Access](#remote-access) | [Observability](#observability) | [Reliability](#reliability) |
| [Full Stack Applications](#full-stack-applications) |  |  |
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

Additionally, FlowFuse should ensure that it not only supports, but flourishes with modern IT/OT architecture such as the [Unified Namespace](https://flowfuse.com/unified-namespace/).

#### Collaborative Development

FlowFuse should ensure that it is optimized for collaborative development. We often see teams of over a dozen developers all needing to contribute and access the same Node-RED application. FlowFuse should provide the tools to make working in such an environment as easy as possible.

### Manage

#### Security

It goes without saying that security is a top priority for any product. FlowFuse should ensure that Node-RED applications are secure by default, and that users have the tools to manage and monitor the security of their applications. Users should not have to worry about the security of their applications, but be able to have clear control over access and permissions to their applications when required.

#### Centralized Management

The are two components to centralized management:

1. Node-RED - The ability to manage multiple Node-RED instances from a single interface, whether that be a few instances hosted on FlowFuse or thousands of Node-RED environments running on edge devices.

2. Users - Clear control over the access and permissions of users within a team. This includes the ability to manage who can access what applications, and what level of access they have.

#### Frictionless Maintenance

FlowFuse should ensure that maintenance, e.g. upgrading of Node-RED versions and dependencies. Maintenance will always be a chore for any application, but with FlowFuse, it should be as frictionless as possible.

#### Observability

FlowFuse should provide users with the tools to monitor appropriate activity of their Node-RED applications, ranging from performance metrics, to audit and error logging. This will ensure users are able to identify and resolve issues quickly, ideally before problems even occur, and ensure that their applications can stay running smoothly.

### Deploy

#### DevOps

FlowFuse should provide the tools to enable a DevOps workflow for Node-RED applications. In particular, users of FlowFuse should have confidence in developing and experimenting with Node-RED, without fear of interfering with their production environments, and trust that it can easily be deployed to production environments when it is ready.

#### Remote Deployments

FlowFuse should provide a seamless experience when deploying flows to remote environments, known in FlowFuse as "Devices". This includes the ability to deploy to multiple devices at once.

#### Scale

FlowFuse users should not have to concern when scaling their own applications. FlowFuse should provide intuitive tooling to ensure that applications can scale with ease, and where possible handle this automatically.

#### Reliability

Flowfuse users should have trust that their applications will run reliably. This includes ensuring that applications are highly available, and that users have the tools to monitor and manage the reliability of their applications, including being alerted when things go wrong, and making the recovery as easy as possible.

## Market Vision

Click [here](./verticals.md#industrial-iot-platforms) for more details about the relevant market segments.

### Market Demand & Positioning

With its prowess in connecting and processing data from IIoT devices, Node-RED and FlowFuse find a fitting place in the sphere of IIoT platforms, becoming an integral tool in industries like manufacturing where the utility of such data is paramount for fostering operational efficacy and stimulating innovation. We exist to empower bottom-up innovation. We allow companies to professionalize their workflows to business critical applications.

Our market positioning is underpinned by two pivotal hypotheses that address pressing demands in the IIoT space:

1. The prevailing landscape of IIoT software solutions is full of off-the-shelf products that seldom meet the unique demands of specific use cases. This gap underscores a pressing need for flexible, adaptable solutions that can be tailored to fit the intricate requirements of diverse operational environments, ensuring a glove-like fit rather than a one-size-fits-all approach.
2. The notion that true innovation within a manufacturing landscape should emanate from a bottom-up approach is central to our philosophy. Engineers and frontline workers, immersed in the day-to-day challenges and intricacies of manufacturing processes, are uniquely positioned to identify areas ripe for innovation and improvement. By empowering these individuals with the tools and platforms to implement their insights, we can unlock a wellspring of transformative ideas and solutions that drive the industry forward.

[Here](https://flowfuse.com/handbook/product/personas/#common-use-cases) you can find the demands of specific personas and their classic use cases.

## Go to Market (GTM) pillars & initiatives

Our strategic pillars are points aimed at steering our investment and innovation efforts. The initiatives are indication and statement of intent for the next 6 months. All GTM pricing principles can be found [here](./pricing.md).

- [Advancing Enterprise-Readiness](#advancing-enterprise-readiness)
- [Applications on the edge](#applications-on-the-edge)
- [Enhanced Integration Capabilities](#enhanced-integration-capabilities)
- [Data Visualization & Analytics](#data-visualization-&-analytics)

### Advancing Enterprise-Readiness

FlowFuse is committed to augmenting the enterprise-readiness of Node-RED. Our strategy emphasises enhancing audit and compliance capabilities, instituting stringent preventive and corrective controls, and bolstering security. By integrating these vital aspects, we aim to create a reliable, secure, and scalable environment. This initiative underlines our dedication to surpassing enterprise expectations and strengthening Node-RED's position in the industry.

- [Review-Based Pipeline Execution](https://github.com/FlowFuse/flowfuse/issues/3139): This feature mandates a dual-approval mechanism, colloquially known as the "four-eyes principle," before any changes can be propagated to a production system. This requirement is not only a best practice but a compulsory stipulation in several regulated industries, including food and pharmaceuticals, where the integrity and reliability of production systems are paramount. The introduction of Review-Based Pipeline Execution is poised to serve a dual purpose: it enables FlowFuse to venture into new market segments that necessitate such stringent control mechanisms, and it addresses the existing demands of our current customer base.

- [Implement "Organization" as an additional hierarchy level](https://github.com/FlowFuse/flowfuse/issues/2338): FlowFuse is expanding its enterprise capabilities by introducing "Organization" as an additional hierarchy level, particularly within the FlowFuse Cloud environment. This development is a direct response to the growing demand from enterprise customers utilizing our managed SaaS offering. As businesses increasingly seek efficient ways to manage multiple teams on the FlowFuse Cloud, the implementation of Organizations is set to provide a more structured and seamless management and billing system. This enhancement will not only cater to the needs of larger corporations but also streamline administrative processes, thereby offering a more cohesive and efficient platform for enterprise-level operations.

- [File Storage for Instances](https://github.com/FlowFuse/flowfuse/issues/3056) This feature aims to enable users to store data within FlowFuse-hosted Node-RED instances, a requirement for numerous use cases, such as displaying images in dashboards. More importantly, it is essential for most AI models, which need persistent file storage. The introduction of file storage for Node-RED hosted instances is a critical step towards demonstrating Node-RED's capabilities as an enabler for AI applications, furthering its utility and applicability in advanced, data-driven environments.

### Applications on the edge 

Many organizations position Node-RED instances on remote servers, edge-, or industrial-devices. This practise allows them to meet network-, infrastructure-, or use-case- requirements.

FlowFuse already supports this process by creating snapshots on Node-RED instances that can be deployed to multiple remote targets. We will continue to expand the functionalities to allow users to manage existing Node-RED instances, improve their development practices to accelerate development and ensure a reliable and repeatable process, providing more flexible remote deployment options and offering the best support for devices in closed and segmented networks as we are facing it in production environments.

- [Enhanced Device Settings](https://github.com/FlowFuse/flowfuse/issues/3172): The initiative focuses on expanding the configuration options for Devices, aligning with existing capabilities on hosted Node-RED setups. It aims to empower users to remotely manage their device settings, enhancing the efficiency and flexibility of device fleet management. 

- [Immersive Node-RED experience](https://github.com/FlowFuse/flowfuse/issues/2246), a separation between the Node-RED Editor and FlowFuse leads to unused features from a UX standpoint in FlowFuse, due to the need to jump between both entities. An immersive Node-RED experience embeds Node-RED into FlowFuse, allowing seamless usage of Node-RED and FlowFuse features.

### Enhanced Integration Capabilities

The [Unified Namespace](https://flowfuse.com/unified-namespace/) is a modern IT/OT architecture for industrial companies to accelerate digital transformation. All data, from sensors, systems, and machines, are connected to make their data available to a unified network of data producers and consumers. This speeds up application building, system integration, and delivers faster insights into productivity. Node-RED and FlowFuse are a perfect match and should be positioned as integral entities of a modern UNS architecture. The natural flexibility of Node-RED, in combination with FlowFuse, offers all the requirements to realize the OT and IT integration and contextualization into a UNS. It also provides analytical and real-time monitoring capabilities to generate actionable insights.

- [Introduce a way of sharing MQTT Broker connection configurations securely in a team](https://github.com/FlowFuse/flowfuse/issues/3444). MQTT is one of the most common protocols used for an UNS architecture; therefore, it is extremely important to allow users to not only configure and establish an MQTT connection from Node-RED but also to share configurations in a team or enterprise.
- Adding MQTT Topic tree browsing capabilities is one of the most common MQTT features, which allows easier navigation and application creation while using MQTT. The MQTT topic tree should be ideally accessible directly within the Editor and shared across a Team.

### Data Visualization & Analytics

FlowFuse's commitment to a low-programming approach via Node-RED, complemented by the Node-RED Dashboard, allows for advanced data management and analytical functions. The Node-RED Dashboard provides a crucial interactive graphical user interface for Node-RED applications, allowing users to see data in a more visually engaging and understandable format. By processing and visualizing data, we will deliver insights into asset state, track patterns, and optimize asset use.

- FlowFuse Dashboard feature parity with D1.0. A logical step to replace D1.0 .

- Manufacturing Widgets Extension for Dashboard 2.0. This extension should provide very classic manufacturing visualization, making it even easier to create Node-RED Dashboards for manufacturing.



