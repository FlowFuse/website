---
eleventyNavigation:
  key: Debug
  parent : Common
---

# Node-RED Debug Node

## Where and why do we use the Debug node?

The Debug node is used to understanding the message and data travelling through your flows.
During development, it is highly recommended to add Debug nodes at key points in your flow so that you have visibility and understanding of what is being passed around.

In the Node-RED editor, debug messages can be viewed in the right-hand sidebar panel, under the debug icon.

![Debug Panel](./images/debug-panel.png)

Please feel free to skip ahead to the [Top Tips](#top-tips) section if you are already familiar with the Debug node configuration options.

## Configuration Options

The Debug node has a number of configuration options:
* **Output** i.e. what you want the debug node to output:
    * `msg.` 
        * The Debug node can be configured to output any property of the msg object. It may be you want to output the value of `msg.topic` or `msg.my_property` instead.
    * `complete msg object`
        * For seeing the entire msg object and all of its properties.
        * There is often valuable information in the msg object that can be used in your flows.
    * `JSONata expression`
        * [JSONata](https://jsonata.org/) query language can be used to transform the properties of the msg object to output more human readable information.
* **To** i.e. where you want the debug node to output:
    * `debug window`
        * When enabled, output will be sent to the debug sidebar.
    * `system console` 
        * When enabled, output will be sent to the system console where Node-RED is running.
        * This is useful for seeing debug output when the Node-RED editor is not open.
    * `node status`
        * When enabled, output will be displayed below the node.
        * Additional options are available to personalize the status output:
            * `same as debug output` - This will show the same output as what is shown in the debug output.
            * `msg.` - You can show something different in the status output than what is shown in the debug output.
            * `JSONata expression` - [JSONata](https://jsonata.org/) query language can be used to transform the properties of the msg object to output more human readable information.
            * `message counter` - This will show a count of the number of messages that have passed through the debug node.

## Top Tips

### Copy Path
The **Copy Path** feature is a real time saver and can save you much heartache when you are building your flows by helping you avoid typos and other errors.
Lets see it in action!

![Copy Path helper](./images/debug-copy-path.gif)


### Copy Value

When you are developing your flows, you may want an **exact** copy the value of a property in the msg object to use in an inject, change or function node for simulating data.
This is also extremely useful when you need help - you can provide a demo flow containing real data to help others understand your problem.

Lets see it in action!

![Copy Value helper](./images/debug-copy-value.gif)

### Pin Open

When there are lots of items in the debug item, it can be difficult to see the items of interest.
The **Pin Open** feature can help you find those things in a snap.

Lets see it in action!

![Pin Open helper](./images/debug-pin-open.gif)


## Example

Here is a demo flow that shows the most common ways the debug node can used to visualise your data and assist your development.

![Debug Nodes](./images/debug-examples.png)

