<script setup lang="ts">
// Ported from src/platform/dashboard.njk (11ty), which this replaces. Same page, same
// copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The live theme preview and the Dashboard 1.0 importer become
//    <DashboardThemePreview> and <DashboardMigrationImporter>, so this file reads as its
//    sections. Both replace DOM scripts with reactive state; the importer's comment
//    records the drag-and-drop bug that move fixes.
//  - dashboard.resources came from src/_data/dashboard.json, which only this page read.
//    It is the RESOURCES list below. (dashboard.json also held a `section2` array that no
//    template referenced any more; it is not carried over.)
//  - The three tutorial <lite-youtube> elements become <LiteYoutube>.
//  - The hero and footer CTAs were hand-written <a class="ff-btn"> links, so the footer
//    "Book a Demo" fired capture('cta-book-demo') from an inline onclick and the others
//    fired nothing. They are <CtaBookDemo>, <CtaPricing> and <CtaSignUp> now, which is
//    where those three destinations' copy and events are defined.
const RESOURCES = [
    { url: '/blog/2024/03/dashboard-getting-started/', title: 'Getting started with FlowFuse Dashboard', image: '/blog/2024/03/images/getting-started-with-dashboard-2.png' },
    { url: '/webinars/2024/node-red-dashboard-multi-user/', title: 'Multi-user dashboards: a screen per person', image: '/images/webinars/multi-user-dashboard-with-node-red-dashboard-2-0-webinar-2024-february.jpg' },
    { url: '/ebooks/ultimate-guide-to-building-applications-with-flowfuse-dashboard-for-node-red/', title: 'The ultimate guide to building applications with FlowFuse Dashboard', image: '/images/ebooks/ebook_dashboard.png' },
]

const TUTORIALS = [
    { id: 'DFNv91TTt68', title: 'Getting Started — Node-RED & The FlowFuse Dashboard' },
    { id: 'Ecno0EuLyKQ', title: 'Visualising Data with The FlowFuse Dashboard' },
    { id: '7bj_DFnRtU8', title: 'Writing Custom Templates in The FlowFuse Dashboard' },
]

const GOVERNANCE_TAGS = [
    { label: 'Application-level RBAC', href: '/docs/user/role-based-access-control/' },
    { label: 'Endpoint security', href: '/docs/user/instance-settings/' },
    { label: 'Multi-user dashboards', href: 'https://dashboard.flowfuse.com/user/multi-tenancy.html' },
    { label: 'DevOps pipelines', href: '/docs/user/devops-pipelines/' },
    { label: 'Hosting & HA', href: '/docs/user/high-availability/' },
]

const WIDGET_TAGS = [
    'Chart', 'Gauge', 'Table', 'Form', 'Button', 'Button group', 'Text', 'Text input',
    'Number input', 'Dropdown', 'Radio group', 'Slider', 'Switch', 'Markdown', 'Template',
    'Notification', 'Progress', 'File input', 'Control', 'Audio', 'Spacer',
].map(label => ({
    label,
    href: `https://dashboard.flowfuse.com/nodes/widgets/ui-${label.toLowerCase().replace(/ /g, '-')}`,
}))

const OPEN_TAGS = [
    { label: 'Installs into any Node-RED instance', href: 'https://dashboard.flowfuse.com/' },
    { label: 'Open source', href: 'https://github.com/FlowFuse/node-red-dashboard' },
    { label: 'Community widget ecosystem' },
    { label: 'Dashboard 1.0 migration', href: '#migration-service' },
]

const FAST_TAGS = [
    { label: '5 theme presets' },
    { label: 'WCAG AA contrast' },
    { label: 'Default chart sizing' },
    { label: 'Widget fit & alignment' },
    { label: 'Localised date columns' },
    { label: 'Custom brand colours', href: 'https://dashboard.flowfuse.com/nodes/config/ui-theme.html' },
]

const CONVERTIBLE_NODES = [
    'ui_tab', 'ui_link', 'ui_group', 'ui_text', 'ui_text_input',
    'ui_slider', 'ui_switch', 'ui_form', 'ui_dropdown', 'ui_button',
]

const PLATFORM = [
    { eyebrow: 'For OT teams', title: 'FlowFuse Edge', href: '/product/edge/', body: 'Connect PLCs, machines and controllers, and standardise automation across every site.', go: 'Explore Edge' },
    { eyebrow: 'For IT & integration teams', title: 'FlowFuse Hub', href: '/product/hub/', body: 'Connect ERPs, databases and cloud APIs into one governed system.', go: 'Explore Hub' },
    { eyebrow: 'For device fleets', title: 'FlowFuse Fleet', href: '/product/fleet/', body: 'Push flows, ship updates and roll back remotely across thousands of distributed devices.', go: 'Explore Fleet' },
]

const META_DESCRIPTION = 'Build a production dashboard or IIoT dashboard for Node-RED without writing CSS. Five WCAG AA themes, included with FlowFuse Edge, Hub, and Fleet.'

useSeoMeta({
    title: 'Production and IIoT Dashboard platform',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    keywords: 'production dashboard, IIoT dashboard, industrial IoT dashboard, factory dashboard, operations dashboard, machine dashboard, industrial dashboard, Node-RED dashboard',
    ogUrl: 'https://flowfuse.com/platform/dashboard/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full px-6">
      <div class="max-w-md sm:max-w-screen-lg mx-auto pt-10 md:pt-12">
        <div class="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] gap-10 md:gap-12 items-stretch">
          <div class="flex flex-col gap-5 text-center md:text-left">
            <h1 class="font-medium m-0 max-sm:text-4xl">
              Build Industrial Production Dashboards with
              <span class="text-indigo-600">The FlowFuse Dashboard.</span>
            </h1>
            <p class="text-lg text-gray-500 font-light max-w-xl mx-auto md:mx-0 m-0">
              Deploy a full production dashboard in seconds, unifying
              your factory operations and machine metrics into a single view. No more wasted time
              searching for reports or filling out a spreadsheet - just clean data for all your
              machines, sites, and systems. This means reduced operational costs, better
              visualisation, and deeper context for everyone.
            </p>
            <p class="text-lg text-gray-500 font-light max-w-xl mx-auto md:mx-0 m-0">
              The FlowFuse Dashboard is included
              with <NuxtLink class="ffd-link" to="/product/edge/">FlowFuse Edge</NuxtLink>,
              <NuxtLink class="ffd-link" to="/product/hub/">Hub</NuxtLink>, and
              <NuxtLink class="ffd-link" to="/product/fleet/">Fleet</NuxtLink>.
            </p>
            <div class="flex flex-row flex-wrap gap-4 items-center justify-center md:justify-start mt-2">
              <CtaBookDemo variant="highlight" position="dashboard-hero" uppercase />
              <CtaPricing variant="ghost" position="dashboard-hero" />
            </div>

            <hr class="border-0 border-t border-gray-200 w-full max-w-md mx-auto md:mx-0 mt-1 mb-0">

            <figure class="border-l-2 border-indigo-100 pl-5 max-w-lg mx-auto md:mx-0 my-auto text-left">
              <blockquote class="m-0 text-base italic font-light text-gray-800 leading-relaxed">
                &ldquo;FlowFuse allows us to rapidly roll out updates to clients without
                burdening our development team. We can deliver custom dashboards to
                customers without involving any of our core developers.&rdquo;
              </blockquote>
              <figcaption class="mt-3 flex items-center gap-3 text-sm text-gray-500">
                <span class="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 grid place-items-center text-xs font-bold shrink-0 ffd-mono" aria-hidden="true">DO</span>
                <span><span class="font-semibold text-gray-700">Dave Olsen</span> &middot; Product Manager, Wenco</span>
              </figcaption>
            </figure>
          </div>

          <DashboardThemePreview />
        </div>
      </div>
    </div>

    <div class="w-full bg-gray-50 border-t border-b border-gray-200 mt-20">
      <div class="w-full px-6 py-16 md:py-20">
        <div class="max-w-md sm:max-w-screen-lg mx-auto">
          <span class="ffd-mono text-xs uppercase tracking-[0.16em] text-gray-600">In the box</span>
          <h2 class="mt-3 mb-3 text-center w-full md:text-left">
            What You Get with <span class="text-indigo-600">The FlowFuse Dashboard</span>
          </h2>
          <p class="max-w-3xl mx-auto md:mx-0 text-gray-500 font-light">
            The FlowFuse Dashboard is how a FlowFuse instance turns raw data into an industrial dashboard
            &mdash; a machine dashboard on the line, or a plant-wide view for management. You can
            surface your data and insights, then leverage governance, hosting, and deployment via
            the core FlowFuse product to power your entire system.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div class="rounded-lg border border-indigo-200 bg-white p-6">
              <h3 class="text-lg font-semibold m-0 mb-4 text-indigo-600 text-center md:text-left">Governance for Your Operations Dashboard</h3>
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <a v-for="tag in GOVERNANCE_TAGS" :key="tag.label" class="ffd-tag" :href="tag.href">{{ tag.label }}</a>
              </div>
            </div>
            <div class="rounded-lg border border-indigo-200 bg-white p-6">
              <h3 class="text-lg font-semibold m-0 mb-4 text-indigo-600 text-center md:text-left">Widgets for Any Machine Dashboard</h3>
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <a v-for="tag in WIDGET_TAGS" :key="tag.label" class="ffd-tag" :href="tag.href">{{ tag.label }}</a>
              </div>
            </div>
            <div class="rounded-lg border border-indigo-200 bg-white p-6">
              <h3 class="text-lg font-semibold m-0 mb-4 text-indigo-600 text-center md:text-left">Open, and yours</h3>
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <template v-for="tag in OPEN_TAGS" :key="tag.label">
                  <a v-if="tag.href" class="ffd-tag" :href="tag.href">{{ tag.label }}</a>
                  <span v-else class="ffd-tag">{{ tag.label }}</span>
                </template>
              </div>
            </div>
            <div class="rounded-lg border border-indigo-200 bg-white p-6">
              <h3 class="text-lg font-semibold m-0 mb-4 text-indigo-600 text-center md:text-left">Deploy a Factory Dashboard Fast</h3>
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <template v-for="tag in FAST_TAGS" :key="tag.label">
                  <a v-if="tag.href" class="ffd-tag" :href="tag.href">{{ tag.label }}</a>
                  <span v-else class="ffd-tag">{{ tag.label }}</span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 py-16 md:py-20">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <div class="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <span class="ffd-mono text-xs uppercase tracking-[0.16em] text-gray-600">Migration</span>
            <h2 id="migration-service" class="mt-3 text-center w-full md:text-left">
              Coming from deprecated Dashboard 1.0? <span class="text-indigo-600">Bring your flows.</span>
            </h2>
            <p class="mt-4 text-gray-500 font-light">
              Dashboard 1.0 is
              <NuxtLink class="ffd-link" to="/blog/2024/06/dashboard-1-deprecated/">deprecated</NuxtLink>.
              Upload your flow and migrate to The FlowFuse Dashboard. Today, you can convert the
              following nodes:
            </p>
            <div class="flex flex-wrap gap-1.5 mt-4 justify-center md:justify-start">
              <code
                  v-for="node in CONVERTIBLE_NODES"
                  :key="node"
                  class="ffd-mono text-xs text-gray-700 bg-white border border-gray-200 rounded px-1.5 py-0.5"
              >{{ node }}</code>
            </div>
            <p class="mt-5 text-sm text-center md:text-left">
              <a class="ffd-link" href="https://github.com/FlowFuse/node-red-dashboard-2-migration">Supported nodes in detail &rarr;</a>
            </p>
          </div>

          <div class="ffd-migrate-col">
            <DashboardMigrationImporter />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full bg-gray-50 border-t border-b border-gray-200">
      <div class="w-full px-6 py-16 md:py-20">
        <div class="max-w-md sm:max-w-screen-lg mx-auto">
          <span class="ffd-mono text-xs uppercase tracking-[0.16em] text-gray-600">Learn</span>
          <h2 class="mt-3 text-center w-full md:text-left">Get a Production Dashboard By This Afternoon</h2>
          <ul class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 m-auto p-0 list-none">
            <li v-for="item in RESOURCES" :key="item.url" class="w-full max-w-md m-auto">
              <NuxtLink :to="item.url" class="ffd-res w-full h-full flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden group">
                <div class="ff-image-cover ff-image-rounded scale w-full aspect-video border-b border-gray-200">
                  <img :src="item.image" :alt="`Image representing ${item.title}`" width="285" loading="lazy" class="w-full h-auto">
                </div>
                <span class="p-5 flex flex-col gap-1.5">
                  <span class="ffd-res-title text-base font-medium text-gray-900 leading-snug">{{ item.title }}</span>
                </span>
              </NuxtLink>
            </li>
          </ul>
          <div class="flex justify-end mt-6">
            <NuxtLink to="/blog/dashboard/" class="ffd-link font-light flex flex-row items-center gap-1 flex-wrap">
              All Dashboard posts <UIcon name="i-heroicons-arrow-long-right" class="w-5 h-5" />
            </NuxtLink>
          </div>

          <h3 class="mt-14 mb-0 text-xl font-medium text-center w-full md:text-left">Recommended Video Tutorials</h3>
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="video in TUTORIALS" :key="video.id" class="ffd-res w-full h-full flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden">
              <LiteYoutube
                  :videoid="video.id"
                  :title="video.title"
                  :style="`overflow:hidden; background-image:url('https://img.youtube.com/vi/${video.id}/maxresdefault.jpg'); background-size:cover; background-position:center;`"
                  class="w-full aspect-video border-b border-gray-200"
              />
              <span class="p-5 flex flex-col gap-1.5">
                <span class="ffd-res-title text-base font-medium text-gray-900 leading-snug">{{ video.title }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 py-16 md:py-20">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <span class="ffd-mono text-xs uppercase tracking-[0.16em] text-gray-600">The rest of the platform</span>
        <h2 class="mt-3 mb-3 text-center w-full md:text-left">
          Your production dashboard is the face. <span class="text-indigo-600">Here is what runs behind it.</span>
        </h2>
        <p class="max-w-3xl mx-auto md:mx-0 text-gray-500 font-light">
          Dashboards are only as good as the systems feeding them. FlowFuse handles the
          governance, hosting, and deployment underneath &mdash; so the view your operators see
          stays live, secure, and reliable.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <NuxtLink
              v-for="tier in PLATFORM"
              :key="tier.title"
              :to="tier.href"
              class="ffd-xs rounded-lg border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 p-6 flex flex-col gap-2"
          >
            <span class="ffd-mono text-[0.625rem] uppercase tracking-[0.12em] text-red-700">{{ tier.eyebrow }}</span>
            <h3 class="text-2xl font-medium m-0 text-gray-900">{{ tier.title }}</h3>
            <p class="m-0 text-gray-500 font-light">{{ tier.body }}</p>
            <span class="mt-3 ffd-xs-go text-indigo-600">{{ tier.go }} &rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="w-full px-6 pb-20">
      <div class="max-w-md sm:max-w-screen-lg mx-auto">
        <div class="rounded-xl px-9 py-12 flex flex-col items-center gap-6 text-center ff-get-started-bg">
          <p class="text-white text-3xl md:text-4xl font-medium m-0 max-w-2xl">
            See what your operators would actually be looking at.
          </p>
          <p class="text-indigo-50 font-light text-lg max-w-2xl m-0">
            Bring a screen you already run. We will rebuild it with you in the call.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 items-center">
            <CtaBookDemo variant="highlight" position="dashboard-footer" uppercase />
            <CtaSignUp variant="ghost" position="dashboard-footer" color="white" uppercase />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
