---
eleventyNavigation:
  key: "Function "
  parent : Function
---

# Node-RED Function Node

## What Is a Function node in Node-RED?

In Node-RED, a function node allows you to write custom JavaScript code to process message objects in your flow. It's used for specific tasks that can't be accomplished with the standard built-in nodes alone. When you write custom JavaScript in a function node, this code gets executed every time a message passes through the node.

In Node-RED, a function should either return an object, which is a message object, or nothing at all. Returning other data types instead of an object will cause an error. By default, the function node returns the message object unchanged, passing the data as it is to further nodes.

Ideally, the function node should have the message object returned at the end of the code written within it. Placing the return statement in the middle of the code may result in incomplete execution of the remaining code.

If the function node needs to perform an asynchronous action before sending a message, it cannot use the return statement to send the message at the end of the function. Instead, in such cases, you must use `node.send()`, as shown below: 

```javascript
// Simulate an asynchronous operation with setTimeout
setTimeout(() => {
    // After 2 seconds, create a message object with some data
    const message = { payload: "Async operation complete" };
    // Send the message to subsequent nodes
    node.send(message);
}, 2000);
```

Additionally, if you need to pass a message object mid-script within a function node to subsequent nodes, you can utilize `node.send()` for this purpose while continuing the execution of the remaining code, as shown below:

```javascript
// Extract data from the incoming message
const inputData = msg.payload;

// Perform some processing
const processedData = inputData * 2;

// Send a message object with the processed data
node.send({ payload: `Processed data: ${processedData}` });

// Continue executing the rest of the code...

// Example of further processing...
if (processedData > 100) {
    node.warn("High processed data value detected!");
} else {
    node.log("Processed data value within normal range.");
}

// Return the modified message object
return msg;

```

If you don't want the function to pass anything to subsequent node, you can do this by returning `null` in the function node.

By default, a function node has a single output, but you can configure it to have multiple outputs in the **setup tab** with the **output** property. You can then send the message to each output using an array, placing them in order of which output they should go to.

```javascript
var msg1 = { payload: 1 };
var msg2 = { payload: [3,45,2,2,4] };
var msg3 = { payload: {"name":"bob"} };
var msg4 = { payload: "This is string" };
return [msg1, msg2, msg3, msg4];
```

## Function Node Different Tabs
In the function node, we have four different types of tabs, each with its unique use case:

### Setup

- Output: This property allows you to configure how many outputs the function node will have.
- Timeout: This property Allows you to define how long the function node can run before an error is raised. By default, if set to 0, no timeout is applied.
- Modules: This property Allows you to add or import additional modules into Function nodes, and they will be automatically installed when the flow is deployed. However, in the - settings, you'll need to set 'functionExternalModules' to 'true'.

### On Start

In this tab, you can provide code that will run whenever the node is started. This can be used to set up any state the Function node requires.

### On Message

This is the tab where you can provide the JavaScript code that will execute when it receives a message passed by another nodes.

### On Stop

This tab allows you to add code to clean up any ongoing tasks or close connections before the flow is redeployed.

## Logging events

When a function node needs to log something, it can utilize the following methods:

- `node.log()`: This is used for general logging purposes.
- `node.warn()`: This method is used to log warnings.
- `node.error()`: This is used to log errors.

Messages logged using `node.warn()` and `node.error()` will be sent to the **debug tab**.

To view messages logged using `node.log()`, you can check the command from where you started Node-RED. If you're running it under an app like PM2, it will have its own method for displaying logs. On a Raspberry Pi, the install script adds a `node-red-log` command that shows the log. If you're using FlowFuse Cloud, you can find the logged messages in the Instance's **Node-RED logs** tab.

## Node-RED Objects Accessible in Function Node

The following Node-RED objects can be accessed in a function node:

- node: This object encapsulates properties and methods used for customizing and interacting with nodes in a flow.
- context: The node’s local context.
- flow: The flow scope context.
- global: The global scope context.
- RED: This object provides module access to the Node-RED runtime API.
- env: This object contains the get method to access environment variables.

## Use-cases and examples

1. **Custom logic**: Sometimes your flow might require very specific logic that can’t be achieved using existing nodes. Function node allow you to implement this custom logic.

In the example flow below, we have a function that converts temperature data, simulated using an inject node with a random number, from Celsius to Fahrenheit. Additionally, it performs other formatting.

{% renderFlow %}

[{"id":"b138b603c8f94cf8","type":"inject","z":"a2240ea952051e81","name":"Temperature sensor","props":[{"p":"payload"}],"repeat":"5","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"$random() * 100","payloadType":"jsonata","x":240,"y":240,"wires":[["ab41b0f6e6fa58aa"]]},{"id":"ab41b0f6e6fa58aa","type":"function","z":"a2240ea952051e81","name":"Convert Celsius to Fahrenheit","func":"// Extract temperature reading from the incoming message\nconst temperatureCelsius = msg.payload;\n\n// Convert Celsius to Fahrenheit\nconst temperatureFahrenheit = (temperatureCelsius * 9 / 5) + 32;\n\n// Round the temperature Fahrenheit to two decimal places and convert it back to a number\nconst roundedTemperatureFahrenheit = parseFloat(temperatureFahrenheit.toFixed(2));\n\n// Update the message payload with the temperature in Fahrenheit\nmsg.payload = roundedTemperatureFahrenheit;\n\n// Return the modified message object\nreturn msg;\n\n\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":510,"y":240,"wires":[["b7271bd3259bc56d"]]},{"id":"b7271bd3259bc56d","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":760,"y":240,"wires":[]},{"id":"8f553a15e4f5a8dd","type":"comment","z":"a2240ea952051e81","name":"Convert received temperature from Celsius to Fahrenheit and format it","info":"","x":510,"y":180,"wires":[]}]

{% endrenderFlow %}

2. **Conditional Routing:** When dealing with a broad range of conditions that require intricate logic for each case, the switch node may fall short. In such scenarios, using a function node with multiple outputs can be benificial.

In the example flow below, we have an inject node generating a random number and sending it to the function node. We've set up the function node to evaluate the received numeric value and perform conditional routing based on predefined ranges, sending the message to different outputs accordingly.

{% renderFlow %}

[{"id":"6a1f8dd5e5037d24","type":"inject","z":"a2240ea952051e81","name":"send random number","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random() * 100","payloadType":"jsonata","x":180,"y":180,"wires":[["c4ef3a83b54cd6eb"]]},{"id":"c4ef3a83b54cd6eb","type":"function","z":"a2240ea952051e81","name":"Check against dynamic ranges","func":"// Extract numeric value from the incoming message\nconst numericValue = msg.payload;\n\n// Define ranges for conditional routing\nconst range1 = { min: 0, max: 10 };\nconst range2 = { min: 11, max: 20 };\nconst range3 = { min: 21, max: 30 };\n\n// Check numeric value against ranges\nif (numericValue >= range1.min && numericValue <= range1.max) {\n    // Value falls within range 1\n    return [msg, null, null];\n} else if (numericValue >= range2.min && numericValue <= range2.max) {\n    // Value falls within range 2\n    return [null, msg, null];\n} else if (numericValue >= range3.min && numericValue <= range3.max) {\n    // Value falls within range 3\n    return [null, null, msg];\n} else {\n    // Value falls outside all ranges\n    node.warn(\"Value falls outside all defined ranges.\");\n    return null;\n}\n","outputs":3,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":470,"y":180,"wires":[["a3af86e82cd2267a"],["35233d68a07ad23a"],["5a99ebc4ee439757"]]},{"id":"a3af86e82cd2267a","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":740,"y":140,"wires":[]},{"id":"35233d68a07ad23a","type":"debug","z":"a2240ea952051e81","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":740,"y":180,"wires":[]},{"id":"5a99ebc4ee439757","type":"debug","z":"a2240ea952051e81","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":740,"y":220,"wires":[]},{"id":"b1e8ca2faa3faafc","type":"comment","z":"a2240ea952051e81","name":"The function checks the numeric value against dynamic ranges and sends them to outputs accordingly.","info":"","x":450,"y":80,"wires":[]}]

{% endrenderFlow %}
