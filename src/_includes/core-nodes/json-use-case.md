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

<iframe width="100%" height="100%" src="https://flows.nodered.org/flow/f2d01d981b0dcb8b33d01785a39fef3c/share" allow="clipboard-read; clipboard-write" style="border: none;"></iframe>
