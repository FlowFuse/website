---
title: Enforcing Enterprise Restrictions
description: "A stricter approach to expired licenses"

date: 2024-07-24 13:00:00.0

authors: ["ben-hardill"]
tags:
    - license
    - enterprise
---

Starting with the v2.8.0 release we will be taking a slightly stricter 
approach to Self Hosted Licenses. Previously when a license expired the
platform would continue to run with the same capabilities as when the
license was valid.

If you are currently running with older version with an expired license
please contact the Sales team to discuss renewing your license before 
upgrading. You can check your current license on the 
Admin Settings -> Overview page.

## Notifications

Starting 30 days before the license expires:

- Admin users will see a banner showing the number of days left.

   ![expiring banner](images/expiring-banner.png)
- A email will be sent to all Admin users.

The email will be sent again every Sunday evening in the 30 days.

## After Expiry

- All running instances will be suspended.
- Instances will not be stared.
- No new Instances or Devices can be created.
- A email will be sent to all Admin users saying the license has expired.
- A banner showing the license as expired will be shown to all users.

   ![expired banner](images/expired-banner.png)
- All connections to the MQTT broker will be refused (This will impact 
Project Nodes and Device control).

## Applying a New License

A new license can be applied in the Admin Settings -> Settings section.

Once applied you will be able to restart all existing Instances and 
create new Instances and Devices. The MQTT will accept new connections.