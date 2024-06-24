---
title: How to Filter, Map, Sort, and Reduce Data in Node-RED
subtitle: Step-by-step guide to use the most common data transformation operations like filtering, mapping, sorting and reducing in Node-RED.
description: Learn how to perform data transformation in Node-RED with a low-code approach.
date: 2024-06-19
authors: ["sumit-shinde"]
image: /blog/2024/06/images/filtering-mapping-sorting-reducing-with-node-red.png
tags:
   - posts
   - node-red
   - flowfuse
   - low-code
   - filtering
   - sorting
   - mapping 
   - reducing
   - data transformation
---
   
[Node-RED](/node-red/) is a visual programming platform known for its user-friendly interface and low-code approach, that allows developers to spend more time developing solutions instead of dealing with technical complexities. However, users can sometimes make applications developed with Node-RED complex and hard to maintain when they are not familiar with its basics. Understanding Node-RED basics helps keep flows low-coded which helps keep your projects simple and easy to understand.

<!--more-->

Often, I have noticed that many users are unfamiliar with how to filter, map, sort, and reduce data using a low-code approach. They tend to rely on function nodes, which can add complexity. If you are unfamiliar with function nodes and their drawbacks, please refer to [The benefits and drawbacks of using Node-RED function nodes](/blog/2023/03/why-should-you-use-node-red-function-nodes/). In this guide, we will show you how to filter, map, sort, and reduce data with Node-RED while sticking to low-code practices.

## What is Low-Code

Low-code is a software development approach that requires little to no coding to build applications and processes. Instead of using complex programming languages, you use visual interfaces with basic logic and drag-and-drop capabilities.

> Low-code is not just about accelerating development; it’s about democratizing it. It’s about giving more people the ability to create solutions to business problems.
>
> *— Charles Lamanna, Corporate Vice President of Business Applications & Platforms at Microsoft*

For more details refer to the following articles:

- [Why Low-Code is Better](/blog/2024/03/low-code-is-better/).
- [Why you need a low-code platform](/blog/2024/05/why-you-need-a-low-code-platform/).

## Why do you need to learn to filter, map, sort, and reduce the data?

Filter, map, sort, and reduce are essential functions in data processing because they efficiently transform, extract, organize, and aggregate data, that makes it easier to analyze and derive insights from datasets. For example, consider the scenario where you have an array of sensor data retrieved from an database. The data looks something like this:

```json
[
    {
        "timestamp": "2024-06-17T10:00:00Z",
        "temperature": 25
    },
    {
        "timestamp": "2024-06-17T11:00:00Z",
        "temperature": 26
    },
    {
        "timestamp": "2024-06-17T10:30:00Z",
        "temperature": 27
    },
    {
        "timestamp": "2024-06-17T10:15:00Z",
        "temperature": 28
    },
    {
        "timestamp": "2024-06-17T10:45:00Z",
        "temperature": 30
    },
    {
        "timestamp": "2024-06-18T09:00:00Z",
        "temperature": 24
    },
    {
        "timestamp": "2024-06-18T10:00:00Z",
        "temperature": 27
    },
    {
        "timestamp": "2024-06-18T11:00:00Z",
        "temperature": 28
    },
    {
        "timestamp": "2024-06-18T12:00:00Z",
        "temperature": 29
    },
    {
        "timestamp": "2024-06-19T10:00:00Z",
        "temperature": 25
    },
    {
 
        "timestamp": "2024-06-19T11:00:00Z",
        "temperature": 26
    }
]
```

However, you've noticed that the temperature data is in Kelvin, but you need it in Celsius. Additionally, the data is not correctly ordered by timestamp, and you only need the data of June 17th. Finally, you want to calculate the average temperature for that day. Users who are not familiar with Node-RED basics can use a JavaScript function node to achieve this, as shown below:

{% renderFlow %}
[{"id":"306d455509a3747e","type":"inject","z":"baa50b8a4762ec1f","name":"Inject the sample data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[     {\"timestamp\":\"2024-06-17T10:00:00Z\",\"temperature\":25},     {\"timestamp\":\"2024-06-17T11:00:00Z\",\"temperature\":26},     {\"timestamp\":\"2024-06-17T10:30:00Z\",\"temperature\":27},     {\"timestamp\":\"2024-06-17T10:15:00Z\",\"temperature\":28},     {\"timestamp\":\"2024-06-17T10:45:00Z\",\"temperature\":30},     {\"timestamp\":\"2024-06-18T09:00:00Z\",\"temperature\":24},     {\"timestamp\":\"2024-06-18T10:00:00Z\",\"temperature\":27},     {\"timestamp\":\"2024-06-18T11:00:00Z\",\"temperature\":28},     {\"timestamp\":\"2024-06-18T12:00:00Z\",\"temperature\":29},     {\"timestamp\":\"2024-06-19T10:00:00Z\",\"temperature\":25},     {\"timestamp\":\"2024-06-19T11:00:00Z\",\"temperature\":26} ]","payloadType":"json","x":140,"y":240,"wires":[["c58e1653fe5511eb"]]},{"id":"c58e1653fe5511eb","type":"function","z":"baa50b8a4762ec1f","name":"Filtering, mapping, reducing and sorting data with traditional coding","func":"let sensorData = msg.payload;\n\nconst filteredData = sensorData\n    .filter(item => item.timestamp.startsWith(\"2024-06-17\"))\n    .map(item => ({\n        timestamp: item.timestamp,\n        temperature: item.temperature - 273.15\n    }));\n\nfilteredData.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0));\n\nconst totalTemperature = filteredData.reduce((acc, entry) => acc + entry.temperature, 0);\nconst averageTemperature = totalTemperature / filteredData.length;\n\nmsg.payload = {\n    sensorData: filteredData,\n    averageTemperature: averageTemperature\n};\n\nreturn msg;\n","outputs":1,"timeout":0,"noerr":0,"initialize":"","finalize":"","libs":[],"x":580,"y":240,"wires":[["827c7d2009eeb046"]]},{"id":"827c7d2009eeb046","type":"debug","z":"baa50b8a4762ec1f","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":940,"y":240,"wires":[]}]
{% endrenderFlow %}

Using function nodes isn't wrong, but it adds complexity to your applications. Since not everyone on the team may be familiar with JavaScript, it can limit who can solve business problems. To keep the application flow simple, using a low-code approach to perform these operations is crucial.

In the following sections, we'll explore how to perform these operations using a low-code approach.

## Mapping

Mapping often refers to the process of applying a function to each item in a list, array, or other collection to produce a new collection of transformed items. here in our context, we need to covert the temperature data of each object from kelvin to celsius. To perform mapping we will use the Split, Change, and Join nodes. 

1. Drag a Split node onto the canvas, the Split node will Split a message into a sequence of messages which will allow us to operate on each message.
2. Drag a Change node onto the canvas, set the `msg.payload.temperature` to `payload.temperature - 273.15` as JSONata expression.

!["Screenshot change node correcting the temperature property"](./images/filtering-mapping-sorting-reducing-data-with-node-red-change-node.png "Screenshot change node correcting the temperature property"){data-zoomable}

3. Now Drag the Join node onto the canvas, select the Mode to "manual" and to create to "an array" and set the After a number of message parts to 0, this will join all of the messages originating from the split node into an array.

!["Screenshot join node creating new array by combining message sequnce"](./images/filtering-mapping-sorting-reducing-data-with-node-red-join-node-combining-node.png "Screenshot join node creating new array by combining message sequnce"){data-zoomable}

{% renderFlow %}
[{"id":"306d455509a3747e","type":"inject","z":"baa50b8a4762ec1f","name":"Inject the sample data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[     {\"timestamp\":\"2024-06-17T10:00:00Z\",\"temperature\":298.15},     {\"timestamp\":\"2024-06-17T11:00:00Z\",\"temperature\":299.15},     {\"timestamp\":\"2024-06-17T10:30:00Z\",\"temperature\":300.15},     {\"timestamp\":\"2024-06-17T10:15:00Z\",\"temperature\":301.15},     {\"timestamp\":\"2024-06-17T10:45:00Z\",\"temperature\":303.15},     {\"timestamp\":\"2024-06-18T09:00:00Z\",\"temperature\":297.15},     {\"timestamp\":\"2024-06-18T10:00:00Z\",\"temperature\":300.15},     {\"timestamp\":\"2024-06-18T11:00:00Z\",\"temperature\":301.15},     {\"timestamp\":\"2024-06-18T12:00:00Z\",\"temperature\":302.15},     {\"timestamp\":\"2024-06-19T10:00:00Z\",\"temperature\":298.15},     {\"timestamp\":\"2024-06-19T11:00:00Z\",\"temperature\":299.15} ]","payloadType":"json","x":200,"y":380,"wires":[["9d9c0688468e1aae"]]},{"id":"9d9c0688468e1aae","type":"split","z":"baa50b8a4762ec1f","name":"Splits a message into a sequence of messages.","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":560,"y":380,"wires":[["785125a70fbdc554"]]},{"id":"785125a70fbdc554","type":"change","z":"baa50b8a4762ec1f","name":"Converting the temperature data from kelvin to celsius","rules":[{"t":"set","p":"payload.temperature","pt":"msg","to":"payload.temperature - 273.15","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":1040,"y":380,"wires":[["9cd6e05b88ec26fd"]]},{"id":"9cd6e05b88ec26fd","type":"join","z":"baa50b8a4762ec1f","name":"Creating new array by combining message sequence","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"0","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"","reduceFixup":"","x":1520,"y":380,"wires":[["244660d81bf5e5b2"]]},{"id":"244660d81bf5e5b2","type":"debug","z":"baa50b8a4762ec1f","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":1840,"y":380,"wires":[]}]
{% endrenderFlow %}

## Filtering

Filtering is the process of selecting specific items from an array to create a new array. In Node-RED, filtering is achieved using mapping and condition-based routing. Now we are familiar with mapping and have done it above, so we need to use only one more extra node which is the switch node for condition-based routing.

1. Drag a switch node and place it after the Change node and before the Join node.
2. Set the condition to check whether `msg.payload.timestamp` includes '2024-06-17' This condition ensures that only messages containing the specified date in their timestamp are sent further. 
3. Next, In the switch node checked the option "recreate message sequences" that will repair the `msg.parts` metadata added by Split node if any messages are dropped by the switch node.

!["Screenshot of switch node filtering data bases on timestamp"](./images/filtering-mapping-sorting-reducing-switch-node.png "Screenshot switch node filtering data bases on timestamp"){data-zoomable}

{% renderFlow %}
[{"id":"4e76a2328451b4c3","type":"inject","z":"977143edb097b685","name":"Inject the sample data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[{\"timestamp\":\"2024-06-17T10:00:00Z\",\"temperature\":298.15},{\"timestamp\":\"2024-06-17T11:00:00Z\",\"temperature\":299.15},{\"timestamp\":\"2024-06-17T10:30:00Z\",\"temperature\":300.15},{\"timestamp\":\"2024-06-17T10:15:00Z\",\"temperature\":301.15},{\"timestamp\":\"2024-06-17T10:45:00Z\",\"temperature\":303.15},{\"timestamp\":\"2024-06-18T09:00:00Z\",\"temperature\":297.15},{\"timestamp\":\"2024-06-18T10:00:00Z\",\"temperature\":300.15},{\"timestamp\":\"2024-06-18T11:00:00Z\",\"temperature\":301.15},{\"timestamp\":\"2024-06-18T12:00:00Z\",\"temperature\":302.15},{\"timestamp\":\"2024-06-19T10:00:00Z\",\"temperature\":298.15},{\"timestamp\":\"2024-06-19T11:00:00Z\",\"temperature\":299.15}]","payloadType":"json","x":140,"y":600,"wires":[["f4e07a31f505a50c"]]},{"id":"f4e07a31f505a50c","type":"split","z":"977143edb097b685","name":"Splits a message into a sequence of messages.","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":440,"y":600,"wires":[["fcd6a0a1497203a9"]]},{"id":"bed1a7d861fa9e3d","type":"join","z":"977143edb097b685","name":"Creating new array by combining message sequence","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"0","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":1700,"y":600,"wires":[["2449811ec79bc220"]]},{"id":"2449811ec79bc220","type":"debug","z":"977143edb097b685","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":2000,"y":600,"wires":[]},{"id":"7797594a508cfb46","type":"switch","z":"977143edb097b685","name":"Routing message sequence based on condition","property":"payload.timestamp","propertyType":"msg","rules":[{"t":"cont","v":"2024-06-17","vt":"str"}],"checkall":"true","repair":true,"outputs":1,"x":1280,"y":600,"wires":[["bed1a7d861fa9e3d"]]},{"id":"fcd6a0a1497203a9","type":"change","z":"977143edb097b685","name":"Converting the temperature data from kelvin to celsius","rules":[{"t":"set","p":"payload.temperature","pt":"msg","to":"payload.temperature - 273.15","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":860,"y":600,"wires":[["7797594a508cfb46"]]}]
{% endrenderFlow %}

## Sorting 

Sorting, as the name suggests, means arranging items in a specific order. This order can be ascending (smallest to largest), descending (largest to smallest), or based on any defined criteria. In the Node-RED you can sort the numbers, alphabets, arrays, strings, and more.
To perform sorting, we have to use the Node-RED Sort Node.

1. Drag the Sort node on the canvas.
2. Set the key to `timestamp` as the JSONata expression and then set the order to 'ascending'. We set the key to timestamp because we want to sort the data based on the timestamp. You can set it to temperature if you want to sort based on that instead.

!["Screenshot of sort node sorting data in ascending order based on timestamp"](./images/filtering-mapping-sorting-reducing-data-with-node-red-sort-node.png "Screenshot of sort node sorting data in ascending order based on timestamp"){data-zoomable}

{% renderFlow %}
[{"id":"8b66990baca45f2d","type":"inject","z":"977143edb097b685","name":"Inject the sample data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[{\"timestamp\":\"2024-06-17T10:00:00Z\",\"emperature\":25},{\"timestamp\":\"2024-06-17T11:00:00Z\",\"emperature\":26},{\"timestamp\":\"2024-06-17T10:30:00Z\",\"emperature\":27},{\"timestamp\":\"2024-06-17T10:15:00Z\",\"emperature\":28},{\"timestamp\":\"2024-06-17T10:45:00Z\",\"emperature\":30},{\"timestamp\":\"2024-06-18T09:00:00Z\",\"emperature\":24},{\"timestamp\":\"2024-06-18T10:00:00Z\",\"emperature\":27},{\"timestamp\":\"2024-06-18T11:00:00Z\",\"emperature\":28},{\"timestamp\":\"2024-06-18T12:00:00Z\",\"emperature\":29},{\"timestamp\":\"2024-06-19T10:00:00Z\",\"emperature\":25},{\"timestamp\":\"2024-06-19T11:00:00Z\",\"emperature\":26}]","payloadType":"json","x":840,"y":1300,"wires":[["f0d48b57cbd10fdd"]]},{"id":"f0d48b57cbd10fdd","type":"split","z":"977143edb097b685","name":"Splits a message into a sequence of messages.","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":1180,"y":1300,"wires":[["fdc21a267f7583e7"]]},{"id":"fdc21a267f7583e7","type":"change","z":"977143edb097b685","name":"Correcting the temperature property","rules":[{"t":"set","p":"payload.temperature","pt":"msg","to":"payload.emperature","tot":"msg"},{"t":"delete","p":"payload.emperature","pt":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":1520,"y":1300,"wires":[["7d4ce2d4e21cd914"]]},{"id":"c273215c8c9cebee","type":"join","z":"977143edb097b685","name":"Creating new array by combining message sequence","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"0","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":2300,"y":1300,"wires":[["c423efbd0581367a"]]},{"id":"e70d15ced7405755","type":"debug","z":"977143edb097b685","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":2920,"y":1300,"wires":[]},{"id":"7d4ce2d4e21cd914","type":"switch","z":"977143edb097b685","name":"Routing message sequence based on condition","property":"payload.timestamp","propertyType":"msg","rules":[{"t":"cont","v":"2024-06-17","vt":"str"}],"checkall":"true","repair":true,"outputs":1,"x":1880,"y":1300,"wires":[["c273215c8c9cebee"]]},{"id":"c423efbd0581367a","type":"sort","z":"977143edb097b685","name":"Sorting data based on timestamp","order":"ascending","as_num":false,"target":"payload","targetType":"msg","msgKey":"timestamp","msgKeyType":"jsonata","seqKey":"payload.timestamp","seqKeyType":"jsonata","x":2680,"y":1300,"wires":[["e70d15ced7405755"]]}]
{% endrenderFlow %}

## Reducing 

Reducing refers to the process of combining elements of a data structure (such as an array) into a single value. It involves iterating over the elements of the data structure and applying a combining function repeatedly until all elements have been processed.

1. Drag another Split node onto the canvas 
2. Drag Join another node onto the canvas.
2. Select the mode to "reduce sequence", set Reduce exp to `$A+ payload.temperature`, initial value to 0 and the Fix-up exp to `$A/$N`

!["Screenshot of join node calculating average of the temperature"](./images/filtering-mapping-sorting-reducing-data-with-node-red-join-node-calculating-avg.png "Screenshot of join node calculating average of the temperature"){data-zoomable}

In this configuration, the Join node is set to reduce sequence mode. The initial value of the accumulator ($A) is initialized to 0. As each message is processed, the current temperature (payload.temperature) is added to $A. Once all messages have been processed, the accumulated sum $A is divided by the total number of messages ($N) to compute the average temperature.

{% renderFlow %}
[{"id":"5ff0902202c21e85","type":"inject","z":"977143edb097b685","name":"Inject the sample data","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[{\"timestamp\":\"2024-06-17T10:00:00Z\",\"emperature\":25},{\"timestamp\":\"2024-06-17T11:00:00Z\",\"emperature\":26},{\"timestamp\":\"2024-06-17T10:30:00Z\",\"emperature\":27},{\"timestamp\":\"2024-06-17T10:15:00Z\",\"emperature\":28},{\"timestamp\":\"2024-06-17T10:45:00Z\",\"emperature\":30},{\"timestamp\":\"2024-06-18T09:00:00Z\",\"emperature\":24},{\"timestamp\":\"2024-06-18T10:00:00Z\",\"emperature\":27},{\"timestamp\":\"2024-06-18T11:00:00Z\",\"emperature\":28},{\"timestamp\":\"2024-06-18T12:00:00Z\",\"emperature\":29},{\"timestamp\":\"2024-06-19T10:00:00Z\",\"emperature\":25},{\"timestamp\":\"2024-06-19T11:00:00Z\",\"emperature\":26}]","payloadType":"json","x":480,"y":900,"wires":[["993ffc096c3e8089"]]},{"id":"993ffc096c3e8089","type":"split","z":"977143edb097b685","name":"Splits a message into a sequence of messages.","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":800,"y":900,"wires":[["3bbb68c2dc2a0f5c"]]},{"id":"3bbb68c2dc2a0f5c","type":"change","z":"977143edb097b685","name":"Correcting the temperature property","rules":[{"t":"set","p":"payload.temperature","pt":"msg","to":"payload.emperature","tot":"msg"},{"t":"delete","p":"payload.emperature","pt":"msg"}],"action":"","property":"","from":"","to":"","reg":false,"x":1180,"y":900,"wires":[["580210c585730f97"]]},{"id":"01e7066b3ff012e7","type":"join","z":"977143edb097b685","name":"Creating new array by combining message sequence","mode":"custom","build":"array","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":false,"timeout":"","count":"0","reduceRight":false,"reduceExp":"","reduceInit":"","reduceInitType":"num","reduceFixup":"","x":1960,"y":900,"wires":[["27cc5d5e90f7facd","6116c1efc3f7f682"]]},{"id":"580210c585730f97","type":"switch","z":"977143edb097b685","name":"Routing message sequence based on condition","property":"payload.timestamp","propertyType":"msg","rules":[{"t":"cont","v":"2024-06-17","vt":"str"}],"checkall":"true","repair":true,"outputs":1,"x":1540,"y":900,"wires":[["01e7066b3ff012e7"]]},{"id":"27cc5d5e90f7facd","type":"sort","z":"977143edb097b685","name":"Sorting data based on timestamp","order":"ascending","as_num":false,"target":"payload","targetType":"msg","msgKey":"timestamp","msgKeyType":"jsonata","seqKey":"payload.timestamp","seqKeyType":"jsonata","x":2340,"y":900,"wires":[["f1f93a7b4575daf1"]]},{"id":"362ec9c482688cf6","type":"debug","z":"977143edb097b685","name":"debug 4","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":3040,"y":1020,"wires":[]},{"id":"b9f2f83a330140ca","type":"join","z":"977143edb097b685","name":"Calculating the  the average of temperature","mode":"reduce","build":"object","property":"payload","propertyType":"msg","key":"topic","joiner":"\\n","joinerType":"str","accumulate":true,"timeout":"","count":"","reduceRight":false,"reduceExp":"$A+ payload.temperature","reduceInit":"0","reduceInitType":"num","reduceFixup":"$A/$N","x":2790,"y":1020,"wires":[["362ec9c482688cf6"]]},{"id":"f1f93a7b4575daf1","type":"debug","z":"977143edb097b685","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":2620,"y":900,"wires":[]},{"id":"6116c1efc3f7f682","type":"split","z":"977143edb097b685","name":"Splits a message into a sequence of messages.","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":2360,"y":1020,"wires":[["b9f2f83a330140ca"]]}]
{% endrenderFlow %}

## Conclusion 

Using Node-RED’s low-code approach for filtering, mapping, sorting, and reducing data allows you to process and transform data effectively without relying on complex programming languages. This approach helps maintain flows that are easy to understand and modify which contributes to efficient application development.
