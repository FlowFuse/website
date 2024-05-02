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

[
    {
        "id": "a2240ea952051e81",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "0ffd052d3a0c583c",
        "type": "inject",
        "z": "a2240ea952051e81",
        "name": "send data",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 400,
        "y": 240,
        "wires": [
            [
                "1160967f875f5399"
            ]
        ]
    },
    {
        "id": "1160967f875f5399",
        "type": "websocket out",
        "z": "a2240ea952051e81",
        "name": "websocket server",
        "server": "0b8456b0529f60be",
        "client": "",
        "x": 690,
        "y": 240,
        "wires": []
    },
    {
        "id": "84d9c72e648a4640",
        "type": "complete",
        "z": "a2240ea952051e81",
        "name": "complete",
        "scope": [
            "1160967f875f5399"
        ],
        "uncaught": false,
        "x": 380,
        "y": 360,
        "wires": [
            [
                "f9c439ec61e6d287"
            ]
        ]
    },
    {
        "id": "f9c439ec61e6d287",
        "type": "debug",
        "z": "a2240ea952051e81",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 740,
        "y": 360,
        "wires": []
    },
    {
        "id": "e0852e10d3f8a8e2",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Sending data to websocket server",
        "info": "",
        "x": 520,
        "y": 180,
        "wires": []
    },
    {
        "id": "69800e773f4cb150",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Upon successful data transmission to the WebSocket server, the Complete node handles the event.",
        "info": "",
        "x": 560,
        "y": 300,
        "wires": []
    },
    {
        "id": "0b8456b0529f60be",
        "type": "websocket-listener",
        "path": "/ws/response",
        "wholemsg": "false"
    }
]

{% endrenderFlow %}

2. In this example, we simulate a time-consuming task using setTimeout in a function named "Long running process". After completion, we mark success with `node.done()` using a Complete node. Then, perform further action we process the result and assign it to `msg.payload` for further use.

{% renderFlow %}

[
    {
        "id": "a2240ea952051e81",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "f3567f52f2c9f98b",
        "type": "function",
        "z": "a2240ea952051e81",
        "name": "Long running process",
        "func": " try {\n        // Simulate an asynchronous operation with await\n        let result = await new Promise(resolve => {\n            setTimeout(() => {\n                resolve('Async operation completed');\n            }, 3000); // Simulate a 3-second asynchronous operation\n        });\n        \n        // Call node.done() to indicate completion\n        node.done();\n\n    // additional operation after completion \n       \n     result = result.toUpperCase()   \n     msg.payload = result\n\n    } catch (error) {\n        // Handle errors if the asynchronous operation fails\n        console.error('Error:', error);\n        // Call node.error() if needed to indicate an error in Node-RED flow\n        node.error(error);\n    }\n\n    return msg",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 500,
        "y": 160,
        "wires": [
            [
                "9ea7b8d70f98e480"
            ]
        ]
    },
    {
        "id": "1be36b7e2b60d224",
        "type": "inject",
        "z": "a2240ea952051e81",
        "name": "Trigger",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 230,
        "y": 160,
        "wires": [
            [
                "f3567f52f2c9f98b"
            ]
        ]
    },
    {
        "id": "93eedc09f6c55a7a",
        "type": "complete",
        "z": "a2240ea952051e81",
        "name": "",
        "scope": [
            "f3567f52f2c9f98b"
        ],
        "uncaught": false,
        "x": 370,
        "y": 280,
        "wires": [
            [
                "5f1a90e93fad1567"
            ]
        ]
    },
    {
        "id": "5f1a90e93fad1567",
        "type": "debug",
        "z": "a2240ea952051e81",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 280,
        "wires": []
    },
    {
        "id": "9ea7b8d70f98e480",
        "type": "debug",
        "z": "a2240ea952051e81",
        "name": "debug 2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 740,
        "y": 160,
        "wires": []
    },
    {
        "id": "7412de7c14e16942",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Perform long-running process and upon completion, trigger the Complete node, then perform additional operations.",
        "info": "",
        "x": 530,
        "y": 100,
        "wires": []
    },
    {
        "id": "6668136d53f3c650",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Handle long-running process completion event.",
        "info": "",
        "x": 500,
        "y": 220,
        "wires": []
    }
]

{% endrenderFlow %}

## Output Message:

When a task is completed by a specified node in the Complete Node, it emits the same message object emitted by that specified node.
