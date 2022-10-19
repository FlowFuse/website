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

Customers' Node-RED instance will remain running, though any features that depend on FlowForge will not operate as expected. This includes user sessions, project and team management, as well as the project nodes for inter-project communication.

Self hosted instalations are uneffected by this change.

## When

The plan is to carry out this work at 26 October 2022 at 22:00 UTC and the work should be complete in 2hr with the system being restored earlier if all is well.