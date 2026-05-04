---
title: Managing Team Membership via SSO
description: "Enhance Team Membership Management via SSO: Update roles in FlowFuse with providers such as Okta and Microsoft Entra, ensuring streamlined access control."
date: 2024-01-17 13:00:00.0
authors: ["nick-oleary"]
tags:
    - changelog
---

For organizations using Single Sign-On with FlowFuse, we have now added the ability
to manage their user's team memberships and roles via their Identity Provider.

This makes it easier to control access to the FlowFuse Platform from providers such
as Okta and Microsoft Entra. For example, you can create a group of Team Owners 
and a separate group of Team Viewers.

Whenever a user logs in via SSO, the platform will update their roles to match
the groups they are in.

More information on configuring groups can be found in [our Single Sign-on](https://flowfuse.com/docs/admin/sso/)
documentation.

This feature is available to Enterprise Tier teams on FlowFuse Cloud, as well as
self-hosted Enterprise instances.
