Adds documentation and explanatory notes directly within your flows.

## Where and why do we use the Comment node?

The Comment node helps document your flows by adding explanatory text that appears on the canvas. This is essential for maintaining flows over time, especially when working in teams or returning to flows after extended periods. By documenting the purpose, requirements, and logic of flow sections, you make flows more understandable, reduce interpretation errors, and speed up troubleshooting and modifications. Comments are particularly valuable for complex flows with link nodes, multi-tab workflows, or business logic that isn't obvious from the nodes alone.

> If you need help documenting your flows, [FlowFuse Assistant](/docs/user/expert/) can automatically generate documentation with Comment nodes. Simply select your flow and click the "Explain Flow" button, the AI will analyze your flow and create comprehensive documentation that you can add directly to your canvas.

## Modes of operation

The Comment node provides flexible documentation capabilities:

### Canvas Labels

Display brief explanatory text directly on the canvas. The node shows a single line of text in its name field, providing quick context without cluttering the visual layout. This is useful for labeling flow sections, marking decision points, or highlighting important considerations.

### Detailed Documentation

Store longer explanations in the node's info panel. Double-clicking the Comment node reveals a WYSIWYG editor where you can write detailed documentation, including formatting, lists, and even ASCII diagrams. This detailed content doesn't take up canvas space but remains accessible when needed.

### Group Annotations

Place Comment nodes within flow groups to document the group's purpose and functionality. This creates self-contained, well-documented sections of your flow that are easier to understand and maintain. It's recommended to add comments to all flow groups for comprehensive documentation.

## How the node handles messages

The Comment node is purely documentary and doesn't participate in message flows. It has no input or output connections and doesn't process, modify, or generate messages. You can place Comment nodes anywhere on the canvas without affecting flow execution or performance.

Because Comment nodes don't impact runtime behavior, you can be as detailed and explicit as needed in your documentation. Multiple Comment nodes can be used throughout a flow to explain different sections, decision logic, or implementation details.

## Examples

### Documenting flow sections

Add comments to explain what groups of nodes accomplish and why they're structured that way. This example shows a comment documenting an input validation section, helping future developers understand the requirements and logic.

{% renderFlow %}
[{"id":"comment-validation","type":"comment","z":"a1b2c3d4e5f6g7h8","name":"Input Validation Section","info":"This section validates incoming sensor data before processing.\n\nRequirements:\n- Temperature must be between -50 and 100°C\n- Humidity must be between 0 and 100%\n- Both values must be present\n\nInvalid data is logged and discarded to prevent\ndownstream processing errors.","x":210,"y":140,"wires":[]},{"id":"input-inject","type":"inject","z":"a1b2c3d4e5f6g7h8","name":"Sensor Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"temperature\":22,\"humidity\":65}","payloadType":"json","x":190,"y":200,"wires":[["validate-temp"]]},{"id":"validate-temp","type":"switch","z":"a1b2c3d4e5f6g7h8","name":"Check Temperature","property":"payload.temperature","propertyType":"msg","rules":[{"t":"btwn","v":"-50","vt":"num","v2":"100","vt2":"num"}],"checkall":"true","repair":false,"outputs":1,"x":400,"y":200,"wires":[["validate-humidity"]]},{"id":"validate-humidity","type":"switch","z":"a1b2c3d4e5f6g7h8","name":"Check Humidity","property":"payload.humidity","propertyType":"msg","rules":[{"t":"btwn","v":"0","vt":"num","v2":"100","vt2":"num"}],"checkall":"true","repair":false,"outputs":1,"x":620,"y":200,"wires":[["output-debug"]]},{"id":"output-debug","type":"debug","z":"a1b2c3d4e5f6g7h8","name":"Valid Data","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":810,"y":200,"wires":[]}]
{% endrenderFlow %}