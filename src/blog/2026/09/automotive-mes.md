---
title: "Automotive MES: Buy, Build, or Extend What You Have"
metaTitle: "Automotive MES Guide: Buy, Build, or Extend What You Have"
description: "Automotive MES: should you buy, build, or extend it? See how FlowFuse helps multi-site manufacturers close automotive MES gaps without a costly full rebuild."
date: 2026-09-18
authors: ["joyce"]
tags:
  - flowfuse
tldr:
  - "Off-The-Shelf And Custom MES Both Leave Plant-Specific Gaps: Most automotive manufacturers don't fail on routing and dispatch; they fail on the plant-specific quality gates, genealogy, and downtime coding that off-the-shelf and custom-built MES both leave for each site to configure."
  - "Buying Is Fast To Start, Building Only Pays Off If You'll Maintain It: Buying gets routing, dispatch, and error-proofing running fast, but quality gates and genealogy still take months to configure on top. Building only pays off for a differentiated process with a team in place to maintain it."
  - "Extending Closes The Gap Without Replacing What Already Works: Extending is usually fastest when the core MES already works, and the real gaps are quality gates, genealogy, and downtime standardization, without replacing anything running the plant."
meta:
  faq:
    - question: "What does MES stand for, and what does it actually do on an automotive line?"
      answer: "MES stands for Manufacturing Execution System. It sits between ERP, which plans production over days and weeks, and SCADA, which collects real-time data from the PLCs controlling the equipment. MES dispatches the plan and tracks execution as production happens. On an automotive line, that means station sequencing, torque and part checks, and genealogy capture for every serialized unit."
    - question: "What's the difference between a modular MES and a traditional monolithic one?"
      answer: "A monolithic MES ships as one tightly coupled platform, so changing any capability means touching the whole system. A modular MES breaks capabilities into pieces that change independently, making it faster to adapt as requirements change."
    - question: "Is there an MES made specifically for automotive manufacturing?"
      answer: "Not as a distinct product category. MES platforms are horizontal, enterprise-wide systems used across automotive, pharma, food and beverage, and electronics alike, not vertical-specific products with a separate automotive SKU. Vendors like Siemens and Rockwell sell general-purpose MES platforms that automotive plants configure to their own quality and traceability requirements, rather than an automotive-only MES. That's part of why extending or customizing an existing platform for automotive-specific needs is usually the more practical path."
    - question: "Does FlowFuse replace an existing MES?"
      answer: "No. FlowFuse connects to and extends an MES, ERP, or SCADA system already running. It adds plant-specific configuration, most often quality gate enforcement and genealogy capture, that a packaged MES leaves for each site to build alone."
    - question: "What is a control plan, and how does it relate to an MES quality gate?"
      answer: "A control plan defines what gets measured at each step, the specification limits that apply, the control method used, and the reaction plan when a measurement falls out of specification. Quality engineering develops it during APQP, and it goes to the customer for approval as one of the PPAP submission elements. An MES quality gate enforces it, holding the station or routing the part when a rule trips."
    - question: "What is genealogy in automotive manufacturing?"
      answer: "Genealogy tracks which component lots and serial numbers went into a unit, captured at the station where each was consumed. IATF 16949 clause 8.5.2.1 is what makes it mandatory, requiring identification and traceability across the production process."
    - question: "What is poka-yoke, and how does it relate to routing?"
      answer: "Poka-yoke is error-proofing built into a step. Prevention devices make the mistake impossible, like a fixture that only accepts the correct part. Detection devices catch it immediately instead, like a scan that flags a wrong component before the operator moves on. Routing logic is itself a form of prevention: a station can't proceed until the prior operation is complete."
---

## What Automotive MES Actually Does

A Manufacturing Execution System (MES) sits between two systems every plant already runs. ERP plans production at the scale of days and weeks: what to build, how much, by when. SCADA supervises the equipment below it, collecting tag data from PLCs in real time. MES is the layer in between, taking the ERP plan, dispatching it as work orders, and tracking execution as it happens.

<!--more-->

### From Monolithic MES to Modular MES

For most of MES's history, the entire stack shipped as one tightly coupled platform (hence the term ‘monolith’). Changing any piece meant touching the whole system: a vendor engagement and months of lead time for custom configurations.

That model is breaking down for the same reason why automotive plants are hard to standardize in the first place. Every plant, product line, and OEM contract has its own quality requirements, downtime taxonomy, and mix of legacy equipment. The industry's response has been a shift toward modular, composable MES architecture that breaks routing, quality, genealogy, and downtime tracking into pieces that can be built or replaced independently. Extending an existing MES, the third option here, is that same shift applied to a plant that already has a working MES and no interest in replacing it just to get modularity.

## Why Automotive Manufacturing Makes MES Decisions Harder

Automotive manufacturing carries more accumulated technical debt than most manufacturing environments, and it's structural, not incidental. Equipment spans decades, so a single line can mix PLCs from different vendors and eras never built to talk to each other. Plants added through M&A bring their own MES instances, ERP configurations, and naming conventions with them. Every integration is custom and manual, usually an integrator writing point-to-point code for one connection at one plant that nobody else can safely touch, and when that engineer leaves, it's a real risk.

None of this is unique to any specific manufacturer. It's the normal condition of any automotive manufacturer or supplier, and it's exactly why a corporate rollout can't assume one MES configuration fits every site.

## The Real Decision: Buy, Build, or Extend

### When Buying an Off-the-Shelf MES Is Right

An off-the-shelf MES is the fastest path to solid routing, dispatch, and out-of-box error-proofing. It's right when a plant runs a standardized process, has no system yet, and needs core execution running quickly. Cost varies a lot by architecture and market: on-premise systems typically run $120,000 to $600,000 upfront, plus around 20% of license cost annually in maintenance, with six to eighteen months before going live, while cloud-native platforms start in the low thousands per month ([Symestic, 2026](https://www.symestic.com/en-us/blog/mes-system-prices-2026)). In the UK, a cloud MES typically runs £6,000 to £15,000 a year with a 90-day go-live, against £75,000 to £150,000 to implement on-premise and three-year totals of £120,000 to £450,000 ([TotalControlPro, 2025](https://totalcontrolpro.com/guides/the-end-of-the-production-black-box-how-much-does-a-modern-mes-really-cost/)).

There are plenty of strong MES platforms on the market, from comprehensive systems like [Siemens Opcenter Execution](https://www.siemens.com/en-us/products/opcenter/execution/) and [Rockwell's Plex](https://www.rockwellautomation.com/en-us/products/software/factorytalk/operationsuite/mes/plex-mes.html), to composable, build-your-own-app platforms like [Tulip](https://tulip.co/). Manufacturers running these don't need to rip them out to close the gaps this blog covers. In practice, manufacturers have implemented FlowFuse alongside deployments like these to extend their functionality, which is what the next option is about.

<!-- TODO: inline image from Yndira -->

### When Building a Custom MES Is Right

Building makes sense when a process is differentiated enough that no off-the-shelf platform fits it, and the organization has the capacity to own it long term, not just ship it once. The trade-off is real: a custom build competes with the IT roadmap for a year or more, and every future change depends on that same team staying in place. Hexagon Manufacturing Intelligence took this route, building its own Smart Factory Manager rather than buying off-the-shelf, after concluding the fit and long-term ownership were worth the investment ([IndustryWeek, 2025](https://www.industryweek.com/technology-and-iiot/video/55296538/build-or-buy-your-mes-lessons-from-hexagon-manufacturing-intelligence)).

### When Extending Your Existing MES Is The Right Move

Extending is right when the core MES already works, and the actual gaps are plant-specific: a quality gate that enforces a specific [control plan](/blog/2026/08/control-plans/), a genealogy structure that satisfies a specific OEM's [safe launch requirements](/blog/2026/08/safe-launch/), a downtime taxonomy that matches how a plant fails. Those are the pieces that get patched together in scripts and spreadsheets when nobody builds them properly, and what a modular extension layer standardizes.

This is where FlowFuse fits, and it's worth being direct: FlowFuse is not an [MES](/use-cases/mes/), and it doesn't compete with the one already running the plant. It's an application layer that connects to [MES](/blog/2025/06/what-is-mes/), [ERP](/landing/enterprise-integration/), and [SCADA](/use-cases/scada/) systems already in place and makes them more configurable at the plant level.

It's also worth naming a fact that shapes this whole decision: to our knowledge, no vendor sells an MES built and sold specifically as an automotive-only product. MES platforms are horizontal, enterprise-wide systems used across automotive, pharma, food and beverage, and electronics alike, not vertical-specific products with a separate automotive SKU. That's why customizing your existing MES is often the more practical path:

- Capturing torque measurements across the chassis line with poka-yoke checks that stop the station before a bad fastener moves downstream, then standardizing that application for other lines like powertrain.

- Measuring operator productivity at one plant and rolling that application out across all sites so data flows into a standard dashboard without manual reconciliation.

- Automating genealogy capture, binding component lots to serial numbers, for one vehicle program, then extending that logic to additional programs or plants instead of running a custom integration project each time.

- Adding real-time quality gate enforcement, control plan limits with automatic hold-and-containment, to a line where the base MES configuration lacks it, then standardizing that pattern across other lines and plants building for the same OEM, even though each site submits its own PPAP per part number.

## Where the Gaps Are, and What Extension Needs to Cover

Routing and dispatch are the core of what a packaged MES sells, and an extension layer doesn't need to touch that logic. FlowFuse supports [IT/OT connectivity](/use-cases/it-ot-middleware/) that layers on top of existing MES routing, adding what a packaged system leaves as a gap.

The gaps themselves cluster into two categories: quality gate enforcement (capturing a measurement, holding the station when a control-plan rule trips, routing the part to containment, and logging it against the serial number) and standardization across sites (a shared downtime taxonomy and genealogy captured at the point of consumption, so a reason code or a build record means the same thing at every plant). Unplanned downtime alone costs industrial manufacturers an estimated $50 billion annually ([Forbes Technology Council, 2022](https://www.forbes.com/councils/forbestechcouncil/2022/02/22/unplanned-downtime-costs-more-than-you-think/)), and without standardization, a recall investigation ends up tracing the same defect to a shift's production at one plant and specific serial numbers at another.

## Final Thoughts

So where do we go from here? It honestly depends on how fast you want to see results and the availability of your existing resources.

If the core MES is good, a manufacturer can use FlowFuse to extend its existing capabilities rather than replace it, closing the quality gate, genealogy, and downtime gaps most vendors leave for each plant to solve on its own. FlowFuse gives IT and operations teams a way to build custom applications, [starting small and expanding from there](/blog/2026/05/manufacturing-software-built-in-stages/), instead of reconfiguring the same enforcement at every site. It's part of FlowFuse's broader [automotive manufacturing solutions](/industries/automotive/), used by 30+ automotive manufacturers in 20 countries.

## Sources

- Forbes Technology Council. (2022). ["Unplanned downtime costs more than you think."](https://www.forbes.com/councils/forbestechcouncil/2022/02/22/unplanned-downtime-costs-more-than-you-think/)
- Symestic. (2026). ["MES System Prices 2026: Cost Comparison, TCO & ROI."](https://www.symestic.com/en-us/blog/mes-system-prices-2026)
- TotalControlPro. (2025). ["The End of the Production Black Box: How Much Does a Modern MES Really Cost?"](https://totalcontrolpro.com/guides/the-end-of-the-production-black-box-how-much-does-a-modern-mes-really-cost/)
- IndustryWeek. (2025). ["Build or Buy Your MES? Lessons from Hexagon Manufacturing Intelligence."](https://www.industryweek.com/technology-and-iiot/video/55296538/build-or-buy-your-mes-lessons-from-hexagon-manufacturing-intelligence)