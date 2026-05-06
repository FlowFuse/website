<!--
STATUS: WIP DRAFT for FlowFuse 2.30 release blog. DO NOT MERGE until checklist below is closed.

Outstanding before merge:
- [ ] Confirm lead-story framing with @knolleary (agentic Expert flow building, Cloud-only soft launch on request, Beta)
- [ ] Hold/promote candidate sections based on whether these PRs land before 2026-05-07:
      - flowfuse#7119 force-all-users SSO (Bosch)
      - flowfuse#7078 audit log stop reason
      - flowfuse#7180 immersive editor disabled-state UX
      - flowfuse#7202 snapshot comparison wire-change polish
      - flowfuse#7184 EMQX bridge automation
- [ ] Author changelog entries for the lead story (agentic flow building) and the snapshot-comparison polish
- [ ] Add a `ff-expert-flow-building` (Beta) sub-feature to src/_data/featureCatalog.yaml so tier badges render correctly. Plan: Cloud Starter/Pro/Enterprise on request, Self-Hosted unavailable for now.
- [ ] Hero image at src/blog/2026/05/images/flowfuse-release-2-30.png
- [ ] Video to follow in a separate PR after publish (2.29 precedent: website#4855, 2.28: website#4724)
- [ ] Marketing copy review: @Yndira-E, @allthedoll
- [ ] Engineering review: @knolleary, @hardillb
- [ ] SEO description final pass
-->
---
title: "FlowFuse 2.30: Expert Starts Building Flows for You"
subtitle: "Describe a flow in chat and FlowFuse Expert wires it on your canvas (Beta). Plus a more immersive editor experience and clearer snapshot comparisons."
description: "FlowFuse 2.30 extends FlowFuse Expert with flow-building in beta, makes the immersive editor work without overlapping Expert, and sharpens snapshot comparison diffs."
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
     heading: "FlowFuse Expert Starts Building Flows for You (Beta)"
   - heading: "A More Immersive Editor Experience"
   - id: snapshot-compare
     heading: "Snapshot Comparison: Even Clearer Diffs"
   - heading: "What else is new?"
cta:
  type: sign-up
  title: Try the latest FlowFuse improvements in your own environment
  description: Describe a flow and let Expert build it for you, manage instance settings without leaving the editor, and review snapshots with sharper diffs.
---

FlowFuse 2.30 takes FlowFuse Expert from suggesting changes to making them, makes the immersive editor work without overlapping Expert, and sharpens what you see in a snapshot comparison.

<!--more-->

## FlowFuse Expert Starts Building Flows for You (Beta) {#expert-flow-building}

*FlowFuse Expert is our integrated AI assistant: chat-based help across the FlowFuse website, platform, and the immersive Node-RED editor.*

Until now, Expert could surface information, suggest changes, and act on links you clicked. Building a flow still meant translating those suggestions back into nodes, wires, and configuration by hand.

Expert can now build flows for you. Describe what you want, and Expert assembles it on your canvas: adding tabs, wiring nodes, configuring properties. While Expert works, real-time tool-call status keeps you in the loop. The two-way communication runs over MQTT, with a dedicated broker behind it for Cloud teams.

This is a soft launch. Flow building is in **beta** and available on **FlowFuse Cloud Starter, Team, and Enterprise on request**. Self-hosted enablement follows once the central broker work lands.

[Contact us](/contact-us/?subject=FlowFuse%20Expert%20Flow%20Building%20Beta) to enable Flow Building on your Cloud team.

<!-- TODO: screenshot or short gif of Expert building a flow in the canvas -->

**Coming next:** self-hosted enablement, plus we are exploring "bring your own key" so teams can point Expert at their own provider account.

<!-- TODO: add ff-related-changelogs link once changelog entry for flow building is authored -->

### In practice

- You describe a flow in chat and Expert builds it on your canvas, instead of copying suggestions node by node
- You see Expert's progress in real time as it adds tabs, wires nodes, and configures properties
- You stay in your editor while Expert works alongside you, rather than getting handed back text instructions

## A More Immersive Editor Experience {#immersive-editor}

The immersive editor places FlowFuse Expert next to the Node-RED canvas. In 2.29 the two could overlap when you opened the instance drawer, which forced you back out to the platform UI to manage settings, snapshots, environment variables, palette, and group or application assignment.

In 2.30 the drawer fits inside the immersive editor without overlapping Expert. Every drawer tab works there: Settings, Snapshots, Environment Variables, Performance, Palette, and assignment. Save buttons disable correctly after a save, the Performance tab is back, and remote-instance assign and unassign reflect without a manual reload.

<!-- TODO: screenshot of the instance drawer inside the immersive editor, with Expert visible alongside -->

<div class="ff-related-changelogs">Changelog: <a href="https://flowfuse.com/changelog/2026/04/immersive-editor-drawer/">Instance drawer in the immersive editor</a></div>

### In practice

- You manage instance settings, snapshots, env vars, performance, palette, and assignment from inside the immersive editor
- You stop bouncing between the editor and the platform UI for routine instance work
- Expert and the editor stay visible alongside whatever you are configuring

## Snapshot Comparison: Even Clearer Diffs {#snapshot-diff}

The snapshot comparison view shipped in 2.29 with property-level diffs and a navigable change panel. 2.30 sharpens the signal-to-noise.

Computed properties (the group node `w` and `h` values) no longer flag as changes, so structural diffs show what actually changed. The change panel labels each entry with a node-type badge (config, tab, or normal). Position-only changes are hidden by default. Config-node highlighting clears between selections. JSON sections support prettify and wrap toggles.

The viewer is powered by `flow-renderer` 0.5.1, which adds `persistentHighlight` so the canvas stays in sync with the change panel as you step through.

<!-- TODO: screenshot showing the cleaner diff with node-type badges and prettified JSON -->

<!-- TODO: add ff-related-changelogs link once 2.30 changelog entry for snapshot polish is authored -->

### In practice

- You see only the changes that matter, with computed properties filtered out automatically
- You step through a diff knowing whether each change is on a normal node, a tab, or a config node
- You toggle wrap and prettify on long JSON without leaving the diff view

## What else is new?

- **Markdown code blocks in Expert preserve line breaks again**: a regression from the 2.29 highlighting work is fixed.
- **Device editor auto-recovery**: when opening the editor on a remote instance fails on first load, the page now refreshes after three seconds rather than leaving you on a 502.
- **SSO security hardening**: Google Social Login tokens can no longer be reused across logins, and a first SSO login on an unverified local account rotates the password to a random string. <!-- TODO: append "Force-all-users SSO" line if flowfuse#7119 lands -->
- **Tooltip cleanup**: the custom tooltip directive is replaced with the native `title` attribute. Less flicker, fewer stuck tooltips.
<!-- CANDIDATE: keep this bullet only if flowfuse#7078 lands -->
- **Audit log stop reasons**: stop events show the underlying reason in the audit log detail rather than a generic message.

### Fixes

- **Suspended team logging**: when a billing failure or trial expiry leaves an instance running, we now log why so support can act faster.
- **Device palette settings**: saving palette changes on a device no longer accidentally sends sanitised security flags back upstream.
- **Git integration feature flag**: `gitIntegration` respects the all-feature override (Azure DevOps users on edge configurations).
- **Expert chat request timeout**: front-end chat requests time out cleanly rather than hanging.

### Node-RED

[Node-RED 5.0](https://nodered.org/blog/2025/12/03/node-red-roadmap-to-5) is approaching its first stable release. We are aiming to ship 5.0 as a stack option in FlowFuse by the end of May. Until then, Node-RED 4.1 remains the default.

<hr style="margin: 3rem 0; border: 0; border-top: 1px solid #D1D5DB;">

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.30, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.30) to us.
