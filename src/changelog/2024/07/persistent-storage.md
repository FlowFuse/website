---
title: Persistent Storage on FlowFuse Cloud
description: Bring persistent storage to FlowFuse Cloud and self-hosted Kubernetes platforms
date: 2024-07-04 13:00:00.0
authors: ["ben-hardill"]
tags:
    - changelog
---

Users of FlowFuse Cloud and self-hosted users on Kubernetes can now make use of a 
new persistent storage solution.

Starting with the v2.6.0 release the Pods running the Node-RED Instances will have 
a Persistent Volume mounted on `/data/storage` in which files can be written. These
files will persist for the lifetime of the Instance including across Susspend/Resume
and Stack upgrades.

This update means nodes like [node-red-node-sqlite](https://flows.nodered.org/node/node-red-node-sqlite) can be used to store data safely.

This capability replaces the current FlowFuse FileServer which made use of custom 
versions of the Node-RED code File nodes to store and read files from a remote network
store. However this didn't allow 3rd party nodes to also benefit from the storage provided.

New instances created will default to use the new Persistent Storage volumes. If you want to upgrade an existing instance that uses the FileServer storage, get in touch with [Support](https://flowfuse.com/contact-us/) and we can help migrate your data over.

Similar support for Docker will be available in later releases.