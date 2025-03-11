---
title: Multiple Device Groups in a pipeline
description: "Device Groups can now be chained in a Pipeline, further simplifying device management across your fleet"
date: 2025-03-10 12:00:00.0  
authors: ["stephen-mclaughlin"]
tags:
  - changelog
---

Last year, we announced the introduction of Device Groups. For those that are not familiar with Device Groups, this feature enables users to logically group their Remote Instances so that they can be targeted in a DevOps Pipeline facilitating streamlined and efficient deployments across your fleet of devices.

Previously, you could only use a Group as the last stage in a pipeline. With this update, you can now have Groups at other stages in a pipeline. For example, you may have a group of test devices that you want to push updates to before pushing them out to your larger group of production devices.

This improvement not only saves time but also enhances the consistency and reliability of remote instance management across your fleet.
