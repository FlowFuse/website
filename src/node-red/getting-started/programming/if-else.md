---
eleventyNavigation:
  key: If-Else
  parent: Programming
meta:
  title: How to Use If-Else Logic in Node-RED
  description:  Learn how to implement If-Else logic in Node-RED with our step-by-step guide. Use Function and Switch nodes for dynamic, conditional flows.
  keywords: node red if else, nodered switch, node-red conditional flow, node red function if else, node red if then else example, node red switch example, node red switch node example, node red function multiple outputs example, node red function example,node red function if, node red if, node red if node, node red if then
image: /node-red/getting-started/images/if-else-with-node-red.png
---

# {{meta.title}}

Human decision-making is often guided by a series of "if this, then that" choices—whether it's deciding what to wear based on the weather or determining the quickest route to work depending on traffic. This kind of logic is equally crucial in systems, especially those built in Node-RED. Just as we make decisions based on various factors, systems must evaluate conditions and choose the appropriate course of action.

When developing automated solutions in Node-RED, the ability to replicate this human-like decision-making process is essential. By implementing If-Else logic, your system can intelligently navigate different scenarios, adapting its behavior based on the inputs it receives. This guide will show you how to effectively incorporate If-Else logic into your Node-RED flows, ensuring your system can make smart, context-aware decisions—just like you would.

## Understanding If-Else Logic

The concept of If-Else logic emerged from the need for computers to make decisions. As programming languages developed, guiding a computer through different actions based on varying conditions became essential. This led to the creation of conditional statements, which allow programs to choose different paths depending on specific criteria.

### What is If-Else Logic?

If-Else logic is a way for programs to make decisions. It works like this:

- **If** a particular condition is true (e.g., "Is the temperature above 30°C?"), then execute a set of actions (e.g., "Turn on the air conditioner").
- **Else** (if the condition is not true), execute a different set of actions (e.g., "Turn off the air conditioner").

This approach allows systems to respond appropriately to different situations.

## Implementing Conditional Flows in Node-RED: A Practical Walkthrough

In Node-RED, implementing If-Else logic allows you to create dynamic and responsive flows that react to different inputs and conditions. Whether you're automating a smart home, managing IoT devices, or developing complex workflows, mastering conditional logic is essential for creating intelligent systems.

To implement If-Else logic in Node-RED, you can use the Switch node, which aligns perfectly with Node-RED's low-code approach. However, another way to achieve this is using the Function node, which offers more flexibility and control when writing custom JavaScript logic.

### Using Switch Node

The [Switch](/node-red/core-nodes/switch/) node in Node-RED is used for routing messages based on specific conditions, offering a straightforward, low-code approach to implementing conditional logic in your flows. The Switch node allows you to set up rules using a visual interface, making it ideal for users who prefer a more intuitive method for handling conditions. However, it’s important to note that the Switch node represents a different, independent concept known as the "[switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)." While it serves a similar purpose to If-Else logic by building conditional flows, it operates under its own programming paradigm.

To demonstrate the Switch node, we'll set up a flow to make decisions based on the temperature value. We will route messages through different outputs based on temperature thresholds.

1. Drag the inject node onto the canvas and set the `msg.payload` to `$random() * 100` as JSONata expression; this inject node will simulate a temperature sensor by generating a random number.
2. Drag a Switch node onto the canvas. Double-click on it and set Property to `msg.payload`.
3. To add rules, click the + Add button at the bottom left of the configuration panel. You will see a prompt to select the condition and a prompt to enter the value to compare with. Add the following four rules and set it for "checking all rules":

    - Rule 1: `msg.payload > 30` 
    - Rule 2: `msg.payload <= 30` 
    - Rule 3: `msg.payload <= 20` 
    - Rule 4: `msg.payload <= 10`

4. Now drag another Switch node and connect its input to the output of Switch nodes 2 and 3. We are adding a second switch node because we need to route messages based on ranges. A single Switch node doesn’t allow multiple checks in one rule, so we need to use another Switch node to route the temperature based on ranges. Add the following rules and set it for "stopping after the first match":

    - Rule 1: `msg.payload > 20` 
    - Rule 2: `msg.payload > 10` 

5. Now drag the Debug nodes and connect them to the Switch nodes' outputs according to our example. For messages greater than 30, connect the Debug node to the first output of the first Switch node. For the range between 30 to 20, connect the Debug node to the first output of the second Switch node. For the range between 20 to 10, connect the Debug node to the second output of the second Switch node. Finally, for messages less than 10, connect the Debug node to the fourth output of the first Switch node.
6. Deploy the flow by clicking the "Deploy" button in the top-right corner of the Node-RED editor.
7. Once deployed, click the button on the Inject node to trigger it. The Debug nodes will show the routed messages based on the temperature value.

Notice how messages are routed through different outputs based on the temperature value. Now, you may ask how to update the message payload based on a condition. For that, you will need to use the Change node or the Function node.

```mermaid
graph TD
    A[Inject Node: Random Temperature] --> B[Switch Node 1]
    B -->|msg.payload > 30| C[Output: Temperature > 30]
    B -->|msg.payload <= 30| D[Switch Node 2]
    B -->|msg.payload <= 20| D[Switch Node 2]
    B -->|msg.payload <= 10| E[Output: Temperature <= 10]

    D -->|msg.payload > 20| F[Output: 30 > Temperature > 20]
    D -->|msg.payload <= 20| G[Output: 20 > Temperature > 10]
```
_Node-RED flow using the Switch node to route messages based on temperature thresholds._

{% renderFlow %}
[{"id":"b90722a28f81c014","type":"group","z":"9cf82b68bb89e8ce","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["dd0d3432c348e1f2","21bd53568877f3b5","5277e184faad375a","7fbf37916236a960","aac1f46169e431ab","3eb24a6129d8fa8e","36e51d42d34c9587"],"x":194,"y":1219,"w":892,"h":322},{"id":"dd0d3432c348e1f2","type":"debug","z":"9cf82b68bb89e8ce","g":"b90722a28f81c014","name":"high temperature","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":810,"y":1260,"wires":[]},{"id":"21bd53568877f3b5","type":"inject","z":"9cf82b68bb89e8ce","g":"b90722a28f81c014","name":"Temperature","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random()*100","payloadType":"jsonata","x":310,"y":1380,"wires":[["5277e184faad375a"]]},{"id":"5277e184faad375a","type":"switch","z":"9cf82b68bb89e8ce","g":"b90722a28f81c014","name":"","property":"payload","propertyType":"msg","rules":[{"t":"gt","v":"30","vt":"num"},{"t":"lte","v":"30","vt":"num"},{"t":"lte","v":"20","vt":"num"},{"t":"lte","v":"10","vt":"num"}],"checkall":"true","repair":false,"outputs":4,"x":530,"y":1380,"wires":[["dd0d3432c348e1f2"],["7fbf37916236a960"],["7fbf37916236a960"],["3eb24a6129d8fa8e"]]},{"id":"7fbf37916236a960","type":"switch","z":"9cf82b68bb89e8ce","g":"b90722a28f81c014","name":"","property":"payload","propertyType":"msg","rules":[{"t":"gt","v":"20","vt":"num"},{"t":"gt","v":"10","vt":"num"}],"checkall":"false","repair":false,"outputs":2,"x":670,"y":1380,"wires":[["aac1f46169e431ab"],["36e51d42d34c9587"]]},{"id":"aac1f46169e431ab","type":"debug","z":"9cf82b68bb89e8ce","g":"b90722a28f81c014","name":"for medium temperature","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":930,"y":1340,"wires":[]},{"id":"3eb24a6129d8fa8e","type":"debug","z":"9cf82b68bb89e8ce","g":"b90722a28f81c014","name":"for very low temperature","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":810,"y":1500,"wires":[]},{"id":"36e51d42d34c9587","type":"debug","z":"9cf82b68bb89e8ce","g":"b90722a28f81c014","name":"for low temperature","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":910,"y":1420,"wires":[]}]
{% endrenderFlow %}

### Using Function Node

The [Function](/node-red/core-nodes/function/) node allows for more complex logic by writing JavaScript. It's suitable when you need more control, or multiple values must be checked together.

For demonstration purposes, let's use the temperature example where we determine whether to turn the air conditioner on or off based on the temperature:

1. Drag the inject node onto the canvas and set the `msg.payload` to `$random() * 100` as JSONata expression; this inject node will simulate a temperature sensor by generating a random number.
2. Drag the function node onto the canvas, double-click on it, and paste the following code into it:

    ```javascript
    let Temperature = msg.payload;
    if (Temperature > 30) {
        msg.payload = "Turn on the air conditioner";
    } else {
        msg.payload = "No action required";
    }
    return msg;
    ```

Before moving further, let's pause and understand what’s happening in the code and how `msg.payload` is being used.

In Node-RED, `msg.payload` is used to carry data through the flow. Initially, it holds the temperature value injected by the Inject node. The Function node then processes this value using If-Else logic. If the temperature exceeds 30°C, `msg.payload` is set to `"Turn on the air conditioner"`, indicating that the air conditioner should be turned on. If the temperature is 30°C or lower, `msg.payload` is set to `"No action required"`, signaling that the air conditioner should remain off. This updated `msg.payload` is then passed on to the next node, ensuring the system responds appropriately based on the temperature input.

Many people need clarification on the messaging system in Node-RED. For a deeper understanding of how messaging works in Node-RED, I recommend going through this document: [Node-RED Messaging Guide](/node-red/getting-started/node-red-messages/).

3. Next, drag the Debug node onto the canvas and connect it to the output of the Function node. This will allow you to see the results of your conditional logic in the Node-RED debug window.
4. Deploy the flow by clicking the "Deploy" button in the top-right corner of the Node-RED editor.
5. Once deployed, click the button on the Inject node to trigger it. You should see the output of the Function node in the debug window, which will show true or false depending on the temperature value.

```mermaid
flowchart TD
    A[Start] --> B{Is Temperature > 30?}
    B -- Yes --> C[Turn on the air conditioner]
    B -- No --> D[No action required]
    C --> E[End]
    D --> E[End]
```

{% renderFlow %}
[{"id":"51ffa77e55eb7f63","type":"group","z":"9cf82b68bb89e8ce","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["19fa09374c1be7c4","ff41ef215d860c1a","773175cbe8014372"],"x":154,"y":2059,"w":672,"h":82},{"id":"19fa09374c1be7c4","type":"inject","z":"9cf82b68bb89e8ce","g":"51ffa77e55eb7f63","name":"Temperature","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"$random()*100","payloadType":"jsonata","x":270,"y":2100,"wires":[["ff41ef215d860c1a"]]},{"id":"ff41ef215d860c1a","type":"function","z":"9cf82b68bb89e8ce","g":"51ffa77e55eb7f63","name":"Temperature Threshold Check","func":"let Temperature = msg.payload;\n    if (Temperature > 30) {\n        msg.payload = \"Turn on the air conditioner\";\n    } else {\n        msg.payload = \"No action required\";\n    }\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":510,"y":2100,"wires":[["773175cbe8014372"]]},{"id":"773175cbe8014372","type":"debug","z":"9cf82b68bb89e8ce","g":"51ffa77e55eb7f63","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":730,"y":2100,"wires":[]}]
{% endrenderFlow %}

_Node-RED flow using the Function node to implement simple If-Else logic for temperature control._

### Handling Multiple Flows with Node-RED's Function Node

We’ve seen how to handle a simple one-way flow using If-Else logic with a function node, but what if you need to direct messages along different paths based on various conditions or evaluate multiple values while using a function node? In such cases, the Function node in Node-RED provides the flexibility to write complete JavaScript code, enabling more complex decision-making. Additionally, the Function node supports setting it for multiple output ports, which allows you to route messages to different destinations based on various conditions.

Let’s update our example to handle multiple values. In this scenario, we will incorporate both temperature and humidity into our decision-making process. We will use multiple output ports in the Function node to route messages based on different conditions.

1. Drag another inject node onto the canvas, set `msg.payload.temperature` to `$random() * 100` as the JSONata expression and `msg.payload.humidity` to `$random() * 100`.
2. Drag another function node onto the canvas, double-click on it, switch to the "Setup" tab, and increase the number of output ports to match the number of conditions you will handle. For our example, increase the number of outputs to 4 and click Done.

    ```javascript
    let Temperature = msg.payload.temperature;
    let Humidity = msg.payload.humidity;

    // Initialize output array
    let outputs = [null, null, null, null];

    if (Temperature > 30 && Humidity < 40) {
        // High temperature and low humidity
        outputs[0] = { payload: "High temperature and low humidity: Turn on the air conditioner and use a humidifier" };
    } else if (Temperature > 30 && Humidity >= 40) {
        // High temperature and high humidity
        outputs[1] = { payload: "High temperature and high humidity: Turn on the air conditioner" };
    } else if (Temperature < 15 && Humidity < 40) {
        // Low temperature and low humidity
        outputs[2] = { payload: "Low temperature and low humidity: Turn on the heater and use a humidifier" };
    } else if (Temperature < 15 && Humidity >= 40) {
        // Low temperature and high humidity
        outputs[3] = { payload: "Low temperature and high humidity: Turn on the heater" };
    }

    return outputs;
    ```

Now, you will see that the Function node has four outputs, each corresponding to the sequence of conditions we have written. For example, the message for the first condition will appear at the first output of the Function node, the message for the second condition will appear at the second output, and so on.

Regarding the outputs being sent, the Function node initializes an array with `null` values to ensure all outputs are accounted for. When a specific condition is met, the corresponding index in this array is updated with the desired message. For example, if the temperature is high and the humidity is low, the message will be set at `outputs[0]`, which is the first output. If no condition is met, the output remains `null`, meaning nothing is sent for that output, ensuring only the relevant outputs are populated with messages.

3. Next, drag four Debug nodes onto the canvas. Connect each Debug node to one of the outputs from the Function node. This setup will allow you to see the messages routed through each output in the Debug panel.
4. Deploy the flow by clicking the "Deploy" button in the top-right corner of the Node-RED editor.
5. Once deployed, click the button on the Inject node to trigger it.

```mermaid
flowchart TD
    A[Start] --> B{Is Temperature > 30?}
    B -- Yes --> C{Is Humidity < 40?}
    C -- Yes --> D[Turn on the air conditioner and use a humidifier]
    C -- No --> E[Turn on the air conditioner]
    B -- No --> F{Is Temperature < 15?}
    F -- Yes --> G{Is Humidity < 40?}
    G -- Yes --> H[Turn on the heater and use a humidifier]
    G -- No --> I[Turn on the heater]
    F -- No --> J[No specific action required]
    D --> K[End]
    E --> K
    H --> K
    I --> K
    J --> K

```
_Node-RED flow using the Function node with multiple outputs for handling various conditions like temperature and humidity._

{% renderFlow %}
[{"id":"301a31b0972b0b20","type":"group","z":"9cf82b68bb89e8ce","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["dbd085ed607e41de","31d2e8f0c871143d","b169bf385ca85f6c","aa7ab6452f4a7791","cc3e6e2c70643f6f","800508e428d74f5f"],"x":114,"y":719,"w":832,"h":202},{"id":"dbd085ed607e41de","type":"inject","z":"9cf82b68bb89e8ce","g":"301a31b0972b0b20","name":"Temperature && Humidity","props":[{"p":"payload.temperature","v":"$random() * 100","vt":"jsonata"},{"p":"payload.humidity","v":"$random() * 100","vt":"jsonata"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":270,"y":820,"wires":[["31d2e8f0c871143d"]]},{"id":"31d2e8f0c871143d","type":"function","z":"9cf82b68bb89e8ce","g":"301a31b0972b0b20","name":"Temp/Humidity Decision Engine","func":"let Temperature = msg.payload.temperature;\nlet Humidity = msg.payload.humidity;\n\n// Initialize output array\nlet outputs = [null, null, null, null];\n\nif (Temperature > 30 && Humidity < 40) {\n    // High temperature and low humidity\n    outputs[0] = { payload: \"High temperature and low humidity: Turn on the air conditioner and use a humidifier\" };\n} else if (Temperature > 30 && Humidity >= 40) {\n    // High temperature and high humidity\n    outputs[1] = { payload: \"High temperature and high humidity: Turn on the air conditioner\" };\n} else if (Temperature < 15 && Humidity < 40) {\n    // Low temperature and low humidity\n    outputs[2] = { payload: \"Low temperature and low humidity: Turn on the heater and use a humidifier\" };\n} else if (Temperature < 15 && Humidity >= 40) {\n    // Low temperature and high humidity\n    outputs[3] = { payload: \"Low temperature and high humidity: Turn on the heater\" };\n}\n\nreturn outputs;","outputs":4,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":570,"y":820,"wires":[["b169bf385ca85f6c"],["aa7ab6452f4a7791"],["cc3e6e2c70643f6f"],["800508e428d74f5f"]]},{"id":"b169bf385ca85f6c","type":"debug","z":"9cf82b68bb89e8ce","g":"301a31b0972b0b20","name":"Output 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":840,"y":760,"wires":[]},{"id":"aa7ab6452f4a7791","type":"debug","z":"9cf82b68bb89e8ce","g":"301a31b0972b0b20","name":"Output 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":840,"y":800,"wires":[]},{"id":"cc3e6e2c70643f6f","type":"debug","z":"9cf82b68bb89e8ce","g":"301a31b0972b0b20","name":"Output 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":840,"y":840,"wires":[]},{"id":"800508e428d74f5f","type":"debug","z":"9cf82b68bb89e8ce","g":"301a31b0972b0b20","name":"Output 4","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":840,"y":880,"wires":[]}]
{% endrenderFlow %}

## Choosing Between the Function Node and Switch Node

When deciding between the Function node and the Switch node in Node-RED, it is essential to consider the complexity of your logic and the nature of the message routing you require.

The Function node excels in scenarios where complex logic and detailed message processing are necessary. It allows for writing custom JavaScript code, which can handle sophisticated conditions and perform calculations. This node is particularly useful when you need to make intricate decisions based on multiple values or when you need to perform detailed updates to the `msg` object. For instance, if your flow requires combining data from different sources, applying complex rules, or modifying multiple properties of `msg.payload`, the Function node offers the flexibility and power to accomplish these tasks.

In contrast, the Switch node is designed for simpler, value-based routing. It is ideal for straightforward scenarios where you need to route messages based on a single value with multiple possible outputs. This node enables you to create rules based on specific values or conditions without the need for complex logic or extensive message modifications. If your routing logic involves basic comparisons and does not require advanced processing or calculations, the Switch node provides a more streamlined and intuitive approach.

In summary, choose the Function node for intricate decision-making and detailed message processing, while the Switch node is better suited for scenarios where simple value-based routing is sufficient.