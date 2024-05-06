---
title: The MIND stack with Node-RED and FlowFuse Dashboard 2.0
subtitle: Our objective is to streamline the deployment of the MIND stack, enhancing its usability without compromising functionality.
description: Our objective is to streamline the deployment of the MIND stack, enhancing its usability without compromising functionality.
date: 2024-05-06
authors: ["harshad-joshi","grey-dziuba"]
image: /blog/2024/05/images/mind-mqtt-influxdb-node-red-dashboard-2-0.png
tags:
    - posts
    - flowfuse
    - mind
    - ming
    - influx
    - dashboards
---

The MIND stack, which includes MQTT, InfluxDB, Node-RED, and Grafana is a popular choice for IoT and IIoT-based applications, but in this article, we are going to leverage Dashboards 2.0 for our visualizations, and instead of MING we are going to call it the MIND stack (MQTT, INfluxDB, Node-RED and Node-RED Dashboard 2.0 by FlowFuse). To demonstrate this, we will design a dashboard to display data collected from a Temperature Sensor that sends Relative Humidity (RH) and Temperature values to an MQTT broker. This application allows users to visualize historical data in Tabular form and view it live using various Dashboard 2.0 objects.

<!--more-->

### Foundation Setup

Our goal is to enable this application primarily on Linux-based platforms while integrating Dashboard 2.0 for enhanced visualization capabilities. This section guides you through setting up the necessary components.

#### InfluxDB OSS (v1.8) Installation:
Start by installing InfluxDB OSS (v1.8). Detailed instructions are available [here](https://docs.influxdata.com/influxdb/v1/introduction/install/).

#### Leveraging FlowFuse Cloud:
We recommend leveraging FlowFuse Cloud for a streamlined experience. FlowFuse Cloud allows users to manage Node-RED instances running on remote devices without the complexity of local installations. Devices connect to FlowFuse Cloud to receive updates and management commands. To begin, create an account on [FlowFuse Cloud](https://app.flowfuse.com/account/create) and choose the services that best meet your needs. This platform is ideal for both first-time users and enterprise owners.

#### Mosquitto Broker Setup:
Mosquitto is our chosen MQTT broker. Follow these [instructions](https://mosquitto.org/download/) to set it up and integrate it into your system.

#### Node Installation via Node-RED's Pallet Manager:
1. Install the [Node-RED Contrib InfluxDB node (v0.7.0)](https://flows.nodered.org/node/node-red-contrib-influxdb) through the pallet manager. This node is crucial for querying and retrieving data using InfluxQL, a querying language supported by InfluxDB that is similar to SQL.
2. Utilize Dashboard 2.0 to visualize MQTT data historically and in real-time. This node simplifies the need for additional dashboard systems and can be started by clicking the "Getting Started" button on the [Dashboard 2.0 page](https://dashboard.flowfuse.com/).

![Dashboard 2.0 website](images/dashboard-20-website.png "Dashboard 2.0 website"){data-zoomable}

#### Configuration and Security:
While the default settings are sufficient for initial setup and testing, it's recommended to apply appropriate  security practices in a production environment. Refer to the provided documentation links for specific security guidelines.

#### Architecture Overview:
The MIND stack can operate on a single machine or scale across multiple cloud platforms. Further details can be obtained from respective service providers.

The subsequent sections will detail system operations and describe how various components—such as temperature and humidity sensors, MQTT topics, and InfluxDB interactions—integrate within our application.

### System Operation and Working Details

This section outlines the operation of our system, detailing the integration of sensors, MQTT brokers, and the use of FlowFuse Dashboard 2.0 for data visualization.

#### Data Collection and Publication:
- **Sensor Integration:** A temperature and humidity sensor publishes data—temperature in degrees Celsius and relative humidity (RH) in percentage—to an MQTT broker.
- **MQTT Subscription:** The system subscribes to topics `flowfuse/temp` and `flowfuse/RH` using the "MQTT in" node provided by FlowFuse, facilitating real-time data acquisition.

#### Data Logging and Visualization:
- **InfluxDB Logging:** A "function node" captures and logs the data into InfluxDB, ensuring that all sensor readings are stored efficiently for historical analysis.
- **Real-time and Historical Data Visualization:** Dashboard 2.0 gadgets are employed to visualize both live and historical data. This allows for interactive engagement with the data streams.

#### Interactive Data Querying:
- **Historical Data Interface:** Users can select start and stop dates and times via a user-friendly interface. The data from this selection is processed using a function that converts it into an InfluxDB-compatible format for querying.
- **Data Aggregation Display:** The system provides options to display maximum, minimum, and total count values for temperature and humidity. This feature enhances the user's ability to interact with the data without requiring direct queries.

#### Application Structure:
Our application architecture is designed to optimize data flow and visualization:
- **Data Collection:** Collect data from the MQTT broker and transform it into a format suitable for logging in InfluxDB.
- **Function Integration:** Utilize Node-RED functions to link dashboard elements with InfluxDB, facilitating dynamic data interaction.
- **Data Visualization:** Employ Dashboard 2.0 to display data according to user-defined parameters, focusing on historical and live data obtained from sensors.

#### Technical Insights:
- **MQTT Topic Formatting:** Topics generally follow the format `topic/subtopic`. We utilize Node-RED's standard "change" node to ensure topics are reformatted into a syntax compatible with InfluxDB.
- **Timestamps and Data Querying:** InfluxDB uses timestamps formatted per RFC3339 UTC. This standard will be crucial when querying historical data, as outlined in subsequent sections.

The main objective of this project is to empower users to fully control their data with minimal prior knowledge of database systems while enjoying the enhanced UI and UX of FlowFuse Dashboard 2.0.

### Development and Design Using the STORE - PROCESS - RETRIEVE - TRANSFORM Method

The application's flow is meticulously organized into four key sections, ensuring a seamless data lifecycle from storage to user interaction.

**1. Data Storage:** Data is ingested from an MQTT broker and transformed into a format compatible with InfluxDB. It is then securely stored on the InfluxDB server. This ensures that all incoming data is efficiently logged and ready for processing.

**2. Data Processing:** This phase involves crafting SQL queries to extract data from InfluxDB. The extracted data is then transformed into a format suitable for visualization. This transformation is critical for fitting the data into the diverse range of widgets available on the dashboard, enhancing both the aesthetic and functional aspects of data interaction.

**3. User Input:** By leveraging Node-RED functions, the application processes user inputs to retrieve specific data sets based on user requirements. This interactive capability allows users to dynamically explore data points and derive insights.

**4. Data Schema:** The database schema is intentionally simplistic, comprising two user-defined fields—Temperature and RH (Relative Humidity)—alongside a Timestamp field automatically managed by InfluxDB. This simplicity facilitates quick data retrieval and ease of management.

**Setting Up the Database:**
   - **Initialization:** Begin by logging into the InfluxDB server with the command `influx`. Then, create a database using the command:
     ```
     create database environment
     ```
   - **Schema Definition:** Utilizing Node-RED, we define a measurement (akin to a table in traditional SQL) named `environment`. This measurement stores data received from the MQTT broker under the fields Temperature and RH. This setup not only organizes the data effectively but also prepares it for real-time and historical analyses.

![InfluxDB Database Setup](images/influxdb-database-ming.png "InfluxDB Database setup"){data-zoomable}

This structured approach to application development ensures that each phase of data handling is optimized for both performance and usability, from the initial data storage to the interactive user queries facilitated by Node-RED functions.

### Utilizing FlowFuse for Application Development

This section outlines the process of setting up and configuring your application within the FlowFuse platform, utilizing Node-RED for streamlined application deployment.

#### FlowFuse Setup:
1. **User Account:**
   - Begin by logging into FlowFuse, if you don't have an account yet, you can [sign up](https://app.flowfuse.com/account/create) for free.

   ![Create User in FlowFuse](images/user-creation-flowfuse.png "Create User in FlowFuse"){data-zoomable}

2. **Team Formation:**
   - Construct a team to manage projects. This team may comprise multiple users, facilitating collaborative development and management.

   ![Create Team in FlowFuse](images/create-team-flowfuse.png "Create Team in FlowFuse"){data-zoomable}

3. **Application Creation:**
   - Create an application within the platform, aptly named "MIND," to represent the integrated technology stack.

   ![FlowFuse Application View](images/flowfuse-application-view.png "FlowFuse Application View"){data-zoomable}

<!-- 4. **Instance Creation:**
   - Create an instance named "MIND" to encapsulate our MQTT, InfluxDB, Node-RED, and Dashboard stack functionalities.

   ![Deploy FlowFuse Application](images/deploy-application-in-flowfuse.png "Deploy FlowFuse Application"){data-zoomable} -->

4. **Deploy Instance to Device:**
   - Next you will need to create a [device and deploy](https://flowfuse.com/docs/device-agent/install/#installing-the-device-agent) called **MIND** to the linux environment in which you have installed InfluxDB.
   - All development will be done on this device.

#### Node Configuration and Flow Importation:
1. **Node Installation:**
   - Install essential nodes, starting with the `node-red-contrib-influxdb` package, which facilitates reading from and writing to InfluxDB.

   ![Pallette Manager in Node-RED Influxdb](images/pallette-manager-node-red-influxdb.png "Pallette Manager in Node-RED Influxdb"){data-zoomable}

   - Continue by installing the FlowFuse Dashboard (`@flowfuse/node-red-dashboard`) from the Palette Manager, enhancing dashboard capabilities.

   ![Pallette Manager in Node-RED Dashboard 2.0](images/pallete-manager-node-red-dashboard-2.png "Pallette Manager in Node-RED Dashboard 2.0"){data-zoomable}

2. **Flow Configuration:**
   - Import the necessary flow from the provided [link](https://gist.github.com/hj91/aebb39fb2787afedd03d6407dfe460a2), configuring the system to correctly read and process MQTT data into the required format for InfluxDB storage.

   ![MIND flow diagram](images/mind-flow-node-red-flowfuse.png "MIND flow diagram"){data-zoomable}

#### Functional Nodes and Data Handling:
1. **MQTT and Change Nodes:**
   - Configure MQTT-in nodes to subscribe to temperature and RH topics.
   - Utilize Change nodes to adapt incoming MQTT topics into a format suitable for further processing.

2. **Data Processing and Visualization:**
   - Set up Join and Textbox nodes to aggregate MQTT messages and display live data values.
   - Implement Function nodes for **temperature** and **RH** to process and display live data on gauges and charts.

   ![Temperature Function Node-RED](images/function-temp-node-red.png "Temperature Function Node-RED"){data-zoomable}
   ![Relative Humidity Function Node-RED](images/relative-humidity-function-node-red.png "Relative Humidity Function Node-RED"){data-zoomable}

3. **Data Writing to InfluxDB:**
   - Define a function to send processed data to InfluxDB, specifying the measurement as "room1" to denote the data's origin location.

   ![Influxdb Function to send data to InfluxDB](images/influxdb-function-node-red.png "Influxdb Function to send data to InfluxDB"){data-zoomable}

4. **Interface Management:**
   - Include Reset buttons to manage chart display, ensuring clarity and effectiveness in visual data representation.

This detailed setup ensures a robust application framework within FlowFuse, leveraging the full capabilities of Node-RED to facilitate efficient data handling and user interaction.

### Reading Data from InfluxDB

#### Historical Data Visualization:

To facilitate the viewing of historical data, we employ a table format that displays values obtained from an InfluxDB query. However, before querying, users are provided with the ability to specify their desired data range through a date and time selection form.

#### User Input for Historical Data:
- **Date and Time Selection Form:** This interface allows users to input Start Date, Start Time, Stop Date, and Stop Time, enabling precise control over the data range for historical queries.

   ![Display Historical data Table](images/dashboard-flow-form-node-red.png "Display Historical data Table"){data-zoomable}
   ![Dashboard 2.0 form for Node-RED](images/dashboard-form-node-red.png "Dashboard 2.0 form for Node-RED"){data-zoomable}

- **Function for Time Data Parsing:** After receiving the user input, a function node processes this information, transforming it into a date-time format compatible with InfluxDB's requirements. This function also adjusts for time zone differences by modifying the [UTC offset](https://en.wikipedia.org/wiki/UTC_offset) appropriately. Users in different time zones should adjust the offset to align with their local time.

   ![Function to configure Start Time and End Time in Node-RED](images/starttime-endtime-function-node-red.png "Function to configure Start Time and End Time in Node-RED"){data-zoomable}


#### Advanced Data Queries:
- **Statistical Data Queries:** Additional functionality allows users to query minimum, maximum, and count statistics for temperature and relative humidity (RH) from the database. This feature is accessible via a dropdown menu, which directs the query parameters to the appropriate function node.
   
   ![Flow for calculating Min, Max, and Count](images/node-red-flow-split-influxdb-function.png "Flow for calculating Min, Max, and Count"){data-zoomable}
   ![Dashboard 2.0 Drop Down Menu](images/dropdown-menu-node-red-dashboard-20.png "Dashboard 2.0 Drop Down Menu"){data-zoomable}
   ![Node-RED switch node example](images/switch-node-example.png "Node-RED switch node example"){data-zoomable}

- **Function Nodes for Queries:** Depending on the selected statistic, the corresponding function node constructs and executes an InfluxQL query to fetch the data. These nodes are designed to handle specific queries like retrieving the minimum or maximum value of temperature or RH.

   ![Influxdb query in function node](images/influxdb-query-node-red.png "Influxdb query in function node"){data-zoomable}

By integrating these functionalities, users can not only retrieve but also interact with historical data efficiently, ensuring they gain meaningful insights from their stored information.


### The Completed Dashboard

The culmination of our efforts is displayed in the fully operational MIND dashboard, implemented within Node-RED and powered by FlowFuse. This interface provides a comprehensive view of both historical and live data, seamlessly integrating MQTT and InfluxDB for robust data interaction.

![MIND dashboard completed in Node-RED](images/complete-mind-dashboard-node-red-flowfuse-ming.png "MIND dashboard completed in Node-RED"){data-zoomable}

### Conclusion

We have successfully designed and deployed a user-friendly graphical interface for interacting with historical and live data using the FlowFuse Dashboard 2.0. Our approach has prioritized simplicity, adhering to default settings to ensure ease of use for beginners. However, the architecture of our solution is designed to accommodate further customization and complexity. We encourage readers to explore the potential of InfluxDB and Dashboard widgets to create even more dynamic and versatile dashboards.

Through this project, we have demonstrated how effectively FlowFuse integrates with MQTT and InfluxDB, offering a streamlined solution for real-time and historical data management. This setup not only enhances operational efficiency but also empowers users to leverage data-driven insights with minimal technical overhead.

