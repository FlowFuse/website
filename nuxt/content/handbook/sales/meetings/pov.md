---
title: "Proof of Value"
navigation:
  order: 4
---

## Proof of Value

A Proof of Value (PoV) is the stage where FlowFuse and the prospective customer
jointly prove that FlowFuse solves the specific problem uncovered during
[Discovery](/handbook/sales/meetings/discovery/) and shown in the
[Demo](/handbook/sales/meetings/demo/). Unlike a generic "kick the tyres" trial,
a PoV is scoped in the [Solution](/handbook/sales/meetings/solution/) stage — the
apps that will solve the use case, the success criteria they are judged against,
and the plan are all agreed before it starts — and it ends in a clear decision.

## Where a PoV fits in the sales process

A PoV is **[stage 4 — Validate](https://docs.google.com/spreadsheets/d/1WKz_ll6bLxkkRlZ4K94Va1laGksHXleo8Pnv0aB08lU/)** of the sales process: the technical heart of the
Evaluation phase, jointly owned by the **AE and SE**. It is where a deal moves
from *best case* into *forecast* — the customer has agreed the problem is worth
solving, and the PoV proves FlowFuse is the solution. A **completed installation**
and **technical validation** against the agreed criteria are the exit signals that
carry the deal out of Validate toward Commit.

It runs in three arcs — the same three that shape the [Process](#process) below
and the workbook's **Plan** tab:

| Arc | Sales stage | What happens |
|------|-------------|--------------|
| **Pre-PoV** | [Solution](/handbook/sales/meetings/solution/) (stage 3) | The gates are produced — use case and value understood, apps and success criteria defined, plan agreed, FlowFuse available (see the [Pre-PoV checklist](#pre-pov-checklist)). A PoV should not start until they are. |
| **PoV** | Validate (stage 4) | Prove each scoping criterion. Completed installation and technical validation are the exit criteria. |
| **Post-PoV** | Moving to Commit (stage 5) and Closing | A successful PoV feeds the business case, Economic Buyer alignment and paper process that carry the deal to close. |

A PoV is run from the **[PoV Workbook](/handbook/sales/pov-workbook/)** — the single
document that spans the whole engagement — using the shared
[definitions](/handbook/sales/pov-workbook/#definitions) defined there. This page
covers the PoV stage itself: [where it fits](#where-a-pov-fits-in-the-sales-process)
in the sales process, and the [process](#process) of running one.

## Process

A PoV moves through a small number of phases, all tracked in the workbook's
**Plan** tab: **pre-PoV gates** clear, then **kickoff** (agree the plan and
success criteria, and schedule every check-in and the wrap-up), **install**,
**execute** (prove each scoping criterion in turn), and **wrap-up** (sign-off
against the criteria). The commercial follow-on lives in the **Post-PoV** section
of the same plan.

### Pre-PoV checklist

Before a PoV starts, five things must be true. The first four are the output of
the [Solution](/handbook/sales/meetings/solution/) stage (stage 3) — they are
produced there, not during the PoV — and the fifth is getting access. They are
also the gates tracked in the workbook's **Plan** tab. Starting a PoV before they
are met is the most common way one stalls.

1. **The use case and its business impact are understood.** [Discovery](/handbook/sales/meetings/discovery/) has established the pain and what solving it is worth to the customer.
2. **The apps are defined.** The app or apps that will solve the use case are identified and follow FlowFuse's app delivery methods, so the PoV showcases FlowFuse as an app-building platform — not a test of Node-RED.
3. **Success criteria are well defined.** Each criterion has a concrete, agreed pass signal, so "success" is not open to interpretation when the PoV ends.
4. **The plan is agreed with the customer.** Tasks, owners and dates are agreed jointly, not just internally.
5. **FlowFuse is available to test.** The customer has either installed FlowFuse (self-hosted) or signed up for a Cloud trial — set up as the [FlowFuse Trial Environment](/handbook/sales/flowfuse-trial-environment/) during the Solution stage. For a self-hosted install this is more than "installed": the environment must be able to reach the hosts FlowFuse needs — in particular to **install and update nodes and packages** — with any firewall change requested *and proven* before the PoV starts, not discovered mid-PoV. See [Networking requirements](/docs/install/networking-requirements/).

### PoV meetings

Every PoV meeting is scheduled up front, at the kickoff, so the cadence is agreed
and the wrap-up is already on the calendar before any testing begins.

- **Kickoff** — the customer formally agrees to the PoV, the plan and success criteria are confirmed, and every subsequent meeting (the check-ins and the wrap-up) is scheduled. For a self-hosted PoV, this is where the customer receives the [trial license key](#generating-a-license) to install on their own server.
- **Check-ins** — a regular cadence agreed at kickoff. Each check-in reviews progress against the scoping criteria and clears blockers; open items are tracked in the workbook's **Questions** tab between calls.
- **Wrap-up / feedback meeting** — a final session, also booked at kickoff, to review the PoV against its success criteria, capture the customer's feedback, and agree the next step toward Commit.

### Licensing

Getting the customer a running FlowFuse — the
[FlowFuse Trial Environment](/handbook/sales/flowfuse-trial-environment/), a Cloud
trial or a self-hosted install — is set up in the Solution stage. The licensing
tasks the SE performs during the PoV live here. A **license key applies only to
self-hosting**; a Cloud trial never needs one.

#### Generating a license

- Generate one by [filling out this form](https://energetic-sanderling-4472.flowfuse.cloud/dashboard/license){rel="nofollow"}.
- Trial license expiry date should be set for 30 days, even in cases where longer than 30 days may be warranted.
- Include 10 users, 10 teams, and 10 Node-RED instances on the Enterprise Tier.

All generated licenses are added [to this sheet](https://docs.google.com/spreadsheets/d/1wM_o8IWjjkwi-WMRueKfS-lrmkQYzV83xm4BIzZNAO0){rel="nofollow"} automatically.

#### Extending a trial

- **Cloud** — use the 'Extend Trial' button on the Team Settings page (platform Administrators only). Without admin access, raise a [CloudProject change request](/handbook/operations/change/#flowfuse-cloud-change-control) with details.
- **Self-hosted** — issue a new license key with a later expiry. Trial extensions need to be approved by management.
