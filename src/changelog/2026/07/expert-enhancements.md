---
title: FlowFuse Expert Enhancements
description: FlowFuse Expert now supports Insights on your devices, Platform automations, plan mode, Human in the loop and more...
date: 2026-07-02 10:00:00
authors: ["stephen-mclaughlin", "serban-costin", "andrea-palmieri"]
tags:
  - changelog
issues:

---

### Insights

With the release of device-agent 4.0.0 and FlowFuse 2.32.0, FlowFuse Expert Insights Agent can now work with Remote instances and Self Hosted Instances.

#### Screenshots

![Resource from Hosted and Remote Instances can now be selected](./images/insights-1.png){data-zoomable}
*Resource from Hosted and Remote Instances can now be selected*

![Insights querying a Remote Instance](./images/insights-2.png){data-zoomable}
*Insights querying a Remote Instance*

![Insights in an action](./images/insights.gif){data-zoomable}
*Insights in an action - querying a Remote Instance*


### Platform Automations

The Expert can now take action on your FlowFuse platform directly. Instead of telling you which buttons to click, it can create instances, register devices, take snapshots, and manage applications on your behalf. You can ask the Expert to:

 - Create hosted instances with the right type, stack, and template, optionally starting from a flow blueprint   
 - Register remote instances (devices) and assign them to applications                                           
 - Take and list snapshots of both hosted and remote instances                                                   
 - Create applications, list what's running inside them, and check their audit logs                            
 - Look up live status and logs for any hosted instance, or query a remote instance's state over MQTT

Behind the scenes, FlowFuse exposes over 30 automation tools covering instances, devices, applications, snapshots, teams, and configuration. When you ask the Expert to do something, it picks the right tools, calls them with your permissions, and reports back.

### Support Agent

#### Plan Mode

#### Questions and Answers

#### Human in the loop


These features are available to FlowFuse Cloud users and Self-Hosted users from v2.32.
