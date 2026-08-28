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

### Formula

$$
b(n) = \min\left( C,\ B \cdot \frac{e^{1/M} - 1}{e - 1} \cdot e^{(n-1)/M} \right)
$$

The monthly bonus is the sum of $b(n)$ over all qualifying meetings in the
month. The per-meeting bonus ramps up exponentially with each additional
meeting until it reaches the cap $C$ at the $M$-th meeting, after which every
further meeting is paid at the cap.

For payout timelines and submission requirements, see
[Processing non-commission Bonuses](/handbook/operations/commission-payment/#processing-non-commission-bonuses).
