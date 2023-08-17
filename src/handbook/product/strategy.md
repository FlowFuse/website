---
navTitle: Strategy
---

# Product Strategy

Our strategy is an indication and statement of intent for the next 2 years, and reflects FlowFuse’s vision, to become the leading "Low-Code IIoT Application Platform".
FlowFuse will allow everyone to build custom applications to achieve their business goals and depend less on off-the-shelf software.
It’s a draft, as everything in the handbook is a draft, so we will revisit regularly and iterate when there is a reason to do so. FlowFuse is a 100 percent agile company, so our product is; timing is everything.
Have a look at our [roadmap](/product/roadmap/) for what we're pursuing in the upcoming releases.

### Advancing Enterprise-Readiness

FlowFuse is committed to augmenting the enterprise-readiness of Node-RED. Our strategy emphasises enhancing audit and compliance capabilities, instituting stringent preventive and corrective controls, and bolstering security. By integrating these vital aspects, we aim to create a reliable, secure, and scalable environment. This initiative underlines our dedication to surpassing enterprise expectations and strengthening Node-RED's position in the industry.

### Node-RED Deployments at the Edge (Device Management)

Many organizations position Node-RED instances on remote servers, edge or industrial devices, to meet network, infrastructure, or use case requirements. Therefore, management of remote instances is crucial for the overall success of closing the gap between IT and OT. 

FlowFuse already supports this process by creating snapshots on Node-RED instances that can be deployed to multiple remote targets. We will continue to expand the functionalities to allow users to manage existing Node-RED instances, improve their development practices to accelerate development and ensure a reliable and repeatable process, providing more flexible remote deployment options and offering the best support for devices in closed and segmented networks as we are facing it in production environments.

### Enhanced Integration Capabilities

The "Node-RED Library" offers a unique added value to many Node-RED and FlowFuse users. It is already possible today to easily create technical implementations out of the box for several OT and IT protocols, thanks to the community and Node-RED library.

As a part of our evolution, FlowFuse plans to incorporate "custom nodes" into our product line. In this endeavour, we'll offer official support for selected popular nodes while also enabling the community to provide commercial nodes via FlowFuse. While maintaining an open-source core remains a priority, we believe that offering premium extensions and commercial support can encourage community participation in FlowFuse's success.

This integration strategy includes communication protocols, APIs, and application adapters. These elements will not only meet the data and process integration needs but also address enterprise application and IIoT ecosystem integration requirements across cloud and on-premises implementations, providing a comprehensive solution.

### Data Visualization & Analytics

FlowFuse's commitment to a low-programming approach via Node-RED, complemented by Node-RED Dashboard, allows for advanced data management and analytical functions. The Node-RED Dashboard provides a crucial interactive graphical user interface for Node-RED applications, allowing users to see data in a more visually engaging and understandable format. By processing and visualization of data, we will deliver insights into asset state, track patterns, and optimize asset use.

### User-Friendly Low-Code Approach

FlowFuse is built upon the strength of Node-RED's user-friendly, low-code approach, positioning us well within the IIoT market. We believe Node-RED provides the best foundation, but we're committed to not only utilizing its existing capabilities but also contributing to its upstream improvement. By refining Node-RED and adding enhancements, we aim to create an even more intuitive, powerful, and accessible platform. This will enable end-users to swiftly and intuitively build applications and reducing the dependency on expert programmers.

----


## Principles

Embedded within our strategy are the principles that guide our decision-making and product evolution, representing our commitment to providing a user-centered platform that seamlessly merges the virtues of open-source development with enterprise-grade functionality.

### Convention over configuration

We want the default configuration of FlowFuse to be the best user experience for
the majority of users. 

Every new option we add to the platform, whether for an administrator or end-user,
represents another choice they have to deal with. This increases the cognitive burden
of using the platform and can have a negative impact on user experience. It also
increases the engineering cost to develop and test features where there are many
possible combinations to consider.

For every feature we add that has some scope for configuration, our starting point
in the design is to **identify the right configuration and hard-code it in**.

This removes the choice from users' hands and minds. It does not prevent us from
choosing to make it more configurable in the future if user-feedback/business-needs
requires it.

Where there is a strong case to expose an option to the end user, it should still
be provided with a sensible default value where possible that removes the need
for the user to set it themselves. This gives users the ability to customise
the option if/when they are ready to. But the default value should be the right
answer for most users.

Some configuration options cannot be defaulted - the user has to do make a choice.
For example, setting up email on the platform. The UX around these options must
be carefully considered to help the user get to the right choice with a minimum
of effort.

Node-RED provides a lot of configuration options. We should not assume they are all
candidates to be exposed to FlowFuse users. For example, options to customise the
editor appearance should be reserved options that we determine the right values for
to ensure a consistent user experience across FlowFuse instances.

Options that have an impact on the behaviour of flows will need to be considered
on a case-by-case basis. But the starting point should always be to pick the right
default and only expose to the user if absolutely necessary.

See also: [Convention over Configuration on Wikipedia](https://en.wikipedia.org/wiki/Convention_over_configuration).

### Open Source & Enterprise

We offer a number of ways that users can run the FlowFuse product, we will
always offer an open source version that has the core features. Features that
offer higher business value or permit users to share across larger groups will
be offered as part of our paid propositions. FlowFuse Cloud is public and will
generally include all open-source features that are available but may not offer
certain features such as SSO where integration is required between the platform
and an enterprise. We offer customers the ability to have a dedicated managed
instance if that is a deployment model they require.
A more detailed breakdown of the pricing and split between our Open Source and
Enterprise Editions is on the [pricing principles](pricing.md) page.
