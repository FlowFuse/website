---
navTitle: Strategy
---

# Product Strategy

Our strategy is an indication and statement of intent for the next 2 years, and reflects FlowFuse’s [vision and strategy](/handbook/company/strategy.md). FlowFuse will allow everyone to build custom applications to achieve their business goals and depend less on off-the-shelf point solutions. 

It strategy is ever-changing, it will be revised on a regular basis and we will iterate when there is reason to do so; timing is everything. 

## Market Vision

**Our strategic goal is to be the leading "Low-Code IIoT Application Platform"**

An IIoT platform is a comprehensive solution that securely collects, integrates, and manages vast volumes of data from IoT endpoints. It's the bridge between Information Technology (IT) and Operational Technology (OT), bringing about a seamless fusion of diverse protocols and data formats, facilitating edge and cloud analytics, and enhancing overall asset management. This digital conduit not only augments traditional OT functionalities but also propels sectors like manufacturing and energy towards a more digitized, efficient future. A robust IIoT platform encapsulates essential elements such as unwavering security, sophisticated automation, and a commitment to sustainability. It fosters an environment where interoperability with a myriad of business applications is not just a feature but a foundational aspect. From meticulous device management and seamless integration to advanced data analytics and application development (see also [IIoT platform definition](https://www.gartner.com/doc/reprints?id=1-2C757S9J&ct=230105&st=sb)).

Click [here](./verticals.md#industrial-iot-platforms) for more details about the "Low-Code IIoT Application Platforms" market.

### Market Demand & Positioning

With its prowess in connecting and processing data from IIoT devices, Node-RED and FlowFuse find a fitting place in the sphere of IIoT platforms, becoming an integral tool in industries like manufacturing where the utility of such data is paramount for fostering operational efficacy and stimulating innovation. We exist to empower bottom-up innovation. We allow companies to professionalize their workflows to business critical applications.

Our market positioning is underpinned by two pivotal hypotheses that address pressing demands in the IIoT space:

1. The prevailing landscape of IIoT software solutions is full of off-the-shelf products that seldom meet the unique demands of specific use cases. This gap underscores a pressing need for flexible, adaptable solutions that can be tailored to fit the intricate requirements of diverse operational environments, ensuring a glove-like fit rather than a one-size-fits-all approach.
2. The notion that true innovation within a manufacturing landscape should emanate from a bottom-up approach is central to our philosophy. Engineers and frontline workers, immersed in the day-to-day challenges and intricacies of manufacturing processes, are uniquely positioned to identify areas ripe for innovation and improvement. By empowering these individuals with the tools and platforms to implement their insights, we can unlock a wellspring of transformative ideas and solutions that drive the industry forward.

[Here](https://flowfuse.com/handbook/product/personas/#common-use-cases) you can find the demands of specific personas and their classic use cases.

## Go to Market (GTM) pillars & initiatives

Our strategic pillars are points aimed at steering our investment and innovation efforts. The initiatives are indication and statement of intent for the next 6 months. All GTM pricing principles can be found [here](./pricing.md).

### Advancing Enterprise-Readiness

FlowFuse is committed to augmenting the enterprise-readiness of Node-RED. Our strategy emphasises enhancing audit and compliance capabilities, instituting stringent preventive and corrective controls, and bolstering security. By integrating these vital aspects, we aim to create a reliable, secure, and scalable environment. This initiative underlines our dedication to surpassing enterprise expectations and strengthening Node-RED's position in the industry.

- [Review-Based Pipeline Execution](https://github.com/FlowFuse/flowfuse/issues/3139): This feature mandates a dual-approval mechanism, colloquially known as the "four-eyes principle," before any changes can be propagated to a production system. This requirement is not only a best practice but a compulsory stipulation in several regulated industries, including food and pharmaceuticals, where the integrity and reliability of production systems are paramount. The introduction of Review-Based Pipeline Execution is poised to serve a dual purpose: it enables FlowFuse to venture into new market segments that necessitate such stringent control mechanisms, and it addresses the existing demands of our current customer base.

- [Implement "Organization" as an additional hierarchy level](https://github.com/FlowFuse/flowfuse/issues/2338): FlowFuse is expanding its enterprise capabilities by introducing "Organization" as an additional hierarchy level, particularly within the FlowFuse Cloud environment. This development is a direct response to the growing demand from enterprise customers utilizing our managed SaaS offering. As businesses increasingly seek efficient ways to manage multiple teams on the FlowFuse Cloud, the implementation of Organizations is set to provide a more structured and seamless management and billing system. This enhancement will not only cater to the needs of larger corporations but also streamline administrative processes, thereby offering a more cohesive and efficient platform for enterprise-level operations.

- [File Storgae for Instances](https://github.com/FlowFuse/flowfuse/issues/3056) This feature aims to enable users to store data within FlowFuse-hosted Node-RED instances, a requirement for numerous use cases, such as displaying images in dashboards. More importantly, it is essential for most AI models, which need persistent file storage. The introduction of file storage for Node-RED hosted instances is a critical step towards demonstrating Node-RED's capabilities as an enabler for AI applications, furthering its utility and applicability in advanced, data-driven environments.

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



