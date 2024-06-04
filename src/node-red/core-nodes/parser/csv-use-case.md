---
eleventyNavigation:
  key: CSV
  parent : Parser
---

# Node-RED CSV Node

## What's the CSV node in Node-RED used for?

The CSV node in Node-RED is used for processing comma-separated values (CSV) data. It allows you to either convert a CSV string into a JavaScript object or transform an object into a CSV string. This capability makes it extremely useful for reading and writing data in a tabular format.

### Use Case: Calculating Energy Consumption

Suppose you have a CSV file that details the energy consumption of various manufacturing stations in a factory. The file includes the station name, the month, and the total electricity consumed. You want to add a new column that displays the number of parts produced per station, based on the assumption that each part consumes a specific amount of electricity in addition to the machine's base electricity consumption.

CSV Input:

```
Station,Month,Consumption
Rio,January,4000
New York,January,1000
Tokio,January,3000
```

### Flow

{% renderFlow %}
[{"id":"1","type":"inject","z":"3a74ad88ecc45bcb","name":"Start","repeat":"","crontab":"","once":false,"onceDelay":0.1,"payload":"","payloadType":"date","x":90,"y":60,"wires":[["2"]]},{"id":"2","type":"template","z":"3a74ad88ecc45bcb","name":"CSV Data","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"Station,Month,Consumption\nRio,January,4000\nNew York,January,1000\nTokio,January,3000","x":240,"y":60,"wires":[["3"]]},{"id":"3","type":"csv","z":"3a74ad88ecc45bcb","name":"CSV In","sep":",","hdrin":true,"hdrout":"","multi":"one","ret":"\\n","temp":"","skip":"0","strings":true,"include_empty_strings":false,"include_null_values":false,"x":410,"y":60,"wires":[["4","5"]]},{"id":"4","type":"debug","z":"3a74ad88ecc45bcb","name":"Debug JSON","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":590,"y":60,"wires":[]},{"id":"5","type":"change","z":"3a74ad88ecc45bcb","name":"Add PartsProduced","rules":[{"t":"set","p":"columns","pt":"msg","to":"msg.columns & \", PartsProduced\"","tot":"jsonata"},{"t":"set","p":"payload.PartsProduced","pt":"msg","to":"payload.Consumption / 10","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":230,"y":140,"wires":[["6"]]},{"id":"6","type":"csv","z":"3a74ad88ecc45bcb","name":"CSV out","sep":",","hdrin":"","hdrout":"all","multi":"one","ret":"\\n","temp":"","skip":"0","strings":true,"include_empty_strings":false,"include_null_values":false,"x":420,"y":140,"wires":[["7"]]},{"id":"7","type":"debug","z":"3a74ad88ecc45bcb","name":"Debug Final CSV","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","x":610,"y":140,"wires":[]}]
{% endrenderFlow %}
