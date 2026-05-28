---
title: "Node-RED - Function Node"
---
# Function

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



::render-flow
---
height: 200
flow: "W3siaWQiOiJiMTM4YjYwM2M4Zjk0Y2Y4IiwidHlwZSI6ImluamVjdCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IlRlbXBlcmF0dXJlIHNlbnNvciIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiNSIsImNyb250YWIiOiIiLCJvbmNlIjp0cnVlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMTAwIiwicGF5bG9hZFR5cGUiOiJqc29uYXRhIiwieCI6MjQwLCJ5IjoyNDAsIndpcmVzIjpbWyJhYjQxYjBmNmU2ZmE1OGFhIl1dfSx7ImlkIjoiYWI0MWIwZjZlNmZhNThhYSIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IkNvbnZlcnQgQ2Vsc2l1cyB0byBGYWhyZW5oZWl0IiwiZnVuYyI6Ii8vIEV4dHJhY3QgdGVtcGVyYXR1cmUgcmVhZGluZyBmcm9tIHRoZSBpbmNvbWluZyBtZXNzYWdlXG5jb25zdCB0ZW1wZXJhdHVyZUNlbHNpdXMgPSBtc2cucGF5bG9hZDtcblxuLy8gQ29udmVydCBDZWxzaXVzIHRvIEZhaHJlbmhlaXRcbmNvbnN0IHRlbXBlcmF0dXJlRmFocmVuaGVpdCA9ICh0ZW1wZXJhdHVyZUNlbHNpdXMgKiA5IC8gNSkgKyAzMjtcblxuLy8gUm91bmQgdGhlIHRlbXBlcmF0dXJlIEZhaHJlbmhlaXQgdG8gdHdvIGRlY2ltYWwgcGxhY2VzIGFuZCBjb252ZXJ0IGl0IGJhY2sgdG8gYSBudW1iZXJcbmNvbnN0IHJvdW5kZWRUZW1wZXJhdHVyZUZhaHJlbmhlaXQgPSBwYXJzZUZsb2F0KHRlbXBlcmF0dXJlRmFocmVuaGVpdC50b0ZpeGVkKDIpKTtcblxuLy8gVXBkYXRlIHRoZSBtZXNzYWdlIHBheWxvYWQgd2l0aCB0aGUgdGVtcGVyYXR1cmUgaW4gRmFocmVuaGVpdFxubXNnLnBheWxvYWQgPSByb3VuZGVkVGVtcGVyYXR1cmVGYWhyZW5oZWl0O1xuXG4vLyBSZXR1cm4gdGhlIG1vZGlmaWVkIG1lc3NhZ2Ugb2JqZWN0XG5yZXR1cm4gbXNnO1xuXG5cbiIsIm91dHB1dHMiOjEsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6NTEwLCJ5IjoyNDAsIndpcmVzIjpbWyJiNzI3MWJkMzI1OWJjNTZkIl1dfSx7ImlkIjoiYjcyNzFiZDMyNTliYzU2ZCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzYwLCJ5IjoyNDAsIndpcmVzIjpbXX0seyJpZCI6IjhmNTUzYTE1ZTRmNWE4ZGQiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IkNvbnZlcnQgcmVjZWl2ZWQgdGVtcGVyYXR1cmUgZnJvbSBDZWxzaXVzIHRvIEZhaHJlbmhlaXQgYW5kIGZvcm1hdCBpdCIsImluZm8iOiIiLCJ4Ijo1MTAsInkiOjE4MCwid2lyZXMiOltdfV0="
---
::



2. **Conditional Routing:** When dealing with a broad range of conditions that require intricate logic for each case, the switch node may fall short. In such scenarios, using a function node with multiple outputs can be benificial.

In the example flow below, we have an inject node generating a random number and sending it to the function node. We've set up the function node to evaluate the received numeric value and perform conditional routing based on predefined ranges, sending the message to different outputs accordingly.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2YTFmOGRkNWU1MDM3ZDI0IiwidHlwZSI6ImluamVjdCIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6InNlbmQgcmFuZG9tIG51bWJlciIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMTAwIiwicGF5bG9hZFR5cGUiOiJqc29uYXRhIiwieCI6MTgwLCJ5IjoxODAsIndpcmVzIjpbWyJjNGVmM2E4M2I1NGNkNmViIl1dfSx7ImlkIjoiYzRlZjNhODNiNTRjZDZlYiIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6IkNoZWNrIGFnYWluc3QgZHluYW1pYyByYW5nZXMiLCJmdW5jIjoiLy8gRXh0cmFjdCBudW1lcmljIHZhbHVlIGZyb20gdGhlIGluY29taW5nIG1lc3NhZ2VcbmNvbnN0IG51bWVyaWNWYWx1ZSA9IG1zZy5wYXlsb2FkO1xuXG4vLyBEZWZpbmUgcmFuZ2VzIGZvciBjb25kaXRpb25hbCByb3V0aW5nXG5jb25zdCByYW5nZTEgPSB7IG1pbjogMCwgbWF4OiAxMCB9O1xuY29uc3QgcmFuZ2UyID0geyBtaW46IDExLCBtYXg6IDIwIH07XG5jb25zdCByYW5nZTMgPSB7IG1pbjogMjEsIG1heDogMzAgfTtcblxuLy8gQ2hlY2sgbnVtZXJpYyB2YWx1ZSBhZ2FpbnN0IHJhbmdlc1xuaWYgKG51bWVyaWNWYWx1ZSA+PSByYW5nZTEubWluICYmIG51bWVyaWNWYWx1ZSA8PSByYW5nZTEubWF4KSB7XG4gICAgLy8gVmFsdWUgZmFsbHMgd2l0aGluIHJhbmdlIDFcbiAgICByZXR1cm4gW21zZywgbnVsbCwgbnVsbF07XG59IGVsc2UgaWYgKG51bWVyaWNWYWx1ZSA+PSByYW5nZTIubWluICYmIG51bWVyaWNWYWx1ZSA8PSByYW5nZTIubWF4KSB7XG4gICAgLy8gVmFsdWUgZmFsbHMgd2l0aGluIHJhbmdlIDJcbiAgICByZXR1cm4gW251bGwsIG1zZywgbnVsbF07XG59IGVsc2UgaWYgKG51bWVyaWNWYWx1ZSA+PSByYW5nZTMubWluICYmIG51bWVyaWNWYWx1ZSA8PSByYW5nZTMubWF4KSB7XG4gICAgLy8gVmFsdWUgZmFsbHMgd2l0aGluIHJhbmdlIDNcbiAgICByZXR1cm4gW251bGwsIG51bGwsIG1zZ107XG59IGVsc2Uge1xuICAgIC8vIFZhbHVlIGZhbGxzIG91dHNpZGUgYWxsIHJhbmdlc1xuICAgIG5vZGUud2FybihcIlZhbHVlIGZhbGxzIG91dHNpZGUgYWxsIGRlZmluZWQgcmFuZ2VzLlwiKTtcbiAgICByZXR1cm4gbnVsbDtcbn1cbiIsIm91dHB1dHMiOjMsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6NDcwLCJ5IjoxODAsIndpcmVzIjpbWyJhM2FmODZlODJjZDIyNjdhIl0sWyIzNTIzM2Q2OGEwN2FkMjNhIl0sWyI1YTk5ZWJjNGVlNDM5NzU3Il1dfSx7ImlkIjoiYTNhZjg2ZTgyY2QyMjY3YSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhMjI0MGVhOTUyMDUxZTgxIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzQwLCJ5IjoxNDAsIndpcmVzIjpbXX0seyJpZCI6IjM1MjMzZDY4YTA3YWQyM2EiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTIyNDBlYTk1MjA1MWU4MSIsIm5hbWUiOiJkZWJ1ZyAyIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjc0MCwieSI6MTgwLCJ3aXJlcyI6W119LHsiaWQiOiI1YTk5ZWJjNGVlNDM5NzU3IiwidHlwZSI6ImRlYnVnIiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiZGVidWcgMyIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NDAsInkiOjIyMCwid2lyZXMiOltdfSx7ImlkIjoiYjFlOGNhMmZhYTNmYWFmYyIsInR5cGUiOiJjb21tZW50IiwieiI6ImEyMjQwZWE5NTIwNTFlODEiLCJuYW1lIjoiVGhlIGZ1bmN0aW9uIGNoZWNrcyB0aGUgbnVtZXJpYyB2YWx1ZSBhZ2FpbnN0IGR5bmFtaWMgcmFuZ2VzIGFuZCBzZW5kcyB0aGVtIHRvIG91dHB1dHMgYWNjb3JkaW5nbHkuIiwiaW5mbyI6IiIsIngiOjQ1MCwieSI6ODAsIndpcmVzIjpbXX1d"
---
::




## Node Documentation

<div class="core-node-doc">

<p>A JavaScript function to run against the messages being received by the node.</p> <p>The messages are passed in as a JavaScript object called <code>msg</code>.</p> <p>By convention it will have a <code>msg.payload</code> property containing
the body of the message.</p> <p>The function is expected to return a message object (or multiple message objects), but can choose
to return nothing in order to halt a flow.</p> <p>The <b>On Start</b> tab contains code that will be run whenever the node is started.
The <b>On Stop</b> tab contains code that will be run when the node is stopped.</p> <p>If the On Start code returns a Promise object, the node will not start handling messages
until the promise is resolved.</p> <h3>Details</h3> <p>See the <a target="_blank" href="https://nodered.org/docs/writing-functions.html">online documentation</a>
for more information on writing functions.</p> <h4>Sending messages</h4> <p>The function can either return the messages it wants to pass on to the next nodes
in the flow, or can call <code>node.send(messages)</code>.</p> <p>It can return/send:</p> <ul>
<li>a single message object - passed to nodes connected to the first output</li>
<li>an array of message objects - passed to nodes connected to the corresponding outputs</li>
</ul> <p>Note: The setup code is executed during the initialization of nodes. Therefore, if <code>node.send</code> is called in the setup tab, subsequent nodes may not be able to receive the message.</p> <p>If any element of the array is itself an array of messages, multiple
messages are sent to the corresponding output.</p> <p>If null is returned, either by itself or as an element of the array, no
message is passed on.</p> <h4>Logging and Error Handling</h4> <p>To log any information, or report an error, the following functions are available:</p> <ul>
<li><code>node.log("Log message")</code></li>
<li><code>node.warn("Warning")</code></li>
<li><code>node.error("Error")</code></li>
</ul> <p>The Catch node can also be used to handle errors. To invoke a Catch node,
pass <code>msg</code> as a second argument to <code>node.error</code>:</p> <pre>node.error("Error",msg);</pre> <h4>Accessing Node Information</h4> <p>The following properties are available to access information about the node:</p> <ul>
<li><code>node.id</code> - id of the node</li>
<li><code>node.name</code> - name of the node</li>
<li><code>node.outputCount</code> - number of node outputs</li>
</ul> <h4>Using environment variables</h4> <p>Environment variables can be accessed using <code>env.get("MY_ENV_VAR")</code>.</p>

</div>