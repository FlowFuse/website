<script setup>
const SIGNUP = 'https://app.flowfuse.com/account/create'

useHead({
  title: 'FlowFuse Pricing • FlowFuse',
  meta: [
    { name: 'description', content: 'Discover the pricing options for FlowFuse, featuring Starter, Pro, and Enterprise plans. Benefit from volume discounts on Pro and Enterprise plans. Get started with a 14-day trial period for the Pro plan.' },
    { name: 'keywords', content: 'FlowFuse pricing, Cost, Plans, Features, Cloud, Self-hosted' },
  ],
})

// Inline SVGs copied verbatim from src/_includes/components.
const CHECK_SVG = '<svg title="Available Now" class="ff-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>'
const INFO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}" stroke="currentColor" className="w-6 h-6">\n<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>\n</svg>'

// Feature catalog ported from src/_data/featureCatalog.yaml.
const featureCatalog = {
  sections: [
    {
      id: 'empower',
      label: 'Empower',
      features: [
        { id: 'ff-expert', label: 'FlowFuse Expert', description: 'AI-powered assistant that supports, enables, and speeds up workflows across FlowFuse and Node-RED, with access to MCP servers defined in your Node-RED instances through a single interface.', docsLink: '/docs/user/expert', subfeature: false, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: 'Contact Support to enable' } } },
        { id: 'ff-expert-support', label: 'Support Mode', description: 'Chat-based assistance for FlowFuse and Node-RED, including Node-RED instance management through natural language.', docsLink: '/docs/user/expert/chat/#support-mode', subfeature: true, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true, dimmed: true } } },
        { id: 'ff-expert-insights', label: 'Insights Mode', beta: true, description: 'Connects FlowFuse Expert to MCP servers in your Node-RED instances, enabling real-time data queries and actions through a single chat interface.', docsLink: '/docs/user/expert/chat/#insights-mode', subfeature: true, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null, tag: 'Beta', tagPrefix: 'While in', note: 'Available during beta' }, pro: { value: null, tag: 'Beta', tagPrefix: 'While in', note: 'Available during beta' }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true, dimmed: true } } },
        { id: 'nr-mcp-servers', label: 'Node-RED MCP Servers', description: 'Build and expose MCP servers directly from Node-RED instances, making your data and actions available to FlowFuse Expert and other AI agents.', docsLink: '/node-red/flowfuse/mcp/', subfeature: false, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null, tag: 'Beta', tagPrefix: 'During Insights Mode', note: 'Available during beta of Insights Mode' }, pro: { value: null, tag: 'Beta', tagPrefix: 'During Insights Mode', note: 'Available during beta of Insights Mode' }, enterprise: { value: true } },
          selfHosted: { starter: { value: null, tag: 'Beta', tagPrefix: 'During Insights Mode', note: 'Available during beta of Insights Mode' }, pro: { value: null, tag: 'Beta', tagPrefix: 'During Insights Mode', note: 'Available during beta of Insights Mode' }, enterprise: { value: true } } },
      ],
    },
    {
      id: 'manage',
      label: 'Manage',
      features: [
        { id: 'nr-hosting', label: 'Node-RED Hosting', description: 'FlowFuse hosts and manages Node-RED instances at any scale.', docsLink: '/docs/user/introduction/#creating-a-node-red-instance', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'hosted-instances', label: 'Hosted Instances', description: 'Run Node-RED instances managed and hosted by FlowFuse.', docsLink: '/docs/user/introduction/#creating-a-node-red-instance', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true, note: 'Starts with 2 hosted instances, 2 remote instances. Upgrades available up to 3 hosted / 3 remote instances.' }, pro: { value: true, note: 'Starts with 5, shared with edge device count' }, enterprise: { value: true, note: 'Starts with 20, shared with edge device count' } },
          selfHosted: { starter: { value: '5', note: 'Includes 5 hosted instances, shared with edge device count' }, pro: { value: true, note: 'Includes 5 hosted instances, shared with edge device count' }, enterprise: { value: true, note: 'Starts with 20, shared with edge device count' } } },
        { id: 'edge-devices', label: 'Edge Devices', description: 'Connect and manage edge devices running Node-RED at the network edge.', docsLink: '/docs/device-agent/introduction/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true, note: 'Includes 5 edge devices' }, pro: { value: true, note: 'Starts with 5, shared with hosted instance count' }, enterprise: { value: true, note: 'Starts with 20, shared with hosted instance count' } },
          selfHosted: { starter: { value: '5', note: 'Includes 5 edge devices, shared with hosted instance count' }, pro: { value: true, note: 'Shared with hosted instance count' }, enterprise: { value: true, note: 'Starts with 20, shared with hosted instance count' } } },
        { id: 'snapshots', label: 'Snapshots', description: 'Take point-in-time backups of your Node-RED instances and devices. Restore, promote between environments, or compare two snapshots side by side to see exactly what changed.', docsLink: '/docs/user/snapshots/', subfeature: false, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'snapshots-auto-remote', label: 'Auto Snapshot for Remote Instances', description: 'Automatically capture a snapshot every time a remote instance is deployed, so you always have a recoverable history of what was running on each device.', docsLink: '/docs/user/snapshots/#auto-snapshots', subfeature: true, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'snapshots-auto-hosted', label: 'Auto Snapshot for Hosted Instances', description: 'Automatically capture a snapshot every time a hosted instance is deployed, so you always have a recoverable history of what was running.', docsLink: '/docs/user/snapshots/#auto-snapshots', subfeature: true, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'installation-support', label: 'Installation Support', description: null, docsLink: '/docs/install/introduction/#do-you-need-help%3F-installation-service', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'dedicated-support', label: 'Dedicated Success Management', description: null, docsLink: '/handbook/sales/customer-success/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'live-chat-support', label: 'Live Chat Support', description: null, docsLink: null, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'enterprise-support', label: 'Enterprise Support', description: null, docsLink: '/docs/premium-support/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'custom-hostname', label: 'Custom Hostnames', description: 'Access your Node-RED application via your own domain name.', docsLink: '/docs/user/custom-hostnames/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'persistent-files', label: 'Persistent Files', description: 'Store files persistently on the local file system of your Node-RED instance across restarts and upgrades.', docsLink: '/docs/install/file-storage/', showOnPricing: true, tags: ['cloud'],
          cloud: { starter: { value: '1 GB' }, pro: { value: '10 GB' }, enterprise: { value: '100 GB' } } },
        { id: 'persistent-context', label: 'Persistent Context', description: 'In-memory values defined in a Node-RED flow persist across project restarts and upgrades.', docsLink: '/docs/user/persistent-context/', showOnPricing: true, tags: ['cloud'],
          cloud: { starter: { value: '10 MB' }, pro: { value: '100 MB' }, enterprise: { value: '1 GB' } } },
        { id: 'workflow-executions', label: 'Workflow Executions', description: null, docsLink: null, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: 'Unlimited' }, pro: { value: 'Unlimited' }, enterprise: { value: 'Unlimited' } },
          selfHosted: { starter: { value: 'Unlimited' }, pro: { value: 'Unlimited' }, enterprise: { value: 'Unlimited' } } },
      ],
    },
    {
      id: 'scale',
      label: 'Scale',
      features: [
        { id: 'mqtt-broker', label: 'MQTT Broker', description: 'Manage and create MQTT clients to transport data for efficient messaging and communication within your applications.', docsLink: '/docs/user/teambroker/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true, note: 'Includes 5 clients. Additional clients can be purchased.' }, enterprise: { value: true, note: 'Includes 20 clients. Additional clients can be purchased.' } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true, note: 'Includes 20 clients. Additional clients can be purchased.' } } },
        { id: 'device-mgmt', label: 'Device Fleet Updates', description: 'Connect to edge devices to quickly assess and update logic. Debug one device and roll out improvements to your fleet in minutes, securely without requiring full device access for your whole organisation.', docsLink: '/docs/device-agent/introduction/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'volume-pricing', label: 'Volume Pricing', description: 'Customised volume discounts for use cases requiring hundreds or thousands of Node-RED instances.', docsLink: '/contact-us', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'edge-development', label: 'Edge Development', description: 'Connect to an edge device and develop your Node-RED flows directly on the device.', docsLink: '/docs/device-agent/quickstart/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'pipelines', label: 'DevOps Pipelines', description: 'Set up different environments for development, testing, and production Node-RED instances to support a full software delivery lifecycle.', docsLink: '/docs/user/devops-pipelines/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'project-nodes', label: 'Seamless Data Stream', description: 'FlowFuse Project Nodes enable the passing of data and messages between your Node-RED projects.', docsLink: '/docs/user/projectnodes/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'private-npm-registry', label: 'Private NPM Registry', description: null, docsLink: '/docs/user/custom-npm-packages/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'device-groups', label: 'Device Group Management', description: 'Logically group devices assigned to an application and integrate device groups into your DevOps Pipeline for coordinated fleet updates.', docsLink: '/docs/user/device-groups/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'git-integration', label: 'Git Integration', description: 'Back up your flows to a remote Git repository through a DevOps Pipeline. Supports GitHub and Azure DevOps repositories.', docsLink: '/docs/user/devops-pipelines/#git-repository-stage', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'git-integration-github', label: 'GitHub', description: 'Push and pull snapshots to GitHub repositories through DevOps Pipeline Git Stages.', docsLink: '/docs/user/devops-pipelines/#git-repository-stage', subfeature: true, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'git-integration-azure', label: 'Azure DevOps', description: 'Push and pull snapshots to Azure DevOps repositories through DevOps Pipeline Git Stages.', docsLink: '/docs/user/devops-pipelines/#git-repository-stage', subfeature: true, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'ha', label: 'High Availability', description: 'Leverage horizontal scaling for reliable and scalable processing of your data through Node-RED.', docsLink: '/docs/user/high-availability/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'performance', label: 'Performance Monitoring', description: 'Monitor CPU and memory usage at the team level and instance level.', docsLink: null, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'tables', label: 'FlowFuse Tables', description: 'Integrated database feature for storing, reading, writing, and querying data within FlowFuse.', docsLink: '/docs/user/ff-tables/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
      ],
    },
    {
      id: 'secure',
      label: 'Secure',
      features: [
        { id: 'audit-log', label: 'Audit Log', description: 'Keep track of everything going on in your Node-RED instances and FlowFuse. Audit Logs provide details on what actions have taken place, when they happened, and who did them.', docsLink: '/docs/user/logs/#audit-log', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'rbac', label: 'Role-Based Access Control', description: 'Intuitive team management tooling makes it easy to control who has access to what across your FlowFuse organisation.', docsLink: '/docs/user/role-based-access-control/', subfeature: false, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'rbac-application', label: 'Application-Level RBAC', description: 'Fine-grained access control per application, allowing team members to have different permission levels across different applications without requiring separate teams.', docsLink: '/docs/user/role-based-access-control/#application-level-rbac', subfeature: true, showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'security', label: 'Endpoint Security', description: 'Secure HTTP endpoints for hosted Node-RED instances using FlowFuse credentials.', docsLink: '/docs/user/instance-settings/#security', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: 'list', options: ['None', 'HTTP Basic Auth'] }, pro: { value: 'list', options: ['None', 'HTTP Basic Auth', 'FlowFuse Authentication'] }, enterprise: { value: 'list', options: ['None', 'HTTP Basic Auth', 'FlowFuse Authentication'] } },
          selfHosted: { starter: { value: 'list', options: ['None', 'HTTP Basic Auth'] }, pro: { value: 'list', options: ['None', 'HTTP Basic Auth', 'FlowFuse Authentication'] }, enterprise: { value: 'list', options: ['None', 'HTTP Basic Auth', 'FlowFuse Authentication'] } } },
        { id: '2fa', label: 'Two-Factor Authentication', description: 'Two-factor authentication adds an extra layer of security to your FlowFuse account.', docsLink: '/docs/user/user-settings/#two-factor-authentication', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'certified-nodes', label: 'Certified Nodes', description: 'Officially supported Node-RED nodes with SLA-backed security patching and reliability guarantees for mission-critical production deployments.', docsLink: '/blog/2025/07/certified-nodes-v2/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'instance-monitoring', label: 'Instance Monitoring', description: 'Enable alerts to be sent via email when your Node-RED instances encounter issues.', docsLink: '/docs/user/instance-settings/#alerts', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'sso', label: 'Single Sign-On (SSO)', description: 'Configure FlowFuse to work with your own SSO provider, allowing users to access FlowFuse with a single set of login credentials.', docsLink: '/docs/admin/sso/', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'hipaa', label: 'BAA for HIPAA', description: 'FlowFuse can sign a Business Associate Agreement to ensure proper safeguarding of protected health information handled on your behalf.', docsLink: '/handbook/sales/subscription-agreement-1.5', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
      ],
    },
    {
      id: 'collaborate',
      label: 'Collaborate',
      features: [
        { id: 'team-members', label: 'Team Members', description: 'Invite multiple team members to collaborate on the same Node-RED flows.', docsLink: '/docs/user/team/#teams', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: '2' }, pro: { value: '20' }, enterprise: { value: 'Unlimited' } },
          selfHosted: { starter: { value: '5' }, pro: { value: '20' }, enterprise: { value: 'Unlimited' } } },
        { id: 'blueprints', label: 'Access to Blueprints', description: 'FlowFuse Blueprints simplify Node-RED deployments by offering pre-built, customisable flows for specific use cases.', docsLink: '/docs/user/concepts/#blueprint', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'dashboard', label: 'Node-RED Dashboard', description: 'Visualise your data with the powerful and intuitive Node-RED Dashboard.', docsLink: 'https://dashboard.flowfuse.com', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: true }, pro: { value: true }, enterprise: { value: true } } },
        { id: 'multi-user-dashboard', label: 'Personalised Multi-User Dashboards', description: 'Build applications that provide unique data to each logged-in user using personalised multi-user dashboards.', docsLink: 'https://dashboard.flowfuse.com/user/multi-tenancy.html', showOnPricing: true, tags: ['cloud', 'self-hosted'],
          cloud: { starter: { value: null }, pro: { value: true }, enterprise: { value: true } },
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
        { id: 'team-library', label: 'Team Library', description: 'Set up standard nodes and flows that can be shared with all team members across your organisation.', docsLink: '/docs/user/shared-library/', showOnPricing: true, tags: ['self-hosted'],
          selfHosted: { starter: { value: null }, pro: { value: null }, enterprise: { value: true } } },
      ],
    },
  ],
  buttons: {
    cloud: [
      { cta: 'TRY FOR FREE', url: 'sign-up-url', onclick: "capture('cta-join', {'position': 'secondary'}, {'plan': 'cloud-starter'})" },
      { cta: 'TRY FOR FREE', url: 'sign-up-url', onclick: "capture('cta-join', {'position': 'secondary'}, {'plan': 'cloud-pro'})" },
      { cta: 'Request a Quote', url: '/pricing/request-quote/', onclick: "capture('cta-request-quote', {'position': 'secondary'}, {'plan': 'cloud-enterprise'})" },
    ],
    selfHosted: [
      { cta: 'INSTALL NOW', url: 'https://flowfuse.com/docs/install/introduction/', onclick: "capture('cta-install', {'position': 'secondary'}, {'plan': 'sh-starter'})" },
      { cta: 'CONTACT US', url: '/contact-us', onclick: "capture('cta-contact-us', {'position': 'secondary'}, {'plan': 'sh-team'})" },
      { cta: 'Request a Quote', url: '/pricing/request-quote/', onclick: "capture('cta-request-quote', {'position': 'secondary'}, {'plan': 'sh-enterprise'})" },
    ],
  },
}

const TIERS = ['starter', 'pro', 'enterprise']
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const tables = ['cloud', 'self-hosted'].map((hosting) => {
  const hostingKey = hosting === 'self-hosted' ? 'selfHosted' : 'cloud'
  const sections = featureCatalog.sections.map((section) => {
    const rows = section.features
      .filter((row) => row.showOnPricing && row.tags.includes(hosting))
      .map((row) => {
        const hostingData = row[hostingKey]
        const cells = TIERS.map((tier) => (hostingData ? hostingData[tier] : null) || null)
        return { ...row, cells }
      })
    return { label: section.label, rows }
  })
  const buttons = (hosting === 'cloud' ? featureCatalog.buttons.cloud : featureCatalog.buttons.selfHosted)
    .map((button) => ({ ...button, resolvedUrl: button.url === 'sign-up-url' ? SIGNUP : button.url }))
  const dialogs = []
  featureCatalog.sections.forEach((section) => {
    section.features.forEach((row) => {
      if (row.showOnPricing && row.description) {
        const hostingData = row[hostingKey]
        const notes = TIERS
          .map((tier) => ({ tier, cell: hostingData ? hostingData[tier] : null }))
          .filter((t) => t.cell && t.cell.note)
          .map((t) => ({ tier: capitalize(t.tier), note: t.cell.note }))
        dialogs.push({ id: row.id, label: row.label, description: row.description, notes, docsLink: row.docsLink })
      }
    })
  })
  return { hosting, sections, buttons, dialogs }
})

const openDialogs = ref({})
const openInfo = (id, hosting) => {
  if (typeof window !== 'undefined' && typeof window.capture === 'function') window.capture('info-feature', { feature: id }, { hosting })
  openDialogs.value[`${id}-${hosting}`] = true
}
const closeInfo = (id, hosting) => { openDialogs.value[`${id}-${hosting}`] = false }

const faqs = [
  { question: 'Does FlowFuse offer annual discounts for FlowFuse Cloud?', answer: 'Yes, both Starter and Pro customers receive a free month when paying for a year of FlowFuse in advance. Simply choose yearly billing upon signup, or select it from the Billing area in the app.' },
  { question: 'Are flat-fee or site-wide licenses available?', answer: 'It is not possible at this time to purchase an unlimited-use license, but contact us to discuss pricing for your unique use case.' },
  { question: 'Do you offer discounts for large-scale deployments?', answer: "Yes, we provide customized volume discounts for use cases requiring hundreds or thousands of Node-RED instances. Please <a href='/contact-us'>Contact Us</a> to discuss your specific requirements.​" },
]
const openFaqs = ref(faqs.map(() => false))
const toggleFaq = (i) => { openFaqs.value[i] = !openFaqs.value[i] }

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  let hosting = urlParams.get('hosting') || 'cloud'

  const cloud = document.querySelectorAll('.contentCloud')
  const selfHosted = document.querySelectorAll('.contentSelfHosted')
  const cloudText = document.querySelector('.cloudText')
  const selfHostedText = document.querySelector('.selfHostedText')
  const selector = document.querySelector('.selector')
  const featureComparison = document.querySelector('#feature-comparison')

  function updateContentAndUrl(value) {
    cloudText.classList.remove('active')
    selfHostedText.classList.remove('active')

    if (value === 'cloud') {
      selector.style.left = '0.8%'
      cloud.forEach((item) => item.classList.remove('hide'))
      selfHosted.forEach((item) => item.classList.add('hide'))
      urlParams.delete('hosting')
      cloudText.classList.add('active')
      featureComparison.classList.remove('hide')
    } else if (value === 'self-hosted') {
      selector.style.left = '49%'
      cloud.forEach((item) => item.classList.add('hide'))
      selfHosted.forEach((item) => item.classList.remove('hide'))
      urlParams.set('hosting', value)
      selfHostedText.classList.add('active')
      featureComparison.classList.remove('hide')
    }

    const paramString = urlParams.toString()
    const currentHash = window.location.hash
    window.history.replaceState({}, '', paramString ? '?' + paramString + currentHash : window.location.pathname + currentHash)
  }

  updateContentAndUrl(hosting)

  if (window.location.hash) {
    setTimeout(function () {
      const el = document.querySelector(window.location.hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const toggleEl = document.getElementById('pricing-toggle')
  const featureTableBody = document.querySelector('[data-table-body]')
  function updateToggleBg() {
    if (!featureTableBody || !toggleEl) return
    const tableTop = featureTableBody.getBoundingClientRect().top
    const toggleBottom = toggleEl.getBoundingClientRect().bottom
    toggleEl.classList.toggle('bg-white', tableTop <= toggleBottom)
  }
  window.addEventListener('scroll', updateToggleBg, { passive: true })
  updateToggleBg()

  const btnToggle = document.querySelector('.btnToggle')
  if (btnToggle) {
    btnToggle.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect()
      const isLeftHalf = (e.clientX - rect.left) < rect.width / 2
      const target = isLeftHalf ? 'cloud' : 'self-hosted'
      if (hosting === target) return
      hosting = target
      updateContentAndUrl(hosting)
      if (typeof window.capture === 'function') window.capture(target)
    })
  }

  // Sync horizontal scroll and sticky header background for feature tables.
  document.querySelectorAll('[data-table-body]').forEach(function (body) {
    const header = body.parentElement.querySelector('[data-table-header]')
    if (!header) return
    body.addEventListener('scroll', function () {
      header.scrollLeft = body.scrollLeft
    }, { passive: true })
  })

  document.querySelectorAll('[data-sticky-header]').forEach(function (stickyEl) {
    const body = stickyEl.parentElement.querySelector('[data-table-body]')
    if (!body) return
    function updateStickyBg() {
      const bodyTop = body.getBoundingClientRect().top
      const stickyBottom = stickyEl.getBoundingClientRect().bottom
      stickyEl.classList.toggle('bg-white', bodyTop <= stickyBottom)
    }
    window.addEventListener('scroll', updateStickyBg, { passive: true })
    updateStickyBg()
  })

  const onEscape = (e) => {
    if (e.key === 'Escape') openDialogs.value = {}
  }
  document.addEventListener('keydown', onEscape)
})
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="pricing bg-white">
        <div class="w-full gradient-bg">
          <div class="text-center w-full pt-12 pb-6">
            <h1>FlowFuse <span class="text-indigo-600">Pricing</span></h1>
          </div>
          <div class="h-5 md:h-0" />
          <div id="pricing-toggle" class="sticky top-20 sm:top-[104px] md:top-14 z-20 py-3 transition-colors duration-200">
            <div class="text-center">
              <div class="mainToggle">
                <button class="btnToggle">
                  <span class="selector" />
                  <div class="hosting">
                    <div class="divCloud">
                      <span class="cloudText">CLOUD</span>
                    </div>
                    <div class="divSelfHosted">
                      <span class="selfHostedText">SELF HOSTED</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="px-6 pricing-tiles flex flex-col lg:max-w-screen-2xl md:mt-8">
            <!-- Cloud tiers -->
            <div class="contentCloud m-auto transition duration-1000 md:min-h-[502px]">
              <div class="pricing-tiles flex flex-col md:grid md:max-lg lg:max-w-screen-xl mt-4 md:mt-0">
                <div class="pricing-tile md:h-full">
                  <div class="pricing-tile-background pb-6">
                    <div class="flex flex-col items-center text-left md:flex-row md:px-0 md:block">
                      <div class="flex flex-row justify-between mt-4 w-full gap-x-2">
                        <h2 class="text-2xl font-medium" style="display:inline-block;">Starter</h2>
                      </div>
                      <p class="mt-7"><span class="inline font-normal">Cloud-hosted Node-RED</span> with FlowFuse development enhancements. The fastest way to <span class="inline font-normal">get started building </span>with Node-RED.</p>
                    </div>
                    <div class="flex flex-col content-start features mt-6 md:mt-3 w-full">
                      <ul class="ff-checklist font-light leading-7 mt-2">
                        <li>FlowFuse Expert for AI-assisted Node&#8209;RED development</li>
                        <li>2 team members</li>
                        <li>Blueprints</li>
                        <li>Option to upgrade up to 3 hosted/3 remote instances</li>
                      </ul>
                    </div>
                    <note class="font-semibold mt-4">Includes 1 hosted instance. Additional instances are $20/month.
                    </note>
                    <div data-nosnippet class="flex">
                      <div class="mt-9 md:mt-6 md:text-left items-left w-full mb-11 md:mb-5 flex flex-row md:self-end">
                        <div class="text-left flex flex-row md:self-end">
                          <div class="mr-1">
                            <note class="note text-sm">Starting at</note>
                            <h2 class="self-end pb-1">
                              $20
                            </h2>
                          </div>
                          <note class="pl-2 text-sm leading-4 text-left self-end pb-2">
                            /month
                            <br>
                            <span class="text-xs text-gray-500">after free trial of Pro</span>
                          </note>
                        </div>
                      </div>
                    </div>
                    <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full" :href="SIGNUP" onclick="capture('cta-join', {'position': 'primary'}, {'plan': 'cloud-starter'})">
                      TRY FOR FREE
                    </a>
                  </div>
                </div>
                <div class="pricing-tile md:h-full">
                  <div class="pricing-tile-background pb-6">
                    <div class="flex flex-col items-center text-left md:flex-row md:px-0 md:block">
                      <div class="flex flex-row justify-between mt-4 w-full gap-x-2">
                        <h2 class="text-2xl font-medium" style="display:inline-block;">Pro</h2>
                      </div>
                      <p class="mt-7"><span class="inline font-normal">Build bespoke applications collaboratively</span>, manage your Node-RED applications with improved security and control.</p>
                    </div>
                    <div class="flex flex-col content-start features mt-6 md:mt-3 w-full">
                      <ul class="ff-checklist font-light leading-7 mt-2">
                        <li>Everything in Starter</li>
                        <li>20 Team members</li>
                        <li>Team collaboration</li>
                        <li>MQTT Broker (8 clients to start)</li>
                        <li>Standard Support + SLA: 99.5&#37;</li>
                      </ul>
                    </div>
                    <note class="font-semibold mt-4">Includes 5 hosted instances or remote instances. Additional instances start at $35/month.
                    </note>
                    <div data-nosnippet class="flex">
                      <div class="mt-9 md:mt-6 md:text-left items-left w-full mb-11 md:mb-5 flex flex-row md:self-end">
                        <div class="text-left flex flex-row md:self-end">
                          <div class="mr-1">
                            <note class="note text-sm">Starting at</note>
                            <h2 class="self-end pb-1">
                              $425
                            </h2>
                          </div>
                          <note class="pl-2 text-sm leading-4 text-left self-end pb-2">
                            /month
                          </note>
                        </div>
                      </div>
                    </div>
                    <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full" :href="SIGNUP" onclick="capture('cta-join', {'position': 'primary'}, {'plan': 'cloud-team'})">
                      TRY FOR FREE
                    </a>
                  </div>
                </div>
                <div class="pricing-tile pricing-tile--enterprise md:h-full">
                  <div class="pricing-tile-background pb-6">
                    <div class="flex flex-col items-center text-left md:flex-row md:px-0 md:block">
                      <div class="flex flex-row justify-between mt-4 w-full gap-x-2">
                        <h2 class="text-2xl font-medium" style="display:inline-block;">Enterprise</h2>
                      </div>
                      <p class="mt-7">Operate <span class="inline font-normal">organization-wide</span> industrial applications with the highest security and integrity.</p>
                    </div>
                    <div class="flex flex-col content-start features mt-6 md:mt-3 w-full">
                      <ul class="ff-checklist font-light leading-7 mt-2">
                        <li>Everything in Pro</li>
                        <li>Includes Insights Mode</li>
                        <li>Unlimited team members</li>
                        <li>Single Sign-On</li>
                        <li>MQTT Broker (20 clients to start)</li>
                        <li>Enterprise support + SLA: 99.9&#37;</li>
                        <li>Device group management</li>
                      </ul>
                    </div>
                    <note class="font-semibold mt-4">Includes 20 hosted instances or remote instances.</note>
                    <div data-nosnippet class="flex">
                      <div class="mt-9 md:mt-6 md:text-left items-left w-full mb-11 md:mb-5 flex flex-row items-end md:self-end">
                        <h2 class="self-end pb-1">Let's Talk</h2>
                      </div>
                    </div>
                    <a class="md:self-end ff-btn ff-btn--primary uppercase align-baseline w-full" href="#contact-us" onclick="scrollToAnchor(event, 'contact-us'); capture('cta-contact-us', {'position': 'primary'}, {'plan': 'cloud-enterprise'})">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
            <!-- Self-hosted tiers -->
            <div class="contentSelfHosted hide m-auto transition duration-1000 md:min-h-[502px]">
              <div class="pricing-tiles flex flex-col md:grid md:max-lg lg:max-w-screen-xl mt-4 md:mt-0">
                <div class="pricing-tile md:h-full">
                  <div class="pricing-tile-background pb-6">
                    <div class="flex flex-col items-center text-left md:flex-row md:px-0 md:block">
                      <div class="flex flex-row justify-between mt-4 w-full gap-x-2">
                        <h2 class="text-2xl font-medium" style="display:inline-block;">Starter</h2>
                      </div>
                      <p class="mt-7">Download and self-host the <span class="inline font-normal">open-source edition</span> of FlowFuse. Ideal for evaluation and small deployments.</p>
                    </div>
                    <div class="flex flex-col content-start features mt-6 md:mt-3 w-full">
                      <ul class="ff-checklist font-light leading-7 mt-2">
                        <li>Open-source FlowFuse platform</li>
                        <li>Self-hosted deployment</li>
                        <li>Core instance & device management</li>
                        <li>5 team members</li>
                        <li>Community edition</li>
                      </ul>
                    </div>
                    <note class="font-semibold mt-4">Includes up to 5 hosted instances or remote instances.
                    </note>
                    <div data-nosnippet class="flex">
                      <div class="mt-9 md:mt-6 md:text-left items-left w-full mb-11 md:mb-5 flex flex-row md:self-end">
                        <h2 class="self-end pb-1">Free</h2>
                      </div>
                    </div>
                    <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full" href="https://flowfuse.com/docs/install/introduction/" onclick="capture('cta-install', {'position': 'primary'}, {'plan': 'sh-starter'})">
                      INSTALL NOW
                    </a>
                  </div>
                </div>
                <div class="pricing-tile md:h-full">
                  <div class="pricing-tile-background pb-6">
                    <div class="flex flex-col items-center text-left md:flex-row md:px-0 md:block">
                      <div class="flex flex-row justify-between mt-4 w-full gap-x-2">
                        <h2 class="text-2xl font-medium" style="display:inline-block;">Pro</h2>
                      </div>
                      <p class="mt-7"><span class="inline font-normal">Build bespoke applications collaboratively</span>, manage your Node-RED applications with improved security and control.</p>
                    </div>
                    <div class="flex flex-col content-start features mt-6 md:mt-3 w-full">
                      <ul class="ff-checklist font-light leading-7 mt-2">
                        <li>Everything in Starter</li>
                        <li>20 Team members</li>
                        <li>Team collaboration</li>
                        <li>Installation support</li>
                        <li>Dedicated Success Management</li>
                      </ul>
                    </div>
                    <note class="font-semibold mt-4">Includes 5 hosted instances or remote instances. Additional instances start at $35/month.
                    </note>
                    <div data-nosnippet class="flex">
                      <div class="mt-9 md:mt-6 md:text-left items-left w-full mb-11 md:mb-5 flex flex-row md:self-end">
                        <div class="text-left flex flex-row md:self-end">
                          <div class="mr-1">
                            <note class="note text-sm">Starting at</note>
                            <h2 class="self-end pb-1">
                              $425
                            </h2>
                          </div>
                          <note class="pl-2 text-sm leading-4 text-left self-end pb-2">
                            /month
                            <br>
                            <span class="text-xs text-gray-500">Billed annually</span>
                          </note>
                        </div>
                      </div>
                    </div>
                    <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full" href="/contact-us" onclick="capture('cta-contact-us', {'position': 'primary'}, {'plan': 'sh-team'})">
                      CONTACT US
                    </a>
                  </div>
                </div>
                <div class="pricing-tile md:h-full">
                  <div class="pricing-tile pricing-tile--enterprise md:h-full">
                    <div class="pricing-tile-background pb-6">
                      <div class="flex flex-col items-center text-left md:flex-row md:px-0 md:block">
                        <div class="flex flex-row justify-between mt-4 w-full gap-x-2">
                          <h2 class="text-2xl font-medium" style="display:inline-block;">Enterprise</h2>
                        </div>
                        <p class="mt-7">Operate <span class="inline font-normal">organization-wide</span> industrial applications with the highest security and integrity.</p>
                      </div>
                      <div class="flex flex-col content-start features mt-6 md:mt-3 w-full">
                        <ul class="ff-checklist font-light leading-7 mt-2">
                          <li>Everything in Pro</li>
                          <li>FlowFuse Expert for AI-assisted Node&#8209;RED development and MCP insights mode</li>
                          <li>Unlimited team members</li>
                          <li>Single Sign-On</li>
                          <li>Enterprise support</li>
                          <li>Dedicated Success Management</li>
                          <li>Device group management</li>
                        </ul>
                      </div>
                      <note class="font-semibold mt-4">Includes 20 hosted instances or remote instances.</note>
                      <div data-nosnippet class="flex">
                        <div class="mt-9 md:mt-6 md:text-left items-left w-full mb-11 md:mb-5 flex flex-row items-end md:self-end">
                          <h2 class="self-end pb-1">Let's Talk</h2>
                          <span class="pl-3 pb-2 text-sm text-gray-500">Trial period possible</span>
                        </div>
                      </div>
                      <a class="md:self-end ff-btn ff-btn--primary uppercase align-baseline w-full" href="#request-trial-license" onclick="scrollToAnchor(event, 'request-trial-license'); capture('cta-contact-us', {'position': 'primary'}, {'plan': 'sh-enterprise'})">Contact Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Feature Comparison -->
          <div id="feature-comparison" class="product w-full px-6 md:px-0 md:pt-6">
            <div class="flex flex-col items-center mb-14 md:mb-0 -mt-4">
              <a href="#feature-comparison-table" onclick="scrollToAnchor(event, 'feature-comparison-table')" aria-label="Scroll to feature comparison table">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </a>
            </div>
            <div class="container max-w-screen-lg m-auto text-center">
              <div id="feature-comparison-table" class="md:py-9 mt-10 mb-6">
                <h2><span class="text-indigo-600">Feature</span> Comparison</h2>
              </div>
              <div>
                <div v-for="table in tables" :key="table.hosting"
                     :class="table.hosting === 'cloud' ? 'contentCloud' : 'contentSelfHosted hide'"
                     class="transition duration-1000 max-w-full">
                  <!-- Column header -->
                  <div class="sticky top-[140px] sm:top-[164px] md:top-[116px] z-10 transition-colors duration-200" data-sticky-header>
                    <div class="overflow-hidden sm:overflow-visible" data-table-header>
                      <div class="ff-feature-table m-auto">
                        <ul :class="`${table.hosting} ff-feature-table-section`">
                          <li class="ff-feature--column-header">
                            <span class="sticky left-0 h-full bg-white" />
                            <label>
                              <div>Starter</div>
                            </label>
                            <label>Pro</label>
                            <label>Enterprise</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- Table body -->
                  <div class="overflow-x-auto sm:overflow-x-visible" data-table-body>
                    <div class="ff-feature-table ff-feature-table--body m-auto">
                      <ul v-for="section in table.sections" :key="section.label" :class="`${table.hosting} ff-feature-table-section`">
                        <li class="ff-feature--header sm:sticky sm:top-[208px] md:top-[160px]">
                          <span class="sticky left-0 h-full">{{ section.label }}</span>
                          <span />
                          <span />
                          <span />
                        </li>
                        <li v-for="row in section.rows" :key="row.id" class="ff-feature-row" :id="`ff-feature--${row.id}-${table.hosting}`">
                          <label v-if="row.description"
                                 :class="['sticky left-0 h-full', { 'pl-5 text-gray-500': row.subfeature }]"
                                 role="button" tabindex="0"
                                 @click="openInfo(row.id, table.hosting)"
                                 @keydown.enter.prevent="openInfo(row.id, table.hosting)"
                                 @keydown.space.prevent="openInfo(row.id, table.hosting)">
                            <template v-if="row.subfeature">└ </template>{{ row.label }}<span v-if="row.beta" class="ff-feature-note ml-1">Beta</span>
                            <i :id="`ff-info--${row.id}-${table.hosting}`" class="ff-icon min-w-[20px]" v-html="INFO_SVG" />
                          </label>
                          <label v-else :class="['sticky left-0 h-full pointer-events-none', { 'pl-5 text-gray-500': row.subfeature }]">
                            <template v-if="row.subfeature">└ </template>{{ row.label }}<span v-if="row.beta" class="ff-feature-note ml-1">Beta</span>
                          </label>
                          <span v-for="(cell, ci) in row.cells" :key="ci">
                            <template v-if="cell && cell.value === true">
                              <span v-if="cell.dimmed" class="opacity-40" v-html="CHECK_SVG" />
                              <span v-else v-html="CHECK_SVG" />
                            </template>
                            <template v-else-if="cell && cell.value === 'list'">
                              <template v-for="(opt, oi) in cell.options" :key="oi">{{ opt }}<br v-if="oi !== cell.options.length - 1"></template>
                            </template>
                            <template v-else-if="cell && cell.value">{{ cell.value }}</template>
                            <template v-else-if="cell && cell.tag">
                              <template v-if="cell.tagPrefix">{{ cell.tagPrefix }} </template><span :class="['ff-feature-note', { 'ml-1': cell.tagPrefix }]">{{ cell.tag }}</span>
                            </template>
                            <template v-else>
                              <span class="text-gray-300">&mdash;</span>
                            </template>
                          </span>
                        </li>
                      </ul>
                      <ul :class="`${table.hosting} ff-feature-table-section`">
                        <li class="ff-feature--column-buttons mt-6 h-10 gap-x-3">
                          <label class="align-baseline w-full text-center" />
                          <label v-for="(button, bi) in table.buttons" :key="bi">
                            <a :class="['ff-btn', bi === table.buttons.length - 1 ? 'ff-btn--primary' : 'ff-btn--primary-outlined', 'uppercase align-baseline w-full text-center']" :href="button.resolvedUrl" :onclick="button.onclick">{{ button.cta }}</a>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- Feature dialogs -->
                  <div id="feature-dialogs">
                    <div v-for="dialog in table.dialogs" :key="dialog.id"
                         :id="`ff-dialog--feature--${dialog.id}-${table.hosting}`"
                         class="ff-dialog-container" :class="{ active: openDialogs[`${dialog.id}-${table.hosting}`] }"
                         role="dialog" aria-modal="true" :aria-labelledby="`ff-dialog--header-${dialog.id}-${table.hosting}`">
                      <div class="ff-dialog-shadow" role="button" tabindex="0" aria-label="Close dialog"
                           @click="closeInfo(dialog.id, table.hosting)"
                           @keydown.enter.prevent="closeInfo(dialog.id, table.hosting)"
                           @keydown.space.prevent="closeInfo(dialog.id, table.hosting)" />
                      <div class="ff-dialog-modal">
                        <div :id="`ff-dialog--header-${dialog.id}-${table.hosting}`" class="ff-dialog-header">Feature: {{ dialog.label }}</div>
                        <div id="ff-dialog--content" class="ff-dialog-content">
                          <p>{{ dialog.description }}</p>
                          <p v-for="note in dialog.notes" :key="note.tier"><strong>{{ note.tier }}:</strong> {{ note.note }}</p>
                          <p v-if="dialog.docsLink"><a :href="dialog.docsLink" target="_blank" rel="noopener">Learn more</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="product w-full px-6 md:px-0 sm:mt-[67px]">
            <p class="max-w-screen-lg m-auto mt-12 text-center md:px-9 pb-12 border-b">
              At FlowFuse we understand that the security practises of our product
              are important to your company. We've prepared a <a href="/platform/security/">security statement</a>
              for you to understand the choices we've made.
            </p>
          </div>
        </div>
      </div>
      <!-- Social proof -->
      <div class="w-full py-7">
        <SocialProof />
      </div>
      <!-- Contact us -->
      <div id="contact-us" class="contentCloud hide w-full bg-gray-50 pt-0">
        <div class="w-full bg-gray-50 pb-12">
          <div class="container max-w-5xl m-auto grid grid-cols-1 md:grid-cols-2 px-6 pt-16 gap-x-16 gap-y-6">
            <div>
              <h3 class="w-full text-center md:text-left">
                Contact Us
              </h3>
              <p>
                To learn more about our plans, discuss your specific needs, or get advice on the best fit for your project, please fill out the form and we will get back to you as soon as possible.
              </p>
            </div>
            <div>
              <HubSpotForm form-id="d43ab79b-d075-4b63-ba5e-bf971ca0b86e" />
            </div>
          </div>
        </div>
      </div>
      <!-- Trial License -->
      <div id="request-trial-license" class="contentSelfHosted hide w-full bg-gray-50 pt-0">
        <div class="w-full bg-gray-50 pb-12">
          <div class="container max-w-5xl m-auto grid grid-cols-1 md:grid-cols-2 px-6 pt-16 gap-x-16 gap-y-6">
            <div>
              <h3 id="trial-license" class="w-full text-center md:text-left">
                30-day Trial License
              </h3>
              <p>
                Unlock the complete potential of FlowFuse with a complimentary 30-day Enterprise license. This trial gives you the chance to explore all the features and functionalities of FlowFuse in your own environment. To start your trial, simply fill out the form. Our sales team will reach out to you to discuss your needs and provide the license.
              </p>
            </div>
            <div>
              <HubSpotForm form-id="41e858e1-6756-45be-9082-3980237fa229" />
            </div>
          </div>
        </div>
      </div>
      <!-- Frequently Asked Questions -->
      <div class="px-6 md:px-14 max-w-screen-lg mx-auto">
        <div class="w-full py-16" id="faqs">
          <div class="m-auto sm:max-w-screen-lg">
            <h3 class="text-center">Frequently Asked <span class="text-indigo-600">Questions</span></h3>
            <label class="m-auto block max-w-lg md:max-w-none text-center"> If you have any questions not addressed here, don't hesitate to contact us through our <a href="/contact-us">Contact Us</a> page </label>
            <div class="mt-12 m-auto w-full ff-prose">
              <div class="prose max-w-none">
                <div v-for="(faq, i) in faqs" :key="i" class="w-full py-4" :class="{ 'border-b': i !== faqs.length - 1 }">
                  <h3 class="m-0">
                    <button class="question flex flex-row justify-between items-center w-full m-0 p-0 gap-6 cursor-pointer text-left bg-transparent border-0 text-lg font-semibold"
                            :id="`question-${i + 1}`" type="button" :aria-expanded="openFaqs[i] ? 'true' : 'false'"
                            :aria-controls="`answer-${i + 1}`" @click="toggleFaq(i)">
                      <span>{{ faq.question }}</span>
                      <div class="chevron transition-transform ease-in-out duration-300" :id="`chevron-${i + 1}`" :style="openFaqs[i] ? 'transform: rotate(180deg)' : ''">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ff-icon--down"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                      </div>
                    </button>
                  </h3>
                  <div class="answer px-6 mt-6" :class="{ hidden: !openFaqs[i] }" :id="`answer-${i + 1}`">
                    <p v-html="faq.answer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
