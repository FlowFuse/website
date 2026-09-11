<script setup lang="ts">
// /platform/ - the page a technical evaluator gets sent to after the homepage.
//
// The brief, from sales: a demo has done its job if the viewer leaves with two
// things, how FlowFuse distributes code and what the major components are. The
// homepage speaks in industry terms (edge devices, hosted cloud, one app on
// every site); this page is one level down and speaks in ours, and the docs go
// deeper still. So the spine here is deliberately the Application Guide's, not
// a feature list: Build, Deliver, Run, Connect, Govern, with every stage
// linking into the guide or the docs page that owns it.
//
// A new page, so Nuxt rather than a .njk under src/ - nuxt/lib/legacy-pages.test.mjs
// fails a PR that adds one of those.
useSeoMeta({
    title: 'The FlowFuse Platform',
    description: 'What the FlowFuse platform is made of and how the pieces fit together: the major components, the two ways it distributes application code, and where applications run.',
    ogUrl: 'https://flowfuse.com/platform/',
    twitterSite: '@FlowFuseinc',
})

const capture = useCapture()

// The same nodes the Application Guide's Foundations page draws, so the two
// pages cannot drift into showing different architectures. Rendered live by
// <ArchDiagram> rather than pointing at one of the orphaned SVG exports left
// in nuxt/public/images/application-guide/ by the retired microsite.
const BIG_PICTURE = {
    nodes: [
        { id: 'users', label: 'Users', sub: 'operators & teams', accent: 'slate', many: true, span: 2, col: 2, row: 1 },
        { id: 'hosted', label: 'Hosted Instance', sub: 'one or many · cloud or your server', accent: 'indigo', many: true, col: 1, row: 2 },
        { id: 'dash', label: 'Dashboard', sub: 'live operator UI', accent: 'blue', col: 2, row: 2 },
        { id: 'broker', label: 'Team Broker', sub: 'MQTT message bus', accent: 'teal', col: 3, row: 2 },
        { id: 'tables', label: 'FlowFuse Tables', sub: 'shared SQL database', accent: 'green', col: 4, row: 2 },
        { id: 'remote', label: 'Remote Instance', sub: 'one per device, across sites', accent: 'slate', many: true, span: 2, col: 2, row: 3 },
    ],
    groups: [
        { id: 'platform', label: 'FlowFuse Platform - runs and connects your instances', accent: 'indigo', nodes: ['hosted', 'dash', 'broker', 'tables'] },
        { id: 'agent', label: 'Device Agent - bridges platform to the edge', accent: 'red', nodes: ['remote'] },
    ],
    edges: [
        { from: 'users', to: 'platform', label: 'access' },
        { from: 'agent', to: 'platform', label: 'managed by' },
    ],
}

// The component roll-call, as labelled tiles rather than prose. Every entry
// goes somewhere: an existing product page or the docs page that defines it.
// No entry without a destination, which is the check that keeps this list from
// growing into marketing vocabulary.
const COMPONENTS = [
    { label: 'Hosted Instances', icon: 'i-lucide-cloud', note: 'Node-RED runtimes on FlowFuse infrastructure or your own server.', to: '/docs/user/concepts/' },
    { label: 'Remote Instances', icon: 'i-lucide-cpu', note: 'The same runtime on your edge hardware, via the Device Agent.', to: '/platform/device-agent/' },
    { label: 'Dashboards', icon: 'i-lucide-layout-dashboard', note: 'The operator-facing UI, built from the same flows.', to: '/platform/dashboard/' },
    { label: 'Team Broker', icon: 'i-lucide-radio', note: 'A managed MQTT bus that ties sites together.', to: '/docs/user/teambroker/' },
    { label: 'FlowFuse Tables', icon: 'i-lucide-database', note: 'One shared operational data store.', to: '/docs/user/ff-tables/' },
    { label: 'Snapshots', icon: 'i-lucide-camera', note: 'A versioned, restorable point in time for an application.', to: '/docs/user/snapshots/' },
    { label: 'Pipelines', icon: 'i-lucide-git-branch', note: 'Promote a snapshot from development to production.', to: '/docs/user/devops-pipelines/' },
    { label: 'Team Library', icon: 'i-lucide-library', note: 'Flows, subflows and nodes shared across the team.', to: '/docs/user/shared-library/' },
]

// Declared rather than inferred so `diagrams` can be optional: only the Deliver
// stage draws one, and reading `item.diagrams` off an inferred union of five
// differently-shaped literals is a type error.
interface StageDiagram {
    caption: string
    nodes: Record<string, unknown>[]
    edges: string[]
}
interface Stage {
    id: string
    label: string
    icon: string
    heading: string
    summary: string
    diagrams?: StageDiagram[]
    items: { name: string, detail: string, to: string }[]
}

// The five stages. Order is the order a team meets them: build something, get
// it to every place that should run it, decide where that runs, wire it to the
// data, then hold all of it to a policy.
const STAGES: Stage[] = [
    {
        id: 'build',
        label: 'Build',
        icon: 'i-lucide-pencil-ruler',
        heading: 'Build.',
        summary: 'One editor, one runtime. Standard Node-RED, so the flows stay yours and the skills already exist.',
        items: [
            { name: 'Node-RED', detail: 'The open runtime and flow editor underneath everything. FlowFuse runs standard Node-RED, which is what keeps an application portable and the foundation yours.', to: '/node-red/' },
            { name: 'FlowFuse Expert', detail: 'Describe what you need and get starting flows, Function node code, SQL and dashboard UI in the editor, plus a plain-language explanation of any flow you inherited.', to: '/ai/' },
            { name: 'Blueprints', detail: 'Working starting points for common industrial problems, deployable as they are and then adapted, instead of starting from a blank canvas.', to: '/blueprints/' },
            { name: 'FlowFuse Dashboard', detail: 'The operator-facing interface, built from the same flows rather than bolted on from a separate tool, so the UI and the logic ship together.', to: '/platform/dashboard/' },
        ],
    },
    {
        id: 'deliver',
        label: 'Deliver',
        icon: 'i-lucide-package-check',
        heading: 'Deliver.',
        summary: 'Two ways code moves. Promote a whole application, or publish the parts worth standardising. This is the decision that makes an estate scale or not.',
        diagrams: [
            {
                caption: 'Whole app: one snapshot promoted to every target, each supplying its own configuration.',
                nodes: [
                    { id: 'editor', label: 'Editor', sub: 'built once', accent: 'slate' },
                    { id: 'snapshot', label: 'Snapshot', sub: 'versioned artifact', accent: 'indigo' },
                    { id: 'pipeline', label: 'Pipeline', sub: 'dev, staging, production', accent: 'indigo' },
                    { id: 'targets', label: 'Instances & groups', sub: 'own environment variables', accent: 'slate', many: true },
                ],
                edges: ['editor>snapshot', 'snapshot>pipeline', 'pipeline>targets'],
            },
            {
                caption: 'Pieces: shared blocks the central team maintains and each site assembles from.',
                nodes: [
                    { id: 'subflow', label: 'Subflow or node', sub: 'worth standardising', accent: 'slate' },
                    { id: 'package', label: 'Package', sub: 'versioned', accent: 'indigo' },
                    { id: 'library', label: 'Team Library', sub: 'installed as a dependency', accent: 'indigo' },
                    { id: 'local', label: 'Local applications', sub: 'assembled per site', accent: 'slate', many: true },
                ],
                edges: ['subflow>package', 'package>library', 'library>local'],
            },
        ],
        items: [
            { name: 'Whole app', detail: 'Capture the application as a snapshot and promote that exact snapshot through development, staging and production, and out to a device group. Each target supplies its own environment variables, so one artifact runs at every site without an edit.', to: '/docs/application-guide/app-delivery-methods/' },
            { name: 'Pieces', detail: 'Publish the parts worth standardising, subflows and custom nodes, as packages into a library your teams install from. Local teams keep ownership of their own application while the central team still controls the parts that matter.', to: '/docs/user/shared-library/' },
            { name: 'Hardware apps', detail: 'The three shapes an application takes on a device: a sealed Packaged App identical everywhere, a Configurable App tuned by a per-site config file, or an Edge Building Block wired into flows the site owns.', to: '/docs/application-guide/app-delivery-methods/hardware-apps/' },
            { name: 'Software apps', detail: 'The three shapes it takes on an instance: a headless Packaged App, a user-facing Data-Driven App backed by a store, or a Shared Building Block many instances embed.', to: '/docs/application-guide/app-delivery-methods/software-apps/' },
        ],
    },
    {
        id: 'run',
        label: 'Run',
        icon: 'i-lucide-server',
        heading: 'Run.',
        summary: 'The same runtime next to the equipment, on-prem and in the cloud, addressed as a fleet rather than one machine at a time.',
        items: [
            { name: 'Hosted Instances', detail: 'Managed Node-RED on FlowFuse infrastructure or on your own server, with the platform handling the runtime so your team handles the application.', to: '/docs/user/concepts/' },
            { name: 'Remote Instances', detail: 'The Device Agent runs the same applications on edge hardware, including networks with no inbound access, so a plant behind a firewall is still a deployment target.', to: '/platform/device-agent/' },
            { name: 'Device groups', detail: 'Devices addressed as a fleet, so the target of a deployment can be a hundred machines rather than one, and a rollback is one action rather than a hundred.', to: '/docs/user/device-groups/' },
            { name: 'OT, IT and IIoT architectures', detail: 'The worked layouts for each: edge with the server in IT or a DMZ, air-gapped sites, on-prem and per-site cloud hosting, and a Unified Namespace across every site.', to: '/docs/application-guide/architectures/' },
        ],
    },
    {
        id: 'connect',
        label: 'Connect',
        icon: 'i-lucide-share-2',
        heading: 'Connect.',
        summary: 'What the application reads and writes. Two data services are built into every install, and anything else is exposed to the fleet the same way.',
        items: [
            { name: 'Team Broker and UNS', detail: 'A managed MQTT broker in every install, so a Unified Namespace does not start with procuring infrastructure. Edge publishes once and many subscribe, across sites.', to: '/docs/user/teambroker/' },
            { name: 'FlowFuse Tables', detail: 'A relational store built in and exposed to every instance, for applications that need to keep state rather than pass it on.', to: '/docs/user/ff-tables/' },
            { name: 'Integrations', detail: 'Industrial protocols and enterprise systems, from OPC UA and Modbus through to ERPs, databases and cloud APIs.', to: '/integrations/' },
            { name: 'Project Nodes', detail: 'Instance-to-instance messaging without standing up a broker or opening a port, which is also how you expose any other store or service to the fleet.', to: '/docs/user/projectnodes/' },
        ],
    },
    {
        id: 'govern',
        label: 'Govern',
        icon: 'i-lucide-shield-check',
        heading: 'Govern.',
        summary: 'One place to say who may do what, and to show afterwards what actually happened.',
        items: [
            { name: 'Role-based access control', detail: 'Who can edit, who can deploy, who can only look, per team and per application, enforced by the platform on every call rather than by convention.', to: '/docs/user/role-based-access-control/' },
            { name: 'Single sign-on', detail: 'SAML and LDAP against the identity provider you already run, so joining and leaving the platform follows joining and leaving the company.', to: '/docs/admin/sso/' },
            { name: 'Audit logs', detail: 'A record of who changed and deployed what, at team and instance level, which is the part that turns a claim about control into evidence.', to: '/docs/user/logs/' },
            { name: 'Self-hosted and certified', detail: 'SOC 2 Type 1 and Type 2, with a self-hosted option for sites where nothing may leave the perimeter.', to: '/platform/security/' },
        ],
    },
]

// The four doors out. Deliberately not a fifth: the closing CTA below is the
// sales path, and these four are the self-directed ones.
const NEXT = [
    { name: 'Documentation.', detail: 'Reference and how-to for every component on this page.', action: 'Read the docs', icon: 'i-lucide-book-open', to: '/docs/' },
    { name: 'Application guide.', detail: 'The decisions behind an application, before you build it.', action: 'Open the guide', icon: 'i-lucide-compass', to: '/docs/application-guide/' },
    { name: 'Blueprints.', detail: 'Working applications for common industrial problems.', action: 'Browse blueprints', icon: 'i-lucide-layout-template', to: '/blueprints/' },
    { name: 'Professional services.', detail: 'Our engineers on your first application, with you.', action: 'See services', icon: 'i-lucide-users', to: '/professional-services/' },
]
</script>

<template>
  <div class="w-full bg-white">
    <!-- HERO: eyebrow, one claim, the canonical one-sentence definition. The
         definition sentence is the Application Guide's own, verbatim, because
         sales quotes it and two versions of it would be one too many. -->
    <section class="w-full border-b border-gray-200 px-6">
      <div class="mx-auto max-w-screen-lg py-16 sm:py-24">
        <p class="m-0 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Platform</p>
        <h1 class="mt-8 mb-0 max-w-4xl text-5xl font-medium leading-[1.05] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">Build it once. Run it everywhere.</h1>
        <p class="mt-8 max-w-2xl text-lg text-gray-600">
          FlowFuse is an application platform for building, deploying and managing industrial applications on Node-RED, across IT, OT and IIoT, from the edge to the cloud, governed from one place.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <CtaBookDemo variant="highlight" position="platform-hero" />
          <a
            href="/docs/application-guide/"
            class="inline-flex items-center gap-2 font-semibold text-indigo-600 no-underline hover:text-indigo-800 hover:no-underline"
            @click="capture('cta-application-guide', { position: 'platform-hero' })"
          >
            Read the application guide
            <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <!-- OVERVIEW: the two takeaways, then the architecture and the component
         roll-call that back them. The diagram sits on a flat brand panel so the
         page has one moment of colour before the stages, which are all rules
         and type. -->
    <section class="w-full border-b border-gray-200 bg-gray-50 px-6 py-16 sm:py-24">
      <div class="mx-auto max-w-screen-lg">
        <p class="m-0 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Overview</p>
        <h2 class="mt-6 max-w-3xl tracking-tight">
          Two things to take away.
        </h2>
        <p class="mt-6 max-w-2xl text-gray-600">
          How application code is distributed across your sites, and the major components that carry it. Everything below is one of those two.
        </p>

        <div class="mt-12 bg-indigo-600 p-4 sm:p-10">
          <div class="ff-diagram-plain overflow-x-auto bg-white p-4 sm:p-8">
            <ArchDiagram :nodes="BIG_PICTURE.nodes" :groups="BIG_PICTURE.groups" :edges="BIG_PICTURE.edges" />
          </div>
          <p class="m-0 mt-4 text-sm text-indigo-100">
            Where each piece sits: instances running your applications, the Device Agent bridging the platform to the edge, and the broker and database every instance can reach.
          </p>
        </div>

        <!-- Labelled tiles rather than prose, one hairline grid so the roll-call
             reads as one platform. Grid gap of 1px over a gray background is
             what draws the rules, so no per-tile borders to keep aligned. -->
        <div class="mt-12 grid grid-cols-1 gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          <a
            v-for="component in COMPONENTS"
            :key="component.label"
            :href="component.to"
            class="group flex flex-col gap-3 bg-white p-6 no-underline hover:bg-indigo-50/60 hover:no-underline"
            @click="capture('cta-platform-component', { position: 'platform-components', component: component.label })"
          >
            <UIcon :name="component.icon" class="size-5 text-indigo-600" aria-hidden="true" />
            <span class="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-gray-900">{{ component.label }}</span>
            <span class="text-sm text-gray-600">{{ component.note }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- STAGES: the five, behind the boxed contents list. Same ScrollSpySections
         as /product and /integrations/opcua, in its boxed variant, and one
         `item` slot for all five since every stage renders identically. -->
    <section class="w-full border-b border-gray-200 px-6 py-16 sm:py-24">
      <div class="mx-auto max-w-screen-lg">
        <p class="m-0 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">How it works</p>
        <h2 class="mt-6 max-w-3xl tracking-tight">From a flow in an editor to the same application at every site.</h2>
        <p class="mt-6 max-w-2xl text-gray-600">
          Five stages, in the order a team meets them. Each one links into the guide or the documentation that owns it.
        </p>

        <ScrollSpySections
          :items="STAGES"
          variant="boxed"
          aria-label="Platform stages"
          class="mt-16"
          gap-class="gap-20"
          divider-class="pt-20 border-t border-gray-200"
        >
          <template #item="{ item, index }">
            <UIcon :name="item.icon" class="size-6 text-indigo-600" aria-hidden="true" />
            <p class="mt-6 mb-0 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <span>{{ item.label }}</span>
            </p>
            <h3 class="mt-6 mb-0 text-4xl font-medium tracking-tight text-gray-900 md:text-5xl">{{ item.heading }}</h3>
            <p class="mt-6 mb-0 max-w-2xl text-lg text-gray-600">{{ item.summary }}</p>

            <!-- The two code-distribution paths, drawn rather than described:
                 this is the takeaway the page exists for, so it gets the one
                 picture inside the stages. `ff-diagram-plain` strips the frame
                 FlowDiagram's own global .ag-diagram rule brings, so the frame
                 here is this page's and does not depend on which diagram
                 component happened to inject that stylesheet. -->
            <div v-if="item.diagrams" class="mt-10 flex flex-col gap-6">
              <figure v-for="diagram in item.diagrams" :key="diagram.caption" class="ff-diagram-plain m-0 overflow-x-auto border border-gray-200 bg-white p-4 sm:p-6">
                <FlowDiagram :nodes="diagram.nodes" :edges="diagram.edges" align="left" />
                <figcaption class="mt-3 text-sm text-gray-500">{{ diagram.caption }}</figcaption>
              </figure>
            </div>

            <!-- gap-px over a gray ground again, so the stage's items sit in the
                 same hairline grid as the component tiles above. -->
            <div class="mt-10 grid grid-cols-1 gap-px border border-gray-200 bg-gray-200 md:grid-cols-2">
              <div v-for="entry in item.items" :key="entry.name" class="flex flex-col gap-3 bg-white p-6">
                <span class="text-xl font-medium text-gray-900">{{ entry.name }}</span>
                <p class="m-0 flex-1 text-gray-600">{{ entry.detail }}</p>
                <a
                  :href="entry.to"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 no-underline hover:text-indigo-800 hover:no-underline"
                  @click="capture('cta-platform-stage-item', { position: `platform-${item.id}`, item: entry.name })"
                >
                  Learn more
                  <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </template>
        </ScrollSpySections>
      </div>
    </section>

    <!-- BUILD WHAT'S NEXT: the self-directed doors out, on the page's one dark
         band so it reads as an end rather than a sixth stage. Vertical rules
         between the four, drawn by the same gap-px trick over gray-700. -->
    <section class="w-full bg-gray-900 px-6 py-16 sm:py-24">
      <div class="mx-auto max-w-screen-lg">
        <h2 class="mt-0 max-w-2xl tracking-tight text-white">Build what&rsquo;s next.</h2>
        <div class="mt-12 grid grid-cols-1 gap-px border border-gray-700 bg-gray-700 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="door in NEXT" :key="door.name" class="flex flex-col gap-4 bg-gray-900 p-6">
            <UIcon :name="door.icon" class="size-5 text-gray-400" aria-hidden="true" />
            <span class="text-2xl font-medium tracking-tight text-white">{{ door.name }}</span>
            <p class="m-0 flex-1 text-sm text-gray-400">{{ door.detail }}</p>
            <a
              :href="door.to"
              class="inline-flex w-fit items-center gap-2 bg-gray-800 px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-gray-700 hover:no-underline"
              @click="capture('cta-platform-next', { position: 'platform-next', door: door.name })"
            >
              {{ door.action }}
              <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CLOSING CTA: the same block that closes /product/ and /ai/, so the
         pages end the same way rather than each inventing a sign-off. -->
    <div class="w-full px-6 py-12 sm:py-16">
      <div class="mx-auto max-w-screen-lg">
        <div class="ff-get-started-bg flex flex-col items-center gap-8 rounded-xl px-9 py-12 text-center">
          <p class="m-0 text-4xl font-medium text-white sm:text-5xl">See it on your operations</p>
          <p class="m-0 max-w-2xl text-xl font-light text-indigo-50">Talk to an engineer about which delivery method fits your estate, or explore pricing to find the right fit.</p>
          <div class="flex flex-col items-center gap-4 sm:flex-row">
            <CtaBookDemo variant="highlight" position="platform-get-started" />
            <CtaPricing variant="ghost" color="white" position="platform-get-started" icon="i-lucide-arrow-right" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* FlowDiagram ships a global `.ag-diagram` rule (white card, border, radius,
   1.75rem block margin) that also lands on ArchDiagram, because both render
   into the same class. Whether it applies at all depends on which of the two
   is on the page, which is not a basis for a layout. Both diagram frames on
   this page are drawn by the wrapper element instead, so the inner card is
   reset to nothing. Unscoped on purpose: the SVG arrives via v-html and never
   carries a scope attribute. */
.ff-diagram-plain .ag-diagram {
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
}
</style>
