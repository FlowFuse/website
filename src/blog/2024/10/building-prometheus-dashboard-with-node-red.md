---
title: Using Prometheus in Node-RED for monitoring 
subtitle: Visualizing Metrics Effortlessly with Node-RED and Prometheus
description: 
date: 2024-10-03
authors: ["sumit-shinde"]
image:
tags:
   - node-red
   - nodered prometheus 
   - node-red timeseries database
---

Prometheus is a popular tool for monitoring and collecting system metrics, helping you track server performance, resource usage, and application health. It’s widely used in various applications, including IoT, where it can monitor data such as temperature and humidity. By collecting these metrics, you can gain valuable insights into your systems and ensure they run smoothly.
<!--more-->
In this guide, we will learn how to integrate Prometheus with Node-RED for sending and receiving metrics, as well as visualizing them effectively. We’ll cover the basic installation steps, configuration, and provide examples to help you set up your own Prometheus data dashboard in Node-RED.

## What is Prometheus ?

Prometheus is an open-source monitoring tool and time-series database designed to help you gain deep insights into your systems and applications. It collects and stores metrics over time, allowing you to track performance, resource usage, and overall health. With its powerful querying and alerting capabilities, Prometheus enables developers and operations teams to quickly identify and address issues. Its easy-to-use data visualization tools make it an excellent choice for monitoring cloud-native environments and IoT applications, ensuring that your systems operate smoothly and efficiently.

Understanding some common concepts and components of Prometheus will enhance your ability to utilize it effectively. Here are key terms and elements you should be familiar with:

- Metrics: Quantifiable data points collected by Prometheus over time, such as CPU usage, memory consumption, and request counts. Metrics are categorized into two main types: counters (which only increase) and gauges (which can increase or decrease).

- Labels: Key-value pairs attached to metrics that provide additional context and help in filtering and aggregating data. For example, labels can indicate the service name, environment (production, staging), or region.

- Targets: These are endpoints that expose metrics for Prometheus to scrape. Each target can be a service, application, or system that provides metrics in a format compatible with Prometheus, the common and deaful is /metrics.

### Comparing Prometheus and InfluxDB

**Prometheus** and **InfluxDB** are two leading open-source solutions for managing time-series data, each designed for specific use cases. While InfluxDB is widely recognized among IoT professionals, comparing it with Prometheus and InfluxDB can help to understand the prometheus as well and if you are fimilier with influxdb, refer to the [Using influxdb with node-red](/node-red/database/influxdb/):

| **Feature**                   | **Prometheus**                                   | **InfluxDB**                                   |
|-------------------------------|--------------------------------------------------|------------------------------------------------|
| **Purpose**                   | Primarily designed for monitoring and alerting  | Focused on comprehensive time-series data management |
| **Data Model**                | Employs a multi-dimensional model with metric names and key-value pairs (labels) | Organizes data using a time-series model with measurements and tags |
| **Query Language**            | Utilizes PromQL, a powerful and expressive query language for complex time-series queries | Offers InfluxQL, similar to SQL, and Flux for advanced data transformations |
| **Data Collection**           | Operates mainly on a pull-based model, periodically scraping metrics from targets | Supports both push and pull methods, making it versatile for data ingestion |
| **Storage**                   | Uses a local on-disk storage engine optimized for fast querying; not intended for long-term data retention | Features a pluggable storage architecture, allowing for high scalability and various storage backends |
| **Best For**                  | Monitoring applications in cloud-native environments, especially microservices and Kubernetes | IoT applications, financial analytics, and any scenario requiring real-time data processing |
| **Scalability**               | Scalable through sharding and federation, though it may struggle with high cardinality or large data volumes | Highly scalable with built-in clustering and sharding capabilities, accommodating vast amounts of data |

### Installing Prometheus on Your Device or Server

To get started with Prometheus, follow these steps to install it on your device or server:

### Step 1: Download Prometheus

1. Go to the [Prometheus download page](https://prometheus.io/download/). On the server without a GUI, you can utilize `curl` to download the latest version directly from the command line:
   ```bash
   curl -LO https://github.com/prometheus/prometheus/releases/latest/download/prometheus-<version>.linux-amd64.tar.gz
   ```
   Replace `<version>` with the actual version number you want to download.

2. Select the appropriate version for your operating system (Linux, macOS, or Windows).
3. Download the tarball or zip file.

### Step 2: Extract the Downloaded Files
- For Linux or macOS, use the following command to extract the tarball:
  ```bash
  tar xvfz prometheus-*.tar.gz
  ```
- For Windows, right-click on the zip file and choose "Extract All."

### Step 3: Navigate to the Prometheus Directory
Change to the directory where Prometheus was extracted:
```bash
cd prometheus-<version>
```

### Step 4: Configure Prometheus
1. Create a configuration file named `prometheus.yml` in the Prometheus directory. This file defines the scrape configurations and other settings. Here’s a basic example:
   ```yaml
   global:
  scrape_interval: 15s ## update the scrape interval according your preference

  scrape_configs:
  - job_name: 'cpu usage'  # Replace with your custom job name
    static_configs:
      - targets: ['your_node_red_instance_url']  # Replace with your Node-RED instance URL
    metrics_path: "/info"  # Specify the path for the metrics   
   ```

Make sure to replace `your_job_name` and `your_node_red_instance_url` and `metrics_path` with your specific details, avoiding the use of "metrics" as the `metrics_path`, which is commonly default but blocked in FlowFuse platform.

### Step 5: Start Prometheus
Run the following command to start Prometheus:
```bash
./prometheus --config.file=prometheus.yml
```
By default, Prometheus will start on port **9090**. You can access the web interface by navigating to `http://localhost:9090` in your browser.

### Step 6: Verify the Installation
1. Open your web browser and go to `http://localhost:9090`.
2. You should see the Prometheus dashboard, where you can query metrics and view the status of your targets.

## Building Prometheus data dashboard

In this section, we will focus on integrating Node-RED with Prometheus to create a dynamic dashboard for monitoring the CPU performance of a Node-RED instance. In this example, we’ll have two instances: one on the FlowFuse Cloud and another on a local machine where Prometheus is running. You could have second Node-RED instance running elsewhere, but for now, my Prometheus instance is running locally, which can be challenging to query when Node-RED is on a different machine. To avoid this, you can run Prometheus on a server, which will make querying easier in a distributed setup.

The first instance will expose CPU usage metrics, while Prometheus, running locally, will pull this data. The second Node-RED instance will query Prometheus via its API to display the data as charts.

### Prerequisites

Before starting, ensure you have installed the following:

- **node-red-contrib-prometheus-exporter**: This Node-RED node will allow you to expose metrics in a format that Prometheus can scrape.
- **node-red-contrib-cpu** :  This node provides real-time CPU usage metrics, which can be used to monitor the performance of your Node-RED instance running machine

### Exposing Data to Prometheus

1. Drag the **Inject** node onto the canvas. Set the repeat interval to match the duration configured in Prometheus' `prometheus.yml` file to ensure both systems reflect the same data at the same time. 

2. Next, drag the **CPU** node onto the canvas. Double-click it and check the option **"Send a message for overall usage."**

3. Then, drag the **Prometheus Out** node onto the canvas. Double-click it and click the pencil icon to open the configuration tab. In this tab, enter the **Metric Name** (ensure there are no spaces), provide the **Metric Help**, add **Labels** (you can add as many labels as needed), and set the **Metric Type**. Once done, click **Done** to save the configuration.

4. After that, drag the **Change** node onto the canvas. Double-click it and set `msg.payload` to:
```json
{
    "op": "set",
    "labels": {"machine": "machine 1"},
    "val": payload
}
```

This structure assigns the CPU usage value from the payload to `val`, while setting a label and operation. For a Counter metric, use "op": "inc" to increase the counter by val (default is 1 if val is not specified). For a Gauge metric, you can use "op": "set" to assign val (this is required), "op": "inc" to increase the gauge by val (default is 1), or "op": "dec" to decrease the gauge by val (default is 1). Make sure to adapt the operation type based on your metric requirements.

5. Connect the inject node's output to input of cpu node, cpu nodes output to input of change node and then change node's output to input of prometheus out node.
6. Deploy the flow.

### Configuring Endpoint for the Prometheus Exporter

Now that you are exposing the data at the `/metrics` endpoint, which is the default for the Prometheus exporter, you need to configure the Prometheus exporter with a different endpoint, as FlowFuse blocks the `/metrics` path for security reasons.

To configure the endpoint, follow these steps:

1. Go to the instance settings in the FlowFuse platform.
2. Switch to the **Environment** tab. In this tab, add a new variable called `PROMETHEUS_METRICS_PATH` and set the desired path for exposing metrics. If you are running Node-RED locally, add `process.env.PROMETHEUS_METRICS_PATH="path"` at the beginning of the `settings.json` file.
3. Click **Save** and restart the Node-RED instance.

After restarting the Node-RED instance, your data will be exported at the specified endpoint. To confirm that the data is being exported correctly, make an HTTP request to `https://<instance-url>/<endpoint>`. You should receive the metrics in a string format that Prometheus understands.

### Retriving Data from prometheus

The promethues relies on the http for both pulling data and when querying data..... so to retrive the data we need to use api provided by prometheus...

### Building a Live Chart

1. Drag the **Inject** node onto the canvas and set it to repeat at the same interval as configured in Prometheus' config file.
2. Drag the **HTTP Request** node onto the canvas and set the URL to `<ip-address>:9090/api/v1/query?query=machine_cpu_usage`, replacing `<ip-address>` with your actual IP address of machine running prometheus. Set the return type to "a parsed JSON object."
3. Drag the **Change** node onto the canvas. Set `msg.ui_update.label` to `msg.payload.data.result[0].metric.machine` to assign the label value that will be displayed in the gauge. Next, set `msg.payload` to `$number(payload.data.result[0].value[1])` using JSONata to assign the metric value.
4. Drag the **Ui-Gauge** widget onto the canvas.
5. Connect the **Inject** node's output to the input of the **HTTP Request** node, the **HTTP Request** node's output to the input of the **Change** node, and finally, connect the **Change** node's output to the input of the **Ui-Gauge** widget. 

Now you will see the live gaguge displaying the performance of node-red instance.

### Building historical chart







