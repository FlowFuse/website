Splits a message into a sequence of messages.

## Where and why do we use the Split node?

The Split node breaks one message into multiple messages. This is essential when you receive bulk data that needs individual processing. For example, a SQL query might return hundreds of rows, or an API might send multiple sensor readings in one payload. The Split node turns that single message into a stream of messages you can process one at a time.

## Modes of operation

The Split node's behavior depends on what type of data is in `msg.payload`:

### String/Buffer

Splits on a specified character (default is `\n` for newlines), a buffer sequence, or into fixed lengths. You can use spaces for words, commas for CSV data, or any character. Also supports multi-character strings and buffer sequences.

### Array

Splits into individual array elements, or into arrays of a fixed length. Useful when APIs have batch size limits and you need to chunk data into smaller groups.

### Object

Sends one message for each key-value pair. By default, the key name goes into `msg.topic` and the value goes into `msg.payload`.

## How the node handles messages

Each output message gets a `msg.parts` property with information about how it was split from the original. This lets the Join node reassemble the sequence back into a single message.

The property contains:

- **id** - identifier for the message group
- **index** - position within the group
- **count** - total messages in the group (not set in streaming mode since the total is unknown)
- **type** - the original data type (string, array, object, or buffer)
- **ch** - for strings or buffers, the delimiter used to split the message
- **key** - for objects, the key name this message came from (also copied to `msg.topic` by default)
- **len** - when using fixed length splitting, the length of each segment

### Streaming mode

In streaming mode, the node processes incomplete data across multiple messages. Say a serial device sends newline-terminated commands but a message ends mid-command. The node splits and sends the complete parts, then holds the incomplete part and prepends it to the next message that arrives.

Because streaming mode doesn't know how many messages to expect, it doesn't set `msg.parts.count`. This means you can't use it with the Join node in automatic mode, since Join needs to know when the sequence is complete.

## Examples

### Splitting arrays

Arrays are the simplest case. Feed in an array and get one message per element. Here an array `[1, 2, 3, 4]` becomes four messages.

{% renderFlow %}
[{"id":"6354daaccf2b2504","type":"inject","z":"2862bf5c278ff5bd","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[1, 2, 3, 4]","payloadType":"json","x":140,"y":100,"wires":[["82ab52c7f894f725"]]},{"id":"82ab52c7f894f725","type":"split","z":"2862bf5c278ff5bd","name":"Split Array","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":310,"y":100,"wires":[["80ee79b75e373ba9"]]},{"id":"80ee79b75e373ba9","type":"debug","z":"2862bf5c278ff5bd","name":"Print individual values","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":520,"y":100,"wires":[]}]
{% endrenderFlow %}

### Regrouping elements

Sometimes you need to chunk data into smaller groups. Say an API only accepts 20 records at a time but you have 100. Set `Fixed length of` to split the array into chunks of that size.

With input `[1, 2, 3, 4, 5]` and `Fixed length of` set to 2, you get three messages: `[1, 2]`, `[3, 4]`, and `[5]`.

{% renderFlow %}
[{"id":"57087c8029d44fa2","type":"inject","z":"2862bf5c278ff5bd","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[1, 2, 3, 4, 5]","payloadType":"json","x":150,"y":160,"wires":[["b8d0aec7f0cba6c5"]]},{"id":"b8d0aec7f0cba6c5","type":"split","z":"2862bf5c278ff5bd","name":"Regroup array","splt":"\\n","spltType":"str","arraySplt":"2","arraySpltType":"len","stream":false,"addname":"","x":340,"y":160,"wires":[["d45d698bae8b575d"]]},{"id":"d45d698bae8b575d","type":"debug","z":"2862bf5c278ff5bd","name":"Print individual values","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":560,"y":160,"wires":[]}]
{% endrenderFlow %}

### Splitting strings

The default string split uses `\n` (newline) as the delimiter, which splits text by line. This works for processing logs, CSV data, or any line-based format.

Here we split a list of European cities, one per line.

{% renderFlow %}
[{"id":"39a0a053a3696cd7","type":"inject","z":"2862bf5c278ff5bd","name":"Trigger","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":130,"y":220,"wires":[["60bf012438abb4eb"]]},{"id":"4b56a3ed831df59e","type":"split","z":"2862bf5c278ff5bd","name":"Split by line","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":470,"y":220,"wires":[["31f8ca22882b297f"]]},{"id":"31f8ca22882b297f","type":"debug","z":"2862bf5c278ff5bd","name":"Print each line","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":660,"y":220,"wires":[]},{"id":"60bf012438abb4eb","type":"template","z":"2862bf5c278ff5bd","name":"Data in lines","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"Amsterdam\nAndorra la Vella\nAthens","output":"str","x":290,"y":220,"wires":[["4b56a3ed831df59e"]]}]
{% endrenderFlow %}

### Splitting by word

Change the delimiter to a space and you can split sentences into words. Put a space character in the `Split using` field. It won't be visible in the form but it's there.

{% renderFlow %}
[{"id":"619209d6e3f02473","type":"inject","z":"2862bf5c278ff5bd","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"foo bar","payloadType":"str","x":130,"y":280,"wires":[["15b9b3d17a64e2c7"]]},{"id":"15b9b3d17a64e2c7","type":"split","z":"2862bf5c278ff5bd","name":"Split by space","splt":" ","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":300,"y":280,"wires":[["12607e8708ef58f2"]]},{"id":"12607e8708ef58f2","type":"debug","z":"2862bf5c278ff5bd","name":"Print each word","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":500,"y":280,"wires":[]}]
{% endrenderFlow %}

### Splitting objects

When you split an object, you get one message per key-value pair. The key goes into `msg.topic` and the value goes into `msg.payload`.

This example splits a simple object mapping words to numbers.

{% renderFlow %}
[{"id":"3c4c5535ec3b2138","type":"inject","z":"2862bf5c278ff5bd","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"one\": 1, \"two\": 2}","payloadType":"json","x":170,"y":340,"wires":[["eb3227c954debb95"]]},{"id":"eb3227c954debb95","type":"split","z":"2862bf5c278ff5bd","name":"Split map","splt":"\\n","spltType":"str","arraySplt":"1","arraySpltType":"len","stream":false,"addname":"","x":360,"y":340,"wires":[["8c82877cdaff8f0d"]]},{"id":"8c82877cdaff8f0d","type":"debug","z":"2862bf5c278ff5bd","name":"Print property values","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":560,"y":340,"wires":[]}]
{% endrenderFlow %}