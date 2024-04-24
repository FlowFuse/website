---
title: Beginner's Guide to Node-RED Variables
subtitle: Understanding Flow, Global, and Environment Variables in Node-RED.
description: Understand Node-RED node, flow, global, and environment variables. Learn to initiate, retrieve, and manage them effortlessly.
date: 2024-04-08
authors: ["sumit-shinde"]
image:
tags:
   - posts
   - node-red
   - variables
   - global
   - context
   - flow
   - environment
---

Node-RED is super easy and doesn't require much coding knowledge, which is why many people love it! Even though Node-RED is straightforward, some terms, like "global," "flow," and "environment" variables, might seem puzzling at first. However, many people have realized these concepts are quite easy to grasp after reading about them on a few resources or simply participating in Node-RED forums. Nonetheless, exploring multiple resources may take some time.

<!--more-->

In this guide, we understand that your time is valuable. We offer a concise yet comprehensive exploration of Node-RED variables, aiming to deepen your understanding and proficiency with Node-RED variables.

## Understanding Node-RED Variables

Variables in Node-RED simplify tasks and enable state tracking. Node-RED has four types of variables: Node, Flow, Global, and Environment. Each type has a unique scope and can store various data types like numbers, strings, objects, arrays, and buffers. All variables, except Environment variables, are stored in memory, making them temporary.

### Exploring Node variables

Node variables are specific to each node and are only visible within that node. This means we cannot read or write into that variable from outside of that node.

#### When to use it?

- Ideal for storing data specific to a single node, ensuring data isolation and preventing interference with other nodes
- **Example Scenario:** You have a form on a Node-RED Dashboard 2.0, and you want to insert the submitted data into a database along with a unique ID for each submission. You can use a node variable to store and track a counter variable in the function node.

#### Initiating/setting Node variable

To initiate and set a node variable in the function node, you will have to use the context’s `set` method:

```js
context.set('variableName', value);
```

This action sets the value for the context variable with the specified name.

#### Retrieving Node variable

To retrieve a node variable, use the context's `get` method:

```js
context.get('variableName');
```

#### Deleting Node varriables

We cannot delete node variables using a Node-RED node; you'll need to use the Node-RED "Context Data" tab delete option which is avalable for each varriable, as explained in the "Exploring Context Data" tab section at the end of the guide.

### Exploring Flow variables

Flow variables are accessible to function, change, inject, and switch nodes, as well as some third-party nodes, within the same tab or flow where they have been set. They allow you to share data between nodes within a specific flow.

#### When to use it?

- Useful for sharing data within a specific flow or tab, allowing for seamless data transfer between nodes within the same flow.
- **Example Scenario:** In a temperature monitoring system, you have multiple sensors sending data to different nodes within the same flow. You can use flow variables to pass the current temperature reading between nodes for processing and analysis within that specific flow.

#### Initiating/setting Flow variable

We can set flow variables using function and change node. To initiate a Flow variable in the function node, you will have to use the flow's `set` method like below in the function node:

```js
flow.set('variableName', value);
```

In the change node, you can set it as shown in the below image

!["Screenshot showing how to set flow varriable using the change node"](./images/varriables-in-node-red-setting-flow-varriable-using-change-node.png "Screenshot showing how to set flow varriable using the change node"){data-zoomable}

#### Retrieving Flow variable

You can retrieve flow variables using the function, change, inject, and switch. To retrieve a flow variable, use the flow's `get` method like the below in the function node:

```js
flow.get('variableName');
```

Retrieving flow variables in change, inject, and switch nodes is quite similar. You simply need to select the "flow" option and enter the variable name in the input field. Below is an image showing how you can retrieve flow variables using the change node.

!["Screenshot showing how to retrive flow varriable using the change node"](./images/varriables-in-node-red-retriving-flow-varriable-using-change-node.png "Screenshot showing how to retrive flow varriable using the change node"){data-zoomable}

#### Deleting Flow varriables

To Delete flow varriable you can use both "context data" tab and the change node. i have shown in the below image how you can delete flow varriable using change node:

!["Screenshot showing how to delete flow varriable using the change node"](./images/varriables-in-node-red-deleting-global-varriable-using-change-node.png "Screenshot showing how to delete flow varriable using the change node"){data-zoomable}

### Exploring Global variables

Global variables are accessible to function, change, inject, and switch nodes, as well as some third-party nodes within the Node-RED instance where they are set. They provide a centralized location for storing data that needs to be accessed from different parts of your application.

#### When to use it?

- When you need to share data across different flows or tabs within the same Node-RED instance.
- **Example Scenario:** You're building a home automation system where different flows control various aspects of your smart home, such as lighting, security, and climate control. You can use global variables to store user preferences or system settings that need to be accessed and updated by multiple flows, ensuring consistent behavior across your entire home automation setup.

#### Initiating/setting Flow variable

We can set Global variables using the function and change node. To initiate a Flow variable in the function node, you will have to use the global`s set method like the below in the function node:

```js
global.set('variableName', value);
```

In the change node, you can set it as shown in the below image

!["Screenshot showing how to set global varriable using the change node"](./images/varriables-in-node-red-setting-global-varriable-using-change-node.png "Screenshot showing how to set global varriable using the change node"){data-zoomable}

#### Retrieving Global variable

To retrieve a global variable, use the global's `get` method like the below in the function node:

```js
global.get('variableName');
```
Retrieving global variables in change, inject, and switch nodes is quite similar. You simply need to select the "global" option and enter the variable name in the input field. Below is an image showing how you can retrieve global variables using the change node:

!["Screenshot showing how to retrieve global variables using the change node"](./images/varriables-in-node-red-retriving-global-varriable-using-change-node.png "Screenshot showing how to retrieve global variables using the change node"){data-zoomable}

#### Deleting Global varriables

To Delete global varriable again you can use both "context data" tab and the change node. i have shown in the below image how you can delete global varriable using change node:

!["Screenshot showing how to delete global varriable using the change node"](./images/varriables-in-node-red-deleting-global-varriable-using-change-node.png "Screenshot showing how to delete global varriable using the change node"){data-zoomable}

### Exploring Environmental variables

Environment variables, similar to global variables, are accessible across all nodes and flows within a Node-RED instance. However, they're specifically used for storing sensitive configuration data, such as API keys or database credentials, ensuring this information isn't directly exposed within your flows.

#### When to use it?

- When you need to securely store sensitive configuration data separately so that you won't expose it accidentally in flow.
- **Example Scenario:** You're developing a Node-RED application that integrates with external APIs, such as a weather service or a payment gateway. You can use environment variables to store API keys or authentication tokens securely, ensuring that sensitive information is not exposed within your flow configurations or source code.

#### Initiating/setting Flow variable

We cannot set and delete environment variables using nodes, to set and delete we have separate interfaces within instance settings.

For more information on setting environment variables refer to the [Using Environment variables with Node-RED](https://flowfuse.com/blog/2023/01/environment-variables-in-node-red/)

#### Retrieving Environment variable

we can retrieve environment variables using the function node and change node, to retrieve it, using the function node use the global's `get` method like as below:

```js
env.get('variableName');
```
Retrieving environment variables in change, inject, and switch nodes is quite similar. You simply need to select the "$ env varriable" option and enter the variable name in the input field. Below is an image showing how you can retrieve environment variables using the change node.:

!["Screenshot showing how to retrieve environment varriable in the change node"](./images/varriables-in-node-red-retriving-environment-varriable-using-change-node.png "Screenshot showing how to retrieve environment varriable in the change node"){data-zoomable}

### Exploring Context Data tab

!["Screenshot showing Node-RED Context data tab"](./images/varriables-in-node-red-context-data-tab.png "Screenshot showing Node-RED Context data tab"){data-zoomable}

Node-RED provides a dedicated interface for viewing and managing all Node-RED variables. Navigate to the sidebar's "Context Data" tab, where you'll find sections for Node, Flow, and Global variables. Each section has a refresh icon at the top right corner; click on it to see the latest or newly added variables.

!["Screenshot showing Node-RED Context data tab options for managing varriables"](./images/varriables-in-node-red-context-data-tab-options-for-varriables.png "Screenshot showing Node-RED Context data tab options for managing varriables"){data-zoomable}

In this tab, you'll also find information about when each variable was set or updated, along with additional options on the right side of each variable. The first option allows you to copy the variable's name, the second option lets you copy the variable's value, the third option refreshes the variable to show the most recent value, and the fourth option allows you to delete the variable.

### FlowFuse persistent storage

So far, we have seen four types of variables and all are stored in memory, except environment variables. This means that when we stop the Node-RED instance, the variables will get wiped out.

FlowFuse provides a way to persist these variable values between restarts and FlowFuse stack updates. For more details, refer to [FlowFuse Persistent Context](https://flowfuse.com/docs/user/persistent-context/).

#### Setting Persistent Variables in Function Node

To set variables as persistent in a function node, you just need to pass one more argument "persistent" in the set method.

```js
context.set('varriableName',value,'persistent'); 
```

```js
flow.set('varriableName',value,'persistent');
```

```js
global.set('varriableName',value,'persistent');
```

To set them using change node steps are the same as storing them in memory you just need to change the store option to persistent from memory in the change node like below:

!["Screenshot showing how to set global varriable using the change node"](./images/varriables-in-node-red-change-node-persistent-store-option-for-while-setting-varriable.gif "Screenshot showing how to set global varriable using the change node"){data-zoomable}

#### Retrieving Persistent Variables in Function Node

To retrieve a variable stored in the persistent store you'll need to pass "persistent" in the get method.

```js
context.get('varriableName','persistent'); 
```

```js
flow.get('varriableName','persistent');
```

```js
global.get('varriableName','persistent');
```

!["Screenshot showing how to set global varriable using the change node"](./images/varriables-in-node-red-change-node-persistent-store-option.gif "Screenshot showing how to set global varriable using the change node"){data-zoomable}

## Conclusion

In this comprehensive guide, we've explored the fundamental concepts of Node-RED variables, including node, flow, global, and environment variables. We've learned how to initiate, retrieve, and manage these variables effectively, utilizing both function nodes and change nodes. Additionally, we have learned about memory storage and persistent storage.
