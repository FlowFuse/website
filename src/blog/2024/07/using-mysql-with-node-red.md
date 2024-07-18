---
title: Using MySQL with Node-RED
subtitle: 
description: 
date: 2024-07-17
authors: ["sumit-shinde"]
image: 
tags:
   - post
   - node-red
   - mysql
---

When discussing popular and widely used databases, MySQL inevitably stands out. This is particularly evident within the Node-RED community, where the MySQL contrib node boasts the highest number of downloads among all database contrib nodes. However, popularity often brings challenges. To ensure our Node-RED community members avoid common pitfalls, we've prepared this comprehensive guide. It covers all aspects of using MySQL with Node-RED, including operational insights, security practices, and addressing the reasons behind its widespread adoption.

## What is MySQL 

MySQL is an open-source relational database management system (RDBMS) developed by MySQL AB, which was later acquired by Sun Microsystems and then Oracle Corporation. It uses SQL (Structured Query Language) for querying and managing databases. MySQL is widely recognized for its performance, scalability, and ease of use.

## MySQL Vs PostgreSQL 

| Feature                      | PostgreSQL                                             | MySQL                                                 |
|------------------------------|--------------------------------------------------------|-------------------------------------------------------|
| **ACID Compliance**          | Ensures all changes to data are reliable and consistent, even during unexpected events like system crashes. | Ensures data integrity but requires InnoDB or NDB Cluster for full ACID compliance. |
| **Concurrency Control**      | Handles multiple users updating data simultaneously without conflicting changes, using MVCC to manage versions of data. | Manages simultaneous data access differently across storage engines like InnoDB and MyISAM. |
| **Indexes**                  | Structures data for quick retrieval; supports various index types like B-tree and hash for efficient queries. | Uses B-tree and R-tree indexes, suitable for different data structures and retrieval needs. |
| **Data Types**               | Supports complex data types like arrays and JSON, useful for applications needing flexible data handling. | Focuses on traditional relational data types (e.g., integers, strings) with less support for complex data structures. |
| **Views**                    | Materialized views store query results, improving performance for complex queries that require frequent data summarization. | Standard views are available for simplifying query execution but lack advanced performance optimization. |
| **Stored Procedures**        | Allows defining custom functions in multiple programming languages, enhancing database functionality beyond SQL queries. | Supports SQL-based procedures for automating tasks like data validation and complex logic execution. |
| **Triggers**                 | Triggers execute actions automatically when specific events occur (e.g., before or after data insertion or updates), enhancing database automation. | Offers triggers to automate tasks based on events, though functionality varies by storage engine and configuration. |

## Choosing Between PostgreSQL and MySQL

Deciding between PostgreSQL and MySQL depends on what your project needs and what each database system does best. PostgreSQL is ideal for big projects that need complex data handling, strong data reliability, and often update data. It works well in environments where keeping data consistent is crucial. PostgreSQL's advanced features like materialized views and support for writing procedures in different languages beyond SQL make it great for managing sophisticated data needs.

On the other hand, MySQL is excellent for projects that prioritize fast reading of data and are easy to set up and use. It's commonly used for smaller projects, quick prototypes, or applications where quick deployment is key. MySQL offers flexibility with different storage options—like InnoDB for transactions and MyISAM for handling lots of reads at once—making it versatile depending on your workload.

Knowing what performance your project needs, how familiar your team is with each database, and how much your project might grow will help you pick the database that's best for you.

## Using MySQL with Node-RED

In this section of the article, we will cover how you can configure MySQL with Node-RED, create and delete tables, and perform essential operations such as inserting, retrieving, updating, and deleting data. These operations are crucial for any application.

Additionally for demostration purpost article using the simple weather data example so make sure you update the sql queries according to your data and application need. also throught the article we have used the inject nodes for ease to set the example data and trigger but instead you could utilize the Node-RED Dashboard 2.0 to grab the data from user and trigger it. 

### Prequsite

Before proceeding further, ensure the following:

- A running MySQL database instance, whether hosted in the cloud or locally, and connection details are ready.
- The MySQL custom node [node-red-contrib-mysql](https://flows.nodered.org/node/node-red-node-mysql) installed in your Node-RED environment.

### Configuring MySQL Custom Node

1. Drag MySQL node on to the canvas.
2. Double Click on it, Click on to the "+" button located next to "Database" feild.
3. Enter the Environment variables added for Host, Port, User, Password, Database into their corresponding feilds.
4. Keep the Charset to default as it is set to "UTF8" which is widely compatible and supports various languages and characters.
5. Click on add to "Add" to save the configuration.

To check whether your configuration is correct and Node-RED is able to connect, deploy the flow by clicking on the top-right "Deploy" button. If the connection is successful, each MySQL node will show a green dot with "connected" text underneath.

### Creating Table in MySQL Database

1. Drag an Inject node on the canvas.
2. Drag a Template node onto the canvas and set its property to `msg.topic`. 
3. Insert the following SQL into the Template node:

```sql
-- Create a table to store weather data if it doesn't already exist
CREATE TABLE IF NOT EXISTS weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,     -- Primary key with auto-increment
    location VARCHAR(100) NOT NULL,        -- Location name, cannot be null
    date DATETIME NOT NULL,                -- Date and time of the recorded data, cannot be null
    tem DECIMAL(5, 2) NOT NULL             -- Temperature with precision 5, scale 2, cannot be null
);
```

3. Connect the output of the Inject node to the input of the Template node and the output of the Template node to the input of the MySQL node.

The MySQL node allows sending queries through the `msg.topic` property. We use the Template node because it enables us to use Mustache syntax, which is useful for setting things dynamically. This flexibility is not crucial when creating or deleting tables but essential for operations like inserts.

### Inserting Data in the MySQL Database Table

1. Drag an Inject node onto the canvas, set `msg.payload` to the data you want to insert.
2. Drag a Template node onto the canvas. Insert the following SQL into it. Note how the Template node dynamically inserts the value of `msg.payload` into the query. If you want to set the date and time using Node-RED, you can similarly set it up as you did for `msg.payload`, currently we are using MySQL function for setting time.

    ```sql
    -- Insert a record into the weather_data table
    INSERT INTO weather_data (location, date, tem)
    VALUES 
        ('New York', CURTIME(), {{payload}});
    ```

3. Drag another MySQL node onto the canvas, ensure that it is using the correct configuration by double clcing on it. While you can use a single MySQL node for all operations, However separating and organizing nodes can aid in better management, understanding, and debugging if issues occur.

4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Retrieving Data from the MySQL Database Table

1. Drag an Inject node onto the canvas. This node will trigger the retrieval process.

1. Drag a Template node onto the canvas. Insert the following SQL query into it to retrieve all records from the `weather_data` table.

    ````sql
    -- Retrieve all records from the weather_data table
    SELECT * FROM weather_data;
    ````

You can modify the query as needed to filter or sort the data. An example SQL query is provided to demonstrate this

    ````sql
    -- Retrieve records where the temperature is greater than 25 and sort by date in descending order
    SELECT * FROM weather_data
    WHERE tem > 25
    ORDER BY date DESC;
    ````

4. Drag a MySQL node onto the canvas.
6. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Updating Data of the MySQL Database Table

1. Drag an Inject node onto the canvas, set `msg.payload` to the data you want to update with.
2. Drag a Template node onto the canvas. Insert the following SQL into it. In this SQL query, we are setting the `id` statically which we are uing to update the data, but you can also dynamically set it just like we did for `tem`. We have utilized the `WHERE` clause here, but there are plenty of other SQL clauses available for more complex operations. For more information Refer to this blog on [SQL Clauses (https://www.educba.com/sql-clauses/)

```sql
UPDATE weather_data
tem = {{payload}}
WHERE id = 3
```

3. Drag a MySQL node onto the canvas.
4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Deleting Data from the MySQL Database Table

1. Drag an Inject node onto the canvas.
2. Drag a Template node onto the canvas.

```sql
DELETE FROM weather_data
WHERE tem < 15
  AND location = "Chicago";
```
3. Drag a MySQL node onto the canvas.
4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Deleting MySQL Database Table

1. Drag an Inject node onto the canvas.
2. Drag a Template node onto the canvas. Insert the following SQL into it:

    ````sql
    -- Drop the weather_data table if it exists
    DROP TABLE IF EXISTS weather_data;
    ````

3. Drag a MySQL node onto the canvas.
4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

## Conclusion

In summary, this guide has equipped you with essential skills for integrating MySQL with Node-RED. You've learned how to set up and manage MySQL nodes, perform crucial database operations, and leverage MySQL's capabilities within Node-RED for efficient data handling and automation.