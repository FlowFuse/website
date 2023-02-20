---
navTitle: Pricing Principles
---

# Pricing Principles

This page sets out the concepts that we sell and how those are measured across both SaaS and Licensed Editions of the platform.
This does not define specific dollar amounts for any items, those are commercial decisions outside the scope of this document.

## Teams

Teams are the basic unit within FlowForge and the entity to which bills are charged.
A teams can own zero or more projects, and 1 or more user can be members. Subject
to access controls, some users can create projects, add devices (agents), and invite
other members.

The number of teams for the open source offering of FlowForge is limited to 50.

## Projects

A project has one or more Node-RED instance associated with it. The team is billed
based on the number of Node-RED instances consuming resources.

On the FlowForge Cloud, different levels of pricing is offered based on the
resources that the instance has available (CPU/Mem). The price point is defined
by the instance type which allows for an abstraction of stacks and billing. Additional
features may also be defined by the instance type, for example: Custom Domains support.

Self-managed FlowForge installs are licensed based on the number of Node-RED instances, regardless of
available resources for each. Open source installs are limited to 50 projects per
instance, and some features for a project aren't available, for example Persistent Context.

## Devices

Devices are owned by the team and are charged for when they are created
regardless of if they are assigned to a project or their connection state.
The team is billed per device at the same rate regardless of tier or number of devices.

Devices are part of the licensed instances. The limit in the open source edition is 50 devices.

## Add-Ons

There's currently no plan for add-ons. Add-ons might be used in the future to
allow overage on resource consumption, for example when storing files.
Where possible add-ons should be avoided in favor of additional features.

## Licenses

From the perspective of licensing the open source and FlowForge Premium are
different tiers of the same product. The open source edition doesn't require a
license key to be uploaded. Without a valid license a basic set of features and
quantity of projects(50), users(150), teams(50), and devices(50) are available.
When a license is purchased it provides all of the functionality of the higher
plans. It's then licensed for a number of Node-RED instances on an annual basis.
