---
title: "Account-Based Marketing"
---

# Account-Based Marketing (ABM)

Account-Based Marketing is one of the three pillars of the [Marketing
department](/handbook/marketing/), alongside our
[Content Strategy](/handbook/marketing/content-strategy/) and
[Events](/handbook/marketing/events/) programs. Where content and events cast
a wide net, ABM focuses marketing and sales effort on a defined list of
high-value target accounts.

## Where ABM shows up today

ABM at FlowFuse is currently expressed through a few concrete activities
rather than a single dedicated program page:

- **Paid advertising**: targeted ABM campaigns on LinkedIn and Google Ads are
  run as part of [Demand Generation](/handbook/marketing/programs/)
  to reach specific target accounts, drive traffic to key content, and
  generate MQLs.
- **Intent signals**: ad interaction data from ABM platforms (e.g. ZenABM) is
  one of the behavioral signals used to classify
  [Intent Outbound leads](/handbook/marketing/lead-activation/#intent-outbound-push-based-on-behavior),
  alongside website visit tracking (HubSpot Intent, Warmly) and content
  engagement patterns.
- **Sales execution**: Account Executives are directly responsible for
  targeting key accounts using an ABM approach in their region — see the
  [Account Executive job description](/handbook/peopleops/job-descriptions/account-executive/)
  for the EMEA, US, and other regional variants.
- **Digital marketing skills**: familiarity with LinkedIn ABM tooling is
  listed as a core skill for the
  [Developer Relations Advocate role](/handbook/peopleops/job-descriptions/developer-relations-advocate/),
  reflecting how ABM campaigns are supported cross-functionally.

## How it fits together

1. Sales and marketing agree on a
   [target account list][hubspot-target-list],
   based on our
   [Ideal Customer Profile (ICP)](/handbook/marketing/messaging/#ideal-customer-profile-icp).
2. Marketing runs targeted paid campaigns (LinkedIn, Google Ads) against that
   account list as part of Demand Generation.
3. Engagement and ad-interaction data from ABM tooling feeds into lead
   scoring, surfacing accounts as Intent Outbound leads for sales follow-up.
4. Account Executives use ABM to prioritize and engage these key accounts
   directly, tracking outcomes in [HubSpot](/handbook/sales/hubspot/).

## Loading the target account list into LinkedIn

LinkedIn ABM campaigns target the same
[target account list][hubspot-target-list]
maintained in HubSpot, loaded into LinkedIn Campaign Manager as a Matched
Audience. To (re)load the list:

1. In HubSpot, open the
   [target account list][hubspot-target-list]
   and export it as a CSV, including the following columns: first name,
   last name, email, job title, country, Google Advertising ID (googleaid),
   and company (from the contact's company property, used as the company
   name).
1. Rename the exported columns to the headers LinkedIn expects:
   `email`, `firstname`, `lastname`, `jobtitle`, `employeecompany`,
   `country`, and `googleaid`.
1. In [LinkedIn Campaign Manager][linkedin-campaign-manager], go to
   **Plan > Audiences**.
1. Select the existing ABM target account audience (or create one if it
   doesn't exist yet) and choose to match on a company/contact source.
1. Upload the renamed CSV to update the audience.
1. Confirm the upload — LinkedIn will match contacts from the list against
   its own member database and refresh the audience once matching
   completes (this can take up to a day).
1. Check that the active ABM campaigns are still targeting this audience
   after the refresh.

The target account list is **dynamic** — accounts are added and removed by
sales and marketing as the ICP fit and pipeline priorities change. Because
LinkedIn does not sync the list automatically, the operator running ABM
campaigns must repeat these steps **weekly** to re-export the latest list
from HubSpot and re-upload it, so LinkedIn targeting stays in sync with the
current target accounts.

## Related pages

- [ABM target account list][hubspot-target-list]
- [Marketing Programs](/handbook/marketing/programs/)
- [Lead Activation](/handbook/marketing/lead-activation/)
- [Messaging & ICP](/handbook/marketing/messaging/)
- [Account Executive job description](/handbook/peopleops/job-descriptions/account-executive/)

[hubspot-target-list]: https://app-eu1.hubspot.com/contacts/26586079/objectLists/2463/filters
[linkedin-campaign-manager]: https://www.linkedin.com/campaignmanager/accounts/512972960/overview?businessId=personal
