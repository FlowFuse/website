## What is the Trigger Node in Node-RED?

The Trigger node in Node-RED facilitates the initiation and repetition of messages at customizable intervals, offering precise control over when messages are sent, their recurrence frequency, and optional delays. This functionality is valuable for automating tasks and efficiently managing communication flow within Node-RED flows.

## Inject Node Vs Trigger Node

The Inject node lets you send messages at specific intervals but it starts immediately and continues indefinitely unless manually configured to stop. With the Trigger node, you have control over when the node starts and stops sending messages. Nonetheless, both nodes possess distinct use cases and limitations.

## Configuring the Trigger Node

- **Send:** Message to be passed to subsequent nodes.

- **Then:**
  - **Wait For:** Allows sending a message when triggered and then optionally a second message. You can also set it to send nothing when triggered or for the second message.
    - **Extend Delay if New Message Arrives:** Enabling this option will extend the delay time if a new message is received.
    - **Then Send:** Allows setting the second message to be sent after a specific delay, or you can set it to send nothing.
    - **Send Second Message to Separate Output:** Enabling this option will add a second output to receive the second message from the trigger node.
  - **Resend it Every:** Allows resending a message at specific intervals of time.
  - **Wait to be Reset:** Selecting this option will send a message once when triggered and will wait until it is reset. If not reset, it will not send any message with the same property specified in **handling** config property. If **all messages** are selected, it will not send any message if not reset.

- **Reset the Trigger if:** Allows setting msg.payload that, when received, will reset the trigger node. Alternatively, sending a message containing a reset property will reset the node (which is the default behavior).
   
- **Override Delay with `msg.delay`:** Enabling this option will allow sending the delay time dynamically with the `msg.delay`. The value must be provided in milliseconds.
- **Handling:** Allows configuring the node to treat messages as separate streams, using a `msg` property to identify each stream. Selecting "All Messages" will handle all types of messages separately.

## Trigger node Use cases:

- Repetitive Tasks: If you have tasks that need to be repeated at regular intervals, such as data polling or device status checks when triggered, the Trigger node can handle this by configuring it to resend messages at specified time intervals.

- Timeout Handling: You can utilize the Trigger node to manage timeouts within your flow. For example, you could trigger an action if a response is not received within a certain time frame, or set up a timeout mechanism for user interactions.

- Resource Conservation: The Trigger node can conserve energy or system resources by automatically initiating actions, such as turning off lights or closing valves, after a predefined period of inactivity or completion of a task

## Examples

1. In the example flow below, we've simulated a door lock system. We employ an inject node to input a password, which is then verified against a specified password in a switch node. If the input password is correct, a trigger node sends a payload to open the door. After 4 seconds, a second message is sent to close the door. This can also be utilized for scenarios involving turning an LED on and off.

{% renderFlow %}

[{"id":"39333c055828b138","type":"inject","z":"39d029f8bb26b820","name":"swap card","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"pass123","payloadType":"str","x":200,"y":240,"wires":[["7fec2333b929d424"]]},{"id":"6e6bc184119065fc","type":"trigger","z":"39d029f8bb26b820","name":"","op1":"opening door","op2":"closing door","op1type":"str","op2type":"str","duration":"4","extend":false,"overrideDelay":false,"units":"s","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":540,"y":240,"wires":[["d0ccd1e7dd9e313a"]]},{"id":"7fec2333b929d424","type":"switch","z":"39d029f8bb26b820","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"pass123","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":350,"y":240,"wires":[["6e6bc184119065fc"]]},{"id":"d0ccd1e7dd9e313a","type":"debug","z":"39d029f8bb26b820","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":780,"y":240,"wires":[]},{"id":"5662274e316d9317","type":"comment","z":"39d029f8bb26b820","name":"Simulating a door lock system where entering the correct password will open the door for 5 seconds and then will close.","info":"","x":480,"y":140,"wires":[]}]

{% endrenderFlow %}

2. In the example flow below, we have a trigger node polling data continuously from an API. It polls data at specific interval when a message is received and stops if a message is received with the property of 'reset'. This can also be used in scenarios where you want to read sensor data with custom control. 

{% renderFlow %}

[{"id":"e682b48eea38c319","type":"inject","z":"a2240ea952051e81","name":"Start polling","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":170,"y":200,"wires":[["b9ae5465226eae3a"]]},{"id":"5eb6498b447e55cd","type":"inject","z":"a2240ea952051e81","name":"Stop polling","props":[{"p":"reset","v":"","vt":"date"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":170,"y":340,"wires":[["b9ae5465226eae3a"]]},{"id":"80ad06952f6dcae7","type":"http request","z":"a2240ea952051e81","name":"","method":"GET","ret":"txt","paytoqs":"ignore","url":"https://jsonplaceholder.typicode.com/todos/","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":false,"headers":[],"x":690,"y":280,"wires":[["6182fd9db1a9270a"]]},{"id":"b9ae5465226eae3a","type":"trigger","z":"a2240ea952051e81","name":"","op1":"1","op2":"0","op1type":"str","op2type":"str","duration":"-500","extend":false,"overrideDelay":false,"units":"ms","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":440,"y":280,"wires":[["80ad06952f6dcae7"]]},{"id":"6182fd9db1a9270a","type":"debug","z":"a2240ea952051e81","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":900,"y":280,"wires":[]},{"id":"04893f86fbf06dee","type":"comment","z":"a2240ea952051e81","name":"Polling data from API with control to start and stop","info":"","x":560,"y":200,"wires":[]}]

{% endrenderFlow %}


