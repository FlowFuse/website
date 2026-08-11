---
title: "VDA 5050 Tutorial: Connect AGVs to Factory Systems over MQTT"
subtitle: "How the six VDA 5050 MQTT topics work, and how to build a master control flow for a mixed AGV fleet."
description: "VDA 5050 explained: how the standard structures AGV communication over MQTT, and how to build a working master control flow in FlowFuse."
keywords: vda 5050
tags:
  - posts
  - flowfuse
meta:
  howto:
    name: "How to Connect AGVs to Factory Systems with VDA 5050"
    description: "Learn how to build a VDA 5050 master control flow by connecting to an MQTT broker, subscribing to fleet state, identifying each vehicle, detecting vehicles that go offline, and dispatching transport orders."
    tool:
      - "FlowFuse"
      - "Node-RED"
      - "MQTT"
      - "VDA 5050"
      - "AGV"
    steps:
      - name: "Connect to your broker"
        text: "Add an mqtt in node and configure a broker with your host and port. Use port 8883 with TLS enabled, and add credentials on the Security tab if the broker requires a login."
        url: "step-1-connect-to-your-broker"
      - name: "Subscribe to fleet state"
        text: "Set the topic to uagv/v2/+/+/state so one subscription covers every manufacturer and serial number. Set QoS to 0 and output to a parsed JSON object, then deploy and confirm messages arrive."
        url: "step-2-subscribe-to-fleet-state"
      - name: "Tell the vehicles apart"
        text: "Add a function node that splits the topic to read manufacturer and serial number, and compare them against the same fields in the payload to catch a misconfigured vehicle."
        url: "step-3-tell-the-vehicles-apart"
      - name: "Catch vehicles going offline"
        text: "Subscribe to uagv/v2/+/+/connection at QoS 1 to read each vehicle's connection state. Treat it as a network check only, and watch errors, operating mode, and state freshness for vehicle health."
        url: "step-4-catch-vehicles-going-offline"
      - name: "Send an order"
        text: "Build an order payload with a nodes array and an edges array, where the first node is where the vehicle already stands. Publish it to the vehicle's order topic with retain switched off."
        url: "step-5-send-an-order"
  faq:
    - question: "What is the difference between VDA 5050 and a vendor's own fleet manager API?"
      answer: "A vendor API is designed for that vendor's vehicles and changes when they choose. VDA 5050 fixes one message contract that every compliant vehicle honours, so master control talks to vehicles from different makers the same way. Vendors still offer their own APIs for deeper features, and most sites use both: VDA 5050 for fleet-level dispatch and status, the vendor API for anything specific to that vehicle."
    - question: "Does VDA 5050 handle collision avoidance and traffic control?"
      answer: "No. The standard defines how orders and status messages move, not how a vehicle drives. Obstacle avoidance and path planning stay with the manufacturer, and safety functions such as emergency stops and person detection live on the vehicle under standards like ISO 3691-4. VDA 5050 reports safety state; it does not implement it. Traffic rules across a shared aisle are the master control system's job to enforce."
    - question: "Should I build against version 2.x or 3.0?"
      answer: "Build against whatever your vehicles actually run, which today is usually 2.x. Version 3.0 was released on 19 March 2026 and adds support for freely navigating robots through planned path sharing and a zone concept. It also renames parameters across the whole document as a breaking change, so a 2.x integration will not talk to a 3.0 vehicle without changes. Each vehicle reports its version in its factsheet and in every state message."
    - question: "What is the difference between the state and visualization topics?"
      answer: "Both carry position, on purpose. A state message is the full picture, covering order progress, battery, errors, and operating mode, sent on any relevant change and at least every 30 seconds. A visualization message carries only position and velocity, so it can be sent far more often for a smooth live map. Act on state, draw with visualization. Visualization is optional in the standard, so some vehicles never send it."
    - question: "Why did the vehicle reject my order?"
      answer: "Three reasons cover most cases. The first node of the order must be one the vehicle is already standing on or within the deviation range of. The orderId and orderUpdateId pair must not repeat a previous order. And every action you send must appear in the vehicle's factsheet as supported. A rejected order shows up as a validationError warning in the vehicle's state, and the warning stays until it accepts a valid order."
    - question: "What MQTT broker do I need for VDA 5050?"
      answer: "Any broker supporting MQTT 3.1.1 or 5.0, retained messages, last will, and per-client topic permissions. The standard asks for QoS 0 on order, instantActions, state, factsheet, and visualization, and QoS 1 on connection. The important work is configuration rather than product choice: TLS on, each vehicle restricted to its own topic path by allowlist, the wildcard subscription reserved for master control, and a message size cap."
    - question: "Can I run VDA 5050 alongside vehicles that do not support it?"
      answer: "Yes, and most sites do during a transition. Vehicles that speak the standard sit behind one master control system, and older or proprietary vehicles reach the same system through whatever interface they do offer. Standardize the new fleet on VDA 5050, keep existing vehicles running through their own integration, and retire those integrations as the vehicles are replaced."
    - question: "Is a vehicle advertised as VDA 5050 compliant guaranteed to work with any master control?"
      answer: "Not automatically. The standard leaves the interface name in the topic path, the supported action types, and several optional fields up to the implementation, and vendors vary in how much of the standard they cover. Request the factsheet before you dispatch anything and check supported actions, load types, and dimensions against what you plan to send."
cta:
  type: contact
  title: "Run Every AGV From One System"
  description: "See how FlowFuse connects AGVs from any vendor over VDA 5050, takes orders from your WMS, and rolls the same master control setup out to every site you run."
---

If you run AGVs from more than one vendor, you already know the problem. Each vendor ships its own fleet manager. Those fleet managers don't talk to each other.

<!--more-->

Two fleets under separate control can't share an intersection. So you either accept deadlocks, or you split the floor into separate lanes and waste space. Each fleet manager also needs its own link to your ERP, MES, or WMS. Adding a vehicle from a new vendor means another integration project. And because no single system sees all the work, one vendor's AGVs sit idle while the other's are backed up.

VDA 5050 solves that. FlowFuse gives you somewhere to build the master control system that uses it.

::cta-image{src="/images/cta/book-a-demo.png" alt="Walk through your FlowFuse setup with our team - book a demo" cta="demo"}
::

## Why VDA 5050?

VDA 5050 is an open communication standard. The VDA (the German automotive association) and the VDMA (the machinery association) publish it together. The Institute for Material Handling and Logistics (IFL) at KIT leads the technical work.

It first appeared in 2019. It sets out how a master control system sends transport orders to a vehicle, and how that vehicle reports back. Messages travel over MQTT as JSON.

Most AGVs and AMRs on factory floors today speak the 2.x version. Version 3.0 came out on 19 March 2026 and adds support for freely navigating robots.

### One interface, any vehicle

A master control system that speaks VDA 5050 can drive vehicles from different makers. You don't write a new integration for each one.

The standard fixes the message contract, not the vehicle. How an AGV avoids obstacles or plans its path is still up to the manufacturer. What you get is a shared order format and a shared status format.

Safety stays out of scope. Emergency stops and person detection live on the vehicle and follow standards like ISO 3691-4. VDA 5050 reports safety state. It does not implement it.

### Real detail, not just a heartbeat

The messages carry operational data. A `state` message includes position, battery charge, order progress, and any active errors. An `order` describes a route of nodes and edges with actions attached, such as pick, drop, wait, or charge.

That detail is what lets master control make dispatch decisions, instead of just knowing a vehicle is online.

### Built on MQTT

MQTT suits a fleet well. It is lightweight, it uses publish and subscribe, and it copes with devices that drop off the network.

Every VDA 5050 topic follows the same pattern. So one wildcard subscription hears from every vehicle on the floor, whoever built it.

## The six topics

| Topic | Sent by | Read by | What it carries |
|---|---|---|---|
| `order` | Master control | AGV | A route of nodes and edges, with actions |
| `instantActions` | Master control | AGV | Immediate commands: pause, resume, cancel, start charging |
| `state` | AGV | Master control | Full status: position, battery, order progress, errors |
| `visualization` | AGV | Map displays | Position and velocity only, sent more often than `state` |
| `connection` | AGV, or the broker for it | Master control | Online and offline at the MQTT level |
| `factsheet` | AGV | Master control | What the vehicle can do: size, load types, supported actions |

Both `state` and `visualization` carry position. That is on purpose.

`state` is the full picture. A vehicle sends it when something changes, and at least once every 30 seconds. `visualization` is a small message with just position and velocity, so it can go out far more often, typically once a second or faster.

Use `state` for anything master control acts on. Use `visualization` only to draw a smooth live map. Note that `visualization` is optional in the standard, so some vehicles never send it.

### How topics are named

```
<interfaceName>/<majorVersion>/<manufacturer>/<serialNumber>/<topic>
```

For example: `uagv/v2/AcmeRobotics/AGV-042/state`

`uagv` is short for "universal AGV". The standard does not force this word on you, and each site sets its own interface name. But nearly every 2.x deployment uses it, including the vehicles you are likely to buy. Treat it as fixed unless the vehicle's manual says otherwise.

The version segment is the major version only. So `v2`, not `v2.0.0`. The full version number goes in the `version` field inside the payload.

Because the maker and serial number sit in the topic, master control can subscribe once to `uagv/v2/+/+/state` and hear from every vehicle. Restrict each vehicle to its own topic path, using an allowlist on your broker.

### A note on version 3.0

This tutorial uses version 2.x names, because that is what most vehicles speak today. Version 3.0 renames several things:

- The example topic prefix moves to `vda5050/v3/...`
- `agvPosition` becomes `mobileRobotPosition`
- `batteryState` becomes `powerSupply`, and `batteryCharge` becomes `stateOfCharge`
- `positionInitialized` becomes `localized`
- Version 3.0 adds two optional topics, `zoneSet` and `responses`, and a fourth blocking type, `SINGLE`
- `CONNECTIONBROKEN` becomes `CONNECTION_BROKEN`, and `HIBERNATING` is added
- It also adds the operating modes `STARTUP` and `INTERVENED`
- The wording changes from "AGV" to "mobile robot" throughout

Version 3.0 also strips abbreviations out of parameter names across the whole document, which is a breaking change. The [3.0.0 release notes](https://github.com/VDA5050/VDA5050/releases/tag/3.0.0) link a [table of every rename](https://github.com/VDA5050/VDA5050/pull/465), so check that before you port a 2.x integration.

If your vehicle ships with 3.0 support, swap the names. The topic structure and the ideas below stay the same.

### What a state message looks like

```json
{
  "headerId": 42,
  "timestamp": "2026-08-10T09:15:00.000Z",
  "version": "2.1.0",
  "manufacturer": "AcmeRobotics",
  "serialNumber": "AGV-042",
  "orderId": "order-1001",
  "orderUpdateId": 0,
  "lastNodeId": "node7",
  "lastNodeSequenceId": 6,
  "nodeStates": [],
  "edgeStates": [],
  "agvPosition": {
    "x": 12.4,
    "y": 3.1,
    "theta": 0.0,
    "mapId": "floor1",
    "positionInitialized": true
  },
  "velocity": { "vx": 0.5, "vy": 0.0, "omega": 0.0 },
  "batteryState": { "batteryCharge": 76.5, "charging": false },
  "driving": true,
  "actionStates": [],
  "operatingMode": "AUTOMATIC",
  "errors": [],
  "safetyState": { "eStop": "NONE", "fieldViolation": false }
}
```

Two things to know before you write code against this.

**Some fields are always there.** `orderId`, `orderUpdateId`, `lastNodeId`, `lastNodeSequenceId`, `nodeStates`, `edgeStates`, `driving`, `actionStates`, `batteryState`, `operatingMode`, `errors`, and `safetyState` are required. An idle vehicle still sends an empty `nodeStates` array. It does not drop the field.

**Position is not.** `agvPosition` and `velocity` are optional. A vehicle that cannot locate itself yet leaves `agvPosition` out. So always check before you read it. Code like `msg.payload.agvPosition.x` crashes the first time a vehicle starts up before it has localized.

The standard ships [JSON schemas](https://github.com/VDA5050/VDA5050/tree/main/json_schemas) for all six topics. Point a validator at them and you can check a payload before you send it, rather than finding out from the vehicle.

## Build it

### What you need

- A running FlowFuse instance on your edge device. If you do not have an account, [sign up for a free trial]({% include "sign-up-url.njk" %}) and set up your instance following the instructions in this [guide](/docs/device-agent/quickstart/).
- An MQTT broker your AGVs (or an AGV simulator) already publish to, or FlowFuse's [built-in team broker](/docs/user/teambroker/) if you're prototyping.
- At least one vehicle or simulator publishing VDA 5050 topics, so you have real messages to work with.

### Step 1: Connect to your broker

1. Drag an **mqtt in** node onto the canvas. Double-click it.
2. Click the pencil icon next to **Server** to add a broker.
3. Enter your broker's host and port. Use 8883 and tick **Use TLS** on the **Connection** tab. Only use plain port 1883 on an isolated test network.
4. If your broker needs a login, open the **Security** tab and enter the username and password.
5. Leave the topic empty for now. You'll fill it in next.

The [FlowFuse MQTT nodes](/docs/user/mqtt-nodes/) replace steps 2 to 4 if you're pointing at the [FlowFuse broker](/docs/user/teambroker/). They create the client and fill in the credentials themselves. Their QoS defaults to 2, so change it in the next step.

### Step 2: Subscribe to fleet state

1. In the **mqtt in** node, set **Topic** to `uagv/v2/+/+/state`. Each `+` stands for one topic level. Here they cover manufacturer and serial number, so this one subscription picks up every vehicle.
2. Set **QoS** to 0. VDA 5050 asks for QoS 0 on `order`, `instantActions`, `state`, `factsheet`, and `visualization`, and QoS 1 only on `connection`. Setting a higher QoS on your side doesn't help anyway. MQTT delivers at the lower of the two values.
3. Set **Output** to "a parsed JSON object". You then get a JavaScript object instead of raw bytes. If a vehicle sends broken JSON, the node logs an error and drops the message.
4. Add a **function** node (the one from step 3 below) and a **debug** node after it.
5. Deploy. Check that the **mqtt in** node says "connected", then watch messages arrive in the debug sidebar.

```json
[{"id":"vda-mqtt-in","type":"mqtt in","z":"vda-flow","name":"Fleet state","topic":"uagv/v2/+/+/state","qos":"0","datatype":"json","broker":"vda-broker","nl":false,"rap":true,"rh":0,"inputs":0,"x":210,"y":160,"wires":[["vda-parse"]]},{"id":"vda-parse","type":"function","z":"vda-flow","name":"Identify vehicle","func":"const parts = msg.topic.split('/');\nif (parts.length !== 5) {\n    node.warn('Unexpected VDA 5050 topic: ' + msg.topic);\n    return null;\n}\n\nmsg.manufacturer = parts[2];\nmsg.serialNumber = parts[3];\n\nconst p = msg.payload;\nif (p.manufacturer !== msg.manufacturer || p.serialNumber !== msg.serialNumber) {\n    node.warn('Topic and payload disagree on ' + msg.topic);\n}\n\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":430,"y":160,"wires":[["vda-debug"]]},{"id":"vda-debug","type":"debug","z":"vda-flow","name":"State debug","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":650,"y":160,"wires":[]},{"id":"vda-broker","type":"mqtt-broker","name":"VDA 5050 broker","broker":"your-broker.example.com","port":"8883","clientid":"","autoConnect":true,"usetls":true,"verifyservercert":true,"protocolVersion":"4","keepalive":"60","cleansession":true,"autoUnsubscribe":true,"birthTopic":"","birthQos":"0","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willPayload":"","willMsg":{},"sessionExpiry":""}]
```

Flow exports never include passwords. After importing, open the broker node and enter your own host and login.

### Step 3: Tell the vehicles apart

The `state` message tells you what is happening. You also need to know who sent it.

`manufacturer` and `serialNumber` appear twice: in the payload, and in the topic. Read them from the topic. Here's why.

The topic is the message's address. It is what your broker rules are written against, so it's the right value to route and store by.

Comparing the two is also a free sanity check. If a vehicle's payload disagrees with its topic, it is misconfigured. Better to see that in a log line than to find out when an order goes to the wrong truck.

Put a **function** node between the **mqtt in** node and whatever comes next:

```javascript
const parts = msg.topic.split('/');
if (parts.length !== 5) {
    node.warn('Unexpected VDA 5050 topic: ' + msg.topic);
    return null;
}

msg.manufacturer = parts[2];
msg.serialNumber = parts[3];

const p = msg.payload;
if (p.manufacturer !== msg.manufacturer || p.serialNumber !== msg.serialNumber) {
    node.warn('Topic and payload disagree on ' + msg.topic);
}

return msg;
```

Now `msg.payload` holds the state object, and `msg.manufacturer` and `msg.serialNumber` tell you which AGV sent it.

### Step 4: Catch vehicles going offline

Repeat the same pattern for one more topic, pointing it at the broker you already set up.

Subscribe to **`uagv/v2/+/+/connection`** at QoS 1. This tells you when a vehicle drops off the broker. The payload has a `connectionState` field with one of three values in 2.x:

- `ONLINE`
- `OFFLINE` for a clean, deliberate disconnect
- `CONNECTIONBROKEN` for an unexpected drop

The vehicle registers that last value as its MQTT last will when it connects. So if it vanishes without saying goodbye, the broker publishes it for the vehicle. Vehicles publish every `connection` message with the retained flag set, so a new subscriber picks up each vehicle's last known status straight away.

One warning. The standard is clear that `connection` is a network check, not a health check. It tells you the link dropped. It tells you nothing about a vehicle that is still connected but faulted, stuck, or lost. For that, watch `errors`, `operatingMode`, and `safetyState` in `state`. Also treat any `state` message older than 30 seconds as stale, since that is the longest gap the standard allows.

### Putting it on a screen

None of this is visible to anyone on the floor yet. You can build a screen from these same flows with [FlowFuse Dashboard](/docs/user/dashboards/), without writing any HTML: a table of vehicles with battery level and current order, an alert when a vehicle drops off the network, and a live map of where everything is.

::cta-image{src="/images/cta/wenco-book-demo.png" alt="Wenco deploys new dashboard pages in days with FlowFuse - book a demo" cta="demo"}
::

### Step 5: Send an order

Three rules decide whether the vehicle accepts your order at all. Get these wrong and it refuses.

**The first node must be where the vehicle already is.** The standard says the AGV has to be standing on the first node, or inside its deviation range. Send an order that starts anywhere else and the vehicle rejects it. A rejected order shows up as a `validationError` warning in the vehicle's `state`, and the warning stays there until it accepts a valid order. Read `lastNodeId` and `agvPosition` from the vehicle's current state, and build the order from there.

**`orderId` and `orderUpdateId` together must be new.** Send the same pair twice and it counts as a duplicate. Use a fresh `orderId` for each job. Start `orderUpdateId` at 0, and only raise it when you extend that same order.

**The vehicle must support the actions you send.** `pick` and `drop` are standard action types, but supporting them is optional. Ask for the vehicle's `factsheet` first, using the `factsheetRequest` instant action, and check its list of supported actions.

Then wire it up:

1. Add an **mqtt out** node pointing at your broker. Leave **Topic** empty so the flow can set `msg.topic` per vehicle. Leave **Retain** off. The broker re-delivers a retained order every time the vehicle reconnects, which is how you move a truck at 3am by accident.
2. Feed it a payload matching the order schema: a `nodes` array and an `edges` array.
3. Trigger it with a dashboard button for manual dispatch, or from an **http in** endpoint if orders come from your WMS.

Here is a real pick-and-drop order:

```javascript
const manufacturer = 'AcmeRobotics';
const serialNumber = 'AGV-042';

// Count headerId per topic, and raise it by one for every message you send
const headerId = (flow.get('orderHeaderId') || 0) + 1;
flow.set('orderHeaderId', headerId);

msg.topic = `uagv/v2/${manufacturer}/${serialNumber}/order`;
msg.payload = {
  headerId,
  timestamp: new Date().toISOString(),
  version: "2.1.0",
  manufacturer,
  serialNumber,
  orderId: `order-${Date.now()}`,
  orderUpdateId: 0,
  nodes: [
    {
      // The AGV must already be at this node, or within its deviation range
      nodeId: "station-1",
      sequenceId: 0,
      released: true,
      nodePosition: { x: 0, y: 0, mapId: "floor1" },
      actions: [{
        actionId: `pick-${headerId}`,
        actionType: "pick",
        blockingType: "HARD",
        actionParameters: [
          { key: "stationType", value: "floor" },
          { key: "loadType", value: "EPAL" }
        ]
      }]
    },
    {
      nodeId: "station-2",
      sequenceId: 2,
      released: true,
      nodePosition: { x: 12, y: 4, mapId: "floor1" },
      actions: [{
        actionId: `drop-${headerId}`,
        actionType: "drop",
        blockingType: "HARD",
        actionParameters: [
          { key: "stationType", value: "floor" },
          { key: "loadType", value: "EPAL" }
        ]
      }]
    }
  ],
  edges: [{
    edgeId: "station-1-2",
    sequenceId: 1,
    startNodeId: "station-1",
    endNodeId: "station-2",
    released: true,
    actions: []
  }]
};
return msg;
```

Set `version` to the version your vehicle actually runs. Its `factsheet` and its own `state` messages both tell you.

Four details in there matter. `sequenceId` counts across nodes and edges together, which is why the edge is `1`, sitting between nodes `0` and `2`. `released: true` marks the base, the part of the plan the vehicle should run now, as opposed to the horizon, which is work it knows about but hasn't been told to start. And `actionId` has to be unique, because that is how the vehicle reports progress back to you in `actionStates`.

`blockingType` is the one worth reading twice. It decides whether the vehicle can drive, and whether other actions can run at the same time. `HARD` means the action runs alone, with no driving and no other actions. `SOFT` allows other actions but still stops the vehicle. `NONE` allows both. For a pick or drop you want `HARD`, and note that `SOFT` does not let the AGV keep driving, which is the one people get backwards. Version 3.0 adds a fourth, `SINGLE`, which allows driving but no other actions.

```json
[{"id":"vda-order-trigger","type":"inject","z":"vda-flow","name":"Dispatch order","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":210,"y":320,"wires":[["vda-order-build"]]},{"id":"vda-order-build","type":"function","z":"vda-flow","name":"Build order payload","func":"const manufacturer = 'AcmeRobotics';\nconst serialNumber = 'AGV-042';\n\nconst headerId = (flow.get('orderHeaderId') || 0) + 1;\nflow.set('orderHeaderId', headerId);\n\nmsg.topic = `uagv/v2/${manufacturer}/${serialNumber}/order`;\nmsg.payload = {\n  headerId,\n  timestamp: new Date().toISOString(),\n  version: \"2.1.0\",\n  manufacturer,\n  serialNumber,\n  orderId: `order-${Date.now()}`,\n  orderUpdateId: 0,\n  nodes: [\n    { nodeId: \"station-1\", sequenceId: 0, released: true, nodePosition: { x: 0, y: 0, mapId: \"floor1\" }, actions: [{ actionId: `pick-${headerId}`, actionType: \"pick\", blockingType: \"HARD\", actionParameters: [{ key: \"stationType\", value: \"floor\" }, { key: \"loadType\", value: \"EPAL\" }] }] },\n    { nodeId: \"station-2\", sequenceId: 2, released: true, nodePosition: { x: 12, y: 4, mapId: \"floor1\" }, actions: [{ actionId: `drop-${headerId}`, actionType: \"drop\", blockingType: \"HARD\", actionParameters: [{ key: \"stationType\", value: \"floor\" }, { key: \"loadType\", value: \"EPAL\" }] }] }\n  ],\n  edges: [\n    { edgeId: \"station-1-2\", sequenceId: 1, startNodeId: \"station-1\", endNodeId: \"station-2\", released: true, actions: [] }\n  ]\n};\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":440,"y":320,"wires":[["vda-order-out"]]},{"id":"vda-order-out","type":"mqtt out","z":"vda-flow","name":"Send order","topic":"","qos":"0","retain":"false","respTopic":"","contentType":"","userProps":"","correl":"","expiry":"","broker":"vda-broker","x":680,"y":320,"wires":[]},{"id":"vda-broker","type":"mqtt-broker","name":"VDA 5050 broker","broker":"your-broker.example.com","port":"8883","clientid":"","autoConnect":true,"usetls":true,"verifyservercert":true,"protocolVersion":"4","keepalive":"60","cleansession":true,"autoUnsubscribe":true,"birthTopic":"","birthQos":"0","birthPayload":"","birthMsg":{},"closeTopic":"","closeQos":"0","closePayload":"","closeMsg":{},"willTopic":"","willQos":"0","willPayload":"","willMsg":{},"sessionExpiry":""}]
```

This snippet brings its own broker node so it imports on its own. If you paste it into the same tab as the flow from step 2, you'll end up with two. Point this flow at the one you already set up and delete the spare, or the two clients will fight over the same login.

The **inject** node keeps the import simple. Swap it for a **ui-button** once your dashboard exists.

## Before this touches real AGVs

A flow that works on a test rig is not a production system. Check these first.

- **Lock down the broker.** Restrict each AGV to its own topic path. Give the wildcard subscription to master control only. Use an allowlist, not a blocklist.
- **Use TLS.** Factory networks are shared. Fleet commands should not travel in clear text, and leave certificate checking on.
- **Never retain `order` or `instantActions`.** The broker replays retained commands to every vehicle that reconnects. `connection` and `factsheet` are the two topics that *should* be retained.
- **Match the standard's QoS levels.** QoS 0 for `order`, `instantActions`, `state`, `factsheet`, and `visualization`. QoS 1 for `connection`. If your site does something different, change it on both ends, since MQTT delivers at the lower of the two.
- **Watch state freshness, not just `connection`.** A vehicle can hold its connection open while stuck or faulted. Alert on `errors`, on `operatingMode` leaving `AUTOMATIC`, and on `state` messages older than 30 seconds.
- **Validate orders before you send them.** Check the first node against the vehicle's current position, keep `orderId` and `orderUpdateId` unique, and check every action type against the factsheet.
- **Cap message size on the broker** to what VDA 5050 payloads actually need. It limits the damage a misbehaving client can do.

## What's next

You now have the basics: subscribe to fleet state, tell vehicles apart, spot vehicles going offline, and send orders. That's enough for a pilot with two or three AGVs.

The next thing most teams do is replace the button with the WMS or ERP, so orders arrive from whatever already decides what needs moving. After that comes order updates and cancellation, because a job that can't be extended or pulled back mid-route is not much use on a real floor. Both of those need the vehicle's `factsheet`, so it's worth requesting and storing it early. Master control can then check load capacity, size, and supported actions before it dispatches anything.

Two bigger pieces usually wait until the pilot has proved itself. Logging state history gives you throughput and utilization numbers, which is normally what makes the case for expanding. Traffic rules come last, and only once vehicles from different vendors start sharing aisles, because that is the point where a single master control system stops being a convenience and starts being the reason the floor works at all.

When the pilot becomes a deployment, FlowFuse adds the parts a real fleet system needs: remote device management for edge gateways, snapshots and instant rollback, audit logs, DevOps Pipelines, team access control, and high availability.