---
title: YAML
description: Encoding or decoding Yet-Another-Markup-Language to JSON
updated: git last modified
image: "/images/nodes/yaml.png"
---

YAML, or Yet-Another-Markup-Language, is often used as a data markup style for
with is human readable. In Node-RED, the YAML node is used to convert data between
YAML format and JavaScript objects (JSON). The YAML node is a core component of Node-RED
that comes pre-installed.

When the input property is JSON the node will produce YAML as output. When the
input is JSON, YAML is produced as output.

The node only parses the property key as configured, by default “payload”. When
the parsing is successful it replaces the property value.

When no payload is passed into the node it passes the full message on to the next node.

## Examples

### Parsing JSON to YAML

Setting the property to parse in the YAML node is key to parsing. In this case
the default "payload" is used.

```json
[{"id":"8224eaa338e7a2c3","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"foo: bar","payloadType":"str","x":170,"y":100,"wires":[["a712adf965a1708b"]]},{"id":"a712adf965a1708b","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Parse YAML to JSON","x":360,"y":100,"wires":[["5d2462e3cc9374f7"]]},{"id":"5d2462e3cc9374f7","type":"debug","z":"7d38803e3d40ee7e","name":"Debug: Output JSON","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":600,"y":100,"wires":[]}]
```

### Invalid input error handling

When the input is structured wrongly the YAML node will create an error. The
error can be caught using the error node.

```json
[{"id":"0fc216b8cebccc25","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Input invalid","x":370,"y":420,"wires":[[]]},{"id":"a0dc30d8f5225962","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"foo: \"bar","payloadType":"str","x":180,"y":420,"wires":[["0fc216b8cebccc25"]]},{"id":"c9a3f66e67b41ad4","type":"debug","z":"7d38803e3d40ee7e","name":"Caught error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":370,"y":500,"wires":[]},{"id":"6e3ba1ebc7beaf81","type":"catch","z":"7d38803e3d40ee7e","name":"","scope":["a0dc30d8f5225962"],"uncaught":false,"x":190,"y":500,"wires":[["c9a3f66e67b41ad4"]]}]
```
