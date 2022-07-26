# Product Plan

## Background

Our [Company Strategy](../company/strategy.md) sets out 4 pillars that our product work is focussed around

## Principles

#### Convention over configuration

Default to picking sensible defaults to standardize the experience for customers and
users. This enables everyone to get the most out of FlowForge. FlowForge.com
should always run the default configuration if possible to ensure the best
experience across the board.

See also: [Convention over Configuration on Wikipedia](https://en.wikipedia.org/wiki/Convention_over_configuration).

## 2022 

Until the end of 2022 we will focus on the following:

In order to **provide the best Node-RED experience**;
- We will continue to expose the most useful configuration options for Node-RED meaning that people can use Node-RED on FlowForge in more use-cases
- Custom Domains for projects will also improve the Node-RED experience allowing users to publish their applications to the web with their own identity.
- Persistent context will alow users to build flows with better confidence in the integrity of their data.
- Additional service like Message Brokers and Persistent Storage will provide additional utility and value to the platform while providing the opportunity to increase revenue through add-ons
- We will work to identify a sustainable solution for building interfaces as part of FlowForge, either through the Node-RED Dashboard and its successor or via another service.

In order to **Enable Users to Run Node-RED at the Edge**;
- Introduce the concept of Devices to the platform allowing users to manage their edge installs
- Create an Edge Agent reference install for the Raspberry Pi which allows user hardware to be managed by the FlowForge platform and run a project.
- Work to rollout that Edge Agent to other devices such as PLCs either via our own development or through partnerships with hardware manufacturers.
- Provide functionality to allow for debugging of flows running on edge devices
- Enable users to manage and deploy flows to multiple edge devices
- Allow edge devices to communicate with both the cloud and other devices.

Features that **Enable teams to collaborate when working with Node-RED**; 

- Duplicating Projects allow teams to have dev and prod projects and to move flows between them
- Team level templates allow teams to create baseline projects that can be reused.
- Team Libraries provide a way for teams to share and reuse parts of flows
- Version control of flows gives teams the ability to track changes.

We will build the following to **Meet the compliance needs of the enterprise**;
- Integration with at least one major enterprise SSO platform eg Okta, Active Directory etc.
- Full Audit logging of events
- User lifecycle management, delete, suspend etc.
- Customizable password policies
- Secure storage of secrets in environment variables
- Custom Node Catalogs
- Comprehensive platform monitoring and reporting.

## Open Source & Enterprise

We offer a number of ways that users can run the FlowForge product, we will always offer an open source version that has the core features. Features that offer higher business value or permit users to share across larger groups will be offered as part of our paid enterprise proposition.
FlowForge Cloud is our hosted public cloud offering, this will generally include all features that are availble but may not offer certain features such as SSO where integration is required between the platform and an enterprise. We will offer customers the ability to have a dedicated cloud instance managed by us if thats is a deployment model they require.
A more detailed breakdown of the pricing and split between our Open Source and Enterprise Editions is on the [pricing principles](pricing.md) page
