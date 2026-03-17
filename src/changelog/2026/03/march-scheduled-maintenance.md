---
title: "Updated: Upcoming Scheduled Server Maintenance on March 28th, 2026"
description: Keeping the FlowFuse Cloud up to date with critical server maintenance.
date: 2026-03-12 12:00:00.0
authors: ['nick-oleary']
tags:
  - changelog
---

As part of our ongoing efforts to maintain our infrastructure, we need to update some of our servers that host Node-RED instances.

This will require restarting any hosted Node-RED instances running on those servers, leading to a short downtime whilst they restart. Remote instances on the edge are unaffected.

**We will complete this migration during a 2 hour maintenance window starting at 8am UTC on Saturday 28th March 2026.**

Note: the original version of this post had the incorrect date. The mainteance is scheduled for Saturday 28th March.

### Will my instances be affected?

If your instance was created after 11th March 2026, or has been updated to the 2.28 release, it will already be running on the new servers.

Otherwise, you can take action to migrate your instance before the scheduled maintenance window at your own convenience.

If you manually suspend and restart your instance, or upgrade to 2.28 at any time before the maintenance window, your instance will not need to be restarted and no further action will be needed.

You can find the "Suspend" option from the "Actions" drop down menu on the Instance Overview page. Once the Instance reports being in the Suspended state, you can select "Start" from the same drop down menu.

We will be emailing notifications to all team owners who have instances that require a restart.

### Enabling Scheduled Maintenance Mode

Keeping instances up to date is an important task to ensure they are running with the latest features and security fixes. FlowFuse provides the ability to select a time for updates to be automatically applied to your instances. You pick which day of the week and time the platform can schedule updates in. This removes the burden for keeping things up to date.

On FlowFuse Cloud, Starter teams already have this feature enabled for their instances to apply updates at the weekend.

Pro and Enterprise teams can opt-in on the Instance Settings - Maintenance page.

More information is available in the [scheduled maintenance changelog entry](https://flowfuse.com/changelog/2025/12/scheduled-maintenance/).

