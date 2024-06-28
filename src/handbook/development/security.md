---
navTitle: Security Policy
---

# Security Reporting Policy

This policy relates to external disclosures of potential vulnerabilities in the
FlowFuse platform and associated components.

Our internal Incident Response plan is documented [here](../company/security/incident-response.md).

We recognise the benefit of 3rd party security researchers looking for potential vulnerabilities in our application (https://app.flowfuse.com).
However we ask researchers to do so responsibly.

Please make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.

Please refrain from:
 - Denial of service live/running services
 - Spamming
 - Social engineering (including phishing) of FlowFuse staff or contractors

Out of scope assets:
 - The marketing website (https://flowfuse.com - forms, chat, etc)
 - The dashboard documentation (https://dashboard.flowfuse.com)
 - The community forum (https://community.flowfuse.com/)

## Reporting a Vulnerability

Please report any vulnerabilities discovered in FlowFuse products to `security@flowfuse.com`.
Reports must meet our [reporting requirements](#reporting-requirements) otherwise they will be rejected.

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

At our sole discretion, we may choose to reward a responsibly disclosed issue according
to their severity, impact and quality of report.

We also consider a reporter's history of reporting issues. We will not reward someone who spams
us in the hope that something sticks.

Multiple reports of the same issue manifesting in different ways will be treated
as a single report.

### Ineligible vulnerability types

The following types of vulnerability are not eligible for any reward.

 - **Admin-initiated Stored XSS / HTML Injection** - FlowFuse administrators are considered trusted users on the system. If an issue is only exploitable by administrators, then it is not eligible.
 - **Rate-limiting** - We apply rate limiting across the whole FlowFuse platform API, with different limits applied based on the context of the API. We keep the limits under review to balance security and convenience. If an issue relates to rate-limiting, but is demonstrably within our configure rate-limits, then it will not be eligible.
 - **In-App Chat** - The in-app support chat is provided by a 3rd party and is out of scope of any reward. It allows file upload as means for users to share information when seeking support. This does not represent a vulnerability.

### Payments

In the exceptional circumstances that we choose to reward a disclosure based on the criteria above you will be notified via the email used to submit the disclosure. If you have sent multiple reports we may choose to produce a combined response rather than reply to each email individually.

Rewards are paid in accordance with our [vendor process](/handbook/operations/vendors/#process).
