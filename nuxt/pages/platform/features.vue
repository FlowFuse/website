<script setup>
const modalOpen = ref(false)

const openModal = () => { modalOpen.value = true }
const closeModal = () => { modalOpen.value = false }

const sections = [
  {
    title: 'Connect',
    text: 'Integrate seamlessly with industry-standard protocols to ensure secure communication with your devices.',
    icon: 'arrows',
    image1: '/images/home/connect_graphic.png',
    image1Alt: 'Icons of communication protocols',
    url: '/solutions/edge-connectivity/',
  },
  {
    title: 'Collect & Transform',
    text: 'Gather and standardise data from various sources into a unified format for powerful insights.',
    icon: 'data-block',
    image1: '/images/home/collect_graphic.png',
    image1Alt: 'Icons of files formats',
    url: '/solutions/data-integration/',
  },
  {
    title: 'Visualise',
    text: 'Turn data into actionable insights with customisable dashboards and real-time monitoring.',
    icon: 'chart',
    image1: '/images/home/visualise_graphic.png',
    image1Alt: 'Dashboard charts',
    url: '/platform/dashboard/',
  },
  {
    title: 'Interact',
    text: 'Control systems directly from the dashboard, enabling real-time adjustments and responsiveness.',
    icon: 'bolt',
    image1: '/images/home/interact_graphic.png',
    image1Alt: 'Dashboard charts with interactive elements',
    url: '/platform/dashboard/',
  },
]

const features = [
  {
    title: 'Simplified Hosting and Maintenance',
    imageFolder: '/images/pictograms/',
    imageFile: 'cloud_nr_blue.png',
    imageAlt: ' Node-RED hosted in the cloud.',
    content: "Experience ease of use with <a href='https://app.flowfuse.com'>FlowFuse Cloud</a>, handling all your hosting needs. Forget the complexities of maintaining your development environment; we've got it covered.",
  },
  {
    title: 'Centralised Instance Management',
    imageFolder: '/images/pictograms/',
    imageFile: 'instance_blue.png',
    imageAlt: ' three Node-RED instances grouped in a single place.',
    content: 'FlowFuse enables seamless management of multiple instances from a single platform, streamlining your development and coordination efforts.',
  },
  {
    title: 'Scalable High Availability',
    imageFolder: '/images/pictograms/',
    imageFile: 'scalable_pictogram_blue.png',
    imageAlt: ' scalability.',
    content: "Node-RED applications can be run in <a href='/blog/2023/05/bringing-high-availability-to-node-red/'>High Availability</a> mode to allow the applications to scale up to meet spikes in demand. Even with instance failures, we ensure continuous operations by automatically switching to another Node-RED instance.",
  },
  {
    title: 'Data Sharing and Storage',
    imageFolder: '/images/pictograms/',
    imageFile: 'connect_device_blue.png',
    imageAlt: ' data sharing and storage',
    content: "FlowFuse adds to a Node-RED environment the ability to share information between instances and persistent data. <a href='/docs/user/projectnodes/#flowfuse-project-nodes'>FlowFuse Project Nodes</a> facilitate data and message exchange between Node-RED projects, ideal for edge-to-cloud communication.",
  },
  {
    title: 'Remote Device Management at the Edge',
    imageFolder: '/images/pictograms/',
    imageFile: 'edge_blue.png',
    imageAlt: ' edge management.',
    content: "FlowFuse allows you to deploy and manage Node-RED instances out to <a href='/solutions/edge-connectivity/'>edge devices</a>. This allows you to deploy the exact same instance out to hundreds or thousands of edge devices and monitor their status.",
  },
  {
    title: 'Software Delivery Pipelines',
    imageFolder: '/images/pictograms/',
    imageFile: 'pipeline_blue.png',
    imageAlt: ' a DevOps pipeline.',
    content: "<a href='/docs/user/devops-pipelines/#devops-pipelines'>DevOps pipelines</a> can be set up to stage Node-RED instances that have different development stages such as test, development and production.",
  },
  {
    title: 'Version History',
    imageFolder: '/images/pictograms/',
    imageFile: 'snapshot_blue.png',
    imageAlt: ' snapshots.',
    content: "<a href='/docs/user/snapshots/#snapshots'>Snapshots</a> of Node-RED instances can be taken to create a version history of the development work. Previous snapshot versions can be rolled back at any time.",
  },
  {
    title: 'Team Collaboration',
    imageFolder: '/images/pictograms/',
    imageFile: 'users_blue.png',
    imageAlt: ' a team.',
    content: "Different development team members are able to share and develop on the same Node-RED instance making collaboration easier. <a href='/blog/2024/04/role-based-access-control-rbac-for-node-red-with-flowfuse'>Role based access control (RBAC)</a> allows for restrictions on what team members can access and do while using the FlowFuse platform.",
  },
  {
    title: 'Built-in Security',
    imageFolder: '/images/pictograms/',
    imageFile: 'security_pictogram_blue.png',
    imageAlt: ' a lock.',
    content: 'All Node-RED instances are accessed using TLS/SSL. Single Sign-on (SSO) allows for users to sign in to FlowFuse using an existing SAML identity provider and Audit logs keep track of all changes that occur to a Node-RED instance and which user was responsible for the change.',
  },
  {
    title: 'Certified Nodes',
    imageFolder: '/images/pictograms/',
    imageFile: 'certified-nodes_blue.png',
    imageAlt: ' certifying badge.',
    content: "Our curated collection of certified nodes, ensuring top-notch quality, security, and support. Explore our certified nodes on the <a href='/certified-nodes'>Certified Nodes Page</a> and benefit from a robust ecosystem while maintaining operational reliability.",
  },
]

useHead({
  title: 'FlowFuse Features • FlowFuse',
  meta: [
    {
      name: 'description',
      content: 'FlowFuse provides the features companies require to reliably deliver industrial applications to devices and cloud in a collaborative, secure manner.',
    },
  ],
})
</script>

<template>
  <div class="nohero w-full">
    <div class="w-full px-6">
      <!-- Add modal structure -->
      <div v-show="modalOpen" id="modal" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="closeModal">
        <div class="bg-white p-6 rounded-lg max-w-2xl w-full">
          <span class="close absolute top-2 right-2 cursor-pointer text-xl" @click="closeModal">&times;</span>
          <h2 id="download-platform-overview" class="mb-6 w-full text-center">Download Platform Overview</h2>
          <HubSpotForm form-id="93ddc751-741d-4997-a22a-c05548a0a698" />
        </div>
      </div>
      <div class="pt-12 pb-20 max-w-screen-lg mx-auto">
        <!--Hero Content-->
        <div class="container text-center max-w-4xl mx-auto">
          <h1 class="m-auto leading-normal">
            FlowFuse Platform <span class="text-indigo-600">Features</span>
          </h1>
          <h2 class="text-xl text-indigo-400 mt-6 sm:mt-1">
            Low-Code Development Meets Industrial Strength
          </h2>
          <p class="text-center m-auto mt-6">Bridging the gaps between OT and IT, FlowFuse provides a comprehensive platform for all your industrial data connectivity needs, delivered with enterprise-grade control and security.</p>
          <div class="m-auto my-8 flex gap-6 items-center justify-center flex-row pb-2">
            <a class="ff-btn ff-btn--primary flex flex-col" href="/contact-us">
              <span class="text-base flex gap-2 uppercase items-center">
                Contact us
              </span>
            </a>
            <a class="ff-btn ff-btn--primary-outlined flex flex-col" @click="openModal">
              <span class="text-base uppercase items-center">
                DOWNLOAD PLATFORM OVERVIEW
              </span>
            </a>
          </div>
          <div class="max-w-[750px] m-auto border-indigo-300 border-2 ff-image-cover rounded-md">
            <img src="/images/features/flowfuse-features-hero.png" alt="FlowFuse Features" loading="lazy" class="w-full h-auto">
          </div>
        </div>
        <!--Low-code-->
        <div class="mt-24">
          <h2 class="mb-10 max-sm:text-center">
            <span class="text-indigo-600">Low-Code</span> Development
          </h2>
          <section>
            <div class="float-left min-w-[110px] w-[110px] md:w-[135px] mr-6 mb-3 ff-image-rounded rounded-md border-2 border-white shadow-2xl">
              <img src="/images/node-red-icon.png" alt="Node-RED logo" loading="lazy" class="w-full h-auto">
            </div>
            <p><a href="/node-red">Node-RED</a> is at the core of the FlowFuse platform. The low-code visual programming environment is the development experience you enjoy when using FlowFuse. This includes accessing the large community of Node-RED nodes to connect with various protocols, hardware platforms, databases, services, and more. Led by the creator of Node-RED and CTO of FlowFuse, Nick O’Leary, our team is deeply invested in the Node-RED Community and is committed to the success of the open-source project.</p>
            <!-- Industrial Automation -->
            <div class="w-full pt-2 mt-16">
              <div class="max-w-md sm:max-w-screen-lg mx-auto">
                <div class="mx-auto w-full md:max-w-screen-lg gap-x-8 gap-y-14">
                  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <a v-for="section in sections" :key="section.title" :href="section.url" class="rounded-lg bg-indigo-50/50 p-5 pt-8 flex flex-col gap-6 md:gap-10 md:flex-row hover:bg-indigo-50 hover:no-underline transition ease-in-out duration-300">
                      <div class="flex flex-col md:min-h-64">
                        <div>
                          <div class="flex flex-row max-md:justify-center items-center text-indigo-600">
                            <div class="w-10 h-10 text-indigo-600 mr-2">
                              <Icon :name="section.icon" />
                            </div>
                            <h3 class="text-2xl font-light text-indigo-600">{{ section.title }}</h3>
                          </div>
                          <p>{{ section.text }}</p>
                        </div>
                        <div class="flex flex-grow items-center max-md:mt-6">
                          <img :src="section.image1" :alt="section.image1Alt" loading="lazy" class="w-full h-auto">
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <!--FlowFuse-->
    <div class="w-full bg-gray-50 px-6">
      <div class="max-w-screen-lg flex flex-col sm:grid sm:grid-cols-2 gap-6 mx-auto pt-16 pb-20">
        <div class="col-span-2">
          <h2 class="mb-6 max-sm:text-center">FlowFuse: The Industrial Application Platform</h2>
          <p>In an enterprise environment, industrial application deployments need to be robust, secure, and scalable. FlowFuse bridges the gap between IT and OT, offering key features like robust security protocols to protect sensitive data, streamlined management tools for effortless scaling, and compliance frameworks to ensure adherence to industry standards. With FlowFuse, your solutions evolve from agile prototypes to enterprise-grade powerhouses, ready to tackle the complexities of your business operations.</p>
        </div>
        <div v-for="f in features" :key="f.title" class="container prose border-2 border-indigo-100 rounded-lg p-6">
          <div class="md:items-center">
            <div v-if="f.imageFile" class="flex justify-center items-center w-full">
              <div class="w-[100px] sm:w-[143px] mb-2">
                <img :src="f.imageFolder + f.imageFile" :alt="'Image depicting' + f.imageAlt" loading="lazy" class="w-full h-auto">
              </div>
            </div>
            <div>
              <h3 class="w-full text-center font-semibold max-sm:mt-3 text-xl">
                {{ f.title }}
              </h3>
              <p class="mb-0" v-html="f.content" />
              <ul>
                <template v-if="f.list">
                  <li v-for="item in f.list" :key="item">{{ item }}</li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full px-6">
      <div class="m-auto text-center sm:text-left py-20 max-w-screen-lg">
        <!-- get-started.njk -->
        <div class="m-auto w-full text-center sm:text-left mb-2">
          <h2 class="font-bold"><span class="text-red-600">Get Started</span> with FlowFuse</h2>
          <p class="-mt-1">Explore our <a href="/pricing/" class="underline">pricing</a></p>
        </div>
        <div class="w-full sm:grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div class="w-full mt-4 md:mt-0 flex flex-col justify-between">
            <div>
              <div class="flex justify-center sm:justify-start mt-3 mb-2 max-sm:mx-auto md:mx-0 w-6 h-6">
                <Icon name="cloud" />
              </div>
              <h3 class="flex justify-center sm:justify-start font-semibold text-xl">FlowFuse Cloud</h3>
              <p class="font-light mt-6">Our managed hosted solution, maintained and supported by the FlowFuse team. Experience flexibility, scalability, and expert assistance to drive your business forward.</p>
            </div>
            <a class="mt-4 ff-btn ff-btn--highlight uppercase inline-block self-center sm:self-start"
              href="https://app.flowfuse.com/account/create">Try it out</a>
          </div>
          <div class="w-full mt-4 md:mt-0 flex flex-col justify-between">
            <div>
              <div class="flex justify-center sm:justify-start mt-3 mb-2 max-sm:mx-auto md:mx-0 w-6 h-6">
                <Icon name="building-office-2" />
              </div>
              <h3 class="flex justify-center sm:justify-start font-semibold text-xl">On Premise</h3>
              <p class="font-light mt-6">Deploy FlowFuse on your hardware for enhanced flexibility. Opt for self-hosted deployment with FlowFuse, enabling on-premises installation and full control over your deployment process.</p>
            </div>
            <a class="mt-4 mb-6 sm:mb-0 ff-btn ff-btn--primary uppercase inline-block self-center sm:self-start"
              href="/pricing/?hosting=self-hosted#trial-license">REQUEST A TRIAL LICENSE
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
