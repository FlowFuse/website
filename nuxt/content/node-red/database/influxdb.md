---
title: "Using InfluxDB with Node-RED (2026 Updated)"
description: "Node-RED has great support for InfluxDB. In this guide, we'll explain how to get your data flowing into one of the most popular time-series databases."
---

# {{ meta.title }}

InfluxDB is a time series database that is commonly used for storing and analysing IoT data. Node-RED is a visual programming tool that makes it easy to connect different data sources and create flows that automate tasks.

In this documentation, we will show you how to write data to InfluxDB from a Node-RED flow. We will also provide you with a few tips for writing data to InfluxDB effectively.

## Step 1: Install the InfluxDB Node-RED package

The first step is to install the InfluxDB Node-RED package. You can do this by opening the Node-RED editor and clicking on the Manage Palette button. In the search bar, type InfluxDB and select the package called node-red-contrib-influxdb.

## Step 2: Configure the InfluxDB node

Once you have installed the InfluxDB node, you need to configure it. Drag an instance of 'influxdb out' onto your canvas and select 'Add new influxdb'. Follow the steps below to configure your connection.

- Version: The version of InfluxDB you are using (we're using 2.0).
- URL: The URL of your InfluxDB server.
- Token: Your token to access your InfluxDB database.

![configuring the influxdb node step 1](/node-red-media/database/images/config-connection.png "configuring the influxdb node step 1")

We can now configure the database.

- Organization name.
- Bucket (database) name.
- Measurement (table) name.

![configuring the influxdb node step 2](/node-red-media/database/images/config-database.png "configuring the influxdb node step 2")

## Step 3: Create a data point

A data point is a single piece of data that is written to InfluxDB. A data point consists of a measurement, a set of fields, and a set of tags.

The measurement is the name of the data that you are writing. We've set it in the configuration of the InfluxDB above so we don't need to pass it in with each payload.

The fields are the individual pieces of data that you are writing. The tags are used to categorise the data. 

You can import the flow below into Node-RED to see an example of a payload which will write all the required values to create a data point in InfluxDB:



::render-flow
---
height: 200
flow: "W3siaWQiOiJjYjNiMGVjYzc2MmRiZjkzIiwidHlwZSI6ImluamVjdCIsInoiOiI0NTQyNDgyNDc2YjljNzFkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiW3tcInRpbWVcIjoxNjg4NzE4NTQ2LFwidGVtcGVyYXR1cmVcIjoyNH0se1wiZGV2aWNlXCI6XCJkUUJnWGVXTFJFXCIsXCJkZXZpY2VUeXBlXCI6XCJQaTRcIixcImRldmljZU5hbWVcIjpcImRlbW8tcGktcm9iXCJ9XSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjQ1MCwieSI6NDIwLCJ3aXJlcyI6W1siODcxNjZjMGRhZmRlZWEzMyJdXX0seyJpZCI6Ijg3MTY2YzBkYWZkZWVhMzMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiNDU0MjQ4MjQ3NmI5YzcxZCIsIm5hbWUiOiJkZWJ1ZyAzMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NjAwLCJ5Ijo0MjAsIndpcmVzIjpbXX1d"
---
::



In this example, the time & temperature fields are hard coded, you will need to overwrite the values stored in ```payload[0].time``` & ```payload[0].temperature``` with real data if you were to connect this flow to a real IOT thermometer.

## Step 4: Write the data point to InfluxDB

Once you have created a data point, you can write it to InfluxDB by using the InfluxDB node. 

- Data: The data point that you want to write.
- Options: The configuration options for the InfluxDB node.

This is an example valid payload:

```json
[
    {
        "time": 1688987984,
        "temperature": 24
    },
    {
        "device": "dQBgXeWLRE",
        "deviceType": "Pi4",
        "deviceName": "demo-pi-rob"
    }
]
```

You can import a demo, including the demo payload flow using the code below:


::render-flow
---
height: 200
flow: "W3siaWQiOiJlY2JiMDJmYWNlMzBjYmNkIiwidHlwZSI6ImluZmx1eGRiIG91dCIsInoiOiI0NTQyNDgyNDc2YjljNzFkIiwiaW5mbHV4ZGIiOiIxYzFhNWVkZWY0MTcxNmUzIiwibmFtZSI6IkluZmx1eERCIiwibWVhc3VyZW1lbnQiOiJ0ZW1wZXJhdHVyZSIsInByZWNpc2lvbiI6IiIsInJldGVudGlvblBvbGljeSI6IiIsImRhdGFiYXNlIjoiZGF0YWJhc2UiLCJwcmVjaXNpb25WMThGbHV4VjIwIjoicyIsInJldGVudGlvblBvbGljeVYxOEZsdXgiOiIiLCJvcmciOiJvcmdhbml6YXRpb24iLCJidWNrZXQiOiJteV9kYXRhIiwieCI6MzYwLCJ5IjoyMjAsIndpcmVzIjpbXX0seyJpZCI6ImRlODNjMmI0OWJhMjQ5ZmQiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjQ1NDI0ODI0NzZiOWM3MWQiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJtZWFzdXJlbWVudCIsInYiOiJ0ZW1wZXJhdHVyZSIsInZ0Ijoic3RyIn0seyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiW3tcInRpbWVcIjoxNjg4OTg3OTg0LFwidGVtcGVyYXR1cmVcIjoyNH0se1wiZGV2aWNlXCI6XCJkUUJnWGVXTFJFXCIsXCJkZXZpY2VUeXBlXCI6XCJQaTRcIixcImRldmljZU5hbWVcIjpcImRlbW8tcGktcm9iXCJ9XSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjE5MCwieSI6MTYwLCJ3aXJlcyI6W1siYWFkNjM1M2YyZjAwMzMzZSIsImVjYmIwMmZhY2UzMGNiY2QiXV19LHsiaWQiOiJhYWQ2MzUzZjJmMDAzMzNlIiwidHlwZSI6ImRlYnVnIiwieiI6IjQ1NDI0ODI0NzZiOWM3MWQiLCJuYW1lIjoiZGVidWcgMzEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjM2MCwieSI6MTYwLCJ3aXJlcyI6W119LHsiaWQiOiIxYzFhNWVkZWY0MTcxNmUzIiwidHlwZSI6ImluZmx1eGRiIiwiaG9zdG5hbWUiOiIxMjcuMC4wLjEiLCJwb3J0IjoiODA4NiIsInByb3RvY29sIjoiaHR0cCIsImRhdGFiYXNlIjoibXlfZGF0YSIsIm5hbWUiOiIiLCJ1c2V0bHMiOmZhbHNlLCJ0bHMiOiIiLCJpbmZsdXhkYlZlcnNpb24iOiIyLjAiLCJ1cmwiOiJodHRwczovL2xvY2FsaG9zdCIsInJlamVjdFVuYXV0aG9yaXplZCI6dHJ1ZX1d"
---
::



Bear in mind that you will need to edit the server and database details in your influxdb node for this demo to work.

## Step 5: Test your flow

You should now be ready to test your flow is writing data to InfluxDB correctly. There is no output in Node-RED to confirm you data was written, so you will need to check directly on InfluxDB.

![Checking the data has arrived in InfluxDB](/node-red-media/database/images/data_in_influx.gif "Checking the data has arrived in InfluxDB")

Great, our data has arrived correctly and is ready to be used.

## 5 Tips for writing data to Node-RED from InfluxDB effectively

1. Choose the correct InfluxDB node. There are two InfluxDB nodes available in Node-RED: the 'influxdb out' node and the 'influx batch' node. The influxdb out node writes data to InfluxDB one point at a time, while the influx batch node writes data to InfluxDB in batches. The best node to use depends on the amount of data you are writing and the performance requirements of your application. If you are just getting started with InfluxDB, we suggest starting with influxdb out.
1. Set the correct measurement name. The measurement name is the name of the table in InfluxDB where the data will be stored. It is important to choose a meaningful measurement name that will help you to easily identify the data later. 
1. Set the correct tags and fields. Tags are used to identify the data points, while fields are used to store the actual data values. It is important to set the correct tags and fields for your data so that you can easily query and analyse it later.
1. Set the correct timestamp. The timestamp is the time at which the data point was recorded. It is important to set the correct timestamp so that you can track the evolution of your data over time.
1. Use the correct precision. The precision is the number of decimal places that are stored for each data value. It is important to use the correct precision so that your data is easy to use.