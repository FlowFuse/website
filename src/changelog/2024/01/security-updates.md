---
title: Security Updates
description: "Security Updates: We've strengthened user privacy and platform security with stricter rate limiting and improved password-reset flows."
date: 2024-01-17 13:00:00.0
authors: ["nick-oleary"]
tags:
    - changelog
---

As part of our dedication to providing a secure platform for our customers, we
operate a [Bug Bounty programme](https://flowfuse.com/handbook/engineering/security/)
to encourage responsible disclosure of potential issues.

With all disclosures we evaluate their severity in terms of their direct impact,
the nature of the issue and overall risk.

We have received a number of reports recently that we have been evaluating. Whilst
none of the recent disclosures has been deemed high severity, we have applied a number
of updates to the platform.

These include:

 - Tougher rate limiting on routes that manage user information including email addresses
 - Better handling of the password-reset flow to prevent stale links being reused
 - Avoiding disclosure of a user's email address to other members of a team

This last item is one I wanted to say a bit more about. As you would expect, a
user's email address is sensitive information that we do not disclose to unauthorised
users. However, we also consider a Team as having a higher level of trust between its
members. On review, we have decided there is not a technical reason for this higher
level of trust to include a member's email address, so we have removed it from
the relevant API responses.

We value the effort people put into making responsible disclosures to us and look
to reward the work where it meets our criteria.

Find out more about our [Bug Bounty programme](https://flowfuse.com/handbook/engineering/security/).



