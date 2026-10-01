---
title: Sales Development Representative (SDR)
description: |-
  The SDR works leads — inbound and outbound — toward a booked meeting. The role
  sits organizationally within the Marketing department, as the SDR output
  (meetings attended and qualified) depends on marketing's lead generation and
  activation work. See the SDR job description
  for the full role definition.
---

# Sales Development Representative (SDR)

The SDR works leads — inbound and outbound — toward a booked meeting. The role
sits organizationally within the Marketing department, as the SDR output
(meetings attended and qualified) depends on marketing's lead generation and
activation work. See the [SDR job description](/handbook/peopleops/job-descriptions/sales-development-representative/)
for the full role definition.

## Bonus Structure

The SDR is compensated under a monthly bonus plan tied to a single goal:
`First Meetings`, defined as **meetings attended and qualified**. Note that
specific targets are subject to review at the start of each month.

Each qualifying First Meeting in the month earns a per-meeting bonus that
increases with the SDR's running meeting count for that month, up to a cap.
**This formula applies from October 2026 onwards.**

Variables

- $n$: the sequence number of the meeting within the month (1 for the
SDR's first qualifying meeting that month, 2 for the second, and so on)
- $b(n)$: the bonus earned for that meeting
- $C$: Cap (the maximum bonus payable for a single meeting)
- $B$: Bonus (the full bonus earned for hitting quota)
- $M$: Meetings to full bonus (the number of meetings required to earn $B$,
i.e. quota)

### First Meetings Bonus Formula

$$
b(n) = \min\left( C,\ B \cdot \frac{e^{1/M} - 1}{e - 1} \cdot e^{(n-1)/M} \right)
$$

The monthly bonus is the sum of $b(n)$ over all qualifying meetings in the
month. The per-meeting bonus ramps up exponentially with each additional
meeting until it reaches the cap $C$ at the $M$-th meeting, after which every
further meeting is paid at the cap.

For payout timelines and submission requirements, see
[Processing non-commission Bonuses](/handbook/operations/commission-payment/#processing-non-commission-bonuses).

#### CRM Hygiene

The SDR is responsible for keeping lifecycle stage and lead status current in
HubSpot based on the outcome of each call. Lifecycle stage will be set to
`Disqualified` and lead status will be set to `Unqualified` for all contacts
that have no business relevance.

##### Call Outcomes and Definitions

When you log a call, pick the outcome that best matches what happened. Using the same definitions across the team keeps our reporting accurate.

-Busy: The prospect answered but couldn't talk. They asked you to call back or said something like "I can't talk right now" or "It's a bad time."
-Connected: The prospect you were trying to reach answered and talked with you. They answered at least basic questions, and you gathered some information.
-Left Live Message: You left a message with someone other than the prospect.
-Left Voicemail: You recorded and left a voicemail for the prospect. |
-Meeting Booked: you connected with the prospect, and they booked a meeting with an AE. |
-No Answer: The prospect didn't answer, and you didn't leave a message. |
-wrong Number: The number doesn't belong to the assigned contact. |

**Examples**

Left Live Message
- You call for Paul, Tom answers, and Tom offers to take a message for Paul.
- A gatekeeper answers, and you leave a message with them about why you're calling.

Wrong Number
- You call for Paul but reach someone else's direct line.
- You call for PepsiCo but reach a local bottling plant instead.

Tips

- Connected vs. Meeting Booked: If the prospect booked a meeting with an AE, log it as **Meeting Booked**, even though you also connected.
- Busy vs. Connected: If the prospect picked up but couldn't talk and you didn't gather any information, log it as **Busy**.
- Left Live Message vs. Left Voicemail: Use Left Live Message** when you spoke to a real person. Use Left Voicemail when you recorded a message.

##### SDR Focus Areas

**Warm outreach:**

- Webinar follow-up
- Free trials that didn't convert
- Tradeshow follow-up
- Case study downloads

The SDR does not respond to "Book a Demo" form submissions — these are routed
directly to the AE.

**Cold outbound:**

- Cold calling

###### SDR Credit

The SDR has a 45-day protection window, which grants sourcing credit if a lead
they worked re-enters the sales funnel through another method within that
window.

**Examples:**

1. An SDR follows up on a webinar lead, and that lead submits a "Book a Demo"
form within 45 days.
2. An SDR calls a cold lead, and that lead submits a "Book a Demo" form within
45 days.
