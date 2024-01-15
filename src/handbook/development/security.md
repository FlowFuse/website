---
navTitle: Security Policy
---

# Security Reporting Policy

This policy relates to external disclosures of potential vulnerabilities in the
FlowFuse platform and associated components.

Our internal Incident Response plan is documented [here](../company/security/incident-response.md).

We recognise the benefit of 3rd party security researchers looking for potential vulnerabilities in our software. However we ask researchers to do so responsibly.

Please make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.

We ask that you refrain from:
 - Denial of service live/running services
 - Spamming
 - Social engineering (including phishing) of FlowFuse staff or contractors

## Reporting a Vulnerability

Please report any vulnerabilities discovered in FlowFuse products to security@flowfuse.com.

We will endeavour to acknowledge and fix any reported vulnerabilities as soon as possible based
on its severity and assessed impact to our users.

## Bug Bounties

At our sole discretion, we offer rewards for responsibly disclosed issues according
to their severity.

Please note the following are general guidelines and any reward decisions are up
to the discretion of FlowFuse. We keep these reward levels under review to ensure
they provide a fair reflection of the issues being reported.


Low   | Medium   | High   | Critical
------|----------|--------|----------
$128  | $256     | $512   | $1024


Multiple reports of the same issue manifesting in different ways will be treated
as a single report.

The quality of bug report will also impact any ultimate reward decision.

### Sample criteria

The following are examples of the types of bug for each severity. It is not
definitive and each reported bug will be considered on its own merits.

*Critical Severity Bugs*

 - SQL Injection
 - Remote Code Execution
 - Privilege Escalation

*High Severity Bugs*

 - Cross-Site Request Forgery
 - Information leaks of user data

*Medium Severity Bugs*

 - Information leaks of non-user data

*Low Severity Bugs*

 - Exposure of any integer resource IDs (primary keys in our database)

### Payments

If a decision is made to reward a disclosure based on the criteria above you will be notified via the email used to submit the disclosure. If you have sent multiple reports we may choose to produce a combined response rather than reply to each email individually.

The following process should be followed to claim the reward.

1. Create a PDF invoice that includes:
   - An itemised list of the agreed rewards including their $ amount - they should be itemised as `Bug Bounty reward`.
   - Your contact details. This should include the email address used to report the original issue(s).
   - Payment details. Our preferred payment mechanism is via bank transfer.
2. Send the invoice to `billing@flowfuse.com`. Once the details are verified, payment will be made.
