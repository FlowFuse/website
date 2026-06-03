---
title: "FlowFuse 2.31: Agentic Development Now in Open Beta, FlowFuse Expert Builds Your Industrial App on Edge Devices"
subtitle: "FlowFuse Expert can now build your industrial application on both Hosted and Remote Instances, on FlowFuse Cloud and now Self-Hosted Enterprise. Plus per-team and per-instance AI controls and real-time platform updates."
description: "In FlowFuse 2.31, FlowFuse Expert builds your industrial application for you, now an open beta on FlowFuse Cloud and Self-Hosted Enterprise, and working on Remote Instances as well as Hosted ones. Plus per-team and per-instance AI controls and real-time platform updates."
date: 2026-06-04
authors: ["dimitrie-hoekstra"]
# image: /blog/2026/06/images/flowfuse-release-2-31.png  # add once the art request asset lands; the file is absent now and 11ty's image step errors on it, so it is omitted (falls back to the default blog tile)
tags:
   - flowfuse
   - news
   - releases
release: "2.31"
# features: block intentionally commented out until featureCatalog wiring is done.
# Wire these once eng authors the changelog entries and product tiering is finalized:
#   - id: ff-expert-application-building   (update existing entry: add 2.31 changelog + self-hosted enterprise)
#     heading: "Let FlowFuse Expert build your industrial application"
#   - id: ai-opt-out                       (new entry; changelog flowfuse#7333; tiering TBD)
#     heading: "Decide Where AI Runs"
#   - id: realtime-platform-updates        (new entry)
#     heading: "Real-Time Platform Updates"
tldr: "In FlowFuse 2.31 you describe what you want and FlowFuse Expert builds your industrial application for you. It is now an open beta, no longer request-only, on FlowFuse Cloud and for Self-Hosted Enterprise, and it works on Remote Instances as well as Hosted ones. You also get per-team and per-instance control over AI, and instance and team status that updates live. This is a foundational release, with a lot of the work happening under the hood."
---

With FlowFuse 2.31 you describe what you want and FlowFuse Expert builds it on your Node-RED workspace for you. It is now an open beta, no longer request-only, on FlowFuse Cloud and for Self-Hosted Enterprise, and it works on Remote Instances as well as Hosted ones. Alongside that, you get granular control over where AI runs and platform status that updates in real time.

<!--more-->

## Let FlowFuse Expert build your industrial application {#expert-agentic-ga}

*FlowFuse Expert is our integrated AI assistant across FlowFuse's website, platform, and the immersive Node-RED editor.*

In 2.30 we put agentic application building into soft launch. The idea is simple: tell FlowFuse Expert what you want to build, an OEE dashboard, an MES handover screen, a UNS topic mapping, and it assembles the flow on your workspace for you. Until now you had to request access while we proved it out.

That phase is over. With 2.31, agentic development opens up as an open beta, on FlowFuse Cloud and for Self-Hosted Enterprise. No more requesting access: on FlowFuse Cloud it is switched on for your team, and Self-Hosted Enterprise customers can enable it with a small configuration change (your customer success contact can walk you through it). We are keeping the beta label on while we keep refining it.

You can now use it on Remote Instances as well as Hosted Instances. Until now agentic development was limited to Hosted Instances. In 2.31 it also works on Remote Instances, so you get the same build-it-for-me experience across both instance types.

## Certified nodes for industrial connectivity and AI {#certified-nodes}

FlowFuse now offers certified nodes: vetted, FlowFuse-supported nodes you can add to your instances. At launch you can get:

### RTSP

Bring live video streams into your flows, like camera feeds for monitoring, inspection, or feeding frames into a vision or AI pipeline.

### OPC UA

Connect to your industrial equipment over OPC UA, the standard for talking to PLCs, SCADA systems, and machines on the plant floor.

### AI nodes

Call leading AI models straight from your flows: Anthropic, OpenAI, Gemini, and Ollama for models you run yourself. Other model providers are following soon.

Certified nodes are available to FlowFuse Cloud customers. [Get in touch with sales](/contact-us/?subject=Certified%20Nodes) or your account rep, and we'll enable the ones your team needs.

## Real-Time Platform Updates {#realtime-platform-updates}

Instance and team status now update live. When something changes, you see it right away instead of waiting for the page to catch up on its next refresh.

- **Live instance status** as it changes, no refresh needed
- **Live team updates** as they happen
- A platform that feels more responsive overall

Under the hood we moved from periodic polling to a push-based connection, which also takes load off the backend.

## What else is new?

- **AI opt-out controls**: switch AI off per team (FlowFuse Cloud and Self-Hosted Enterprise) or per instance (Self-Hosted Enterprise); AI stays opt-in for self-hosted.
- **Custom CA certificates** are now documented for environments that need them.
- **Smaller fixes**: secure (`wss://`) connections to your MQTT broker now work from the editor, and custom packages with uppercase names no longer break pipeline deploys.

## Fresh off our team off-site in Greece

We spent part of this cycle together in Greece for a full-company off-site, and it shaped what you see (and do not yet see) in 2.31.

<!-- PHOTO: group shot of the team in Greece. Swap for ![The FlowFuse team in Greece](/blog/2026/06/images/offsite-team.jpg) once the asset lands. -->

Getting everyone in one place let us do the kind of work that is hard to do day-to-day and fully remote:

- Stepping back to align on where FlowFuse is headed next
- Revamping how we run product, from discovery through to what actually ships in a release
- Resetting our roadmaps so the next releases build on each other rather than pulling in different directions

<!-- PHOTO: working-session / whiteboard shot. Swap for ![Roadmap working session](/blog/2026/06/images/offsite-roadmap.jpg) once the asset lands. -->

It is also why 2.31 is lighter on big, user-facing features than a typical release, and we are okay with that. A lot of what we shipped this month is foundational, under-the-hood work, the kind that sets up the bigger things we are building toward.

<!-- PHOTO: candid / team-dinner shot. Swap for ![Team dinner in Greece](/blog/2026/06/images/offsite-dinner.jpg) once the asset lands. -->

We will share more on what came out of the off-site soon.

<!-- TODO (skeleton): confirm the specifics above (where in Greece, dates, what we want to share publicly), tighten the copy, and replace the three PHOTO comments with real images in /blog/2026/06/images/. -->

---

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.31, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.31) with us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
