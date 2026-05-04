Converts between CSV formatted text and JavaScript objects.

## Where and why do we use the CSV node?

The CSV node processes comma-separated values (CSV) data. It converts CSV strings into JavaScript objects for processing, or transforms objects back into CSV format for export. This is essential when working with spreadsheet data, database exports, or any tabular information that needs to be read, modified, or generated.

## Modes of operation

The CSV node operates in two directions depending on the input it receives:

### CSV to Object

When the input is a CSV string, the node parses it into JavaScript objects. Each row becomes an object with properties named after the column headers. This mode lets you process spreadsheet data programmatically, apply calculations, filter rows, or transform the data structure.

The node can handle CSV strings with or without headers. When headers are present, they become the property names in the output objects. Without headers, you can specify column names manually.

### Object to CSV

When the input is a JavaScript object or array of objects, the node converts it into CSV format. This mode is useful for generating reports, exporting processed data, or creating files for import into spreadsheet applications.

You can control whether to include headers in the output and specify which columns to export.

## How the node handles messages

The CSV node processes the `msg.payload` property. For CSV input, it outputs one message per row (or a single message with an array of all rows, depending on configuration). For object input, it generates a CSV string in the output `msg.payload`.

The node supports various CSV formats and can handle quoted fields, different delimiters, and special characters. It preserves data types when configured to do so, converting strings to numbers or booleans as appropriate.

When parsing CSV with headers, the node stores the column names in `msg.columns`. This property can be modified to control which columns appear in the output when converting back to CSV.

## Examples

### Processing energy consumption data

Suppose you have a CSV file that details the energy consumption of various manufacturing stations in a factory. The file includes the station name, the month, and the total electricity consumed. You want to add a new column that displays the number of parts produced per station, based on the assumption that each part consumes a specific amount of electricity.

CSV Input:
```
Station,Month,Consumption
Rio,January,4000
New York,January,1000
Tokio,January,3000
```

This flow reads the CSV data, converts it to objects, adds a calculated PartsProduced column, and converts it back to CSV format.

{% renderFlow %}
[{"id":"1","type":"inject","z":"3a74ad88ecc45bcb","name":"Start","repeat":"","crontab":"","once":false,"onceDelay":0.1,"payload":"","payloadType":"date","x":90,"y":60,"wires":[["2"]]},{"id":"2","type":"template","z":"3a74ad88ecc45bcb","name":"CSV Data","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"Station,Month,Consumption\nRio,January,4000\nNew York,January,1000\nTokio,January,3000","x":240,"y":60,"wires":[["3"]]},{"id":"3","type":"csv","z":"3a74ad88ecc45bcb","name":"CSV In","sep":",","hdrin":true,"hdrout":"","multi":"one","ret":"\\n","temp":"","skip":"0","strings":true,"include_empty_strings":false,"include_null_values":false,"x":410,"y":60,"wires":[["4","5"]]},{"id":"4","type":"debug","z":"3a74ad88ecc45bcb","name":"Debug JSON","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":590,"y":60,"wires":[]},{"id":"5","type":"change","z":"3a74ad88ecc45bcb","name":"Add PartsProduced","rules":[{"t":"set","p":"columns","pt":"msg","to":"msg.columns & \", PartsProduced\"","tot":"jsonata"},{"t":"set","p":"payload.PartsProduced","pt":"msg","to":"payload.Consumption / 10","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":230,"y":140,"wires":[["6"]]},{"id":"6","type":"csv","z":"3a74ad88ecc45bcb","name":"CSV out","sep":",","hdrin":"","hdrout":"all","multi":"one","ret":"\\n","temp":"","skip":"0","strings":true,"include_empty_strings":false,"include_null_values":false,"x":420,"y":140,"wires":[["7"]]},{"id":"7","type":"debug","z":"3a74ad88ecc45bcb","name":"Debug Final CSV","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":610,"y":140,"wires":[]}]
{% endrenderFlow %}