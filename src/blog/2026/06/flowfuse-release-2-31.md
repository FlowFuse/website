---
title: "FlowFuse 2.31: Agentic Development Leaves Soft Launch, Reaches Remote Instances and Self-Hosted"
subtitle: "FlowFuse Expert can now build your application on both Hosted and Remote Instances, on FlowFuse Cloud and now Self-Hosted Enterprise. Plus per-team and per-instance AI controls, dark mode, and real-time platform updates."
description: "FlowFuse 2.31 takes agentic development out of soft launch and extends it to Remote Instances and FlowFuse Self-Hosted Enterprise, adds granular AI opt-out controls, dark mode, and real-time platform updates over MQTT."
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
tldr: "FlowFuse 2.31 ends the soft launch of agentic development: FlowFuse Expert now builds applications on both Hosted and Remote Instances, and reaches FlowFuse Self-Hosted Enterprise for the first time. Admins get per-team and per-instance control over AI, the editor gets a dark mode, and instance and team status update live without a refresh. This is a foundational release, with a lot of the work happening under the hood."
---

FlowFuse 2.31 takes agentic development out of soft launch. FlowFuse Expert can now build your application directly on both Hosted and Remote Instances, and on FlowFuse Self-Hosted (Enterprise) for the first time, not just FlowFuse Cloud. Alongside that, you get granular control over where AI runs, a dark mode for the platform, and platform status that updates in real time.

<!--more-->

## Agentic Development Leaves Soft Launch {#expert-agentic-ga}

*FlowFuse Expert is our integrated AI assistant across FlowFuse's website, platform, and the immersive Node-RED editor.*

In 2.30 we put agentic application building into soft launch. The idea is simple: tell FlowFuse Expert what you want to build, an OEE dashboard, an MES handover screen, a UNS topic mapping, and it assembles the flow on your workspace for you. Until now you had to request access while we proved it out.

That phase is over. With 2.31, agentic development becomes generally available as an open beta, on FlowFuse Cloud and for Self-Hosted Enterprise. No more requesting access: on FlowFuse Cloud it is switched on for your team, and Self-Hosted Enterprise customers can enable it with a small configuration change (your customer success contact can walk you through it). We are keeping the beta label on while we keep refining it.

On top of that, we expanded where agentic development runs. It used to work only on Hosted Instances, the Node-RED that FlowFuse runs for you. In 2.31 it works on Remote Instances too, the ones running on your own hardware through the device agent, so you get the same build-it-for-me experience wherever your instance lives.

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

Instance and team status now update live. When something changes, you see it right away instead of waiting for the page to catch up on its next refresh.

- **Live instance status** as it changes, no refresh needed
- **Live team updates** as they happen
- A platform that feels more responsive overall

Under the hood we moved from periodic polling to a push-based connection, which also takes load off the backend.

## What else is new?

- **Custom CA certificates** are now documented for environments that need them.
- **Tailwind 4 upgrade and UI polish**: we upgraded the platform to Tailwind 4 and fixed a batch of layout and styling inconsistencies that came with it.
- **Smaller fixes**: custom packages with uppercase names no longer break pipeline deploys, CSP no longer blocks `wss://` connections to MQTT brokers, and we tightened backend response schemas so generated TypeScript types are accurate.

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
