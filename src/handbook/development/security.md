---
navTitle: Security Policy
---

# Security Reporting Policy

This policy relates to external disclosures of potential vulnerabilities in the
FlowFuse platform and associated components.

Our internal Incident Response plan is documented [here](../company/security/incident-response.md).

## Reporting a Vulnerability

Please report any vulnerabilities discovered in FlowFuse products to security@flowfuse.com.

We will endeavour to acknowledge and fix any reported vulnerabilities ASAP based
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
