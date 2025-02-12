---
title: External MQTT Brokers
description:
date: 2025-02-12 12:00:00.0
authors: ['ben-hardill']
tags:
  - changelog
---

As part of the v2.14.0 release we are including support for gathering data from External MQTT brokers.

This includes topic structures similar to those gathered from the FlowFuse Team Broker.

![Screenshot from creating new external broker](./images/new-external-broker.png){data-zoomable}
_Screenhot from creating new external broker_

As well as building a topic schema the message payloads will also be inspected to infer the format. Initially the payload schema supports JSON, but other payload formats may be added in future releases

![Screenshot of topic and inferred payload schema](./images/topic-and-payload-schema.png){data-zoomable}
_Screenshot of topic and inferred payload schema_

This is available on FlowFuse Cloud and for Self Hosting users with an Enterprise License on Kubernetes and LocalFS, Docker support will follow shortly.