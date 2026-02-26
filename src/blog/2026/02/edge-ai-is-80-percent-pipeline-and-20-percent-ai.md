---
title: "Edge AI Is 80% Plumbing, 20% Intelligence"
subtitle: "Why your Edge AI pilot is still a pilot."
description: "Learn how manufacturers are turning Edge AI pilots into production reality — and why the plumbing matters more than the model."
date: 2026-02-13
keywords: 
authors: ["sumit-shinde"]
image: 
tags:
- flowfuse
---

The model is the easy part. I know that is not what you were told. But it is true, and somewhere between your third deployment and your first production fire, you will stop arguing with it.

<!--more-->

Edge AI is infrastructure work. Unglamorous, load-bearing, invisible-until-it-breaks infrastructure work with a neural network sitting on top of it like a trophy on a foundation nobody inspected. The 20% is the trophy. The 80% is everything underneath it.

Most Edge AI projects do not fail because the model was wrong. They fail because nobody budgeted for the plumbing, nobody respected the plumbing, and everybody assumed the plumbing would figure itself out.

It does not figure itself out.

Here is what I have watched happen, repeatedly, across manufacturing facilities that were serious about Edge AI, staffed it well, and still could not get past the pilot: the model worked. The demo worked. The business case was real. And then the project stalled. Not because the technology failed, but because the infrastructure the technology needed to survive in an actual plant was never built.

[McKinsey put a number on this: 84% of manufacturers pursuing IIoT were stuck in pilot mode](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-organization-blog/avoid-pilot-purgatory-in-7-steps). More than a quarter for over two years. In the years since, the models have gotten better, the hardware has gotten cheaper, and the percentage has not moved. That tells you the model was never the constraint.

What is the constraint? Data your system can actually trust. Updates that reach hardware you cannot physically touch. Security that was designed in, not bolted on. Monitoring that catches a drifting model before it causes a quality escape. And an operating model that answers, before something breaks at 3 a.m., who owns this: IT or OT.

None of that is in the vendor's proposal. All of it determines whether the vendor's proposal is worth anything.

The factory your AI vendor designed their solution for has clean data, modern equipment, stable connectivity, and IT and OT teams working from a shared operating model. That factory is a useful abstraction. It is not your plant.

Your plant has PLCs from three different vendors. A historian configured in 2009 that your OT team will not let anyone touch because the last time someone touched it, production stopped for four hours. Legacy equipment on the shop floor with no digital interface, because when it was commissioned, "digital interface" was not a specification category that existed. Sensor data in proprietary formats. Timestamps that do not align across systems. Protocols that your IT team has never heard of and your OT team has been working around for a decade.

Before a single inference runs at the edge, someone has to collect and normalize data from all of that. Protocol translation. Context tagging. Historian integration. That work is months of engineering. It is almost never scoped. And when it surfaces, it is always described as a surprise, even though everyone in the plant knew it was there.

This is why [Node-RED](/node-red/) matters in manufacturing in a way that nothing else quite does. It was built for exactly this problem: connecting things that were never designed to talk to each other. Modbus, OPC-UA, Siemens S7, MQTT. Thousands of community-built nodes covering the full reality of what is on the factory floor, not the idealized version. Your OT engineers, the people who actually understand the equipment, can build integration flows without waiting for scarce software developers. The domain knowledge that has been locked in people's heads for years can finally become logic that runs.

But Node-RED alone is a development tool. Running it in production, across a fleet of edge devices in multiple facilities, is a different problem entirely. And that gap, between a working flow on one machine and a reliable, managed, auditable deployment across your entire operation, is precisely where most IIoT projects quietly fall apart.

FlowFuse was built to close that gap. Both gaps, actually. Because the problem in manufacturing is not just that the infrastructure is hard. It is that building the intelligence on top of it is also harder than the demos suggest, and most teams are doing both with the wrong tools.

The OT engineer who has spent fifteen years learning one plant's quirks is not going to become a software developer. That was never a realistic ask. But they understand the equipment better than anyone who might be hired to build integrations for it, and if the tooling respects that knowledge, they can do the integration work themselves. Node-RED was the first tool in this space that actually respected that. Not because it simplified the problem, but because it let domain expertise drive the solution.

FlowFuse starts from that same premise and takes it further, into the territory Node-RED was never designed to handle alone.

Take what happens when you want to put a model in production. You have a data scientist who trained something useful — a predictive maintenance model, an anomaly detector, a vision system for defect classification. The model is accurate. It works on their laptop. And then there is the question of where it actually lives, how OT can interact with it, what happens when it needs to be retrained, and who owns it when something goes wrong at 2 a.m. on a Saturday.

In most deployments, nobody has a good answer to any of those questions. The model ends up in a container somewhere that only the data scientist understands, connected to the plant by a fragile handshake that no one wants to touch. The OT team treats it like a black box because it is a black box.

[FlowFuse's ONNX nodes](/node-red/flowfuse/ai/onxx/) change that by putting the model where OT engineers already work. You train, you export, you deploy it as a node in a flow — alongside the Modbus reads, the historian writes, the MQTT publishes. The inference runs locally, on the edge device, no cloud round trip, no latency the line cannot afford. When we [deployed a motor anomaly detector this way](/blog/2026/02/motor-anomaly-detector-ai/), the thing that changed was not the model's accuracy. It was that the people running the line could see what the model was looking at, wire its output to the control logic themselves, and update it through the same pipeline they use for everything else. That is not a convenience improvement. That is the difference between a model that gets maintained and a model that gets abandoned.

The same logic applies to the [FlowFuse Expert](/docs/user/expert/). OT engineers are not waiting for JavaScript fluency. They know the equipment; they know what they need the flow to do; they just get slowed down in the translation between that knowledge and working code. The Expert handles the boilerplate — autocompletes flows, generates function node logic from a plain-language description, explains what a set of nodes does in terms that make sense. It is not a general-purpose chatbot bolted onto an IDE. It was trained on Node-RED and FlowFuse specifically, which means it gives answers that work in industrial contexts rather than answers that look plausible until you try to run them. For teams where the backlog of integration work is longer than the list of people who can do it, that matters.

And then there is the part that breaks most programs before they get to ask any of these questions: operating at fleet scale.

One Node-RED instance, on one machine, managed by the person who set it up, is survivable. Ten devices across two facilities, or a hundred devices across a global operation, is a different problem. You need to push an update to a device on a production line in a facility in another country, and you need to know it landed correctly, and you need to be able to roll it back in under five minutes if it did not. You need to prove, to an auditor or a regulator, exactly which software version was running on which device at which moment. You need to be sure that when a device is decommissioned, its credentials are gone and its configuration is immediately invalidated.

None of that is possible with stock Node-RED. All of it is table stakes in a real manufacturing environment.

FlowFuse's [snapshot-based](/blog/2024/09/node-red-version-control-with-snapshots/) deployments give you a tested, versioned, rollback-capable pipeline for every device in your fleet. [Staged rollouts](/blog/2024/10/how-to-build-automate-devops-pipelines-node-red-deployments/) let you push to a test group first, validate behavior in real conditions, and then promote to production — the same discipline software engineering spent twenty years learning, now available to the people managing industrial edge infrastructure. [Role-based access control](/blog/2024/04/role-based-access-control-rbac-for-node-red-with-flowfuse/), [SSO integration](/blog/2024/07/how-to-setup-sso-saml-for-the-node-red/), and a complete audit trail are in the architecture, not added later when someone asks for them. In automotive, pharmaceutical, and food manufacturing, where you need to prove exactly which software version was running on which device at which moment, that audit trail is not a reporting feature. It is compliance infrastructure.

The manufacturers who escape pilot purgatory are not the ones with better models. They are the ones who decided, before the model was ever deployed, that the infrastructure was the product. The model is a feature. What makes the feature reliable, observable, and maintainable — across a fleet of heterogeneous devices, in real plants, over years — is everything underneath it.

FlowFuse is that infrastructure. Not because it is the most technically sophisticated platform available, but because it was built for the actual factory floor: the PLCs from three vendors, the historian nobody wants to touch, the protocols IT has never heard of, the OT engineers who know more about this equipment than anyone who might be hired to replace them. It meets the plant where it is. That is a harder design constraint than building for the idealized version.

The conference circuit will keep celebrating the 20%. The benchmark results, the accuracy curves, the inference speeds. That work matters. But it is not what separates the manufacturers generating real operational value from the ones still running the same pilot they started two years ago.

What separates them is the plumbing.

Build it on something that understands where you are starting from.

*If you are running Node-RED in production today, or trying to, FlowFuse is the operational layer that makes it scale. Device management, snapshot deployments, DevOps pipelines, ONNX-based AI inference, and the FlowFuse Expert to build faster, all built specifically for industrial environments. [Start a 14-day free trial today]({% include "sign-up-url.njk" %}). No abstractions. No greenfield assumptions. Just the infrastructure your plant actually needs.*
