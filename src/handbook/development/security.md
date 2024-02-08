---
navTitle: Security Policy
---

# Security Reporting Policy

This policy relates to external disclosures of potential vulnerabilities in the
FlowFuse platform and associated components.

Our internal Incident Response plan is documented [here](../company/security/incident-response.md).

We recognise the benefit of 3rd party security researchers looking for potential vulnerabilities in our software. However we ask researchers to do so responsibly.

Please make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.

Please refrain from:
 - Denial of service live/running services
 - Spamming
 - Social engineering (including phishing) of FlowFuse staff or contractors

## Reporting a Vulnerability

Please report any vulnerabilities discovered in FlowFuse products to security@flowfuse.com.

We will endeavour to acknowledge and fix any reported vulnerabilities as soon as possible based
on its severity and assessed impact to our users.

### Reporting Requirements

We will evaluate all submissions made in good faith, however we do require a minimum set of information
to be included for a report to be considered. This is intended to discourage spam submissions as they
do not benefit anyone involved.

1. Time/date (UTC) the issue was discovered
2. Username/email of any users involved with the issue
3. URLs involved in the issue; simply providing the home url of our website is not sufficient

The more concrete information that can be provided in the initial issue report, the quicker we will
be able to evaluate it.

We reserve the right to reject any submission that fails to provide sufficient details. We will also
record submissions that turn out to be invalid or lack supporting evidence. Where there becomes a
pattern of such submissions from an individual, this will have a bearing on any future consideration
of bug bounty rewards for genuine issues they submit.

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

To claim your reward, please create an invoice and file [in accordance with our vendor process](/handbook/operations/vendors/#process).
