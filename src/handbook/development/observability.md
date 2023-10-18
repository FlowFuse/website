---
navTitle: Observability
---

# Observability

Observability is the ability to understand the internal state and behavior of a system by analyzing its outputs, without requiring knowledge of its internal workings. In the context of DevOps, this means having a holistic view of your applications and infrastructure, including their health, performance, and any potential issues.

## Tools we use

### Prometheus

Prometheus is used to monitor the health of our applications and infrastructure. It collects metrics from various sources, including our applications, Kubernetes, and AWS. We use it to monitor the following:

* Application Metrics: Prometheus collects metrics from our applications, including HTTP requests, database queries, and background jobs.
* Kubernetes Metrics: Prometheus collects metrics from Kubernetes, including CPU and memory usage, pod status, and network traffic.

### Loki

Loki is a log aggregation system designed to work seamlessly with Prometheus. We use Loki to collect, store, and query logs from our applications and infrastructure. It complements Prometheus by providing a way to analyze logs alongside metrics.

### Grafana

Grafana is a popular open-source platform for creating, sharing, and managing dashboards. It complements Prometheus and Loki by providing a unified interface for visualizing and analyzing observability data. Key features include:

* Data Source Integration: Grafana supports various data sources, including Prometheus and Loki, making it an ideal choice for aggregating and visualizing metrics and logs in one place.
* Customizable Dashboards: Grafana offers extensive customization options, enabling you to build tailored dashboards that provide the insights you need.
* Alerting: You can set up alerting rules in Grafana to proactively monitor your systems based on your metrics and logs data.

[Link](https://grafana.flowforge.com)

### AWS CloudWatch

AWS CloudWatch is a monitoring and observability service that provides data and actionable insights for AWS, hybrid, and on-premises applications and infrastructure resources. In our case we use it to monitor infrastructure-related resources in AWS.

[Link](https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#home:)
