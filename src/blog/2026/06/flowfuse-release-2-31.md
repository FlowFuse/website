---
title: "FlowFuse 2.31: Agentic Development Leaves Soft Launch, Reaches Remote Instances and Self-Hosted"
subtitle: "FlowFuse Expert can now build your application on Hosted and Remote instances, including Self-Hosted Enterprise. Plus per-team and per-instance AI controls, dark mode, and real-time platform updates."
description: "FlowFuse 2.31 takes agentic development out of soft launch and extends it to Remote instances and Self-Hosted Enterprise, adds granular AI opt-out controls, dark mode, and real-time platform updates over MQTT."
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
#     heading: "Agentic Development Leaves Soft Launch"
#   - id: ai-opt-out                       (new entry; changelog flowfuse#7333; tiering TBD)
#     heading: "Decide Where AI Runs"
#   - id: dark-mode                        (new entry; changelog flowfuse#7359)
#     heading: "Dark Mode"
#   - id: realtime-platform-updates        (new entry)
#     heading: "Real-Time Platform Updates"
tldr: "FlowFuse 2.31 ends the soft launch of agentic development: FlowFuse Expert now builds applications on both Hosted and Remote instances, and reaches Self-Hosted Enterprise through an MQTT bridge. Admins get per-team and per-instance control over AI, the editor gets a dark mode, and platform status now updates in real time over MQTT. This is a foundational release, with a lot of the work happening under the hood."
---

FlowFuse 2.31 takes agentic development out of soft launch. FlowFuse Expert can now build your application directly on both Hosted and Remote instances, and it reaches Self-Hosted Enterprise customers for the first time. Alongside that, you get granular control over where AI runs, a dark mode for the platform, and platform status that updates in real time.

<!--more-->

## Agentic Development Leaves Soft Launch {#expert-agentic-ga}

*FlowFuse Expert is our integrated AI assistant across FlowFuse's website, platform, and the immersive Node-RED editor.*

In 2.30 we introduced agentic application building in soft launch: describe the OEE dashboard, MES handover screen, or UNS mapping you need, and Expert assembles it on your workspace. With 2.31, that soft launch ends and the capability opens up more widely.

Two things change:

- **Remote instances are now included.** Until now agentic development only worked on Hosted instances. Remote instances were left out. That gap closes in 2.31, so you get the same build-it-for-me experience regardless of where your instance runs.
- **Self-Hosted Enterprise gets access.** Self-Hosted Enterprise customers can now reach FlowFuse Expert through a central broker bridge. Your local EMQX broker connects to FlowFuse's central broker with a small YAML config change, and from there Expert works inside your editor the same way it does on Cloud.

If you are a Self-Hosted Enterprise customer and want this enabled, reach out to your customer success contact and we will walk you through the setup.

## Decide Where AI Runs {#ai-opt-out}

Not every team wants AI on, and not every instance should have it. 2.31 makes that a setting rather than an all-or-nothing platform decision.

- **Per-team opt-out** on FlowFuse Cloud and Self-Hosted Enterprise. A team owner can switch AI features off for their team.
- **Per-instance opt-out** on Self-Hosted Enterprise, for cases where a specific instance should stay AI-free.
- **Opt-in for Self-Hosted.** AI is not enabled by default for self-hosted clients. You turn it on when you want it, rather than having it forced on.

This gives admins a clear control surface, and it lets us keep iterating on AI without changing the experience for teams that have opted out.

## Dark Mode {#dark-mode}

The platform now has a dark mode. Easier on the eyes for long sessions in the editor and across the dashboard, and it follows the look you would expect.

<!-- TODO: screenshot of dark mode editor -->

## Real-Time Platform Updates {#realtime-platform-updates}

Instance and team status used to be fetched by polling the backend over HTTP on a timer. In 2.31 we moved that to MQTT over WebSockets, so status updates arrive in real time instead of on the next poll.

- **Live instance status** without waiting for a refresh
- **Live team updates** pushed as they happen
- Less polling load on the backend

Most of this you will not see directly, but the platform should feel more responsive.

## What else is new?

- **Custom CA certificates** are now documented for environments that need them.
- **Tailwind 4 upgrade and UI polish**: we upgraded the platform to Tailwind 4 and fixed a batch of layout and styling inconsistencies that came with it.
- **Smaller fixes**: custom packages with uppercase names no longer break pipeline deploys, CSP no longer blocks `wss://` connections to MQTT brokers, and we tightened backend response schemas so generated TypeScript types are accurate.

## A note on this release

This one is lighter on big user-facing features, and that is on purpose. The team was at a company off-site this cycle, and we used the time to step back: revamping how we run product, and resetting our roadmaps for what is coming next. So a lot of 2.31 is foundational, under-the-hood work, the kind that sets up the bigger things we are building toward. More on that soon.

For detailed breakdowns of each feature with additional visuals, visit our [changelog](/changelog/). For the complete list of everything included in FlowFuse 2.31, check out the [release notes](https://github.com/FlowFuse/flowfuse/releases).

If something in this release improves your workflow, or if there is still friction we can remove, please [share feedback or report issues regarding this release](mailto:contact@flowfuse.com?subject=Feedback%20on%202.31) with us.

## Try FlowFuse

### FlowFuse Cloud

The fastest way to get started is with FlowFuse Cloud.
[Get started for free]({% include "sign-up-url.njk" %}) and have your Node-RED instances running in minutes.

### Self-Hosted

Run FlowFuse locally using [Docker](/docs/install/docker/) or [Kubernetes](/docs/install/kubernetes/).
