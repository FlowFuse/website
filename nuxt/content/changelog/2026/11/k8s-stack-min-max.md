---
title: Kubernetes Stack Memory and CPU allocations
description: Over commit Memory and CPU allocations to pack more Instances on to Nodes
date: 2026-11-03 12:00:00
release: "3.2"
authors: ["ben-hardill"]
tags:
 - changelog
issues:
 - https://github.com/FlowFuse/driver-k8s/issues/397
---

## More control

Kubernetes allows Pods to request both a minium and a limit value for both CPU and Memory resouces. Updates to the FlowFuse Kubernetes driver in v3.2.0 now allows these values to be set independently rather than setting them to the same value.

This allows Kubernetes to over commit resources on nodes while ensuring all Instances can always get the minimums and allow them to temperarily ramp up to the limits.

[Kubernetes Stack Properties Panel](/changelog/2026/11/k8s-stack-properties.png)

*Kubernetes Stack Properties Panel*

## Stack updates

When updating Stack container images you will need to add minimum values to the configuration, to maintain the previous behaviour set the mimimum to the same as the existing maximum values.