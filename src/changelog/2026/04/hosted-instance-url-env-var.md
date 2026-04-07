---
title: Hosted Instances know their own URL
description: Hosted Instances now get an FF_INSTANCE_URL environment variable
date: 2026-04-07 17:00:00
authors: ['ben-hardill']
tags:
 - changelog
issues:
 - https://github.com/FlowFuse/flowfuse/issues/6984
---

Hosted Instances now include an [Environment Variable](/docs/user/envvar/#standard-environment-variables) called `FF_INSTANCE_URL` which allows them to know what URL they can be reached on.

![List of Hosted Instance Environment Variables](./images/ff-instance-url-env-var.png)
_ FF_INSTANCE_URL in list of Instance Environment Variables _

For Hosted Instances with a [Custom Hostname](/docs/user/custom-hostnames/#custom-hostnames) that will be returned rather than the default Instance hostname.

Existing instances will need to be restarted to pick up the new Environment Variable.

This will be available to Self Hosted users from v2.29.0.