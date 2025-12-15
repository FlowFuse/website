Catches and handles errors that occur in flows.

## Where and why do we use the Catch node?

The Catch node handles errors within your flows, preventing crashes and enabling graceful error recovery. When an error occurs in any node, the Catch node intercepts it and lets you respond appropriately - whether that's logging the error, retrying the operation, sending alerts, or providing user feedback. This is essential for building robust flows that can handle unexpected situations without failing completely.

**Note:** Some third-party nodes have their own error-handling mechanisms, such as updating status or sending custom error messages, which may not properly inform the runtime about errors occurring. The Catch node cannot capture or handle these errors.

## Modes of operation

The Catch node can be configured to catch errors from different scopes:

### All Nodes

Captures errors from all nodes in the same tab or flow. This is useful for implementing flow-wide error handling where you want a single catch-all error handler.

### Same Group

Limits error capture to nodes within the same group as the Catch node. Use this when you want isolated error handling for specific sections of your flow that are grouped together.

### Selected Nodes

Captures errors from specific nodes you choose. This gives you fine-grained control over which nodes' errors are handled by this particular Catch node, useful when different nodes need different error handling strategies.

## How the node handles messages

When an error occurs in a monitored node, the Catch node emits a message object containing error information. The node doesn't modify or stop the original error - it creates a new message flow that you can use to respond to the error.

The message object emitted by the Catch node contains:

- **payload** - the payload that was passed to the node which threw the error
- **error.message** - the error message text
- **error.source** - object containing information about the node that logged the error:
  - **id** - the source node id
  - **type** - the type of the source node
  - **name** - the name, if set, of the source node
  - **count** - how many times this message has been thrown by this node

This information lets you implement sophisticated error handling logic, including conditional responses based on which node failed or what type of error occurred.

## Examples

### Error handling for external integrations

The Catch node handles errors when interacting with APIs, including network issues, response errors, server unavailability, database connection losses, timeout errors, and MQTT broker disconnections. It can also trigger retry actions as necessary.

In this example, the inject node sets a request timeout of 2000 milliseconds. The HTTP request node calls a mock URL with a 3-second delay parameter, simulating a delayed response. This causes a timeout error that the Catch node intercepts. After catching the error, the flow retries the request after a 5-second delay.

{% renderFlow %}
[{"id":"aa3e542e2b379d9e","type":"catch","z":"dff6fa938cfda5c8","name":"","scope":null,"uncaught":false,"x":140,"y":420,"wires":[["f52165d6428bf401","7c3d8d927c2b87d9"]]},{"id":"d6d87d75c231118a","type":"inject","z":"dff6fa938cfda5c8","name":"Send request","props":[{"p":"requestTimeout","v":"2000","vt":"num"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":370,"y":220,"wires":[["2a684bfe86bf3597"]]},{"id":"2a684bfe86bf3597","type":"http request","z":"dff6fa938cfda5c8","name":"","method":"GET","ret":"txt","paytoqs":"query","url":"https://reqres.in/api/users?delay=3","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":550,"y":280,"wires":[["df1c4cba60624654"]]},{"id":"df1c4cba60624654","type":"debug","z":"dff6fa938cfda5c8","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":740,"y":280,"wires":[]},{"id":"f52165d6428bf401","type":"debug","z":"dff6fa938cfda5c8","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":360,"y":440,"wires":[]},{"id":"7c3d8d927c2b87d9","type":"delay","z":"dff6fa938cfda5c8","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"allowrate":false,"outputs":1,"x":360,"y":380,"wires":[["2a684bfe86bf3597"]]},{"id":"c2deb182e2c24e98","type":"comment","z":"dff6fa938cfda5c8","name":"Send request with timeout of 2000 mil seconds","info":"","x":290,"y":160,"wires":[]},{"id":"303cbead6a589517","type":"comment","z":"dff6fa938cfda5c8","name":"Set a delay of 3 seconds for the response.","info":"","x":660,"y":220,"wires":[]},{"id":"828fb1a255aaeb65","type":"comment","z":"dff6fa938cfda5c8","name":"Retry request after 5 seconds if request timeout","info":"","x":240,"y":320,"wires":[]}]
{% endrenderFlow %}

### User input validation

In applications with user input, validation errors can disrupt the flow. The Catch node handles these errors, providing feedback or corrective actions to guide users.

In this example, the function node attempts to sort input data received from an inject node using the sort method, which only works with arrays. Sending other data types causes an error that the Catch node catches, which then sends a validation message to the user.

{% renderFlow %}
[{"id":"5b5392bda3519ca5","type":"inject","z":"a2240ea952051e81","name":"Send invalid input","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"This is string","payloadType":"str","x":240,"y":160,"wires":[["2c3f517165f7ee37"]]},{"id":"f63239dbca38b4bd","type":"catch","z":"a2240ea952051e81","name":"","scope":null,"uncaught":false,"x":200,"y":400,"wires":[["222121f5280a68d8","d0f062a664420050"]]},{"id":"222121f5280a68d8","type":"debug","z":"a2240ea952051e81","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":380,"y":380,"wires":[]},{"id":"c79bf5f53f284338","type":"inject","z":"a2240ea952051e81","name":"Send valid input","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[1,2,3,4,5,6,7,8,9,10]","payloadType":"json","x":240,"y":240,"wires":[["2c3f517165f7ee37"]]},{"id":"2c3f517165f7ee37","type":"function","z":"a2240ea952051e81","name":"Sort data array","func":"let data = msg.payload;\ndata = data.sort((a,b)=>a+b)\nmsg.payload = data\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":620,"y":200,"wires":[[]]},{"id":"7c0aadd1766c2909","type":"debug","z":"a2240ea952051e81","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":600,"y":440,"wires":[]},{"id":"d0f062a664420050","type":"change","z":"a2240ea952051e81","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"please enter valid input ","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":400,"y":440,"wires":[["7c0aadd1766c2909"]]},{"id":"51f9a4431f667dd4","type":"comment","z":"a2240ea952051e81","name":"Send alert when invalid input recieved","info":"","x":410,"y":300,"wires":[]},{"id":"a66c2f72744d7b33","type":"comment","z":"a2240ea952051e81","name":"Function sorts data array recived by inject node","info":"","x":440,"y":80,"wires":[]}]
{% endrenderFlow %}