---
eleventyNavigation:
  key: JSON
  parent : Parser
---

# Node-RED JSON Node

## What's the JSON node in Node-RED used for?

The JSON node in Node-RED is used for processing JavaScript Object Notation (JSON) data. It allows you to convert between a JSON-formatted string and a JavaScript object, making it highly versatile for tasks involving JSON manipulation. This conversion capability proves to be essential when working with APIs, storing data, or transmitting data between different services.

## Use Case: Monitoring Equipment Efficiency

Suppose you have a JSON data stream that comes from different sensors installed on an assembly line in a manufacturing plant. The JSON objects include data such as equipment name, timestamp, and efficiency percentage. You'd like to extract this information and calculate a daily average efficiency for each equipment to help in predictive maintenance and to optimize the production process.

**JSON Input:**
```json
{
  "equipment": "Drill Press",
  "timestamp": "2023-09-22T12:34:56Z",
  "efficiency": 89.5
}
```
### Flow

{% renderFlow %}
[{"id":"609e5eb634beaf5c","type":"tab","label":"Flow 4","disabled":false,"info":"","env":[]},{"id":"a0ce2ea0.b7597","type":"inject","z":"609e5eb634beaf5c","name":"Simulate Data","props":[{"p":"payload"}],"repeat":"0.5","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"equipment\":\"Drill Press\",\"timestamp\":\"2023-09-22T12:34:56Z\",\"efficiency\":89.5}","payloadType":"json","x":140,"y":80,"wires":[["8d32bd8d.6d5cc"]]},{"id":"8d32bd8d.6d5cc","type":"json","z":"609e5eb634beaf5c","name":"Parse JSON","property":"payload","action":"obj","pretty":false,"x":330,"y":80,"wires":[["673dc89e.64ac18"]]},{"id":"673dc89e.64ac18","type":"join","z":"609e5eb634beaf5c","name":"Group Messages","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"10","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"","reduceFixup":"","x":530,"y":80,"wires":[["1780e12a.aa407f"]]},{"id":"1780e12a.aa407f","type":"function","z":"609e5eb634beaf5c","name":"Calculate Efficiency","func":"let arr = msg.payload;\nlet sum = 0;\nlet count = 0;\n\narr.forEach(function(item) {\n    sum += item.efficiency;\n    count++;\n});\n\nlet averageEfficiency = sum / count;\n\nmsg.payload = {\n    equipment: arr[0].equipment,\n    averageEfficiency: averageEfficiency\n};\n\nreturn msg;","outputs":1,"timeout":"","noerr":0,"initialize":"","finalize":"","libs":[],"x":750,"y":80,"wires":[["6285ddd29f8b38c7"]]},{"id":"6a79ba9.44db444","type":"debug","z":"609e5eb634beaf5c","name":"Output","active":false,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":1110,"y":80,"wires":[]},{"id":"6285ddd29f8b38c7","type":"json","z":"609e5eb634beaf5c","name":"Parse Object","property":"payload","action":"str","pretty":false,"x":950,"y":80,"wires":[["6a79ba9.44db444"]]}]
{% endrenderFlow %}
