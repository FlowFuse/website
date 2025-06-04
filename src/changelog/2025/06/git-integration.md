---
title: Pulling snapshots from Git with Pipelines
description: "Adding git pull support to DevOps Pipelines"
date: 2025-06-02 12:00:00.0  
authors: ["nick-oleary"]
tags:
  - changelog
---

We released support for [pushing snapshots to a Git repository](/changelog/2025/04/git-integration/) as part of the DevOps Pipelines feature last month. As promised, we've now added the ability to pull snapshots back from the repository.

This unlocks a number of powerful workflows with the Pipelines.

**Review-based Pipelines**

The Git Pipeline stage can be configured to push and pull from different branches of the Git Repostory. By making use of a GitHub Pull Request, you can create a workflow where the snapshot is reviewed and merged before the pipeline can deploy the snapshot to the later stages.

**Deploying snapshots across Teams**

By using an external Git Repository, it is simple to create a workflow that enables moving snapshots between two different Teams on the platform whilst maintaining the security and auditability of the individual Teams.


This feature is available today for Enterprise tier teams on FlowFuse Cloud and will be available for self-hosted Enterprise customers as part of the 2.18 release later this week.

We still only support GitHub.com hosted repositories, but we're looking at support for Azure hosted repos in the near future.

![Screenshot of a Git Pipeline Stage](../04/images/git-pipeline-stage.png){data-zoomable}
_Screenshot of a Git Pipeline Stage_
