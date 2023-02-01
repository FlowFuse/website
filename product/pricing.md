---
navTitle: Pricing Principles
---

# Pricing Principles

This page sets out the concepts that we sell and how those are measured across both SaaS and Licensed Editions of the platform.
This does not define specific dollar amounts for any items, those are commercial decisions outside the scope of this document.

## Teams

Teams are the basic unit within FlowForge and the entity to which bills are charged.
A teams can own zero or more projects, and 1 ore more user can be members. Subject
to access controls, some users can create projects, add devices (agents), and invite
other members.

The number of teams for the open source offering of FlowForge is limited to 50.

## Projects

These are the primary units which customers pay for. On the FlowForge managed instances,
different levels of pricing can be offered based on the resources that the project has available (CPU/Mem).
The price point is defined by the Project Type which allows for an abstraction of stacks and billing.
Additional features may also be defined by the project type such as Custom Domains or Persistent Context. 
The EE License will be for a defined number of Projects but will not place any restrictions on the resources that can be assigned to a project.
The CE License will allow 50 projects however certain project features like persistent context or custom domains will not be available to CE projects.

## Devices
Devices are owned by the team and are charged for when they are created regardless of if they are assigned to a project or their connection state.
The team is billed per device at the same rate regardless of tier or number of devices.
A team plan may include a number of free devices.
The EE License will be for a defined number of devices on the platform regardless of teams.
The CE license will allow 50 devices.

## Add-Ons

Add-ons are services that could potentially be obtained outside the FlowForge platform from another provider but the customer gets value from buying it as part of FlowForge due to the nature of a single bill and ease of integration for things like credentials.
They are billed against the team and the resource can then be made available to either the whole team or a single project. Some add-ons may have a quantity of more than 1.
Where possible add-ons should be avoided in favor of additional features on teams or projects.

## Licenses
From the perspective of licensing CE/EE are just different tiers of the same
product, the CE edition is simply an install that does not have a license key
provided and as such gets a basic set of features and quantity of projects(50),
users(150), teams(50) and devices(50). When a license is purchased it provides
all of the functionality of the higher team plans. It's then licensed for a 
number of projects, teams, users and devices on an annual basis.
If a customer attempts to exceed their licensed amounts they are prevented from creating the resource until the license is upgraded.
There may be features in the licensed versions that are not offered on FlowForge Managed services.


## Summary Table
_this feature list is not exhaustive_

| Feature                     | FlowForge Managed                             | Licensed                                                |
|-----------------------------|-----------------------------------------------|---------------------------------------------------------|
| Projects                    | Tiered Project types<br>Charged per project   | CE - 50<br>EE - Total on platform                       |
| Teams                       | Tiered Team Plans,<br>Charged per member      | CE - 50 (3 members per team)<br>EE - Total on platform  |
| Devices                     | Charged per device created                    | CE - 50<br>EE - Total on platform                       |
| Users                       | N/A                                           | CE - 150<br>EE - Total on platform                      |
| System Templates            | Included                                      | Included                                                |
| Personal Access Tokens      | Included                                      | Included                                                |
| Duplicate Projects          | Included                                      | Included                                                |
| Custom Node Catalog         | Included                                      | EE                                                      |
| Team Templates              | Depending on Team Plan                        | EE                                                      |
| Team Libraries              | Depending on Team Plan                        | EE                                                      |
| Version Control of Flows    | Depending on Team Plan                        | EE                                                      |
| Concurrent Editing          | Depending on Team Plan                        | EE                                                      |
| Persistent Context          | Depending on Project Type                     | EE                                                      |
| Custom project domain       | Depending on Project Type                     | EE                                                      |
| Persistent Storage          | Project Type/Add On                           | EE (BYO Storage)                                        |
| MQTT User data              | Team Plan/Add On                              | EE                                                      |
| Billing                     | N/A                                           | EE                                                      |
| Enterprise SSO              | N/A                                           | EE                                                      |
