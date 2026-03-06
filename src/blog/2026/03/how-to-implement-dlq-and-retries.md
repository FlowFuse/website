---
title: "How to Stop Silent Pipeline Failures From Swallowing Your IIoT Data"
subtitle: "When your pipeline fails, every dropped message is data you'll never get back, until now"
description: "Most IIoT pipelines fail quietly. No record, no alert, no way to know what was lost. This guide shows you how to build a fault-tolerant data pipeline that catches every failure, retries intelligently, and gives you full visibility into what went wrong, when it happened, and how to fix it."
date: 2026-03-05
keywords: dead letter queue, IIoT, exponential backoff, retry pattern, message queue, error handling, edge computing, industrial IoT, FlowFuse, message broker, data pipeline, fault tolerance
authors: ["sumit-shinde"]
image: /blog/2026/03/images/dlq-blog-tile.png
tags:
- flowfuse
---

Somewhere in your IIoT pipeline, a message just failed. You don't know which one. You don't know when. And unless you have a Dead Letter Queue, you never will.

<!--more-->

In industrial environments, failure is not the exception. It is the contract. Networks partition. APIs rate-limit. A sensor alert fires at the wrong moment and vanishes without a trace. And unlike consumer applications, missed messages in manufacturing have a real cost.

That cost is invisible by default. No error surface. No audit trail. Just data that was there and then wasn't. FlowFuse changes that. It gives your IIoT pipelines the production-grade tooling they need to handle failure the right way: catch it, retry it, and preserve everything that couldn't be recovered so you can act on it later.

This guide shows you how to build exactly that. You will walk away with a production-ready pattern for catching failed messages, retrying them with exponential backoff, and routing the unrecoverable ones into a Dead Letter Queue where they can be inspected, replayed, or discarded on your terms.

## What Is a Dead Letter Queue?

A Dead Letter Queue is a holding area for messages that could not be delivered. When a message fails processing and has no path forward, it gets routed to the DLQ instead of being dropped or causing your flow to crash.

A message ends up in a DLQ for four reasons. It exceeded the maximum number of retry attempts. It is malformed and cannot be parsed. The target system is permanently unavailable. Or a business rule explicitly rejected it.

The value of a DLQ is not just storage. It is observability. Every failed message arrives with its full payload, error reason, retry history, and timestamps intact. You know exactly what failed, when it failed, and how many times it was attempted before giving up. That information is what makes recovery possible.

Without a DLQ, failed messages disappear silently. With one, failure becomes something you can inspect, act on, and fix.

## The Retry Pattern: Exponential Backoff

Before a message earns its place in the DLQ, you should try, and try again. But naive retries are dangerous. Hammering a failing service every 100ms does not give it time to recover. It makes things worse for everyone.

The industry standard is **exponential backoff with jitter**:
```
delay = min(base * 2^attempt, max_delay) + random_jitter
```

| Attempt | Base Delay | With Jitter (approx.) |
|---------|-----------|----------------------|
| 1       | 1s        | 1.2s                 |
| 2       | 2s        | 2.5s                 |
| 3       | 4s        | 4.1s                 |
| 4       | 8s        | 8.9s                 |
| 5       | —         | → DLQ               |

The jitter prevents the **thundering herd problem**, where every failed client retries at exactly the same moment and overloads the service all over again.

## Building It

In this section, we'll build this pattern in FlowFuse step by step.

FlowFuse is the Industrial Application Platform that connects any machine or system, collects data across any protocol, and lets you act on it at production scale, with enterprise features like role-based access control, centralized device management, audit logging, and team collaboration built in. It also includes FlowFuse Tables, a built-in database service that gives all your instances a single shared DLQ, so every failed message across your entire fleet lands in one place, visible and queryable from anywhere. [Contact us](/contact-us/) to get started.

The architecture has five components:

1. Retry state initializer
2. Catch node for centralized error handling
3. Retry manager with exponential backoff
4. Delay node for controlled retries
5. Dead Letter Queue backed by FlowFuse Tables

Here's how they connect:
```mermaid
flowchart TD
    A[Input] --> B[Process]
    B --> C[Success Handler]
    B -->|on error| D[Retry Manager]
    D -->|within max retries| E[Delay]
    E --> B
    D -->|max retries exceeded| F[Dead Letter Queue]
    linkStyle default stroke:#4F46E5,stroke-width:2px
    style A fill:#ffffff,color:#4B5563,stroke:#4F46E5
    style B fill:#ffffff,color:#4B5563,stroke:#4F46E5
    style C fill:#ffffff,color:#4B5563,stroke:#4F46E5
    style D fill:#ffffff,color:#4B5563,stroke:#4F46E5
    style E fill:#ffffff,color:#4B5563,stroke:#4F46E5
    style F fill:#ffffff,color:#4B5563,stroke:#4F46E5
```

Every step below maps directly to one part of that diagram. Follow it in order.

### Step 1: Initialize Retry State

This function node runs once when a fresh message enters the pipeline. It attaches retry metadata to `msg` so every downstream node knows where the message stands.

1. Drag a **function node** onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `Init Retry State`.
4. In the **Function** tab, paste the following code:
```javascript
msg._originalPayload = RED.util.cloneMessage(msg.payload);

if (!msg._retry) {
    msg._retry = {
        attempts: 0,
        maxAttempts: 5,
        lastError: null,
        originalTimestamp: new Date().toISOString(),
        topic: msg.topic
    };
}

return msg;
```

5. Click **Done**.

Two things are happening here worth noting. First, `msg._originalPayload` saves a deep clone of the original payload using `RED.util.cloneMessage` before anything touches it. A plain assignment (`= msg.payload`) would only copy a reference. If a downstream node mutates the object in place, the saved copy changes too. `cloneMessage` ensures the DLQ always holds the payload exactly as it arrived. Some nodes, like the HTTP Request node, also overwrite `msg.payload` with their response body, so this clone is what gets stored in the DLQ later. Second, the `if (!msg._retry)` check ensures initialization only runs on a fresh message. When the retry loop sends the message back through, this block is skipped entirely and the existing retry state is preserved. The underscore prefix on `msg._retry` also protects it from being overwritten by processing nodes.

### Step 2: Add a Catch Node

The catch node monitors your processing nodes and intercepts any message that causes an error, routing it to the retry logic instead of letting it disappear.

Scoping it to `All nodes` is tempting but dangerous. If any node in the retry infrastructure itself throws, for example the Retry Manager calling `node.error()`, the catch node will intercept it and feed it back into the retry loop, creating an infinite loop. Scoping it explicitly to your processing nodes prevents this.

1. Drag a **catch node** onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `Catch Errors`.
4. Set **Catch errors from** to `Selected nodes`.
5. Select only the nodes where real failures can occur. In practice, these are the nodes that talk to the outside world: MQTT nodes, HTTP request nodes, database nodes, WebSocket nodes, or anything that reaches beyond the flow itself. Taking the example flow provided at the end of this guide, that means selecting the HTTP Request node and the Check Response function node.
6. Click **Done**.

Next, add a normalization step between the catch node and the retry manager. Built-in nodes sometimes attach `msg.error` as an object rather than a string, which causes problems downstream. This function node converts it to a consistent string format.

1. Drag a **function node** onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `Normalize Error`.
4. In the **Function** tab, paste:
```javascript
msg.retry = msg._retry;

if (typeof msg.error === 'object') {
    msg.error = msg.error.message || JSON.stringify(msg.error);
}

msg.error = msg.error || 'Processing failed';
return msg;
```

5. Click **Done**.
6. Wire the **catch node** output to the **Normalize Error** input.

### Step 3: Add the Retry Manager

This is the decision node. It increments the attempt count, calculates the backoff delay, and routes the message either back into the pipeline for another try or forward to the DLQ if retries are exhausted.

1. Drag a **function node** onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `Retry Manager`.
4. Go to the **Setup** tab and set **Outputs** to `2`. This gives the node two output ports, one for retrying and one for the DLQ.
5. Go to the **Function** tab and paste:
```javascript
const MAX_ATTEMPTS = msg.retry.maxAttempts || 5;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30000;

msg.retry.attempts += 1;
msg.retry.lastError = msg.error || 'Unknown error';
msg.retry.lastAttemptAt = new Date().toISOString();

// keep _retry in sync
msg._retry = msg.retry;

if (msg.retry.attempts >= MAX_ATTEMPTS) {
    msg.retry.exhausted = true;
    msg.dlq = {
        reason: 'Max retries exceeded',
        attempts: msg.retry.attempts,
        lastError: msg.retry.lastError,
        deadAt: new Date().toISOString()
    };
    return [null, msg];
}

const exponential = BASE_DELAY_MS * Math.pow(2, msg.retry.attempts - 1);
const jitter = Math.random() * 1000;
const delay = Math.min(exponential + jitter, MAX_DELAY_MS);

msg.delay = Math.round(delay);

node.status({
    fill: 'yellow',
    shape: 'ring',
    text: `Retry ${msg.retry.attempts}/${MAX_ATTEMPTS} in ${Math.round(delay / 1000)}s`
});

return [msg, null];
```

6. Click **Done**.
7. Wire the **Normalize Error** output to the **Retry Manager** input.

`return [msg, null]` sends the message out of **Output 1** (retry path). `return [null, msg]` sends it out of **Output 2** (DLQ path). No switch node is needed. The routing is built into the return statement.

### Step 4: Add the Delay Node

The delay node holds the message for the calculated backoff period before it re-enters the pipeline. Without this, retries fire instantly and you are hammering an already-struggling service.

1. Drag a **delay node** onto the canvas.
2. Double-click it to open its settings.
3. In the **Name** field, enter `Backoff Delay`.
4. Set **Action** to `Delay each message`.
5. Set **For** to `Override delay with msg.delay`. This tells the node to use the backoff value the Retry Manager calculated rather than a fixed duration.
6. Click **Done**.
7. Wire **Retry Manager Output 1** to **Backoff Delay** input.

Each pass through the loop, the delay gets longer. Roughly 1 second on the first retry, 2 seconds on the second, 4 on the third, and so on. When the Retry Manager decides retries are exhausted, it stops sending to Output 1 entirely and routes to Output 2 instead, ending the loop.

Wire **Backoff Delay** output to your processing node input. This completes the retry loop.

### Step 5: Set Up the DLQ Handler

When a message reaches this stage, retries are finished. The goal now is to preserve everything: the original payload, the error reason, how many attempts were made, and the timestamp. That context is what makes later recovery possible. Without a persistent store, that context disappears the moment the flow restarts, the device reboots, or the pipeline moves on to the next message. And in a multi-instance deployment, you need a store that is accessible across every instance in your fleet, not just the device the failure happened on.

[FlowFuse Tables](/blog/2025/08/getting-started-with-flowfuse-tables/) gives you exactly that: a managed PostgreSQL database that connects directly to your flows with no credentials to configure and no external infrastructure to manage, making it the right storage layer for a production DLQ.

> **Note:** FlowFuse Tables requires an Enterprise plan.

#### 5a: Create the DLQ Table

1. In FlowFuse, go to **Team Settings** and [enable the Tables feature](/blog/2025/08/getting-started-with-flowfuse-tables/#step-1%3A-enable-the-database-in-your-project) for your team.
2. Once enabled, drag a **Query node** from the FlowFuse category onto the canvas.
3. The Query node is pre-configured to connect to your FlowFuse-managed database automatically. No credentials needed.
4. Paste the following into the Query field:
```sql
CREATE TABLE IF NOT EXISTS "dlq" (
  "id" TEXT PRIMARY KEY,
  "topic" TEXT,
  "payload" TEXT,
  "attempts" INTEGER,
  "last_error" TEXT,
  "captured_at" TEXT
)
```

5. Connect an **Inject node** set to run once on deploy to the Query node input.
6. Click **Done** and deploy.

> **Tip:** If you prefer, you can also create the table directly from the **Tables** section in the FlowFuse navigation without writing any SQL.

#### 5b: Build the Insert Flow

1. Drag a **change node** onto the canvas and name it `Build DLQ Params`.
2. Add the following rules:

| Action | Target | Value type | Value |
|--------|--------|------------|-------|
| Set | `msg.queryParameters` | JSON | `{}` |
| Set | `msg.queryParameters.id` | msg | `_msgid` |
| Set | `msg.queryParameters.topic` | msg | `retry.topic` |
| Set | `msg.queryParameters.payload` | JSONata | `$string(_originalPayload)` |
| Set | `msg.queryParameters.attempts` | msg | `retry.attempts` |
| Set | `msg.queryParameters.last_error` | msg | `retry.lastError` |
| Set | `msg.queryParameters.captured_at` | JSONata | `$now()` |

3. Drag a **Query node** from the FlowFuse category onto the canvas and name it `Insert DLQ Record`.
4. Paste the following SQL:
```sql
INSERT INTO "dlq" ("id", "topic", "payload", "attempts", "last_error", "captured_at")
VALUES ($id, $topic, $payload, $attempts, $last_error, $captured_at)
ON CONFLICT ("id") DO UPDATE SET
  "attempts" = EXCLUDED."attempts",
  "last_error" = EXCLUDED."last_error",
  "captured_at" = EXCLUDED."captured_at"
```

5. Wire **Retry Manager Output 2** to **Build DLQ Params**, then **Build DLQ Params** to **Insert DLQ Record**.

`ON CONFLICT DO UPDATE` ensures a message that appears multiple times does not create duplicate rows. It updates cleanly on the same `id`.

## Putting It All Together: Simulation

The best way to understand the pattern is to watch it work. This simulation models a temperature sensor publishing readings to an HTTP API every 5 seconds. The mock API is deliberately configured to fail 80% of the time so you can watch the full cycle in action: messages attempting delivery, retrying with increasing delays, and after 5 failed attempts landing permanently in FlowFuse Tables.

Import the flow below directly into FlowFuse. It contains everything: the sensor data simulator, the mock API, the retry logic, the DLQ handler, and a query button to inspect what landed in the database.

> **Note:** In the simulation, the retry state initialization from Step 1 is folded directly into the **Simulate Reading** function node rather than existing as a separate node. In a real deployment you would keep them separate as described in the tutorial.

{% renderFlow 300 %}
[{"id":"3f70e1b09c698a8b","type":"group","z":"b413f96e006352db","name":"Create Table","style":{"label":true},"nodes":["676f468a5eacf480","f24fcdcd3c682474"],"x":174,"y":239,"w":572,"h":82},{"id":"676f468a5eacf480","type":"inject","z":"b413f96e006352db","g":"3f70e1b09c698a8b","name":"Create Table on Deploy","props":[],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","x":330,"y":280,"wires":[["f24fcdcd3c682474"]]},{"id":"f24fcdcd3c682474","type":"tables-query","z":"b413f96e006352db","g":"3f70e1b09c698a8b","name":"Create DLQ Table","query":"CREATE TABLE IF NOT EXISTS \"dlq\" (\n  \"id\" TEXT PRIMARY KEY,\n  \"topic\" TEXT,\n  \"payload\" TEXT,\n  \"attempts\" INTEGER,\n  \"last_error\" TEXT,\n  \"captured_at\" TEXT\n)","split":false,"rowsPerMsg":1,"x":630,"y":280,"wires":[[]]},{"id":"1ed8538c313cd812","type":"group","z":"b413f96e006352db","name":"Query DLQ Records","style":{"label":true},"nodes":["98bd5b23672993a1","281734e9a00b621e","ad2553f403d14b2f"],"x":174,"y":759,"w":692,"h":82},{"id":"98bd5b23672993a1","type":"inject","z":"b413f96e006352db","g":"1ed8538c313cd812","name":"Click to see DLQ records","props":[],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","x":330,"y":800,"wires":[["ad2553f403d14b2f"]]},{"id":"281734e9a00b621e","type":"debug","z":"b413f96e006352db","g":"1ed8538c313cd812","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":770,"y":800,"wires":[]},{"id":"ad2553f403d14b2f","type":"tables-query","z":"b413f96e006352db","g":"1ed8538c313cd812","name":"Query DLQ Table","query":"SELECT * FROM \"dlq\";","split":false,"rowsPerMsg":1,"x":590,"y":800,"wires":[["281734e9a00b621e"]]},{"id":"85c883f958a8248e","type":"group","z":"b413f96e006352db","name":"DLQ Implementation","style":{"label":true},"nodes":["8e0ac077e92630b1","d8871599d4c76ed6","aece3dfb5407b2be","ddbfd80ec3da0419","18976ac55bc49b95","086adbd104082fc6","e23ce8129b8aa06a","ffc30231275f6b15","92504ed47d1acc08","a6d2276f504fb649","c1df30e71498b75e","0e16cc1c80d8d28c"],"x":174,"y":439,"w":1652,"h":202},{"id":"8e0ac077e92630b1","type":"http request","z":"b413f96e006352db","g":"85c883f958a8248e","name":"POST /ingest","method":"POST","ret":"obj","url":"http://localhost:1880/ingest","x":1270,"y":500,"wires":[["d8871599d4c76ed6"]]},{"id":"d8871599d4c76ed6","type":"function","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Check Response","func":"// restore retry state from protected property\nmsg.retry = msg._retry;\n\nif (msg.statusCode !== 200) {\n    msg.error = `API returned ${msg.statusCode}`;\n    node.error(msg.error, msg);\n    return null;\n}\n\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":1470,"y":500,"wires":[["aece3dfb5407b2be"]]},{"id":"aece3dfb5407b2be","type":"debug","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Success","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":1660,"y":500,"wires":[]},{"id":"ddbfd80ec3da0419","type":"catch","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Catch Errors","scope":["8e0ac077e92630b1","d8871599d4c76ed6"],"uncaught":false,"x":270,"y":560,"wires":[["18976ac55bc49b95"]]},{"id":"18976ac55bc49b95","type":"function","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Normalize Error","func":"msg.retry = msg._retry;\n\nif (typeof msg.error === 'object') {\n    msg.error = msg.error.message || JSON.stringify(msg.error);\n}\n\nmsg.error = msg.error || 'Processing failed';\nreturn msg;","outputs":1,"x":460,"y":560,"wires":[["086adbd104082fc6"]]},{"id":"086adbd104082fc6","type":"function","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Retry Manager","func":"const MAX_ATTEMPTS = msg.retry.maxAttempts || 5;\nconst BASE_DELAY_MS = 1000;\nconst MAX_DELAY_MS = 30000;\n\nmsg.retry.attempts += 1;\nmsg.retry.lastError = msg.error || 'Unknown error';\nmsg.retry.lastAttemptAt = new Date().toISOString();\n\n// keep _retry in sync\nmsg._retry = msg.retry;\n\nif (msg.retry.attempts >= MAX_ATTEMPTS) {\n    msg.retry.exhausted = true;\n    msg.dlq = {\n        reason: 'Max retries exceeded',\n        attempts: msg.retry.attempts,\n        lastError: msg.retry.lastError,\n        deadAt: new Date().toISOString()\n    };\n    return [null, msg];\n}\n\nconst exponential = BASE_DELAY_MS * Math.pow(2, msg.retry.attempts - 1);\nconst jitter = Math.random() * 1000;\nconst delay = Math.min(exponential + jitter, MAX_DELAY_MS);\n\nmsg.delay = Math.round(delay);\n\nnode.status({\n    fill: 'yellow',\n    shape: 'ring',\n    text: `Retry ${msg.retry.attempts}/${MAX_ATTEMPTS} in ${Math.round(delay / 1000)}s`\n});\n\nreturn [msg, null];","outputs":2,"x":660,"y":560,"wires":[["e23ce8129b8aa06a"],["92504ed47d1acc08"]]},{"id":"e23ce8129b8aa06a","type":"delay","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Backoff Delay","pauseType":"delayv","timeout":"1","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"outputs":1,"x":880,"y":540,"wires":[["ffc30231275f6b15"]]},{"id":"ffc30231275f6b15","type":"change","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Restore Payload","rules":[{"t":"set","p":"payload","pt":"msg","to":"_originalPayload","tot":"msg"}],"x":1080,"y":500,"wires":[["8e0ac077e92630b1"]]},{"id":"92504ed47d1acc08","type":"change","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Build DLQ Params","rules":[{"t":"set","p":"queryParameters","pt":"msg","to":"{}","tot":"json"},{"t":"set","p":"queryParameters.id","pt":"msg","to":"_msgid","tot":"msg"},{"t":"set","p":"queryParameters.topic","pt":"msg","to":"retry.topic","tot":"msg"},{"t":"set","p":"queryParameters.payload","pt":"msg","to":"$string(_originalPayload)","tot":"jsonata"},{"t":"set","p":"queryParameters.attempts","pt":"msg","to":"retry.attempts","tot":"msg"},{"t":"set","p":"queryParameters.last_error","pt":"msg","to":"retry.lastError","tot":"msg"},{"t":"set","p":"queryParameters.captured_at","pt":"msg","to":"$now()","tot":"jsonata"}],"x":890,"y":600,"wires":[["0e16cc1c80d8d28c"]]},{"id":"a6d2276f504fb649","type":"debug","z":"b413f96e006352db","g":"85c883f958a8248e","name":"DLQ Record Saved","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":1690,"y":600,"wires":[]},{"id":"c1df30e71498b75e","type":"link in","z":"b413f96e006352db","g":"85c883f958a8248e","name":"link in 1","links":["e0addcc09f36a025"],"x":945,"y":480,"wires":[["ffc30231275f6b15"]]},{"id":"0e16cc1c80d8d28c","type":"tables-query","z":"b413f96e006352db","g":"85c883f958a8248e","name":"Insert DLQ Record","query":"INSERT INTO \"dlq\" (\"id\", \"topic\", \"payload\", \"attempts\", \"last_error\", \"captured_at\")\nVALUES ($id, $topic, $payload, $attempts, $last_error, $captured_at)\nON CONFLICT (\"id\") DO UPDATE SET\n  \"attempts\" = EXCLUDED.\"attempts\",\n  \"last_error\" = EXCLUDED.\"last_error\",\n  \"captured_at\" = EXCLUDED.\"captured_at\"","split":false,"rowsPerMsg":1,"x":1290,"y":600,"wires":[["a6d2276f504fb649"]]},{"id":"7cf8d797670d4025","type":"group","z":"b413f96e006352db","name":"Simulated API — Fails 80% of the Time","style":{"label":true},"nodes":["5bda1677a303bad5","16098f6123028007","87108585e5177d34"],"x":174,"y":659,"w":732,"h":82},{"id":"5bda1677a303bad5","type":"http in","z":"b413f96e006352db","g":"7cf8d797670d4025","name":"POST /ingest","url":"/ingest","method":"post","x":270,"y":700,"wires":[["16098f6123028007"]]},{"id":"16098f6123028007","type":"function","z":"b413f96e006352db","g":"7cf8d797670d4025","name":"Mock API 80% Fail","func":"const shouldFail = Math.random() < 0.8;\n\nif (shouldFail) {\n    msg.statusCode = 503;\n    msg.payload = { error: \"Service unavailable\", status: 503 };\n} else {\n    msg.statusCode = 200;\n    msg.payload = { success: true, status: 200 };\n}\n\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":590,"y":700,"wires":[["87108585e5177d34"]]},{"id":"87108585e5177d34","type":"http response","z":"b413f96e006352db","g":"7cf8d797670d4025","name":"Send Response","x":800,"y":700,"wires":[]},{"id":"a23e7b96d9aa726e","type":"group","z":"b413f96e006352db","name":"Simulate Sensor Reading","style":{"label":true},"nodes":["dd1b1440e1bf6cd4","2a9285c099b974a4","e0addcc09f36a025"],"x":174,"y":339,"w":622,"h":82},{"id":"dd1b1440e1bf6cd4","type":"inject","z":"b413f96e006352db","g":"a23e7b96d9aa726e","name":"Every 5s","repeat":"5","crontab":"","once":true,"onceDelay":0.1,"topic":"","x":280,"y":380,"wires":[["2a9285c099b974a4"]]},{"id":"2a9285c099b974a4","type":"function","z":"b413f96e006352db","g":"a23e7b96d9aa726e","name":"Simulate Reading","func":"msg.payload = {\n    sensorId: 'sensor-001',\n    temperature: +(Math.random() * 40 + 10).toFixed(2),\n    unit: 'celsius',\n    timestamp: new Date().toISOString()\n};\nmsg.topic = 'sensors/temperature';\nmsg._originalPayload = RED.util.cloneMessage(msg.payload);\n\nif (!msg._retry) {\n    msg._retry = {\n        attempts: 0,\n        maxAttempts: 5,\n        lastError: null,\n        originalTimestamp: new Date().toISOString(),\n        topic: msg.topic\n    };\n}\n\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":630,"y":380,"wires":[["e0addcc09f36a025"]]},{"id":"e0addcc09f36a025","type":"link out","z":"b413f96e006352db","g":"a23e7b96d9aa726e","name":"link out 1","mode":"link","links":["c1df30e71498b75e"],"x":755,"y":380,"wires":[]},{"id":"10288c58ceddb722","type":"global-config","env":[],"modules":{"@flowfuse/nr-tables-nodes":"0.2.1"}}]
{% endrenderFlow %}

## Closing Thoughts

Every message your system drops was someone's data. A sensor reading that never made it. A transaction that silently disappeared. An event that the downstream system never knew existed. In most IIoT deployments these failures are invisible. No record, no alert, no way to recover what was lost.

That is the problem this pattern solves.

A Dead Letter Queue does not make your system more reliable. Reliability comes from good infrastructure, careful design, and redundancy. What a DLQ gives you is honesty. An honest record of every message that could not be delivered, with enough context to understand why, and enough structure to do something about it.

You deploy it once and it works quietly in the background until the moment you need it.

And you will need it. Not because your flows are poorly built, but because distributed systems fail. APIs go down. Networks drop. Services timeout at the worst possible moment. The question has never been whether that happens. It is whether you are ready when it does.

Now you are.

*Stop losing data you'll never get back. [Contact us](/contact-us/) to build a fault-tolerant IIoT pipeline that catches every failure before it disappears.*
