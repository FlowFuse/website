---
title: PostgreSQL Version update
description: FlowFuse now deploys to ARM64-based Kubernetes clusters with local PostgreSQL databases. Helm Chart v2.1.0 uses Bitnami PostgreSQL tag 14.10.0-debian-11-r30 for AMD64 and ARM64.
date: 2024-02-15 13:00:00.0
authors: ["ben-hardill"]
tags:
    - changelog
---

Included in the v2.1.0 release the Helm Chart now uses `14.10.0-debian-11-r30` tag of the Bitnami PostgreSQL container.

This container tag includes images for both AMD64 and ARM64 allowing FlowFuse to be deployed to now fully ARM64 based Kubernetes clusters when using local PostgreSQL database.