---
eleventyNavigation:
  key: Complete
  parent : Common
---

# Node-RED Complete Node

## What is the Complete Node?

The Complete Node in Node-RED is used to trigger a flow after a specified node completes its execution or a certain task. This is achieved by informing the Node-RED runtime about the completion of a task performed by the node itself.

In custom nodes, this support is typically implemented by calling the `done()` callback function after the execution of the task. This signals to the runtime that the task has been completed and triggers the Complete Node.

**Note:** While this node is supported by all nodes, only nodes that have implemented support by informing the runtime about the completion of a certain task can utilize it.

This node must be configured to handle events for selected nodes; it does not provide an option to enable event handling from all nodes automatically.

For notifying task completion in the middle of a function, you can use node.call in a function node.


## Use Cases

- **Asynchronous Task Completion:**

Suppose you have a flow where one node performs an asynchronous task, such as fetching data from an API. You can use the Complete Node to trigger the next set of actions in the flow only after the data has been successfully fetched.

- **Long-running Process Completion:**

For processes that take a significant amount of time to complete, such as batch jobs, data transformations, or machine learning tasks, the Complete Node can be used to mark the end of these processes and trigger follow-up actions or notifications.

- **Batch Processing:**

For batch processing tasks, the Complete Node can be used to signal the completion of a batch process. This could be useful in data processing workflows where data is processed in batches, and you need to know when each batch is finished before starting the next one.

- **Output-less Node:**

In Node-RED, certain nodes like WebSocket-out and MQTT-out do not have outputs to connect with. The Complete node in Node-RED can be helpful when you need to know when a process is done by those nodes.

# Example

1. In the example flow below, we have a WebSocket server, the Inject node sends data to the WebSocket server, and upon successful transmission to the WebSocket server, a Complete node handles the event.

{% renderFlow %}

[{"id":"c10651a30bf2d6ab","type":"inject","z":"a2240ea952051e81","name":"send data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":300,"y":220,"wires":[["915f186a0a2b9663"]]},{"id":"915f186a0a2b9663","type":"websocket out","z":"a2240ea952051e81","name":"websocket server","server":"65bb0cfe75e94539","client":"","x":590,"y":220,"wires":[]},{"id":"ad8b360ab6cfeb02","type":"complete","z":"a2240ea952051e81","name":"complete","scope":["915f186a0a2b9663"],"uncaught":false,"x":280,"y":340,"wires":[["3a1e38c46e9e2e47"]]},{"id":"3a1e38c46e9e2e47","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":640,"y":340,"wires":[]},{"id":"a8bc28796b265405","type":"comment","z":"a2240ea952051e81","name":"Sending data to websocket server","info":"","x":420,"y":160,"wires":[]},{"id":"40320b4bdb0a294d","type":"comment","z":"a2240ea952051e81","name":"Upon successful data transmission to the WebSocket server, the Complete node handles the event.","info":"","x":460,"y":280,"wires":[]},{"id":"65bb0cfe75e94539","type":"websocket-listener","path":"/ws/response","wholemsg":"false"}]

{% endrenderFlow %}

In the example flow below, we have an inject node sending an HTTP GET request to a mock API. After successful completion of the request, the complete node will handle the event.

{% renderFlow %}

[{"id":"1be36b7e2b60d224","type":"inject","z":"a2240ea952051e81","name":"Get Todolist ","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":290,"y":240,"wires":[["9467be1692a1ae7b"]]},{"id":"93eedc09f6c55a7a","type":"complete","z":"a2240ea952051e81","name":"","scope":["9467be1692a1ae7b"],"uncaught":false,"x":290,"y":360,"wires":[["5f1a90e93fad1567"]]},{"id":"5f1a90e93fad1567","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":580,"y":360,"wires":[]},{"id":"7412de7c14e16942","type":"comment","z":"a2240ea952051e81","name":"Sending get request to API ","info":"","x":410,"y":180,"wires":[]},{"id":"6668136d53f3c650","type":"comment","z":"a2240ea952051e81","name":"Handle the request completion event.","info":"","x":410,"y":300,"wires":[]},{"id":"9467be1692a1ae7b","type":"http request","z":"a2240ea952051e81","name":"","method":"GET","ret":"obj","paytoqs":"ignore","url":"https://jsonplaceholder.typicode.com/todos","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":570,"y":240,"wires":[[]]}]

{% endrenderFlow %}

## Output Message:

When a task is completed by a specified node in the Complete Node, it emits the same message object emitted by that specified node.
