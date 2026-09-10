<script setup lang="ts">
// Ported from src/platform/why-flowfuse.njk (11ty), which this replaces. Same page, same
// copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - The two hand-written <lite-youtube> elements become <LiteYoutube>, shared with the
//    blog. Both render the same video, one for each breakpoint, as the .njk did.
//  - The four quote glyphs were {% include %}d raw at w-16 with no ff-icon wrapper, so
//    they resolve through <UIcon> against the installed heroicons set.
//  - faq.njk becomes <BlogFaq> plus useSchemaOrg.
//  - The CTA macros become <CtaBookDemo> and <CtaSignUp>.
//  - The <title> and meta description are FIXED here. This page's frontmatter carried
//    MES's meta block verbatim, so production serves
//    "FlowFuse for your own MES • FlowFuse" and the MES description on
//    /platform/why-flowfuse/. Carrying that forward knowingly would be worse than the
//    change, so the title and description now describe this page.
//  - Production also renders an empty second <h1> from layouts/page.njk's `nohero`
//    branch, because the page sets no `title`. Only the real heading survives.
const VIDEO_ID = 'n9HhZCh0Ndg'
const VIDEO_STYLE = `width: 472px; overflow: hidden; background-image: url('https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg'); background-size: cover; background-position: center;`

const QUOTES = [
    { icon: 'i-heroicons-building-office-2', copy: 'My Node-RED flows are no longer side projects – they run real operations.' },
    { icon: 'i-heroicons-shield-check', copy: 'I need security, access control, and versioning I can trust.' },
    { icon: 'i-heroicons-squares-2x2', copy: 'I am tired of managing scattered Node-RED instances manually.' },
    { icon: 'i-heroicons-sparkles', copy: 'I wish I had an AI copilot that actually understands my Node-RED flows.' },
]

const COMPARISON = [
    { feature: 'Low-code Integration', nodered: 'Yes', flowfuse: 'Yes (enhanced, AI-assisted)' },
    { feature: 'Community Support', nodered: 'Vibrant Community', flowfuse: 'Enterprise Support & Community' },
    { feature: 'Security & Compliance', nodered: 'Basic, OS governed', flowfuse: 'Enterprise-grade, audit trails, RBAC' },
    { feature: 'Orchestration', nodered: 'Manual', flowfuse: 'Automated, centralized at scale' },
    { feature: 'Application Versioning', nodered: 'Manual', flowfuse: 'Built-in, AI-summarized changes' },
    { feature: 'Data Transformation & Modeling', nodered: 'Yes', flowfuse: 'AI-accelerated, structure/unify any format' },
    { feature: 'Deployment & Management', nodered: 'Manual', flowfuse: 'Cloud, Edge, Hybrid, centralized' },
    { feature: 'Blueprints & Prebuilt Solutions', nodered: 'Community driven', flowfuse: 'Certified, customizable for production' },
    { feature: 'Support & Upgrades', nodered: 'Community', flowfuse: 'Professional, future-proof' },
]

const FAQ = [
    { question: 'Is FlowFuse open source?', answer: 'FlowFuse leverages and contributes to the open-source Node-RED community building on its foundation while delivering enterprise-ready innovation for demanding environments.' },
    { question: 'Why pay for FlowFuse if Node-RED is free?', answer: 'FlowFuse is about rapid, safe industrial scale: AI acceleration, automated governance, security, multi-team collaboration, future-proof operations.' },
    { question: 'Will my Node-RED flows work in FlowFuse?', answer: 'Yes! FlowFuse is designed for seamless migration, fully compatible with existing Node-RED logic and integrations.' },
]

const META_DESCRIPTION = 'FlowFuse is the easiest, fastest, most sustainable way to build and operate applications that help you optimize industrial processes, with the security, governance and AI acceleration Node-RED alone does not provide.'

useSeoMeta({
    title: 'Why FlowFuse',
    description: META_DESCRIPTION,
    ogDescription: META_DESCRIPTION,
    ogUrl: 'https://flowfuse.com/platform/why-flowfuse/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: item.answer })),
])
</script>

<template>
  <div class="w-full page hero">
    <div class="content">
      <div class="nohero w-full px-6">
        <div class="w-full pt-12 pb-20 md:pt-6 md:pb-8">
          <div class="md:flex md:my-16 items-center md:flex-row md:justify-between mx-auto text-center md:text-left md:max-w-screen-lg gap-8">
            <div class="my-auto max-md:mx-auto md:w-1/2 lg:w-5/12">
              <h1 class="w-full mt-0 md:px-0 m-auto font-medium">
                Why <span class="text-red-600">FlowFuse</span>
              </h1>
              <div class="mb-10 flex-grow">
                <p>FlowFuse is the easiest, fastest, most sustainable way to build and operate applications that help you optimize industrial processes. </p>
                <p>From pilot to production, innovation in industry starts with the right foundation. <span class="font-semibold">Node-RED, pioneered by our own CTO Nick O’Leary,</span> empowers thousands to connect data, automate, and build ideas rapidly.</p>
                <p><span class="font-semibold">FlowFuse takes that power further</span>, enabling secure, governed, and AI-accelerated scale for your most critical operations.</p>
              </div>
              <div class="flex md:hidden justify-center m-auto mb-10 ff-image-rounded rounded-lg drop-shadow-lg">
                <LiteYoutube
                    :videoid="VIDEO_ID"
                    title="Why FlowFuse - YouTube video"
                    :style="VIDEO_STYLE"
                    class="rounded-xl sm:max-w-none sm:max-h-full"
                />
              </div>
              <div class="flex gap-3 max-md:mx-auto max-sm:flex-col max-md:justify-center">
                <CtaBookDemo variant="primary" position="primary" class="min-h-[40px]" />
                <CtaSignUp variant="ghost" position="primary" icon class="min-h-[40px]" />
              </div>
            </div>
            <div class="flex max-md:hidden justify-center m-auto max-w-[550px] ff-image-rounded rounded-lg drop-shadow-lg w-full">
              <LiteYoutube
                  :videoid="VIDEO_ID"
                  title="Why FlowFuse - YouTube video"
                  :style="VIDEO_STYLE"
                  class="rounded-xl sm:max-w-none sm:max-h-full"
              />
            </div>
          </div>
        </div>

        <div class="md:max-w-screen-lg mx-auto">
          <h2 class="text-center w-full md:text-left max-w-4xl">Ready to move <span class="text-indigo-600">beyond the prototype?</span></h2>
          <div class="max-w-md sm:max-w-screen-lg m-auto my-10">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
              <div class="flex-grow relative hidden lg:block">
                <div class="ff-image-cover left ff-image-rounded w-full h-full">
                  <img src="/images/why-flowfuse/from-prototype-to-production.png" alt="Shop floor office" width="496" class="w-full h-auto">
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div v-for="quote in QUOTES" :key="quote.copy" class="relative w-full max-md:max-w-md mx-auto bg-indigo-50 rounded-md p-6">
                  <div class="flex flex-row justify-center items-center gap-8 h-full">
                    <div class="flex w-16 items-center justify-center text-indigo-600">
                      <UIcon :name="quote.icon" class="w-16 h-16" />
                    </div>
                    <p class="w-full md:m-0 text-gray-600 font-medium mx-auto">"{{ quote.copy }}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full bg-indigo-50/50 py-12 mt-20 px-6">
        <div class="max-w-screen-lg mx-auto">
          <div class="md:flex items-center md:flex-row md:justify-between mx-auto max-md:text-center gap-8">
            <div class="my-auto max-md:mx-auto md:w-1/2 lg:w-5/12">
              <h2 class="w-full mt-0 md:px-0 m-auto">From Pilot to Production</h2>
              <h5 class="text-indigo-600">Supercharge your industrial automation</h5>
              <div class="flex mt-8 md:hidden justify-center m-auto mb-10 drop-shadow-lg max-w-lg">
                <img src="/images/why-flowfuse/node-red+flowfuse.png" alt="Node-RED and FlowFuse sinergy" width="400" class="w-full h-auto">
              </div>
              <div class="flex-grow">
                <p>FlowFuse and Node-RED form a seamless continuum: start with the creativity and agility of Node-RED, and scale with enterprise-ready security, audit trails, versioning, and FlowFuse AI Expert tools FlowFuse offers.</p>
                <p>FlowFuse bridges the gap between what’s possible and what’s reliable at scale, empowering teams to innovate faster, build smarter, and automate with confidence, all with complete governance and operational control.</p>
                <p class="mb-0">Our platform is 100% compatible with Node-RED, backed by the original creator, ensuring you invest in a future-proof solution.</p>
              </div>
            </div>
            <div class="flex max-md:hidden justify-center m-auto max-w-[550px] drop-shadow-lg w-full">
              <img src="/images/why-flowfuse/node-red+flowfuse.png" alt="Node-RED and FlowFuse sinergy" width="550" class="w-full h-auto">
            </div>
          </div>
        </div>
      </div>

      <div class="w-full px-6 pt-6">
        <div class="md:max-w-screen-lg mx-auto max-sm:text-center pt-16 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap mb-12">
          <h2 class="max-md:text-center"><span class="text-indigo-600">Why upgrade</span> to FlowFuse?</h2>
          <div class="relative overflow-x-auto rounded-lg mt-10 mb-20">
            <table class="w-full">
              <thead class="bg-indigo-100 text-left">
                <tr>
                  <th scope="col" class="px-6 py-3">Feature/Capability</th>
                  <th scope="col" class="px-6 py-3">Node-RED (Open Source)</th>
                  <th scope="col" class="px-6 py-3">FlowFuse (Built on Node-RED)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in COMPARISON" :key="row.feature" class="even:bg-indigo-50/50 text-left">
                  <th scope="row" class="px-6 py-4 font-medium text-indigo-400">{{ row.feature }}</th>
                  <td class="px-6 py-4"><div class="flex items-center">{{ row.nodered }}</div></td>
                  <td class="px-6 py-4"><div class="flex items-center">{{ row.flowfuse }}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2 class="max-md:text-center -mb-12">
            Frequently Asked <span class="text-indigo-600">Questions</span>
          </h2>
          <BlogFaq :faq="FAQ" />
        </div>
      </div>
    </div>
  </div>
</template>
