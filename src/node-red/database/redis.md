---
eleventyNavigation:
  key: Redis
  parent: Database
meta:
  title: Using Redis with Node-RED
  description: Learn how to integrate Redis with Node-RED for fast data storage, pub/sub messaging, JSON handling, Lua scripting, and advanced Redis operations in Node-RED flows.
  keywords: nodered redis, node red redis, node-red-node-redis, redis nodered, redis node red
---

# {{ meta.title }}

Redis is a powerful in-memory data structure store that can be used as a database, cache, message broker, and streaming engine. When combined with Node-RED, Redis provides a fast and efficient way to store and retrieve data, manage session states, implement pub/sub messaging patterns, and share data across multiple Node-RED instances.

This guide will walk you through integrating Redis with Node-RED, from basic setup to advanced use cases.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following:

- Ensure you have a running Node-RED instance. The quickest and easiest way to have a manageable and scalable Node-RED instance is by [signing up on FlowFuse](https://app.flowfuse.com/) and creating an instance.
- Install the `node-red-contrib-redis` package using the Palette Manager.
- Make sure you have your Redis server details ready. 

### Configuring the Redis Connection

Before using Redis nodes, you need to configure the connection:

1. Drag any **redis** node onto your canvas
2. Double-click the node to open its configuration
3. Click the pencil icon next to "Server" to add a new Redis server configuration
4. Fill in your Redis server details:
   - **Name**: A friendly name for this connection
   - **Connection Options**: Can be a connection string (e.g., `redis://localhost:6379`) or a JSON object with IORedis options
   - **Cluster**: Enable if using Redis Cluster
5. Click **Add** to save the configuration
6. Click **Done** to close the node configuration

**Example Connection Options (JSON format):**

```json
{
  "host": "localhost",
  "port": 6379,
  "db": 0
}
```

### Understanding the Nodes in the Package

The `node-red-contrib-redis` package provides five specialized nodes:

- **redis-command**: Executes any Redis command like SET, GET, or hash operations
- **redis-in**: Subscribes to pub/sub channels or blocks on list operations for building queue consumers
- **redis-out**: Publishes messages or pushes to lists
- **redis-lua-script**: Runs Lua scripts on the server for atomic operations
- **redis-instance**: Injects a Redis client into your context for direct API access in function nodes

## Your First Redis Flow

Let's create a simple flow that stores and retrieves data from Redis.

### Storing Data

1. Drag an **inject** node onto the canvas and clear the Inject node so it has no `msg.payload` or `msg.topic` set.
2. Drag a **redis-command** node next to it
3. Double-click the redis-command node and configure:
   - **Command**: `set`
   - **Server**: Your Redis configuration
   - **Topic/Key**: `mykey`
   - **Params**: `["Hello from Node-RED"]` (as a JSON array)
4. Add a **debug** node and connect it to the output of the redis-command node
5. Connect the inject node to the redis-command node, then connect the redis-command node to the debug node
6. Click **Deploy**
7. Click the inject button

You should see "OK" in the debug panel, which means your data has been successfully stored in Redis!

### Retrieving Data

Now let's retrieve the data we just stored:

1. Add another cleared **inject** node to the canvas
2. Add a **redis-command** node and configure:
   - **Command**: `get`
   - **Server**: Your Redis configuration
   - **Topic/Key**: `mykey`
3. Add a **debug** node
4. Connect the inject node to the redis-command node, then connect the redis-command node to the debug node
5. Click **Deploy**
6. Click the inject button

You should now see "Hello from Node-RED" in the debug panel - the value you stored earlier!

## Working with JSON Data

Redis stores values as strings, so you need to convert JSON objects before storing them. You’ll also learn how to send the topic and value dynamically.

### Storing JSON

1. Drag an **inject** node onto the canvas.
2. Drag a **change** node onto the canvas and configure it to:

   - Set `msg.topic` to `sensor:data`
   - Set `msg.payload` to the following JSONata expression:

  ```json
  {
  "temperature": 22.5,
  "humidity": 65,
  "timestamp": $now()
  }
  ```
3. Drag a **JSON** node, This will **stringify** the JSON object so it can be stored in Redis.
4. Drag a **redis-command** node and set the command to `set`.
5. Connect the **inject** node to the **change** node, then the **change** node to the **JSON** node, and finally the **JSON** node to the **redis-command** node.
6. Click **Deploy**, then click the inject button to store the JSON in Redis.

### Reading JSON Back

1. Drag an **inject** node onto the canvas
2. Drag a **change** node and configure it to:
   - Set `msg.topic` to string `sensor:data`
   - Set `msg.payload` to JSON `[]`
3. Drag a **redis-command** node and set command to `get`
4. Drag a **json** node (this converts between JSON string and object)
5. Drag a **debug** node
6. Connect the inject node to the change node, then connect the change node to the redis-command node, then connect the redis-command node to the json node, and finally connect the json node to the debug node
7. Click **Deploy** and then click the inject button

Check the debug panel. You should see your JSON object with temperature, humidity, and timestamp.

If you want to explore more Redis commands beyond `SET` and `GET`, check the official [Redis command reference](https://redis.io/docs/latest/commands/).

## Pub/Sub Messaging

Redis pub/sub allows different Node-RED flows or instances to communicate in real-time. One flow publishes a message, and any subscribed flows receive it instantly.

### Publishing Temperature Alerts

Let's create a flow that publishes alerts when temperature exceeds a threshold:

1. Drag an **inject** node onto the canvas
2. Drag a **change** node and set `msg.payload` to string `"ALERT: Temperature critical in Zone A: 85°C - Equipment shutdown initiated"`
3. Drag a **redis-out** node and configure:
   - **Method**: `PUBLISH`
   - **Topic**: `alerts:temperature`
   - **Server**: Your Redis configuration
4. Connect the inject node to the change node, then connect the change node to the redis-out node
5. Click **Deploy**

### Subscribing to Alert Messages

Now create another flow that listens for these alerts (this could be on the same or a different Node-RED instance monitoring the facility):

1. Drag a **redis-in** node onto the canvas and configure it:

   - **Method**: `SUBSCRIBE`
   - **Topic**: `alerts:temperature`
   - **Timeout**: *(optional)* How long the node should listen for messages before automatically stopping.
   - **Server**: Your Redis connection
2. Drag a **debug** node
3. Connect the **redis-in** node to the **debug** node
4. Click **Deploy**

When you click the Inject button in your publisher flow, the alert message will appear in the Debug panel. The subscriber will automatically receive all alerts published to the channel until the timeout (if configured) expires.

## Using Lua Scripts for Atomic Operations

Redis Lua scripts allow you to execute multiple Redis operations atomically on the server side. This ensures data consistency and reduces network overhead by bundling multiple commands into a single server-side operation.

### Atomic Counter with Rollback

Let's create an inventory system that atomically checks stock and decrements it only if available:

1. Drag an **inject** node onto the canvas
2. Drag a **function** node to prepare the script arguments:

```javascript
msg.productId = "inventory:product:SKU-12345";
msg.quantityRequested = 3;

msg.payload = [
    msg.productId,  
    msg.quantityRequested
];

return msg;
```

3. Drag a **redis-lua-script** node and configure:
   - **Keys**: `1`
   - **Script**:

```lua
local key = KEYS[1]
local requested = tonumber(ARGV[1])

local current = tonumber(redis.call('GET', key) or "0")

if current >= requested then
    redis.call('DECRBY', key, requested)
    return {1, current - requested}
else
    return {0, current}
end
```

   - **Server**: Your Redis configuration

4. Drag a **function** node to process the result:

```javascript
const result = msg.payload;
const success = result[0];
const remaining = result[1];

if (success === 1) {
    msg.payload = {
        status: "success",
        message: `Order processed. Remaining stock: ${remaining}`,
        remaining: remaining
    };
} else {
    msg.payload = {
        status: "failed",
        message: `Insufficient stock. Available: ${remaining}`,
        available: remaining
    };
}
return msg;
```

5. Drag a **debug** node
6. Connect the inject node to the first function node, then to the redis-lua-script node, then to the second function node, and finally to the debug node
7. Click **Deploy**

Before testing, set the initial inventory using a redis-command node: Command = `SET`, Topic/Key = `inventory:product:SKU-12345`, Params = `10`. Then trigger the Inject node to initialize the value and process orders atomically.

## Direct Redis Client Access with redis-instance

The redis-instance node provides direct access to the IORedis client API in function nodes. This is useful for advanced operations, custom commands, or when you need programmatic control over Redis operations.

### Setting Up Redis Instance in Context

1. Drag a **redis-instance** node onto the canvas and configure:
   - **Name**: `redis`
   - **Server**: Your Redis configuration
   - **Topic**: Enter a topic name to identify the Redis instance in the chosen context (e.g., `redis`). This is the name you will use in function nodes to access the client.
   - **Context**: `flow` (makes it available to all nodes in the flow)
2. Click **Deploy**

The Redis client is now available in the flow context for use in function nodes.

### Advanced Pipeline Operations

Pipelines allow you to send multiple commands to Redis in a single network round trip, significantly improving performance for batch operations:

1. Drag an **inject** node onto the canvas
2. Drag a **function** node with this code:

```javascript
const redis = flow.get('redis'); // Replace 'redis' with your topic if different

// Create a pipeline
const pipeline = redis.pipeline();

// Add multiple sensor readings in one batch
const sensors = [
    { id: 'temp-01', value: 23.5, unit: 'C' },
    { id: 'temp-02', value: 24.1, unit: 'C' },
    { id: 'humidity-01', value: 65, unit: '%' },
    { id: 'pressure-01', value: 1013, unit: 'hPa' }
];

sensors.forEach(sensor => {
    const key = `sensor:${sensor.id}:latest`;
    const data = JSON.stringify({
        value: sensor.value,
        unit: sensor.unit,
        timestamp: Date.now()
    });
    pipeline.set(key, data, 'EX', 3600); // Expire in 1 hour
});

// Execute all commands at once
pipeline.exec((err, results) => {
    if (err) {
        node.error(err, msg);
        return;
    }
    
    msg.payload = {
        message: `Stored ${results.length} sensor readings`,
        results: results
    };
    node.send(msg);
});
```

3. Drag a **debug** node
4. Connect the inject node to the function node, then connect the function node to the debug node
5. Click **Deploy** and click the inject button

All sensor readings are stored in a single efficient batch operation.

### Scanning Keys with Cursor

When you need to find keys matching a pattern without blocking Redis (important for production systems), use the SCAN command:

1. Drag an **inject** node onto the canvas
2. Drag a **function** node with this code:

```javascript
const redis = flow.get('redis'); // Replace 'redis' with your topic if different

async function scanKeys() {
    const matchPattern = 'sensor:*:latest';
    const allKeys = [];
    let cursor = '0';
    
    try {
        do {
            // Scan with pattern matching
            const result = await redis.scan(
                cursor,
                'MATCH', matchPattern,
                'COUNT', 100
            );
            
            cursor = result[0];
            const keys = result[1];
            allKeys.push(...keys);
            
        } while (cursor !== '0');
        
        msg.payload = {
            pattern: matchPattern,
            count: allKeys.length,
            keys: allKeys
        };
        
        node.send(msg);
        
    } catch (err) {
        node.error(err, msg);
    }
}

scanKeys();
```

3. Drag a **debug** node
4. Connect the inject node to the function node, then connect the function node to the debug node
5. Click **Deploy** and click the inject button

This safely scans all sensor keys without blocking Redis operations, making it suitable for production environments with large datasets.

For more Redis commands, patterns, and advanced capabilities, refer to the [official Redis documentation](https://redis.io/docs/latest/).

Below is the complete example that we covered in this document.

{% renderFlow %}
[{"id":"2c33ebeb73062ab3","type":"group","z":"d4f60c79eff5211d","name":"Your First Redis Flow","style":{"label":true},"nodes":["e5f3326ef736cef6","8486e88d8623b42a","d1ebde22d0e224a8","22db25c60af16ab2","fe2be532c53402b3","ebc1e8fc0f1ba2d6","adb95c63d206c633"],"x":514,"y":359,"w":712,"h":162},{"id":"e5f3326ef736cef6","type":"redis-command","z":"d4f60c79eff5211d","g":"2c33ebeb73062ab3","server":"e370dc92b39a7ba4","command":"SET","name":"","topic":"mykey","params":"[\"Hello from Node-RED\"]","paramsType":"json","payloadType":"json","block":false,"x":810,"y":400,"wires":[["8486e88d8623b42a"]]},{"id":"8486e88d8623b42a","type":"debug","z":"d4f60c79eff5211d","g":"2c33ebeb73062ab3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":970,"y":400,"wires":[]},{"id":"d1ebde22d0e224a8","type":"redis-command","z":"d4f60c79eff5211d","g":"2c33ebeb73062ab3","server":"e370dc92b39a7ba4","command":"GET","name":"","topic":"","params":"[]","paramsType":"json","payloadType":"json","block":false,"x":1000,"y":480,"wires":[["22db25c60af16ab2"]]},{"id":"22db25c60af16ab2","type":"debug","z":"d4f60c79eff5211d","g":"2c33ebeb73062ab3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":480,"wires":[]},{"id":"fe2be532c53402b3","type":"change","z":"d4f60c79eff5211d","g":"2c33ebeb73062ab3","name":"Set Key for GET","rules":[{"t":"set","p":"topic","pt":"msg","to":"mykey","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"[]","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":800,"y":480,"wires":[["d1ebde22d0e224a8"]]},{"id":"ebc1e8fc0f1ba2d6","type":"inject","z":"d4f60c79eff5211d","g":"2c33ebeb73062ab3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":610,"y":400,"wires":[["e5f3326ef736cef6"]]},{"id":"adb95c63d206c633","type":"inject","z":"d4f60c79eff5211d","g":"2c33ebeb73062ab3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":610,"y":480,"wires":[["fe2be532c53402b3"]]},{"id":"e370dc92b39a7ba4","type":"redis-config","name":"Local","options":"{\"host\":\"localhost\",\"port\":6379,\"db\":0}","cluster":false,"optionsType":"json"},{"id":"5e2842a4730589c0","type":"group","z":"d4f60c79eff5211d","name":"Working with JSON Data","style":{"label":true},"nodes":["6acc07a393e5ee26","3255e8a9122253b7","a3b0b4a74133778e","4faba929a84fb358","e5c359b934174c8e","abf011c2e81960c4","22a2b54caae5869d","b9598f313e2a9fd2","d0051f637fd1621a","9e59f275496d722d"],"x":514,"y":539,"w":852,"h":162},{"id":"6acc07a393e5ee26","type":"redis-command","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","server":"e370dc92b39a7ba4","command":"SET","name":"","topic":"","params":"[]","paramsType":"json","payloadType":"json","block":false,"x":1140,"y":580,"wires":[["3255e8a9122253b7"]]},{"id":"3255e8a9122253b7","type":"debug","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1270,"y":580,"wires":[]},{"id":"a3b0b4a74133778e","type":"inject","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":610,"y":580,"wires":[["d0051f637fd1621a"]]},{"id":"4faba929a84fb358","type":"redis-command","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","server":"e370dc92b39a7ba4","command":"GET","name":"","topic":"","params":"[]","paramsType":"json","payloadType":"json","block":false,"x":1000,"y":660,"wires":[["b9598f313e2a9fd2"]]},{"id":"e5c359b934174c8e","type":"debug","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1270,"y":660,"wires":[]},{"id":"abf011c2e81960c4","type":"change","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"Set Key for GET","rules":[{"t":"set","p":"topic","pt":"msg","to":"sensor:data","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"[]","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":800,"y":660,"wires":[["4faba929a84fb358"]]},{"id":"22a2b54caae5869d","type":"inject","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":610,"y":660,"wires":[["abf011c2e81960c4"]]},{"id":"b9598f313e2a9fd2","type":"json","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"","property":"payload","action":"","pretty":false,"x":1130,"y":660,"wires":[["e5c359b934174c8e"]]},{"id":"d0051f637fd1621a","type":"change","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"Set Key","rules":[{"t":"set","p":"topic","pt":"msg","to":"sensor:data","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"{\t   \"temperature\": 22.5,\t   \"humidity\": 65,\t   \"timestamp\": $now()\t}","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":780,"y":580,"wires":[["9e59f275496d722d"]]},{"id":"9e59f275496d722d","type":"json","z":"d4f60c79eff5211d","g":"5e2842a4730589c0","name":"","property":"payload","action":"","pretty":false,"x":990,"y":580,"wires":[["6acc07a393e5ee26"]]},{"id":"39de5da95585227f","type":"group","z":"d4f60c79eff5211d","name":"Pub/Sub Messaging","style":{"label":true},"nodes":["7756558fd542d657","bf2dc26107eff967","9856ddb8e7bc28e8","bcd9b22fd67ecf7c","22f0526fab3b589b"],"x":514,"y":719,"w":632,"h":162},{"id":"7756558fd542d657","type":"inject","z":"d4f60c79eff5211d","g":"39de5da95585227f","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":610,"y":760,"wires":[["9856ddb8e7bc28e8"]]},{"id":"bf2dc26107eff967","type":"redis-out","z":"d4f60c79eff5211d","g":"39de5da95585227f","server":"e370dc92b39a7ba4","command":"publish","name":"","topic":"alerts:temperature","obj":true,"x":1030,"y":760,"wires":[]},{"id":"9856ddb8e7bc28e8","type":"change","z":"d4f60c79eff5211d","g":"39de5da95585227f","name":"Set Alert Message","rules":[{"t":"set","p":"payload","pt":"msg","to":"ALERT: Temperature critical in Zone A: 85°C - Equipment shutdown initiated","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":810,"y":760,"wires":[["bf2dc26107eff967"]]},{"id":"bcd9b22fd67ecf7c","type":"redis-in","z":"d4f60c79eff5211d","g":"39de5da95585227f","server":"e370dc92b39a7ba4","command":"subscribe","name":"","topic":"alerts:temperature","obj":true,"timeout":0,"x":630,"y":840,"wires":[["22f0526fab3b589b"]]},{"id":"22f0526fab3b589b","type":"debug","z":"d4f60c79eff5211d","g":"39de5da95585227f","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":990,"y":840,"wires":[]},{"id":"adc4b0df6b0e84e3","type":"group","z":"d4f60c79eff5211d","name":"Using Lua Scripts for Atomic Operations","style":{"label":true},"nodes":["ca8a523710138a11","8804755befa1fbc8","0898e80e28b7d276","0b16690b3c2c10df","9a03ebdea51eefdc","c641d8e54620a73a","7c11a5f1c9716527","a07a025db962be50"],"x":514,"y":899,"w":1112,"h":142},{"id":"ca8a523710138a11","type":"inject","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":610,"y":1000,"wires":[["8804755befa1fbc8"]]},{"id":"8804755befa1fbc8","type":"function","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","name":"Prepare Lua Script Arguments","func":"// msg.payload format: [keys..., args...]\n// First element(s) are the keys, remaining elements are arguments\nmsg.payload = [\n    \"inventory:product:SKU-12345\",  // KEYS[1]\n    3                                // ARGV[1] - quantity requested\n];\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":850,"y":1000,"wires":[["0898e80e28b7d276"]]},{"id":"0898e80e28b7d276","type":"redis-lua-script","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","server":"e370dc92b39a7ba4","name":"","keyval":"1","func":"local key = KEYS[1]\nlocal requested = tonumber(ARGV[1])\n\nlocal current = tonumber(redis.call('GET', key) or \"0\")\n\nif current >= requested then\n    redis.call('DECRBY', key, requested)\n    return {1, current - requested}\nelse\n    return {0, current}\nend","stored":false,"block":false,"x":1140,"y":1000,"wires":[["0b16690b3c2c10df"]]},{"id":"0b16690b3c2c10df","type":"function","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","name":"Format Lua Script Response","func":"const result = msg.payload;\nconst success = result[0];\nconst remaining = result[1];\n\nif (success === 1) {\n    msg.payload = {\n        status: \"success\",\n        message: `Order processed. Remaining stock: ${remaining}`,\n        remaining: remaining\n    };\n} else {\n    msg.payload = {\n        status: \"failed\",\n        message: `Insufficient stock. Available: ${remaining}`,\n        available: remaining\n    };\n}\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":1340,"y":1000,"wires":[["9a03ebdea51eefdc"]]},{"id":"9a03ebdea51eefdc","type":"debug","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1530,"y":1000,"wires":[]},{"id":"c641d8e54620a73a","type":"redis-command","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","server":"e370dc92b39a7ba4","command":"SET","name":"","topic":"inventory:product:SKU-12345","params":"[10]","paramsType":"json","payloadType":"json","block":false,"x":880,"y":940,"wires":[["7c11a5f1c9716527"]]},{"id":"7c11a5f1c9716527","type":"debug","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":940,"wires":[]},{"id":"a07a025db962be50","type":"inject","z":"d4f60c79eff5211d","g":"adc4b0df6b0e84e3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":610,"y":940,"wires":[["c641d8e54620a73a"]]},{"id":"01a96fb2044d723f","type":"group","z":"d4f60c79eff5211d","name":"Direct Redis Client Access with redis-instance","style":{"label":true},"nodes":["745f41f352fa2212","a9ec9a8a5a66daa3","e3a5634ef0ebcb78","5192081309e08db9","4f169053bbd7add9","15f0b0462f795828","4a394700c6914961"],"x":514,"y":1059,"w":732,"h":222},{"id":"745f41f352fa2212","type":"redis-instance","z":"d4f60c79eff5211d","g":"01a96fb2044d723f","server":"e370dc92b39a7ba4","name":"","topic":"redis","location":"flow","x":590,"y":1100,"wires":[]},{"id":"a9ec9a8a5a66daa3","type":"inject","z":"d4f60c79eff5211d","g":"01a96fb2044d723f","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":620,"y":1180,"wires":[["e3a5634ef0ebcb78"]]},{"id":"e3a5634ef0ebcb78","type":"function","z":"d4f60c79eff5211d","g":"01a96fb2044d723f","name":"Batch Store Sensor Readings (Pipeline)","func":"const redis = flow.get('redis');\n\n// Create a pipeline\nconst pipeline = redis.pipeline();\n\n// Add multiple sensor readings in one batch\nconst sensors = [\n    { id: 'temp-01', value: 23.5, unit: 'C' },\n    { id: 'temp-02', value: 24.1, unit: 'C' },\n    { id: 'humidity-01', value: 65, unit: '%' },\n    { id: 'pressure-01', value: 1013, unit: 'hPa' }\n];\n\nsensors.forEach(sensor => {\n    const key = `sensor:${sensor.id}:latest`;\n    const data = JSON.stringify({\n        value: sensor.value,\n        unit: sensor.unit,\n        timestamp: Date.now()\n    });\n    pipeline.set(key, data, 'EX', 3600); // Expire in 1 hour\n});\n\n// Execute all commands at once\npipeline.exec((err, results) => {\n    if (err) {\n        node.error(err, msg);\n        return;\n    }\n\n    msg.payload = {\n        message: `Stored ${results.length} sensor readings`,\n        results: results\n    };\n    node.send(msg);\n});","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":880,"y":1180,"wires":[["5192081309e08db9"]]},{"id":"5192081309e08db9","type":"debug","z":"d4f60c79eff5211d","g":"01a96fb2044d723f","name":"debug 8","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1140,"y":1180,"wires":[]},{"id":"4f169053bbd7add9","type":"inject","z":"d4f60c79eff5211d","g":"01a96fb2044d723f","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":620,"y":1240,"wires":[["15f0b0462f795828"]]},{"id":"15f0b0462f795828","type":"function","z":"d4f60c79eff5211d","g":"01a96fb2044d723f","name":"Scan and List Latest Sensor Keys","func":"const redis = flow.get('redis');\n\nasync function scanKeys() {\n    const matchPattern = 'sensor:*:latest';\n    const allKeys = [];\n    let cursor = '0';\n\n    try {\n        do {\n            // Scan with pattern matching\n            const result = await redis.scan(\n                cursor,\n                'MATCH', matchPattern,\n                'COUNT', 100\n            );\n\n            cursor = result[0];\n            const keys = result[1];\n            allKeys.push(...keys);\n\n        } while (cursor !== '0');\n\n        msg.payload = {\n            pattern: matchPattern,\n            count: allKeys.length,\n            keys: allKeys\n        };\n\n        node.send(msg);\n\n    } catch (err) {\n        node.error(err, msg);\n    }\n}\n\nscanKeys();","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":860,"y":1240,"wires":[["4a394700c6914961"]]},{"id":"4a394700c6914961","type":"debug","z":"d4f60c79eff5211d","g":"01a96fb2044d723f","name":"debug 9","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1140,"y":1240,"wires":[]},{"id":"d7c53907f5b90ca5","type":"global-config","env":[],"modules":{"node-red-contrib-redis":"1.4.0"}}]
{% endrenderFlow %}
