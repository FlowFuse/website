---
title: Helm Chart v2.0 
date: 2024-01-18 13:00:00.0
authors: ["ben-hardill"]
tags:
    - changelog
---

The v2.0 release of the FlowFuse Helm Chart includes a breaking change for deployments making use of the `forge.localPostgresql` setting. This is where the helm chart installs a dedicated PostgreSQL database instance.

With v2.0 we have updated the version of the Bitnami PostgreSQL Helm sub-chart we bundle and the upgrade process will require some manual intervention to ensure things work correctly.

The steps are documented on the [Upgrade instructions](https://flowfuse.com/docs/install/kubernetes/#upgrade) page, please read them carefully before upgrading


Also included in this release is the ability to set resource constraints and Pod Security Context on the FlowFuse application, File-Server Application and MQTT broker containers if required. Details of how to set those can be found in the Helm Chart [README.md](https://github.com/FlowFuse/helm/tree/main/helm/flowforge#readme)