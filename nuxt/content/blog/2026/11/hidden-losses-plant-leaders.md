---
title: "5 Hidden Losses Every Plant Leader Should Check For"
metaTitle: "How to Improve OEE: 5 Hidden Losses to Check First"
subtitle: "Where your reports make the plant look better than it is, and how to check each one"
description: "Five hidden losses that make OEE look better than it is, from planned downtime to ideal cycle time, and how to check each one to improve OEE in manufacturing."
date: 2026-11-27
authors: ["sumit-shinde"]
image: /blog/2026/11/images/hidden-losses-plant-leaders.png
tags:
  - posts
  - flowfuse
  - templates
cta:
  type: demo
  title: "Find the Losses Your Reports Don't Show"
  description: "Pick one line. We'll work with your team to capture stops, speeds and machine states straight from the machines you already run, so the numbers in your review match what happened on the floor."
structuredData:
  faq:
    - question: "How to improve OEE in manufacturing?"
      answer: "Start by checking that the number is right, because you can't improve a figure that is set up to flatter the line. Set ideal cycle times from what the machines can really do, review what counts as planned downtime, and capture stop reasons at the machine. Then work on the bottleneck first, since a minute recovered there adds output to the whole line. The usual levers are shorter changeovers, fewer breakdowns and short stops, running at the rated speed, and catching quality problems earlier."
    - question: "Planned downtime vs unplanned downtime: what is the difference?"
      answer: "Planned downtime is time the plant decided not to produce, such as scheduled maintenance, breaks or changeovers. Unplanned downtime is time the line should have been running but wasn't, such as breakdowns, jams or waiting for material. Many plants class changeovers as planned, which is fine if the time is still reported: set an allowance for each one, count anything beyond it as unplanned, and report planned hours next to Availability every week."
    - question: "Can downtime be captured automatically on older machines?"
      answer: "Yes. FlowFuse connects to PLCs over [industrial protocols](/docs/flowfuse-nodes/edge/) such as Modbus, OPC UA, Siemens S7 and EtherNet/IP, and machines without a network connection can be fitted with simple sensors. Stops, speeds and machine states are then recorded as they happen, which is the basis for [production line monitoring](/use-cases/production-line-monitoring/) and an [OEE dashboard](/blueprints/manufacturing/oee-dashboard/) your team can trust."
    - question: "How does FlowFuse help improve OEE?"
      answer: "FlowFuse's [forward-deployed engineers](/build-with-us/) work alongside your team. They start by agreeing with you which line to begin on, how OEE will be calculated and what number will count as success. They then connect the machines you already run, new and old, so stops, speeds and machine states are recorded as they happen and OEE comes from machine data instead of shift reports. Once it works on the first line, the same application rolls out to the next lines and sites, and your team owns and runs it."
tldr:
  - "Check the number before you try to improve OEE. Most reported OEE runs high because of settings chosen when it was set up, not because anyone is gaming it."
  - "An ideal cycle time copied from today's speed and a planned-downtime list that keeps growing can turn a real 54% OEE into a reported 84%."
  - "Downtime reasons typed in by the people they would blame point improvement work at the wrong causes."
  - "The worst machine on the report is often starved or blocked by its neighbours, and a minute lost at the bottleneck costs far more than one lost anywhere else."
  - "Each loss shows up when you compare the report with a source it doesn't control: rated speed, the fault log, the first good unit or the warehouse count."
---

If you run a plant or lead operations, some of your biggest losses probably never appear in your reports. They hide inside numbers your team trusts and reviews every week. Most plants are making at least one of the five mistakes below, and each one hides a loss your reports don't show.

<!--more-->

Each one can be checked in about fifteen minutes with data you already have. The checklist at the end shows you how.

## Mistake 1: Setting the ideal cycle time from what the line already runs

Performance compares how fast a machine runs with how fast it should run. The "should" figure, the ideal cycle time, is often taken from a budget rate, a product-development estimate, or whatever the line happened to be doing when the OEE system went live. After that it is rarely revisited. Once the ideal matches the current speed, Performance looks close to perfect, and nobody works on speed because every report says speed is fine. It is one of the most common ways an OEE number drifts away from reality.

Picture a simple bottling line with three machines: a filler, a capper and a labeler. The capper is the slowest, and it can cap 60 bottles a minute. When OEE was set up, it happened to be running at 50, so 50 was entered as the ideal. Today it runs at 48. The report says Performance is 96%. Measured against what the capper can really do, it is 80%. That missing 20% is thousands of bottles a shift, and none of it shows up as a loss.

A food manufacturer we spoke with found the same problem in its scheduled cook times, which their engineer called "totally bogus." The times came from product-development trials. No one had ever recorded when cooking actually started and stopped.

## Mistake 2: Letting the "planned downtime" list grow

Availability, one of the [three parts of OEE](/blog/2026/05/fixing-oee-measurement-in-manufacturing/), only counts losses during the time the plant planned to produce. Anything classed as planned drops out of the calculation and never shows up as unplanned downtime, and that list tends to grow. Changeovers go in first, then cleaning, then start-up. Later someone adds waiting for material, trials, or shifts with no operator. Each addition had a reasonable argument behind it at the time. What almost never happens is a review of the whole list, so items get added and nothing gets taken out.

Picture the same line on a normal morning. The shift starts at 7:00, but the first good bottle comes off at 7:45. Those 45 minutes are logged as "start-up", which counts as planned, so they don't count against the line. A changeover planned for 25 minutes takes 40, and all 40 are logged as planned too. On paper, the line was available 90% of the time. Counting every minute the team was on shift and ready to work, it was making bottles about 70% of the time.

Put the first two mistakes together, and a line that reports 84% OEE is really running at about 54%.

Late starts in particular are more common than most managers assume. Jared Spencer, a packaging operations consultant, [describes a plant](https://buttondown.com/jaredspencer/archive/your-line-doesnt-start-when-your-shift-does/) where Line 1's first parts appeared at 8:00 on a 7:00 shift. He calls it "30 to 60 minutes of paid, present, on-the-floor labor every morning where nothing is being made."

::cta-image{src="/blog/2026/11/images/hidden-losses-cta.png" alt="Numbers you can trust from every machine: pull data straight from new and legacy machines, build apps with our forward-deployed engineers, and deploy and scale across every site with FlowFuse. Book a demo." cta="demo"}
::

## Mistake 3: Trusting downtime reasons entered by the people they would blame

The downtime Pareto decides where your engineers spend their time. It is built from reason codes that operators type in under time pressure, sometimes from memory at the end of the shift, instead of [at the machine when the stop happens](/blog/2026/07/build-downtime-logger/). Two things follow. The easiest option wins, which is why "Other" is the tallest bar in so many plants. And people avoid codes that point at themselves, so operators record equipment problems and maintenance records operator problems.

Picture the downtime chart for the same line. "Other" is the biggest reason, and "Operator error" is second. So the plant books operator training. A month later, someone checks the labeler's own fault log and finds that most of those stops were the same faulty sensor. The training changed nothing, because the problem was never the operators.

One packaging engineer told us about a plant where the OEE project ended up measuring maintenance response time instead. Operators and maintenance were "all lying to each other" about why lines stopped. Nobody there was acting in bad faith. They were protecting themselves from a number that could be used against them.

## Mistake 4: Spending money on the machine with the worst OEE

A machine can be stopped without anything being wrong with it. If nothing arrives from upstream, it is starved. If the machine after it is full, it is blocked. In both cases OEE records the time as downtime against it, so the machine at the bottom of the report is often waiting on its neighbours rather than failing on its own. Improvement projects and capital requests then go to the wrong place.

Picture last week's report for the same line. The labeler sits at the bottom with ten hours of downtime, so someone proposes a $40,000 upgrade. But the labeler was only broken for three of those hours. For the other seven it was waiting, mostly for bottles that the capper hadn't sent yet. The machine holding the line back was the capper, and the upgrade would have gone to the wrong one.

A beverage plant we worked with had a filler line running at around 70% of schedule and couldn't say why. Once every machine on the line [reported the same states](/use-cases/production-line-monitoring/), including starved and blocked, the cause became clear. An unscrambler at the start of the line was starving everything after it.

## Mistake 5: Treating every lost minute as equal

OEE adds up lost minutes from every machine as though each one cost the same. Every line, though, has one machine that limits how much it can produce: the bottleneck. A minute lost there is output the whole line never gets back. A minute lost on a faster machine is usually recovered once it restarts. Downtime reports still rank every minute alike, and breaks are scheduled the same for every machine. On top of that, plants are often less sure where the bottleneck is than they assume. It shifts with the product mix and with whichever machines are having a bad week. Christoph Roser, who writes [AllAboutLean](https://www.allaboutlean.com/shifting-bottlenecks/), says "such shifting bottlenecks are the norm on most shop floors."

Picture the same line, where the capper is the bottleneck. The filler and the capper each stop for ten minutes on the same day.

- **When the filler stops,** the capper keeps working through the bottles already waiting in front of it. The filler is fast, so it catches up once it restarts. The line loses almost nothing.
- **When the capper stops,** nothing gets past it, and no other machine can make up the difference. Those ten minutes of output are gone for good.

The report shows both as ten minutes of downtime. Lunch works the same way. If the capper stops for 30 minutes while its operator eats with everyone else, the whole line loses 30 minutes of output every day, even though that break is planned. Goldratt made this point in *The Goal*: an hour lost at a bottleneck is an hour lost for the entire system.

## How to check your own plant

Each of these mistakes shows up when you compare the report with a source it doesn't control: the machine's rated speed, its own fault log, the time the first good unit came off, or the warehouse count. Where the two agree, the number is sound. Where they don't, you've found one of the five.

*Download the free checklist below. It gives the exact comparison for each mistake, the data to pull, and what to do when the numbers don't match.*

**[Download the checklist](https://26586079.fs1.hubspotusercontent-eu1.net/hubfs/26586079/Downloadable%20Blog%20Assets/Check-Your-Plant-5-Hidden-Losses.docx)**

When the checks come back badly, the cause is usually the same. The data depends on people recording it after the fact, so it inherits their shortcuts, their memory and their incentives. FlowFuse connects to the machines you already have, including older equipment, and records stops, machine states and speeds as they happen, ready for an [OEE dashboard](/blueprints/manufacturing/oee-dashboard/) your team can trust. The checks then become something you can look up instead of reconstructing by hand.
