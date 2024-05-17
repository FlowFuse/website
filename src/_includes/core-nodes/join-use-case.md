## What is Join node in Node-RED?

The Join node in Node-RED is used to combine sequences of messages into a single message. It is particularly useful when dealing with multiple input streams or when you need to aggregate data from different sources into a single payload.

## Configuring Join node

- **Mode**:
    - **Automatic**: When join node paired with the split node, it will automatically join the messages to reverse the split that was performed.
    - **Manual**: Allows manual selection of how messages should be combined.
      - **combine each**: Allows selecting which message properties should be combined. Additionally allows to select complete message object to combine.
        - **to create**: Specifies the output type such as a string, buffer, array, key/value object, or merged object.
        - **Send the message**:
            - **After a number of message parts**: Sends the combined message after a specified number of parts have been received.
                - **and every subsequent message**: Continues to send messages as they arrive but applies the specified number of parts for each combined message.
            - **After a timeout following the first message**: Waits for a timeout after receiving the first message part. If more parts arrive within the specified timeout, they are included in the combined message. The timeout can be restarted by sending a message with the `msg.restartTimeout` property set.
            - **After a message with the msg.complete property set**: If a message is received with the `msg.complete` property set, the output message is finalized and sent. This resets any part counts. Additionally, if a message is received with the msg.reset property set, the partly complete message is deleted and not sent, which also resets any part counts.
            
    - Reduce sequence
        - **Reduce exp**: An expression applied to each message in the sequence to combine them into a single message.
        - **Initial value**: The starting value used in the combining process.
        - **Fix-up exp**: An optional expression used after combining the messages.
            - **Evaluate in reverse order (last to first)**: Enabling this option combines messages in reverse order, starting from the last message.

## Usecases

- **Data Aggregation from Multiple Sensors:** Suppose you have several sensors (e.g., temperature, humidity, pressure) sending data independently. You can use the Join node to combine these separate readings into a single message for analysis or storage.

- **Sequential Operations:** When you need to perform a series of operations that depend on each other, you can use the Join node to ensure that all prerequisite data is available before proceeding with the next step.

- **Creating Complex Data Structures:** By combining multiple messages into a single message with nested objects or arrays, the Join node facilitates the creation of complex data structures for applications like dashboard visualizations or machine learning models.

- **Time-Based Aggregation:** If you need to aggregate data over a specific time period (e.g., hourly averages, daily totals), the Join node can accumulate data within that interval and output aggregated results.

- **Handling Parallel Workflows:** In workflows where multiple tasks run concurrently and their results need to be synchronized or aggregated, the Join node helps manage parallel execution and consolidate outputs.

- **Batch Processing:** If you want to process data in batches rather than individually, the Join node can accumulate messages until a specified count or time threshold is reached, then emit a combined message for batch processing.

## Examples 

1. In the example below, the Join node uses automatic mode to rejoin the message split by the Split node.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"84ed227552b4e6eb","type":"join","z":"b5ea6d2a.6e7bb","name":"","mode":"auto","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":true,"timeout":"","count":"3","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":590,"y":300,"wires":[["f2dba285d7a067cd"]]},{"id":"522b4e247e84ac0e","type":"inject","z":"b5ea6d2a.6e7bb","name":"Send array","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"task\": \"Complete project proposal\",     \"completed\": false   },   {     \"id\": 2,     \"task\": \"Review presentation slides\",     \"completed\": true   },   {     \"id\": 3,     \"task\": \"Prepare for client meeting\",     \"completed\": false   } ]","payloadType":"json","x":220,"y":300,"wires":[["351e98a55e5a50c6"]]},{"id":"f2dba285d7a067cd","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":780,"y":300,"wires":[]},{"id":"d47a5edb2d5d5b70","type":"comment","z":"b5ea6d2a.6e7bb","name":"Joining the messages to reverse the split that was performed.","info":"","x":500,"y":220,"wires":[]},{"id":"351e98a55e5a50c6","type":"split","z":"b5ea6d2a.6e7bb","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":410,"y":300,"wires":[["84ed227552b4e6eb"]]}]
{% endrenderFlow %}

2. In the example below, the Join node utilizes manual mode to merge three payload properties into one based on the value of the `msg.topic` object.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"84ed227552b4e6eb","type":"join","z":"b5ea6d2a.6e7bb","name":"","mode":"custom","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":true,"timeout":"","count":"3","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":490,"y":300,"wires":[["f2dba285d7a067cd"]]},{"id":"522b4e247e84ac0e","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"temperature","payload":"40","payloadType":"num","x":260,"y":240,"wires":[["84ed227552b4e6eb"]]},{"id":"12e54e4066bac7a3","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"humidity","payload":"33","payloadType":"num","x":270,"y":300,"wires":[["84ed227552b4e6eb"]]},{"id":"b04d4f51f0602607","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"pressure","payload":"1000","payloadType":"num","x":270,"y":360,"wires":[["84ed227552b4e6eb"]]},{"id":"f2dba285d7a067cd","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":720,"y":300,"wires":[]},{"id":"d47a5edb2d5d5b70","type":"comment","z":"b5ea6d2a.6e7bb","name":"Combining three payload into one object ","info":"","x":520,"y":180,"wires":[]}]
{% endrenderFlow %}

3. In the example below, the Join node calculates the total number of stocks using the reduce expression.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"84ed227552b4e6eb","type":"join","z":"b5ea6d2a.6e7bb","name":"","mode":"reduce","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":true,"timeout":"","count":"3","reduceRight":false,"reduceExp":"$A+payload.quantity","reduceInit":"0","reduceInitType":"num","reduceFixup":"$A","x":590,"y":300,"wires":[["f2dba285d7a067cd"]]},{"id":"522b4e247e84ac0e","type":"inject","z":"b5ea6d2a.6e7bb","name":"Send array","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"name\": \"Laptop\",     \"quantity\": 15   },   {     \"id\": 2,     \"name\": \"Printer\",     \"quantity\": 5   },   {     \"id\": 3,     \"name\": \"Monitor\",     \"quantity\": 10   } ]","payloadType":"json","x":220,"y":300,"wires":[["351e98a55e5a50c6"]]},{"id":"f2dba285d7a067cd","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":780,"y":300,"wires":[]},{"id":"d47a5edb2d5d5b70","type":"comment","z":"b5ea6d2a.6e7bb","name":"Calculating total stocks using Join node reduced expression mode","info":"","x":510,"y":220,"wires":[]},{"id":"351e98a55e5a50c6","type":"split","z":"b5ea6d2a.6e7bb","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":410,"y":300,"wires":[["84ed227552b4e6eb"]]}]
{% endrenderFlow %}
