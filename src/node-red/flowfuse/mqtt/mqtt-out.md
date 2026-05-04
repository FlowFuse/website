---
eleventyNavigation:
  key: MQTT Out
  parent: FlowFuse MQTT Nodes
meta:
  title: MQTT Out
  description: Enhanced MQTT Out node for FlowFuse with automatic broker setup, dynamic topic control, and full MQTT v5 support.
---

# {{ meta.title }}

This is an enhanced version of the standard MQTT Out node, designed exclusively for FlowFuse users. The node features automatic configuration upon deployment when using within Flowfuse instance. The [MQTT broker](/docs/user/teambroker/) client is created automatically alongside the node configuration when added to the canvas.

## Configuration Options

### Server Configuration

The server is automatically configured and managed by the FlowFuse platform. All FlowFuse MQTT nodes within an instance share a single broker connection, ensuring efficient resource utilization and consistent connection management across all flows. Access control can be managed through the broker client management interface, where permissions for subscribe and publish operations can be configured.

> **Note:** When the first node is added to the canvas, a new **Team Broker User** linked to the FlowFuse instance is automatically created. By default, this user has **subscribe-only** permissions.

### Topic Configuration

Specify the default MQTT topic for message publication. This can be overridden at runtime by setting the `msg.topic` property in the input message.

### Quality of Service

Select the QoS level for published messages:

- **Level 0**: Fire and forget
- **Level 1**: At least once
- **Level 2**: Exactly once (default)

### Retain Flag

Configure whether messages should be retained on the broker. The default value is `false`. Retained messages are delivered to new subscribers immediately upon subscription.

## Message Input Properties

The following properties control message publication:

- `msg.payload`: The message content to publish. JavaScript objects are automatically converted to JSON strings, while buffers are transmitted as binary data
- `msg.topic`: Overrides the configured topic for this message
- `msg.qos`: Overrides the configured quality of service level
- `msg.retain`: Overrides the configured retain flag
- `msg.responseTopic`: MQTT version 5 response topic for request-response patterns
- `msg.correlationData`: MQTT version 5 correlation data for message tracking
- `msg.contentType`: MQTT version 5 content type descriptor
- `msg.userProperties`: MQTT version 5 custom user properties
- `msg.messageExpiryInterval`: MQTT version 5 message expiry time in seconds
- `msg.topicAlias`: MQTT version 5 topic alias for bandwidth optimization

## Dynamic Control Operations

The node supports connection control through the `msg.action` property.

### Connect
Establishes the broker connection.

```javascript
msg.action = 'connect';
```

### Disconnect
Terminates the connection.

```javascript
msg.action = 'disconnect';
```

**Note:** When a control action is specified, the node performs that operation instead of publishing a message.

## Publishing Messages

### Basic Publishing

Send a message to the configured topic:

```javascript
msg.payload = "Hello, MQTT!";
return msg;
```

### Publishing to a Different Topic

Override the configured topic:

```javascript
msg.topic = "sensors/temperature";
msg.payload = 25.5;
return msg;
```

### Publishing with Custom QoS

Override the quality of service level:

```javascript
msg.topic = "critical/alert";
msg.payload = "System warning";
msg.qos = 2; // Exactly once delivery
return msg;
```

### Publishing Retained Messages

Publish a message that will be retained on the broker:

```javascript
msg.topic = "sensors/last-known/temperature";
msg.payload = 25.5;
msg.retain = true;
return msg;
```

### Publishing with MQTT v5 Properties

Use MQTT version 5 features:

```javascript
msg.topic = "sensors/temperature";
msg.payload = { value: 25.5, unit: "celsius" };
msg.contentType = "application/json";
msg.messageExpiryInterval = 60; // Message expires in 60 seconds
msg.userProperties = {
  sensorId: "sensor-001",
  location: "warehouse"
};
return msg;
```

## Version Support

This node fully supports MQTT version 5 features including response topics, correlation data, content types, user properties, message expiry intervals, and topic aliases. It maintains backward compatibility with earlier MQTT versions.
