---
title: Project Nodes now reach every instance in your application
description: Send to and call remote instances, keep broadcasts inside one application, and find targets grouped by application.
date: 2026-11-19 12:00:00
release: "3.3"
authors: ["stephen-mclaughlin"]
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/nr-project-nodes/issues/30
  - https://github.com/FlowFuse/nr-project-nodes/pull/296
  - https://github.com/FlowFuse/flowfuse/pull/9079
---

Your line PLCs, your edge gateways and your cloud dashboards rarely live on one Node-RED instance. Now the Project Nodes link all of them, wherever they run.

<!-- VIDEO PLACEHOLDER: replace the src (and the aria-label/caption if needed) once the video is rendered -->
<video autoplay loop muted playsinline aria-label="Remote instances on a factory floor and a hosted instance in the cloud exchanging messages with the Project Nodes" style="border: 2px solid #E5E7EB;" width="1920" height="1080" preload="none"><source src="/changelog/2026/11/images/application-aware-project-nodes.webm" type="video/webm" /></video>

*Linking hosted and remote instances in one application.*

## Send to and call remote instances

`Project Out` and `Project Call` can now target remote instances that belong to an application, not just hosted instances. Ask a machine on the line for its latest reading from the cloud, or push a recipe change straight to one gateway, without inventing a broadcast topic and filtering on the other side.

## Keep broadcasts inside the application

`Project In` and `Project Out` have a new **Channel** option. **Team** works exactly as before. **Application** keeps a broadcast inside one application: only instances and remote instances in that application send or receive it. Run the same flows for two sites in one team and their messages stay apart.

## Find the right target fast

Targets in the editor are grouped by application, and you can filter the list to one application. Remote instances appear right alongside hosted ones.

## Get it

This is available to Enterprise teams on FlowFuse Cloud now and in FlowFuse v3.3 for Self Hosted. Existing flows keep working unchanged.

Read more in the [Project Nodes documentation](/docs/user/projectnodes/#applications).

- _Needs `@flowfuse/nr-project-nodes` v0.8.0 or later on every instance that uses the new options, remote instances included. Update it in the Palette Manager._
