FlowForge has multiple editions, and the security aspects depends on both the
configuration of FlowForge as well as the application.

## Application security

Security on the application level will have the same properties for self-managed
installs as well as FlowForge Cloud.

### Authentication and authorization

Authentication and session management is centrally managed in the FlowForge
application. There's currently no support for SAML or SSO. There's no support
for centralized management for creation of teams, users per team, nor their RBAC
roles.

This is being investigated, see also the [relevant epic](https://github.com/flowforge/flowforge/issues/226).

## Configured properties

Configuration of the FlowForge application influences security aspects of the
system at large. Below 

### FlowForge Cloud

FlowForge Cloud is hosted on Amazon Web Services (AWS) in Ireland.

#### Service endpoints

Our cloud offering has multiple service domains. The corporate website is hosted
at [flowforge.com](https://flowforge.com). The application is served at
[app.flowforge.com](https://app.flowforge.com), while the Node-RED instances are
served from \*.flowforge.cloud.

### Data Protection

Data protection has two components: while in-transit and at rest.

#### Data in-transit

Data in transit to & from external sources is protected with SSL/TLS. Encryption is
terminated at the edge, both for HTTP and MQTT traffic.

Adding internal SSL/TLS is [being investigated](https://github.com/flowforge/flowforge/issues/910).
#### Data at rest

FlowForge Cloud stores data in either our relational database or an object
store. For both the database and the object storage there's currently no
encryption at rest configured.

We're migrating to using encryption at rest for the [database (internal link)](https://github.com/flowforge/CloudProject/issues/79)
and for our [object storage (internal link)](https://github.com/flowforge/CloudProject/issues/80).

### Self managed editions

#### Service endpoints

It's recommended to run the FlowForge application and the flow runtimes on
different domains. This will create separation of concerns and enhances security
for, among others, cookies.

#### Data Protection

All data in-transit can be encrypted, as well as all data at rest. Settings
depend on your database software, object storage provider, and/or install method.
