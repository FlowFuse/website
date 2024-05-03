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
        "id": "75e4c8a97e30b108",
        "type": "inject",
        "z": "1027b41ed961cbc5",
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
                "85383be37566ea36"
            ]
        ]
    },
    {
        "id": "85383be37566ea36",
        "type": "websocket out",
        "z": "1027b41ed961cbc5",
        "name": "websocket server",
        "server": "65bb0cfe75e94539",
        "client": "",
        "x": 690,
        "y": 240,
        "wires": []
    },
    {
        "id": "c51c076d5d15b727",
        "type": "complete",
        "z": "1027b41ed961cbc5",
        "name": "complete",
        "scope": [
            "85383be37566ea36"
        ],
        "uncaught": false,
        "x": 380,
        "y": 360,
        "wires": [
            [
                "206f2f78564b40d8"
            ]
        ]
    },
    {
        "id": "206f2f78564b40d8",
        "type": "debug",
        "z": "1027b41ed961cbc5",
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
        "id": "3a3c5d99ecf56c4a",
        "type": "comment",
        "z": "1027b41ed961cbc5",
        "name": "Sending data to websocket server",
        "info": "",
        "x": 520,
        "y": 180,
        "wires": []
    },
    {
        "id": "126eac07e1f41280",
        "type": "comment",
        "z": "1027b41ed961cbc5",
        "name": "Upon successful data transmission to the WebSocket server, the Complete node handles the event.",
        "info": "",
        "x": 560,
        "y": 300,
        "wires": []
    },
    {
        "id": "65bb0cfe75e94539",
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
        "id": "f3567f52f2c9f98b",
        "type": "function",
        "z": "a2240ea952051e81",
        "name": "Long running process",
        "func": "// Simulate an asynchronous operation with await\nlet result = await new Promise(resolve => {\n    setTimeout(() => {\n        resolve('Async operation completed');\n    }, 2000); // Simulate a 3-second asynchronous operation\n});\n\n// Call node.done() to indicate completion\nnode.done();\n\n// Perform additional long process \nlet length = result.length\n\nsetTimeout(() => {\n    \n    node.send({ payload: length });\n}, 4000);\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 420,
        "y": 220,
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
        "x": 150,
        "y": 220,
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
        "x": 290,
        "y": 340,
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
        "x": 580,
        "y": 340,
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
        "x": 660,
        "y": 220,
        "wires": []
    },
    {
        "id": "7412de7c14e16942",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Perform long-running process and upon completion, trigger the Complete node, then perform additional operations.",
        "info": "",
        "x": 450,
        "y": 160,
        "wires": []
    },
    {
        "id": "6668136d53f3c650",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Handle long-running process completion event.",
        "info": "",
        "x": 420,
        "y": 280,
        "wires": []
    }
]

{% endrenderFlow %}

## Output Message:

When a task is completed by a specified node in the Complete Node, it emits the same message object emitted by that specified node.
