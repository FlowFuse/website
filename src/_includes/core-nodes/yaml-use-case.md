Converts between YAML format and JavaScript objects.

## Where and why do we use the YAML node?

The YAML node processes YAML (Yet Another Markup Language) data, which is a human-readable data serialization format. It converts between YAML strings and JavaScript objects, making it essential when working with configuration files, Kubernetes manifests, CI/CD pipelines, or any system that uses YAML for data representation. The format's readability makes it popular for configuration management and data exchange.

## Modes of operation

The YAML node operates bidirectionally, automatically detecting the input format:

### YAML to Object

When the input is a YAML string, the node parses it into a JavaScript object. This mode is essential when reading YAML configuration files, processing YAML data from APIs, or converting YAML documents into a structure you can manipulate programmatically.

### Object to YAML

When the input is a JavaScript object, the node converts it into YAML format. Use this mode when generating configuration files, creating YAML documents for deployment systems, or formatting data in a human-readable way for storage or transmission.

## How the node handles messages

The YAML node processes a configurable message property (default is `msg.payload`). After successful conversion, it replaces that property with the converted value. If parsing fails due to invalid syntax, the node throws an error that can be caught using a Catch node.

When no data is passed in the configured property, the node passes the full message unchanged to the next node. This allows it to be used in flows where the property might not always be present.

The node validates the structure during parsing and will report errors for malformed YAML, such as incorrect indentation, missing colons, or unclosed quotes.

## Examples

### Parsing JSON to YAML

The YAML node automatically detects the input format. When it receives JSON, it converts the data to YAML format. In this example, a JSON object `{"foo":"bar"}` is converted to YAML.

{% renderFlow %}
[{"id":"4481ea08a9fe27e1","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"foo\":\"bar\"}","payloadType":"json","x":190,"y":220,"wires":[["b31536833d27aee0"]]},{"id":"b31536833d27aee0","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Parse JSON to YAML","x":400,"y":220,"wires":[["90fed168a9d1a4b5"]]},{"id":"90fed168a9d1a4b5","type":"debug","z":"7d38803e3d40ee7e","name":"Debug: Output YAML","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":640,"y":220,"wires":[]}]
{% endrenderFlow %}

### Parsing YAML to JSON

When the input is YAML format, the node automatically converts it to a JavaScript object (JSON). This makes it easy to work with YAML configuration files in Node-RED flows.

{% renderFlow %}
[{"id":"a0dc30d8f5225962","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"foo: bar","payloadType":"str","x":180,"y":300,"wires":[["0fc216b8cebccc25"]]},{"id":"0fc216b8cebccc25","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Parse YAML to JSON","x":400,"y":300,"wires":[["c9a3f66e67b41ad4"]]},{"id":"c9a3f66e67b41ad4","type":"debug","z":"7d38803e3d40ee7e","name":"Debug: Output JSON","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":640,"y":300,"wires":[]}]
{% endrenderFlow %}

### Error handling for invalid input

When the input is malformed, the YAML node throws an error. This error can be caught using a Catch node, allowing you to handle parsing failures gracefully. In this example, the YAML string is missing a closing quote, which triggers an error.

{% renderFlow %}
[{"id":"0fc216b8cebccc25","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Input invalid","x":370,"y":420,"wires":[[]]},{"id":"a0dc30d8f5225962","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"foo: \"bar","payloadType":"str","x":180,"y":420,"wires":[["0fc216b8cebccc25"]]},{"id":"c9a3f66e67b41ad4","type":"debug","z":"7d38803e3d40ee7e","name":"Caught error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":370,"y":500,"wires":[]},{"id":"6e3ba1ebc7beaf81","type":"catch","z":"7d38803e3d40ee7e","name":"","scope":["0fc216b8cebccc25"],"uncaught":false,"x":190,"y":500,"wires":[["c9a3f66e67b41ad4"]]}]
{% endrenderFlow %}
