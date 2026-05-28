---
title: "Using MySQL with Node-RED (2026 Updated)"
description: "Learn how to seamlessly integrate MySQL with Node-RED for efficient data management and application development."
---

# {{ meta.title }}

When discussing popular and widely used databases, MySQL inevitably stands out. This is especially evident within the Node-RED community, where the MySQL contrib node has the highest number of downloads among all database contrib nodes. However, popularity often brings its own set of challenges. We've prepared this comprehensive guide to help our Node-RED community members navigate these challenges. It covers all aspects of using MySQL with Node-RED, including an overview of what MySQL is, the differences between PostgreSQL and MySQL, when to choose one over the other, essential MySQL operations, and more.

## What is MySQL 

[MySQL](https://dev.mysql.com/doc/) is an open-source relational database management system (RDBMS) developed by MySQL AB, which Sun Microsystems later acquired and then Oracle Corporation. It uses SQL (Structured Query Language) to query and manage databases. MySQL is widely recognized for its performance, scalability, and ease of use.

## MySQL vs PostgreSQL 

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

Deciding between [PostgreSQL](/node-red/database/postgresql/) and MySQL depends on your project's needs and what each database system does best. PostgreSQL is ideal for big projects requiring complex data handling, reliability, and often updated data. It works well in environments where keeping data consistent is crucial. PostgreSQL's advanced features, like materialized views and support for writing procedures in different languages beyond SQL make it great for managing sophisticated data needs.

On the other hand, MySQL is excellent for projects that prioritize fast data reading and are easy to set up and use. It's commonly used for smaller projects, quick prototypes, or applications where quick deployment is critical. MySQL offers flexibility with different storage options—like InnoDB for transactions and MyISAM for handling lots of reads simultaneously—making it versatile depending on your workload.

Knowing what performance your project needs, how familiar your team is with each database, and how much your project might grow will help you pick the database that's best for you.

## Using MySQL with Node-RED

This section of the article will cover how to configure MySQL with Node-RED, create and delete tables, and perform essential operations such as inserting, retrieving, updating, and deleting data. These operations are crucial for any application.

Additionally, for the demonstration purpose, the article uses a simple weather data example, so make sure you update the SQL queries according to your data and application needs. Also, through the article, we have used the inject nodes for ease to set the example data and trigger, but instead, you could utilize the Node-RED Dashboard 2.0 to grab the data from the user and trigger it.

### Prerequisite

Before proceeding further, ensure the following:

- A running MySQL database instance, whether hosted in the cloud or locally, along with connection details, should be ready, and environment variables for those connection details should be added. For more information on how to add environment variables, refer to [Using Environment Variables in Node-RED](https://flowfuse.com/blog/2023/01/environment-variables-in-node-red/).
- The MySQL custom node [node-red-contrib-mysql](https://flows.nodered.org/node/node-red-node-mysql) is installed in your Node-RED environment.

### Configuring MySQL Custom Node

1. Drag the MySQL node onto the canvas.
2. Double-click on it, then Click on the "+" button located next to the "Database" field.
3. Enter the Environment variables added for Host, Port, User, Password, and Database into their corresponding fields.
4. Keep the Charset to default as it is set to "UTF8" which is widely compatible and supports various languages and characters.
5. Click on "Add" to save the configuration.

!["Screenshot of MySQL node property dialog with the environment variables added"](/node-red-media/database/images/mysql-node-config.png "Screenshot of MySQL node property dialog with the environment variables added")

To check whether your configuration is correct and Node-RED can connect, deploy the flow by clicking on the top-right "Deploy" button. If the connection is successful, each MySQL node will show a green dot with "connected" text underneath.

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

The MySQL node allows sending queries through the `msg.topic` property. We use the Template node because it enables us to use Mustache syntax, which is useful for setting things dynamically. This flexibility is not crucial when creating or deleting tables but is essential for operations like inserts.

### Inserting Data in the MySQL Database Table

1. Drag an Inject node onto the canvas, and set `msg.payload` to the data you want to insert.
2. Drag a Template node onto the canvas. Insert the following SQL into it. Note how the Template node dynamically inserts the value of `msg.payload` into the query. If you want to set the date and time using Node-RED, you can similarly set it up as you did for `msg.payload`, currently, we are using the MySQL function for setting time.

```sql
-- Insert a record into the weather_data table
INSERT INTO weather_data (location, date, tem)
VALUES 
-- Insert the location as 'New York'
('New York', 
-- Insert the current time as the date
CURTIME(), 
-- Insert the temperature value from the payload
{{payload}});
```

3. Drag another MySQL node onto the canvas, and ensure that it is using the correct configuration by double-clicking on it. While you can use a single MySQL node for all operations, However separating and organizing nodes can aid in better management, understanding, and debugging if issues occur.

4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Retrieving Data from the MySQL Database Table

1. Drag an Inject node onto the canvas. This node will trigger the retrieval process.

1. Drag a Template node onto the canvas. Insert the following SQL query into it to retrieve all records from the `weather_data` table.

````sql
   -- Retrieve all records from the weather_data table
SELECT * 
    -- Select all columns from the table
FROM weather_data;
    -- Specify the table from which to retrieve the records
````

You can modify the query as needed to filter or sort the data. An example SQL query is provided to demonstrate this

```sql
   -- Retrieve records where the temperature is greater than 25 and sort by date in descending order
SELECT * 
    -- Select all columns from the table
FROM weather_data
    -- Specify the table from which to retrieve the records
WHERE tem > 25
    -- Filter records to include only those where the temperature is greater than 25
ORDER BY date DESC;
    -- Sort the results by date in descending order (most recent first)
```

4. Drag a MySQL node onto the canvas.
6. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Updating Data of the MySQL Database Table

1. Drag an Inject node onto the canvas and set the message.payload to the data you want to update
2. Drag a Template node onto the canvas. Insert the following SQL into it. In this SQL query, we are setting the `id` statically, which we are using to update the data, but you can also dynamically set it just like we did for `tem`. We have utilized the `WHERE` clause here, but there are plenty of other SQL clauses available for more complex operations. For more information, refer to this blog on [SQL Clauses (https://www.educba.com/sql-clauses/)

```sql
-- Update the temperature for a specific record in the weather_data table
UPDATE weather_data
    -- Specify the table to update
SET tem = {{payload}}
    -- Set the temperature value to the value from the payload
WHERE id = 3;
    -- Update only the record where the id is 3
```

3. Drag a MySQL node onto the canvas.
4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Deleting Data from the MySQL Database Table

1. Drag an Inject node onto the canvas.
2. Drag a Template node onto the canvas.

```sql
DELETE FROM weather_data
    -- Specify the table from which to delete records
WHERE tem < 15
    -- Filter records to include only those where the temperature is less than 15
AND location = 'New York';
    -- Further filter records to include only those where the location is New York
```

3. Drag a MySQL node onto the canvas.
4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

### Deleting MySQL Database Table

1. Drag an Inject node onto the canvas.
2. Drag a Template node onto the canvas. Insert the following SQL into it:

```sql
  -- Drop the weather_data table if it exists
DROP TABLE IF EXISTS weather_data;
    -- Remove the table named weather_data from the database if it already exists
```

3. Drag a MySQL node onto the canvas.
4. Connect the output of the Inject node to the input of the Template node, and connect the output of the Template node to the input of the MySQL node.

Below is the complete flow covering all the operations discussed throughout this blog.



::render-flow
---
height: 200
flow: "W3siaWQiOiIwMWFlZWM4NzY5MjQzNjkzIiwidHlwZSI6Im15c3FsIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJteWRiIjoiYmNlZWQxZTU0NjA2Yjg3MiIsIm5hbWUiOiJNeVNRTCIsIngiOjk4MCwieSI6MTY2MCwid2lyZXMiOltbImU5YWU3ZjBhM2ZkYmZiYzUiXV19LHsiaWQiOiJlOWFlN2YwYTNmZGJmYmM1IiwidHlwZSI6ImRlYnVnIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTE2MCwieSI6MTY2MCwid2lyZXMiOltdfSx7ImlkIjoiZmFmMjI5YzM4ZDY3NWIyYiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTllNTY4MzU4NWRlYjkxZSIsIm5hbWUiOiJDcmVhdGUgdGhlIHRhYmxlIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6IiIsInRvcGljIjoiIiwieCI6NjAwLCJ5IjoxNjYwLCJ3aXJlcyI6W1siYjQwN2RiYjE5MDE3NDliZiJdXX0seyJpZCI6ImI0MDdkYmIxOTAxNzQ5YmYiLCJ0eXBlIjoidGVtcGxhdGUiLCJ6IjoiYTllNTY4MzU4NWRlYjkxZSIsIm5hbWUiOiIiLCJmaWVsZCI6InRvcGljIiwiZmllbGRUeXBlIjoibXNnIiwiZm9ybWF0IjoiaGFuZGxlYmFycyIsInN5bnRheCI6Im11c3RhY2hlIiwidGVtcGxhdGUiOiJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyB3ZWF0aGVyX2RhdGEgKFxuIGlkIElOVCBBVVRPX0lOQ1JFTUVOVCBQUklNQVJZIEtFWSxcbiBsb2NhdGlvbiBWQVJDSEFSKDEwMCkgTk9UIE5VTEwsXG4gZGF0ZSBEQVRFVElNRSBOT1QgTlVMTCxcbiB0ZW0gREVDSU1BTCg1LCAyKSBOT1QgTlVMTFxuKTtcbiIsIm91dHB1dCI6InN0ciIsIngiOjgyMCwieSI6MTY2MCwid2lyZXMiOltbIjAxYWVlYzg3NjkyNDM2OTMiXV19LHsiaWQiOiJjZmMyNjUwM2YwODEyYTg4IiwidHlwZSI6Im15c3FsIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJteWRiIjoiYmNlZWQxZTU0NjA2Yjg3MiIsIm5hbWUiOiJNeVNRTCIsIngiOjk4MCwieSI6MTc2MCwid2lyZXMiOltbIjIzNmQ0MGIxZWRiOTIwZDIiXV19LHsiaWQiOiIyMzZkNDBiMWVkYjkyMGQyIiwidHlwZSI6ImRlYnVnIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiZGVidWcgMiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTE2MCwieSI6MTc2MCwid2lyZXMiOltdfSx7ImlkIjoiMjU3OTBlN2EzYWVmMjJiZiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTllNTY4MzU4NWRlYjkxZSIsIm5hbWUiOiJJbnNlcnQgdGhlIGRhdGEgaW50byB0aGUgdGFibGUiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjoiIiwidG9waWMiOiIiLCJwYXlsb2FkIjoiJHJhbmRvbSgpICogMTAwIiwicGF5bG9hZFR5cGUiOiJqc29uYXRhIiwieCI6NTYwLCJ5IjoxNzYwLCJ3aXJlcyI6W1siN2E3OThiMzUzOWRhOTU0NyJdXX0seyJpZCI6IjdhNzk4YjM1MzlkYTk1NDciLCJ0eXBlIjoidGVtcGxhdGUiLCJ6IjoiYTllNTY4MzU4NWRlYjkxZSIsIm5hbWUiOiIiLCJmaWVsZCI6InRvcGljIiwiZmllbGRUeXBlIjoibXNnIiwiZm9ybWF0IjoiaGFuZGxlYmFycyIsInN5bnRheCI6Im11c3RhY2hlIiwidGVtcGxhdGUiOiJJTlNFUlQgSU5UTyB3ZWF0aGVyX2RhdGEgKGxvY2F0aW9uLCBkYXRlLCB0ZW0pXG5WQUxVRVMgKCdOZXcgWW9yaycsIENVUlRJTUUoKSwge3sgcGF5bG9hZCB9fSk7Iiwib3V0cHV0Ijoic3RyIiwieCI6ODIwLCJ5IjoxNzYwLCJ3aXJlcyI6W1siY2ZjMjY1MDNmMDgxMmE4OCJdXX0seyJpZCI6IjBiYmI0ZDE3ZGVmZTMwNjciLCJ0eXBlIjoibXlzcWwiLCJ6IjoiYTllNTY4MzU4NWRlYjkxZSIsIm15ZGIiOiJiY2VlZDFlNTQ2MDZiODcyIiwibmFtZSI6Ik15U1FMIiwieCI6OTgwLCJ5IjoxODYwLCJ3aXJlcyI6W1siZWYyZGU4Y2IwNjczZGU0NyJdXX0seyJpZCI6ImVmMmRlOGNiMDY3M2RlNDciLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTllNTY4MzU4NWRlYjkxZSIsIm5hbWUiOiJkZWJ1ZyAzIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxMTgwLCJ5IjoxODYwLCJ3aXJlcyI6W119LHsiaWQiOiIwMjdjMmMzODAxYmY3MWEzIiwidHlwZSI6ImluamVjdCIsInoiOiJhOWU1NjgzNTg1ZGViOTFlIiwibmFtZSI6IlJldHJpZXZlIGRhdGEgZnJvbSB0YWJsZSIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOiIiLCJ0b3BpYyI6IiIsIngiOjU4MCwieSI6MTg2MCwid2lyZXMiOltbIjA3OTAzMTA0NjE1NmI2YTAiXV19LHsiaWQiOiIwNzkwMzEwNDYxNTZiNmEwIiwidHlwZSI6InRlbXBsYXRlIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiIiwiZmllbGQiOiJ0b3BpYyIsImZpZWxkVHlwZSI6Im1zZyIsImZvcm1hdCI6ImhhbmRsZWJhcnMiLCJzeW50YXgiOiJtdXN0YWNoZSIsInRlbXBsYXRlIjoiU0VMRUNUICogRlJPTSB3ZWF0aGVyX2RhdGE7XG4iLCJvdXRwdXQiOiJzdHIiLCJ4Ijo4MjAsInkiOjE4NjAsIndpcmVzIjpbWyIwYmJiNGQxN2RlZmUzMDY3Il1dfSx7ImlkIjoiZWIzODUzMmRlNzMyMTNjZiIsInR5cGUiOiJteXNxbCIsInoiOiJhOWU1NjgzNTg1ZGViOTFlIiwibXlkYiI6ImJjZWVkMWU1NDYwNmI4NzIiLCJuYW1lIjoiTXlTUUwiLCJ4Ijo5ODAsInkiOjIwODAsIndpcmVzIjpbWyIyODE4MzhkNjg3Y2VhMTcyIl1dfSx7ImlkIjoiMjgxODM4ZDY4N2NlYTE3MiIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhOWU1NjgzNTg1ZGViOTFlIiwibmFtZSI6ImRlYnVnIDQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjExODAsInkiOjIwODAsIndpcmVzIjpbXX0seyJpZCI6ImQ0ZGZiYmFjNjM1ZThhM2YiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiRHJvcCB0aGUgdGFibGUgaWYgaXQgZXhpc3QiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjoiIiwidG9waWMiOiIiLCJ4Ijo1ODAsInkiOjIwODAsIndpcmVzIjpbWyI0NDQyYWQwYmJjNTBhMjU2Il1dfSx7ImlkIjoiNDQ0MmFkMGJiYzUwYTI1NiIsInR5cGUiOiJ0ZW1wbGF0ZSIsInoiOiJhOWU1NjgzNTg1ZGViOTFlIiwibmFtZSI6IiIsImZpZWxkIjoidG9waWMiLCJmaWVsZFR5cGUiOiJtc2ciLCJmb3JtYXQiOiJoYW5kbGViYXJzIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IkRST1AgVEFCTEUgSUYgRVhJU1RTIHdlYXRoZXJfZGF0YTtcbiIsIm91dHB1dCI6InN0ciIsIngiOjgyMCwieSI6MjA4MCwid2lyZXMiOltbImViMzg1MzJkZTczMjEzY2YiXV19LHsiaWQiOiI2NjhlZDIwMjE3MDRjNTQzIiwidHlwZSI6Im15c3FsIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJteWRiIjoiYmNlZWQxZTU0NjA2Yjg3MiIsIm5hbWUiOiJNeVNRTCIsIngiOjk4MCwieSI6MTk0MCwid2lyZXMiOltbIjY2NjE1MmUzMzYyYTI1ZDUiXV19LHsiaWQiOiI2NjYxNTJlMzM2MmEyNWQ1IiwidHlwZSI6ImRlYnVnIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiZGVidWcgNSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTE4MCwieSI6MTk0MCwid2lyZXMiOltdfSx7ImlkIjoiZmJjYmFkODAzOWQwNWU4ZSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTllNTY4MzU4NWRlYjkxZSIsIm5hbWUiOiJEZWxldGUgZGF0YSBmcm9tIHRoZSB0YWJsZSIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOiIiLCJ0b3BpYyI6IiIsIngiOjU3MCwieSI6MTk0MCwid2lyZXMiOltbImFhOTI5NzA2ZWQ4MTM4OTIiXV19LHsiaWQiOiJhYTkyOTcwNmVkODEzODkyIiwidHlwZSI6InRlbXBsYXRlIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiIiwiZmllbGQiOiJ0b3BpYyIsImZpZWxkVHlwZSI6Im1zZyIsImZvcm1hdCI6ImhhbmRsZWJhcnMiLCJzeW50YXgiOiJtdXN0YWNoZSIsInRlbXBsYXRlIjoiREVMRVRFIEZST00gd2VhdGhlcl9kYXRhXG5XSEVSRSB0ZW0gPiAxNVxuQU5EIGxvY2F0aW9uID0gJ05ldyBZb3JrJzsiLCJvdXRwdXQiOiJzdHIiLCJ4Ijo4MjAsInkiOjE5NDAsIndpcmVzIjpbWyI2NjhlZDIwMjE3MDRjNTQzIl1dfSx7ImlkIjoiOWMyYmVmY2E0NjRkYjY2MCIsInR5cGUiOiJteXNxbCIsInoiOiJhOWU1NjgzNTg1ZGViOTFlIiwibXlkYiI6ImJjZWVkMWU1NDYwNmI4NzIiLCJuYW1lIjoiTXlTUUwiLCJ4Ijo5ODAsInkiOjIwMjAsIndpcmVzIjpbWyJkMjhjYjM0NzJjNWZjMzU3Il1dfSx7ImlkIjoiZDI4Y2IzNDcyYzVmYzM1NyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhOWU1NjgzNTg1ZGViOTFlIiwibmFtZSI6ImRlYnVnIDYiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjExODAsInkiOjIwMjAsIndpcmVzIjpbXX0seyJpZCI6IjQ5Mjk3OTIyYjk3ODRmOGUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiVXBkYXRlIGRhdGEgZnJvbSB0aGUgdGFibGUiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjoiIiwidG9waWMiOiIiLCJwYXlsb2FkIjoiMTAiLCJwYXlsb2FkVHlwZSI6Im51bSIsIngiOjU3MCwieSI6MjAyMCwid2lyZXMiOltbImJiYWU5OGU1NDgyNGIyMjIiXV19LHsiaWQiOiJiYmFlOThlNTQ4MjRiMjIyIiwidHlwZSI6InRlbXBsYXRlIiwieiI6ImE5ZTU2ODM1ODVkZWI5MWUiLCJuYW1lIjoiIiwiZmllbGQiOiJ0b3BpYyIsImZpZWxkVHlwZSI6Im1zZyIsImZvcm1hdCI6ImhhbmRsZWJhcnMiLCJzeW50YXgiOiJtdXN0YWNoZSIsInRlbXBsYXRlIjoiVVBEQVRFIHdlYXRoZXJfZGF0YVxuU0VUIHRlbSA9IHt7cGF5bG9hZH19XG5XSEVSRSBpZCA9IDMiLCJvdXRwdXQiOiJzdHIiLCJ4Ijo4MjAsInkiOjIwMjAsIndpcmVzIjpbWyI5YzJiZWZjYTQ2NGRiNjYwIl1dfSx7ImlkIjoiYmNlZWQxZTU0NjA2Yjg3MiIsInR5cGUiOiJNeVNRTGRhdGFiYXNlIiwibmFtZSI6Ik15c3FsIGNvbmZpZyIsImhvc3QiOiIke0hPU1R9IiwicG9ydCI6IiR7UE9SVH0iLCJkYiI6IiR7REFUQUJBU0V9IiwidHoiOiIrNTozMCIsImNoYXJzZXQiOiJVVEY4In1d"
---
::



### Deploying the Flow 

1. To test the imported flows, you need to deploy them. To do that, click the deploy button at the top right corner.

After deploying the flow, you can test each operation—such as creating, deleting, updating, and executing other queries—by clicking the inject button. For debugging purposes, add debug nodes to the flow. 

Additionally, if you want to explore the integration of other databases with Node-RED, you can refer to our [database section](/node-red/database/) in the Node-RED learning resources, where we cover databases such as PostgreSQL, MongoDB, InfluxDB, DynamoDB, and more.