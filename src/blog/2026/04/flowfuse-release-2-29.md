---
title: "FlowFuse 2.29: Azure DevOps, Clearer Snapshot Diffs, and Self-Hosted Expert"
subtitle: "Azure DevOps Git support, clearer snapshot comparisons, and FlowFuse Expert for self-hosted enterprise customers."
description: "FlowFuse 2.29 adds Azure DevOps as a supported Git provider, makes snapshot comparisons clearer with property-level diffs, and brings FlowFuse Expert to self-hosted enterprise customers."
date: 2026-04-09
authors: ["dimitrie-hoekstra"]
image: /blog/2026/04/images/flowfuse-release-2-29-placeholder.png
tags:
   - flowfuse
   - news
   - releases
release: "2.29"
features:
   - id: git-integration-azure
     heading: "Azure DevOps Git Integration"
   - heading: "See Exactly What Changed in a Node-RED Instance Snapshot"
   - id: ff-expert
     heading: "FlowFuse Expert"
   - heading: "What else is new?"
---

<!--
  STATUS: WIP, needs refinement
  - [ ] Screenshots / video for Azure DevOps pipeline setup
  - [ ] Screenshot for Expert on self-hosted
  - [ ] Blog post hero image (art request)
  - [ ] Final copy review
-->

FlowFuse 2.29 brings three capabilities that our enterprise users have been asking for: Azure DevOps as a supported Git provider in DevOps Pipelines, clearer snapshot comparisons that show exactly what changed, and FlowFuse Expert for self-hosted enterprise FlowFuse instances.

<!--more-->

## Azure DevOps Git Integration {#azure-devops}

Until now, FlowFuse's Git integration only supported GitHub repositories. That left teams using Azure DevOps without a native way to include their Node-RED flows in their existing version control workflows.

FlowFuse 2.29 adds Azure DevOps as a supported Git provider. You can now push and pull snapshots from Azure DevOps repositories, the same way you could with GitHub.


- **Connect Azure DevOps repos** alongside or instead of GitHub
- **Push and pull snapshots** directly from your Azure DevOps repositories
- **Use Azure Personal Access Tokens** for authentication, configured under Team Settings → Integrations

If your organisation standardises on Azure DevOps for version control, your Node-RED flows can now be part of that workflow.

<!-- Changelog auto-injects from featureCatalog (git-integration-azure → /changelog/2026/03/azure-dev-ops-gitops). No manual placeholder needed. -->

## See Exactly What Changed in a Node-RED Instance Snapshot {#snapshot-diff}

FlowFuse lets you take snapshots of your Node-RED instances, capturing the full set of flows at a point in time so you can roll back, promote between environments, or compare two versions. The snapshot comparison view already showed flows side by side, but the visual alone doesn't always tell the whole story. You could see that a node was different, but not which specific properties changed. When a function node's code changed, you couldn't tell which lines were different without manually diffing two code blocks.

![Placeholder for snapshot diff demo](https://placehold.co/900x500/e5e7eb/6b7280?text=Snapshot+diff+sidebar+placeholder){data-zoomable style="border: 2px solid #E5E7EB;"}
<figcaption>Placeholder, replace with GIF demonstrating the new snapshot diff sidebar</figcaption>

With 2.29, the compare dialog adds a property-level diff sidebar that shows exactly what changed: structural properties old to new at a glance, and git-style line diffs for function code, template HTML, and JSON. A navigation bar steps through every changed, added, or deleted node with arrow key shortcuts, and the canvas highlights and scrolls to the current node as you navigate. Whether you're reviewing what changed between dev and production, validating a teammate's update, or debugging why a flow broke after a deploy, you can now see exactly what changed without leaving FlowFuse.

<!-- TODO: replace placeholder with real GIF showing the snapshot diff sidebar -->

<!-- TODO: changelog entry for snapshot diff sidebar (FlowFuse/flowfuse#7025, PR #7026) -->
<div class="ff-related-changelogs">Changelog: <em>TBD, link will be added once entry is published</em></div>

## FlowFuse Expert {#expert}

*FlowFuse Expert is our integrated AI assistant. One consistent surface across the FlowFuse website, platform, and immersive Node-RED editor for troubleshooting, building, and getting targeted help.*

### Available for Self-Hosted Enterprise {#expert-self-hosted}

FlowFuse Expert is now available for self-hosted enterprise FlowFuse instances, giving your team the same troubleshooting, contextual guidance, and targeted help as cloud customers, all while keeping your operational data on your own infrastructure.

[Contact us](/contact-us/?subject=FlowFuse%20Expert%20for%20Self-Hosted) to enable Expert on your self-hosted environment.

<!-- TODO: changelog entry for Expert on self-hosted enterprise -->
<div class="ff-related-changelogs">Changelog: <em>TBD, link will be added once entry is published</em></div>

### Take action directly from Expert responses {#expert-actions}

Expert responses can now include clickable action links. Click one and Expert performs the action directly in your editor: opening a new flow tab, selecting the nodes it just mentioned, or importing a flow from the conversation. Less copy-paste, faster iteration, and the first step toward Expert acting as a true agent in your editor.

![Placeholder for Expert action links demo](https://placehold.co/900x500/e5e7eb/6b7280?text=Expert+action+links+demo+placeholder){data-zoomable style="border: 2px solid #E5E7EB;"}
<figcaption>Placeholder, replace with GIF demonstrating Expert action links</figcaption>

<!-- TODO: replace placeholder with real GIF showing action links in Expert responses -->

**Coming next:** spinning up Node-RED instances directly from Expert, letting you go from idea to running flow without leaving the chat.

<!-- TODO: changelog entry for Expert action links (FlowFuse/nr-assistant#184, #192, FlowFuse/flowfuse#6864) -->
<div class="ff-related-changelogs">Changelog: <em>TBD, link will be added once entry is published</em></div>

## What else is new?

- **Expert opens by default**: FlowFuse Expert now opens automatically when you visit the editor for the first time. If you close it, that preference is remembered across browser sessions.
- **MCP server discoverability fix**: Older MCP servers that were registered on your instances were not showing up in Expert Insights mode. All registered MCP servers are now discoverable again.
- **Embedded editor tab titles**: Hosted and Remote Instance editor tabs now show the actual Node-RED flow name rather than a generic title.
- **Blueprint markdown rendering**: Blueprint descriptions now support markdown rendering, so formatting like headers and lists display as intended.
- **SSO team role management**: Team roles for SSO-managed users can now be changed directly in FlowFuse, resolving a limitation where SSO-enabled users' roles were locked.

### Node-RED

FlowFuse 2.29 ships with [Node-RED 4.1.8](https://github.com/node-red/node-red/releases/tag/4.1.8). Looking ahead, [Node-RED 5.0](https://nodered.org/blog/2025/12/03/node-red-roadmap-to-5) is in beta with a focus on UX modernization, node appearance improvements, and a better debugging experience. FlowFuse will ship 5.0 once it reaches stable release.

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.29, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.29) to us.

## Try FlowFuse

### FlowFuse Cloud

[Get started for free]({% include "sign-up-url.njk" %}) on FlowFuse Cloud and start connecting your IT and OT systems within minutes.

### Self-Hosted

[Install FlowFuse](/docs/install/introduction/) on your own infrastructure and keep your industrial data on-premise.
