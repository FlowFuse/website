---
title: How Does Node-RED Work
subtitle: An Overview of Node-RED's Internal Architecture and Workings
description: Explore the internal architecture and workings of Node-RED, from its runtime environment to flow management.
date: 2024-06-11
authors: ["sumit-shinde"]
image:
tags:
 - posts
 - node-red
 - architecture
 - behind the scenes
 - how node-red works
---

It's been almost 10 years since Node-RED was created, and it has become a cornerstone in the IoT and IIoT domains. Many manufacturing and automobile companies claim that Node-RED is an essential part of their operations, enhancing efficiency and automation in their facilities. As Node-RED continues to gain popularity, users are increasingly curious about its inner workings. So in this article, we will take an overview of how Node-RED works behind the scenes, starting from when you hit the command to start Node-RED.

<!--more-->

## Components of Node-RED

Before we dive into its workings, let's first take a quick overview of its major components:

- **Node.js Runtime:** The runtime is the execution environment for Node-RED. It is responsible for running the flows that you create in the editor. The runtime is built on [Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs), which provides an event-driven, non-blocking I/O model that makes it ideal for handling asynchronous tasks and real-time data.
- **Node-RED Editor:** The web-based interface for creating, configuring, and managing flows.
- **Nodes:** The basic building blocks of Node-RED, representing specific functionalities.
- **Flows:** A collection of nodes wired together to perform a specific task.
- **Context:** A way to store data that can be shared between nodes in a flow, with three levels: node, flow, and global context.

For more information, refer to [Node-RED Terminology](/node-red/terminology).

## How Node-RED Works

### Initialization Process

When you execute the `node-red` command in your terminal, Node-RED begins by ensuring that the Node.js runtime environment is properly set up. The Node-RED script `red.js` then initializes the Node-RED application, loading core components and libraries required for its operation.

Next, Node-RED initializes the runtime settings. If no custom settings are provided, default settings are used. These settings include crucial configuration options such as the directory for core nodes, logging settings, and HTTP server configurations.

### Logging System

After Node-RED initializes its runtime settings, it proceeds to execute the rest of the code in the red.js file. During this process, Node-RED logs details using the console object methods present in its codebase, such as .log and .error. Logging is crucial for monitoring and debugging Node-RED operations. Third-party nodes also utilize the console object methods for general logging, ensuring comprehensive visibility into system behavior.

### Loading Nodes

Next, Node-RED loads all core nodes from the `@node-red/nodes/core` directory first, followed by third-party nodes from the `.node-red/node_modules` directory, and additionally looks outside of the Node-RED install structure in the `.node_modules` folder. This means if someone installed nodes outside of `.node-red`, Node-RED can still access them. After loading the palettes, it stores the configuration of all loaded nodes, such as name and file path, in the `.node-red/.config.nodes` file, making loading them again easier and faster.

### Loading Flows

Following the node loading process, Node-RED loads the `flows.json` file, which contains all the configurations for your existing flows. This file is essential as it defines the behavior and structure of the flows you have created.

### Context Storage

Node-RED then sets up context storage, which can be configured to store data either in memory or in files (persistent storage). This ensures that data can be shared between nodes in a flow efficiently.

### Starting the HTTP Server

Finally, Node-RED starts an HTTP server, which is an Express application serving the web-based editor and API endpoints for programmatic interaction with Node-RED. By default, it starts on `localhost:1880`.

## Building and Deploying Flows

### Creating Flows

When you build flows by dragging nodes and connecting them, Node-RED temporarily stores these configurations in memory.

### Deploying Flows

Upon deploying the flows, Node-RED saves the configurations to the `flows.json` file persistently. The deployment process ensures that all the necessary nodes and connections are active. It then translates the `flows.json` into executable Node.js code, which subsequently commences execution.

## Internal Communication

Once the flows are executed, the nodes start communicating with each other. Node-RED uses Node.js's event-driven architecture to enable smooth internal communication. Each node in a flow acts as an event emitter. When a message is created by a node, it emits an event that the next node in the flow catches. This message passing is managed using Node.js's asynchronous, non-blocking I/O mechanisms. Nodes process messages asynchronously with callback functions: when a node receives a message, it processes it and then forwards it to the next node using a callback.

### Exporting and Importing Flows

When you export or import a flow, Node-RED interacts with the `flows.json` file. For instance, if you import a flow and deploy it, it will get stored in the `flows.json` file. Similarly, when you export a flow, Node-RED reads from the `flows.json` file to provide the current flow configuration.

### Node Installation via Palette Manager

When you install a node via the Palette Manager, Node-RED uses a child process to install that node via an npm script under the `.node-red` directory. This process involves downloading the node package from the npm registry.

## Stopping Node-RED

When you stop Node-RED, it follows a meticulous shutdown process to ensure data integrity and smooth restart capabilities. First, Node-RED initiates a graceful shutdown, informing all nodes to complete any ongoing tasks and clean up resources. Since Node-RED saves flow configuration on flow deployment, it doesn't need to save the flow again. Once the nodes have cleaned up and completed their tasks, Node-RED stops the HTTP server, terminating any active connections to the Node-RED editor and API endpoints. Finally, the Node.js runtime is terminated, concluding the Node-RED process.

This thorough shutdown process ensures that no data is lost and the system can be restarted smoothly.

## Conclusion

In this guide, we've explored the inner workings of Node-RED, from its initialization process to flow management and deployment. However, it's essential to note that this is just a basic overview, and there's much more to Node-RED than what we've covered here. Understanding the basic internal workings of Node-RED not only helps in better utilizing its features but also in troubleshooting and optimizing performance for complex IoT and automation projects.

## Additional Resources

If you are interested in delving deeper into the workings of Node-RED, the following resources are recommended:

- [Node-RED Modules](https://nodered.org/docs/) - Official documentation providing a high-level overview of Node-RED modules.
- [Node-RED GitHub Repository](https://github.com/node-red/node-red) - Source code repository for Node-RED, allowing you to delve deeper into its workings and contribute to its development.
- [FlowFuse Architecture](/docs/contribute/architecture/) - Detailed explanation of the architecture of FlowFuse, providing insights into Node-RED's implementation.
