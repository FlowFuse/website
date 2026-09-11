---
title: "FlowFuse Trial Environment"
navigation:
  order: 13.6
  icon: i-lucide-server
---

## FlowFuse Trial Environment

The **FlowFuse Trial Environment** is the environment a customer uses to evaluate FlowFuse
during a Proof of Value — a first-class asset of the engagement, alongside the
[PoV Workbook](/handbook/sales/pov-workbook/). It is set up in the
[Solution](/handbook/sales/meetings/solution/) stage (it is item 5 of the
[Pre-PoV checklist](/handbook/sales/meetings/pov/#pre-pov-checklist)) and is where
the [PoV](/handbook/sales/meetings/pov/) is run.

**Where FlowFuse lives defines it.** The architecture decision of where FlowFuse
itself runs — in the cloud, or on the customer's own infrastructure — is the same
decision as which trial environment they get. See
[Architectures](/docs/application-guide/architectures/) in the Application Guide.

## Two forms

### Cloud trial

The prospect self-services at https://app.flowfuse.com/account/create for a 30-day
trial of FlowFuse Cloud. To test Enterprise features, apply a coupon code to their
Stripe account and elevate their Tier after they create the trial account.

### Self-hosted

The customer installs FlowFuse on their own server. A self-hosted install needs a
trial [license key](/handbook/sales/meetings/pov/#generating-a-license) to unlock
paid-for features, and every self-hosted PoV call should have an engineer present.

The licensing tasks — issuing a key and extending a trial — are covered on the
[PoV page](/handbook/sales/meetings/pov/#licensing).

## When trial licenses are used

Trial licenses are not a general giveaway — they exist to support the sales
process and help a customer understand the value of the platform.

- **Open source** — any customer can use the open-source version of FlowFuse for whatever they want, no license required.
- **Cloud trial** — the FlowFuse Cloud trial area is free for 30 days by default, self-service, with no license needed.
- **Trial (Enterprise) licenses** — self-hosted trial license keys are handed out **only within a defined PoV process**. Their purpose is to let the customer evaluate the Enterprise platform during a scoped Proof of Value, not to provide free Enterprise use outside one.
