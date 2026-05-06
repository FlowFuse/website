---
title: "FlowFuse 2.30: Expert Builds Your Industrial Application"
subtitle: "Describe the OEE dashboard, MES handover screen, or UNS topic mapping you need, and FlowFuse Expert builds it on your canvas. Plus an immersive editor optimised for iterating with Expert."
description: "FlowFuse 2.30 lets FlowFuse Expert build industrial applications from a description: OEE dashboards, MES handover screens, UNS topic mappings, and more."
date: 2026-05-07
authors: ["dimitrie-hoekstra"]
image: /blog/2026/05/images/flowfuse-release-2-30.png
tags:
   - flowfuse
   - news
   - releases
release: "2.30"
features:
   - id: ff-expert
     heading: "FlowFuse Expert Builds Your Industrial Application"
   - heading: "What else is new?"
cta:
  type: sign-up
  title: Try the latest FlowFuse improvements in your own environment
  description: Describe the application you need and let Expert build it on your canvas.
---

<!--
STATUS: WIP DRAFT for FlowFuse 2.30 release blog. DO NOT MERGE until checklist below is closed.

Outstanding before merge:
- [ ] Confirm lead-story framing with knolleary (agentic Expert application building, Cloud-only soft launch on request)
- [ ] Hold/promote candidate items based on whether these PRs land before 2026-05-07:
      - flowfuse#7119 force-all-users SSO (Bosch)
      - flowfuse#7078 audit log stop reason
      - flowfuse#7180 immersive editor disabled-state UX
      - flowfuse#7202 snapshot comparison wire-change polish
      - flowfuse#7184 EMQX bridge automation
- [ ] Author changelog entry for the lead story (Expert application building)
- [ ] Decide on a ff-expert sub-feature entry in src/_data/featureCatalog.yaml so tier badges reflect the new application-building capability
- [ ] Confirm latest Node-RED 5.0 beta version and the most useful forum thread to link
- [ ] Hero image at src/blog/2026/05/images/flowfuse-release-2-30.png
- [ ] Video to follow in a separate PR after publish (2.29 precedent: website#4855, 2.28: website#4724)
- [ ] Marketing copy review (Yndira-E, allthedoll)
- [ ] Engineering review (knolleary, hardillb)
- [ ] SEO description final pass
-->

FlowFuse 2.30 lets FlowFuse Expert build industrial applications for you from a description. Tell Expert what you need, and it assembles it on your canvas.

<!--more-->

## FlowFuse Expert Builds Your Industrial Application {#expert-application-building}

*FlowFuse Expert is our integrated AI assistant: chat-based help across the FlowFuse website, platform, and the immersive Node-RED editor.*

Until now, Expert could surface information, suggest changes, and act on links you clicked. Translating those suggestions into a working OEE dashboard, MES handover screen, or Modbus-to-UNS bridge still meant placing every node and wire by hand.

Describe the OEE dashboard, MES handover screen, or UNS topic mapping you need, and FlowFuse Expert builds it on your canvas. Real-time tool-call status keeps you in the loop while it works, and you keep iterating in chat to refine what it produced.

Examples to try:

- "An OEE dashboard for line 3 with downtime reasons and a daily target"
- "A Modbus connection that publishes tag values to my UNS broker on `factory/line3/+`"
- "A shift handover screen showing outstanding alarms and recent operator notes"
- "An asset utilization dashboard for the packaging cell, refreshed every minute"

Under the hood, the two-way communication runs over MQTT with a dedicated broker behind it for Cloud teams.

Application building is a soft launch and available on **FlowFuse Cloud Starter, Team, and Enterprise on request**. Self-hosted enablement follows once the central broker work lands.

[Contact us](/contact-us/?subject=FlowFuse%20Expert%20Application%20Building) to enable Application Building on your Cloud team.

<!-- TODO: screenshot or short gif of Expert building, e.g., an OEE dashboard, in the canvas -->

**Coming next:** self-hosted enablement, plus we are exploring "bring your own key" so teams can point Expert at their own provider account.

<!-- TODO: add ff-related-changelogs link once changelog entry for application building is authored -->

### In practice

- You go from a description to a working OEE dashboard, Modbus integration, or handover screen without placing each node by hand
- You see Expert's progress in real time as it builds, rather than waiting on a wall of suggestions to apply manually
- You iterate by talking, asking Expert to add a downtime category, swap a node, or rewire a connection, instead of bouncing between chat and canvas

## What else is new?

### A smoother iteration experience with Expert

We optimised the immersive editor UI so iterating with FlowFuse Expert on your industrial application is faster and stays in context. The instance drawer no longer overlaps with the Node-RED canvas, so settings, snapshots, environment variables, palette, and group or application assignment all sit alongside your work rather than covering it.

<div class="ff-related-changelogs">Changelog: <a href="https://flowfuse.com/changelog/2026/04/immersive-editor-drawer/">Instance drawer in the immersive editor</a></div>

### Snapshot comparison polish

A small follow-up to the property-level diff viewer that shipped in 2.29: computed properties (group node `w` and `h` values) no longer flag as changes, position-only changes are hidden by default, the change panel labels each entry with a node-type badge (config, tab, or normal), and JSON sections support prettify and wrap toggles. Powered by a `flow-renderer` 0.5.1 update.

### Smaller updates and fixes

- **Markdown code blocks in Expert preserve line breaks again**: a regression from the 2.29 highlighting work is fixed.
- **Device editor auto-recovery**: when opening the editor on a remote instance fails on first load, the page now refreshes after three seconds rather than leaving you on a 502.
- **SSO security hardening**: Google Social Login tokens can no longer be reused across logins, and a first SSO login on an unverified local account rotates the password to a random string. <!-- TODO: append "Force-all-users SSO" line if flowfuse#7119 lands -->
- **Tooltip cleanup**: native `title` replaces the buggy custom directive. Less flicker, fewer stuck tooltips.
- **Suspended team logging**: when a billing failure or trial expiry leaves an instance running, we now log why so support can act faster.
- **Device palette settings**: saving palette changes on a device no longer accidentally sends sanitised security flags upstream.
- **Git integration feature flag**: `gitIntegration` respects the all-feature override (Azure DevOps users on edge configurations).
- **Expert chat request timeout**: front-end chat requests time out cleanly rather than hanging.
<!-- CANDIDATE: keep this bullet only if flowfuse#7078 lands -->
- **Audit log stop reasons**: stop events show the underlying reason in the audit log detail rather than a generic message.

## Node-RED

Node-RED is the canvas FlowFuse builds on, and the project keeps moving fast.

[Node-RED 5.0](https://nodered.org/blog/2025/12/03/node-red-roadmap-to-5) is in active beta. It is a modernization and UI re-architecture that readies Node-RED for better AI-guided development and brings more clarity to manual editing. The latest betas land in the Node-RED forum first, with release notes, known issues, and the team looking for feedback. Try them out and follow along on the [Node-RED forum](https://discourse.nodered.org/).

We are aiming to ship Node-RED 5.0 as a stack option in FlowFuse by the end of May. Until then, Node-RED 4.1 remains the default.

<hr style="margin: 3rem 0; border: 0; border-top: 1px solid #D1D5DB;">

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.30, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.30) to us.
