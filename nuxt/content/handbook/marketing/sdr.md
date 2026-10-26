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
`First Meetings`, defined as **meetings attended and qualified**. A meeting
counts as qualified when the
[qualifying questions](/handbook/sales/meetings/discovery/#qualifying-questions)
can be answered. Note that specific targets are subject to review at the start
of each month.

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

The process and tasks for paying out this bonus are described in the Operations
handbook, under [Processing Bonuses](/handbook/operations/commission-payment/#processing-bonuses).

## Daily Process

An SDR's day is split into three kinds of work: sourcing new leads, calling
them, and the administrative work that keeps everything moving.

| Block | Time per day | Focus |
| --- | --- | --- |
| Sourcing | 2 hours, in two 1-hour blocks | Finding and enriching intent-based accounts, new accounts, and ICP leads within them |
| Calling | At least 4 hours, in two blocks of at least 2 hours | Outbound calls to sequenced leads, 50 or more a day |
| Administrative work | 1–2 hours, usually at the start or end of the day | Email, meetings, sequence development, and reporting |

Plan your sourcing blocks around your calling blocks. The time zones of your
call tasks decide when you call, and sourcing fills the time around it. The
schedule can shift from day to day depending on meetings and other
administrative work.

## Meeting Tracking

When an SDR books a discovery meeting, they are also responsible for tracking
it through to completion. To make this easier, each SDR creates a HubSpot
segment named `<Your name> - SDR meetings booked`.

1. **Book the meeting.** Use the calendar of the AE who covers the lead's
territory, either through Google Calendar or HubSpot.
2. **Write the discovery note.** Paste the lead's name, email address, and your
call notes into Claude, and use the Disconotes skill to format them into a
discovery note.
3. **Share the discovery note.** Post it in the `#dept-sales` channel in Slack.
4. **Add the company to your segment.** Add it to your SDR meetings booked
segment in HubSpot.
5. **Join the first meeting.** The SDR attends the first meeting and introduces
the prospect to the AE.
6. **Reschedule no-shows.** If the prospect doesn't attend, the SDR reschedules
the meeting.
7. **Mark the meeting as completed.** Once the meeting has taken place, set its
outcome to `Completed` in HubSpot. This applies whether or not the lead moves
to SQL.

After an attended meeting, the AE creates the deal and the lead moves to SQL.
The SDR stays involved after the handoff and helps the AE with any further
outreach to the account, if needed.

## CRM Hygiene

The SDR is responsible for keeping lifecycle stage and lead status current in
HubSpot based on the outcome of each call. Lifecycle stage will be set to
`Disqualified` and lead status will be set to `Unqualified` for all contacts
that have no business relevance.

## Call Outcomes and Definitions

When you log a call, pick the outcome that best matches what happened. Using the same definitions across the team keeps our reporting accurate.

1. Busy: The prospect answered but couldn't talk. They asked you to call back or said something like "I can't talk right now" or "It's a bad time."
2. Connected: The prospect you were trying to reach answered and talked with you. They answered at least basic questions, and you gathered some information.
3. Left Live Message: You left a message with someone other than the prospect.
4. Left Voicemail: You recorded and left a voicemail for the prospect.
5. Meeting Booked: you connected with the prospect, and they booked a meeting with an AE.
6. No Answer: The prospect didn't answer, and you didn't leave a message.
7. wrong Number: The number doesn't belong to the assigned contact.

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
- Tradeshow and event follow-up (see [Events](/handbook/marketing/events/#after-the-event))
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
