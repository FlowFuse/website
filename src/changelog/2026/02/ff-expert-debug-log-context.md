---
title: "FlowFuse Expert: Helping you make sense of your debug log"
description: "You can now send debug log entries to the FlowFuse Expert as context, making it easier to track down errors in your flows."
date: 2026-03-05 13:00:00.0
authors: ['stephen-mclaughlin']
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/nr-assistant/issues/137
---

You can now send debug log entries directly to the Expert, giving it the context it needs to help you understand where an error came from and how to fix it.

Tracking down bugs means staring at a wall of debug output trying to figure out what went wrong. The Expert can now help you make sense of it.

Select any entry in the debug panel and add it as context alongside the relevant flow. The Expert will use both to help identify the source of the issue and suggest a fix.

![Sending a debug log entry to the FlowFuse Expert](./images/expert-debug-context.gif)
*Adding a log entry as context and asking the Expert to explain it*

You can also use the quick-add button in the Resource Selector to pull in your most recent log entries in one click, without having to select them individually.

![Using the Resource Selector to add log entries](./images/expert-debug-log-specific.gif)
*Using the Resource Selector to add specific log entries as context*