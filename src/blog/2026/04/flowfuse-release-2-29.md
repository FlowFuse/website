---
title: "FlowFuse 2.29: Azure DevOps Git Integration and Expert for Self-Hosted Enterprise"
subtitle: "Azure DevOps Git support and FlowFuse Expert now reach your self-hosted enterprise environment."
description: "FlowFuse 2.29 adds Azure DevOps as a supported Git provider and brings FlowFuse Expert to self-hosted enterprise customers."
date: 2026-04-09
authors: ["dimitrie-hoekstra"]
image: /blog/2026/04/images/flowfuse-release-2-29.png
tags:
   - flowfuse
   - news
   - releases
release: "2.29"
features:
   - id: git-integration-azure
     heading: "Azure DevOps Git Integration"
   - id: ff-expert
     heading: "FlowFuse Expert for Self-Hosted Enterprise"
   - heading: "What else is new?"
---

<!--
  STATUS: WIP — needs refinement
  - [ ] Screenshots / video for Azure DevOps pipeline setup
  - [ ] Screenshot for Expert on self-hosted
  - [ ] Blog post hero image (art request)
  - [ ] Final copy review
-->

FlowFuse 2.29 brings two capabilities that our enterprise users have been asking for: Azure DevOps as a supported Git provider in DevOps Pipelines, and FlowFuse Expert for self-hosted enterprise deployments.

<!--more-->

## Azure DevOps Git Integration {#azure-devops}

Until now, FlowFuse's Git integration only supported GitHub repositories. That left teams using Azure DevOps without a native way to include their Node-RED flows in their existing version control workflows.

FlowFuse 2.29 adds Azure DevOps as a supported Git provider. You can now push and pull snapshots from Azure DevOps repositories — the same way you could with GitHub.

<!-- TODO: screenshot of Azure DevOps pipeline setup -->

- **Connect Azure DevOps repos** alongside or instead of GitHub
- **Push and pull snapshots** directly from your Azure DevOps repositories
- **Use Azure Personal Access Tokens** for authentication — configured under Team Settings → Integrations

If your organisation standardises on Azure DevOps for version control, your Node-RED flows can now be part of that workflow.

## FlowFuse Expert for Self-Hosted Enterprise {#expert-self-hosted}

FlowFuse Expert — the AI-powered assistant that helps you troubleshoot flows, get contextual guidance while building, and point at specific debug logs or nodes for targeted help — can now be enabled for self-hosted enterprise deployments.

<!-- TODO: screenshot or diagram showing self-hosted Expert in use -->

To get Expert enabled on your self-hosted environment, reach out to your customer success representative.

## What else is new?

- **Node-RED 4.1.8** — FlowFuse now ships with Node-RED 4.1.8, which adds function node tab badges (see which tabs contain code at a glance), theme plugin overrides for settings and menu options, configurable palette categories via theme plugins, and show-first/last-tab keyboard actions.
- **Expert opens by default** — FlowFuse Expert now opens automatically when you visit the editor for the first time. If you close it, that preference is remembered across browser sessions.
- **MCP server discoverability fix** — Older MCP servers that were registered on your instances were not showing up in Expert Insights mode. All registered MCP servers are now discoverable again.
- **Embedded editor tab titles** — Hosted and Remote Instance editor tabs now show the actual Node-RED flow name rather than a generic title.
- **Blueprint markdown rendering** — Blueprint descriptions now support markdown rendering, so formatting like headers and lists display as intended.
- **SSO team role management** — Team roles for SSO-managed users can now be changed directly in FlowFuse, resolving a limitation where SSO-enabled users' roles were locked.

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.29, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.29) to us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
