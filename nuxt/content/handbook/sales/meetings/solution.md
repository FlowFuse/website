---
title: "Solution"
navigation:
  order: 3
---

## Solution

The Solution stage is **stage 3** of the sales process and the point where the
Solutions Engineer turns a understood problem into a concrete, testable plan.
[Discovery](/handbook/sales/meetings/discovery/) established the pain and the
[Demo](/handbook/sales/meetings/demo/) proved FlowFuse is credible against it;
Solution is where we decide *exactly* what we will build, how we will prove it,
and how we will run the [Proof of Value](/handbook/sales/meetings/pov/).

Everything the PoV depends on is produced here. The
[Pre-PoV checklist](/handbook/sales/meetings/pov/#pre-pov-checklist) is really the
**exit criteria of the Solution stage** — a PoV only starts once this stage has
done its job.

## Zone shapes how much Solution work is needed

The first job is to identify the customer's **zone** — where they sit on Node-RED
maturity against operational maturity. The zone decides how much shaping the
solution needs. See the
[Customer Adoption Maturity Model](https://docs.google.com/document/d/1AICvYVRnVcAnY9rpcjjJMyOVqJRQQ3OFyMLD5aHP4Yo/edit)
for the full model.

- **Z4 — NR Scale, Ops-Immature** is the one zone that can start from the **pre-canned PoV workbook** (the Node-RED-scale template). The customer already runs a Node-RED estate doing real work, so the use case is essentially operating it safely at scale, and the PoV proves *both* app delivery methods against their existing flows. The Solution phase here is light — mostly confirming scope.
- **Every other zone needs a solid Solution phase.** There is no ready-made use case: you have to define the specific operational problem and the apps that matter to the customer before a PoV can start. Z2 (strong on outcomes, new to Node-RED) especially depends on anchoring a credible, solution-led use case rather than a generic scaling story.

## Designing the solution with the Application Guide

The [Demo](/handbook/sales/meetings/demo/) already introduced the
**[FlowFuse Application Guide](/application-guide/flowfuse/overview/)** and
established the [fundamentals](/application-guide/flowfuse/foundations/) and the
[app delivery methods](/application-guide/flowfuse/app-delivery-methods/). Solution
is where FlowFuse stops being a demo and becomes an **application platform**: the
SE and customer take those fundamentals and **tailor them to the customer's
environment**, working through the rest of the guide.

Work through, in roughly this order — each decision narrows what the PoV will prove:

1. **App pattern** — decide the shape each app takes: a [hardware app](/application-guide/flowfuse/hardware-apps/) running on a device, or a [software app](/application-guide/flowfuse/software-apps/) running on the platform (three shapes each). Naming the pattern is what makes the PoV a test of *applications*, not of Node-RED.
2. **Data plane** — before deciding where things run, decide how data is handled in their environment. → [Data plane](/application-guide/flowfuse/data-plane/)
3. **Architecture** — the defining decision is **where FlowFuse itself lives**: in the cloud, self-hosted on-prem, or air-gapped; serving the wider organisation from [IT](/application-guide/flowfuse/it-architectures/), sitting in [OT](/application-guide/flowfuse/ot-architectures/) near the equipment, or distributed across [IIoT](/application-guide/flowfuse/iiot-architectures/) edge nodes ([overview](/application-guide/flowfuse/architectures/)). Where FlowFuse lives sets the rest of the architecture — and is the same decision as which [FlowFuse Trial Environment](/handbook/sales/flowfuse-trial-environment/) the customer gets. This becomes the architecture stack on the PoV workbook's **Use Cases** tab.

Which delivery method(s) the PoV proves is settled here too, against the use case —
Z4 deals prove both; everyone else picks what fits. The output of this design work
— the app pattern, the delivery method(s) and the architecture, tailored to their
environment — is exactly what the PoV sets out to prove, and what makes the case
that FlowFuse is an app platform rather than a way to run Node-RED.

## What the SE produces in Solution

1. **A confirmed use case and its business impact.** The pain from Discovery is written up as a use case, with the value of solving it quantified or bounded so the deal can be forecast.
2. **The apps that will solve it.** The app or apps are scoped against FlowFuse's [app delivery methods](/application-guide/flowfuse/app-delivery-methods/) and app patterns (above), so the PoV showcases FlowFuse as an app-building platform — not a test of Node-RED. One use case may take one app or several.
3. **Well-defined success criteria.** Each thing the PoV must prove is written as a concrete pass signal both sides agree on, so "success" is settled before testing starts.
4. **An agreed plan.** The tasks, owners and dates are agreed *with the customer*.
5. **A ready environment.** The customer is set up to test in a [FlowFuse Trial Environment](/handbook/sales/flowfuse-trial-environment/) — a Cloud trial or a self-hosted install. Its form follows the architecture decision above: where FlowFuse lives.

These five outputs are the same five gates as the
[Pre-PoV checklist](/handbook/sales/meetings/pov/#pre-pov-checklist): Solution's job
is to produce all of them.

## Handoff into the PoV

When those five are in place the deal is ready to move from Solution (stage 3)
into **Validate** (stage 4) — the [Proof of Value](/handbook/sales/meetings/pov/).
The output of this stage becomes the opening tabs of the PoV workbook — the use
case, the apps, the scoping criteria and the plan — running in the
[FlowFuse Trial Environment](/handbook/sales/flowfuse-trial-environment/).
