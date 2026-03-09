---
title: "Node-RED Variables: Global, Flow, Context & Environment Variables Complete Guide"
subtitle: Guide to Understanding and Managing Node-RED Variables for Efficient Workflows
description: Learn how to use Node-RED global, flow, context, and environment variables. Master setting, retrieving, and persistent storage with practical examples.
date: 2024-05-06
lastUpdated: 2025-12-09
authors: ["sumit-shinde"]
image: /blog/2024/05/images/understanding-node-red-variables.png
keywords: node-red variables, node-red global variable, node-red context variable, node-red flow variable, node-red environment variables
tags:
   - posts
   - node-red
---

Variables are essential for building anything beyond basic message routing in Node-RED. They let you store state, share data across your application, and manage configuration—capabilities you'll need for almost any real-world project.

<!--more-->

Node-RED provides four types of variables, each with different visibility and use cases. This guide walks through each one, showing you exactly how to set, retrieve, and delete them, along with practical guidance on which type to use in different situations.

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

Mastering Node-RED's variable system transforms how you build applications. With context variables providing flexible state management and environment variables securing your configuration, you have all the tools needed for professional-grade deployments.

As your Node-RED projects scale, you'll likely need more sophisticated tools for managing deployments, collaborating with teams, and ensuring reliability across environments. FlowFuse provides enterprise-grade features built specifically for Node-RED, including advanced persistent storage, team collaboration tools, and seamless deployment pipelines.

Ready to take your Node-RED development to the next level? [Start your FlowFuse journey today]({% include "sign-up-url.njk" %}?utm_campaign=60718323-BCTA&utm_source=blog&utm_medium=cta&utm_term=high_intent&utm_content=Understanding%20Node%2C%20Flow%2C%20Global%2C%20and%20Environment%20Variables%20in%20Node-RED) and experience Node-RED with professional-grade tooling and support.
