---
title: "Ishikawa Fishbone Diagram: The 6Ms, Manufacturing Examples & Template"
subtitle: "How a 60-year-old drawing still finds the root cause faster than most modern tools."
description: "Learn what an Ishikawa (fishbone) diagram is, the 6Ms, and how to use it for root cause analysis in manufacturing, with a worked example, how it compares to the 5 Whys and Pareto analysis, a template, and common mistakes."
date: 2026-07-27
authors: ["sumit-shinde"]
image: /blog/2026/07/images/what-is-ishikawa-fishbone-diagram.png
tags:
  - flowfuse
tldr: "An Ishikawa diagram, better known as a fishbone or cause-and-effect diagram, finds the real cause of a problem instead of chasing symptoms by sorting possible causes into categories branching off a central spine. The 6Ms are a starting point for manufacturing, but you swap them for whatever fits your problem. It works because it forces a team to externalize and argue their theories on paper before spending money on a fix, and it fails when people stop at labeling empty branches and call that analysis. The diagram surfaces suspects; verifying which one is real, with data, is what actually fixes the problem."
meta:
  howto:
    name: "How to Make a Fishbone (Ishikawa) Diagram"
    description: "Build a fishbone diagram by writing a specific problem statement at the head, drawing the spine, choosing cause categories as ribs, brainstorming specific causes under each, drilling into root causes with the 5 Whys, then verifying the top suspects against real data."
    tool:
      - "Whiteboard or paper (or any diagramming app)"
    steps:
      - name: "Write a problem statement, not a topic"
        text: "State the effect precisely, with what happened, where, and how often, and place it at the head of the fish. A vague head produces vague causes."
        url: "how-to-make-a-fishbone-diagram"
      - name: "Draw the spine and pick your categories"
        text: "Draw a horizontal spine into the problem and branch four to six cause categories off it as ribs. Start from the manufacturing 6Ms and adapt them to your problem."
        url: "how-to-make-a-fishbone-diagram"
      - name: "Brainstorm causes under each category"
        text: "Go category by category and list every plausible cause that could produce the effect, writing down even the theories you doubt."
        url: "how-to-make-a-fishbone-diagram"
      - name: "Push each cause deeper with the 5 Whys"
        text: "For each rib entry, ask why it happens and hang the answer as a sub-branch, continuing until you reach a root cause rather than a symptom."
        url: "how-to-make-a-fishbone-diagram"
      - name: "Verify the top suspects with data"
        text: "Circle the two or three most likely causes and test them against real evidence, such as maintenance logs, measurements, or sensor data, rather than assuming the diagram is the answer."
        url: "how-to-make-a-fishbone-diagram"
  faq:
    - question: "What is an Ishikawa diagram?"
      answer: "An Ishikawa diagram is a visual tool for identifying the possible causes of a problem by sorting them into categories arranged like the bones of a fish. The problem, or effect, sits at the head, and major cause categories branch off a central spine. It was created by Kaoru Ishikawa in the 1960s and is one of the seven basic quality tools."
    - question: "Why is it called a fishbone diagram?"
      answer: "Because the finished drawing looks like a fish skeleton: the problem statement is the head, a horizontal spine runs into it, and the cause categories branch off the spine like ribs. Ishikawa diagram, fishbone diagram, and cause-and-effect diagram all refer to the same tool."
    - question: "What are the 6Ms in a fishbone diagram?"
      answer: "The 6Ms are the classic manufacturing cause categories: Manpower (people), Method (process), Machine (equipment), Material (inputs), Measurement (data), and Mother Nature (environment). Ishikawa intended them as starting labels and encouraged teams to rename or replace them to fit the problem."
    - question: "Is a fishbone diagram the same as a cause-and-effect diagram?"
      answer: "Yes, in everyday use the terms are interchangeable. Technically, every Ishikawa diagram is a cause-and-effect diagram, but not every cause-and-effect sketch follows the fishbone shape. In practice both names point to the same technique."
    - question: "How do I make a fishbone diagram?"
      answer: "Write a specific problem statement at the head, draw the spine, pick four to six cause categories as ribs, brainstorm specific causes under each, then push each cause deeper with the 5 Whys. Finish by circling the most likely causes and verifying them against real data rather than assuming the diagram is the answer."
    - question: "When should I not use a fishbone diagram?"
      answer: "The fishbone diagram identifies possible causes but does not measure their impact, rank them, or prove which one is responsible. For weighting causes use a Pareto chart, for complex failure logic use a fault tree, and for confirmation always verify the top suspects with data. It's a starting point for analysis, not the conclusion."
    - question: "What is the difference between a fishbone diagram and the 5 Whys?"
      answer: "The fishbone diagram maps many possible causes across categories in a broad view; the 5 Whys drills down a single cause chain to its root. They work best together: use the fishbone to surface suspects, then apply the 5 Whys to the strongest ones to reach the underlying cause."
    - question: "When should I use a Pareto chart instead of a fishbone diagram?"
      answer: "Use a fishbone diagram first to surface possible causes, and a Pareto chart later to rank them once you have data on how often each occurs or how much impact it has. The fishbone finds candidates; the Pareto chart tells you which of those candidates to fix first. They solve different problems and are often used in sequence rather than as alternatives."
    - question: "Can I use a fishbone diagram outside manufacturing?"
      answer: "Yes. The technique works for any problem with multiple possible causes, but you should replace the manufacturing 6Ms with categories that fit your domain. If a standard category sits empty because it doesn't apply, drop it and choose one that matches your actual failure surface. Adapting the categories, rather than forcing every problem into the 6Ms, is what makes the diagram useful beyond the factory floor."
    - question: "Who invented the Ishikawa diagram and when?"
      answer: "Kaoru Ishikawa (1915–1989), a Japanese engineer and University of Tokyo professor, popularized the diagram in the 1960s while developing quality-management processes at the Kawasaki shipyards, and formalized it in his 1968 book Guide to Quality Control. It is one of the seven basic quality tools and was designed so that ordinary workers, not just specialists, could analyze the causes of quality problems."
    - question: "Can I build a fishbone diagram in FlowFuse?"
      answer: "FlowFuse isn't a drawing tool for the diagram itself; a whiteboard or diagramming app is quicker for the brainstorming stage. Where FlowFuse helps is the step after: it connects to your PLCs, sensors, and quality systems so you can verify which suspected cause on the fishbone is real, using live production data, and build dashboards that confirm your corrective action actually worked."
cta:
  type: contact
  title: "Turn suspected causes into verified ones"
  description: "Talk to our team about connecting your PLCs, sensors, and quality systems to FlowFuse, so you can verify which root cause is real with live production data and confirm your fixes actually hold."
---

A machine goes down. Someone says "it's the operator," everyone nods, a fix gets applied, and the same fault is back within a month, because "the operator" was a symptom wearing the costume of a cause.

<!--more-->

Kaoru Ishikawa built a drawing in the 1960s to kill that exact reflex. It looks like a fish skeleton, which is why almost nobody calls it by his name. Sixty years and a dozen fancier root-cause tools later, engineers still reach for it first. Not because it's clever. Because it forces every theory in the room onto one wall, where the weak ones have nowhere to hide.

## What Is a Fishbone Diagram?

Strip away the terminology and a fishbone diagram is a structured way to brainstorm causes without letting the loudest person in the room decide the answer.

You write the problem, the effect you want to eliminate, on the right side. That's the fish's head. A horizontal line runs left into it: the spine. Off that spine you draw diagonal branches, the ribs, and each rib is a category of causes. Under each category you hang the specific things that might be going wrong. When you're done, you're looking at every plausible cause for one problem, sorted into groups, on a single page.

The naming gets confusing, so here it is plainly. Ishikawa diagram, fishbone diagram, and cause-and-effect diagram all refer to the same tool. The names are used interchangeably in practice, though purists will point out that not every cause-and-effect sketch follows the fishbone shape. It's one of the [seven basic quality tools](https://en.wikipedia.org/wiki/Seven_basic_tools_of_quality), the club of simple techniques quality engineers lean on before pulling out anything statistical.

What it does *not* do is prove anything. A fishbone diagram generates hypotheses. It tells you where to look, not what the answer is. That distinction is the whole difference between a diagram that helps and one that wastes an afternoon, and we'll come back to it.

## Who Invented the Ishikawa Diagram?

The diagram is named after [Kaoru Ishikawa](https://en.wikipedia.org/wiki/Kaoru_Ishikawa) (1915–1989), a Japanese engineer, University of Tokyo professor, and one of the founding fathers of modern quality management. He popularized it in the 1960s while developing quality processes at the Kawasaki shipyards, and formalized it in his 1968 book *Guide to Quality Control*. His aim was democratic: he wanted quality improvement in the hands of ordinary workers, not locked inside a specialist team, so he built a diagram simple enough that anyone on the line could use it, which is a big part of why the [American Society for Quality](https://asq.org/quality-resources/fishbone) still lists it among the seven basic tools sixty years on.

Its reach since has been broad. One famous case is Mazda, whose engineers reportedly used an Ishikawa diagram to map every factor behind the "Jinba Ittai" (horse and rider as one) feel of the original MX-5 Miata.

## What Are the 6Ms in a Fishbone Diagram?

Ishikawa suggested generic labels for the rib categories so teams would have somewhere to start instead of staring at a blank spine. In manufacturing, those defaults became the 6Ms:

- **Manpower** (people): training gaps, unclear responsibilities, communication breakdowns, fatigue.
- **Method** (process): missing standards, steps performed inconsistently, procedures that no longer match reality.
- **Machine** (equipment): worn parts, skipped maintenance, wrong tooling, calibration drift.
- **Material** (inputs): out-of-spec raw material, supplier variation, wrong batch, storage damage.
- **Measurement** (data): miscalibrated instruments, wrong gauge, inconsistent inspection, bad data collection.
- **Mother Nature** (environment): temperature, humidity, vibration, dust, anything the surroundings do to the process.

Here is the part most guides bury: Ishikawa himself told people to rename these categories to fit their problem. The 6Ms are training wheels, not scripture. They map cleanly onto a factory floor, but even there you'll often want to tweak them, and outside a production line they can fall apart entirely.

Some teams add a seventh M, Money, when cost drivers matter. Process industries sometimes swap in categories like Environment, Equipment, and Procedures. For a service or business problem, the 7Ps (Product, Price, Place, Promotion, People, Process, Physical Evidence) fit better than machinery and materials. The right categories are the ones that make your team say "oh, we haven't thought about that bucket yet." If a category sits empty because it doesn't apply, delete it. An empty rib is not a sign you missed something; it's a sign the label was wrong for your problem.

## How to Make a Fishbone Diagram

The mechanics take five minutes. Doing it well takes discipline. Here's the sequence.

**Write a problem statement, not a topic.** "Machine downtime" is a topic. "Line 3 filler stops an average of 4 times per shift, each stop lasting 6 to 12 minutes" is a problem statement. The second one gives the team something specific to explain. Vague heads produce vague ribs.

**Draw the spine and pick your categories.** Four to six is the sweet spot. Fewer and you're not really sorting; more and the diagram turns into a wall of branches nobody can read. Start from the 6Ms if you're in manufacturing, adapt hard if you're not.

**Brainstorm causes under each category.** This is where the tool earns its keep. Go category by category and ask what, under this heading, could produce the effect. Write everything down, even the theories you doubt. The point of sorting into buckets is that it triggers ideas you'd never reach with an open-ended "what's wrong?"

**Push each cause deeper with "why."** A first-level cause is rarely the root. Pair the fishbone with the [5 Whys](/blog/2025/12/five-whys-root-cause-analysis-definition-examples/): for each rib entry, ask why that happens, and hang the answer as a sub-branch. "Bearing failed" becomes "bearing failed → lubrication skipped → PM schedule not followed → no one owns the schedule." Now you're looking at a root, not a symptom.

**Then stop drawing and start verifying.** This is the step that separates analysis from theater. A finished fishbone is a list of *suspects*, and every suspect is a hypothesis you can test against data. Circle the two or three most likely causes, then go check them: pull the maintenance log, measure the material, watch the operator. The diagram points the flashlight. It doesn't tell you what's in the dark.

## Fishbone Diagram Example

Abstract diagrams teach nothing, so here's the kind of case that plays out on a real line. A packaging line is rejecting cartons because the printed date code is smearing. That's the head of the fish. The team runs 6M categories:

- **Machine:** print head height drifted, print head overdue for cleaning, conveyor speed increased last month.
- **Material:** new ink supplier introduced two weeks ago, carton stock switched to a glossier finish.
- **Method:** no standard for print-head-to-carton distance, cleaning interval never written down.
- **Manpower:** night shift not trained on the new ink's dry time.
- **Measurement:** no check on ink cure before cartons stack.
- **Mother Nature:** plant humidity up since the HVAC repair.

Six categories, roughly a dozen suspects. Now the 5 Whys on the strongest lead: the glossier carton stock. Why does gloss smear? Ink doesn't absorb. Why not? The new stock is non-porous. Why did we switch? Purchasing found a cheaper supplier. Why didn't anyone flag the print impact? No one owns print-compatibility sign-off on material changes.

Notice what happened. The obvious fix, "clean the print head," would have bought a day of relief and then the smearing returns. The fishbone surfaced two causes that interacted, a material change and a missing sign-off process, that a single-thread investigation would have walked right past. That's the entire value of the tool: it makes interacting causes visible instead of letting you commit to the first plausible one.

## Fishbone vs. 5 Whys vs. Pareto: Which One, When

The fishbone rarely works alone, and it's easy to reach for the wrong tool. Here's how the three most common root-cause techniques divide the labor.

| Tool | What it does | Use it when | Where it falls short |
|---|---|---|---|
| **Fishbone diagram** | Goes wide. Surfaces every plausible cause across several categories so nothing obvious gets missed. | You don't yet know where the problem lives and want the team's collective knowledge on one page. | Treats every branch as equally worth investigating. Says nothing about which cause matters most. |
| **[5 Whys](/blog/2025/12/five-whys-root-cause-analysis-definition-examples/)** | Goes deep. Drills a single cause chain, asking "why" until you hit something fixable rather than another symptom. | After the fishbone, on the two or three branches you think are strongest. | It's a single thread. Drill the wrong cause and you'll reach a confident, well-reasoned, wrong answer. |
| **[Pareto chart](/blog/2025/08/pareto-chart-manufacturing-guide/)** | Ranks. Sorts candidate causes by frequency or impact so you fix the vital few, not the trivial many. | You can count occurrences and need to decide where to act first. | Needs data you may not have early on, and only ranks what you already thought to measure. |

The sequence is: fishbone to find suspects, 5 Whys to reach the root of the best ones, Pareto to decide which roots are worth fixing first. They're not competitors. They're a pipeline.

## Fishbone Diagram Template

You don't need software. Here's a text skeleton you can drop into any doc and fill in:

```
                    Method            Machine           Measurement
                       \                 |                  /
             cause ─────\        cause ──|        cause ───/
             cause ──────\       cause ──|        cause ──/
                          \              |               /
   ══════════════════════════════════════════════════════════►  [ PROBLEM ]
                          /              |               \
             cause ──────/       cause ──|        cause ──\
             cause ─────/        cause ──|        cause ───\
                       /                 |                  \
                   Manpower          Material           Mother Nature
```

Rules for using it: replace the six labels with categories that fit *your* problem, keep the problem statement specific, and treat every "cause" line as something you'll later verify with data. If you prefer digital, any diagramming tool works, but the paper-and-marker version on a wall is often better because it gets the whole team pointing at the same branch.

## Common Fishbone Diagram Mistakes

Most failed fishbone sessions fail the same handful of ways.

**Labeling empty branches and calling it done.** Six categories with two vague words under each is a brainstorming template, not root-cause analysis. If the diagram doesn't contain specific, checkable causes, you've drawn a fish, not found a problem.

**Confusing the diagram with the answer.** The single most common error. The fishbone lists suspects; it does not convict any of them. Teams that skip verification and just "fix" the most-discussed branch are gambling, not analyzing.

**Using the 6Ms where they don't fit.** Forcing every problem into the manufacturing 6Ms produces empty ribs and missed causes. Pick categories that match your failure surface, and drop the ones that don't apply.

**Vague problem statements.** A fuzzy head produces a fuzzy diagram. Spend the extra two minutes writing what actually happened, where, and how often.

**Stopping at the first level.** "Operator error" is where lazy analysis ends and real analysis begins. Ask why five times before you believe you've hit a root.

## Where the Fishbone Fits

The Ishikawa diagram survives because it does one job well: it gets a group of people to externalize their theories, sort them, and argue about them on paper before spending money. It's cheap, it's visual, and it needs no training to read. Those are the same reasons the simplest tools tend to outlast the sophisticated ones.

It has limits. It shows causes but not their relative weight or how they interact over time; for that you'd reach for a [Pareto chart](/blog/2025/08/pareto-chart-manufacturing-guide/), fault tree, or statistical analysis. And it's only as good as the verification that follows it. Draw the fish, then go prove which bone is broken.

Used that way, as a hypothesis generator that hands off to real investigation, it remains one of the fastest ways to stop treating symptoms and start fixing causes. Sixty years in, that's still a rare thing for a tool to do.

The catch is that verification needs data the whiteboard can't give you: how often the machine actually stalls, whether the material batch really shifted, what the sensor logged when the defect appeared. That's the step where [FlowFuse](/) fits, connecting your PLCs, sensors, and quality systems into dashboards so you can test which suspected cause is real and confirm the fix held. It won't draw the fishbone for you, but it settles which bone was broken.
