Creates virtual connections between nodes without visible wires, helping organize complex flows.

## Where and why do we use the Link nodes?

The Link In and Link Out nodes help organize flows by creating virtual connections that aren't visible until selected. This is essential for managing complex flows where physical wires would create visual clutter or when you want to reuse logic across multiple locations. By connecting distant parts of your flow without drawing wires across the canvas, you can keep related nodes grouped together, reduce wire crossings, and make flows more maintainable and easier to understand.

## Modes of operation

Link nodes work in pairs to create virtual connections:

### Link Out Node

Sends messages to one or more Link In nodes. You can configure which Link In nodes receive the message by selecting them from a list. The Link Out node can send to Link In nodes on the same tab or on different tabs, enabling cross-flow communication.

### Link In Node

Receives messages from Link Out nodes. When a Link Out node sends a message, all connected Link In nodes receive a copy. The Link In node acts as a starting point for a new branch of your flow.

### Link Call Node

Sends messages to a Link In node and waits for a response, similar to calling a function. This enables request-response patterns where you need to process data and return results. The response comes from a Link Out node configured to return to the calling Link Call node.

## How the nodes handle messages

Link Out nodes pass messages to their connected Link In nodes exactly as received - no modifications are made. When multiple Link In nodes are connected to a single Link Out, each receives an independent copy of the message.

Link In nodes emit the received message and start a new flow branch. Any nodes connected to a Link In node process the message as if it came from any other node.

Link Call nodes send messages and pause, waiting for a response. The called Link In node processes the message through its connected nodes until reaching a Link Out node configured to return responses. This creates synchronous, function-like behavior within otherwise asynchronous flows.

The virtual connections between Link nodes only become visible in the editor when you select either the Link In or Link Out node, showing which nodes are connected with dashed lines.

## Examples

### Organizing flow sections

Link nodes separate different functional areas of a flow without cluttering the canvas with long wires. This example shows input processing separated from output handling, making each section easier to understand and maintain.

{% renderFlow %}
[{"id":"22ca6ef9668b5ddd","type":"group","z":"f77f61b90395f588","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["input-inject","process-input","link-out-process","link-in-output","format-output","output-debug"],"x":334,"y":5299,"w":792,"h":202},{"id":"input-inject","type":"inject","z":"f77f61b90395f588","g":"22ca6ef9668b5ddd","name":"Sensor Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"temperature\":22,\"humidity\":65}","payloadType":"json","x":450,"y":5340,"wires":[["process-input"]]},{"id":"process-input","type":"function","z":"f77f61b90395f588","g":"22ca6ef9668b5ddd","name":"Validate Input","func":"if (\n    msg.payload &&\n    msg.payload.temperature !== undefined &&\n    msg.payload.humidity !== undefined\n) {\n    return msg;\n}\nreturn null;","outputs":1,"x":760,"y":5340,"wires":[["link-out-process"]]},{"id":"link-out-process","type":"link out","z":"f77f61b90395f588","g":"22ca6ef9668b5ddd","name":"To Output Handler","mode":"link","links":["link-in-output"],"x":935,"y":5340,"wires":[]},{"id":"link-in-output","type":"link in","z":"f77f61b90395f588","g":"22ca6ef9668b5ddd","name":"From Input Process","links":["link-out-process"],"x":515,"y":5460,"wires":[["format-output"]]},{"id":"format-output","type":"function","z":"f77f61b90395f588","g":"22ca6ef9668b5ddd","name":"Format for Display","func":"msg.payload = `Temp: ${msg.payload.temperature}°C, Humidity: ${msg.payload.humidity}%`;\nreturn msg;","outputs":1,"x":770,"y":5460,"wires":[["output-debug"]]},{"id":"output-debug","type":"debug","z":"f77f61b90395f588","g":"22ca6ef9668b5ddd","name":"Display Output","active":true,"tosidebar":true,"complete":"payload","x":1000,"y":5460,"wires":[]}]
{% endrenderFlow %}

### Reusable processing logic

Link In nodes enable reusing the same processing logic from multiple sources without duplicating nodes. This example shows multiple inputs feeding into a single processing pipeline through Link nodes, useful for common transformations or validations.

{% renderFlow %}
[{"id":"source1-inject","type":"inject","z":"a1b2c3d4e5f6g7h8","name":"Source 1","props":[{"p":"payload"},{"p":"source","v":"sensor-1","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"25","payloadType":"num","x":180,"y":140,"wires":[["link-out-1"]]},{"id":"source2-inject","type":"inject","z":"a1b2c3d4e5f6g7h8","name":"Source 2","props":[{"p":"payload"},{"p":"source","v":"sensor-2","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"30","payloadType":"num","x":180,"y":200,"wires":[["link-out-2"]]},{"id":"source3-inject","type":"inject","z":"a1b2c3d4e5f6g7h8","name":"Source 3","props":[{"p":"payload"},{"p":"source","v":"sensor-3","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"28","payloadType":"num","x":180,"y":260,"wires":[["link-out-3"]]},{"id":"link-out-1","type":"link out","z":"a1b2c3d4e5f6g7h8","name":"","mode":"link","links":["link-in-process"],"x":335,"y":140,"wires":[]},{"id":"link-out-2","type":"link out","z":"a1b2c3d4e5f6g7h8","name":"","mode":"link","links":["link-in-process"],"x":335,"y":200,"wires":[]},{"id":"link-out-3","type":"link out","z":"a1b2c3d4e5f6g7h8","name":"","mode":"link","links":["link-in-process"],"x":335,"y":260,"wires":[]},{"id":"link-in-process","type":"link in","z":"a1b2c3d4e5f6g7h8","name":"Common Processor","links":["link-out-1","link-out-2","link-out-3"],"x":195,"y":380,"wires":[["process-data"]]},{"id":"process-data","type":"function","z":"a1b2c3d4e5f6g7h8","name":"Convert to Fahrenheit","func":"msg.payload = (msg.payload * 9/5) + 32;\nmsg.payload = `${msg.source}: ${msg.payload.toFixed(1)}°F`;\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":400,"y":380,"wires":[["result-debug"]]},{"id":"result-debug","type":"debug","z":"a1b2c3d4e5f6g7h8","name":"Processed Results","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":620,"y":380,"wires":[]}]
{% endrenderFlow %}