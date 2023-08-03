## ## What's the Change node in Node-RED used for?

The Change node in Node-RED is used for modifying the content of messages within a flow. It allows you to add, remove, modify, or set message properties and payload values, making it a fundamental node for data transformation and manipulation. The Change node is essential for preparing data for further processing, formatting messages for specific outputs, and adapting data to suit the requirements of downstream nodes in a flow.

## Examples for the Change node
Use cases for the Change node include:

1. **Data Transformation**: You can use the Change node to transform data from one format to another. For example, you can convert temperature values from Celsius to Fahrenheit, translate textual information, or convert timestamps to a different format.

![Data Transform](./images/change-data-transform.png)

2. **Message Filtering**: The Change node can filter out messages based on specific conditions. You can use the Change node to route messages to different outputs, discard irrelevant messages, or take specific actions based on message properties.

![Message Filter](./images/change-message-filter.png)

3. **Message Enrichment**: The Change node allows you to add or modify properties in a message to enrich its content. For instance, you can add timestamps, add contextual information, or set specific identifiers for tracking purposes.

![Message Enrichment](./images/change-message-enrich.png)


4. **Renaming Properties**: The Change node allows you to rename message properties, making it easier to understand and work with data at various points in your flow.

![Example](./images/change-rename-property.png)

5. **Default Values**: If a message lacks certain properties, the Change node can set default values for those properties, ensuring consistency in the data flow.

![Example](./images/change-default.png)

6. **Message Formatting**: When sending data to external systems or services, the Change node can format the message payload in the required format (e.g., JSON, XML) or adjust data to match specific API requirements.

![Example](./images/change-message-format.png)

Overall, the Change node is a crucial tool for data manipulation and orchestration in Node-RED flows. Its flexibility and range of operations make it an essential node for customizing messages according to your specific use cases and the requirements of the nodes within your flow.