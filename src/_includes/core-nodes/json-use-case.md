Converts between JSON strings and JavaScript objects.

## Where and why do we use the JSON node?

The JSON node processes JavaScript Object Notation (JSON) data. It converts between JSON-formatted strings and JavaScript objects, making it essential when working with APIs, storing data, or transmitting information between different services. This bidirectional conversion lets you parse incoming JSON data for processing and format JavaScript objects into JSON strings for output.

## Modes of operation

The JSON node operates in two directions depending on what it detects in the input:

### JSON String to Object

When the input is a JSON string, the node parses it into a JavaScript object. This mode is essential when receiving data from APIs, reading JSON files, or processing JSON payloads from HTTP requests. Once converted to an object, you can access and manipulate the data using standard JavaScript operations.

### Object to JSON String

When the input is a JavaScript object, the node converts it into a JSON string. Use this mode when preparing data to send to APIs, writing to files, or transmitting structured data. You can optionally format the output with indentation for improved readability.

### Automatic Detection

The node automatically detects whether the input is a JSON string or JavaScript object and performs the appropriate conversion. You can also configure it to always convert in a specific direction or validate JSON without conversion.

## How the node handles messages

The JSON node processes the `msg.payload` property by default, but you can configure it to work with any message property. After conversion, it replaces the property with the converted value.

When parsing JSON strings, the node validates the syntax and reports errors if the JSON is malformed. When converting objects to strings, it handles nested structures, arrays, and standard JavaScript data types (strings, numbers, booleans, null).

The node can format JSON output with pretty printing, adding indentation and line breaks to make the structure more readable. This is useful for debugging or generating human-readable output files.

## Examples

### Monitoring equipment efficiency

Suppose you have a JSON data stream from sensors installed on an assembly line in a manufacturing plant. The JSON objects include equipment name, timestamp, and efficiency percentage. This flow extracts the information and calculates a daily average efficiency for each equipment to help with predictive maintenance and production optimization.

**JSON Input:**
```json
{
  "equipment": "Drill Press",
  "timestamp": "2023-09-22T12:34:56Z",
  "efficiency": 89.5
}
```

The flow parses incoming JSON strings, groups messages together, calculates the average efficiency, and converts the result back to JSON format.

{% renderFlow %}
[{"id":"609e5eb634beaf5c","type":"tab","label":"Flow 4","disabled":false,"info":"","env":[]},{"id":"a0ce2ea0.b7597","type":"inject","z":"609e5eb634beaf5c","name":"Simulate Data","props":[{"p":"payload"}],"repeat":"0.5","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"equipment\":\"Drill Press\",\"timestamp\":\"2023-09-22T12:34:56Z\",\"efficiency\":89.5}","payloadType":"json","x":140,"y":80,"wires":[["8d32bd8d.6d5cc"]]},{"id":"8d32bd8d.6d5cc","type":"json","z":"609e5eb634beaf5c","name":"Parse JSON","property":"payload","action":"obj","pretty":false,"x":330,"y":80,"wires":[["673dc89e.64ac18"]]},{"id":"673dc89e.64ac18","type":"join","z":"609e5eb634beaf5c","name":"Group Messages","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"10","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"","reduceFixup":"","x":530,"y":80,"wires":[["1780e12a.aa407f"]]},{"id":"1780e12a.aa407f","type":"function","z":"609e5eb634beaf5c","name":"Calculate Efficiency","func":"let arr = msg.payload;\nlet sum = 0;\nlet count = 0;\n\narr.forEach(function(item) {\n    sum += item.efficiency;\n    count++;\n});\n\nlet averageEfficiency = sum / count;\n\nmsg.payload = {\n    equipment: arr[0].equipment,\n    averageEfficiency: averageEfficiency\n};\n\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":750,"y":80,"wires":[["6285ddd29f8b38c7"]]},{"id":"6a79ba9.44db444","type":"debug","z":"609e5eb634beaf5c","name":"Output","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":1110,"y":80,"wires":[]},{"id":"6285ddd29f8b38c7","type":"json","z":"609e5eb634beaf5c","name":"Parse Object","property":"payload","action":"str","pretty":false,"x":950,"y":80,"wires":[["6a79ba9.44db444"]]}]
{% endrenderFlow %}