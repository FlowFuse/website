---
eleventyNavigation:
  key: Working with Messages
  order: 2
  parent: Getting Started
meta:
  title: Understanding Node-RED Messages
  description: A practical guide to working with Node-RED messages, ensuring error-free flows and optimized data handling.
  keywords: msg.payload node red, node red message structure, node-red messages, node red msg.payload, msg.payload, node red msg.payload array
---

# {{ meta.title }}

Node-RED relies on passing messages between nodes to build dynamic IoT, automation, and data-processing workflows. Each message carries data that nodes modify, process, or analyze, so understanding how these messages are structured and handled is crucial. Mismanaging messages can lead to subtle bugs, such as overwriting data, infinite loops, or crashes. To prevent errors and build reliable flows, it’s essential to know how to work with messages efficiently.

<!--more-->

In this guide, we’ll explore the inner workings of Node-RED messages, common mistakes, and best practices for ensuring smooth data flow without errors.

## What Are Node-RED Messages?

In Node-RED, messages are packets of data that travel between nodes in your flow. Node-RED is event-driven, meaning an event emitter triggers events, and a listener reacts to them. In this context, nodes in Node-RED act as both event emitters and listeners, with messages serving as the medium through which these events are communicated. These messages represent the information that nodes read, modify, and act upon. Each node processes these messages and passes them along to the next node in the sequence.

![Node-RED message passing animation](./images/node-red-message-passing.gif){data-zoomable}
_Node-RED message passing animation_

Messages are crucial because they carry the data that powers your workflows—whether it’s sensor readings, user inputs, or responses from an API. Essentially, Node-RED messages are JavaScript objects, which are simple yet powerful structures for managing and transferring data throughout your flows.

### Understanding JavaScript Objects

A [JavaScript object](https://www.youtube.com/watch?v=BRSg22VacUA) is a data structure used to store multiple values in a single variable. It consists of key-value pairs, where each key (or property) is associated with a specific value. This organization allows you to group and access related data easily.

 For example: 

```javascript
{
  name: "Bob",
  age: 24,
  married: true
}
```

In this example, `name`, `age`, and `married` are properties of the object. Similarly, Node-RED messages use this structure to organize and transport data within your flows.

## Anatomy of Node-RED Messages

In Node-RED, messages are by default referred to as `msg`, and nodes are designed to work with this naming convention.

Node-RED messages consist of several key properties essential for data handling and communication between nodes:

- **`msg._msgid`**: A unique identifier for the message, automatically assigned by Node-RED. It helps in tracking and debugging messages within the flow.
- **`msg.payload`**: This is the primary data of the message. It contains the main information that nodes process and act upon, such as sensor readings or user input. 
- **`msg.topic`**: An optional property used to categorize or identify the message. It can be useful for routing or filtering messages based on their context.

These are the most common properties you'll encounter in Node-RED, Also additional properties can be added as needed.

The `_msgid` property is always present, even if you send an empty object from one node to another. This property is automatically appended by Node-RED to track messages within the flow. However, it's important to note that the `payload` and `topic` properties are not always present in every message. Their inclusion depends on whether the node appends them. Most nodes in Node-RED, including contributed nodes, use the `payload` property as a standard for communication.

## Data Types in Node-RED Messages

When working with Node-RED messages, it’s essential to understand the data types you'll encounter. Since messages are always JavaScript objects, the message itself must be an object, or Node-RED will throw an error.

It is possible, however, to send `null` as a message. This is often used when you don't want to send any data further along the flow, as `null` effectively stops the message from propagating to subsequent nodes.

Talking about message properties, their values can be any type of javascript supported data such as [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean), [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), [buffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and other complex datatypes.

![Inject node sending different data types](./images/node-red-data-types.gif){data-zoomable}
_Image showing the some data types that are supported by Node-RED_

## How to Clone Messages or Message properties

Cloning in Node-RED involves creating a copy of a message or its properties so that you can work with the copy independently of the original. This is useful when you need to modify data without affecting the original message, or when you need to send a modified version of the message to different parts of your flow.

### Using the Change Node 

The **Change** node in Node-RED provides a user-friendly way to modify and clone message properties. However, it's important to note that you cannot clone the entire `msg` object at once; you need to copy its properties one by one. Additionally, the Change node can only clone properties to `msg` another property, or the flow/global context property.

Here's how you can use the Change node to handle message properties:

1. Double-click on the **Change** node to open its configuration dialogue.
2. You will see an interface with an existing item added by default.
3. On the left side of the field, you will see options like **"Set"**, **"Change"**, **"Delete"**, and **"Move"**. You can use these options to perform the corresponding operations on the message.
4. To clone the property `msg.payload` to `flow.data`, select the **"Set"** action. In the first **"Property"** field, enter `payload`, and in the **"to the value"** field, select **flow** and enter `data`. For cloning `msg` properties to new `msg` properties, select **msg** in the second field and specify the new property name.

For more information on the Change node and to explore other actions such as **Delete**, **Move**, and **Change**, refer to the comprehensive documentation of the [Change Node](https://nodered.org/docs/user-guide/node-red-dashboard/).

### Using Function node

In the function node, you can clone messages or specific properties using JavaScript. Here's how you can do it:

```js
// Clone the entire message
var newMsg = RED.util.cloneMessage(msg);
// Modify the clone if needed and changing the clone will not affect orignal one
newMsg.payload = "Modified data";
// Return the original 
return msg
```

*Important Note: Direct assignment like let newMsg = msg; does not create a true clone. Instead, it creates a new reference to the same object. This means that changes to newMsg will also affect msg, as both refer to the same data.*


```js
// Clone the entire message
var newMsg = msg;
// Modification if needed of newMsg will affect orignal one
newMsg.payload = "Modified data";
// Return the original 
return msg
```

If you only need to clone specific properties of a message, you can do this by manually copying the properties you need:

```js
// Clone specific properties of the message
var newMsg = {};
newMsg.payload = msg.payload; // Copy payload
newMsg.topic = msg.topic;     // Copy topic
// Return the new message with cloned properties
return newMsg;
```

### Adding New Properties to Messages

Node-RED messages, as mentioned earlier, are JavaScript objects, making them highly flexible for customization. You can add as many properties as needed to a message, allowing you to carry additional data through your flow. This can be particularly useful for enhancing the information available to downstream nodes, like including metadata, tags, or extra configuration details.

To add new properties to a message, you can use either the **Change** node or the **Function** node.

The **Change** node allows you to easily append new properties to the `msg` object without writing any code. Here's how to do it:

1. Drag a **Change** node into your flow and double-click it to open the configuration.
2. Select the **"Set"** action from the left dropdown menu.
3. In the **"Property"** field, enter the new property name (e.g., `msg.customData`).
4. In the **"To"** field, enter the value you want to assign to this property. This can be a string, number, boolean, or even an expression.

If you prefer more control, you can add new properties directly through the **Function** node using JavaScript.

```js
// Add a new custom property to the message
msg.customData = {
    description: "This is description",
    timestamp: new Date().toISOString()
};
// Return the updated message
return msg;
```

### Handling JSON Messages

In Node-RED, working with [JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON) is common, especially when dealing with APIs, and IoT data. JSON (JavaScript Object Notation) is a lightweight format for data exchange, and Node-RED simplifies the process of sending and receiving JSON objects.

There are two forms of JSON that you may encounter when working with Node-RED:

1. **JSON Object**: This is a simple, structured JavaScript object that can be easily manipulated in Node-RED. You can access its properties, modify its values, and pass it through various nodes in your flow.

2. **JSON String**: A JSON string is a serialized version of a JSON object, commonly used when transmitting data between systems. Unlike a normal object, you cannot manipulate a JSON string directly in the same way you would with a JavaScript object.

#### Converting JSON String to JSON Object

To handle a JSON string as a normal JavaScript object, you first need to convert it into a JSON object. Node-RED provides a `JSON` node that simplifies this process. The `JSON` node parses the string and converts it into an object, allowing you to handle it like any other structured data within your flow.

Here are the steps to achieve this:

1. Drag the JSON node onto the Node-RED canvas.
2. Double-click on the JSON node to configure it.
3. Set the action to "Always convert to a JSON object" and click "Done."
4. Connect the input of the JSON node to the output of the node that is sending the JSON string.
5. Connect the output of the JSON node to the input of the next node in your flow that needs the parsed JSON object.

By following these steps, the JSON node will convert the incoming JSON string into a usable JavaScript object within your Node-RED flow, for more information refer to [JSON node documentation](/node-red/core-nodes/json/).

## Common Mistakes to Avoid with Node-RED Messages

When working with messages in Node-RED, avoiding these common mistakes can help ensure your flows run smoothly and as expected:

- **Adding Properties to Non-Object Property**: Attempting to add properties to a non-object property (like a string or number) can lead to errors or unexpected behavior. Always ensure you're working with objects when adding properties.

  **Incorrect Example:**
  ```javascript
  msg.payload = 'stringValue';
  msg.payload.newProperty = 'value';  // Error: 'stringValue' is not an object
  return msg;
  ```

  **Correct Example:**
  ```javascript
  msg.payload = {};  // Initialize as an object
  msg.payload.newProperty = 'value';  // Safe to add properties now
  return msg;
  ```

This mistake often occurs in the change node where an inject node sends `msg.payload` as a `string` or `number` (e.g., 'hello world'), and the change node attempts to add a property to `msg.payload` as if it were an object.

![Showing the common mistake done in change: adding property to non-object](./images/mistake1.gif){data-zoomable}
  _Incorrect: Adding a property to a non-object type (e.g., string)_

  **Correct Approach:**
  ![how to prevent it](./images/mistake-1-solution.gif){data-zoomable}
  _Correct: Initialize the property as an object before adding properties_

- **Overwriting the Message Object (`msg`)**: Some users mistakenly overwrite the entire `msg` object rather than modifying specific properties. This can result in losing important context or properties.

  Example of an incorrect overwrite:
  ```javascript
  msg = { newProperty: 'value' };  // Overwrites the whole msg object
  return msg;
  ```

  Instead, modify specific properties:
  ```javascript
  msg.newProperty = 'value';
  return msg;
  ```

- **Returning an Incorrect Data Type**: Node-RED flows expect messages to be passed along as objects. Returning an incorrect data type, such as a string or number break the flow and will throw an error.

- **Forgetting to Return the Message**: In function nodes, if you modify a message but forget to return it, the flow will stop at that node.

By mastering the intricacies of Node-RED message objects and avoiding common pitfalls, you can build more robust and efficient workflows. Understanding how to work with JSON data, cloning messages, and correctly handling properties ensures that your data flows smoothly between nodes.

As you continue exploring and building with Node-RED, keep these best practices in mind to maintain error-free and high-performance flows.
