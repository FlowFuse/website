---
title: 'IT vs. OT: Who Actually Owns the Edge?'
navTitle: 'IT vs. OT: Who Actually Owns the Edge?'
---

Ask IT who owns the edge. They'll say they do. Ask OT the same question. Same answer. That's the problem.

<!--more-->

Both teams are wrong, and both teams are right. IT has the infrastructure discipline. OT has the operational knowledge. Neither has both, and the edge demands both. Until that tension gets resolved, deployments stall, workarounds multiply, and the line goes down at the worst possible moment while everyone figures out whose problem it is.

Edge ownership is genuinely uncomfortable to assign. It sits at the intersection of two teams with different mandates, different definitions of risk, and different answers to the same question: what does reliable actually mean here?

IT measures reliability in uptime percentages and patch cycles. OT measures it in whether the line ran today. Those are not the same thing, and pretending they are is where most edge governance conversations go wrong.

When the gateway goes down mid-shift and production stops, the finger points both ways simultaneously. IT says OT bypassed change management. OT says IT pushed an update without understanding what it would touch. Both are describing something that actually happened. Neither is wrong. And the line is still down.

That is not a technology problem. It is an ownership problem, and it is the single most expensive undocumented decision sitting inside your operation right now.

## IT can't own it alone

IT has the tools. The security frameworks, the patch management systems, the monitoring dashboards, the change control processes built over decades of managing distributed infrastructure. On paper, the edge is just another set of networked devices. IT knows how to manage networked devices.

The problem is what those devices are connected to.

A patch cycle that makes perfect sense for a corporate laptop makes no sense for a controller managing a filling line running three shifts. A maintenance window that costs IT nothing costs operations everything if it lands at the wrong moment. A security policy that locks down remote access protects the network and blinds the engineer who needs to diagnose a fault before the next shift starts.

IT optimizes for the network. That is their job and they are right to do it. But the edge isn't just network infrastructure. It's network infrastructure with a production line on the other end, and the consequences of getting it wrong are measured in stopped lines, missed shipments, and conversations with plant managers that nobody wants to have.

IT doesn't feel those consequences directly. OT does. And that asymmetry is why handing the edge entirely to IT always creates friction, always generates workarounds, and always ends with OT quietly building something on the side that IT doesn't know about.

## OT can't own it alone

OT understands the process. The equipment, the tolerances, the consequences of a bad decision at the wrong moment. They know which devices are critical, which lines can absorb disruption and which cannot, what reliable actually means when a machine has been running the same cycle for eleven years.

That knowledge is irreplaceable. It is also dangerously concentrated.

Most OT teams are not resourced to manage networked infrastructure at scale. They were built to keep production running, not to maintain firmware inventories, respond to CVEs, or architect secure remote access across fifty edge devices spread across three facilities. One engineer built the system. That engineer knows it. Nobody else does.

This works until it doesn't. A device gets compromised because nobody was tracking the patch state. A configuration change breaks something upstream and the only person who understands the dependency is on leave. A new facility comes online and the same system gets replicated by hand, slightly differently each time, by someone working from memory.

OT ownership without IT discipline doesn't produce reliable infrastructure. It produces infrastructure that runs reliably right up until the moment it doesn't, and when it fails, it fails in ways that are hard to diagnose, hard to fix, and impossible to hand off cleanly.

The edge needs OT's knowledge of consequence. It also needs IT's discipline around management. Neither team has both. That is not a criticism of either. It is just the reality of how these organizations were built, and what the edge actually demands.

## What actually happens when neither owns it

Nobody makes a decision to leave the edge ungoverned. It happens gradually, through a series of reasonable choices made by people under pressure.

A project needs to move. Someone from OT builds the integration because they understand the equipment. IT isn't involved because the timeline doesn't allow for a full security review. The deployment goes live. It works. Everyone moves on to the next thing.

Six months later that device is running firmware nobody has updated. The engineer who built it has moved to a different project. The documentation lives in a shared drive folder that hasn't been opened since the go-live. When something breaks, the first hour is spent figuring out what the system even does.

Multiply that across five deployments. Ten. Twenty. Facilities added over years, each one slightly different, each one carrying the assumptions and shortcuts of whoever built it at the time. No common tooling. No shared visibility. No way to answer the question that every operations director eventually asks: what is actually running out there, and is it safe?

This is not a hypothetical. It is the current state of edge infrastructure in most manufacturing organizations, not because people were negligent, but because the ownership question was never answered clearly enough to prevent it.

The cost is not just operational. It is strategic. Every ungoverned device is a constraint on what you can do next. You cannot scale what you cannot see. You cannot secure what nobody owns. And you cannot build the next layer of capability on top of infrastructure that exists, in any meaningful sense, only in one person's memory.

## What shared ownership actually looks like

Shared ownership is not a committee. It is not a cross-functional task force that meets monthly and produces a governance document nobody reads. Those things exist in organizations where the ownership question got escalated instead of answered.

Real shared ownership starts with accepting that IT and OT are not fighting over the same thing. They have different jobs at the edge and the jobs are genuinely complementary. IT owns the infrastructure layer: security, patch state, remote access, monitoring, compliance. OT owns the operational layer: what runs, when it runs, what it touches, what the consequences of changing it are. The seam between those two layers is where decisions get made together, not where one team overrules the other.

In practice this means a few concrete things.

Change management that understands production schedules. Not IT's change window imposed on OT's environment, but a shared process that routes decisions through the people who feel the consequences of getting them wrong.

Visibility that both sides can read. IT needs to know patch state, connection status, security posture. OT needs to know what changed, when, and whether it affected anything downstream. These are not the same dashboard but they need to come from the same system.

Clear escalation lines for the decisions that genuinely require both. Not every edge decision needs a joint conversation. Most don't. But the ones that do, such as a forced update on a critical controller, a new device on the production network, or a remote access policy that affects fault response time, need a process that doesn't depend on whoever happens to be in the room that day.

None of this requires a reorganization. It requires an honest conversation about where the current model breaks down and what it would take to fix the specific breaks, not the whole system at once.

## The edge needs a platform both sides can trust

Most of the governance problems described above are made worse by tooling that was built for one side of the organization and tolerated by the other.

IT deploys a device management platform designed for corporate infrastructure. OT works around it because it doesn't understand production constraints. OT builds flows in a standalone [Node-RED](/node-red/) instance nobody else can see. IT flags it as an unmanaged asset. Both are doing the rational thing given what they have.

The tooling shapes the behavior. If the platform forces a choice between IT visibility and OT autonomy, organizations will keep making that choice badly, sometimes defaulting to IT control and generating workarounds, sometimes defaulting to OT autonomy and generating risk.

What the edge actually needs is a platform that doesn't force that choice. One where IT can see patch state, manage access, enforce security policy, and audit what changed and when, without touching the operational logic that OT built and depends on. And where OT can deploy, modify, and operate flows on their own schedule, within guardrails that IT set and both sides agreed to.

That is what [FlowFuse](/) is built for. Node-RED runs on the factory floor under OT's operational constraints. FlowFuse wraps it with the management layer IT requires: [role-based access control](/docs/user/role-based-access-control/), [DevOps pipelines](/docs/user/devops-pipelines/), [snapshots](/docs/user/snapshots/), [audit trails](/docs/user/logs/), [centralized visibility](/blog/2024/10/managing-node-red-instances-in-centralize-platfrom/) across every device in the fleet. Neither team has to compromise what they actually need. The seam gets managed instead of argued over.

The ownership question doesn't go away. But with the right platform underneath it, it becomes a conversation both sides can have without the tooling making it harder.
