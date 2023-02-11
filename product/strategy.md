---
navTitle: Strategy
---

# Product Strategy

Our strategy is an indication and statement of intent for the next 2 years, and reflects FlowForge’s vision. It’s a draft, as everything in the handbook is a draft, so we will revisit regularly and iterate when there is a reason to do so. FlowForge is a 100 percent agile company, so our product is; timing is everything. Have a look at our roadmap for what we're pursuing in the upcoming releases. 

### FlowForge for enterprise

The cornerstone of FlowForge is to make Node-RED more accessible to enterprises. Therefore, we are constantly implementing requirements that support the easy use of Node-RED in productive environments. We will focus on:

1. High availability & Scalability

2. State-of-the-art built-in security e.g. VPN support

3. DevOps
   
   1. Change control
   
   2. Collaborative Development
   
   3. Pipelines (e.g. staging)

### Node-RED at edge

Many organizations position Node-RED instances on remote servers, edge or industrial devices, to meet network, infrastructure, or use case requirements. Therefore, management of remote instances is crucial for the overall success of closing the gap between IT and OT. 

FlowForge already supports this process by creating snapshots on Node-RED instances that can be deployed to multiple remote targets. We will continue to expand the functionalities to allow users to manage existing Node-RED instances, improve their development practices to accelerate development and ensure a reliable and repeatable process, providing more flexible remote deployment options and offering the best support for devices in closed and segmented networks as we are facing it in productive environments.

### Certified nodes marketplace

The "Node-RED Library" offers a unique added value to many Node-RED and FlowForge users. It is already possible today to easily create technical implementations out of the box for several OT and IT protocols, thanks to the community and Node-RED library. 

The logical consequence of FlowForge’s journey is to also include “custom nodes” as one element of the product. Therefore, FlowForge will offer official support for certain popular nodes and in addition enable the community to offer commercial “nodes” via FlowForge. Nevertheless, an open-source core is always required and wanted. However, premium extensions and commercial support allow the community to participate in the success of FlowForge.

### IIoT use case library

Today, a whole range of use cases can be implemented with Node-RED. From KPI calculations to intralogistics solutions, incredible use cases are already being realized in Node-RED. 

To make it easy for FlowForge users in particular to get started and address their specific need, a use case library is to be created (based on the "Node-RED Library"), which offers standard templates for specific IT and OT related use cases. This way, we as FlowForge address direct added values in production, for example:

1. Overall Equipment Effectiveness (OEE) calculation and visualization

2. ANDON for Node-RED

3. Process monitoring for tightening equipment

4. Predictive maintenance analysis

5. Reliable feedback loops between IT and OT

.......

## Principles

#### Convention over configuration

We want the default configuration of FlowForge to be the best user experience for
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
candidates to be exposed to FlowForge users. For example, options to customise the
editor appearance should be reserved options that we determine the right values for
to ensure a consistent user experience across FlowForge instances.

Options that have an impact on the behaviour of flows will need to be considered
on a case-by-case basis. But the starting point should always be to pick the right
default and only expose to the user if absolutely necessary.

See also: [Convention over Configuration on Wikipedia](https://en.wikipedia.org/wiki/Convention_over_configuration).

## Open Source & Enterprise

We offer a number of ways that users can run the FlowForge product, we will
always offer an open source version that has the core features. Features that
offer higher business value or permit users to share across larger groups will
be offered as part of our paid enterprise proposition. Our managed FlowForge
offering is public and will generally include all features that are availble
but may not offer certain features such as SSO where integration is required
between the platform and an enterprise. We will offer customers the ability to
have a dedicated managed instance if thats is a deployment model they require.
A more detailed breakdown of the pricing and split between our Open Source and
Enterprise Editions is on the [pricing principles](pricing.md) page.
