---
title: AI Feature Opt-Out for Teams                                                                                                                                                                                                                                                                                         
description: Team owners and platform admins can now disable all AI features at the team level, giving full control over AI functionality across the platform.                                                                                                                                                              
date: 2026-05-28 12:00:00                                                                                                                                                                                                                                                                                                   
authors: ['serban-costin']                                                                                                                                                                                                                                                                                      
tags:                                                                                                                                                                                                                                                                                                                       
- changelog                                                                                                                                                                                                                                                                                                             
issues:
- https://github.com/FlowFuse/flowfuse/issues/7316
---

You can now turn off AI features for your team from the team settings page. When disabled, FlowFuse removes the Expert Assistant, inline code completions, and snapshot description generation for your team. Running instances will need a restart for the change to fully take effect.            

![AI Features toggle in team settings](./images/ai-opt-out-toggle.png){data-zoomable}                                                                                                                                                                                                                                       
*Opt out of AI features from the Danger section in team settings.*

The toggle is on by default for all teams. Flipping it off shows a confirmation dialog so you don't accidentally disable it. If you change your mind later, just flip it back on.

Self Hosted Enterprise customers also get platform-level and team-type-level AI controls, so admins can control AI availability across the entire installation or per plan before it ever reaches team owners.

This feature is available to all FlowFuse Cloud users and Enterprise Self Hosted users from v2.31.                                                                                                                                                                                                                          
                                                                                                             
