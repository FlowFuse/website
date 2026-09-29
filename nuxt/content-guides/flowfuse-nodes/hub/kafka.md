---
navTitle: Kafka
metaTitle: "Kafka"
navOrder: 2
meta:
   description: Connect a FlowFuse instance to Apache Kafka. Send and receive messages, run consumer groups, commit and roll back manually, manage topics, and read offsets from your flows. A FlowFuse Certified Node.
---

# Kafka

A FlowFuse-certified package that lets you connect to Apache Kafka, send and receive messages, run consumer groups, commit or roll back messages by hand, manage topics, and read offsets from your flows.

## Get the Certified Node in FlowFuse

The Kafka package is part of the FlowFuse Hub Certified Nodes catalogue, which is part of the **FlowFuse Hub** offering. Please contact our sales team at [Contact us](/contact-us/) to learn more or to request access.

### Installation steps

1. Open your instance in the FlowFuse editor.
2. Click the menu icon (☰) in the top-right corner.
3. Select **Manage palette**.
4. Go to the **Install** tab.
5. Switch to the **FlowFuse Hub Certified Nodes** category.
6. Search for `@flowfuse-certified-nodes/kafka`.
7. Click **Install**.

The Kafka nodes then appear in your palette, ready to drag onto the canvas.

> **Note:** Newly installed nodes are picked up automatically, no restart needed. Restart is only required when you update a node that's already installed: restart any remote instance or hosted instance running the previous version.

## Features

- Send messages to any topic, and set the key, partition, and compression
- Read from several topics at once, each with its own starting offset and partition
- Match topics by pattern, so new topics are picked up without a redeploy
- Consumer groups, so several consumers can share the work
- Commit and roll back by hand, instead of letting Kafka mark messages as done straight away
- Convert `/` to `.` in topic names, so MQTT-style topics work with Kafka
- Manage topics from a flow: create, delete, and add partitions
- Read offsets, so you can measure how far behind a consumer is
- TLS, including self-signed certificates, and SASL PLAIN username and password authentication

## Use case

Kafka stores messages instead of just passing them on. MQTT sends a message and forgets it. Kafka keeps it for a set period, so a system that was offline can catch up later, and a new consumer can read messages that arrived before it started.

That makes it a good fit for these jobs:

- **Send production data to IT systems.** Write each reading to a topic with **Kafka Producer**. An ERP, MES, or data lake reads that topic in its own time. It never connects to your Node-RED instance directly.
- **Feed several systems from one topic.** Point more than one **Kafka Consumer** at the same topic. Each one gets every message, and each one keeps its own place in the topic. A dashboard, an alert flow, and a historian can all read the same data without getting in each other's way.
- **Ride out an outage.** If a system downstream goes down, messages build up in the topic instead of being lost. You can also start a consumer at an older offset to read a shift's data again after fixing a bug.
- **Handle more messages.** Use **Kafka Consumer Group** when one consumer cannot keep up. Members of a group split the work rather than each doing all of it.
- **Make sure nothing is dropped.** Turn off auto commit and use **Kafka Commit** and **Kafka Rollback**. A message is only marked as done once your flow has finished with it, so a failure part-way through does not lose data.

## Nodes in this package

| Node                     | Inputs | Outputs | Purpose                                                            |
| ------------------------ | ------ | ------- | ------------------------------------------------------------------ |
| **Kafka Broker**         | –      | –       | Config node holding the hosts, timeouts, and security details       |
| **Kafka Producer**       | 1      | 0       | Sends a message to a topic                                          |
| **Kafka Consumer**       | 0      | 1       | Reads messages from one or more topics                              |
| **Kafka Consumer Group** | 0      | 1       | Reads messages as part of a group, sharing topics with other members |
| **Kafka Commit**         | 1      | 2       | Marks a message as done, when auto commit is off                    |
| **Kafka Rollback**       | 1      | 2       | Leaves a message uncommitted and closes the consumer                |
| **Kafka Admin**          | 1      | 2       | Runs admin commands, such as creating topics or listing groups       |
| **Kafka Offset**         | 1      | 2       | Reads offset details for a topic or a consumer group                 |

Where a node has two outputs, the first fires on success and the second on failure. Wire the second one up so errors don't disappear.

## Set up the connection (Kafka Broker)

Create **one Kafka Broker config node for each Kafka cluster**, then point your other nodes at it. You only enter the connection details once, and the nodes that use it share a single connection to the cluster.

Five nodes have a **Broker** field: Kafka Producer, Kafka Consumer, Kafka Consumer Group, Kafka Admin, and Kafka Offset. Kafka Commit and Kafka Rollback do not, because they work out which connection to use from the message they receive.

1. Drag one of those five nodes onto the canvas and open it
2. Click the **+** button next to **Broker**
3. Give the connection a **Name**, such as `Production Kafka`
4. Fill in the **Connection** tab, then the **Options** tab if you need to
5. Click **Add**, then **Done**

Once the connection exists, the other nodes pick it from their own **Broker** dropdown. Use the pencil button beside that dropdown to edit it later.

### Connection tab

| Field                            | What it does                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| **Hosts**                        | A table of brokers to start from. Click **+Add** for each one and fill in its **Name** (hostname or IP) and **Port** |
| **Hosts process.env name**       | The name of an environment variable holding the host list, used instead of the table. See below |
| **via Zookeeper**                | `true`/`false`, default `true`. Legacy field from when clients connected through ZooKeeper. Leave it as it is |
| **Use TLS**                      | Tick this if your cluster requires TLS. Ticking it also reveals a field for picking a TLS configuration node, where the certificates go |
| **Self Sign**                    | Controls the certificate check behind **Use TLS**. Left unticked, certificates are not verified, which is what lets a self-signed certificate through. Tick it to have the certificate verified. Turning verification off is for test environments, and best avoided in production |
| **Use Credentials (SASL plain)** | Tick this to authenticate with a username and password                               |
| **User**                         | Username, used when **Use Credentials** is ticked                                    |
| **Password**                     | Password, used when **Use Credentials** is ticked                                    |

Authentication here is SASL PLAIN only, so the username and password travel in the clear unless you also turn on **Use TLS**. Tick both together on anything but a local test cluster.

### Keeping hosts out of your flows

Typing hostnames straight into the table works, but it ties the flow to one cluster. If the same flow runs against test and production, keep the hosts in an instance environment variable instead.

The **Hosts process.env name** field takes the *name* of the variable, not its value:

1. Go to **Instance Settings → Environment** and add a variable, for example `KAFKA_HOSTS`. Its value is the host list as JSON:

   ```text
   [{"host":"kafka-1.example.com","port":9092}]
   ```

2. Restart the instance so Node-RED picks up the variable.
3. In the Kafka Broker config node, put `KAFKA_HOSTS` in the **Hosts process.env name** field.

Each environment can now point at its own cluster, and the flow stays the same. See [Using environment variables in Node-RED](/blog/2023/01/environment-variables-in-node-red/) for more on environment variables.

### Options tab

These control the connection itself rather than anything about your messages. The defaults are sensible, so most people never touch this tab.

| Field                      | Options        | Default | What it does                                                                 |
| -------------------------- | -------------- | ------- | ---------------------------------------------------------------------------- |
| **Connect Timeout (ms)**   |                | 10000   | How long to wait when opening a connection before giving up                   |
| **Request Timeout (ms)**   |                | 30000   | How long to wait for a reply from a broker                                    |
| **Auto Connect**           | `True`/`False` | True    | `True` connects on deploy. `False` waits until a node actually needs the connection |
| **Idle Connection (mins)** |                | 5       | How long a quiet connection is kept open before it is dropped                 |
| **Reconnect On Idle**      | `True`/`False` | True    | `True` reopens the connection after it has been dropped, so a quiet flow keeps working. Set to `False` only if you want the connection to stay closed |
| **Max Async Requests (ms)** |               | 10      | How many requests the client keeps in flight at once. The label says ms, but it is a count, not a time |
| **Check Interval (secs)**  |                | 10      | How often the brokers are checked to see whether they can still be reached |

On a slow or busy network, raising **Connect Timeout** and **Request Timeout** is usually the first thing to try.

The examples on this page use `127.0.0.1` and `9092` as stand-ins for a local Kafka broker. Replace them with your own details.

## Send messages (Kafka Producer)

**Kafka Producer** sends `msg.payload` to a topic. It has one input and no output.

| Field                          | Options                                          | Default  | What it does                                                                 |
| ------------------------------ | ------------------------------------------------ | -------- | ---------------------------------------------------------------------------- |
| **Type**                       | `Producer`, `High Level (round robin)`           | Producer | `Producer` writes to the partition you pick. `High Level (round robin)` spreads messages across the topic's partitions using round robin instead |
| **Broker**                     | your Kafka Broker configs                        |          | Which connection to send through                                              |
| **Topic**                      |                                                  |          | The topic to write to. Can also come from `msg.topic`, while **Message Topic Overides** is on |
| **Message Topic Overides**     | `true`/`false`                                   | true     | When `true`, `msg.topic` takes the place of the **Topic** set here. Set it to `false` to pin the node to one topic |
| **Message Overides**           | `true`/`false`                                   | true     | When `true`, `msg.key`, `msg.partition`, and `msg.attributes` take the place of the values set here |
| **Require Ack**                | `0`, `1`                                         | 1        | How many brokers must confirm the write. The node treats `0` the same as `1`, so a write always waits for the partition leader |
| **Ack Timeout (Ms)**           |                                                  | 100      | How long to wait for those confirmations                                      |
| **Partitioner**                | see [Partitioner options](#partitioner-options)  | default  | How a partition is picked when you haven't set one                            |
| **Key**                        |                                                  |          | The message key. Consumers read it back from `msg._kafka.key`                 |
| **Partition**                  |                                                  | 0        | The partition to write to. Numbering starts at `0`. Ignored when **Type** is `High Level (round robin)` |
| **Compression**                | see [Compression options](#compression-options)  | none     | Compresses messages before sending. Worth turning on for high volumes of text |
| **Convert message from JSON**  | checkbox                                         | Off      | Turns an object payload into text for you, so you don't need a separate `json` node |
| **Topic replace / with .**     | checkbox                                         | Off      | Converts the first `/` in a topic name coming from `msg.topic` to `.`, so MQTT-style topics work with Kafka |
| **producer max Q depth**       |                                                  | 1000     | How many messages the node holds while waiting to send                         |
| **Deadletter Topic**           |                                                  | deadletter | Where a message goes when the send fails. The whole `msg` is written there as gzipped JSON. Clear the field to discard failed messages instead |

**Key** is a typed input, so you can enter a fixed string or point it at a message property.

**Require Ack** offers only `0` and `1`, and the node falls back to `1` when it is left at `0`, so every write waits for the partition leader to confirm it. Waiting for every replica, which Kafka itself writes as `acks=-1`, is not available from this node.

### Partitioner options

The partitioner decides which partition a message goes to. It only comes into play when the message itself doesn't say: set **Partition** on the node, or `msg.partition` on the message, and the partitioner is bypassed.

| Option    | What it does                                                                                          |
| --------- | ----------------------------------------------------------------------------------------------------- |
| `default` | Sends every message to the same partition, the first one. Fine for a single-partition topic, and a common surprise on a topic with several |
| `random`  | Picks a partition at random for each message. Spreads the load, but consecutive messages can land out of order relative to each other |
| `cyclic`  | Works through the partitions in turn, one message each. An even spread, and more predictable than random |
| `keyed`   | Hashes the **Key** to choose the partition, so the same key always lands on the same partition. Messages for one key then stay in the order you sent them |
| `custom`  | Uses a partitioner supplied in code instead of one of the strategies above                             |

Pick `keyed` when order matters within a group of messages — readings from one machine, events for one order number — and set **Key** to whatever identifies that group. Kafka only guarantees order inside a partition, so this is the setting that keeps a machine's readings sequential.

Pick `cyclic` when you only care about spreading work evenly and order doesn't matter.

`default` is worth a second look if you have a multi-partition topic and find everything piling into partition `0`.

### Compression options

The **Compression** dropdown offers:

| Option                                                              | Notes                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| `none`                                                              | The default. No compression                                   |
| `gzip`, `gzip best speed`, `gzip best compression`                  | Widely understood by other Kafka clients                      |
| `zip`, `zip best speed`, `zip best compression`                     |                                                               |
| `Lempel-Ziv-Markov best speed`, `Lempel-Ziv-Markov best compression` | LZMA                                                         |
| `Brotli`                                                            |                                                               |
| `Snappy`                                                            | Fast, with modest size savings. A common choice for Kafka     |
| `Deflate`                                                           |                                                               |

Where a codec has **best speed** and **best compression** variants, you are trading CPU time against message size. The plain option sits between the two.

Whatever you pick, whatever reads the topic has to understand it. If your consumers are also Kafka Consumer nodes, set the same codec on their **Decompression** field. If anything else reads the topic, stick to `gzip` or `Snappy`, which every Kafka client handles. The other codecs here are not part of the standard Kafka set, so a Java or Python consumer may not be able to read them.

## Receive messages (Kafka Consumer)

**Kafka Consumer** has no input. It sends out one `msg` for every Kafka message that arrives.

One field sits above the tabs, alongside **Name**:

| Field      | Options                   | What it does                     |
| ---------- | ------------------------- | -------------------------------- |
| **Broker** | your Kafka Broker configs | Which connection to read through |

The remaining settings are split across four tabs: **Topics**, **Options**, **Fetch**, and **Encoding**.

### Topics tab

Add a row to the **Topic** table for each topic you want, using **+Add**. Each row has three columns:

| Column        | What it does                |
| ------------- | --------------------------- |
| **Name**      | The topic name              |
| **Offset**    | Where to start reading from |
| **Partition** | Which partition to read     |

Tick **wildcard (regex)** to treat the names as patterns instead of exact topics. Matching topics are picked up as they appear and dropped when they go away. Kafka is checked once a minute, so a new topic can take up to a minute to show up.

This is the setting to reach for when a topic is created per machine or per line. A pattern like `line.*\.temperature` keeps working as lines are added, with no redeploy.

### Options tab

| Field                         | Options        | Default            | What it does                                                       |
| ----------------------------- | -------------- | ------------------ | ------------------------------------------------------------------ |
| **Group Id**                  |                | `kafka-node-group` | The group this consumer belongs to. Change it if two flows read the same topic and shouldn't share a position |
| **Auto Commit**               | `True`/`False` | True               | `True` lets Kafka mark messages as done on a timer. `False` hands that job to Kafka Commit and Kafka Rollback |
| **Auto Commit Interval (Ms)** |                | 5000              | How often those automatic commits happen. Ignored when **Auto Commit** is `False` |

### Fetch tab

How much data the consumer pulls at a time. Leave these alone unless you are chasing throughput or latency.

| Field                   | Default | What it does                                                                  |
| ----------------------- | ------- | ----------------------------------------------------------------------------- |
| **Fetch Max Wait (Ms)** | 100     | How long the broker holds a reply back, hoping more data turns up              |
| **Fetch Min Bytes**     | 1       | The smallest amount of data worth replying with                                |
| **Fetch Max Bytes**     | 1048576 | The most data to pull in one go, 1 MB by default                                |

Raising **Fetch Min Bytes** and **Fetch Max Wait** means fewer, fuller round trips, which suits high message rates. Lowering them gets messages to your flow sooner, which suits alerting.

### Encoding tab

| Field                       | Options                          | Default | What it does                                                                 |
| --------------------------- | -------------------------------- | ------- | ---------------------------------------------------------------------------- |
| **From Offset**             | `latest`, `earliest`, `none`     | latest  | Where to start when the **Topic** table has no offset. `latest` reads only new messages, `earliest` starts from the oldest message still held, `none` fails if there is no committed position |
| **Encoding**                | `utf8`, `raw`                    | utf8    | How the message value is decoded. `raw` gives you the bytes untouched, for binary payloads |
| **Key Encoding**            | `utf8`, `raw`                    | utf8    | The same, for the message key                                                 |
| **Convert message to JSON** | checkbox                         | Off     | Parses the message into an object for you, so you don't need a separate `json` node |
| **Decompression**           | `none`, `gzip`, `zip`, `Lempel-Ziv-Markov`, `Brotli`, `Snappy`, `Inflate` | none | How to decompress messages that were compressed by the producer. Must match the codec the producer used |

The **Decompression** list is shorter than the producer's, because the *best speed* and *best compression* variants only affect compressing. Pick the plain codec: a producer set to `gzip best compression` is read back with `gzip`. The producer's `Deflate` is listed here as `Inflate`, which is the same codec.

Pick `earliest` on **From Offset** when a new consumer needs the history that is already in the topic. Pick `latest` when it should only see what happens from now on.

### What arrives in the message

Every message the node sends out carries three things:

- **`msg.payload`** — the message itself. With the default `utf8` encoding this is text, unless you turn on **Convert message to JSON**. See [Payloads are text](#payloads-are-text)
- **`msg.topic`** — the Kafka topic the message came from, so a flow reading several topics can tell them apart
- **`msg._kafka`** — the details from Kafka: `topic`, `partition`, `offset`, `key` (the key set by the producer), and `highWaterOffset` (the end of that partition, so `highWaterOffset - offset` is how far behind this message was read)

Keep `msg._kafka` on the message if you plan to commit or roll back later, because Kafka Commit and Kafka Rollback both need it.

## Share the work (Kafka Consumer Group)

**Kafka Consumer Group** reads messages the same way as Kafka Consumer, but members that use the same **Group Id** split the work between them. Kafka gives each topic and partition to one member only, and hands them out again when a member joins or leaves.

Use a group when you need to handle more messages. Use separate Kafka Consumer nodes when every consumer needs to see every message.

Above the tabs it has **Type** and **Broker**. **Type** offers only `Base`, so there is nothing to decide there. Kafka Consumer has no **Type** field at all.

### Topics tab

Add a row for each topic. Unlike Kafka Consumer, you only give the **Name** here — there is no per-topic offset or partition.

### Options tab

| Field                            | Options                      | Default     | What it does                                                            |
| -------------------------------- | ---------------------------- | ----------- | ----------------------------------------------------------------------- |
| **Group Id**                     |                              | `aGroup`    | The group name. Every member sharing the work uses the same one           |
| **Session Timeout (ms)**         |                              | 15000       | How long before a quiet member is treated as gone and its work reassigned |
| **Protocol**                     | `Round Robin`, `Range`       | Round Robin | How partitions are shared out. Round robin deals them out one at a time, range gives each member a contiguous block |
| **Encoding**                     | `utf8`, `raw`                | utf8        | How the message value is decoded                                         |
| **From Offset**                  | `latest`, `earliest`, `none` | latest      | Where a brand new group starts reading. Once the group has committed a position, that position wins |
| **Commit Offsets On First Join** | `True`/`False`               | True        | Records a starting position as soon as the group forms, rather than waiting for the first commit |
| **Out Of Range Offset**          | `earliest`, `latest`, `none` | earliest    | Where to go if the stored offset no longer exists, usually because those messages have aged out |

A group cannot split the work more ways than there are topics and partitions. Any extra members sit idle, which is worth remembering before adding a fourth consumer to a three-partition topic.

There is no **Auto Commit** setting here, and no **Convert message to JSON**. Use a `json` node in the flow if you need to parse the payload.

## Commit and roll back (Kafka Commit, Kafka Rollback)

By default a consumer commits automatically, so Kafka treats a message as done as soon as it hands it over. If your flow then fails, the message is gone. Committing by hand instead means a message is only marked as done once your flow has finished with it.

### What each node does

**Kafka Commit** commits a message that was read without auto commit. Put it at the end of the path that worked.

**Kafka Rollback** rolls the message back and closes the consumer that read it. The message stays uncommitted and Kafka stops handing it out. Put it on the error path, then fix the problem and open the consumer again to carry on.

### What they need to work

- **Auto commit must be off.** Set **Auto Commit** to `False` on the Kafka Consumer node. Neither node does anything useful while the consumer is committing on its own.
- **The message must still carry `msg._kafka`.** Both nodes use it to find the message and its consumer. A `change` or `function` node that rebuilds `msg` from scratch will remove it.
- **They only work with Kafka Consumer.** Kafka Consumer Group has no auto commit setting to turn off.

Neither node has a **Broker** field, or any setting beyond **Name** — they get the connection from the message. Both have two outputs: the first for success, the second for failure.

> **Note**: Kafka keeps sending messages to a consumer whether or not an earlier commit is still outstanding. A commit therefore marks every message up to that point as done, not just the one that triggered it. If that matters to you, keep the number of messages in flight low.

## Administration (Kafka Admin)

**Kafka Admin** runs one admin command against the cluster. These are the same jobs you would otherwise do with the `kafka-topics.sh` and `kafka-configs.sh` scripts on a broker. Running them from a flow means you can create topics as part of a deployment, show cluster state on a dashboard, or check consumer groups on a schedule.

The node has only **Name** and **Broker**. Everything else comes from the message. It has two outputs, one for success and one for failure.

### How to send a command

Every command uses the same two message properties:

- **`msg.topic`** — the command name, spelled as in the tables below. Capital letters matter
- **`msg.payload`** — the command's arguments, as JSON. Leave it out for commands that take none

The reply comes back on `msg.payload` from the first output.

Watch out for one thing: `msg.topic` holds the **command name**, not a Kafka topic name. The topic a command acts on goes in `msg.payload`. This trips up most people the first time.

An `inject` node is the easiest way to drive it. Set its **Topic** to the command and its **Payload** to the JSON, wire it into Kafka Admin, and add a `debug` node to each output so you see both the reply and any error.

### Commands that take no arguments

Send these with `msg.topic` set and no payload.

| Command              | What comes back                                              |
| -------------------- | ------------------------------------------------------------ |
| `listTopics`         | Every topic in the cluster, with its partitions and replicas |
| `listGroups`         | All groups the coordinator knows about                        |
| `listConsumerGroups` | Consumer groups only                                          |

These three are the only commands that run without a payload. Everything else in the next table needs one, and a command name the node doesn't recognise comes out of the second output as an `invalid request` error.

### Commands that take arguments

Arguments always go in `msg.payload`.

| Job                   | Commands                                                                            |
| --------------------- | ----------------------------------------------------------------------------------- |
| **Topics**            | `createTopics`, `deleteTopics`, `describeTopics`                                     |
| **Partitions**        | `createPartitions`, `electPreferredLeaders`                                          |
| **Settings**          | `alterConfigs`, `incrementalAlterConfigs`                                            |
| **Consumer groups**   | `describeGroups`, `describeConsumerGroups`, `deleteConsumerGroups`, `listConsumerGroupOffsets` |
| **Records**           | `deleteRecords`                                                                      |
| **ACLs**              | `createAcls`, `describeAcls`, `deleteAcls`                                            |
| **Log directories**   | `describeLogDirs`, `alterReplicaLogDirs`                                              |
| **Configuration**     | `describeConfigs`                                                                     |
| **Delegation tokens** | `createDelegationToken`, `renewDelegationToken`, `expireDelegationToken`             |

### Examples

**Create a topic with three partitions.** Set `msg.topic` to `createTopics` and `msg.payload` to:

```json
[{ "topic": "Temperature", "partitions": 3, "replicationFactor": 1 }]
```

The payload is an array, so one message can create several topics at once. Add `configEntries` to set topic settings at the same time, such as keeping messages for seven days:

```json
[{
  "topic": "Temperature",
  "partitions": 3,
  "replicationFactor": 1,
  "configEntries": [{ "name": "retention.ms", "value": "604800000" }]
}]
```

**List every topic.** Set `msg.topic` to `listTopics` and send no payload.

**Read a topic's settings.** Set `msg.topic` to `describeConfigs` and `msg.payload` to `{ "type": "topic", "name": "Temperature" }`. Unlike the other commands, this one takes a plain object rather than an array, and `type` can be `topic` or `broker`.

**Add partitions to a topic.** Set `msg.topic` to `createPartitions`. You can only ever add partitions, never remove them, so this cannot be undone. Adding partitions also changes which partition each key goes to, so existing keys stop landing where they used to.

**Delete a topic.** Set `msg.topic` to `deleteTopics` and put the topic names in the payload. This only works if the brokers have `delete.topic.enable` turned on, which is the default from Kafka 1.0 onwards. If it is off, the request is accepted and then ignored.

### Things to watch out for

Creating a topic takes a moment. The reply means the request was accepted, not that every broker knows about the topic yet, so a `listTopics` sent straight afterwards may not include it. If a flow creates a topic and then writes to it, add a short delay rather than wiring the two together directly.

`replicationFactor` cannot be higher than your number of brokers. Asking for `3` on a single-broker test cluster will fail, so use `1` locally and set the real value per environment with an environment variable.

You may not need to create topics at all. If the brokers have `auto.create.topics.enable` turned on, writing to an unknown topic creates it with the default settings. That is handy while testing and usually unwanted in production, because a typo quietly creates a new topic instead of failing.

Admin commands also need the right permissions. On a cluster with ACLs, the credentials in your Kafka Broker config need cluster-level rights, so read-only credentials that work fine for a consumer will not work here.

## Offsets (Kafka Offset)

**Kafka Offset** reads offset details from Kafka. Like Kafka Admin, the node has only **Name** and **Broker**, takes everything else from the message, and has two outputs.

It uses two message properties:

- **`msg.action`** — which of the four actions to run. You can also put this in `msg.topic`
- **`msg.payload`** — the arguments for that action

| Action                 | What it returns                                           |
| ---------------------- | --------------------------------------------------------- |
| `fetch`                | Offsets for a topic and partition, up to `maxNum` of them |
| `fetchEarliestOffsets` | The oldest offsets still held for a topic                  |
| `fetchLatestOffsets`   | The newest offsets for a topic, in other words the end of it |
| `fetchCommits`         | The offsets a consumer group has committed                 |

Note the spelling of `fetchEarliestOffsets`: it is plural, and the node's own built-in help has it wrong. An action the node doesn't recognise comes out of the second output as `invalid msg action or topic`.

### Payloads

`fetch` takes a partition and a limit:

```json
[{ "topic": "test", "partition": 0, "maxNum": 100 }]
```

`fetchEarliestOffsets` and `fetchLatestOffsets` take the same payload as `fetch`, because all three run the same underlying request. The `time` field is what decides which end of the topic you get: `-2` for the earliest offset, `-1` for the latest.

```json
[{ "topic": "test", "partition": 0, "time": -2 }]
```

Leave `time` out and you get the offset as of now, which is the latest. So `fetchLatestOffsets` works with the short payload below, while `fetchEarliestOffsets` needs `"time": -2` to return what its name promises.

```json
[{ "topic": "test" }]
```

`fetchCommits` is the odd one out. Its payload is an object rather than an array, and it needs the group as well as the topics:

```json
{
  "groupid": "aGroup",
  "topics": [{ "topic": "test" }]
}
```

Note the spelling: `groupid`, all lower case.

### Measuring how far behind a consumer is

Run `fetchLatestOffsets` for the topic and `fetchCommits` for the group reading it, then subtract one from the other. The gap is how many messages the group still has to get through. Raise an alert when it grows past a threshold you are comfortable with.

A Kafka Consumer's own messages carry the same figures, if you would rather not poll: `msg._kafka.highWaterOffset` minus `msg._kafka.offset` is the lag at the moment that message was read.

These are also the offsets you put in a consumer's **Topic** table when you want to read a period of data again.

## Payloads are text

Kafka stores messages as bytes. With the default `utf8` encoding, a consumer gives you the message as text, and a producer expects text.

The nodes can handle the conversion for you, or you can do it in the flow:

- **Sending:** Kafka Producer already stringifies an object payload for you, so an object goes out as JSON text with no extra work. Turn on **Convert message from JSON** to stringify every payload, including strings and numbers, or put a [`json`](/docs/node-red/core-nodes/parsers/json/) node in stringify mode before the producer if you would rather control it in the flow.
- **Receiving:** turn on **Convert message to JSON** on Kafka Consumer, or put a `json` node in parse mode after it.

Kafka Consumer Group has no equivalent option, so use a `json` node there.

For a plain number, a `json` node is more than you need. A `change` node that sets `msg.payload` to the JSONata expression `$number(msg.payload)` is enough.

For binary payloads, set **Encoding** to `raw` on the consumer and skip the `json` node altogether.
