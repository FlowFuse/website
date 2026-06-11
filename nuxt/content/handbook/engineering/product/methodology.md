---
title: "Methodology"
---

# Product Methodology

This page describes how we decide what to build, and how that work reaches engineering. The short version: we separate the **why and what** from the **how**, and we favour outcomes over outputs. The most expensive mistake we can make is building the wrong thing well.

## Two modes of work: discovery and delivery

Product work happens in two distinct modes. Keeping them separate is what keeps each one fast.

- **Discovery** is deciding the *right thing* to build: the customer problem, the opportunity it sits in, which solution to pursue, and the risky assumptions behind it. Product leads; engineering collaborates.
- **Delivery** is building the chosen thing *well*: story breakdown, technical path, acceptance criteria, estimates. Engineering leads.

When the two modes get mixed into one conversation, both suffer. A meeting meant to break a chosen solution into stories stalls when someone reopens whether it is the right solution at all. We run discovery and delivery as separate, clearly-scoped conversations (see [Our two core product conversations](#our-two-core-product-conversations)).

## The Opportunity Solution Tree

We organise product work as an **Opportunity Solution Tree** (OST), following Teresa Torres' *Continuous Discovery Habits*. The tree connects a measurable outcome to the customer opportunities that drive it, the solutions we choose, and the experiments that de-risk them.

```
Objective        a product outcome (a change in customer behaviour we want)
  Opportunity    a customer need, pain, or desire, grounded in evidence
    Opportunity  more specific sub-need (opportunities decompose, broad to specific)
      Solution   something we would build to address the specific opportunity
        Spike     the smallest piece of work that tests a risky assumption
```

| Level | What it is | What it is not |
| --- | --- | --- |
| **Objective** | A product outcome: a change in customer behaviour we want to see, over 3 to 6 months. | A feature, a business metric, or an output. |
| **Opportunity** | A customer need, pain, or desire, in the customer's own words. Decomposes recursively. | A solution in disguise. Test: "is there more than one way to address this?" |
| **Solution** | Something we would build for one specific opportunity, chosen against alternatives. | A vague theme. It addresses one opportunity. |
| **Spike** | The smallest experiment that produces evidence for one risky assumption. | An implementation task. It is throwaway by design. |

These four levels are the **issue types on the [FlowFuse/product](https://github.com/FlowFuse/product) board**, where hierarchy is enforced through sub-issue links. The issue templates there are the source of truth for the fields on each level; this page describes the practice, not the form.

## Evidence: how we know an opportunity is real

We grade every piece of evidence on a ladder. Higher rungs are closer to what a customer actually did, rather than what they say they might do.

| Rung | Type | Use for |
| --- | --- | --- |
| 5 | Real-life behaviour: analytics, watching live use, completed contracts | Strongest evidence. |
| 4 | Simulated: prototype test, observed action under test conditions | Evaluating a solution. |
| 3 | A specific past story: "last quarter we hit this, here is what we did" | **Primary evidence for an opportunity.** |
| 2 | Generic behaviour: "we usually run into this" | Supporting context only. |
| 1 | Speculation: "would you", feature requests, deal paraphrase, thumbs-up | Not evidence. A signal to go get a story. |

An opportunity's **state is inferred from its evidence**:

- **Hypothesis** (capture only): no evidence yet, or evidence below the bar. A valid way to record a need that surfaced from a single source (one customer call, one journey map, one internal walkthrough). Not yet ready for solutioning.
- **Evidenced** (ready for solutioning): rung 3+ evidence from at least three distinct customers.

We are honest about which state an opportunity is in rather than dressing up a hunch as research. Most of our raw signal arrives through the channels in [Feedback](./feedback.md); grading it against this ladder is what turns signal into evidence.

## Assumptions and spikes

Every solution rests on assumptions across five categories:

- **Desirability** (do customers want it?)
- **Viability** (does it work for the business?)
- **Feasibility** (can we build it?)
- **Usability** (can customers use it?)
- **Ethical** (could it cause harm?)

Before we commit engineering to a solution, we identify its **riskiest assumptions** (high importance, low existing evidence) and test them with the cheapest experiment that produces real evidence: a **spike**. Common spike shapes are mining existing data, a fast prototype, a one-question survey, or a focused engineering investigation. A solution whose riskiest assumptions have not been tested is not ready to build, however confident we feel about it.

## From discovery to delivery: the Nearsighted Roadmap

OST tells us *what is worth building and why*. The **Nearsighted Roadmap** tells us *how precisely we can plan it, given how far out it is*. The two play different roles, and they complement each other.

| Horizon | Contains | Precision |
| --- | --- | --- |
| **Now** | Validated solutions, in a current cycle. | Concrete and committed. |
| **Next** | Evidenced opportunities, grouped by theme. | Directional. |
| **After** | The objectives we are pursuing. | Intent. |

Why they fit together:

- **Investment goes where evidence points.** OST keeps Now-bucket work grounded in what customers actually do, not what we assume.
- **Confidence and commitment line up.** We commit firmly where we know, and stay open further out, so we can shift as discovery evolves.
- **Strategy stays traceable.** Objectives sit at the top, evidenced needs in the middle, committed work at the bottom. Anyone reading the tree can trace why a given thing is being built.

## Our two core product conversations

Discovery and delivery run as two distinct conversations with different purposes, outputs, and owners.

### Outcome to Solution (discovery)

- **Purpose:** settle the **what and why**. What should we build, and is it the right thing?
- **Owner:** Product brings the outcome and the opportunity into focus. Product and engineering collaborate to choose the solution.
- **Produces:** the job to be done (JTBD), the chosen solution, success criteria (how we will know it worked), and the risky assumptions plus the spikes needed to de-risk them.
- **Cadence:** held ad hoc, per outcome, as outcomes are ready to be worked.

### Refinement (delivery)

- **Purpose:** settle the **how**, and only the how. The solution is already chosen; how do we get there in technical terms?
- **Owner:** Engineering owns it and defines the solution and implementation issues.
- **Produces:** story breakdown, technical path, acceptance criteria (did we deliver what we said we would?), and estimates.
- **Cadence:** fast and focused. If a refinement turns into a debate about whether we are building the right thing, that is the signal it belongs in an Outcome to Solution conversation instead.

| | Outcome to Solution | Refinement |
| --- | --- | --- |
| Question | What should we build, and is it right? | How do we build what we chose? |
| Mode | Discovery | Delivery |
| Owner | Product (with engineering) | Engineering |
| Produces | JTBD, chosen solution, success criteria, risky assumptions + spikes | Story breakdown, technical path, acceptance criteria, estimates |

## Who owns what

| | Owns |
| --- | --- |
| **Product** | The *why* and *what*: outcomes, opportunities, desirability, viability. Brings the outcome into focus. |
| **Engineering** | The *how*: technical path, feasibility, implementation. Defines the implementation issues. |
| **Together** | The handoff: turning a chosen solution into something buildable, and surfacing the risky assumptions to test. |

## How this connects to delivery

Once a solution's riskiest assumptions survive their spikes, refinement breaks it into implementation issues that flow into [sprint planning](/handbook/engineering/project-management/#sprint-planning-friday). Discovery decides the right thing, refinement decides how, and sprint planning commits the work.
