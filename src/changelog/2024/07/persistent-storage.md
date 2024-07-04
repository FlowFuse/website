---
title: Persistent Storage
description:
date: 2024-07-04 13:00:00.0
authors: ["ben-hardill"]
tags:
    - changelog
---

Users of FlowFuse Cloud and self hosting users on Kubernetes can now make use of a 
new persistent storage solution.

Starting with the v2.6.0 release the Pods running the Node-RED Instances will have 
a Persistent Volume mounted on `/data/storage` in which files can be written. These
files will persist for the lifetime of the Instance including across Susspend/Resume
and Stack upgrades.

This update means nodes like node-red-node-sqlite can be used to store data safely.

This capability replaces the current FlowFuse FileServer which makes use of custom 
versions of the Node-RED code File nodes to store and read files from a remote network
store.

New instances created will default to use the new Persistent Storage volumes, users 
with exising instances making use of the existing FileServer file storage will be able
to switch over by upgrading to the latest version of the Node-RED Stack and then contacting
Support who will be able to arrange for existing files to be moved between to the new 
volume.

Similar support for Docker will be available in later releases.