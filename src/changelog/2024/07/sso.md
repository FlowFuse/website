---
title: Single Sign On Updates
description: "Direct User Provisioning and Admin Group management"

date: 2024-07-24 13:00:00.0

authors: ["ben-hardill"]
tags:
    - sso
---

In the v2.7.0 release we have included some new SSO features

## User creation on first log in

Before v2.7.0 users needed to be created before they could use SSO to 
log in to FlowFuse. Now if enabled in the SSO configuration users will
be created when they first sign in. If team membership is controlled by
SSO Groups (SAML only) then they will be added to the relevant teams, otherwise if the system is configured to create a Team for a new user it will do so.

FlowFuse Cloud customers should contact support to discuss enabling this
feature for their teams.

## Managing FlowFuse Admins with SSO Groups

It is now possible to configure a group to manage which users are granted
administration privileges. The name of the group can be added to the SSO 
configuration (SAML only).

NOTE: It is advised to maintain a backup admin user that does not 
authenticate via SSO so ensure access can be maintained if the SSO 
provider is unavailable. Also the system will not remove the admin flag 
from a user if that would leave the platform with no admins even if they 
removed from the group.

This feature is not available to FlowFuse Cloud customers.