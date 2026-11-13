---
title: Project Nodes now reach every instance in your application
description: Target hosted and remote instances by application, scope broadcasts to one application, call from remote to remote, and choose the target and topic at runtime.
date: 2026-11-13 12:00:00
release: "3.3"
authors: ["stephen-mclaughlin"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/nr-project-nodes/issues/30
  - https://github.com/FlowFuse/nr-project-nodes/pull/296
  - https://github.com/FlowFuse/flowfuse/pull/9079
  - https://github.com/FlowFuse/flowfuse/pull/9083
  - https://github.com/FlowFuse/nr-project-nodes/pull/299
  - https://github.com/FlowFuse/nr-project-nodes/issues/44
  - https://github.com/FlowFuse/nr-project-nodes/pull/307
  - https://github.com/FlowFuse/nr-project-nodes/issues/118
  - https://github.com/FlowFuse/nr-project-nodes/pull/315
  - https://github.com/FlowFuse/flowfuse/pull/9163
---

Your line PLCs, your edge gateways and your cloud dashboards rarely live on one Node-RED instance. The Project Nodes now link all of them, wherever they run, and one set of flows can serve a whole fleet.

## Reach every instance in your application

**Send to and call remote instances.** `Project Out` and `Project Call` can now target remote instances that belong to an application, not just hosted instances. Ask a machine on the line for its latest reading from the cloud, or push a recipe change straight to one remote instance, without having to invent a means of broadcasting and filtering on the other side.

Calls work between any two instances, so a remote instance can call a flow on another remote instance, a hosted instance can call a remote one, and the reverse. This opens up the full potential of distributed applications, where any instance can interact with any other instance seamlessly.

**Keep broadcasts inside the application.** `Project In` and `Project Out` have a new **Channel** option. The **Team** channel is the default and works exactly as it did before. The new **Application** channel keeps a broadcast inside one application, so only instances in that application send or receive it. Run the same flows for two sites in one team and their messages stay isolated.

**Find the right target fast.** Targets in the editor are grouped by application, and you can filter the list to one application. Remote instances assigned to an application appear right alongside hosted ones.

<video autoplay loop muted playsinline aria-label="Project Call reaching a remote instance, an application channel broadcast staying inside one application, and the target list grouped by application" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/11/images/application-aware-project-nodes.webm" type="video/webm" /></video>

*Calling a remote instance, scoping a broadcast to one application and picking a target by application.*

## Runtime targeting

Another new feature brought in this release enables you to choose the target instance and the topic at runtime instead of picking them in the editor.

**Choose the target at runtime.** On `Project Out` and `Project Call`, set **Target** to `env` or `msg.`. The node then reads the instance to send to from an environment variable or from the message, so one flow can send to different instances.

**Choose the topic at runtime.** Topics work the same way. Set **Topic** to `env`, or to `msg.` on `Project Out` and `Project Call`. `Project In` reads its topic when the node starts, so it takes `env` but not `msg.`.

Together, runtime target and topic let one set of flows serve every instance. In the video below, each line asks a config instance for its settings, taking the target and topic from its environment. The returned config names the collector, and the line then sends its data and status there, with the target and topic read from each message. Because the target and topic come from the environment, you can promote the same flows through a FlowFuse pipeline to other environments and only the environment settings change..

The same approach suits a dashboard chat interface that sends direct messages to other instances, writing each record to the right database based on payload, or routing data to a backup instance when one fails. The [Project Nodes documentation](/docs/user/projectnodes/) covers the target and topic formats.

<video autoplay loop muted playsinline aria-label="One flow choosing its target and topic from the environment and from the message, so each line finds its own config and sends its data to the right collector" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/11/images/project-nodes-runtime-target-topic.webm" type="video/webm" /></video>

*One flow choosing its target and topic from the environment and from the message.*

## Get it

This is available to FlowFuse Edge, Hub and Fleet teams on FlowFuse Cloud now and in FlowFuse v3.3 for Self Hosted. Existing flows keep working unchanged.

Read more in the [Project Nodes documentation](/docs/user/projectnodes/).

_Needs `@flowfuse/nr-project-nodes` v1.0.0 or later on every instance that uses the new options, remote instances included. Update it in the Palette Manager._
