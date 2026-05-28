<script setup>
// Native Nuxt port of src/platform/security.md (layout: nohero).
// Reproduces nuxt/public/platform/security/index.html <main> content verbatim.
useHead({
    title: 'Security Statement - FlowFuse',
})
</script>

<template>
  <div class="w-full page hero">
    <div class="w-full">
      <div class="container m-auto text-center flex py-12 px-12 md:max-w-screen-lg md:pt-12">
        <div class="text-center w-full">
          <h1>Security Statement - FlowFuse</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="nohero w-full">
        <div class="prose prose-blue container m-auto max-w-4xl px-6 pb-24">
          <p>Security aspects of FlowFuse are divided up into four sections;</p>
          <ol>
            <li><a href="#application">Application level</a></li>
            <li><a href="#flowfuse-configuration">FlowFuse configuration</a></li>
            <li><a href="#organization">Organization</a></li>
            <li><a href="#gxp-readiness">GxP Readiness</a></li>
          </ol>
          <h2 id="application" tabindex="-1"><a class="header-anchor" href="#application">Application</a></h2>
          <p>The FlowFuse platform architecture is described in our <a href="/docs/contribute/architecture/">documentation</a>.</p>
          <h3 id="users" tabindex="-1"><a class="header-anchor" href="#users">Users</a></h3>
          <h4 id="sessions" tabindex="-1"><a class="header-anchor" href="#sessions">Sessions</a></h4>
          <p>Users are identified by an unique combination of username and password, or by a SAML compliant server for Single Sign-on (SSO) or LDAP. FlowFuse by default will<br>
            close active sessions after 14 days, or when user signs out.</p>
          <p>Users can self-register on the platform, or if their SSO/LDAP configuration allows, they can be automatically registered on first login.</p>
          <h4 id="multi-factor-authentication" tabindex="-1"><a class="header-anchor" href="#multi-factor-authentication">Multi-factor authentication</a></h4>
          <p>FlowFuse supports Multi-factor authentication (MFA), also known as 2-factor authentication (2FA) for its users. They can configure this once they have registered on the platform.</p>
          <h4 id="role-based-access-control" tabindex="-1"><a class="header-anchor" href="#role-based-access-control">Role-Based Access Control</a></h4>
          <p>Within FlowFuse, users are organised within Teams. A user can be in multiple Teams.</p>
          <p>Within the Team, a user will have a role to determine what they are able to do. The available roles are:</p>
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Owner</td>
                <td>Full access to the team. Create create/delete resources and manage the billing settings</td>
              </tr>
              <tr>
                <td>Member</td>
                <td>Can access and modify existing Node-RED instances</td>
              </tr>
              <tr>
                <td>Viewer</td>
                <td>Has read-only access to the Node-RED instances - cannot modify anything</td>
              </tr>
              <tr>
                <td>Dashboard</td>
                <td>Cannot access the Node-RED editor, but can access any Dashboard created within a Node-RED instance</td>
              </tr>
            </tbody>
          </table>
          <p>Some users can also be granted <code>admin</code> level access. This allows them to administer the overall FlowFuse platform.</p>
          <p><em>FlowFuse Cloud</em>: Only FlowFuse employees have <code>admin</code> access to the platform, based on their role and business need to have that level of access.</p>
          <h3 id="audit-logs" tabindex="-1"><a class="header-anchor" href="#audit-logs">Audit logs</a></h3>
          <p>FlowFuse features multiple layers of audit logging, both at the administrator level as well as at a team level. Audit logs are currently stored indefinitely.</p>
          <h2 id="flowfuse-configuration" tabindex="-1"><a class="header-anchor" href="#flowfuse-configuration">FlowFuse Configuration</a></h2>
          <p>Configuration of the FlowFuse application influences security aspects of the system at large. For each section the implementation of FlowFuse Cloud is mentioned too. For self managed installs we advise to follow the choices made by FlowFuse Cloud.</p>
          <h3 id="data-storage" tabindex="-1"><a class="header-anchor" href="#data-storage">Data storage</a></h3>
          <h4 id="data-at-rest" tabindex="-1"><a class="header-anchor" href="#data-at-rest">Data at Rest</a></h4>
          <p>All user data is stored in a relational database.</p>
          <p><em>FlowFuse Cloud</em>: Data is stored in a PostgreSQL database. All data is encrypted using the industry standard AES-256 encryption algorithm.</p>
          <p><em>FlowFuse Cloud</em>: All persistent users files are stored at rest in an Encrypted AWS EFS volume, using the AES-256 encryption algorithm. <a href="/changelog/2024/07/persistent-storage/">Persistent Storage</a></p>
          <h4 id="data-residency" tabindex="-1"><a class="header-anchor" href="#data-residency">Data residency</a></h4>
          <p>Long term data storage is depended on the location of the relational database storage.</p>
          <p><em>FlowFuse Cloud</em>: Data is stored in the European Union, specifically Ireland, on AWS <code>eu-west-1</code>.</p>
          <h3 id="data-in-transit" tabindex="-1"><a class="header-anchor" href="#data-in-transit">Data in Transit</a></h3>
          <p>Traffic from external sources to the FlowFuse application can be encrypted. When a load balancer is used, the encryption is terminated on the edge. Internal traffic is not encrypted.</p>
          <p><em>FlowFuse Cloud</em>: Data in transit to and from external sources uses the latest recommended AWS Network Security policy. This enforces TLS1.2 as a minimum. Encryption is terminated at the edge, both for HTTP and MQTT traffic.</p>
          <p>Adding internal SSL/TLS is <a href="https://github.com/FlowFuse/flowfuse/issues/910">being investigated</a>.</p>
          <h4 id="inter-node-red-communication" tabindex="-1"><a class="header-anchor" href="#inter-node-red-communication">Inter Node-RED communication</a></h4>
          <p>Communication between a team's instances is MQTT based. Traffic can be encrypted based on the broker configuration.</p>
          <p><em>FlowFuse Cloud</em>: Inbound and outbound traffic is sent encrypted to FlowFuse. The encryption is terminated at the load balancer. Internal traffic is not encrypted.</p>
          <h3 id="service-endpoints" tabindex="-1"><a class="header-anchor" href="#service-endpoints">Service endpoints</a></h3>
          <p>It's recommended to run the FlowFuse application and the flow runtimes on different domains. This will create separation of concerns and enhances security for, among others, cookies.</p>
          <p><em>FlowFuse Cloud</em>: Our SaaS offering has multiple domains:</p>
          <table>
            <thead>
              <tr>
                <th>domain</th>
                <th>purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>app.flowfuse.com</code></td>
                <td>The FlowFuse Cloud platform</td>
              </tr>
              <tr>
                <td><code>mqtt.flowfuse.com</code></td>
                <td>The MQTT endpoint for the platform - via secure WebSocket connection</td>
              </tr>
              <tr>
                <td><code>*.flowfuse.cloud</code></td>
                <td>The endpoints of individual Node-RED instances</td>
              </tr>
              <tr>
                <td><code>*.flowforge.cloud</code></td>
                <td>Older Node-RED instances may be served under this domain as they were created prior to the migration to the FlowFuse name</td>
              </tr>
            </tbody>
          </table>
          <p>When running the FlowFuse Device Agent on a user's own hardware and network, it will require access to the following domains to be fully operational:</p>
          <ul>
            <li><code>app.flowfuse.com</code></li>
            <li><code>mqtt.flowfuse.com</code></li>
            <li><code>registry.npmjs.org</code> - to enable installing of Node-RED modules</li>
          </ul>
          <p>When running the Node-RED editor on a user's own network, it will require access to the following domains to be fully operational:</p>
          <ul>
            <li><code>app.flowfuse.com</code></li>
            <li><code>mqtt.flowfuse.com</code></li>
            <li><code>*.flowfuse.cloud</code></li>
            <li><code>catalogue.nodered.org</code></li>
          </ul>
          <p>Outbound connections from Node-RED instances running within FlowFuse Cloud will always come from the IP address <code>63.33.85.112</code>.</p>
          <h2 id="organization" tabindex="-1"><a class="header-anchor" href="#organization">Organization</a></h2>
          <p>Keeping our customer's data secure is dependant on our internal practises too.</p>
          <h3 id="certifications" tabindex="-1"><a class="header-anchor" href="#certifications">Certifications</a></h3>
          <p>FlowFuse obtained the SOC 2 Type 1 and Type 2 certification, audited by Advantage Partners.</p>
          <h3 id="security-governance" tabindex="-1"><a class="header-anchor" href="#security-governance">Security Governance</a></h3>
          <p>FlowFuse has information and data policies, the full list can be found in <a href="/handbook/company/security/">our handbook</a>.</p>
          <p>Most notably for (prospective) customers assessing FlowFuse:</p>
          <ol>
            <li><a href="/handbook/company/security/information-security/">Information Security Policy and Acceptable Use Policy</a></li>
            <li><a href="/handbook/company/security/data-management/">Data Management Policy</a></li>
            <li><a href="/handbook/company/security/human-resources/#information-security-awareness%2C-education-%26-training">Information security awareness training</a></li>
          </ol>
          <h2 id="gxp-readiness" tabindex="-1"><a class="header-anchor" href="#gxp-readiness">GxP Readiness</a></h2>
          <p>FlowFuse is built with enterprise-grade architecture and controls that support deployment in regulated environments.</p>
          <p>Features such as role-based access control, audit logging of flow changes and user actions, versioning and snapshotting of Node-RED instances, configuration via infrastructure-as-code and containerized deployments, and integration with SSO/LDAP align with many of the security, traceability and change-control expectations found in GxP systems (e.g., FDA 21 CFR Part 11, EU GMP Annex 11).</p>
          <p>FlowFuse itself is designed to be validation-ready: we provide the necessary architecture, documentation, and controls to enable our customers to perform their own validation and supplier qualification in accordance with their GxP obligations.</p>
        </div>
      </div>
    </div>
  </div>
</template>
