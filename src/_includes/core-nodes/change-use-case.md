## What's the Change node in Node-RED used for?

The Change node in Node-RED is used for modifying the content of messages within a flow. It allows you to add, remove, modify, or set message properties and payload values, making it a fundamental node for data transformation and manipulation. The Change node is essential for preparing data for further processing, formatting messages for specific outputs, and adapting data to suit the requirements of downstream nodes in a flow.

## Examples for the Change node
Use cases for the Change node include:

1. **Data Transformation**: You can use the Change node to transform data from one format to another. For example, you can convert temperature values from Celsius to Fahrenheit, translate textual information, or convert timestamps to a different format.

![Data Transform](./images/change-data-transform.png)

{% renderFlow %}
[{"id":"1cd48684.04dbab","type":"tab","label":"Temperature Conversion","disabled":false,"info":""},{"id":"d803c3c9.0761d8","type":"inject","z":"1cd48684.04dbab","name":"Celsius","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"25","payloadType":"num","x":170,"y":100,"wires":[["21b83b07.36564"]]},{"id":"21b83b07.36564","type":"change","z":"1cd48684.04dbab","name":"Convert to Fahrenheit","rules":[{"t":"set","p":"payload","pt":"msg","to":"$round(($number(payload) * 9/5) + 32, 2)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":410,"y":100,"wires":[["dc92db44.a50c08"]]},{"id":"dc92db44.a50c08","type":"debug","z":"1cd48684.04dbab","name":"Fahrenheit","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":610,"y":100,"wires":[]}]
{% endrenderFlow %}
2. **Message Filtering**: The Change node can filter out messages based on specific conditions. You can use the Change node to route messages to different outputs, discard irrelevant messages, or take specific actions based on message properties.

![Message Filter](./images/change-message-filter.png)
{% renderFlow %}
[{"id":"a4569070.48f9d8","type":"inject","z":"d238e48a.85c08","name":"Simulate Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Bonjour","payloadType":"str","x":170,"y":120,"wires":[["53c33235.e5c248"]]}]
{% endrenderFlow %}

3. **Message Enrichment**: The Change node allows you to add or modify properties in a message to enrich its content. For instance, you can add timestamps, add contextual information, or set specific identifiers for tracking purposes.

![Message Enrichment](./images/change-message-enrich.png)
{% renderFlow %}
[{"id":"34d49c7f.505d58","type":"tab","label":"Message Enrichment","disabled":false,"info":""},{"id":"f7c09e8f.01af2","type":"inject","z":"34d49c7f.505d58","name":"Simulate Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello, world!","payloadType":"str","x":170,"y":120,"wires":[["2ef767d1.3b5f32"]]},{"id":"2ef767d1.3b5f32","type":"change","z":"34d49c7f.505d58","name":"Add Timestamp","rules":[{"t":"set","p":"timestamp","pt":"msg","to":"$now()","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":360,"y":120,"wires":[["e3b0c949.c20ba"]]},{"id":"e3b0c949.c20ba","type":"debug","z":"34d49c7f.505d58","name":"Enriched Message","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":580,"y":120,"wires":[]}]
{% endrenderFlow %}

4. **Renaming Properties**: The Change node allows you to rename message properties, making it easier to understand and work with data at various points in your flow.

![Example](./images/change-rename-property.png)
{% renderFlow %}
[{"id":"5e6054b9.8b6a64","type":"tab","label":"Renaming Properties","disabled":false,"info":""},{"id":"ca8a03f3.119d18","type":"inject","z":"5e6054b9.8b6a64","name":"Simulate Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"data\":123}","payloadType":"json","x":170,"y":120,"wires":[["d44de052.a77d"]]},{"id":"d44de052.a77d","type":"change","z":"5e6054b9.8b6a64","name":"Rename Property","rules":[{"t":"set","p":"sensorData","pt":"msg","to":"payload.data","tot":"msg"},{"t":"delete","p":"payload.data","pt":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":380,"y":120,"wires":[["690e6de1.3ad218"]]},{"id":"690e6de1.3ad218","type":"debug","z":"5e6054b9.8b6a64","name":"Renamed Property","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"sensorData","targetType":"msg","statusVal":"","statusType":"auto","x":570,"y":120,"wires":[]}]
{% endrenderFlow %}

5. **Default Values**: If a message lacks certain properties, the Change node can set default values for those properties, ensuring consistency in the data flow.

![Example](./images/change-default.png)
{% renderFlow %}
[{"id":"3abbe88b.537ac4","type":"tab","label":"Default Values","disabled":false,"info":""},{"id":"947dcab3.47e8b","type":"inject","z":"3abbe88b.537ac4","name":"Simulate Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"name\":\"Alice\"}","payloadType":"json","x":170,"y":120,"wires":[["a8d3ce5c.7982c"]]},{"id":"a8d3ce5c.7982c","type":"change","z":"3abbe88b.537ac4","name":"Set Default Age","rules":[{"t":"missing","p":"payload.age","pt":"msg"},{"t":"set","p":"payload.age","pt":"msg","to":"25","tot":"num"}],"action":"","property":"","from":"","to":"","reg":false,"x":370,"y":120,"wires":[["f5892567.3bbd8"]]},{"id":"f5892567.3bbd8","type":"debug","z":"3abbe88b.537ac4","name":"Enriched Data","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":550,"y":120,"wires":[]}]
{% endrenderFlow %}

6. **Message Formatting**: When sending data to external systems or services, the Change node can format the message payload in the required format (e.g., JSON, XML) or adjust data to match specific API requirements.

![Example](./images/change-message-format.png)
{% renderFlow %}
[{"id":"49e37717.8c3d98","type":"tab","label":"Message Formatting","disabled":false,"info":""},{"id":"4b97a1f2.bf7a0c","type":"inject","z":"49e37717.8c3d98","name":"Simulate Data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"temperature\":28,\"humidity\":50}","payloadType":"json","x":170,"y":120,"wires":[["f303ce36.e3c1f"]]},{"id":"f303ce36.e3c1f","type":"change","z":"49e37717.8c3d98","name":"Format as JSON","rules":[{"t":"set","p":"payload","pt":"msg","to":"payload.temperature & \" °C, Humidity: \" & payload.humidity & \"%\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":360,"y":120,"wires":[["d7c1af9f.f1099"]]},{"id":"d7c1af9f.f1099","type":"debug","z":"49e37717.8c3d98","name":"Formatted Message","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":580,"y":120,"wires":[]}]
{% endrenderFlow %}

Overall, the Change node is a crucial tool for data manipulation and orchestration in Node-RED flows. Its flexibility and range of operations make it an essential node for customizing messages according to your specific use cases and the requirements of the nodes within your flow.