---
title: "FlowFuse 2.29: FlowFuse Expert Comes to Self-Hosted Enterprise"
subtitle: "Self-Hosted Enterprise customers can now enable FlowFuse Expert. Plus Azure DevOps Git support and clearer snapshot comparisons."
description: "FlowFuse 2.29 brings FlowFuse Expert to self-hosted enterprise customers, adds Azure DevOps as a supported Git provider, and makes snapshot comparisons clearer with property-level diffs."
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
   - id: snapshots
     heading: "See Exactly What Changed in a Snapshot"
   - id: ff-expert
     heading: "FlowFuse Expert, Available to More Teams and More Capable"
   - heading: "What else is new?"
cta:
  type: sign-up
  title: Try the latest FlowFuse improvements in your own environment
  description: Use Expert to take action in your editor, connect Azure DevOps to your workflow, and see exactly what changed between snapshots.
---

FlowFuse 2.29 gives teams more control over how flows move through their stack, makes it easier to understand what changed between versions, and brings FlowFuse Expert to self-hosted enterprise customers.

<!--more-->

## FlowFuse Expert, Available to More Teams and More Capable {#expert}

*FlowFuse Expert is our integrated AI assistant — one consistent surface across the FlowFuse website, platform, and immersive Node-RED editor for troubleshooting, building, and getting targeted help.*

### Self-Hosted Enterprise {#expert-self-hosted}

FlowFuse Expert was previously only available to cloud customers. Self-hosted enterprise teams had no equivalent surface for in-context troubleshooting and guidance.

Expert is now available for self-hosted enterprise FlowFuse instances. Your team gets the same contextual guidance and targeted help as cloud customers, with your operational data staying on your own infrastructure.

[Contact us](/contact-us/?subject=FlowFuse%20Expert%20for%20Self-Hosted) to enable Expert on your self-hosted environment.

### Take Action Directly from Expert Responses {#expert-actions}

Expert responses previously surfaced information and suggestions. Acting on them — importing a flow, selecting relevant nodes, opening a new tab — required switching out of the conversation and doing it manually.

Expert responses can now include clickable action links. Click one and Expert performs the action directly in your editor: opening a new flow tab, selecting the nodes it just mentioned, or importing a flow from the conversation.

![Expert action links demo](src/blog/2026/04/images/expert-action-links.gif){data-zoomable style="border: 2px solid #E5E7EB;"}
<figcaption>Expert responses can now act on your behalf — click a link and Expert opens a tab, selects nodes, or imports a flow directly in your editor.</figcaption>

**Coming next:** spinning up Node-RED instances directly from Expert, letting you go from idea to running flow without leaving the chat.

<!-- TODO: changelog entry for Expert action links (FlowFuse/nr-assistant#184, #192, FlowFuse/flowfuse#6864) -->
<div class="ff-related-changelogs">Changelog: <em>TBD, link will be added once entry is published</em></div>

### In practice

- You act on Expert suggestions in one click instead of manually applying them
- You stay in the conversation while Expert works in your editor

## More Visibility and Control Across Your Deployment Workflow {#deployment-workflow}

Managing flows across environments means tracking what changed, when, and by whom. When tooling gaps introduce friction here — or leave your version control workflow fragmented — they slow teams down at exactly the wrong moment.

### Azure DevOps Git Integration {#azure-devops}

FlowFuse's GitOps support previously required GitHub. Teams standardised on Azure DevOps had no native way to include Node-RED flows in their existing version control workflow.

FlowFuse 2.29 adds Azure DevOps as a supported Git provider. You can now push and pull snapshots directly from Azure DevOps repositories using Personal Access Tokens, configured under Team Settings → Integrations.

### In practice

- You connect Azure DevOps repos alongside or instead of GitHub
- Your Node-RED flows participate in the same version control workflow as the rest of your stack
- You authenticate with Azure Personal Access Tokens, with no secondary tooling required

### See Exactly What Changed in a Snapshot {#snapshot-diff}

FlowFuse's snapshot comparison view showed flows side by side, but the visual alone doesn't always tell the whole story. You could see that a node was different, but not which specific property changed. When a function node's code changed, you couldn't identify which lines were different without manually diffing two code blocks outside of FlowFuse.

![Snapshot diff demo](src/blog/2026/04/images/snapshot-comparision-view-2.29.png){data-zoomable style="border: 2px solid #E5E7EB;"}
<figcaption>The compare dialog now shows exactly which properties changed and highlights line-level differences in function code, templates, and JSON — no manual diffing required.</figcaption>

The compare dialog now includes a property-level diff sidebar: structural property changes old to new at a glance, and git-style line diffs for function code, template HTML, and JSON. A navigation bar steps through every changed, added, or deleted node with arrow key shortcuts. The canvas highlights and scrolls to the current node as you navigate.

<!-- TODO: replace placeholder with real GIF showing the snapshot diff sidebar -->

<div class="ff-related-changelogs">Changelog: <em>[Richer snapshot comparison view](https://flowfuse.com/changelog/2026/04/snapshot-diff-viewer/)</em></div>

### In practice

- You review what changed between dev and production without leaving FlowFuse
- You validate a teammate's update at the property level, not just the node level
- You debug why a flow changed after a deploy with the same tooling you use to promote it

## What else is new?

- **Expert opens by default**: FlowFuse Expert now opens automatically when you visit the editor for the first time. If you close it, that preference is remembered across browser sessions.
- **Embedded editor tab titles**: Hosted and Remote Instance editor tabs now show the actual Node-RED flow name rather than a generic title.
- **Instance URL env var**: Hosted Node-RED instances now expose an `FF_INSTANCE_URL` environment variable containing the instance's URL (default or custom hostname). Useful for flows that need to know their own address, like webhook callbacks or OAuth redirects.
- **Blueprint markdown rendering**: Blueprint descriptions now support markdown rendering, so formatting like headers and lists display as intended.

### Fixes

- **MCP server discoverability**: Older MCP servers that were registered on your instances were not showing up in Expert Insights mode. All registered MCP servers are now discoverable again.
- **Snapshot detail in the immersive editor**: Reviewing a snapshot from inside the immersive editor now opens it in a modal, so you can inspect snapshots without leaving the editor.
- **Developer Mode tab restored in the immersive editor**: The Developer Mode tab is back in the immersive editor drawer, letting you toggle Auto Snapshots and create snapshots without opening a second window.

### Node-RED

[Node-RED 4.1.8](https://github.com/node-red/node-red/releases/tag/4.1.8) is now available as a stack option in FlowFuse. Highlights include function node tab badges (see at a glance which tabs contain code), theme plugin overrides for settings and menu options, configurable palette categories via theme plugins, and show-first/last-tab keyboard actions.

Looking ahead, [Node-RED 5.0](https://nodered.org/blog/2025/12/03/node-red-roadmap-to-5) is in beta. It's a modernization and UI re-architecture that readies Node-RED for better AI-guided development and brings more clarity to manual editing. FlowFuse will ship 5.0 once it reaches stable release.

<hr style="margin: 3rem 0; border: 0; border-top: 1px solid #D1D5DB;">

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.29, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.29) to us.
