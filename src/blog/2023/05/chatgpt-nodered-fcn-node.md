---
title: Chat GPT in Node-RED Function Nodes
subtitle: New Node-RED function with embedded ChatGPT is now open-sourced and available to use!
description: Discover how ChatGPT integrates with Node-RED function nodes, enabling automated code generation. Explore the prompt engineering process and additional features.
date: 2023-05-02 12:00:00
lastUpdated: 2025-07-23
authors: ["joe-pavitt", "stephen-mclaughlin"]
image: /images/blog/tile-chatgpt-fcn-node.jpg
tags:
    - posts
    - node-red
    - community
    - how-to
    - chatgpt
---

Recently we [posted a demo of ChatGPT integration in a Node-RED function node](https://www.linkedin.com/posts/flowforge_chatgpt-with-node-red-function-nodes-activity-7052725869684953088-2yOA?utm_source=share&utm_medium=member_desktop) 
onto our social media accounts. We have now <a href="https://github.com/FlowFuse/node-red-function-gpt" target="_blank">open-sourced</a> this for all to play with, and **welcome any and all contributions**.
<!--more-->

## How it Works - Prompt Engineering

OpenAI make a collection of their [Generative AI models](https://platform.openai.com/docs/models) available
via an API. We are wrapping OpenAI's [node.js module](https://www.npmjs.com/package/openai), and in particular
using the `openai.createChatCompletion()` functionality. For this API, you provide a chat history, and ChatGPT will
respond with the next entry in that conversation.

In order to "train" ChatGPT for our use case of populating Node-RED function nodes, we first tried a collection of prompts, defining specific
requirements for the contents, e.g. _"Always write Javascript"_, _"Never include the wrapping function definition"_,
_"Assume the input is always msg"_.

It turns out though, that we were over-engineering it, we were not getting reliable results and ended up
realising that ChatGPT's existing knowledge of Node-RED was sufficient such that we could use that as a prompt:

Here's what we settled on:

```javascript
messages: [
    {role: "system", content: "always respond with content for a Node-RED function node, and don't add any commentary, always use const or let instead of var. Always return msg, unless told otherwise."},
    {role: "user", content: prompt}
],
```

Here we send a `system` prompt in order to setup ChatGPT, and then follow that immediately with whatever the user has typed.
From our (limited) testing, this has given us fairly reliable results.

Breaking this prompt down:

- ***"Always respond with content for a Node-RED function node"***: Ensured no surrounding `function () {}` definition and set expectations that the function would deal with a `msg` and likely `msg.payload` object.
- ***"Don't add any commentary"***: ChatGPT likes to, well, chat. It would always return raw text justifying decisions, etc. Here, we just wanted the code.
- ***"Always use const or let instead of var"***: This was Steve being picky.
- ***"Always return msg, unless told otherwise"***: We found this wasn't mostly required, but occasionally it would try to return a different variable, and we'd lose context of `msg.payload`, or other data stored in `msg`. So this just made sure we had the consistency.

The response from this API call is then populated into the contents of the active tab in the function node:

<img width="1728" alt="Screenshot 2023-04-21 at 16 08 47" src="https://user-images.githubusercontent.com/99246719/233671631-fefa36c1-6db4-4392-a057-314c16fd91b7.png">

In order to use it yourself, you will need a [valid API Key from OpenAI](https://platform.openai.com/account/api-keys).

## Additional Features

This was built in about a day by Steve and Joe, and we had plenty of ideas on what we'd like to add to it. We've
[open-sourced](https://github.com/FlowFuse/node-red-function-gpt) it, and will add these as issues to the repo, but if anyone want so take a stab at contributing - that'd be most welcome!

- **Insert at Cursor ([issue](https://github.com/FlowFuse/node-red-function-gpt/issues/11)):** Currently, the Ask GPT call will replace _all_ of the content of that tab. Would be great
to have the code insert wherever the cursor last was in order to add to existing code.

- **Retain Conversation History ([issue](https://github.com/FlowFuse/node-red-function-gpt/issues/12)):** Each time a new prompt is provided by the Node-RED user, we send a fresh conversation to OpenAI,
meaning that knowledge of previously asked questions are not retained.

- **Client side ChatGPT Config ([issue](https://github.com/FlowFuse/node-red-function-gpt/issues/13)):** Currently, when you add a new "function-gpt" node you need to select the ChatGTP
Config node and click "Deploy" before you can ask it a question. Our ChatGPT interaction operates server-side (to
protect your API key), so Node-RED needs that in the runtime first, before a call to ChatGPT can be made. Ideally,
we'd be smarter here and pass client-side creds along with the call such that we can use any changes made by the
user at the time of the call.

## FlowFuse Assistant - No API Keys Required!

Great news! You no longer need to manage OpenAI API keys or configure ChatGPT nodes. The [FlowFuse Assistant](/docs/user/expert/) is now built directly into Node-RED on FlowFuse Cloud, making AI-powered development even easier.

Available on FlowFuse Cloud, the Assistant offers:

- **Quick Function Node Creation**: Add function nodes to your flow without dragging from the palette
- **In-line Code Generation**: Generate JavaScript code for function nodes, JSON for JSON editors, and Vue.js for FlowFuse Dashboard ui-template widgets
- **Flow Explainer**: Select nodes and click "Explain Flows" to understand what they do

FlowFuse Assistant helps developers work faster and smarter with Node-RED. [Start your free trial]({{ site.onboardingURL }}) to experience AI-powered Node-RED development on FlowFuse Cloud.