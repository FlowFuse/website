<script setup>
// Native Nuxt homepage — faithful 1:1 reproduction of src/index.njk.
import blogIndex from '../blog.index.json'
import eventsIndex from '../events.index.json'

const SIGNUP_URL = 'https://app.flowfuse.com/account/create'

const tagLine = 'Build and Deploy Industrial Applications at Scale with FlowFuse'
const subtitle = 'FlowFuse is the universal platform that powers your factory, creating a secure and governed solution for your industrial operations.'

const metrics = [
    { number: '50%', text: 'Reduction in scrap rate with real-time operational monitoring' },
    { number: '10x', text: 'Faster from idea to deployed operational application with FlowFuse Expert' },
    { number: '20+', text: 'Manufacturing sites standardized from a single platform without rebuilding' },
]

// Rotating hero background images (ported from src/_data/heroImages.js + config.json)
const heroImages = [
    { src: '/images/home/hero/hero-1.jpg', alt: 'Industrial manufacturing facility', mobileOverlay: true },
    { src: '/images/home/hero/hero-2.jpg', alt: 'Industrial shipping port with cargo containers and cranes', mobileOverlay: true },
    { src: '/images/home/hero/hero-3.jpg', alt: 'Large-scale solar panel array at an industrial energy facility', mobileOverlay: false },
]
const activeSlide = ref(0)
onMounted(() => {
    if (heroImages.length < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setTimeout(() => {
        const advance = () => { activeSlide.value = (activeSlide.value + 1) % heroImages.length }
        advance()
        setInterval(advance, 4400)
    }, 3200)
})

const sections = [
    { svg: 'lock-closed', title: 'Vendor-Locked SCADA Ecosystems', description: 'Proprietary platforms tie your strategy to a single vendor, creating expensive risks. FlowFuse offers a flexible, open-source-based alternative that puts you in control.' },
    { svg: 'point-to-point', title: 'Custom Point-to-Point Integrations', description: 'Isolated solutions for each facility are a maintenance nightmare. Our platform enables you to build standardized, scalable solutions that can be deployed and managed centrally.' },
    { svg: 'puzzle-piece', title: 'IT Department Bottlenecks', description: 'Every operational change requires IT approval, creating 6-month delays for simple tasks. With FlowFuse Expert, our LLM-powered copilot, , OT teams can now build, test, and deploy solutions independently and in record time, turning months into minutes.' },
]

const capabilities = [
    { capability: 'Edge data acquisition', feature: 'Device agent for streamlined connectivity', description: 'Easily and securely collect data from all your industrial devices and sensors. Our platform enables scalable agent deployment to unify data from diverse sources and protocols, ensuring a consistent and reliable flow of information.', imagePath: '/images/home/home-remote-instances.png', imageAlt: 'FlowFuse UI' },
    { capability: 'Organize and Analyze', feature: 'AI-Assisted platform for data transformation', description: ' Transform raw data into a structured and unified information model. FlowFuse Expert accelerates this process, allowing your teams to generate complex data transformation logic, from SQL queries to JavaScript functions, using simple natural language prompts. Cleanse, contextualize, and normalize data faster than ever before.', imagePath: '/images/home/home-node-red.png', imageAlt: 'FlowFuse flow editor' },
    { capability: 'Interact with the Data', feature: 'Interactive, real-time dashboards built with AI assistance', description: 'Give your teams the tools to visualize and interact with real-time operational data. with FlowFuse Expert, our LLM-powered copilot, you can create custom dashboards and sophisticated UI elements in record time, empowering you to monitor KPIs, optimize production, and innovate without limits.', imagePath: '/images/home/home-dashboard.png', imageAlt: 'FlowFuse Dashboard' },
]

const solutions = [
    { href: '/solutions/it-ot-middleware/', image: '/images/home/home-itot-middleware.png', imageAlt: 'Image of workers on a factory shop floor with desks, computers and dashboards on the screen', icon: 'cog', title: 'IT/OT Middleware', description: 'Connect disparate systems and industrial protocols with a unified platform. Accelerate development and enable seamless collaboration between IT and OT teams to optimize real-time data flow.' },
    { href: '/solutions/scada/', image: '/images/home/home-scada.png', imageAlt: 'Image of a woman working on a computer with industrial dashboards on the screen in industrial environment', icon: 'adjustments-horizontal', title: 'SCADA', description: 'Modernize your SCADA systems with a modular and flexible platform. Build custom interfaces and control logic in a fraction of the time, gaining full visibility of your operations in an agile and secure way.' },
    { href: '/solutions/mes/', image: '/images/home/home-mes.png', imageAlt: 'A factory centrally connected with various devices and systems', icon: 'chart', title: 'MES', description: 'Implement custom Manufacturing Execution Systems (MES) with greater speed. Rapidly develop and deploy the specific workflows you need, connecting the production plan to the plant floor with ultimate efficiency.' },
]

// explore-more-content: latest 3 blog posts + latest webinar
const latestPosts = computed(() => blogIndex.cards.slice(0, 3))
const latestWebinar = computed(() => {
    const webinars = eventsIndex.events.filter((e) => e.type === 'webinar')
    webinars.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    return webinars[0]
})
const isFuture = (iso) => iso && new Date(iso).getTime() > Date.now()

useHead({
    title: 'Build workflows and integrations that optimize your industrial operations',
    meta: [{ name: 'description', content: 'FlowFuse is the universal platform that powers your factory, creating a secure and governed solution for your industrial operations.' }],
})
</script>

<template>
  <div class="w-full">
    <!--Hero Content-->
    <section class="w-full relative bg-indigo-800 md:min-h-[800px]">
      <div v-if="heroImages.length" class="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div v-for="(slide, i) in heroImages" :key="slide.src" class="hero-slide" :class="{ 'is-active': i === activeSlide }">
          <img :src="slide.src" :alt="slide.alt" loading="lazy">
          <div v-if="slide.mobileOverlay" class="absolute inset-0 bg-gray-500/50 mix-blend-multiply md:hidden"></div>
        </div>
      </div>
      <div class="relative z-10 px-6 w-full pt-12 md:pt-28 pb-36 md:pb-24">
        <div class="sm:max-w-screen-lg mx-auto">
          <div class="container m-auto text-left max-w-screen-lg">
            <div class="mx-auto">
              <h1 class="font-medium m-auto text-5xl md:text-7xl text-center text-white max-w-4xl">{{ tagLine }}</h1>
              <p class="mt-12 text-center text-gray-200 md:text-xl m-auto max-w-4xl">{{ subtitle }}</p>
              <div class="flex flex-col mt-12">
                <div class="m-auto flex gap-4 items-center justify-center flex-row">
                  <a class="ff-btn ff-btn--highlight flex flex-col mb-6" href="/book-demo/">
                    <span class="text-base uppercase items-center">BOOK A DEMO</span>
                  </a>
                  <a class="ff-btn flex flex-col mb-6" :href="SIGNUP_URL">
                    <span class="text-base uppercase items-center text-base flex gap-2 uppercase items-center text-white hover:text-gray-200">
                      TRY IT OUT
                      <Icon name="arrow-right" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Screenshot bridge: overlaps hero from below -->
    <div class="relative z-10 px-6 -mt-28 md:-mt-48">
      <div class="sm:max-w-screen-lg mx-auto">
        <div class="w-full flex-grow relative bg-gradient-to-tl from-red-100 to-indigo-100 p-4 md:p-8 rounded-xl">
          <div class="ff-image-cover center ff-image-rounded bg-center w-full h-full">
            <img src="/images/home/flowfuse-home-ui.png" alt="FlowFuse Home UI" class="w-full h-auto" loading="lazy">
          </div>
        </div>
      </div>
    </div>

    <!-- Social Proof + Metrics -->
    <div class="w-full px-6 pt-8">
      <!-- Social Proof -->
      <div class="sm:max-w-screen-lg m-auto max-w-5xl mb-10">
        <div class="w-full text-center min-h-14 flex justify-center items-center mt-8 bg-radial-indigo">
          <h2 class="text-gray-600 text-lg font-semibold">Trusted by our customers</h2>
        </div>
        <div class="mx-auto text-center -mt-0.5">
          <SocialProof />
        </div>
      </div>
      <!-- Metrics -->
      <div class="max-w-md sm:max-w-screen-lg mx-auto mb-10">
        <div class="grid sm:grid-cols-3 gap-12 my-4 max-sm:w-full m-auto">
          <div v-for="metric in metrics" :key="metric.number" class="w-full h-full rounded-lg bg-red-50/70 pb-3 px-6 pt-6">
            <h3 class="text-5xl font-semibold text-red-400">{{ metric.number }}</h3>
            <p class="mt-0 font-normal leading-6" v-html="metric.text" />
          </div>
        </div>
      </div>
    </div>

    <!-- Problem section -->
    <div class="bg-gradient-to-br from-indigo-700 to-indigo-900 w-full py-20 px-6 my-16">
      <div class="sm:max-w-screen-lg mx-auto">
        <div class="sm:flex sm:flex-row gap-12 my-4 m-auto max-sm:text-center">
          <div class="sm:w-1/3 flex-grow relative">
            <div class="ff-image-cover center ff-image-rounded bg-center w-full h-full max-sm:max-h-60">
              <img src="/images/home/data-silos.jpg" alt="Trapped industrial data" class="w-full h-auto" loading="lazy">
            </div>
          </div>
          <div class="sm:w-2/3 my-auto flex flex-col">
            <h2 class="max-sm:mt-10 text-white">Your Industrial Data is Trapped. <span class="text-indigo-300">Our AI Unlocks It</span></h2>
            <p class="text-indigo-50">Large manufacturing organizations struggle to unlock the full potential of their operational data. Your current infrastructure creates information silos between IT and OT systems, preventing the scalable digitalization initiatives that drive competitive advantage. <span class="font-semibold">FlowFuse's AI-powered platform intelligently bridges this gap</span>, enabling true operational excellence across all your facilities.</p>
            <a class="mt-4 ff-btn ff-btn--highlight uppercase inline-block self-center sm:self-start" href="/book-demo/">BOOK A DEMO</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Quo section -->
    <div class="about w-full pt-16 px-6">
      <div class="max-sm:text-center max-w-screen-lg mx-auto pb-16 bg-radial-indigo-small mb-20">
        <h2 class=" w-full">Why Traditional Industrial Integration Can't Scale <span class="text-red-600">(And How We Use AI to Fix It)</span></h2>
        <p>Most large manufacturers try to solve connectivity challenges with approaches that create enterprise-wide bottlenecks. Here's how FlowFuse provides a smarter, AI-driven alternative:</p>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14 mt-16">
          <div v-for="section in sections" :key="section.title" class="relative w-full max-md:max-w-md mx-auto">
            <div class="flex flex-col items-center sm:items-start">
              <div class="flex flex-col justify-center md:justify-start gap-3 w-full">
                <div class="w-8 h-8 m-auto sm:m-0 text-red-400"><Icon :name="section.svg" /></div>
                <div class="w-full flex flex-row gap-3 mx-auto md:m-0">
                  <p class="w-full font-semibold md:m-0 text-gray-600">{{ section.title }}</p>
                </div>
              </div>
              <div><p class="font-light">{{ section.description }}</p></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Cost of inaction section -->
      <div class="text-center sm:text-left max-w-screen-lg mx-auto py-6 flex flex-col sm:flex-row gap-10">
        <div class="sm:w-1/2">
          <h3>The enterprise cost of fragmented industrial architecture</h3>
          <p>Without integrated industrial data monitoring and control, large manufacturers face significant operational losses:</p>
        </div>
        <div class="sm:w-1/4">
          <h4 class="text-4xl text-indigo-600 font-semibold">$50B</h4>
          <p>Annual cost of unplanned downtime across industrial manufacturers globally</p>
        </div>
        <div class="sm:w-1/4">
          <h4 class="text-4xl text-indigo-600">800h</h4>
          <p>Average equipment downtime per year experienced by manufacturers (over 15 hours per week)</p>
        </div>
      </div>
    </div>

    <!-- AI section -->
    <div class="w-full px-6 bg-indigo-50/50 my-20">
      <div class="w-full pt-20 pb-20">
        <div class="sm:max-w-screen-lg mx-auto">
          <div class="relative ff-image-cover right ff-image-rounded mb-12 h-[100px] sm:h-[130px]">
            <img src="/images/home/home-flowfuse-ai.jpg" alt="Abstract visual of AI powering connected systems and data pipelines." class="w-full h-full object-cover" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-700 sm:hidden" />
            <div class="absolute inset-0 max-w-2xl h-full flex items-center sm:pl-10">
              <h2 class="text-white w-full max-sm:text-center mb-0"><span class="text-indigo-300">Meet</span> FlowFuse Expert</h2>
            </div>
          </div>
          <p class="max-sm:text-center">An <span class="font-medium">industrial-tuned LLM</span> uses FlowFuse's knowledge base and your data schemas to <span class="font-medium">turn your plain-language description into industrial automation flows</span>, data mappings, dashboards, and queries—so you can <span class="font-medium">build faster without waiting on scarce developers.</span></p>
          <p class="max-sm:text-center">FlowFuse does not bolt a generic LLM onto the side of your stack; LLMs are wired directly into how teams design, build, and operate industrial applications via Model Context Protocol (MCP). <span class="font-medium">FlowFuse Expert is the AI</span> that understands your flows, data structures, and environment in real time—so it can <span class="font-medium">generate and refine real, deployable artifacts instead of isolated snippets.</span></p>
          <a href="/ai/" class="w-full text-right flex flex-row items-center justify-end self-end justify-self-end gap-1 mt-6">
            Learn more about FlowFuse AI
            <Icon name="arrow-long-right" />
          </a>
        </div>
      </div>
    </div>

    <!-- How FF solves the problem section -->
    <div class="w-full px-6 mt-28 mb-16">
      <div class="text-center sm:text-left max-w-screen-lg mx-auto p-9 rounded-xl border-2 border-gray-300 drop-shadow-md bg-white">
        <h2><span class="text-red-600">Intelligently Scale</span> Your Industrial Applications with AI</h2>
        <div class="md:hidden flex ff-image-rounded max-w-[500px] m-auto mt-6">
          <img src="/images/home/app-maturity-diagram.png" alt="App maturity diagram" class="w-full h-auto" loading="lazy">
        </div>
        <div class="w-full md:flex md:flex-row gap-6 justify-between items-center m-auto">
          <div class="md:w-7/12">
            <p>FlowFuse is the Industrial Application Platform that transforms how organizations connect, collect, and scale industrial operations. Our platform, now enhanced with FlowFuse Expert, empowers IT and OT teams to collaborate more effectively than ever before. Standardize deployments across multiple facilities and accelerate innovation, all while maintaining the governance, security, and scalability your digital transformation demands.</p>
            <div class="flex gap-3 max-sm:max-w-sm max-md:mx-auto max-sm:flex-col max-sm:justify-center mt-6">
              <a class="ff-btn ff-btn--highlight min-h-[40px]" href="/contact-us/">CONTACT US</a>
              <a class="ff-btn ff-btn--primary-outlined min-h-[40px]" :href="SIGNUP_URL">TRY IT OUT</a>
            </div>
          </div>
          <div class="max-md:hidden flex ff-image-rounded md:max-w-[350px] m-auto">
            <img src="/images/home/app-maturity-diagram.png" alt="App maturity diagram" class="w-full h-auto" loading="lazy">
          </div>
        </div>
      </div>
    </div>

    <!-- Capabilities & Features -->
    <div class="w-full px-6">
      <div class="md:max-w-screen-lg mx-auto mt-24">
        <div v-for="(item, i) in capabilities" :key="item.capability" class="max-md:text-center md:flex md:flex-row gap-8 my-4 m-auto mb-12 md:mb-24" :class="i % 2 === 1 ? 'md:flex-row-reverse' : ''">
          <div class="max-md:hidden md:w-[45%] max-md:mb-12 flex items-center">
            <div class="rounded-xl w-full bg-gradient-to-tl from-red-100 to-indigo-100 p-5 md:p-8 m-auto">
              <div class="ff-image-rounded w-full overflow-hidden">
                <img :src="item.imagePath" :alt="item.imageAlt" class="w-full h-auto" loading="lazy">
              </div>
            </div>
          </div>
          <div class="md:w-[55%] my-auto flex flex-col">
            <h3 class="text-red-600 mb-3 text-lg font-semibold">{{ item.feature }}</h3>
            <h2>{{ item.capability }}</h2>
            <div class="md:hidden rounded-xl w-full bg-gradient-to-tl from-red-100 to-indigo-100 max-w-[500px] mx-auto my-6 p-4">
              <div class="ff-image-rounded w-full border border-red-200 overflow-hidden">
                <img :src="item.imagePath" :alt="item.imageAlt" class="w-full h-auto" loading="lazy">
              </div>
            </div>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Solutions section -->
    <div class="w-full px-6">
      <div class="w-full py-10 md:pt-16">
        <div class="sm:max-w-screen-lg mx-auto max-sm:text-center">
          <h2 class="max-sm:mt-10"><span class="text-indigo-600">Unlock Powerful Solutions</span> for Your Industrial Operations</h2>
          <p class="my-6">FlowFuse provides a comprehensive set of solutions designed to bridge the gap between IT and OT, streamline device management, and integrate data with unprecedented speed and intelligence.</p>
          <div class="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-6 mt-6 w-full">
            <a v-for="item in solutions" :key="item.href" class="my-2 group hover:no-underline" :href="item.href">
              <div class="w-full max-w-[333px] h-[245px] max-sm:max-w-[500px] max-sm:h-[200px] mx-auto mb-6 flex items-center justify-center overflow-hidden ff-image-cover ff-image-rounded scale">
                <img :src="item.image" :alt="item.imageAlt" class="w-full h-full object-cover" loading="lazy">
              </div>
              <div class="flex flex-row gap-2 my-3 items-center max-sm:justify-center">
                <div class="w-6 h-6 my-auto text-indigo-700"><Icon :name="item.icon" /></div>
                <h3 class="text-xl text-indigo-700 hover:text-indigo-900">{{ item.title }}</h3>
              </div>
              <p class="leading-6 sm:pr-3">{{ item.description }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="w-full px-6">
      <div class="w-full mt-16 md:px-0">
        <div class="sm:max-w-screen-lg mx-auto"><Testimonials /></div>
      </div>
    </div>

    <!-- Get Started -->
    <div class="pb-10 md:pb-12 pt-14 px-6">
      <div class="ff-blue-card">
        <div class="m-auto w-full text-center sm:text-left mb-2">
          <h2 class="font-bold"><span class="text-red-600">Get Started</span> with FlowFuse</h2>
          <p class="-mt-1">Explore our <a href="/pricing/" class="underline">pricing</a></p>
        </div>
        <div class="w-full sm:grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div class="w-full mt-4 md:mt-0 flex flex-col justify-between">
            <div>
              <div class="flex justify-center sm:justify-start mt-3 mb-2 max-sm:mx-auto md:mx-0 w-6 h-6"><Icon name="cloud" /></div>
              <h3 class="flex justify-center sm:justify-start font-semibold text-xl">FlowFuse Cloud</h3>
              <p class="font-light mt-6">Our managed hosted solution, maintained and supported by the FlowFuse team. Experience flexibility, scalability, and expert assistance to drive your business forward.</p>
            </div>
            <a class="mt-4 ff-btn ff-btn--highlight uppercase inline-block self-center sm:self-start" :href="SIGNUP_URL">Try it out</a>
          </div>
          <div class="w-full mt-4 md:mt-0 flex flex-col justify-between">
            <div>
              <div class="flex justify-center sm:justify-start mt-3 mb-2 max-sm:mx-auto md:mx-0 w-6 h-6"><Icon name="building-office-2" /></div>
              <h3 class="flex justify-center sm:justify-start font-semibold text-xl">On Premise</h3>
              <p class="font-light mt-6">Deploy FlowFuse on your hardware for enhanced flexibility. Opt for self-hosted deployment with FlowFuse, enabling on-premises installation and full control over your deployment process.</p>
            </div>
            <a class="mt-4 mb-6 sm:mb-0 ff-btn ff-btn--primary uppercase inline-block self-center sm:self-start" href="/pricing/?hosting=self-hosted#trial-license">REQUEST A TRIAL LICENSE</a>
          </div>
        </div>
      </div>
      <!-- FF Content / Explore more -->
      <div class="max-w-md sm:max-w-screen-lg m-auto max-w-5xl px-6">
        <div class="pt-12 mt-10 pb-12">
          <h2 class="text-center w-full md:text-left col-span-full font-medium"><span class="text-indigo-600">Explore more</span> about FlowFuse</h2>
          <div class="w-full max-w-md md:max-w-none mx-auto flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-x-8 pt-8">
            <!-- Blog -->
            <div class="w-full my-2 grid grid-cols-1 pb-4">
              <div class="pb-2 md:pb-0">
                <a href="/blog/">
                  <div class="sm:max-h-none md:min-w-[40%] max-w-[448px] ff-image-cover ff-image-rounded scale mx-auto mb-4 aspect-video">
                    <img src="/images/home/blog.png" alt="Image of hands typing on laptop working on Node-RED flows" class="w-full h-full object-cover" loading="lazy">
                  </div>
                </a>
                <h3 class="text-xl font-bold pb-3">Latest on the blog</h3>
                <a v-for="(p, i) in latestPosts" :key="p.url" :href="p.url" class="w-full flex flex-col group" :class="i < latestPosts.length - 1 ? 'border-b' : ''">
                  <h4 class="my-2 font-light text-lg"><span class="text-gray-500 group-hover:text-blue-700">{{ p.title }}</span></h4>
                </a>
              </div>
              <a href="/blog/" class="w-full text-right flex flex-row items-center justify-end self-end justify-self-end gap-1">
                See all
                <Icon name="arrow-long-right" />
              </a>
            </div>
            <!-- Webinar -->
            <div class="w-full my-2 grid grid-cols-1 pb-4">
              <template v-if="latestWebinar">
                <div class="pb-2 md:pb-0">
                  <a :href="latestWebinar.url">
                    <div class="sm:max-h-none md:min-w-[40%] max-w-[448px] ff-image-cover ff-image-rounded scale mx-auto mb-4 aspect-video">
                      <img src="/images/home/webinar.png" alt="Image of hands typing on laptop working on Node-RED flows" class="w-full h-full object-cover" loading="lazy">
                    </div>
                  </a>
                  <h3 class="text-xl font-bold pb-3">{{ isFuture(latestWebinar.date) ? 'Upcoming' : 'Latest' }} Webinar</h3>
                  <div class="w-full flex flex-col"><h4 class="my-2 font-light text-lg"><span class="text-gray-500">{{ latestWebinar.title }}</span></h4></div>
                  <div class="webinar-title w-full border-t pt-3 font-light text-gray-500">
                    <time>{{ latestWebinar.shortDate }}</time>
                    <time v-if="isFuture(latestWebinar.date)"> | {{ latestWebinar.time }}</time>
                  </div>
                </div>
                <a class="mt-4 ff-btn ff-btn--primary-outlined uppercase inline-block self-end justify-self-end" :href="latestWebinar.url">{{ isFuture(latestWebinar.date) ? 'REGISTER NOW' : 'WATCH WEBINAR' }}</a>
              </template>
            </div>
            <!-- Newsletter -->
            <div class="w-full my-2 grid grid-cols-1">
              <div class="pb-2 md:pb-0">
                <div class="sm:max-h-none md:min-w-[40%] max-w-[448px] ff-image-cover ff-image-rounded mx-auto mb-4 aspect-video">
                  <img src="/images/home/newsletter.png" alt="Image of hands typing on laptop working on Node-RED flows" class="w-full h-full object-cover" loading="lazy">
                </div>
                <h3 class="text-xl font-bold pb-3">Newsletter</h3>
                <h4 class="font-bold pb-3 pt-2 text-lg">Sign up for our monthly email updates</h4>
              </div>
              <div class="-mb-1 self-end w-full"><HubSpotForm form-id="159c173d-dd95-49bd-922b-ff3ef243e90c" /></div>
            </div>
          </div>
        </div>
        <div class="md:hidden bg-indigo-50 py-1 px-4 rounded-md w-full mx-auto max-md:text-center">
          <p>Need assistance with your project? <a href="/contact-us/" class="underline">Contact us</a>, and our experts will gladly provide a solution tailored to your needs.</p>
        </div>
      </div>
    </div>
  </div>
</template>
