<script setup lang="ts">
// Ported from src/use-cases/data-integration.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - layouts/solution.njk's hero becomes <UseCaseSolutionHero>, with the frontmatter
//    `description` HTML fragment moving into the slot as ordinary template markup.
//  - The {% ffIconLg %} shortcode becomes <NavIcon size="lg">, which already reproduces
//    that wrapper for the nav; its registry gained the four icon keys this page needs.
//  - ctaContactUs becomes <CtaContactUs>, keeping the registry's copy and event.
const CHALLENGES = [
    { icon: 'data', solid: true, text: 'Data comes from different sources, including internal IT systems (ERP, CRM, SCM), IoT devices, external data services (weather, foreign exchange, etc.)' },
    { icon: 'codeblock', text: 'Data is accessible in a wide variety of formats, including CSV files, REST Api, XML, YAML, MQTT.' },
    { icon: 'lock', text: 'Access to data is often gated by IT departments making it slow and timing consuming for departments to get access to new integrated data.' },
    { icon: 'database', text: 'Data needs to be stored in different formats and databases.' },
    { icon: 'chart', text: 'Data needs to be visualized and communicated back to a user.' },
]

const IMPROVEMENTS = [
    {
        image: '/images/pictograms/community_blue.png',
        title: 'Collaborative Development',
        // The .njk carried two <h4>s per card, one with a <br> shown only from sm up.
        titleLines: ['Collaborative', 'Development'],
        paragraphs: [
            'FlowFuse makes it possible for teams to collaborate on the same flows and applications.',
            'Team members can share instances to make for quicker and more efficient development, with full version control and audit trails built in.',
        ],
    },
    {
        image: '/images/pictograms/node_catalog_blue.png',
        title: 'Managed Application Service',
        paragraphs: ['We run your instances so you don’t have to worry about the production reliability of your industrial applications.'],
    },
    {
        image: '/images/pictograms/bias_for_action_blue.png',
        title: 'Software Delivery Pipelines',
        titleLines: ['Software Delivery', 'Pipelines'],
        paragraphs: ['FlowFuse allows you to create snapshots of your instances so you can create software delivery pipelines for development, test, and production. You can revert to a previous version of a snapshot to rollback any changes.'],
    },
]

useSeoMeta({
    title: 'FlowFuse for Data Integration',
    description: 'Collect, transform, and route data from any industrial source to any destination, without writing integration code from scratch.',
    ogImage: 'https://flowfuse.com/images/solutions/og-solutions-data-integration.jpg',
    ogUrl: 'https://flowfuse.com/use-cases/data-integration/',
    twitterSite: '@FlowFuseinc',
})
</script>

<template>
  <div class="w-full">
    <UseCaseSolutionHero title="FlowFuse for Data Integration" hero-img="/images/pictograms/data_integration_blue.png">
      <p class="mt-0">
        Data integration can be a challenging task, especially when dealing with multiple data formats, protocols, and
        sources. FlowFuse's low-code industrial application platform allows anyone to collect data from multiple
        sources, apply the data, and update, store, and transmit data to a new service.
      </p>
    </UseCaseSolutionHero>

    <div class="w-full px-0">
      <div>
        <div class="mt-6 text-center">
          <CtaContactUs variant="highlight" position="hero" class="inline-block shadow" />
        </div>
      </div>

      <div class="container m-auto text-center mb-10">
        <div class="mt-20 content max-w-screen-lg m-auto">
          <h2 class="mb-4 m-auto">Challenges of Data Integration</h2>
          <div class="hidden sm:block w-full md:max-w-screen-lg m-auto">
            <img src="/images/solutions/data-integration.png" alt="." width="1024" class="w-full h-auto">
          </div>
          <div class="grid mt-12 px-6 grid-cols-1 md:grid-cols-3 gap-8 sm:mt-0 sm:gap-16 sm:gap-y-4 mb-20 text-left">
            <div v-for="challenge in CHALLENGES" :key="challenge.icon" class="text-indigo-700">
              <NavIcon :name="challenge.icon" :solid="challenge.solid" size="lg" />
              <p class="mt-2">{{ challenge.text }}</p>
            </div>
          </div>

          <div class="m-auto text-center sm:text-left p-8 max-w-md sm:max-w-screen-lg bg-indigo-50 rounded-lg border-[3px] border-indigo-200 mt-6 drop-shadow-xl">
            <h2 class="mb-10 m-auto font-bold">Why FlowFuse is the <span class="text-red-600">Data Integration Solution</span></h2>
            <div class="grid grid-cols-1 gap-8">
              <div class="text-left self-start">
                <h4>Accessible for Anyone</h4>
                <div>
                  <p>
                    FlowFuse’s low-code visual environment makes it easy for non-programmers to integrate data from
                    different sources without needing to know how to code. This enables all kinds of departments to work
                    on their own data integration projects without requiring support from IT.
                  </p>
                </div>
              </div>
              <div class="text-left self-start">
                <h4>Real-Time Data Visualisation</h4>
                <p>
                  FlowFuse makes it easy to create real-time data visualizations and dashboards. Data can be
                  filtered, transformed and analyzed through event-driven flows to get real-time insights into your business.
                </p>
              </div>
              <div class="text-left self-start">
                <h4>Support for Different Data Formats</h4>
                <p>
                  FlowFuse supports parsing a wide range of formats including: <strong>csv</strong>,
                  <strong>html</strong>, <strong>json</strong>, <strong>xml</strong> and <strong>yaml</strong>. Additional
                  additional data formats are available through FlowFuse’s support for over 5,000 open-source plug-ins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full px-6 pb-28 pt-12 md:px-0">
        <div class="page container pt-6 px-6 md:max-w-screen-lg m-auto sm:gap-y-4 text-center max-w-screen-lg">
          <div class="hero">
            <h2 class="mb-6 m-auto">FlowFuse Improves Data Integration</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-8 mt-20 mb-12 text-left">
            <div v-for="item in IMPROVEMENTS" :key="item.title">
              <div class="w-24 sm:w-24 mb-6 flex-shrink-0">
                <img :src="item.image" alt="" width="128" class="w-full h-auto">
              </div>
              <template v-if="item.titleLines">
                <h4 class="block sm:hidden">{{ item.title }}</h4>
                <h4 class="hidden sm:block">{{ item.titleLines[0] }}<br>{{ item.titleLines[1] }}</h4>
              </template>
              <h4 v-else>{{ item.title }}</h4>
              <div>
                <p v-for="(paragraph, i) in item.paragraphs" :key="i">{{ paragraph }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="content max-w-screen-lg m-auto text-center border-2 rounded-lg py-6 px-20 bg-indigo-50 border-indigo-100">
          <p class="text-2xl leading-10 mt-0 mb-9">Discover how FlowFuse can power your Data Integration.</p>
          <div>
            <CtaContactUs variant="primary" position="footer" class="inline-block m-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
