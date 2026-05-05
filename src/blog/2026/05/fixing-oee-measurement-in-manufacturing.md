---
title: "How Measuring OEE Can Be Problematic for Your Factory — And What to Do About It"
subtitle: "Why the OEE score on your dashboard does not match what is happening on the floor."
description: "Most factories measure OEE wrong. Manual logs miss small stops, definitions drift, and operators game the score. A practical look at what to do about it."
date: 2026-04-05
keywords: 
authors: ["sumit-shinde"]
image: 
tags:
- flowfuse
cta:
  type: contact
  title: Get help connecting your machines
  description: Tell us what PLCs and protocols you are working with. We will show you how FlowFuse pulls the data and what an honest OEE dashboard looks like on your line.
---

"85% is world-class" gets repeated in every plant manager meeting. Only [3–6% of manufacturers ever hit it](https://oxmaint.com/industries/steel-plant/oee-benchmarks-by-manufacturing-industry). The global average sits closer to [60%](https://manufacturingleadgeneration.com/manufacturing-quality-statistics/). A pharma plant running at 72% under FDA validation rules is probably outperforming the automotive line bragging about 84%, but the quarterly review never frames it that way.

<!--more-->

The formula is simple. Implementing it honestly almost never is. Definitions drift between sites. Manual collection misses small stops. Ideal cycle times get fudged. Operators game whatever gets measured. And the math itself fights you — push one component up and another usually drops.

## Most OEE numbers are made up

When operators log downtime on paper or fill in a spreadsheet at the end of the shift, [manual systems typically capture only 60-70% of actual downtime](https://oxmaint.com/industries/steel-plant/common-oee-mistakes-in-manufacturing). Micro-stops under five minutes get skipped almost entirely. Added up, [these small losses often represent 10 to 15% of production time](https://teeptrak.com/en/fiabilite-donnees-oee-erreurs-solutions/).

Operators rarely log events as they happen. They reconstruct the shift at the end, from memory, under time pressure. A 90-second jam that happened four hours ago becomes "a couple of minutes," gets folded into the next stop, or never gets logged.

Speed losses are worse. A line running at 85% of rated speed all shift logs zero downtime events but loses 15% of its output. Without a recorded actual rate, Performance defaults to 100% and the loss disappears.

Put it together and [manual OEE is often overestimated by 10–25%](https://www.jitbase.com/blog/en/blog/how-to-effectively-track-the-oee-of-your-machine-tools). The dashboard says 78%. The real number is closer to 60%. Decisions get made on the 78%.

The fix is structural. PLCs already know when a line stopped, how long it ran below rated speed, and how many parts came off. Connecting [FlowFuse](/) to the PLC over OPC-UA, Modbus, S7, or EtherNet/IP pulls that data straight off the machine. The operator's job changes from logging the stop to classifying the cause. [FlowFuse's OEE Dashboard blueprint](/blueprints/manufacturing/oee-dashboard/) gives you the calculation and visualisation layer on top of that.

## Everyone calculates OEE differently

Two plants in the same company report 75% OEE. One counts changeovers as planned downtime. The other counts them as unplanned. One uses the machine's nameplate speed as the ideal cycle time. The other uses the average speed they hit last quarter. Same number on the slide. Different realities on the floor.

[Even in corporations using standardized MES systems, OEE figures are not automatically comparable](https://www.symestic.com/en-us/blog/oee/the-limits-of-oee). Small differences in how setup time, breaks, planned maintenance, or first-pass quality get classified produce big differences in the final score.

The ideal cycle time is where most of the drift happens. It is supposed to be the rated speed from the manufacturer. In practice, [plants set it too low to account for aging machinery or material issues](https://www.ease.io/blog/oee-in-manufacturing/). The score looks healthier than reality, with the actual losses hidden inside an artificially relaxed baseline.

Quality has the same problem. The Quality component is supposed to count only first-pass good parts. Including reworked parts [hides the fact that opportunity exists for improving first-pass process quality](https://www.worximity.com/blog/the-biggest-mistakes-when-calculating-oee). The line still ships the part. The score still looks fine. The rework bay grows.

Then there is the "Other" code. Once that bucket grows past [10–15% of logged downtime events, the dataset cannot identify top failure modes or drive maintenance decisions](https://oxmaint.com/industries/fmcg/oee-data-collection-downtime-logging-checklist). You know the line stopped. You do not know why.

The fix here is governance, not software. Write down what counts as planned downtime, which cycle time applies to which product, and what passes as first-pass quality. Use a hierarchical reason code tree instead of free text. Without that, OEE benchmarking across plants is comparing definitions, not performance.

## People game whatever you measure

Put a target on a metric and attach it to performance reviews, and the metric stops measuring reality. It starts measuring how well people produce the number.

Stops under a certain length stop getting logged. Changeovers get coded as planned instead of unplanned. Difficult products get pushed to the next shift. Maintenance gets scheduled during “non-production” windows so it does not count. The number improves. The process does not.

[Publishing shift rankings and punishing low performers creates fear, data manipulation, and gaming. Operators learn to hide problems rather than expose them](https://oxmaint.com/industries/steel-plant/common-oee-mistakes-in-manufacturing).

The deeper damage is trust. Operators stop believing the dashboard because it does not reflect what actually happened. Managers stop trusting operators because the numbers look manipulated. Maintenance stops trusting downtime data because they know which codes get used to make availability look better.

There is also slower drift at the management level. Ideal cycle times get adjusted downward. Planned downtime definitions get widened. Scheduled production time gets narrowed. Each change is small and defensible. Over time, the score loses meaning.

The fix is removing the incentive to game. Use OEE as a diagnostic, not a scorecard. Stop ranking shifts on it. Stop tying it to bonuses. Make the goal “find the losses,” not “hit 80%.”

## The math fights itself

OEE is Availability times Performance times Quality. The idea is one number captures everything. The problem is the three components are not independent.

Run the line faster to improve Performance and rejects increase, so Quality drops. Tighten quality checks and the line stops more often, so Availability drops. Skip maintenance to protect Availability and you get longer breakdowns later.

It gets worse on a production line. A high OEE on a non-bottleneck machine is not a good thing. [If a machine that is not the bottleneck runs at high OEE, it leads to a jam of parts before the bottleneck](https://www.allaboutlean.com/use-oee/). The machine looks efficient. The system does not improve.

High-mix manufacturing breaks the math differently. When a machine runs multiple products, [using the fastest part as the ideal cycle time causes Performance to collapse for slower jobs, even when they are running as planned](https://www.machinetracking.com/post/ope-vs-oee-cnc-manufacturing).

There is also a safety dimension. [Safety-critical processes sometimes require conservative operating speeds or deliberate redundancy, both of which reduce measured OEE](https://tractian.com/en/blog/world-class-oee). The metric penalises behaviour that is sometimes necessary.

OEE is one input. Pair it with throughput, first-pass yield, on-time-in-full, and bottleneck utilisation. Look at the components separately, not just the combined score.

## The benchmark trap

The 85% number gets repeated like a rule. It came from [Seiichi Nakajima's TPM framework in the 1980s](https://en.wikipedia.org/wiki/Overall_equipment_effectiveness), based on 90% availability, 95% performance, and 99.9% quality. It was a directional target for stable, high-volume manufacturing — not a universal benchmark.

Apply it without context and it breaks. [Highly regulated industries see OEE 20-40% lower than less regulated ones](https://oxmaint.com/industries/steel-plant/oee-benchmarks-by-manufacturing-industry), and that gap is not always waste.

The bigger problem is focus. A plant at 45% does not need a roadmap to 85%. It needs to fix the biggest losses, which might move it to 55% in a quarter. [The real benchmark is continuous improvement over your own baseline](https://www.mrpeasy.com/blog/overall-equipment-effectiveness/), not someone else's industry average.

Plant-level averages hide everything. [Averaging OEE across an entire facility produces a meaningless number. You can't improve "the plant", you improve specific machines, lines, and processes](https://oxmaint.com/industries/steel-plant/common-oee-mistakes-in-manufacturing). A bottleneck at 58% matters more than multiple machines at 88%.

## Tracking without acting

A lot of plants have gone through the full OEE journey. Bought the software. Installed the dashboards. Trained the operators. Put the screens on the floor. Six months later the same three reasons still top the [Pareto chart](/blog/2025/09/creating-pareto-chart/).

Material wait. Changeover. Minor stops. No change.

From a distance, the system looks active. On the floor, it feels like a report nobody uses.

The issue is ownership. Production logs downtime, but maintenance, engineering, or procurement must fix it. The insight sits in one team, the action in another, and nothing closes the loop.

The fix is to connect data to action. A recurring failure should trigger a maintenance work order. A material delay should alert procurement and the line lead. A changeover overrun should create a kaizen task.

[FlowFuse](/) sits in that gap, taking a downtime event from the line and turning it into a maintenance ticket, a procurement alert, or an escalation in real time. The metric only matters if it leads to something changing on the floor.

## What to actually do

- **Get the data from the machines, not the operators.** The PLC already knows when the line stopped, how fast it ran, and how many parts came off. The operator classifies the cause. Everything else falls apart without this. This is the layer [FlowFuse](/) handles — pulling the data straight off the PLC over OPC-UA, Modbus, S7, or EtherNet/IP.

- **Write down your definitions.** Make every site calculate the same way before comparing any numbers. Use a hierarchical reason code tree, not free text. Kill the "Other" bucket.

- **Apply OEE where it maps to throughput.** The bottleneck and the lines feeding it. High OEE on a non-bottleneck machine is WIP piling up before the constraint.

- **Stop ranking shifts on the score.** The moment OEE becomes a stick, the data becomes fiction.

- **Pair OEE with metrics that catch what it misses.** Throughput. First-pass yield. On-time-in-full. MTBF. The single number is a summary, not the picture.

- **Wire the data into action.** A logged event that does not trigger a ticket, an alert, or a kaizen item is a row in a database, not a fix. This is where [FlowFuse](/) earns its place — turning a downtime event into a maintenance ticket, a procurement alert, or a kaizen task in real time.

- **Compare against your own baseline.** Not the industry. Not 85%. Last month, last shift, last product run.

## Closing

OEE is not broken. It is just often misunderstood.

Used as a target, it gets gamed. Used as a comparison, it misleads. But used as a diagnostic, grounded in real data and consistent definitions, it becomes one of the most useful tools on the shop floor.

The difference is not in the formula. It is in how honestly you measure and whether anything changes because of it.

The value of OEE is not the number you report. It is the problems you uncover and the actions you take next.
