---
title: "Containment Action and Controlled Shipping: Surviving CS1 and CS2"
metaTitle: "Containment Action Guide for Surviving CS1 and CS2"
description: "Learn what triggers CS1 and CS2 status, and see how FlowFuse helps build a containment action that holds up under audit and survives customer scrutiny."
date: 2026-08-28
authors: ["sumit-shinde"]
image: /blog/2026/08/images/containment-action-guide.png
tags:
  - flowfuse
tldr:
  - "Containment Triggers: CS1 and CS2 are escalations, not automatic responses to a single defect. They follow severity, repeat issues, stop-ship events, or an inadequate response to an earlier corrective action request."
  - "Documentation Under Scrutiny: A containment plan only holds up if inspection points, sign-offs, and results are tracked consistently across every site and shift, not just on paper after the fact."
  - "Root Cause to Release: Exiting CS1 or CS2 permanently requires connecting containment data to a documented root cause fix and proving consistency across a sustained, defect-free run."
meta:
  faq:
    - question: "What is the difference between CS1 and CS2 status?"
      answer: "CS1 requires the supplier to add its own inspection layer before shipment. CS2 keeps that layer in place and adds an independent third party to verify it, paid for by the supplier."
    - question: "How long does controlled shipping typically last?"
      answer: "The calendar duration varies, but the criteria usually don't. Most OEMs publish exit requirements in their customer-specific requirements, typically a defined number of consecutive clean shipments or production days."
    - question: "What documentation do auditors expect during a containment action?"
      answer: "A clear record of what was inspected, how often, by whom, and the results for every unit shipped, kept consistent across every shift and site. Most OEMs also require daily reporting in their own specified format."
    - question: "Can a supplier request early release from controlled shipping?"
      answer: "Yes, but only with data showing the root cause was corrected, not just contained. Passing inspections alone rarely justifies early release."
    - question: "What is the financial impact of CS2 status?"
      answer: "The supplier pays for third-party inspection on every shipment and is typically charged back for sorting and rework at the customer plant. Unresolved status can also lead to new business hold, which blocks quoting on future programs."
    - question: "Does controlled shipping apply to a single line or an entire plant?"
      answer: "Usually just the specific part number and line where the defect occurred, though scope can expand if the defect appears elsewhere."
    - question: "What happens if a supplier fails to maintain containment consistently?"
      answer: "Missed inspections or documentation gaps can extend the CS1 or CS2 timeline, escalate status, and damage trust with the automaker's quality team."
cta:
  type: demo
  title: "Build containment you can prove"
  description: "Talk to us about connecting inspection data, sign-offs, and root cause tracking so your containment action holds up across every site."
---

*A containment action is the set of temporary measures a supplier puts in place to stop a known defect from reaching the customer while the root cause is still under investigation.* Extra inspection, quarantined stock, tightened sign-offs: anything that guarantees what ships is clean, even if the process producing it is not yet fixed.

<!--more-->

Controlled shipping is what happens when the automaker stops taking that on trust. It is a formal status assigned after a defect reaches a customer plant, and it comes in two levels. CS1 requires the supplier to add its own inspection layer before shipment, document it, and report on it. CS2 adds an independent third party on top of CS1. The supplier keeps running its own containment; the third party verifies it, at the supplier's cost.

Both are survivable. What makes them hard is not the inspection itself. It is proving, shipment after shipment and site after site, that the inspection actually happened the way you said it did. Most MES platforms handle single-site nonconformance well. Producing one consistent containment record across several plants on a two-week timeline is where they tend to fall short.

## What Triggers CS1 and CS2 Controlled Shipping

A defect reaching the customer plant is the starting point, but controlled shipping is an escalation beyond it. Automakers apply it when the defect is severe, when a previously closed issue resurfaces, when a line stops, or when the initial corrective action response falls short. A defect caught at incoming inspection, a field failure, or a warranty claim can each lead there. CS1 typically requires the supplier to add an extra layer of inspection before shipment, while CS2 means the automaker brings in a third party to inspect on the supplier's behalf, at the supplier's cost. Both carry real financial and reputational stakes.

For [automotive quality manufacturing](/industries/automotive/), the trigger event is rarely the hard part. The harder part is proving, with data, that every unit shipped afterward meets the added inspection requirement. Without a system connecting inspection points to production data in real time, that proof often depends on manual logs that are slow to compile and easy to dispute during a customer audit.

::cta-image{src="/blog/2026/08/images/containment-blog-cta-1.png" alt="Replace manual containment logs - see how it works" cta="demo"}
::

## Building Containment That Holds Up Under Scrutiny

Surviving CS1 or CS2 status depends on more than reacting to the initial defect notice. Automakers and third-party auditors expect proof that every containment action is documented, repeatable, and traceable back to a specific inspection point and operator sign-off. Building that level of rigor across multiple sites, each with its own systems and habits, requires structure in three key areas.

### Documenting Every Inspection Point

Every added inspection step needs a written record: what is being checked, how often, and by whom. Inspection also has to happen in a dedicated containment area, separate from normal production flow, staffed by people other than the operators who produced the part. Real-time [production monitoring](/use-cases/production-monitoring/) can capture this automatically at the line level, giving you a live record instead of a stack of paper checklists compiled after each shift. It's the same discipline a [layered process audit](/blog/2026/08/layered-process-audit/) runs on: defined checks, at a defined frequency, signed off by someone other than the operator.

### Sign-Offs That Hold Up During Customer Containment

Customer containment often involves the automaker's own quality team reviewing supplier data directly. A shared [FlowFuse Dashboard](/platform/dashboard/) gives operators, quality engineers, and customer auditors the same live view of inspection results, so sign-offs reflect what actually happened on the line, not a summary written after the fact.

### Where CS1/CS2 Automotive Plans Break Down

Most CS1/CS2 automotive plans fail at scale, not on day one. A process that works on a single line becomes inconsistent across five plants using different spreadsheets and different definitions of "checked." Standardizing the same containment action across every site closes that gap without rebuilding it at each location.

### Identifying Certified Stock

Contained parts need distinct marking, usually a containment label or coloured tag, agreed with the customer and applied from a defined start date. That marking is how the customer separates parts that passed containment inspection from parts shipped before containment began. Containment also covers material sitting in your warehouse, already in transit, and on the floor at the customer's plant, not only what ships next. That marking needs to tie back to the same [automotive traceability](/blog/2026/08/automotive-traceability/) record as everything else you ship, not a separate log that only exists for the duration of containment.

## From Customer Containment to Exiting CS1 and CS2 for Good

Passing containment inspections is only half the work. To exit CS1 or CS2 status permanently, a supplier has to show the automaker that the root cause has been identified and corrected, not just contained. That shift from reactive inspection to lasting correction happens across three areas.

### Connecting Containment Data to Root Cause

Containment inspection data is only useful if it points back to where the defect originated. Ongoing [defect and quality monitoring](/blog/2026/07/defect-and-quality-monitoring/) at the line level helps quality teams trace a recurring issue to a specific machine, shift, or process step. Structuring that investigation with a tool like an [Ishikawa fishbone diagram](/blog/2026/07/ishikawa-fishbone-diagram/) keeps the search organized instead of guessing at a fix.

::cta-image{src="/blog/2026/08/images/containment-action-cta-2.png" alt="Track contained parts from line to customer - build with FlowFuse" cta="sign-up"}
::

### Keeping Every Shift Aligned on Corrective Action

Corrective action fails when one shift changes a process and the next shift reverts it. Clear [shop floor communication](/use-cases/shop-floor-communication/) keeps operators, quality engineers, and plant leadership working from the same updated procedure, reducing the risk of the same defect resurfacing after containment is lifted.

### Proving Consistency Before Requesting Release

Automakers typically require a sustained defect-free run before lifting controlled shipping status. Every containment action taken during that run needs a documented, consistent trail across shifts and lines, giving the supplier a clear case to present when requesting release from CS1 or CS2.

## Final Thoughts

CS1 and CS2 status test more than a supplier's quality process. They test whether that process can be documented, trusted, and applied the same way across every site under scrutiny, often on a timeline that leaves no room for rebuilding tools from scratch at each plant. The suppliers who exit controlled shipping fastest are usually the ones who can prove consistency without relying on manual logs and disconnected spreadsheets to make their case.

An industrial application platform like FlowFuse gives manufacturers a way to standardize that proof once and apply it everywhere it is needed, from inspection tracking to shift communication to root cause data. Getting through CS1 or CS2 is difficult enough without also rebuilding the containment process at every site. Build it once, and let it run everywhere containment is required.
