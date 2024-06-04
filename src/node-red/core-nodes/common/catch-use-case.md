---
eleventyNavigation:
  key: Catch
  parent : Common
---

# Node-RED Function Node

## What is the Catch Node?

The Catch node in Node-RED is crucial for handling errors within your flows. Whenever an error occurs within the flow, this node catches it. Once the Catch node catches an exception, it can pass relevant information in the msg object to another node. 

This helps you manage and respond to errors that may occur during flow execution and also prevent crash, which ensures smooth operation and effective error management.

*Note: Some third-party nodes have their own error-handling mechanisms, such as updating status or sending custom error messages which does properly inform to runtime about error ocurring. The catch node is unable to capture or handle these errors.*

## Configuring the Catch Node

The catch node can be configured with "Catch errors from" property with following options:

- **All Nodes**: Captures errors from all nodes in the same tab or flow.
  
- **In same Group**: Limits error capture to nodes within the same group of which it is part of.

- **Selected Nodes**: Captures errors from specific nodes chosen by you.

## Use Cases and examples

1. **Error Handling for External Integrations:** The Catch node handles errors when interacting with APIs, including network issues, response errors, server unavailability, database connection losses, timeout errors, and MQTT broker disconnections. Additionally, it performs retry actions as necessary. .

In the example flow below, the inject node sets a request timeout of 2000 milliseconds. In the HTTP request node, we have passed a mock URL with the delay parameter set to 3 seconds, simulating a delayed response. This simulated delay will cause a request timeout error, which will then be caught by the Catch node. After catching the error, the flow will retry the request after a delay of 5 seconds.

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
        "id": "f63239dbca38b4bd",
        "type": "catch",
        "z": "a2240ea952051e81",
        "name": "",
        "scope": null,
        "uncaught": false,
        "x": 140,
        "y": 420,
        "wires": [
            [
                "e140bb4f1e08ca78",
                "97d714e9a167118b"
            ]
        ]
    },
    {
        "id": "80edb0b84b4e0df9",
        "type": "inject",
        "z": "a2240ea952051e81",
        "name": "Send request",
        "props": [
            {
                "p": "requestTimeout",
                "v": "2000",
                "vt": "num"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 370,
        "y": 220,
        "wires": [
            [
                "f915a6e671560bc2"
            ]
        ]
    },
    {
        "id": "f915a6e671560bc2",
        "type": "http request",
        "z": "a2240ea952051e81",
        "name": "",
        "method": "GET",
        "ret": "txt",
        "paytoqs": "query",
        "url": "https://reqres.in/api/users?delay=3",
        "tls": "",
        "persist": false,
        "proxy": "",
        "insecureHTTPParser": false,
        "authType": "",
        "senderr": false,
        "headers": [],
        "x": 550,
        "y": 280,
        "wires": [
            [
                "58d611d6e51bbbf2"
            ]
        ]
    },
    {
        "id": "58d611d6e51bbbf2",
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
        "x": 740,
        "y": 280,
        "wires": []
    },
    {
        "id": "e140bb4f1e08ca78",
        "type": "debug",
        "z": "a2240ea952051e81",
        "name": "debug 2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 360,
        "y": 440,
        "wires": []
    },
    {
        "id": "97d714e9a167118b",
        "type": "delay",
        "z": "a2240ea952051e81",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 380,
        "wires": [
            [
                "f915a6e671560bc2"
            ]
        ]
    },
    {
        "id": "9021d6aa95d1b4bd",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Send request with timeout of 2000 mil seconds",
        "info": "",
        "x": 290,
        "y": 160,
        "wires": []
    },
    {
        "id": "1aba71ee60110eb5",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Set a delay of 3 seconds for the response.",
        "info": "",
        "x": 660,
        "y": 220,
        "wires": []
    },
    {
        "id": "1dbd22f81e7750aa",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Retry request after 5 seconds if request timeout",
        "info": "",
        "x": 240,
        "y": 320,
        "wires": []
    }
]

{% endrenderFlow %}

2. **User Input Validation**: In applications with user input, validation errors can disrupt the flow. The Catch node handles these errors, providing feedback or corrective actions.

In the example flow below, the function sorts input data received from an inject node using the sort method, which is only available for arrays. Sending other data types will cause error and that will get caught by the catch node, which then sends an validation message.

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
        "id": "5b5392bda3519ca5",
        "type": "inject",
        "z": "a2240ea952051e81",
        "name": "Send invalid input",
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
        "payload": "This is string",
        "payloadType": "str",
        "x": 240,
        "y": 160,
        "wires": [
            [
                "2c3f517165f7ee37"
            ]
        ]
    },
    {
        "id": "f63239dbca38b4bd",
        "type": "catch",
        "z": "a2240ea952051e81",
        "name": "",
        "scope": null,
        "uncaught": false,
        "x": 200,
        "y": 400,
        "wires": [
            [
                "222121f5280a68d8",
                "d0f062a664420050"
            ]
        ]
    },
    {
        "id": "222121f5280a68d8",
        "type": "debug",
        "z": "a2240ea952051e81",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 380,
        "y": 380,
        "wires": []
    },
    {
        "id": "c79bf5f53f284338",
        "type": "inject",
        "z": "a2240ea952051e81",
        "name": "Send valid input",
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
        "payload": "[1,2,3,4,5,6,7,8,9,10]",
        "payloadType": "json",
        "x": 240,
        "y": 240,
        "wires": [
            [
                "2c3f517165f7ee37"
            ]
        ]
    },
    {
        "id": "2c3f517165f7ee37",
        "type": "function",
        "z": "a2240ea952051e81",
        "name": "Sort data array",
        "func": "let data = msg.payload;\ndata = data.sort((a,b)=>a+b)\nmsg.payload = data\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 620,
        "y": 200,
        "wires": [
            []
        ]
    },
    {
        "id": "7c0aadd1766c2909",
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
        "x": 600,
        "y": 440,
        "wires": []
    },
    {
        "id": "d0f062a664420050",
        "type": "change",
        "z": "a2240ea952051e81",
        "name": "",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "please enter valid input ",
                "tot": "str"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 400,
        "y": 440,
        "wires": [
            [
                "7c0aadd1766c2909"
            ]
        ]
    },
    {
        "id": "51f9a4431f667dd4",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Send alert when invalid input recieved",
        "info": "",
        "x": 410,
        "y": 300,
        "wires": []
    },
    {
        "id": "a66c2f72744d7b33",
        "type": "comment",
        "z": "a2240ea952051e81",
        "name": "Function sorts data array recived by inject node",
        "info": "",
        "x": 440,
        "y": 80,
        "wires": []
    }
]

{% endrenderFlow %}

## Message object emmited by Catch node

The Catch node emits a message object when an error occurs, containing the following properties:

- payload : the payload which is passed to node which has thrown error.
- message : the error message
- source - object containing information about the node logging the error:
  - id - the source node id
  - type - the type of the source node
  - name - the name, if set, of the source node
  - count: how many times this message has been thrown by this node. 
