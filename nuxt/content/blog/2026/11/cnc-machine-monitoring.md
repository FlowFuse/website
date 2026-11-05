---
title: 'CNC Machine Monitoring: Get More Output Before More Machines'
authors:
  - sumit-shinde
cta:
  type: sign-up
  title: Recover Lost Spindle Hours Before You Buy Another Machine
  description: Deploy a production monitoring application on your bottleneck cell, connected to your own machines and measured against a downtime target we set together. Your team runs it, and FlowFuse scales it to every cell and site.
date: '2026-11-05'
description: Learn how CNC machine monitoring works, how to collect data from CNC machines, which KPIs to track and how to prove the business case on one production cell.
image: /blog/2026/11/images/cnc-machine-monitoring.png
metaTitle: 'CNC Machine Monitoring: How It Works and What to Track'
subtitle: Find where spindle hours go, put a cost on the losses and prove the gains on one cell
tags:
  - posts
  - flowfuse
  - dashboard
meta:
  faq:
    - question: "What is CNC machine monitoring?"
      answer: "CNC machine monitoring automatically collects status and production data from CNC machines: whether each one is cutting, idle, in setup or in alarm, how many parts it made and why it stopped. The data comes from the machine controller, or from sensors on older machines, and feeds [dashboards](/platform/dashboard/) and alerts that show where production time is lost."
    - question: "How do you monitor older CNC machines without a network port?"
      answer: "Fit them with a stack-light tap, a current sensor or digital I/O. These report running, idle and alarm states and cycle counts, which is enough to measure spindle utilization and capture stops, without replacing the controller."
    - question: "Can you monitor machines from different controller brands in one system?"
      answer: "Yes. A mixed shop floor usually means FOCAS for Fanuc, [MTConnect](/blog/2026/02/mapping-mtconnect-streams/) for Haas, Mazak, Okuma and DMG MORI, [OPC UA](/integrations/opcua/) for Siemens and Heidenhain, and [Modbus](/blog/2025/09/using-modbus-with-flowfuse/) for PLC-controlled machines. FlowFuse connects all of these through an [edge device](/platform/device-agent/) and brings the data into the same dashboards."
    - question: "Which CNC monitoring KPIs should you track first?"
      answer: "Start with three production KPIs: machine state, parts produced with cycle time, and [downtime reason](/blog/2026/07/build-downtime-logger/). Together they show how much scheduled time goes into cutting, whether machines meet their targets and why they stop. Add quality and maintenance KPIs once that data is reliable."
    - question: "What is a good spindle utilization rate?"
      answer: "In Modern Machine Shop's [Top Shops benchmarking survey](https://www.mmsonline.com/articles/what-it-takes-to-be-a-top-shop), typical shops reported a median spindle utilization of 65%, compared with 75% for leading shops. Measure your own baseline first, because your job mix and setup frequency affect what is realistic."
    - question: "How long does it take to see results from CNC monitoring?"
      answer: "Collect a baseline for two to four weeks without changing anything, so it covers every shift and your usual job mix. Most shops can then see their [biggest losses](/blog/2025/08/pareto-chart-manufacturing-guide/) and start fixing them one at a time."
    - question: "How do you justify the cost of CNC machine monitoring?"
      answer: "Put a number on the hours you lose. Multiply lost hours by contribution per hour, then add recovery costs such as overtime and outsourcing, and repair costs for breakdowns. Compare that figure with the cost of hardware, integration and your team's time on one bottleneck cell."
tldr:
  - Monitoring reads state, part counts and alarms from each controller, or from sensors on older machines, and operators add the reason for every stop.
  - Put a price on lost hours with contribution per hour, recovery costs and repair costs, so finance can approve a monitoring deployment.
  - Review the data at a set time each shift, day and week, and give every top loss an owner.
  - Prove the gains on your bottleneck cell before buying another machine, then roll the same application out to every line and plant.
---

When a CNC cell can't keep up, the usual answer is another machine. Often the capacity is already on the floor. A machine scheduled for an eight-hour shift rarely cuts for eight hours: setups, material delays, tool changes and short stops take their share, and much of that time never reaches shift reports.

CNC machine monitoring makes those losses visible. It records what each machine is doing, how many parts it makes and why it stops, so you can see where the hours go and how much output you can recover before buying another machine.

<!--more-->

## Where CNC machine hours go

Modern Machine Shop's [Top Shops benchmarking survey](https://www.mmsonline.com/articles/what-it-takes-to-be-a-top-shop) measures spindle utilization, the share of scheduled production time spent cutting. In a recent edition, the median shop cut for 65% of scheduled time, compared with 75% for leading shops.

The gap comes from two kinds of loss. Planned losses, such as setups and tool changes, appear in the schedule. Unplanned ones, such as material shortages, short stops and breakdowns, often go unrecorded, yet a ten-minute wait for material, repeated across machines and shifts, adds up to hours.

::cta-image{alt="Where do your CNC hours go? Capture every stop and its reason with FlowFuse. Chris Meyer, Wilson Tool International: it took a few days to build a monitoring tool with FlowFuse to track critical KPIs and reduce downtime - book a demo" cta="demo" src="/images/cta/cnc-downtime-logger-book-demo.png"}
::

Monitoring records these stops automatically, but only the operator knows why each one happened. In the [downtime logger we built with FlowFuse](/blog/2026/07/build-downtime-logger/), a stop reported by the controller opens a record, and the operator picks the reason from six to eight options with one tap. The dashboard then ranks the most common reasons, so each loss goes to the team that can fix it.

![Downtime logger dashboard showing machines down, stoppages missing a reason and the most common downtime reason](/blog/2026/11/images/cnc-downtime-logger-dashboard.png "Downtime logger built with FlowFuse")

## How CNC machine monitoring works

Capturing those stops, and everything else a machine reports, takes four steps:

1. **Collect:** Read states, part counts, alarms and spindle load from each machine.
2. **Add context:** Tag each reading with the machine, job and shift.
3. **Store:** Keep the [history](/blog/2025/08/time-series-dashboard-flowfuse-postgresql/) in a time-series database.
4. **Act:** Show results on [dashboards](/platform/dashboard/) and alert the right team when a machine stops.

FlowFuse handles all four steps in one platform, and [FlowFuse AI](/ai/) helps you dig into the data and build new views from it. In the demo below, it compares two shifts in a CNC cell, finds a machine running with a low feed override (the operator's feed rate setting) and adds a view to track it. The [Build with AI](https://www.youtube.com/playlist?list=PLpcyqc7kNgp2mHPXRhCHXejts52xqGbqr) playlist has more examples.

::lite-youtube
---
params: rel=0
style: 'width: 100%; aspect-ratio: 16/9; background-image: url(''https://img.youtube.com/vi/DIc4kejVDZQ/maxresdefault.jpg''); background-size: cover; background-position: center;'
title: Recover Lost Machining Capacity with CNC Machine Monitoring
videoid: DIc4kejVDZQ
---
::

### Collecting data from CNC machines

The first step depends on what each machine can report. Newer controllers share detailed data, and older machines report run, idle and alarm states through sensors that cost a fraction of a new machine, so you can monitor machines of any age.

| Controller or machine               | Typical connection                               | What you get                                              |
| ----------------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| Fanuc                               | FOCAS over Ethernet, or Fanuc's MTConnect option | State, part count, program, alarms, overrides |
| Haas, Mazak, Okuma, DMG MORI        | [MTConnect](/blog/2026/02/mapping-mtconnect-streams/), built in or through an adapter | State, program, spindle speed and load, alarms |
| Siemens SINUMERIK, Heidenhain       | [OPC UA](/integrations/opcua/), usually a licensed option | State, program, axis and spindle data, alarms             |
| Machines controlled by a PLC        | [Modbus](/blog/2025/09/using-modbus-with-flowfuse/) or the PLC's native protocol | Whatever signals the PLC holds                            |
| Older machines with no network port | Stack-light tap, current sensor or digital I/O   | Running, idle and alarm states, cycle counts              |

FlowFuse connects all of them through an [edge device](/platform/device-agent/), so older and newer machines feed the same dashboards. See all [supported integrations](/integrations/).

## Which CNC monitoring KPIs to track

Once data is flowing, start with three production KPIs:

| KPI                                             | The question it answers                            |
| ----------------------------------------------- | -------------------------------------------------- |
| Machine state: cutting, idle, setup, alarm, off | How much scheduled time is spent cutting?          |
| Parts produced and cycle time                   | Are machines meeting targets? Which jobs run long? |
| Downtime reason                                 | Why did the machine stop, and who needs to act?    |

Machine state gives you spindle utilization, the number to watch first:

**Spindle utilization = Cutting time ÷ Scheduled production time × 100**

Add ideal cycle times and scrap counts later, and the same data gives you [OEE](/blog/2026/05/fixing-oee-measurement-in-manufacturing/) (Overall Equipment Effectiveness).

Once production data is reliable, add quality KPIs such as first-pass yield and scrap rate, because high utilization means little if the parts are scrap. For maintenance, track spindle load, temperature and alarm history. A rising spindle load often signals tool wear.

## What lost CNC capacity really costs

These KPIs show where the hours go. Before finance approves a monitoring deployment, it will also want to know what those hours cost:

**Cost of lost capacity = Lost hours × Contribution per hour + Recovery costs + Repair costs**

Contribution per hour is what the lost parts would have earned after material and other variable costs. Recovery costs cover overtime, outsourcing and expedited freight. Repair costs cover parts, labor and service.

Take a machining center scheduled for 80 hours a week that loses 12 hours to short stops and waiting. At an illustrative US\$150 contribution per hour:

**12 hours × US\$150 × 48 weeks = US\$86,400 per year**

That money is potential, not guaranteed: you only earn it if you have orders to fill the freed hours.

Breakdowns add recovery and repair costs. At one metals plant, a bearing failure took out a CNC chuck and kept the machine down for about eight weeks. At the same rate, that's US\$96,000 in lost contribution, around US\$20,000 in outsourcing and freight, and US\$15,000 in repairs: **about US\$131,000 from one failure**. The plant's monitoring only showed whether machines were on, so nobody saw the rising load that could have warned them about the bearing.

As the engineer leading the plant's [preventive maintenance](/blog/2025/09/preventive-maintenance-equipment-failure/) program put it:

"If I can show that one machine is losing production and how much it costs to repair, then I can justify everything."

To build your own case, fill in each term for one machine from your production, maintenance and finance records.

## Turning machine data into daily action

A business case gets the deployment approved, but the data only recovers capacity when someone reviews it on a fixed schedule and leaves with a task:

| When                     | The question to answer                                         | Action                                                  |
| ------------------------ | -------------------------------------------------------------- | ------------------------------------------------------- |
| During the shift         | Which machines are down, and which stops still have no reason? | Clear the stop and log the reason                       |
| Daily production meeting | Which downtime reasons cost the most hours yesterday?          | Give each top loss an owner and a due date              |
| Weekly review            | Is spindle utilization rising, and did last week's fixes hold? | Close finished actions and reopen the ones that slipped |

Before the first review, agree on what each machine state means, for example whether a warm-up cycle counts as cutting. Otherwise meetings turn into arguments about the numbers. Some stops can't wait for a meeting, so [automate detection and escalation](/blog/2026/06/event-driven-downtime-escalation-workflow/) to alert maintenance the moment an alarm fires.

## Proving it on your first cell

The simplest way to put all of this to work is to start with one cell. Pick the one limiting your output, since every hour recovered there creates an opportunity to ship more parts. Agree on what success looks like before deployment. Collect data for two to four weeks to establish a baseline, then tackle the [biggest losses](/blog/2025/08/pareto-chart-manufacturing-guide/) one at a time and calculate the value of the recovered hours.

If the results justify a wider rollout, use FlowFuse to scale the same application across more cells, production lines and plants, managed from one place. [Walter](/customer-stories/scaling-industrial-iot-operations-while-maintaining-competitive-edge/) started with a single FlowFuse instance and now runs more than 130 across its production units with the same seven-person IT team.

Before investing in another CNC machine, find out how much capacity your existing equipment can recover. Start with the bottleneck cell, establish a baseline and use machine data to identify the stops costing you the most production time. Once you've proved the gains, you'll have measurable results to guide your next production investment.