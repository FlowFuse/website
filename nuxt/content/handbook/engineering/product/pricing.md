---
title: "Pricing Principles"
---

# Pricing Principles

This page sets out the concepts that we license and what units are measured across both FlowFuse Cloud  and Self-managed. Commercial decisions outside the scope of this document.

FlowFuse is available as an unlicensed open-source edition (always self-managed), a FlowFuse Cloud trial, and a licensed Enterprise edition (self-managed or FlowFuse-managed). The value and features provided correspond to the specific [persona](./personas/), acknowledging that a higher placement in the organizational chart typically implies different requirements.

## Buyer-Based Open Core (BBOC) Principle

The [Buyer-Based Open Core (BBOC)](https://opencoreventures.com/blog/2023-01-open-core-standard-pricing-model/) principle is a fundamental guideline in our product
development and monetization strategy. It's a framework we employ to discern which features should be open source and which should be proprietary. 
BBOC aligns features into tiers based on their target users or 'buyers': individual contributors, management, or executives.

Features that are most beneficial to individual contributors, such as PLC engineers and line workers, sit lower in our packaging. Features that have broader organizational relevance, like Edge Connectivity or high availability, are offered in higher, licensed editions targeted towards IIoT managers and plant managers who need to manage multiple Node-RED instances.

This buyer-based approach helps us focus our efforts on the value to the end-user, rather than technical specifications or development effort. It aligns our pricing strategy with the value each tier provides, ensuring that the cost is justified by the capabilities offered and the user persona it serves.

## Value Layers

| Tier | Objective | Problem it Solves | Persona |
| ---- | --------- | ----------------- | ------- |
| Enterprise | Establish Node-RED as enterprise-wide standard with mission-critical capabilities | <ul><li>Enterprise-grade reliability and high availability</li><li>Compliance and comprehensive audit trails</li><li>Integration with corporate systems and SSO</li><li>Advanced monitoring and observability</li><li>Custom branding and dedicated support</li></ul> | <ul><li>Central IT departments</li><li>Plant manager</li></ul> |

## Tier Descriptions

### Enterprise Tier

The **Enterprise** tier, built on Node-RED, is a comprehensive industrial application-building platform that sets a company-wide standard with enterprise-grade features for high availability, compliance, and integration.

**Purpose**: Enable central IT departments and enterprise organizations to deploy full-stack industrial applications using Node-RED at scale with the reliability, security, and integration capabilities required for mission-critical purposes.

**Key Capabilities**:
- Unlimited hosted Node-RED instances (20+ included)
- High availability and disaster recovery features
- Comprehensive audit logging and compliance reporting
- Database feature
- Enterprise integration with SSO, LDAP, and corporate systems
- Advanced monitoring and observability tools
- Custom domains and white-label options
- Dedicated support with SLA guarantees
- Professional services and custom development options

This tier transforms Node-RED into an enterprise-ready platform that meets the stringent requirements of large organizations, enabling them to standardize on FlowFuse for industrial automation, data integration, and digital transformation initiatives across their entire operation.

## Teams

Teams are the basic unit within FlowFuse Cloud and the entity to which bills are charged.
A team can create zero or more applications, and one or more user can be members.
Subject to access controls, some users can add cloud instances and remote devices (agents)
to applications, and invite other members.

The number of teams for the open source offering of FlowFuse is limited to 50.

## Applications

A project has one or more Node-RED instance associated with it. The team is billed
based on the number of Node-RED instances consuming resources inside applications.

## Cloud instances

On the FlowFuse Cloud, different levels of pricing is offered based on the CPU and memory
resources that the instance has available. The price point is defined
by the instance type which allows for an abstraction of stacks and billing. Additional
features may also be defined by the instance type, for example: Custom Domains support.

Self-managed FlowFuse installs are licensed based on the number of Node-RED instances, regardless of
available resources for each. Open source installs are limited to 50 instances per
FlowFuse installation, and some features for instances aren't available, for example Persistent Context.

## Devices

Devices are owned by the team and are charged for when they are created
regardless of if they are assigned to a project or their connection state.
The team is billed per device at the same rate regardless of tier or number of devices.

Devices are part of the licensed instances.

## Licenses

From the perspective of licensing the there's an unlicensed edition: open-source. This version is always self-managed. There's also a licensed version of FlowFuse, this can be self-managed or FlowFuse Managed.
The open source edition doesn't require a license key to be uploaded. Without a valid license a basic set of features and
quantity of instances(5), users(5), teams(5), and devices(5) are available.
When a license is purchased it provides all of the functionality of the higher
plans. It's then licensed for a number of Node-RED instances on an annual basis.

