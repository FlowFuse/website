<script setup>
const SIGNUP = 'https://app.flowfuse.com/account/create'

const features = [
    { heading: 'Hardware &amp; Sensor <span class="text-indigo-600">Integration</span>', body: 'FlowFuse simplifies connecting diverse hardware and sensors in manufacturing, enhancing data collection and analytics for informed decision-making and efficiency improvements.' },
    { heading: '<span class="text-indigo-600">Integrate</span> OT and IT Data', body: 'Our platform unifies operational and information technology data, offering manufacturers a comprehensive view of production processes for improved efficiency.' },
    { heading: '<span class="text-indigo-600">Intuitive</span> OT Data visualization', body: 'FlowFuse offers a visual interface for real-time monitoring and analysis of operational data, aiding in quick, data-driven decisions to optimize manufacturing operations.' },
    { heading: '<span class="text-indigo-600">Automate</span> Event Triggers', body: 'With FlowFuse, automate event triggers to respond instantly to production line changes, reducing downtime and boosting efficiency.' },
]
const devops = [
    { img: '/images/pictograms/edge_blue.png', title: 'Optimized Fleet Management & Monitoring', body: 'FlowFuse revolutionizes equipment and device monitoring in manufacturing. Our platform automates remote deployment and management, ensuring efficiency and flexibility in operations.', reverse: false },
    { img: '/images/pictograms/community_blue.png', title: 'Collaborative Development Environment', body: 'Enhancing teamwork in development, FlowFuse allows multiple team members to co-create and streamline application development, increasing efficiency and cohesion.', reverse: true },
    { img: '/images/pictograms/bias_for_action_blue.png', title: 'Efficient Application Deployment', body: 'FlowFuse introduces structured DevOps pipelines, supporting various stages from development to production, to guarantee reliable, secure, and high-quality application delivery.', reverse: false },
    { img: '/images/pictograms/ticket_blue.png', title: 'Dedicated Professional Support', body: 'FlowFuse provides expert support for your deployments, ensuring systems are consistently up-to-date and operationally continuous, backed by our professional guidance.', reverse: true },
]
const faq = [
    { question: 'Can FlowFuse connect our PLCs to our ERP system?', answer: 'Yes, FlowFuse can be extended with over 5,000 open-source plug-ins to support virtually all industrial protocols. Connect your Siemens, Allen-Bradley, Omron, or other PLCs directly to SAP, Oracle, or any ERP system.' },
    { question: 'We have mixed equipment brands on our shop floor. Can FlowFuse handle this?', answer: 'Absolutely. FlowFuse acts as a universal translator between different equipment brands and protocols, allowing seamless data exchange between Siemens, Rockwell, Schneider, and other vendors.' },
    { question: 'How do we ensure production data security when connecting shop floor to business systems?', answer: 'FlowFuse provides secure tunneling for device connections, encrypted data transmission using TLS/SSL, role-based access control (RBAC), and comprehensive audit logging to meet manufacturing compliance requirements.' },
    { question: 'Can our plant operators create data flows without IT support?', answer: 'Yes, FlowFuse uses a visual drag-and-drop interface. Operators can build integrations between machines, SCADA, and business systems by connecting pre-built nodes - no coding required.' },
    { question: "What if our legacy equipment doesn't support modern protocols?", answer: 'FlowFuse can connect through serial converters, protocol gateways, or even manual data entry interfaces, ensuring no equipment is left behind in your digital transformation.' },
    { question: 'Do we need to shut down production to implement FlowFuse?', answer: 'No, FlowFuse can be deployed alongside existing systems with read-only connections initially. Full integration can be phased in during scheduled maintenance windows.' },
]
const caseStudies = [
    { title: 'Revolutionizing Precision Manufacturing with Node-RED', image: '/images/stories/abrasive_tech.jpg', alt: 'Photo of helicopters and a precision manufacturing machine', link: '/customer-stories/leveraging-node-red-and-flowfuse-to-automate-precision-manufacturing/' },
    { title: "The Future of Textile Manufacturing Powered with <span class='inline-block'>Node-RED</span>", image: '/images/stories/stfi-future-textile.jpg', alt: 'Photo of the STFI floor plant', link: '/customer-stories/stfi-future-of-textile-powered-by-node-red/' },
    { title: 'Node-RED Enables Digital Transformation of a Large US Manufacturing Company', image: '/images/stories/large-us-manufacturing.jpg', alt: 'Photo of a manufacturing company with a worker holding a laptop', link: '/customer-stories/manufacturing-digital-transformation/' },
]
const whitepapers = [
    { title: 'Accelerating Innovation in Manufacturing with FlowFuse', image: '/whitepaper/images/whitepaper-manufacturing.png', alt: 'Photo of a manufacturing company with a worker holding a laptop', link: '/whitepaper/accelerating-innovation-in-manufacturing-with-flowfuse/' },
    { title: 'Open Source Software for Manufacturing', image: '/whitepaper/images/whitepaper-oss-manufacturing.jpg', alt: 'Photo of a manufacturing company shop floor', link: '/whitepaper/open-source-software-for-manufacturing/' },
]

const scrollToAnchor = (event, id) => {
    event.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

useHead({
    title: 'FlowFuse for IT/OT Integration • FlowFuse',
    meta: [{ name: 'keywords', content: 'FlowFuse, Manufacturing, Automation, DevOps, Integration, OT, IT, Data, Visualization, Event Triggers, Fleet Management, Monitoring, Collaborative Development, Environment, Application Deployment, Professional Support' }],
})
</script>

<template>
  <!-- Hero (reproduces layouts/solution.njk) -->
  <div class="page w-full px-6 mt-12 md:px-0">
    <div class="hero container m-auto text-center max-w-screen-md">
      <div>
        <h1 class="px-12 md:px-0 m-auto">FlowFuse for IT/OT Integration </h1>
        <h4 class="mt-4 text-indigo-400">FlowFuse allows teams to automate their manufacturing process through customized, reliable applications.</h4>
      </div>
      <div class="flex items-center gap-6 mt-6">
        <div class="hidden sm:block w-64 flex-shrink-0">
          <img src="/images/pictograms/factory_blue.png" alt="Hero image for the respective solution" style="max-width:250px" />
        </div>
        <div class="flex flex-col justify-center text-center sm:text-left py-2">
          <p>FlowFuse streamlines manufacturing automation, from production monitoring to supply chain management. Our intuitive, customizable platform enables simple creation of custom solutions for unique manufacturing needs.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full px-0">
    <div class="w-full flex justify-center mt-6">
      <div class="mx-auto text-center flex flex-row gap-8">
        <a href="/book-demo/" class="inline-block ff-btn ff-btn--highlight shadow uppercase">Book a demo</a>
        <a href="#whitepapers" @click="scrollToAnchor($event, 'whitepapers')" class="inline-block ff-btn ff-btn--primary-outlined shadow uppercase">Read Whitepaper</a>
      </div>
    </div>

    <div class="container m-auto text-center">
      <div class="mt-20 content max-w-screen-lg m-auto">
        <div class="grid px-6 grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 mb-16">
          <div v-for="f in features" :key="f.heading" class="text-left self-start">
            <h3 v-html="f.heading" />
            <div><p>{{ f.body }}</p></div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:max-w-screen-lg m-auto pb-32">
      <img src="/images/solutions/markitechture-manufacturing.png" alt="High level architecture diagram showing how Node-RED can assist with data flow across a factory and manufacturing use-case" class="w-full h-auto mx-auto" style="max-width:1024px" />
    </div>

    <div class="w-full bg-gray-50 py-6">
      <div class="page container pt-12 pd-6 sm:pb-12 px-3 md:px-12 md:max-w-screen-lg m-auto text-center max-w-screen-lg md:px-0">
        <div class="hero">
          <h2 class="mb-6 m-auto">Enhancing Manufacturing with FlowFuse's DevOps Integration</h2>
          <p class="mt-0">FlowFuse elevates manufacturing by ensuring reliable and continuous delivery of applications. Our platform incorporates widely recognized DevOps concepts, fostering a collaborative and secure development environment.</p>
        </div>
      </div>
      <div class="page content max-w-screen-lg m-auto px-6 md:px-0">
        <div v-for="(d, i) in devops" :key="i"
             class="self-start flex gap-8 items-center mb-12"
             :class="d.reverse ? 'text-left sm:text-right flex-row-reverse' : 'text-left'">
          <div class="flex flex-col gap-8 max-w-screen-lg"
               :class="d.reverse ? 'sm:flex-row-reverse sm:pl-24 md:pl-48' : 'sm:flex-row sm:pr-24 md:pr-48'">
            <div class="w-32 sm:w-48 flex-shrink-0">
              <img :src="d.img" alt="" style="max-width:128px" />
            </div>
            <div>
              <h4>{{ d.title }}</h4>
              <div><p>{{ d.body }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div class="w-full">
      <div class="container m-auto text-center">
        <div class="content max-w-screen-lg m-auto px-6 md:px-0">
          <div class="pt-24 md:pt-16 text-left">
            <h2 class="max-md:text-center -mb-12">Frequently Asked <span class="text-indigo-600">Questions</span></h2>
            <FaqAccordion :items="faq" />
          </div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="px-6 pt-3 md:pt-10 pb-20 md:pb-12 text-lg flex-col flex-row items-center justify-center gap-1 hover:no-underline flex-wrap">
        <div class="text-center mt-6 md:mt-4 mb-6"><h2>Resources</h2></div>
        <div class="container m-auto max-w-5xl">
          <div class="ff-nodered-resources grid grid-cols-1 md:grid-rows-[auto_1fr_1fr_1fr] md:grid-cols-2 md:grid-flow-col md:gap-x-4 pt-4 md:pt-6 items-start px-6">
            <h4 class="text-center">Case Studies</h4>
            <a v-for="cs in caseStudies" :key="cs.link" class="h-full" :href="cs.link">
              <li class="h-full">
                <div class="w-2/5 max-md:aspect-video ff-image-cover ff-image-left-rounded h-full">
                  <img :src="cs.image" :alt="cs.alt" style="max-width:208px" />
                </div>
                <label class="w-3/5" v-html="cs.title" />
              </li>
            </a>
            <h4 class="text-center max-md:pt-12" id="whitepapers">Whitepapers</h4>
            <a v-for="wp in whitepapers" :key="wp.link" :href="wp.link">
              <li>
                <div class="w-2/5 max-md:aspect-video ff-image-cover ff-image-left-rounded h-full">
                  <img :src="wp.image" :alt="wp.alt" style="max-width:208px" />
                </div>
                <label class="w-3/5" v-html="wp.title" />
              </li>
            </a>
          </div>
        </div>
        <div class="text-center mt-20 mb-14">
          <h2>Flexible Deployment Options with <span class="text-indigo-600">FlowFuse</span></h2>
        </div>
        <div class="container m-auto max-w-screen-lg">
          <div class="grid md:px-0 grid-cols-1 md:grid-cols-3 gap-12 md:gap-5 max-w-md md:max-w-none mx-auto">
            <div class="deployment-card white-bg">
              <div>
                <div class="title pb-4"><h4 class="text-indigo-600">FlowFuse Cloud<br></h4></div>
                <p class="mb-0 text-left">The easiest way to start building industrial applications. No installation required! Simply sign up and gain immediate access to the editor.</p>
              </div>
              <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3" :href="SIGNUP">SIGN UP</a>
            </div>
            <div class="deployment-card white-bg">
              <div>
                <div class="title">
                  <h4 class="text-indigo-600">Self managed<br></h4>
                  <div class="text-base font-bold text-gray-600 pb-4">(on premise)</div>
                </div>
                <p class="mb-0 text-left">Run FlowFuse where you prefer; that's possible too! In your cloud of preference, or even on-site.</p>
              </div>
              <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3" href="/docs/install/introduction/">INSTALL NOW</a>
            </div>
            <div class="deployment-card white-bg">
              <div>
                <div class="title pb-4"><h4 class="text-indigo-600">Edge device<br></h4></div>
                <p class="mb-0 text-left">Run FlowFuse where the data is generated. Manage thousands of edge devices through the FlowFuse Device Agent.</p>
              </div>
              <a class="md:self-end ff-btn ff-btn--primary-outlined uppercase align-baseline w-full mt-3" href="/platform/device-agent/">MORE INFO</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
