Joins sequences of messages into a single message.

## Where and why do we use the Join node?

The Join node combines multiple messages into one. It's the counterpart to the Split node and can automatically reverse a split operation, or you can configure it to merge messages from different sources based on specific rules. This is essential when you need to aggregate data from multiple sources, reassemble split sequences, or reduce message streams into summary values.

## Modes of operation

The Join node operates in three different modes, each suited for different use cases.

### Automatic Mode

When paired with the Split node, automatically joins messages to reverse the split that was performed. Uses the `msg.parts` property of incoming messages to determine how the sequence should be joined.

The `msg.parts` property should contain:
- **id** - identifier for the message group
- **index** - position within the group
- **count** - total number of messages in the group
- **type** - the message type (string, array, object, or buffer)
- **ch** - for strings or buffers, the delimiter used to split
- **key** - for objects, the property key this message came from
- **len** - the length when split using fixed length

### Manual Mode

Configure how to join sequences by selecting which message property to join and choosing the output format:
- **String or buffer** - joins the selected property with specified join characters or buffer
- **Array** - adds each selected property or entire message to an output array
- **Key/value object** - uses a property of each message as the key for storing the required value
- **Merged object** - merges the property of each message under a single object

You can define when to send the combined message:
- After a specific number of message parts
- After a timeout following the first message
- After receiving a message with `msg.complete` property set

### Reduce Sequence Mode

Applies a JSONata expression to each message in a sequence and accumulates the result to produce a single message. This is useful for calculations like sums, averages, or any custom aggregation logic.

The reduce expression runs for each message with special variables available:
- `$A` - the accumulated value
- `$I` - index of the message in the sequence
- `$N` - number of messages in the sequence

An optional fix-up expression can be applied after all messages have been processed to perform final calculations.

## How the node handles messages

The Join node buffers messages internally to work across sequences. The Node-RED runtime setting `nodeMessageBufferMaxLength` limits how many messages can be buffered to prevent memory issues.

If you send a message with the `msg.reset` property set, the node clears the partly complete message without sending it and resets any part counts. When using manual mode with timeout, send a message with `msg.restartTimeout` set to restart the timeout.

For manual mode, the other properties of the output message come from the last message received before sending.

## Examples

### Automatic mode

This example shows automatic mode. The Split node breaks an array into individual messages, then Join automatically reassembles them back into the original array.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"84ed227552b4e6eb","type":"join","z":"b5ea6d2a.6e7bb","name":"","mode":"auto","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":true,"timeout":"","count":"3","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":590,"y":300,"wires":[["f2dba285d7a067cd"]]},{"id":"522b4e247e84ac0e","type":"inject","z":"b5ea6d2a.6e7bb","name":"Send array","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"task\": \"Complete project proposal\",     \"completed\": false   },   {     \"id\": 2,     \"task\": \"Review presentation slides\",     \"completed\": true   },   {     \"id\": 3,     \"task\": \"Prepare for client meeting\",     \"completed\": false   } ]","payloadType":"json","x":220,"y":300,"wires":[["351e98a55e5a50c6"]]},{"id":"f2dba285d7a067cd","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":780,"y":300,"wires":[]},{"id":"d47a5edb2d5d5b70","type":"comment","z":"b5ea6d2a.6e7bb","name":"Joining the messages to reverse the split that was performed.","info":"","x":500,"y":220,"wires":[]},{"id":"351e98a55e5a50c6","type":"split","z":"b5ea6d2a.6e7bb","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":410,"y":300,"wires":[["84ed227552b4e6eb"]]}]
{% endrenderFlow %}

### Manual mode

Here manual mode combines three separate sensor readings into one object. Each message has a different `msg.topic` (temperature, humidity, pressure) and those topics become the keys in the output object.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"84ed227552b4e6eb","type":"join","z":"b5ea6d2a.6e7bb","name":"","mode":"custom","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":true,"timeout":"","count":"3","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":490,"y":300,"wires":[["f2dba285d7a067cd"]]},{"id":"522b4e247e84ac0e","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"temperature","payload":"40","payloadType":"num","x":260,"y":240,"wires":[["84ed227552b4e6eb"]]},{"id":"12e54e4066bac7a3","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"humidity","payload":"33","payloadType":"num","x":270,"y":300,"wires":[["84ed227552b4e6eb"]]},{"id":"b04d4f51f0602607","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"pressure","payload":"1000","payloadType":"num","x":270,"y":360,"wires":[["84ed227552b4e6eb"]]},{"id":"f2dba285d7a067cd","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":720,"y":300,"wires":[]},{"id":"d47a5edb2d5d5b70","type":"comment","z":"b5ea6d2a.6e7bb","name":"Combining three payload into one object ","info":"","x":520,"y":180,"wires":[]}]
{% endrenderFlow %}

### Reduce sequence mode

This example uses reduce mode to calculate total inventory. The expression `$A+payload.quantity` adds each item's quantity to the running total, starting from 0.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"84ed227552b4e6eb","type":"join","z":"b5ea6d2a.6e7bb","name":"","mode":"reduce","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":true,"timeout":"","count":"3","reduceRight":false,"reduceExp":"$A+payload.quantity","reduceInit":"0","reduceInitType":"num","reduceFixup":"$A","x":590,"y":300,"wires":[["f2dba285d7a067cd"]]},{"id":"522b4e247e84ac0e","type":"inject","z":"b5ea6d2a.6e7bb","name":"Send array","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"name\": \"Laptop\",     \"quantity\": 15   },   {     \"id\": 2,     \"name\": \"Printer\",     \"quantity\": 5   },   {     \"id\": 3,     \"name\": \"Monitor\",     \"quantity\": 10   } ]","payloadType":"json","x":220,"y":300,"wires":[["351e98a55e5a50c6"]]},{"id":"f2dba285d7a067cd","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":780,"y":300,"wires":[]},{"id":"d47a5edb2d5d5b70","type":"comment","z":"b5ea6d2a.6e7bb","name":"Calculating total stocks using Join node reduced expression mode","info":"","x":510,"y":220,"wires":[]},{"id":"351e98a55e5a50c6","type":"split","z":"b5ea6d2a.6e7bb","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":410,"y":300,"wires":[["84ed227552b4e6eb"]]}]
{% endrenderFlow %}