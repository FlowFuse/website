---
layout: nohero
title: Security Statement - FlowFuse
---

<div class="prose prose-blue container m-auto max-w-4xl px-6 pb-24">

Security aspects of FlowFuse are divided up into four sections;
1. [Application level](#application)
1. [FlowFuse configuration](#flowfuse-configuration)
1. [Organization](#organization)
1. [GxP Readiness](#gxp-readiness)

## Application

The FlowFuse platform architecture is described in our [documentation](/docs/contribute/architecture/).

### Users

#### Sessions

Users are identified by an unique combination of username and password, or by a
SAML compliant server for Single Sign-on (SSO) or LDAP. FlowFuse by default will  
close active sessions after 14 days, or when user signs out.

Users can self-register on the platform, or if their SSO/LDAP configuration allows, they
can be automatically registered on first login.

#### Multi-factor authentication

FlowFuse supports Multi-factor authentication (MFA), also known as 2-factor
authentication (2FA) for its users. They can configure this once they have registered
on the platform.

#### Role-Based Access Control

Within FlowFuse, users are organised within Teams. A user can be in multiple Teams.

Within the Team, a user will have a role to determine what they are able to do. The available roles are:

|Role|Description|
|-----|----|
|Owner|Full access to the team. Create create/delete resources and manage the billing settings |
|Member|Can access and modify existing Node-RED instances|
|Viewer|Has read-only access to the Node-RED instances - cannot modify anything|
|Dashboard|Cannot access the Node-RED editor, but can access any Dashboard created within a Node-RED instance|

Some users can also be granted `admin` level access. This allows them to administer the overall FlowFuse platform.

_FlowFuse Cloud_: Only FlowFuse employees have `admin` access to the platform, based on their role and business need to have that level of access.

### Audit logs

FlowFuse features multiple layers of audit logging, both at the administrator level
as well as at a team level. Audit logs are currently stored indefinitely.

## FlowFuse Configuration

Configuration of the FlowFuse application influences security aspects of the
system at large. For each section the implementation of FlowFuse Cloud is
mentioned too. For self managed installs we advise to follow the choices made
by FlowFuse Cloud.

### Data storage

#### Data at Rest

All user data is stored in a relational database.

_FlowFuse Cloud_: Data is stored in a PostgreSQL database. All data is encrypted using the industry standard AES-256 encryption algorithm.

_FlowFuse Cloud_: All persistent users files are stored at rest in an Encrypted AWS EFS volume, using the AES-256 encryption algorithm. [Persistent Storage](/changelog/2024/07/persistent-storage/)

#### Data residency

Long term data storage is depended on the location of the relational database
storage.

_FlowFuse Cloud_: Data is stored in the European Union, specifically
Ireland, on AWS `eu-west-1`.

### Data in Transit

Traffic from external sources to the FlowFuse application can be encrypted.
When a load balancer is used, the encryption is terminated on the edge. Internal
traffic is not encrypted.

_FlowFuse Cloud_: Data in transit to and from external sources uses the latest recommended AWS Network Security policy. This enforces TLS1.2 as a minimum. Encryption is terminated at the edge, both for HTTP and MQTT traffic.

Adding internal SSL/TLS is [being investigated](https://github.com/FlowFuse/flowfuse/issues/910).

#### Inter Node-RED communication

Communication between a team's instances is MQTT based. Traffic can be encrypted
based on the broker configuration.

_FlowFuse Cloud_: Inbound and outbound traffic is sent encrypted to 
FlowFuse. The encryption is terminated at the load balancer. Internal traffic
is not encrypted.

### Service endpoints

It's recommended to run the FlowFuse application and the flow runtimes on
different domains. This will create separation of concerns and enhances security
for, among others, cookies.

_FlowFuse Cloud_: Our SaaS offering has multiple domains:

| domain | purpose |
|--------|---------|
|`app.flowfuse.com` | The FlowFuse Cloud platform |
|`mqtt.flowfuse.com`| The MQTT endpoint for the platform - via secure WebSocket connection |
|`*.flowfuse.cloud` | The endpoints of individual Node-RED instances |
|`*.flowforge.cloud` | Older Node-RED instances may be served under this domain as they were created prior to the migration to the FlowFuse name |

When running the FlowFuse Device Agent on a user's own hardware and network, it will require access to the following domains to be fully operational:

 - `app.flowfuse.com`
 - `mqtt.flowfuse.com`
 - `registry.npmjs.org` - to enable installing of Node-RED modules

When running the Node-RED editor on a user's own network, it will require access to the following domains to be fully operational:

- `app.flowfuse.com`
- `mqtt.flowfuse.com`
- `*.flowfuse.cloud`
- `catalogue.nodered.org`
  
Outbound connections from Node-RED instances running within FlowFuse Cloud will always come from the IP address `63.33.85.112`. 
 
## Organization

Keeping our customer's data secure is dependant on our internal practises too.

### Certifications

FlowFuse obtained the SOC 2 Type 1 and Type 2 certification, audited by Advantage Partners.

### Security Governance

FlowFuse has information and data policies, the full list can be found in [our handbook](/handbook/company/security/).

Most notably for (prospective) customers assessing FlowFuse:

1. [Information Security Policy and Acceptable Use Policy](/handbook/company/security/information-security/)
1. [Data Management Policy](/handbook/company/security/data-management/)
1. [Information security awareness training](/handbook/company/security/human-resources/#information-security-awareness%2C-education-%26-training)

## GxP Readiness

FlowFuse is built with enterprise-grade architecture and controls that support deployment in regulated environments. 

Features such as role-based access control, audit logging of flow changes and user actions, versioning and snapshotting of Node-RED instances, configuration via infrastructure-as-code and containerized deployments, and integration with SSO/LDAP align with many of the security, traceability and change-control expectations found in GxP systems (e.g., FDA 21 CFR Part 11, EU GMP Annex 11).

FlowFuse itself is designed to be validation-ready: we provide the necessary architecture, documentation, and controls to enable our customers to perform their own validation and supplier qualification in accordance with their GxP obligations.

</div>
