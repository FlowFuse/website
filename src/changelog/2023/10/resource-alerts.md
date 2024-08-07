---
title: Resource Monitoring in Audit Log
description: FlowFuse Audit Log now monitors CPU and memory resource usage. Track instances exceeding 75% utilization over five minutes for better sizing decisions.
date: 2023-10-26 10:00:00.0
authors: ["marian-demme"]
tags:
    - changelog
---

In the FlowFuse Audit Log (see [Documentation](https://flowfuse.com/docs/user/logs/#audit-log))of an instance, it will now display when the resource utilization of CPU or memory exceeds 75% over a period of five minutes. This should provide transparency regarding resource utilization and serve as an indicator for choosing the appropriate instance size.

![Audit Log Screenshot](./images/Screenshot-alert.png)