---
title: "FlowFuse 2.31: Agentic Development Now in Open Beta, FlowFuse Expert Builds Your Industrial App on Edge Devices"
subtitle: "FlowFuse Expert can now build your industrial application on both Hosted and Remote Instances, on FlowFuse Cloud and now Self-Hosted Enterprise. Plus per-team and per-instance AI controls and real-time platform updates."
description: "In FlowFuse 2.31, FlowFuse Expert builds your industrial application for you, now an open beta on FlowFuse Cloud and Self-Hosted Enterprise, and working on Remote Instances as well as Hosted ones. Plus per-team and per-instance AI controls and real-time platform updates."
date: 2026-06-04
authors: ["dimitrie-hoekstra"]
image: /blog/2026/06/images/flowfuse-release-2-31.jpg
tags:
   - flowfuse
   - news
   - releases
release: "2.31"
# features + changelog interlinking deferred to a follow-up (stacked) PR, since it depends on the
# 2.31 changelog entries that land with the release. Wire after merge: certified-nodes (entry exists),
# ff-expert-application-building (needs open-beta cloud tier, self-hosted enterprise, and a 2.31 changelog).
tldr: "FlowFuse 2.31 brings agentic application building to open beta: describe what you want and FlowFuse Expert builds it on your Node-RED workspace. Plus new certified nodes (RTSP, OPC UA, AI) and per-team and per-instance control over AI."
cta:
  type: contact
  title: Get FlowFuse Expert and certified nodes enabled for your team
  description: Agentic development is in open beta and Certified Nodes are available on request. Get in touch and we'll set your team up.
---

FlowFuse 2.31 lets FlowFuse Expert build your industrial application for you, now in open beta. Describe what you need, and Expert assembles it on your workspace.

<!--more-->

## Agentic Development Now in Open Beta {#expert-agentic-ga}

*FlowFuse Expert is our integrated AI assistant, in the website, the platform, and the immersive Node-RED editor.*

Describe what you want to build, an OEE dashboard, an MES handover screen, a UNS topic mapping, and FlowFuse Expert assembles the flow on your workspace for you. With 2.31 this moves out of soft launch into an open beta: switched on for your team on FlowFuse Cloud, no request needed. On Self-Hosted Enterprise, [contact us](/contact-us/) to enable it, and new self-hosted customers get it enabled automatically.

It now works on Remote Instances as well as Hosted Instances, so you get the same build-it-for-me experience across both.

## Certified nodes for industrial connectivity and AI {#certified-nodes}

FlowFuse now offers certified nodes: vetted, FlowFuse-supported nodes you can add to your instances. At launch you can get:

- **RTSP**: bring live video streams into your flows, like camera feeds for monitoring, inspection, or feeding frames into a vision or AI pipeline.
- **OPC UA**: connect to your industrial equipment, the standard for talking to PLCs, SCADA systems, and machines on the plant floor.
- **AI nodes**: call leading AI models straight from your flows, with more providers following soon:
  - Anthropic
  - OpenAI
  - Gemini
  - Ollama, for models you run yourself

  These first LLM nodes handle single-shot, text-in/text-out calls; see the [LLM nodes documentation](/node-red/flowfuse/ai/llm-nodes/) for details. Multimodal input, conversation history, and tool calling are planned for follow-up iterations. They join the FlowFuse AI Nodes package we [shipped in 2.23](/changelog/2025/10/onnx-nodes/), which already includes the ONNX Inference, Image Classification, Object Detection, and Image Depth Estimation nodes for running vision and custom models on-device, with no external API calls.

Certified nodes are available to FlowFuse Cloud customers. [Get in touch with sales](/contact-us/?subject=Certified%20Nodes) or your account rep, and we'll enable the ones your team needs.

## What else is new?

- **Control over where AI runs:** FlowFuse Cloud enables AI by default. Toggle it per team. Self-Hosted Enterprise disables it by default, and you can toggle it per team or per instance.
- **Custom CA certificates** are now documented for environments that need them.
- **Smaller fixes**: secure (`wss://`) connections to your MQTT broker now work from the editor, and custom packages with uppercase names no longer break pipeline deploys.

## Our team off-site in Greece

We spent part of this cycle together in Greece for a full-company off-site, resetting our roadmaps and how we run product. That is also why 2.31 is lighter on big features: a lot of this month's work is foundational.

<!-- PHOTO: add the off-site team photo here once the asset lands: ![The FlowFuse team in Greece](/blog/2026/06/images/offsite-team.jpg) -->

<hr style="margin: 3rem 0; border: 0; border-top: 1px solid #D1D5DB;">

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.31, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.31) with us.
