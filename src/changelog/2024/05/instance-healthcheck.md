---
title: Customizing instance health-check settings
description: FlowFuse now allows customization of instance health-check intervals to optimize performance for intensive workflows. 
date: 2024-05-09 13:00:00.0
authors: ["nick-oleary"]
tags:
    - changelog
---

When running Node-RED within FlowFuse, the platform actively monitors the instances
to make sure they are running smoothly and automatically restarts them if it detects
a problem. It does this by regularly polling Node-RED to make sure it is still responsive.

This provides protection for the case where a user's flows accidentally creates a tight
loop in its code and locks up the runtime.

We have to do this with care; it is entirely possible that a user's flows are intentionally
doing some hard work that causes our health check to temporarily fail. For that reason,
we only restart Node-RED if it fails a number of health-check polls in a row.

But even with that in place, there are still edge cases where a user's flows need to
do some *really* hard work that can exceed what the default health-check polling is
configured to handle.

We have now added the ability to customize how often we check the instance health. By default
this is done every 7.5 seconds, but can now be extended via the instance settings.

This will require the instance to be updated to the latest stack to enable the option.

![Health check interval in Instance settings](./images/healthcheck.png)
