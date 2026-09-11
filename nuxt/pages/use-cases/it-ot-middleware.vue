<script setup lang="ts">
// Ported from src/use-cases/it-ot-middleware.njk (11ty), which this replaces. Same page,
// same copy, same classes from src/css/style.css.
//
// What the port changes on purpose:
//  - layouts/solution.njk's hero becomes <UseCaseSolutionHero>, with the frontmatter
//    `description` HTML fragment moving into the slot as ordinary template markup.
//  - faq.njk becomes <BlogFaq> plus useSchemaOrg, so the FAQ answers are escaped rather
//    than interpolated into a JSON string by hand.
//  - smooth-scroll.njk's global function and inline onclick become useScrollToAnchor.
//  - The CTA macros become <CtaBookDemo> and <CtaSignUp>. The two hand-written
//    ff-btn links that were not CTAs keep their own markup; the "INSTALL NOW" one keeps
//    its inline capture('cta-install') event, routed through useCapture.
//  - The three deployment-card headings carried a stray </br>, which is not a tag.
//    They are plain headings here.
//  - The reading-list and resources thumbnails point at /blog/**, /whitepaper/** and
//    /resources/** - assets owned by sections still on 11ty. They stay where they are and
//    move wholesale at teardown; the page's own art is copied into nuxt/public/images/,
//    which is where the already-ported pages keep theirs.
const scrollToAnchor = useScrollToAnchor()
const capture = useCapture()

const FEATURES = [
    { headingLead: 'Hardware & Sensor ', headingAccent: 'Integration', body: 'FlowFuse simplifies connecting diverse hardware and sensors in manufacturing, enhancing data collection and analytics for informed decision-making and efficiency improvements.' },
    { headingAccent: 'Integrate', headingRest: ' OT and IT Data', body: 'Our platform unifies operational and information technology data, offering manufacturers a comprehensive view of production processes for improved efficiency.' },
    { headingAccent: 'Intuitive', headingRest: ' OT Data visualization', body: 'FlowFuse offers a visual interface for real-time monitoring and analysis of operational data, aiding in quick, data-driven decisions to optimize manufacturing operations.' },
    { headingAccent: 'Automate', headingRest: ' Event Triggers', body: 'With FlowFuse, automate event triggers to respond instantly to production line changes, reducing downtime and boosting efficiency.' },
]

// Alternating left/right rows in the .njk, in this order.
const DEVOPS = [
    { image: '/images/pictograms/edge_blue.png', title: 'Optimized Fleet Management & Monitoring', body: 'FlowFuse revolutionizes equipment and device monitoring in manufacturing. Our platform automates remote deployment and management, ensuring efficiency and flexibility in operations.' },
    { image: '/images/pictograms/community_blue.png', title: 'Collaborative Development Environment', body: 'Enhancing teamwork in development, FlowFuse allows multiple team members to co-create and streamline application development, increasing efficiency and cohesion.' },
    { image: '/images/pictograms/bias_for_action_blue.png', title: 'Efficient Application Deployment', body: 'FlowFuse introduces structured DevOps pipelines, supporting various stages from development to production, to guarantee reliable, secure, and high-quality application delivery.' },
    { image: '/images/pictograms/ticket_blue.png', title: 'Dedicated Professional Support', body: 'FlowFuse provides expert support for your deployments, ensuring systems are consistently up-to-date and operationally continuous, backed by our professional guidance.' },
]

const FAQ = [
    { question: 'Can FlowFuse connect our PLCs to our ERP system?', answer: 'Yes, FlowFuse can be extended with over 5,000 open-source plug-ins to support virtually all industrial protocols. Connect your Siemens, Allen-Bradley, Omron, or other PLCs directly to SAP, Oracle, or any ERP system.' },
    { question: 'We have mixed equipment brands on our shop floor. Can FlowFuse handle this?', answer: 'Absolutely. FlowFuse acts as a universal translator between different equipment brands and protocols, allowing seamless data exchange between Siemens, Rockwell, Schneider, and other vendors.' },
    { question: 'How do we ensure production data security when connecting shop floor to business systems?', answer: 'FlowFuse provides secure tunneling for device connections, encrypted data transmission using TLS/SSL, role-based access control (RBAC), and comprehensive audit logging to meet manufacturing compliance requirements.' },
    { question: 'Can our plant operators create data flows without IT support?', answer: 'Yes, FlowFuse uses a visual drag-and-drop interface. Operators can build integrations between machines, SCADA, and business systems by connecting pre-built nodes - no coding required.' },
    { question: "What if our legacy equipment doesn't support modern protocols?", answer: 'FlowFuse can connect through serial converters, protocol gateways, or even manual data entry interfaces, ensuring no equipment is left behind in your digital transformation.' },
    { question: 'Do we need to shut down production to implement FlowFuse?', answer: 'No, FlowFuse can be deployed alongside existing systems with read-only connections initially. Full integration can be phased in during scheduled maintenance windows.' },
]

const CASE_STUDIES = [
    { title: 'Revolutionizing Precision Manufacturing with Node-RED', image: '/images/stories/abrasive_tech.jpg', alt: 'Photo of helicopters and a precision manufacturing machine', link: '/customer-stories/leveraging-node-red-and-flowfuse-to-automate-precision-manufacturing/' },
    { titleLead: 'The Future of Textile Manufacturing Powered with ', titleTail: 'Node-RED', image: '/images/stories/stfi-future-textile.jpg', alt: 'Photo of the STFI floor plant', link: '/customer-stories/stfi-future-of-textile-powered-by-node-red/' },
    { title: 'Node-RED Enables Digital Transformation of a Large US Manufacturing Company', image: '/images/stories/large-us-manufacturing.jpg', alt: 'Photo of a manufacturing company with a worker holding a laptop', link: '/customer-stories/manufacturing-digital-transformation/' },
]

const WHITEPAPERS = [
    { title: 'Accelerating Innovation in Manufacturing with FlowFuse', image: '/whitepaper/images/whitepaper-manufacturing.png', alt: 'Photo of a manufacturing company with a worker holding a laptop', link: '/whitepaper/accelerating-innovation-in-manufacturing-with-flowfuse/' },
    { title: 'Open Source Software for Manufacturing', image: '/whitepaper/images/whitepaper-oss-manufacturing.jpg', alt: 'Photo of a manufacturing company shop floor', link: '/whitepaper/open-source-software-for-manufacturing/' },
]

useSeoMeta({
    title: 'FlowFuse for IT/OT Integration',
    description: 'Bridge OT protocols and IT systems with low-code flows. Connect PLCs, SCADA, and historians to ERP, databases, and cloud services.',
    keywords: 'FlowFuse, Manufacturing, Automation, DevOps, Integration, OT, IT, Data, Visualization, Event Triggers, Fleet Management, Monitoring, Collaborative Development, Environment, Application Deployment, Professional Support',
    ogImage: 'https://flowfuse.com/images/solutions/og-solutions-manufacturing.jpg',
    ogUrl: 'https://flowfuse.com/use-cases/it-ot-middleware/',
    twitterSite: '@FlowFuseinc',
})

useSchemaOrg([
    defineWebPage({ '@type': 'FAQPage' }),
    ...FAQ.map(item => defineQuestion({ question: item.question, answer: item.answer })),
])
</script>

<template>
  <div class="w-full">
    <UseCaseSolutionHero
        title="FlowFuse for IT/OT Integration"
        subtitle="FlowFuse allows teams to automate their manufacturing process through customized, reliable applications."
        hero-img="/images/pictograms/factory_blue.png"
    >
      <p>
        FlowFuse streamlines manufacturing automation, from production monitoring to supply chain management. Our
        intuitive, customizable platform enables simple creation of custom solutions for unique manufacturing needs.
      </p>
    </UseCaseSolutionHero>

    <div class="w-full px-0">
      <div class="w-full flex justify-center mt-6">
        <div class="mx-auto text-center flex flex-row gap-8">
          <CtaBookDemo variant="highlight" position="hero" class="inline-block shadow" />
          <a href="#whitepapers" class="inline-block ff-btn ff-btn--primary-outlined shadow uppercase" @click="scrollToAnchor($event, 'whitepapers')">Read Whitepaper</a>
        </div>
      </div>

      <div class="container m-auto text-center">
        <div class="mt-20 content max-w-screen-lg m-auto">
          <div class="grid px-6 grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 mb-16">
            <div v-for="feature in FEATURES" :key="feature.headingAccent" class="text-left self-start">
              <h3>
                <template v-if="feature.headingLead">{{ feature.headingLead }}</template><span class="text-indigo-600">{{ feature.headingAccent }}</span><template v-if="feature.headingRest">{{ feature.headingRest }}</template>
              </h3>
              <div><p>{{ feature.body }}</p></div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full md:max-w-screen-lg m-auto pb-32">
        <img
            src="/images/solutions/markitechture-manufacturing.png"
            alt="High level architecture diagram showing how Node-RED can assist with data flow across a factory and manufacturing use-case"
            width="1024"
            class="w-full h-auto"
        >
      </div>

      <div class="w-full bg-gray-50 py-6">
        <div class="page container pt-12 pd-6 sm:pb-12 md:max-w-screen-lg m-auto text-center max-w-screen-lg px-6 md:px-0">
          <div class="hero">
            <h2 class="mb-6 m-auto">Enhancing Manufacturing with FlowFuse's DevOps Integration</h2>
            <p class="mt-0">
              FlowFuse elevates manufacturing by ensuring reliable and continuous delivery of applications. Our platform
              incorporates widely recognized DevOps concepts, fostering a collaborative and secure development
              environment.
            </p>
          </div>
        </div>
        <div class="page content max-w-screen-lg m-auto px-6 md:px-0">
          <div
              v-for="(row, i) in DEVOPS"
              :key="row.title"
              class="self-start flex gap-8 items-center mb-12"
              :class="i % 2 === 0 ? 'text-left' : 'text-left sm:text-right flex-row-reverse'"
          >
            <div
                class="flex flex-col gap-8 max-w-screen-lg"
                :class="i % 2 === 0 ? 'sm:flex-row sm:pr-24 md:pr-48' : 'sm:flex-row-reverse sm:pl-24 md:pl-48'"
            >
              <div class="w-32 sm:w-48 flex-shrink-0">
                <img :src="row.image" alt="" width="128" class="w-full h-auto">
              </div>
              <div>
                <h4>{{ row.title }}</h4>
                <div><p>{{ row.body }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div class="container m-auto text-center">
          <div class="content max-w-screen-lg m-auto px-6 md:px-0">
            <div class="pt-24 md:pt-16 text-left">
              <h2 class="max-md:text-center -mb-12">
                Frequently Asked <span class="text-indigo-600">Questions</span>
              </h2>
              <BlogFaq :faq="FAQ" variant="page" />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full">
        <div class="px-6 pt-3 md:pt-10 pb-20 md:pb-12 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap">
          <div class="text-center mt-6 md:mt-4 mb-6">
            <h2>Resources</h2>
          </div>
          <div class="container m-auto max-w-5xl">
            <div class="ff-nodered-resources grid grid-cols-1 md:grid-rows-[auto_1fr_1fr_1fr] md:grid-cols-2 md:grid-flow-col md:gap-x-4 pt-4 md:pt-6 items-start px-6">
              <h4 class="text-center">Case Studies</h4>
              <NuxtLink v-for="study in CASE_STUDIES" :key="study.link" class="h-full" :to="study.link">
                <li class="h-full">
                  <div class="w-2/5 max-md:aspect-video ff-image-cover ff-image-left-rounded h-full">
                    <img :src="study.image" :alt="study.alt" width="208" loading="lazy" class="w-full h-auto">
                  </div>
                  <label class="w-3/5">
                    <template v-if="study.titleLead">{{ study.titleLead }}<span class="inline-block">{{ study.titleTail }}</span></template>
                    <template v-else>{{ study.title }}</template>
                  </label>
                </li>
              </NuxtLink>
              <h4 id="whitepapers" class="text-center max-md:pt-12">Whitepapers</h4>
              <NuxtLink v-for="paper in WHITEPAPERS" :key="paper.link" :to="paper.link">
                <li>
                  <div class="w-2/5 max-md:aspect-video ff-image-cover ff-image-left-rounded h-full">
                    <img :src="paper.image" :alt="paper.alt" width="208" loading="lazy" class="w-full h-auto">
                  </div>
                  <label class="w-3/5">{{ paper.title }}</label>
                </li>
              </NuxtLink>
            </div>
          </div>

          <div class="text-center mt-20 mb-14">
            <h2>Flexible Deployment Options with <span class="text-indigo-600">FlowFuse</span></h2>
          </div>
          <div class="container m-auto max-w-screen-lg">
            <div class="grid md:px-0 grid-cols-1 md:grid-cols-3 gap-12 md:gap-5 max-w-md md:max-w-none mx-auto">
              <div class="deployment-card white-bg">
                <div>
                  <div class="title pb-4"><h4 class="text-indigo-600">FlowFuse Cloud</h4></div>
                  <p class="mb-0 text-left">
                    The easiest way to start building industrial applications. No installation required! Simply sign up
                    and gain immediate access to the editor.
                  </p>
                </div>
                <CtaSignUp variant="primary-outlined" position="manufacturing" class="md:self-end align-baseline w-full mt-3" />
              </div>
              <div class="deployment-card white-bg">
                <div>
                  <div class="title">
                    <h4 class="text-indigo-600">Self managed</h4>
                    <div class="text-base font-bold text-gray-600 pb-4">(on premise)</div>
                  </div>
                  <p class="mb-0 text-left">
                    Run FlowFuse where you prefer; that's possible too! In your cloud of preference, or even on-site.
                  </p>
                </div>
                <NuxtLink
                    class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3"
                    to="/docs/install/introduction/"
                    @click="capture('cta-install', { position: 'manufacturing' })"
                >INSTALL NOW</NuxtLink>
              </div>
              <div class="deployment-card white-bg">
                <div>
                  <div class="title pb-4"><h4 class="text-indigo-600">Edge device</h4></div>
                  <p class="mb-0 text-left">
                    Run FlowFuse where the data is generated. Manage thousands of edge devices through the FlowFuse
                    Device Agent.
                  </p>
                </div>
                <NuxtLink class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3" to="/platform/device-agent/">MORE INFO</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
