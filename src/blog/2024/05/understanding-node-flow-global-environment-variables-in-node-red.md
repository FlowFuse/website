---
title: "How to Use Variables in Node-RED: Flow, Global, Context & Environment (2026)"
subtitle: A complete guide to setting, retrieving, and persisting Node-RED variables for efficient, production-ready flows.
description: Learn how to use Node-RED global, flow, context, and environment variables in 2026. Step-by-step examples for setting, retrieving, and persisting state, plus best practices and an FAQ.
date: 2024-05-06
lastUpdated: 2025-12-09
authors: ["sumit-shinde"]
image: /blog/2024/05/images/understanding-node-red-variables.png
keywords: node-red variables, node-red global variable, node-red context variable, node-red flow variable, node-red environment variables
tags:
   - posts
   - node-red
cta:
  type: signup
  title: "Take Your Node-RED Flows to Production with FlowFuse"
  description: "Built by the team behind Node-RED, FlowFuse turns your flows into production-grade applications—with persistent state that survives restarts, centralized management of every instance, team collaboration with role-based access and SSO, DevOps pipelines, and built-in monitoring with crash alerts. Start your free trial today."
meta:
faq:
- question: "What are the different types of variables in Node-RED?"
  answer: "Node-RED has three main categories: message variables (like msg.payload) that travel with the message through nodes; context variables that store state at node, flow, or global scope; and environment variables for configuration and secrets. Context variables are further split into node, flow, and global scopes based on visibility."
- question: "What is the difference between flow and global variables in Node-RED?"
  answer: "Flow variables are scoped to a single tab and are accessible to all nodes within that flow but isolated from other flows. Global variables are accessible across your entire Node-RED instance, making them suited for system-wide settings or data multiple flows need to share."
- question: "How do I set a global variable in a Node-RED function node?"
  answer: "Use global.set('variableName', value) to store a value and global.get('variableName') to retrieve it. The same pattern applies to flow variables (flow.set / flow.get) and node context (context.set / context.get)."
- question: "Do Node-RED variables persist after a restart?"
  answer: "By default, all context variables are stored in memory and are lost on restart or redeploy. To keep them, use persistent storage by adding 'persistent' as the store option in the change node or as a third parameter in a function node, e.g. global.set('userData', userData, 'persistent'). FlowFuse provides persistent storage that survives restarts and redeployments."
- question: "What is the difference between context variables and environment variables?"
  answer: "Context variables (node, flow, global) store runtime application state that changes as your flows run. Environment variables hold configuration data and sensitive information like API keys and credentials, kept separate from your flows for security and easier configuration management."
- question: "What happens if a flow-level and global-level environment variable have the same name?"
  answer: "Node-RED uses the flow-level value when names collide. To explicitly access the global-level variable instead, prefix the reference with $parent. in your variable name."
- question: "When should I use node context instead of flow or global variables?"
  answer: "Use node context for private, node-specific data such as counters or temporary calculations that no other node should access. Node variables exist only within a single function node, providing the most restrictive and isolated scope."
- question: "How can I view all the variables currently set in Node-RED?"
  answer: "Open the Context Data panel from the sidebar dropdown. It shows all node, flow, and global variables in organized sections, lets you see when each was last updated, copy names or values, refresh individual variables, and delete them directly from the interface."
tldr: "Node-RED offers four kinds of variables for managing data and state: message variables that travel with msg through nodes, and context variables in three scopes node (private to one function node), flow (shared within a tab), and global (shared across the whole instance) plus environment variables for configuration and secrets. You set and retrieve them with global.set/get, flow.set/get, and context.set/get in function nodes, or visually through the change node. Context variables live in memory by default and are lost on restart, so use persistent storage (FlowFuse provides this) for any state that must survive reboots and redeployments."
---

Node-RED has four types of variables: **message variables** that travel with `msg` through your nodes, and **context variables** in three scopes—**node** (private to a single function node), **flow** (shared within one tab), and **global** (shared across the entire instance)—plus **environment variables** for configuration and secrets. You set and retrieve context variables with `global.set()`/`global.get()`, `flow.set()`/`flow.get()`, and `context.set()`/`context.get()` in function nodes, or visually through the change node. Context variables are stored in memory by default and are lost on restart, so any state that must survive a reboot needs persistent storage.

<!--more-->

That's the short version. The rest of this guide walks through each variable type in detail—showing you exactly how to set, retrieve, and delete them, when to use each scope, and how to make them persist across restarts and redeployments.

## What Are Node-RED Variables?

Variables in Node-RED serve as containers for storing and managing data throughout your application. Understanding the different types and their scopes is essential for building efficient, organized flows.

Node-RED offers three primary variable categories:

**Message variables** travel with the message object as it flows through your nodes. The most common example is `msg.payload`, which carries the primary data between nodes. For a deeper dive into message handling, see the [Understanding Node-RED Messages](/node-red/getting-started/node-red-messages/) guide.

**Context variables** store application state at different levels—node, flow, or global scope. They persist data that needs to be accessed across multiple message events, making them ideal for tracking counters, storing configuration, or maintaining state.

**Environment variables** handle configuration data and sensitive information like API keys and credentials. By storing this data separately from your flows, you maintain security and make configuration management more flexible.

## Global Variables: Instance-Wide Data Storage

Global variables provide a centralized storage mechanism accessible throughout your entire Node-RED instance. Any function, change, inject, or switch node can read or write global variables, making them perfect for sharing data across multiple flows.

**When to use global variables:** Consider using them for system-wide settings, shared configuration, or data that multiple flows need to access. For example, in a home automation system with separate flows for lighting, security, and climate control, global variables can store user preferences that all flows reference.

### Working with Global Variables

**Setting global variables** can be done through the change node or programmatically in a function node:

Using the change node:

1. Select "global" from the variable type dropdown
2. Enter your variable name
3. Set the value or expression

!["Screenshot showing how to set global variable using the change node"](./images/variables-in-node-red-setting-global-variable-using-change-node.png "Screenshot showing how to set global variable using the change node"){data-zoomable}

Using a function node:

```javascript
global.set('userName', 'John');
global.set('systemMode', 'active');
```

**Retrieving global variables** follows a similar pattern:

In a change, inject, or switch node, simply set the action to “set”, choose the type as “global”, and specify the variable name.

!["Screenshot showing how to retrieve global variables using the change node"](./images/variables-in-node-red-retrieving-global-variable-using-change-node.png "Screenshot showing how to retrieve global variables using the change node"){data-zoomable}

In function nodes:

```javascript
const userName = global.get('userName');
const mode = global.get('systemMode');
```

**Deleting global variables** can be accomplished through the change node by selecting "delete" from the action dropdown, or via the Context Data sidebar panel, which provides a comprehensive view of all variables.

!["Screenshot showing how to delete global variable using the change node"](./images/variables-in-node-red-deleting-global-variable-using-change-node.png "Screenshot showing how to delete global variable using the change node"){data-zoomable}

## Flow Variables: Tab-Scoped Data

Flow variables exist within a single tab or flow in your Node-RED editor. They're accessible to all nodes within that specific flow but isolated from other flows, providing logical data separation.

**When to use flow variables:** Use them for data that's relevant only to a specific workflow. For instance, in a temperature monitoring flow with multiple sensor nodes, flow variables can track the current reading, alert thresholds, or calculation results—data that doesn't need to be shared with other parts of your application.

### Working with Flow Variables

**Setting flow variables:**

Using the change node, select the action “set”, choose “flow” as the variable type, and configure your variable.

!["Screenshot showing how to set flow variable using the change node"](./images/variables-in-node-red-setting-flow-variable-using-change-node.png "Screenshot showing how to set flow variable using the change node"){data-zoomable}

In function nodes:

```javascript
flow.set('currentTemp', 72.5);
flow.set('alertThreshold', 85);
```

**Retrieving flow variables:**

In a change, inject, or switch node, simply set the action to “set”, choose the type as “flow”, and specify the variable name.

!["Screenshot showing how to retrieve flow variable using the change node"](./images/variables-in-node-red-retrieving-flow-variable-using-change-node.png "Screenshot showing how to retrieve flow variable using the change node"){data-zoomable}

In function nodes:

```javascript
const temp = flow.get('currentTemp');
const threshold = flow.get('alertThreshold');
```

**Deleting flow variables** works the same way as global variables—use the change node's delete action or the Context Data panel.

!["Screenshot showing how to delete flow variable using the change node"](./images/variables-in-node-red-deleting-flow-variable-using-change-node.png "Screenshot showing how to delete flow variable using the change node"){data-zoomable}

## Node Variables: Node-Level Isolation

Node variables (also called node context) are the most restrictive scope—they exist only within a single node. No other node can access or modify these variables, making them ideal for maintaining private state.

**When to use node variables:** Perfect for counters, temporary calculations, or any data that should remain private to a specific node. For example, a function node that generates unique IDs for database records can maintain a counter variable that's never exposed to other parts of your flow.

### Working with Node Variables

Node variables are local to a Function node and cannot be read or modified by other nodes.

**Setting node variables:**

```javascript
context.set('counter', 0);
context.set('lastProcessedId', 'ABC123');
```

**Retrieving node variables:**

```javascript
let counter = context.get('counter');
counter++;
context.set('counter', counter);
```

**Deleting node variables** must be done through the Context Data sidebar panel.

## Persistent Storage with FlowFuse

By default, all context variables (node, flow, and global) are stored in memory. This means they're lost whenever you restart Node-RED or redeploy your flows. For production applications, this is often unacceptable.

FlowFuse provides persistent storage that survives restarts, redeployments, and system updates. This ensures your application state remains intact across sessions.

### Using Persistent Storage

**Setting persistent variables:**

In the change node, select "persistent" from the store dropdown instead of "memory".

!["Screenshot showing how to set global variable using the change node"](./images/variables-in-node-red-change-node-persistent-store-option-for-while-setting-variable.gif "Screenshot showing how to set global variable using the change node"){data-zoomable}

In function nodes, add "persistent" as a third parameter:

```javascript
global.set('userData', userData, 'persistent');
flow.set('sessionConfig', config, 'persistent');
context.set('processedCount', count, 'persistent');
```

**Retrieving persistent variables:**

In a change, inject, or switch node, ensure you're selecting from the "persistent" store.

!["Screenshot showing how to retrieve global variable using the change node"](./images/variables-in-node-red-change-node-persistent-store-option.gif "Screenshot showing how to retrieve global variable using the change node"){data-zoomable}

In function nodes:

```javascript
const userData = global.get('userData', 'persistent');
const config = flow.get('sessionConfig', 'persistent');
const count = context.get('processedCount', 'persistent');
```

Persistent storage allows Node-RED to retain state between restarts—crucial for historical metrics, long-running counters, dashboard application data, and any flow that must persist through a reboot without losing information.

## The Context Data Panel

Node-RED includes a dedicated Context Data panel in the sidebar that provides visibility into all your variables. This panel is invaluable for debugging and understanding your application's state.

!["Screenshot showing Node-RED Context data tab"](./images/variables-in-node-red-context-data-tab.png "Screenshot showing Node-RED Context data tab"){data-zoomable}

**Features of the Context Data panel:**

- View all node, flow, and global variables in organized sections
- See when each variable was last updated
- Copy variable names or values with one click
- Refresh individual variables to see current values
- Delete variables directly from the interface

To access this panel, open the sidebar and choose ‘Context Data’ from the dropdown menu. Use the refresh icon in each section to update the display with the latest values.

!["Screenshot showing Node-RED Context data tab options for managing variables"](./images/variables-in-node-red-context-data-tab-options-for-varrables.png "Screenshot showing Node-RED Context data tab options for managing variables"){data-zoomable}

## Environment Variables: Secure Configuration

Environment variables serve a different purpose than context variables—they're designed for configuration data, especially sensitive information that shouldn't be hardcoded in your flows.

Node-RED supports environment variables at two levels:

**Flow-level environment variables** are accessible only within a specific flow. This is useful when different flows need different configurations. For example, one flow might connect to a development database while another connects to production, each using its own credentials.

**Global-level environment variables** are accessible across all flows in your instance. Use these for shared configuration like API keys that multiple flows need to reference.

### Working with Environment Variables

**Setting flow-level environment variables:**

1. Double-click on the flow tab to open the edit dialog
2. Navigate to the "Environment Variables" section
3. Add your variables as name-value pairs
4. Click Done and deploy

!["Screenshot showing how to set flow level environment variables"](./images/variables-in-node-red-setting-flow-scope-enviroment-variable.gif "Screenshot showing how to set flow level environment variables"){data-zoomable}

For global-level environment variables, see [Using Environment Variables in Node-RED](/blog/2023/01/environment-variables-in-node-red/) for detailed instructions.

**Accessing environment variables:**

In change, inject, or switch nodes, select "env variable" and specify the name.

!["Screenshot showing how to retrieve environment variable in the change node"](./images/variables-in-node-red-retrieving-environment-variable-using-change-node.png "Screenshot showing how to retrieve environment variable in the change node"){data-zoomable}

In function nodes:

```javascript
const apiKey = env.get('API_KEY');
const dbHost = env.get('DB_HOST');
```

In template nodes:

```javascript
API Endpoint: {{env.API_ENDPOINT}}
```

For configuration nodes that don't have explicit environment variable support, you can often use the syntax `${VARIABLE_NAME}` in input fields.

**Important note on precedence:** When a flow-level and global-level environment variable share the same name, Node-RED uses the flow-level value. To explicitly access the global-level variable, prefix it with `$parent.` in your reference.

**Deleting environment variables:** Return to the flow edit dialog where you added them and click the delete icon next to each variable. Remember to redeploy your flows after making changes.

## Best Practices

Here are some guidelines for effective variable usage in Node-RED:

**Choose the right scope:**
- Use node variables for node-specific data
- Use flow variables for data shared within a single workflow
- Use global variables for system-wide shared data
- Use environment variables for configuration and secrets

**Naming conventions matter:** Use clear, descriptive names. Consider prefixing variables with their purpose (e.g., `sensor_temperature`, `config_timeout`, `user_preferences`).

**Leverage persistent storage:** For production applications, identify which variables need to survive restarts and use persistent storage for those.

**Keep sensitive data in environment variables:** Never hardcode API keys, passwords, or other secrets directly in flows. Always use environment variables.

**Document your variables:** Use the description field in your nodes to explain what variables are being set or read, especially for complex flows that others might maintain.

**Monitor the Context Data panel:** Regularly check this panel during development to verify variables are being set correctly and to catch potential issues early.

## Conclusion

Node-RED's four variable types give you a clear toolkit for managing data and state. Use **node context** for private, node-specific values, **flow variables** for data shared within a single tab, and **global variables** for anything multiple flows need to reach. Reach for **environment variables** when you're handling configuration and secrets that shouldn't be hardcoded. Matching the scope to the job keeps your flows organized, predictable, and easy for others to maintain.

The one thing to keep front of mind: context variables live in memory by default, so they reset on every restart or redeploy. For anything your application genuinely depends on—counters, cached configuration, dashboard history—plan for persistent storage from the start rather than discovering the gap in production.

Get the scopes right and lean on persistence where it matters, and Node-RED will handle everything from quick prototypes to applications you can run with confidence.
