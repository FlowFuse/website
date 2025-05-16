## What's the Status node in Node-RED used for?
The Status node allows you to monitor the status of individual nodes or all the nodes running in your flow. The status node does not produce a payload but it does report on the operation of the node. This will allow you to programmatically react to error conditions or use case restrictions in a flow.

For example, a delay node that is queuing external messages may want to report an error message after the queue exceeds a specific number. The status node can be used to track the number of messages in the queue.

The output of the status node is in two formats: 1) the textual output is added in real-time below the node. The color of the output will also change depending on the status. 2) An object called status is accessible from the debugger and other nodes, like the change node.  The properties of the status object are listed below.

## Example of Status nodes

![Delay Node with Status Node](./images/status-node.png)

![Debug output of Status Node](./images/status-node-output.png)

