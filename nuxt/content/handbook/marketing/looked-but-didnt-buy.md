---
title: "Looked But Didn't Buy (LBDB) Campaign"
---

# Looked But Didn't Buy (LBDB) Campaign

The LBDB program is an SDR-run re-engagement campaign where the targets are
contacts who showed real buying intent in the past. Business users for FlowFuse
Cloud, or MQLs that never scheduled a meeting, etc.

Targets can be found in Hubspot:

- Lifecycle stage remains 'MQL' after 90 days. And no deal is associated with the
  company they work at, or has gone stale.
- Contacts who signed up for the [FlowFuse Cloud free trial](/handbook/marketing/programs/#3-brand--product-marketing)
  but let it expire without upgrading to a paid plan.

Both groups self-qualified as having a real use-case for FlowFuse. They are not
cold outbound — they're [warm outbound](/handbook/marketing/lead-activation/#warm-outbound-push-based-on-relationship).

## Execution 

### Segment definition and source of truth

The SDR pulls the working list from HubSpot, filtered to **one of**:

- Lifecycle stage `MQL` (or higher) with no associated closed-won/closed-lost
  deal, and no meeting booked in the last 90 days
- Contacts tagged as a FlowFuse Cloud trial signup whose trial has expired
  without an upgrade.

See [HubSpot Contact Management](/handbook/sales/hubspot/#lifecycle-stage) for
lifecycle stage definitions. Trial status is sourced from product usage data
synced into HubSpot; where available, the SDR should also check
[product usage signals](https://product-metrics.flowfuse.cloud/dashboard/product)
(e.g. how far the contact got in onboarding) to prioritize and personalize
outreach.

### Cadence

LBDB is worked as a standing block of SDR time, as contacts enter the segment
automatically.

A contact who re-engages moves out of LBDB and into standard pipeline
process; a contact who doesn't respond after a full sequence is suppressed
for a cooldown period before becoming eligible again.

### Messaging

Each contact gets a multi-touch outreach sequence (email + LinkedIn + call,
following the SDR's standard warm-outbound sequence cadence) rather than a
single email blast.

Because these contacts are warm, not cold, outreach should explicitly
reference the prior interaction rather than restart from a generic pitch.

1. Reference the specific content/webinar/signal that originally qualified them,
and connect it to what's changed since (new feature releases, a relevant customer
story, pricing changes).
2. Reference how far they got in the trial and what stopped them 
(e.g. "I noticed you had a couple of flows running on FlowFuse Cloud but didn't
get to invite your team — happy to help you pick that back up"). Where the
reason for lapsing is known (e.g. from a prior conversation), address it
directly rather than ignoring it.

### Tracking and reporting

- Every LBDB touch is logged in HubSpot against the contact, tagged so it can
  be filtered as part of this campaign in
  [Campaigns (internal)](https://app-eu1.hubspot.com/marketing/26586079/campaigns/views/all),
  per the standard
  [campaign performance tracking](/handbook/marketing/programs/#6-new-marketing-campaigns-process)
  requirement.
- Outcomes tracked: contacts worked, response rate, meetings booked, and
  meetings that progress to pipeline — reported alongside other SDR
  [First Meetings](/handbook/marketing/sdr/#bonus-structure) activity.
- LBDB-sourced meetings count toward the SDR's standard First Meetings goal;
  the campaign is a lead source, not a separate quota.
