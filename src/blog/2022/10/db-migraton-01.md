---
title: "Scheduled maintenance: Database encryption October 2022"
subtitle: Moving to encrypted PostgreSQL storage
description: Details on upcoming maintenance period
date: 2022-10-18
authors: ["ben-hardill"]
---

# Scheduled maintenance: Database encryption October 2022

As part of an on going security [review](https://flowforge.com/product/security/#data-at-rest) of the FlowForge Managed offering we discovered that the backend database was not using encrypted storage. In keeping with industry best practices we plan to migrate the database to a new instance using encrypted at rest storage.

## Impact

Customers' Node-RED instances will remain running, though any features that depend on FlowForge will not operate as expected during the migration. This includes user sessions, project and team management, as well as the project nodes for inter-project communication.

Self-hosted installations are unaffected by this change.

## When

The migration will be on 26 October 2022 at 22:00 UTC and is expected to take under 2 hours. The platform will be available as soon as the migration is complete.

We will post updates during the migration period to our Twitter account [https://twitter.com/flowforgeinc](@FlowForgeInc).

