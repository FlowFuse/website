---
title: Understanding Node, Flow, Global, and Environment Variables in Node-RED
subtitle: Guide to Understanding and Managing Node-RED Variables for Efficient Workflows
description: Understand Node-RED node, flow, global, and environment variables. Learn to initiate, retrieve, and manage them effortlessly.
date: 2024-05-06
authors: ["sumit-shinde"]
image: /blog/2024/05/images/understanding-node-red.png
tags:
   - posts
   - node-red
   - node-red variables
   - node-red global variable
   - node-red context variable
   - node-red flow variable
   - node-red environment variables
---

Node-RED is super easy and doesn't require much coding knowledge, which is why many people love it! Even though Node-RED is straightforward, some terms, like "global," "flow," and "environment" variables, might seem puzzling at first. However, many people have realized these concepts are quite easy to grasp after reading about them on a few resources or simply participating in Node-RED forums. To save you time and help you understand the different concepts quicker, this guide will cover Node-RED variables in depth, aiming to deepen your proficiency while minimizing the effort required to gather information.

<!--more-->

## Understanding Node-RED Variables

Variables are a crucial part of Node-RED. They come in different types like message, context, and environment variables. Message context variables are linked to individual messages as they move through the flow, For more info on messages, check out [Working with messages](https://nodered.org/docs/user-guide/messages). Context variables are used to keep track of the application's state, which includes node, flow, and global variables. On the other hand, environment variables store confidential configuration information such as secret and API keys, preventing this data from being accidentally exposed in the flow.

### Exploring Global variables

Global variables in Node-RED are accessible to function, change, inject, and switch nodes within a given Node-RED instance. They serve as a centralized storage point for data that needs to be accessed across different parts of an application. This is especially useful when you want to share data across multiple flows or tabs within the same Node-RED instance.

For example, in a home automation system with flows for lighting, security, and climate control, global variables can store user preferences or system settings that all flows can access and update. This allows for consistent behavior across the entire system.

#### Initiating/setting Global variable

We can set Global variables using the function and change node.

In the change node, you can set it as shown in the below image

!["Screenshot showing how to set global variable using the change node"](./images/variables-in-node-red-setting-global-variable-using-change-node.png "Screenshot showing how to set global variable using the change node"){data-zoomable}

To initiate a Flow variable in the function node, you will have to use the global`s set method like the below in the function node:

```javascript
global.set('variableName', value);
```

#### Retrieving Global variable

Retrieving global variables using change, inject, and switch nodes is quite similar. You simply need to select the "global" option and enter the variable name in the input field. Below is an image showing how you can retrieve global variables using the change node:

!["Screenshot showing how to retrieve global variables using the change node"](./images/variables-in-node-red-retrieving-global-variable-using-change-node.png "Screenshot showing how to retrieve global variables using the change node"){data-zoomable}

To retrieve a global variable using the function, use the global's `get` method like the below in the function node:

```javascript
global.get('variableName');
```

#### Deleting Global variables

To delete the global variables again you can use both the "context data" tab and the change node. I have shown in the below image how you can delete global variables using the change node:

!["Screenshot showing how to delete global variable using the change node"](./images/variables-in-node-red-deleting-global-variable-using-change-node.png "Screenshot showing how to delete global variable using the change node"){data-zoomable}

### Exploring Flow variables

Flow variables are accessible to function, change, inject, and switch nodes and some third-party nodes within the same tab or flow where they have been set. It is useful for sharing data within a specific flow or tab, allowing for seamless data transfer between nodes within the same flow.

For example, in a temperature monitoring system, you have multiple sensors sending data to different nodes within the same flow. You can use flow variables to pass the current temperature reading between nodes for processing and analysis within that specific flow.

#### Initiating/setting Flow variable

We can set flow variables using function and change node. 

In the change node, you can set it as shown in the below image

!["Screenshot showing how to set flow variable using the change node"](./images/variables-in-node-red-setting-flow-variable-using-change-node.png "Screenshot showing how to set flow variable using the change node"){data-zoomable}

To initiate a Flow variable using the function node, you will have to use the global`s set method like the below in the function node:

```javascript
flow.set('variableName', value);
```

#### Retrieving Flow variable

You can retrieve flow variables using the function, change, inject, and switch. 

Retrieving flow variables using change, inject, and switch nodes is quite similar. You simply need to select the "flow" option and enter the variable name in the input field. Below is an image showing how you can retrieve flow variables using the change node.

!["Screenshot showing how to retrieve flow variable using the change node"](./images/variables-in-node-red-retrieving-flow-variable-using-change-node.png "Screenshot showing how to retrieve flow variable using the change node"){data-zoomable}

To retrieve a flow variable, use the flow's `get` method like the below in the function node:

```javascript
flow.get('variableName');
```

#### Deleting Flow variables

To delete flow variables you can use both the "context data" tab and the change node. I have shown in the below image how you can delete flow variables using the change node:

!["Screenshot showing how to delete flow variable using the change node"](./images/variables-in-node-red-deleting-global-variable-using-change-node.png "Screenshot showing how to delete flow variable using the change node"){data-zoomable}

### Exploring Node variables

Node variables are specific to each node and are only visible within that node. This means we cannot read or write into that variable from outside of the node where it is initialized. This is ideal for cases where you want to store data specific to a single node, to ensure data isolation and prevent interference with other nodes

For example, You have a form on a Node-RED Dashboard 2.0, and you want to insert the submitted data into a database along with a unique ID for each submission. You can use a node variable to store and track a counter variable in the function node.

#### Initiating/setting Node variable

To initiate and set a node variable using the function node, you will have to use the context’s `set` method:

```javascript
context.set('variableName', value);
```

This action sets the value for the context variable with the specified name.

#### Retrieving Node variable

To retrieve a node variable using a function node, use the context's `get` method:

```javascript
context.get('variableName');
```

#### Deleting Node variables

We cannot delete node variables using a Node-RED node; you'll need to use the Node-RED "Context Data" tab's delete option available for each variable, as explained in the "Exploring Context Data" tab section at the end of the guide.


### Exploring Environmental variables

Environment variables are specifically used for storing sensitive configuration data, such as API keys or database credentials, ensuring this information isn't directly exposed within your flows. In Node-RED you can set environment variables at flow and global level.

- Flow-level environment: Used to store sensitive configuration data accessible only within a specific flow. This ensures secure and isolated storage of sensitive information. For example, when building a multi-flow Node-RED application, each flow may need different configuration details, like API keys or unique identifiers. Using flow-level environment variables allows each flow to securely store its specific sensitive data without exposing it to other flows.

- Global-level environment: Variables are used to store sensitive data accessible across all flows in a Node-RED instance. They are helpful when you need to share the same sensitive data across different flows. For example, If multiple flows need to use the same API key, setting a global-level environment variable allows them to access this data securely, avoiding repeated configurations and ensuring consistency.

#### Setting Environment Variables

To set flow-level environment variables you'll have to use the edit dialog of the flow.

!["Screenshot showing how to set flow level environment variables"](./images/variables-in-node-red-setting-flow-scope-enviroment-variable.gif "Screenshot showing how to set flow level environment variables"){data-zoomable}

For information on setting and managing global-level environment variables, refer to [Using Environment variables in Node-RED](/blog/2023/01/environment-variables-in-node-red/).

#### Accessing Environment variables 

Environment variables in the change, inject, and switch nodes can be accessed by selecting the "$ env variable" option and entering the variable name in the input field. Here's an example of Accessing an environment variable using the change node:

!["Screenshot showing how to retrieve environment variable in the change node"](./images/variables-in-node-red-retrieving-environment-variable-using-change-node.png "Screenshot showing how to retrieve environment variable in the change node"){data-zoomable}

To access environment variables in a function node, use:

```javascript
env.get('variableName');
```

In the template node, you can access it like below:

```javascript
This is my username : {% raw %}{{env.USERNAME}}.
{% endraw %}
```

And if you need to access environment variables in third-party configuration nodes where they haven't provided an option to use environment variables, you can access them with `${variableName}` in the node's input field.

*Note: When you have variables with the same name, accessing them will prioritize the flow-level variable over the global-level one. To access a global-level environment variable in this scenario, you need to add a prefix to the variable name with '$parent'*

#### Deleting Environment variables 

To delete added environment variables, you can use the same interface where added them. In the right corner of your added environment variable, you'll see a delete or cross icon. Simply click on it to delete the variable and restart your Node-RED instance.

### Exploring Context Data tab

!["Screenshot showing Node-RED Context data tab"](./images/variables-in-node-red-context-data-tab.png "Screenshot showing Node-RED Context data tab"){data-zoomable}

Node-RED provides a dedicated interface for viewing and managing all Node-RED variables. Navigate to the sidebar's "Context Data" tab, where you'll find sections for Node, Flow, and Global variables. Each section has a refresh icon at the top right corner; click on it to see the latest or newly added variables.

!["Screenshot showing Node-RED Context data tab options for managing variables"](./images/variables-in-node-red-change-node-persistent-store-option.gif "Screenshot showing Node-RED Context data tab options for managing variables"){data-zoomable}

In this tab, you'll also find information about when each variable was set or updated, along with additional options on the right side of each variable. The first option allows you to copy the variable's name, the second option lets you copy the variable's value, the third option refreshes the variable to show the most recent value, and the fourth option allows you to delete the variable.

### FlowFuse persistent storage

So far, we have seen three types of context variables and all are stored in memory. This means that when we stop the Node-RED instance, the variables will get wiped out.

FlowFuse provides a way to persist these variable values between restarts and FlowFuse stack updates. For more details, refer to [FlowFuse Persistent Context](/docs/user/persistent-context/).

#### Setting Persistent Variables in Function Node

To set variables in persistent store using change node steps are the same as storing them in memory you just need to change the store option to persistent from memory in the change node like below:

!["Screenshot showing how to set global variable using the change node"](./images/variables-in-node-red-change-node-persistent-store-option-for-while-setting-variable.gif "Screenshot showing how to set global variable using the change node"){data-zoomable}

In the function node, you just need to pass one more argument "persistent" in the set method.

```javascript
global.set('variableName',value,'persistent');
```

```javascript
flow.set('variableName',value,'persistent');
```

```javascript
context.set('variableName',value,'persistent'); 
```

#### Retrieving Persistent Variables

You can retrieve variables stored in the persistent store using the change node as shown in the below image:

!["Screenshot showing how to retrieve global variable using the change node"](./images/variables-in-node-red-change-node-persistent-store-option.gif "Screenshot showing how to retrieve global variable using the change node"){data-zoomable}

To retrieve a variable stored in the persistent store using the function node, you'll need to pass "persistent" in the get method.

```javascript
global.get('variableName','persistent');
```

```javascript
flow.get('variableName','persistent');
```

```javascript
context.get('variableName','persistent'); 
```
## Conclusion

In this comprehensive guide, we've explored the fundamental concepts of Node-RED variables, including node, flow, global, and environment variables. We've learned how to initiate, retrieve, and manage these variables effectively, utilizing both function nodes and change nodes. Additionally, we have learned about memory storage and persistent storage.

{% include "cta.njk", cta_url: "https://app.flowfuse.com/account/create?utm_campaign=60718323-BCTA&utm_source=blog&utm_medium=cta&utm_term=high_intent&utm_content=Understanding%20Node%2C%20Flow%2C%20Global%2C%20and%20Environment%20Variables%20in%20Node-RED", cta_type: "signup", cta_text: "Simplify Node-RED management and deployment with FlowFuse. Optimize, scale, secure, and collaborate effortlessly while enabling persistent context storage and remote access in seconds." %}
