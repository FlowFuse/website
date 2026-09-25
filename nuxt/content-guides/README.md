---
navTitle: Documentation
metaTitle: Documentation
landing: true
meta:
   description: FlowFuse documentation. Get started on FlowFuse Cloud, on your own hardware or with your AI agent, then build, deploy and run industrial applications.
---

::docs-hero
# Start building with FlowFuse

Build industrial applications, then deploy and run them from cloud to edge.

#actions
- [:icon{name="i-lucide-play"} Getting started](/docs/user/introduction/)
- [:icon{name="i-lucide-book-open"} API reference](/docs/api/)

#aside
:::docs-choices{title="Where do you want to start?"}
::::docs-choice{label="FlowFuse Cloud" icon="i-lucide-cloud"}
FlowFuse runs the platform for you. Sign up, then build your applications and deploy them from your browser, with nothing to install. The quickest way to try FlowFuse.

- [Get started on FlowFuse Cloud](/docs/user/introduction/)
- [About FlowFuse Cloud](/docs/cloud/introduction/)
::::

::::docs-choice{label="Your own edge hardware, with the Device Agent" icon="i-lucide-cpu"}
Run your applications on your own machines at the edge, from an industrial PC to a Raspberry Pi, and manage them all from FlowFuse. The Device Agent connects each machine as a remote instance, to FlowFuse Cloud or to a self-hosted platform.

- [Connect your first machine](/docs/device-agent/quickstart/)
- [About the Device Agent](/docs/device-agent/introduction/)
::::

::::docs-choice{label="FlowFuse Self-Hosted" icon="i-lucide-server"}
Run the whole platform, and the applications on it, on your own infrastructure: on premises or in your own cloud, with Docker or Kubernetes. Talk to our sales team first: they help you choose the right licence and plan the installation with you.

- [Contact sales](/contact-us/)
- [About self-hosting](/docs/install/introduction/)
::::

::::docs-choice{label="Your AI agent" icon="i-lucide-bot"}
Connect Claude, ChatGPT, Copilot or another agent to FlowFuse over MCP. It can manage your teams and applications, and build and edit their flows, within the access you grant it.

- [Connect your agent](/docs/user/expert/third-party-agents/)
- [About FlowFuse MCP](/docs/user/mcp/)
::::

::::docs-choice{label="Not sure yet? Talk to us" icon="i-lucide-messages-square" open}
Tell us about the applications you want to build, and the sites and machines they run on. We work out with you which setup fits, then help you get it running. To understand the platform first, the Application Guide explains how FlowFuse applications are shaped.

- [Book a call](/book-demo/)
- [About FlowFuse applications](/docs/application-guide/)
::::
:::
::

::docs-section{eyebrow="Platform" title="Choose how you run FlowFuse"}
Where FlowFuse runs is the one choice that changes your first steps. After that, the documentation is the same.

:::card-group
::::card{title="FlowFuse Cloud" icon="i-lucide-cloud"}
Hosted by FlowFuse. Nothing to install: sign up and build in the browser.

- [:icon{name="i-lucide-info"} About FlowFuse Cloud](/docs/cloud/introduction/)
- [:icon{name="i-lucide-play"} Get started on FlowFuse Cloud](/docs/user/introduction/)
- [:icon{name="i-lucide-receipt"} Billing](/docs/cloud/billing/)
::::

::::card{title="Self-hosted" icon="i-lucide-server"}
The platform on your own infrastructure, with Docker, Kubernetes or a single machine. Start by talking to our sales team.

- [:icon{name="i-lucide-messages-square"} Contact sales](/contact-us/)
- [:icon{name="i-lucide-signpost"} Choosing how to install](/docs/install/introduction/)
- [:icon{name="i-lucide-container"} Docker](/docs/install/docker/)
- [:icon{name="i-lucide-ship-wheel"} Kubernetes](/docs/install/kubernetes/)
- [:icon{name="i-lucide-settings"} Configuring FlowFuse](/docs/install/configuration/)
::::
:::

:::docs-tiles
- [:icon{name="i-lucide-cpu"} Remote instances with the Device Agent](/docs/device-agent/)
- [:icon{name="i-lucide-arrow-right-left"} Moving from plain Node-RED](/docs/migration/)
- [:icon{name="i-lucide-hard-drive"} Hardware guides](/docs/hardware/introduction/)
:::
::

::docs-section{eyebrow="Documentation" title="Find what you need" cols="4"}
Four kinds of page, for four different moments.

:::card-group
::::card{title="Learn by building" icon="i-lucide-graduation-cap"}
Lessons that take you from nothing to something working.

- [Build a weather dashboard](/blog/2025/12/getting-weather-data-in-node-red/)
- [Build a machine downtime tracker](/blog/2026/07/build-downtime-logger/)
- [Build a defect tracking dashboard](/blog/2026/07/defect-and-quality-monitoring/)
::::

::::card{title="Get something done" icon="i-lucide-list-checks"}
Task guides, for when you know what you want.

- [Working in FlowFuse](/docs/user/)
- [Working in Node-RED](/docs/node-red/)
- [MCP in your flows](/docs/flowfuse-nodes/mcp/)
- [Administering FlowFuse](/docs/admin/)
::::

::::card{title="Look something up" icon="i-lucide-book-open"}
Details you come back for rather than read once.

- [Instance states](/docs/user/instance-states/)
- [FlowFuse nodes](/docs/flowfuse-nodes/)
- [Node-RED core nodes](/docs/node-red/core-nodes/)
- [API](/docs/api/)
::::

::::card{title="Understand FlowFuse" icon="i-lucide-lightbulb"}
What FlowFuse is, and how to shape an application on it.

- [FlowFuse concepts](/docs/user/concepts/)
- [Application Guide](/docs/application-guide/)
- [Node-RED Guide](/docs/node-red-guide/)
::::
:::
::

::docs-section{eyebrow="Journey" title="From first flow to production"}
Follow the lifecycle, or jump to what you need.

:::steps{level="3"}
### Get started
Your first application and its first flow, and the people you build it with.

::::docs-tiles
- [:icon{name="i-lucide-play"} Getting started](/docs/user/introduction/)
- [:icon{name="i-lucide-layout-dashboard"} Your first dashboard](/blog/2025/12/getting-weather-data-in-node-red/)
- [:icon{name="i-lucide-shapes"} FlowFuse concepts](/docs/user/concepts/)
- [:icon{name="i-lucide-users"} Teams](/docs/user/team/)
- [:icon{name="i-lucide-arrow-right-left"} Move from Node-RED](/docs/migration/)
::::

### Build
The flows, dashboards and data your application runs on.

::::docs-tiles
- [:icon{name="i-lucide-gauge"} Dashboards](/docs/user/dashboards/)
- [:icon{name="i-lucide-sparkles"} FlowFuse Expert](/docs/user/expert/)
- [:icon{name="i-lucide-bot"} Connect your own agent](/docs/user/expert/third-party-agents/)
- [:icon{name="i-lucide-table"} FlowFuse Tables](/docs/user/ff-tables/)
- [:icon{name="i-lucide-radio-tower"} Team Broker](/docs/user/teambroker/)
- [:icon{name="i-lucide-variable"} Environment variables](/docs/user/envvar/)
- [:icon{name="i-lucide-library"} Shared team library](/docs/user/shared-library/)
::::

### Deploy
Promote tested work to production, in the cloud and at the edge.

::::docs-tiles
- [:icon{name="i-lucide-history"} Snapshots](/docs/user/snapshots/)
- [:icon{name="i-lucide-git-branch"} DevOps pipelines](/docs/user/devops-pipelines/)
- [:icon{name="i-lucide-cpu"} Deploy to remote instances](/docs/device-agent/deploy/)
- [:icon{name="i-lucide-boxes"} Remote instance groups](/docs/user/device-groups/)
- [:icon{name="i-lucide-copy"} High availability](/docs/user/high-availability/)
- [:icon{name="i-lucide-globe"} Custom hostnames](/docs/user/custom-hostnames/)
::::

### Operate
Access, visibility and cost, once it runs.

::::docs-tiles
- [:icon{name="i-lucide-shield"} Roles and permissions](/docs/user/role-based-access-control/)
- [:icon{name="i-lucide-key-round"} Single sign-on](/docs/admin/sso/)
- [:icon{name="i-lucide-scroll-text"} Logging](/docs/user/logs/)
- [:icon{name="i-lucide-activity"} Monitoring](/docs/admin/monitoring/)
- [:icon{name="i-lucide-settings"} Instance settings](/docs/user/instance-settings/)
- [:icon{name="i-lucide-receipt"} Billing](/docs/cloud/billing/)
::::
:::
::

::docs-section{eyebrow="Resources" title="Keep learning" cols="3"}
:::card-group
::::card{icon="i-lucide-newspaper"}
[Blog :icon{name="i-lucide-arrow-up-right"}](/blog/)

Articles, how-tos and product news.
::::

::::card{icon="i-lucide-layout-template"}
[Blueprint library :icon{name="i-lucide-arrow-up-right"}](/blueprints/)

Ready-made flows to start an application from.
::::

::::card{icon="i-lucide-star"}
[What's new :icon{name="i-lucide-arrow-up-right"}](/changelog/)

Every release, feature by feature.
::::

::::card{icon="i-lucide-presentation"}
[Webinars :icon{name="i-lucide-arrow-up-right"}](/webinars/)

Live and recorded sessions with the team.
::::

::::card{icon="i-lucide-plug"}
[Integrations :icon{name="i-lucide-arrow-up-right"}](/integrations/)

Certified nodes for the systems you connect to.
::::

::::card{icon="i-lucide-youtube"}
[YouTube :icon{name="i-lucide-arrow-up-right"}](https://www.youtube.com/channel/UCbBzP8NZbv3WDtlt4UouA-g)

Walkthroughs and recorded talks.
::::
:::
::

::docs-section{eyebrow="Help" title="Ask a question" cols="3"}
Ask FlowFuse Expert, which answers from these docs, the blog and more. Or put your question to our support team, the community, or the troubleshooting guides.

:::docs-columns
::::ff-expert-ask
::::

::::card{icon="i-lucide-headset"}
[Talk to our support team :icon{name="i-lucide-arrow-up-right"}](/support/)

Search the Help Center or submit a ticket. For Cloud and Enterprise customers.
::::
:::

:::card-group
::::card{icon="i-lucide-bug"}
[Debugging Node-RED](/docs/debugging/)

Find out why a flow or an instance is not behaving.
::::

::::card{icon="i-lucide-messages-square"}
[Community forum](/docs/community-support/)

Ask the FlowFuse and Node-RED community.
::::

::::card{icon="i-lucide-activity"}
[Platform status :icon{name="i-lucide-arrow-up-right"}](https://status.flowfuse.com/)

FlowFuse Cloud availability.
::::
:::
::
