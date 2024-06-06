---
eleventyNavigation:
  key: Database
meta:
  title: Node-RED Database Integration Guides
  description: Explore database integration guides for Node-RED, including PostgreSQL, MongoDB, InfluxDB, DynamoDB, and TimescaleDB
  keywords: node-red, databases, integration, PostgreSQL, MongoDB, InfluxDB, DynamoDB, TimescaleDB
---

# {{ meta.title }}

Welcome to the Database Integration Guides section. Here, you'll find comprehensive tutorials on integrating various databases with Node-RED. Whether you're working with SQL or NoSQL databases, or need to handle time-series data, these guides will help you connect, store, query, and visualize data effectively.

{% for item in collections.all | eleventyNavigation("Database") %}
- [{{ item.title }}]({{ item.url }})
{% endfor %}

Explore our guides for each database. Each guide provides step-by-step instructions to help you get started, along with advanced techniques for optimizing performance and handling complex data operations.
