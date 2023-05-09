---
navTitle: Pricing Principles
---

# Pricing Principles

This page sets out the concepts that we sell and how those are measured across both SaaS and Licensed Editions of the platform. This does not define specific dollar amounts for any items, those are commercial decisions outside the scope of this document.

We have three primary tiers: Starter (Open-Source when self-managed), Premium, and Enterprise. The value and features provided within each tier correspond to the specific [persona](./personas/index.md), acknowledging that a higher placement in the organisational chart typically implies different requirements.

## Layers

| Tier                  | Objective                                         | Problem it Solves                                               | Persona                                        |
| --------------------- | ------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| Open-Source (Starter) | Introduce Node-RED                                | - Hosting Node-RED<br> - TLS/SSL<br> - Subdomain<br> - Backups (snapshots) | - Individual contributor<br> - PLC engineer<br> - Line worker |
| Premium               | Scale the roll-out of Node-RED                    | - Managing more than 5 Node-RED instances<br> - Security<br> - Effective collaboration  | - IIoT manager<br> - Plant manager            |
| Enterprise            | Node-RED as a company standrad                    | - Auditability<br> - Enterprise intergration                | - Central IT departments<br> - (Plant manager) |


## Teams

Teams are the basic unit within FlowForge Cloud and the entity to which bills are charged.
A teams can create zero or more applications, and 1 or more user can be members.
Subject to access controls, some users can add cloud instances and remote devices (agents)
to applications, and invite other members.

The number of teams for the open source offering of FlowForge is limited to 50.

## Applications

A project has one or more Node-RED instance associated with it. The team is billed
based on the number of Node-RED instances consuming resources inside applications.

## Cloud instances

On the FlowForge Cloud, different levels of pricing is offered based on the
resources that the instance has available (CPU/Mem). The price point is defined
by the instance type which allows for an abstraction of stacks and billing. Additional
features may also be defined by the instance type, for example: Custom Domains support.

Self-managed FlowForge installs are licensed based on the number of Node-RED instances, regardless of
available resources for each. Open source installs are limited to 50 instances per
FlowForge installation, and some features for instances aren't available, for example Persistent Context.

## Devices

Devices are owned by the team and are charged for when they are created
regardless of if they are assigned to a project or their connection state.
The team is billed per device at the same rate regardless of tier or number of devices.

Devices are part of the licensed instances. The limit in the open source edition is 50 devices.

## Licenses

From the perspective of licensing the open source and FlowForge Premium, and FlowForge Enterprise are different tiers of the same product.
The open source edition doesn't require a license key to be uploaded. Without a valid license a basic set of features and
quantity of instances(50), users(150), teams(50), and devices(50) are available.
When a license is purchased it provides all of the functionality of the higher
plans. It's then licensed for a number of Node-RED instances on an annual basis.
