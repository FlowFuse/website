---
title: Application Roles from SSO Groups
description: Control Application level Role overrides from SSO Groups
date: 2026-07-15 12:00:00
authors: ['ben-hardill']
tags:
 - changelog
issues:
 - https://github.com/FlowFuse/flowfuse/issues/7396
---

Application level Role overrides can now be managed by SSO Group membership.

As well as Team wide Role membership additional groups can be used to apply Role overrides to specific Applications.

This works for both SAML and LDAP based SSO, the documentation outlining the required group naming can be found [here](https://flowfuse.com/docs/admin/sso).

For example for a Team with the slug `development` and an application called `test` a user in the following groups would have `member` level access to the Team and `owner` level access to the `test` Application.

- `ff-development-member`
- `ff-development[test]-owner`

This is available to FlowFuse Cloud Teams now and will be available to Self Hosted customers from version 2.33.0 onwards.