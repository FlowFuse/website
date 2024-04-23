---
title: Beginner's Guide to Node-RED Variables
subtitle: Understanding Flow, Global, and Environment Variables in Node-RED.
description: Understand Node-RED node, flow, global, and environment varriable. Learn to initiate, retrieve, and manage them effortlessly.
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

Node-RED is super easy and doesn't require much coding knowledge, which is why many people love it! Even though Node-RED is straightforward, some terms, like "global," "flow," and "environment" variables, might seem puzzling at first. However, many people have realized these concepts are quite easy to grasp after reading about them or simply participating in Node-RED forums. In contrast, it may take some time. 

<!--more-->

We'll cover these concepts comprehensively in this guide, making it easier for you to understand and work with Node-RED variables without taking much time.

## Understanding Node-RED Variables

Variables play a crucial role in Node-RED, making tasks easier and cutting down database requirements for small applications/dashboards. Node-RED offers four types of variables: Node, Flow, Global, and Environment, each with unique scopes and use cases. Except for the Environment, all variables are stored in memory, which makes them temporary.

### Exploring Node variables

Node variables are specific to each node and are only visible within that node. This means we cannot read or write into that variable from outside of that node.

#### Initiating/setting Node variable

To initiate and set a node variable in function node, you will have to use the context’s `set` method:

```js
context.set('variableName', value);
```

This action sets the value for the context variable with the specified name.

#### Retrieving Node variable

To retrieve a node variable, use the context's `get` method:

```js
context.get('variableName');
```

## When to use it?

- Ideal for storing data specific to a single node, ensuring data isolation and preventing interference with other nodes
- **Example Scenario:** You have a form on a Node-RED Dashboard 2.0, and you want to insert the submitted data into a database along with a unique ID for each submission. You can use a node variable to store and track a counter variable in the function node.

### Exploring Flow variables

Flow variables are visible to all nodes within the same tab or flow where they have been set. They provide a way to share data between nodes within a specific flow.

#### Initiating/setting Flow variable

We can set flow variables using function and change node. To initiate a Flow variable in the function node, you will have to use the flow's `set` method like below in the function node:

```js
flow.set('variableName', value);
```

In the change node, you can set it as shown in the below image

!["Screenshot showing how to set flow varriable using the change node"](./images/varriables-in-node-red-setting-flow-varriable-using-change-node.png "Screenshot showing how to set flow varriable using the change node"){data-zoomable}

#### Retrieving Flow variable

To retrieve a flow variable, use the flow's `get` method like the below in the function node:

```js
flow.get('variableName');
```

In the change node, you can retrieve it as shown in the below image:

!["Screenshot showing how to retrive flow varriable using the change node"](./images/varriables-in-node-red-retriving-flow-varriable-using-change-node.png "Screenshot showing how to retrive flow varriable using the change node"){data-zoomable}

#### When to use it?

- Useful for sharing data within a specific flow or tab, allowing for seamless data transfer between nodes within the same flow.
- **Example Scenario:** In a temperature monitoring system, you have multiple sensors sending data to different nodes within the same flow. You can use flow variables to pass the current temperature reading between nodes for processing and analysis within that specific flow.

### Exploring Global variables

Global variables are accessible to all nodes and flows within a Node-RED instance where they are set. They provide a centralized location for storing data that needs to be accessed from different parts of your application.

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
In the change node, you retrieve it as shown in below image:

!["Screenshot showing how to retrive global varriable using the change node"](./images/varriables-in-node-red-retriving-global-varriable-using-change-node.png "Screenshot showing how to retrive global varriable using the change node"){data-zoomable}

#### When to use it?

- When you need to share data across different flows or tabs within the same Node-RED instance.
- **Example Scenario:** You're building a home automation system where different flows control various aspects of your smart home, such as lighting, security, and climate control. You can use global variables to store user preferences or system settings that need to be accessed and updated by multiple flows, ensuring consistent behavior across your entire home automation setup.

### Exploring Environmental variables

Environment variables, similar to global variables, and are accessible across all nodes and flows within a Node-RED instance. However, they're specifically used for storing sensitive configuration data, such as API keys or database credentials, ensuring this information isn't directly exposed within your flows.

#### Initiating/setting Flow variable

We cannot set environment variables within the function node or change node as they are passed to the application at runtime, and to set and manage we have seprate interface within instance settings.

For more information on setting environment variables refer to the [Using Environment variables with Node-RED](https://flowfuse.com/blog/2023/01/environment-variables-in-node-red/)

#### Retrieving Environment variable
we can retrieve environment variables using the function node and change node, to retrieve it, using the function node use the global's `get` method like as below:

```js
env.get('variableName');
```
In the change node, you can retrieve it as shown in the below image:

!["Screenshot showing how to retrieve environment varriable in the change node"](./images/varriables-in-node-red-retriving-environment-varriable-using-change-node.png "Screenshot showing how to retrieve environment varriable in the change node"){data-zoomable}

#### When to use it?

- When you need to securely store sensitive configuration data separately so that you won't expose it accidentally in flow.
- **Example Scenario:** You're developing a Node-RED application that integrates with external APIs, such as a weather service or a payment gateway. You can use environment variables to store API keys or authentication tokens securely, ensuring that sensitive information is not exposed within your flow configurations or source code.

### Managing and Deleting variables

Node-RED provides an seprate interface to view and manage our all Node-RED Variables. Navigate to the sidebar's context data tab and there you will see the sections for Node, Flow, and Global variables. at each section's top right you will see a refresh icon, click on it when you have to see the updated, newly added variables.

To delete a variable, you need to click on the delete icon next to each variable in their corresponding sections.

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


