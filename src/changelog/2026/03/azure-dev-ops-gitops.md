---
title: Azure DevOps Pipeline support
description: DevOps Pipeline Git Stages now support Azure DevOps repositories alongside GitHub
date: 2026-03-24 17:00:00
authors: ['ben-hardill']
tags:
 - changelog
issues:
 - https://github.com/FlowFuse/flowfuse/issues/5491
---

[DevOps Pipeline](https://flowfuse.com/docs/user/devops-pipelines) Git Stages can now make use of Azure DevOps Git repositories in addition to GitHub.

This means you can both push and pull Snapshots to and from an Azure DevOps repository as part of a Pipeline.

Add Personal Access Tokens under Team Settings → Integrations

![Dialog to create a new Azure DevOps Token](./images/azure-token.png)
_The Azure DevOps token dialog under Team Settings → Integrations_

Pro and Enterprise customers on FlowFuse Cloud and Enterprise licensed Self Hosted users can use Azure DevOps repositories in their Pipelines from v2.29.
