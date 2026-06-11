---
title: "Methodology"
---

# Product Methodology

This page describes how we decide what to build, and how that work reaches engineering. The short version: we separate the **why and what** from the **how**, and we favour outcomes over outputs. The most expensive mistake we can make is building the wrong thing well.

## Two modes of work: discovery and delivery

Product work happens in two distinct modes. Keeping them separate is what keeps each one fast.

- **Discovery** is deciding the *right thing* to build: the customer problem, the opportunity it sits in, which solution to pursue, and the risky assumptions behind it. Product leads; engineering collaborates.
- **Delivery** is building the chosen thing *well*: story breakdown, technical path, acceptance criteria, estimates. Engineering leads.

When the two modes get mixed into one conversation, both suffer. A meeting meant to break a chosen solution into stories stalls when someone reopens whether it is the right solution at all. We run discovery and delivery as separate, clearly-scoped conversations (see [Product meetings](#product-meetings)).

## The Opportunity Solution Tree

We organise product work as an **[Opportunity Solution Tree](https://www.producttalk.org/2023/12/opportunity-solution-trees/)** (OST), following Teresa Torres' *Continuous Discovery Habits*. The tree connects a measurable outcome to the customer opportunities that drive it, the solutions we choose, and the experiments that build our confidence in them. This keeps our limited build capacity on evidenced customer needs, the behaviour changes that adoption and revenue follow from, rather than on assumptions.

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
| **Spike** | A quick experiment that builds confidence in one uncertain assumption. | An implementation task. It is throwaway by design. |

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

We are honest about which state an opportunity is in rather than dressing up a hunch as research.

## Gathering evidence

We gather evidence continuously, not in a once-a-quarter research push:

- **Continuous interviews, often with sales.** The strongest opportunities come from specific past stories (rung 3), and sales calls are a steady source of them. We join or review sales conversations rather than running a separate research track, and listen for the moments where a customer recounts a real problem.
- **Fathom for the qualitative record.** Customer calls are recorded in Fathom; we mine the transcripts for rung-3+ stories and link the exact moment as an opportunity's evidence. See [Feedback](./feedback.md) for the full set of channels.
- **PostHog for behavioural metrics.** What customers actually do (rung 5) comes from product analytics in PostHog: adoption, activation, and the [metrics](./metrics.md) that show whether an objective is moving.

Interviews surface the opportunity; behavioural data confirms whether a solution changed what customers do.

## Assumptions and spikes

Every solution rests on assumptions across five categories:

- **Desirability** (do customers want it?)
- **Viability** (does it work for the business?)
- **Feasibility** (can we build it?)
- **Usability** (can customers use it?)
- **Ethical** (could it cause harm?)

When we are unsure about an assumption that matters (high importance, low existing evidence), a **spike** is the cheapest way to build confidence before we invest further. A spike can take many shapes: mining existing data, a one-question survey, a fast prototype, a focused engineering investigation, or a **proof of concept (PoC)** that speeds up our understanding of how to deliver something. AI-aided development makes a PoC especially cheap to stand up, so a working PoC is often the fastest way to answer a "can we, and how, build this?" question.

Spikes are not mandatory. What we ask is that, for a solution's riskiest assumptions, the team has **considered** whether a spike would help, and made that call deliberately. Where confidence is already high, note that and move on; where it is low and the assumption matters, running a spike is the recommended way to raise it.

## From discovery to delivery: the Nearsighted Roadmap

OST tells us *what is worth building and why*. The **Nearsighted Roadmap** tells us *how precisely we can plan it, given how far out it is*. The two play different roles, and they complement each other.

| Horizon | Timeline | What sits here | Precision |
| --- | --- | --- | --- |
| **Now** | Current or next release | Validated solutions, in a current cycle. | Concrete and committed. |
| **Next** | Within the three releases after "Now" | Evidenced opportunities, grouped by theme. | Directional. |
| **Future** | Considered or aimed for beyond Next | The objectives we are pursuing. | Intent. |

These horizons are the **Opportunity Horizon** field on the [Product Planning project](https://github.com/orgs/FlowFuse/projects/3): the timeline is counted in releases, so the precision of a plan falls the further out the work sits.

Why they fit together:

- **Investment goes where evidence points.** OST keeps Now-bucket work grounded in what customers actually do, not what we assume.
- **Confidence and commitment line up.** We commit firmly where we know, and stay open further out, so we can shift as discovery evolves.
- **Strategy stays traceable.** Objectives sit at the top, evidenced needs in the middle, committed work at the bottom. Anyone reading the tree can trace why a given thing is being built.

## Product meetings

Product runs a small set of meetings, from steering objectives down to handing concrete work to engineering.

### Product <> Leadership Sync

A dedicated, high-level meeting to align on product objectives. We discuss whether we have the right [objectives](#the-opportunity-solution-tree) and [metrics](./metrics.md), our progress against them, and high-level adjustments to steer product across the [product lanes](./product-swimlanes.md).

### Product Roadmap Planning

Aligns the product roadmap across product lanes, and syncs prioritisation against each lane's product objectives. It also prepares the points to be discussed in the Product <> Leadership Sync. As part of it, Product reviews customer needs and wants from renewals and prospective deals, and the CTO brings bug reports and technical needs from engineering.

### Outcome to Solution and Refinement

Work reaches engineering through two distinct conversations. Keeping them separate is what hands engineering a clear, already-decided piece of work.

| | Outcome to Solution (discovery) | Refinement (delivery) |
| --- | --- | --- |
| Settles | What to build, and why it is right | How to build what we chose |
| Owner | Product, with engineering | Engineering |
| Produces | JTBD, chosen solution, success criteria, risky assumptions and any spikes | Story breakdown, technical path, acceptance criteria, estimates |
| Held | Ad hoc, per outcome | Once the solution is chosen |

If a refinement reopens whether we are building the right thing, that belongs back in an Outcome to Solution conversation.

These two, plus sprint planning, form one chain: **Outcome to Solution** picks the solution and the assumptions worth a spike, any **spikes** build confidence, **Refinement** breaks the chosen solution into estimated implementation issues, and [sprint planning](/handbook/engineering/project-management/#sprint-planning-friday) commits them. The same handoff is described from the delivery side under [Product Conversations Feed the Cadence](/handbook/engineering/project-management/#product-conversations-feed-the-cadence).
