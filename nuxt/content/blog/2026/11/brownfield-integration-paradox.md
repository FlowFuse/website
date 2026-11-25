---
title: The Brownfield Integration Paradox
subtitle: Keeping your equipment was the right call. The unmanaged connections around it are becoming the new legacy.
metaTitle: Brownfield IT/OT Integration Without Rip and Replace
description: Avoiding rip and replace was the right call. Here's how unmanaged integrations become the next legacy problem in brownfield plants, and how to fix it.
date: 2026-11-25
authors:
  - sumit-shinde
tags:
  - posts
  - flowfuse
tldr:
  - Keeping legacy equipment is usually the right decision. The connections added around it, one local fix at a time, become a legacy problem of their own.
  - "The cost lands outside engineering: pilots that don't scale, security blind spots, license spend nobody can see, knowledge held by one or two people, and plants that can't be compared."
  - Don't replace everything again. Build new integration work on one shared platform, prove it on one line, then reuse it at the next site.
meta:
  faq:
    - question: "What is brownfield IT/OT integration?"
      answer: "Brownfield integration means connecting the equipment and systems a plant already runs, such as PLCs, SCADA, MES and ERP, instead of building a new site from scratch. The goal is to [get data moving between them](/use-cases/data-integration/) without replacing machines that still do their job."
    - question: "How can I tell if integration sprawl is already a problem?"
      answer: "Ask three questions. Can anyone list every integration running across your plants? Does each one have more than one person who can maintain it? Do license renewals come with a clear picture of who uses what? If any answer is no, the sprawl has started."
    - question: "Can FlowFuse connect to older PLCs and serial-only machines?"
      answer: "Yes. Node-RED supports [industrial protocols](/docs/flowfuse-nodes/edge/) such as Modbus, OPC UA, Siemens S7 and EtherNet/IP, and it can read serial devices directly. For older machines, this usually means connecting to what is already there rather than upgrading the controller."
    - question: "Can FlowFuse run on our own infrastructure?"
      answer: "Yes. FlowFuse is available as a managed cloud service or [self-hosted on your own servers](/docs/install/introduction/) with Docker or Kubernetes. Either way, applications at the plant run on local hardware through the [FlowFuse device agent](/platform/device-agent/)."
---

"Every license renewal is a surprise."

One industrial manufacturer summed up its plant-floor integrations that way. When they looked closely, they found more than 70 connectivity deployments across 11 plants, brought in by different departments. Nobody had the full picture. "Anybody can buy it and deploy it," they told us.

Like most manufacturers, they had kept their 20-year-old PLCs and SCADA systems and connected them instead of replacing them. That saved them downtime and an expensive rebuild. But the connections grew one local decision at a time, with no plan for how they fit together.

That's the brownfield integration paradox. Keeping the equipment was right. The connections around it have become a legacy problem of their own.

<!--more-->

## How it happens, and what it costs

In the companies we talk to, it usually comes down to three things.

Engineers fix problems where they find them. A semiconductor research organization put it bluntly: "If we don't provide it, they will find another way." Its engineers had attached small computers to cleanroom tools worth millions. Each workaround solves the problem in front of someone. Each one also adds another device, another connection and another thing security can't see.

Acquisitions bring their own systems. A packaging manufacturer with more than 20 sites and four ERP systems described what years of deals left behind: "Everybody's got their own little thing, their own little knowledge base." Its machines range from modern Ethernet equipment to what the team calls "dinosaur machines" that only talk over serial.

New lines arrive next to old ones. A global engine maker has plants that, in its words, "run as they were running in the 90s," sitting alongside lines bought in the last few years. With no common standard, every new line adds one more way of doing things.

The bill shows up well outside engineering:

- **Pilots don't scale.** What works on one line gets rebuilt for every other site. As one operations engineer said, "There's a lot of stuff I have to do 16 times."
- **Security can't see what's running, and what it does find gets pulled.** At one global automaker, plant-floor software that hasn't passed cyber review is "shut down immediately," even if a line depends on it.
- **License costs pile up.** Departments keep renewing tools because nobody knows what's still in use, who relies on it or what's safe to cancel.
- **Knowledge gets stuck with a few people.** One pipe manufacturer relies on two engineers to support more than a dozen plants. Another operator told us, "I'm the only guy that knows how to use this and maintain it."
- **Plants can't be compared.** The engine maker found its plants define OEE differently, collect different raw data and calculate it in different ways.

A quick way to check whether this is already happening: Can anyone list every integration running across your plants? Does each one have more than one person who can maintain it? Do license renewals come with a clear picture of who uses what? If any answer is no, the sprawl has started.

## Why replacing everything again doesn't work

The usual response is a consolidation program: pick one big system, move every integration onto it and switch the old ones off. In practice, it's rip and replace aimed at a different layer. Every working connection has to be rebuilt and retested. Lines are disrupted at cutover. The program runs for years, and when it's done, everything depends on one central system.

It also misses why these integrations exist in the first place. Plant teams built them because they needed answers quickly and nobody gave them a better option. Take that speed away and they'll work around the new system, and the sprawl starts again.

That doesn't mean every integration should stay where it is. The difference is pace. Move integrations one at a time, when there's already a reason to touch them, and keep plant teams able to build what they need quickly. Done that way, consolidation happens gradually, without a cutover.

## What to do instead

The better approach is less dramatic. Leave the PLCs, SCADA, MES and ERP systems doing their jobs. What changes is how new IT/OT integrations get built: on one shared platform, to one standard, instead of every department bringing its own scripts and licenses.

Whatever you build it on, a shared integration layer needs six things:

- **One standard.** An application built for one plant runs at another with configuration changes, not a rebuild.
- **Visible.** IT and security can see every application, version and change in one place.
- **Readable.** Someone other than the author can understand and maintain it.
- **Deployable from one place.** New versions go out to sites through a controlled release process.
- **Local.** Applications run at the plant, so production doesn't depend on a network link.
- **Open.** Applications are stored in an open format, so you don't trade many small lock-ins for one big one.

FlowFuse is built with all six in mind. It gives plants [one place to build, run and manage the applications that connect their systems](/use-cases/it-ot-middleware/), across every site, without touching the equipment or production systems underneath.

If you've been following [Unified Namespace (UNS)](/use-cases/uns/), this is the same goal approached from a different side. A UNS gives every system one shared, structured place to publish and read data, usually an MQTT broker with topics organized by site, area and line. It standardizes where data lives. It doesn't build the connections that pull data from a 20-year-old PLC, or the applications that act on that data, and those still need one shared way to be built and managed. FlowFuse includes an MQTT broker, so teams can build the UNS and the flows that feed and use it on the same platform.

Most manufacturers will push back here, and they should. Their plants already run more tools than anyone can track. As one manufacturer told us, "I can't introduce something else without removing something." It's a fair test. FlowFuse is one more tool on day one, so the real test is whether the total goes down after that. The scripts, one-off licenses, custom code and spreadsheets doing integration work today move onto it over time, as each one needs changing or comes up for renewal, and the number of tools goes down.

It also changes who can do the work. A lot of plant integration today lives in code only its author can read. FlowFuse is built on Node-RED, so applications are visual flows a controls engineer can follow without being a software developer. [FlowFuse Expert](/ai/), the AI built into the platform, can build a flow from a plain-language description and explain how an existing one works. An engineer who inherits an application from a colleague who has moved on doesn't start from zero.

Teams don't have to do the first one alone. Your team builds the first application with ours, with FlowFuse's forward deployed engineers helping pick a starting point and agree on what success looks like. That could mean less downtime, faster changeovers or production data people trust. The goal is for the plant team to own it quickly, not to swap one dependency for another.

Once the first application works, the costs from earlier start coming down:

- **Pilots scale.** A proven application goes out to other sites through [controlled pipelines](/docs/user/devops-pipelines/), and local differences are handled in configuration instead of a rebuild. Work that used to be built 16 times gets built once and deployed 16 times.
- **Plants become comparable.** When every site runs [the same OEE application](/blueprints/manufacturing/oee-dashboard/), reading the same data and calculating it the same way, the numbers mean the same thing.
- **Security can see what's running.** One team sees every application at every site, with every change recorded and easy to roll back. Connections start from inside the plant, so [no inbound firewall ports need to open](/platform/security/).
- **License spend becomes visible.** More of the work runs on one platform you can see, and overlapping tools come off as their renewals come up.

Applications run locally at the plant, so production keeps going if the connection to the central platform drops. And because FlowFuse is built on [open-source Node-RED](/node-red/), your applications aren't locked into a proprietary format.

## Moving what's already there

Existing integrations don't need to move all at once. Start by writing down what's running, what it connects, who maintains it and what depends on it. Leave stable integrations alone. When a script or custom connection needs a substantial change anyway, rebuild it on the shared platform. Retire overlapping tools when their licenses come up for renewal.

Decide early who owns the shared platform. IT usually owns the network and security rules, and OT owns the equipment and the knowledge of how it behaves. Integration sits between the two, which is why it so often ends up owned by nobody. A common split is for a small central team to own the platform, the standards and the reusable building blocks, while plant engineers build and maintain the applications for their own site within those standards. Security then reviews one platform instead of every script.

Software teams call this the strangler fig pattern. The new layer grows around the old connections and takes over their work piece by piece, until they can be switched off without a big-bang cutover.

Start small: one production line, one application, one result that matters. Prove it, then take what you learned to the next site. One manufacturer started with a team of four. It now runs its applications across 19 sites and more than 500 installations.

Keep the equipment that still runs. Change how the integrations around it are built and owned, so they don't become the next thing you have to replace.

Not sure how many integrations are running across your plants? Start there. [Talk to our team](/contact-us/).
