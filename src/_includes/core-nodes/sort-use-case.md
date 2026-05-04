Sorts an array or a sequence of messages.

## Where and why do we use the Sort node?

The Sort node arranges data in ascending or descending order. You can sort either an array within a message payload or a sequence of messages based on their properties. This is essential when you need to organize data before displaying it, process items by priority, or find top/bottom values in datasets.

## Modes of operation

The Sort node operates in two different modes:

### Array Sorting

Sorts an array stored in a message property. The entire array gets arranged based on element values or a JSONata expression. Use this when you have a complete dataset in one message that needs ordering.

### Message Sequence Sorting

Sorts a sequence of messages that have a `msg.parts` property. Messages need these fields in `msg.parts`:
- **id** - identifier for the message group
- **index** - position within the group
- **count** - total messages in the group

The Split node automatically creates `msg.parts`, but you can set it manually if needed. Use this mode when processing streams of individual messages that need to be reordered based on their properties.

## How the node handles messages

The Sort node buffers messages internally when working with message sequences. For array sorting, it processes the array immediately and outputs the sorted result. For message sequences, it collects all messages in the sequence before sorting and releasing them in the new order.

When sorting, you can specify:
- **Element value** - Sorts based on the element's value directly
- **Expression** - Uses a JSONata expression to extract the sort value from complex objects

The sort direction can be:
- **Ascending** - Smallest to largest (A to Z)
- **Descending** - Largest to smallest (Z to A)

Enable **As numbers** to sort numerically instead of alphabetically. Without this, "10" comes before "2" because it's treated as text.

## Examples

### Sorting arrays

This example sorts numbers and letters in ascending order. The arrays get arranged from smallest to largest, or A to Z.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"416d6d32df411abe","type":"sort","z":"b5ea6d2a.6e7bb","name":"","order":"ascending","as_num":false,"target":"payload","targetType":"msg","msgKey":"payload","msgKeyType":"elem","seqKey":"payload.quantity","seqKeyType":"msg","x":570,"y":320,"wires":[["eb923bde78247dc5"]]},{"id":"c8bd64176725f43f","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[7,8,41,90,2,4,2]","payloadType":"json","x":360,"y":320,"wires":[["416d6d32df411abe"]]},{"id":"eb923bde78247dc5","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":760,"y":320,"wires":[]},{"id":"67f2e62eec9509c5","type":"comment","z":"b5ea6d2a.6e7bb","name":"Ordering numbers in ascending order","info":"","x":530,"y":240,"wires":[]},{"id":"481e382abac7a730","type":"sort","z":"b5ea6d2a.6e7bb","name":"","order":"ascending","as_num":false,"target":"payload","targetType":"msg","msgKey":"payload","msgKeyType":"elem","seqKey":"payload.quantity","seqKeyType":"msg","x":570,"y":440,"wires":[["f43093160e436025"]]},{"id":"21502b212a9c0f80","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[\"G\", \"F\", \"T\", \"A\", \"R\", \"P\", \"H\", \"W\", \"C\", \"Y\", \"N\", \"B\", \"L\", \"O\", \"X\", \"I\", \"V\", \"E\", \"J\", \"U\", \"K\", \"M\", \"S\", \"Z\", \"D\", \"Q\"]","payloadType":"json","x":330,"y":440,"wires":[["481e382abac7a730"]]},{"id":"f43093160e436025","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":760,"y":440,"wires":[]},{"id":"dba624ac20a75580","type":"comment","z":"b5ea6d2a.6e7bb","name":"Ordering alphabets in ascending order","info":"","x":510,"y":380,"wires":[]}]
{% endrenderFlow %}

### Sorting message sequences

Here the Sort node arranges a sequence of messages in descending order by the quantity property. The Split node breaks the array into individual messages, each gets sorted by its quantity value, and higher quantities come first.

{% renderFlow %}
[{"id":"416d6d32df411abe","type":"sort","z":"b5ea6d2a.6e7bb","name":"","order":"descending","as_num":false,"target":"","targetType":"seq","msgKey":"payload","msgKeyType":"elem","seqKey":"payload.quantity","seqKeyType":"msg","x":550,"y":320,"wires":[["eb923bde78247dc5"]]},{"id":"c8bd64176725f43f","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"name\": \"Laptop\",     \"quantity\": 15   },   {     \"id\": 2,     \"name\": \"Printer\",     \"quantity\": 5   },   {     \"id\": 3,     \"name\": \"Monitor\",     \"quantity\": 10   } ]","payloadType":"json","x":270,"y":320,"wires":[["05e33079464a9243"]]},{"id":"eb923bde78247dc5","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":720,"y":320,"wires":[]},{"id":"05e33079464a9243","type":"split","z":"b5ea6d2a.6e7bb","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":410,"y":320,"wires":[["416d6d32df411abe"]]},{"id":"67f2e62eec9509c5","type":"comment","z":"b5ea6d2a.6e7bb","name":"Ordering sequence of messages in descending order based on the quantity property of each message.","info":"","x":530,"y":240,"wires":[]}]
{% endrenderFlow %}