---
title: FlowFuse expert action links
description: When the Expert instructs you to select nodes or search flows, it now presents direct action links
date: 2026-04-09 00:00:00
authors: ['stephen-mclaughlin']
tags:
  - changelog
issues:
---

When interacting with the FlowFuse expert, you might be asked to search flows, select a node, or edit a node.
Previously, this was presented as a set of text instructions.
As of today, whenever possible, the Expert will provide clickable action links that will perform the operation for you.


![Selecting and editing nodes](./images/expert-action-links-select-edit.gif){data-zoomable}
_Selecting and editing nodes._

![Searching your flows](./images/expert-action-links-search.gif){data-zoomable}
_Searching your flows_

This feature requires **Node-RED Assistant v0.12.0** or later.

This change is live on FlowFuse Cloud. Self-Hosted users will receive it in the next release (v2.29).
