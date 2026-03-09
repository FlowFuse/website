---
title: HA Hosted Instance Rolling Restart
description: Hosted Instances with HA enabled will now restart one at a time
date: 2026-02-12 12:00:00.0
authors: ['ben-hardill']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/6532
---

As part of FlowFuse v2.27.0 release the behavior of Hosted Node-RED instances with HA enabled has been updated to reduce the down time experienced.

Any action that triggers a restart of the Node-RED instance (manually triggered or as part of a Pipeline deploy) will now restart them in sequence rather than in parallel. This means that there should be no down time for this instance.

This feature is available to Enterprise Licensed Self Hosted users and Enterprise tier users of FlowFuse Cloud.