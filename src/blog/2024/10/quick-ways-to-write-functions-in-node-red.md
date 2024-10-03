---
title: "Exploring Quick Ways to Write Complex Logic in Function Nodes in Node-RED" 
subtitle: "Enhancing Your Node-RED Experience"
description: "Learn how to efficiently write complex logic in Function Nodes within Node-RED, simplifying your development process and improving your workflows."
date: 2024-10-07
authors: ["sumit-shinde"]
image: 
tags:
 - posts
 - node-red function node
 - node red function node
---

Node-RED is a powerful tool for building automation flows through its visual interface and low-code nodes. However, there are times when this low-code approach falls short, particularly when you need to implement complex JavaScript logic. That’s where the Function Node comes into play. Many Node-RED developers excel in their domains—such as IoT integration and PLCs—but may lack a strong foundation in JavaScript.

In this guide, I will share strategies for making writing in Function Nodes straightforward and efficient. You’ll learn how to leverage JavaScript's capabilities without needing extensive knowledge, empowering you to handle more complex logic with confidence and ease.

## What are function nodes and common challenges faced?

![Image showing the function node](./images/node_function.png){data-zoomable}
_Image showing the function node_

**A [Function Node](/node-red/core-nodes/function/) in Node-RED is a tool that lets you write custom JavaScript code to process messages in your automation flows.**

Developers face many challenges when using Function Nodes in Node-RED. One common hurdle is translating intricate business rules into JavaScript, which can be intimidating for those without a strong programming background. Additionally, managing multiple variables and debugging code can lead to confusion, particularly as the logic complexity increases. Developers may also struggle with ensuring that their Function Nodes integrate seamlessly with other nodes, which can complicate the overall workflow.

Before utilizing Function Nodes, exploring whether existing nodes can meet your needs is essential. While Function Nodes offer great flexibility, they can also complicate your flow, making it harder for team members to understand and maintain. By simplifying your automation whenever possible, you can enhance collaboration and efficiency in your development process.  For more details on the benefits and drawbacks of using Function Nodes, refer to this [Article](/blog/2023/03/why-should-you-use-node-red-function-nodes/).

In the following sections, we will explore practical strategies to streamline your experience with Function Nodes, enabling you to confidently write effective code without worrying about challenges.

## Quick Ways to Simplify Writing in Function Nodes

### Using Blockly-Based Function Nodes

For users seeking to simplify the process of writing complex logic, Blockly-based Function Nodes serve as a valuable tool within Node-RED. Designed to facilitate JavaScript code generation, Blockly allows you to construct logic visually using a drag-and-drop interface with pre-defined blocks. This makes it easier to translate intricate business rules into functional code.

As you build your logic, Blockly automatically generates the corresponding JavaScript. This tool is handy when you need to implement complex JavaScript logic without getting bogged down in syntax.

Before proceeding, make sure you have installed the following Node-RED package via the palette manager:

- **node-red-contrib-blockly**: This package adds the Blockly custom node in your Node-RED sidebar to use.

For the demonstration, let’s say I have an array of temperatures, and I want to calculate the Upper Control Limit (UCL) and Lower Control Limit (LCL) for them and send them to different outputs.

1. Drag the Blockly node onto the canvas and double-click it to open the editor.
2. Once open, you will see the block categories on the left side, a plain canvas on the right side, and an option to set output and timeout at the bottom. Set the output to 2.
3. In the left sidebar, you’ll find different categories starting with Node-RED, each containing related operation blocks. For example, in Node-RED, you’ll find blocks to get the value of `msg.payload`, set `msg.payload`, and more. In the Math category, there are various blocks for different mathematical operations.
4. we must first calculate the mean to calculate UCL and LCL. Switch to the Math category and drag the block labeled "`sum` of the list." Click on the sum in the block to see multiple options; select "average" from it. Then, in the Node-RED category, find the block labeled "get the `msg` property from `payload`" and connect it to the end of the list's average. Now, to create a variable to store the mean, switch to the Variables category, click "create variable," and name it `mean`. Once you make the variable, you’ll get different blocks related to its operations, such as setting and changing value. Drag the block labeled "set to mean" and place it at the start of the "average of list" block.
5. Next, we know the formulas to calculate UCL and LCL (where we pick z = 3):
   - UCL = mean + (stdDev * z)
   - LCL = mean - (stdDev * z)
   
6. To calculate the standard deviation, switch to the Math category and drag the "`sum` of the list" block again. Click on the sum and select the "standard deviation" option. Again, drag the block "get the `msg` property from `payload`" and connect it to the end of the standard deviation block. Create a variable called `stdDev,` drag the "set stdDev to" block, and place it at the start of the "`standard deviation` of the list" block.
7. Now, it’s time to calculate UCL and LCL. First, create a variable for UCL. Drag the "set UCL to" block, then switch to the Math category and drag the "1 + 1" block. Place the `mean` variable in one of the positions for "1." Drag the same block again and place it in the second position, then switch to Variables again and drag the `stdDev` variable to replace one of the "1s" in the current block, and set the second "1" to 3.
8. Next, switch to Node-RED and drag the "set `msg` property `payload` to" block. Then, drag the UCL from the variable and place it in place of "to." Drag the "send msg" block to output 1. Repeat the same steps for LCL, but make sure that you subtract from the mean (`stdDev * z`) and set LCL to the payload, returning it to output 2.
9. Finally, click Done to save it.
10. Drag the inject node, having set the payload to an array of simulated temperature data, and connect its output to the input of the blockly node,
11. Then, drag the two debug nodes onto the canvas. Connect one debug node to output 1 of the Blockly node (this will display the UCL) and the other debug node to output 2 (this will display the LCL).
12. Deploy the flow and click the inject button. You will see both UCL and LCL printed on the debug panel

The final blockly canvas should look like the below image:

![Image showing collection of blockly blocks that are calculating UCL and LCL](./images/blockly.png){data-zoomable}
_Image showing collection of blockly blocks that are calculating UCL and LCL_

Using Blockly-based Function Nodes simplifies the creation of complex logic in Node-RED. However, a basic understanding of JavaScript is still beneficial. As your logic becomes more complicated, you might encounter limitations within Blockly. While beginners may appreciate the visual interface initially, it can become confusing when trying to implement more advanced features. Additionally, the Blockly Function Node is a modified version of the original Function Node, which may result in differences in behavior and functionality.
### Using FlowFuse Assistant

![Image showing the quick function node genration with FlowFuse assistant](./images/flowfuse-assistant.gif){data-zoomable}
_Image showing the quick function node genration with FlowFuse assistant_

The FlowFuse Assistant is an AI-based plugin added to the FlowFuse platform in the Node-RED editor, making it super easy to generate complex functions with prompts.

For the example, let’s use the same logic we demonstrated with Blockly:

Before moving further, ensure you have updated Node-RED to the latest version in the platform.

1. Open the Node-RED instance editor in the platform.
2. Click on the magic button in the top right.
3. Once you click the button, a popup prompt will open asking for input. This will generate the function node.
4. Enter the prompt according to your logic. For this example, you can use: 
   > "Generate JavaScript code that takes an array of numbers, calculates the Upper Control Limit (UCL) and Lower Control Limit (LCL), then sends UCL to the first output of the function node and LCL to the second output."
5. Click generate. After 2-3 seconds, you will receive the Function node with the JavaScript code you requested directly in your canvas.
6. To test it, connect an inject node containing an array of simulated temperature data and then drag two debug nodes onto the canvas. Connect one debug node to output 1 of the function node (this will display the UCL) and the other debug node to output 2 (this will display the LCL).
7. Deploy the flow and click the inject button; both UCL and LCL will be printed on the debug panel.

Using the FlowFuse Assistant is significantly easier than Blockly, as it streamlines the process and saves you valuable time. You can articulate your goal in plain English, and the assistant generates your Function Node seamlessly. This allows you to focus more on your project objectives rather than getting bogged down in coding or blocks. Additionally, it provides you with the original Function Node, maintaining standard functionality.
*Start using FlowFuse today by creating your free trial account [here](https://app.flowfuse.com/account/create).*

*If you are an educator or a student, we offer FlowFuse for free. Visit [FlowFuse for education page](/education/) to learn more.*

## Conclusion 

In summary, both Blockly and the FlowFuse Assistant simplify writing complex logic in Node-RED, but FlowFuse Assistant stands out for its ease of use. While Blockly offers a visual way to build logic, FlowFuse allows you to generate code simply by articulating your goals in plain English, making it more accessible for users with varying skill levels. This focus on natural language reduces the time spent on coding and helps you concentrate on your project objectives. Although Blockly can be helpful, it may require a basic understanding of JavaScript for more complex tasks, which can be a hurdle. In contrast, FlowFuse Assistant streamlines the process further, allowing you to implement your ideas effectively without getting bogged down in technical details.
