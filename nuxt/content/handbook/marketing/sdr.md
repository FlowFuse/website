---
title: "Sales Development Representative (SDR)"
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
increases with the SDR's running meeting count for that month, up to a cap:

Variables
- $n$: the sequence number of the meeting within the month (1 for the
  SDR's first qualifying meeting that month, 2 for the second, and so on)
- $B(n)$: the bonus earned for that meeting

### Formula

$$
B(n) = \min(38.18 \times n, 500)
$$

The monthly bonus is the sum of $B(n)$ over all qualifying meetings in the
month. For example, 10 First Meetings in a month earn
$\sum_{n=1}^{10} B(n) \approx \$2{,}100$. Once $n$ reaches 14 ($38.18 \times 14
> 500$), each further meeting is capped at $500.

For payout timelines and submission requirements, see
[Processing non-commission Bonuses](/handbook/operations/commission-payment/#processing-non-commission-bonuses).

#### CRM Hygiene

The SDR is responsible for keeping lifecycle stage and lead status current in
HubSpot based on the outcome of each call. Lifecycle stage will be set to
`Disqualified` and lead status will be set to `Unqualified` for all contacts
that have no business relevance.

##### SDR Focus Areas

**Warm outreach:**
- Webinar follow-up
- Free trials that didn't convert
- Tradeshow follow-up
- Case study downloads
- Contact Us forms

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
