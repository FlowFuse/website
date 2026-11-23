---
title: 'Build or Buy? The False Choice'
subtitle: What to standardize across sites, and where local fit matters
description: FlowFuse CEO Michael Davis on why build or buy is the wrong question for manufacturers, and how to decide what to standardize across sites and what to fit to each plant.
metaTitle: 'Build or Buy? The False Choice for Manufacturers'
date: '2026-11-19'
authors:
  - michael-davis
image: /blog/2026/11/images/build-vs-buy.png
tags:
  - posts
  - flowfuse
cta:
  type: sign-up
  title: Start with one result on one line
  description: Pick an operational result you want to improve, like downtime, scrap or throughput. We'll work with your team to deliver the first application on the systems you already run, and make it a starting point for your next site.
faq:
- question: "Who builds the application?"
  answer: "FlowFuse's forward deployed engineers build the first one with your team. They're FlowFuse engineers with industrial automation experience who work alongside your operations, IT and OT teams, connecting your machines and systems and setting up the integrations, data models and deployment patterns as they go. Before anything is built, you agree the scope together and how success will be measured."
- question: "Are we locked in to FlowFuse?"
  answer: "No. You own what's built. Everything runs in your FlowFuse environment, with full version history, so your team can change it, extend it and roll it out without waiting on FlowFuse. It's built on open-source Node-RED, so nothing is locked away."
- question: "Do we have to replace our existing systems?"
  answer: "No. FlowFuse connects to and extends your existing MES, ERP, SCADA, PLCs and other systems, without replacing them or changing your core platforms."
tldr:
  - Most manufacturers already buy and build. They run systems for core business and production needs, then connect or extend them where a workflow isn't covered.
  - The friction usually sits between systems, where information has to move or people re-enter it, not in the systems themselves.
  - Standardize how applications are deployed, secured, monitored, versioned and maintained, along with shared data definitions and integration patterns.
  - Fit applications to the operation where lines and plants differ, and make the first one a starting point for the next site.
---

Build or buy? It’s a question I hear often from manufacturing leaders. Standardize on a system, build what’s missing, or combine the two? An approach that works at one plant can be harder to repeat at the next. That’s why I think the more useful question is what to standardize and where local fit matters.

<!--more-->

Most manufacturers already do both. They buy systems that handle core business and production needs, then connect or extend them where the existing setup doesn’t cover a specific workflow. Across a manufacturer’s operations, that can mean ERP, MES, SCADA, historians, quality and maintenance systems, and PLCs from different vendors, often installed at different times.

The systems themselves aren’t necessarily the problem. They may each be doing the job they were selected to do. The friction shows up where information or work has to move between them, or where a process depends on people re-entering information or working around a gap.

The choice isn’t between buying a complete stack and building everything yourself. It’s deciding which capabilities should work consistently across sites, and which applications need to reflect local equipment and practices.

Some things benefit from a common approach: how applications are deployed, secured, monitored, versioned and maintained. Shared data definitions and reusable integration patterns can also make applications easier to support across sites. The details will vary, but teams shouldn’t have to solve the same lifecycle and governance problems from scratch at every plant.

Other things need to fit the operation. A workflow for escalating a quality issue, a view that helps a shift lead respond to a production delay, or an application that combines machine and order data may depend on how a particular line or plant works. Forcing every site into an identical process can create workarounds. Building each application as a one-off makes it harder to maintain and reuse.

Consider a line where machine data shows when equipment is idle, while the MES provides order context. Bringing those sources together can help supervisors distinguish idle time when no order is active from periods when work is scheduled but the line isn’t running. That doesn’t make every cause obvious, but it gives the team better information to investigate and act on.

The first implementation should also give the next site a useful starting point. That means capturing what can be reused, such as the application structure, data requirements, deployment approach and governance, while identifying what needs to change for the next line or plant. Reuse is valuable; assuming every site is identical isn’t.

This is the distinction we’re making at FlowFuse. The platform provides a consistent way to build, deploy and manage industrial applications. We work with the customer to deliver an initial application around an operational result, then establish patterns the customer can maintain, adapt and extend. The platform is the common foundation. The application fits the work.

So when someone asks whether they should build or buy, I’d start with three questions: What operational result needs to improve? What should be consistent across sites? And where do equipment, processes or existing systems call for a local approach?

That’s a more useful place to start than choosing a side.
