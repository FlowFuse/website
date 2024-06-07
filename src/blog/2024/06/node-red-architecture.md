---
title: How Does Node-RED works
subtitle: Detailed guide explaining how Node-RED works behind the scenes
description: A comprehensive exploration of Node-RED's internal architecture and workings, from its runtime environment to flow management.
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

It's been almost 10 years since Node-RED was created, and it has gained significant popularity in the IoT and IIoT domains. Many manufacturing and automobile companies claim that Node-RED is an essential part of their manufacturing facilities. Despite its wide adoption and popularity, there isn't a single blog on the internet that thoroughly explains how it works behind the scenes. However, there are thousands of blogs on how to use it with different hardware, covering its basics, and more. In this guide, we will explain how Node-RED actually works, starting from when you execute the command to start it. 

<!--more-->

## Components of Node-RED

Before we dive into its working, let's first take a quick overview of its major components:

- **Node.js Runtime:** The runtime is the execution environment for Node-RED. It is responsible for running the flows that you create in the editor. The runtime is built on Node.js, which provides an event-driven, non-blocking I/O model that makes it ideal for handling asynchronous tasks and real-time data.

- **Node-RED Editor:** The web-based interface for creating, configuring, and managing flows.

- **Nodes:** The basic building blocks of Node-RED, representing specific functionalities.

- **Flows:** A collection of nodes wired together to perform a specific task.

- **Context:** A way to store data that can be shared between nodes in a flow, with three levels: node, flow, and global context.

For more information refer to [Node-RED Terminology docs](/node-red/terminology)

## How Node-RED Works

### Initialization Process

When you execute the `node-red` command in your terminal, Node-RED begins by ensuring that the Node.js runtime environment is properly set up since Node-RED is built on Node.js. The node-red script then initializes the Node-RED application, loading core components and libraries required for its operation.

### Configuration Loading

Node-RED loads its configuration settings from various sources to determine how it should operate. The default settings file, `settings.js`, is loaded first. This file contains essential configuration options for the Node-RED runtime, such as the port number, security settings, and storage options.

### Logging System

After loading the configuration settings, Node-RED initializes its logging system based on these settings. This logging system helps in debugging and monitoring the application by providing detailed logs of its operations.

### Loading Nodes

Node-RED loads all the available nodes from the `.node-red/node_modules` directory and additionally looks outside of the Node-RED install structure in the `.node_modules` folder. This means if someone installed nodes outside of `.node-red`, Node-RED can still access them. After loading the palettes, it stores the configuration of all loaded nodes such as name and file path in the `.node-red/.config.nodes` file, making loading them again easier and faster.

### Loading Flows

Node-RED then loads the `flows.json` file, which contains all the configurations for your existing flows. This file is essential as it defines the behavior and structure of the flows you have created.

### Context Storage

Node-RED sets up context storage, which can be configured to store data either in memory or in files (persistent storage). This allows nodes to store and share data between them, facilitating complex interactions and data management within flows.

### Starting the HTTP Server

Node-RED starts an HTTP server to serve the web-based editor and API endpoints for programmatic interaction with Node-RED. By default, it starts on `localhost:1880`.

## Building and Deploying Flows

### Creating Flows

When you build flows by dragging nodes and connecting them, Node-RED temporarily stores these configurations in memory.

### Deploying Flows

Upon deploying the flows, Node-RED saves the configurations to the `flows.json` file persistently. The deployment process ensures that all the necessary nodes and connections are active, then it translates the flow.json into the executable node.js code then this script gets starts running.

### Exporting and Importing Flows

When you export or import a flow, Node-RED interacts with the `flows.json` file. For instance, if you import a flow and deploy it, it will get stored in the `flows.json` file. Similarly, when you export a flow, Node-RED reads from the `flows.json` file to provide the current configuration. Node-RED continuously interacts with the `flows.json` file, updating it with the latest configurations and state of the flows.

### Internal Communication

Node-RED utilizes the event-driven architecture of Node.js, where each node acts as an event emitter. When a message is created, the originating node emits an event that is caught by the next node in the flow. This message passing is handled internally using Node.js's asynchronous and non-blocking I/O mechanisms. Nodes use callback functions to handle messages asynchronously; when a node receives a message, it processes it and then forwards it to the next node in the flow via a callback function.

### Node Installation via Palette Manager

When you install a node via the Palette Manager, Node-RED uses a child process to install that node via an npm script under the `.node-red` directory. This process involves downloading the node package from the npm registry.

## Stopping Node-RED

When you stop Node-RED, the following steps occur:

1. **Graceful Shutdown:** Node-RED attempts to gracefully shut down all running flows. This involves informing all nodes to complete any ongoing tasks and clean up resources.
2. **Save State:** Node-RED saves the current state of the flows and context to ensure that it can resume from the same state when restarted.
3. **Stop HTTP Server:** The HTTP server is stopped, terminating any active connections to the Node-RED editor and API endpoints.
4. **Terminate Runtime:** Finally, the Node.js runtime is terminated, concluding the Node-RED process.

This thorough shutdown process ensures that no data is lost and the system can be restarted smoothly.

## Conclusion

In this guide, we've explored the inner workings of Node-RED, from its initialization process to flow management and deployment. However, it's essential to note that this is just a basic overview, and there's much more to Node-RED than what we've covered here. But Understanding the basic internal workings of Node-RED not only helps in better utilizing its features but also in troubleshooting and optimizing performance for complex IoT and automation projects.

