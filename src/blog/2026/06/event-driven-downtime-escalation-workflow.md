---
title: "Why Downtime Spreadsheets Fail and How to Automate Detection and Escalation"
subtitle: "Detect machine stops instantly, escalate automatically, and capture accurate downtime data."
description: "Build an event-driven workflow in FlowFuse that detects machine stops instantly, auto-escalates to supervisor and maintenance, and logs accurate timestamped downtime records, no spreadsheet required."
date: 2026-06-12
authors: ["sumit-shinde"]
image: 
tags:
    - posts
cta:
  type: contact
  title: "Need help setting up an event-driven escalation workflow?"
  description: "We can help you connect your PLCs, design escalation thresholds, and get a flow like this running on your lines"
meta:
  howto:
    name: "How to Build an Event-Driven Downtime Escalation Workflow"
    description: "Detect machine stops the instant they happen, escalate automatically based on how long they last, and write accurate timestamped records by building an event-driven workflow in FlowFuse: catch the stop signal from the PLC, track how long the machine is down, branch by severity to escalate, and close the record when the line runs again."
    totalTime: "PT1H"
    tool:
      - "OPC UA or Modbus connection to a PLC"
      - "FlowFuse"
    steps:
      - name: "Catch the stop signal"
        text: "Read machine state from the PLC over OPC UA or Modbus. Point a node at the right tag, and the moment the state flips to stopped, the event lands in your flow as a message timestamped to the second, so detection starts with the machine rather than a person noticing."
        url: "how-it-works-detect-escalate-record"
      - name: "Track how long the machine has been down"
        text: "Use timer nodes to mark the passage of time against your thresholds, past two minutes, past ten, or whatever windows fit your line, so the workflow can tell a routine changeover apart from a real stoppage."
        url: "how-it-works-detect-escalate-record"
      - name: "Branch by severity to escalate"
        text: "Use a switch node to route the event by duration: short stops are logged to the database as routine changeovers, longer stops also notify the line supervisor over email or Telegram, and if the stop is still unresolved at the next threshold, maintenance gets the same alert, escalating further up the management chain as needed. Each escalation fires automatically based on whether the previous step was closed in time."
        url: "how-it-works-detect-escalate-record"
      - name: "Close the record when the line runs again"
        text: "When the running message comes through, a final node writes the resolution time back into the record, capturing the start, every escalation, and the end, so the log fills itself in with accurate timestamps and no one has to remember to write anything down."
        url: "how-it-works-detect-escalate-record"
  faq:
    - question: "Why are manual downtime spreadsheets inaccurate?"
      answer: "A manual log is written after the fact by a person who first has to notice the stop, then open the file and type the row. Each step adds delay, so the data is always late, and a single 'down for 81 minutes' figure hides what actually happened: it can't tell you how many minutes were detection, how many were waiting for someone to notice and act, and how many were the actual repair. Because downtime is a core input to OEE, that inaccuracy also distorts the availability number the whole plant uses to judge performance."
    - question: "What does an event-driven downtime workflow detect that a spreadsheet can't?"
      answer: "It splits one vague downtime number into separate, measurable intervals: stop detected, supervisor notified, maintenance escalated, and resolved, each with its own timestamp. That turns a single figure you can't act on into three distinct problems with three different owners and three different fixes, so you can see whether time was lost to detection, to waiting, or to the repair itself."
    - question: "Does faster escalation make repairs shorter?"
      answer: "No. A seized motor takes just as long to fix whether the supervisor hears about it in one minute or thirty. What automatic escalation shrinks is the waiting, the detection and notification minutes that happen before anyone starts working. This workflow is not a fix for unreliable equipment; it removes the delay between a stop and someone acting on it."
    - question: "How much money does closing the waiting gap actually recover?"
      answer: "For a mid-sized plant at $25,000 per hour of unplanned downtime, each minute of waiting is worth roughly $415. If automatic escalation removes 10 minutes of pure waiting from a stoppage, that is about $4,000 recovered on that incident, and a plant with 10 unplanned stops a month that consistently closes a 10-minute waiting gap recovers on the order of $40,000 a month. The exact figure depends on how much of your downtime is waiting versus repair, which is why measuring the two separately matters."
    - question: "What do you need to build this workflow in FlowFuse?"
      answer: "A connection to the machine state on your PLC over OPC UA or Modbus, timer nodes to track elapsed downtime against your thresholds, a switch node to branch by severity, a database such as FlowFuse Tables to log records, and a notification channel like email or Telegram for escalations. Set it up once per line and it keeps running on its own, with the spreadsheet becoming the output rather than the task."
tldr: "Downtime spreadsheets are filled in after the fact, which means the data is always late and often inaccurate. This post shows how to build an event-driven escalation workflow in FlowFuse that detects machine stops the instant they happen, escalates automatically based on how long they last, and writes accurate, timestamped records without anyone touching a spreadsheet"
---

In most factories, downtime still lives in a spreadsheet. Someone writes down when a machine stopped, when it got noticed, and when it ran again. It looks like control. The longer I look at how plants actually run, the more I read it as something else: a record of how late everyone found out.

<!--more-->

The problem is the person in the middle. A machine stops, someone has to notice, then open the file and type the row. Each step adds delay, and downtime doesn't wait for the paperwork. By the time the row is written, the loss is already counted.

But here's the part I keep coming back to: the machine already knows it stopped. We don't need a person to notice and write it down; we need the event itself to raise its hand. That's what an event-driven workflow does, and this post shows how to build one in FlowFuse that handles all three jobs on its own: detecting a stop the instant it happens, escalating alerts based on how long it lasts, and writing accurate, timestamped records without anyone touching a spreadsheet. (If event-driven architecture is new to you, [read this article](/blog/2026/02/what-is-event-driven-architecture-in-manufacturing/) first.)

## How It Works: Detect, Escalate, Record

The process begins the instant a machine stops, not when a person notices. A sensor or PLC detects the halt and generates an event, timestamped to the second. That event is passed to a rules layer, which holds the core logic of the system, evaluating the duration of the stoppage against predefined thresholds to decide what happens next.

If the stoppage is brief, under two minutes, say, it's logged as a routine changeover and nothing further happens. Cross that threshold, and the event escalates to the line supervisor. Still unresolved after the next interval, and maintenance gets the same alert. Past that point, it climbs further up the management chain. Each escalation fires automatically, based purely on whether the previous step was closed out in time, with every handoff timestamped as it happens. No one has to remember to log anything.

```mermaid
flowchart TD
    A[Catch the stop signal<br/><i>PLC via OPC UA / Modbus</i>] --> B[Track time down<br/><i>Timer nodes mark windows</i>]
    B --> C{Branch by severity<br/><i>Switch node routes</i>}
    C -->|Under 2 min| D[Logged as changeover]
    C -->|Past 2 min| E[Notify supervisor]
    C -->|Past 10 min| F[Escalate maintenance]
    F --> G[Still down<br/><i>Climb management chain</i>]
    D --> H[(Database: timestamped log)]
    E --> I[Close the record<br/><i>Running message writes start, escalations, end</i>]
    G --> I
    I --> H
    classDef indigo fill:none,stroke:#3B82F6,stroke-width:1.5px,color:#1D4ED8;
    classDef indigoDashed fill:none,stroke:#3B82F6,stroke-width:1.5px,color:#1D4ED8,stroke-dasharray:4 3;
    class A,B,C,E,F,G,I indigo;
    class D,H indigoDashed;
```

Here's what that looks like built in [FlowFuse](/):

- **Catch the stop signal:** Most PLCs expose machine state through [OPC UA](/blog/2025/07/reading-and-writing-plc-data-using-opc-ua/) or [Modbus](/node-red/protocol/modbus/), and FlowFuse has nodes for both. Point one at the right tag, and the moment the state flips to stopped, it lands in your flow as a timestamped message.

- **Track how long it's been down:** A couple of [timer nodes](/blog/2025/12/node-red-timer/) mark the passage of time: past two minutes, past ten, whatever windows fit your line.

- **Branch by severity:** A switch node routes the message: short stops go straight to a [database](/blog/2025/08/getting-started-with-flowfuse-tables/); longer ones also notify the supervisor over [email](/node-red/notification/email/) or [Telegram](/node-red/notification/telegram/); and if it's still unresolved at the next threshold, maintenance gets the same message, escalating further up if needed.

- **Close the record:** When the "running" message comes through, a final node writes the resolution time back into that record: start, every escalation, and end, all filled in by the flow itself.

Set this up once per line in FlowFuse, and it keeps running on its own. The spreadsheet still exists, but now it's the output, not the task.

## What You Recover Once It's Running

The stakes here aren't abstract. Unplanned downtime typically runs [$25,000 per hour for mid-sized plants, climbing past $500,000 per hour for large operations](https://manufacturingleadgeneration.com/manufacturing-downtime-statistics/), and [Siemens' research](https://www.teamsense.com/blog/cost-of-downtime-manufacturing) found that while the number of downtime incidents per month has fallen in recent years, average restart time has nearly doubled, from 49 minutes to 81 minutes. That's the gap this workflow targets: not how often machines stop, but how long it takes for the right person to find out and act.

A manual log can't see that gap at all. If a stop lasts 81 minutes, the spreadsheet just shows "down for 81 minutes," with no way to tell whether 5 of those minutes were detection, 30 were waiting for someone to notice and write it down, and 46 were the actual repair. With event-driven timestamps, each becomes its own measurable interval: stop detected at 9:14:32, supervisor notified at 9:16:32, maintenance escalated at 9:24:32, resolved at 9:31:08. Three different problems with three different owners and three different fixes, instead of one number you can't act on. And since downtime is one of the core inputs to your [OEE calculation](/blog/2026/05/fixing-oee-measurement-in-manufacturing/), inaccurate downtime data doesn't just stay in this spreadsheet; it quietly distorts the availability number your whole plant uses to judge performance.

That gap has a direct dollar value, and it's worth being precise about which part. Faster escalation doesn't make the repair shorter, a seized motor takes just as long to fix whether the supervisor hears about it in one minute or thirty. What it shrinks is the waiting: the detection and notification minutes that happen *before* anyone starts working. For a mid-sized plant at $25,000/hour, each of those minutes is worth roughly $415. If automatic escalation removes 10 minutes of pure waiting from a stoppage, that's about $4,000 recovered on that incident, not from fixing the machine faster, but from not letting it sit idle while the alert worked its way to the right person. A plant with 10 unplanned stops a month that consistently closes a 10-minute waiting gap is recovering on the order of $40,000 a month. The exact figure depends on how much of your downtime is waiting versus repair, which is the point: until you measure the two separately, you're guessing.

I want to be precise here: this isn't a fix for unreliable equipment. Machines will still break, and the repair still takes as long as it takes. What it fixes is the waiting, the minutes between a stop and someone acting on it, which a spreadsheet can never shrink because it only gets written after those minutes are already gone.

Set up once per line, the workflow catches every stop the instant it happens, escalates on a fixed schedule from supervisor to maintenance to up the chain with no manual steps, splits a vague "down for 81 minutes" into separate detection, waiting, and repair intervals you can act on, and recovers the waiting minutes that for most plants add up to real money per incident. The spreadsheet still exists. Now it's the output, not the task, accurate, self-maintaining, and running on every shift without anyone having to remember a thing.
