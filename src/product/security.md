---
layout: nohero
title: Security Statment - FlowForge
---

<div class="prose prose-blue container m-auto max-w-4xl">

Security aspects of FlowForge are divided up into two sections, configuration
and application level. Application level security aspects apply to both self
managed and FlowForge managed instances.

## Application

### User sessions

Users are identified by an unique combination of username and password. There's
currently no support for SSO/SAML in FlowForge, it is
[being investigated](https://github.com/flowforge/flowforge/issues/226) as part
of our roadmap.

User provisioning is on a per user basis.

## Configuration

Configuration of the FlowForge application influences security aspects of the
system at large. For each section the implementation of FlowForge managed
installs are mentioned too. For self managed installs we advise to follow the
choices made by FlowForge Managed installs.

### Data storage

#### Data at Rest

All user data is stored in a relational database, which are encrypted by default
for all install methods except local.

_FlowForge Managed_: Data is stored in a PostgreSQL database. All data is encrypted
[since October 2022](https://flowforge.com/blog/2022/10/db-migration-01/).

#### Data residency

Long term data storage is depended on the location of the relational database
storage.

_FlowForge Managed_: Data is stored in the European Union, specificially
Ireland, on AWS eu-west-1.

### Data in Transit

Traffic from external sources to the FlowForge application can be encrypted.
When a load balancer is used, the encryption is terminated on the edge. Internal
traffic is not encrypted.

_FlowForge Managed_: Data in transit to and from external sources is protected
with SSL/TLS. Encryption is terminated at the edge, both for HTTP and MQTT
traffic.

Adding internal SSL/TLS is [being investigated](https://github.com/flowforge/flowforge/issues/910).

#### Inter project communication

Communication between a teams projects is MQTT based. Traffic can be encrypted
based on the broker configuration.

_FlowForge Managed_: Inbound and outbound traffic is send encrypted to 
FlowForge. The encryption is terminated at the load balancer. Internal traffic
is not encrypted.

### Service endpoints

It's recommended to run the FlowForge application and the flow runtimes on
different domains. This will create separation of concerns and enhances security
for, among others, cookies.

_FlowForge Managed_: Our SaaS offering has multiple service domains. The
corporate website is hosted at [flowforge.com](https://flowforge.com). The
application is served at [app.flowforge.com](https://app.flowforge.com), while
the Node-RED instances are served from \*.flowforge.cloud.

</div>
