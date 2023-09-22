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

<iframe width="100%" height="200px"
src="https://flows.nodered.org/flow/d59462dab0da277224b123205551024d/share" allow="clipboard-read; clipboard-write" style="border: none;"></iframe>
