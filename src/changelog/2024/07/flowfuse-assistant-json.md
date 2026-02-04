---
title: FlowFuse Expert Writes JSON 
description: "The FlowFuse Expert gets more helpful."

date: 2024-07-16 13:00:00.0

authors: ["stephen-mclaughlin"]
tags:
    - changelog
---

The FlowFuse Expert can now assist you by generating JSON.

Wherever you edit JSON in the Rich Monaco Editor you will see the "Ask the FlowFuse Expert 🪄" code lens.
That includes the Inject Node, the Template Node and any contrib node that uses the built-in editor for writing JSON.

We think you will find this to be a great time saver and a good helper when you are unsure of the syntax.

Just ask for what you want and it does a decent job of figuring it out.

Here are some examples:


### Asking the Assistant to generate JSON from within the `template` node

![Prompting from within the Template Node](./images/ask-assistant-json-1a.png)
![Resulting JSON](./images/ask-assistant-json-1b.png)

### Asking the Assistant to generate JSON from within the `inject` node for the `payload` value 

![Prompting from within the Inject Nodes Typed Input](./images/ask-assistant-json-2a.png)
![Resulting JSON](./images/ask-assistant-json-2b.png)

This is just the beginning of the FlowFuse Expert's capabilities. Stay tuned!


#### Updating the Assistant to get these new features
If you are running Node-RED v4.x, head over to the Palette Manager, update the plugin and restart your instance.


![Updating assistant on Node-RED 4](./images/assistant-update-nr4.png)


If you are still running Node-RED v3.x, you can update the plugin by adding `@flowfuse/nr-assistant` to the instance settings then restart it.

![Updating assistant on Node-RED 3](./images/assistant-update-nr3.png)




