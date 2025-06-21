---
navTitle: Pricing Principles
---

# Pricing Principles

This page sets out the concepts that we license and what units are measured across both FlowFuse Cloud and Self-hosted. Commercial decisions outside the scope of this document.

We have three primary tiers: Starter (Open-Source when self-managed), Team, and Enterprise. The value and features provided within each tier correspond to the specific [persona](./personas/), acknowledging that a higher placement in the organizational chart typically implies different requirements.

## Buyer-Based Open Core (BBOC) Principle

The [Buyer-Based Open Core (BBOC)](https://opencoreventures.com/blog/2023-01-open-core-standard-pricing-model/) principle is a fundamental guideline in our product
development and monetization strategy. It's a framework we employ to discern which features should be open source and which should be proprietary. 
BBOC aligns features into tiers based on their target users or 'buyers' — individual contributors, management, or executives.

Features that are most beneficial to individual contributors, such as PLC engineers and line workers, fall within our Starter tier. On the other hand, features that have broader organizational relevance, like Edge Device Management or high availability, are offered in our Team tier or Enterprise tiers, targeted towards IIoT managers and plant managers who need to manage multiple Node-RED instances.

This buyer-based approach helps us focus our efforts on the value to the end-user, rather than technical specifications or development effort. It aligns our pricing strategy with the value each tier provides, ensuring that the cost is justified by the capabilities offered and the user persona it serves.

## Value Layers

| Tier | Objective | Problem it Solves | Persona |
| ---- | --------- | ----------------- | ------- |
| Starter | Introduce Node-RED | <ul><li>Hosting Node-RED</li><li>TLS/SSL</li><li>Subdomain</li><li>Backups (snapshots)</li><ul> | <ul><li>Individual contributor</li><li>PLC engineer</li><li>Line worker</li></ul> |
| Premium | Scale the roll-out of Node-RED | <ul><li>Managing 5 or more Node-RED instances</li><li>Edge Device Management</li><li>Security</li><li>Effective collaboration</li></ul> | <ul><li>IIoT manager</li><li>Plant manager</li></ul> |
| Enterprise | Node-RED as a company standard | <ul><li>High availability</li><li>Auditability</li><li>Enterprise intergration</li></ul> | <ul><li>Central IT departments</li><li>Plant manager</li></ul> |

## Teams

Teams are the basic unit within FlowFuse Cloud and the entity to which bills are charged.
A teams can create zero or more applications, and one or more user can be members.
Subject to access controls, some users can add cloud instances and remote devices (agents)
to applications, and invite other members.

The number of teams for the open source offering of FlowFuse is limited to 50.

## Applications

A project has one or more Node-RED instance associated with it. The team is billed
based on the number of Node-RED instances consuming resources inside applications.

## Cloud instances

On the FlowFuse Cloud, different levels of pricing is offered based on the
resources that the instance has available (CPU/Mem). The price point is defined
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

From the perspective of licensing the there's an unlicensed edition: open-source. This version is always self-managed. There's also a licensed version of FlowFuse, this can be self-managed or FlowFuse Managed. For FlowFuse managed properties there's 3 tiers; Starter, Team, and Enterprise.
The open source edition doesn't require a license key to be uploaded. Without a valid license a basic set of features and
quantity of instances(5), users(5), teams(5), and devices(5) are available.
When a license is purchased it provides all of the functionality of the higher
plans. It's then licensed for a number of Node-RED instances on an annual basis.

