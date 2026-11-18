---
title: 'Build or Buy? Neither Answer Survives the Second Plant'
subtitle: Make two decisions instead, what every site should share and what each plant builds for itself
description: Build vs buy looks right at one plant and stalls at the second. FlowFuse CEO Michael Davis on what to standardize across sites and what to build per plant.
metaTitle: 'Build vs Buy: Why Neither Survives the Second Plant'
date: '2026-11-20'
authors:
  - michael-davis
image: /blog/2026/11/images/build-vs-buy.png
tags:
  - posts
  - flowfuse
cta:
  type: sign-up
  title: Start with one result on one line
  description: Pick a number you already track, like downtime, scrap or throughput. Our engineers will build the first solution with your team, on the systems you already run, and we'll make it the template for your next plant.
tldr:
  - Buying one suite means replacing systems that still work, and building everything depends on engineers most plants can't hire. Either way, the work rarely gets past the first site.
  - Make two decisions instead. Buy what should be the same at every site, such as security, the data model, deployment and connectors, and build only where plants differ.
  - Split this way, results come sooner, the first plant becomes the template for the next, and nothing gets ripped out.
  - Start from the result you need to move, in a number the business already tracks, such as downtime, scrap or throughput.
---

Build versus buy is one of the oldest arguments in industry, and I still hear it in almost every conversation I have with plant leaders. Standardize on a suite, or let your own team build what you need? Either answer can look right at one plant. Neither tends to survive the second. That's why I think it's the wrong question.

<!--more-->

## Why both roads stall

Walk any plant floor and count the vendors: ERP from one, [MES](/use-cases/mes/) from another, [SCADA](/use-cases/scada/) from a third, then a historian, a quality system, a maintenance system, and PLCs from whoever won the line contract a couple of decades ago. That isn't a mess waiting to be cleaned up. Each system was chosen by people who knew the job, and most of those systems still do it well.

Your plant doesn't need fewer systems. It needs the ones it has to work better together.

Buying one suite means asking the plant to give all of that up. The capital was spent years ago, and the people are trained on what's there. Every changeover puts production at risk, the improvement the plant actually wanted waits behind a migration, and much of the budget goes into replacing systems that already worked. And even after the switch, no suite covers the whole plant. As [LNS Research](https://blog.lnsresearch.com/the-ix-reference-architecture-evolves-for-the-journey-to-zero) puts it, *"So far, no single vendor has been able to deliver all the features most manufacturers need."*

Building everything fits your line, your process and your people, and I understand the pull. But it takes time, talent and money most manufacturers don't have to spare. In [Deloitte's 2025 smart manufacturing survey](https://www.deloitte.com/us/en/insights/industry/manufacturing/2025-smart-manufacturing-survey.html), around 70% of manufacturing executives said they struggle to hire the IT, OT and software people this work depends on. [What gets built tends to live in one or two heads](/blog/2026/03/bus-factory-problem-in-manufacturing/). When one of them moves on, the knowledge goes too, and an application that ran fine for three years becomes something nobody wants to touch. The improvement was real, but it depended on a person, not on anything the business owns.

Either way, the work rarely makes it past the first site. A [2026 survey by Rockwell Automation](https://www.rockwellautomation.com/en-be/company/news/press-releases/mes-scaling-report.html) of more than 1,500 manufacturing decision-makers puts a number on it: 93% have an MES running in at least one plant, but only 28% have rolled it out across all of their plants. Rockwell sells MES, so read that with some care, but the gap matches what I see.

## Split the decision

The way out is to stop treating it as one decision and make two: what to standardize across every site, and what to build plant by plant. Both start from the same place: the result the business needs, in a number it already tracks, such as downtime, scrap or throughput.

Buy what should be the same at every site: security, a [shared data model](/use-cases/uns/), how applications are deployed and updated, how they're managed and governed, and the connectors to the equipment and systems you already own. Nobody gains anything by building those differently at every plant.

Buying the foundation is still a vendor decision, and a skeptical leader should treat it as one. The test I'd use is simple: it should connect to what you already run rather than replace it, it should be built on [open technology](/node-red/) your own people can work with, and you should be able to walk away without losing what you built on it. Otherwise you've just traded one dependency for another.

Build where plants differ and your systems leave a gap: the operator app on one line, the workflow that gets a quality issue to maintenance without retyping, the dashboard a shift lead actually uses. We call these operational gaps. Your MES or SCADA does some things really well and was never designed for others.

One production IT lead told me about a plant where the MES calculated OEE well enough, but nobody could say [why a machine sat idle](/blog/2026/07/build-downtime-logger/), because operators didn't want to stop and log a reason. His team built a small application that combined order data from the MES with signals from the machines, so an idle machine showed whether it was waiting for an order or for an operator. The MES stayed exactly where it was; the team just filled the gap it left, and the plant finally knew which of its downtime was a planning problem and which was a staffing one. That's where building earns its cost, because that's where fit matters. If you have a gap like that on one of your lines, [we'd like to hear about it](/book-demo/).

## What plant leaders get

When you split it this way, a few things change. And they happen to be the things plant leaders were asking for in the first place.

1. **You see results sooner.** The shared layer is already in place, so your team only builds the piece that's missing, and you measure it against a number you already care about. The first improvement can go live without waiting on a long platform project.
2. **What works at one plant works at the next.** Every site runs on the same base, so the first plant becomes the template and the next one doesn't start from scratch. Each rollout costs less and carries less risk than the one before. Benjamin Johnson, who runs digital operations at Henkel Adhesive Technologies, [said it well](https://www.frontier-enterprise.com/when-standardisation-creates-trade-offs-at-henkel/): "Platforms that allow sites to use digital and data within a governed framework tend to scale more quickly."
3. **You're not betting on one engineer.** Everything is built and deployed the same way at every site, so it doesn't live in one person's head. Your team can pick it up, change it and take it to the next plant.
4. **Nothing gets ripped out.** Keep the core systems and build around them. No migration, no production put at risk, and no budget spent rebuilding what already works. The money goes into improvements on the line instead of into replacing systems that were doing their job.

## Doing both halves

Most leaders I talk to agree with the split. Where they get stuck is the build half. The foundation can be bought, but building on it takes people who understand the line, and those people are already busy keeping it running.

We had to face that at FlowFuse too. For years we supplied the foundation and left the building to our customers. Some built remarkable things. Many more ran into the same wall, and told us so.

So we [changed how we work](/build-with-us/), and today we take on both halves with our customers. We agree the result before anything gets built, in a number the business already tracks. Then our engineers work alongside the plant team to close the first gaps, and build them so the next site can start from there. The customer owns what we build together, and the systems they already run stay where they are.

That's why, when someone asks me whether to build or buy, I don't pick a side. I ask three questions instead. What result are you trying to move? What should be the same at every one of your sites? And what makes each plant its own?

Start there. Build versus buy gets a lot easier after that.
