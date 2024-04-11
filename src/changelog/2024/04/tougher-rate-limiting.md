---
title: Tougher Rate Limiting on Public Routes
date: 2024-04-11 12:01:01.0
authors: ["nick-oleary"]
tags:
    - changelog
---


Running any service on the internet requires constant vigilence on security issues. One feature
we've had in place for some time on FlowFuse Cloud is rate-limiting on our API. This limits how
often someone can repeatedly call the API within a certain time frame.

We want to make sure we deter any misbehaviour, without getting in the way of genuine access.

For example, it would be entirely legitimate for a customer to use our [API]() and automate some tasks via script. These API calls would arrive faster than if they were manually clicking around the FlowFuse UI, but that doesn't mean they should be restricted. 

We also look to areas of the API that could be misused - for example, anything that can trigger an email to be sent, such as the "I forgot my password" API.

Tuning the rate-limiting is a continual process, and in that spirit we've recently made the rate limiting on certain routes to be much tougher and improved the feedback in the UI just in case a legitimate user accidentally hits it.

The tougher limits act as a better deterent, which in turn makes the platform more secure.

