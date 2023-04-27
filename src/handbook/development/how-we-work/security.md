---
navTitle: Security Policy
---
# Security Policy

## Reporting a Vulnerability

Please report any vulnerabilities discovered in FlowForge products to security@flowforge.com.

We will endeavour to acknowledge and fix any reported vulnerabilities ASAP based
on its severity and assessed impact to our users.

## Bug Bounties

At our sole discretion, we offer rewards for responsibly disclosed issues according
to their severity.

Please note the following are general guidelines and any reward decisions are up
to the discretion of FlowForge. We keep these reward levels under review to ensure
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

## FlowForge critical issue resolution and update process

This guideline outlines the process for updating FlowForge, FlowForge Cloud, and Device Agent within 3 business days to mitigate potential damage to prospect systems. A critical issue is any problem that may result in significant damage to prospect systems. When such an issue is identified in our code or dependencies, the following actions must be taken:

1. Identifying Critical Issues - Label the issue as 'priority:critical' on GitHub. Notify the entire Development team immediately. Only the PM, CTO, or CEO can label issues as critical.
2. Handling Critical Issues - Stop any ongoing tasks. Assess the issue and its potential impact on prospect systems. Develop a plan for resolving the issue, considering both short-term fixes and long-term improvements. Assign tasks and deadlines to relevant team members.
3. Updating FlowForge, FlowForge Cloud and Device Agent - To update the software within the 3-business-day window, the team must implement the necessary code changes or dependency updates. Thoroughly test the changes to ensure the issue is resolved and no new problems are introduced. Deploy the updated version of FlowForge and Device Agent to prospect systems.

By adhering to these guidelines and maintaining a robust security posture, FlowForge will uphold its commitment to providing customers with software that is free from harmful components and malicious code. This will not only protect the interests of our customers but also contribute to the overall security and integrity of the digital ecosystem.

### Upstream components 
Upstream components are excluded from our obligations. In case of a critical issue related to upstream components:
1. Collaborate with the upstream component maintainer(s) to understand the issue and potential fixes.
2. Keep track of upstream fixes and implement them in FlowForge and Device Agent when they become available.
3. Communicate the issue and its resolution to relevant stakeholders.