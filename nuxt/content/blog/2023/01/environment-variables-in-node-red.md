---
title: "Using Environment Variables in Node-RED (2026)"
subtitle: Predefined data to be used in your Node-RED instance 
description: Node-RED supports environment variables (env vars) slight different, how to use it and the gotcha's are explained in this article.
lastUpdated: 2026-06-03
date: 2023-01-27 16:11:47.0
authors: ["zeger-jan-van-de-weg"]
keywords: node-red environment variables, env vars node-red, node-red env variable, flowfuse environment variables, node-red configuration
tags:
    - posts
    - node-red
    - how-to
cta:
  type: sign-up
  title: Manage Node-RED Environment Variables with FlowFuse
  description: FlowFuse makes it easy to set, update, and secure environment variables across all your Node-RED instances and devices — with role-based access control and centralized management from a single dashboard.
meta:
  howto:
    name: "How to Use Environment Variables in Node-RED"
    description: "Learn how to read and manage environment variables in Node-RED flows using the inject, change, and switch nodes, including FlowFuse-specific predefined variables."
    totalTime: "PT15M"
    tool:
      - "Node-RED"
      - "FlowFuse"
    steps:
      - name: "Inject an environment variable"
        text: "Use the inject node with the 'env variable' payload type to read a predefined Node-RED variable such as NR_FLOW_NAME and pass its value into your flow."
        url: "predefined-variables"
      - name: "Use environment variables in change and switch nodes"
        text: "Leverage environment variables in change and switch nodes to configure node behaviour dynamically without hardcoding values."
        url: "managing-environments-variables"
      - name: "Manage environment variables in FlowFuse"
        text: "In the FlowFuse instance settings, open the Environment tab, add key-value pairs for your variables, restart the instance, and update device snapshots so the new values take effect."
        url: "managing-environments-variables"
  faq:
    - question: "What are environment variables in Node-RED?"
      answer: "Environment variables in Node-RED are key-value string pairs that supply configuration or secret values to flows without hardcoding them. They are read at deploy time, not dynamically during execution."
    - question: "Can I change an environment variable while a Node-RED flow is running?"
      answer: "No. Node-RED resolves environment variable values when the flow is deployed, not at runtime. To update a value, change the variable and redeploy (or restart) the instance. For runtime-mutable data, use persistent context instead."
    - question: "What predefined environment variables does Node-RED provide?"
      answer: "As of Node-RED 3.0, predefined variables include NR_NODE_NAME, NR_GROUP_NAME, and NR_FLOW_NAME. These allow you to identify the current node, group, or flow by name without manual configuration."
    - question: "What additional environment variables does FlowFuse provide?"
      answer: "FlowFuse adds variables such as FF_PROJECT_ID for each instance and device-specific variables via the device agent. These help identify which instance or device generated a message, useful for routing or dashboard filtering."
    - question: "Where do I set environment variables in FlowFuse?"
      answer: "Go to your instance in the FlowFuse dashboard, open Settings, and select the Environment tab. Add your key-value pairs there, then restart the instance for cloud deployments or update the target snapshot for devices."
    - question: "Can I use environment variables in the switch node to check if a variable exists?"
      answer: "Node-RED does not support checking whether an environment variable exists in the switch node. The inject node will output an empty value for an undefined variable, but the switch node cannot evaluate existence directly."
    - question: "What is the difference between environment variables and Node-RED context?"
      answer: "Environment variables are set outside of flows and are read-only during execution, while Node-RED context (flow, global, or persistent) can be read and written at runtime. Use context when you need values that change as the flow runs."
tldr: "Node-RED environment variables are read-only key-value pairs resolved at deploy time, useful for storing configuration and secrets without hardcoding them in flows. Node-RED exposes predefined variables like NR_FLOW_NAME, and FlowFuse extends this with instance and device identifiers. You can set and manage variables for all your instances directly from the FlowFuse Environment settings tab."
---

Programs, written with Node-RED or otherwise, need to sometimes retrieve information that wasn’t decided on during the creation of the program. 
<!--more-->

Contextual data like configuration, which user is executing the code, differentiate based on what device is executing a flow, or sometimes secrets which shouldn’t be exposed in the code. This is usually done through environment variables. These are pairs of strings, a key with an attached value, which are accessed by their key. Say you want to access an API endpoint with a key, you’d save the key as `API_KEY` with the value set to `yoursupersecretkey`. FlowFuse allows setting environment variables. Let’s start using them to understand how they work.

One of the options for the `inject` node is to inject a `env variable`, short for; you guessed it: Environment Variable. In this case we’re going to one that’s pre-defined by Node-RED: `NR_FLOW_NAME`. The name of each variable is in all caps by convention. When connecting this inject to a debug it prints “Flow 1” for me.

![Using an environment variable in Node-RED](./images/node-red-use-env-var.png "Using an environment variable in Node-RED")

Leveraging environment variables can also be done with other nodes, like for example `change`, `switch`. Note however; you can set the `inject` node to output the value for `FOO` even when it doesn’t exist, but it doesn’t allow you to check in the switch node for example if `FOO` exists.

Node-RED allows you to set environment variables, but not to change them when executing flows. If you want to update data during execution, look into using [persistent context](/docs/user/persistent-context/). Node-RED doesn’t support Environment Variables like other programming environments do. When the flow is deployed the environment variables are replaced with the known values at that time. This is the biggest gotcha for most developers.

### Predefined variables

Our first example was using a predefined variable, exposed by Node-RED. As of 3.0 it exposes a few environment variables among which `NR_NODE_NAME`, `NR_GROUP_NAME`, and `NR_FLOW_NAME`.

[FlowFuse](/) extends this list with for example a `FF_PROJECT_ID` allowing you to for example understand what group of instances sent a certain message, but also sets them for each [device agent](/docs/device-agent/introduction/). This allows users to pinpoint which device sent a message, for example to update a dashboard accordingly.

### Managing environments variables

In FlowFuse it’s easy to manage variables set for instances. Under settings in the environment tab it’s a form to set them. You’ll have to restart your instances to make them available in the cloud, and update the target snapshot for devices. When done, these are available.

!["Setting a environment variable in FlowFuse"](./images/flowforge-set-env-var.png "Setting a environment variable in FlowFuse")

## Boost Your Node-RED Security with FlowFuse

FlowFuse provides a comprehensive platform for managing and securing your Node-RED solutions. It includes advanced security features such as role-based access control, Multi-factor Authentication (MFA), Single Sign-On (SSO), and encryption to protect your data and enhance operational efficiency.

Learn how FlowFuse can boost your Node-RED security and streamline management through the [FlowFuse security statement](/platform/security/#application).

### Explore More on Security

- [Role-Based Access Control (RBAC) for Node-RED with FlowFuse](/blog/2024/04/role-based-access-control-rbac-for-node-red-with-flowfuse/)
- [Protecting Instances from Being Modified](/docs/user/devops-pipelines/#protected-instances)
- [How to Set Up SSO LDAP for Node-RED](/blog/2024/07/how-to-setup-sso-ldap-for-the-node-red/)
- [How to Set Up SSO SAML for Node-RED](/blog/2024/07/how-to-setup-sso-saml-for-the-node-red/)
- [Securing HTTP Traffic for Node-RED with FlowFuse](/blog/2024/03/http-authentication-node-red-with-flowfuse/)
- [FlowFuse is now SOC 2 Type 1 Compliant](/blog/2024/01/soc2/)