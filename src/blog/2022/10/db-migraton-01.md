---
title: Planned Database Migration
subtitle: Moving to encrypted storage
description: Details on upcoming maintenance period
date: 2022-10-13
authors: ["ben-hardill"]
---

# Planned Database Migration

As part of an on going security [review](https://flowforge.com/product/security/#data-at-rest) of the FlowForge Managed offering we discovered that the backend database was not using encrypted storage. In keeping with industry best practices we plan to migrate the database to a new instance using encrypted at rest storage.

## Impact

To do this cleanly we are going to need to schdule a short period of downtime for the core FlowForge application. During this downtime the following functions will not be available

- Creating/deleting FlowForge Projects
- Creating/deleting FlowForge Users
- Deploying changes to flows running in Projects

Existing FlowForge Projects will continue to run as normal during the downtime.

## When

The plan is to carry out this work at XX October 2022 at XX:XX UTC and the work should be complete in 2hr with the system being restored earlier if all is well.