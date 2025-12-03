---
eleventyNavigation:
  key: MQTT In
  parent: FlowFuse MQTT Nodes
meta:
  title: MQTT In
  description: Enhanced MQTT In node for FlowFuse with automatic broker setup, dynamic subscriptions, wildcard topic support, and full MQTT v5 compatibility.
---

# {{ meta.title }}

This is an enhanced version of the standard MQTT In node, designed exclusively for FlowFuse users. The node features automatic configuration upon deployment. The [MQTT broker client](/docs/user/teambroker/) is created automatically alongside the node configuration when added to the canvas.

## Configuration Options

### Server Configuration

The server is automatically configured and managed by the FlowFuse platform. All FlowFuse MQTT nodes within an instance share a single broker connection, ensuring efficient resource utilization and consistent connection management across all flows. Access control can be managed through the broker client management interface, where permissions for subscribe and publish operations can be configured.

> **Note:** When the first node is added to the canvas, a new **Team Broker User** linked to the FlowFuse instance is automatically created. By default, this user has **subscribe-only** permissions.

### Subscription Mode

The node supports two operational modes:

- **Single topic mode**: Allows subscription to a fixed topic configured directly in the node settings
- **Dynamic subscription mode**: Enables runtime control of subscriptions through input messages

### Topic Configuration

When operating in single topic mode, specify the MQTT topic to subscribe to in the node configuration. The topic field supports MQTT wildcard patterns for flexible message routing.

### Quality of Service

Select from three QoS levels:

- **Level 0**: Fire-and-forget delivery
- **Level 1**: At-least-once delivery
- **Level 2**: Exactly-once delivery (default)

### Output Format

The node can automatically detect the message format or convert it to a specific type including:

- Buffer
- String
- Parsed JSON object
- Base64 encoded string

## Message Output Properties

Each received message includes the following properties:

- `msg.payload`: The message content as string or buffer
- `msg.topic`: The MQTT topic from which the message was received
- `msg.qos`: The quality of service level (0, 1, or 2)
- `msg.retain`: Boolean indicating whether the message was retained on the broker
- `msg.responseTopic`: MQTT version 5 response topic for request-response patterns
- `msg.correlationData`: MQTT version 5 correlation data for message tracking
- `msg.contentType`: MQTT version 5 content type descriptor
- `msg.userProperties`: MQTT version 5 custom user properties
- `msg.messageExpiryInterval`: MQTT version 5 message expiry time in seconds

## Dynamic Control Operations

When dynamic subscription mode is enabled, the node accepts control messages through the `msg.action` property. The following actions are supported:

### Connect
Establishes connection to the MQTT broker.

```javascript
msg.action = 'connect';
```

### Disconnect
Terminates the broker connection.

```javascript
msg.action = 'disconnect';
```

### Get Subscriptions
Retrieves the list of current topic subscriptions.

```javascript
msg.action = 'getSubscriptions';
```

### Subscribe
Subscribes to one or more topics.

```javascript
// Single topic
msg.action = 'subscribe';
msg.topic = 'sensors/temperature';

// Single topic with QoS
msg.action = 'subscribe';
msg.topic = { topic: 'sensors/temperature', qos: 1 };

// Multiple topics
msg.action = 'subscribe';
msg.topic = ['sensors/temperature', 'sensors/humidity'];

// Multiple topics with QoS
msg.action = 'subscribe';
msg.topic = [
  { topic: 'sensors/temperature', qos: 1 },
  { topic: 'sensors/humidity', qos: 2 }
];
```

### Unsubscribe
Removes subscriptions from one or more topics.

```javascript
// Single topic
msg.action = 'unsubscribe';
msg.topic = 'sensors/temperature';

// Multiple topics
msg.action = 'unsubscribe';
msg.topic = ['sensors/temperature', 'sensors/humidity'];
```

## Topic Wildcard Patterns

MQTT supports two wildcard characters for flexible topic matching:

- **Plus sign (`+`)**: Single-level wildcard
- **Hash symbol (`#`)**: Multi-level wildcard

> *Note:** The `#` wildcard can only be used at the end of a topic when defining subscriptions.

### Example Patterns

- `sensors/+/temperature` - Receives temperature readings from all sensor locations
- `factory/#` - Receives all messages published under the factory topic hierarchy
- `devices/+/status` - Receives status updates from all devices
- `building/floor1/#` - Receives all messages from floor 1 of the building

## Version Support

This node fully supports MQTT version 5 features including response topics, correlation data, content types, user properties, message expiry intervals, and topic aliases. It maintains backward compatibility with earlier MQTT versions.