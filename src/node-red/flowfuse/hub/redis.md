---
eleventyNavigation:
    key: Redis
    parent: Hub
    order: 1
meta:
    title: Redis
    description: A FlowFuse-certified package that lets you connect to Redis, store and retrieve data, publish and subscribe to messages, execute commands, and integrate Redis into your flows.
---

# {{ meta.title }}

A FlowFuse-certified package that lets you connect to Redis, store and retrieve data, publish and subscribe to messages, execute commands, and integrate Redis into your flows.

Built on [ioredis](https://github.com/luin/ioredis), so anything ioredis supports (Cluster, Sentinel, TLS, connection strings, IORedis options objects) is supported here too.

## Features

- Run any Redis command through a single configurable node
- Publish/subscribe for pub/sub messaging patterns
- Blocking list operations for building simple queues
- Run Lua scripts on the server for atomic, multi-step operations
- Inject a live Redis client into flow/global context for direct API access in function nodes
- Connections are pooled per config node, one connection is reused across every node pointed at the same server config, unless a node explicitly requests a dedicated (blocking) connection
- TLS and Redis Cluster support

{% note %}
The Redis node is not available by default. It is part of the FlowFuse Hub Certified Nodes catalogue, which is part of the **FlowFuse Hub** offering. Please contact our sales team at [Contact us](/contact-us/) to learn more or to request access.
{% endnote %}

## Use case

Redis is commonly used with FlowFuse as a fast shared data layer between flows and instances, since Node-RED's own context is per-instance and does not span multiple instances. This package exposes Redis through several nodes, each suited to a different pattern:

- **Shared state and caching**: `redis-command` runs `SET`/`GET` and other commands, so several flows or instances can read and update the same values: a cached sensor reading, a rate counter, or an inventory count. Setting an expiry (`EX`) turns any key into a time-limited cache entry.
- **Work queues**: `redis-out` with `rpush` adds items to a list, and `redis-in` with `blpop` lets a worker flow pick them up in order as they arrive, decoupling a producer flow from a consumer.
- **Messaging (pub/sub)**: `redis-out` `publish` broadcasts a message to every `redis-in` `subscribe` node listening on that channel at once, across instances.
- **Atomic operations**: `redis-lua-script` runs a Lua script on the server in a single round trip, so a multi-step operation cannot interleave with another client, for example checking and decrementing stock so two concurrent orders cannot oversell the last unit.
- **Direct client access**: for anything the nodes above do not cover (pipelines, `SCAN`, RedisJSON, or other module commands), `redis-instance` injects a live ioredis client into context for use in function nodes.

Connections are pooled per config node, so pointing many nodes at the same server reuses one connection rather than opening a separate one for each. Blocking operations such as `subscribe` and `blpop` take their own dedicated connection automatically.

## Install

1. Open the **Palette Manager** from the top-right menu in the FlowFuse editor.
2. Switch to the **Install** tab.
3. Find the **FlowFuse Hub Certified Nodes** collection.
4. Locate `@flowfuse-certified-nodes/redis` and click **Install**.

{% note %}
Newly installed nodes are picked up automatically — no restart needed. Restart is only required when you update a node that's already installed: restart any remote instance or hosted instance running the previous version.
{% endnote %}

## Nodes in this package

| Node | Type | Purpose |
|---|---|---|
| **redis-config** | config node | Holds the connection details shared by every other node |
| **redis-command** | request/response | Executes any Redis command (`GET`, `SET`, `HMSET`, `SADD`, ...) |
| **redis-in** | input | Subscribes to pub/sub channels/patterns, or performs blocking reads (`BLPOP`, etc.) |
| **redis-out** | output | Publishes messages or pushes to lists |
| **redis-lua-script** | request/response | Runs a Lua script on the server, optionally cached (`EVALSHA`) |
| **redis-instance** | injector | Places a live ioredis client into flow or global context |

Every node except `redis-config` and `redis-instance` sits inline in a flow: it receives a `msg`, talks to Redis, and sends a `msg` on.

## Configuring the connection (redis-config)

You create **one `redis-config` node per Redis server** you connect to, then point every other node at it: you don't re-enter connection details on each node.

1. Drag any Redis node onto the canvas and open it
2. Click the pencil icon next to **Server** to add a new connection
3. Fill in:
   - **Name** — a friendly label for this connection, e.g. `Production Redis`
   - **Connection Options** — either a connection string, or a JSON object of [ioredis options](https://github.com/luin/ioredis#connect-to-redis)
   - **Cluster** — enable if connecting to a Redis Cluster
4. Click **Add**, then **Done**

Connection Options accepts either format, use whichever is more convenient:

```
redis://username:password@your-redis-host:6379/0
```

```json
{
  "host": "your-redis-host",
  "port": 6379,
  "password": "your-password",
  "db": 0
}
```

The configuration examples in this README use `localhost`, `6379`, and `db: 0` as placeholder values for a local Redis instance. These values are provided for demonstration purposes only and should be replaced with the connection details for your own Redis server.

Every node pointed at the same `redis-config` node shares one underlying connection automatically. A node only opens its own dedicated connection when it needs to hold one open: `redis-in` does this automatically for `subscribe`/`psubscribe`/blocking commands, or you can force it with a node's **Block** option.

## What `redis-command` accepts

`redis-command` runs any Redis command and returns the reply as `msg.payload`. Its inputs come from two places, and either can be fixed on the node or supplied dynamically on the incoming `msg`:

| Field | Node config | Incoming `msg` | Meaning |
|---|---|---|---|
| **Command** | `command` | — | The Redis command to run (`set`, `get`, `hmset`, `sadd`, ...). Always fixed on the node. |
| **Key** | `topic` | `msg.topic` | The key the command operates on. Leave the node's **Topic** blank to take it from `msg.topic` instead. |
| **Params** | `params` (+ `paramsType`) | `msg.payload` | The remaining arguments, as a JSON array. Leave the node's **Params** empty to take them from `msg.payload` instead. |
| **Server** | `server` | — | Which `redis-config` connection to use. |

The reply is written to `msg.payload`; `msg.topic` is passed through unchanged.

**Example — `SET mykey "Hello there"`:** either fix `topic: mykey` and `params: ["Hello there"]` on the node and inject any message, or leave both blank and inject `{"topic": "mykey", "payload": ["Hello there"]}`. The reply is `OK`.

**Example — `GET mykey`:** fix `topic: mykey` on the node (`get` takes no extra params, so `payload` can be `[]` or omitted). The reply is `Hello there`.

For the full list of commands and their arguments, see the [official Redis command reference](https://redis.io/docs/latest/commands/).

## Working with JSON

Redis stores everything as strings. `redis-command` doesn't stringify or parse for you, so wrap it with a `json` node on the way in and out:

- **Writing:** `msg.payload` must already be a string when it reaches `redis-command`, put a `json` node (stringify mode) before it, or stringify in a `change`/`function` node.
- **Reading:** the reply on `msg.payload` comes back as a string: put a `json` node (parse mode) after it to get an object back.

## Pub/Sub messaging

**`redis-out`** publishes. Config: **Command** `publish`, **Topic** the channel to publish on (or take it from `msg.topic` if left blank). `msg.payload` is the message sent.

**`redis-in`** subscribes. Config: **Command** `subscribe` (exact channel) or `psubscribe` (pattern, e.g. `TOPIC:*`), **Topic** the channel/pattern. It has no fixed input, once deployed it emits one `msg` per received message, with `msg.payload` the message body and `msg.topic` the channel it arrived on.

Subscribing opens a dedicated blocking connection automatically (no need to set **Block** yourself) and stays open until the node is redeployed or removed.

## Lists / queues

**`redis-out`** with **Command** `rpush`: **Topic** is the list key (or `msg.topic`), `msg.payload` is the value pushed.

**`redis-in`** with **Command** `blpop`: **Topic** is the list key, **Timeout** is how long to block (`0` = wait forever). It emits a `msg` as soon as an item is available, with `msg.payload` the popped value, a simple queue consumer paired with the `rpush` producer above.

## Lua scripting (redis-lua-script)

Use Lua scripts for atomic, multi-step operations that would otherwise need several round trips and risk a race between them. Keys go through `KEYS[]`, everything else through `ARGV[]`.

| Field | Node config | Meaning |
|---|---|---|
| **Keys** | `keyval` | How many leading elements of `msg.payload` are treated as Redis keys (`KEYS[1]`, `KEYS[2]`, ...); the rest become `ARGV[]`. |
| **Script** | `func` | The Lua source to run. |
| **Stored** | `stored` | Cache the script on the server with `SCRIPT LOAD` and invoke it by SHA (`EVALSHA`) instead of resending the source every call, worth enabling once a script is stable. |
| **Server** | `server` | Which `redis-config` connection to use. |

The script's return value becomes `msg.payload`.

```lua
-- keyval: 1, payload: ["key", "value"]
local foo = redis.call('SET', KEYS[1], ARGV[1])
return foo
```

`cjson.encode`/`cjson.decode` are available inside scripts for working with JSON payloads server-side, see the sample flow below for examples including `ZADD`/`ZRANGE` with encoded JSON members, and string manipulation with `string.sub`.

**A more realistic example, atomically check and decrement stock, so two concurrent orders can't both succeed against the last unit:**

```lua
-- keyval: 1, payload: ["inventory:product:SKU-12345", 3]
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

`msg.payload` comes back as `[1, remaining]` on success or `[0, available]` if there wasn't enough stock, unpack it in a `function` node afterwards.

## Direct client access (redis-instance)

For anything not covered by the other nodes (pipelines, `SCAN`, custom/module commands), drop a `redis-instance` node on the canvas. It doesn't sit inline in a flow; it just injects a ready-to-use ioredis client into context on deploy.

| Field | Node config | Meaning |
|---|---|---|
| **Server** | `server` | Which `redis-config` connection to use. |
| **Topic** | `topic` | The variable name the client is stored under in context, e.g. `redis`. |
| **Location** | `location` | `flow` or `global`, where in context the client is placed. |

Deploy, then use it in any function node:

```javascript
const redis = flow.get('redis'); // or global.get('redis')

const info = await redis.info();
msg.payload = info;
return msg;
```

**Pipelining** multiple writes in one round trip:

```javascript
const redis = flow.get('redis');
const pipeline = redis.pipeline();

sensors.forEach(sensor => {
    pipeline.set(`sensor:${sensor.id}:latest`, JSON.stringify(sensor), 'EX', 3600);
});

pipeline.exec((err, results) => {
    if (err) { node.error(err, msg); return; }
    msg.payload = { stored: results.length };
    node.send(msg);
});
```

**Scanning keys** without blocking the server (`KEYS *` blocks Redis on large datasets, `SCAN` doesn't):

```javascript
const redis = flow.get('redis');
let cursor = '0';
const keys = [];
do {
    const [next, batch] = await redis.scan(cursor, 'MATCH', 'sensor:*:latest', 'COUNT', 100);
    cursor = next;
    keys.push(...batch);
} while (cursor !== '0');
msg.payload = keys;
return msg;
```

Custom/module commands (e.g. RedisJSON, RediSearch) can also be issued via `redis.call('MODULE.COMMAND', ...)` on the injected client.

## Sample flow

{% renderFlow 300 %}
[{"id":"2c33ebeb73062ab3","type":"group","z":"FFF0000000000001","name":"Your First Redis Flow","style":{"label":true},"nodes":["e5f3326ef736cef6","8486e88d8623b42a","d1ebde22d0e224a8","22db25c60af16ab2","fe2be532c53402b3","ebc1e8fc0f1ba2d6","adb95c63d206c633"],"x":414,"y":1219,"w":712,"h":162},{"id":"e5f3326ef736cef6","type":"redis-command","z":"FFF0000000000001","g":"2c33ebeb73062ab3","server":"e370dc92b39a7ba4","command":"SET","name":"","topic":"mykey","params":"[\"Hello from Node-RED\"]","paramsType":"json","payloadType":"json","block":false,"x":710,"y":1260,"wires":[["8486e88d8623b42a"]]},{"id":"8486e88d8623b42a","type":"debug","z":"FFF0000000000001","g":"2c33ebeb73062ab3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":870,"y":1260,"wires":[]},{"id":"d1ebde22d0e224a8","type":"redis-command","z":"FFF0000000000001","g":"2c33ebeb73062ab3","server":"e370dc92b39a7ba4","command":"GET","name":"","topic":"","params":"[]","paramsType":"json","payloadType":"json","block":false,"x":900,"y":1340,"wires":[["22db25c60af16ab2"]]},{"id":"22db25c60af16ab2","type":"debug","z":"FFF0000000000001","g":"2c33ebeb73062ab3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1030,"y":1340,"wires":[]},{"id":"fe2be532c53402b3","type":"change","z":"FFF0000000000001","g":"2c33ebeb73062ab3","name":"Set Key for GET","rules":[{"t":"set","p":"topic","pt":"msg","to":"mykey","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"[]","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":700,"y":1340,"wires":[["d1ebde22d0e224a8"]]},{"id":"ebc1e8fc0f1ba2d6","type":"inject","z":"FFF0000000000001","g":"2c33ebeb73062ab3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":1260,"wires":[["e5f3326ef736cef6"]]},{"id":"adb95c63d206c633","type":"inject","z":"FFF0000000000001","g":"2c33ebeb73062ab3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":1340,"wires":[["fe2be532c53402b3"]]},{"id":"e370dc92b39a7ba4","type":"redis-config","name":"Local","options":"{\"host\":\"localhost\",\"port\":6379,\"db\":0}","cluster":false,"optionsType":"json"},{"id":"5e2842a4730589c0","type":"group","z":"FFF0000000000001","name":"Working with JSON Data","style":{"label":true},"nodes":["6acc07a393e5ee26","3255e8a9122253b7","a3b0b4a74133778e","4faba929a84fb358","e5c359b934174c8e","abf011c2e81960c4","22a2b54caae5869d","b9598f313e2a9fd2","d0051f637fd1621a","9e59f275496d722d"],"x":414,"y":1399,"w":852,"h":162},{"id":"6acc07a393e5ee26","type":"redis-command","z":"FFF0000000000001","g":"5e2842a4730589c0","server":"e370dc92b39a7ba4","command":"SET","name":"","topic":"","params":"[]","paramsType":"json","payloadType":"json","block":false,"x":1040,"y":1440,"wires":[["3255e8a9122253b7"]]},{"id":"3255e8a9122253b7","type":"debug","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1170,"y":1440,"wires":[]},{"id":"a3b0b4a74133778e","type":"inject","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":1440,"wires":[["d0051f637fd1621a"]]},{"id":"4faba929a84fb358","type":"redis-command","z":"FFF0000000000001","g":"5e2842a4730589c0","server":"e370dc92b39a7ba4","command":"GET","name":"","topic":"","params":"[]","paramsType":"json","payloadType":"json","block":false,"x":900,"y":1520,"wires":[["b9598f313e2a9fd2"]]},{"id":"e5c359b934174c8e","type":"debug","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1170,"y":1520,"wires":[]},{"id":"abf011c2e81960c4","type":"change","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"Set Key for GET","rules":[{"t":"set","p":"topic","pt":"msg","to":"sensor:data","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"[]","tot":"json"}],"action":"","property":"","from":"","to":"","reg":false,"x":700,"y":1520,"wires":[["4faba929a84fb358"]]},{"id":"22a2b54caae5869d","type":"inject","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":1520,"wires":[["abf011c2e81960c4"]]},{"id":"b9598f313e2a9fd2","type":"json","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"","property":"payload","action":"","pretty":false,"x":1030,"y":1520,"wires":[["e5c359b934174c8e"]]},{"id":"d0051f637fd1621a","type":"change","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"Set Key","rules":[{"t":"set","p":"topic","pt":"msg","to":"sensor:data","tot":"str"},{"t":"set","p":"payload","pt":"msg","to":"{\t   \"temperature\": 22.5,\t   \"humidity\": 65,\t   \"timestamp\": $now()\t}","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":680,"y":1440,"wires":[["9e59f275496d722d"]]},{"id":"9e59f275496d722d","type":"json","z":"FFF0000000000001","g":"5e2842a4730589c0","name":"","property":"payload","action":"","pretty":false,"x":890,"y":1440,"wires":[["6acc07a393e5ee26"]]},{"id":"39de5da95585227f","type":"group","z":"FFF0000000000001","name":"Pub/Sub Messaging","style":{"label":true},"nodes":["7756558fd542d657","bf2dc26107eff967","9856ddb8e7bc28e8","bcd9b22fd67ecf7c","22f0526fab3b589b"],"x":414,"y":1579,"w":632,"h":162},{"id":"7756558fd542d657","type":"inject","z":"FFF0000000000001","g":"39de5da95585227f","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":1620,"wires":[["9856ddb8e7bc28e8"]]},{"id":"bf2dc26107eff967","type":"redis-out","z":"FFF0000000000001","g":"39de5da95585227f","server":"e370dc92b39a7ba4","command":"publish","name":"","topic":"alerts:temperature","obj":true,"x":930,"y":1620,"wires":[]},{"id":"9856ddb8e7bc28e8","type":"change","z":"FFF0000000000001","g":"39de5da95585227f","name":"Set Alert Message","rules":[{"t":"set","p":"payload","pt":"msg","to":"ALERT: Temperature critical in Zone A: 85°C - Equipment shutdown initiated","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":710,"y":1620,"wires":[["bf2dc26107eff967"]]},{"id":"bcd9b22fd67ecf7c","type":"redis-in","z":"FFF0000000000001","g":"39de5da95585227f","server":"e370dc92b39a7ba4","command":"subscribe","name":"","topic":"alerts:temperature","obj":true,"timeout":0,"x":530,"y":1700,"wires":[["22f0526fab3b589b"]]},{"id":"22f0526fab3b589b","type":"debug","z":"FFF0000000000001","g":"39de5da95585227f","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":890,"y":1700,"wires":[]},{"id":"adc4b0df6b0e84e3","type":"group","z":"FFF0000000000001","name":"Using Lua Scripts for Atomic Operations","style":{"label":true},"nodes":["ca8a523710138a11","8804755befa1fbc8","0898e80e28b7d276","0b16690b3c2c10df","9a03ebdea51eefdc","c641d8e54620a73a","7c11a5f1c9716527","a07a025db962be50"],"x":414,"y":1759,"w":1112,"h":142},{"id":"ca8a523710138a11","type":"inject","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":1860,"wires":[["8804755befa1fbc8"]]},{"id":"8804755befa1fbc8","type":"function","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","name":"Prepare Lua Script Arguments","func":"// msg.payload format: [keys..., args...]\n// First element(s) are the keys, remaining elements are arguments\nmsg.payload = [\n    \"inventory:product:SKU-12345\",  // KEYS[1]\n    3                                // ARGV[1] - quantity requested\n];\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":750,"y":1860,"wires":[["0898e80e28b7d276"]]},{"id":"0898e80e28b7d276","type":"redis-lua-script","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","server":"e370dc92b39a7ba4","name":"","keyval":"1","func":"local key = KEYS[1]\nlocal requested = tonumber(ARGV[1])\n\nlocal current = tonumber(redis.call('GET', key) or \"0\")\n\nif current >= requested then\n    redis.call('DECRBY', key, requested)\n    return {1, current - requested}\nelse\n    return {0, current}\nend","stored":false,"block":false,"x":1040,"y":1860,"wires":[["0b16690b3c2c10df"]]},{"id":"0b16690b3c2c10df","type":"function","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","name":"Format Lua Script Response","func":"const result = msg.payload;\nconst success = result[0];\nconst remaining = result[1];\n\nif (success === 1) {\n    msg.payload = {\n        status: \"success\",\n        message: `Order processed. Remaining stock: ${remaining}`,\n        remaining: remaining\n    };\n} else {\n    msg.payload = {\n        status: \"failed\",\n        message: `Insufficient stock. Available: ${remaining}`,\n        available: remaining\n    };\n}\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":1240,"y":1860,"wires":[["9a03ebdea51eefdc"]]},{"id":"9a03ebdea51eefdc","type":"debug","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1430,"y":1860,"wires":[]},{"id":"c641d8e54620a73a","type":"redis-command","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","server":"e370dc92b39a7ba4","command":"SET","name":"","topic":"inventory:product:SKU-12345","params":"[10]","paramsType":"json","payloadType":"json","block":false,"x":780,"y":1800,"wires":[["7c11a5f1c9716527"]]},{"id":"7c11a5f1c9716527","type":"debug","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1030,"y":1800,"wires":[]},{"id":"a07a025db962be50","type":"inject","z":"FFF0000000000001","g":"adc4b0df6b0e84e3","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":1800,"wires":[["c641d8e54620a73a"]]},{"id":"01a96fb2044d723f","type":"group","z":"FFF0000000000001","name":"Direct Redis Client Access with redis-instance","style":{"label":true},"nodes":["745f41f352fa2212","a9ec9a8a5a66daa3","e3a5634ef0ebcb78","5192081309e08db9","4f169053bbd7add9","15f0b0462f795828","4a394700c6914961"],"x":414,"y":1919,"w":732,"h":222},{"id":"745f41f352fa2212","type":"redis-instance","z":"FFF0000000000001","g":"01a96fb2044d723f","server":"e370dc92b39a7ba4","name":"","topic":"redis","location":"flow","x":490,"y":1960,"wires":[]},{"id":"a9ec9a8a5a66daa3","type":"inject","z":"FFF0000000000001","g":"01a96fb2044d723f","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":520,"y":2040,"wires":[["e3a5634ef0ebcb78"]]},{"id":"e3a5634ef0ebcb78","type":"function","z":"FFF0000000000001","g":"01a96fb2044d723f","name":"Batch Store Sensor Readings (Pipeline)","func":"const redis = flow.get('redis');\n\n// Create a pipeline\nconst pipeline = redis.pipeline();\n\n// Add multiple sensor readings in one batch\nconst sensors = [\n    { id: 'temp-01', value: 23.5, unit: 'C' },\n    { id: 'temp-02', value: 24.1, unit: 'C' },\n    { id: 'humidity-01', value: 65, unit: '%' },\n    { id: 'pressure-01', value: 1013, unit: 'hPa' }\n];\n\nsensors.forEach(sensor => {\n    const key = `sensor:${sensor.id}:latest`;\n    const data = JSON.stringify({\n        value: sensor.value,\n        unit: sensor.unit,\n        timestamp: Date.now()\n    });\n    pipeline.set(key, data, 'EX', 3600); // Expire in 1 hour\n});\n\n// Execute all commands at once\npipeline.exec((err, results) => {\n    if (err) {\n        node.error(err, msg);\n        return;\n    }\n\n    msg.payload = {\n        message: `Stored ${results.length} sensor readings`,\n        results: results\n    };\n    node.send(msg);\n});","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":780,"y":2040,"wires":[["5192081309e08db9"]]},{"id":"5192081309e08db9","type":"debug","z":"FFF0000000000001","g":"01a96fb2044d723f","name":"debug 8","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1040,"y":2040,"wires":[]},{"id":"4f169053bbd7add9","type":"inject","z":"FFF0000000000001","g":"01a96fb2044d723f","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":520,"y":2100,"wires":[["15f0b0462f795828"]]},{"id":"15f0b0462f795828","type":"function","z":"FFF0000000000001","g":"01a96fb2044d723f","name":"Scan and List Latest Sensor Keys","func":"const redis = flow.get('redis');\n\nasync function scanKeys() {\n    const matchPattern = 'sensor:*:latest';\n    const allKeys = [];\n    let cursor = '0';\n\n    try {\n        do {\n            // Scan with pattern matching\n            const result = await redis.scan(\n                cursor,\n                'MATCH', matchPattern,\n                'COUNT', 100\n            );\n\n            cursor = result[0];\n            const keys = result[1];\n            allKeys.push(...keys);\n\n        } while (cursor !== '0');\n\n        msg.payload = {\n            pattern: matchPattern,\n            count: allKeys.length,\n            keys: allKeys\n        };\n\n        node.send(msg);\n\n    } catch (err) {\n        node.error(err, msg);\n    }\n}\n\nscanKeys();","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":760,"y":2100,"wires":[["4a394700c6914961"]]},{"id":"4a394700c6914961","type":"debug","z":"FFF0000000000001","g":"01a96fb2044d723f","name":"debug 9","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1040,"y":2100,"wires":[]},{"id":"1a2b3c4d5e6f7081","type":"group","z":"FFF0000000000001","name":"Lists and Queues","style":{"label":true},"nodes":["1a2b3c4d5e6f7001","1a2b3c4d5e6f7002","1a2b3c4d5e6f7003","1a2b3c4d5e6f7005","1a2b3c4d5e6f7006","1a2b3c4d5e6f7007"],"x":414,"y":2159,"w":612,"h":162},{"id":"1a2b3c4d5e6f7001","type":"inject","z":"FFF0000000000001","g":"1a2b3c4d5e6f7081","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":2200,"wires":[["1a2b3c4d5e6f7002"]]},{"id":"1a2b3c4d5e6f7002","type":"change","z":"FFF0000000000001","g":"1a2b3c4d5e6f7081","name":"Prepare Order Payload","rules":[{"t":"set","p":"payload","pt":"msg","to":"Order #1042 - 2x Widget, 1x Gadget","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":700,"y":2200,"wires":[["1a2b3c4d5e6f7003"]]},{"id":"1a2b3c4d5e6f7003","type":"redis-out","z":"FFF0000000000001","g":"1a2b3c4d5e6f7081","server":"e370dc92b39a7ba4","command":"rpush","name":"","topic":"queue:orders","x":930,"y":2200,"wires":[]},{"id":"1a2b3c4d5e6f7005","type":"inject","z":"FFF0000000000001","g":"1a2b3c4d5e6f7081","name":"","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":510,"y":2280,"wires":[["1a2b3c4d5e6f7006"]]},{"id":"1a2b3c4d5e6f7006","type":"redis-in","z":"FFF0000000000001","g":"1a2b3c4d5e6f7081","server":"e370dc92b39a7ba4","command":"blpop","name":"","topic":"queue:orders","timeout":0,"x":750,"y":2280,"wires":[["1a2b3c4d5e6f7007"]]},{"id":"1a2b3c4d5e6f7007","type":"debug","z":"FFF0000000000001","g":"1a2b3c4d5e6f7081","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":930,"y":2280,"wires":[]},{"id":"2a2b3c4d5e6f7082","type":"group","z":"FFF0000000000001","name":"Lua Scripting - JSON and Sorted Sets","style":{"label":true},"nodes":["2a2b3c4d5e6f7001","2a2b3c4d5e6f7002","2a2b3c4d5e6f7003","2a2b3c4d5e6f7004","2a2b3c4d5e6f7005","2a2b3c4d5e6f7006","2a2b3c4d5e6f7007","2a2b3c4d5e6f7008","2a2b3c4d5e6f7009","2a2b3c4d5e6f700a","2a2b3c4d5e6f700b","2a2b3c4d5e6f700c","2a2b3c4d5e6f700d","2a2b3c4d5e6f700e","2a2b3c4d5e6f700f","2a2b3c4d5e6f7010","2a2b3c4d5e6f7011","2a2b3c4d5e6f7012","2a2b3c4d5e6f7013","2a2b3c4d5e6f7014"],"x":404,"y":2339,"w":952,"h":322},{"id":"2a2b3c4d5e6f7001","type":"inject","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Add Reading (ZADD)","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":570,"y":2380,"wires":[["2a2b3c4d5e6f7002"]]},{"id":"2a2b3c4d5e6f7002","type":"function","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Prepare ZADD Args","func":"// msg.payload format: [key, score, JSON-encoded member]\nconst reading = { test: 1, hello: \"world1\", hexstr: \"000102\" };\nmsg.payload = [\n    \"device:96a4:1a87:04\",   // KEYS[1]\n    Date.now(),               // ARGV[1] - score\n    JSON.stringify(reading)   // ARGV[2] - member\n];\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":780,"y":2380,"wires":[["2a2b3c4d5e6f7003"]]},{"id":"2a2b3c4d5e6f7003","type":"redis-lua-script","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","server":"e370dc92b39a7ba4","name":"ZADD with JSON Member","keyval":"1","func":"local foo = redis.call('ZADD', KEYS[1], ARGV[1], ARGV[2])\nreturn foo","stored":false,"block":false,"x":1020,"y":2380,"wires":[["2a2b3c4d5e6f7004"]]},{"id":"2a2b3c4d5e6f7004","type":"debug","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1260,"y":2380,"wires":[]},{"id":"2a2b3c4d5e6f7005","type":"inject","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Decode Member","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":570,"y":2440,"wires":[["2a2b3c4d5e6f7006"]]},{"id":"2a2b3c4d5e6f7006","type":"function","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Prepare Decode Args","func":"msg.payload = [\n    \"device:96a4:1a87:04\",\n    \"{\\\"temperature\\\":22.5,\\\"hello\\\":\\\"world\\\"}\"\n];\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":780,"y":2440,"wires":[["2a2b3c4d5e6f7007"]]},{"id":"2a2b3c4d5e6f7007","type":"redis-lua-script","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","server":"e370dc92b39a7ba4","name":"cjson.decode Extract Field","keyval":"1","func":"local foo = cjson.decode(ARGV[1])\nreturn foo.temperature","stored":false,"block":false,"x":1020,"y":2440,"wires":[["2a2b3c4d5e6f7008"]]},{"id":"2a2b3c4d5e6f7008","type":"debug","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1260,"y":2440,"wires":[]},{"id":"2a2b3c4d5e6f7009","type":"inject","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Build JSON (cjson.encode)","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":570,"y":2500,"wires":[["2a2b3c4d5e6f700a"]]},{"id":"2a2b3c4d5e6f700a","type":"redis-lua-script","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","server":"e370dc92b39a7ba4","name":"cjson.encode Build JSON","keyval":"0","func":"local foo = {}\nfoo.field1 = 1\nfoo.field2 = \"hello world\"\nfoo.field3 = {}\nfoo.field3.name = \"paul\"\nreturn cjson.encode(foo)","stored":false,"block":false,"x":840,"y":2500,"wires":[["2a2b3c4d5e6f700b"]]},{"id":"2a2b3c4d5e6f700b","type":"json","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"","property":"payload","action":"","pretty":false,"x":1020,"y":2500,"wires":[["2a2b3c4d5e6f700c"]]},{"id":"2a2b3c4d5e6f700c","type":"debug","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1260,"y":2500,"wires":[]},{"id":"2a2b3c4d5e6f700d","type":"inject","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Extract Substring","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":570,"y":2560,"wires":[["2a2b3c4d5e6f700e"]]},{"id":"2a2b3c4d5e6f700e","type":"function","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Prepare string.sub Args","func":"msg.payload = [\"hexstr:060708\"];\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":780,"y":2560,"wires":[["2a2b3c4d5e6f700f"]]},{"id":"2a2b3c4d5e6f700f","type":"redis-lua-script","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","server":"e370dc92b39a7ba4","name":"string.sub Extract Substring","keyval":"0","func":"local foo = string.sub(ARGV[1], -6, -1)\nreturn foo","stored":false,"block":false,"x":1020,"y":2560,"wires":[["2a2b3c4d5e6f7010"]]},{"id":"2a2b3c4d5e6f7010","type":"debug","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1260,"y":2560,"wires":[]},{"id":"2a2b3c4d5e6f7011","type":"inject","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Query Sorted Set (ZRANGE)","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":570,"y":2620,"wires":[["2a2b3c4d5e6f7012"]]},{"id":"2a2b3c4d5e6f7012","type":"function","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Prepare ZRANGE Args","func":"msg.payload = [\"device:96a4:1a87:04\"];\nreturn msg;","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":800,"y":2620,"wires":[["2a2b3c4d5e6f7013"]]},{"id":"2a2b3c4d5e6f7013","type":"redis-lua-script","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","server":"e370dc92b39a7ba4","name":"ZRANGE Query Members","keyval":"1","func":"return redis.call('ZRANGE', KEYS[1], 0, -1)","stored":false,"block":false,"x":1020,"y":2620,"wires":[["2a2b3c4d5e6f7014"]]},{"id":"2a2b3c4d5e6f7014","type":"debug","z":"FFF0000000000001","g":"2a2b3c4d5e6f7082","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1260,"y":2620,"wires":[]},{"id":"0b0e24520432625b","type":"global-config","env":[],"modules":{"@flowfuse-certified-nodes/redis":"1.0.0"}}]
{% endrenderFlow %}
