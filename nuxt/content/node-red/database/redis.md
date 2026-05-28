---
title: "Using Redis with Node-RED (2026 Updated)"
description: "Learn how to integrate Redis with Node-RED for fast data storage, pub/sub messaging, JSON handling, Lua scripting, and advanced Redis operations in Node-RED flows."
---

# {{ meta.title }}

Redis is a powerful in-memory data structure store that can be used as a database, cache, message broker, and streaming engine. When combined with Node-RED, Redis provides a fast and efficient way to store and retrieve data, manage session states, implement pub/sub messaging patterns, and share data across multiple Node-RED instances.

This documentation will walk you through integrating Redis with Node-RED, from basic setup to advanced use cases.

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



::render-flow
---
height: 200
flow: "W3siaWQiOiIyYzMzZWJlYjczMDYyYWIzIiwidHlwZSI6Imdyb3VwIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJuYW1lIjoiWW91ciBGaXJzdCBSZWRpcyBGbG93Iiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyJlNWYzMzI2ZWY3MzZjZWY2IiwiODQ4NmU4OGQ4NjIzYjQyYSIsImQxZWJkZTIyZDBlMjI0YTgiLCIyMmRiMjVjNjBhZjE2YWIyIiwiZmUyYmU1MzJjNTM0MDJiMyIsImViYzFlOGZjMGYxYmEyZDYiLCJhZGI5NWM2M2QyMDZjNjMzIl0sIngiOjUxNCwieSI6MzU5LCJ3Ijo3MTIsImgiOjE2Mn0seyJpZCI6ImU1ZjMzMjZlZjczNmNlZjYiLCJ0eXBlIjoicmVkaXMtY29tbWFuZCIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjJjMzNlYmViNzMwNjJhYjMiLCJzZXJ2ZXIiOiJlMzcwZGM5MmIzOWE3YmE0IiwiY29tbWFuZCI6IlNFVCIsIm5hbWUiOiIiLCJ0b3BpYyI6Im15a2V5IiwicGFyYW1zIjoiW1wiSGVsbG8gZnJvbSBOb2RlLVJFRFwiXSIsInBhcmFtc1R5cGUiOiJqc29uIiwicGF5bG9hZFR5cGUiOiJqc29uIiwiYmxvY2siOmZhbHNlLCJ4Ijo4MTAsInkiOjQwMCwid2lyZXMiOltbIjg0ODZlODhkODYyM2I0MmEiXV19LHsiaWQiOiI4NDg2ZTg4ZDg2MjNiNDJhIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMmMzM2ViZWI3MzA2MmFiMyIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTcwLCJ5Ijo0MDAsIndpcmVzIjpbXX0seyJpZCI6ImQxZWJkZTIyZDBlMjI0YTgiLCJ0eXBlIjoicmVkaXMtY29tbWFuZCIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjJjMzNlYmViNzMwNjJhYjMiLCJzZXJ2ZXIiOiJlMzcwZGM5MmIzOWE3YmE0IiwiY29tbWFuZCI6IkdFVCIsIm5hbWUiOiIiLCJ0b3BpYyI6IiIsInBhcmFtcyI6IltdIiwicGFyYW1zVHlwZSI6Impzb24iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJibG9jayI6ZmFsc2UsIngiOjEwMDAsInkiOjQ4MCwid2lyZXMiOltbIjIyZGIyNWM2MGFmMTZhYjIiXV19LHsiaWQiOiIyMmRiMjVjNjBhZjE2YWIyIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMmMzM2ViZWI3MzA2MmFiMyIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTEzMCwieSI6NDgwLCJ3aXJlcyI6W119LHsiaWQiOiJmZTJiZTUzMmM1MzQwMmIzIiwidHlwZSI6ImNoYW5nZSIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjJjMzNlYmViNzMwNjJhYjMiLCJuYW1lIjoiU2V0IEtleSBmb3IgR0VUIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoidG9waWMiLCJwdCI6Im1zZyIsInRvIjoibXlrZXkiLCJ0b3QiOiJzdHIifSx7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJbXSIsInRvdCI6Impzb24ifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6ODAwLCJ5Ijo0ODAsIndpcmVzIjpbWyJkMWViZGUyMmQwZTIyNGE4Il1dfSx7ImlkIjoiZWJjMWU4ZmMwZjFiYTJkNiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiIyYzMzZWJlYjczMDYyYWIzIiwibmFtZSI6IiIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4Ijo2MTAsInkiOjQwMCwid2lyZXMiOltbImU1ZjMzMjZlZjczNmNlZjYiXV19LHsiaWQiOiJhZGI5NWM2M2QyMDZjNjMzIiwidHlwZSI6ImluamVjdCIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjJjMzNlYmViNzMwNjJhYjMiLCJuYW1lIjoiIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjYxMCwieSI6NDgwLCJ3aXJlcyI6W1siZmUyYmU1MzJjNTM0MDJiMyJdXX0seyJpZCI6ImUzNzBkYzkyYjM5YTdiYTQiLCJ0eXBlIjoicmVkaXMtY29uZmlnIiwibmFtZSI6IkxvY2FsIiwib3B0aW9ucyI6IntcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjYzNzksXCJkYlwiOjB9IiwiY2x1c3RlciI6ZmFsc2UsIm9wdGlvbnNUeXBlIjoianNvbiJ9LHsiaWQiOiI1ZTI4NDJhNDczMDU4OWMwIiwidHlwZSI6Imdyb3VwIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJuYW1lIjoiV29ya2luZyB3aXRoIEpTT04gRGF0YSIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiNmFjYzA3YTM5M2U1ZWUyNiIsIjMyNTVlOGE5MTIyMjUzYjciLCJhM2IwYjRhNzQxMzM3NzhlIiwiNGZhYmE5MjlhODRmYjM1OCIsImU1YzM1OWI5MzQxNzRjOGUiLCJhYmYwMTFjMmU4MTk2MGM0IiwiMjJhMmI1NGNhYWU1ODY5ZCIsImI5NTk4ZjMxM2UyYTlmZDIiLCJkMDA1MWY2MzdmZDE2MjFhIiwiOWU1OWYyNzU0OTZkNzIyZCJdLCJ4Ijo1MTQsInkiOjUzOSwidyI6ODUyLCJoIjoxNjJ9LHsiaWQiOiI2YWNjMDdhMzkzZTVlZTI2IiwidHlwZSI6InJlZGlzLWNvbW1hbmQiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiI1ZTI4NDJhNDczMDU4OWMwIiwic2VydmVyIjoiZTM3MGRjOTJiMzlhN2JhNCIsImNvbW1hbmQiOiJTRVQiLCJuYW1lIjoiIiwidG9waWMiOiIiLCJwYXJhbXMiOiJbXSIsInBhcmFtc1R5cGUiOiJqc29uIiwicGF5bG9hZFR5cGUiOiJqc29uIiwiYmxvY2siOmZhbHNlLCJ4IjoxMTQwLCJ5Ijo1ODAsIndpcmVzIjpbWyIzMjU1ZThhOTEyMjI1M2I3Il1dfSx7ImlkIjoiMzI1NWU4YTkxMjIyNTNiNyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjVlMjg0MmE0NzMwNTg5YzAiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEyNzAsInkiOjU4MCwid2lyZXMiOltdfSx7ImlkIjoiYTNiMGI0YTc0MTMzNzc4ZSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiI1ZTI4NDJhNDczMDU4OWMwIiwibmFtZSI6IiIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4Ijo2MTAsInkiOjU4MCwid2lyZXMiOltbImQwMDUxZjYzN2ZkMTYyMWEiXV19LHsiaWQiOiI0ZmFiYTkyOWE4NGZiMzU4IiwidHlwZSI6InJlZGlzLWNvbW1hbmQiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiI1ZTI4NDJhNDczMDU4OWMwIiwic2VydmVyIjoiZTM3MGRjOTJiMzlhN2JhNCIsImNvbW1hbmQiOiJHRVQiLCJuYW1lIjoiIiwidG9waWMiOiIiLCJwYXJhbXMiOiJbXSIsInBhcmFtc1R5cGUiOiJqc29uIiwicGF5bG9hZFR5cGUiOiJqc29uIiwiYmxvY2siOmZhbHNlLCJ4IjoxMDAwLCJ5Ijo2NjAsIndpcmVzIjpbWyJiOTU5OGYzMTNlMmE5ZmQyIl1dfSx7ImlkIjoiZTVjMzU5YjkzNDE3NGM4ZSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjVlMjg0MmE0NzMwNTg5YzAiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEyNzAsInkiOjY2MCwid2lyZXMiOltdfSx7ImlkIjoiYWJmMDExYzJlODE5NjBjNCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiI1ZTI4NDJhNDczMDU4OWMwIiwibmFtZSI6IlNldCBLZXkgZm9yIEdFVCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InRvcGljIiwicHQiOiJtc2ciLCJ0byI6InNlbnNvcjpkYXRhIiwidG90Ijoic3RyIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiW10iLCJ0b3QiOiJqc29uIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjgwMCwieSI6NjYwLCJ3aXJlcyI6W1siNGZhYmE5MjlhODRmYjM1OCJdXX0seyJpZCI6IjIyYTJiNTRjYWFlNTg2OWQiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiNWUyODQyYTQ3MzA1ODljMCIsIm5hbWUiOiIiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6NjEwLCJ5Ijo2NjAsIndpcmVzIjpbWyJhYmYwMTFjMmU4MTk2MGM0Il1dfSx7ImlkIjoiYjk1OThmMzEzZTJhOWZkMiIsInR5cGUiOiJqc29uIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiNWUyODQyYTQ3MzA1ODljMCIsIm5hbWUiOiIiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJhY3Rpb24iOiIiLCJwcmV0dHkiOmZhbHNlLCJ4IjoxMTMwLCJ5Ijo2NjAsIndpcmVzIjpbWyJlNWMzNTliOTM0MTc0YzhlIl1dfSx7ImlkIjoiZDAwNTFmNjM3ZmQxNjIxYSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiI1ZTI4NDJhNDczMDU4OWMwIiwibmFtZSI6IlNldCBLZXkiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJ0b3BpYyIsInB0IjoibXNnIiwidG8iOiJzZW5zb3I6ZGF0YSIsInRvdCI6InN0ciJ9LHsidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IntcdCAgIFwidGVtcGVyYXR1cmVcIjogMjIuNSxcdCAgIFwiaHVtaWRpdHlcIjogNjUsXHQgICBcInRpbWVzdGFtcFwiOiAkbm93KClcdH0iLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjc4MCwieSI6NTgwLCJ3aXJlcyI6W1siOWU1OWYyNzU0OTZkNzIyZCJdXX0seyJpZCI6IjllNTlmMjc1NDk2ZDcyMmQiLCJ0eXBlIjoianNvbiIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjVlMjg0MmE0NzMwNTg5YzAiLCJuYW1lIjoiIiwicHJvcGVydHkiOiJwYXlsb2FkIiwiYWN0aW9uIjoiIiwicHJldHR5IjpmYWxzZSwieCI6OTkwLCJ5Ijo1ODAsIndpcmVzIjpbWyI2YWNjMDdhMzkzZTVlZTI2Il1dfSx7ImlkIjoiMzlkZTVkYTk1NTg1MjI3ZiIsInR5cGUiOiJncm91cCIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwibmFtZSI6IlB1Yi9TdWIgTWVzc2FnaW5nIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI3NzU2NTU4ZmQ1NDJkNjU3IiwiYmYyZGMyNjEwN2VmZjk2NyIsIjk4NTZkZGI4ZTdiYzI4ZTgiLCJiY2Q5YjIyZmQ2N2VjZjdjIiwiMjJmMDUyNmZhYjNiNTg5YiJdLCJ4Ijo1MTQsInkiOjcxOSwidyI6NjMyLCJoIjoxNjJ9LHsiaWQiOiI3NzU2NTU4ZmQ1NDJkNjU3IiwidHlwZSI6ImluamVjdCIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjM5ZGU1ZGE5NTU4NTIyN2YiLCJuYW1lIjoiIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjYxMCwieSI6NzYwLCJ3aXJlcyI6W1siOTg1NmRkYjhlN2JjMjhlOCJdXX0seyJpZCI6ImJmMmRjMjYxMDdlZmY5NjciLCJ0eXBlIjoicmVkaXMtb3V0IiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMzlkZTVkYTk1NTg1MjI3ZiIsInNlcnZlciI6ImUzNzBkYzkyYjM5YTdiYTQiLCJjb21tYW5kIjoicHVibGlzaCIsIm5hbWUiOiIiLCJ0b3BpYyI6ImFsZXJ0czp0ZW1wZXJhdHVyZSIsIm9iaiI6dHJ1ZSwieCI6MTAzMCwieSI6NzYwLCJ3aXJlcyI6W119LHsiaWQiOiI5ODU2ZGRiOGU3YmMyOGU4IiwidHlwZSI6ImNoYW5nZSIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjM5ZGU1ZGE5NTU4NTIyN2YiLCJuYW1lIjoiU2V0IEFsZXJ0IE1lc3NhZ2UiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IkFMRVJUOiBUZW1wZXJhdHVyZSBjcml0aWNhbCBpbiBab25lIEE6IDg1wrBDIC0gRXF1aXBtZW50IHNodXRkb3duIGluaXRpYXRlZCIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo4MTAsInkiOjc2MCwid2lyZXMiOltbImJmMmRjMjYxMDdlZmY5NjciXV19LHsiaWQiOiJiY2Q5YjIyZmQ2N2VjZjdjIiwidHlwZSI6InJlZGlzLWluIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMzlkZTVkYTk1NTg1MjI3ZiIsInNlcnZlciI6ImUzNzBkYzkyYjM5YTdiYTQiLCJjb21tYW5kIjoic3Vic2NyaWJlIiwibmFtZSI6IiIsInRvcGljIjoiYWxlcnRzOnRlbXBlcmF0dXJlIiwib2JqIjp0cnVlLCJ0aW1lb3V0IjowLCJ4Ijo2MzAsInkiOjg0MCwid2lyZXMiOltbIjIyZjA1MjZmYWIzYjU4OWIiXV19LHsiaWQiOiIyMmYwNTI2ZmFiM2I1ODliIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMzlkZTVkYTk1NTg1MjI3ZiIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTkwLCJ5Ijo4NDAsIndpcmVzIjpbXX0seyJpZCI6ImFkYzRiMGRmNmIwZTg0ZTMiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsIm5hbWUiOiJVc2luZyBMdWEgU2NyaXB0cyBmb3IgQXRvbWljIE9wZXJhdGlvbnMiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbImNhOGE1MjM3MTAxMzhhMTEiLCI4ODA0NzU1YmVmYTFmYmM4IiwiMDg5OGU4MGUyOGI3ZDI3NiIsIjBiMTY2OTBiM2MyYzEwZGYiLCI5YTAzZWJkZWE1MWVlZmRjIiwiYzY0MWQ4ZTU0NjIwYTczYSIsIjdjMTFhNWYxYzk3MTY1MjciLCJhMDdhMDI1ZGI5NjJiZTUwIl0sIngiOjUxNCwieSI6ODk5LCJ3IjoxMTEyLCJoIjoxNDJ9LHsiaWQiOiJjYThhNTIzNzEwMTM4YTExIiwidHlwZSI6ImluamVjdCIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6ImFkYzRiMGRmNmIwZTg0ZTMiLCJuYW1lIjoiIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjYxMCwieSI6MTAwMCwid2lyZXMiOltbIjg4MDQ3NTViZWZhMWZiYzgiXV19LHsiaWQiOiI4ODA0NzU1YmVmYTFmYmM4IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiYWRjNGIwZGY2YjBlODRlMyIsIm5hbWUiOiJQcmVwYXJlIEx1YSBTY3JpcHQgQXJndW1lbnRzIiwiZnVuYyI6Ii8vIG1zZy5wYXlsb2FkIGZvcm1hdDogW2tleXMuLi4sIGFyZ3MuLi5dXG4vLyBGaXJzdCBlbGVtZW50KHMpIGFyZSB0aGUga2V5cywgcmVtYWluaW5nIGVsZW1lbnRzIGFyZSBhcmd1bWVudHNcbm1zZy5wYXlsb2FkID0gW1xuICAgIFwiaW52ZW50b3J5OnByb2R1Y3Q6U0tVLTEyMzQ1XCIsICAvLyBLRVlTWzFdXG4gICAgMyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQVJHVlsxXSAtIHF1YW50aXR5IHJlcXVlc3RlZFxuXTtcbnJldHVybiBtc2c7Iiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo4NTAsInkiOjEwMDAsIndpcmVzIjpbWyIwODk4ZTgwZTI4YjdkMjc2Il1dfSx7ImlkIjoiMDg5OGU4MGUyOGI3ZDI3NiIsInR5cGUiOiJyZWRpcy1sdWEtc2NyaXB0IiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiYWRjNGIwZGY2YjBlODRlMyIsInNlcnZlciI6ImUzNzBkYzkyYjM5YTdiYTQiLCJuYW1lIjoiIiwia2V5dmFsIjoiMSIsImZ1bmMiOiJsb2NhbCBrZXkgPSBLRVlTWzFdXG5sb2NhbCByZXF1ZXN0ZWQgPSB0b251bWJlcihBUkdWWzFdKVxuXG5sb2NhbCBjdXJyZW50ID0gdG9udW1iZXIocmVkaXMuY2FsbCgnR0VUJywga2V5KSBvciBcIjBcIilcblxuaWYgY3VycmVudCA+PSByZXF1ZXN0ZWQgdGhlblxuICAgIHJlZGlzLmNhbGwoJ0RFQ1JCWScsIGtleSwgcmVxdWVzdGVkKVxuICAgIHJldHVybiB7MSwgY3VycmVudCAtIHJlcXVlc3RlZH1cbmVsc2VcbiAgICByZXR1cm4gezAsIGN1cnJlbnR9XG5lbmQiLCJzdG9yZWQiOmZhbHNlLCJibG9jayI6ZmFsc2UsIngiOjExNDAsInkiOjEwMDAsIndpcmVzIjpbWyIwYjE2NjkwYjNjMmMxMGRmIl1dfSx7ImlkIjoiMGIxNjY5MGIzYzJjMTBkZiIsInR5cGUiOiJmdW5jdGlvbiIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6ImFkYzRiMGRmNmIwZTg0ZTMiLCJuYW1lIjoiRm9ybWF0IEx1YSBTY3JpcHQgUmVzcG9uc2UiLCJmdW5jIjoiY29uc3QgcmVzdWx0ID0gbXNnLnBheWxvYWQ7XG5jb25zdCBzdWNjZXNzID0gcmVzdWx0WzBdO1xuY29uc3QgcmVtYWluaW5nID0gcmVzdWx0WzFdO1xuXG5pZiAoc3VjY2VzcyA9PT0gMSkge1xuICAgIG1zZy5wYXlsb2FkID0ge1xuICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICBtZXNzYWdlOiBgT3JkZXIgcHJvY2Vzc2VkLiBSZW1haW5pbmcgc3RvY2s6ICR7cmVtYWluaW5nfWAsXG4gICAgICAgIHJlbWFpbmluZzogcmVtYWluaW5nXG4gICAgfTtcbn0gZWxzZSB7XG4gICAgbXNnLnBheWxvYWQgPSB7XG4gICAgICAgIHN0YXR1czogXCJmYWlsZWRcIixcbiAgICAgICAgbWVzc2FnZTogYEluc3VmZmljaWVudCBzdG9jay4gQXZhaWxhYmxlOiAke3JlbWFpbmluZ31gLFxuICAgICAgICBhdmFpbGFibGU6IHJlbWFpbmluZ1xuICAgIH07XG59XG5yZXR1cm4gbXNnOyIsIm91dHB1dHMiOjEsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6MTM0MCwieSI6MTAwMCwid2lyZXMiOltbIjlhMDNlYmRlYTUxZWVmZGMiXV19LHsiaWQiOiI5YTAzZWJkZWE1MWVlZmRjIiwidHlwZSI6ImRlYnVnIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiYWRjNGIwZGY2YjBlODRlMyIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTUzMCwieSI6MTAwMCwid2lyZXMiOltdfSx7ImlkIjoiYzY0MWQ4ZTU0NjIwYTczYSIsInR5cGUiOiJyZWRpcy1jb21tYW5kIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiYWRjNGIwZGY2YjBlODRlMyIsInNlcnZlciI6ImUzNzBkYzkyYjM5YTdiYTQiLCJjb21tYW5kIjoiU0VUIiwibmFtZSI6IiIsInRvcGljIjoiaW52ZW50b3J5OnByb2R1Y3Q6U0tVLTEyMzQ1IiwicGFyYW1zIjoiWzEwXSIsInBhcmFtc1R5cGUiOiJqc29uIiwicGF5bG9hZFR5cGUiOiJqc29uIiwiYmxvY2siOmZhbHNlLCJ4Ijo4ODAsInkiOjk0MCwid2lyZXMiOltbIjdjMTFhNWYxYzk3MTY1MjciXV19LHsiaWQiOiI3YzExYTVmMWM5NzE2NTI3IiwidHlwZSI6ImRlYnVnIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiYWRjNGIwZGY2YjBlODRlMyIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTEzMCwieSI6OTQwLCJ3aXJlcyI6W119LHsiaWQiOiJhMDdhMDI1ZGI5NjJiZTUwIiwidHlwZSI6ImluamVjdCIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6ImFkYzRiMGRmNmIwZTg0ZTMiLCJuYW1lIjoiIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsIngiOjYxMCwieSI6OTQwLCJ3aXJlcyI6W1siYzY0MWQ4ZTU0NjIwYTczYSJdXX0seyJpZCI6IjAxYTk2ZmIyMDQ0ZDcyM2YiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsIm5hbWUiOiJEaXJlY3QgUmVkaXMgQ2xpZW50IEFjY2VzcyB3aXRoIHJlZGlzLWluc3RhbmNlIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI3NDVmNDFmMzUyZmEyMjEyIiwiYTllYzlhOGE1YTY2ZGFhMyIsImUzYTU2MzRlZjBlYmNiNzgiLCI1MTkyMDgxMzA5ZTA4ZGI5IiwiNGYxNjkwNTNiYmQ3YWRkOSIsIjE1ZjBiMDQ2MmY3OTU4MjgiLCI0YTM5NDcwMGM2OTE0OTYxIl0sIngiOjUxNCwieSI6MTA1OSwidyI6NzMyLCJoIjoyMjJ9LHsiaWQiOiI3NDVmNDFmMzUyZmEyMjEyIiwidHlwZSI6InJlZGlzLWluc3RhbmNlIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMDFhOTZmYjIwNDRkNzIzZiIsInNlcnZlciI6ImUzNzBkYzkyYjM5YTdiYTQiLCJuYW1lIjoiIiwidG9waWMiOiJyZWRpcyIsImxvY2F0aW9uIjoiZmxvdyIsIngiOjU5MCwieSI6MTEwMCwid2lyZXMiOltdfSx7ImlkIjoiYTllYzlhOGE1YTY2ZGFhMyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiIwMWE5NmZiMjA0NGQ3MjNmIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjYyMCwieSI6MTE4MCwid2lyZXMiOltbImUzYTU2MzRlZjBlYmNiNzgiXV19LHsiaWQiOiJlM2E1NjM0ZWYwZWJjYjc4IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMDFhOTZmYjIwNDRkNzIzZiIsIm5hbWUiOiJCYXRjaCBTdG9yZSBTZW5zb3IgUmVhZGluZ3MgKFBpcGVsaW5lKSIsImZ1bmMiOiJjb25zdCByZWRpcyA9IGZsb3cuZ2V0KCdyZWRpcycpO1xuXG4vLyBDcmVhdGUgYSBwaXBlbGluZVxuY29uc3QgcGlwZWxpbmUgPSByZWRpcy5waXBlbGluZSgpO1xuXG4vLyBBZGQgbXVsdGlwbGUgc2Vuc29yIHJlYWRpbmdzIGluIG9uZSBiYXRjaFxuY29uc3Qgc2Vuc29ycyA9IFtcbiAgICB7IGlkOiAndGVtcC0wMScsIHZhbHVlOiAyMy41LCB1bml0OiAnQycgfSxcbiAgICB7IGlkOiAndGVtcC0wMicsIHZhbHVlOiAyNC4xLCB1bml0OiAnQycgfSxcbiAgICB7IGlkOiAnaHVtaWRpdHktMDEnLCB2YWx1ZTogNjUsIHVuaXQ6ICclJyB9LFxuICAgIHsgaWQ6ICdwcmVzc3VyZS0wMScsIHZhbHVlOiAxMDEzLCB1bml0OiAnaFBhJyB9XG5dO1xuXG5zZW5zb3JzLmZvckVhY2goc2Vuc29yID0+IHtcbiAgICBjb25zdCBrZXkgPSBgc2Vuc29yOiR7c2Vuc29yLmlkfTpsYXRlc3RgO1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIHZhbHVlOiBzZW5zb3IudmFsdWUsXG4gICAgICAgIHVuaXQ6IHNlbnNvci51bml0LFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcbiAgICB9KTtcbiAgICBwaXBlbGluZS5zZXQoa2V5LCBkYXRhLCAnRVgnLCAzNjAwKTsgLy8gRXhwaXJlIGluIDEgaG91clxufSk7XG5cbi8vIEV4ZWN1dGUgYWxsIGNvbW1hbmRzIGF0IG9uY2VcbnBpcGVsaW5lLmV4ZWMoKGVyciwgcmVzdWx0cykgPT4ge1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgbm9kZS5lcnJvcihlcnIsIG1zZyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBtc2cucGF5bG9hZCA9IHtcbiAgICAgICAgbWVzc2FnZTogYFN0b3JlZCAke3Jlc3VsdHMubGVuZ3RofSBzZW5zb3IgcmVhZGluZ3NgLFxuICAgICAgICByZXN1bHRzOiByZXN1bHRzXG4gICAgfTtcbiAgICBub2RlLnNlbmQobXNnKTtcbn0pOyIsIm91dHB1dHMiOjEsInRpbWVvdXQiOjAsIm5vZXJyIjowLCJpbml0aWFsaXplIjoiIiwiZmluYWxpemUiOiIiLCJsaWJzIjpbXSwieCI6ODgwLCJ5IjoxMTgwLCJ3aXJlcyI6W1siNTE5MjA4MTMwOWUwOGRiOSJdXX0seyJpZCI6IjUxOTIwODEzMDllMDhkYjkiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiIwMWE5NmZiMjA0NGQ3MjNmIiwibmFtZSI6ImRlYnVnIDgiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTE0MCwieSI6MTE4MCwid2lyZXMiOltdfSx7ImlkIjoiNGYxNjkwNTNiYmQ3YWRkOSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZDRmNjBjNzllZmY1MjExZCIsImciOiIwMWE5NmZiMjA0NGQ3MjNmIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjYyMCwieSI6MTI0MCwid2lyZXMiOltbIjE1ZjBiMDQ2MmY3OTU4MjgiXV19LHsiaWQiOiIxNWYwYjA0NjJmNzk1ODI4IiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImQ0ZjYwYzc5ZWZmNTIxMWQiLCJnIjoiMDFhOTZmYjIwNDRkNzIzZiIsIm5hbWUiOiJTY2FuIGFuZCBMaXN0IExhdGVzdCBTZW5zb3IgS2V5cyIsImZ1bmMiOiJjb25zdCByZWRpcyA9IGZsb3cuZ2V0KCdyZWRpcycpO1xuXG5hc3luYyBmdW5jdGlvbiBzY2FuS2V5cygpIHtcbiAgICBjb25zdCBtYXRjaFBhdHRlcm4gPSAnc2Vuc29yOio6bGF0ZXN0JztcbiAgICBjb25zdCBhbGxLZXlzID0gW107XG4gICAgbGV0IGN1cnNvciA9ICcwJztcblxuICAgIHRyeSB7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIC8vIFNjYW4gd2l0aCBwYXR0ZXJuIG1hdGNoaW5nXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZWRpcy5zY2FuKFxuICAgICAgICAgICAgICAgIGN1cnNvcixcbiAgICAgICAgICAgICAgICAnTUFUQ0gnLCBtYXRjaFBhdHRlcm4sXG4gICAgICAgICAgICAgICAgJ0NPVU5UJywgMTAwXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjdXJzb3IgPSByZXN1bHRbMF07XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gcmVzdWx0WzFdO1xuICAgICAgICAgICAgYWxsS2V5cy5wdXNoKC4uLmtleXMpO1xuXG4gICAgICAgIH0gd2hpbGUgKGN1cnNvciAhPT0gJzAnKTtcblxuICAgICAgICBtc2cucGF5bG9hZCA9IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG1hdGNoUGF0dGVybixcbiAgICAgICAgICAgIGNvdW50OiBhbGxLZXlzLmxlbmd0aCxcbiAgICAgICAgICAgIGtleXM6IGFsbEtleXNcbiAgICAgICAgfTtcblxuICAgICAgICBub2RlLnNlbmQobXNnKTtcblxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBub2RlLmVycm9yKGVyciwgbXNnKTtcbiAgICB9XG59XG5cbnNjYW5LZXlzKCk7Iiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo4NjAsInkiOjEyNDAsIndpcmVzIjpbWyI0YTM5NDcwMGM2OTE0OTYxIl1dfSx7ImlkIjoiNGEzOTQ3MDBjNjkxNDk2MSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJkNGY2MGM3OWVmZjUyMTFkIiwiZyI6IjAxYTk2ZmIyMDQ0ZDcyM2YiLCJuYW1lIjoiZGVidWcgOSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxMTQwLCJ5IjoxMjQwLCJ3aXJlcyI6W119LHsiaWQiOiJkN2M1MzkwN2Y1YjkwY2E1IiwidHlwZSI6Imdsb2JhbC1jb25maWciLCJlbnYiOltdLCJtb2R1bGVzIjp7Im5vZGUtcmVkLWNvbnRyaWItcmVkaXMiOiIxLjQuMCJ9fV0="
---
::


