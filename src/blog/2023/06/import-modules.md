---
title: "Use any npm module in Node-RED (2026)"
subtitle: See how you can easily import any npm module, for use in a Node-RED function node.
description: Node-RED has an incredibly rich resource of integrations available, but sometimes you need that little extra. This shows you how.
lastUpdated: 2026-06-03
date: 2023-06-05
authors: ["joe-pavitt", "stephen-mclaughlin"]
image: /images/blog/tile-import-npm.jpeg
keywords: node-red npm module, import npm node-red, node-red function node npm, node-red require module, node-red custom module, npm package node-red, node-red momentjs
tags:
    - posts
    - how-to
cta:
  type: sign-up
  title: "Supercharge Node-RED with FlowFuse"
  description: "Sign up for FlowFuse to run Node-RED in the cloud, import any npm module in function nodes, and build powerful integrations without needing command-line access."
meta:
  howto:
    name: "How to Use Any npm Module in a Node-RED Function Node"
    description: "Learn how to import any npm module directly inside a Node-RED function node without using the command line, using the built-in Setup tab."
    totalTime: "PT10M"
    tool:
      - "Node-RED"
      - "FlowFuse"
    steps:
      - name: "Open the function node Setup tab"
        text: "Drop a new function node onto the canvas, double-click it to open its editor, and switch to the Setup tab."
        url: "function-node---setup"
      - name: "Add the npm module"
        text: "Under the Modules section, click '+ add', enter the name of the npm package you want to import, and optionally change the variable name it will be available under."
        url: "function-node---setup"
      - name: "Write your function using the imported module"
        text: "Switch back to the On Message tab and write your function code, referencing the module via the variable name you defined in the Setup tab."
        url: "function-node---setup"
      - name: "Try it with Moment.js"
        text: "Import the moment package and use it inside a function node to perform custom date calculations as shown in the Moment.js example."
        url: "example-momentjs"
      - name: "Try it with Easy CRC"
        text: "Import the easy-crc package and use it inside a function node to perform CRC calculations, as demonstrated in the Easy CRC example."
        url: "example-easy-crc"
      - name: "Try it with PostHog"
        text: "Import the posthog-node package inside a function node to ingest custom event data into PostHog from within a Node-RED flow."
        url: "example-posthog"
  faq:
    - question: "Can I use any npm package inside a Node-RED function node?"
      answer: "Yes. Node-RED's function node Setup tab allows you to specify any npm package by name. Node-RED will install it automatically and make it available as a variable in your function code."
    - question: "Do I need command-line access to import an npm module in Node-RED?"
      answer: "No. The built-in Setup tab in Node-RED function nodes lets you add npm modules directly from the Node-RED editor without any command-line access, which is especially useful when running Node-RED in the cloud."
    - question: "How do I reference the imported module in my function node code?"
      answer: "When you add a module on the Setup tab, you assign it a variable name. Use that variable name in your On Message (or other) function tabs to call the module's methods."
    - question: "What is the difference between custom nodes and importing npm modules in function nodes?"
      answer: "Custom nodes are pre-built Node-RED nodes available on flows.nodered.org and provide UI configuration. Importing npm modules in function nodes gives you direct code-level access to any Node.js package, even if no dedicated Node-RED wrapper exists."
    - question: "Can I use the moment npm package in Node-RED?"
      answer: "Yes. Import 'moment' via the Setup tab and use it inside your function to handle custom date parsing, formatting, and calculation tasks."
    - question: "What is the FlowFuse Assistant and how does it help with function nodes?"
      answer: "The FlowFuse Assistant is an AI-powered feature in FlowFuse that generates Node-RED function nodes from a plain-text prompt, reducing the time and effort needed to write function node code manually."
    - question: "Does importing npm modules in Node-RED work in containerized environments?"
      answer: "Yes. Because the import is handled by Node-RED's built-in module management rather than the host filesystem's npm CLI, it works in Docker, Kubernetes, and FlowFuse Cloud environments."
tldr: "Node-RED function nodes have a built-in Setup tab that lets you import any npm module by name without using the command line. This is particularly useful in cloud or containerized environments where CLI access is limited. Examples include moment for date handling, easy-crc for CRC calculations, and posthog-node for analytics ingestion."
---

Node-RED has <a href="https://flows.nodered.org/search?type=node" target="_blank">an incredibly rich resource of integrations available</a>, but sometimes you need that little bit of extra functionality, or access to a Node.js module that doesn't have it's own custom nodes in Node-RED. **We can easily import any npm module within the built-in Node-RED function nodes.**

<!--more-->

Historically in Node-RED, you would have needed to manually `npm install` modules from the command line, but now that it's so easy to run Node-RED in the Cloud, where you don't have easy access to those tools, what are the other options available?

## Function Node - Setup

![Location of the "add" button in order to import an npm module intoa  function node](./images/npmimport-add.jpg "Location of the 'add' button in order to import an npm module intoa  function node")

All you need is the name of the module you want to import, then:

1. Drop in a new "function" node & double-click it
1. Switch to the "Setup" tab
1. Underneath the "modules" tab, click "+ add" in the bottom-left of the window.
1. Enter the name of the module you want to use in the newly created row, and (optionally) modify the `variable` that this module will be imported in as.
2. Switch back to the "On Message" tab and write your function. Your new module will be available via the `variable` you defined in the "Setup" tab.

## Example: Moment.js

<video width="560" height="315" controls>
  <source src="https://website-data.s3.eu-west-1.amazonaws.com/MomentJS+Demo.mp4" type="video/mp4">
</video>

Recently we wanted to use [moment](https://www.npmjs.com/package/moment) for some custom date calculations. Whilst there was set of [Moment Node-RED nodes](https://flows.nodered.org/node/node-red-contrib-moment) already available, it didn't have all of the functionality we needed.

So, all we needed to do was import the module into a function node, and define our comparison there instead, here's a working example:

## Example: Easy CRC

<video width="560" height="315" controls>
  <source src="https://website-data.s3.eu-west-1.amazonaws.com/Easy+CRC+Demo.mp4" type="video/mp4">
</video>

Something we see [a lot on the Node-RED Forums](https://discourse.nodered.org/search?q=crc%20order%3Alatest) are questions on how to conduct CRC calculations. There is a popular node module `easy-crc` that can be imported and used in the function nodes, e.g:

## Example: PostHog

<video width="560" height="315" controls>
  <source src="https://website-data.s3.eu-west-1.amazonaws.com/PostHog+Node+Demo.mp4" type="video/mp4">
</video>

Node-RED is great for [data integration](/solutions/data-integration/). We use <a href="https://posthog.com/" target="_blank">PostHog</a> for our internal Product Analysis. We record live events as they occur on FlowFuse Cloud to better understand features that are (and are not) used.

We wanted to investigate whether or not we could add backdated data, which in theory was possible via their <a href="https://posthog.com/docs/libraries/node" target="_blank">posthog-node</a> module. We wanted to populate it with data driven from our own database and API. 

Within two minutes, we could wire up a node to retrieve data from our API, and then ingest it into `posthog-node` via the import of a function node.

## Simplify Function Node Creation with FlowFuse

[FlowFuse](/) provides a powerful platform to enhance, scale, and secure your Node-RED applications efficiently. One of our latest features, the **FlowFuse Assistant**, is designed to streamline the process of creating Function nodes.

With the FlowFuse Assistant, you can leverage AI to generate Function nodes effortlessly. Just input your prompt, and the Assistant will handle the creation for you, saving time and reducing manual coding.

To explore how to make the most of the FlowFuse Assistant and its capabilities, check out the [Assistants Documentation](/docs/user/expert/).