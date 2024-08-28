---
layout: nohero
title: Security Statement - FlowFuse
---

<div class="prose prose-blue container m-auto max-w-4xl px-6 pb-24">

Security aspects of FlowFuse are divided up into three sections;
1. [Application level](#application)
1. [FlowFuse configuration](#flowfuse-configuration)
1. [Organisation](#organisation)

## Application

FlowFuse architecture is described on our [documentation](/docs/contribute/architecture/).

### User sessions

Users are identified by an unique combination of username and password, or by a
SAML compliant server for Single Sign-on (SSO) or LDAP. FlowFuse by default will  
close active sessions after 14 days, of when user signs out.

User provisioning is on a per user basis.

### Multi-factor authentication

FlowFuse support Multi-factor authenication (MFA), also known as 2-factor
authentication (2FA) for its users once the user has this configured.

## FlowFuse Configuration

Configuration of the FlowFuse application influences security aspects of the
system at large. For each section the implementation of FlowFuse Cloud is
mentioned too. For self managed installs we advise to follow the choices made
by FlowFuse Cloud.

## Audit logs

FlowFuse features multiple layers of audit logging, both on the administrator level
as well as on a team level. Audit logs are currently stored indefinitialy.

### Data storage

#### Data at Rest

All user data is stored in a relational database.

_FlowFuse Cloud_: Data is stored in a PostgreSQL database. All data is encrypted
[since October 2022](/blog/2022/10/db-migration-01/).

#### Data residency

Long term data storage is depended on the location of the relational database
storage.

_FlowFuse Cloud_: Data is stored in the European Union, specificially
Ireland, on AWS eu-west-1.

### Data in Transit

Traffic from external sources to the FlowFuse application can be encrypted.
When a load balancer is used, the encryption is terminated on the edge. Internal
traffic is not encrypted.

_FlowFuse Cloud_: Data in transit to and from external sources is protected
with SSL/TLS. Encryption is terminated at the edge, both for HTTP and MQTT
traffic.

Adding internal SSL/TLS is [being investigated](https://github.com/FlowFuse/flowfuse/issues/910).

#### Inter project communication

Communication between a teams projects is MQTT based. Traffic can be encrypted
based on the broker configuration.

_FlowFuse Cloud_: Inbound and outbound traffic is send encrypted to 
FlowFuse. The encryption is terminated at the load balancer. Internal traffic
is not encrypted.

### Service endpoints

It's recommended to run the FlowFuse application and the flow runtimes on
different domains. This will create separation of concerns and enhances security
for, among others, cookies.

_FlowFuse Cloud_: Our SaaS offering has multiple service domains. The
corporate website is hosted at [flowforge.com](https://flowforge.com). The
application is served at [app.flowfuse.com]({{ site.appURL }}), while
the Node-RED instances are served from \*.flowforge.cloud.

MQTT traffic is served from mqtt.flowforge.cloud as MQTT over WebSockets.

## Organisation

Keeping our customer's data secure is dependant on our internal practises too.

### Certifications

FlowFuse obtained the SOC 2 Type 1 certification, audited by Advantage Partners.
Currenlty, Advantage Partners is observing FlowFuse practises for us to obtain
SOC 2 Type 1.

### Security Governance

FlowFuse has information and data policies, the full list can be found in [our handbook](/handbook/company/security/).

Most notably for (prospective) customers assessing FlowFuse:

1. [Information Security Policy and Acceptable Use Policy](/handbook/company/security/information-security/)
1. [Data Management Policy](/handbook/company/security/data-management/)
1. [Information security awareness training](/handbook/company/security/human-resources/#information-security-awareness%2C-education-%26-training)

</div>
