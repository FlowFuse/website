<script setup>
import storiesData from '~/customer-stories.index.json'
import faq from '~/node-red.faq.json'

useHead({
    title: 'What is Node-RED? • FlowFuse',
    meta: [
        {
            name: 'description',
            content:
                'Node-RED is the low-code programming language of choice for industrial applications. Industrial engineers use Node-RED to collect, transform, and integrate data through visualized dashboards.',
        },
        { name: 'keywords', content: 'what is node-red, low-code programming, visual programming, flow-based programming, node-red enterprise, node-red for production' },
    ],
})

const SIGNUP_URL = 'https://app.flowfuse.com/account/create'

const lowCode = [
    { icon: 'light-bulb', title: 'Flow Based Programming', description: 'Node-RED’s visual programming makes it easy for non-developers to build robust applications.' },
    { icon: 'puzzle-piece', title: 'Digital Services Integration', description: 'Node-RED facilitates seamless integration with a wide array of digital services, including protocols (OPC-UA, Modbus, Siemens S7), databases, APIs, and devices.' },
    { icon: 'document-chart-bar', title: 'Data Visualization', description: '<a href="https://dashboard.flowfuse.com/" target="_blank">Node-RED Dashboard</a> makes it easy to visualize your data in charts that integrate directly with actions and events that respond to the data.' },
]

const whyFlowfuse = [
    { icon: 'shield-check', title: 'Enhanced Security', description: 'Security and compliance guardrails ensure adherence to security protocols.' },
    { icon: 'user-group', title: 'Seamless Collaboration', description: 'Cloud-based solutions and dev-ops pipelines streamline development with user-friendly interfaces and safeguard against errors.' },
    { icon: 'arrows-pointing-out', title: 'Scalable Architecture ', description: 'Start small and scale to thousands of self–built and self–maintained applications. Reduce reliance on point solutions and vendor lock-in.' },
    { icon: 'academic-cap', title: 'Expert Support', description: 'Get access to our dedicated support team who are creators and experts in Node-RED, ready to assist you at every step.' },
]

const deployment = [
    { title: 'FlowFuse Cloud', description: 'Get started with Node-RED easily! No installation needed – just sign up for instant editor access.', buttonText: 'MORE INFO', buttonLink: '/pricing/' },
    { title: 'Self managed', description: "Run FlowFuse where you prefer; that's possible too! In your cloud of preference, or even on-site.", buttonText: 'TALK TO SALES', buttonLink: '/book-demo/' },
]

const stories = computed(() =>
    [...storiesData.stories]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
)
</script>

<template>
  <div class="w-full page">
    <div class="nohero w-full">
      <!-- Hero -->
      <div class="w-full pt-12 pb-20 md:pt-6 md:pb-12">
        <div class="flex flex-col px-6 md:my-16 items-center md:flex-row md:items-start container mx-auto text-center md:text-left md:max-w-screen-lg gap-8">
          <div class="md:my-auto md:w-1/2 max-w-md">
            <h1 class="mt-0 px-12 md:px-0 m-auto text-indigo-800">What is <span class="inline-block">Node-RED?</span></h1>
            <p>
              Co-created by Nick O'Leary, CTO of FlowFuse, Node-RED is <span class="font-semibold">the <span class="inline-block">low-code</span> programming language of choice for industrial applications</span>. Industrial engineers use Node-RED to collect, transform, and integrate data through visualized dashboards.
            </p>
            <p><span class="font-semibold">FlowFuse enhances Node-RED with enterprise features</span> to accelerate digitalization and optimize industrial processes.</p>
            <p class="md:mb-10">Ready to <span class="font-semibold">get started building with Node-RED</span>?</p>
            <a class="ff-btn ff-btn--primary hidden min-h-[40px] md:inline" :href="SIGNUP_URL">TRY IT NOW</a>
          </div>
          <div class="max-w-md md:w-1/2 m-auto border-4 border-indigo-200 rounded-xl ff-image-cover">
            <img src="/images/pseudo-editor.png" alt="Node-RED pseudo UI" />
          </div>
          <a class="ff-btn ff-btn--primary flex flex-col w-full md:hidden max-w-md" :href="SIGNUP_URL">TRY IT NOW</a>
        </div>
      </div>

      <!-- Power of low-code -->
      <div class="w-full pb-16">
        <div class="max-w-screen-lg mx-auto px-6">
          <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
            <h2 class="text-center w-full md:text-left col-span-full">Harness the Power of <span class="text-indigo-600">Low-Code Integration</span></h2>
            <div v-for="section in lowCode" :key="section.title" class="relative w-full max-md:max-w-md mx-auto">
              <div class="flex flex-col items-center sm:items-start">
                <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                  <div class="w-8 h-8 m-auto sm:m-0 text-indigo-600"><Icon :name="section.icon" /></div>
                  <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                    <h5 class="w-full md:m-0"><div class="text-xl text-gray-600 text-center sm:text-left">{{ section.title }}</div></h5>
                  </div>
                </div>
                <div><p class="text-center sm:text-left font-light" v-html="section.description" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Learning Resources -->
    <div class="w-full bg-gray-50 pb-20 pt-16">
      <div class="max-w-screen-lg m-auto px-6">
        <h2 class="max-md:text-center">Node-RED <span class="text-indigo-600">Learning Resources</span></h2>
        <div class="max-sm:text-center max-w-md sm:max-w-none mx-auto sm:grid justify-center items-center mt-10" style="grid-template-columns: 45% auto;">
          <div class="max-h-[400px] md:max-h-[350px] ff-image-cover scale ff-image-rounded w-full h-full mb-4 sm:mb-0">
            <img src="/images/learning_nr.png" alt="Node-RED pseudo UI" />
          </div>
          <div class="content-center justify-center sm:pl-8 flex-1">
            <p class="md:mt-0">Jumpstart your Node-RED journey with FlowFuse’s comprehensive learning resources, including tutorials, case studies, and community forums. Whether you’re new to Node-RED or looking to refine your skills, our resources are designed to accelerate your learning curve.</p>
            <p class="text-blue-700 mb-10 mt-7">
              <a href="https://node-red-academy.learnworlds.com/">Node-RED Academy</a>
              <span class="px-3">|</span>
              <a href="/node-red/core-nodes/">Core Nodes</a>
              <span class="px-3">|</span>
              <a href="/blog/2024/05/understanding-node-flow-global-environment-variables-in-node-red/">Variables</a>
              <span class="px-3">|</span>
              <a href="/blog/2023/04/3-quick-node-red-tips-6/">Quick Tips</a>
            </p>
            <a class="ff-btn ff-btn--primary min-h-[40px] md:inline mb-2 md:mb-0 md:mr-2" href="/node-red/learn/">SEE MORE</a>
            <a class="ff-btn ff-btn--primary-outlined min-h-[40px] md:inline" href="/professional-services/">GET IMPLEMENTATION SUPPORT</a>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-screen-lg mx-auto text-center pt-20 pb-6 px-6 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap">
      <!-- Customer Stories Banner -->
      <h2 class="md:text-left max-w-3xl">Explore <span class="text-indigo-600">Real-World Node-RED Applications</span> from FlowFuse Customers</h2>
      <ul class="mt-10 grid grid-cols-1 md:grid md:grid-cols-3 gap-y-4 pb-4 m-auto gap-6">
        <li v-for="item in stories" :key="item.url" class="w-full max-w-md m-auto my-2">
          <a :href="item.url" class="w-full flex flex-col group hover:no-underline">
            <div>
              <div class="relative">
                <div class="w-full h-40 ff-image-cover scale mb-4 ff-image-rounded object-contain overflow-hidden">
                  <div v-if="item.logo" class="w-1/2 h-full absolute left-0 top-0 bg-white flex items-center justify-center">
                    <img :src="item.logo" :alt="`Image representing ${item.story?.brand || item.title} logo`" />
                  </div>
                  <img :src="item.image || '/images/og-blog.jpg'" :alt="`Image representing ${item.title}`" />
                </div>
              </div>
              <h5 class="mt-1 mb-0 group-hover:underline font-light text-lg text-left text-gray-600">{{ item.title }}</h5>
            </div>
          </a>
        </li>
      </ul>
      <a href="/customer-stories/" class="w-full font-light text-center md:text-left hover:underline pt-3 flex flex-row items-center gap-1 cursor-pointer flex-wrap max-md:max-w-md mx-auto mb-20">
        See more customer stories <span class="w-4 h-4"><Icon name="chevron-right-sm" /></span>
      </a>

      <!-- Why FlowFuse -->
      <div class="ff-blue-card">
        <h2 class="font-bold m-auto w-full text-center sm:text-left mb-5">Why Choose <span class="text-red-600">FlowFuse</span> for Node-RED</h2>
        <div class="w-full sm:grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div v-for="section in whyFlowfuse" :key="section.title" class="w-full mt-4 md:mt-0 flex flex-col justify-between">
            <div>
              <div class="flex max-sm:w-full justify-center sm:justify-start mt-3 mb-2 w-8 h-8"><Icon :name="section.icon" /></div>
              <h4 class="flex justify-center sm:justify-start font-semibold">{{ section.title }}</h4>
              <p class="font-light mt-6">{{ section.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Flexible Deployment -->
      <div class="text-center text-teal-50 mt-12 pt-12 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap">
        <div class="text-center mt-6 md:mt-4 mb-14">
          <h2 class="md:text-left max-w-3xl"><span class="text-indigo-600">Flexible Deployment</span> with FlowFuse</h2>
        </div>
        <div class="m-auto max-w-screen-lg">
          <div class="grid md:px-0 grid-cols-1 md:grid-cols-2 gap-12 md:gap-5 max-w-md md:max-w-none mx-auto">
            <div v-for="card in deployment" :key="card.title" class="deployment-card white-bg">
              <div>
                <div class="title pb-4"><h4 class="text-indigo-600">{{ card.title }}</h4></div>
                <p class="mb-0 text-left mb-8">{{ card.description }}</p>
              </div>
              <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3" :href="card.buttonLink">{{ card.buttonText }}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="md:text-left max-md:max-w-md mx-auto pt-24 md:pt-16 text-left">
        <h2 class="max-md:text-center -mb-12">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
        <FaqAccordion :items="faq" />
      </div>
    </div>
  </div>
</template>
