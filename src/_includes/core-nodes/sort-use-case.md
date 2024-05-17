## What is sort node in Node-RED?

The Sort node in Node-RED is a function node used to sort either an array of data within a message or a sequence of messages themselves, either in ascending or descending order.

## Configuring Sort node

- **Sort:**
    - `msg.<property>`: Specify the message property which contains array data and needs to be sorted.
    - Message sequences: Sort a sequence of messages. selecting this sort node relies on the received messages to have `msg.parts` set. The split node generates this property, but it can be manually created. It has the following properties:
        - id: An identifier for the group of messages.
        - index: The position within the group.
        - count: The total number of messages in the group.
        
- **Key:** 
    - Element value: Selecting this will sort the array based on the value of the element.
    - Expression: Specify a JSONata expression for sorting property values.

- **Order:**
    - Ascending: Sorts the data in ascending order.
    - Descending: Sorts the data in descending order.

- **As numbers:** When checked, treats the values as numbers for numerical ordering.

**Note:** This node internally keeps messages for its operation. In order to prevent unexpected memory usage, the maximum number of messages kept can be specified. The default is no limit on the number of messages. you can set the max length with `nodeMessageBufferMaxLength` property is set in settings.js.

## Usecases

- **Data Processing:** Sort nodes are often used in data processing pipelines where you need to arrange data in a particular order before further processing. For example, sorting a list of items alphabetically or numerically before performing analysis or displaying the data.

- **Message Sequences:** When dealing with message sequences, the Sort node can be used to order messages based on specific criteria. This is particularly useful when working with data streams where the order of messages matters, such as processing time-series data or event streams.

- **Dashboard Displays:** In dashboard applications created with Node-RED, the Sort node can help arrange data in a visually appealing manner. For instance, sorting a list of items alphabetically before displaying them in a dropdown menu or a table on a web interface.

- **Data Aggregation:** When aggregating data from multiple sources, the Sort node can be used to organize the aggregated data in a meaningful way. This could involve sorting data based on timestamps, numerical values, or any other relevant criteria.

- **Filtering and Filtering:** By sorting data, it becomes easier to filter out specific elements or identify outliers. For example, you might use the Sort node to identify the highest or lowest values in a dataset, or to filter out items that fall above or below a certain threshold.

## Examples

1. In the example below, the Sort node sorts the array of numbers and array of the English alphabet in ascending order.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"416d6d32df411abe","type":"sort","z":"b5ea6d2a.6e7bb","name":"","order":"ascending","as_num":false,"target":"payload","targetType":"msg","msgKey":"payload","msgKeyType":"elem","seqKey":"payload.quantity","seqKeyType":"msg","x":570,"y":320,"wires":[["eb923bde78247dc5"]]},{"id":"c8bd64176725f43f","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[7,8,41,90,2,4,2]","payloadType":"json","x":360,"y":320,"wires":[["416d6d32df411abe"]]},{"id":"eb923bde78247dc5","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":760,"y":320,"wires":[]},{"id":"67f2e62eec9509c5","type":"comment","z":"b5ea6d2a.6e7bb","name":"Ordering numbers in ascending order","info":"","x":530,"y":240,"wires":[]},{"id":"481e382abac7a730","type":"sort","z":"b5ea6d2a.6e7bb","name":"","order":"ascending","as_num":false,"target":"payload","targetType":"msg","msgKey":"payload","msgKeyType":"elem","seqKey":"payload.quantity","seqKeyType":"msg","x":570,"y":440,"wires":[["f43093160e436025"]]},{"id":"21502b212a9c0f80","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[\"G\", \"F\", \"T\", \"A\", \"R\", \"P\", \"H\", \"W\", \"C\", \"Y\", \"N\", \"B\", \"L\", \"O\", \"X\", \"I\", \"V\", \"E\", \"J\", \"U\", \"K\", \"M\", \"S\", \"Z\", \"D\", \"Q\"]","payloadType":"json","x":330,"y":440,"wires":[["481e382abac7a730"]]},{"id":"f43093160e436025","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":760,"y":440,"wires":[]},{"id":"dba624ac20a75580","type":"comment","z":"b5ea6d2a.6e7bb","name":"Ordering alphabets in ascending order","info":"","x":510,"y":380,"wires":[]}]
{% endrenderFlow %}

2. In the example below, the Sort node sorts the message sequences in ascending order based on the `msg.payload.quantity` property of each message.

{% renderFlow %}
[{"id":"416d6d32df411abe","type":"sort","z":"b5ea6d2a.6e7bb","name":"","order":"descending","as_num":false,"target":"","targetType":"seq","msgKey":"payload","msgKeyType":"elem","seqKey":"payload.quantity","seqKeyType":"msg","x":550,"y":320,"wires":[["eb923bde78247dc5"]]},{"id":"c8bd64176725f43f","type":"inject","z":"b5ea6d2a.6e7bb","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[   {     \"id\": 1,     \"name\": \"Laptop\",     \"quantity\": 15   },   {     \"id\": 2,     \"name\": \"Printer\",     \"quantity\": 5   },   {     \"id\": 3,     \"name\": \"Monitor\",     \"quantity\": 10   } ]","payloadType":"json","x":270,"y":320,"wires":[["05e33079464a9243"]]},{"id":"eb923bde78247dc5","type":"debug","z":"b5ea6d2a.6e7bb","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":720,"y":320,"wires":[]},{"id":"05e33079464a9243","type":"split","z":"b5ea6d2a.6e7bb","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":410,"y":320,"wires":[["416d6d32df411abe"]]},{"id":"67f2e62eec9509c5","type":"comment","z":"b5ea6d2a.6e7bb","name":"Ordering sequence of messages in descending order based on the quantity property of each message.","info":"","x":530,"y":240,"wires":[]}]
{% endrenderFlow %}
