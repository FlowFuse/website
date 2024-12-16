---
title: SSO Group Prefix & Suffix
description:
date: 2024-12-19 13:00:00.0
authors: ["ben-hardill"]
tags:
    - changelog
---

In order to support organisations that have strict SAML and LDAP Group name policies FlowFuse now allows a prefix and suffix length to be defined.

For example, if an organisation requires all groups to begin with `acme-org-`, a prefix length of `9` can be set and the group `acme-org-ff-development-owner` will be handled as `ff-development-owner`.

![Screenshot of the prefix & suffix length](./images/sso-group-prefix-length.png){data-zoomable}
_Screenshot of the prefix & suffix length_