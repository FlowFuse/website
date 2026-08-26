---
metaTitle: "FlowFuse 3.0: Edge/Hub/Fleet, AI & Dashboard Themes"
title: "FlowFuse 3.0: Build, deploy, and govern — matched to how you run"
subtitle: "New FlowFuse products, new AI tooling, an updated Dashboard experience, and more"
description: "FlowFuse 3.0 introduces Edge, Hub, and Fleet for Node-RED, opens FlowFuse to your own AI agent, and ships new Node-RED Dashboard themes. The latest Node-RED news."
date: 2026-08-27
authors: ["jamie-strusz"]
image: /blog/2026/08/images/flowfuse-release-3-0.jpg
video: Q9KkSIp71Wg
tags:
   - flowfuse
   - news
   - releases
release: "3.0"
tldr: 
cta:
  type: demo
  title: Find out which FlowFuse product fits how you run
  description: Walk through Hub, Edge, and Fleet with our team and leave with the right fit for your deployment, not a generic tier.
---

FlowFuse exists to do one thing well: help teams build, deploy, and govern the operational applications that run their production. This goes from a single data center to every machine on the plant floor to thousands of devices in the field.

<!--more-->

FlowFuse 3.0 sharpens that promise. We reorganized the way you buy the platform around how you actually work, so the edition you run matches your use case and you get exactly what you need out of the box. We also made updates that move the build experience forward: faster app creation, more usable dashboard interface, and additional certified connectivity.

## Introducing FlowFuse Hub, Edge, and Fleet

### Which FlowFuse Product Should I Use?

Until now, picking the right FlowFuse setup meant reasoning about tiers. FlowFuse 3.0 replaces that with three clearly-positioned products, each built around a real deployment shape:

#### FlowFuse Hub: Integrate Enterprise Systems and APIs

[FlowFuse Hub](/product/hub/) is for IT teams. Integrate and orchestrate data across enterprise systems, APIs, and databases, with centralized governance.

Hub fits teams moving data between ERPs, databases, and cloud APIs, where the applications live in a data center rather than on a plant floor.

#### FlowFuse Edge: Connect PLCs and Machines Across Sites

[FlowFuse Edge](/product/edge/) is for OT teams. Deploy, manage, and scale industrial applications across sites, with certified industrial connectivity and centralized governance.

Edge fits teams connecting PLCs, machines, and systems, and businesses standardizing automation across multiple plants. Certified nodes ship with Edge, so the protocols your flows depend on come tested and supported rather than maintained by volunteers.

#### FlowFuse Fleet: Manage Node-RED on Distributed Devices

[FlowFuse Fleet](/product/fleet/) is for large IoT deployments. Run managed Node-RED across distributed field devices, with remote flow updates and fleet-wide visibility.

Fleet fits telemetry collection, distributed device deployments, and hardware and OEM partners shipping FlowFuse to their own customers. Where Edge gives you depth at each site, Fleet gives you reach across thousands of them.

It's the same strong platform underneath. The difference is which problem each one is tuned for — data center, manufacturing site, or a distributed fleet — so the path from "sign up" to "in production" is shorter for every team, making everything easier from POCs to prod and scaling.

Every product is enabled by FlowFuse Expert, and every product connects the AI agent you already use.

## Build: faster from idea to working application

FlowFuse 3.0 makes it easier to go from an idea to a working application, with new AI capabilities and a more intuitive dashboard experience. Describe what you want to build, and [FlowFuse Expert](/docs/user/expert/) helps assemble it.

### Connect Your Own AI Agent

Expert works through a set of tools on the FlowFuse MCP server. In 3.0, it stops being the only agent that can use them.

Add the FlowFuse MCP server to whichever AI agent you already use, sign in, and choose which teams it can reach and whether it has editing rights. Microsoft Copilot, ChatGPT, Claude and Gemini all connect this way, as does a local agent with MCP capabilities running any model. Command-line agents use the same address as well and all have access to the same tools as our integrated agent.

This way the AI your company already approved can be extended with FlowFuse and Node-RED, under the same governance you already have in place. The agent you are familiar with, now extended.

Tell it what you want to build and it will build it for you with what the platform offers including applications, hosted and remote instances, snapshots, mqtt brokers, tables, device groups, or the materials in your team library like custom nodes from submodules or blueprints. It will navigate your browser session to the Node-RED editor so it can build it out in front of you, read the debug output, and correct its own node configuration when needed. You stay in control, you can watch it happen and take over at any point.

Three things follow from that:

- **Company-sanctioned AI, unlocked.** Govern and secure agentic development and orchestration at scale.
- **Your agent, your setup.** Each engineer stays in the agent they already work in, next to their existing MCP servers and customizations.
- **One workflow.** FlowFuse platform operations and Node-RED flow editing become a natural extension of the AI workflow you already own leading you to more efficiently and effectively deliver results.

FlowFuse ensures control and enforces on every call what you granted: the teams, and read access or editing rights. Visual coding work runs in one of your own browser sessions making sure you have visibility and which ends when you close the tab. Every action lands in the audit log attributed to you and marked `via MCP`.

[Pick your agent on the AI page](/ai/) to get setup in three simple steps.

<video autoplay loop muted playsinline aria-label="Connecting an AI agent to FlowFuse over MCP, granting it a team and an access level, then asking it to set up an instance" width="1600" height="900" preload="none"><source src="./images/connect-your-own-ai-agent.webm" type="video/webm" /></video>
_Connect the agent you already use, grant it a team and an access level, and work with FlowFuse from there._

### What's new with FlowFuse Dashboard?

[FlowFuse's Dashboard](https://dashboard.flowfuse.com/) v1.31.0 delivers a round of UX and UI improvements — the low-friction fixes that make building and reading a dashboard feel obvious instead of fiddly. [Built-in themes for Node-RED Dashboard 2.0 lead the release](http://dashboard.flowfuse.com/nodes/config/ui-theme.html): predictable to edit, and every preset meets WCAG AA contrast, so dark mode stays legible. Charts render instead of leaving empty boxes. Tables show readable dates instead of raw epoch numbers. Plus a run of smaller UI fixes — labels and gauges that stay inside their cards, spacing that holds at narrow widths. Less setup. More dashboard.

<video autoplay loop muted playsinline aria-label="Node-RED Dashboard theme showcase, switching between Light, Dark, Dracula, Nord, and Sepia themes" width="1000" height="517" preload="none"><source src="./images/dashboard-theme-showcase.webm" type="video/webm" /></video>
_Five built-in themes, one dropdown, all meet WCAG AA contrast._

<video autoplay loop muted playsinline aria-label="Node-RED Dashboard table showing a date formats column rendering epoch values as readable dates" width="1000" height="571" preload="none"><source src="./images/dashboard-table-date-formats.webm" type="video/webm" /></video>
_Set the column type to Date, Time, or Datetime. Epoch values format themselves._

## Deploy: to the edge, at any scale

The Hub / Edge / Fleet split is, at its core, a deployment story. Whether your applications live in a data center, run per manufacturing site, or spread across thousands of small instances in the field, 3.0 gives you a product shaped for that reality rather than a one-size-fits-all tier. Deploying to the edge and scaling out stop being exceptions you work around and start being the default the product expects.

> ⚠️ **PLACEHOLDER — section pending.** Device Agent scope for 3.0 is still being finalized.

## Govern: centralized control wherever flows run

As soon as applications spread across sites and devices, the hard part shifts from building them to keeping them under control. Every 3.0 product carries centralized governance through the same lens — [role-based access control](/docs/user/role-based-access-control/), [audit logging](/docs/user/logs/#audit-log), and a single place to see and manage what's running — so extending to the edge doesn't mean giving up oversight. One team, one set of controls, whether you're running one instance or a fleet.

## How Do I Get Started With FlowFuse 3.0?

Explore the [product page](/product/) to decide if FlowFuse Edge, FlowFuse Hub, or FlowFuse Fleet is for you. FlowFuse 3.0 is live today on Cloud and Self-Hosted.

1. [Start a Free Trial of FlowFuse Edge](https://app.flowfuse.com/account/create): All OT teams can request a free 30-day trial immediately; if you're looking to try out FlowFuse Hub or FlowFuse Fleet, just [contact us](/contact-us/) and we'll make it happen.
2. See the full feature set and request [Pricing](/pricing/)
3. [Set up a demo](/book-demo/) to see all of these new features

> ⚠️ **PLACEHOLDER — pending confirmation.** Marketing/Product to confirm the final release date and add any self-hosted upgrade note; self-hosted requires the 3.0 release for the new license types.
