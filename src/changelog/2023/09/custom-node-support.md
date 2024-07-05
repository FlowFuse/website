---
title: Custom Node Support
description: Flowfuse now supports custom Node Catalogues, letting you easily install modules from extra NPM registries to expand your Node-RED setup as needed.
date: 2023-09-28 12:01:01.0
authors: ["marian-demme"]
tags:
    - changelog
---
An often requested feature is support for custom nodes. Although Node-RED instances today connect automatically to the official Node-RED catalogue, which boasts over 4,400 custom nodes, we understand that specific use cases may require access to additional or different NPM registries and catalogues.

Starting today, you can extend your Node-RED environment by adding custom Node Catalogues. We have introduced the capability to modify the .npmrc file, allowing you to install modules that are not hosted in the official registry.

![Settings Custom Node Support](./images/custom-node-support.png)