---
title: FlowFuse Assistant Writes JSON 
description: "The FlowFuse Assistant gets more helpful."

date: 2024-07-16 13:00:00.0

authors: ["stephen-mclaughlin"]
tags:
    - changelog
---

The FlowFuse Assistant can now assist you by generating JSON.

Wherever you edit JSON in the Rich Monaco Editor you will see the "Ask the FlowFuse Assistant 🪄" code lens.
That includes the Inject Node, the Template Node and any contrib node that uses the built-in editor for writing JSON.

We think you will find this to be a great time saver and a good helper when you are unsure of the syntax.

Just ask for what you want and it does a decent job of figuring it out.

Here are some examples:


### Asking the assistant to generate JSON from within the `template` node

![Prompting from within the Template Node](./images/ask-assistant-json-1a.png)
![Resulting JSON](./images/ask-assistant-json-1b.png)

### Asking the assistant to generate JSON from within the `inject` node for the `payload` value 

![Prompting from within the Inject Nodes Typed Input](./images/ask-assistant-json-2a.png)
![Resulting JSON](./images/ask-assistant-json-2b.png)

This is just the beginning of the FlowFuse Assistant's capabilities. Stay tuned!

_JSON Support is available in the FlowFuse Assistant plugin starting from version 0.1.1_

