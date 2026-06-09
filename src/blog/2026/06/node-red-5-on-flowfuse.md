---
title: "Node-RED 5 Is Here: What It Means for Industrial Teams"
subtitle: "The biggest change to the editor since the project began, and it's already live on FlowFuse Cloud."
description: "Node-RED 5 reshapes the editor with redesigned sidebars, an Explorer panel, and a built-in dark theme. Here's what changes for teams running it in production on FlowFuse, and how to upgrade your instances."
date: 2026-06-09
authors: ["sumit-shinde"]
image: 
keywords: node-red 5, node-red 5.0, node-red editor, node-red dark theme, node-red explorer panel, flowfuse node-red, node-red upgrade, node-red stack, industrial node-red, node-red production
tags:
- flowfuse
- node-red
cta:
  type: contact
  title: "Get Node-RED 5 in production today"
  description: "The Node-RED 5 stack is live on FlowFuse Cloud. Get the new editor plus the access controls, version control, SSO, secure deployments, and SOC 2 compliance an enterprise needs to run it at scale."
meta:
  howto:
    name: "How to Upgrade a FlowFuse Instance to Node-RED 5"
    description: "Upgrade a FlowFuse Hosted or Remote Instance to the Node-RED 5 stack by checking edge hardware requirements, changing the instance stack, and letting the instance restart on 5.0."
    totalTime: "PT10M"
    tool:
      - "FlowFuse Cloud account"
      - "FlowFuse Hosted Instance, or a Remote Instance with the Device Agent"
      - "Node.js 22.9.0 or later (64-bit) on edge hardware"
    steps:
      - name: "Check edge hardware requirements"
        text: "Confirm your edge hardware can run Node-RED 5 before upgrading. Node-RED 5 needs Node.js 22.9 or later and drops 32-bit ARM, so hardware that can't run a 64-bit OS, such as the Raspberry Pi 3B and earlier, won't run it."
        url: "upgrading-your-instances"
      - name: "Open the instance settings"
        text: "In FlowFuse Cloud, open the settings for the Hosted Instance you want to upgrade. Changing an instance's Node-RED version requires a restart, and the flows won't run while this happens, so plan for the short downtime."
        url: "upgrading-your-instances"
      - name: "Change the stack to Node-RED 5"
        text: "In the instance settings, change the stack to the Node-RED 5 stack. Existing instances show a prompt when a new stack version is available."
        url: "upgrading-your-instances"
      - name: "Apply the change and restart"
        text: "Click the Change Node-RED Version button. The instance restarts on 5.0. With automatic stack updates on, this happens without manual action, and Remote and edge devices update through the Device Agent."
        url: "upgrading-your-instances"
  faq:
    - question: "What is new in Node-RED 5?"
      answer: "Node-RED 5 is primarily an editor-focused release. The headline changes are redesigned sidebars, a new Explorer panel, and a built-in dark theme, alongside functional and security improvements across debugging, authentication, and TLS configuration. The sidebars now behave the same on both sides of the editor, and you can split one vertically to keep two panels open at once."
    - question: "What are the system requirements for Node-RED 5?"
      answer: "Node-RED 5 requires a minimum of Node.js 22.9, and the project recommends Node.js 24. It no longer supports 32-bit ARM, so hardware that can't run a 64-bit OS, such as the Raspberry Pi 3B and earlier, can't run it."
    - question: "How do I upgrade a FlowFuse instance to Node-RED 5?"
      answer: "The Node-RED 5 stack is live on FlowFuse Cloud. Open the instance settings, change the stack to the Node-RED 5 stack, and click Change Node-RED Version. The instance restarts on 5.0. With automatic stack updates on, the upgrade happens without manual action, and Remote and edge devices update through the Device Agent."
tldr: "Node-RED 5 is out, the biggest change to the editor since the project began, and it's primarily an editor release: redesigned sidebars, a new Explorer panel, a built-in dark theme, and functional and security improvements across debugging, authentication, and TLS. The Node-RED 5 stack is already live on FlowFuse Cloud. To upgrade a Hosted Instance, open its settings, change the stack to Node-RED 5, and click Change Node-RED Version, the instance restarts on 5.0. Check edge hardware first: Node-RED 5 needs Node.js 22.9 or later and drops 32-bit ARM, so Raspberry Pi 3B and earlier won't run it."
---

Node-RED 5.0 is out — the biggest change to the editor since the project began. Nick O'Leary, our CTO and Node-RED's co-creator, announced it today on the [Node-RED forum](https://discourse.nodered.org/t/node-red-5-now-available/101239).

<!--more-->

## What's new

Node-RED 5 is primarily an editor-focused release.

The headline changes are redesigned sidebars, a new Explorer panel, and a built-in dark theme. Alongside those are functional and security improvements across debugging, authentication, and TLS configuration.

<!-- SCREENSHOT: Node-RED 5 editor on FlowFuse — full editor view showing the modernised layout -->

<!-- SCREENSHOT: Node-RED 5 built-in dark theme on FlowFuse — editor in dark mode -->

If previous releases focused on expanding what Node-RED could connect to, this release focuses on improving the environment people work in every day. For the full list of changes, read the [release blog](https://nodered.org/blog/2026/06/09/version-5-0-released).

## FlowFuse Management and AI-Powered Flow Building, Now with Node-RED 5

Node-RED is an editor and runtime. Operating it across teams, sites, and production environments is a different challenge entirely.

FlowFuse provides the platform capabilities industrial teams need to run Node-RED at scale: team collaboration, role-based access control, version control and deployment pipelines, SSO, audit logs, TLS-enabled instances, self-hosted and air-gapped deployments, and SOC 2 compliance.

The Node-RED 5 stack is available on FlowFuse Cloud today, allowing teams to take advantage of the redesigned editor, Explorer panel, built-in dark theme, and the latest platform improvements as soon as they upgrade their instances.

Alongside Node-RED 5, FlowFuse continues to improve how teams build applications. With the [FlowFuse 2.31 release](/blog/2026/06/flowfuse-release-2-31/#expert-agentic-ga), FlowFuse Expert introduced agentic application building in open beta. Describe your application requirements in plain language, and FlowFuse Expert generates a working starting flow directly in your workspace for both Hosted and Remote Instances.

<!-- SCREENSHOT: Node-RED 5 editor on FlowFuse with FlowFuse Expert open — show a sample prompt and the generated starting flow -->

Teams can take advantage of Node-RED 5's redesigned editor while using FlowFuse to manage, secure, deploy, and scale their applications across production environments.

## Upgrading your instances

Before you start, check one thing for edge hardware: Node-RED 5 needs Node.js 22.9 or later and drops 32-bit ARM, so hardware that can't run a 64-bit OS, such as the Raspberry Pi 3B and earlier, won't run it.

> **Note:** Changing an instance's Node-RED version requires a restart. Your flows won't run while this happens.

To upgrade a FlowFuse Hosted Instance:

1. Open the instance settings.
2. Change the stack to the Node-RED 5 stack.

<!-- SCREENSHOT: Node-RED 5 stack option in FlowFuse instance settings — stack dropdown with Node-RED 5 selected -->

3. Click the **Change Node-RED Version** button.

That's it. Once the instance restarts, you'll be running Node-RED 5 and can start using the redesigned editor, Explorer panel, built-in dark theme, and the latest platform improvements immediately.

To avoid having to manually update your instances in the future, enable automatic stack updates. For production deployments, FlowFuse's [Scheduled Maintenance](/changelog/2025/12/scheduled-maintenance/) feature lets you control when updates and restarts are applied, ensuring changes are rolled out during planned maintenance windows.
