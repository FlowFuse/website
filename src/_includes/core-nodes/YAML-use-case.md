YAML, or Yet-Another-Markup-Language, is often used as a data markup style as it
is human readable. In Node-RED, the YAML node is used to convert data between
YAML format and JavaScript objects (JSON).

When the input property is JSON the node will produce YAML as output. When the
input is JSON, YAML is produced as output.

The node only parses the property key as configured, by default “payload”. When
the parsing is successful it replaces the property value.

When no payload is passed into the node it passes the full message on to the next node.

## Examples

### Parsing JSON to YAML

Setting the property to parse in the YAML node is key to parsing. In this case
the default `payload` is used. The YAML node with try and understand what the 
input format is. When it's JSON, it will send the `msg.payload` onwards as YAML
format.

{% renderFlow %}
[{"id":"4481ea08a9fe27e1","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"foo\":\"bar\"}","payloadType":"json","x":190,"y":220,"wires":[["b31536833d27aee0"]]},{"id":"b31536833d27aee0","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Parse JSON to YAML","x":400,"y":220,"wires":[["90fed168a9d1a4b5"]]},{"id":"90fed168a9d1a4b5","type":"debug","z":"7d38803e3d40ee7e","name":"Debug: Output YAML","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":640,"y":220,"wires":[]}]
{% endrenderFlow %}

### Parsing YAML to JSON

As before, the input is detected by the node itself. When JSON is the input format,
it's reformatted to valid YAML.

{% renderFlow %}
[{"id":"4481ea08a9fe27e1","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"foo\":\"bar\"}","payloadType":"json","x":190,"y":220,"wires":[["b31536833d27aee0"]]},{"id":"b31536833d27aee0","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Parse JSON to YAML","x":400,"y":220,"wires":[["90fed168a9d1a4b5"]]},{"id":"90fed168a9d1a4b5","type":"debug","z":"7d38803e3d40ee7e","name":"Debug: Output YAML","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":640,"y":220,"wires":[]}]
{% endrenderFlow %}


### Invalid input error handling

When the input is structured wrongly the YAML node will create an error. The
error can be caught using the error node.

{% renderFlow %}
[{"id":"0fc216b8cebccc25","type":"yaml","z":"7d38803e3d40ee7e","property":"payload","name":"Input invalid","x":370,"y":420,"wires":[[]]},{"id":"a0dc30d8f5225962","type":"inject","z":"7d38803e3d40ee7e","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"foo: \"bar","payloadType":"str","x":180,"y":420,"wires":[["0fc216b8cebccc25"]]},{"id":"c9a3f66e67b41ad4","type":"debug","z":"7d38803e3d40ee7e","name":"Caught error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":370,"y":500,"wires":[]},{"id":"6e3ba1ebc7beaf81","type":"catch","z":"7d38803e3d40ee7e","name":"","scope":["a0dc30d8f5225962"],"uncaught":false,"x":190,"y":500,"wires":[["c9a3f66e67b41ad4"]]}]
{% endrenderFlow %}

