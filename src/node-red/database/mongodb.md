---
eleventyNavigation:
  key: MongoDB
  parent: Database
meta:
  title: Using MongoDB With Node-RED
  description: Learn how to seamlessly integrate MongoDB, a NoSQL database, into your Node-RED applications with this step-by-step documentation.
  keywords: node-red, databases, integration, mongodb, no-sql database
image: /node-red/core-nodes/images/using-Mongo-with-nr.png
---

# {{ meta.title }}

MongoDB, a popular NoSQL database, is a favored choice among developers. As MongoDB continuously releases updates to enhance efficiency and suitability for manufacturing purposes, we find providing content around MongoDB for our Node-RED users essential. In this documentation, we will cover everything from MongoDB foundations to setup, providing you with step-by-step instructions for integration into your Node-RED applications.

## What is MongoDB

MongoDB is an open-source, NoSQL database system designed for flexibility and scalability in handling data for modern applications. It stores data in documents, which are JSON-like structures. MongoDB offers a schema-less approach where each document can have its unique structure. This flexibility allows for easy schema evolution and dynamic querying. MongoDB is widely used in web and mobile applications for its ability to handle large volumes of data and support real-time applications efficiently.

In MongoDB, instead of tables, rows, and columns as in SQL databases, we have collections, documents, and fields.

!["Annotomy of MongoDB document"](./images/using-mongodb-with-node-red-annotomy-of-mongodb-document.png "Annotomy of MongoDB document"){data-zoomable}

## Why choose MongoDB?

- MongoDB's schema-less approach fosters agile development without predefined structures, contrasting with SQL databases.
- MongoDB's distributed architecture facilitates seamless horizontal scaling across multiple nodes, ensuring consistent performance. Although some SQL databases, such as PostgreSQL, can also be scaled horizontally, the process may be more complex.
- MongoDB's query language and document-oriented data model are aligned with modern programming paradigms, which boosts developer efficiency.
- MongoDB a fully managed cloud database service, provides tools like Atlas Data Explorer, Real-Time Performance Metrics, Atlas Search, and Atlas Data Lake. These simplify database management with automated backups, point-in-time recovery, security features, and seamless scalability, which enhances operational efficiency for developers and administrators. Additionally, MongoDB has released Atlas specialized in manufacturing. For more information, refer to  [MongoDB Launches Atlas for Manufacturing and Automotive](https://www.mongodb.com/company/newsroom/press-releases/mongodb-atlas-for-manufacturing-and-automotive)
- More Importantly, MongoDB's native support for JSON documents simplifies data storage and retrieval, making it perfect for integration with Node-RED.

## Setting Up MongoDB with Node-RED

To kickstart the MongoDB integration with Node-RED, let's begin by installing the MongoDB custom node and familiarizing ourselves with MongoDB configuration details:

### Installing MongoDB custom node

1. Click the Node-RED Settings (top-right)
2. Click "Manage Palette"
3. Switch to the "Install" tab
4. Search for `node-red-contrib-mongodb4`

### Understanding MongoDB Configuration

Before you begin, gather the following configuration details:

- `Host`: IP address or hostname of your MongoDB server.
- `Port`: By default, MongoDB uses port 27017. ( If you're using a managed MongoDB service like MongoDB Atlas, this information may not be required.)
- `Database`: The name of the MongoDB database you want to connect to.
- `User`: Username with the necessary privileges to access the specified database.
- `Password`: Corresponding password for the username.

To learn about advanced configurations such as TLS/SSL, please refer to the [node's readme](https://flows.nodered.org/node/node-red-contrib-mongodb4).

### Adding Environment variables

Using environment variables during configuration is crucial to prevent exposing sensitive information directly within the flow. To learn more about it refer to [Using Environment Variables in Node-RED.](/blog/2023/01/environment-variables-in-node-red/)

!["Screenshot displaying FlowFuse instance settings"](./images/using-mongodb-with-node-red-flowfuse-instance-setting.png "Screenshot displaying FlowFuse instance settings"){data-zoomable}

1. Navigate to the instance's “setting” and then go to the “environment” tab.
2. Click on the add variable button and “add variables” for each of the configuration data that we discussed in the above section.
3. Click on the save button and restart the instance by clicking on the top right Action button and selecting the restart option.

### Configuring MongoDB node

Now let's configure the MongoDB4 node using added environment variables 

1. Drag the MongoDB4 node onto the canvas.
2. Click on the node to select it, Then, click on the edit icon next to the connection input field.
3. Add your environment variables as shown in the image below.

!["Screenshot displaying connection configuration of MongoDB 4 node."](./images/using-mongodb-with-node-red-mongodb-node-connection-configuration.png "Screenshot displaying connection configuration of MongoDB 4 node."){data-zoomable}

## Using MongoDB with Node-RED

In this section, we'll explore how to use MongoDB to perform operations such as storing, retrieving, updating, and deleting data within Node-RED. To enhance understanding and engagement, we'll develop a basic customer relationship management system using MongoDB and Node-RED.

For the CRM system we will develop, the data structure will be as follows:

```json
{
"_id": "NXaxeFEK"
"firstname": "alice"
"lastname": "demo"
"email": "userdemo601@gmail.com"
"phone": "+19876543561"
"company": "self"
"status": "Prospect"
"source": "website"
}

```

### Understanding MongoDB Operations

Before we move to practical implementation, we need to gain an understanding of the MongoDB operations that will be used in this documentation.

MongoDB operations refer to the actions or commands executed on a MongoDB database to perform various tasks such as inserting, querying, updating, and deleting data.

#### MongoDB Operations used in this documentation

- InsertOne: Adds a single document to a MongoDB collection.
- Find: Retrieves documents based on specified criteria.
- UpdateOne: Updates a single document based on specified criteria.
- DeleteOne: Deletes a single document based on specified criteria.
- Drop: Deletes an entire MongoDB collection.

MongoDB provides a rich set of operations to learn more about them refer to their [official documentation](https://www.mongodb.com/basics/crud).

### Installing Nanoid custom node

NanoID is a small, secure, URL-friendly unique string ID generator for JavaScript. It's designed to generate compact IDs ideal for usage in URLs, short IDs, or other situations where a concise yet unique identifier is needed. We will use it to generate a user-friendly customer ID instead of manually entering or generating them using random numbers.

Install `node-red-contrib-friendly-id` via the palette manager which is a node that will allow us to use NanoID in Node-RED. 

### Installing Dashboard 2.0 

To build a user-friendly interactive UI for our CRM system, we will utilize Node-RED Dashboard 2.0 by following these [instructions](/blog/2024/03/dashboard-getting-started/) to quickly set up and get started.

### Inserting Customer Data into the Database

1. Drag a ui-form widget onto the canvas, select ui-group for it, and add the form elements for `firstname`, `lastname`, `email`, `phone`, `company`, `status` and `source`.

!["Screenshot displaying form widget configuration to insert data in MongoDB"](./images/using-mongodb-with-node-red-insert-data-form.png "Screenshot displaying form widget configuration to insert data in MongoDB"){data-zoomable}

2. Drag the friendly-id node onto Canvas, click on and select and select mode as “Generate a random FriendlyId (nanoid)”, set the size according to your need, and output-to `msg.payload._id`.

!["Screenshot displaying friend-id node configuration"](./images/using-mongodb-with-node-red-friend-id-node.png "Screenshot displaying friend-id node configuration"){data-zoomable}

3. Drag the change node onto the canvas.
4. In the change node Set `msg.payload` to `[msg.payload]` as a JSON expression. This will insert the `msg.payload` containing the customer (data received by the insert form) into the database.

!["Screenshot displaying change node setting payload containing data that needs to be inserted in the database."](./images/using-mongodb-with-node-red-change-node-to-insert-data.png "Screenshot displaying change node setting payload containing data that needs to be inserted in the database."){data-zoomable}

5. Click on the MongoDB4 node that we have added while configuring the MongoDB4 node.
6. Select the connection which we have added, and enter the collection name as “customers”. The collection will be created if it does not exist already in your MongoDB database.
7. Set the operation as “insertOne” and keep the other things unchanged.

!["Screenshot displaying configuration of MongoDB 4 node for inserting data"](./images/using-mongodb-with-node-red-mongodb-insertone-node-configuration.png "Screenshot displaying configuration of MongoDB 4 node for inserting data"){data-zoomable}

8. Connect the nodes' wires as shown in the below image.

!["Screenshot displaying connections of wires in the 'Insert Data into Database' flow"](./images/using-mongodb-with-node-red-mongodb-insertone-flow.png "Screenshot displaying connections of wires in the 'Insert Data into Database' flow"){data-zoomable}

### Retrieving Customer Data from Database

1. Drag the inject node onto the canvas. In the inject node, set `msg.payload` as an empty object. Additionally, set the inject node to send the payload after a specific interval of time to update the data in the table.
2. Drag the MongoDB4 node onto canvas, make sure you have selected the connection, and enter “find” into the operation input field.

!["Screenshot displaying configuration of MongoDB 4 node for retrieving data"](./images/using-mongodb-with-node-red-mongodb-find-node-configuration.png "Screenshot displaying configuration of MongoDB 4 node for retrieving data"){data-zoomable}

3. Drag the ui-table widget onto the canvas, create a new ui-group for it, and set max rows according to your preference.

!["Screenshot displaying ui-table widget configuration"](./images/using-mongodb-with-node-red-table-widget.png "Screenshot displaying ui-table widget configuration"){data-zoomable}

4. Connect the nodes' wires as shown in the below image.

!["Screenshot displaying connections of wires in the 'Retrive Data from Database' flow"](./images/using-mongodb-with-node-red-mongodb-find-flow.png "Annotomy of MongoDB document"){data-zoomable}

### Updating Customer Data to Database

1. Drag the ui-form widget onto the canvas, create a new ui-group for it, and add form elements for "id" and "status".

!["Screenshot displaying form widget configuration to update data in MongoDB"](./images/using-mongodb-with-node-red-insert-data-form.png "Screenshot displaying form widget configuration to update data in MongoDB"){data-zoomable}

2. Drag the change node onto the canvas. In the change node, set `msg.payload` as the following JSON object:

Note:- *Please note that the comments provided are for explanation purposes only and should not be copied along with the code*

```yml
[
    // Specifying the criteria to identify the document to update, based on its _id field
 { "_id": msg.payload._id },
    // Setting the "status" field of the identified document to the new value received from msg.payload.status
 { "$set": { "status": msg.payload.status } }
]
```

!["Screenshot displaying the change node setting payload as an array containing a query and operation to perform an update operation in the database"](./images/using-mongodb-with-node-red-change-node-to-update-data.png "Screenshot displaying the change node setting payload as an array containing a query and operation to perform an update operation in the database"){data-zoomable}

3. Drag the MongoDB4 node onto canvas, make sure to select the connection, and enter “updateOne” into the operation input field.

!["Screenshot displaying configuration of MongoDB 4 node for updating data"](./images/using-mongodb-with-node-red-mongodb-update-node-configuration.png "Screenshot displaying configuration of MongoDB 4 node for updating data"){data-zoomable}

4. Connect the nodes' wires as shown in the below image.

!["Screenshot displaying connections of wires in the 'Update Data from Database' flow"](./images/using-mongodb-with-node-red-mongodb-updateone-flow.png "Screenshot displaying connections of wires in the 'Update Data from Database' flow"){data-zoomable}

### Deleting Customer Data to Database

1. Drag the ui-form widget onto the canvas, create a new ui-group for it, and add form elements for id and name.

!["Screenshot displaying form widget configuration to delete data in MongoDB"](./images/using-mongodb-with-node-red-delete-data-form.png "Screenshot displaying form widget configuration to delete data in MongoDB"){data-zoomable}

2. Drag the change node onto the canvas. In the change node, set `msg.payload` as the following JSON object:

```yaml
[
    // Specify the criteria to identify the document to delete, based on its _id field and firstname
 {
        "_id": msg.payload._id,         // Document ID to identify the document to delete
        "firstname": msg.payload.firstname // Additional criteria (e.g., firstname) to narrow down the deletion operation for accuracy
 },
    // Perform the delete operation
 {
        "$delete": "" // Indicates the delete operation to be performed
 }
]
```

!["Screenshot displaying the change node setting payload as an array containing a query and operation to perform an delete operation in the database"](./images/using-mongodb-with-node-red-change-node-to-delete-data.png "Screenshot displaying the change node setting payload as an array containing a query and operation to perform an delete operation in the database"){data-zoomable}

3. Drag the MongoDB4 node onto canvas, make sure to select the connection, and enter “deleteOne” into the operation input field.

!["Screenshot displaying configuration of MongoDB 4 node for deleting data"](./images/using-mongodb-with-node-red-mongodb-update-node-configuration.png "Screenshot displaying configuration of MongoDB 4 node for deleting data"){data-zoomable}

4. Connect the nodes' wires as shown in the below image.

!["Screenshot displaying connections of wires in the 'Delete Data from Database' flow"](./images/using-mongodb-with-node-red-mongodb-updateone-flow.png "Screenshot displaying connections of wires in the 'Delete Data from Database' flow"){data-zoomable}

### Dropping the collection 

1. Drag the inject node onto canvas, and set msg.payload as an empty object.
2. Drag the MongoDB4 node onto canvas, make sure you have selected the added connection, Enter the collection name that you want to drop from the database, and enter “drop” into the operation input field.

!["Screenshot displaying configuration of MongoDB4 node for droping collection from database"](./images/using-mongodb-with-node-red-mongodb-drop-node-configuration.png "Screenshot displaying configuration of MongoDB4 node for droping collection from database"){data-zoomable}

3. Connect the nodes' wires as shown in the below image.

!["Screenshot displaying connections of wires in the 'Drop collecton from Database' flow"](./images/using-mongodb-with-node-red-mongodb-drop-flow.png "Screenshot displaying connections of wires in the 'Drop collecton from Database' flow"){data-zoomable}

## Debugging MongoDB Operations

To debug MongoDB operations in Node-RED, simply add a debug node after the MongoDB4 node. This enables you to monitor the execution of operations and diagnose any errors that may occur. Below are example debug messages indicating successful operations for each operation we have covered in this documentation.

### Example Debug Messages

```js
// Message received after insert operation successful
{
    "acknowledged": true,
    "insertedId": "BKoIzMuW" // ID of inserted data
}

// Message received after update operation successful
{
    "acknowledged": true,
    "modifiedCount": 1, // Indicates that one document is updated
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1 // Indicates one document is matched for the provided query
}

// Message received after delete operation successful
{
    "acknowledged": true,
    "deletedCount": 1 // Indicates that one document is deleted
}

// To indicate collection is dropped successfully and true value will be returned
```

### Deploying the flow

!["Screenshot displaying flow of CRM System"](./images/using-mongodb-with-node-red-crm-system-node-red-flow.png "Screenshot displaying flow of CRM System"){data-zoomable}

1. With your flow updated to include the above, click the "Deploy" button in the top-right of the Node-RED Editor.
2. Locate the 'Open Dashboard' button at the top-right corner of the Dashboard 2.0 sidebar and click on it to navigate to the dashboard.

Now To drop tables, and retrieve table data, click on the 'Inject Node' button. For customer data insertion, updates, and deletions, navigate to fill in the corresponding forms and submit.

!["Screenshot displaying dashboard view of CRM System"](./images/using-mongodb-with-node-red-crm-system-node-red-dashboard-view.png "Screenshot displaying dashboard view of CRM System"){data-zoomable}

<div style="border: 2px solid #7fb7df; padding: 20px; border-radius: 10px; margin-top: 40px; background-color: #f5faff;">

### Try FlowFuse's Built-In Database Service

[FlowFuse now includes a fully integrated database service that makes connecting and querying your data effortless](/blog/2025/08/getting-started-with-flowfuse-tables/). With the FlowFuse Query Node, you do not need to configure the connection manually—the node sets itself up automatically.

Even better, the [FlowFuse AI Assistant allows you to query your tables using natural language](/blog/2025/09/ai-assistant-flowfuse-tables/). Simply type your request, and it will generate the correct SQL for you based on your table.

Deploy, manage, scale, and secure your Node-RED applications with FlowFuse, and take full control of your industrial workflows and data.

[**Start with FlowFuse today**](https://app.flowfuse.com/) 

</div>
