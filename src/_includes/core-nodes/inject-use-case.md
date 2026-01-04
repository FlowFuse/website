Triggers flows by injecting messages manually or automatically.

## Where and why do we use the Inject node?

The Inject node starts flows either manually by clicking the button on its left side or automatically on a schedule. This makes it essential for testing and debugging flows, triggering automated tasks, initializing system state on startup, or running periodic data processing jobs. It's often the first node in a flow, providing the initial message that kicks off the entire process.

## Modes of operation

The Inject node can trigger flows in several different ways:

### Manual Trigger

Click the button on the left side of the node to send a message on demand. This is the most common mode for testing, debugging, or manually initiating processes. The message can contain any configured payload and properties.

### On Startup

Configure the node to inject a message automatically when Node-RED starts or when flows are deployed. This is useful for initializing flow state, setting default values, or starting background processes. You can add a delay before the injection occurs. When configured to inject once on start, a small '1' appears after the label inside the node.

### Interval

Send messages repeatedly at a fixed time interval. Set the interval in seconds, minutes, hours, or days. The interval must be greater than 1 and less than 2^31. When the repeat value is 0 or below, Node-RED will not display an error but the interval won't function.

### Scheduled

Inject messages at specific times using cron-like scheduling. This allows complex schedules like "every Monday at 9am" or "the first day of each month at midnight". Make sure to set the correct timezone in the [editor settings](/docs/user/instance-settings/#editor).

## How the node handles messages

The Inject node creates a new message object with configured properties. By default, it sets `msg.payload` to the current timestamp and `msg.topic` to an empty string, but you can configure any message properties.

Message properties can be set to:
- Static values (strings, numbers, booleans, JSON objects)
- Flow or global context variables
- Environment variables
- JSONata expressions for dynamic values
- Current timestamp
- Empty values

The node can set multiple message properties at once, allowing you to construct complete message objects that subsequent nodes need.

## Examples

### Inject on Node-RED start

To setup state when starting Node-RED, the inject node can be set to trigger a flow once with minimal delay. This example injects a timestamp immediately after deployment or restart.

{% renderFlow %}
[{"id":"73cc510bee68600f","type":"inject","z":"80987f27785245a7","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":true,"onceDelay":"0.1","topic":"","payload":"","payloadType":"date","x":190,"y":200,"wires":[["7f83bf24bdf7bc68"]]},{"id":"7f83bf24bdf7bc68","type":"debug","z":"80987f27785245a7","name":"Output once","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":370,"y":200,"wires":[]}]
{% endrenderFlow %}

### Run a flow daily at midnight

By selecting "at a specific time" in the Repeat section, the inject node can generate a message at set times. This example triggers at 23:59 (11:59 PM) every day, useful for daily data processing tasks.

{% renderFlow %}
[{"id":"998e844a7e50e275","type":"inject","z":"80987f27785245a7","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"59 23 * * *","once":false,"onceDelay":"0","topic":"","payload":"","payloadType":"date","x":190,"y":320,"wires":[["1e80f5229516e910"]]},{"id":"1e80f5229516e910","type":"debug","z":"80987f27785245a7","name":"Output daily at night","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":400,"y":320,"wires":[]}]
{% endrenderFlow %}

### Inject a static string

The Inject node can set the payload to static data like strings, numbers, or JSON objects. This example injects the string "Hello FlowFuse!" when triggered manually.

{% renderFlow %}
[{"id":"c0451e14f6b7eff0","type":"inject","z":"80987f27785245a7","name":"Inject a string","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello FlowFuse!","payloadType":"str","x":190,"y":280,"wires":[["9fbd8a0a9d21562a"]]},{"id":"9fbd8a0a9d21562a","type":"debug","z":"80987f27785245a7","name":"Output \"Hello FlowFuse\"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":410,"y":280,"wires":[]}]
{% endrenderFlow %}