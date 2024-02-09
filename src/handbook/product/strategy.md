---
navTitle: Strategy
---

# Product Strategy

Our strategy is an indication and statement of intent for the next 2 years, and reflects FlowFuse’s [vision and strategy](..//company/strategy.md). FlowFuse will allow everyone to build custom applications to achieve their business goals and depend less on off-the-shelf software.  It is a living strategy, so we will revisit on a regular basis and iterate when there is reason to do so; timing is everything. 

## Market Vision

**Our strategic goal is to be the leading "Low-Code IIoT Application Platform"**

An IIoT platform is a comprehensive solution that securely collects, integrates, and manages vast volumes of data from IoT endpoints. It's the bridge between Information Technology (IT) and Operational Technology (OT), bringing about a seamless fusion of diverse protocols and data formats, facilitating edge and cloud analytics, and enhancing overall asset management. This digital conduit not only augments traditional OT functionalities but also propels sectors like manufacturing and energy towards a more digitized, efficient future. A robust IIoT platform encapsulates essential elements such as unwavering security, sophisticated automation, and a commitment to sustainability. It fosters an environment where interoperability with a myriad of business applications is not just a feature but a foundational aspect. From meticulous device management and seamless integration to advanced data analytics and application development (see also [IIoT platform definition](https://www.gartner.com/doc/reprints?id=1-2C757S9J&ct=230105&st=sb)).

Click [here](./verticals.md#industrial-iot-platforms) for more details about the "Low-Code IIoT Application Platforms" market.

### Market Demand & Positioning

With its prowess in connecting and processing data from IIoT devices, Node-RED and FlowFuse find a fitting place in the sphere of IIoT platforms, becoming an integral tool in industries like manufacturing where the utility of such data is paramount for fostering operational efficacy and stimulating innovation. We exist to empower bottom-up innovation. We allow companies to professionalize their workflows to business critical applications.

## Go to Market pillars & initiatives

Our strategic pillars are points aimed at steering our investment and innovation efforts. The initiatives are indication and statement of intent for the next 6 months.

### Advancing Enterprise-Readiness

FlowFuse is committed to augmenting the enterprise-readiness of Node-RED. Our strategy emphasises enhancing audit and compliance capabilities, instituting stringent preventive and corrective controls, and bolstering security. By integrating these vital aspects, we aim to create a reliable, secure, and scalable environment. This initiative underlines our dedication to surpassing enterprise expectations and strengthening Node-RED's position in the industry.

- [Review-Based Pipeline Execution](https://github.com/FlowFuse/flowfuse/issues/3139): This feature mandates a dual-approval mechanism, colloquially known as the "four-eyes principle," before any changes can be propagated to a production system. This requirement is not only a best practice but a compulsory stipulation in several regulated industries, including food and pharmaceuticals, where the integrity and reliability of production systems are paramount. The introduction of Review-Based Pipeline Execution is poised to serve a dual purpose: it enables FlowFuse to venture into new market segments that necessitate such stringent control mechanisms, and it addresses the existing demands of our current customer base.

- [Implement "Organization" as an additional hierarchy level](https://github.com/FlowFuse/flowfuse/issues/2338): FlowFuse is expanding its enterprise capabilities by introducing "Organization" as an additional hierarchy level, particularly within the FlowFuse Cloud environment. This development is a direct response to the growing demand from enterprise customers utilizing our managed SaaS offering. As businesses increasingly seek efficient ways to manage multiple teams on the FlowFuse Cloud, the implementation of Organizations is set to provide a more structured and seamless management and billing system. This enhancement will not only cater to the needs of larger corporations but also streamline administrative processes, thereby offering a more cohesive and efficient platform for enterprise-level operations.

- [File Storgae for Instances](https://github.com/FlowFuse/flowfuse/issues/3056) This feature aims to enable users to store data within FlowFuse-hosted Node-RED instances, a requirement for numerous use cases, such as displaying images in dashboards. More importantly, it is essential for most AI models, which need persistent file storage. The introduction of file storage for Node-RED hosted instances is a critical step towards demonstrating Node-RED's capabilities as an enabler for AI applications, furthering its utility and applicability in advanced, data-driven environments.

### Node-RED Deployments at the Edge (Device Management)

Many organizations position Node-RED instances on remote servers, edge or industrial devices, to meet network, infrastructure, or use case requirements. Therefore, management of remote instances is crucial for the overall success of closing the gap between IT and OT. 

FlowFuse already supports this process by creating snapshots on Node-RED instances that can be deployed to multiple remote targets. We will continue to expand the functionalities to allow users to manage existing Node-RED instances, improve their development practices to accelerate development and ensure a reliable and repeatable process, providing more flexible remote deployment options and offering the best support for devices in closed and segmented networks as we are facing it in production environments.

- [Enhanced Device Settings](https://github.com/FlowFuse/flowfuse/issues/3172): The initiative focuses on expanding the configuration options for Devices, aligning with existing capabilities on hosted Node-RED setups. It aims to empower users to remotely manage their device settings, enhancing the efficiency and flexibility of device fleet management. 

### Enhanced Integration Capabilities

The [Unified Namespace](https://flowfuse.com/unified-namespace/) is a modern IT/OT Architecture for industrial companies to accellerate digital transformation. All data, from sensors, systems, and machines, are connected to make their data available to a unified network of data producers and consumers. This speeds up application building, system integration, and delivers faster insights into productivity. Node-RED and FlowFuse are a perfect match and should be positioned as integral entities of a modern UNS architecture. The natural flexibility of Node-RED, in combination with FlowFuse, offers all the requirements to realize the OT and IT integration and contextualization into a UNS. It also provides analytical and real-time monitoring capabilities to generate actionable insights.

- [Introduce a way of sharing MQTT Broker connection configurations securely in a team](https://github.com/FlowFuse/flowfuse/issues/3444)
- Adding MQTT Topic tree browsing capabilities

### Data Visualization & Analytics

FlowFuse's commitment to a low-programming approach via Node-RED, complemented by Node-RED Dashboard, allows for advanced data management and analytical functions. The Node-RED Dashboard provides a crucial interactive graphical user interface for Node-RED applications, allowing users to see data in a more visually engaging and understandable format. By processing and visualization of data, we will deliver insights into asset state, track patterns, and optimize asset use.

- FlowFuse Dashboard extension allowing [user specific dashboards](https://github.com/FlowFuse/node-red-dashboard/issues/1) and RBAC.

- Manufacturing Widgets Extension for Dashboard 2.0

### User-Friendly Low-Code Approach

FlowFuse is built upon the strength of Node-RED's user-friendly, low-code approach, positioning us well within the IIoT market. We believe Node-RED provides the best foundation, but we're committed to not only utilizing its existing capabilities but also contributing to its upstream improvement. By refining Node-RED and adding enhancements, we aim to create an even more intuitive, powerful, and accessible platform. This will enable end-users to swiftly and intuitively build applications and reducing the dependency on expert programmers.

- [Immersive Node-RED experience](https://github.com/FlowFuse/flowfuse/issues/2246)

- Having all blueprints in our library to build a MES system.
